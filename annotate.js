/*!
 * Annotate.js v1.0 Javascript Library
 * http://annotatejs.codeplex.com
 *
 * Copyright 2014 by Matthew Martin
 * Released under the MIT license
 * http://annotatejs.codeplex.comlicense
 *
 * Date: 2014-04-26
 */

(function ($) {

    var methods = {
        init: function (obj) {
            // Loop over all keys in the object and find any that contain a starting $
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    // $ means it's an annotation, so find the corresponding object
                    if (key.indexOf("$") === 0) {
                        var annKey = key.replace("$", "");
                        if (obj.hasOwnProperty(annKey)) {
                            var annObj = obj[key];

                            // First, ensure we have a corresponding HTML input
                            var input = $("#" + annKey);

                            if (input.length == 1) {

                                // Bind the value
                                if (obj[annKey])
                                    input.val(obj[annKey]);

                                // Label wrap
                                if (annObj.hasOwnProperty("label")) {
                                    input.wrap("<label>" + annObj["label"] + "</label>")
                                }

                                // Placeholder
                                if (annObj.hasOwnProperty("placeholder")) {
                                    input.attr("placeholder", annObj["placeholder"]);
                                }

                                // Required
                                if (annObj.hasOwnProperty("required") && annObj["required"] === true) {
                                    input.attr("required", "true");
                                }

                                // Autofocus
                                if (annObj.hasOwnProperty("autofocus") && annObj["autofocus"] === true) {
                                    input.attr("autofocus", "true");
                                    input.focus();
                                }

                                // Track state
                                input.on("keyup", function () {
                                    obj[$(this).attr("id")] = $(this).val();
                                });

                                // Validate when we lose focus
                                input.on("blur", function () {

                                    var $input = $(this);
                                    var val = $input.val();

                                    // Don't match empty strings, we'll let the required attribute handle that
                                    if (!val || val == "")
                                        return;

                                    var lclObj = obj["$" + $input.attr("id")];
                                    if (lclObj.validate) {
                                        var pattern = lclObj.pattern;
                                        var regexp = "";
                                        switch (pattern) {
                                            default:
                                                regexp = pattern;
                                                break;
                                            case 'alpha':
                                                regexp = /^[a-zA-Z ]*$/;
                                                break;
                                            case 'alphanumeric':
                                                regexp = /^[a-zA-Z0-9 ]*$/;
                                                break;
                                            case 'integer':
                                                regexp = /^d+$/;
                                                break;
                                            case 'money':
                                                regexp = /^\$?\d+(,\d{3})*(\.\d*)?$/;
                                                break;
                                            case 'number':
                                                regexp = /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/;
                                                break;
                                            case 'card':
                                                regexp = /[0-9]{13,19}|([0-9- ]{3,8}){3,6}/;
                                                break;
                                            case 'cvv':
                                                regexp = /^[0-9]{3,4}$/;
                                                break;
                                            case 'email':
                                                regexp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                                                break;
                                            case 'url':
                                                regexp = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
                                                break;
                                            case 'domain':
                                                regexp = /^(?!:\/\/)([a-zA-Z0-9]+\.)?[a-zA-Z0-9][a-zA-Z0-9-]+\.[a-zA-Z]{2,6}?$/i;
                                                break;
                                            case 'date':
                                                regexp = /^\d{2}[./-]\d{2}[./-]\d{4}$/;
                                                break;
                                            case 'time':
                                                regexp = /^(0?[1-9]|1[012])(:[0-5]\d) [APap][mM]$/;
                                                break;
                                            case 'color':
                                                regexp = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;
                                                break;
                                            case 'phone':
                                                regexp = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/
                                                break;
                                        }

                                        // If we don't match and have an error class, wrap the input
                                        if (!val.match(regexp)) {
                                            // Always set this so the user can do their own validation if they want
                                            $input.attr("invalid", "true");
                                            $input.parent().find(".error").remove();
                                            if (lclObj.errorClass) {
                                                var message = lclObj.errorMessage ? lclObj.errorMessage : lclObj.label + (lclObj.required ? " is required " : "") + " and should be (a/an) " + lclObj.pattern + ".";
                                                $input.after("<span class='" + lclObj.errorClass + "'>" + message + "</span>")
                                            }
                                        }
                                        else {
                                            $input.removeAttr("invalid");
                                            if (lclObj.errorClass) {
                                                $input.parent().find(".error").remove();
                                            }
                                        }
                                    }
                                });
                            }

                        }
                    }
                }
            }
        }
    };

    $.fn.annotate = function (opts) {
        if (methods[opts]) {
            return methods[opts].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof opts === 'object' || !opts) {
            // Default to "init"
            return methods.init.apply(this, arguments);
        } else {
            return;
        }
    };
})(jQuery);