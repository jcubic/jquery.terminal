/**@license
 *       __ _____                     ________                              __
 *      / // _  /__ __ _____ ___ __ _/__  ___/__ ___ ______ __ __  __ ___  / /
 *  __ / // // // // // _  // _// // / / // _  // _//     // //  \/ // _ \/ /
 * /  / // // // // // ___// / / // / / // ___// / / / / // // /\  // // / /__
 * \___//____ \\___//____//_/ _\_  / /_//____//_/ /_/ /_//_//_/ /_/ \__\_\___/
 *           \/              /____/                              version 2.34.0
 *
 * This file is part of jQuery Terminal. https://terminal.jcubic.pl
 *
 * Copyright (c) 2010-2021 Jakub T. Jankiewicz <https://jcubic.pl/m>e
 * Released under the MIT license
 */
/* global jQuery */
(function() {
    function get(url) {
        var element;
        if (url.match(/css$/)) {
            element = document.createElement('link');
            element.setAttribute('href', url);
            element.setAttribute('rel', 'stylesheet');
        } else if (url.match(/js$/)) {
            element = document.createElement('script');
            element.setAttribute('src', url);
        }
        console.log(element);
        return new Promise(function(resolve, reject) {
            console.log(element);
            if (element) {
                element.onload = resolve;
                var head = document.querySelector('head');
                head.appendChild(element);
            } else {
                reject();
            }
        });
    }
    var terminals = window.terminals || [];
    if (typeof jQuery === 'undefined') {
        get('http://code.jquery.com/jquery-3.5.0.min.js').then(function() {
            jQuery.noConflict();
            get('https://cdnjs.cloudflare.com/ajax/libs/jquery.terminal/2.34.0/css/jquery.terminal.min.css');
            return get('https://cdnjs.cloudflare.com/ajax/libs/jquery.terminal/2.34.0/js/jquery.terminal.min.js');
        }).then(function() {
            terminals.forEach(function(spec) {
                jQuery.fn.terminal.apply(jQuery(spec[0]), spec.slice(1));
            });
        });
    }
})();
