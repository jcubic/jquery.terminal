#!/usr/bin/python

import os, re, sys, types
from json import handle_cgi, dump_exception, UserCodeException
from StringIO import StringIO

# list of disabled modules
modules = ['os', 'posixpath', 'subprocess', 'linecache', 'io', 'trace', 'rexec'
           'posix', 'popen2', 'urllib', 'shutil', 'glob', 'UserDict', 'copy_reg',
           'posixpath', 'sys', 'sys', 'socket', 'fnmatch', 'imghdr', 'macpath',
           'stat', 'ctypes', 'ctypes.util', 'urllib2', 'binhex', 'pyclbr', 'mailcap',
           'compiler.pycodegen', 'locale', 'webbrowser', 'getopt', 'getpass', 'cgi',
           'pdb', 'cgitb', 'uu', 'compileall', 'CGIHTTPServer', 'linecache', 'mailbox',
           'genericpath', 'pipes', 'mimify', 'symtable', 'unittest', 'SimpleHTTPServer'
           'tarfile', 'tabnanny', 'timeit', 'dircache', 'nntplib', 'whichdb', 'filecmp',
           'inspect', 'tempfile', 'site', 'UserString', 'mhlib', 'sndhdr', 'cProfile'
           'ftplib', 'shlex', 'smtpd', 'email.utils', 'py_compile', 'imputils', 'bdb'
           'xml', 'xml.sax', 'xml.sax.saxutils', 'pkgutil', 'asyncore', 'commands', 'mimetools'
           'httplib', 'macurl2path', 'ntpath', 'pty', 'SimpleXMLRPCServer', 'optparse',
           'base64', 'threading', 'posixfile', 'mimetypes', 'pprint', 'DocXMLRPCServer'
           'platform', 'compiler.pyassem', 'compiler.pycodegen', 'compiler.symbols',
           'compiler', 'bsddb', 'tokenize', 'SocketServer', 'calendar', 'copy', 'dbhash',
           'encodings', 'runpy', 'sgmllib', 'poplib', 'decimal', 'xmllib', 'aifc', 'test',
           'code', 'tabnanny', 'keyword', 'inspect', 'formatter', 'doctest', 'mhlib', 'UserString',
           'token', 'email', 'json', 'telnetlib', 'BaseHTTPServer', 'StringIO', 'imputil', 'rfc822',
           'contextlib', 'quopri', 'pydoc', 'dis', 'wsgiref', 'modulefinder', 're', 'imp']

def uniq_id():
    try:
        from hashlib import md5
    except ImportError:
        import md5 as _md5
        md5 = _md5.new
    from time import time
    return md5(str(time())).hexdigest()

def check_env(env, modules):
    "prevent exec('import x'.replace('x', 'os'))"
    module_emsg = "For security reason you can't import '%s' module"
    fun_emsg = "For security reason you can't import functions from '%s' module"
    file_emsg = "For security reason you can't open files"
    for k, v in env.items():
        if type(v) == types.ModuleType and v.__name__ in modules:
            return module_emsg % v.__name__
        elif type(v) == types.FileType and not v.__class__ == StringIO:
            return file_emsg
        elif type(v) == types.BuiltinFunctionType and v.__module__ in modules:
            if v.__module__ == 'posix':
                module = 'os'
            elif v.__module__ == 'posixpath':
                module = 'path'
            else:
                module = v.__module__
            return fun_emsg % module

class Interpreter(object):
    def start(self):
        session_id = uniq_id()
        open('session_%s.py' % session_id, 'w')
        return session_id

    def info(self):
        import sys
        msg = 'Type "help", "copyright", "credits" or "license" for more information.'
        return "Python %s on %s\n%s" % (sys.version, sys.platform, msg)

    def evaluate(self, session_id, code):
        global modules
        try:
            def no_import(module):
                raise "For security reason you can't use __import__"
            env = {'__import__': no_import}
            session_file = 'session_%s.py' % session_id
            fake_stdout = StringIO()
            __stdout = sys.stdout
            
            sys.stdout = fake_stdout
            exec(open(session_file), env)
            #don's show output from privous session
            fake_stdout.seek(0)
            fake_stdout.truncate()
            ret = eval(code, env)
            result = fake_stdout.getvalue()
            sys.stdout = __stdout
            msg = check_env(env, modules)
            if msg:
                return msg
            if ret:
                result += str(ret)
            return result
        except:
            try:
                exec(code, env)
            except:
                sys.stdout = __stdout
                import traceback
                buff = StringIO()
                traceback.print_exc(file=buff)
                #don't show rpc stack
                stack = buff.getvalue().replace('"<string>"', '"<JSON-RPC>"').split('\n')
                return '\n'.join([stack[0]] + stack[3:])
            else:
                sys.stdout = __stdout
                msg = check_env(env, modules)
                if msg:
                    return msg
                open(session_file, 'a+').write('\n%s' % code)
                return fake_stdout.getvalue()
            
    
    def destroy(self, session_id):
        os.remove('session_%s.py' % session_id)

#from time import sleep
#sleep(4)

handle_cgi(Interpreter())


