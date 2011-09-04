#!/usr/bin/env python
"""
JSON-RPC Implementation
Copyright(c) 2007 Jakub Jankiewicz

"""

import sys, os, traceback, httplib, types
from cStringIO import StringIO
from gzip import GzipFile

class ServiceException(Exception): pass
class HttpException(ServiceException): pass
class JsonRpcException(ServiceException): pass
class ParseError(JsonRpcException): pass
class UserCodeException(Exception): pass

def json_serialize(obj):
    result = ''
    t = type(obj)
    if t == types.StringType:
        result += '"%s"' % obj.replace('\\', '\\\\').replace('"', '\\"').replace('\n', '\\n')
    elif t == types.NoneType:
        result += 'null'
    elif t == types.IntType or t == types.FloatType:
        result += str(obj)
    elif t == types.LongType:
        result += str(int(obj))
    elif t == types.TupleType:
        result += '[' + ','.join(map(json_serialize, list(obj))) + ']'
    elif t == types.ListType:
        result += '[' + ','.join(map(json_serialize, obj)) + ']'
    elif t == types.DictType:
        array = ['"%s":%s' % (k,json_serialize(v)) for k,v in obj.iteritems()]
        result += '{' + ','.join(array) + '}'
    else:
        result += '"unknown type - ' + type(obj).__name__ + '"'
    return result
        


def merge_args(*args, **kw):
    """create one dictionary from position and keyword arguments."""
    if args:
        params = dict((str(i), j) for i,j in enumerate(args))
        params.update(**kw)
    else:
        params = kw
    return params

def split_arg(d):
    """split dictionary to list and dictionary."""
    items = d.items();
    items.sort()
    items.reverse()
    args = []
    kw = {}
    while True:
        if len(items):
            item = items.pop()
            try:
                int(item[0])
            except ValueError:
                items.append(item)
                break
            else:
                args.append(item[1])
    return args, dict(items)

def pack_args(*args, **kw):
    """packing position and keywords paramaters."""
    if args and kw:
        return merge_args(*args, **kw)
    elif args:
        return args
    else:
        return kw

def dump_exception():
    """create execption info for json response."""
    info = sys.exc_info()
    message = {"name": str(info[0]), "message": str(info[1])}
    if __debug__:
        buff = StringIO()
        traceback.print_exc(file=buff)
        message["traceback"] = buff.getvalue()
    return message

def json_error(code, message, request=None, dump=False):
    """create error response dictinary for JSON-RPC."""
    keys = "name", "code", "message", "request"
    values = "JSONRPCError", code, message, request
    result = dict(zip(keys, values))
    if dump:
        result["error"] = dump_exception()
    return {"version": "2.0", "error": result}

def handle_json_rpc(object):
    """handle JSON-RPC request for specify object."""
    try:
        i = int(os.environ['CONTENT_LENGTH'])
        content = sys.stdin.read(i)
        request = eval(''.join(content).replace('null', 'None'))
    except:
        response = json_error(101, "Parse error", content)
    else:
        try:
            method = getattr(object, request['method'])
            try:
                response = json_response(request, method)
            except UserCodeException, e:
                response = json_error(104, 'User Code Exception', content, True)
            except:
                msg = "Server error at '%s'" % request['method']
                response = json_error(102, msg, content, True)
            else:
                response['error'] = None
        except AttributeError:
            msg = "Procedure '%s' not found" % request['method']
            response = json_error(103, msg, content, True)
        except:
            msg = "Server error (getattr at '%s')" % request['method']
            response = json_error(102, msg, content, True)
    return json_serialize(response)

def handle_cgi(object):
    response = 'Content-Type: plain/text; charset=UTF-8\n'
    try:
        data = handle_json_rpc(object)
    except:
        data = json_serialize(json_error(101, "error in handler", True))
    if os.environ.get('HTTP_ACCEPT_ENCODING', '').find('gzip') != -1:
        buff = StringIO()
        gz = GzipFile(fileobj=buff, mode='wb', compresslevel=9)
        gz.write(data)
        gz.close()
        data = buff.getvalue()
        response += 'Content-Encoding: gzip\n'
    response += 'Content-Lenght: %s\n' % len(data)
    response += "\n" + data
    print response

def json_response(request, method):
    """return JSON-RPC response as python dictionary ."""
    response = {"version": "2.0"}
    if request.has_key('id'):
        response['id'] = request['id']
        # params can be null (maped to None)    
    if request.has_key('params') and request['params']:
        #raise BreakPoint(json['params'])
        if type(request['params']) == dict:
            args, kw = split_arg(request['params'])
            # force string keywords (simplejson use unicode)
            kw = dict((str(k),v) for k,v in kw.iteritems())
            if args:
                if kw:
                    response['result'] = method(*args, **kw)
                else:
                    response['result'] = method(*args)
            elif kw:
                response['result'] = method(**kw)
            else:
                # empty dict
                response['result'] = method()

        elif type(request['params']) == list:
            response['result'] = method(*request['params'])
        else:
            # TODO: set msg to "params should be ..."
            raise JsonRpcException('Invalid params') 
    else:
        response['result'] = method()
    return response
    



class RpcService(object):
    """
    Simple JSON-RPC client over HTTP connection
    """
    def __init__(self, host, uri):
        self._host = host
        self._uri = uri
        self._id = 1

    def _json_request(self, name, *args, **kw):
        """return string with request in json-rpc format."""
        data = {
            "version": "2.0",
            "method": name,
            "params": pack_args(*args, **kw),
            "id": self._id
            }
        self._id += 1
        return json_serialize(data)

    def __getattr__(self, method_name):
        """return transparent JSON-RPC method over HTTP"""
        def method(*args, **kw):
            """return result of JSON-RPC call over HTTP."""
            connection = httplib.HTTPConnection(self._host)
            request = self._json_request(method_name, *args, **kw)
            headers = {
                'Content-Type': 'text/plain',
                'Accept': 'application/json',
                'Content-Length': str(len(request))
                }
            connection.request('POST', self._uri, request, headers)
            response = connection.getresponse()
            code, msg = response.status, response.reason
            conLen = response.getheader('Content-Length')
            result = response.read(conLen)
            if code != httplib.OK:
                raise HttpException(code, msg)
            try:
                result = eval(str(result).replace('null', 'None'))
            except ValueError, e:
                raise RuntimeError('eval error',result)
            try:
                if result['error']:
                    raise JsonRpcException(result['error'])
            except TypeError:
                # relly rare case (only when cgitb raise html page)
                raise RuntimeError(result)
            connection.close()
            return result['result']
        return method
