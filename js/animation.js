/**@license
 *       __ _____                     ________                              __
 *      / // _  /__ __ _____ ___ __ _/__  ___/__ ___ ______ __ __  __ ___  / /
 *  __ / // // // // // _  // _// // / / // _  // _//     // //  \/ // _ \/ /
 * /  / // // // // // ___// / / // / / // ___// / / / / // // /\  // // / /__
 * \___//____ \\___//____//_/ _\_  / /_//____//_/ /_/ /_//_//_/ /_/ \__\_\___/
 *           \/              /____/
 * http://terminal.jcubic.pl
 *
 * This file is part of jQuery Terminal that create base class for animation
 *
 * Copyright (c) 2014-2021 Jakub Jankiewicz <https://jcubic.pl/me>
 * Released under the MIT license
 *
 */
/* global define */
(function(factory) {
    var root;
    if (typeof window !== 'undefined') {
        root = window;
    } else if (typeof self !== 'undefined') {
        root = self;
    } else if (typeof global !== 'undefined') {
        root = global;
    } else {
        throw new Error('Unknow context');
    }
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        // istanbul ignore next
        define(['jquery', 'jquery.terminal'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = function(root, jQuery) {
            if (jQuery === undefined) {
                // require('jQuery') returns a factory that requires window to
                // build a jQuery instance, we normalize how we use modules
                // that require this pattern but the window provided is a noop
                // if it's defined (how jquery works)
                if (typeof window !== 'undefined') {
                    jQuery = require('jquery');
                } else {
                    jQuery = require('jquery')(root);
                }
            }
            if (!jQuery.fn.terminal) {
                if (typeof window !== 'undefined') {
                    require('jquery.terminal');
                } else {
                    require('jquery.terminal')(jQuery);
                }
            }
            factory(jQuery);
            return jQuery;
        };
    } else {
        // Browser
        // istanbul ignore next
        factory(root.jQuery);
    }
})(function($) {
    class Renderer {
        /* eslint-disable no-unused-vars */
        constructor(render, {
            color = '#cccccc',
            background = 'black',
            font = 'monospace',
            char = {width: 7, height: 14}
        } = {}) {
        /* eslint-enable no-unused-vars */
            this._options = {
                background,
                color,
                char
            };
            this._render = render;
        }
        option(arg, value) {
            if (typeof arg === 'object') {
                Object.assign(this._options, arg);
            } else if (typeof value === 'undefined') {
                return this._options[arg];
            } else {
                this._options[arg] = value;
            }
        }
        render() {
            const char = this.option('char');
            const lines = this._render();
            const max = Math.max(...lines.map(l => l.length));
            const width = max * char.width;
            const size = char.height;
            const height = lines.length * size;
            this.clear({width, height});
            for (let line = 0; line < lines.length; ++line) {
                const text = lines[line];
                this.line(text, 0, size * line);
            }
        }
        /* eslint-disable no-unused-vars */
        line(text, x, y) {
            throw new Error('Renderer::line invalid Invocation');
        }
        clear({width, height, size} = {}) {
            throw new Error('Renderer::clear invalid Invocation');
        }
        /* eslint-enable no-unused-vars */
    }

    // -----------------------------------------------------------------------------------
    class CanvasRenderer extends Renderer {
        constructor(render, options = {}) {
            super(render, options);
            var $canvas = $('<canvas/>');
            this.canvas = $canvas[0];
            this.ctx = this.canvas.getContext('2d');
        }
        clear({width, height}) {
            this.canvas.width = width;
            this.canvas.height = height;
            this.ctx.fillStyle = this.option('background');
            this.ctx.fillRect(0, 0, width, height);
            this.ctx.font = `1em ${this.option('font')}`;
            this.ctx.textBaseline = 'hanging';
            this.ctx.fillStyle = this.option('color');
        }
        line(text, x, y) {
            this.ctx.fillText(text, x, y);
        }
    }

    // -----------------------------------------------------------------------------------
    class Animation {
        constructor(fps = null, renderer = CanvasRenderer) {
            this._fps = fps;
            this._Renderer = renderer;
        }
        start(term) {
            this.renderer = new this._Renderer(() => this.render(term));
            term.echo(this.renderer.canvas, {
                onClear: () => {
                    this.stop();
                    this.unmount();
                },
                finalize: (div) => {
                    div.addClass('animation');
                    this.mount(div);
                }
            });

            var self = this;
            self.run = true;
            const delay = self._fps === null ? null : 1000 / self._fps;
            (function loop() {
                if (self.run) {
                    var style = getComputedStyle(term[0]);
                    var color = style.getPropertyValue('--color') || '#cccccc';
                    var background = style.getPropertyValue('--background') || 'black';
                    var font = style.getPropertyValue('--font') || 'monospace';
                    self.renderer.option({
                        char: term.geometry().char,
                        background,
                        font,
                        color
                    });
                    self.renderer.render();
                    if (delay === null) {
                        requestAnimationFrame(loop);
                    } else {
                        setTimeout(loop, delay);
                    }
                }
            })();
        }
        stop() {
            this.run = false;
        }
        /* eslint-disable no-unused-vars */
        render(term) {
            throw new Error('Animation::render You need to overwrite this method');
        }
        /* eslint-enable no-unused-vars */
        /* eslint-disable no-empty-function */
        mount() { }
        unmount() { }
        /* eslint-enable no-empty-function */
    }

    // -----------------------------------------------------------------------------------
    class FramesAnimation extends Animation {
        constructor(frames, ...args) {
            super(...args);
            this._i = 0;
            this._frames = frames;
            this._max = frames.length - 1;
        }
        render() {
            if (this._i >= this._max) {
                this._i = 0;
            } else {
                this._i++;
            }
            return this._frames[this._i];
        }
    }

    $.terminal.Renderer = Renderer;
    $.terminal.CanvasRenderer = CanvasRenderer;
    $.terminal.Animation = Animation;
    $.terminal.FramesAnimation = FramesAnimation;
});
