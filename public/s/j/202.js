if (jQuery)(function(a) {
    a.extend(a.fn, {
        selectBox: function(b, c) {
            var d, e = '',
                f = navigator.platform.match(/mac/i);
            var g = function(b, c) {
                var d;
                if (navigator.userAgent.match(/iPad|iPhone|Android|IEMobile|BlackBerry/i)) return false;
                if (b.tagName.toLowerCase() !== 'select') return false;
                b = a(b);
                if (b.data('selectBox-control')) return false;
                var e = a('<a class="selectBox" />'),
                    f = b.attr('multiple') || parseInt(b.attr('size')) > 1;
                var g = c || {};
                e.width(b.outerWidth()).addClass(b.attr('class')).attr('title', b.attr('title') || '').attr('tabindex', parseInt(b.attr('tabindex'))).css('display', 'inline-block').bind('focus.selectBox', function() {
                    if (this !== document.activeElement && document.body !== document.activeElement) a(document.activeElement).blur();
                    if (e.hasClass('selectBox-active')) return;
                    e.addClass('selectBox-active');
                    b.trigger('focus');
                }).bind('blur.selectBox', function() {
                    if (!e.hasClass('selectBox-active')) return;
                    e.removeClass('selectBox-active');
                    b.trigger('blur');
                });
                if (!a(window).data('selectBox-bindings')) a(window).data('selectBox-bindings', true).bind('scroll.selectBox', o).bind('resize.selectBox', o);
                if (b.attr('disabled')) e.addClass('selectBox-disabled');
                b.bind('click.selectBox', function(a) {
                    e.focus();
                    a.preventDefault();
                });
                if (f) {
                    d = h(b, 'inline');
                    e.append(d).data('selectBox-options', d).addClass('selectBox-inline selectBox-menuShowing').bind('keydown.selectBox', function(a) {
                        t(b, a);
                    }).bind('keypress.selectBox', function(a) {
                        u(b, a);
                    }).bind('mousedown.selectBox', function(b) {
                        if (a(b.target).is('A.selectBox-inline')) b.preventDefault();
                        if (!e.hasClass('selectBox-focus')) e.focus();
                    }).insertAfter(b);
                    if (!b[0].style.height) {
                        var k = b.attr('size') ? parseInt(b.attr('size')) : 5;
                        var l = e.clone().removeAttr('id').css({
                            position: 'absolute',
                            top: '-9999em'
                        }).show().appendTo('body');
                        l.find('.selectBox-options').html('<li><a>\u00A0</a></li>');
                        var m = parseInt(l.find('.selectBox-options A:first').html('&nbsp;').outerHeight());
                        l.remove();
                        e.height(m * k);
                    }
                    z(e);
                } else {
                    var p = a('<span class="selectBox-label" />'),
                        q = a('<span class="selectBox-arrow" />');
                    p.attr('class', i(b)).text(j(b));
                    d = h(b, 'dropdown');
                    d.appendTo('BODY');
                    e.data('selectBox-options', d).addClass('selectBox-dropdown').append(p).append(q).bind('mousedown.selectBox', function(a) {
                        if (e.hasClass('selectBox-menuShowing')) o();
                        else {
                            a.stopPropagation();
                            d.data('selectBox-down-at-x', a.screenX).data('selectBox-down-at-y', a.screenY);
                            n(b);
                        }
                    }).bind('keydown.selectBox', function(a) {
                        t(b, a);
                    }).bind('keypress.selectBox', function(a) {
                        u(b, a);
                    }).bind('open.selectBox', function(a, c) {
                        if (c && c._selectBox === true) return;
                        n(b);
                    }).bind('close.selectBox', function(a, b) {
                        if (b && b._selectBox === true) return;
                        o();
                    }).insertAfter(b);
                    var r = e.width() - q.outerWidth() - parseInt(p.css('paddingLeft')) - parseInt(p.css('paddingLeft'));
                    p.width(r);
                    z(e);
                }
                b.addClass('selectBox').data('selectBox-control', e).data('selectBox-settings', g).hide();
            };
            var h = function(b, c) {
                var d;
                var e = function(b, c) {
                    b.children('OPTION, OPTGROUP').each(function() {
                        if (a(this).is('OPTION'))
                            if (a(this).length > 0) A(a(this), c);
                            else c.append('<li>\u00A0</li>');
                        else {
                            var b = a('<li class="selectBox-optgroup" />');
                            b.text(a(this).attr('label'));
                            c.append(b);
                            c = e(a(this), c);
                        }
                    });
                    return c;
                };
                switch (c) {
                    case 'inline':
                        d = a('<ul class="selectBox-options" />');
                        d = e(b, d);
                        d.find('A').bind('mouseover.selectBox', function(c) {
                            q(b, a(this).parent());
                        }).bind('mouseout.selectBox', function(c) {
                            r(b, a(this).parent());
                        }).bind('mousedown.selectBox', function(a) {
                            a.preventDefault();
                            if (!b.selectBox('control').hasClass('selectBox-active')) b.selectBox('control').focus();
                        }).bind('mouseup.selectBox', function(c) {
                            o();
                            p(b, a(this).parent(), c);
                        });
                        z(d);
                        return d;
                    case 'dropdown':
                        d = a('<ul class="selectBox-dropdown-menu selectBox-options" />');
                        d = e(b, d);
                        d.data('selectBox-select', b).css('display', 'none').appendTo('BODY').find('A').bind('mousedown.selectBox', function(a) {
                            a.preventDefault();
                            if (a.screenX === d.data('selectBox-down-at-x') && a.screenY === d.data('selectBox-down-at-y')) {
                                d.removeData('selectBox-down-at-x').removeData('selectBox-down-at-y');
                                o();
                            }
                        }).bind('mouseup.selectBox', function(c) {
                            if (c.screenX === d.data('selectBox-down-at-x') && c.screenY === d.data('selectBox-down-at-y')) return;
                            else d.removeData('selectBox-down-at-x').removeData('selectBox-down-at-y');
                            p(b, a(this).parent());
                            o();
                        }).bind('mouseover.selectBox', function(c) {
                            q(b, a(this).parent());
                        }).bind('mouseout.selectBox', function(c) {
                            r(b, a(this).parent());
                        });
                        var f = b.attr('class') || '';
                        if (f !== '') {
                            f = f.split(' ');
                            for (var g in f) d.addClass(f[g] + '-selectBox-dropdown-menu');
                        }
                        z(d);
                        return d;
                }
            };
            var i = function(b) {
                var c = a(b).find('OPTION:selected');
                return ('selectBox-label ' + (c.attr('class') || '')).replace(/\s+$/, '');
            };
            var j = function(b) {
                var c = a(b).find('OPTION:selected');
                return c.text() || '\u00A0';
            };
            var k = function(b) {
                b = a(b);
                var c = b.data('selectBox-control');
                if (!c) return;
                c.find('.selectBox-label').attr('class', i(b)).text(j(b));
            };
            var l = function(b) {
                b = a(b);
                var c = b.data('selectBox-control');
                if (!c) return;
                var d = c.data('selectBox-options');
                d.remove();
                c.remove();
                b.removeClass('selectBox').removeData('selectBox-control').data('selectBox-control', null).removeData('selectBox-settings').data('selectBox-settings', null).show();
            };
            var m = function(b) {
                b = a(b);
                b.selectBox('options', b.html());
            };
            var n = function(b) {
                b = a(b);
                var c = b.data('selectBox-control'),
                    d = b.data('selectBox-settings'),
                    e = c.data('selectBox-options');
                if (c.hasClass('selectBox-disabled')) return false;
                o();
                var f = isNaN(c.css('borderBottomWidth')) ? 0 : parseInt(c.css('borderBottomWidth'));
                e.width(c.innerWidth()).css({
                    top: c.offset().top + c.outerHeight() - f,
                    left: c.offset().left
                });
                if (b.triggerHandler('beforeopen')) return false;
                var g = function() {
                    b.triggerHandler('open', {
                        _selectBox: true
                    });
                };
                switch (d.menuTransition) {
                    case 'fade':
                        e.fadeIn(d.menuSpeed, g);
                        break;
                    case 'slide':
                        e.slideDown(d.menuSpeed, g);
                        break;
                    default:
                        e.show(d.menuSpeed, g);
                        break;
                }
                if (!d.menuSpeed) g();
                var h = e.find('.selectBox-selected:first');
                s(b, h, true);
                q(b, h);
                c.addClass('selectBox-menuShowing');
                a(document).bind('mousedown.selectBox', function(b) {
                    if (a(b.target).parents().andSelf().hasClass('selectBox-options')) return;
                    o();
                });
            };
            var o = function() {
                if (a(".selectBox-dropdown-menu:visible").length === 0) return;
                a(document).unbind('mousedown.selectBox');
                a(".selectBox-dropdown-menu").each(function() {
                    var b = a(this),
                        c = b.data('selectBox-select'),
                        d = c.data('selectBox-control'),
                        e = c.data('selectBox-settings');
                    if (c.triggerHandler('beforeclose')) return false;
                    var f = function() {
                        c.triggerHandler('close', {
                            _selectBox: true
                        });
                    };
                    if (e) {
                        switch (e.menuTransition) {
                            case 'fade':
                                b.fadeOut(e.menuSpeed, f);
                                break;
                            case 'slide':
                                b.slideUp(e.menuSpeed, f);
                                break;
                            default:
                                b.hide(e.menuSpeed, f);
                                break;
                        }
                        if (!e.menuSpeed) f();
                        d.removeClass('selectBox-menuShowing');
                    } else {
                        a(this).hide();
                        a(this).triggerHandler('close', {
                            _selectBox: true
                        });
                        a(this).removeClass('selectBox-menuShowing');
                    }
                });
            };
            var p = function(b, c, d) {
                b = a(b);
                c = a(c);
                var e = b.data('selectBox-control'),
                    g = b.data('selectBox-settings');
                if (e.hasClass('selectBox-disabled')) return false;
                if (c.length === 0 || c.hasClass('selectBox-disabled')) return false;
                if (b.attr('multiple'))
                    if (d.shiftKey && e.data('selectBox-last-selected')) {
                        c.toggleClass('selectBox-selected');
                        var h;
                        if (c.index() > e.data('selectBox-last-selected').index()) h = c.siblings().slice(e.data('selectBox-last-selected').index(), c.index());
                        else h = c.siblings().slice(c.index(), e.data('selectBox-last-selected').index());
                        h = h.not('.selectBox-optgroup, .selectBox-disabled');
                        if (c.hasClass('selectBox-selected')) h.addClass('selectBox-selected');
                        else h.removeClass('selectBox-selected');
                    } else if ((f && d.metaKey) || (!f && d.ctrlKey)) c.toggleClass('selectBox-selected');
                else {
                    c.siblings().removeClass('selectBox-selected');
                    c.addClass('selectBox-selected');
                } else {
                    c.siblings().removeClass('selectBox-selected');
                    c.addClass('selectBox-selected');
                }
                if (e.hasClass('selectBox-dropdown')) e.find('.selectBox-label').text(c.text());
                var i = 0,
                    j = [];
                if (b.attr('multiple')) e.find('.selectBox-selected A').each(function() {
                    j[i++] = a(this).attr('rel');
                });
                else j = c.find('A').attr('rel');
                e.data('selectBox-last-selected', c);
                if (b.val() !== j) {
                    b.val(j);
                    k(b);
                    b.trigger('change');
                }
                return true;
            };
            var q = function(b, c) {
                b = a(b);
                c = a(c);
                var d = b.data('selectBox-control'),
                    e = d.data('selectBox-options');
                e.find('.selectBox-hover').removeClass('selectBox-hover');
                c.addClass('selectBox-hover');
            };
            var r = function(b, c) {
                b = a(b);
                c = a(c);
                var d = b.data('selectBox-control'),
                    e = d.data('selectBox-options');
                e.find('.selectBox-hover').removeClass('selectBox-hover');
            };
            var s = function(b, c, d) {
                if (!c || c.length === 0) return;
                b = a(b);
                var e = b.data('selectBox-control'),
                    f = e.data('selectBox-options'),
                    g = e.hasClass('selectBox-dropdown') ? f : f.parent(),
                    h = parseInt(c.offset().top - g.position().top),
                    i = parseInt(h + c.outerHeight());
                if (d) g.scrollTop(c.offset().top - g.offset().top + g.scrollTop() - (g.height() / 2));
                else {
                    if (h < 0) g.scrollTop(c.offset().top - g.offset().top + g.scrollTop());
                    if (i > g.height()) g.scrollTop((c.offset().top + c.outerHeight()) - g.offset().top + g.scrollTop() - g.height());
                }
            };
            var t = function(b, c) {
                b = a(b);
                var d = b.data('selectBox-control'),
                    f = d.data('selectBox-options'),
                    g = b.data('selectBox-settings'),
                    h = 0,
                    i = 0;
                if (d.hasClass('selectBox-disabled')) return;
                switch (c.keyCode) {
                    case 8:
                        c.preventDefault();
                        e = '';
                        break;
                    case 9:
                    case 27:
                        o();
                        r(b);
                        break;
                    case 13:
                        if (d.hasClass('selectBox-menuShowing')) {
                            p(b, f.find('LI.selectBox-hover:first'), c);
                            if (d.hasClass('selectBox-dropdown')) o();
                        } else n(b);
                        break;
                    case 38:
                    case 37:
                        c.preventDefault();
                        if (d.hasClass('selectBox-menuShowing')) {
                            var j = f.find('.selectBox-hover').prev('LI');
                            h = f.find('LI:not(.selectBox-optgroup)').length;
                            i = 0;
                            while (j.length === 0 || j.hasClass('selectBox-disabled') || j.hasClass('selectBox-optgroup')) {
                                j = j.prev('LI');
                                if (j.length === 0)
                                    if (g.loopOptions) j = f.find('LI:last');
                                    else j = f.find('LI:first');
                                if (++i >= h) break;
                            }
                            q(b, j);
                            p(b, j, c);
                            s(b, j);
                        } else n(b);
                        break;
                    case 40:
                    case 39:
                        c.preventDefault();
                        if (d.hasClass('selectBox-menuShowing')) {
                            var k = f.find('.selectBox-hover').next('LI');
                            h = f.find('LI:not(.selectBox-optgroup)').length;
                            i = 0;
                            while (k.length === 0 || k.hasClass('selectBox-disabled') || k.hasClass('selectBox-optgroup')) {
                                k = k.next('LI');
                                if (k.length === 0)
                                    if (g.loopOptions) k = f.find('LI:first');
                                    else k = f.find('LI:last');
                                if (++i >= h) break;
                            }
                            q(b, k);
                            p(b, k, c);
                            s(b, k);
                        } else n(b);
                        break;
                }
            };
            var u = function(b, c) {
                b = a(b);
                var f = b.data('selectBox-control'),
                    g = f.data('selectBox-options');
                if (f.hasClass('selectBox-disabled')) return;
                switch (c.keyCode) {
                    case 9:
                    case 27:
                    case 13:
                    case 38:
                    case 37:
                    case 40:
                    case 39:
                        break;
                    default:
                        if (!f.hasClass('selectBox-menuShowing')) n(b);
                        c.preventDefault();
                        clearTimeout(d);
                        e += String.fromCharCode(c.charCode || c.keyCode);
                        g.find('A').each(function() {
                            if (a(this).text().substr(0, e.length).toLowerCase() === e.toLowerCase()) {
                                q(b, a(this).parent());
                                s(b, a(this).parent());
                                return false;
                            }
                        });
                        d = setTimeout(function() {
                            e = '';
                        }, 1000);
                        break;
                }
            };
            var v = function(b) {
                b = a(b);
                b.attr('disabled', false);
                var c = b.data('selectBox-control');
                if (!c) return;
                c.removeClass('selectBox-disabled');
            };
            var w = function(b) {
                b = a(b);
                b.attr('disabled', true);
                var c = b.data('selectBox-control');
                if (!c) return;
                c.addClass('selectBox-disabled');
            };
            var x = function(b, c) {
                b = a(b);
                b.val(c);
                c = b.val();
                if (c === null) {
                    c = b.children().first().val();
                    b.val(c);
                }
                var d = b.data('selectBox-control');
                if (!d) return;
                var e = b.data('selectBox-settings'),
                    f = d.data('selectBox-options');
                k(b);
                f.find('.selectBox-selected').removeClass('selectBox-selected');
                f.find('A').each(function() {
                    if (typeof c === 'object') {
                        for (var b = 0; b < c.length; b++)
                            if (a(this).attr('rel') == c[b]) a(this).parent().addClass('selectBox-selected');
                    } else if (a(this).attr('rel') == c) a(this).parent().addClass('selectBox-selected');
                });
                if (e.change) e.change.call(b);
            };
            var y = function(b, d) {
                b = a(b);
                var e = b.data('selectBox-control'),
                    f = b.data('selectBox-settings');
                switch (typeof c) {
                    case 'string':
                        b.html(c);
                        break;
                    case 'object':
                        b.html('');
                        for (var g in c) {
                            if (c[g] === null) continue;
                            if (typeof c[g] === 'object') {
                                var i = a('<optgroup label="' + g + '" />');
                                for (var j in c[g]) i.append('<option value="' + j + '">' + c[g][j] + '</option>');
                                b.append(i);
                            } else {
                                var l = a('<option value="' + g + '">' + c[g] + '</option>');
                                b.append(l);
                            }
                        }
                        break;
                }
                if (!e) return;
                e.data('selectBox-options').remove();
                var m = e.hasClass('selectBox-dropdown') ? 'dropdown' : 'inline';
                d = h(b, m);
                e.data('selectBox-options', d);
                switch (m) {
                    case 'inline':
                        e.append(d);
                        break;
                    case 'dropdown':
                        k(b);
                        a("BODY").append(d);
                        break;
                }
            };
            var z = function(b) {
                a(b).css('MozUserSelect', 'none').bind('selectstart', function(a) {
                    a.preventDefault();
                });
            };
            var A = function(b, c) {
                var d = a('<li />'),
                    e = a('<a />');
                d.addClass(b.attr('class'));
                d.data(b.data());
                e.attr('rel', b.val()).text(b.text());
                d.append(e);
                if (b.attr('disabled')) d.addClass('selectBox-disabled');
                if (b.attr('selected')) d.addClass('selectBox-selected');
                c.append(d);
            };
            switch (b) {
                case 'control':
                    return a(this).data('selectBox-control');
                case 'settings':
                    if (!c) return a(this).data('selectBox-settings');
                    a(this).each(function() {
                        a(this).data('selectBox-settings', a.extend(true, a(this).data('selectBox-settings'), c));
                    });
                    break;
                case 'options':
                    if (c === undefined) return a(this).data('selectBox-control').data('selectBox-options');
                    a(this).each(function() {
                        y(this, c);
                    });
                    break;
                case 'value':
                    if (c === undefined) return a(this).val();
                    a(this).each(function() {
                        x(this, c);
                    });
                    break;
                case 'refresh':
                    a(this).each(function() {
                        m(this);
                    });
                    break;
                case 'enable':
                    a(this).each(function() {
                        v(this);
                    });
                    break;
                case 'disable':
                    a(this).each(function() {
                        w(this);
                    });
                    break;
                case 'destroy':
                    a(this).each(function() {
                        l(this);
                    });
                    break;
                default:
                    a(this).each(function() {
                        g(this, b);
                    });
                    break;
            }
            return a(this);
        }
    });
})(jQuery);

function a(a, b) {
    var c = document.createElement(a);
    if (b in c) return true;
    else return false;
};
$(document).ready(function() {
    if (!a('textarea', 'placeholder')) {
        $("input:text").each(b).blur(b).focus(c);

        function b() {
            var a = $(this);
            var b = a.attr("placeholder");
            if (a.val() === "" || a.val() === b) a.val(b);
        };

        function c() {
            var a = $(this);
            if (a.val() === a.attr("placeholder")) a.val("");
        }
    }
});
var LiveValidation = function(B, A) {
    this.initialize(B, A);
};
LiveValidation.VERSION = "1.3 standalone";
LiveValidation.TEXTAREA = 1;
LiveValidation.TEXT = 2;
LiveValidation.PASSWORD = 3;
LiveValidation.CHECKBOX = 4;
LiveValidation.SELECT = 5;
LiveValidation.FILE = 6;
LiveValidation.massValidate = function(C) {
    var D = true;
    for (var B = 0, A = C.length; B < A; ++B) {
        var E = C[B].validate();
        if (D) D = E;
    }
    return D;
};
LiveValidation.prototype = {
    validClass: "LV_valid",
    invalidClass: "LV_invalid",
    messageClass: "LV_validation_message",
    validFieldClass: "LV_valid_field",
    invalidFieldClass: "LV_invalid_field",
    initialize: function(D, C) {
        var A = this;
        if (!D) throw new Error("LiveValidation::initialize - No element reference or element id has been provided!");
        this.element = D.nodeName ? D : document.getElementById(D);
        if (!this.element) throw new Error("LiveValidation::initialize - No element with reference or id of '" + D + "' exists!");
        this.validations = [];
        this.elementType = this.getElementType();
        this.form = this.element.form;
        var B = C || {};
        this.validMessage = B.validMessage || "OK";
        var E = B.insertAfterWhatNode || this.element;
        this.insertAfterWhatNode = E.nodeType ? E : document.getElementById(E);
        this.onValid = B.onValid || function() {
            this.insertMessage(this.createMessageSpan());
            this.addFieldClass();
        };
        this.onInvalid = B.onInvalid || function() {
            this.insertMessage(this.createMessageSpan());
            this.addFieldClass();
        };
        this.onlyOnBlur = B.onlyOnBlur || false;
        this.wait = B.wait || 0;
        this.onlyOnSubmit = B.onlyOnSubmit || false;
        if (this.form) {
            this.formObj = LiveValidationForm.getInstance(this.form);
            this.formObj.addField(this);
        }
        this.oldOnFocus = this.element.onfocus || function() {};
        this.oldOnBlur = this.element.onblur || function() {};
        this.oldOnClick = this.element.onclick || function() {};
        this.oldOnChange = this.element.onchange || function() {};
        this.oldOnKeyup = this.element.onkeyup || function() {};
        this.element.onfocus = function(F) {
            A.doOnFocus(F);
            return A.oldOnFocus.call(this, F);
        };
        if (!this.onlyOnSubmit) switch (this.elementType) {
            case LiveValidation.CHECKBOX:
                this.element.onclick = function(F) {
                    A.validate();
                    return A.oldOnClick.call(this, F);
                };
            case LiveValidation.SELECT:
            case LiveValidation.FILE:
                this.element.onchange = function(F) {
                    A.validate();
                    return A.oldOnChange.call(this, F);
                };
                break;
            default:
                if (!this.onlyOnBlur) this.element.onkeyup = function(F) {
                    A.deferValidation();
                    return A.oldOnKeyup.call(this, F);
                };
                this.element.onblur = function(F) {
                    A.doOnBlur(F);
                    return A.oldOnBlur.call(this, F);
                };
        }
    },
    destroy: function() {
        if (this.formObj) {
            this.formObj.removeField(this);
            this.formObj.destroy();
        }
        this.element.onfocus = this.oldOnFocus;
        if (!this.onlyOnSubmit) switch (this.elementType) {
            case LiveValidation.CHECKBOX:
                this.element.onclick = this.oldOnClick;
            case LiveValidation.SELECT:
            case LiveValidation.FILE:
                this.element.onchange = this.oldOnChange;
                break;
            default:
                if (!this.onlyOnBlur) this.element.onkeyup = this.oldOnKeyup;
                this.element.onblur = this.oldOnBlur;
        }
        this.validations = [];
        this.removeMessageAndFieldClass();
    },
    add: function(A, B) {
        this.validations.push({
            type: A,
            params: B || {}
        });
        return this;
    },
    remove: function(B, D) {
        var E = false;
        for (var C = 0, A = this.validations.length; C < A; C++)
            if (this.validations[C].type == B)
                if (this.validations[C].params == D) {
                    E = true;
                    break;
                }
        if (E) this.validations.splice(C, 1);
        return this;
    },
    deferValidation: function(B) {
        if (this.wait >= 300) this.removeMessageAndFieldClass();
        var A = this;
        if (this.timeout) clearTimeout(A.timeout);
        this.timeout = setTimeout(function() {
            A.validate();
        }, A.wait);
    },
    doOnBlur: function(A) {
        this.focused = false;
        this.validate(A);
    },
    doOnFocus: function(A) {
        this.focused = true;
        this.removeMessageAndFieldClass();
    },
    getElementType: function() {
        switch (true) {
            case (this.element.nodeName.toUpperCase() == "TEXTAREA"):
                return LiveValidation.TEXTAREA;
            case (this.element.nodeName.toUpperCase() == "INPUT" && this.element.type.toUpperCase() == "TEXT"):
                return LiveValidation.TEXT;
            case (this.element.nodeName.toUpperCase() == "INPUT" && this.element.type.toUpperCase() == "PASSWORD"):
                return LiveValidation.PASSWORD;
            case (this.element.nodeName.toUpperCase() == "INPUT" && this.element.type.toUpperCase() == "CHECKBOX"):
                return LiveValidation.CHECKBOX;
            case (this.element.nodeName.toUpperCase() == "INPUT" && this.element.type.toUpperCase() == "FILE"):
                return LiveValidation.FILE;
            case (this.element.nodeName.toUpperCase() == "SELECT"):
                return LiveValidation.SELECT;
            case (this.element.nodeName.toUpperCase() == "INPUT"):
                throw new Error("LiveValidation::getElementType - Cannot use LiveValidation on an " + this.element.type + " input!");
            default:
                throw new Error("LiveValidation::getElementType - Element must be an input, select, or textarea!");
        }
    },
    doValidations: function() {
        this.validationFailed = false;
        for (var C = 0, A = this.validations.length; C < A; ++C) {
            var B = this.validations[C];
            switch (B.type) {
                case Validate.Presence:
                case Validate.Confirmation:
                case Validate.Acceptance:
                    this.displayMessageWhenEmpty = true;
                    this.validationFailed = !this.validateElement(B.type, B.params);
                    break;
                default:
                    this.validationFailed = !this.validateElement(B.type, B.params);
                    break;
            }
            if (this.validationFailed) return false;
        }
        this.message = this.validMessage;
        return true;
    },
    validateElement: function(A, C) {
        var D = (this.elementType == LiveValidation.SELECT) ? this.element.options[this.element.selectedIndex].value : this.element.value;
        if (A == Validate.Acceptance) {
            if (this.elementType != LiveValidation.CHECKBOX) throw new Error("LiveValidation::validateElement - Element to validate acceptance must be a checkbox!");
            D = this.element.checked;
        }
        var E = true;
        try {
            A(D, C);
        } catch (B) {
            if (B instanceof Validate.Error) {
                if (D !== "" || (D === "" && this.displayMessageWhenEmpty)) {
                    this.validationFailed = true;
                    this.message = B.message;
                    E = false;
                }
            } else throw B;
        } finally {
            return E;
        }
    },
    validate: function() {
        if (!this.element.disabled) {
            var A = this.doValidations();
            if (A) {
                this.onValid();
                return true;
            } else {
                this.onInvalid();
                return false;
            }
        } else return true;
    },
    enable: function() {
        this.element.disabled = false;
        return this;
    },
    disable: function() {
        this.element.disabled = true;
        this.removeMessageAndFieldClass();
        return this;
    },
    createMessageSpan: function() {
        var A = document.createElement("span");
        var B = document.createTextNode(this.message);
        A.appendChild(B);
        return A;
    },
    insertMessage: function(B) {
        this.removeMessage();
        if ((this.displayMessageWhenEmpty && (this.elementType == LiveValidation.CHECKBOX || this.element.value == "")) || this.element.value != "") {
            var A = this.validationFailed ? this.invalidClass : this.validClass;
            B.className += " " + this.messageClass + " " + A;
            if (this.insertAfterWhatNode.nextSibling) this.insertAfterWhatNode.parentNode.insertBefore(B, this.insertAfterWhatNode.nextSibling);
            else this.insertAfterWhatNode.parentNode.appendChild(B);
        }
    },
    addFieldClass: function() {
        this.removeFieldClass();
        if (!this.validationFailed) {
            if (this.displayMessageWhenEmpty || this.element.value != "")
                if (this.element.className.indexOf(this.validFieldClass) == -1) this.element.className += " " + this.validFieldClass;
        } else if (this.element.className.indexOf(this.invalidFieldClass) == -1) this.element.className += " " + this.invalidFieldClass;
    },
    removeMessage: function() {
        var A;
        var B = this.insertAfterWhatNode;
        while (B.nextSibling) {
            if (B.nextSibling.nodeType === 1) {
                A = B.nextSibling;
                break;
            }
            B = B.nextSibling;
        }
        if (A && A.className.indexOf(this.messageClass) != -1) this.insertAfterWhatNode.parentNode.removeChild(A);
    },
    removeFieldClass: function() {
        if (this.element.className.indexOf(this.invalidFieldClass) != -1) this.element.className = this.element.className.split(this.invalidFieldClass).join("");
        if (this.element.className.indexOf(this.validFieldClass) != -1) this.element.className = this.element.className.split(this.validFieldClass).join(" ");
    },
    removeMessageAndFieldClass: function() {
        this.removeMessage();
        this.removeFieldClass();
    }
};
var LiveValidationForm = function(A) {
    this.initialize(A);
};
LiveValidationForm.instances = {};
LiveValidationForm.getInstance = function(A) {
    var B = Math.random() * Math.random();
    if (!A.id) A.id = "formId_" + B.toString().replace(/\./, "") + new Date().valueOf();
    if (!LiveValidationForm.instances[A.id]) LiveValidationForm.instances[A.id] = new LiveValidationForm(A);
    return LiveValidationForm.instances[A.id];
};
LiveValidationForm.prototype = {
    initialize: function(B) {
        this.name = B.id;
        this.element = B;
        this.fields = [];
        this.oldOnSubmit = this.element.onsubmit || function() {};
        var A = this;
        this.element.onsubmit = function(C) {
            return (LiveValidation.massValidate(A.fields)) ? A.oldOnSubmit.call(this, C || window.event) !== false : false;
        };
    },
    addField: function(A) {
        this.fields.push(A);
    },
    removeField: function(C) {
        var D = [];
        for (var B = 0, A = this.fields.length; B < A; B++)
            if (this.fields[B] !== C) D.push(this.fields[B]);
        this.fields = D;
    },
    destroy: function(A) {
        if (this.fields.length != 0 && !A) return false;
        this.element.onsubmit = this.oldOnSubmit;
        LiveValidationForm.instances[this.name] = null;
        return true;
    }
};
var Validate = {
    Presence: function(B, C) {
        var C = C || {};
        var A = C.failureMessage || "Can't be empty!";
        if (B === "" || B === null || B === undefined) Validate.fail(A);
        return true;
    },
    Numericality: function(J, E) {
        var A = J;
        var J = Number(J);
        var E = E || {};
        var F = ((E.minimum) || (E.minimum == 0)) ? E.minimum : null;
        var C = ((E.maximum) || (E.maximum == 0)) ? E.maximum : null;
        var D = ((E.is) || (E.is == 0)) ? E.is : null;
        var G = E.notANumberMessage || "Must be a number!";
        var H = E.notAnIntegerMessage || "Must be an integer!";
        var I = E.wrongNumberMessage || "Must be " + D + "!";
        var B = E.tooLowMessage || "Must not be less than " + F + "!";
        var K = E.tooHighMessage || "Must not be more than " + C + "!";
        if (!isFinite(J)) Validate.fail(G);
        if (E.onlyInteger && (/\.0+$|\.$/.test(String(A)) || J != parseInt(J))) Validate.fail(H);
        switch (true) {
            case (D !== null):
                if (J != Number(D)) Validate.fail(I);
                break;
            case (F !== null && C !== null):
                Validate.Numericality(J, {
                    tooLowMessage: B,
                    minimum: F
                });
                Validate.Numericality(J, {
                    tooHighMessage: K,
                    maximum: C
                });
                break;
            case (F !== null):
                if (J < Number(F)) Validate.fail(B);
                break;
            case (C !== null):
                if (J > Number(C)) Validate.fail(K);
                break;
        }
        return true;
    },
    Format: function(C, E) {
        var C = String(C);
        var E = E || {};
        var A = E.failureMessage || "Not valid!";
        var B = E.pattern || /./;
        var D = E.negate || false;
        if (!D && !B.test(C)) Validate.fail(A);
        if (D && B.test(C)) Validate.fail(A);
        return true;
    },
    Email: function(B, C) {
        var C = C || {};
        var A = C.failureMessage || "Must be a valid email address!";
        Validate.Format(B, {
            failureMessage: A,
            pattern: /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i
        });
        return true;
    },
    Length: function(F, G) {
        var F = String(F);
        var G = G || {};
        var E = ((G.minimum) || (G.minimum == 0)) ? G.minimum : null;
        var H = ((G.maximum) || (G.maximum == 0)) ? G.maximum : null;
        var C = ((G.is) || (G.is == 0)) ? G.is : null;
        var A = G.wrongLengthMessage || "Must be " + C + " characters long!";
        var B = G.tooShortMessage || "Must not be less than " + E + " characters long!";
        var D = G.tooLongMessage || "Must not be more than " + H + " characters long!";
        switch (true) {
            case (C !== null):
                if (F.length != Number(C)) Validate.fail(A);
                break;
            case (E !== null && H !== null):
                Validate.Length(F, {
                    tooShortMessage: B,
                    minimum: E
                });
                Validate.Length(F, {
                    tooLongMessage: D,
                    maximum: H
                });
                break;
            case (E !== null):
                if (F.length < Number(E)) Validate.fail(B);
                break;
            case (H !== null):
                if (F.length > Number(H)) Validate.fail(D);
                break;
            default:
                throw new Error("Validate::Length - Length(s) to validate against must be provided!");
        }
        return true;
    },
    Inclusion: function(H, F) {
        var F = F || {};
        var K = F.failureMessage || "Must be included in the list!";
        var G = (F.caseSensitive === false) ? false : true;
        if (F.allowNull && H == null) return true;
        if (!F.allowNull && H == null) Validate.fail(K);
        var D = F.within || [];
        if (!G) {
            var A = [];
            for (var C = 0, B = D.length; C < B; ++C) {
                var I = D[C];
                if (typeof I == "string") I = I.toLowerCase();
                A.push(I);
            }
            D = A;
            if (typeof H == "string") H = H.toLowerCase();
        }
        var J = false;
        for (var E = 0, B = D.length; E < B; ++E) {
            if (D[E] == H) J = true;
            if (F.partialMatch)
                if (H.indexOf(D[E]) != -1) J = true;
        }
        if ((!F.negate && !J) || (F.negate && J)) Validate.fail(K);
        return true;
    },
    Exclusion: function(A, B) {
        var B = B || {};
        B.failureMessage = B.failureMessage || "Must not be included in the list!";
        B.negate = true;
        Validate.Inclusion(A, B);
        return true;
    },
    Confirmation: function(C, D) {
        if (!D.match) throw new Error("Validate::Confirmation - Error validating confirmation: Id of element to match must be provided!");
        var D = D || {};
        var B = D.failureMessage || "Does not match!";
        var A = D.match.nodeName ? D.match : document.getElementById(D.match);
        if (!A) throw new Error("Validate::Confirmation - There is no reference with name of, or element with id of '" + D.match + "'!");
        if (C != A.value) Validate.fail(B);
        return true;
    },
    Acceptance: function(B, C) {
        var C = C || {};
        var A = C.failureMessage || "Must be accepted!";
        if (!B) Validate.fail(A);
        return true;
    },
    Custom: function(D, E) {
        var E = E || {};
        var B = E.against || function() {
            return true;
        };
        var A = E.args || {};
        var C = E.failureMessage || "Not valid!";
        if (!B(D, A)) Validate.fail(C);
        return true;
    },
    now: function(A, D, C) {
        if (!A) throw new Error("Validate::now - Validation function must be provided!");
        var E = true;
        try {
            A(D, C || {});
        } catch (B) {
            if (B instanceof Validate.Error) E = false;
            else throw B;
        } finally {
            return E;
        }
    },
    fail: function(A) {
        throw new Validate.Error(A);
    },
    Error: function(A) {
        this.message = A;
        this.name = "ValidationError";
    }
};;
(function(a) {
    a.fn.ajaxSubmit = function(b) {
        if (!this.length) {
            d('ajaxSubmit: skipping submit process - no element selected');
            return this;
        }
        var c, e, f, g = this;
        if (typeof b == 'function') b = {
            success: b
        };
        c = this.attr('method');
        e = this.attr('action');
        f = (typeof e === 'string') ? a.trim(e) : '';
        f = f || window.location.href || '';
        if (f) f = (f.match(/^([^#]+)/) || [])[1];
        b = a.extend(true, {
            url: f,
            success: a.ajaxSettings.success,
            type: c || 'GET',
            iframeSrc: /^https/i.test(window.location.href || '') ? 'javascript:false' : 'about:blank'
        }, b);
        var h = {};
        this.trigger('form-pre-serialize', [this, b, h]);
        if (h.veto) {
            d('ajaxSubmit: submit vetoed via form-pre-serialize trigger');
            return this;
        }
        if (b.beforeSerialize && b.beforeSerialize(this, b) === false) {
            d('ajaxSubmit: submit aborted via beforeSerialize callback');
            return this;
        }
        var i = b.traditional;
        if (i === undefined) i = a.ajaxSettings.traditional;
        var j, k, l, m = this.formToArray(b.semantic);
        if (b.data) {
            b.extraData = b.data;
            j = a.param(b.data, i);
        }
        if (b.beforeSubmit && b.beforeSubmit(m, this, b) === false) {
            d('ajaxSubmit: submit aborted via beforeSubmit callback');
            return this;
        }
        this.trigger('form-submit-validate', [m, this, b, h]);
        if (h.veto) {
            d('ajaxSubmit: submit vetoed via form-submit-validate trigger');
            return this;
        }
        var n = a.param(m, i);
        if (j) n = (n ? (n + '&' + j) : j);
        if (b.type.toUpperCase() == 'GET') {
            b.url += (b.url.indexOf('?') >= 0 ? '&' : '?') + n;
            b.data = null;
        } else b.data = n;
        var o = [];
        if (b.resetForm) o.push(function() {
            g.resetForm();
        });
        if (b.clearForm) o.push(function() {
            g.clearForm(b.includeHidden);
        });
        if (!b.dataType && b.target) {
            var p = b.success || function() {};
            o.push(function(c) {
                var d = b.replaceTarget ? 'replaceWith' : 'html';
                a(b.target)[d](c).each(p, arguments);
            });
        } else if (b.success) o.push(b.success);
        b.success = function(a, c, d) {
            var e = b.context || b;
            for (var f = 0, h = o.length; f < h; f++) o[f].apply(e, [a, c, d || g, g]);
        };
        var q = a('input:file:enabled[value]', this);
        var r = q.length > 0;
        var s = 'multipart/form-data';
        var t = (g.attr('enctype') == s || g.attr('encoding') == s);
        var u = !!(r && q.get(0).files && window.FormData);
        d("fileAPI :" + u);
        var v = (r || t) && !u;
        if (b.iframe !== false && (b.iframe || v))
            if (b.closeKeepAlive) a.get(b.closeKeepAlive, function() {
                x(m);
            });
            else x(m);
        else if ((r || t) && u) {
            b.progress = b.progress || a.noop;
            w(m);
        } else a.ajax(b);
        this.trigger('form-submit-notify', [this, b]);
        return this;

        function w(c) {
            var d = new FormData();
            for (var e = 0; e < c.length; e++) {
                if (c[e].type == 'file') continue;
                d.append(c[e].name, c[e].value);
            }
            g.find('input:file:enabled').each(function() {
                var b = a(this).attr('name'),
                    c = this.files;
                if (b)
                    for (var e = 0; e < c.length; e++) d.append(b, c[e]);
            });
            if (b.extraData)
                for (var f in b.extraData) d.append(f, b.extraData[f]);
            b.data = null;
            // var h = a.extend(true, {}, a.ajaxSettings, b, {
            //     contentType: false,
            //     processData: false,
            //     cache: false,
            //     type: 'POST'
            // });
            h.data = null;
            var i = h.beforeSend;
            h.beforeSend = function(a, c) {
                c.data = d;
                if (a.upload) a.upload.onprogress = function(a) {
                    c.progress(a.position, a.total);
                };
                if (i) i.call(c, a, b);
            };
            a.ajax(h);
        }

        function x(e) {
            var f = g[0],
                h, i, j, k, l, m, n, o, p, q, r, s;
            var t = !!a.fn.prop;
            if (e) {
                if (t)
                    for (i = 0; i < e.length; i++) {
                        h = a(f[e[i].name]);
                        h.prop('disabled', false);
                    } else
                        for (i = 0; i < e.length; i++) {
                            h = a(f[e[i].name]);
                            h.removeAttr('disabled');
                        };
            }
            if (a(':input[name=submit],:input[id=submit]', f).length) {
                alert('Error: Form elements must not have name or id of "submit".');
                return;
            }
            j = a.extend(true, {}, a.ajaxSettings, b);
            j.context = j.context || j;
            l = 'jqFormIO' + (new Date().getTime());
            if (j.iframeTarget) {
                m = a(j.iframeTarget);
                q = m.attr('name');
                if (q == null) m.attr('name', l);
                else l = q;
            } else {
                m = a('<iframe name="' + l + '" src="' + j.iframeSrc + '" />');
                m.css({
                    position: 'absolute',
                    top: '-1000px',
                    left: '-1000px'
                });
            }
            n = m[0];
            o = {
                aborted: 0,
                responseText: null,
                responseXML: null,
                status: 0,
                statusText: 'n/a',
                getAllResponseHeaders: function() {},
                getResponseHeader: function() {},
                setRequestHeader: function() {},
                abort: function(b) {
                    var c = (b === 'timeout' ? 'timeout' : 'aborted');
                    d('aborting upload... ' + c);
                    this.aborted = 1;
                    m.attr('src', j.iframeSrc);
                    o.error = c;
                    j.error && j.error.call(j.context, o, c, b);
                    k && a.event.trigger("ajaxError", [o, j, c]);
                    j.complete && j.complete.call(j.context, o, c);
                }
            };
            k = j.global;
            if (k && !a.active++) a.event.trigger("ajaxStart");
            if (k) a.event.trigger("ajaxSend", [o, j]);
            if (j.beforeSend && j.beforeSend.call(j.context, o, j) === false) {
                if (j.global) a.active--;
                return;
            }
            if (o.aborted) return;
            p = f.clk;
            if (p) {
                q = p.name;
                if (q && !p.disabled) {
                    j.extraData = j.extraData || {};
                    j.extraData[q] = p.value;
                    if (p.type == "image") {
                        j.extraData[q + '.x'] = f.clk_x;
                        j.extraData[q + '.y'] = f.clk_y;
                    }
                }
            }
            var u = 1;
            var v = 2;

            function w(a) {
                var b = a.contentWindow ? a.contentWindow.document : a.contentDocument ? a.contentDocument : a.document;
                return b;
            }
            var x = a('meta[name=csrf-token]').attr('content');
            var y = a('meta[name=csrf-param]').attr('content');
            if (y && x) {
                j.extraData = j.extraData || {};
                j.extraData[y] = x;
            }

            // function z() {
            //     var b = g.attr('target'),
            //         e = g.attr('action');
            //     f.setAttribute('target', l);
            //     if (!c) f.setAttribute('method', 'POST');
            //     if (e != j.url) f.setAttribute('action', j.url);
            //     if (!j.skipEncodingOverride && (!c || /post/i.test(c))) g.attr({
            //         encoding: 'multipart/form-data',
            //         enctype: 'multipart/form-data'
            //     });
            //     if (j.timeout) s = setTimeout(function() {
            //         r = true;
            //         E(u);
            //     }, j.timeout);

            //     function h() {
            //         try {
            //             var a = w(n).readyState;
            //             d('state = ' + a);
            //             if (a.toLowerCase() == 'uninitialized') setTimeout(h, 50);
            //         } catch (b) {
            //             d('Server abort: ', b, ' (', b.name, ')');
            //             E(v);
            //             s && clearTimeout(s);
            //             s = undefined;
            //         }
            //     }
            //     var i = [];
            //     try {
            //         if (j.extraData)
            //             for (var k in j.extraData) i.push(a('<input type="hidden" name="' + k + '">').attr('value', j.extraData[k]).appendTo(f)[0]);
            //         if (!j.iframeTarget) {
            //             m.appendTo('body');
            //             n.attachEvent ? n.attachEvent('onload', E) : n.addEventListener('load', E, false);
            //         }
            //         setTimeout(h, 15);
            //         f.submit();
            //     } finally {
            //         f.setAttribute('action', e);
            //         if (b) f.setAttribute('target', b);
            //         else g.removeAttr('target');
            //         a(i).remove();
            //     }
            // }
            if (j.forceSync) z();
            else setTimeout(z, 10);
            var A, B, C = 50,
                D;

            function E(b) {
                if (o.aborted || D) return;
                try {
                    B = w(n);
                } catch (c) {
                    d('cannot access response document: ', c);
                    b = v;
                }
                if (b === u && o) {
                    o.abort('timeout');
                    return;
                } else if (b == v && o) {
                    o.abort('server abort');
                    return;
                }
                if (!B || B.location.href == j.iframeSrc)
                    if (!r) return;
                n.detachEvent ? n.detachEvent('onload', E) : n.removeEventListener('load', E, false);
                var e = 'success',
                    f;
                try {
                    if (r) throw 'timeout';
                    var g = j.dataType == 'xml' || B.XMLDocument || a.isXMLDoc(B);
                    d('isXml=' + g);
                    if (!g && window.opera && (B.body == null || B.body.innerHTML == ''))
                        if (--C) {
                            d('requeing onLoad callback, DOM not available');
                            setTimeout(E, 250);
                            return;
                        }
                    var h = B.body ? B.body : B.documentElement;
                    o.responseText = h ? h.innerHTML : null;
                    o.responseXML = B.XMLDocument ? B.XMLDocument : B;
                    if (g) j.dataType = 'xml';
                    o.getResponseHeader = function(a) {
                        var b = {
                            'content-type': j.dataType
                        };
                        return b[a];
                    };
                    if (h) {
                        o.status = Number(h.getAttribute('status')) || o.status;
                        o.statusText = h.getAttribute('statusText') || o.statusText;
                    }
                    var i = (j.dataType || '').toLowerCase();
                    var l = /(json|script|text)/.test(i);
                    if (l || j.textarea) {
                        var p = B.getElementsByTagName('textarea')[0];
                        if (p) {
                            o.responseText = p.value;
                            o.status = Number(p.getAttribute('status')) || o.status;
                            o.statusText = p.getAttribute('statusText') || o.statusText;
                        } else if (l) {
                            var q = B.getElementsByTagName('pre')[0];
                            var t = B.getElementsByTagName('body')[0];
                            if (q) o.responseText = q.textContent ? q.textContent : q.innerText;
                            else if (t) o.responseText = t.textContent ? t.textContent : t.innerText;
                        }
                    } else if (i == 'xml' && !o.responseXML && o.responseText != null) o.responseXML = F(o.responseText);
                    try {
                        A = H(o, i, j);
                    } catch (b) {
                        e = 'parsererror';
                        o.error = f = (b || e);
                    }
                } catch (b) {
                    d('error caught: ', b);
                    e = 'error';
                    o.error = f = (b || e);
                }
                if (o.aborted) {
                    d('upload aborted');
                    e = null;
                }
                if (o.status) e = (o.status >= 200 && o.status < 300 || o.status === 304) ? 'success' : 'error';
                if (e === 'success') {
                    j.success && j.success.call(j.context, A, 'success', o);
                    k && a.event.trigger("ajaxSuccess", [o, j]);
                } else if (e) {
                    if (f == undefined) f = o.statusText;
                    j.error && j.error.call(j.context, o, e, f);
                    k && a.event.trigger("ajaxError", [o, j, f]);
                }
                k && a.event.trigger("ajaxComplete", [o, j]);
                if (k && !--a.active) a.event.trigger("ajaxStop");
                j.complete && j.complete.call(j.context, o, e);
                D = true;
                if (j.timeout) clearTimeout(s);
                setTimeout(function() {
                    if (!j.iframeTarget) m.remove();
                    o.responseXML = null;
                }, 100);
            }
            var F = a.parseXML || function(a, b) {
                if (window.ActiveXObject) {
                    b = new ActiveXObject('Microsoft.XMLDOM');
                    b.async = 'false';
                    b.loadXML(a);
                } else b = new DOMParser().parseFromString(a, 'text/xml');
                return (b && b.documentElement && b.documentElement.nodeName != 'parsererror') ? b : null;
            };
            var G = a.parseJSON || function(a) {
                return window.eval('(' + a + ')');
            };
            var H = function(b, c, d) {
                var e = b.getResponseHeader('content-type') || '',
                    f = c === 'xml' || !c && e.indexOf('xml') >= 0,
                    g = f ? b.responseXML : b.responseText;
                if (f && g.documentElement.nodeName === 'parsererror') a.error && a.error('parsererror');
                if (d && d.dataFilter) g = d.dataFilter(g, c);
                if (typeof g === 'string')
                    if (c === 'json' || !c && e.indexOf('json') >= 0) g = G(g);
                    else if (c === "script" || !c && e.indexOf("javascript") >= 0) a.globalEval(g);
                return g;
            };
        }
    };
    a.fn.ajaxForm = function(e) {
        e = e || {};
        e.delegation = e.delegation && a.isFunction(a.fn.on);
        if (!e.delegation && this.length === 0) {
            var f = {
                s: this.selector,
                c: this.context
            };
            if (!a.isReady && f.s) {
                d('DOM not ready, queuing ajaxForm');
                a(function() {
                    a(f.s, f.c).ajaxForm(e);
                });
                return this;
            }
            d('terminating; zero elements found by selector' + (a.isReady ? '' : ' (DOM not ready)'));
            return this;
        }
        if (e.delegation) {
            a(document).off('submit.form-plugin', this.selector, b).off('click.form-plugin', this.selector, c).on('submit.form-plugin', this.selector, e, b).on('click.form-plugin', this.selector, e, c);
            return this;
        }
        return this.ajaxFormUnbind().bind('submit.form-plugin', e, b).bind('click.form-plugin', e, c);
    };

    function b(b) {
        var c = b.data;
        if (!b.isDefaultPrevented()) {
            b.preventDefault();
            a(this).ajaxSubmit(c);
        }
    }

    function c(b) {
        var c = b.target;
        var d = a(c);
        if (!(d.is(":submit,input:image"))) {
            var e = d.closest(':submit');
            if (e.length == 0) return;
            c = e[0];
        }
        var f = this;
        f.clk = c;
        if (c.type == 'image')
            if (b.offsetX != undefined) {
                f.clk_x = b.offsetX;
                f.clk_y = b.offsetY;
            } else if (typeof a.fn.offset == 'function') {
            var g = d.offset();
            f.clk_x = b.pageX - g.left;
            f.clk_y = b.pageY - g.top;
        } else {
            f.clk_x = b.pageX - c.offsetLeft;
            f.clk_y = b.pageY - c.offsetTop;
        }
        setTimeout(function() {
            f.clk = f.clk_x = f.clk_y = null;
        }, 100);
    };
    a.fn.ajaxFormUnbind = function() {
        return this.unbind('submit.form-plugin click.form-plugin');
    };
    a.fn.formToArray = function(b) {
        var c = [];
        if (this.length === 0) return c;
        var d = this[0];
        var e = b ? d.getElementsByTagName('*') : d.elements;
        if (!e) return c;
        var f, g, h, i, j, k, l;
        for (f = 0, k = e.length; f < k; f++) {
            j = e[f];
            h = j.name;
            if (!h) continue;
            if (b && d.clk && j.type == "image") {
                if (!j.disabled && d.clk == j) {
                    c.push({
                        name: h,
                        value: a(j).val(),
                        type: j.type
                    });
                    c.push({
                        name: h + '.x',
                        value: d.clk_x
                    }, {
                        name: h + '.y',
                        value: d.clk_y
                    });
                }
                continue;
            }
            i = a.fieldValue(j, true);
            if (i && i.constructor == Array)
                for (g = 0, l = i.length; g < l; g++) c.push({
                    name: h,
                    value: i[g]
                });
            else if (i !== null && typeof i != 'undefined') c.push({
                name: h,
                value: i,
                type: j.type
            });
        }
        if (!b && d.clk) {
            var m = a(d.clk),
                n = m[0];
            h = n.name;
            if (h && !n.disabled && n.type == 'image') {
                c.push({
                    name: h,
                    value: m.val()
                });
                c.push({
                    name: h + '.x',
                    value: d.clk_x
                }, {
                    name: h + '.y',
                    value: d.clk_y
                });
            }
        }
        return c;
    };
    a.fn.formSerialize = function(b) {
        return a.param(this.formToArray(b));
    };
    a.fn.fieldSerialize = function(b) {
        var c = [];
        this.each(function() {
            var d = this.name;
            if (!d) return;
            var e = a.fieldValue(this, b);
            if (e && e.constructor == Array)
                for (var f = 0, g = e.length; f < g; f++) c.push({
                    name: d,
                    value: e[f]
                });
            else if (e !== null && typeof e != 'undefined') c.push({
                name: this.name,
                value: e
            });
        });
        return a.param(c);
    };
    a.fn.fieldValue = function(b) {
        for (var c = [], d = 0, e = this.length; d < e; d++) {
            var f = this[d];
            var g = a.fieldValue(f, b);
            if (g === null || typeof g == 'undefined' || (g.constructor == Array && !g.length)) continue;
            g.constructor == Array ? a.merge(c, g) : c.push(g);
        }
        return c;
    };
    a.fieldValue = function(b, c) {
        var d = b.name,
            e = b.type,
            f = b.tagName.toLowerCase();
        if (c === undefined) c = true;
        if (c && (!d || b.disabled || e == 'reset' || e == 'button' || (e == 'checkbox' || e == 'radio') && !b.checked || (e == 'submit' || e == 'image') && b.form && b.form.clk != b || f == 'select' && b.selectedIndex == -1)) return null;
        if (f == 'select') {
            var g = b.selectedIndex;
            if (g < 0) return null;
            var h = [],
                i = b.options;
            var j = (e == 'select-one');
            var k = (j ? g + 1 : i.length);
            for (var l = (j ? g : 0); l < k; l++) {
                var m = i[l];
                if (m.selected) {
                    var n = m.value;
                    if (!n) n = (m.attributes && m.attributes.value && !(m.attributes.value.specified)) ? m.text : m.value;
                    if (j) return n;
                    h.push(n);
                }
            }
            return h;
        }
        return a(b).val();
    };
    a.fn.clearForm = function(b) {
        return this.each(function() {
            a('input,select,textarea', this).clearFields(b);
        });
    };
    a.fn.clearFields = a.fn.clearInputs = function(a) {
        var b = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;
        return this.each(function() {
            var c = this.type,
                d = this.tagName.toLowerCase();
            if (b.test(c) || d == 'textarea' || (a && /hidden/.test(c))) this.value = '';
            else if (c == 'checkbox' || c == 'radio') this.checked = false;
            else if (d == 'select') this.selectedIndex = -1;
        });
    };
    a.fn.resetForm = function() {
        return this.each(function() {
            if (typeof this.reset == 'function' || (typeof this.reset == 'object' && !this.reset.nodeType)) this.reset();
        });
    };
    a.fn.enable = function(a) {
        if (a === undefined) a = true;
        return this.each(function() {
            this.disabled = !a;
        });
    };
    a.fn.selected = function(b) {
        if (b === undefined) b = true;
        return this.each(function() {
            var c = this.type;
            if (c == 'checkbox' || c == 'radio') this.checked = b;
            else if (this.tagName.toLowerCase() == 'option') {
                var d = a(this).parent('select');
                if (b && d[0] && d[0].type == 'select-one') d.find('option').selected(false);
                this.selected = b;
            }
        });
    };
    a.fn.ajaxSubmit.debug = false;

    // function d() {
    //     if (!a.fn.ajaxSubmit.debug) return;
    //     var b = '[jquery.form] ' + Array.prototype.join.call(arguments, '');
    //     if (window.console && window.console.log) window.console.log(b);
    //     else if (window.opera && window.opera.postError) window.opera.postError(b);
    // };
})(jQuery);
eval(function(a, b, c, d, e, f) {
    e = function(a) {
        return (a < 62 ? '' : e(parseInt(a / 62))) + ((a = a % 62) > 35 ? String.fromCharCode(a + 29) : a.toString(36));
    };
    if ('0'.replace(0, e) == 0) {
        while (c--) f[e(c)] = d[c];
        d = [function(a) {
            return f[a] || a;
        }];
        e = function() {
            return '([3-9a-zB-Z]|1\\w)';
        };
        c = 1;
    };
    while (c--)
        if (d[c]) a = a.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), d[c]);
    return a;
}('(6($){6 Z(f,3){4 7=n;f=b(f);4 5=b(document.createElement(\'div\')).B(3.10).B((3.p)?3.11:\'\').B((3.C)?3.12:\'\').13(3.q).appendTo(f);a(!3.14)5.t();o 5.r();a(!3.C){f.hover(6(c){7.t(c)},6(){7.r()});a(!3.p){f.mousemove(6(c){a(5.D(\'N\')!==\'u\')7.E(c)})}}o{f.click(6(c){a(c.15===f.16(0)){a(5.D(\'N\')!==\'u\')7.r();o 7.t()}});b(v).mousedown(6(c){a(5.D(\'N\')!==\'u\'){4 17=(3.O)?b(c.15).parents(\'.5\').andSelf().filter(6(){d n===5.16(0)}).length:0;a(17===0)7.r()}})};b.18(7,{getVersion:6(){d[1,2,0]},getParent:6(){d f},getTooltip:6(){d 5},getPos:6(){d 5.i()},19:6(8,9){4 e=f.i();a(s 8==\'F\')8=G(8)+e.k;a(s 9==\'F\')9=G(9)+e.l;5.D({k:8,l:9});d 7},t:6(c){3.1a.m(7);7.E((3.p)?P:c);Q(3.1b){g\'H\':5.fadeIn(3.I);h;g\'1c\':5.slideDown(3.I,7.E);h;g\'1d\':3.1e.m(5,3.I);h;w:g\'u\':5.t();h};5.B(3.R);3.1f.m(7);d 7},r:6(){3.1g.m(7);Q(3.1h){g\'H\':5.fadeOut(3.J);h;g\'1c\':5.slideUp(3.J);h;g\'1d\':3.1i.m(5,3.J);h;w:g\'u\':5.r();h};5.removeClass(3.R);3.1j.m(7);d 7},update:6(q){5.13(q);3.q=q;d 7},1k:6(1l,K){3.1m.m(7);5.1k(1l,K,6(){3.1n.m(7)});d 7},L:6(8,9){4 1o=8+5.S();4 1p=9+5.T();4 1q=b(v).width()+b(v).scrollLeft();4 1r=b(v).height()+b(v).scrollTop();d[(1o>=1q),(1p>=1r)]},E:6(c){4 x=5.S();4 y=5.T();a(!c&&3.p){a(3.j.constructor==Array){8=G(3.j[0]);9=G(3.j[1])}o a(b(3.j).attr(\'nodeType\')===1){4 i=b(3.j).i();8=i.k;9=i.l}o{4 e=f.i();4 z=f.S();4 M=f.T();Q(3.j){g\'l\':4 8=e.k-(x/2)+(z/2);4 9=e.l-y;h;g\'bottom\':4 8=e.k-(x/2)+(z/2);4 9=e.l+M;h;g\'k\':4 8=e.k-x;4 9=e.l-(y/2)+(M/2);h;g\'right\':4 8=e.k+z;4 9=e.l-(y/2)+(M/2);h;w:g\'w\':4 8=(z/2)+e.k+20;4 9=e.l;h}}}o{4 8=c.pageX;4 9=c.pageY};a(s 3.j!=\'object\'){8=8+3.i[0];9=9+3.i[1];a(3.L){4 U=7.L(8,9);a(U[0])8=8-(x/2)-(2*3.i[0]);a(U[1])9=9-(y/2)-(2*3.i[1])}}o{a(s 3.j[0]=="F")8=1s(8);a(s 3.j[1]=="F")9=1s(9)};7.19(8,9);d 7}})};b.fn.V=6(3){4 W=b(n).eq(s 3==\'number\'?3:0).K("V");a(W)d W;4 X={q:\'A simple 5\',C:1t,O:1t,14:Y,j:\'w\',i:[0,0],L:Y,p:Y,1b:\'H\',I:1u,1e:P,1h:\'H\',J:1u,1i:P,10:\'5\',R:\'active\',11:\'p\',12:\'C\',focusClass:\'O\',1a:6(){},1f:6(){},1g:6(){},1j:6(){},1m:6(){},1n:6(){}};b.18(X,3);n.each(6(){4 el=new Z(b(n),X);b(n).K("V",el)});d n}})();', [], 93, '|||conf|var|tooltip|function|self|posX|posY|if|jQuery|event|return|elemPos|elem|case|break|offset|position|left|top|call|this|else|fixed|content|hide|typeof|show|none|window|default|tooltipWidth|tooltipHeight|elemWidth||addClass|persistent|css|updatePos|string|parseInt|fade|showTime|hideTime|data|boundryCheck|elemHeight|display|focus|null|switch|activeClass|outerWidth|outerHeight|overflow|simpletip|api|defaultConf|true|Simpletip|baseClass|fixedClass|persistentClass|html|hidden|target|get|check|extend|setPos|onBeforeShow|showEffect|slide|custom|showCustom|onShow|onBeforeHide|hideEffect|hideCustom|onHide|load|uri|beforeContentLoad|onContentLoad|newX|newY|windowWidth|windowHeight|String|false|150'.split('|'), 0, {}));
! function(a, b, c) {
    ! function(a) {
        "use strict";
        "function" == typeof define && define.amd ? define(["jquery"], a) : jQuery && !jQuery.fn.qtip && a(jQuery);
    }(function(d) {
        "use strict";

        function e(a, b, c, e) {
            this.id = c, this.target = a, this.tooltip = A, this.elements = {
                target: a
            }, this._id = J + "-" + c, this.timers = {
                img: {}
            }, this.options = b, this.plugins = {}, this.cache = {
                event: {},
                target: d(),
                disabled: z,
                attr: e,
                onTooltip: z,
                lastClass: ""
            }, this.rendered = this.destroyed = this.disabled = this.waiting = this.hiddenDuringWait = this.positioning = this.triggering = z;
        }

        function f(a) {
            return a === A || "object" !== d.type(a);
        }

        function g(a) {
            return !(d.isFunction(a) || a && a.attr || a.length || "object" === d.type(a) && (a.jquery || a.then));
        }

        function h(a) {
            var b, c, e, h;
            return f(a) ? z : (f(a.metadata) && (a.metadata = {
                type: a.metadata
            }), "content" in a && (b = a.content, f(b) || b.jquery || b.done ? b = a.content = {
                text: c = g(b) ? z : b
            } : c = b.text, "ajax" in b && (e = b.ajax, h = e && e.once !== z, delete b.ajax, b.text = function(a, b) {
                var f = c || d(this).attr(b.options.content.attr) || "Loading...",
                    g = d.ajax(d.extend({}, e, {
                        context: b
                    })).then(e.success, A, e.error).then(function(a) {
                        return a && h && b.set("content.text", a), a;
                    }, function(a, c, d) {
                        b.destroyed || 0 === a.status || b.set("content.text", c + ": " + d);
                    });
                return h ? f : (b.set("content.text", f), g);
            }), "title" in b && (f(b.title) || (b.button = b.title.button, b.title = b.title.text), g(b.title || z) && (b.title = z))), "position" in a && f(a.position) && (a.position = {
                my: a.position,
                at: a.position
            }), "show" in a && f(a.show) && (a.show = a.show.jquery ? {
                target: a.show
            } : a.show === y ? {
                ready: y
            } : {
                event: a.show
            }), "hide" in a && f(a.hide) && (a.hide = a.hide.jquery ? {
                target: a.hide
            } : {
                event: a.hide
            }), "style" in a && f(a.style) && (a.style = {
                classes: a.style
            }), d.each(I, function() {
                this.sanitize && this.sanitize(a);
            }), a);
        }

        function i(a, b) {
            for (var c, d = 0, e = a, f = b.split("."); e = e[f[d++]];) d < f.length && (c = e);
            return [c || a, f.pop()];
        }

        function j(a, b) {
            var c, d, e;
            for (c in this.checks)
                for (d in this.checks[c])(e = new RegExp(d, "i").exec(a)) && (b.push(e), ("builtin" === c || this.plugins[c]) && this.checks[c][d].apply(this.plugins[c] || this, b));
        }

        function k(a) {
            return M.concat("").join(a ? "-" + a + " " : " ");
        }

        function l(c) {
            return c && {
                type: c.type,
                pageX: c.pageX,
                pageY: c.pageY,
                target: c.target,
                relatedTarget: c.relatedTarget,
                scrollX: c.scrollX || a.pageXOffset || b.body.scrollLeft || b.documentElement.scrollLeft,
                scrollY: c.scrollY || a.pageYOffset || b.body.scrollTop || b.documentElement.scrollTop
            } || {};
        }

        function m(a, b) {
            return b > 0 ? setTimeout(d.proxy(a, this), b) : (a.call(this), void 0);
        }

        function n(a) {
            return this.tooltip.hasClass(T) ? z : (clearTimeout(this.timers.show), clearTimeout(this.timers.hide), this.timers.show = m.call(this, function() {
                this.toggle(y, a);
            }, this.options.show.delay), void 0);
        }

        function o(a) {
            if (this.tooltip.hasClass(T)) return z;
            var b = d(a.relatedTarget),
                c = b.closest(N)[0] === this.tooltip[0],
                e = b[0] === this.options.show.target[0];
            if (clearTimeout(this.timers.show), clearTimeout(this.timers.hide), this !== b[0] && "mouse" === this.options.position.target && c || this.options.hide.fixed && /mouse(out|leave|move)/.test(a.type) && (c || e)) try {
                a.preventDefault(), a.stopImmediatePropagation();
            } catch (f) {} else this.timers.hide = m.call(this, function() {
                this.toggle(z, a);
            }, this.options.hide.delay, this);
        }

        function p(a) {
            return this.tooltip.hasClass(T) || !this.options.hide.inactive ? z : (clearTimeout(this.timers.inactive), this.timers.inactive = m.call(this, function() {
                this.hide(a);
            }, this.options.hide.inactive), void 0);
        }

        function q(a) {
            this.rendered && this.tooltip[0].offsetWidth > 0 && this.reposition(a);
        }

        function r(a, c, e) {
            d(b.body).delegate(a, (c.split ? c : c.join(ab + " ")) + ab, function() {
                var a = t.api[d.attr(this, L)];
                a && !a.disabled && e.apply(a, arguments);
            });
        }

        function s(a, c, f) {
            var g, i, j, k, l, m = d(b.body),
                n = a[0] === b ? m : a,
                o = a.metadata ? a.metadata(f.metadata) : A,
                p = "html5" === f.metadata.type && o ? o[f.metadata.name] : A,
                q = a.data(f.metadata.name || "qtipopts");
            try {
                q = "string" == typeof q ? d.parseJSON(q) : q;
            } catch (r) {}
            if (k = d.extend(y, {}, t.defaults, f, "object" == typeof q ? h(q) : A, h(p || o)), i = k.position, k.id = c, "boolean" == typeof k.content.text) {
                if (j = a.attr(k.content.attr), k.content.attr === z || !j) return z;
                k.content.text = j;
            }
            if (i.container.length || (i.container = m), i.target === z && (i.target = n), k.show.target === z && (k.show.target = n), k.show.solo === y && (k.show.solo = i.container.closest("body")), k.hide.target === z && (k.hide.target = n), k.position.viewport === y && (k.position.viewport = i.container), i.container = i.container.eq(0), i.at = new v(i.at, y), i.my = new v(i.my), a.data(J))
                if (k.overwrite) a.qtip("destroy", !0);
                else if (k.overwrite === z) return z;
            return a.attr(K, c), k.suppress && (l = a.attr("title")) && a.removeAttr("title").attr(V, l).attr("title", ""), g = new e(a, k, c, !!j), a.data(J, g), a.one("remove.qtip-" + c + " removeqtip.qtip-" + c, function() {
                var a;
                (a = d(this).data(J)) && a.destroy(!0);
            }), g;
        }
        var t, u, v, w, x, y = !0,
            z = !1,
            A = null,
            B = "x",
            C = "y",
            D = "top",
            E = "left",
            F = "bottom",
            G = "right",
            H = "center",
            I = {},
            J = "qtip",
            K = "data-hasqtip",
            L = "data-qtip-id",
            M = ["ui-widget", "ui-tooltip"],
            N = "." + J,
            O = "click dblclick mousedown mouseup mousemove mouseleave mouseenter".split(" "),
            P = J + "-fixed",
            Q = J + "-default",
            R = J + "-focus",
            S = J + "-hover",
            T = J + "-disabled",
            U = "_replacedByqTip",
            V = "oldtitle",
            W = {
                ie: function() {
                    for (var a = 3, c = b.createElement("div");
                        (c.innerHTML = "<!--[if gt IE " + ++a + "]><i></i><![endif]-->") && c.getElementsByTagName("i")[0];);
                    return a > 4 ? a : 0 / 0;
                }(),
                iOS: parseFloat(("" + (/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent) || [0, ""])[1]).replace("undefined", "3_2").replace("_", ".").replace("_", "")) || z
            };
        u = e.prototype, u._when = function(a) {
            return d.when.apply(d, a);
        }, u.render = function(a) {
            if (this.rendered || this.destroyed) return this;
            var b, c = this,
                e = this.options,
                f = this.cache,
                g = this.elements,
                h = e.content.text,
                i = e.content.title,
                j = e.content.button,
                k = e.position,
                l = ("." + this._id + " ", []);
            return d.attr(this.target[0], "aria-describedby", this._id), this.tooltip = g.tooltip = b = d("<div/>", {
                id: this._id,
                "class": [J, Q, e.style.classes, J + "-pos-" + e.position.my.abbrev()].join(" "),
                width: e.style.width || "",
                height: e.style.height || "",
                tracking: "mouse" === k.target && k.adjust.mouse,
                role: "alert",
                "aria-live": "polite",
                "aria-atomic": z,
                "aria-describedby": this._id + "-content",
                "aria-hidden": y
            }).toggleClass(T, this.disabled).attr(L, this.id).data(J, this).appendTo(k.container).append(g.content = d("<div />", {
                "class": J + "-content",
                id: this._id + "-content",
                "aria-atomic": y
            })), this.rendered = -1, this.positioning = y, i && (this._createTitle(), d.isFunction(i) || l.push(this._updateTitle(i, z))), j && this._createButton(), d.isFunction(h) || l.push(this._updateContent(h, z)), this.rendered = y, this._setWidget(), d.each(I, function(a) {
                var b;
                "render" === this.initialize && (b = this(c)) && (c.plugins[a] = b);
            }), this._unassignEvents(), this._assignEvents(), this._when(l).then(function() {
                c._trigger("render"), c.positioning = z, c.hiddenDuringWait || !e.show.ready && !a || c.toggle(y, f.event, z), c.hiddenDuringWait = z;
            }), t.api[this.id] = this, this;
        }, u.destroy = function(a) {
            function b() {
                if (!this.destroyed) {
                    this.destroyed = y;
                    var a = this.target,
                        b = a.attr(V);
                    this.rendered && this.tooltip.stop(1, 0).find("*").remove().end().remove(), d.each(this.plugins, function() {
                        this.destroy && this.destroy();
                    }), clearTimeout(this.timers.show), clearTimeout(this.timers.hide), this._unassignEvents(), a.removeData(J).removeAttr(L).removeAttr(K).removeAttr("aria-describedby"), this.options.suppress && b && a.attr("title", b).removeAttr(V), this._unbind(a), this.options = this.elements = this.cache = this.timers = this.plugins = this.mouse = A, delete t.api[this.id];
                }
            }
            return this.destroyed ? this.target : (a === y && "hide" !== this.triggering || !this.rendered ? b.call(this) : (this.tooltip.one("tooltiphidden", d.proxy(b, this)), !this.triggering && this.hide()), this.target);
        }, w = u.checks = {
            builtin: {
                "^id$": function(a, b, c, e) {
                    var f = c === y ? t.nextid : c,
                        g = J + "-" + f;
                    f !== z && f.length > 0 && !d("#" + g).length ? (this._id = g, this.rendered && (this.tooltip[0].id = this._id, this.elements.content[0].id = this._id + "-content", this.elements.title[0].id = this._id + "-title")) : a[b] = e;
                },
                "^prerender": function(a, b, c) {
                    c && !this.rendered && this.render(this.options.show.ready);
                },
                "^content.text$": function(a, b, c) {
                    this._updateContent(c);
                },
                "^content.attr$": function(a, b, c, d) {
                    this.options.content.text === this.target.attr(d) && this._updateContent(this.target.attr(c));
                },
                "^content.title$": function(a, b, c) {
                    return c ? (c && !this.elements.title && this._createTitle(), this._updateTitle(c), void 0) : this._removeTitle();
                },
                "^content.button$": function(a, b, c) {
                    this._updateButton(c);
                },
                "^content.title.(text|button)$": function(a, b, c) {
                    this.set("content." + b, c);
                },
                "^position.(my|at)$": function(a, b, c) {
                    "string" == typeof c && (a[b] = new v(c, "at" === b));
                },
                "^position.container$": function(a, b, c) {
                    this.rendered && this.tooltip.appendTo(c);
                },
                "^show.ready$": function(a, b, c) {
                    c && (!this.rendered && this.render(y) || this.toggle(y));
                },
                "^style.classes$": function(a, b, c, d) {
                    this.rendered && this.tooltip.removeClass(d).addClass(c);
                },
                "^style.(width|height)": function(a, b, c) {
                    this.rendered && this.tooltip.css(b, c);
                },
                "^style.widget|content.title": function() {
                    this.rendered && this._setWidget();
                },
                "^style.def": function(a, b, c) {
                    this.rendered && this.tooltip.toggleClass(Q, !!c);
                },
                "^events.(render|show|move|hide|focus|blur)$": function(a, b, c) {
                    this.rendered && this.tooltip[(d.isFunction(c) ? "" : "un") + "bind"]("tooltip" + b, c);
                },
                "^(show|hide|position).(event|target|fixed|inactive|leave|distance|viewport|adjust)": function() {
                    if (this.rendered) {
                        var a = this.options.position;
                        this.tooltip.attr("tracking", "mouse" === a.target && a.adjust.mouse), this._unassignEvents(), this._assignEvents();
                    }
                }
            }
        }, u.get = function(a) {
            if (this.destroyed) return this;
            var b = i(this.options, a.toLowerCase()),
                c = b[0][b[1]];
            return c.precedance ? c.string() : c;
        };
        var X = /^position\.(my|at|adjust|target|container|viewport)|style|content|show\.ready/i,
            Y = /^prerender|show\.ready/i;
        u.set = function(a, b) {
            if (this.destroyed) return this; {
                var c, e = this.rendered,
                    f = z,
                    g = this.options;
                this.checks;
            }
            return "string" == typeof a ? (c = a, a = {}, a[c] = b) : a = d.extend({}, a), d.each(a, function(b, c) {
                if (e && Y.test(b)) return delete a[b], void 0;
                var h, j = i(g, b.toLowerCase());
                h = j[0][j[1]], j[0][j[1]] = c && c.nodeType ? d(c) : c, f = X.test(b) || f, a[b] = [j[0], j[1], c, h];
            }), h(g), this.positioning = y, d.each(a, d.proxy(j, this)), this.positioning = z, this.rendered && this.tooltip[0].offsetWidth > 0 && f && this.reposition("mouse" === g.position.target ? A : this.cache.event), this;
        }, u._update = function(a, b) {
            var c = this,
                e = this.cache;
            return this.rendered && a ? (d.isFunction(a) && (a = a.call(this.elements.target, e.event, this) || ""), d.isFunction(a.then) ? (e.waiting = y, a.then(function(a) {
                return e.waiting = z, c._update(a, b);
            }, A, function(a) {
                return c._update(a, b);
            })) : a === z || !a && "" !== a ? z : (a.jquery && a.length > 0 ? b.empty().append(a.css({
                display: "block",
                visibility: "visible"
            })) : b.html(a), this._waitForContent(b).then(function(a) {
                a.images && a.images.length && c.rendered && c.tooltip[0].offsetWidth > 0 && c.reposition(e.event, !a.length);
            }))) : z;
        }, u._waitForContent = function(a) {
            var b = this.cache;
            return b.waiting = y, (d.fn.imagesLoaded ? a.imagesLoaded() : d.Deferred().resolve([])).done(function() {
                b.waiting = z;
            }).promise();
        }, u._updateContent = function(a, b) {
            this._update(a, this.elements.content, b);
        }, u._updateTitle = function(a, b) {
            this._update(a, this.elements.title, b) === z && this._removeTitle(z);
        }, u._createTitle = function() {
            var a = this.elements,
                b = this._id + "-title";
            a.titlebar && this._removeTitle(), a.titlebar = d("<div />", {
                "class": J + "-titlebar " + (this.options.style.widget ? k("header") : "")
            }).append(a.title = d("<div />", {
                id: b,
                "class": J + "-title",
                "aria-atomic": y
            })).insertBefore(a.content).delegate(".qtip-close", "mousedown keydown mouseup keyup mouseout", function(a) {
                d(this).toggleClass("ui-state-active ui-state-focus", "down" === a.type.substr(-4));
            }).delegate(".qtip-close", "mouseover mouseout", function(a) {
                d(this).toggleClass("ui-state-hover", "mouseover" === a.type);
            }), this.options.content.button && this._createButton();
        }, u._removeTitle = function(a) {
            var b = this.elements;
            b.title && (b.titlebar.remove(), b.titlebar = b.title = b.button = A, a !== z && this.reposition());
        }, u.reposition = function(c, e) {
            if (!this.rendered || this.positioning || this.destroyed) return this;
            this.positioning = y;
            var f, g, h = this.cache,
                i = this.tooltip,
                j = this.options.position,
                k = j.target,
                l = j.my,
                m = j.at,
                n = j.viewport,
                o = j.container,
                p = j.adjust,
                q = p.method.split(" "),
                r = i.outerWidth(z),
                s = i.outerHeight(z),
                t = 0,
                u = 0,
                v = i.css("position"),
                w = {
                    left: 0,
                    top: 0
                },
                x = i[0].offsetWidth > 0,
                A = c && "scroll" === c.type,
                B = d(a),
                C = o[0].ownerDocument,
                J = this.mouse;
            if (d.isArray(k) && 2 === k.length) m = {
                x: E,
                y: D
            }, w = {
                left: k[0],
                top: k[1]
            };
            else if ("mouse" === k) m = {
                x: E,
                y: D
            }, !J || !J.pageX || !p.mouse && c && c.pageX ? c && c.pageX || ((!p.mouse || this.options.show.distance) && h.origin && h.origin.pageX ? c = h.origin : (!c || c && ("resize" === c.type || "scroll" === c.type)) && (c = h.event)) : c = J, "static" !== v && (w = o.offset()), C.body.offsetWidth !== (a.innerWidth || C.documentElement.clientWidth) && (g = d(b.body).offset()), w = {
                left: c.pageX - w.left + (g && g.left || 0),
                top: c.pageY - w.top + (g && g.top || 0)
            }, p.mouse && A && J && (w.left -= (J.scrollX || 0) - B.scrollLeft(), w.top -= (J.scrollY || 0) - B.scrollTop());
            else {
                if ("event" === k ? c && c.target && "scroll" !== c.type && "resize" !== c.type ? h.target = d(c.target) : c.target || (h.target = this.elements.target) : "event" !== k && (h.target = d(k.jquery ? k : this.elements.target)), k = h.target, k = d(k).eq(0), 0 === k.length) return this;
                k[0] === b || k[0] === a ? (t = W.iOS ? a.innerWidth : k.width(), u = W.iOS ? a.innerHeight : k.height(), k[0] === a && (w = {
                    top: (n || k).scrollTop(),
                    left: (n || k).scrollLeft()
                })) : I.imagemap && k.is("area") ? f = I.imagemap(this, k, m, I.viewport ? q : z) : I.svg && k && k[0].ownerSVGElement ? f = I.svg(this, k, m, I.viewport ? q : z) : (t = k.outerWidth(z), u = k.outerHeight(z), w = k.offset()), f && (t = f.width, u = f.height, g = f.offset, w = f.position), w = this.reposition.offset(k, w, o), (W.iOS > 3.1 && W.iOS < 4.1 || W.iOS >= 4.3 && W.iOS < 4.33 || !W.iOS && "fixed" === v) && (w.left -= B.scrollLeft(), w.top -= B.scrollTop()), (!f || f && f.adjustable !== z) && (w.left += m.x === G ? t : m.x === H ? t / 2 : 0, w.top += m.y === F ? u : m.y === H ? u / 2 : 0);
            }
            return w.left += p.x + (l.x === G ? -r : l.x === H ? -r / 2 : 0), w.top += p.y + (l.y === F ? -s : l.y === H ? -s / 2 : 0), I.viewport ? (w.adjusted = I.viewport(this, w, j, t, u, r, s), g && w.adjusted.left && (w.left += g.left), g && w.adjusted.top && (w.top += g.top)) : w.adjusted = {
                left: 0,
                top: 0
            }, this._trigger("move", [w, n.elem || n], c) ? (delete w.adjusted, e === z || !x || isNaN(w.left) || isNaN(w.top) || "mouse" === k || !d.isFunction(j.effect) ? i.css(w) : d.isFunction(j.effect) && (j.effect.call(i, this, d.extend({}, w)), i.queue(function(a) {
                d(this).css({
                    opacity: "",
                    height: ""
                }), W.ie && this.style.removeAttribute("filter"), a();
            })), this.positioning = z, this) : this;
        }, u.reposition.offset = function(a, c, e) {
            function f(a, b) {
                c.left += b * a.scrollLeft(), c.top += b * a.scrollTop();
            }
            if (!e[0]) return c;
            var g, h, i, j, k = d(a[0].ownerDocument),
                l = !!W.ie && "CSS1Compat" !== b.compatMode,
                m = e[0];
            do "static" !== (h = d.css(m, "position")) && ("fixed" === h ? (i = m.getBoundingClientRect(), f(k, -1)) : (i = d(m).position(), i.left += parseFloat(d.css(m, "borderLeftWidth")) || 0, i.top += parseFloat(d.css(m, "borderTopWidth")) || 0), c.left -= i.left + (parseFloat(d.css(m, "marginLeft")) || 0), c.top -= i.top + (parseFloat(d.css(m, "marginTop")) || 0), g || "hidden" === (j = d.css(m, "overflow")) || "visible" === j || (g = d(m))); while (m = m.offsetParent);
            return g && (g[0] !== k[0] || l) && f(g, 1), c;
        };
        var Z = (v = u.reposition.Corner = function(a, b) {
            a = ("" + a).replace(/([A-Z])/, " $1").replace(/middle/gi, H).toLowerCase(), this.x = (a.match(/left|right/i) || a.match(/center/) || ["inherit"])[0].toLowerCase(), this.y = (a.match(/top|bottom|center/i) || ["inherit"])[0].toLowerCase(), this.forceY = !!b;
            var c = a.charAt(0);
            this.precedance = "t" === c || "b" === c ? C : B;
        }).prototype;
        Z.invert = function(a, b) {
            this[a] = this[a] === E ? G : this[a] === G ? E : b || this[a];
        }, Z.string = function() {
            var a = this.x,
                b = this.y;
            return a === b ? a : this.precedance === C || this.forceY && "center" !== b ? b + " " + a : a + " " + b;
        }, Z.abbrev = function() {
            var a = this.string().split(" ");
            return a[0].charAt(0) + (a[1] && a[1].charAt(0) || "");
        }, Z.clone = function() {
            return new v(this.string(), this.forceY);
        }, u.toggle = function(a, c) {
            var e = this.cache,
                f = this.options,
                g = this.tooltip;
            if (c) {
                if (/over|enter/.test(c.type) && /out|leave/.test(e.event.type) && f.show.target.add(c.target).length === f.show.target.length && g.has(c.relatedTarget).length) return this;
                e.event = l(c);
            }
            if (this.waiting && !a && (this.hiddenDuringWait = y), !this.rendered) return a ? this.render(1) : this;
            if (this.destroyed || this.disabled) return this;
            var h, i, j, k = a ? "show" : "hide",
                m = this.options[k],
                n = (this.options[a ? "hide" : "show"], this.options.position),
                o = this.options.content,
                p = this.tooltip.css("width"),
                q = this.tooltip.is(":visible"),
                r = a || 1 === m.target.length,
                s = !c || m.target.length < 2 || e.target[0] === c.target;
            return (typeof a).search("boolean|number") && (a = !q), h = !g.is(":animated") && q === a && s, i = h ? A : !!this._trigger(k, [90]), this.destroyed ? this : (i !== z && a && this.focus(c), !i || h ? this : (d.attr(g[0], "aria-hidden", !a), a ? (e.origin = l(this.mouse), d.isFunction(o.text) && this._updateContent(o.text, z), d.isFunction(o.title) && this._updateTitle(o.title, z), !x && "mouse" === n.target && n.adjust.mouse && (d(b).bind("mousemove." + J, this._storeMouse), x = y), p || g.css("width", g.outerWidth(z)), this.reposition(c, arguments[2]), p || g.css("width", ""), m.solo && ("string" == typeof m.solo ? d(m.solo) : d(N, m.solo)).not(g).not(m.target).qtip("hide", d.Event("tooltipsolo"))) : (clearTimeout(this.timers.show), delete e.origin, x && !d(N + '[tracking="true"]:visible', m.solo).not(g).length && (d(b).unbind("mousemove." + J), x = z), this.blur(c)), j = d.proxy(function() {
                a ? (W.ie && g[0].style.removeAttribute("filter"), g.css("overflow", ""), "string" == typeof m.autofocus && d(this.options.show.autofocus, g).focus(), this.options.show.target.trigger("qtip-" + this.id + "-inactive")) : g.css({
                    display: "",
                    visibility: "",
                    opacity: "",
                    left: "",
                    top: ""
                }), this._trigger(a ? "visible" : "hidden");
            }, this), m.effect === z || r === z ? (g[k](), j()) : d.isFunction(m.effect) ? (g.stop(1, 1), m.effect.call(g, this), g.queue("fx", function(a) {
                j(), a();
            })) : g.fadeTo(90, a ? 1 : 0, j), a && m.target.trigger("qtip-" + this.id + "-inactive"), this));
        }, u.show = function(a) {
            return this.toggle(y, a);
        }, u.hide = function(a) {
            return this.toggle(z, a);
        }, u.focus = function(a) {
            if (!this.rendered || this.destroyed) return this;
            var b = d(N),
                c = this.tooltip,
                e = parseInt(c[0].style.zIndex, 10),
                f = t.zindex + b.length;
            return c.hasClass(R) || this._trigger("focus", [f], a) && (e !== f && (b.each(function() {
                this.style.zIndex > e && (this.style.zIndex = this.style.zIndex - 1);
            }), b.filter("." + R).qtip("blur", a)), c.addClass(R)[0].style.zIndex = f), this;
        }, u.blur = function(a) {
            return !this.rendered || this.destroyed ? this : (this.tooltip.removeClass(R), this._trigger("blur", [this.tooltip.css("zIndex")], a), this);
        }, u.disable = function(a) {
            return this.destroyed ? this : ("toggle" === a ? a = !(this.rendered ? this.tooltip.hasClass(T) : this.disabled) : "boolean" != typeof a && (a = y), this.rendered && this.tooltip.toggleClass(T, a).attr("aria-disabled", a), this.disabled = !!a, this);
        }, u.enable = function() {
            return this.disable(z);
        }, u._createButton = function() {
            var a = this,
                b = this.elements,
                c = b.tooltip,
                e = this.options.content.button,
                f = "string" == typeof e,
                g = f ? e : "Close tooltip";
            b.button && b.button.remove(), b.button = e.jquery ? e : d("<a />", {
                "class": "qtip-close " + (this.options.style.widget ? "" : J + "-icon"),
                title: g,
                "aria-label": g
            }).prepend(d("<span />", {
                "class": "ui-icon ui-icon-close",
                html: "&times;"
            })), b.button.appendTo(b.titlebar || c).attr("role", "button").click(function(b) {
                return c.hasClass(T) || a.hide(b), z;
            });
        }, u._updateButton = function(a) {
            if (!this.rendered) return z;
            var b = this.elements.button;
            a ? this._createButton() : b.remove();
        }, u._setWidget = function() {
            var a = this.options.style.widget,
                b = this.elements,
                c = b.tooltip,
                d = c.hasClass(T);
            c.removeClass(T), T = a ? "ui-state-disabled" : "qtip-disabled", c.toggleClass(T, d), c.toggleClass("ui-helper-reset " + k(), a).toggleClass(Q, this.options.style.def && !a), b.content && b.content.toggleClass(k("content"), a), b.titlebar && b.titlebar.toggleClass(k("header"), a), b.button && b.button.toggleClass(J + "-icon", !a);
        }, u._storeMouse = function(a) {
            (this.mouse = l(a)).type = "mousemove";
        }, u._bind = function(a, b, c, e, f) {
            var g = "." + this._id + (e ? "-" + e : "");
            b.length && d(a).bind((b.split ? b : b.join(g + " ")) + g, d.proxy(c, f || this));
        }, u._unbind = function(a, b) {
            d(a).unbind("." + this._id + (b ? "-" + b : ""));
        };
        var ab = "." + J;
        d(function() {
            r(N, ["mouseenter", "mouseleave"], function(a) {
                var b = "mouseenter" === a.type,
                    c = d(a.currentTarget),
                    e = d(a.relatedTarget || a.target),
                    f = this.options;
                b ? (this.focus(a), c.hasClass(P) && !c.hasClass(T) && clearTimeout(this.timers.hide)) : "mouse" === f.position.target && f.hide.event && f.show.target && !e.closest(f.show.target[0]).length && this.hide(a), c.toggleClass(S, b);
            }), r("[" + L + "]", O, p);
        }), u._trigger = function(a, b, c) {
            var e = d.Event("tooltip" + a);
            return e.originalEvent = c && d.extend({}, c) || this.cache.event || A, this.triggering = a, this.tooltip.trigger(e, [this].concat(b || [])), this.triggering = z, !e.isDefaultPrevented();
        }, u._bindEvents = function(a, b, c, e, f, g) {
            if (e.add(c).length === e.length) {
                var h = [];
                b = d.map(b, function(b) {
                    var c = d.inArray(b, a);
                    return c > -1 ? (h.push(a.splice(c, 1)[0]), void 0) : b;
                }), h.length && this._bind(c, h, function(a) {
                    var b = this.rendered ? this.tooltip[0].offsetWidth > 0 : !1;
                    (b ? g : f).call(this, a);
                });
            }
            this._bind(c, a, f), this._bind(e, b, g);
        }, u._assignInitialEvents = function(a) {
            function b(a) {
                return this.disabled || this.destroyed ? z : (this.cache.event = l(a), this.cache.target = a ? d(a.target) : [c], clearTimeout(this.timers.show), this.timers.show = m.call(this, function() {
                    this.render("object" == typeof a || e.show.ready);
                }, e.show.delay), void 0);
            }
            var e = this.options,
                f = e.show.target,
                g = e.hide.target,
                h = e.show.event ? d.trim("" + e.show.event).split(" ") : [],
                i = e.hide.event ? d.trim("" + e.hide.event).split(" ") : [];
            /mouse(over|enter)/i.test(e.show.event) && !/mouse(out|leave)/i.test(e.hide.event) && i.push("mouseleave"), this._bind(f, "mousemove", function(a) {
                this._storeMouse(a), this.cache.onTarget = y;
            }), this._bindEvents(h, i, f, g, b, function() {
                clearTimeout(this.timers.show);
            }), (e.show.ready || e.prerender) && b.call(this, a);
        }, u._assignEvents = function() {
            var c = this,
                e = this.options,
                f = e.position,
                g = this.tooltip,
                h = e.show.target,
                i = e.hide.target,
                j = f.container,
                k = f.viewport,
                l = d(b),
                m = (d(b.body), d(a)),
                r = e.show.event ? d.trim("" + e.show.event).split(" ") : [],
                s = e.hide.event ? d.trim("" + e.hide.event).split(" ") : [];
            d.each(e.events, function(a, b) {
                c._bind(g, "toggle" === a ? ["tooltipshow", "tooltiphide"] : ["tooltip" + a], b, null, g);
            }), /mouse(out|leave)/i.test(e.hide.event) && "window" === e.hide.leave && this._bind(l, ["mouseout", "blur"], function(a) {
                /select|option/.test(a.target.nodeName) || a.relatedTarget || this.hide(a);
            }), e.hide.fixed ? i = i.add(g.addClass(P)) : /mouse(over|enter)/i.test(e.show.event) && this._bind(i, "mouseleave", function() {
                clearTimeout(this.timers.show);
            }), ("" + e.hide.event).indexOf("unfocus") > -1 && this._bind(j.closest("html"), ["mousedown", "touchstart"], function(a) {
                var b = d(a.target),
                    c = this.rendered && !this.tooltip.hasClass(T) && this.tooltip[0].offsetWidth > 0,
                    e = b.parents(N).filter(this.tooltip[0]).length > 0;
                b[0] === this.target[0] || b[0] === this.tooltip[0] || e || this.target.has(b[0]).length || !c || this.hide(a);
            }), "number" == typeof e.hide.inactive && (this._bind(h, "qtip-" + this.id + "-inactive", p), this._bind(i.add(g), t.inactiveEvents, p, "-inactive")), this._bindEvents(r, s, h, i, n, o), this._bind(h.add(g), "mousemove", function(a) {
                if ("number" == typeof e.hide.distance) {
                    var b = this.cache.origin || {},
                        c = this.options.hide.distance,
                        d = Math.abs;
                    (d(a.pageX - b.pageX) >= c || d(a.pageY - b.pageY) >= c) && this.hide(a);
                }
                this._storeMouse(a);
            }), "mouse" === f.target && f.adjust.mouse && (e.hide.event && this._bind(h, ["mouseenter", "mouseleave"], function(a) {
                this.cache.onTarget = "mouseenter" === a.type;
            }), this._bind(l, "mousemove", function(a) {
                this.rendered && this.cache.onTarget && !this.tooltip.hasClass(T) && this.tooltip[0].offsetWidth > 0 && this.reposition(a);
            })), (f.adjust.resize || k.length) && this._bind(d.event.special.resize ? k : m, "resize", q), f.adjust.scroll && this._bind(m.add(f.container), "scroll", q);
        }, u._unassignEvents = function() {
            var c = [this.options.show.target[0], this.options.hide.target[0], this.rendered && this.tooltip[0], this.options.position.container[0], this.options.position.viewport[0], this.options.position.container.closest("html")[0], a, b];
            this._unbind(d([]).pushStack(d.grep(c, function(a) {
                return "object" == typeof a;
            })));
        }, t = d.fn.qtip = function(a, b, e) {
            var f = ("" + a).toLowerCase(),
                g = A,
                i = d.makeArray(arguments).slice(1),
                j = i[i.length - 1],
                k = this[0] ? d.data(this[0], J) : A;
            return !arguments.length && k || "api" === f ? k : "string" == typeof a ? (this.each(function() {
                var a = d.data(this, J);
                if (!a) return y;
                if (j && j.timeStamp && (a.cache.event = j), !b || "option" !== f && "options" !== f) a[f] && a[f].apply(a, i);
                else {
                    if (e === c && !d.isPlainObject(b)) return g = a.get(b), z;
                    a.set(b, e);
                }
            }), g !== A ? g : this) : "object" != typeof a && arguments.length ? void 0 : (k = h(d.extend(y, {}, a)), this.each(function(a) {
                var b, c;
                return c = d.isArray(k.id) ? k.id[a] : k.id, c = !c || c === z || c.length < 1 || t.api[c] ? t.nextid++ : c, b = s(d(this), c, k), b === z ? y : (t.api[c] = b, d.each(I, function() {
                    "initialize" === this.initialize && this(b);
                }), b._assignInitialEvents(j), void 0);
            }));
        }, d.qtip = e, t.api = {}, d.each({
            attr: function(a, b) {
                if (this.length) {
                    var c = this[0],
                        e = "title",
                        f = d.data(c, "qtip");
                    if (a === e && f && "object" == typeof f && f.options.suppress) return arguments.length < 2 ? d.attr(c, V) : (f && f.options.content.attr === e && f.cache.attr && f.set("content.text", b), this.attr(V, b));
                }
                return d.fn["attr" + U].apply(this, arguments);
            },
            clone: function(a) {
                var b = (d([]), d.fn["clone" + U].apply(this, arguments));
                return a || b.filter("[" + V + "]").attr("title", function() {
                    return d.attr(this, V);
                }).removeAttr(V), b;
            }
        }, function(a, b) {
            if (!b || d.fn[a + U]) return y;
            var c = d.fn[a + U] = d.fn[a];
            d.fn[a] = function() {
                return b.apply(this, arguments) || c.apply(this, arguments);
            };
        }), d.ui || (d["cleanData" + U] = d.cleanData, d.cleanData = function(a) {
            for (var b, c = 0;
                (b = d(a[c])).length; c++)
                if (b.attr(K)) try {
                    b.triggerHandler("removeqtip");
                } catch (e) {}
            d["cleanData" + U].apply(this, arguments);
        }), t.version = "2.2.0", t.nextid = 0, t.inactiveEvents = O, t.zindex = 15e3, t.defaults = {
            prerender: z,
            id: z,
            overwrite: y,
            suppress: y,
            content: {
                text: y,
                attr: "title",
                title: z,
                button: z
            },
            position: {
                my: "top left",
                at: "bottom right",
                target: z,
                container: z,
                viewport: z,
                adjust: {
                    x: 0,
                    y: 0,
                    mouse: y,
                    scroll: y,
                    resize: y,
                    method: "flipinvert flipinvert"
                },
                effect: function(a, b) {
                    d(this).animate(b, {
                        duration: 200,
                        queue: z
                    });
                }
            },
            show: {
                target: z,
                event: "mouseenter",
                effect: y,
                delay: 90,
                solo: z,
                ready: z,
                autofocus: z
            },
            hide: {
                target: z,
                event: "mouseleave",
                effect: y,
                delay: 0,
                fixed: z,
                inactive: z,
                leave: "window",
                distance: z
            },
            style: {
                classes: "",
                widget: z,
                width: z,
                height: z,
                def: y
            },
            events: {
                render: A,
                move: A,
                show: A,
                hide: A,
                toggle: A,
                visible: A,
                hidden: A,
                focus: A,
                blur: A
            }
        };
    });
}(window, document);

function FastClick(a, b) {
    "use strict";

    function c(a, b) {
        return function() {
            return a.apply(b, arguments);
        };
    }
    var d;
    if (b = b || {}, this.trackingClick = !1, this.trackingClickStart = 0, this.targetElement = null, this.touchStartX = 0, this.touchStartY = 0, this.lastTouchIdentifier = 0, this.touchBoundary = b.touchBoundary || 10, this.layer = a, this.tapDelay = b.tapDelay || 200, !FastClick.notNeeded(a)) {
        for (var e = ["onMouse", "onClick", "onTouchStart", "onTouchMove", "onTouchEnd", "onTouchCancel"], f = this, g = 0, h = e.length; h > g; g++) f[e[g]] = c(f[e[g]], f);
        deviceIsAndroid && (a.addEventListener("mouseover", this.onMouse, !0), a.addEventListener("mousedown", this.onMouse, !0), a.addEventListener("mouseup", this.onMouse, !0)), a.addEventListener("click", this.onClick, !0), a.addEventListener("touchstart", this.onTouchStart, !1), a.addEventListener("touchmove", this.onTouchMove, !1), a.addEventListener("touchend", this.onTouchEnd, !1), a.addEventListener("touchcancel", this.onTouchCancel, !1), Event.prototype.stopImmediatePropagation || (a.removeEventListener = function(b, c, d) {
            var e = Node.prototype.removeEventListener;
            "click" === b ? e.call(a, b, c.hijacked || c, d) : e.call(a, b, c, d);
        }, a.addEventListener = function(b, c, d) {
            var e = Node.prototype.addEventListener;
            "click" === b ? e.call(a, b, c.hijacked || (c.hijacked = function(a) {
                a.propagationStopped || c(a);
            }), d) : e.call(a, b, c, d);
        }), "function" == typeof a.onclick && (d = a.onclick, a.addEventListener("click", function(a) {
            d(a);
        }, !1), a.onclick = null);
    }
}
var deviceIsAndroid = navigator.userAgent.indexOf("Android") > 0,
    deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent),
    deviceIsIOS4 = deviceIsIOS && /OS 4_\d(_\d)?/.test(navigator.userAgent),
    deviceIsIOSWithBadTarget = deviceIsIOS && /OS ([6-9]|\d{2})_\d/.test(navigator.userAgent);
FastClick.prototype.needsClick = function(a) {
    "use strict";
    switch (a.nodeName.toLowerCase()) {
        case "button":
        case "select":
        case "textarea":
            if (a.disabled) return !0;
            break;
        case "input":
            if (deviceIsIOS && "file" === a.type || a.disabled) return !0;
            break;
        case "label":
        case "video":
            return !0;
    }
    return /\bneedsclick\b/.test(a.className);
}, FastClick.prototype.needsFocus = function(a) {
    "use strict";
    switch (a.nodeName.toLowerCase()) {
        case "textarea":
            return !0;
        case "select":
            return !deviceIsAndroid;
        case "input":
            switch (a.type) {
                case "button":
                case "checkbox":
                case "file":
                case "image":
                case "radio":
                case "submit":
                    return !1;
            }
            return !a.disabled && !a.readOnly;
        default:
            return /\bneedsfocus\b/.test(a.className);
    }
}, FastClick.prototype.sendClick = function(a, b) {
    "use strict";
    var c, d;
    document.activeElement && document.activeElement !== a && document.activeElement.blur(), d = b.changedTouches[0], c = document.createEvent("MouseEvents"), c.initMouseEvent(this.determineEventType(a), !0, !0, window, 1, d.screenX, d.screenY, d.clientX, d.clientY, !1, !1, !1, !1, 0, null), c.forwardedTouchEvent = !0, a.dispatchEvent(c);
}, FastClick.prototype.determineEventType = function(a) {
    "use strict";
    return deviceIsAndroid && "select" === a.tagName.toLowerCase() ? "mousedown" : "click";
}, FastClick.prototype.focus = function(a) {
    "use strict";
    var b;
    deviceIsIOS && a.setSelectionRange && 0 !== a.type.indexOf("date") && "time" !== a.type ? (b = a.value.length, a.setSelectionRange(b, b)) : a.focus();
}, FastClick.prototype.updateScrollParent = function(a) {
    "use strict";
    var b, c;
    if (b = a.fastClickScrollParent, !b || !b.contains(a)) {
        c = a;
        do {
            if (c.scrollHeight > c.offsetHeight) {
                b = c, a.fastClickScrollParent = c;
                break;
            }
            c = c.parentElement;
        } while (c);
    }
    b && (b.fastClickLastScrollTop = b.scrollTop);
}, FastClick.prototype.getTargetElementFromEventTarget = function(a) {
    "use strict";
    return a.nodeType === Node.TEXT_NODE ? a.parentNode : a;
}, FastClick.prototype.onTouchStart = function(a) {
    "use strict";
    var b, c, d;
    if (a.targetTouches.length > 1) return !0;
    if (b = this.getTargetElementFromEventTarget(a.target), c = a.targetTouches[0], deviceIsIOS) {
        if (d = window.getSelection(), d.rangeCount && !d.isCollapsed) return !0;
        if (!deviceIsIOS4) {
            if (c.identifier === this.lastTouchIdentifier) return a.preventDefault(), !1;
            this.lastTouchIdentifier = c.identifier, this.updateScrollParent(b);
        }
    }
    return this.trackingClick = !0, this.trackingClickStart = a.timeStamp, this.targetElement = b, this.touchStartX = c.pageX, this.touchStartY = c.pageY, a.timeStamp - this.lastClickTime < this.tapDelay && a.preventDefault(), !0;
}, FastClick.prototype.touchHasMoved = function(a) {
    "use strict";
    var b = a.changedTouches[0],
        c = this.touchBoundary;
    return Math.abs(b.pageX - this.touchStartX) > c || Math.abs(b.pageY - this.touchStartY) > c ? !0 : !1;
}, FastClick.prototype.onTouchMove = function(a) {
    "use strict";
    return this.trackingClick ? ((this.targetElement !== this.getTargetElementFromEventTarget(a.target) || this.touchHasMoved(a)) && (this.trackingClick = !1, this.targetElement = null), !0) : !0;
}, FastClick.prototype.findControl = function(a) {
    "use strict";
    return void 0 !== a.control ? a.control : a.htmlFor ? document.getElementById(a.htmlFor) : a.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea");
}, FastClick.prototype.onTouchEnd = function(a) {
    "use strict";
    var b, c, d, e, f, g = this.targetElement;
    if (!this.trackingClick) return !0;
    if (a.timeStamp - this.lastClickTime < this.tapDelay) return this.cancelNextClick = !0, !0;
    if (this.cancelNextClick = !1, this.lastClickTime = a.timeStamp, c = this.trackingClickStart, this.trackingClick = !1, this.trackingClickStart = 0, deviceIsIOSWithBadTarget && (f = a.changedTouches[0], g = document.elementFromPoint(f.pageX - window.pageXOffset, f.pageY - window.pageYOffset) || g, g.fastClickScrollParent = this.targetElement.fastClickScrollParent), d = g.tagName.toLowerCase(), "label" === d) {
        if (b = this.findControl(g)) {
            if (this.focus(g), deviceIsAndroid) return !1;
            g = b;
        }
    } else if (this.needsFocus(g)) return a.timeStamp - c > 100 || deviceIsIOS && window.top !== window && "input" === d ? (this.targetElement = null, !1) : (this.focus(g), this.sendClick(g, a), deviceIsIOS && "select" === d || (this.targetElement = null, a.preventDefault()), !1);
    return deviceIsIOS && !deviceIsIOS4 && (e = g.fastClickScrollParent, e && e.fastClickLastScrollTop !== e.scrollTop) ? !0 : (this.needsClick(g) || (a.preventDefault(), this.sendClick(g, a)), !1);
}, FastClick.prototype.onTouchCancel = function() {
    "use strict";
    this.trackingClick = !1, this.targetElement = null;
}, FastClick.prototype.onMouse = function(a) {
    "use strict";
    return this.targetElement ? a.forwardedTouchEvent ? !0 : a.cancelable && (!this.needsClick(this.targetElement) || this.cancelNextClick) ? (a.stopImmediatePropagation ? a.stopImmediatePropagation() : a.propagationStopped = !0, a.stopPropagation(), a.preventDefault(), !1) : !0 : !0;
}, FastClick.prototype.onClick = function(a) {
    "use strict";
    var b;
    return this.trackingClick ? (this.targetElement = null, this.trackingClick = !1, !0) : "submit" === a.target.type && 0 === a.detail ? !0 : (b = this.onMouse(a), b || (this.targetElement = null), b);
}, FastClick.prototype.destroy = function() {
    "use strict";
    var a = this.layer;
    deviceIsAndroid && (a.removeEventListener("mouseover", this.onMouse, !0), a.removeEventListener("mousedown", this.onMouse, !0), a.removeEventListener("mouseup", this.onMouse, !0)), a.removeEventListener("click", this.onClick, !0), a.removeEventListener("touchstart", this.onTouchStart, !1), a.removeEventListener("touchmove", this.onTouchMove, !1), a.removeEventListener("touchend", this.onTouchEnd, !1), a.removeEventListener("touchcancel", this.onTouchCancel, !1);
}, FastClick.notNeeded = function(a) {
    "use strict";
    var b, c;
    if ("undefined" == typeof window.ontouchstart) return !0;
    if (c = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1]) {
        if (!deviceIsAndroid) return !0;
        if (b = document.querySelector("meta[name=viewport]")) {
            if (-1 !== b.content.indexOf("user-scalable=no")) return !0;
            if (c > 31 && document.documentElement.scrollWidth <= window.outerWidth) return !0;
        }
    }
    return "none" === a.style.msTouchAction ? !0 : !1;
}, FastClick.attach = function(a, b) {
    "use strict";
    return new FastClick(a, b);
}, "function" == typeof define && "object" == typeof define.amd && define.amd ? define(function() {
    "use strict";
    return FastClick;
}) : "undefined" != typeof module && module.exports ? (module.exports = FastClick.attach, module.exports.FastClick = FastClick) : window.FastClick = FastClick;
(function(a, b, c) {
    var d = /\+/g;

    function e(a) {
        return a;
    }

    function f(a) {
        return decodeURIComponent(a.replace(d, ' '));
    }
    var g = a.cookie = function(d, h, i) {
        if (h !== c) {
            i = a.extend({}, g.defaults, i);
            if (h === null) i.expires = -1;
            if (typeof i.expires === 'number') {
                var j = i.expires,
                    k = i.expires = new Date();
                k.setDate(k.getDate() + j);
            }
            h = g.json ? JSON.stringify(h) : String(h);
            return (b.cookie = [encodeURIComponent(d), '=', g.raw ? h : encodeURIComponent(h), i.expires ? '; expires=' + i.expires.toUTCString() : '', i.path ? '; path=' + i.path : '', i.domain ? '; domain=' + i.domain : '', i.secure ? '; secure' : ''].join(''));
        }
        var l = g.raw ? e : f;
        var m = b.cookie.split('; ');
        for (var n = 0, o;
            (o = m[n] && m[n].split('=')); n++)
            if (l(o.shift()) === d) {
                var p = l(o.join('='));
                return g.json ? JSON.parse(p) : p;
            }
        return null;
    };
    g.defaults = {};
    a.removeCookie = function(b, c) {
        if (a.cookie(b) !== null) {
            a.cookie(b, null, c);
            return true;
        }
        return false;
    };
})(jQuery, document);
(function(a, b, c, d) {
    'use strict';
    var e = function(b) {
        var c = b.length;
        var d = a('head');
        while (c--)
            if (d.has('.' + b[c]).length === 0) d.append('<meta class="' + b[c] + '" />');
    };
    e(['foundation-mq-small', 'foundation-mq-medium', 'foundation-mq-large', 'foundation-mq-xlarge', 'foundation-mq-xxlarge', 'foundation-data-attribute-namespace']);
    a(function() {
        if (typeof FastClick !== 'undefined')
            if (typeof c.body !== 'undefined') FastClick.attach(c.body);
    });
    var f = function(b, d) {
        if (typeof b === 'string') {
            if (d) {
                var e;
                if (d.jquery) {
                    e = d[0];
                    if (!e) return d;
                } else e = d;
                return a(e.querySelectorAll(b));
            }
            return a(c.querySelectorAll(b));
        }
        return a(b, d);
    };
    var g = function(a) {
        var b = [];
        if (!a) b.push('data');
        if (this.namespace.length > 0) b.push(this.namespace);
        b.push(this.name);
        return b.join('-');
    };
    var h = function(a) {
        var b = a.split('-'),
            c = b.length,
            d = [];
        while (c--)
            if (c !== 0) d.push(b[c]);
            else if (this.namespace.length > 0) d.push(this.namespace, b[c]);
        else d.push(b[c]);
        return d.reverse().join('-');
    };
    var i = function(b, c) {
        var d = this,
            e = !f(this).data(this.attr_name(true));
        if (typeof b === 'string') return this[b].call(this, c);
        if (f(this.scope).is('[' + this.attr_name() + ']')) {
            f(this.scope).data(this.attr_name(true) + '-init', a.extend({}, this.settings, (c || b), this.data_options(f(this.scope))));
            if (e) this.events(this.scope);
        } else f('[' + this.attr_name() + ']', this.scope).each(function() {
            var e = !f(this).data(d.attr_name(true) + '-init');
            f(this).data(d.attr_name(true) + '-init', a.extend({}, d.settings, (c || b), d.data_options(f(this))));
            if (e) d.events(this);
        });
    };
    var j = function(a, b) {
        function c() {
            b(a[0]);
        }

        function d() {
            this.one('load', c);
            if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
                var a = this.attr('src'),
                    b = a.match(/\?/) ? '&' : '?';
                b += 'random=' + new Date().getTime();
                this.attr('src', a + b);
            }
        }
        if (!a.attr('src')) {
            c();
            return;
        }
        if (a[0].complete || a[0].readyState === 4) c();
        else d.call(a);
    };
    b.matchMedia = b.matchMedia || (function(a) {
        "use strict";
        var b, c = a.documentElement,
            d = c.firstElementChild || c.firstChild,
            e = a.createElement("body"),
            f = a.createElement("div");
        f.id = "mq-test-1";
        f.style.cssText = "position:absolute;top:-100em";
        e.style.background = "none";
        e.appendChild(f);
        return function(a) {
            f.innerHTML = "&shy;<style media=\"" + a + "\"> #mq-test-1 { width: 42px; }</style>";
            c.insertBefore(e, d);
            b = f.offsetWidth === 42;
            c.removeChild(e);
            return {
                matches: b,
                media: a
            };
        };
    }(c));
    (function(a) {
        var c, d = 0,
            e = ['webkit', 'moz'],
            f = b.requestAnimationFrame,
            g = b.cancelAnimationFrame,
            h = 'undefined' !== typeof jQuery.fx;
        for (; d < e.length && !f; d++) {
            f = b[e[d] + "RequestAnimationFrame"];
            g = g || b[e[d] + "CancelAnimationFrame"] || b[e[d] + "CancelRequestAnimationFrame"];
        }

        function i() {
            if (c) {
                f(i);
                if (h) jQuery.fx.tick();
            }
        }
        if (f) {
            b.requestAnimationFrame = f;
            b.cancelAnimationFrame = g;
            if (h) {
                jQuery.fx.timer = function(a) {
                    if (a() && jQuery.timers.push(a) && !c) {
                        c = true;
                        i();
                    }
                };
                jQuery.fx.stop = function() {
                    c = false;
                };
            }
        } else {
            b.requestAnimationFrame = function(a) {
                var c = new Date().getTime(),
                    e = Math.max(0, 16 - (c - d)),
                    f = b.setTimeout(function() {
                        a(c + e);
                    }, e);
                d = c + e;
                return f;
            };
            b.cancelAnimationFrame = function(a) {
                clearTimeout(a);
            };
        }
    }(jQuery));

    function k(a) {
        if (typeof a === 'string' || a instanceof String) a = a.replace(/^['\\/"]+|(;\s?})+|['\\/"]+$/g, '');
        return a;
    }
    b.Foundation = {
        name: 'Foundation',
        version: '5.2.3',
        media_queries: {
            small: f('.foundation-mq-small').css('font-family').replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ''),
            medium: f('.foundation-mq-medium').css('font-family').replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ''),
            large: f('.foundation-mq-large').css('font-family').replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ''),
            xlarge: f('.foundation-mq-xlarge').css('font-family').replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ''),
            xxlarge: f('.foundation-mq-xxlarge').css('font-family').replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, '')
        },
        stylesheet: a('<style></style>').appendTo('head')[0].sheet,
        global: {
            namespace: d
        },
        init: function(a, b, c, d, e) {
            var g = [a, c, d, e],
                h = [];
            this.rtl = /rtl/i.test(f('html').attr('dir'));
            this.scope = a || this.scope;
            this.set_namespace();
            if (b && typeof b === 'string' && !/reflow/i.test(b)) {
                if (this.libs.hasOwnProperty(b)) h.push(this.init_lib(b, g));
            } else
                for (var i in this.libs) h.push(this.init_lib(i, b));
            return a;
        },
        init_lib: function(b, c) {
            if (this.libs.hasOwnProperty(b)) {
                this.patch(this.libs[b]);
                if (c && c.hasOwnProperty(b)) {
                    if (typeof this.libs[b].settings !== 'undefined') a.extend(true, this.libs[b].settings, c[b]);
                    else if (typeof this.libs[b].defaults !== 'undefined') a.extend(true, this.libs[b].defaults, c[b]);
                    return this.libs[b].init.apply(this.libs[b], [this.scope, c[b]]);
                }
                c = c instanceof Array ? c : new Array(c);
                return this.libs[b].init.apply(this.libs[b], c);
            }
            return function() {};
        },
        patch: function(a) {
            a.scope = this.scope;
            a.namespace = this.global.namespace;
            a.rtl = this.rtl;
            a.data_options = this.utils.data_options;
            a.attr_name = g;
            a.add_namespace = h;
            a.bindings = i;
            a.S = this.utils.S;
        },
        inherit: function(a, b) {
            var c = b.split(' '),
                d = c.length;
            while (d--)
                if (this.utils.hasOwnProperty(c[d])) a[c[d]] = this.utils[c[d]];
        },
        set_namespace: function() {
            var b = (this.global.namespace === d) ? a('.foundation-data-attribute-namespace').css('font-family') : this.global.namespace;
            this.global.namespace = (b === d || /false/i.test(b)) ? '' : b;
        },
        libs: {},
        utils: {
            S: f,
            throttle: function(a, b) {
                var c = null;
                return function() {
                    var d = this,
                        e = arguments;
                    if (c == null) c = setTimeout(function() {
                        a.apply(d, e);
                        c = null;
                    }, b);
                };
            },
            debounce: function(a, b, c) {
                var d, e;
                return function() {
                    var f = this,
                        g = arguments;
                    var h = function() {
                        d = null;
                        if (!c) e = a.apply(f, g);
                    };
                    var i = c && !d;
                    clearTimeout(d);
                    d = setTimeout(h, b);
                    if (i) e = a.apply(f, g);
                    return e;
                };
            },
            data_options: function(b, c) {
                c = c || 'options';
                var d = {},
                    e, f, g, h = function(a) {
                        var b = Foundation.global.namespace;
                        if (b.length > 0) return a.data(b + '-' + c);
                        return a.data(c);
                    };
                var i = h(b);
                if (typeof i === 'object') return i;
                g = (i || ':').split(';');
                e = g.length;

                function j(a) {
                    return !isNaN(a - 0) && a !== null && a !== "" && a !== false && a !== true;
                }

                function k(b) {
                    if (typeof b === 'string') return a.trim(b);
                    return b;
                }
                while (e--) {
                    f = g[e].split(':');
                    f = [f[0], f.slice(1).join(':')];
                    if (/true/i.test(f[1])) f[1] = true;
                    if (/false/i.test(f[1])) f[1] = false;
                    if (j(f[1]))
                        if (f[1].indexOf('.') === -1) f[1] = parseInt(f[1], 10);
                        else f[1] = parseFloat(f[1]);
                    if (f.length === 2 && f[0].length > 0) d[k(f[0])] = k(f[1]);
                }
                return d;
            },
            register_media: function(b, c) {
                if (Foundation.media_queries[b] === d) {
                    a('head').append('<meta class="' + c + '">');
                    Foundation.media_queries[b] = k(a('.' + c).css('font-family'));
                }
            },
            add_custom_rule: function(a, b) {
                if (b === d && Foundation.stylesheet) Foundation.stylesheet.insertRule(a, Foundation.stylesheet.cssRules.length);
                else {
                    var c = Foundation.media_queries[b];
                    if (c !== d) Foundation.stylesheet.insertRule('@media ' + Foundation.media_queries[b] + '{ ' + a + ' }');
                }
            },
            image_loaded: function(a, b) {
                var c = this,
                    d = a.length;
                if (d === 0) b(a);
                a.each(function() {
                    j(c.S(this), function() {
                        d -= 1;
                        if (d === 0) b(a);
                    });
                });
            },
            random_str: function() {
                if (!this.fidx) this.fidx = 0;
                this.prefix = this.prefix || [(this.name || 'F'), (+new Date()).toString(36)].join('-');
                return this.prefix + (this.fidx++).toString(36);
            }
        }
    };
    a.fn.foundation = function() {
        var a = Array.prototype.slice.call(arguments, 0);
        return this.each(function() {
            Foundation.init.apply(Foundation, [this].concat(a));
            return this;
        });
    };
}(jQuery, window, window.document));;
(function(a, b, c, d) {
    'use strict';
    Foundation.libs.accordion = {
        name: 'accordion',
        version: '5.2.3',
        settings: {
            active_class: 'active',
            multi_expand: false,
            toggleable: true,
            callback: function() {}
        },
        init: function(a, b, c) {
            this.bindings(b, c);
        },
        events: function() {
            var b = this;
            var c = this.S;
            c(this.scope).off('.fndtn.accordion').on('click.fndtn.accordion', '[' + this.attr_name() + '] > dd > a', function(d) {
                var e = c(this).closest('[' + b.attr_name() + ']'),
                    f = c('#' + this.href.split('#')[1]),
                    g = c('dd > .content', e),
                    h = a('dd', e),
                    i = b.attr_name() + '=' + e.attr(b.attr_name()),
                    j = e.data(b.attr_name(true) + '-init'),
                    k = c('dd > .content.' + j.active_class, e);
                d.preventDefault();
                if (e.attr(b.attr_name())) {
                    g = g.add('[' + i + '] dd > .content');
                    h = h.add('[' + i + '] dd');
                }
                if (j.toggleable && f.is(k)) {
                    f.parent('dd').toggleClass(j.active_class, false);
                    return f.toggleClass(j.active_class, false);
                }
                if (!j.multi_expand) {
                    g.removeClass(j.active_class);
                    h.removeClass(j.active_class);
                }
                f.addClass(j.active_class).parent().addClass(j.active_class);
                setTimeout(function() {
                    a('body,html').animate({
                        scrollTop: f.offset().top - 50
                    });
                }, 310);
                j.callback(f);
            });
        },
        off: function() {},
        reflow: function() {}
    };
}(jQuery, window, window.document));;
(function(a, b, c, d) {
    'use strict';
    Foundation.libs.abide = {
        name: 'abide',
        version: '5.2.3',
        settings: {
            live_validate: true,
            focus_on_invalid: true,
            error_labels: true,
            timeout: 1000,
            patterns: {
                alpha: /^[a-zA-Z]+$/,
                alpha_numeric: /^[a-zA-Z0-9]+$/,
                integer: /^[-+]?\d+$/,
                number: /^[-+]?\d*(?:\.\d+)?$/,
                card: /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,
                cvv: /^([0-9]){3,4}$/,
                email: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
                url: /^(https?|ftp|file|ssh):\/\/(((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/,
                domain: /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$/,
                datetime: /^([0-2][0-9]{3})\-([0-1][0-9])\-([0-3][0-9])T([0-5][0-9])\:([0-5][0-9])\:([0-5][0-9])(Z|([\-\+]([0-1][0-9])\:00))$/,
                date: /(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))$/,
                time: /^(0[0-9]|1[0-9]|2[0-3])(:[0-5][0-9]){2}$/,
                dateISO: /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/,
                month_day_year: /^(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.]\d{4}$/,
                color: /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/
            },
            validators: {
                equalTo: function(a, b, d) {
                    var e = c.getElementById(a.getAttribute(this.add_namespace('data-equalto'))).value,
                        f = a.value,
                        g = (e === f);
                    return g;
                }
            }
        },
        timer: null,
        init: function(a, b, c) {
            this.bindings(b, c);
        },
        events: function(b) {
            var c = this,
                d = c.S(b).attr('novalidate', 'novalidate'),
                e = d.data(this.attr_name(true) + '-init') || {};
            this.invalid_attr = this.add_namespace('data-invalid');
            d.off('.abide').on('submit.fndtn.abide validate.fndtn.abide', function(a) {
                var b = /ajax/i.test(c.S(this).attr(c.attr_name()));
                return c.validate(c.S(this).find('input, textarea, select').get(), a, b);
            }).on('reset', function() {
                return c.reset(a(this));
            }).find('input, textarea, select').off('.abide').on('blur.fndtn.abide change.fndtn.abide', function(a) {
                c.validate([this], a);
            }).on('keydown.fndtn.abide', function(a) {
                if (e.live_validate === true) {
                    clearTimeout(c.timer);
                    c.timer = setTimeout(function() {
                        c.validate([this], a);
                    }.bind(this), e.timeout);
                }
            });
        },
        reset: function(b) {
            b.removeAttr(this.invalid_attr);
            a(this.invalid_attr, b).removeAttr(this.invalid_attr);
            a('.error', b).not('small').removeClass('error');
        },
        validate: function(a, b, c) {
            var d = this.parse_patterns(a),
                e = d.length,
                f = this.S(a[0]).closest('[data-' + this.attr_name(true) + ']'),
                g = f.data(this.attr_name(true) + '-init') || {},
                h = /submit/.test(b.type);
            f.trigger('validated');
            for (var i = 0; i < e; i++)
                if (!d[i] && (h || c)) {
                    if (g.focus_on_invalid) a[i].focus();
                    f.trigger('invalid');
                    this.S(a[i]).closest('[data-' + this.attr_name(true) + ']').attr(this.invalid_attr, '');
                    return false;
                }
            if (h || c) f.trigger('valid');
            f.removeAttr(this.invalid_attr);
            if (c) return false;
            return true;
        },
        parse_patterns: function(a) {
            var b = a.length,
                c = [];
            while (b--) c.push(this.pattern(a[b]));
            return this.check_validation_and_apply_styles(c);
        },
        pattern: function(a) {
            var b = a.getAttribute('type'),
                c = typeof a.getAttribute('required') === 'string';
            var d = a.getAttribute('pattern') || '';
            if (this.settings.patterns.hasOwnProperty(d) && d.length > 0) return [a, this.settings.patterns[d], c];
            else if (d.length > 0) return [a, new RegExp('^' + d + '$'), c];
            if (this.settings.patterns.hasOwnProperty(b)) return [a, this.settings.patterns[b], c];
            d = /.*/;
            return [a, d, c];
        },
        check_validation_and_apply_styles: function(b) {
            var c = b.length,
                d = [],
                e = this.S(b[0][0]).closest('[data-' + this.attr_name(true) + ']'),
                f = e.data(this.attr_name(true) + '-init') || {};
            while (c--) {
                var g = b[c][0],
                    h = b[c][2],
                    i = g.value.trim(),
                    j = this.S(g).parent(),
                    k = g.getAttribute(this.add_namespace('data-abide-validator')),
                    l = g.type === "radio",
                    m = g.type === "checkbox",
                    n = this.S('label[for="' + g.getAttribute('id') + '"]'),
                    o = h ? (g.value.length > 0) : true;
                var p, q;
                if (g.getAttribute(this.add_namespace('data-equalto'))) k = "equalTo";
                if (!j.is('label')) p = j;
                else p = j.parent();
                if (l && h) d.push(this.valid_radio(g, h));
                else if (m && h) d.push(this.valid_checkbox(g, h));
                else if (k) {
                    q = this.settings.validators[k].apply(this, [g, h, p]);
                    d.push(q);
                    if (q) {
                        this.S(g).removeAttr(this.invalid_attr);
                        p.removeClass('error');
                    } else {
                        this.S(g).attr(this.invalid_attr, '');
                        p.addClass('error');
                    }
                } else if (b[c][1].test(i) && o || !h && g.value.length < 1 || a(g).attr('disabled')) {
                    this.S(g).removeAttr(this.invalid_attr);
                    p.removeClass('error');
                    if (n.length > 0 && f.error_labels) n.removeClass('error');
                    d.push(true);
                    a(g).triggerHandler('valid');
                } else {
                    this.S(g).attr(this.invalid_attr, '');
                    p.addClass('error');
                    if (n.length > 0 && f.error_labels) n.addClass('error');
                    d.push(false);
                    a(g).triggerHandler('invalid');
                }
            }
            return d;
        },
        valid_checkbox: function(a, b) {
            var a = this.S(a),
                c = (a.is(':checked') || !b);
            if (c) a.removeAttr(this.invalid_attr).parent().removeClass('error');
            else a.attr(this.invalid_attr, '').parent().addClass('error');
            return c;
        },
        valid_radio: function(a, b) {
            var c = a.getAttribute('name'),
                d = this.S(a).closest('[data-' + this.attr_name(true) + ']').find("[name='" + c + "']"),
                e = d.length,
                f = false;
            for (var g = 0; g < e; g++)
                if (d[g].checked) f = true;
            for (var g = 0; g < e; g++)
                if (f) this.S(d[g]).removeAttr(this.invalid_attr).parent().removeClass('error');
                else this.S(d[g]).attr(this.invalid_attr, '').parent().addClass('error');
            return f;
        },
        valid_equal: function(a, b, d) {
            var e = c.getElementById(a.getAttribute(this.add_namespace('data-equalto'))).value,
                f = a.value,
                g = (e === f);
            if (g) {
                this.S(a).removeAttr(this.invalid_attr);
                d.removeClass('error');
            } else {
                this.S(a).attr(this.invalid_attr, '');
                d.addClass('error');
            }
            return g;
        },
        valid_oneof: function(a, b, c, d) {
            var a = this.S(a),
                e = this.S('[' + this.add_namespace('data-oneof') + ']'),
                f = e.filter(':checked').length > 0;
            if (f) a.removeAttr(this.invalid_attr).parent().removeClass('error');
            else a.attr(this.invalid_attr, '').parent().addClass('error');
            if (!d) {
                var g = this;
                e.each(function() {
                    g.valid_oneof.call(g, this, null, null, true);
                });
            }
            return f;
        }
    };
}(jQuery, window, window.document));;
(function(a, b, c, d) {
    'use strict';
    Foundation.libs.alert = {
        name: 'alert',
        version: '5.2.3',
        settings: {
            callback: function() {}
        },
        init: function(a, b, c) {
            this.bindings(b, c);
        },
        events: function() {
            var c = this,
                d = this.S;
            a(this.scope).off('.alert').on('click.fndtn.alert', '[' + this.attr_name() + '] a.close', function(a) {
                var e = d(this).closest('[' + c.attr_name() + ']'),
                    f = e.data(c.attr_name(true) + '-init') || c.settings;
                a.preventDefault();
                if ('transitionend' in b || 'webkitTransitionEnd' in b || 'oTransitionEnd' in b) {
                    e.addClass("alert-close");
                    e.on('transitionend webkitTransitionEnd oTransitionEnd', function(a) {
                        d(this).trigger('close').remove();
                        f.callback();
                    });
                } else e.fadeOut(300, function() {
                    d(this).trigger('close').remove();
                    f.callback();
                });
            });
        },
        reflow: function() {}
    };
}(jQuery, window, window.document));;
(function(a, b, c, d) {
    'use strict';
    Foundation.libs.clearing = {
        name: 'clearing',
        version: '5.2.3',
        settings: {
            templates: {
                viewing: '<a href="#" class="clearing-close">&times;</a>' + '<div class="visible-img" style="display: none"><div class="clearing-touch-label"></div><img src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D" alt="" />' + '<p class="clearing-caption"></p><a href="#" class="clearing-main-prev"><span></span></a>' + '<a href="#" class="clearing-main-next"><span></span></a></div>'
            },
            close_selectors: '.clearing-close',
            touch_label: '',
            init: false,
            locked: false
        },
        init: function(a, b, c) {
            var d = this;
            Foundation.inherit(this, 'throttle image_loaded');
            this.bindings(b, c);
            if (d.S(this.scope).is('[' + this.attr_name() + ']')) this.assemble(d.S('li', this.scope));
            else d.S('[' + this.attr_name() + ']', this.scope).each(function() {
                d.assemble(d.S('li', this));
            });
        },
        events: function(d) {
            var e = this,
                f = e.S,
                g = a('.scroll-container');
            if (g.length > 0) this.scope = g;
            f(this.scope).off('.clearing').on('click.fndtn.clearing', 'ul[' + this.attr_name() + '] li', function(a, b, c) {
                var b = b || f(this),
                    c = c || b,
                    d = b.next('li'),
                    g = b.closest('[' + e.attr_name() + ']').data(e.attr_name(true) + '-init'),
                    h = f(a.target);
                a.preventDefault();
                if (!g) {
                    e.init();
                    g = b.closest('[' + e.attr_name() + ']').data(e.attr_name(true) + '-init');
                }
                if (c.hasClass('visible') && b[0] === c[0] && d.length > 0 && e.is_open(b)) {
                    c = d;
                    h = f('img', c);
                }
                e.open(h, b, c);
                e.update_paddles(c);
            }).on('click.fndtn.clearing', '.clearing-main-next', function(a) {
                e.nav(a, 'next');
            }).on('click.fndtn.clearing', '.clearing-main-prev', function(a) {
                e.nav(a, 'prev');
            }).on('click.fndtn.clearing', this.settings.close_selectors, function(a) {
                Foundation.libs.clearing.close(a, this);
            });
            a(c).on('keydown.fndtn.clearing', function(a) {
                e.keydown(a);
            });
            f(b).off('.clearing').on('resize.fndtn.clearing', function() {
                e.resize();
            });
            this.swipe_events(d);
        },
        swipe_events: function(a) {
            var b = this,
                c = b.S;
            c(this.scope).on('touchstart.fndtn.clearing', '.visible-img', function(a) {
                if (!a.touches) a = a.originalEvent;
                var b = {
                    start_page_x: a.touches[0].pageX,
                    start_page_y: a.touches[0].pageY,
                    start_time: new Date().getTime(),
                    delta_x: 0,
                    is_scrolling: d
                };
                c(this).data('swipe-transition', b);
                a.stopPropagation();
            }).on('touchmove.fndtn.clearing', '.visible-img', function(a) {
                if (!a.touches) a = a.originalEvent;
                if (a.touches.length > 1 || a.scale && a.scale !== 1) return;
                var d = c(this).data('swipe-transition');
                if (typeof d === 'undefined') d = {};
                d.delta_x = a.touches[0].pageX - d.start_page_x;
                if (typeof d.is_scrolling === 'undefined') d.is_scrolling = !!(d.is_scrolling || Math.abs(d.delta_x) < Math.abs(a.touches[0].pageY - d.start_page_y));
                if (!d.is_scrolling && !d.active) {
                    a.preventDefault();
                    var e = (d.delta_x < 0) ? 'next' : 'prev';
                    d.active = true;
                    b.nav(a, e);
                }
            }).on('touchend.fndtn.clearing', '.visible-img', function(a) {
                c(this).data('swipe-transition', {});
                a.stopPropagation();
            });
        },
        assemble: function(b) {
            var c = b.parent();
            if (c.parent().hasClass('carousel')) return;
            c.after('<div id="foundationClearingHolder"></div>');
            var d = c.detach(),
                e = '';
            if (d[0] == null) return;
            else e = d[0].outerHTML;
            var f = this.S('#foundationClearingHolder'),
                g = c.data(this.attr_name(true) + '-init'),
                h = {
                    grid: '<div class="carousel">' + e + '</div>',
                    viewing: g.templates.viewing
                },
                i = '<div class="clearing-assembled"><div>' + h.viewing + h.grid + '</div></div>',
                j = this.settings.touch_label;
            if (Modernizr.touch) i = a(i).find('.clearing-touch-label').html(j).end();
            f.after(i).remove();
        },
        open: function(b, d, e) {
            var f = this,
                g = a(c.body),
                h = e.closest('.clearing-assembled'),
                i = f.S('div', h).first(),
                j = f.S('.visible-img', i),
                k = f.S('img', j).not(b),
                l = f.S('.clearing-touch-label', i),
                m = false;
            k.error(function() {
                m = true;
            });

            function n() {
                setTimeout(function() {
                    this.image_loaded(k, function() {
                        if (k.outerWidth() === 1 && !m) n.call(this);
                        else o.call(this, k);
                    }.bind(this));
                }.bind(this), 50);
            }

            function o(b) {
                var c = a(b);
                c.css('visibility', 'visible');
                g.css('overflow', 'hidden');
                h.addClass('clearing-blackout');
                i.addClass('clearing-container');
                j.show();
                this.fix_height(e).caption(f.S('.clearing-caption', j), f.S('img', e)).center_and_label(b, l).shift(d, e, function() {
                    e.siblings().removeClass('visible');
                    e.addClass('visible');
                });
                j.trigger('opened.fndtn.clearing');
            }
            if (!this.locked()) {
                j.trigger('open.fndtn.clearing');
                k.attr('src', this.load(b)).css('visibility', 'hidden');
                n.call(this);
            }
        },
        close: function(b, d) {
            b.preventDefault();
            var e = (function(a) {
                    if (/blackout/.test(a.selector)) return a;
                    else return a.closest('.clearing-blackout');
                }(a(d))),
                f = a(c.body),
                g, h;
            if (d === b.target && e) {
                f.css('overflow', '');
                g = a('div', e).first();
                h = a('.visible-img', g);
                h.trigger('close.fndtn.clearing');
                this.settings.prev_index = 0;
                a('ul[' + this.attr_name() + ']', e).attr('style', '').closest('.clearing-blackout').removeClass('clearing-blackout');
                g.removeClass('clearing-container');
                h.hide();
                h.trigger('closed.fndtn.clearing');
            }
            return false;
        },
        is_open: function(a) {
            return a.parent().prop('style').length > 0;
        },
        keydown: function(b) {
            var c = a('.clearing-blackout ul[' + this.attr_name() + ']'),
                d = this.rtl ? 37 : 39,
                e = this.rtl ? 39 : 37,
                f = 27;
            if (b.which === d) this.go(c, 'next');
            if (b.which === e) this.go(c, 'prev');
            if (b.which === f) this.S('a.clearing-close').trigger('click');
        },
        nav: function(b, c) {
            var d = a('ul[' + this.attr_name() + ']', '.clearing-blackout');
            b.preventDefault();
            this.go(d, c);
        },
        resize: function() {
            var b = a('img', '.clearing-blackout .visible-img'),
                c = a('.clearing-touch-label', '.clearing-blackout');
            if (b.length) {
                this.center_and_label(b, c);
                b.trigger('resized.fndtn.clearing');
            }
        },
        fix_height: function(a) {
            var b = a.parent().children(),
                c = this;
            b.each(function() {
                var a = c.S(this),
                    b = a.find('img');
                if (a.height() > b.outerHeight()) a.addClass('fix-height');
            }).closest('ul').width(b.length * 100 + '%');
            return this;
        },
        update_paddles: function(a) {
            var b = a.closest('.carousel').siblings('.visible-img');
            if (a.next().length > 0) this.S('.clearing-main-next', b).removeClass('disabled');
            else this.S('.clearing-main-next', b).addClass('disabled');
            if (a.prev().length > 0) this.S('.clearing-main-prev', b).removeClass('disabled');
            else this.S('.clearing-main-prev', b).addClass('disabled');
        },
        center_and_label: function(a, b) {
            if (!this.rtl) {
                a.css({
                    marginLeft: -(a.outerWidth() / 2),
                    marginTop: -(a.outerHeight() / 2)
                });
                if (b.length > 0) b.css({
                    marginLeft: -(b.outerWidth() / 2),
                    marginTop: -(a.outerHeight() / 2) - b.outerHeight() - 10
                });
            } else {
                a.css({
                    marginRight: -(a.outerWidth() / 2),
                    marginTop: -(a.outerHeight() / 2),
                    left: 'auto',
                    right: '50%'
                });
                if (b.length > 0) b.css({
                    marginRight: -(b.outerWidth() / 2),
                    marginTop: -(a.outerHeight() / 2) - b.outerHeight() - 10,
                    left: 'auto',
                    right: '50%'
                });
            }
            return this;
        },
        load: function(a) {
            var b;
            if (a[0].nodeName === "A") b = a.attr('href');
            else b = a.parent().attr('href');
            this.preload(a);
            if (b) return b;
            return a.attr('src');
        },
        preload: function(a) {
            this.img(a.closest('li').next()).img(a.closest('li').prev());
        },
        img: function(a) {
            if (a.length) {
                var b = new Image(),
                    c = this.S('a', a);
                if (c.length) b.src = c.attr('href');
                else b.src = this.S('img', a).attr('src');
            }
            return this;
        },
        caption: function(a, b) {
            var c = b.attr('data-caption');
            if (c) a.html(c).show();
            else a.text('').hide();
            return this;
        },
        go: function(a, b) {
            var c = this.S('.visible', a),
                d = c[b]();
            if (d.length) this.S('img', d).trigger('click', [c, d]).trigger('change.fndtn.clearing');
        },
        shift: function(a, b, c) {
            var d = b.parent(),
                e = this.settings.prev_index || b.index(),
                f = this.direction(d, a, b),
                g = this.rtl ? 'right' : 'left',
                h = parseInt(d.css('left'), 10),
                i = b.outerWidth(),
                j;
            var k = {};
            if (b.index() !== e && !/skip/.test(f)) {
                if (/left/.test(f)) {
                    this.lock();
                    k[g] = h + i;
                    d.animate(k, 300, this.unlock());
                } else if (/right/.test(f)) {
                    this.lock();
                    k[g] = h - i;
                    d.animate(k, 300, this.unlock());
                }
            } else if (/skip/.test(f)) {
                j = b.index() - this.settings.up_count;
                this.lock();
                if (j > 0) {
                    k[g] = -(j * i);
                    d.animate(k, 300, this.unlock());
                } else {
                    k[g] = 0;
                    d.animate(k, 300, this.unlock());
                }
            }
            c();
        },
        direction: function(a, b, c) {
            var d = this.S('li', a),
                e = d.outerWidth() + (d.outerWidth() / 4),
                f = Math.floor(this.S('.clearing-container').outerWidth() / e) - 1,
                g = d.index(c),
                h;
            this.settings.up_count = f;
            if (this.adjacent(this.settings.prev_index, g))
                if ((g > f) && g > this.settings.prev_index) h = 'right';
                else if ((g > f - 1) && g <= this.settings.prev_index) h = 'left';
            else h = false;
            else h = 'skip';
            this.settings.prev_index = g;
            return h;
        },
        adjacent: function(a, b) {
            for (var c = b + 1; c >= b - 1; c--)
                if (c === a) return true;
            return false;
        },
        lock: function() {
            this.settings.locked = true;
        },
        unlock: function() {
            this.settings.locked = false;
        },
        locked: function() {
            return this.settings.locked;
        },
        off: function() {
            this.S(this.scope).off('.fndtn.clearing');
            this.S(b).off('.fndtn.clearing');
        },
        reflow: function() {
            this.init();
        }
    };
}(jQuery, window, window.document));;
(function(a, b, c, d) {
    'use strict';
    Foundation.libs.dropdown = {
        name: 'dropdown',
        version: '5.2.3',
        settings: {
            active_class: 'open',
            align: 'bottom',
            is_hover: false,
            opened: function() {},
            closed: function() {}
        },
        init: function(a, b, c) {
            Foundation.inherit(this, 'throttle');
            this.bindings(b, c);
        },
        events: function(c) {
            var d = this,
                e = d.S;
            e(this.scope).off('.dropdown').on('click.fndtn.dropdown', '[' + this.attr_name() + ']', function(b) {
                var c = e(this).data(d.attr_name(true) + '-init') || d.settings;
                if (!c.is_hover || Modernizr.touch) {
                    b.preventDefault();
                    d.toggle(a(this));
                }
            }).on('mouseenter.fndtn.dropdown', '[' + this.attr_name() + '], [' + this.attr_name() + '-content]', function(a) {
                var b = e(this),
                    c, f;
                clearTimeout(d.timeout);
                if (b.data(d.data_attr())) {
                    c = e('#' + b.data(d.data_attr()));
                    f = b;
                } else {
                    c = b;
                    f = e("[" + d.attr_name() + "='" + c.attr('id') + "']");
                }
                var g = f.data(d.attr_name(true) + '-init') || d.settings;
                if (e(a.target).data(d.data_attr()) && g.is_hover) d.closeall.call(d);
                if (g.is_hover) d.open.apply(d, [c, f]);
            }).on('mouseleave.fndtn.dropdown', '[' + this.attr_name() + '], [' + this.attr_name() + '-content]', function(a) {
                var b = e(this);
                d.timeout = setTimeout(function() {
                    if (b.data(d.data_attr())) {
                        var a = b.data(d.data_attr(true) + '-init') || d.settings;
                        if (a.is_hover) d.close.call(d, e('#' + b.data(d.data_attr())));
                    } else {
                        var c = e('[' + d.attr_name() + '="' + e(this).attr('id') + '"]'),
                            a = c.data(d.attr_name(true) + '-init') || d.settings;
                        if (a.is_hover) d.close.call(d, b);
                    }
                }.bind(this), 150);
            }).on('click.fndtn.dropdown', function(b) {
                var c = e(b.target).closest('[' + d.attr_name() + '-content]');
                if (e(b.target).data(d.data_attr()) || e(b.target).parent().data(d.data_attr())) return;
                if (!(e(b.target).data('revealId')) && (c.length > 0 && (e(b.target).is('[' + d.attr_name() + '-content]') || a.contains(c.first()[0], b.target)))) {
                    b.stopPropagation();
                    return;
                }
                d.close.call(d, e('[' + d.attr_name() + '-content]'));
            }).on('opened.fndtn.dropdown', '[' + d.attr_name() + '-content]', function() {
                d.settings.opened.call(this);
            }).on('closed.fndtn.dropdown', '[' + d.attr_name() + '-content]', function() {
                d.settings.closed.call(this);
            });
            e(b).off('.dropdown').on('resize.fndtn.dropdown', d.throttle(function() {
                d.resize.call(d);
            }, 50));
            this.resize();
        },
        close: function(a) {
            var b = this;
            a.each(function() {
                if (b.S(this).hasClass(b.settings.active_class)) {
                    b.S(this).css(Foundation.rtl ? 'right' : 'left', '-99999px').removeClass(b.settings.active_class).prev('[' + b.attr_name() + ']').removeClass(b.settings.active_class).removeData('target');
                    b.S(this).trigger('closed', [a]);
                }
            });
        },
        closeall: function() {
            var b = this;
            a.each(b.S('[' + this.attr_name() + '-content]'), function() {
                b.close.call(b, b.S(this));
            });
        },
        open: function(a, b) {
            this.css(a.addClass(this.settings.active_class), b);
            a.prev('[' + this.attr_name() + ']').addClass(this.settings.active_class);
            a.data('target', b.get(0)).trigger('opened', [a, b]);
        },
        data_attr: function() {
            if (this.namespace.length > 0) return this.namespace + '-' + this.name;
            return this.name;
        },
        toggle: function(a) {
            var b = this.S('#' + a.data(this.data_attr()));
            if (b.length === 0) return;
            this.close.call(this, this.S('[' + this.attr_name() + '-content]').not(b));
            if (b.hasClass(this.settings.active_class)) {
                this.close.call(this, b);
                if (b.data('target') !== a.get(0)) this.open.call(this, b, a);
            } else this.open.call(this, b, a);
        },
        resize: function() {
            var a = this.S('[' + this.attr_name() + '-content].open'),
                b = this.S("[" + this.attr_name() + "='" + a.attr('id') + "']");
            if (a.length && b.length) this.css(a, b);
        },
        css: function(a, b) {
            this.clear_idx();
            if (this.small()) {
                var c = this.dirs.bottom.call(a, b);
                a.attr('style', '').removeClass('drop-left drop-right drop-top').css({
                    position: 'absolute',
                    width: '95%',
                    'max-width': 'none',
                    top: c.top
                });
                a.css(Foundation.rtl ? 'right' : 'left', '2.5%');
            } else {
                var d = b.data(this.attr_name(true) + '-init') || this.settings;
                this.style(a, b, d);
            }
            return a;
        },
        style: function(b, c, d) {
            var e = a.extend({
                position: 'absolute'
            }, this.dirs[d.align].call(b, c, d));
            b.attr('style', '').css(e);
        },
        dirs: {
            _base: function(a) {
                var b = this.offsetParent(),
                    c = b.offset(),
                    d = a.offset();
                d.top -= c.top;
                d.left -= c.left;
                return d;
            },
            top: function(a, b) {
                var c = Foundation.libs.dropdown,
                    d = c.dirs._base.call(this, a),
                    e = (a.outerWidth() / 2) - 8;
                this.addClass('drop-top');
                if (a.outerWidth() < this.outerWidth() || c.small()) c.adjust_pip(e, d);
                if (Foundation.rtl) return {
                    left: d.left - this.outerWidth() + a.outerWidth(),
                    top: d.top - this.outerHeight()
                };
                return {
                    left: d.left,
                    top: d.top - this.outerHeight()
                };
            },
            bottom: function(a, b) {
                var c = Foundation.libs.dropdown,
                    d = c.dirs._base.call(this, a),
                    e = (a.outerWidth() / 2) - 8;
                if (a.outerWidth() < this.outerWidth() || c.small()) c.adjust_pip(e, d);
                if (c.rtl) return {
                    left: d.left - this.outerWidth() + a.outerWidth(),
                    top: d.top + a.outerHeight()
                };
                return {
                    left: d.left,
                    top: d.top + a.outerHeight()
                };
            },
            left: function(a, b) {
                var c = Foundation.libs.dropdown.dirs._base.call(this, a);
                this.addClass('drop-left');
                return {
                    left: c.left - this.outerWidth(),
                    top: c.top
                };
            },
            right: function(a, b) {
                var c = Foundation.libs.dropdown.dirs._base.call(this, a);
                this.addClass('drop-right');
                return {
                    left: c.left + a.outerWidth(),
                    top: c.top
                };
            }
        },
        adjust_pip: function(a, b) {
            var c = Foundation.stylesheet;
            if (this.small()) a += b.left - 8;
            this.rule_idx = c.cssRules.length;
            var d = '.f-dropdown.open:before',
                e = '.f-dropdown.open:after',
                f = 'left: ' + a + 'px;',
                g = 'left: ' + (a - 1) + 'px;';
            if (c.insertRule) {
                c.insertRule([d, '{', f, '}'].join(' '), this.rule_idx);
                c.insertRule([e, '{', g, '}'].join(' '), this.rule_idx + 1);
            } else {
                c.addRule(d, f, this.rule_idx);
                c.addRule(e, g, this.rule_idx + 1);
            }
        },
        clear_idx: function() {
            var a = Foundation.stylesheet;
            if (this.rule_idx) {
                a.deleteRule(this.rule_idx);
                a.deleteRule(this.rule_idx);
                delete this.rule_idx;
            }
        },
        small: function() {
            return matchMedia(Foundation.media_queries.small).matches && !matchMedia(Foundation.media_queries.medium).matches;
        },
        off: function() {
            this.S(this.scope).off('.fndtn.dropdown');
            this.S('html, body').off('.fndtn.dropdown');
            this.S(b).off('.fndtn.dropdown');
            this.S('[data-dropdown-content]').off('.fndtn.dropdown');
        },
        reflow: function() {}
    };
}(jQuery, window, window.document));;
(function(a, b, c, d) {
    'use strict';
    Foundation.libs.equalizer = {
        name: 'equalizer',
        version: '5.2.3',
        settings: {
            use_tallest: true,
            before_height_change: a.noop,
            after_height_change: a.noop,
            equalize_on_stack: false
        },
        init: function(a, b, c) {
            Foundation.inherit(this, 'image_loaded');
            this.bindings(b, c);
            this.reflow();
        },
        events: function() {
            this.S(b).off('.equalizer').on('resize.fndtn.equalizer', function(a) {
                this.reflow();
            }.bind(this));
        },
        equalize: function(b) {
            var c = false,
                d = b.find('[' + this.attr_name() + '-watch]:visible'),
                e = b.data(this.attr_name(true) + '-init');
            if (d.length === 0) return;
            var f = d.first().offset().top;
            e.before_height_change();
            b.trigger('before-height-change');
            d.height('inherit');
            d.each(function() {
                var b = a(this);
                if (b.offset().top !== f) c = true;
            });
            if (e.equalize_on_stack === false)
                if (c) return;;
            var g = d.map(function() {
                return a(this).outerHeight(false);
            }).get();
            if (e.use_tallest) {
                var h = Math.max.apply(null, g);
                d.css('height', h);
            } else {
                var i = Math.min.apply(null, g);
                d.css('height', i);
            }
            e.after_height_change();
            b.trigger('after-height-change');
        },
        reflow: function() {
            var b = this;
            this.S('[' + this.attr_name() + ']', this.scope).each(function() {
                var c = a(this);
                b.image_loaded(b.S('img', this), function() {
                    b.equalize(c);
                });
            });
        }
    };
})(jQuery, window, window.document);;
(function(a, b, c, d) {
    'use strict';
    Foundation.libs.interchange = {
        name: 'interchange',
        version: '5.2.3',
        cache: {},
        images_loaded: false,
        nodes_loaded: false,
        settings: {
            load_attr: 'interchange',
            named_queries: {
                'default': 'only screen',
                small: Foundation.media_queries.small,
                medium: Foundation.media_queries.medium,
                large: Foundation.media_queries.large,
                xlarge: Foundation.media_queries.xlarge,
                xxlarge: Foundation.media_queries.xxlarge,
                landscape: 'only screen and (orientation: landscape)',
                portrait: 'only screen and (orientation: portrait)',
                retina: 'only screen and (-webkit-min-device-pixel-ratio: 2),' + 'only screen and (min--moz-device-pixel-ratio: 2),' + 'only screen and (-o-min-device-pixel-ratio: 2/1),' + 'only screen and (min-device-pixel-ratio: 2),' + 'only screen and (min-resolution: 192dpi),' + 'only screen and (min-resolution: 2dppx)'
            },
            directives: {
                replace: function(b, c, d) {
                    if (/IMG/.test(b[0].nodeName)) {
                        var e = b[0].src;
                        if (new RegExp(c, 'i').test(e)) return;
                        b[0].src = c;
                        return d(b[0].src);
                    }
                    var f = b.data(this.data_attr + '-last-path');
                    if (f == c) return;
                    if (/\.(gif|jpg|jpeg|tiff|png)([?#].*)?/i.test(c)) {
                        a(b).css('background-image', 'url(' + c + ')');
                        b.data('interchange-last-path', c);
                        return d(c);
                    }
                    return a.get(c, function(a) {
                        b.html(a);
                        b.data(this.data_attr + '-last-path', c);
                        d();
                    });
                }
            }
        },
        init: function(b, c, d) {
            Foundation.inherit(this, 'throttle random_str');
            this.data_attr = this.set_data_attr();
            a.extend(true, this.settings, c, d);
            this.bindings(c, d);
            this.load('images');
            this.load('nodes');
        },
        get_media_hash: function() {
            var a = '';
            for (var b in this.settings.named_queries) a += matchMedia(this.settings.named_queries[b]).matches.toString();
            return a;
        },
        events: function() {
            var c = this,
                d;
            a(b).off('.interchange').on('resize.fndtn.interchange', c.throttle(function() {
                var a = c.get_media_hash();
                if (a !== d) c.resize();
                d = a;
            }, 50));
            return this;
        },
        resize: function() {
            var b = this.cache;
            if (!this.images_loaded || !this.nodes_loaded) {
                setTimeout(a.proxy(this.resize, this), 50);
                return;
            }
            for (var c in b)
                if (b.hasOwnProperty(c)) {
                    var d = this.results(c, b[c]);
                    if (d) this.settings.directives[d.scenario[1]].call(this, d.el, d.scenario[0], function() {
                        if (arguments[0] instanceof Array) var a = arguments[0];
                        else var a = Array.prototype.slice.call(arguments, 0);
                        d.el.trigger(d.scenario[1], a);
                    });
                }
        },
        results: function(a, b) {
            var c = b.length;
            if (c > 0) {
                var d = this.S('[' + this.add_namespace('data-uuid') + '="' + a + '"]');
                while (c--) {
                    var e, f = b[c][2];
                    if (this.settings.named_queries.hasOwnProperty(f)) e = matchMedia(this.settings.named_queries[f]);
                    else e = matchMedia(f);
                    if (e.matches) return {
                        el: d,
                        scenario: b[c]
                    };
                }
            }
            return false;
        },
        load: function(a, b) {
            if (typeof this['cached_' + a] === 'undefined' || b) this['update_' + a]();
            return this['cached_' + a];
        },
        update_images: function() {
            var a = this.S('img[' + this.data_attr + ']'),
                b = a.length,
                c = b,
                d = 0,
                e = this.data_attr;
            this.cache = {};
            this.cached_images = [];
            this.images_loaded = (b === 0);
            while (c--) {
                d++;
                if (a[c]) {
                    var f = a[c].getAttribute(e) || '';
                    if (f.length > 0) this.cached_images.push(a[c]);
                }
                if (d === b) {
                    this.images_loaded = true;
                    this.enhance('images');
                }
            }
            return this;
        },
        update_nodes: function() {
            var a = this.S('[' + this.data_attr + ']').not('img'),
                b = a.length,
                c = b,
                d = 0,
                e = this.data_attr;
            this.cached_nodes = [];
            this.nodes_loaded = (b === 0);
            while (c--) {
                d++;
                var f = a[c].getAttribute(e) || '';
                if (f.length > 0) this.cached_nodes.push(a[c]);
                if (d === b) {
                    this.nodes_loaded = true;
                    this.enhance('nodes');
                }
            }
            return this;
        },
        enhance: function(c) {
            var d = this['cached_' + c].length;
            while (d--) this.object(a(this['cached_' + c][d]));
            return a(b).trigger('resize');
        },
        parse_params: function(a, b, c) {
            return [this.trim(a), this.convert_directive(b), this.trim(c)];
        },
        convert_directive: function(a) {
            var b = this.trim(a);
            if (b.length > 0) return b;
            return 'replace';
        },
        object: function(a) {
            var b = this.parse_data_attr(a),
                c = [],
                d = b.length;
            if (d > 0)
                while (d--) {
                    var e = b[d].split(/\((.*?)(\))$/);
                    if (e.length > 1) {
                        var f = e[0].split(/\, /),
                            g = this.parse_params(f[0], f[1], e[1]);
                        c.push(g);
                    }
                }
            return this.store(a, c);
        },
        store: function(a, b) {
            var c = this.random_str(),
                d = a.data(this.add_namespace('uuid', true));
            if (this.cache[d]) return this.cache[d];
            a.attr(this.add_namespace('data-uuid'), c);
            return this.cache[c] = b;
        },
        trim: function(b) {
            if (typeof b === 'string') return a.trim(b);
            return b;
        },
        set_data_attr: function(a) {
            if (a) {
                if (this.namespace.length > 0) return this.namespace + '-' + this.settings.load_attr;
                return this.settings.load_attr;
            }
            if (this.namespace.length > 0) return 'data-' + this.namespace + '-' + this.settings.load_attr;
            return 'data-' + this.settings.load_attr;
        },
        parse_data_attr: function(a) {
            var b = a.attr(this.attr_name()).split(/\[(.*?)\]/),
                c = b.length,
                d = [];
            while (c--)
                if (b[c].replace(/[\W\d]+/, '').length > 4) d.push(b[c]);
            return d;
        },
        reflow: function() {
            this.load('images', true);
            this.load('nodes', true);
        }
    };
}(jQuery, window, window.document));;
(function(a, b, c, d) {
    'use strict';
    var e = e || false;
    Foundation.libs.joyride = {
        name: 'joyride',
        version: '5.2.3',
        defaults: {
            expose: false,
            modal: true,
            tip_location: 'bottom',
            nub_position: 'auto',
            scroll_speed: 1500,
            scroll_animation: 'linear',
            timer: 0,
            start_timer_on_click: true,
            start_offset: 0,
            next_button: true,
            tip_animation: 'fade',
            pause_after: [],
            exposed: [],
            tip_animation_fade_speed: 300,
            cookie_monster: false,
            cookie_name: 'joyride',
            cookie_domain: false,
            cookie_expires: 365,
            tip_container: 'body',
            abort_on_close: true,
            tip_location_patterns: {
                top: ['bottom'],
                bottom: [],
                left: ['right', 'top', 'bottom'],
                right: ['left', 'top', 'bottom']
            },
            // post_ride_callback: function() {},
            // post_step_callback: function() {},
            // pre_step_callback: function() {},
            // pre_ride_callback: function() {},
            // post_expose_callback: function() {},
            template: {
                link: '<a href="#close" class="joyride-close-tip">&times;</a>',
                timer: '<div class="joyride-timer-indicator-wrap"><span class="joyride-timer-indicator"></span></div>',
                tip: '<div class="joyride-tip-guide"><span class="joyride-nub"></span></div>',
                wrapper: '<div class="joyride-content-wrapper"></div>',
                button: '<a href="#" class="small button joyride-next-tip"></a>',
                modal: '<div class="joyride-modal-bg"></div>',
                expose: '<div class="joyride-expose-wrapper"></div>',
                expose_cover: '<div class="joyride-expose-cover"></div>'
            },
            expose_add_class: ''
        },
        init: function(b, c, d) {
            Foundation.inherit(this, 'throttle random_str');
            this.settings = this.settings || a.extend({}, this.defaults, (d || c));
            this.bindings(c, d);
        },
        events: function() {
            var c = this;
            a(this.scope).off('.joyride').on('click.fndtn.joyride', '.joyride-next-tip, .joyride-modal-bg', function(a) {
                a.preventDefault();
                if (this.settings.$li.next().length < 1) this.end();
                else if (this.settings.timer > 0) {
                    clearTimeout(this.settings.automate);
                    this.hide();
                    this.show();
                    this.startTimer();
                } else {
                    this.hide();
                    this.show();
                }
            }.bind(this)).on('click.fndtn.joyride', '.joyride-close-tip', function(a) {
                a.preventDefault();
                this.end(this.settings.abort_on_close);
            }.bind(this));
            a(b).off('.joyride').on('resize.fndtn.joyride', c.throttle(function() {
                if (a('[' + c.attr_name() + ']').length > 0 && c.settings.$next_tip) {
                    if (c.settings.exposed.length > 0) {
                        var b = a(c.settings.exposed);
                        b.each(function() {
                            var b = a(this);
                            c.un_expose(b);
                            c.expose(b);
                        });
                    }
                    if (c.is_phone()) c.pos_phone();
                    else c.pos_default(false);
                }
            }, 100));
        },
        start: function() {
            var b = this,
                c = a('[' + this.attr_name() + ']', this.scope),
                d = ['timer', 'scrollSpeed', 'startOffset', 'tipAnimationFadeSpeed', 'cookieExpires'],
                e = d.length;
            if (!c.length > 0) return;
            if (!this.settings.init) this.events();
            this.settings = c.data(this.attr_name(true) + '-init');
            this.settings.$content_el = c;
            this.settings.$body = a(this.settings.tip_container);
            this.settings.body_offset = a(this.settings.tip_container).position();
            this.settings.$tip_content = this.settings.$content_el.find('> li');
            this.settings.paused = false;
            this.settings.attempts = 0;
            if (typeof a.cookie !== 'function') this.settings.cookie_monster = false;
            if (!this.settings.cookie_monster || this.settings.cookie_monster && !a.cookie(this.settings.cookie_name)) {
                this.settings.$tip_content.each(function(c) {
                    var f = a(this);
                    this.settings = a.extend({}, b.defaults, b.data_options(f));
                    var g = e;
                    while (g--) b.settings[d[g]] = parseInt(b.settings[d[g]], 10);
                    b.create({
                        $li: f,
                        index: c
                    });
                });
                if (!this.settings.start_timer_on_click && this.settings.timer > 0) {
                    this.show('init');
                    this.startTimer();
                } else this.show('init');
            }
        },
        resume: function() {
            this.set_li();
            this.show();
        },
        tip_template: function(b) {
            var c, d;
            b.tip_class = b.tip_class || '';
            c = a(this.settings.template.tip).addClass(b.tip_class);
            d = a.trim(a(b.li).html()) + this.button_text(b.button_text) + this.settings.template.link + this.timer_instance(b.index);
            c.append(a(this.settings.template.wrapper));
            c.first().attr(this.add_namespace('data-index'), b.index);
            a('.joyride-content-wrapper', c).append(d);
            return c[0];
        },
        timer_instance: function(b) {
            var c;
            if ((b === 0 && this.settings.start_timer_on_click && this.settings.timer > 0) || this.settings.timer === 0) c = '';
            else c = a(this.settings.template.timer)[0].outerHTML;
            return c;
        },
        button_text: function(b) {
            if (this.settings.next_button) {
                b = a.trim(b) || 'Next';
                b = a(this.settings.template.button).append(b)[0].outerHTML;
            } else b = '';
            return b;
        },
        create: function(b) {
            var c = b.$li.attr(this.add_namespace('data-button')) || b.$li.attr(this.add_namespace('data-text')),
                d = b.$li.attr('class'),
                e = a(this.tip_template({
                    tip_class: d,
                    index: b.index,
                    button_text: c,
                    li: b.$li
                }));
            a(this.settings.tip_container).append(e);
        },
        show: function(b) {
            var c = null;
            if (this.settings.$li === d || (a.inArray(this.settings.$li.index(), this.settings.pause_after) === -1)) {
                if (this.settings.paused) this.settings.paused = false;
                else this.set_li(b);
                this.settings.attempts = 0;
                if (this.settings.$li.length && this.settings.$target.length > 0) {
                    if (b) {
                        this.settings.pre_ride_callback(this.settings.$li.index(), this.settings.$next_tip);
                        if (this.settings.modal) this.show_modal();
                    }
                    this.settings.pre_step_callback(this.settings.$li.index(), this.settings.$next_tip);
                    if (this.settings.modal && this.settings.expose) this.expose();
                    this.settings.tip_settings = a.extend({}, this.settings, this.data_options(this.settings.$li));
                    this.settings.timer = parseInt(this.settings.timer, 10);
                    this.settings.tip_settings.tip_location_pattern = this.settings.tip_location_patterns[this.settings.tip_settings.tip_location];
                    if (!/body/i.test(this.settings.$target.selector)) this.scroll_to();
                    if (this.is_phone()) this.pos_phone(true);
                    else this.pos_default(true);
                    c = this.settings.$next_tip.find('.joyride-timer-indicator');
                    if (/pop/i.test(this.settings.tip_animation)) {
                        c.width(0);
                        if (this.settings.timer > 0) {
                            this.settings.$next_tip.show();
                            setTimeout(function() {
                                c.animate({
                                    width: c.parent().width()
                                }, this.settings.timer, 'linear');
                            }.bind(this), this.settings.tip_animation_fade_speed);
                        } else this.settings.$next_tip.show();
                    } else if (/fade/i.test(this.settings.tip_animation)) {
                        c.width(0);
                        if (this.settings.timer > 0) {
                            this.settings.$next_tip.fadeIn(this.settings.tip_animation_fade_speed).show();
                            setTimeout(function() {
                                c.animate({
                                    width: c.parent().width()
                                }, this.settings.timer, 'linear');
                            }.bind(this), this.settings.tip_animation_fade_speed);
                        } else this.settings.$next_tip.fadeIn(this.settings.tip_animation_fade_speed);
                    }
                    this.settings.$current_tip = this.settings.$next_tip;
                } else if (this.settings.$li && this.settings.$target.length < 1) this.show();
                else this.end();
            } else this.settings.paused = true;
        },
        is_phone: function() {
            return matchMedia(Foundation.media_queries.small).matches && !matchMedia(Foundation.media_queries.medium).matches;
        },
        hide: function() {
            if (this.settings.modal && this.settings.expose) this.un_expose();
            if (!this.settings.modal) a('.joyride-modal-bg').hide();
            this.settings.$current_tip.css('visibility', 'hidden');
            setTimeout(a.proxy(function() {
                this.hide();
                this.css('visibility', 'visible');
            }, this.settings.$current_tip), 0);
            // this.settings.post_step_callback(this.settings.$li.index(), this.settings.$current_tip);
        },
        set_li: function(a) {
            if (a) {
                this.settings.$li = this.settings.$tip_content.eq(this.settings.start_offset);
                this.set_next_tip();
                this.settings.$current_tip = this.settings.$next_tip;
            } else {
                this.settings.$li = this.settings.$li.next();
                this.set_next_tip();
            }
            this.set_target();
        },
        set_next_tip: function() {
            this.settings.$next_tip = a(".joyride-tip-guide").eq(this.settings.$li.index());
            this.settings.$next_tip.data('closed', '');
        },
        set_target: function() {
            var b = this.settings.$li.attr(this.add_namespace('data-class')),
                d = this.settings.$li.attr(this.add_namespace('data-id')),
                e = function() {
                    if (d) return a(c.getElementById(d));
                    else if (b) return a('.' + b).first();
                    else return a('body');
                };
            this.settings.$target = e();
        },
        scroll_to: function() {
            var c, d;
            c = a(b).height() / 2;
            d = Math.ceil(this.settings.$target.offset().top - c + this.settings.$next_tip.outerHeight());
            if (d != 0) a('html, body').stop().animate({
                scrollTop: d
            }, this.settings.scroll_speed, 'swing');
        },
        paused: function() {
            return (a.inArray((this.settings.$li.index() + 1), this.settings.pause_after) === -1);
        },
        restart: function() {
            this.hide();
            this.settings.$li = d;
            this.show('init');
        },
        pos_default: function(a) {
            var b = this.settings.$next_tip.find('.joyride-nub'),
                c = Math.ceil(b.outerWidth() / 2),
                d = Math.ceil(b.outerHeight() / 2),
                e = a || false;
            if (e) {
                this.settings.$next_tip.css('visibility', 'hidden');
                this.settings.$next_tip.show();
            }
            if (!/body/i.test(this.settings.$target.selector)) {
                if (this.bottom()) {
                    if (this.rtl) this.settings.$next_tip.css({
                        top: (this.settings.$target.offset().top + d + this.settings.$target.outerHeight()),
                        left: this.settings.$target.offset().left + this.settings.$target.outerWidth() - this.settings.$next_tip.outerWidth()
                    });
                    else this.settings.$next_tip.css({
                        top: (this.settings.$target.offset().top + d + this.settings.$target.outerHeight()),
                        left: this.settings.$target.offset().left
                    });
                    this.nub_position(b, this.settings.tip_settings.nub_position, 'top');
                } else if (this.top()) {
                    if (this.rtl) this.settings.$next_tip.css({
                        top: (this.settings.$target.offset().top - this.settings.$next_tip.outerHeight() - d),
                        left: this.settings.$target.offset().left + this.settings.$target.outerWidth() - this.settings.$next_tip.outerWidth()
                    });
                    else this.settings.$next_tip.css({
                        top: (this.settings.$target.offset().top - this.settings.$next_tip.outerHeight() - d),
                        left: this.settings.$target.offset().left
                    });
                    this.nub_position(b, this.settings.tip_settings.nub_position, 'bottom');
                } else if (this.right()) {
                    this.settings.$next_tip.css({
                        top: this.settings.$target.offset().top,
                        left: (this.settings.$target.outerWidth() + this.settings.$target.offset().left + c)
                    });
                    this.nub_position(b, this.settings.tip_settings.nub_position, 'left');
                } else if (this.left()) {
                    this.settings.$next_tip.css({
                        top: this.settings.$target.offset().top,
                        left: (this.settings.$target.offset().left - this.settings.$next_tip.outerWidth() - c)
                    });
                    this.nub_position(b, this.settings.tip_settings.nub_position, 'right');
                }
                if (!this.visible(this.corners(this.settings.$next_tip)) && this.settings.attempts < this.settings.tip_settings.tip_location_pattern.length) {
                    b.removeClass('bottom').removeClass('top').removeClass('right').removeClass('left');
                    this.settings.tip_settings.tip_location = this.settings.tip_settings.tip_location_pattern[this.settings.attempts];
                    this.settings.attempts++;
                    this.pos_default();
                }
            } else if (this.settings.$li.length) this.pos_modal(b);
            if (e) {
                this.settings.$next_tip.hide();
                this.settings.$next_tip.css('visibility', 'visible');
            }
        },
        pos_phone: function(b) {
            var c = this.settings.$next_tip.outerHeight(),
                d = this.settings.$next_tip.offset(),
                e = this.settings.$target.outerHeight(),
                f = a('.joyride-nub', this.settings.$next_tip),
                g = Math.ceil(f.outerHeight() / 2),
                h = b || false;
            f.removeClass('bottom').removeClass('top').removeClass('right').removeClass('left');
            if (h) {
                this.settings.$next_tip.css('visibility', 'hidden');
                this.settings.$next_tip.show();
            }
            if (!/body/i.test(this.settings.$target.selector))
                if (this.top()) {
                    this.settings.$next_tip.offset({
                        top: this.settings.$target.offset().top - c - g
                    });
                    f.addClass('bottom');
                } else {
                    this.settings.$next_tip.offset({
                        top: this.settings.$target.offset().top + e + g
                    });
                    f.addClass('top');
                }
            else if (this.settings.$li.length) this.pos_modal(f);
            if (h) {
                this.settings.$next_tip.hide();
                this.settings.$next_tip.css('visibility', 'visible');
            }
        },
        pos_modal: function(a) {
            this.center();
            a.hide();
            this.show_modal();
        },
        show_modal: function() {
            if (!this.settings.$next_tip.data('closed')) {
                var b = a('.joyride-modal-bg');
                if (b.length < 1) a('body').append(this.settings.template.modal).show();
                if (/pop/i.test(this.settings.tip_animation)) b.show();
                else b.fadeIn(this.settings.tip_animation_fade_speed);
            }
        },
        expose: function() {
            var c, d, e, f, g, h = 'expose-' + this.random_str(6);
            if (arguments.length > 0 && arguments[0] instanceof a) e = arguments[0];
            else if (this.settings.$target && !/body/i.test(this.settings.$target.selector)) e = this.settings.$target;
            else return false;
            if (e.length < 1) {
                if (b.console) console.error('element not valid', e);
                return false;
            }
            c = a(this.settings.template.expose);
            this.settings.$body.append(c);
            c.css({
                top: e.offset().top,
                left: e.offset().left,
                width: e.outerWidth(true),
                height: e.outerHeight(true)
            });
            d = a(this.settings.template.expose_cover);
            f = {
                zIndex: e.css('z-index'),
                position: e.css('position')
            };
            g = e.attr('class') == null ? '' : e.attr('class');
            e.css('z-index', parseInt(c.css('z-index')) + 1);
            if (f.position == 'static') e.css('position', 'relative');
            e.data('expose-css', f);
            e.data('orig-class', g);
            e.attr('class', g + ' ' + this.settings.expose_add_class);
            d.css({
                top: e.offset().top,
                left: e.offset().left,
                width: e.outerWidth(true),
                height: e.outerHeight(true)
            });
            if (this.settings.modal) this.show_modal();
            this.settings.$body.append(d);
            c.addClass(h);
            d.addClass(h);
            e.data('expose', h);
            // this.settings.post_expose_callback(this.settings.$li.index(), this.settings.$next_tip, e);
            this.add_exposed(e);
        },
        un_expose: function() {
            var c, d, e, f, g, h = false;
            if (arguments.length > 0 && arguments[0] instanceof a) d = arguments[0];
            else if (this.settings.$target && !/body/i.test(this.settings.$target.selector)) d = this.settings.$target;
            else return false;
            if (d.length < 1) {
                if (b.console) console.error('element not valid', d);
                return false;
            }
            c = d.data('expose');
            e = a('.' + c);
            if (arguments.length > 1) h = arguments[1];
            if (h === true) a('.joyride-expose-wrapper,.joyride-expose-cover').remove();
            else e.remove();
            f = d.data('expose-css');
            if (f.zIndex == 'auto') d.css('z-index', '');
            else d.css('z-index', f.zIndex);
            if (f.position != d.css('position'))
                if (f.position == 'static') d.css('position', '');
                else d.css('position', f.position);
            g = d.data('orig-class');
            d.attr('class', g);
            d.removeData('orig-classes');
            d.removeData('expose');
            d.removeData('expose-z-index');
            this.remove_exposed(d);
        },
        add_exposed: function(b) {
            this.settings.exposed = this.settings.exposed || [];
            if (b instanceof a || typeof b === 'object') this.settings.exposed.push(b[0]);
            else if (typeof b == 'string') this.settings.exposed.push(b);
        },
        remove_exposed: function(b) {
            var c, d;
            if (b instanceof a) c = b[0];
            else if (typeof b == 'string') c = b;
            this.settings.exposed = this.settings.exposed || [];
            d = this.settings.exposed.length;
            while (d--)
                if (this.settings.exposed[d] == c) {
                    this.settings.exposed.splice(d, 1);
                    return;
                }
        },
        center: function() {
            var c = a(b);
            this.settings.$next_tip.css({
                top: (((c.height() - this.settings.$next_tip.outerHeight()) / 2) + c.scrollTop()),
                left: (((c.width() - this.settings.$next_tip.outerWidth()) / 2) + c.scrollLeft())
            });
            return true;
        },
        bottom: function() {
            return /bottom/i.test(this.settings.tip_settings.tip_location);
        },
        top: function() {
            return /top/i.test(this.settings.tip_settings.tip_location);
        },
        right: function() {
            return /right/i.test(this.settings.tip_settings.tip_location);
        },
        left: function() {
            return /left/i.test(this.settings.tip_settings.tip_location);
        },
        corners: function(c) {
            var d = a(b),
                e = d.height() / 2,
                f = Math.ceil(this.settings.$target.offset().top - e + this.settings.$next_tip.outerHeight()),
                g = d.width() + d.scrollLeft(),
                h = d.height() + f,
                i = d.height() + d.scrollTop(),
                j = d.scrollTop();
            if (f < j)
                if (f < 0) j = 0;
                else j = f;
            if (h > i) i = h;
            return [c.offset().top < j, g < c.offset().left + c.outerWidth(), i < c.offset().top + c.outerHeight(), d.scrollLeft() > c.offset().left];
        },
        visible: function(a) {
            var b = a.length;
            while (b--)
                if (a[b]) return false;
            return true;
        },
        nub_position: function(a, b, c) {
            if (b === 'auto') a.addClass(c);
            else a.addClass(b);
        },
        startTimer: function() {
            if (this.settings.$li.length) this.settings.automate = setTimeout(function() {
                this.hide();
                this.show();
                this.startTimer();
            }.bind(this), this.settings.timer);
            else clearTimeout(this.settings.automate);
        },
        end: function(b) {
            if (this.settings.cookie_monster) a.cookie(this.settings.cookie_name, 'ridden', {
                expires: this.settings.cookie_expires,
                domain: this.settings.cookie_domain
            });
            if (this.settings.timer > 0) clearTimeout(this.settings.automate);
            if (this.settings.modal && this.settings.expose) this.un_expose();
            this.settings.$next_tip.data('closed', true);
            a('.joyride-modal-bg').hide();
            this.settings.$current_tip.hide();
            // if (typeof b === 'undefined' || b === false) {
            //     this.settings.post_step_callback(this.settings.$li.index(), this.settings.$current_tip);
            //     this.settings.post_ride_callback(this.settings.$li.index(), this.settings.$current_tip);
            // }
            a('.joyride-tip-guide').remove();
        },
        off: function() {
            a(this.scope).off('.joyride');
            a(b).off('.joyride');
            a('.joyride-close-tip, .joyride-next-tip, .joyride-modal-bg').off('.joyride');
            a('.joyride-tip-guide, .joyride-modal-bg').remove();
            clearTimeout(this.settings.automate);
            this.settings = {};
        },
        reflow: function() {}
    };
}(jQuery, window, window.document));;
(function(a, b, c, d) {
    'use strict';
    Foundation.libs['magellan-expedition'] = {
        name: 'magellan-expedition',
        version: '5.2.3',
        settings: {
            active_class: 'active',
            threshold: 0,
            destination_threshold: 20,
            throttle_delay: 30,
            fixed_top: 0
        },
        init: function(a, b, c) {
            Foundation.inherit(this, 'throttle');
            this.bindings(b, c);
        },
        events: function() {
            var c = this,
                d = c.S,
                e = c.settings;
            c.set_expedition_position();
            d(c.scope).off('.magellan').on('click.fndtn.magellan', '[' + c.add_namespace('data-magellan-arrival') + '] a[href^="#"]', function(b) {
                b.preventDefault();
                var d = a(this).closest('[' + c.attr_name() + ']'),
                    e = d.data('magellan-expedition-init'),
                    f = this.hash.split('#').join(''),
                    g = a("a[name='" + f + "']");
                if (g.length === 0) g = a('#' + f);
                var h = g.offset().top;
                h = h - d.outerHeight();
                a('html, body').stop().animate({
                    'scrollTop': h
                }, 700, 'swing', function() {
                    if (history.pushState) history.pushState(null, null, '#' + f);
                    else location.hash = '#' + f;
                });
            }).on('scroll.fndtn.magellan', c.throttle(this.check_for_arrivals.bind(this), e.throttle_delay));
            a(b).on('resize.fndtn.magellan', c.throttle(this.set_expedition_position.bind(this), e.throttle_delay));
        },
        check_for_arrivals: function() {
            var a = this;
            a.update_arrivals();
            a.update_expedition_positions();
        },
        set_expedition_position: function() {
            var b = this;
            a('[' + this.attr_name() + '=fixed]', b.scope).each(function(c, d) {
                var e = a(this),
                    f = e.attr('styles'),
                    g;
                e.attr('style', '');
                g = e.offset().top + b.settings.threshold;
                e.data(b.data_attr('magellan-top-offset'), g);
                e.attr('style', f);
            });
        },
        update_expedition_positions: function() {
            var c = this,
                d = a(b).scrollTop();
            a('[' + this.attr_name() + '=fixed]', c.scope).each(function() {
                var b = a(this),
                    e = b.data('magellan-top-offset');
                if (d >= e) {
                    var f = b.prev('[' + c.add_namespace('data-magellan-expedition-clone') + ']');
                    if (f.length === 0) {
                        f = b.clone();
                        f.removeAttr(c.attr_name());
                        f.attr(c.add_namespace('data-magellan-expedition-clone'), '');
                        b.before(f);
                    }
                    b.css({
                        position: 'fixed',
                        top: c.settings.fixed_top
                    });
                } else {
                    b.prev('[' + c.add_namespace('data-magellan-expedition-clone') + ']').remove();
                    b.attr('style', '').removeClass('fixed');
                }
            });
        },
        update_arrivals: function() {
            var c = this,
                d = a(b).scrollTop();
            a('[' + this.attr_name() + ']', c.scope).each(function() {
                var b = a(this),
                    e = b.data(c.attr_name(true) + '-init'),
                    f = c.offsets(b, d),
                    g = b.find('[' + c.add_namespace('data-magellan-arrival') + ']'),
                    h = false;
                f.each(function(a, d) {
                    if (d.viewport_offset >= d.top_offset) {
                        var f = b.find('[' + c.add_namespace('data-magellan-arrival') + ']');
                        f.not(d.arrival).removeClass(e.active_class);
                        d.arrival.addClass(e.active_class);
                        h = true;
                        return true;
                    }
                });
                if (!h) g.removeClass(e.active_class);
            });
        },
        offsets: function(b, c) {
            var d = this,
                e = b.data(d.attr_name(true) + '-init'),
                f = c;
            return b.find('[' + d.add_namespace('data-magellan-arrival') + ']').map(function(c, g) {
                var h = a(this).data(d.data_attr('magellan-arrival')),
                    i = a('[' + d.add_namespace('data-magellan-destination') + '=' + h + ']');
                if (i.length > 0) {
                    var j = i.offset().top - e.destination_threshold - b.outerHeight();
                    return {
                        destination: i,
                        arrival: a(this),
                        top_offset: j,
                        viewport_offset: f
                    };
                }
            }).sort(function(a, b) {
                if (a.top_offset < b.top_offset) return -1;
                if (a.top_offset > b.top_offset) return 1;
                return 0;
            });
        },
        data_attr: function(a) {
            if (this.namespace.length > 0) return this.namespace + '-' + a;
            return a;
        },
        off: function() {
            this.S(this.scope).off('.magellan');
            this.S(b).off('.magellan');
        },
        reflow: function() {
            var b = this;
            a('[' + b.add_namespace('data-magellan-expedition-clone') + ']', b.scope).remove();
        }
    };
}(jQuery, window, window.document));;
(function(a, b, c, d) {
    'use strict';
    Foundation.libs.offcanvas = {
        name: 'offcanvas',
        version: '5.2.3',
        settings: {
            open_method: 'move',
            close_on_click: true
        },
        init: function(a, b, c) {
            this.bindings(b, c);
        },
        events: function() {
            var a = this,
                b = a.S,
                c = '',
                d = '',
                e = '';
            if (this.settings.open_method === 'move') {
                c = 'move-';
                d = 'right';
                e = 'left';
            } else if (this.settings.open_method === 'overlap') c = 'offcanvas-overlap';
            b(this.scope).off('.offcanvas').on('click.fndtn.offcanvas', '.left-off-canvas-toggle', function(b) {
                a.click_toggle_class(b, c + d);
            }).on('click.fndtn.offcanvas', '.left-off-canvas-menu a', function(b) {
                var e = a.get_settings(b);
                if (e.close_on_click) a.hide.call(a, c + d, a.get_wrapper(b));
            }).on('click.fndtn.offcanvas', '.right-off-canvas-toggle', function(b) {
                a.click_toggle_class(b, c + e);
            }).on('click.fndtn.offcanvas', '.right-off-canvas-menu a', function(b) {
                var d = a.get_settings(b);
                if (d.close_on_click) a.hide.call(a, c + e, a.get_wrapper(b));
            }).on('click.fndtn.offcanvas', '.exit-off-canvas', function(b) {
                a.click_remove_class(b, c + e);
                if (d) a.click_remove_class(b, c + d);
            });
        },
        toggle: function(a, b) {
            b = b || this.get_wrapper();
            if (b.is('.' + a)) this.hide(a, b);
            else this.show(a, b);
        },
        show: function(a, b) {
            b = b || this.get_wrapper();
            b.trigger('open');
            b.addClass(a);
        },
        hide: function(a, b) {
            b = b || this.get_wrapper();
            b.trigger('close');
            b.removeClass(a);
        },
        click_toggle_class: function(a, b) {
            a.preventDefault();
            var c = this.get_wrapper(a);
            this.toggle(b, c);
        },
        click_remove_class: function(a, b) {
            a.preventDefault();
            var c = this.get_wrapper(a);
            this.hide(b, c);
        },
        get_settings: function(a) {
            var b = this.S(a.target).closest('[' + this.attr_name() + ']');
            return b.data(this.attr_name(true) + '-init') || this.settings;
        },
        get_wrapper: function(a) {
            var b = this.S(a ? a.target : this.scope).closest('.off-canvas-wrap');
            if (b.length === 0) b = this.S('.off-canvas-wrap');
            return b;
        },
        reflow: function() {}
    };
}(jQuery, window, window.document));;
(function(a, b, c, d) {
    'use strict';
    var e = function() {};
    var f = function(d, e) {
        if (d.hasClass(e.slides_container_class)) return this;
        var f = this,
            i, j = d,
            k, l, m, n = 0,
            o, p = false,
            q = j.find("." + e.active_slide_class).length > 0;
        f.cache = {};
        f.slides = function() {
            return j.children(e.slide_selector);
        };
        if (!q) f.slides().first().addClass(e.active_slide_class);;
        f.update_slide_number = function(b) {
            if (e.slide_number) {
                k.find('span:first').text(parseInt(b) + 1);
                k.find('span:last').text(f.slides().length);
            }
            if (e.bullets) {
                l.children().removeClass(e.bullets_active_class);
                a(l.children().get(b)).addClass(e.bullets_active_class);
            }
        };
        f.update_active_link = function(b) {
            var c = a('[data-orbit-link="' + f.slides().eq(b).attr('data-orbit-slide') + '"]');
            c.siblings().removeClass(e.bullets_active_class);
            c.addClass(e.bullets_active_class);
        };
        f.build_markup = function() {
            j.wrap('<div class="' + e.container_class + '"></div>');
            i = j.parent();
            j.addClass(e.slides_container_class);
            j.addClass(e.animation);
            if (e.stack_on_small) i.addClass(e.stack_on_small_class);
            if (e.navigation_arrows) {
                i.append(a('<a href="#"><span></span></a>').addClass(e.prev_class));
                i.append(a('<a href="#"><span></span></a>').addClass(e.next_class));
            }
            if (e.timer) {
                m = a('<div>').addClass(e.timer_container_class);
                m.append('<span>');
                if (e.timer_show_progress_bar) m.append(a('<div>').addClass(e.timer_progress_class));
                m.addClass(e.timer_paused_class);
                i.append(m);
            }
            if (e.slide_number) {
                k = a('<div>').addClass(e.slide_number_class);
                k.append('<span></span> ' + e.slide_number_text + ' <span></span>');
                i.append(k);
            }
            if (e.bullets) {
                l = a('<ol>').addClass(e.bullets_container_class);
                i.append(l);
                l.wrap('<div class="orbit-bullets-container"></div>');
                f.slides().each(function(b, c) {
                    var d = a('<li>').attr('data-orbit-slide', b).on('click', f.link_bullet);
                    l.append(d);
                });
            }
        };
        f._prepare_direction = function(b, c) {
            var d = 'next';
            if (b <= n) d = 'prev';
            if (e.animation === 'slide') setTimeout(function() {
                j.removeClass("swipe-prev swipe-next");
                if (d === 'next') j.addClass("swipe-next");
                else if (d === 'prev') j.addClass("swipe-prev");
            }, 0);
            var g = f.slides();
            if (b >= g.length) {
                if (!e.circular) return false;
                b = 0;
            } else if (b < 0) {
                if (!e.circular) return false;
                b = g.length - 1;
            }
            var h = a(g.get(n)),
                i = a(g.get(b));
            return [d, h, i, b];
        };
        f._goto = function(a, b) {
            if (a === null) return false;
            if (f.cache.animating) return false;
            if (a === n) return false;
            if (typeof f.cache.timer === 'object') f.cache.timer.restart();
            var c = f.slides();
            f.cache.animating = true;
            var d = f._prepare_direction(a),
                g = d[0],
                h = d[1],
                i = d[2],
                a = d[3];
            if (d === false) return false;
            j.trigger('before-slide-change.fndtn.orbit');
            e.before_slide_change();
            n = a;
            h.css("transitionDuration", e.animation_speed + "ms");
            i.css("transitionDuration", e.animation_speed + "ms");
            var k = function() {
                var d = function() {
                    if (b === true) f.cache.timer.restart();
                    f.update_slide_number(n);
                    i.removeClass("animate-in");
                    i.addClass(e.active_slide_class);
                    f.update_active_link(a);
                    j.trigger('after-slide-change.fndtn.orbit', [{
                        slide_number: n,
                        total_slides: c.length
                    }]);
                    e.after_slide_change(n, c.length);
                    setTimeout(function() {
                        f.cache.animating = false;
                    }, 100);
                };
                if (j.height() != i.height() && e.variable_height) j.animate({
                    'min-height': i.height()
                }, 250, 'linear', d);
                else d();
            };
            if (c.length === 1) {
                k();
                return false;
            }
            var l = function() {
                if (g === 'next') o.next(h, i, k);
                if (g === 'prev') o.prev(h, i, k);
            };
            if (i.height() > j.height() && e.variable_height) j.animate({
                'min-height': i.height()
            }, 250, 'linear', l);
            else l();
        };
        f.next = function(a) {
            a.stopImmediatePropagation();
            a.preventDefault();
            f._prepare_direction(n + 1);
            setTimeout(function() {
                f._goto(n + 1);
            }, 100);
        };
        f.prev = function(a) {
            a.stopImmediatePropagation();
            a.preventDefault();
            f._prepare_direction(n - 1);
            setTimeout(function() {
                f._goto(n - 1);
            }, 100);
        };
        f.link_custom = function(b) {
            b.preventDefault();
            var c = a(this).attr('data-orbit-link');
            if ((typeof c === 'string') && (c = a.trim(c)) != "") {
                var d = i.find('[data-orbit-slide=' + c + ']');
                if (d.index() != -1) setTimeout(function() {
                    f._goto(d.index());
                }, 100);
            }
        };
        f.link_bullet = function(b) {
            var c = a(this).attr('data-orbit-slide');
            if ((typeof c === 'string') && (c = a.trim(c)) != "")
                if (isNaN(parseInt(c))) {
                    var d = i.find('[data-orbit-slide=' + c + ']');
                    if (d.index() != -1) {
                        c = d.index() + 1;
                        f._prepare_direction(c);
                        setTimeout(function() {
                            f._goto(c);
                        }, 100);
                    }
                } else {
                    c = parseInt(c);
                    f._prepare_direction(c);
                    setTimeout(function() {
                        f._goto(c);
                    }, 100);
                }
        };
        f.timer_callback = function() {
            f._goto(n + 1, true);
        };
        f.compute_dimensions = function() {
            var b = a(f.slides().get(n));
            var c = b.height();
            if (!e.variable_height) f.slides().each(function() {
                if (a(this).height() > c) c = a(this).height();
            });
            j.css('minHeight', String(c) + 'px');
        };
        f.create_timer = function() {
            var a = new g(i.find('.' + e.timer_container_class), e, f.timer_callback);
            return a;
        };
        f.stop_timer = function() {
            if (typeof f.cache.timer === 'object') f.cache.timer.stop();
        };
        f.toggle_timer = function() {
            var a = i.find('.' + e.timer_container_class);
            if (a.hasClass(e.timer_paused_class)) {
                if (typeof f.cache.timer === 'undefined') f.cache.timer = f.create_timer();
                f.cache.timer.start();
            } else if (typeof f.cache.timer === 'object') f.cache.timer.stop();
        };
        f.init = function() {
            f.build_markup();
            if (e.timer) {
                f.cache.timer = f.create_timer();
                Foundation.utils.image_loaded(this.slides().find('img'), f.cache.timer.start);
            }
            o = new h(e, j);
            if (q) {
                var d = j.find("." + e.active_slide_class),
                    g = e.animation_speed;
                e.animation_speed = 1;
                d.removeClass('active');
                f._goto(d.index());
                e.animation_speed = g;
            }
            i.on('click', '.' + e.next_class, f.next);
            i.on('click', '.' + e.prev_class, f.prev);
            if (e.next_on_click) i.on('click', '.' + e.slides_container_class + ' [data-orbit-slide]', f.link_bullet);
            i.on('click', f.toggle_timer);
            if (e.swipe) j.on('touchstart.fndtn.orbit', function(a) {
                if (f.cache.animating) return;
                if (!a.touches) a = a.originalEvent;
                a.preventDefault();
                a.stopPropagation();
                f.cache.start_page_x = a.touches[0].pageX;
                f.cache.start_page_y = a.touches[0].pageY;
                f.cache.start_time = new Date().getTime();
                f.cache.delta_x = 0;
                f.cache.is_scrolling = null;
                f.cache.direction = null;
                f.stop_timer();
            }).on('touchmove.fndtn.orbit', function(a) {
                if (Math.abs(f.cache.delta_x) > 5) {
                    a.preventDefault();
                    a.stopPropagation();
                }
                if (f.cache.animating) return;
                requestAnimationFrame(function() {
                    if (!a.touches) a = a.originalEvent;
                    if (a.touches.length > 1 || a.scale && a.scale !== 1) return;
                    f.cache.delta_x = a.touches[0].pageX - f.cache.start_page_x;
                    if (f.cache.is_scrolling === null) f.cache.is_scrolling = !!(f.cache.is_scrolling || Math.abs(f.cache.delta_x) < Math.abs(a.touches[0].pageY - f.cache.start_page_y));
                    if (f.cache.is_scrolling) return;
                    var b = (f.cache.delta_x < 0) ? (n + 1) : (n - 1);
                    if (f.cache.direction !== b) {
                        var c = f._prepare_direction(b);
                        f.cache.direction = b;
                        f.cache.dir = c[0];
                        f.cache.current = c[1];
                        f.cache.next = c[2];
                    }
                    if (e.animation === 'slide') {
                        var d, g;
                        d = (f.cache.delta_x / i.width()) * 100;
                        if (d >= 0) g = -(100 - d);
                        else g = 100 + d;
                        f.cache.current.css("transform", "translate3d(" + d + "%,0,0)");
                        f.cache.next.css("transform", "translate3d(" + g + "%,0,0)");
                    }
                });
            }).on('touchend.fndtn.orbit', function(a) {
                if (f.cache.animating) return;
                a.preventDefault();
                a.stopPropagation();
                setTimeout(function() {
                    f._goto(f.cache.direction);
                }, 50);
            });
            i.on('mouseenter.fndtn.orbit', function(a) {
                if (e.timer && e.pause_on_hover) f.stop_timer();
            }).on('mouseleave.fndtn.orbit', function(a) {
                if (e.timer && e.resume_on_mouseout) f.cache.timer.start();
            });
            a(c).on('click', '[data-orbit-link]', f.link_custom);
            a(b).on('load resize', f.compute_dimensions);
            var k = this.slides().find('img');
            Foundation.utils.image_loaded(k, f.compute_dimensions);
            Foundation.utils.image_loaded(k, function() {
                i.prev('.' + e.preloader_class).css('display', 'none');
                f.update_slide_number(n);
                f.update_active_link(n);
                j.trigger('ready.fndtn.orbit');
            });
        };
        f.init();
    };
    var g = function(a, b, c) {
        var d = this,
            e = b.timer_speed,
            f = a.find('.' + b.timer_progress_class),
            g = f && f.css('display') != 'none',
            h, i, j = -1;
        this.update_progress = function(a) {
            var b = f.clone();
            b.attr('style', '');
            b.css('width', a + '%');
            f.replaceWith(b);
            f = b;
        };
        this.restart = function() {
            clearTimeout(i);
            a.addClass(b.timer_paused_class);
            j = -1;
            if (g) d.update_progress(0);
            d.start();
        };
        this.start = function() {
            if (!a.hasClass(b.timer_paused_class)) return true;
            j = (j === -1) ? e : j;
            a.removeClass(b.timer_paused_class);
            if (g) {
                h = new Date().getTime();
                f.animate({
                    'width': '100%'
                }, j, 'linear');
            }
            i = setTimeout(function() {
                d.restart();
                c();
            }, j);
            a.trigger('timer-started.fndtn.orbit');
        };
        this.stop = function() {
            if (a.hasClass(b.timer_paused_class)) return true;
            clearTimeout(i);
            a.addClass(b.timer_paused_class);
            if (g) {
                var c = new Date().getTime();
                j = j - (c - h);
                var f = 100 - ((j / e) * 100);
                d.update_progress(f);
            }
            a.trigger('timer-stopped.fndtn.orbit');
        };
    };
    var h = function(a, b) {
        var c = "webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend";
        this.next = function(d, e, f) {
            if (Modernizr.csstransitions) e.on(c, function(a) {
                e.unbind(c);
                d.removeClass("active animate-out");
                b.children().css({
                    "transform": "",
                    "-ms-transform": "",
                    "-webkit-transition-duration": "",
                    "-moz-transition-duration": "",
                    "-o-transition-duration": "",
                    "transition-duration": ""
                });
                f();
            });
            else setTimeout(function() {
                d.removeClass("active animate-out");
                b.children().css({
                    "transform": "",
                    "-ms-transform": "",
                    "-webkit-transition-duration": "",
                    "-moz-transition-duration": "",
                    "-o-transition-duration": "",
                    "transition-duration": ""
                });
                f();
            }, a.animation_speed);
            b.children().css({
                "transform": "",
                "-ms-transform": "",
                "-webkit-transition-duration": "",
                "-moz-transition-duration": "",
                "-o-transition-duration": "",
                "transition-duration": ""
            });
            d.addClass("animate-out");
            e.addClass("animate-in");
        };
        this.prev = function(d, e, f) {
            if (Modernizr.csstransitions) e.on(c, function(a) {
                e.unbind(c);
                d.removeClass("active animate-out");
                b.children().css({
                    "transform": "",
                    "-ms-transform": "",
                    "-webkit-transition-duration": "",
                    "-moz-transition-duration": "",
                    "-o-transition-duration": "",
                    "transition-duration": ""
                });
                f();
            });
            else setTimeout(function() {
                d.removeClass("active animate-out");
                b.children().css({
                    "transform": "",
                    "-ms-transform": "",
                    "-webkit-transition-duration": "",
                    "-moz-transition-duration": "",
                    "-o-transition-duration": "",
                    "transition-duration": ""
                });
                f();
            }, a.animation_speed);
            b.children().css({
                "transform": "",
                "-ms-transform": "",
                "-webkit-transition-duration": "",
                "-moz-transition-duration": "",
                "-o-transition-duration": "",
                "transition-duration": ""
            });
            d.addClass("animate-out");
            e.addClass("animate-in");
        };
    };
    Foundation.libs = Foundation.libs || {};
    Foundation.libs.orbit = {
        name: 'orbit',
        version: '5.2.3',
        settings: {
            animation: 'slide',
            timer_speed: 10000,
            pause_on_hover: true,
            resume_on_mouseout: false,
            next_on_click: true,
            animation_speed: 500,
            stack_on_small: false,
            navigation_arrows: true,
            slide_number: true,
            slide_number_text: 'of',
            container_class: 'orbit-container',
            stack_on_small_class: 'orbit-stack-on-small',
            next_class: 'orbit-next',
            prev_class: 'orbit-prev',
            timer_container_class: 'orbit-timer',
            timer_paused_class: 'paused',
            timer_progress_class: 'orbit-progress',
            timer_show_progress_bar: true,
            slides_container_class: 'orbit-slides-container',
            preloader_class: 'preloader',
            slide_selector: '*',
            bullets_container_class: 'orbit-bullets',
            bullets_active_class: 'active',
            slide_number_class: 'orbit-slide-number',
            caption_class: 'orbit-caption',
            active_slide_class: 'active',
            orbit_transition_class: 'orbit-transitioning',
            bullets: true,
            circular: true,
            timer: true,
            variable_height: false,
            swipe: true,
            before_slide_change: e,
            after_slide_change: e
        },
        init: function(a, b, c) {
            var d = this;
            this.bindings(b, c);
        },
        events: function(a) {
            var b = this;
            var c = new f(this.S(a), this.S(a).data('orbit-init'));
            this.S(a).data(b.name + '-instance', c);
        },
        reflow: function() {
            var a = this;
            if (a.S(a.scope).is('[data-orbit]')) {
                var b = a.S(a.scope);
                var c = b.data(a.name + '-instance');
                c.compute_dimensions();
            } else a.S('[data-orbit]', a.scope).each(function(b, c) {
                var d = a.S(c);
                var e = a.data_options(d);
                var f = d.data(a.name + '-instance');
                f.compute_dimensions();
            });
        }
    };
}(jQuery, window, window.document));;
(function(a, b, c, d) {
    'use strict';
    Foundation.libs.reveal = {
        name: 'reveal',
        version: '5.2.3',
        locked: false,
        settings: {
            animation: 'fadeAndPop',
            animation_speed: 250,
            close_on_background_click: true,
            close_on_esc: true,
            dismiss_modal_class: 'close-reveal-modal',
            bg_class: 'reveal-modal-bg',
            open: function() {},
            opened: function() {},
            close: function() {},
            closed: function() {},
            bg: a('.reveal-modal-bg'),
            css: {
                open: {
                    'opacity': 0,
                    'visibility': 'visible',
                    'display': 'block'
                },
                close: {
                    'opacity': 1,
                    'visibility': 'hidden',
                    'display': 'none'
                }
            }
        },
        init: function(b, c, d) {
            a.extend(true, this.settings, c, d);
            this.bindings(c, d);
        },
        events: function(a) {
            var b = this,
                d = b.S;
            d(this.scope).off('.reveal').on('click.fndtn.reveal', '[' + this.add_namespace('data-reveal-id') + ']', function(a) {
                a.preventDefault();
                if (!b.locked) {
                    var c = d(this),
                        e = c.data(b.data_attr('reveal-ajax'));
                    b.locked = true;
                    if (typeof e === 'undefined') b.open.call(b, c);
                    else {
                        var f = e === true ? c.attr('href') : e;
                        b.open.call(b, c, {
                            url: f
                        });
                    }
                }
            });
            d(c).on('touchend.fndtn.reveal click.fndtn.reveal', this.close_targets(), function(a) {
                a.preventDefault();
                if (!b.locked) {
                    var c = d('[' + b.attr_name() + '].open').data(b.attr_name(true) + '-init'),
                        e = d(a.target)[0] === d('.' + c.bg_class)[0];
                    if (e)
                        if (c.close_on_background_click) a.stopPropagation();
                        else return;
                    b.locked = true;
                    b.close.call(b, e ? d('[' + b.attr_name() + '].open') : d(this).closest('[' + b.attr_name() + ']'));
                }
            });
            if (d('[' + b.attr_name() + ']', this.scope).length > 0) d(this.scope).on('open.fndtn.reveal', this.settings.open).on('opened.fndtn.reveal', this.settings.opened).on('opened.fndtn.reveal', this.open_video).on('close.fndtn.reveal', this.settings.close).on('closed.fndtn.reveal', this.settings.closed).on('closed.fndtn.reveal', this.close_video);
            else d(this.scope).on('open.fndtn.reveal', '[' + b.attr_name() + ']', this.settings.open).on('opened.fndtn.reveal', '[' + b.attr_name() + ']', this.settings.opened).on('opened.fndtn.reveal', '[' + b.attr_name() + ']', this.open_video).on('close.fndtn.reveal', '[' + b.attr_name() + ']', this.settings.close).on('closed.fndtn.reveal', '[' + b.attr_name() + ']', this.settings.closed).on('closed.fndtn.reveal', '[' + b.attr_name() + ']', this.close_video);
            return true;
        },
        key_up_on: function(a) {
            var b = this;
            b.S('body').off('keyup.fndtn.reveal').on('keyup.fndtn.reveal', function(a) {
                var c = b.S('[' + b.attr_name() + '].open'),
                    d = c.data(b.attr_name(true) + '-init');
                if (d && a.which === 27 && d.close_on_esc && !b.locked) b.close.call(b, c);
            });
            return true;
        },
        key_up_off: function(a) {
            this.S('body').off('keyup.fndtn.reveal');
            return true;
        },
        open: function(b, c) {
            var d = this,
                e;
            if (b)
                if (typeof b.selector !== 'undefined') e = d.S('#' + b.data(d.data_attr('reveal-id'))).first();
                else {
                    e = d.S(this.scope);
                    c = b;
                }
            else e = d.S(this.scope);
            var f = e.data(d.attr_name(true) + '-init');
            f = f || this.settings;
            if (!e.hasClass('open')) {
                var g = d.S('[' + d.attr_name() + '].open');
                if (typeof e.data('css-top') === 'undefined') e.data('css-top', parseInt(e.css('top'), 10)).data('offset', this.cache_offset(e));
                this.key_up_on(e);
                e.trigger('open');
                if (g.length < 1) this.toggle_bg(e, true);
                if (typeof c === 'string') c = {
                    url: c
                };
                if (typeof c === 'undefined' || !c.url) {
                    if (g.length > 0) this.hide(g, f.css.close);
                    this.show(e, f.css.open);
                } else {
                    var h = typeof c.success !== 'undefined' ? c.success : null;
                    a.extend(c, {
                        success: function(b, c, i) {
                            if (a.isFunction(h)) h(b, c, i);
                            e.html(b);
                            d.S(e).foundation('section', 'reflow');
                            d.S(e).children().foundation();
                            if (g.length > 0) d.hide(g, f.css.close);
                            d.show(e, f.css.open);
                        }
                    });
                    a.ajax(c);
                }
            }
        },
        close: function(a) {
            var a = a && a.length ? a : this.S(this.scope),
                b = this.S('[' + this.attr_name() + '].open'),
                c = a.data(this.attr_name(true) + '-init') || this.settings;
            if (b.length > 0) {
                this.locked = true;
                this.key_up_off(a);
                a.trigger('close');
                this.toggle_bg(a, false);
                this.hide(b, c.css.close, c);
            }
        },
        close_targets: function() {
            var a = '.' + this.settings.dismiss_modal_class;
            if (this.settings.close_on_background_click) return a + ', .' + this.settings.bg_class;
            return a;
        },
        toggle_bg: function(b, c) {
            if (this.S('.' + this.settings.bg_class).length === 0) this.settings.bg = a('<div />', {
                'class': this.settings.bg_class
            }).appendTo('body').hide();
            var e = this.settings.bg.filter(':visible').length > 0;
            if (c != e)
                if (c == d ? e : !c) this.hide(this.settings.bg);
                else this.show(this.settings.bg);
        },
        show: function(c, d) {
            if (d) {
                var f = c.data(this.attr_name(true) + '-init');
                f = f || this.settings;
                if (c.parent('body').length === 0) {
                    var g = c.wrap('<div style="display: none;" />').parent(),
                        h = this.settings.rootElement || 'body';
                    c.on('closed.fndtn.reveal.wrapped', function() {
                        c.detach().appendTo(g);
                        c.unwrap().unbind('closed.fndtn.reveal.wrapped');
                    });
                    c.detach().appendTo(h);
                }
                var i = e(f.animation);
                if (!i.animate) this.locked = false;
                if (i.pop) {
                    d.top = a(b).scrollTop() - c.data('offset') + 'px';
                    var j = {
                        top: a(b).scrollTop() + c.data('css-top') + 'px',
                        opacity: 1
                    };
                    return setTimeout(function() {
                        return c.css(d).animate(j, f.animation_speed, 'linear', function() {
                            this.locked = false;
                            c.trigger('opened');
                        }.bind(this)).addClass('open');
                    }.bind(this), f.animation_speed / 2);
                }
                if (i.fade) {
                    d.top = a(b).scrollTop() + c.data('css-top') + 'px';
                    var j = {
                        opacity: 1
                    };
                    return setTimeout(function() {
                        return c.css(d).animate(j, f.animation_speed, 'linear', function() {
                            this.locked = false;
                            c.trigger('opened');
                        }.bind(this)).addClass('open');
                    }.bind(this), f.animation_speed / 2);
                }
                return c.css(d).show().css({
                    opacity: 1
                }).addClass('open').trigger('opened');
            }
            var f = this.settings;
            if (e(f.animation).fade) return c.fadeIn(f.animation_speed / 2);
            this.locked = false;
            return c.show();
        },
        hide: function(c, d) {
            if (d) {
                var f = c.data(this.attr_name(true) + '-init');
                f = f || this.settings;
                var g = e(f.animation);
                if (!g.animate) this.locked = false;
                if (g.pop) {
                    var h = {
                        top: -a(b).scrollTop() - c.data('offset') + 'px',
                        opacity: 0
                    };
                    return setTimeout(function() {
                        return c.animate(h, f.animation_speed, 'linear', function() {
                            this.locked = false;
                            c.css(d).trigger('closed');
                        }.bind(this)).removeClass('open');
                    }.bind(this), f.animation_speed / 2);
                }
                if (g.fade) {
                    var h = {
                        opacity: 0
                    };
                    return setTimeout(function() {
                        return c.animate(h, f.animation_speed, 'linear', function() {
                            this.locked = false;
                            c.css(d).trigger('closed');
                        }.bind(this)).removeClass('open');
                    }.bind(this), f.animation_speed / 2);
                }
                return c.hide().css(d).removeClass('open').trigger('closed');
            }
            var f = this.settings;
            if (e(f.animation).fade) return c.fadeOut(f.animation_speed / 2);
            return c.hide();
        },
        close_video: function(b) {
            var c = a('.flex-video', b.target),
                d = a('iframe', c);
            if (d.length > 0) {
                d.attr('data-src', d[0].src);
                d.attr('src', 'about:blank');
                c.hide();
            }
        },
        open_video: function(b) {
            var c = a('.flex-video', b.target),
                e = c.find('iframe');
            if (e.length > 0) {
                var f = e.attr('data-src');
                if (typeof f === 'string') e[0].src = e.attr('data-src');
                else {
                    var g = e[0].src;
                    e[0].src = d;
                    e[0].src = g;
                }
                c.show();
            }
        },
        data_attr: function(a) {
            if (this.namespace.length > 0) return this.namespace + '-' + a;
            return a;
        },
        cache_offset: function(a) {
            var b = a.show().height() + parseInt(a.css('top'), 10);
            a.hide();
            return b;
        },
        off: function() {
            a(this.scope).off('.fndtn.reveal');
        },
        reflow: function() {}
    };

    function e(a) {
        var b = /fade/i.test(a);
        var c = /pop/i.test(a);
        return {
            animate: b || c,
            pop: c,
            fade: b
        };
    }
}(jQuery, window, window.document));;
(function(a, b, c, d) {
    'use strict';
    Foundation.libs.slider = {
        name: 'slider',
        version: '5.2.3',
        settings: {
            start: 0,
            end: 100,
            step: 1,
            initial: null,
            display_selector: '',
            on_change: function() {}
        },
        cache: {},
        init: function(a, b, c) {
            Foundation.inherit(this, 'throttle');
            this.bindings(b, c);
            this.reflow();
        },
        events: function() {
            var c = this;
            a(this.scope).off('.slider').on('mousedown.fndtn.slider touchstart.fndtn.slider pointerdown.fndtn.slider', '[' + c.attr_name() + '] .range-slider-handle', function(b) {
                if (!c.cache.active) {
                    b.preventDefault();
                    c.set_active_slider(a(b.target));
                }
            }).on('mousemove.fndtn.slider touchmove.fndtn.slider pointermove.fndtn.slider', function(a) {
                if (!!c.cache.active) {
                    a.preventDefault();
                    c.calculate_position(c.cache.active, a.pageX || a.originalEvent.clientX || a.originalEvent.touches[0].clientX || a.currentPoint.x);
                }
            }).on('mouseup.fndtn.slider touchend.fndtn.slider pointerup.fndtn.slider', function(a) {
                c.remove_active_slider();
            }).on('change.fndtn.slider', function(a) {
                c.settings.on_change();
            });
            c.S(b).on('resize.fndtn.slider', c.throttle(function(a) {
                c.reflow();
            }, 300));
        },
        set_active_slider: function(a) {
            this.cache.active = a;
        },
        remove_active_slider: function() {
            this.cache.active = null;
        },
        calculate_position: function(b, c) {
            var d = this,
                e = a.extend({}, d.settings, d.data_options(b.parent())),
                f = a.data(b[0], 'handle_w'),
                g = a.data(b[0], 'handle_o'),
                h = a.data(b[0], 'bar_w'),
                i = a.data(b[0], 'bar_o');
            requestAnimationFrame(function() {
                var a;
                if (Foundation.rtl) a = d.limit_to(((i + h - c) / h), 0, 1);
                else a = d.limit_to(((c - i) / h), 0, 1);
                var f = d.normalized_value(a, e.start, e.end, e.step);
                d.set_ui(b, f);
            });
        },
        set_ui: function(b, c) {
            var d = a.extend({}, this.settings, this.data_options(b.parent())),
                e = a.data(b[0], 'handle_w'),
                f = a.data(b[0], 'bar_w'),
                g = this.normalized_percentage(c, d.start, d.end),
                h = g * (f - e) - 1,
                i = g * 100;
            if (Foundation.rtl) h = -h;
            this.set_translate(b, h);
            b.siblings('.range-slider-active-segment').css('width', i + '%');
            b.parent().attr(this.attr_name(), c);
            b.parent().trigger('change');
            b.parent().children('input[type=hidden]').val(c);
            if (d.input_id != '') a(d.display_selector).each(function() {
                if (this.hasOwnProperty('value')) a(this).val(c);
                else a(this).text(c);
            });
        },
        normalized_percentage: function(a, b, c) {
            return (a - b) / (c - b);
        },
        normalized_value: function(a, b, c, d) {
            var e = c - b,
                f = a * e,
                g = (f - (f % d)) / d,
                h = f % d,
                i = (h >= d * 0.5 ? d : 0);
            return (g * d + i) + b;
        },
        set_translate: function(b, c, d) {
            if (d) a(b).css('-webkit-transform', 'translateY(' + c + 'px)').css('-moz-transform', 'translateY(' + c + 'px)').css('-ms-transform', 'translateY(' + c + 'px)').css('-o-transform', 'translateY(' + c + 'px)').css('transform', 'translateY(' + c + 'px)');
            else a(b).css('-webkit-transform', 'translateX(' + c + 'px)').css('-moz-transform', 'translateX(' + c + 'px)').css('-ms-transform', 'translateX(' + c + 'px)').css('-o-transform', 'translateX(' + c + 'px)').css('transform', 'translateX(' + c + 'px)');
        },
        limit_to: function(a, b, c) {
            return Math.min(Math.max(a, b), c);
        },
        initialize_settings: function(b) {
            a.data(b, 'bar', a(b).parent());
            a.data(b, 'bar_o', a(b).parent().offset().left);
            a.data(b, 'bar_w', a(b).parent().outerWidth());
            a.data(b, 'handle_o', a(b).offset().left);
            a.data(b, 'handle_w', a(b).outerWidth());
            a.data(b, 'settings', a.extend({}, this.settings, this.data_options(a(b).parent())));
        },
        set_initial_position: function(b) {
            var c = a.data(b.children('.range-slider-handle')[0], 'settings'),
                d = (!!c.initial ? c.initial : Math.floor((c.end - c.start) * 0.5 / c.step) * c.step + c.start),
                e = b.children('.range-slider-handle');
            this.set_ui(e, d);
        },
        set_value: function(b) {
            var c = this;
            a('[' + c.attr_name() + ']', this.scope).each(function() {
                a(this).attr(c.attr_name(), b);
            });
            if (!!a(this.scope).attr(c.attr_name())) a(this.scope).attr(c.attr_name(), b);
            c.reflow();
        },
        reflow: function() {
            var b = this;
            b.S('[' + this.attr_name() + ']').each(function() {
                var c = a(this).children('.range-slider-handle')[0],
                    d = a(this).attr(b.attr_name());
                b.initialize_settings(c);
                if (d) b.set_ui(a(c), parseFloat(d));
                else b.set_initial_position(a(this));
            });
        }
    };
}(jQuery, window, window.document));;
(function(a, b, c, d) {
    'use strict';
    Foundation.libs.tab = {
        name: 'tab',
        version: '5.2.3',
        settings: {
            active_class: 'active',
            callback: function() {},
            deep_linking: false,
            scroll_to_content: true,
            is_hover: false
        },
        default_tab_hashes: [],
        init: function(a, b, c) {
            var d = this,
                e = this.S;
            this.bindings(b, c);
            this.handle_location_hash_change();
            e('[' + this.attr_name() + '] > .active > a', this.scope).each(function() {
                d.default_tab_hashes.push(this.hash);
            });
        },
        events: function() {
            var a = this,
                c = this.S;
            c(this.scope).off('.tab').on('click.fndtn.tab', '[' + this.attr_name() + '] > * > a', function(b) {
                var d = c(this).closest('[' + a.attr_name() + ']').data(a.attr_name(true) + '-init');
                if (!d.is_hover || Modernizr.touch) {
                    b.preventDefault();
                    b.stopPropagation();
                    a.toggle_active_tab(c(this).parent());
                }
            }).on('mouseenter.fndtn.tab', '[' + this.attr_name() + '] > * > a', function(b) {
                var d = c(this).closest('[' + a.attr_name() + ']').data(a.attr_name(true) + '-init');
                if (d.is_hover) a.toggle_active_tab(c(this).parent());
            });
            c(b).on('hashchange.fndtn.tab', function(b) {
                b.preventDefault();
                a.handle_location_hash_change();
            });
        },
        handle_location_hash_change: function() {
            var b = this,
                c = this.S;
            c('[' + this.attr_name() + ']', this.scope).each(function() {
                var e = c(this).data(b.attr_name(true) + '-init');
                if (e.deep_linking) {
                    var f = b.scope.location.hash;
                    if (f != '') {
                        var g = c(f);
                        if (g.hasClass('content') && g.parent().hasClass('tab-content')) b.toggle_active_tab(a('[' + b.attr_name() + '] > * > a[href=' + f + ']').parent());
                        else {
                            var h = g.closest('.content').attr('id');
                            if (h != d) b.toggle_active_tab(a('[' + b.attr_name() + '] > * > a[href=#' + h + ']').parent(), f);
                        }
                    } else
                        for (var i in b.default_tab_hashes) b.toggle_active_tab(a('[' + b.attr_name() + '] > * > a[href=' + b.default_tab_hashes[i] + ']').parent());
                }
            });
        },
        toggle_active_tab: function(c, e) {
            var f = this.S,
                g = c.closest('[' + this.attr_name() + ']'),
                h = c.children('a').first(),
                i = '#' + h.attr('href').split('#')[1],
                j = f(i),
                k = c.siblings(),
                l = g.data(this.attr_name(true) + '-init');
            if (f(this).data(this.data_attr('tab-content'))) {
                i = '#' + f(this).data(this.data_attr('tab-content')).split('#')[1];
                j = f(i);
            }
            if (l.deep_linking) {
                var m = a('body,html').scrollTop();
                if (e != d) b.location.hash = e;
                else b.location.hash = i;
                if (l.scroll_to_content)
                    if (e == d || e == i) c.parent()[0].scrollIntoView();
                    else f(i)[0].scrollIntoView();
                else if (e == d || e == i) a('body,html').scrollTop(m);
            }
            c.addClass(l.active_class).triggerHandler('opened');
            k.removeClass(l.active_class);
            j.siblings().removeClass(l.active_class).end().addClass(l.active_class);
            l.callback(c);
            j.triggerHandler('toggled', [c]);
            g.triggerHandler('toggled', [j]);
        },
        data_attr: function(a) {
            if (this.namespace.length > 0) return this.namespace + '-' + a;
            return a;
        },
        off: function() {},
        reflow: function() {}
    };
}(jQuery, window, window.document));;
(function(a, b, c, d) {
    'use strict';
    Foundation.libs.tooltip = {
        name: 'tooltip',
        version: '5.2.3',
        settings: {
            additional_inheritable_classes: [],
            tooltip_class: '.tooltip',
            append_to: 'body',
            touch_close_text: 'Tap To Close',
            disable_for_touch: false,
            hover_delay: 200,
            show_on: 'all',
            tip_template: function(a, b) {
                return '<span data-selector="' + a + '" class="' + Foundation.libs.tooltip.settings.tooltip_class.substring(1) + '">' + b + '<span class="nub"></span></span>';
            }
        },
        cache: {},
        init: function(a, b, c) {
            Foundation.inherit(this, 'random_str');
            this.bindings(b, c);
        },
        should_show: function(b, c) {
            var d = a.extend({}, this.settings, this.data_options(b));
            if (d.show_on === 'all') return true;
            else if (this.small() && d.show_on === 'small') return true;
            else if (this.medium() && d.show_on === 'medium') return true;
            else if (this.large() && d.show_on === 'large') return true;
            return false;
        },
        medium: function() {
            return matchMedia(Foundation.media_queries.medium).matches;
        },
        large: function() {
            return matchMedia(Foundation.media_queries.large).matches;
        },
        events: function(b) {
            var c = this,
                d = c.S;
            c.create(this.S(b));
            a(this.scope).off('.tooltip').on('mouseenter.fndtn.tooltip mouseleave.fndtn.tooltip touchstart.fndtn.tooltip MSPointerDown.fndtn.tooltip', '[' + this.attr_name() + ']', function(b) {
                var e = d(this),
                    f = a.extend({}, c.settings, c.data_options(e)),
                    g = false;
                if (Modernizr.touch && /touchstart|MSPointerDown/i.test(b.type) && d(b.target).is('a')) return false;
                if (/mouse/i.test(b.type) && c.ie_touch(b)) return false;
                if (e.hasClass('open')) {
                    if (Modernizr.touch && /touchstart|MSPointerDown/i.test(b.type)) b.preventDefault();
                    c.hide(e);
                } else {
                    if (f.disable_for_touch && Modernizr.touch && /touchstart|MSPointerDown/i.test(b.type)) return;
                    else if (!f.disable_for_touch && Modernizr.touch && /touchstart|MSPointerDown/i.test(b.type)) {
                        b.preventDefault();
                        d(f.tooltip_class + '.open').hide();
                        g = true;
                    }
                    if (/enter|over/i.test(b.type)) this.timer = setTimeout(function() {
                        var a = c.showTip(e);
                    }.bind(this), c.settings.hover_delay);
                    else if (b.type === 'mouseout' || b.type === 'mouseleave') {
                        clearTimeout(this.timer);
                        c.hide(e);
                    } else c.showTip(e);
                }
            }).on('mouseleave.fndtn.tooltip touchstart.fndtn.tooltip MSPointerDown.fndtn.tooltip', '[' + this.attr_name() + '].open', function(b) {
                if (/mouse/i.test(b.type) && c.ie_touch(b)) return false;
                if (a(this).data('tooltip-open-event-type') == 'touch' && b.type == 'mouseleave') return;
                else if (a(this).data('tooltip-open-event-type') == 'mouse' && /MSPointerDown|touchstart/i.test(b.type)) c.convert_to_touch(a(this));
                else c.hide(a(this));
            }).on('DOMNodeRemoved DOMAttrModified', '[' + this.attr_name() + ']:not(a)', function(a) {
                c.hide(d(this));
            });
        },
        ie_touch: function(a) {
            return false;
        },
        showTip: function(a) {
            var b = this.getTip(a);
            if (this.should_show(a, b)) return this.show(a);
            return;
        },
        getTip: function(b) {
            var c = this.selector(b),
                d = a.extend({}, this.settings, this.data_options(b)),
                e = null;
            if (c) e = this.S('span[data-selector="' + c + '"]' + d.tooltip_class);
            return (typeof e === 'object') ? e : false;
        },
        selector: function(a) {
            var b = a.attr('id'),
                c = a.attr(this.attr_name()) || a.attr('data-selector');
            if ((b && b.length < 1 || !b) && typeof c != 'string') {
                c = this.random_str(6);
                a.attr('data-selector', c);
            }
            return (b && b.length > 0) ? b : c;
        },
        create: function(c) {
            var d = this,
                e = a.extend({}, this.settings, this.data_options(c)),
                f = this.settings.tip_template;
            if (typeof e.tip_template === 'string' && b.hasOwnProperty(e.tip_template)) f = b[e.tip_template];
            var g = a(f(this.selector(c), a('<div></div>').html(c.attr('title')).html())),
                h = this.inheritable_classes(c);
            g.addClass(h).appendTo(e.append_to);
            if (Modernizr.touch) {
                g.append('<span class="tap-to-close">' + e.touch_close_text + '</span>');
                g.on('touchstart.fndtn.tooltip MSPointerDown.fndtn.tooltip', function(a) {
                    d.hide(c);
                });
            }
            c.removeAttr('title').attr('title', '');
        },
        reposition: function(b, c, d) {
            var e, f, g, h, i, j;
            c.css('visibility', 'hidden').show();
            e = b.data('width');
            f = c.children('.nub');
            g = f.outerHeight();
            h = f.outerHeight();
            if (this.small()) c.css({
                'width': '100%'
            });
            else c.css({
                'width': e ? e : 'auto'
            });
            j = function(a, b, c, d, e, f) {
                return a.css({
                    'top': b ? b : 'auto',
                    'bottom': d ? d : 'auto',
                    'left': e ? e : 'auto',
                    'right': c ? c : 'auto'
                }).end();
            };
            j(c, (b.offset().top + b.outerHeight() + 10), 'auto', 'auto', b.offset().left);
            if (this.small()) {
                j(c, (b.offset().top + b.outerHeight() + 10), 'auto', 'auto', 12.5, a(this.scope).width());
                c.addClass('tip-override');
                j(f, -g, 'auto', 'auto', b.offset().left);
            } else {
                var k = b.offset().left;
                if (Foundation.rtl) {
                    f.addClass('rtl');
                    k = b.offset().left + b.outerWidth() - c.outerWidth();
                }
                j(c, (b.offset().top + b.outerHeight() + 10), 'auto', 'auto', k);
                c.removeClass('tip-override');
                if (d && d.indexOf('tip-top') > -1) {
                    if (Foundation.rtl) f.addClass('rtl');
                    j(c, (b.offset().top - c.outerHeight()), 'auto', 'auto', k).removeClass('tip-override');
                } else if (d && d.indexOf('tip-left') > -1) {
                    j(c, (b.offset().top + (b.outerHeight() / 2) - (c.outerHeight() / 2)), 'auto', 'auto', (b.offset().left - c.outerWidth() - g)).removeClass('tip-override');
                    f.removeClass('rtl');
                } else if (d && d.indexOf('tip-right') > -1) {
                    j(c, (b.offset().top + (b.outerHeight() / 2) - (c.outerHeight() / 2)), 'auto', 'auto', (b.offset().left + b.outerWidth() + g)).removeClass('tip-override');
                    f.removeClass('rtl');
                }
            }
            c.css('visibility', 'visible').hide();
        },
        small: function() {
            return matchMedia(Foundation.media_queries.small).matches && !matchMedia(Foundation.media_queries.medium).matches;
        },
        inheritable_classes: function(b) {
            var c = a.extend({}, this.settings, this.data_options(b)),
                d = ['tip-top', 'tip-left', 'tip-bottom', 'tip-right', 'radius', 'round'].concat(c.additional_inheritable_classes),
                e = b.attr('class'),
                f = e ? a.map(e.split(' '), function(b, c) {
                    if (a.inArray(b, d) !== -1) return b;
                }).join(' ') : '';
            return a.trim(f);
        },
        convert_to_touch: function(b) {
            var c = this,
                d = c.getTip(b),
                e = a.extend({}, c.settings, c.data_options(b));
            if (d.find('.tap-to-close').length === 0) {
                d.append('<span class="tap-to-close">' + e.touch_close_text + '</span>');
                d.on('click.fndtn.tooltip.tapclose touchstart.fndtn.tooltip.tapclose MSPointerDown.fndtn.tooltip.tapclose', function(a) {
                    c.hide(b);
                });
            }
            b.data('tooltip-open-event-type', 'touch');
        },
        show: function(a) {
            var b = this.getTip(a);
            if (a.data('tooltip-open-event-type') == 'touch') this.convert_to_touch(a);
            this.reposition(a, b, a.attr('class'));
            a.addClass('open');
            b.fadeIn(150);
        },
        hide: function(a) {
            var b = this.getTip(a);
            b.fadeOut(150, function() {
                b.find('.tap-to-close').remove();
                b.off('click.fndtn.tooltip.tapclose touchstart.fndtn.tooltip.tapclose MSPointerDown.fndtn.tapclose');
                a.removeClass('open');
            });
        },
        off: function() {
            var b = this;
            this.S(this.scope).off('.fndtn.tooltip');
            this.S(this.settings.tooltip_class).each(function(c) {
                a('[' + b.attr_name() + ']').eq(c).attr('title', a(this).text());
            }).remove();
        },
        reflow: function() {}
    };
}(jQuery, window, window.document));;
(function(a, b, c, d) {
    'use strict';
    Foundation.libs.topbar = {
        name: 'topbar',
        version: '5.2.3',
        settings: {
            index: 0,
            sticky_class: 'sticky',
            custom_back_text: true,
            back_text: 'Back',
            is_hover: true,
            mobile_show_parent_link: false,
            scrolltop: true,
            sticky_on: 'all'
        },
        init: function(b, c, d) {
            Foundation.inherit(this, 'add_custom_rule register_media throttle');
            var e = this;
            e.register_media('topbar', 'foundation-mq-topbar');
            this.bindings(c, d);
            e.S('[' + this.attr_name() + ']', this.scope).each(function() {
                var b = a(this),
                    c = b.data(e.attr_name(true) + '-init'),
                    d = e.S('section', this);
                b.data('index', 0);
                var f = b.parent();
                if (f.hasClass('fixed') || e.is_sticky(b, f, c)) {
                    e.settings.sticky_class = c.sticky_class;
                    e.settings.sticky_topbar = b;
                    b.data('height', f.outerHeight());
                    b.data('stickyoffset', f.offset().top);
                } else b.data('height', b.outerHeight());
                if (!c.assembled) e.assemble(b);
                if (c.is_hover) e.S('.has-dropdown', b).addClass('not-click');
                else e.S('.has-dropdown', b).removeClass('not-click');
                e.add_custom_rule('.f-topbar-fixed { padding-top: ' + b.data('height') + 'px }');
                if (f.hasClass('fixed')) e.S('body').addClass('f-topbar-fixed');
            });
        },
        is_sticky: function(a, b, c) {
            var d = b.hasClass(c.sticky_class);
            if (d && c.sticky_on === 'all') return true;
            else if (d && this.small() && c.sticky_on === 'small') return true;
            else if (d && this.medium() && c.sticky_on === 'medium') return true;
            else if (d && this.large() && c.sticky_on === 'large') return true;
            return false;
        },
        toggle: function(c) {
            var d = this,
                e;
            if (c) e = d.S(c).closest('[' + this.attr_name() + ']');
            else e = d.S('[' + this.attr_name() + ']');
            var f = e.data(this.attr_name(true) + '-init');
            var g = d.S('section, .section', e);
            if (d.breakpoint()) {
                if (!d.rtl) {
                    g.css({
                        left: '0%'
                    });
                    a('>.name', g).css({
                        left: '100%'
                    });
                } else {
                    g.css({
                        right: '0%'
                    });
                    a('>.name', g).css({
                        right: '100%'
                    });
                }
                d.S('li.moved', g).removeClass('moved');
                e.data('index', 0);
                e.toggleClass('expanded').css('height', '');
            }
            if (f.scrolltop) {
                if (!e.hasClass('expanded')) {
                    if (e.hasClass('fixed')) {
                        e.parent().addClass('fixed');
                        e.removeClass('fixed');
                        d.S('body').addClass('f-topbar-fixed');
                    }
                } else if (e.parent().hasClass('fixed'))
                    if (f.scrolltop) {
                        e.parent().removeClass('fixed');
                        e.addClass('fixed');
                        d.S('body').removeClass('f-topbar-fixed');
                        b.scrollTo(0, 0);
                    } else e.parent().removeClass('expanded');
            } else {
                if (d.is_sticky(e, e.parent(), f)) e.parent().addClass('fixed');
                if (e.parent().hasClass('fixed'))
                    if (!e.hasClass('expanded')) {
                        e.removeClass('fixed');
                        e.parent().removeClass('expanded');
                        d.update_sticky_positioning();
                    } else {
                        e.addClass('fixed');
                        e.parent().addClass('expanded');
                        d.S('body').addClass('f-topbar-fixed');
                    }
            }
        },
        timer: null,
        events: function(c) {
            var d = this,
                e = this.S;
            e(this.scope).off('.topbar').on('click.fndtn.topbar', '[' + this.attr_name() + '] .toggle-topbar', function(a) {
                a.preventDefault();
                d.toggle(this);
            }).on('click.fndtn.topbar', '.top-bar .top-bar-section li a[href^="#"],[' + this.attr_name() + '] .top-bar-section li a[href^="#"]', function(b) {
                var c = a(this).closest('li');
                if (d.breakpoint() && !c.hasClass('back') && !c.hasClass('has-dropdown')) d.toggle();
            }).on('click.fndtn.topbar', '[' + this.attr_name() + '] li.has-dropdown', function(b) {
                var c = e(this),
                    f = e(b.target),
                    g = c.closest('[' + d.attr_name() + ']'),
                    h = g.data(d.attr_name(true) + '-init');
                if (f.data('revealId')) {
                    d.toggle();
                    return;
                }
                if (d.breakpoint()) return;
                if (h.is_hover && !Modernizr.touch) return;
                b.stopImmediatePropagation();
                if (c.hasClass('hover')) {
                    c.removeClass('hover').find('li').removeClass('hover');
                    c.parents('li.hover').removeClass('hover');
                } else {
                    c.addClass('hover');
                    a(c).siblings().removeClass('hover');
                    if (f[0].nodeName === 'A' && f.parent().hasClass('has-dropdown')) b.preventDefault();
                }
            }).on('click.fndtn.topbar', '[' + this.attr_name() + '] .has-dropdown>a', function(a) {
                if (d.breakpoint()) {
                    a.preventDefault();
                    var b = e(this),
                        c = b.closest('[' + d.attr_name() + ']'),
                        f = c.find('section, .section'),
                        g = b.next('.dropdown').outerHeight(),
                        h = b.closest('li');
                    c.data('index', c.data('index') + 1);
                    h.addClass('moved');
                    if (!d.rtl) {
                        f.css({
                            left: -(100 * c.data('index')) + '%'
                        });
                        f.find('>.name').css({
                            left: 100 * c.data('index') + '%'
                        });
                    } else {
                        f.css({
                            right: -(100 * c.data('index')) + '%'
                        });
                        f.find('>.name').css({
                            right: 100 * c.data('index') + '%'
                        });
                    }
                    c.css('height', b.siblings('ul').outerHeight(true) + c.data('height'));
                }
            });
            e(b).off('.topbar').on('resize.fndtn.topbar', d.throttle(function() {
                d.resize.call(d);
            }, 50)).trigger('resize');
            e('body').off('.topbar').on('click.fndtn.topbar touchstart.fndtn.topbar', function(a) {
                var b = e(a.target).closest('li').closest('li.hover');
                if (b.length > 0) return;
                e('[' + d.attr_name() + '] li.hover').removeClass('hover');
            });
            e(this.scope).on('click.fndtn.topbar', '[' + this.attr_name() + '] .has-dropdown .back', function(a) {
                a.preventDefault();
                var b = e(this),
                    c = b.closest('[' + d.attr_name() + ']'),
                    f = c.find('section, .section'),
                    g = c.data(d.attr_name(true) + '-init'),
                    h = b.closest('li.moved'),
                    i = h.parent();
                c.data('index', c.data('index') - 1);
                if (!d.rtl) {
                    f.css({
                        left: -(100 * c.data('index')) + '%'
                    });
                    f.find('>.name').css({
                        left: 100 * c.data('index') + '%'
                    });
                } else {
                    f.css({
                        right: -(100 * c.data('index')) + '%'
                    });
                    f.find('>.name').css({
                        right: 100 * c.data('index') + '%'
                    });
                }
                if (c.data('index') === 0) c.css('height', '');
                else c.css('height', i.outerHeight(true) + c.data('height'));
                setTimeout(function() {
                    h.removeClass('moved');
                }, 300);
            });
        },
        resize: function() {
            var a = this;
            a.S('[' + this.attr_name() + ']').each(function() {
                var b = a.S(this),
                    d = b.data(a.attr_name(true) + '-init');
                var e = b.parent('.' + a.settings.sticky_class);
                var f;
                if (!a.breakpoint()) {
                    var g = b.hasClass('expanded');
                    b.css('height', '').removeClass('expanded').find('li').removeClass('hover');
                    if (g) a.toggle(b);
                }
                if (a.is_sticky(b, e, d))
                    if (e.hasClass('fixed')) {
                        e.removeClass('fixed');
                        f = e.offset().top;
                        if (a.S(c.body).hasClass('f-topbar-fixed')) f -= b.data('height');
                        b.data('stickyoffset', f);
                        e.addClass('fixed');
                    } else {
                        f = e.offset().top;
                        b.data('stickyoffset', f);
                    }
            });
        },
        breakpoint: function() {
            return !matchMedia(Foundation.media_queries.topbar).matches;
        },
        small: function() {
            return matchMedia(Foundation.media_queries.small).matches;
        },
        medium: function() {
            return matchMedia(Foundation.media_queries.medium).matches;
        },
        large: function() {
            return matchMedia(Foundation.media_queries.large).matches;
        },
        assemble: function(b) {
            var c = this,
                d = b.data(this.attr_name(true) + '-init'),
                e = c.S('section', b);
            e.detach();
            c.S('.has-dropdown>a', e).each(function() {
                var b = c.S(this),
                    e = b.siblings('.dropdown'),
                    f = b.attr('href'),
                    g;
                if (!e.find('.title.back').length) {
                    if (d.mobile_show_parent_link && f && f.length > 1) g = a('<li class="title back js-generated"><h5><a href="javascript:void(0)"></a></h5></li><li><a class="parent-link js-generated" href="' + f + '">' + b.text() + '</a></li>');
                    else g = a('<li class="title back js-generated"><h5><a href="javascript:void(0)"></a></h5></li>');
                    if (d.custom_back_text == true) a('h5>a', g).html(d.back_text);
                    else a('h5>a', g).html('&laquo; ' + b.html());
                    e.prepend(g);
                }
            });
            e.appendTo(b);
            this.sticky();
            this.assembled(b);
        },
        assembled: function(b) {
            b.data(this.attr_name(true), a.extend({}, b.data(this.attr_name(true)), {
                assembled: true
            }));
        },
        height: function(b) {
            var c = 0,
                d = this;
            a('> li', b).each(function() {
                c += d.S(this).outerHeight(true);
            });
            return c;
        },
        sticky: function() {
            var a = this;
            this.S(b).on('scroll', function() {
                a.update_sticky_positioning();
            });
        },
        update_sticky_positioning: function() {
            var a = '.' + this.settings.sticky_class,
                c = this.S(b),
                d = this;
            if (d.settings.sticky_topbar && d.is_sticky(this.settings.sticky_topbar, this.settings.sticky_topbar.parent(), this.settings)) {
                var e = this.settings.sticky_topbar.data('stickyoffset');
                if (!d.S(a).hasClass('expanded'))
                    if (c.scrollTop() > e) {
                        if (!d.S(a).hasClass('fixed')) {
                            d.S(a).addClass('fixed');
                            d.S('body').addClass('f-topbar-fixed');
                        }
                    } else if (c.scrollTop() <= e)
                    if (d.S(a).hasClass('fixed')) {
                        d.S(a).removeClass('fixed');
                        d.S('body').removeClass('f-topbar-fixed');
                    }
            }
        },
        off: function() {
            this.S(this.scope).off('.fndtn.topbar');
            this.S(b).off('.fndtn.topbar');
        },
        reflow: function() {}
    };
}(jQuery, this, this.document));
var toType = function(obj) {
    return {}.toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
};
var modal = (function() {
    var method = {},
        $overlay, $modal, $content, $close;
    method.center = function() {
        var top, left;
        top = Math.max($(window).height() - $modal.outerHeight(), 0) / 2;
        left = Math.max($(window).width() - $modal.outerWidth(), 0) / 2;
        $modal.css({
            top: top + $(window).scrollTop(),
            left: left + $(window).scrollLeft()
        });
    };
    method.open = function(settings) {
        $content.empty().append(settings.content);
        $modal.css({
            width: settings.width || 'auto',
            height: settings.height || 'auto'
        });
        method.center();
        $(window).bind('resize.modal', method.center);
        $modal.show();
        $overlay.show();
        $modal.find('iframe').contents().find('a').click(function(e) {
            console.log('close');
            e.preventDefault();
            method.close();
        });
    };
    method.close = function() {
        $modal.hide();
        $overlay.hide();
        $content.empty();
        $(window).unbind('resize.modal');
    };
    $overlay = $('<div id="overlay"></div>');
    $modal = $('<div id="modal"></div>');
    $content = $('<div id="content"></div>');
    $close = $('<a id="close" href="#">close</a>');
    $modal.hide();
    $overlay.hide();
    $modal.append($content, $close);
    $(document).ready(function() {
        $('body').append($overlay, $modal);
    });
    $close.click(function(e) {
        e.preventDefault();
        method.close();
    });
    $overlay.click(function(e) {
        e.preventDefault();
        method.close();
    });
    window.document.addEventListener('closeModal', function() {
        method.close();
    }, false);
    return method;
}());
(function() {
    var overlay = $('<div id="galleryOverlay">'),
        slider = $('<div id="gallerySlider">'),
        prevArrow = $('<a id="prevArrow"></a>'),
        nextArrow = $('<a id="nextArrow"></a>'),
        overlayVisible = false;
    dialog = $('<div id="dialog" title="Is it photo real?"><iframe scrolling="no" style="width:100%;height:600px;border:none;overflow:hidden!important;margin:1rem 0;" /></div>');
    $.fn.touchTouch = function() {
        var placeholders = $([]),
            index = 0,
            allitems = this,
            items = allitems;
        overlay.hide().appendTo('body');
        dialog.hide().appendTo('body');
        slider.appendTo(overlay);
        $("#dialog").dialog({
            autoOpen: false,
            modal: true,
            'width': $(window).width(),
            'height': $(window).height(),
            'left': '0px',
            'top': '0px'
        });
        items.each(function() {
            placeholders = placeholders.add($('<div class="placeholder">'));
        });
        slider.append(placeholders).on('click', function(e) {
            if (!$(e.target).is('img')) hideOverlay();
        });
        $('body').on('touchstart', '#gallerySlider img', function(e) {
            var touch = e.originalEvent,
                startX = touch.changedTouches[0].pageX;
            slider.on('touchmove', function(e) {
                e.preventDefault();
                touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                if (touch.pageX - startX > 10) {
                    slider.off('touchmove');
                    showPrevious();
                } else if (touch.pageX - startX < -10) {
                    slider.off('touchmove');
                    showNext();
                }
            });
            return false;
        }).on('touchend', function() {
            slider.off('touchmove');
        });
        items.on('click', function(e) {
            e.preventDefault();
            var $this = $(this),
                galleryName, selectorType, $closestGallery = $this.parent().closest('[data-gallery]');
            if ($this.attr('data-gallery')) {
                galleryName = $this.attr('data-gallery');
                selectorType = 'item';
            } else if ($closestGallery.length) {
                galleryName = $closestGallery.attr('data-gallery');
                selectorType = 'ancestor';
            }
            if (galleryName && selectorType == 'item') items = $('[data-gallery=' + galleryName + ']');
            else if (galleryName && selectorType == 'ancestor') items = items.filter(function() {
                return $(this).parent().closest('[data-gallery]').length;
            });
            index = items.index(this);
            showOverlay(index);
            showImage(index);
            preload(index + 1);
            preload(index - 1);
        });
        if (!("ontouchstart" in window)) {
            overlay.append(prevArrow).append(nextArrow);
            prevArrow.click(function(e) {
                e.preventDefault();
                showPrevious();
            });
            nextArrow.click(function(e) {
                e.preventDefault();
                showNext();
            });
        }
        $(window).bind('keydown', function(e) {
            if (e.keyCode == 37) showPrevious();
            else if (e.keyCode == 39) showNext();
            else if (e.keyCode == 27) hideOverlay();
        });

        function showOverlay(index) {
            if (overlayVisible) return false;
            overlay.show();
            setTimeout(function() {
                overlay.addClass('visible');
            }, 100);
            offsetSlider(index);
            overlayVisible = true;
        }

        function hideOverlay() {
            if (!overlayVisible) return false;
            overlay.hide().removeClass('visible');
            overlayVisible = false;
            $('.placeholder').empty();
            items = allitems;
        }

        function offsetSlider(index) {
            slider.css('left', (-index * 100) + '%');
        }

        function preload(index) {
            setTimeout(function() {
                showImage(index);
            }, 1000);
        }

        function showImage(index) {
            if (index < 0 || index >= items.length) return false;
            loadImage(items.eq(index).attr('href'), function() {
                tag = $('<a href="result-frame.html" class="photo-check"  onclick="ga(\'send\',\'event\',\'photo_check\',document.location.pathname);">Is this photo real?</a>');
                src = $(this).attr('src');
                tag.attr('src', src);
                tag.click(function(e) {
                    e.preventDefault();
                    var page = "/search_image/reverse?q=" + encodeURIComponent($(this).attr('src'));
                    hideOverlay();
                    m = modal.open({
                        content: '<iframe src="' + page + '" scrolling="yes" style="width:100%;height:100%;border:none;overflow:hidden!important;margin:1rem 0;" />',
                        width: '90%',
                        height: '90%'
                    });
                    return false;
                });
                placeholders.eq(index).html(this).append(tag);
            });
        }

        function loadImage(src, callback) {
            var img = $('<img>').on('load', function() {
                callback.call(img);
            });
            img.attr('src', src);
        }

        function showNext() {
            if (index + 1 < items.length) {
                index++;
                offsetSlider(index);
                preload(index + 1);
            } else {
                slider.addClass('rightSpring');
                setTimeout(function() {
                    slider.removeClass('rightSpring');
                }, 500);
            }
        }

        function showPrevious() {
            if (index > 0) {
                index--;
                offsetSlider(index);
                preload(index - 1);
            } else {
                slider.addClass('leftSpring');
                setTimeout(function() {
                    slider.removeClass('leftSpring');
                }, 500);
            }
        }
    };
})(jQuery);