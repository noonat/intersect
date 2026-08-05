"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

  // node_modules/katex/dist/katex.js
  var require_katex = __commonJS({
    "node_modules/katex/dist/katex.js"(exports, module) {
      (function webpackUniversalModuleDefinition(root, factory) {
        if (typeof exports === "object" && typeof module === "object")
          module.exports = factory();
        else if (typeof define === "function" && define.amd)
          define([], factory);
        else if (typeof exports === "object")
          exports["katex"] = factory();
        else
          root["katex"] = factory();
      })(typeof self !== "undefined" ? self : exports, function() {
        return (
          /******/
          (function(modules) {
            var installedModules = {};
            function __webpack_require__(moduleId) {
              if (installedModules[moduleId]) {
                return installedModules[moduleId].exports;
              }
              var module2 = installedModules[moduleId] = {
                /******/
                i: moduleId,
                /******/
                l: false,
                /******/
                exports: {}
                /******/
              };
              modules[moduleId].call(module2.exports, module2, module2.exports, __webpack_require__);
              module2.l = true;
              return module2.exports;
            }
            __webpack_require__.m = modules;
            __webpack_require__.c = installedModules;
            __webpack_require__.d = function(exports2, name, getter) {
              if (!__webpack_require__.o(exports2, name)) {
                Object.defineProperty(exports2, name, { enumerable: true, get: getter });
              }
            };
            __webpack_require__.r = function(exports2) {
              if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
                Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
              }
              Object.defineProperty(exports2, "__esModule", { value: true });
            };
            __webpack_require__.t = function(value, mode) {
              if (mode & 1) value = __webpack_require__(value);
              if (mode & 8) return value;
              if (mode & 4 && typeof value === "object" && value && value.__esModule) return value;
              var ns = /* @__PURE__ */ Object.create(null);
              __webpack_require__.r(ns);
              Object.defineProperty(ns, "default", { enumerable: true, value });
              if (mode & 2 && typeof value != "string") for (var key in value) __webpack_require__.d(ns, key, function(key2) {
                return value[key2];
              }.bind(null, key));
              return ns;
            };
            __webpack_require__.n = function(module2) {
              var getter = module2 && module2.__esModule ? (
                /******/
                function getDefault() {
                  return module2["default"];
                }
              ) : (
                /******/
                function getModuleExports() {
                  return module2;
                }
              );
              __webpack_require__.d(getter, "a", getter);
              return getter;
            };
            __webpack_require__.o = function(object, property) {
              return Object.prototype.hasOwnProperty.call(object, property);
            };
            __webpack_require__.p = "";
            return __webpack_require__(__webpack_require__.s = 1);
          })([
            /* 0 */
            /***/
            (function(module2, exports2, __webpack_require__) {
            }),
            /* 1 */
            /***/
            (function(module2, __webpack_exports__, __webpack_require__) {
              "use strict";
              __webpack_require__.r(__webpack_exports__);
              var katex = __webpack_require__(0);
              var SourceLocation = /* @__PURE__ */ (function() {
                function SourceLocation2(lexer, start, end) {
                  this.lexer = void 0;
                  this.start = void 0;
                  this.end = void 0;
                  this.lexer = lexer;
                  this.start = start;
                  this.end = end;
                }
                SourceLocation2.range = function range(first, second) {
                  if (!second) {
                    return first && first.loc;
                  } else if (!first || !first.loc || !second.loc || first.loc.lexer !== second.loc.lexer) {
                    return null;
                  } else {
                    return new SourceLocation2(first.loc.lexer, first.loc.start, second.loc.end);
                  }
                };
                return SourceLocation2;
              })();
              var Token_Token = /* @__PURE__ */ (function() {
                function Token(text, loc) {
                  this.text = void 0;
                  this.loc = void 0;
                  this.text = text;
                  this.loc = loc;
                }
                var _proto = Token.prototype;
                _proto.range = function range(endToken, text) {
                  return new Token(text, SourceLocation.range(this, endToken));
                };
                return Token;
              })();
              var ParseError = (
                // Error position based on passed-in Token or ParseNode.
                function ParseError2(message, token) {
                  this.position = void 0;
                  var error = "KaTeX parse error: " + message;
                  var start;
                  var loc = token && token.loc;
                  if (loc && loc.start <= loc.end) {
                    var input = loc.lexer.input;
                    start = loc.start;
                    var end = loc.end;
                    if (start === input.length) {
                      error += " at end of input: ";
                    } else {
                      error += " at position " + (start + 1) + ": ";
                    }
                    var underlined = input.slice(start, end).replace(/[^]/g, "$&\u0332");
                    var left;
                    if (start > 15) {
                      left = "\u2026" + input.slice(start - 15, start);
                    } else {
                      left = input.slice(0, start);
                    }
                    var right;
                    if (end + 15 < input.length) {
                      right = input.slice(end, end + 15) + "\u2026";
                    } else {
                      right = input.slice(end);
                    }
                    error += left + underlined + right;
                  }
                  var self2 = new Error(error);
                  self2.name = "ParseError";
                  self2.__proto__ = ParseError2.prototype;
                  self2.position = start;
                  return self2;
                }
              );
              ParseError.prototype.__proto__ = Error.prototype;
              var src_ParseError = ParseError;
              var contains = function contains2(list, elem) {
                return list.indexOf(elem) !== -1;
              };
              var deflt = function deflt2(setting, defaultIfUndefined) {
                return setting === void 0 ? defaultIfUndefined : setting;
              };
              var uppercase = /([A-Z])/g;
              var hyphenate = function hyphenate2(str) {
                return str.replace(uppercase, "-$1").toLowerCase();
              };
              var ESCAPE_LOOKUP = {
                "&": "&amp;",
                ">": "&gt;",
                "<": "&lt;",
                '"': "&quot;",
                "'": "&#x27;"
              };
              var ESCAPE_REGEX = /[&><"']/g;
              function utils_escape(text) {
                return String(text).replace(ESCAPE_REGEX, function(match) {
                  return ESCAPE_LOOKUP[match];
                });
              }
              var getBaseElem = function getBaseElem2(group) {
                if (group.type === "ordgroup") {
                  if (group.body.length === 1) {
                    return getBaseElem2(group.body[0]);
                  } else {
                    return group;
                  }
                } else if (group.type === "color") {
                  if (group.body.length === 1) {
                    return getBaseElem2(group.body[0]);
                  } else {
                    return group;
                  }
                } else if (group.type === "font") {
                  return getBaseElem2(group.body);
                } else {
                  return group;
                }
              };
              var utils_isCharacterBox = function isCharacterBox(group) {
                var baseElem = getBaseElem(group);
                return baseElem.type === "mathord" || baseElem.type === "textord" || baseElem.type === "atom";
              };
              var assert = function assert2(value) {
                if (!value) {
                  throw new Error("Expected non-null, but got " + String(value));
                }
                return value;
              };
              var protocolFromUrl = function protocolFromUrl2(url) {
                var protocol = /^\s*([^\\/#]*?)(?::|&#0*58|&#x0*3a)/i.exec(url);
                return protocol != null ? protocol[1] : "_relative";
              };
              var utils = {
                contains,
                deflt,
                escape: utils_escape,
                hyphenate,
                getBaseElem,
                isCharacterBox: utils_isCharacterBox,
                protocolFromUrl
              };
              var Settings_Settings = /* @__PURE__ */ (function() {
                function Settings(options) {
                  this.displayMode = void 0;
                  this.output = void 0;
                  this.leqno = void 0;
                  this.fleqn = void 0;
                  this.throwOnError = void 0;
                  this.errorColor = void 0;
                  this.macros = void 0;
                  this.minRuleThickness = void 0;
                  this.colorIsTextColor = void 0;
                  this.strict = void 0;
                  this.trust = void 0;
                  this.maxSize = void 0;
                  this.maxExpand = void 0;
                  options = options || {};
                  this.displayMode = utils.deflt(options.displayMode, false);
                  this.output = utils.deflt(options.output, "htmlAndMathml");
                  this.leqno = utils.deflt(options.leqno, false);
                  this.fleqn = utils.deflt(options.fleqn, false);
                  this.throwOnError = utils.deflt(options.throwOnError, true);
                  this.errorColor = utils.deflt(options.errorColor, "#cc0000");
                  this.macros = options.macros || {};
                  this.minRuleThickness = Math.max(0, utils.deflt(options.minRuleThickness, 0));
                  this.colorIsTextColor = utils.deflt(options.colorIsTextColor, false);
                  this.strict = utils.deflt(options.strict, "warn");
                  this.trust = utils.deflt(options.trust, false);
                  this.maxSize = Math.max(0, utils.deflt(options.maxSize, Infinity));
                  this.maxExpand = Math.max(0, utils.deflt(options.maxExpand, 1e3));
                }
                var _proto = Settings.prototype;
                _proto.reportNonstrict = function reportNonstrict(errorCode, errorMsg, token) {
                  var strict = this.strict;
                  if (typeof strict === "function") {
                    strict = strict(errorCode, errorMsg, token);
                  }
                  if (!strict || strict === "ignore") {
                    return;
                  } else if (strict === true || strict === "error") {
                    throw new src_ParseError("LaTeX-incompatible input and strict mode is set to 'error': " + (errorMsg + " [" + errorCode + "]"), token);
                  } else if (strict === "warn") {
                    typeof console !== "undefined" && console.warn("LaTeX-incompatible input and strict mode is set to 'warn': " + (errorMsg + " [" + errorCode + "]"));
                  } else {
                    typeof console !== "undefined" && console.warn("LaTeX-incompatible input and strict mode is set to " + ("unrecognized '" + strict + "': " + errorMsg + " [" + errorCode + "]"));
                  }
                };
                _proto.useStrictBehavior = function useStrictBehavior(errorCode, errorMsg, token) {
                  var strict = this.strict;
                  if (typeof strict === "function") {
                    try {
                      strict = strict(errorCode, errorMsg, token);
                    } catch (error) {
                      strict = "error";
                    }
                  }
                  if (!strict || strict === "ignore") {
                    return false;
                  } else if (strict === true || strict === "error") {
                    return true;
                  } else if (strict === "warn") {
                    typeof console !== "undefined" && console.warn("LaTeX-incompatible input and strict mode is set to 'warn': " + (errorMsg + " [" + errorCode + "]"));
                    return false;
                  } else {
                    typeof console !== "undefined" && console.warn("LaTeX-incompatible input and strict mode is set to " + ("unrecognized '" + strict + "': " + errorMsg + " [" + errorCode + "]"));
                    return false;
                  }
                };
                _proto.isTrusted = function isTrusted(context) {
                  if (context.url && !context.protocol) {
                    context.protocol = utils.protocolFromUrl(context.url);
                  }
                  var trust = typeof this.trust === "function" ? this.trust(context) : this.trust;
                  return Boolean(trust);
                };
                return Settings;
              })();
              var Style = /* @__PURE__ */ (function() {
                function Style2(id, size, cramped) {
                  this.id = void 0;
                  this.size = void 0;
                  this.cramped = void 0;
                  this.id = id;
                  this.size = size;
                  this.cramped = cramped;
                }
                var _proto = Style2.prototype;
                _proto.sup = function sup() {
                  return Style_styles[_sup[this.id]];
                };
                _proto.sub = function sub() {
                  return Style_styles[_sub[this.id]];
                };
                _proto.fracNum = function fracNum() {
                  return Style_styles[_fracNum[this.id]];
                };
                _proto.fracDen = function fracDen() {
                  return Style_styles[_fracDen[this.id]];
                };
                _proto.cramp = function cramp() {
                  return Style_styles[_cramp[this.id]];
                };
                _proto.text = function text() {
                  return Style_styles[_text[this.id]];
                };
                _proto.isTight = function isTight() {
                  return this.size >= 2;
                };
                return Style2;
              })();
              var D = 0;
              var Dc = 1;
              var T = 2;
              var Tc = 3;
              var S = 4;
              var Sc = 5;
              var SS = 6;
              var SSc = 7;
              var Style_styles = [new Style(D, 0, false), new Style(Dc, 0, true), new Style(T, 1, false), new Style(Tc, 1, true), new Style(S, 2, false), new Style(Sc, 2, true), new Style(SS, 3, false), new Style(SSc, 3, true)];
              var _sup = [S, Sc, S, Sc, SS, SSc, SS, SSc];
              var _sub = [Sc, Sc, Sc, Sc, SSc, SSc, SSc, SSc];
              var _fracNum = [T, Tc, S, Sc, SS, SSc, SS, SSc];
              var _fracDen = [Tc, Tc, Sc, Sc, SSc, SSc, SSc, SSc];
              var _cramp = [Dc, Dc, Tc, Tc, Sc, Sc, SSc, SSc];
              var _text = [D, Dc, T, Tc, T, Tc, T, Tc];
              var src_Style = {
                DISPLAY: Style_styles[D],
                TEXT: Style_styles[T],
                SCRIPT: Style_styles[S],
                SCRIPTSCRIPT: Style_styles[SS]
              };
              var scriptData = [{
                // Latin characters beyond the Latin-1 characters we have metrics for.
                // Needed for Czech, Hungarian and Turkish text, for example.
                name: "latin",
                blocks: [
                  [256, 591],
                  // Latin Extended-A and Latin Extended-B
                  [768, 879]
                ]
              }, {
                // The Cyrillic script used by Russian and related languages.
                // A Cyrillic subset used to be supported as explicitly defined
                // symbols in symbols.js
                name: "cyrillic",
                blocks: [[1024, 1279]]
              }, {
                // The Brahmic scripts of South and Southeast Asia
                // Devanagari (0900–097F)
                // Bengali (0980–09FF)
                // Gurmukhi (0A00–0A7F)
                // Gujarati (0A80–0AFF)
                // Oriya (0B00–0B7F)
                // Tamil (0B80–0BFF)
                // Telugu (0C00–0C7F)
                // Kannada (0C80–0CFF)
                // Malayalam (0D00–0D7F)
                // Sinhala (0D80–0DFF)
                // Thai (0E00–0E7F)
                // Lao (0E80–0EFF)
                // Tibetan (0F00–0FFF)
                // Myanmar (1000–109F)
                name: "brahmic",
                blocks: [[2304, 4255]]
              }, {
                name: "georgian",
                blocks: [[4256, 4351]]
              }, {
                // Chinese and Japanese.
                // The "k" in cjk is for Korean, but we've separated Korean out
                name: "cjk",
                blocks: [
                  [12288, 12543],
                  // CJK symbols and punctuation, Hiragana, Katakana
                  [19968, 40879],
                  // CJK ideograms
                  [65280, 65376]
                ]
              }, {
                // Korean
                name: "hangul",
                blocks: [[44032, 55215]]
              }];
              function scriptFromCodepoint(codepoint) {
                for (var i = 0; i < scriptData.length; i++) {
                  var script = scriptData[i];
                  for (var _i = 0; _i < script.blocks.length; _i++) {
                    var block = script.blocks[_i];
                    if (codepoint >= block[0] && codepoint <= block[1]) {
                      return script.name;
                    }
                  }
                }
                return null;
              }
              var allBlocks = [];
              scriptData.forEach(function(s) {
                return s.blocks.forEach(function(b) {
                  return allBlocks.push.apply(allBlocks, b);
                });
              });
              function supportedCodepoint(codepoint) {
                for (var i = 0; i < allBlocks.length; i += 2) {
                  if (codepoint >= allBlocks[i] && codepoint <= allBlocks[i + 1]) {
                    return true;
                  }
                }
                return false;
              }
              var hLinePad = 80;
              var sqrtMain = function sqrtMain2(extraViniculum, hLinePad2) {
                return "M95," + (622 + extraViniculum + hLinePad2) + "\nc-2.7,0,-7.17,-2.7,-13.5,-8c-5.8,-5.3,-9.5,-10,-9.5,-14\nc0,-2,0.3,-3.3,1,-4c1.3,-2.7,23.83,-20.7,67.5,-54\nc44.2,-33.3,65.8,-50.3,66.5,-51c1.3,-1.3,3,-2,5,-2c4.7,0,8.7,3.3,12,10\ns173,378,173,378c0.7,0,35.3,-71,104,-213c68.7,-142,137.5,-285,206.5,-429\nc69,-144,104.5,-217.7,106.5,-221\nl" + extraViniculum / 2.075 + " -" + extraViniculum + "\nc5.3,-9.3,12,-14,20,-14\nH400000v" + (40 + extraViniculum) + "H845.2724\ns-225.272,467,-225.272,467s-235,486,-235,486c-2.7,4.7,-9,7,-19,7\nc-6,0,-10,-1,-12,-3s-194,-422,-194,-422s-65,47,-65,47z\nM" + (834 + extraViniculum) + " " + hLinePad2 + "h400000v" + (40 + extraViniculum) + "h-400000z";
              };
              var sqrtSize1 = function sqrtSize12(extraViniculum, hLinePad2) {
                return "M263," + (601 + extraViniculum + hLinePad2) + "c0.7,0,18,39.7,52,119\nc34,79.3,68.167,158.7,102.5,238c34.3,79.3,51.8,119.3,52.5,120\nc340,-704.7,510.7,-1060.3,512,-1067\nl" + extraViniculum / 2.084 + " -" + extraViniculum + "\nc4.7,-7.3,11,-11,19,-11\nH40000v" + (40 + extraViniculum) + "H1012.3\ns-271.3,567,-271.3,567c-38.7,80.7,-84,175,-136,283c-52,108,-89.167,185.3,-111.5,232\nc-22.3,46.7,-33.8,70.3,-34.5,71c-4.7,4.7,-12.3,7,-23,7s-12,-1,-12,-1\ns-109,-253,-109,-253c-72.7,-168,-109.3,-252,-110,-252c-10.7,8,-22,16.7,-34,26\nc-22,17.3,-33.3,26,-34,26s-26,-26,-26,-26s76,-59,76,-59s76,-60,76,-60z\nM" + (1001 + extraViniculum) + " " + hLinePad2 + "h400000v" + (40 + extraViniculum) + "h-400000z";
              };
              var sqrtSize2 = function sqrtSize22(extraViniculum, hLinePad2) {
                return "M983 " + (10 + extraViniculum + hLinePad2) + "\nl" + extraViniculum / 3.13 + " -" + extraViniculum + "\nc4,-6.7,10,-10,18,-10 H400000v" + (40 + extraViniculum) + "\nH1013.1s-83.4,268,-264.1,840c-180.7,572,-277,876.3,-289,913c-4.7,4.7,-12.7,7,-24,7\ns-12,0,-12,0c-1.3,-3.3,-3.7,-11.7,-7,-25c-35.3,-125.3,-106.7,-373.3,-214,-744\nc-10,12,-21,25,-33,39s-32,39,-32,39c-6,-5.3,-15,-14,-27,-26s25,-30,25,-30\nc26.7,-32.7,52,-63,76,-91s52,-60,52,-60s208,722,208,722\nc56,-175.3,126.3,-397.3,211,-666c84.7,-268.7,153.8,-488.2,207.5,-658.5\nc53.7,-170.3,84.5,-266.8,92.5,-289.5z\nM" + (1001 + extraViniculum) + " " + hLinePad2 + "h400000v" + (40 + extraViniculum) + "h-400000z";
              };
              var sqrtSize3 = function sqrtSize32(extraViniculum, hLinePad2) {
                return "M424," + (2398 + extraViniculum + hLinePad2) + "\nc-1.3,-0.7,-38.5,-172,-111.5,-514c-73,-342,-109.8,-513.3,-110.5,-514\nc0,-2,-10.7,14.3,-32,49c-4.7,7.3,-9.8,15.7,-15.5,25c-5.7,9.3,-9.8,16,-12.5,20\ns-5,7,-5,7c-4,-3.3,-8.3,-7.7,-13,-13s-13,-13,-13,-13s76,-122,76,-122s77,-121,77,-121\ns209,968,209,968c0,-2,84.7,-361.7,254,-1079c169.3,-717.3,254.7,-1077.7,256,-1081\nl" + extraViniculum / 4.223 + " -" + extraViniculum + "c4,-6.7,10,-10,18,-10 H400000\nv" + (40 + extraViniculum) + "H1014.6\ns-87.3,378.7,-272.6,1166c-185.3,787.3,-279.3,1182.3,-282,1185\nc-2,6,-10,9,-24,9\nc-8,0,-12,-0.7,-12,-2z M" + (1001 + extraViniculum) + " " + hLinePad2 + "\nh400000v" + (40 + extraViniculum) + "h-400000z";
              };
              var sqrtSize4 = function sqrtSize42(extraViniculum, hLinePad2) {
                return "M473," + (2713 + extraViniculum + hLinePad2) + "\nc339.3,-1799.3,509.3,-2700,510,-2702 l" + extraViniculum / 5.298 + " -" + extraViniculum + "\nc3.3,-7.3,9.3,-11,18,-11 H400000v" + (40 + extraViniculum) + "H1017.7\ns-90.5,478,-276.2,1466c-185.7,988,-279.5,1483,-281.5,1485c-2,6,-10,9,-24,9\nc-8,0,-12,-0.7,-12,-2c0,-1.3,-5.3,-32,-16,-92c-50.7,-293.3,-119.7,-693.3,-207,-1200\nc0,-1.3,-5.3,8.7,-16,30c-10.7,21.3,-21.3,42.7,-32,64s-16,33,-16,33s-26,-26,-26,-26\ns76,-153,76,-153s77,-151,77,-151c0.7,0.7,35.7,202,105,604c67.3,400.7,102,602.7,104,\n606zM" + (1001 + extraViniculum) + " " + hLinePad2 + "h400000v" + (40 + extraViniculum) + "H1017.7z";
              };
              var sqrtTall = function sqrtTall2(extraViniculum, hLinePad2, viewBoxHeight) {
                var vertSegment = viewBoxHeight - 54 - hLinePad2 - extraViniculum;
                return "M702 " + (extraViniculum + hLinePad2) + "H400000" + (40 + extraViniculum) + "\nH742v" + vertSegment + "l-4 4-4 4c-.667.7 -2 1.5-4 2.5s-4.167 1.833-6.5 2.5-5.5 1-9.5 1\nh-12l-28-84c-16.667-52-96.667 -294.333-240-727l-212 -643 -85 170\nc-4-3.333-8.333-7.667-13 -13l-13-13l77-155 77-156c66 199.333 139 419.667\n219 661 l218 661zM702 " + hLinePad2 + "H400000v" + (40 + extraViniculum) + "H742z";
              };
              var sqrtPath = function sqrtPath2(size, extraViniculum, viewBoxHeight) {
                extraViniculum = 1e3 * extraViniculum;
                var path = "";
                switch (size) {
                  case "sqrtMain":
                    path = sqrtMain(extraViniculum, hLinePad);
                    break;
                  case "sqrtSize1":
                    path = sqrtSize1(extraViniculum, hLinePad);
                    break;
                  case "sqrtSize2":
                    path = sqrtSize2(extraViniculum, hLinePad);
                    break;
                  case "sqrtSize3":
                    path = sqrtSize3(extraViniculum, hLinePad);
                    break;
                  case "sqrtSize4":
                    path = sqrtSize4(extraViniculum, hLinePad);
                    break;
                  case "sqrtTall":
                    path = sqrtTall(extraViniculum, hLinePad, viewBoxHeight);
                }
                return path;
              };
              var svgGeometry_path = {
                // The doubleleftarrow geometry is from glyph U+21D0 in the font KaTeX Main
                doubleleftarrow: "M262 157\nl10-10c34-36 62.7-77 86-123 3.3-8 5-13.3 5-16 0-5.3-6.7-8-20-8-7.3\n 0-12.2.5-14.5 1.5-2.3 1-4.8 4.5-7.5 10.5-49.3 97.3-121.7 169.3-217 216-28\n 14-57.3 25-88 33-6.7 2-11 3.8-13 5.5-2 1.7-3 4.2-3 7.5s1 5.8 3 7.5\nc2 1.7 6.3 3.5 13 5.5 68 17.3 128.2 47.8 180.5 91.5 52.3 43.7 93.8 96.2 124.5\n 157.5 9.3 8 15.3 12.3 18 13h6c12-.7 18-4 18-10 0-2-1.7-7-5-15-23.3-46-52-87\n-86-123l-10-10h399738v-40H218c328 0 0 0 0 0l-10-8c-26.7-20-65.7-43-117-69 2.7\n-2 6-3.7 10-5 36.7-16 72.3-37.3 107-64l10-8h399782v-40z\nm8 0v40h399730v-40zm0 194v40h399730v-40z",
                // doublerightarrow is from glyph U+21D2 in font KaTeX Main
                doublerightarrow: "M399738 392l\n-10 10c-34 36-62.7 77-86 123-3.3 8-5 13.3-5 16 0 5.3 6.7 8 20 8 7.3 0 12.2-.5\n 14.5-1.5 2.3-1 4.8-4.5 7.5-10.5 49.3-97.3 121.7-169.3 217-216 28-14 57.3-25 88\n-33 6.7-2 11-3.8 13-5.5 2-1.7 3-4.2 3-7.5s-1-5.8-3-7.5c-2-1.7-6.3-3.5-13-5.5-68\n-17.3-128.2-47.8-180.5-91.5-52.3-43.7-93.8-96.2-124.5-157.5-9.3-8-15.3-12.3-18\n-13h-6c-12 .7-18 4-18 10 0 2 1.7 7 5 15 23.3 46 52 87 86 123l10 10H0v40h399782\nc-328 0 0 0 0 0l10 8c26.7 20 65.7 43 117 69-2.7 2-6 3.7-10 5-36.7 16-72.3 37.3\n-107 64l-10 8H0v40zM0 157v40h399730v-40zm0 194v40h399730v-40z",
                // leftarrow is from glyph U+2190 in font KaTeX Main
                leftarrow: "M400000 241H110l3-3c68.7-52.7 113.7-120\n 135-202 4-14.7 6-23 6-25 0-7.3-7-11-21-11-8 0-13.2.8-15.5 2.5-2.3 1.7-4.2 5.8\n-5.5 12.5-1.3 4.7-2.7 10.3-4 17-12 48.7-34.8 92-68.5 130S65.3 228.3 18 247\nc-10 4-16 7.7-18 11 0 8.7 6 14.3 18 17 47.3 18.7 87.8 47 121.5 85S196 441.3 208\n 490c.7 2 1.3 5 2 9s1.2 6.7 1.5 8c.3 1.3 1 3.3 2 6s2.2 4.5 3.5 5.5c1.3 1 3.3\n 1.8 6 2.5s6 1 10 1c14 0 21-3.7 21-11 0-2-2-10.3-6-25-20-79.3-65-146.7-135-202\n l-3-3h399890zM100 241v40h399900v-40z",
                // overbrace is from glyphs U+23A9/23A8/23A7 in font KaTeX_Size4-Regular
                leftbrace: "M6 548l-6-6v-35l6-11c56-104 135.3-181.3 238-232 57.3-28.7 117\n-45 179-50h399577v120H403c-43.3 7-81 15-113 26-100.7 33-179.7 91-237 174-2.7\n 5-6 9-10 13-.7 1-7.3 1-20 1H6z",
                leftbraceunder: "M0 6l6-6h17c12.688 0 19.313.3 20 1 4 4 7.313 8.3 10 13\n 35.313 51.3 80.813 93.8 136.5 127.5 55.688 33.7 117.188 55.8 184.5 66.5.688\n 0 2 .3 4 1 18.688 2.7 76 4.3 172 5h399450v120H429l-6-1c-124.688-8-235-61.7\n-331-161C60.687 138.7 32.312 99.3 7 54L0 41V6z",
                // overgroup is from the MnSymbol package (public domain)
                leftgroup: "M400000 80\nH435C64 80 168.3 229.4 21 260c-5.9 1.2-18 0-18 0-2 0-3-1-3-3v-38C76 61 257 0\n 435 0h399565z",
                leftgroupunder: "M400000 262\nH435C64 262 168.3 112.6 21 82c-5.9-1.2-18 0-18 0-2 0-3 1-3 3v38c76 158 257 219\n 435 219h399565z",
                // Harpoons are from glyph U+21BD in font KaTeX Main
                leftharpoon: "M0 267c.7 5.3 3 10 7 14h399993v-40H93c3.3\n-3.3 10.2-9.5 20.5-18.5s17.8-15.8 22.5-20.5c50.7-52 88-110.3 112-175 4-11.3 5\n-18.3 3-21-1.3-4-7.3-6-18-6-8 0-13 .7-15 2s-4.7 6.7-8 16c-42 98.7-107.3 174.7\n-196 228-6.7 4.7-10.7 8-12 10-1.3 2-2 5.7-2 11zm100-26v40h399900v-40z",
                leftharpoonplus: "M0 267c.7 5.3 3 10 7 14h399993v-40H93c3.3-3.3 10.2-9.5\n 20.5-18.5s17.8-15.8 22.5-20.5c50.7-52 88-110.3 112-175 4-11.3 5-18.3 3-21-1.3\n-4-7.3-6-18-6-8 0-13 .7-15 2s-4.7 6.7-8 16c-42 98.7-107.3 174.7-196 228-6.7 4.7\n-10.7 8-12 10-1.3 2-2 5.7-2 11zm100-26v40h399900v-40zM0 435v40h400000v-40z\nm0 0v40h400000v-40z",
                leftharpoondown: "M7 241c-4 4-6.333 8.667-7 14 0 5.333.667 9 2 11s5.333\n 5.333 12 10c90.667 54 156 130 196 228 3.333 10.667 6.333 16.333 9 17 2 .667 5\n 1 9 1h5c10.667 0 16.667-2 18-6 2-2.667 1-9.667-3-21-32-87.333-82.667-157.667\n-152-211l-3-3h399907v-40zM93 281 H400000 v-40L7 241z",
                leftharpoondownplus: "M7 435c-4 4-6.3 8.7-7 14 0 5.3.7 9 2 11s5.3 5.3 12\n 10c90.7 54 156 130 196 228 3.3 10.7 6.3 16.3 9 17 2 .7 5 1 9 1h5c10.7 0 16.7\n-2 18-6 2-2.7 1-9.7-3-21-32-87.3-82.7-157.7-152-211l-3-3h399907v-40H7zm93 0\nv40h399900v-40zM0 241v40h399900v-40zm0 0v40h399900v-40z",
                // hook is from glyph U+21A9 in font KaTeX Main
                lefthook: "M400000 281 H103s-33-11.2-61-33.5S0 197.3 0 164s14.2-61.2 42.5\n-83.5C70.8 58.2 104 47 142 47 c16.7 0 25 6.7 25 20 0 12-8.7 18.7-26 20-40 3.3\n-68.7 15.7-86 37-10 12-15 25.3-15 40 0 22.7 9.8 40.7 29.5 54 19.7 13.3 43.5 21\n 71.5 23h399859zM103 281v-40h399897v40z",
                leftlinesegment: "M40 281 V428 H0 V94 H40 V241 H400000 v40z\nM40 281 V428 H0 V94 H40 V241 H400000 v40z",
                leftmapsto: "M40 281 V448H0V74H40V241H400000v40z\nM40 281 V448H0V74H40V241H400000v40z",
                // tofrom is from glyph U+21C4 in font KaTeX AMS Regular
                leftToFrom: "M0 147h400000v40H0zm0 214c68 40 115.7 95.7 143 167h22c15.3 0 23\n-.3 23-1 0-1.3-5.3-13.7-16-37-18-35.3-41.3-69-70-101l-7-8h399905v-40H95l7-8\nc28.7-32 52-65.7 70-101 10.7-23.3 16-35.7 16-37 0-.7-7.7-1-23-1h-22C115.7 265.3\n 68 321 0 361zm0-174v-40h399900v40zm100 154v40h399900v-40z",
                longequal: "M0 50 h400000 v40H0z m0 194h40000v40H0z\nM0 50 h400000 v40H0z m0 194h40000v40H0z",
                midbrace: "M200428 334\nc-100.7-8.3-195.3-44-280-108-55.3-42-101.7-93-139-153l-9-14c-2.7 4-5.7 8.7-9 14\n-53.3 86.7-123.7 153-211 199-66.7 36-137.3 56.3-212 62H0V214h199568c178.3-11.7\n 311.7-78.3 403-201 6-8 9.7-12 11-12 .7-.7 6.7-1 18-1s17.3.3 18 1c1.3 0 5 4 11\n 12 44.7 59.3 101.3 106.3 170 141s145.3 54.3 229 60h199572v120z",
                midbraceunder: "M199572 214\nc100.7 8.3 195.3 44 280 108 55.3 42 101.7 93 139 153l9 14c2.7-4 5.7-8.7 9-14\n 53.3-86.7 123.7-153 211-199 66.7-36 137.3-56.3 212-62h199568v120H200432c-178.3\n 11.7-311.7 78.3-403 201-6 8-9.7 12-11 12-.7.7-6.7 1-18 1s-17.3-.3-18-1c-1.3 0\n-5-4-11-12-44.7-59.3-101.3-106.3-170-141s-145.3-54.3-229-60H0V214z",
                oiintSize1: "M512.6 71.6c272.6 0 320.3 106.8 320.3 178.2 0 70.8-47.7 177.6\n-320.3 177.6S193.1 320.6 193.1 249.8c0-71.4 46.9-178.2 319.5-178.2z\nm368.1 178.2c0-86.4-60.9-215.4-368.1-215.4-306.4 0-367.3 129-367.3 215.4 0 85.8\n60.9 214.8 367.3 214.8 307.2 0 368.1-129 368.1-214.8z",
                oiintSize2: "M757.8 100.1c384.7 0 451.1 137.6 451.1 230 0 91.3-66.4 228.8\n-451.1 228.8-386.3 0-452.7-137.5-452.7-228.8 0-92.4 66.4-230 452.7-230z\nm502.4 230c0-111.2-82.4-277.2-502.4-277.2s-504 166-504 277.2\nc0 110 84 276 504 276s502.4-166 502.4-276z",
                oiiintSize1: "M681.4 71.6c408.9 0 480.5 106.8 480.5 178.2 0 70.8-71.6 177.6\n-480.5 177.6S202.1 320.6 202.1 249.8c0-71.4 70.5-178.2 479.3-178.2z\nm525.8 178.2c0-86.4-86.8-215.4-525.7-215.4-437.9 0-524.7 129-524.7 215.4 0\n85.8 86.8 214.8 524.7 214.8 438.9 0 525.7-129 525.7-214.8z",
                oiiintSize2: "M1021.2 53c603.6 0 707.8 165.8 707.8 277.2 0 110-104.2 275.8\n-707.8 275.8-606 0-710.2-165.8-710.2-275.8C311 218.8 415.2 53 1021.2 53z\nm770.4 277.1c0-131.2-126.4-327.6-770.5-327.6S248.4 198.9 248.4 330.1\nc0 130 128.8 326.4 772.7 326.4s770.5-196.4 770.5-326.4z",
                rightarrow: "M0 241v40h399891c-47.3 35.3-84 78-110 128\n-16.7 32-27.7 63.7-33 95 0 1.3-.2 2.7-.5 4-.3 1.3-.5 2.3-.5 3 0 7.3 6.7 11 20\n 11 8 0 13.2-.8 15.5-2.5 2.3-1.7 4.2-5.5 5.5-11.5 2-13.3 5.7-27 11-41 14.7-44.7\n 39-84.5 73-119.5s73.7-60.2 119-75.5c6-2 9-5.7 9-11s-3-9-9-11c-45.3-15.3-85\n-40.5-119-75.5s-58.3-74.8-73-119.5c-4.7-14-8.3-27.3-11-40-1.3-6.7-3.2-10.8-5.5\n-12.5-2.3-1.7-7.5-2.5-15.5-2.5-14 0-21 3.7-21 11 0 2 2 10.3 6 25 20.7 83.3 67\n 151.7 139 205zm0 0v40h399900v-40z",
                rightbrace: "M400000 542l\n-6 6h-17c-12.7 0-19.3-.3-20-1-4-4-7.3-8.3-10-13-35.3-51.3-80.8-93.8-136.5-127.5\ns-117.2-55.8-184.5-66.5c-.7 0-2-.3-4-1-18.7-2.7-76-4.3-172-5H0V214h399571l6 1\nc124.7 8 235 61.7 331 161 31.3 33.3 59.7 72.7 85 118l7 13v35z",
                rightbraceunder: "M399994 0l6 6v35l-6 11c-56 104-135.3 181.3-238 232-57.3\n 28.7-117 45-179 50H-300V214h399897c43.3-7 81-15 113-26 100.7-33 179.7-91 237\n-174 2.7-5 6-9 10-13 .7-1 7.3-1 20-1h17z",
                rightgroup: "M0 80h399565c371 0 266.7 149.4 414 180 5.9 1.2 18 0 18 0 2 0\n 3-1 3-3v-38c-76-158-257-219-435-219H0z",
                rightgroupunder: "M0 262h399565c371 0 266.7-149.4 414-180 5.9-1.2 18 0 18\n 0 2 0 3 1 3 3v38c-76 158-257 219-435 219H0z",
                rightharpoon: "M0 241v40h399993c4.7-4.7 7-9.3 7-14 0-9.3\n-3.7-15.3-11-18-92.7-56.7-159-133.7-199-231-3.3-9.3-6-14.7-8-16-2-1.3-7-2-15-2\n-10.7 0-16.7 2-18 6-2 2.7-1 9.7 3 21 15.3 42 36.7 81.8 64 119.5 27.3 37.7 58\n 69.2 92 94.5zm0 0v40h399900v-40z",
                rightharpoonplus: "M0 241v40h399993c4.7-4.7 7-9.3 7-14 0-9.3-3.7-15.3-11\n-18-92.7-56.7-159-133.7-199-231-3.3-9.3-6-14.7-8-16-2-1.3-7-2-15-2-10.7 0-16.7\n 2-18 6-2 2.7-1 9.7 3 21 15.3 42 36.7 81.8 64 119.5 27.3 37.7 58 69.2 92 94.5z\nm0 0v40h399900v-40z m100 194v40h399900v-40zm0 0v40h399900v-40z",
                rightharpoondown: "M399747 511c0 7.3 6.7 11 20 11 8 0 13-.8 15-2.5s4.7-6.8\n 8-15.5c40-94 99.3-166.3 178-217 13.3-8 20.3-12.3 21-13 5.3-3.3 8.5-5.8 9.5\n-7.5 1-1.7 1.5-5.2 1.5-10.5s-2.3-10.3-7-15H0v40h399908c-34 25.3-64.7 57-92 95\n-27.3 38-48.7 77.7-64 119-3.3 8.7-5 14-5 16zM0 241v40h399900v-40z",
                rightharpoondownplus: "M399747 705c0 7.3 6.7 11 20 11 8 0 13-.8\n 15-2.5s4.7-6.8 8-15.5c40-94 99.3-166.3 178-217 13.3-8 20.3-12.3 21-13 5.3-3.3\n 8.5-5.8 9.5-7.5 1-1.7 1.5-5.2 1.5-10.5s-2.3-10.3-7-15H0v40h399908c-34 25.3\n-64.7 57-92 95-27.3 38-48.7 77.7-64 119-3.3 8.7-5 14-5 16zM0 435v40h399900v-40z\nm0-194v40h400000v-40zm0 0v40h400000v-40z",
                righthook: "M399859 241c-764 0 0 0 0 0 40-3.3 68.7-15.7 86-37 10-12 15-25.3\n 15-40 0-22.7-9.8-40.7-29.5-54-19.7-13.3-43.5-21-71.5-23-17.3-1.3-26-8-26-20 0\n-13.3 8.7-20 26-20 38 0 71 11.2 99 33.5 0 0 7 5.6 21 16.7 14 11.2 21 33.5 21\n 66.8s-14 61.2-42 83.5c-28 22.3-61 33.5-99 33.5L0 241z M0 281v-40h399859v40z",
                rightlinesegment: "M399960 241 V94 h40 V428 h-40 V281 H0 v-40z\nM399960 241 V94 h40 V428 h-40 V281 H0 v-40z",
                rightToFrom: "M400000 167c-70.7-42-118-97.7-142-167h-23c-15.3 0-23 .3-23\n 1 0 1.3 5.3 13.7 16 37 18 35.3 41.3 69 70 101l7 8H0v40h399905l-7 8c-28.7 32\n-52 65.7-70 101-10.7 23.3-16 35.7-16 37 0 .7 7.7 1 23 1h23c24-69.3 71.3-125 142\n-167z M100 147v40h399900v-40zM0 341v40h399900v-40z",
                // twoheadleftarrow is from glyph U+219E in font KaTeX AMS Regular
                twoheadleftarrow: "M0 167c68 40\n 115.7 95.7 143 167h22c15.3 0 23-.3 23-1 0-1.3-5.3-13.7-16-37-18-35.3-41.3-69\n-70-101l-7-8h125l9 7c50.7 39.3 85 86 103 140h46c0-4.7-6.3-18.7-19-42-18-35.3\n-40-67.3-66-96l-9-9h399716v-40H284l9-9c26-28.7 48-60.7 66-96 12.7-23.333 19\n-37.333 19-42h-46c-18 54-52.3 100.7-103 140l-9 7H95l7-8c28.7-32 52-65.7 70-101\n 10.7-23.333 16-35.7 16-37 0-.7-7.7-1-23-1h-22C115.7 71.3 68 127 0 167z",
                twoheadrightarrow: "M400000 167\nc-68-40-115.7-95.7-143-167h-22c-15.3 0-23 .3-23 1 0 1.3 5.3 13.7 16 37 18 35.3\n 41.3 69 70 101l7 8h-125l-9-7c-50.7-39.3-85-86-103-140h-46c0 4.7 6.3 18.7 19 42\n 18 35.3 40 67.3 66 96l9 9H0v40h399716l-9 9c-26 28.7-48 60.7-66 96-12.7 23.333\n-19 37.333-19 42h46c18-54 52.3-100.7 103-140l9-7h125l-7 8c-28.7 32-52 65.7-70\n 101-10.7 23.333-16 35.7-16 37 0 .7 7.7 1 23 1h22c27.3-71.3 75-127 143-167z",
                // tilde1 is a modified version of a glyph from the MnSymbol package
                tilde1: "M200 55.538c-77 0-168 73.953-177 73.953-3 0-7\n-2.175-9-5.437L2 97c-1-2-2-4-2-6 0-4 2-7 5-9l20-12C116 12 171 0 207 0c86 0\n 114 68 191 68 78 0 168-68 177-68 4 0 7 2 9 5l12 19c1 2.175 2 4.35 2 6.525 0\n 4.35-2 7.613-5 9.788l-19 13.05c-92 63.077-116.937 75.308-183 76.128\n-68.267.847-113-73.952-191-73.952z",
                // ditto tilde2, tilde3, & tilde4
                tilde2: "M344 55.266c-142 0-300.638 81.316-311.5 86.418\n-8.01 3.762-22.5 10.91-23.5 5.562L1 120c-1-2-1-3-1-4 0-5 3-9 8-10l18.4-9C160.9\n 31.9 283 0 358 0c148 0 188 122 331 122s314-97 326-97c4 0 8 2 10 7l7 21.114\nc1 2.14 1 3.21 1 4.28 0 5.347-3 9.626-7 10.696l-22.3 12.622C852.6 158.372 751\n 181.476 676 181.476c-149 0-189-126.21-332-126.21z",
                tilde3: "M786 59C457 59 32 175.242 13 175.242c-6 0-10-3.457\n-11-10.37L.15 138c-1-7 3-12 10-13l19.2-6.4C378.4 40.7 634.3 0 804.3 0c337 0\n 411.8 157 746.8 157 328 0 754-112 773-112 5 0 10 3 11 9l1 14.075c1 8.066-.697\n 16.595-6.697 17.492l-21.052 7.31c-367.9 98.146-609.15 122.696-778.15 122.696\n -338 0-409-156.573-744-156.573z",
                tilde4: "M786 58C457 58 32 177.487 13 177.487c-6 0-10-3.345\n-11-10.035L.15 143c-1-7 3-12 10-13l22-6.7C381.2 35 637.15 0 807.15 0c337 0 409\n 177 744 177 328 0 754-127 773-127 5 0 10 3 11 9l1 14.794c1 7.805-3 13.38-9\n 14.495l-20.7 5.574c-366.85 99.79-607.3 139.372-776.3 139.372-338 0-409\n -175.236-744-175.236z",
                // vec is from glyph U+20D7 in font KaTeX Main
                vec: "M377 20c0-5.333 1.833-10 5.5-14S391 0 397 0c4.667 0 8.667 1.667 12 5\n3.333 2.667 6.667 9 10 19 6.667 24.667 20.333 43.667 41 57 7.333 4.667 11\n10.667 11 18 0 6-1 10-3 12s-6.667 5-14 9c-28.667 14.667-53.667 35.667-75 63\n-1.333 1.333-3.167 3.5-5.5 6.5s-4 4.833-5 5.5c-1 .667-2.5 1.333-4.5 2s-4.333 1\n-7 1c-4.667 0-9.167-1.833-13.5-5.5S337 184 337 178c0-12.667 15.667-32.333 47-59\nH213l-171-1c-8.667-6-13-12.333-13-19 0-4.667 4.333-11.333 13-20h359\nc-16-25.333-24-45-24-59z",
                // widehat1 is a modified version of a glyph from the MnSymbol package
                widehat1: "M529 0h5l519 115c5 1 9 5 9 10 0 1-1 2-1 3l-4 22\nc-1 5-5 9-11 9h-2L532 67 19 159h-2c-5 0-9-4-11-9l-5-22c-1-6 2-12 8-13z",
                // ditto widehat2, widehat3, & widehat4
                widehat2: "M1181 0h2l1171 176c6 0 10 5 10 11l-2 23c-1 6-5 10\n-11 10h-1L1182 67 15 220h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z",
                widehat3: "M1181 0h2l1171 236c6 0 10 5 10 11l-2 23c-1 6-5 10\n-11 10h-1L1182 67 15 280h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z",
                widehat4: "M1181 0h2l1171 296c6 0 10 5 10 11l-2 23c-1 6-5 10\n-11 10h-1L1182 67 15 340h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z",
                // widecheck paths are all inverted versions of widehat
                widecheck1: "M529,159h5l519,-115c5,-1,9,-5,9,-10c0,-1,-1,-2,-1,-3l-4,-22c-1,\n-5,-5,-9,-11,-9h-2l-512,92l-513,-92h-2c-5,0,-9,4,-11,9l-5,22c-1,6,2,12,8,13z",
                widecheck2: "M1181,220h2l1171,-176c6,0,10,-5,10,-11l-2,-23c-1,-6,-5,-10,\n-11,-10h-1l-1168,153l-1167,-153h-1c-6,0,-10,4,-11,10l-2,23c-1,6,4,11,10,11z",
                widecheck3: "M1181,280h2l1171,-236c6,0,10,-5,10,-11l-2,-23c-1,-6,-5,-10,\n-11,-10h-1l-1168,213l-1167,-213h-1c-6,0,-10,4,-11,10l-2,23c-1,6,4,11,10,11z",
                widecheck4: "M1181,340h2l1171,-296c6,0,10,-5,10,-11l-2,-23c-1,-6,-5,-10,\n-11,-10h-1l-1168,273l-1167,-273h-1c-6,0,-10,4,-11,10l-2,23c-1,6,4,11,10,11z",
                // The next ten paths support reaction arrows from the mhchem package.
                // Arrows for \ce{<-->} are offset from xAxis by 0.22ex, per mhchem in LaTeX
                // baraboveleftarrow is mostly from from glyph U+2190 in font KaTeX Main
                baraboveleftarrow: "M400000 620h-399890l3 -3c68.7 -52.7 113.7 -120 135 -202\nc4 -14.7 6 -23 6 -25c0 -7.3 -7 -11 -21 -11c-8 0 -13.2 0.8 -15.5 2.5\nc-2.3 1.7 -4.2 5.8 -5.5 12.5c-1.3 4.7 -2.7 10.3 -4 17c-12 48.7 -34.8 92 -68.5 130\ns-74.2 66.3 -121.5 85c-10 4 -16 7.7 -18 11c0 8.7 6 14.3 18 17c47.3 18.7 87.8 47\n121.5 85s56.5 81.3 68.5 130c0.7 2 1.3 5 2 9s1.2 6.7 1.5 8c0.3 1.3 1 3.3 2 6\ns2.2 4.5 3.5 5.5c1.3 1 3.3 1.8 6 2.5s6 1 10 1c14 0 21 -3.7 21 -11\nc0 -2 -2 -10.3 -6 -25c-20 -79.3 -65 -146.7 -135 -202l-3 -3h399890z\nM100 620v40h399900v-40z M0 241v40h399900v-40zM0 241v40h399900v-40z",
                // rightarrowabovebar is mostly from glyph U+2192, KaTeX Main
                rightarrowabovebar: "M0 241v40h399891c-47.3 35.3-84 78-110 128-16.7 32\n-27.7 63.7-33 95 0 1.3-.2 2.7-.5 4-.3 1.3-.5 2.3-.5 3 0 7.3 6.7 11 20 11 8 0\n13.2-.8 15.5-2.5 2.3-1.7 4.2-5.5 5.5-11.5 2-13.3 5.7-27 11-41 14.7-44.7 39\n-84.5 73-119.5s73.7-60.2 119-75.5c6-2 9-5.7 9-11s-3-9-9-11c-45.3-15.3-85-40.5\n-119-75.5s-58.3-74.8-73-119.5c-4.7-14-8.3-27.3-11-40-1.3-6.7-3.2-10.8-5.5\n-12.5-2.3-1.7-7.5-2.5-15.5-2.5-14 0-21 3.7-21 11 0 2 2 10.3 6 25 20.7 83.3 67\n151.7 139 205zm96 379h399894v40H0zm0 0h399904v40H0z",
                // The short left harpoon has 0.5em (i.e. 500 units) kern on the left end.
                // Ref from mhchem.sty: \rlap{\raisebox{-.22ex}{$\kern0.5em
                baraboveshortleftharpoon: "M507,435c-4,4,-6.3,8.7,-7,14c0,5.3,0.7,9,2,11\nc1.3,2,5.3,5.3,12,10c90.7,54,156,130,196,228c3.3,10.7,6.3,16.3,9,17\nc2,0.7,5,1,9,1c0,0,5,0,5,0c10.7,0,16.7,-2,18,-6c2,-2.7,1,-9.7,-3,-21\nc-32,-87.3,-82.7,-157.7,-152,-211c0,0,-3,-3,-3,-3l399351,0l0,-40\nc-398570,0,-399437,0,-399437,0z M593 435 v40 H399500 v-40z\nM0 281 v-40 H399908 v40z M0 281 v-40 H399908 v40z",
                rightharpoonaboveshortbar: "M0,241 l0,40c399126,0,399993,0,399993,0\nc4.7,-4.7,7,-9.3,7,-14c0,-9.3,-3.7,-15.3,-11,-18c-92.7,-56.7,-159,-133.7,-199,\n-231c-3.3,-9.3,-6,-14.7,-8,-16c-2,-1.3,-7,-2,-15,-2c-10.7,0,-16.7,2,-18,6\nc-2,2.7,-1,9.7,3,21c15.3,42,36.7,81.8,64,119.5c27.3,37.7,58,69.2,92,94.5z\nM0 241 v40 H399908 v-40z M0 475 v-40 H399500 v40z M0 475 v-40 H399500 v40z",
                shortbaraboveleftharpoon: "M7,435c-4,4,-6.3,8.7,-7,14c0,5.3,0.7,9,2,11\nc1.3,2,5.3,5.3,12,10c90.7,54,156,130,196,228c3.3,10.7,6.3,16.3,9,17c2,0.7,5,1,9,\n1c0,0,5,0,5,0c10.7,0,16.7,-2,18,-6c2,-2.7,1,-9.7,-3,-21c-32,-87.3,-82.7,-157.7,\n-152,-211c0,0,-3,-3,-3,-3l399907,0l0,-40c-399126,0,-399993,0,-399993,0z\nM93 435 v40 H400000 v-40z M500 241 v40 H400000 v-40z M500 241 v40 H400000 v-40z",
                shortrightharpoonabovebar: "M53,241l0,40c398570,0,399437,0,399437,0\nc4.7,-4.7,7,-9.3,7,-14c0,-9.3,-3.7,-15.3,-11,-18c-92.7,-56.7,-159,-133.7,-199,\n-231c-3.3,-9.3,-6,-14.7,-8,-16c-2,-1.3,-7,-2,-15,-2c-10.7,0,-16.7,2,-18,6\nc-2,2.7,-1,9.7,3,21c15.3,42,36.7,81.8,64,119.5c27.3,37.7,58,69.2,92,94.5z\nM500 241 v40 H399408 v-40z M500 435 v40 H400000 v-40z"
              };
              var tree_DocumentFragment = /* @__PURE__ */ (function() {
                function DocumentFragment(children) {
                  this.children = void 0;
                  this.classes = void 0;
                  this.height = void 0;
                  this.depth = void 0;
                  this.maxFontSize = void 0;
                  this.style = void 0;
                  this.children = children;
                  this.classes = [];
                  this.height = 0;
                  this.depth = 0;
                  this.maxFontSize = 0;
                  this.style = {};
                }
                var _proto = DocumentFragment.prototype;
                _proto.hasClass = function hasClass(className) {
                  return utils.contains(this.classes, className);
                };
                _proto.toNode = function toNode() {
                  var frag = document.createDocumentFragment();
                  for (var i = 0; i < this.children.length; i++) {
                    frag.appendChild(this.children[i].toNode());
                  }
                  return frag;
                };
                _proto.toMarkup = function toMarkup() {
                  var markup = "";
                  for (var i = 0; i < this.children.length; i++) {
                    markup += this.children[i].toMarkup();
                  }
                  return markup;
                };
                _proto.toText = function toText() {
                  var toText2 = function toText3(child) {
                    return child.toText();
                  };
                  return this.children.map(toText2).join("");
                };
                return DocumentFragment;
              })();
              var createClass = function createClass2(classes) {
                return classes.filter(function(cls) {
                  return cls;
                }).join(" ");
              };
              var initNode = function initNode2(classes, options, style) {
                this.classes = classes || [];
                this.attributes = {};
                this.height = 0;
                this.depth = 0;
                this.maxFontSize = 0;
                this.style = style || {};
                if (options) {
                  if (options.style.isTight()) {
                    this.classes.push("mtight");
                  }
                  var color = options.getColor();
                  if (color) {
                    this.style.color = color;
                  }
                }
              };
              var _toNode = function toNode(tagName) {
                var node = document.createElement(tagName);
                node.className = createClass(this.classes);
                for (var style in this.style) {
                  if (this.style.hasOwnProperty(style)) {
                    node.style[style] = this.style[style];
                  }
                }
                for (var attr in this.attributes) {
                  if (this.attributes.hasOwnProperty(attr)) {
                    node.setAttribute(attr, this.attributes[attr]);
                  }
                }
                for (var i = 0; i < this.children.length; i++) {
                  node.appendChild(this.children[i].toNode());
                }
                return node;
              };
              var _toMarkup = function toMarkup(tagName) {
                var markup = "<" + tagName;
                if (this.classes.length) {
                  markup += ' class="' + utils.escape(createClass(this.classes)) + '"';
                }
                var styles = "";
                for (var style in this.style) {
                  if (this.style.hasOwnProperty(style)) {
                    styles += utils.hyphenate(style) + ":" + this.style[style] + ";";
                  }
                }
                if (styles) {
                  markup += ' style="' + utils.escape(styles) + '"';
                }
                for (var attr in this.attributes) {
                  if (this.attributes.hasOwnProperty(attr)) {
                    markup += " " + attr + '="' + utils.escape(this.attributes[attr]) + '"';
                  }
                }
                markup += ">";
                for (var i = 0; i < this.children.length; i++) {
                  markup += this.children[i].toMarkup();
                }
                markup += "</" + tagName + ">";
                return markup;
              };
              var domTree_Span = /* @__PURE__ */ (function() {
                function Span(classes, children, options, style) {
                  this.children = void 0;
                  this.attributes = void 0;
                  this.classes = void 0;
                  this.height = void 0;
                  this.depth = void 0;
                  this.width = void 0;
                  this.maxFontSize = void 0;
                  this.style = void 0;
                  initNode.call(this, classes, options, style);
                  this.children = children || [];
                }
                var _proto = Span.prototype;
                _proto.setAttribute = function setAttribute(attribute, value) {
                  this.attributes[attribute] = value;
                };
                _proto.hasClass = function hasClass(className) {
                  return utils.contains(this.classes, className);
                };
                _proto.toNode = function toNode() {
                  return _toNode.call(this, "span");
                };
                _proto.toMarkup = function toMarkup() {
                  return _toMarkup.call(this, "span");
                };
                return Span;
              })();
              var domTree_Anchor = /* @__PURE__ */ (function() {
                function Anchor(href, classes, children, options) {
                  this.children = void 0;
                  this.attributes = void 0;
                  this.classes = void 0;
                  this.height = void 0;
                  this.depth = void 0;
                  this.maxFontSize = void 0;
                  this.style = void 0;
                  initNode.call(this, classes, options);
                  this.children = children || [];
                  this.setAttribute("href", href);
                }
                var _proto2 = Anchor.prototype;
                _proto2.setAttribute = function setAttribute(attribute, value) {
                  this.attributes[attribute] = value;
                };
                _proto2.hasClass = function hasClass(className) {
                  return utils.contains(this.classes, className);
                };
                _proto2.toNode = function toNode() {
                  return _toNode.call(this, "a");
                };
                _proto2.toMarkup = function toMarkup() {
                  return _toMarkup.call(this, "a");
                };
                return Anchor;
              })();
              var domTree_Img = /* @__PURE__ */ (function() {
                function Img(src, alt, style) {
                  this.src = void 0;
                  this.alt = void 0;
                  this.classes = void 0;
                  this.height = void 0;
                  this.depth = void 0;
                  this.maxFontSize = void 0;
                  this.style = void 0;
                  this.alt = alt;
                  this.src = src;
                  this.classes = ["mord"];
                  this.style = style;
                }
                var _proto3 = Img.prototype;
                _proto3.hasClass = function hasClass(className) {
                  return utils.contains(this.classes, className);
                };
                _proto3.toNode = function toNode() {
                  var node = document.createElement("img");
                  node.src = this.src;
                  node.alt = this.alt;
                  node.className = "mord";
                  for (var style in this.style) {
                    if (this.style.hasOwnProperty(style)) {
                      node.style[style] = this.style[style];
                    }
                  }
                  return node;
                };
                _proto3.toMarkup = function toMarkup() {
                  var markup = "<img  src='" + this.src + " 'alt='" + this.alt + "' ";
                  var styles = "";
                  for (var style in this.style) {
                    if (this.style.hasOwnProperty(style)) {
                      styles += utils.hyphenate(style) + ":" + this.style[style] + ";";
                    }
                  }
                  if (styles) {
                    markup += ' style="' + utils.escape(styles) + '"';
                  }
                  markup += "'/>";
                  return markup;
                };
                return Img;
              })();
              var iCombinations = {
                "\xEE": "\u0131\u0302",
                "\xEF": "\u0131\u0308",
                "\xED": "\u0131\u0301",
                // 'ī': '\u0131\u0304', // enable when we add Extended Latin
                "\xEC": "\u0131\u0300"
              };
              var domTree_SymbolNode = /* @__PURE__ */ (function() {
                function SymbolNode(text, height, depth, italic, skew, width, classes, style) {
                  this.text = void 0;
                  this.height = void 0;
                  this.depth = void 0;
                  this.italic = void 0;
                  this.skew = void 0;
                  this.width = void 0;
                  this.maxFontSize = void 0;
                  this.classes = void 0;
                  this.style = void 0;
                  this.text = text;
                  this.height = height || 0;
                  this.depth = depth || 0;
                  this.italic = italic || 0;
                  this.skew = skew || 0;
                  this.width = width || 0;
                  this.classes = classes || [];
                  this.style = style || {};
                  this.maxFontSize = 0;
                  var script = scriptFromCodepoint(this.text.charCodeAt(0));
                  if (script) {
                    this.classes.push(script + "_fallback");
                  }
                  if (/[îïíì]/.test(this.text)) {
                    this.text = iCombinations[this.text];
                  }
                }
                var _proto4 = SymbolNode.prototype;
                _proto4.hasClass = function hasClass(className) {
                  return utils.contains(this.classes, className);
                };
                _proto4.toNode = function toNode() {
                  var node = document.createTextNode(this.text);
                  var span = null;
                  if (this.italic > 0) {
                    span = document.createElement("span");
                    span.style.marginRight = this.italic + "em";
                  }
                  if (this.classes.length > 0) {
                    span = span || document.createElement("span");
                    span.className = createClass(this.classes);
                  }
                  for (var style in this.style) {
                    if (this.style.hasOwnProperty(style)) {
                      span = span || document.createElement("span");
                      span.style[style] = this.style[style];
                    }
                  }
                  if (span) {
                    span.appendChild(node);
                    return span;
                  } else {
                    return node;
                  }
                };
                _proto4.toMarkup = function toMarkup() {
                  var needsSpan = false;
                  var markup = "<span";
                  if (this.classes.length) {
                    needsSpan = true;
                    markup += ' class="';
                    markup += utils.escape(createClass(this.classes));
                    markup += '"';
                  }
                  var styles = "";
                  if (this.italic > 0) {
                    styles += "margin-right:" + this.italic + "em;";
                  }
                  for (var style in this.style) {
                    if (this.style.hasOwnProperty(style)) {
                      styles += utils.hyphenate(style) + ":" + this.style[style] + ";";
                    }
                  }
                  if (styles) {
                    needsSpan = true;
                    markup += ' style="' + utils.escape(styles) + '"';
                  }
                  var escaped = utils.escape(this.text);
                  if (needsSpan) {
                    markup += ">";
                    markup += escaped;
                    markup += "</span>";
                    return markup;
                  } else {
                    return escaped;
                  }
                };
                return SymbolNode;
              })();
              var SvgNode = /* @__PURE__ */ (function() {
                function SvgNode2(children, attributes) {
                  this.children = void 0;
                  this.attributes = void 0;
                  this.children = children || [];
                  this.attributes = attributes || {};
                }
                var _proto5 = SvgNode2.prototype;
                _proto5.toNode = function toNode() {
                  var svgNS = "http://www.w3.org/2000/svg";
                  var node = document.createElementNS(svgNS, "svg");
                  for (var attr in this.attributes) {
                    if (Object.prototype.hasOwnProperty.call(this.attributes, attr)) {
                      node.setAttribute(attr, this.attributes[attr]);
                    }
                  }
                  for (var i = 0; i < this.children.length; i++) {
                    node.appendChild(this.children[i].toNode());
                  }
                  return node;
                };
                _proto5.toMarkup = function toMarkup() {
                  var markup = "<svg";
                  for (var attr in this.attributes) {
                    if (Object.prototype.hasOwnProperty.call(this.attributes, attr)) {
                      markup += " " + attr + "='" + this.attributes[attr] + "'";
                    }
                  }
                  markup += ">";
                  for (var i = 0; i < this.children.length; i++) {
                    markup += this.children[i].toMarkup();
                  }
                  markup += "</svg>";
                  return markup;
                };
                return SvgNode2;
              })();
              var domTree_PathNode = /* @__PURE__ */ (function() {
                function PathNode(pathName, alternate) {
                  this.pathName = void 0;
                  this.alternate = void 0;
                  this.pathName = pathName;
                  this.alternate = alternate;
                }
                var _proto6 = PathNode.prototype;
                _proto6.toNode = function toNode() {
                  var svgNS = "http://www.w3.org/2000/svg";
                  var node = document.createElementNS(svgNS, "path");
                  if (this.alternate) {
                    node.setAttribute("d", this.alternate);
                  } else {
                    node.setAttribute("d", svgGeometry_path[this.pathName]);
                  }
                  return node;
                };
                _proto6.toMarkup = function toMarkup() {
                  if (this.alternate) {
                    return "<path d='" + this.alternate + "'/>";
                  } else {
                    return "<path d='" + svgGeometry_path[this.pathName] + "'/>";
                  }
                };
                return PathNode;
              })();
              var LineNode = /* @__PURE__ */ (function() {
                function LineNode2(attributes) {
                  this.attributes = void 0;
                  this.attributes = attributes || {};
                }
                var _proto7 = LineNode2.prototype;
                _proto7.toNode = function toNode() {
                  var svgNS = "http://www.w3.org/2000/svg";
                  var node = document.createElementNS(svgNS, "line");
                  for (var attr in this.attributes) {
                    if (Object.prototype.hasOwnProperty.call(this.attributes, attr)) {
                      node.setAttribute(attr, this.attributes[attr]);
                    }
                  }
                  return node;
                };
                _proto7.toMarkup = function toMarkup() {
                  var markup = "<line";
                  for (var attr in this.attributes) {
                    if (Object.prototype.hasOwnProperty.call(this.attributes, attr)) {
                      markup += " " + attr + "='" + this.attributes[attr] + "'";
                    }
                  }
                  markup += "/>";
                  return markup;
                };
                return LineNode2;
              })();
              function assertSymbolDomNode(group) {
                if (group instanceof domTree_SymbolNode) {
                  return group;
                } else {
                  throw new Error("Expected symbolNode but got " + String(group) + ".");
                }
              }
              function assertSpan(group) {
                if (group instanceof domTree_Span) {
                  return group;
                } else {
                  throw new Error("Expected span<HtmlDomNode> but got " + String(group) + ".");
                }
              }
              var fontMetricsData = {
                "AMS-Regular": {
                  "65": [0, 0.68889, 0, 0, 0.72222],
                  "66": [0, 0.68889, 0, 0, 0.66667],
                  "67": [0, 0.68889, 0, 0, 0.72222],
                  "68": [0, 0.68889, 0, 0, 0.72222],
                  "69": [0, 0.68889, 0, 0, 0.66667],
                  "70": [0, 0.68889, 0, 0, 0.61111],
                  "71": [0, 0.68889, 0, 0, 0.77778],
                  "72": [0, 0.68889, 0, 0, 0.77778],
                  "73": [0, 0.68889, 0, 0, 0.38889],
                  "74": [0.16667, 0.68889, 0, 0, 0.5],
                  "75": [0, 0.68889, 0, 0, 0.77778],
                  "76": [0, 0.68889, 0, 0, 0.66667],
                  "77": [0, 0.68889, 0, 0, 0.94445],
                  "78": [0, 0.68889, 0, 0, 0.72222],
                  "79": [0.16667, 0.68889, 0, 0, 0.77778],
                  "80": [0, 0.68889, 0, 0, 0.61111],
                  "81": [0.16667, 0.68889, 0, 0, 0.77778],
                  "82": [0, 0.68889, 0, 0, 0.72222],
                  "83": [0, 0.68889, 0, 0, 0.55556],
                  "84": [0, 0.68889, 0, 0, 0.66667],
                  "85": [0, 0.68889, 0, 0, 0.72222],
                  "86": [0, 0.68889, 0, 0, 0.72222],
                  "87": [0, 0.68889, 0, 0, 1],
                  "88": [0, 0.68889, 0, 0, 0.72222],
                  "89": [0, 0.68889, 0, 0, 0.72222],
                  "90": [0, 0.68889, 0, 0, 0.66667],
                  "107": [0, 0.68889, 0, 0, 0.55556],
                  "165": [0, 0.675, 0.025, 0, 0.75],
                  "174": [0.15559, 0.69224, 0, 0, 0.94666],
                  "240": [0, 0.68889, 0, 0, 0.55556],
                  "295": [0, 0.68889, 0, 0, 0.54028],
                  "710": [0, 0.825, 0, 0, 2.33334],
                  "732": [0, 0.9, 0, 0, 2.33334],
                  "770": [0, 0.825, 0, 0, 2.33334],
                  "771": [0, 0.9, 0, 0, 2.33334],
                  "989": [0.08167, 0.58167, 0, 0, 0.77778],
                  "1008": [0, 0.43056, 0.04028, 0, 0.66667],
                  "8245": [0, 0.54986, 0, 0, 0.275],
                  "8463": [0, 0.68889, 0, 0, 0.54028],
                  "8487": [0, 0.68889, 0, 0, 0.72222],
                  "8498": [0, 0.68889, 0, 0, 0.55556],
                  "8502": [0, 0.68889, 0, 0, 0.66667],
                  "8503": [0, 0.68889, 0, 0, 0.44445],
                  "8504": [0, 0.68889, 0, 0, 0.66667],
                  "8513": [0, 0.68889, 0, 0, 0.63889],
                  "8592": [-0.03598, 0.46402, 0, 0, 0.5],
                  "8594": [-0.03598, 0.46402, 0, 0, 0.5],
                  "8602": [-0.13313, 0.36687, 0, 0, 1],
                  "8603": [-0.13313, 0.36687, 0, 0, 1],
                  "8606": [0.01354, 0.52239, 0, 0, 1],
                  "8608": [0.01354, 0.52239, 0, 0, 1],
                  "8610": [0.01354, 0.52239, 0, 0, 1.11111],
                  "8611": [0.01354, 0.52239, 0, 0, 1.11111],
                  "8619": [0, 0.54986, 0, 0, 1],
                  "8620": [0, 0.54986, 0, 0, 1],
                  "8621": [-0.13313, 0.37788, 0, 0, 1.38889],
                  "8622": [-0.13313, 0.36687, 0, 0, 1],
                  "8624": [0, 0.69224, 0, 0, 0.5],
                  "8625": [0, 0.69224, 0, 0, 0.5],
                  "8630": [0, 0.43056, 0, 0, 1],
                  "8631": [0, 0.43056, 0, 0, 1],
                  "8634": [0.08198, 0.58198, 0, 0, 0.77778],
                  "8635": [0.08198, 0.58198, 0, 0, 0.77778],
                  "8638": [0.19444, 0.69224, 0, 0, 0.41667],
                  "8639": [0.19444, 0.69224, 0, 0, 0.41667],
                  "8642": [0.19444, 0.69224, 0, 0, 0.41667],
                  "8643": [0.19444, 0.69224, 0, 0, 0.41667],
                  "8644": [0.1808, 0.675, 0, 0, 1],
                  "8646": [0.1808, 0.675, 0, 0, 1],
                  "8647": [0.1808, 0.675, 0, 0, 1],
                  "8648": [0.19444, 0.69224, 0, 0, 0.83334],
                  "8649": [0.1808, 0.675, 0, 0, 1],
                  "8650": [0.19444, 0.69224, 0, 0, 0.83334],
                  "8651": [0.01354, 0.52239, 0, 0, 1],
                  "8652": [0.01354, 0.52239, 0, 0, 1],
                  "8653": [-0.13313, 0.36687, 0, 0, 1],
                  "8654": [-0.13313, 0.36687, 0, 0, 1],
                  "8655": [-0.13313, 0.36687, 0, 0, 1],
                  "8666": [0.13667, 0.63667, 0, 0, 1],
                  "8667": [0.13667, 0.63667, 0, 0, 1],
                  "8669": [-0.13313, 0.37788, 0, 0, 1],
                  "8672": [-0.064, 0.437, 0, 0, 1.334],
                  "8674": [-0.064, 0.437, 0, 0, 1.334],
                  "8705": [0, 0.825, 0, 0, 0.5],
                  "8708": [0, 0.68889, 0, 0, 0.55556],
                  "8709": [0.08167, 0.58167, 0, 0, 0.77778],
                  "8717": [0, 0.43056, 0, 0, 0.42917],
                  "8722": [-0.03598, 0.46402, 0, 0, 0.5],
                  "8724": [0.08198, 0.69224, 0, 0, 0.77778],
                  "8726": [0.08167, 0.58167, 0, 0, 0.77778],
                  "8733": [0, 0.69224, 0, 0, 0.77778],
                  "8736": [0, 0.69224, 0, 0, 0.72222],
                  "8737": [0, 0.69224, 0, 0, 0.72222],
                  "8738": [0.03517, 0.52239, 0, 0, 0.72222],
                  "8739": [0.08167, 0.58167, 0, 0, 0.22222],
                  "8740": [0.25142, 0.74111, 0, 0, 0.27778],
                  "8741": [0.08167, 0.58167, 0, 0, 0.38889],
                  "8742": [0.25142, 0.74111, 0, 0, 0.5],
                  "8756": [0, 0.69224, 0, 0, 0.66667],
                  "8757": [0, 0.69224, 0, 0, 0.66667],
                  "8764": [-0.13313, 0.36687, 0, 0, 0.77778],
                  "8765": [-0.13313, 0.37788, 0, 0, 0.77778],
                  "8769": [-0.13313, 0.36687, 0, 0, 0.77778],
                  "8770": [-0.03625, 0.46375, 0, 0, 0.77778],
                  "8774": [0.30274, 0.79383, 0, 0, 0.77778],
                  "8776": [-0.01688, 0.48312, 0, 0, 0.77778],
                  "8778": [0.08167, 0.58167, 0, 0, 0.77778],
                  "8782": [0.06062, 0.54986, 0, 0, 0.77778],
                  "8783": [0.06062, 0.54986, 0, 0, 0.77778],
                  "8785": [0.08198, 0.58198, 0, 0, 0.77778],
                  "8786": [0.08198, 0.58198, 0, 0, 0.77778],
                  "8787": [0.08198, 0.58198, 0, 0, 0.77778],
                  "8790": [0, 0.69224, 0, 0, 0.77778],
                  "8791": [0.22958, 0.72958, 0, 0, 0.77778],
                  "8796": [0.08198, 0.91667, 0, 0, 0.77778],
                  "8806": [0.25583, 0.75583, 0, 0, 0.77778],
                  "8807": [0.25583, 0.75583, 0, 0, 0.77778],
                  "8808": [0.25142, 0.75726, 0, 0, 0.77778],
                  "8809": [0.25142, 0.75726, 0, 0, 0.77778],
                  "8812": [0.25583, 0.75583, 0, 0, 0.5],
                  "8814": [0.20576, 0.70576, 0, 0, 0.77778],
                  "8815": [0.20576, 0.70576, 0, 0, 0.77778],
                  "8816": [0.30274, 0.79383, 0, 0, 0.77778],
                  "8817": [0.30274, 0.79383, 0, 0, 0.77778],
                  "8818": [0.22958, 0.72958, 0, 0, 0.77778],
                  "8819": [0.22958, 0.72958, 0, 0, 0.77778],
                  "8822": [0.1808, 0.675, 0, 0, 0.77778],
                  "8823": [0.1808, 0.675, 0, 0, 0.77778],
                  "8828": [0.13667, 0.63667, 0, 0, 0.77778],
                  "8829": [0.13667, 0.63667, 0, 0, 0.77778],
                  "8830": [0.22958, 0.72958, 0, 0, 0.77778],
                  "8831": [0.22958, 0.72958, 0, 0, 0.77778],
                  "8832": [0.20576, 0.70576, 0, 0, 0.77778],
                  "8833": [0.20576, 0.70576, 0, 0, 0.77778],
                  "8840": [0.30274, 0.79383, 0, 0, 0.77778],
                  "8841": [0.30274, 0.79383, 0, 0, 0.77778],
                  "8842": [0.13597, 0.63597, 0, 0, 0.77778],
                  "8843": [0.13597, 0.63597, 0, 0, 0.77778],
                  "8847": [0.03517, 0.54986, 0, 0, 0.77778],
                  "8848": [0.03517, 0.54986, 0, 0, 0.77778],
                  "8858": [0.08198, 0.58198, 0, 0, 0.77778],
                  "8859": [0.08198, 0.58198, 0, 0, 0.77778],
                  "8861": [0.08198, 0.58198, 0, 0, 0.77778],
                  "8862": [0, 0.675, 0, 0, 0.77778],
                  "8863": [0, 0.675, 0, 0, 0.77778],
                  "8864": [0, 0.675, 0, 0, 0.77778],
                  "8865": [0, 0.675, 0, 0, 0.77778],
                  "8872": [0, 0.69224, 0, 0, 0.61111],
                  "8873": [0, 0.69224, 0, 0, 0.72222],
                  "8874": [0, 0.69224, 0, 0, 0.88889],
                  "8876": [0, 0.68889, 0, 0, 0.61111],
                  "8877": [0, 0.68889, 0, 0, 0.61111],
                  "8878": [0, 0.68889, 0, 0, 0.72222],
                  "8879": [0, 0.68889, 0, 0, 0.72222],
                  "8882": [0.03517, 0.54986, 0, 0, 0.77778],
                  "8883": [0.03517, 0.54986, 0, 0, 0.77778],
                  "8884": [0.13667, 0.63667, 0, 0, 0.77778],
                  "8885": [0.13667, 0.63667, 0, 0, 0.77778],
                  "8888": [0, 0.54986, 0, 0, 1.11111],
                  "8890": [0.19444, 0.43056, 0, 0, 0.55556],
                  "8891": [0.19444, 0.69224, 0, 0, 0.61111],
                  "8892": [0.19444, 0.69224, 0, 0, 0.61111],
                  "8901": [0, 0.54986, 0, 0, 0.27778],
                  "8903": [0.08167, 0.58167, 0, 0, 0.77778],
                  "8905": [0.08167, 0.58167, 0, 0, 0.77778],
                  "8906": [0.08167, 0.58167, 0, 0, 0.77778],
                  "8907": [0, 0.69224, 0, 0, 0.77778],
                  "8908": [0, 0.69224, 0, 0, 0.77778],
                  "8909": [-0.03598, 0.46402, 0, 0, 0.77778],
                  "8910": [0, 0.54986, 0, 0, 0.76042],
                  "8911": [0, 0.54986, 0, 0, 0.76042],
                  "8912": [0.03517, 0.54986, 0, 0, 0.77778],
                  "8913": [0.03517, 0.54986, 0, 0, 0.77778],
                  "8914": [0, 0.54986, 0, 0, 0.66667],
                  "8915": [0, 0.54986, 0, 0, 0.66667],
                  "8916": [0, 0.69224, 0, 0, 0.66667],
                  "8918": [0.0391, 0.5391, 0, 0, 0.77778],
                  "8919": [0.0391, 0.5391, 0, 0, 0.77778],
                  "8920": [0.03517, 0.54986, 0, 0, 1.33334],
                  "8921": [0.03517, 0.54986, 0, 0, 1.33334],
                  "8922": [0.38569, 0.88569, 0, 0, 0.77778],
                  "8923": [0.38569, 0.88569, 0, 0, 0.77778],
                  "8926": [0.13667, 0.63667, 0, 0, 0.77778],
                  "8927": [0.13667, 0.63667, 0, 0, 0.77778],
                  "8928": [0.30274, 0.79383, 0, 0, 0.77778],
                  "8929": [0.30274, 0.79383, 0, 0, 0.77778],
                  "8934": [0.23222, 0.74111, 0, 0, 0.77778],
                  "8935": [0.23222, 0.74111, 0, 0, 0.77778],
                  "8936": [0.23222, 0.74111, 0, 0, 0.77778],
                  "8937": [0.23222, 0.74111, 0, 0, 0.77778],
                  "8938": [0.20576, 0.70576, 0, 0, 0.77778],
                  "8939": [0.20576, 0.70576, 0, 0, 0.77778],
                  "8940": [0.30274, 0.79383, 0, 0, 0.77778],
                  "8941": [0.30274, 0.79383, 0, 0, 0.77778],
                  "8994": [0.19444, 0.69224, 0, 0, 0.77778],
                  "8995": [0.19444, 0.69224, 0, 0, 0.77778],
                  "9416": [0.15559, 0.69224, 0, 0, 0.90222],
                  "9484": [0, 0.69224, 0, 0, 0.5],
                  "9488": [0, 0.69224, 0, 0, 0.5],
                  "9492": [0, 0.37788, 0, 0, 0.5],
                  "9496": [0, 0.37788, 0, 0, 0.5],
                  "9585": [0.19444, 0.68889, 0, 0, 0.88889],
                  "9586": [0.19444, 0.74111, 0, 0, 0.88889],
                  "9632": [0, 0.675, 0, 0, 0.77778],
                  "9633": [0, 0.675, 0, 0, 0.77778],
                  "9650": [0, 0.54986, 0, 0, 0.72222],
                  "9651": [0, 0.54986, 0, 0, 0.72222],
                  "9654": [0.03517, 0.54986, 0, 0, 0.77778],
                  "9660": [0, 0.54986, 0, 0, 0.72222],
                  "9661": [0, 0.54986, 0, 0, 0.72222],
                  "9664": [0.03517, 0.54986, 0, 0, 0.77778],
                  "9674": [0.11111, 0.69224, 0, 0, 0.66667],
                  "9733": [0.19444, 0.69224, 0, 0, 0.94445],
                  "10003": [0, 0.69224, 0, 0, 0.83334],
                  "10016": [0, 0.69224, 0, 0, 0.83334],
                  "10731": [0.11111, 0.69224, 0, 0, 0.66667],
                  "10846": [0.19444, 0.75583, 0, 0, 0.61111],
                  "10877": [0.13667, 0.63667, 0, 0, 0.77778],
                  "10878": [0.13667, 0.63667, 0, 0, 0.77778],
                  "10885": [0.25583, 0.75583, 0, 0, 0.77778],
                  "10886": [0.25583, 0.75583, 0, 0, 0.77778],
                  "10887": [0.13597, 0.63597, 0, 0, 0.77778],
                  "10888": [0.13597, 0.63597, 0, 0, 0.77778],
                  "10889": [0.26167, 0.75726, 0, 0, 0.77778],
                  "10890": [0.26167, 0.75726, 0, 0, 0.77778],
                  "10891": [0.48256, 0.98256, 0, 0, 0.77778],
                  "10892": [0.48256, 0.98256, 0, 0, 0.77778],
                  "10901": [0.13667, 0.63667, 0, 0, 0.77778],
                  "10902": [0.13667, 0.63667, 0, 0, 0.77778],
                  "10933": [0.25142, 0.75726, 0, 0, 0.77778],
                  "10934": [0.25142, 0.75726, 0, 0, 0.77778],
                  "10935": [0.26167, 0.75726, 0, 0, 0.77778],
                  "10936": [0.26167, 0.75726, 0, 0, 0.77778],
                  "10937": [0.26167, 0.75726, 0, 0, 0.77778],
                  "10938": [0.26167, 0.75726, 0, 0, 0.77778],
                  "10949": [0.25583, 0.75583, 0, 0, 0.77778],
                  "10950": [0.25583, 0.75583, 0, 0, 0.77778],
                  "10955": [0.28481, 0.79383, 0, 0, 0.77778],
                  "10956": [0.28481, 0.79383, 0, 0, 0.77778],
                  "57350": [0.08167, 0.58167, 0, 0, 0.22222],
                  "57351": [0.08167, 0.58167, 0, 0, 0.38889],
                  "57352": [0.08167, 0.58167, 0, 0, 0.77778],
                  "57353": [0, 0.43056, 0.04028, 0, 0.66667],
                  "57356": [0.25142, 0.75726, 0, 0, 0.77778],
                  "57357": [0.25142, 0.75726, 0, 0, 0.77778],
                  "57358": [0.41951, 0.91951, 0, 0, 0.77778],
                  "57359": [0.30274, 0.79383, 0, 0, 0.77778],
                  "57360": [0.30274, 0.79383, 0, 0, 0.77778],
                  "57361": [0.41951, 0.91951, 0, 0, 0.77778],
                  "57366": [0.25142, 0.75726, 0, 0, 0.77778],
                  "57367": [0.25142, 0.75726, 0, 0, 0.77778],
                  "57368": [0.25142, 0.75726, 0, 0, 0.77778],
                  "57369": [0.25142, 0.75726, 0, 0, 0.77778],
                  "57370": [0.13597, 0.63597, 0, 0, 0.77778],
                  "57371": [0.13597, 0.63597, 0, 0, 0.77778]
                },
                "Caligraphic-Regular": {
                  "48": [0, 0.43056, 0, 0, 0.5],
                  "49": [0, 0.43056, 0, 0, 0.5],
                  "50": [0, 0.43056, 0, 0, 0.5],
                  "51": [0.19444, 0.43056, 0, 0, 0.5],
                  "52": [0.19444, 0.43056, 0, 0, 0.5],
                  "53": [0.19444, 0.43056, 0, 0, 0.5],
                  "54": [0, 0.64444, 0, 0, 0.5],
                  "55": [0.19444, 0.43056, 0, 0, 0.5],
                  "56": [0, 0.64444, 0, 0, 0.5],
                  "57": [0.19444, 0.43056, 0, 0, 0.5],
                  "65": [0, 0.68333, 0, 0.19445, 0.79847],
                  "66": [0, 0.68333, 0.03041, 0.13889, 0.65681],
                  "67": [0, 0.68333, 0.05834, 0.13889, 0.52653],
                  "68": [0, 0.68333, 0.02778, 0.08334, 0.77139],
                  "69": [0, 0.68333, 0.08944, 0.11111, 0.52778],
                  "70": [0, 0.68333, 0.09931, 0.11111, 0.71875],
                  "71": [0.09722, 0.68333, 0.0593, 0.11111, 0.59487],
                  "72": [0, 0.68333, 965e-5, 0.11111, 0.84452],
                  "73": [0, 0.68333, 0.07382, 0, 0.54452],
                  "74": [0.09722, 0.68333, 0.18472, 0.16667, 0.67778],
                  "75": [0, 0.68333, 0.01445, 0.05556, 0.76195],
                  "76": [0, 0.68333, 0, 0.13889, 0.68972],
                  "77": [0, 0.68333, 0, 0.13889, 1.2009],
                  "78": [0, 0.68333, 0.14736, 0.08334, 0.82049],
                  "79": [0, 0.68333, 0.02778, 0.11111, 0.79611],
                  "80": [0, 0.68333, 0.08222, 0.08334, 0.69556],
                  "81": [0.09722, 0.68333, 0, 0.11111, 0.81667],
                  "82": [0, 0.68333, 0, 0.08334, 0.8475],
                  "83": [0, 0.68333, 0.075, 0.13889, 0.60556],
                  "84": [0, 0.68333, 0.25417, 0, 0.54464],
                  "85": [0, 0.68333, 0.09931, 0.08334, 0.62583],
                  "86": [0, 0.68333, 0.08222, 0, 0.61278],
                  "87": [0, 0.68333, 0.08222, 0.08334, 0.98778],
                  "88": [0, 0.68333, 0.14643, 0.13889, 0.7133],
                  "89": [0.09722, 0.68333, 0.08222, 0.08334, 0.66834],
                  "90": [0, 0.68333, 0.07944, 0.13889, 0.72473]
                },
                "Fraktur-Regular": {
                  "33": [0, 0.69141, 0, 0, 0.29574],
                  "34": [0, 0.69141, 0, 0, 0.21471],
                  "38": [0, 0.69141, 0, 0, 0.73786],
                  "39": [0, 0.69141, 0, 0, 0.21201],
                  "40": [0.24982, 0.74947, 0, 0, 0.38865],
                  "41": [0.24982, 0.74947, 0, 0, 0.38865],
                  "42": [0, 0.62119, 0, 0, 0.27764],
                  "43": [0.08319, 0.58283, 0, 0, 0.75623],
                  "44": [0, 0.10803, 0, 0, 0.27764],
                  "45": [0.08319, 0.58283, 0, 0, 0.75623],
                  "46": [0, 0.10803, 0, 0, 0.27764],
                  "47": [0.24982, 0.74947, 0, 0, 0.50181],
                  "48": [0, 0.47534, 0, 0, 0.50181],
                  "49": [0, 0.47534, 0, 0, 0.50181],
                  "50": [0, 0.47534, 0, 0, 0.50181],
                  "51": [0.18906, 0.47534, 0, 0, 0.50181],
                  "52": [0.18906, 0.47534, 0, 0, 0.50181],
                  "53": [0.18906, 0.47534, 0, 0, 0.50181],
                  "54": [0, 0.69141, 0, 0, 0.50181],
                  "55": [0.18906, 0.47534, 0, 0, 0.50181],
                  "56": [0, 0.69141, 0, 0, 0.50181],
                  "57": [0.18906, 0.47534, 0, 0, 0.50181],
                  "58": [0, 0.47534, 0, 0, 0.21606],
                  "59": [0.12604, 0.47534, 0, 0, 0.21606],
                  "61": [-0.13099, 0.36866, 0, 0, 0.75623],
                  "63": [0, 0.69141, 0, 0, 0.36245],
                  "65": [0, 0.69141, 0, 0, 0.7176],
                  "66": [0, 0.69141, 0, 0, 0.88397],
                  "67": [0, 0.69141, 0, 0, 0.61254],
                  "68": [0, 0.69141, 0, 0, 0.83158],
                  "69": [0, 0.69141, 0, 0, 0.66278],
                  "70": [0.12604, 0.69141, 0, 0, 0.61119],
                  "71": [0, 0.69141, 0, 0, 0.78539],
                  "72": [0.06302, 0.69141, 0, 0, 0.7203],
                  "73": [0, 0.69141, 0, 0, 0.55448],
                  "74": [0.12604, 0.69141, 0, 0, 0.55231],
                  "75": [0, 0.69141, 0, 0, 0.66845],
                  "76": [0, 0.69141, 0, 0, 0.66602],
                  "77": [0, 0.69141, 0, 0, 1.04953],
                  "78": [0, 0.69141, 0, 0, 0.83212],
                  "79": [0, 0.69141, 0, 0, 0.82699],
                  "80": [0.18906, 0.69141, 0, 0, 0.82753],
                  "81": [0.03781, 0.69141, 0, 0, 0.82699],
                  "82": [0, 0.69141, 0, 0, 0.82807],
                  "83": [0, 0.69141, 0, 0, 0.82861],
                  "84": [0, 0.69141, 0, 0, 0.66899],
                  "85": [0, 0.69141, 0, 0, 0.64576],
                  "86": [0, 0.69141, 0, 0, 0.83131],
                  "87": [0, 0.69141, 0, 0, 1.04602],
                  "88": [0, 0.69141, 0, 0, 0.71922],
                  "89": [0.18906, 0.69141, 0, 0, 0.83293],
                  "90": [0.12604, 0.69141, 0, 0, 0.60201],
                  "91": [0.24982, 0.74947, 0, 0, 0.27764],
                  "93": [0.24982, 0.74947, 0, 0, 0.27764],
                  "94": [0, 0.69141, 0, 0, 0.49965],
                  "97": [0, 0.47534, 0, 0, 0.50046],
                  "98": [0, 0.69141, 0, 0, 0.51315],
                  "99": [0, 0.47534, 0, 0, 0.38946],
                  "100": [0, 0.62119, 0, 0, 0.49857],
                  "101": [0, 0.47534, 0, 0, 0.40053],
                  "102": [0.18906, 0.69141, 0, 0, 0.32626],
                  "103": [0.18906, 0.47534, 0, 0, 0.5037],
                  "104": [0.18906, 0.69141, 0, 0, 0.52126],
                  "105": [0, 0.69141, 0, 0, 0.27899],
                  "106": [0, 0.69141, 0, 0, 0.28088],
                  "107": [0, 0.69141, 0, 0, 0.38946],
                  "108": [0, 0.69141, 0, 0, 0.27953],
                  "109": [0, 0.47534, 0, 0, 0.76676],
                  "110": [0, 0.47534, 0, 0, 0.52666],
                  "111": [0, 0.47534, 0, 0, 0.48885],
                  "112": [0.18906, 0.52396, 0, 0, 0.50046],
                  "113": [0.18906, 0.47534, 0, 0, 0.48912],
                  "114": [0, 0.47534, 0, 0, 0.38919],
                  "115": [0, 0.47534, 0, 0, 0.44266],
                  "116": [0, 0.62119, 0, 0, 0.33301],
                  "117": [0, 0.47534, 0, 0, 0.5172],
                  "118": [0, 0.52396, 0, 0, 0.5118],
                  "119": [0, 0.52396, 0, 0, 0.77351],
                  "120": [0.18906, 0.47534, 0, 0, 0.38865],
                  "121": [0.18906, 0.47534, 0, 0, 0.49884],
                  "122": [0.18906, 0.47534, 0, 0, 0.39054],
                  "8216": [0, 0.69141, 0, 0, 0.21471],
                  "8217": [0, 0.69141, 0, 0, 0.21471],
                  "58112": [0, 0.62119, 0, 0, 0.49749],
                  "58113": [0, 0.62119, 0, 0, 0.4983],
                  "58114": [0.18906, 0.69141, 0, 0, 0.33328],
                  "58115": [0.18906, 0.69141, 0, 0, 0.32923],
                  "58116": [0.18906, 0.47534, 0, 0, 0.50343],
                  "58117": [0, 0.69141, 0, 0, 0.33301],
                  "58118": [0, 0.62119, 0, 0, 0.33409],
                  "58119": [0, 0.47534, 0, 0, 0.50073]
                },
                "Main-Bold": {
                  "33": [0, 0.69444, 0, 0, 0.35],
                  "34": [0, 0.69444, 0, 0, 0.60278],
                  "35": [0.19444, 0.69444, 0, 0, 0.95833],
                  "36": [0.05556, 0.75, 0, 0, 0.575],
                  "37": [0.05556, 0.75, 0, 0, 0.95833],
                  "38": [0, 0.69444, 0, 0, 0.89444],
                  "39": [0, 0.69444, 0, 0, 0.31944],
                  "40": [0.25, 0.75, 0, 0, 0.44722],
                  "41": [0.25, 0.75, 0, 0, 0.44722],
                  "42": [0, 0.75, 0, 0, 0.575],
                  "43": [0.13333, 0.63333, 0, 0, 0.89444],
                  "44": [0.19444, 0.15556, 0, 0, 0.31944],
                  "45": [0, 0.44444, 0, 0, 0.38333],
                  "46": [0, 0.15556, 0, 0, 0.31944],
                  "47": [0.25, 0.75, 0, 0, 0.575],
                  "48": [0, 0.64444, 0, 0, 0.575],
                  "49": [0, 0.64444, 0, 0, 0.575],
                  "50": [0, 0.64444, 0, 0, 0.575],
                  "51": [0, 0.64444, 0, 0, 0.575],
                  "52": [0, 0.64444, 0, 0, 0.575],
                  "53": [0, 0.64444, 0, 0, 0.575],
                  "54": [0, 0.64444, 0, 0, 0.575],
                  "55": [0, 0.64444, 0, 0, 0.575],
                  "56": [0, 0.64444, 0, 0, 0.575],
                  "57": [0, 0.64444, 0, 0, 0.575],
                  "58": [0, 0.44444, 0, 0, 0.31944],
                  "59": [0.19444, 0.44444, 0, 0, 0.31944],
                  "60": [0.08556, 0.58556, 0, 0, 0.89444],
                  "61": [-0.10889, 0.39111, 0, 0, 0.89444],
                  "62": [0.08556, 0.58556, 0, 0, 0.89444],
                  "63": [0, 0.69444, 0, 0, 0.54305],
                  "64": [0, 0.69444, 0, 0, 0.89444],
                  "65": [0, 0.68611, 0, 0, 0.86944],
                  "66": [0, 0.68611, 0, 0, 0.81805],
                  "67": [0, 0.68611, 0, 0, 0.83055],
                  "68": [0, 0.68611, 0, 0, 0.88194],
                  "69": [0, 0.68611, 0, 0, 0.75555],
                  "70": [0, 0.68611, 0, 0, 0.72361],
                  "71": [0, 0.68611, 0, 0, 0.90416],
                  "72": [0, 0.68611, 0, 0, 0.9],
                  "73": [0, 0.68611, 0, 0, 0.43611],
                  "74": [0, 0.68611, 0, 0, 0.59444],
                  "75": [0, 0.68611, 0, 0, 0.90138],
                  "76": [0, 0.68611, 0, 0, 0.69166],
                  "77": [0, 0.68611, 0, 0, 1.09166],
                  "78": [0, 0.68611, 0, 0, 0.9],
                  "79": [0, 0.68611, 0, 0, 0.86388],
                  "80": [0, 0.68611, 0, 0, 0.78611],
                  "81": [0.19444, 0.68611, 0, 0, 0.86388],
                  "82": [0, 0.68611, 0, 0, 0.8625],
                  "83": [0, 0.68611, 0, 0, 0.63889],
                  "84": [0, 0.68611, 0, 0, 0.8],
                  "85": [0, 0.68611, 0, 0, 0.88472],
                  "86": [0, 0.68611, 0.01597, 0, 0.86944],
                  "87": [0, 0.68611, 0.01597, 0, 1.18888],
                  "88": [0, 0.68611, 0, 0, 0.86944],
                  "89": [0, 0.68611, 0.02875, 0, 0.86944],
                  "90": [0, 0.68611, 0, 0, 0.70277],
                  "91": [0.25, 0.75, 0, 0, 0.31944],
                  "92": [0.25, 0.75, 0, 0, 0.575],
                  "93": [0.25, 0.75, 0, 0, 0.31944],
                  "94": [0, 0.69444, 0, 0, 0.575],
                  "95": [0.31, 0.13444, 0.03194, 0, 0.575],
                  "97": [0, 0.44444, 0, 0, 0.55902],
                  "98": [0, 0.69444, 0, 0, 0.63889],
                  "99": [0, 0.44444, 0, 0, 0.51111],
                  "100": [0, 0.69444, 0, 0, 0.63889],
                  "101": [0, 0.44444, 0, 0, 0.52708],
                  "102": [0, 0.69444, 0.10903, 0, 0.35139],
                  "103": [0.19444, 0.44444, 0.01597, 0, 0.575],
                  "104": [0, 0.69444, 0, 0, 0.63889],
                  "105": [0, 0.69444, 0, 0, 0.31944],
                  "106": [0.19444, 0.69444, 0, 0, 0.35139],
                  "107": [0, 0.69444, 0, 0, 0.60694],
                  "108": [0, 0.69444, 0, 0, 0.31944],
                  "109": [0, 0.44444, 0, 0, 0.95833],
                  "110": [0, 0.44444, 0, 0, 0.63889],
                  "111": [0, 0.44444, 0, 0, 0.575],
                  "112": [0.19444, 0.44444, 0, 0, 0.63889],
                  "113": [0.19444, 0.44444, 0, 0, 0.60694],
                  "114": [0, 0.44444, 0, 0, 0.47361],
                  "115": [0, 0.44444, 0, 0, 0.45361],
                  "116": [0, 0.63492, 0, 0, 0.44722],
                  "117": [0, 0.44444, 0, 0, 0.63889],
                  "118": [0, 0.44444, 0.01597, 0, 0.60694],
                  "119": [0, 0.44444, 0.01597, 0, 0.83055],
                  "120": [0, 0.44444, 0, 0, 0.60694],
                  "121": [0.19444, 0.44444, 0.01597, 0, 0.60694],
                  "122": [0, 0.44444, 0, 0, 0.51111],
                  "123": [0.25, 0.75, 0, 0, 0.575],
                  "124": [0.25, 0.75, 0, 0, 0.31944],
                  "125": [0.25, 0.75, 0, 0, 0.575],
                  "126": [0.35, 0.34444, 0, 0, 0.575],
                  "168": [0, 0.69444, 0, 0, 0.575],
                  "172": [0, 0.44444, 0, 0, 0.76666],
                  "176": [0, 0.69444, 0, 0, 0.86944],
                  "177": [0.13333, 0.63333, 0, 0, 0.89444],
                  "184": [0.17014, 0, 0, 0, 0.51111],
                  "198": [0, 0.68611, 0, 0, 1.04166],
                  "215": [0.13333, 0.63333, 0, 0, 0.89444],
                  "216": [0.04861, 0.73472, 0, 0, 0.89444],
                  "223": [0, 0.69444, 0, 0, 0.59722],
                  "230": [0, 0.44444, 0, 0, 0.83055],
                  "247": [0.13333, 0.63333, 0, 0, 0.89444],
                  "248": [0.09722, 0.54167, 0, 0, 0.575],
                  "305": [0, 0.44444, 0, 0, 0.31944],
                  "338": [0, 0.68611, 0, 0, 1.16944],
                  "339": [0, 0.44444, 0, 0, 0.89444],
                  "567": [0.19444, 0.44444, 0, 0, 0.35139],
                  "710": [0, 0.69444, 0, 0, 0.575],
                  "711": [0, 0.63194, 0, 0, 0.575],
                  "713": [0, 0.59611, 0, 0, 0.575],
                  "714": [0, 0.69444, 0, 0, 0.575],
                  "715": [0, 0.69444, 0, 0, 0.575],
                  "728": [0, 0.69444, 0, 0, 0.575],
                  "729": [0, 0.69444, 0, 0, 0.31944],
                  "730": [0, 0.69444, 0, 0, 0.86944],
                  "732": [0, 0.69444, 0, 0, 0.575],
                  "733": [0, 0.69444, 0, 0, 0.575],
                  "915": [0, 0.68611, 0, 0, 0.69166],
                  "916": [0, 0.68611, 0, 0, 0.95833],
                  "920": [0, 0.68611, 0, 0, 0.89444],
                  "923": [0, 0.68611, 0, 0, 0.80555],
                  "926": [0, 0.68611, 0, 0, 0.76666],
                  "928": [0, 0.68611, 0, 0, 0.9],
                  "931": [0, 0.68611, 0, 0, 0.83055],
                  "933": [0, 0.68611, 0, 0, 0.89444],
                  "934": [0, 0.68611, 0, 0, 0.83055],
                  "936": [0, 0.68611, 0, 0, 0.89444],
                  "937": [0, 0.68611, 0, 0, 0.83055],
                  "8211": [0, 0.44444, 0.03194, 0, 0.575],
                  "8212": [0, 0.44444, 0.03194, 0, 1.14999],
                  "8216": [0, 0.69444, 0, 0, 0.31944],
                  "8217": [0, 0.69444, 0, 0, 0.31944],
                  "8220": [0, 0.69444, 0, 0, 0.60278],
                  "8221": [0, 0.69444, 0, 0, 0.60278],
                  "8224": [0.19444, 0.69444, 0, 0, 0.51111],
                  "8225": [0.19444, 0.69444, 0, 0, 0.51111],
                  "8242": [0, 0.55556, 0, 0, 0.34444],
                  "8407": [0, 0.72444, 0.15486, 0, 0.575],
                  "8463": [0, 0.69444, 0, 0, 0.66759],
                  "8465": [0, 0.69444, 0, 0, 0.83055],
                  "8467": [0, 0.69444, 0, 0, 0.47361],
                  "8472": [0.19444, 0.44444, 0, 0, 0.74027],
                  "8476": [0, 0.69444, 0, 0, 0.83055],
                  "8501": [0, 0.69444, 0, 0, 0.70277],
                  "8592": [-0.10889, 0.39111, 0, 0, 1.14999],
                  "8593": [0.19444, 0.69444, 0, 0, 0.575],
                  "8594": [-0.10889, 0.39111, 0, 0, 1.14999],
                  "8595": [0.19444, 0.69444, 0, 0, 0.575],
                  "8596": [-0.10889, 0.39111, 0, 0, 1.14999],
                  "8597": [0.25, 0.75, 0, 0, 0.575],
                  "8598": [0.19444, 0.69444, 0, 0, 1.14999],
                  "8599": [0.19444, 0.69444, 0, 0, 1.14999],
                  "8600": [0.19444, 0.69444, 0, 0, 1.14999],
                  "8601": [0.19444, 0.69444, 0, 0, 1.14999],
                  "8636": [-0.10889, 0.39111, 0, 0, 1.14999],
                  "8637": [-0.10889, 0.39111, 0, 0, 1.14999],
                  "8640": [-0.10889, 0.39111, 0, 0, 1.14999],
                  "8641": [-0.10889, 0.39111, 0, 0, 1.14999],
                  "8656": [-0.10889, 0.39111, 0, 0, 1.14999],
                  "8657": [0.19444, 0.69444, 0, 0, 0.70277],
                  "8658": [-0.10889, 0.39111, 0, 0, 1.14999],
                  "8659": [0.19444, 0.69444, 0, 0, 0.70277],
                  "8660": [-0.10889, 0.39111, 0, 0, 1.14999],
                  "8661": [0.25, 0.75, 0, 0, 0.70277],
                  "8704": [0, 0.69444, 0, 0, 0.63889],
                  "8706": [0, 0.69444, 0.06389, 0, 0.62847],
                  "8707": [0, 0.69444, 0, 0, 0.63889],
                  "8709": [0.05556, 0.75, 0, 0, 0.575],
                  "8711": [0, 0.68611, 0, 0, 0.95833],
                  "8712": [0.08556, 0.58556, 0, 0, 0.76666],
                  "8715": [0.08556, 0.58556, 0, 0, 0.76666],
                  "8722": [0.13333, 0.63333, 0, 0, 0.89444],
                  "8723": [0.13333, 0.63333, 0, 0, 0.89444],
                  "8725": [0.25, 0.75, 0, 0, 0.575],
                  "8726": [0.25, 0.75, 0, 0, 0.575],
                  "8727": [-0.02778, 0.47222, 0, 0, 0.575],
                  "8728": [-0.02639, 0.47361, 0, 0, 0.575],
                  "8729": [-0.02639, 0.47361, 0, 0, 0.575],
                  "8730": [0.18, 0.82, 0, 0, 0.95833],
                  "8733": [0, 0.44444, 0, 0, 0.89444],
                  "8734": [0, 0.44444, 0, 0, 1.14999],
                  "8736": [0, 0.69224, 0, 0, 0.72222],
                  "8739": [0.25, 0.75, 0, 0, 0.31944],
                  "8741": [0.25, 0.75, 0, 0, 0.575],
                  "8743": [0, 0.55556, 0, 0, 0.76666],
                  "8744": [0, 0.55556, 0, 0, 0.76666],
                  "8745": [0, 0.55556, 0, 0, 0.76666],
                  "8746": [0, 0.55556, 0, 0, 0.76666],
                  "8747": [0.19444, 0.69444, 0.12778, 0, 0.56875],
                  "8764": [-0.10889, 0.39111, 0, 0, 0.89444],
                  "8768": [0.19444, 0.69444, 0, 0, 0.31944],
                  "8771": [222e-5, 0.50222, 0, 0, 0.89444],
                  "8776": [0.02444, 0.52444, 0, 0, 0.89444],
                  "8781": [222e-5, 0.50222, 0, 0, 0.89444],
                  "8801": [222e-5, 0.50222, 0, 0, 0.89444],
                  "8804": [0.19667, 0.69667, 0, 0, 0.89444],
                  "8805": [0.19667, 0.69667, 0, 0, 0.89444],
                  "8810": [0.08556, 0.58556, 0, 0, 1.14999],
                  "8811": [0.08556, 0.58556, 0, 0, 1.14999],
                  "8826": [0.08556, 0.58556, 0, 0, 0.89444],
                  "8827": [0.08556, 0.58556, 0, 0, 0.89444],
                  "8834": [0.08556, 0.58556, 0, 0, 0.89444],
                  "8835": [0.08556, 0.58556, 0, 0, 0.89444],
                  "8838": [0.19667, 0.69667, 0, 0, 0.89444],
                  "8839": [0.19667, 0.69667, 0, 0, 0.89444],
                  "8846": [0, 0.55556, 0, 0, 0.76666],
                  "8849": [0.19667, 0.69667, 0, 0, 0.89444],
                  "8850": [0.19667, 0.69667, 0, 0, 0.89444],
                  "8851": [0, 0.55556, 0, 0, 0.76666],
                  "8852": [0, 0.55556, 0, 0, 0.76666],
                  "8853": [0.13333, 0.63333, 0, 0, 0.89444],
                  "8854": [0.13333, 0.63333, 0, 0, 0.89444],
                  "8855": [0.13333, 0.63333, 0, 0, 0.89444],
                  "8856": [0.13333, 0.63333, 0, 0, 0.89444],
                  "8857": [0.13333, 0.63333, 0, 0, 0.89444],
                  "8866": [0, 0.69444, 0, 0, 0.70277],
                  "8867": [0, 0.69444, 0, 0, 0.70277],
                  "8868": [0, 0.69444, 0, 0, 0.89444],
                  "8869": [0, 0.69444, 0, 0, 0.89444],
                  "8900": [-0.02639, 0.47361, 0, 0, 0.575],
                  "8901": [-0.02639, 0.47361, 0, 0, 0.31944],
                  "8902": [-0.02778, 0.47222, 0, 0, 0.575],
                  "8968": [0.25, 0.75, 0, 0, 0.51111],
                  "8969": [0.25, 0.75, 0, 0, 0.51111],
                  "8970": [0.25, 0.75, 0, 0, 0.51111],
                  "8971": [0.25, 0.75, 0, 0, 0.51111],
                  "8994": [-0.13889, 0.36111, 0, 0, 1.14999],
                  "8995": [-0.13889, 0.36111, 0, 0, 1.14999],
                  "9651": [0.19444, 0.69444, 0, 0, 1.02222],
                  "9657": [-0.02778, 0.47222, 0, 0, 0.575],
                  "9661": [0.19444, 0.69444, 0, 0, 1.02222],
                  "9667": [-0.02778, 0.47222, 0, 0, 0.575],
                  "9711": [0.19444, 0.69444, 0, 0, 1.14999],
                  "9824": [0.12963, 0.69444, 0, 0, 0.89444],
                  "9825": [0.12963, 0.69444, 0, 0, 0.89444],
                  "9826": [0.12963, 0.69444, 0, 0, 0.89444],
                  "9827": [0.12963, 0.69444, 0, 0, 0.89444],
                  "9837": [0, 0.75, 0, 0, 0.44722],
                  "9838": [0.19444, 0.69444, 0, 0, 0.44722],
                  "9839": [0.19444, 0.69444, 0, 0, 0.44722],
                  "10216": [0.25, 0.75, 0, 0, 0.44722],
                  "10217": [0.25, 0.75, 0, 0, 0.44722],
                  "10815": [0, 0.68611, 0, 0, 0.9],
                  "10927": [0.19667, 0.69667, 0, 0, 0.89444],
                  "10928": [0.19667, 0.69667, 0, 0, 0.89444],
                  "57376": [0.19444, 0.69444, 0, 0, 0]
                },
                "Main-BoldItalic": {
                  "33": [0, 0.69444, 0.11417, 0, 0.38611],
                  "34": [0, 0.69444, 0.07939, 0, 0.62055],
                  "35": [0.19444, 0.69444, 0.06833, 0, 0.94444],
                  "37": [0.05556, 0.75, 0.12861, 0, 0.94444],
                  "38": [0, 0.69444, 0.08528, 0, 0.88555],
                  "39": [0, 0.69444, 0.12945, 0, 0.35555],
                  "40": [0.25, 0.75, 0.15806, 0, 0.47333],
                  "41": [0.25, 0.75, 0.03306, 0, 0.47333],
                  "42": [0, 0.75, 0.14333, 0, 0.59111],
                  "43": [0.10333, 0.60333, 0.03306, 0, 0.88555],
                  "44": [0.19444, 0.14722, 0, 0, 0.35555],
                  "45": [0, 0.44444, 0.02611, 0, 0.41444],
                  "46": [0, 0.14722, 0, 0, 0.35555],
                  "47": [0.25, 0.75, 0.15806, 0, 0.59111],
                  "48": [0, 0.64444, 0.13167, 0, 0.59111],
                  "49": [0, 0.64444, 0.13167, 0, 0.59111],
                  "50": [0, 0.64444, 0.13167, 0, 0.59111],
                  "51": [0, 0.64444, 0.13167, 0, 0.59111],
                  "52": [0.19444, 0.64444, 0.13167, 0, 0.59111],
                  "53": [0, 0.64444, 0.13167, 0, 0.59111],
                  "54": [0, 0.64444, 0.13167, 0, 0.59111],
                  "55": [0.19444, 0.64444, 0.13167, 0, 0.59111],
                  "56": [0, 0.64444, 0.13167, 0, 0.59111],
                  "57": [0, 0.64444, 0.13167, 0, 0.59111],
                  "58": [0, 0.44444, 0.06695, 0, 0.35555],
                  "59": [0.19444, 0.44444, 0.06695, 0, 0.35555],
                  "61": [-0.10889, 0.39111, 0.06833, 0, 0.88555],
                  "63": [0, 0.69444, 0.11472, 0, 0.59111],
                  "64": [0, 0.69444, 0.09208, 0, 0.88555],
                  "65": [0, 0.68611, 0, 0, 0.86555],
                  "66": [0, 0.68611, 0.0992, 0, 0.81666],
                  "67": [0, 0.68611, 0.14208, 0, 0.82666],
                  "68": [0, 0.68611, 0.09062, 0, 0.87555],
                  "69": [0, 0.68611, 0.11431, 0, 0.75666],
                  "70": [0, 0.68611, 0.12903, 0, 0.72722],
                  "71": [0, 0.68611, 0.07347, 0, 0.89527],
                  "72": [0, 0.68611, 0.17208, 0, 0.8961],
                  "73": [0, 0.68611, 0.15681, 0, 0.47166],
                  "74": [0, 0.68611, 0.145, 0, 0.61055],
                  "75": [0, 0.68611, 0.14208, 0, 0.89499],
                  "76": [0, 0.68611, 0, 0, 0.69777],
                  "77": [0, 0.68611, 0.17208, 0, 1.07277],
                  "78": [0, 0.68611, 0.17208, 0, 0.8961],
                  "79": [0, 0.68611, 0.09062, 0, 0.85499],
                  "80": [0, 0.68611, 0.0992, 0, 0.78721],
                  "81": [0.19444, 0.68611, 0.09062, 0, 0.85499],
                  "82": [0, 0.68611, 0.02559, 0, 0.85944],
                  "83": [0, 0.68611, 0.11264, 0, 0.64999],
                  "84": [0, 0.68611, 0.12903, 0, 0.7961],
                  "85": [0, 0.68611, 0.17208, 0, 0.88083],
                  "86": [0, 0.68611, 0.18625, 0, 0.86555],
                  "87": [0, 0.68611, 0.18625, 0, 1.15999],
                  "88": [0, 0.68611, 0.15681, 0, 0.86555],
                  "89": [0, 0.68611, 0.19803, 0, 0.86555],
                  "90": [0, 0.68611, 0.14208, 0, 0.70888],
                  "91": [0.25, 0.75, 0.1875, 0, 0.35611],
                  "93": [0.25, 0.75, 0.09972, 0, 0.35611],
                  "94": [0, 0.69444, 0.06709, 0, 0.59111],
                  "95": [0.31, 0.13444, 0.09811, 0, 0.59111],
                  "97": [0, 0.44444, 0.09426, 0, 0.59111],
                  "98": [0, 0.69444, 0.07861, 0, 0.53222],
                  "99": [0, 0.44444, 0.05222, 0, 0.53222],
                  "100": [0, 0.69444, 0.10861, 0, 0.59111],
                  "101": [0, 0.44444, 0.085, 0, 0.53222],
                  "102": [0.19444, 0.69444, 0.21778, 0, 0.4],
                  "103": [0.19444, 0.44444, 0.105, 0, 0.53222],
                  "104": [0, 0.69444, 0.09426, 0, 0.59111],
                  "105": [0, 0.69326, 0.11387, 0, 0.35555],
                  "106": [0.19444, 0.69326, 0.1672, 0, 0.35555],
                  "107": [0, 0.69444, 0.11111, 0, 0.53222],
                  "108": [0, 0.69444, 0.10861, 0, 0.29666],
                  "109": [0, 0.44444, 0.09426, 0, 0.94444],
                  "110": [0, 0.44444, 0.09426, 0, 0.64999],
                  "111": [0, 0.44444, 0.07861, 0, 0.59111],
                  "112": [0.19444, 0.44444, 0.07861, 0, 0.59111],
                  "113": [0.19444, 0.44444, 0.105, 0, 0.53222],
                  "114": [0, 0.44444, 0.11111, 0, 0.50167],
                  "115": [0, 0.44444, 0.08167, 0, 0.48694],
                  "116": [0, 0.63492, 0.09639, 0, 0.385],
                  "117": [0, 0.44444, 0.09426, 0, 0.62055],
                  "118": [0, 0.44444, 0.11111, 0, 0.53222],
                  "119": [0, 0.44444, 0.11111, 0, 0.76777],
                  "120": [0, 0.44444, 0.12583, 0, 0.56055],
                  "121": [0.19444, 0.44444, 0.105, 0, 0.56166],
                  "122": [0, 0.44444, 0.13889, 0, 0.49055],
                  "126": [0.35, 0.34444, 0.11472, 0, 0.59111],
                  "163": [0, 0.69444, 0, 0, 0.86853],
                  "168": [0, 0.69444, 0.11473, 0, 0.59111],
                  "176": [0, 0.69444, 0, 0, 0.94888],
                  "184": [0.17014, 0, 0, 0, 0.53222],
                  "198": [0, 0.68611, 0.11431, 0, 1.02277],
                  "216": [0.04861, 0.73472, 0.09062, 0, 0.88555],
                  "223": [0.19444, 0.69444, 0.09736, 0, 0.665],
                  "230": [0, 0.44444, 0.085, 0, 0.82666],
                  "248": [0.09722, 0.54167, 0.09458, 0, 0.59111],
                  "305": [0, 0.44444, 0.09426, 0, 0.35555],
                  "338": [0, 0.68611, 0.11431, 0, 1.14054],
                  "339": [0, 0.44444, 0.085, 0, 0.82666],
                  "567": [0.19444, 0.44444, 0.04611, 0, 0.385],
                  "710": [0, 0.69444, 0.06709, 0, 0.59111],
                  "711": [0, 0.63194, 0.08271, 0, 0.59111],
                  "713": [0, 0.59444, 0.10444, 0, 0.59111],
                  "714": [0, 0.69444, 0.08528, 0, 0.59111],
                  "715": [0, 0.69444, 0, 0, 0.59111],
                  "728": [0, 0.69444, 0.10333, 0, 0.59111],
                  "729": [0, 0.69444, 0.12945, 0, 0.35555],
                  "730": [0, 0.69444, 0, 0, 0.94888],
                  "732": [0, 0.69444, 0.11472, 0, 0.59111],
                  "733": [0, 0.69444, 0.11472, 0, 0.59111],
                  "915": [0, 0.68611, 0.12903, 0, 0.69777],
                  "916": [0, 0.68611, 0, 0, 0.94444],
                  "920": [0, 0.68611, 0.09062, 0, 0.88555],
                  "923": [0, 0.68611, 0, 0, 0.80666],
                  "926": [0, 0.68611, 0.15092, 0, 0.76777],
                  "928": [0, 0.68611, 0.17208, 0, 0.8961],
                  "931": [0, 0.68611, 0.11431, 0, 0.82666],
                  "933": [0, 0.68611, 0.10778, 0, 0.88555],
                  "934": [0, 0.68611, 0.05632, 0, 0.82666],
                  "936": [0, 0.68611, 0.10778, 0, 0.88555],
                  "937": [0, 0.68611, 0.0992, 0, 0.82666],
                  "8211": [0, 0.44444, 0.09811, 0, 0.59111],
                  "8212": [0, 0.44444, 0.09811, 0, 1.18221],
                  "8216": [0, 0.69444, 0.12945, 0, 0.35555],
                  "8217": [0, 0.69444, 0.12945, 0, 0.35555],
                  "8220": [0, 0.69444, 0.16772, 0, 0.62055],
                  "8221": [0, 0.69444, 0.07939, 0, 0.62055]
                },
                "Main-Italic": {
                  "33": [0, 0.69444, 0.12417, 0, 0.30667],
                  "34": [0, 0.69444, 0.06961, 0, 0.51444],
                  "35": [0.19444, 0.69444, 0.06616, 0, 0.81777],
                  "37": [0.05556, 0.75, 0.13639, 0, 0.81777],
                  "38": [0, 0.69444, 0.09694, 0, 0.76666],
                  "39": [0, 0.69444, 0.12417, 0, 0.30667],
                  "40": [0.25, 0.75, 0.16194, 0, 0.40889],
                  "41": [0.25, 0.75, 0.03694, 0, 0.40889],
                  "42": [0, 0.75, 0.14917, 0, 0.51111],
                  "43": [0.05667, 0.56167, 0.03694, 0, 0.76666],
                  "44": [0.19444, 0.10556, 0, 0, 0.30667],
                  "45": [0, 0.43056, 0.02826, 0, 0.35778],
                  "46": [0, 0.10556, 0, 0, 0.30667],
                  "47": [0.25, 0.75, 0.16194, 0, 0.51111],
                  "48": [0, 0.64444, 0.13556, 0, 0.51111],
                  "49": [0, 0.64444, 0.13556, 0, 0.51111],
                  "50": [0, 0.64444, 0.13556, 0, 0.51111],
                  "51": [0, 0.64444, 0.13556, 0, 0.51111],
                  "52": [0.19444, 0.64444, 0.13556, 0, 0.51111],
                  "53": [0, 0.64444, 0.13556, 0, 0.51111],
                  "54": [0, 0.64444, 0.13556, 0, 0.51111],
                  "55": [0.19444, 0.64444, 0.13556, 0, 0.51111],
                  "56": [0, 0.64444, 0.13556, 0, 0.51111],
                  "57": [0, 0.64444, 0.13556, 0, 0.51111],
                  "58": [0, 0.43056, 0.0582, 0, 0.30667],
                  "59": [0.19444, 0.43056, 0.0582, 0, 0.30667],
                  "61": [-0.13313, 0.36687, 0.06616, 0, 0.76666],
                  "63": [0, 0.69444, 0.1225, 0, 0.51111],
                  "64": [0, 0.69444, 0.09597, 0, 0.76666],
                  "65": [0, 0.68333, 0, 0, 0.74333],
                  "66": [0, 0.68333, 0.10257, 0, 0.70389],
                  "67": [0, 0.68333, 0.14528, 0, 0.71555],
                  "68": [0, 0.68333, 0.09403, 0, 0.755],
                  "69": [0, 0.68333, 0.12028, 0, 0.67833],
                  "70": [0, 0.68333, 0.13305, 0, 0.65277],
                  "71": [0, 0.68333, 0.08722, 0, 0.77361],
                  "72": [0, 0.68333, 0.16389, 0, 0.74333],
                  "73": [0, 0.68333, 0.15806, 0, 0.38555],
                  "74": [0, 0.68333, 0.14028, 0, 0.525],
                  "75": [0, 0.68333, 0.14528, 0, 0.76888],
                  "76": [0, 0.68333, 0, 0, 0.62722],
                  "77": [0, 0.68333, 0.16389, 0, 0.89666],
                  "78": [0, 0.68333, 0.16389, 0, 0.74333],
                  "79": [0, 0.68333, 0.09403, 0, 0.76666],
                  "80": [0, 0.68333, 0.10257, 0, 0.67833],
                  "81": [0.19444, 0.68333, 0.09403, 0, 0.76666],
                  "82": [0, 0.68333, 0.03868, 0, 0.72944],
                  "83": [0, 0.68333, 0.11972, 0, 0.56222],
                  "84": [0, 0.68333, 0.13305, 0, 0.71555],
                  "85": [0, 0.68333, 0.16389, 0, 0.74333],
                  "86": [0, 0.68333, 0.18361, 0, 0.74333],
                  "87": [0, 0.68333, 0.18361, 0, 0.99888],
                  "88": [0, 0.68333, 0.15806, 0, 0.74333],
                  "89": [0, 0.68333, 0.19383, 0, 0.74333],
                  "90": [0, 0.68333, 0.14528, 0, 0.61333],
                  "91": [0.25, 0.75, 0.1875, 0, 0.30667],
                  "93": [0.25, 0.75, 0.10528, 0, 0.30667],
                  "94": [0, 0.69444, 0.06646, 0, 0.51111],
                  "95": [0.31, 0.12056, 0.09208, 0, 0.51111],
                  "97": [0, 0.43056, 0.07671, 0, 0.51111],
                  "98": [0, 0.69444, 0.06312, 0, 0.46],
                  "99": [0, 0.43056, 0.05653, 0, 0.46],
                  "100": [0, 0.69444, 0.10333, 0, 0.51111],
                  "101": [0, 0.43056, 0.07514, 0, 0.46],
                  "102": [0.19444, 0.69444, 0.21194, 0, 0.30667],
                  "103": [0.19444, 0.43056, 0.08847, 0, 0.46],
                  "104": [0, 0.69444, 0.07671, 0, 0.51111],
                  "105": [0, 0.65536, 0.1019, 0, 0.30667],
                  "106": [0.19444, 0.65536, 0.14467, 0, 0.30667],
                  "107": [0, 0.69444, 0.10764, 0, 0.46],
                  "108": [0, 0.69444, 0.10333, 0, 0.25555],
                  "109": [0, 0.43056, 0.07671, 0, 0.81777],
                  "110": [0, 0.43056, 0.07671, 0, 0.56222],
                  "111": [0, 0.43056, 0.06312, 0, 0.51111],
                  "112": [0.19444, 0.43056, 0.06312, 0, 0.51111],
                  "113": [0.19444, 0.43056, 0.08847, 0, 0.46],
                  "114": [0, 0.43056, 0.10764, 0, 0.42166],
                  "115": [0, 0.43056, 0.08208, 0, 0.40889],
                  "116": [0, 0.61508, 0.09486, 0, 0.33222],
                  "117": [0, 0.43056, 0.07671, 0, 0.53666],
                  "118": [0, 0.43056, 0.10764, 0, 0.46],
                  "119": [0, 0.43056, 0.10764, 0, 0.66444],
                  "120": [0, 0.43056, 0.12042, 0, 0.46389],
                  "121": [0.19444, 0.43056, 0.08847, 0, 0.48555],
                  "122": [0, 0.43056, 0.12292, 0, 0.40889],
                  "126": [0.35, 0.31786, 0.11585, 0, 0.51111],
                  "163": [0, 0.69444, 0, 0, 0.76909],
                  "168": [0, 0.66786, 0.10474, 0, 0.51111],
                  "176": [0, 0.69444, 0, 0, 0.83129],
                  "184": [0.17014, 0, 0, 0, 0.46],
                  "198": [0, 0.68333, 0.12028, 0, 0.88277],
                  "216": [0.04861, 0.73194, 0.09403, 0, 0.76666],
                  "223": [0.19444, 0.69444, 0.10514, 0, 0.53666],
                  "230": [0, 0.43056, 0.07514, 0, 0.71555],
                  "248": [0.09722, 0.52778, 0.09194, 0, 0.51111],
                  "305": [0, 0.43056, 0, 0.02778, 0.32246],
                  "338": [0, 0.68333, 0.12028, 0, 0.98499],
                  "339": [0, 0.43056, 0.07514, 0, 0.71555],
                  "567": [0.19444, 0.43056, 0, 0.08334, 0.38403],
                  "710": [0, 0.69444, 0.06646, 0, 0.51111],
                  "711": [0, 0.62847, 0.08295, 0, 0.51111],
                  "713": [0, 0.56167, 0.10333, 0, 0.51111],
                  "714": [0, 0.69444, 0.09694, 0, 0.51111],
                  "715": [0, 0.69444, 0, 0, 0.51111],
                  "728": [0, 0.69444, 0.10806, 0, 0.51111],
                  "729": [0, 0.66786, 0.11752, 0, 0.30667],
                  "730": [0, 0.69444, 0, 0, 0.83129],
                  "732": [0, 0.66786, 0.11585, 0, 0.51111],
                  "733": [0, 0.69444, 0.1225, 0, 0.51111],
                  "915": [0, 0.68333, 0.13305, 0, 0.62722],
                  "916": [0, 0.68333, 0, 0, 0.81777],
                  "920": [0, 0.68333, 0.09403, 0, 0.76666],
                  "923": [0, 0.68333, 0, 0, 0.69222],
                  "926": [0, 0.68333, 0.15294, 0, 0.66444],
                  "928": [0, 0.68333, 0.16389, 0, 0.74333],
                  "931": [0, 0.68333, 0.12028, 0, 0.71555],
                  "933": [0, 0.68333, 0.11111, 0, 0.76666],
                  "934": [0, 0.68333, 0.05986, 0, 0.71555],
                  "936": [0, 0.68333, 0.11111, 0, 0.76666],
                  "937": [0, 0.68333, 0.10257, 0, 0.71555],
                  "8211": [0, 0.43056, 0.09208, 0, 0.51111],
                  "8212": [0, 0.43056, 0.09208, 0, 1.02222],
                  "8216": [0, 0.69444, 0.12417, 0, 0.30667],
                  "8217": [0, 0.69444, 0.12417, 0, 0.30667],
                  "8220": [0, 0.69444, 0.1685, 0, 0.51444],
                  "8221": [0, 0.69444, 0.06961, 0, 0.51444],
                  "8463": [0, 0.68889, 0, 0, 0.54028]
                },
                "Main-Regular": {
                  "32": [0, 0, 0, 0, 0.25],
                  "33": [0, 0.69444, 0, 0, 0.27778],
                  "34": [0, 0.69444, 0, 0, 0.5],
                  "35": [0.19444, 0.69444, 0, 0, 0.83334],
                  "36": [0.05556, 0.75, 0, 0, 0.5],
                  "37": [0.05556, 0.75, 0, 0, 0.83334],
                  "38": [0, 0.69444, 0, 0, 0.77778],
                  "39": [0, 0.69444, 0, 0, 0.27778],
                  "40": [0.25, 0.75, 0, 0, 0.38889],
                  "41": [0.25, 0.75, 0, 0, 0.38889],
                  "42": [0, 0.75, 0, 0, 0.5],
                  "43": [0.08333, 0.58333, 0, 0, 0.77778],
                  "44": [0.19444, 0.10556, 0, 0, 0.27778],
                  "45": [0, 0.43056, 0, 0, 0.33333],
                  "46": [0, 0.10556, 0, 0, 0.27778],
                  "47": [0.25, 0.75, 0, 0, 0.5],
                  "48": [0, 0.64444, 0, 0, 0.5],
                  "49": [0, 0.64444, 0, 0, 0.5],
                  "50": [0, 0.64444, 0, 0, 0.5],
                  "51": [0, 0.64444, 0, 0, 0.5],
                  "52": [0, 0.64444, 0, 0, 0.5],
                  "53": [0, 0.64444, 0, 0, 0.5],
                  "54": [0, 0.64444, 0, 0, 0.5],
                  "55": [0, 0.64444, 0, 0, 0.5],
                  "56": [0, 0.64444, 0, 0, 0.5],
                  "57": [0, 0.64444, 0, 0, 0.5],
                  "58": [0, 0.43056, 0, 0, 0.27778],
                  "59": [0.19444, 0.43056, 0, 0, 0.27778],
                  "60": [0.0391, 0.5391, 0, 0, 0.77778],
                  "61": [-0.13313, 0.36687, 0, 0, 0.77778],
                  "62": [0.0391, 0.5391, 0, 0, 0.77778],
                  "63": [0, 0.69444, 0, 0, 0.47222],
                  "64": [0, 0.69444, 0, 0, 0.77778],
                  "65": [0, 0.68333, 0, 0, 0.75],
                  "66": [0, 0.68333, 0, 0, 0.70834],
                  "67": [0, 0.68333, 0, 0, 0.72222],
                  "68": [0, 0.68333, 0, 0, 0.76389],
                  "69": [0, 0.68333, 0, 0, 0.68056],
                  "70": [0, 0.68333, 0, 0, 0.65278],
                  "71": [0, 0.68333, 0, 0, 0.78472],
                  "72": [0, 0.68333, 0, 0, 0.75],
                  "73": [0, 0.68333, 0, 0, 0.36111],
                  "74": [0, 0.68333, 0, 0, 0.51389],
                  "75": [0, 0.68333, 0, 0, 0.77778],
                  "76": [0, 0.68333, 0, 0, 0.625],
                  "77": [0, 0.68333, 0, 0, 0.91667],
                  "78": [0, 0.68333, 0, 0, 0.75],
                  "79": [0, 0.68333, 0, 0, 0.77778],
                  "80": [0, 0.68333, 0, 0, 0.68056],
                  "81": [0.19444, 0.68333, 0, 0, 0.77778],
                  "82": [0, 0.68333, 0, 0, 0.73611],
                  "83": [0, 0.68333, 0, 0, 0.55556],
                  "84": [0, 0.68333, 0, 0, 0.72222],
                  "85": [0, 0.68333, 0, 0, 0.75],
                  "86": [0, 0.68333, 0.01389, 0, 0.75],
                  "87": [0, 0.68333, 0.01389, 0, 1.02778],
                  "88": [0, 0.68333, 0, 0, 0.75],
                  "89": [0, 0.68333, 0.025, 0, 0.75],
                  "90": [0, 0.68333, 0, 0, 0.61111],
                  "91": [0.25, 0.75, 0, 0, 0.27778],
                  "92": [0.25, 0.75, 0, 0, 0.5],
                  "93": [0.25, 0.75, 0, 0, 0.27778],
                  "94": [0, 0.69444, 0, 0, 0.5],
                  "95": [0.31, 0.12056, 0.02778, 0, 0.5],
                  "97": [0, 0.43056, 0, 0, 0.5],
                  "98": [0, 0.69444, 0, 0, 0.55556],
                  "99": [0, 0.43056, 0, 0, 0.44445],
                  "100": [0, 0.69444, 0, 0, 0.55556],
                  "101": [0, 0.43056, 0, 0, 0.44445],
                  "102": [0, 0.69444, 0.07778, 0, 0.30556],
                  "103": [0.19444, 0.43056, 0.01389, 0, 0.5],
                  "104": [0, 0.69444, 0, 0, 0.55556],
                  "105": [0, 0.66786, 0, 0, 0.27778],
                  "106": [0.19444, 0.66786, 0, 0, 0.30556],
                  "107": [0, 0.69444, 0, 0, 0.52778],
                  "108": [0, 0.69444, 0, 0, 0.27778],
                  "109": [0, 0.43056, 0, 0, 0.83334],
                  "110": [0, 0.43056, 0, 0, 0.55556],
                  "111": [0, 0.43056, 0, 0, 0.5],
                  "112": [0.19444, 0.43056, 0, 0, 0.55556],
                  "113": [0.19444, 0.43056, 0, 0, 0.52778],
                  "114": [0, 0.43056, 0, 0, 0.39167],
                  "115": [0, 0.43056, 0, 0, 0.39445],
                  "116": [0, 0.61508, 0, 0, 0.38889],
                  "117": [0, 0.43056, 0, 0, 0.55556],
                  "118": [0, 0.43056, 0.01389, 0, 0.52778],
                  "119": [0, 0.43056, 0.01389, 0, 0.72222],
                  "120": [0, 0.43056, 0, 0, 0.52778],
                  "121": [0.19444, 0.43056, 0.01389, 0, 0.52778],
                  "122": [0, 0.43056, 0, 0, 0.44445],
                  "123": [0.25, 0.75, 0, 0, 0.5],
                  "124": [0.25, 0.75, 0, 0, 0.27778],
                  "125": [0.25, 0.75, 0, 0, 0.5],
                  "126": [0.35, 0.31786, 0, 0, 0.5],
                  "160": [0, 0, 0, 0, 0.25],
                  "167": [0.19444, 0.69444, 0, 0, 0.44445],
                  "168": [0, 0.66786, 0, 0, 0.5],
                  "172": [0, 0.43056, 0, 0, 0.66667],
                  "176": [0, 0.69444, 0, 0, 0.75],
                  "177": [0.08333, 0.58333, 0, 0, 0.77778],
                  "182": [0.19444, 0.69444, 0, 0, 0.61111],
                  "184": [0.17014, 0, 0, 0, 0.44445],
                  "198": [0, 0.68333, 0, 0, 0.90278],
                  "215": [0.08333, 0.58333, 0, 0, 0.77778],
                  "216": [0.04861, 0.73194, 0, 0, 0.77778],
                  "223": [0, 0.69444, 0, 0, 0.5],
                  "230": [0, 0.43056, 0, 0, 0.72222],
                  "247": [0.08333, 0.58333, 0, 0, 0.77778],
                  "248": [0.09722, 0.52778, 0, 0, 0.5],
                  "305": [0, 0.43056, 0, 0, 0.27778],
                  "338": [0, 0.68333, 0, 0, 1.01389],
                  "339": [0, 0.43056, 0, 0, 0.77778],
                  "567": [0.19444, 0.43056, 0, 0, 0.30556],
                  "710": [0, 0.69444, 0, 0, 0.5],
                  "711": [0, 0.62847, 0, 0, 0.5],
                  "713": [0, 0.56778, 0, 0, 0.5],
                  "714": [0, 0.69444, 0, 0, 0.5],
                  "715": [0, 0.69444, 0, 0, 0.5],
                  "728": [0, 0.69444, 0, 0, 0.5],
                  "729": [0, 0.66786, 0, 0, 0.27778],
                  "730": [0, 0.69444, 0, 0, 0.75],
                  "732": [0, 0.66786, 0, 0, 0.5],
                  "733": [0, 0.69444, 0, 0, 0.5],
                  "915": [0, 0.68333, 0, 0, 0.625],
                  "916": [0, 0.68333, 0, 0, 0.83334],
                  "920": [0, 0.68333, 0, 0, 0.77778],
                  "923": [0, 0.68333, 0, 0, 0.69445],
                  "926": [0, 0.68333, 0, 0, 0.66667],
                  "928": [0, 0.68333, 0, 0, 0.75],
                  "931": [0, 0.68333, 0, 0, 0.72222],
                  "933": [0, 0.68333, 0, 0, 0.77778],
                  "934": [0, 0.68333, 0, 0, 0.72222],
                  "936": [0, 0.68333, 0, 0, 0.77778],
                  "937": [0, 0.68333, 0, 0, 0.72222],
                  "8211": [0, 0.43056, 0.02778, 0, 0.5],
                  "8212": [0, 0.43056, 0.02778, 0, 1],
                  "8216": [0, 0.69444, 0, 0, 0.27778],
                  "8217": [0, 0.69444, 0, 0, 0.27778],
                  "8220": [0, 0.69444, 0, 0, 0.5],
                  "8221": [0, 0.69444, 0, 0, 0.5],
                  "8224": [0.19444, 0.69444, 0, 0, 0.44445],
                  "8225": [0.19444, 0.69444, 0, 0, 0.44445],
                  "8230": [0, 0.12, 0, 0, 1.172],
                  "8242": [0, 0.55556, 0, 0, 0.275],
                  "8407": [0, 0.71444, 0.15382, 0, 0.5],
                  "8463": [0, 0.68889, 0, 0, 0.54028],
                  "8465": [0, 0.69444, 0, 0, 0.72222],
                  "8467": [0, 0.69444, 0, 0.11111, 0.41667],
                  "8472": [0.19444, 0.43056, 0, 0.11111, 0.63646],
                  "8476": [0, 0.69444, 0, 0, 0.72222],
                  "8501": [0, 0.69444, 0, 0, 0.61111],
                  "8592": [-0.13313, 0.36687, 0, 0, 1],
                  "8593": [0.19444, 0.69444, 0, 0, 0.5],
                  "8594": [-0.13313, 0.36687, 0, 0, 1],
                  "8595": [0.19444, 0.69444, 0, 0, 0.5],
                  "8596": [-0.13313, 0.36687, 0, 0, 1],
                  "8597": [0.25, 0.75, 0, 0, 0.5],
                  "8598": [0.19444, 0.69444, 0, 0, 1],
                  "8599": [0.19444, 0.69444, 0, 0, 1],
                  "8600": [0.19444, 0.69444, 0, 0, 1],
                  "8601": [0.19444, 0.69444, 0, 0, 1],
                  "8614": [0.011, 0.511, 0, 0, 1],
                  "8617": [0.011, 0.511, 0, 0, 1.126],
                  "8618": [0.011, 0.511, 0, 0, 1.126],
                  "8636": [-0.13313, 0.36687, 0, 0, 1],
                  "8637": [-0.13313, 0.36687, 0, 0, 1],
                  "8640": [-0.13313, 0.36687, 0, 0, 1],
                  "8641": [-0.13313, 0.36687, 0, 0, 1],
                  "8652": [0.011, 0.671, 0, 0, 1],
                  "8656": [-0.13313, 0.36687, 0, 0, 1],
                  "8657": [0.19444, 0.69444, 0, 0, 0.61111],
                  "8658": [-0.13313, 0.36687, 0, 0, 1],
                  "8659": [0.19444, 0.69444, 0, 0, 0.61111],
                  "8660": [-0.13313, 0.36687, 0, 0, 1],
                  "8661": [0.25, 0.75, 0, 0, 0.61111],
                  "8704": [0, 0.69444, 0, 0, 0.55556],
                  "8706": [0, 0.69444, 0.05556, 0.08334, 0.5309],
                  "8707": [0, 0.69444, 0, 0, 0.55556],
                  "8709": [0.05556, 0.75, 0, 0, 0.5],
                  "8711": [0, 0.68333, 0, 0, 0.83334],
                  "8712": [0.0391, 0.5391, 0, 0, 0.66667],
                  "8715": [0.0391, 0.5391, 0, 0, 0.66667],
                  "8722": [0.08333, 0.58333, 0, 0, 0.77778],
                  "8723": [0.08333, 0.58333, 0, 0, 0.77778],
                  "8725": [0.25, 0.75, 0, 0, 0.5],
                  "8726": [0.25, 0.75, 0, 0, 0.5],
                  "8727": [-0.03472, 0.46528, 0, 0, 0.5],
                  "8728": [-0.05555, 0.44445, 0, 0, 0.5],
                  "8729": [-0.05555, 0.44445, 0, 0, 0.5],
                  "8730": [0.2, 0.8, 0, 0, 0.83334],
                  "8733": [0, 0.43056, 0, 0, 0.77778],
                  "8734": [0, 0.43056, 0, 0, 1],
                  "8736": [0, 0.69224, 0, 0, 0.72222],
                  "8739": [0.25, 0.75, 0, 0, 0.27778],
                  "8741": [0.25, 0.75, 0, 0, 0.5],
                  "8743": [0, 0.55556, 0, 0, 0.66667],
                  "8744": [0, 0.55556, 0, 0, 0.66667],
                  "8745": [0, 0.55556, 0, 0, 0.66667],
                  "8746": [0, 0.55556, 0, 0, 0.66667],
                  "8747": [0.19444, 0.69444, 0.11111, 0, 0.41667],
                  "8764": [-0.13313, 0.36687, 0, 0, 0.77778],
                  "8768": [0.19444, 0.69444, 0, 0, 0.27778],
                  "8771": [-0.03625, 0.46375, 0, 0, 0.77778],
                  "8773": [-0.022, 0.589, 0, 0, 1],
                  "8776": [-0.01688, 0.48312, 0, 0, 0.77778],
                  "8781": [-0.03625, 0.46375, 0, 0, 0.77778],
                  "8784": [-0.133, 0.67, 0, 0, 0.778],
                  "8801": [-0.03625, 0.46375, 0, 0, 0.77778],
                  "8804": [0.13597, 0.63597, 0, 0, 0.77778],
                  "8805": [0.13597, 0.63597, 0, 0, 0.77778],
                  "8810": [0.0391, 0.5391, 0, 0, 1],
                  "8811": [0.0391, 0.5391, 0, 0, 1],
                  "8826": [0.0391, 0.5391, 0, 0, 0.77778],
                  "8827": [0.0391, 0.5391, 0, 0, 0.77778],
                  "8834": [0.0391, 0.5391, 0, 0, 0.77778],
                  "8835": [0.0391, 0.5391, 0, 0, 0.77778],
                  "8838": [0.13597, 0.63597, 0, 0, 0.77778],
                  "8839": [0.13597, 0.63597, 0, 0, 0.77778],
                  "8846": [0, 0.55556, 0, 0, 0.66667],
                  "8849": [0.13597, 0.63597, 0, 0, 0.77778],
                  "8850": [0.13597, 0.63597, 0, 0, 0.77778],
                  "8851": [0, 0.55556, 0, 0, 0.66667],
                  "8852": [0, 0.55556, 0, 0, 0.66667],
                  "8853": [0.08333, 0.58333, 0, 0, 0.77778],
                  "8854": [0.08333, 0.58333, 0, 0, 0.77778],
                  "8855": [0.08333, 0.58333, 0, 0, 0.77778],
                  "8856": [0.08333, 0.58333, 0, 0, 0.77778],
                  "8857": [0.08333, 0.58333, 0, 0, 0.77778],
                  "8866": [0, 0.69444, 0, 0, 0.61111],
                  "8867": [0, 0.69444, 0, 0, 0.61111],
                  "8868": [0, 0.69444, 0, 0, 0.77778],
                  "8869": [0, 0.69444, 0, 0, 0.77778],
                  "8872": [0.249, 0.75, 0, 0, 0.867],
                  "8900": [-0.05555, 0.44445, 0, 0, 0.5],
                  "8901": [-0.05555, 0.44445, 0, 0, 0.27778],
                  "8902": [-0.03472, 0.46528, 0, 0, 0.5],
                  "8904": [5e-3, 0.505, 0, 0, 0.9],
                  "8942": [0.03, 0.9, 0, 0, 0.278],
                  "8943": [-0.19, 0.31, 0, 0, 1.172],
                  "8945": [-0.1, 0.82, 0, 0, 1.282],
                  "8968": [0.25, 0.75, 0, 0, 0.44445],
                  "8969": [0.25, 0.75, 0, 0, 0.44445],
                  "8970": [0.25, 0.75, 0, 0, 0.44445],
                  "8971": [0.25, 0.75, 0, 0, 0.44445],
                  "8994": [-0.14236, 0.35764, 0, 0, 1],
                  "8995": [-0.14236, 0.35764, 0, 0, 1],
                  "9136": [0.244, 0.744, 0, 0, 0.412],
                  "9137": [0.244, 0.744, 0, 0, 0.412],
                  "9651": [0.19444, 0.69444, 0, 0, 0.88889],
                  "9657": [-0.03472, 0.46528, 0, 0, 0.5],
                  "9661": [0.19444, 0.69444, 0, 0, 0.88889],
                  "9667": [-0.03472, 0.46528, 0, 0, 0.5],
                  "9711": [0.19444, 0.69444, 0, 0, 1],
                  "9824": [0.12963, 0.69444, 0, 0, 0.77778],
                  "9825": [0.12963, 0.69444, 0, 0, 0.77778],
                  "9826": [0.12963, 0.69444, 0, 0, 0.77778],
                  "9827": [0.12963, 0.69444, 0, 0, 0.77778],
                  "9837": [0, 0.75, 0, 0, 0.38889],
                  "9838": [0.19444, 0.69444, 0, 0, 0.38889],
                  "9839": [0.19444, 0.69444, 0, 0, 0.38889],
                  "10216": [0.25, 0.75, 0, 0, 0.38889],
                  "10217": [0.25, 0.75, 0, 0, 0.38889],
                  "10222": [0.244, 0.744, 0, 0, 0.412],
                  "10223": [0.244, 0.744, 0, 0, 0.412],
                  "10229": [0.011, 0.511, 0, 0, 1.609],
                  "10230": [0.011, 0.511, 0, 0, 1.638],
                  "10231": [0.011, 0.511, 0, 0, 1.859],
                  "10232": [0.024, 0.525, 0, 0, 1.609],
                  "10233": [0.024, 0.525, 0, 0, 1.638],
                  "10234": [0.024, 0.525, 0, 0, 1.858],
                  "10236": [0.011, 0.511, 0, 0, 1.638],
                  "10815": [0, 0.68333, 0, 0, 0.75],
                  "10927": [0.13597, 0.63597, 0, 0, 0.77778],
                  "10928": [0.13597, 0.63597, 0, 0, 0.77778],
                  "57376": [0.19444, 0.69444, 0, 0, 0]
                },
                "Math-BoldItalic": {
                  "65": [0, 0.68611, 0, 0, 0.86944],
                  "66": [0, 0.68611, 0.04835, 0, 0.8664],
                  "67": [0, 0.68611, 0.06979, 0, 0.81694],
                  "68": [0, 0.68611, 0.03194, 0, 0.93812],
                  "69": [0, 0.68611, 0.05451, 0, 0.81007],
                  "70": [0, 0.68611, 0.15972, 0, 0.68889],
                  "71": [0, 0.68611, 0, 0, 0.88673],
                  "72": [0, 0.68611, 0.08229, 0, 0.98229],
                  "73": [0, 0.68611, 0.07778, 0, 0.51111],
                  "74": [0, 0.68611, 0.10069, 0, 0.63125],
                  "75": [0, 0.68611, 0.06979, 0, 0.97118],
                  "76": [0, 0.68611, 0, 0, 0.75555],
                  "77": [0, 0.68611, 0.11424, 0, 1.14201],
                  "78": [0, 0.68611, 0.11424, 0, 0.95034],
                  "79": [0, 0.68611, 0.03194, 0, 0.83666],
                  "80": [0, 0.68611, 0.15972, 0, 0.72309],
                  "81": [0.19444, 0.68611, 0, 0, 0.86861],
                  "82": [0, 0.68611, 421e-5, 0, 0.87235],
                  "83": [0, 0.68611, 0.05382, 0, 0.69271],
                  "84": [0, 0.68611, 0.15972, 0, 0.63663],
                  "85": [0, 0.68611, 0.11424, 0, 0.80027],
                  "86": [0, 0.68611, 0.25555, 0, 0.67778],
                  "87": [0, 0.68611, 0.15972, 0, 1.09305],
                  "88": [0, 0.68611, 0.07778, 0, 0.94722],
                  "89": [0, 0.68611, 0.25555, 0, 0.67458],
                  "90": [0, 0.68611, 0.06979, 0, 0.77257],
                  "97": [0, 0.44444, 0, 0, 0.63287],
                  "98": [0, 0.69444, 0, 0, 0.52083],
                  "99": [0, 0.44444, 0, 0, 0.51342],
                  "100": [0, 0.69444, 0, 0, 0.60972],
                  "101": [0, 0.44444, 0, 0, 0.55361],
                  "102": [0.19444, 0.69444, 0.11042, 0, 0.56806],
                  "103": [0.19444, 0.44444, 0.03704, 0, 0.5449],
                  "104": [0, 0.69444, 0, 0, 0.66759],
                  "105": [0, 0.69326, 0, 0, 0.4048],
                  "106": [0.19444, 0.69326, 0.0622, 0, 0.47083],
                  "107": [0, 0.69444, 0.01852, 0, 0.6037],
                  "108": [0, 0.69444, 88e-4, 0, 0.34815],
                  "109": [0, 0.44444, 0, 0, 1.0324],
                  "110": [0, 0.44444, 0, 0, 0.71296],
                  "111": [0, 0.44444, 0, 0, 0.58472],
                  "112": [0.19444, 0.44444, 0, 0, 0.60092],
                  "113": [0.19444, 0.44444, 0.03704, 0, 0.54213],
                  "114": [0, 0.44444, 0.03194, 0, 0.5287],
                  "115": [0, 0.44444, 0, 0, 0.53125],
                  "116": [0, 0.63492, 0, 0, 0.41528],
                  "117": [0, 0.44444, 0, 0, 0.68102],
                  "118": [0, 0.44444, 0.03704, 0, 0.56666],
                  "119": [0, 0.44444, 0.02778, 0, 0.83148],
                  "120": [0, 0.44444, 0, 0, 0.65903],
                  "121": [0.19444, 0.44444, 0.03704, 0, 0.59028],
                  "122": [0, 0.44444, 0.04213, 0, 0.55509],
                  "915": [0, 0.68611, 0.15972, 0, 0.65694],
                  "916": [0, 0.68611, 0, 0, 0.95833],
                  "920": [0, 0.68611, 0.03194, 0, 0.86722],
                  "923": [0, 0.68611, 0, 0, 0.80555],
                  "926": [0, 0.68611, 0.07458, 0, 0.84125],
                  "928": [0, 0.68611, 0.08229, 0, 0.98229],
                  "931": [0, 0.68611, 0.05451, 0, 0.88507],
                  "933": [0, 0.68611, 0.15972, 0, 0.67083],
                  "934": [0, 0.68611, 0, 0, 0.76666],
                  "936": [0, 0.68611, 0.11653, 0, 0.71402],
                  "937": [0, 0.68611, 0.04835, 0, 0.8789],
                  "945": [0, 0.44444, 0, 0, 0.76064],
                  "946": [0.19444, 0.69444, 0.03403, 0, 0.65972],
                  "947": [0.19444, 0.44444, 0.06389, 0, 0.59003],
                  "948": [0, 0.69444, 0.03819, 0, 0.52222],
                  "949": [0, 0.44444, 0, 0, 0.52882],
                  "950": [0.19444, 0.69444, 0.06215, 0, 0.50833],
                  "951": [0.19444, 0.44444, 0.03704, 0, 0.6],
                  "952": [0, 0.69444, 0.03194, 0, 0.5618],
                  "953": [0, 0.44444, 0, 0, 0.41204],
                  "954": [0, 0.44444, 0, 0, 0.66759],
                  "955": [0, 0.69444, 0, 0, 0.67083],
                  "956": [0.19444, 0.44444, 0, 0, 0.70787],
                  "957": [0, 0.44444, 0.06898, 0, 0.57685],
                  "958": [0.19444, 0.69444, 0.03021, 0, 0.50833],
                  "959": [0, 0.44444, 0, 0, 0.58472],
                  "960": [0, 0.44444, 0.03704, 0, 0.68241],
                  "961": [0.19444, 0.44444, 0, 0, 0.6118],
                  "962": [0.09722, 0.44444, 0.07917, 0, 0.42361],
                  "963": [0, 0.44444, 0.03704, 0, 0.68588],
                  "964": [0, 0.44444, 0.13472, 0, 0.52083],
                  "965": [0, 0.44444, 0.03704, 0, 0.63055],
                  "966": [0.19444, 0.44444, 0, 0, 0.74722],
                  "967": [0.19444, 0.44444, 0, 0, 0.71805],
                  "968": [0.19444, 0.69444, 0.03704, 0, 0.75833],
                  "969": [0, 0.44444, 0.03704, 0, 0.71782],
                  "977": [0, 0.69444, 0, 0, 0.69155],
                  "981": [0.19444, 0.69444, 0, 0, 0.7125],
                  "982": [0, 0.44444, 0.03194, 0, 0.975],
                  "1009": [0.19444, 0.44444, 0, 0, 0.6118],
                  "1013": [0, 0.44444, 0, 0, 0.48333]
                },
                "Math-Italic": {
                  "65": [0, 0.68333, 0, 0.13889, 0.75],
                  "66": [0, 0.68333, 0.05017, 0.08334, 0.75851],
                  "67": [0, 0.68333, 0.07153, 0.08334, 0.71472],
                  "68": [0, 0.68333, 0.02778, 0.05556, 0.82792],
                  "69": [0, 0.68333, 0.05764, 0.08334, 0.7382],
                  "70": [0, 0.68333, 0.13889, 0.08334, 0.64306],
                  "71": [0, 0.68333, 0, 0.08334, 0.78625],
                  "72": [0, 0.68333, 0.08125, 0.05556, 0.83125],
                  "73": [0, 0.68333, 0.07847, 0.11111, 0.43958],
                  "74": [0, 0.68333, 0.09618, 0.16667, 0.55451],
                  "75": [0, 0.68333, 0.07153, 0.05556, 0.84931],
                  "76": [0, 0.68333, 0, 0.02778, 0.68056],
                  "77": [0, 0.68333, 0.10903, 0.08334, 0.97014],
                  "78": [0, 0.68333, 0.10903, 0.08334, 0.80347],
                  "79": [0, 0.68333, 0.02778, 0.08334, 0.76278],
                  "80": [0, 0.68333, 0.13889, 0.08334, 0.64201],
                  "81": [0.19444, 0.68333, 0, 0.08334, 0.79056],
                  "82": [0, 0.68333, 773e-5, 0.08334, 0.75929],
                  "83": [0, 0.68333, 0.05764, 0.08334, 0.6132],
                  "84": [0, 0.68333, 0.13889, 0.08334, 0.58438],
                  "85": [0, 0.68333, 0.10903, 0.02778, 0.68278],
                  "86": [0, 0.68333, 0.22222, 0, 0.58333],
                  "87": [0, 0.68333, 0.13889, 0, 0.94445],
                  "88": [0, 0.68333, 0.07847, 0.08334, 0.82847],
                  "89": [0, 0.68333, 0.22222, 0, 0.58056],
                  "90": [0, 0.68333, 0.07153, 0.08334, 0.68264],
                  "97": [0, 0.43056, 0, 0, 0.52859],
                  "98": [0, 0.69444, 0, 0, 0.42917],
                  "99": [0, 0.43056, 0, 0.05556, 0.43276],
                  "100": [0, 0.69444, 0, 0.16667, 0.52049],
                  "101": [0, 0.43056, 0, 0.05556, 0.46563],
                  "102": [0.19444, 0.69444, 0.10764, 0.16667, 0.48959],
                  "103": [0.19444, 0.43056, 0.03588, 0.02778, 0.47697],
                  "104": [0, 0.69444, 0, 0, 0.57616],
                  "105": [0, 0.65952, 0, 0, 0.34451],
                  "106": [0.19444, 0.65952, 0.05724, 0, 0.41181],
                  "107": [0, 0.69444, 0.03148, 0, 0.5206],
                  "108": [0, 0.69444, 0.01968, 0.08334, 0.29838],
                  "109": [0, 0.43056, 0, 0, 0.87801],
                  "110": [0, 0.43056, 0, 0, 0.60023],
                  "111": [0, 0.43056, 0, 0.05556, 0.48472],
                  "112": [0.19444, 0.43056, 0, 0.08334, 0.50313],
                  "113": [0.19444, 0.43056, 0.03588, 0.08334, 0.44641],
                  "114": [0, 0.43056, 0.02778, 0.05556, 0.45116],
                  "115": [0, 0.43056, 0, 0.05556, 0.46875],
                  "116": [0, 0.61508, 0, 0.08334, 0.36111],
                  "117": [0, 0.43056, 0, 0.02778, 0.57246],
                  "118": [0, 0.43056, 0.03588, 0.02778, 0.48472],
                  "119": [0, 0.43056, 0.02691, 0.08334, 0.71592],
                  "120": [0, 0.43056, 0, 0.02778, 0.57153],
                  "121": [0.19444, 0.43056, 0.03588, 0.05556, 0.49028],
                  "122": [0, 0.43056, 0.04398, 0.05556, 0.46505],
                  "915": [0, 0.68333, 0.13889, 0.08334, 0.61528],
                  "916": [0, 0.68333, 0, 0.16667, 0.83334],
                  "920": [0, 0.68333, 0.02778, 0.08334, 0.76278],
                  "923": [0, 0.68333, 0, 0.16667, 0.69445],
                  "926": [0, 0.68333, 0.07569, 0.08334, 0.74236],
                  "928": [0, 0.68333, 0.08125, 0.05556, 0.83125],
                  "931": [0, 0.68333, 0.05764, 0.08334, 0.77986],
                  "933": [0, 0.68333, 0.13889, 0.05556, 0.58333],
                  "934": [0, 0.68333, 0, 0.08334, 0.66667],
                  "936": [0, 0.68333, 0.11, 0.05556, 0.61222],
                  "937": [0, 0.68333, 0.05017, 0.08334, 0.7724],
                  "945": [0, 0.43056, 37e-4, 0.02778, 0.6397],
                  "946": [0.19444, 0.69444, 0.05278, 0.08334, 0.56563],
                  "947": [0.19444, 0.43056, 0.05556, 0, 0.51773],
                  "948": [0, 0.69444, 0.03785, 0.05556, 0.44444],
                  "949": [0, 0.43056, 0, 0.08334, 0.46632],
                  "950": [0.19444, 0.69444, 0.07378, 0.08334, 0.4375],
                  "951": [0.19444, 0.43056, 0.03588, 0.05556, 0.49653],
                  "952": [0, 0.69444, 0.02778, 0.08334, 0.46944],
                  "953": [0, 0.43056, 0, 0.05556, 0.35394],
                  "954": [0, 0.43056, 0, 0, 0.57616],
                  "955": [0, 0.69444, 0, 0, 0.58334],
                  "956": [0.19444, 0.43056, 0, 0.02778, 0.60255],
                  "957": [0, 0.43056, 0.06366, 0.02778, 0.49398],
                  "958": [0.19444, 0.69444, 0.04601, 0.11111, 0.4375],
                  "959": [0, 0.43056, 0, 0.05556, 0.48472],
                  "960": [0, 0.43056, 0.03588, 0, 0.57003],
                  "961": [0.19444, 0.43056, 0, 0.08334, 0.51702],
                  "962": [0.09722, 0.43056, 0.07986, 0.08334, 0.36285],
                  "963": [0, 0.43056, 0.03588, 0, 0.57141],
                  "964": [0, 0.43056, 0.1132, 0.02778, 0.43715],
                  "965": [0, 0.43056, 0.03588, 0.02778, 0.54028],
                  "966": [0.19444, 0.43056, 0, 0.08334, 0.65417],
                  "967": [0.19444, 0.43056, 0, 0.05556, 0.62569],
                  "968": [0.19444, 0.69444, 0.03588, 0.11111, 0.65139],
                  "969": [0, 0.43056, 0.03588, 0, 0.62245],
                  "977": [0, 0.69444, 0, 0.08334, 0.59144],
                  "981": [0.19444, 0.69444, 0, 0.08334, 0.59583],
                  "982": [0, 0.43056, 0.02778, 0, 0.82813],
                  "1009": [0.19444, 0.43056, 0, 0.08334, 0.51702],
                  "1013": [0, 0.43056, 0, 0.05556, 0.4059]
                },
                "Math-Regular": {
                  "65": [0, 0.68333, 0, 0.13889, 0.75],
                  "66": [0, 0.68333, 0.05017, 0.08334, 0.75851],
                  "67": [0, 0.68333, 0.07153, 0.08334, 0.71472],
                  "68": [0, 0.68333, 0.02778, 0.05556, 0.82792],
                  "69": [0, 0.68333, 0.05764, 0.08334, 0.7382],
                  "70": [0, 0.68333, 0.13889, 0.08334, 0.64306],
                  "71": [0, 0.68333, 0, 0.08334, 0.78625],
                  "72": [0, 0.68333, 0.08125, 0.05556, 0.83125],
                  "73": [0, 0.68333, 0.07847, 0.11111, 0.43958],
                  "74": [0, 0.68333, 0.09618, 0.16667, 0.55451],
                  "75": [0, 0.68333, 0.07153, 0.05556, 0.84931],
                  "76": [0, 0.68333, 0, 0.02778, 0.68056],
                  "77": [0, 0.68333, 0.10903, 0.08334, 0.97014],
                  "78": [0, 0.68333, 0.10903, 0.08334, 0.80347],
                  "79": [0, 0.68333, 0.02778, 0.08334, 0.76278],
                  "80": [0, 0.68333, 0.13889, 0.08334, 0.64201],
                  "81": [0.19444, 0.68333, 0, 0.08334, 0.79056],
                  "82": [0, 0.68333, 773e-5, 0.08334, 0.75929],
                  "83": [0, 0.68333, 0.05764, 0.08334, 0.6132],
                  "84": [0, 0.68333, 0.13889, 0.08334, 0.58438],
                  "85": [0, 0.68333, 0.10903, 0.02778, 0.68278],
                  "86": [0, 0.68333, 0.22222, 0, 0.58333],
                  "87": [0, 0.68333, 0.13889, 0, 0.94445],
                  "88": [0, 0.68333, 0.07847, 0.08334, 0.82847],
                  "89": [0, 0.68333, 0.22222, 0, 0.58056],
                  "90": [0, 0.68333, 0.07153, 0.08334, 0.68264],
                  "97": [0, 0.43056, 0, 0, 0.52859],
                  "98": [0, 0.69444, 0, 0, 0.42917],
                  "99": [0, 0.43056, 0, 0.05556, 0.43276],
                  "100": [0, 0.69444, 0, 0.16667, 0.52049],
                  "101": [0, 0.43056, 0, 0.05556, 0.46563],
                  "102": [0.19444, 0.69444, 0.10764, 0.16667, 0.48959],
                  "103": [0.19444, 0.43056, 0.03588, 0.02778, 0.47697],
                  "104": [0, 0.69444, 0, 0, 0.57616],
                  "105": [0, 0.65952, 0, 0, 0.34451],
                  "106": [0.19444, 0.65952, 0.05724, 0, 0.41181],
                  "107": [0, 0.69444, 0.03148, 0, 0.5206],
                  "108": [0, 0.69444, 0.01968, 0.08334, 0.29838],
                  "109": [0, 0.43056, 0, 0, 0.87801],
                  "110": [0, 0.43056, 0, 0, 0.60023],
                  "111": [0, 0.43056, 0, 0.05556, 0.48472],
                  "112": [0.19444, 0.43056, 0, 0.08334, 0.50313],
                  "113": [0.19444, 0.43056, 0.03588, 0.08334, 0.44641],
                  "114": [0, 0.43056, 0.02778, 0.05556, 0.45116],
                  "115": [0, 0.43056, 0, 0.05556, 0.46875],
                  "116": [0, 0.61508, 0, 0.08334, 0.36111],
                  "117": [0, 0.43056, 0, 0.02778, 0.57246],
                  "118": [0, 0.43056, 0.03588, 0.02778, 0.48472],
                  "119": [0, 0.43056, 0.02691, 0.08334, 0.71592],
                  "120": [0, 0.43056, 0, 0.02778, 0.57153],
                  "121": [0.19444, 0.43056, 0.03588, 0.05556, 0.49028],
                  "122": [0, 0.43056, 0.04398, 0.05556, 0.46505],
                  "915": [0, 0.68333, 0.13889, 0.08334, 0.61528],
                  "916": [0, 0.68333, 0, 0.16667, 0.83334],
                  "920": [0, 0.68333, 0.02778, 0.08334, 0.76278],
                  "923": [0, 0.68333, 0, 0.16667, 0.69445],
                  "926": [0, 0.68333, 0.07569, 0.08334, 0.74236],
                  "928": [0, 0.68333, 0.08125, 0.05556, 0.83125],
                  "931": [0, 0.68333, 0.05764, 0.08334, 0.77986],
                  "933": [0, 0.68333, 0.13889, 0.05556, 0.58333],
                  "934": [0, 0.68333, 0, 0.08334, 0.66667],
                  "936": [0, 0.68333, 0.11, 0.05556, 0.61222],
                  "937": [0, 0.68333, 0.05017, 0.08334, 0.7724],
                  "945": [0, 0.43056, 37e-4, 0.02778, 0.6397],
                  "946": [0.19444, 0.69444, 0.05278, 0.08334, 0.56563],
                  "947": [0.19444, 0.43056, 0.05556, 0, 0.51773],
                  "948": [0, 0.69444, 0.03785, 0.05556, 0.44444],
                  "949": [0, 0.43056, 0, 0.08334, 0.46632],
                  "950": [0.19444, 0.69444, 0.07378, 0.08334, 0.4375],
                  "951": [0.19444, 0.43056, 0.03588, 0.05556, 0.49653],
                  "952": [0, 0.69444, 0.02778, 0.08334, 0.46944],
                  "953": [0, 0.43056, 0, 0.05556, 0.35394],
                  "954": [0, 0.43056, 0, 0, 0.57616],
                  "955": [0, 0.69444, 0, 0, 0.58334],
                  "956": [0.19444, 0.43056, 0, 0.02778, 0.60255],
                  "957": [0, 0.43056, 0.06366, 0.02778, 0.49398],
                  "958": [0.19444, 0.69444, 0.04601, 0.11111, 0.4375],
                  "959": [0, 0.43056, 0, 0.05556, 0.48472],
                  "960": [0, 0.43056, 0.03588, 0, 0.57003],
                  "961": [0.19444, 0.43056, 0, 0.08334, 0.51702],
                  "962": [0.09722, 0.43056, 0.07986, 0.08334, 0.36285],
                  "963": [0, 0.43056, 0.03588, 0, 0.57141],
                  "964": [0, 0.43056, 0.1132, 0.02778, 0.43715],
                  "965": [0, 0.43056, 0.03588, 0.02778, 0.54028],
                  "966": [0.19444, 0.43056, 0, 0.08334, 0.65417],
                  "967": [0.19444, 0.43056, 0, 0.05556, 0.62569],
                  "968": [0.19444, 0.69444, 0.03588, 0.11111, 0.65139],
                  "969": [0, 0.43056, 0.03588, 0, 0.62245],
                  "977": [0, 0.69444, 0, 0.08334, 0.59144],
                  "981": [0.19444, 0.69444, 0, 0.08334, 0.59583],
                  "982": [0, 0.43056, 0.02778, 0, 0.82813],
                  "1009": [0.19444, 0.43056, 0, 0.08334, 0.51702],
                  "1013": [0, 0.43056, 0, 0.05556, 0.4059]
                },
                "SansSerif-Bold": {
                  "33": [0, 0.69444, 0, 0, 0.36667],
                  "34": [0, 0.69444, 0, 0, 0.55834],
                  "35": [0.19444, 0.69444, 0, 0, 0.91667],
                  "36": [0.05556, 0.75, 0, 0, 0.55],
                  "37": [0.05556, 0.75, 0, 0, 1.02912],
                  "38": [0, 0.69444, 0, 0, 0.83056],
                  "39": [0, 0.69444, 0, 0, 0.30556],
                  "40": [0.25, 0.75, 0, 0, 0.42778],
                  "41": [0.25, 0.75, 0, 0, 0.42778],
                  "42": [0, 0.75, 0, 0, 0.55],
                  "43": [0.11667, 0.61667, 0, 0, 0.85556],
                  "44": [0.10556, 0.13056, 0, 0, 0.30556],
                  "45": [0, 0.45833, 0, 0, 0.36667],
                  "46": [0, 0.13056, 0, 0, 0.30556],
                  "47": [0.25, 0.75, 0, 0, 0.55],
                  "48": [0, 0.69444, 0, 0, 0.55],
                  "49": [0, 0.69444, 0, 0, 0.55],
                  "50": [0, 0.69444, 0, 0, 0.55],
                  "51": [0, 0.69444, 0, 0, 0.55],
                  "52": [0, 0.69444, 0, 0, 0.55],
                  "53": [0, 0.69444, 0, 0, 0.55],
                  "54": [0, 0.69444, 0, 0, 0.55],
                  "55": [0, 0.69444, 0, 0, 0.55],
                  "56": [0, 0.69444, 0, 0, 0.55],
                  "57": [0, 0.69444, 0, 0, 0.55],
                  "58": [0, 0.45833, 0, 0, 0.30556],
                  "59": [0.10556, 0.45833, 0, 0, 0.30556],
                  "61": [-0.09375, 0.40625, 0, 0, 0.85556],
                  "63": [0, 0.69444, 0, 0, 0.51945],
                  "64": [0, 0.69444, 0, 0, 0.73334],
                  "65": [0, 0.69444, 0, 0, 0.73334],
                  "66": [0, 0.69444, 0, 0, 0.73334],
                  "67": [0, 0.69444, 0, 0, 0.70278],
                  "68": [0, 0.69444, 0, 0, 0.79445],
                  "69": [0, 0.69444, 0, 0, 0.64167],
                  "70": [0, 0.69444, 0, 0, 0.61111],
                  "71": [0, 0.69444, 0, 0, 0.73334],
                  "72": [0, 0.69444, 0, 0, 0.79445],
                  "73": [0, 0.69444, 0, 0, 0.33056],
                  "74": [0, 0.69444, 0, 0, 0.51945],
                  "75": [0, 0.69444, 0, 0, 0.76389],
                  "76": [0, 0.69444, 0, 0, 0.58056],
                  "77": [0, 0.69444, 0, 0, 0.97778],
                  "78": [0, 0.69444, 0, 0, 0.79445],
                  "79": [0, 0.69444, 0, 0, 0.79445],
                  "80": [0, 0.69444, 0, 0, 0.70278],
                  "81": [0.10556, 0.69444, 0, 0, 0.79445],
                  "82": [0, 0.69444, 0, 0, 0.70278],
                  "83": [0, 0.69444, 0, 0, 0.61111],
                  "84": [0, 0.69444, 0, 0, 0.73334],
                  "85": [0, 0.69444, 0, 0, 0.76389],
                  "86": [0, 0.69444, 0.01528, 0, 0.73334],
                  "87": [0, 0.69444, 0.01528, 0, 1.03889],
                  "88": [0, 0.69444, 0, 0, 0.73334],
                  "89": [0, 0.69444, 0.0275, 0, 0.73334],
                  "90": [0, 0.69444, 0, 0, 0.67223],
                  "91": [0.25, 0.75, 0, 0, 0.34306],
                  "93": [0.25, 0.75, 0, 0, 0.34306],
                  "94": [0, 0.69444, 0, 0, 0.55],
                  "95": [0.35, 0.10833, 0.03056, 0, 0.55],
                  "97": [0, 0.45833, 0, 0, 0.525],
                  "98": [0, 0.69444, 0, 0, 0.56111],
                  "99": [0, 0.45833, 0, 0, 0.48889],
                  "100": [0, 0.69444, 0, 0, 0.56111],
                  "101": [0, 0.45833, 0, 0, 0.51111],
                  "102": [0, 0.69444, 0.07639, 0, 0.33611],
                  "103": [0.19444, 0.45833, 0.01528, 0, 0.55],
                  "104": [0, 0.69444, 0, 0, 0.56111],
                  "105": [0, 0.69444, 0, 0, 0.25556],
                  "106": [0.19444, 0.69444, 0, 0, 0.28611],
                  "107": [0, 0.69444, 0, 0, 0.53056],
                  "108": [0, 0.69444, 0, 0, 0.25556],
                  "109": [0, 0.45833, 0, 0, 0.86667],
                  "110": [0, 0.45833, 0, 0, 0.56111],
                  "111": [0, 0.45833, 0, 0, 0.55],
                  "112": [0.19444, 0.45833, 0, 0, 0.56111],
                  "113": [0.19444, 0.45833, 0, 0, 0.56111],
                  "114": [0, 0.45833, 0.01528, 0, 0.37222],
                  "115": [0, 0.45833, 0, 0, 0.42167],
                  "116": [0, 0.58929, 0, 0, 0.40417],
                  "117": [0, 0.45833, 0, 0, 0.56111],
                  "118": [0, 0.45833, 0.01528, 0, 0.5],
                  "119": [0, 0.45833, 0.01528, 0, 0.74445],
                  "120": [0, 0.45833, 0, 0, 0.5],
                  "121": [0.19444, 0.45833, 0.01528, 0, 0.5],
                  "122": [0, 0.45833, 0, 0, 0.47639],
                  "126": [0.35, 0.34444, 0, 0, 0.55],
                  "168": [0, 0.69444, 0, 0, 0.55],
                  "176": [0, 0.69444, 0, 0, 0.73334],
                  "180": [0, 0.69444, 0, 0, 0.55],
                  "184": [0.17014, 0, 0, 0, 0.48889],
                  "305": [0, 0.45833, 0, 0, 0.25556],
                  "567": [0.19444, 0.45833, 0, 0, 0.28611],
                  "710": [0, 0.69444, 0, 0, 0.55],
                  "711": [0, 0.63542, 0, 0, 0.55],
                  "713": [0, 0.63778, 0, 0, 0.55],
                  "728": [0, 0.69444, 0, 0, 0.55],
                  "729": [0, 0.69444, 0, 0, 0.30556],
                  "730": [0, 0.69444, 0, 0, 0.73334],
                  "732": [0, 0.69444, 0, 0, 0.55],
                  "733": [0, 0.69444, 0, 0, 0.55],
                  "915": [0, 0.69444, 0, 0, 0.58056],
                  "916": [0, 0.69444, 0, 0, 0.91667],
                  "920": [0, 0.69444, 0, 0, 0.85556],
                  "923": [0, 0.69444, 0, 0, 0.67223],
                  "926": [0, 0.69444, 0, 0, 0.73334],
                  "928": [0, 0.69444, 0, 0, 0.79445],
                  "931": [0, 0.69444, 0, 0, 0.79445],
                  "933": [0, 0.69444, 0, 0, 0.85556],
                  "934": [0, 0.69444, 0, 0, 0.79445],
                  "936": [0, 0.69444, 0, 0, 0.85556],
                  "937": [0, 0.69444, 0, 0, 0.79445],
                  "8211": [0, 0.45833, 0.03056, 0, 0.55],
                  "8212": [0, 0.45833, 0.03056, 0, 1.10001],
                  "8216": [0, 0.69444, 0, 0, 0.30556],
                  "8217": [0, 0.69444, 0, 0, 0.30556],
                  "8220": [0, 0.69444, 0, 0, 0.55834],
                  "8221": [0, 0.69444, 0, 0, 0.55834]
                },
                "SansSerif-Italic": {
                  "33": [0, 0.69444, 0.05733, 0, 0.31945],
                  "34": [0, 0.69444, 316e-5, 0, 0.5],
                  "35": [0.19444, 0.69444, 0.05087, 0, 0.83334],
                  "36": [0.05556, 0.75, 0.11156, 0, 0.5],
                  "37": [0.05556, 0.75, 0.03126, 0, 0.83334],
                  "38": [0, 0.69444, 0.03058, 0, 0.75834],
                  "39": [0, 0.69444, 0.07816, 0, 0.27778],
                  "40": [0.25, 0.75, 0.13164, 0, 0.38889],
                  "41": [0.25, 0.75, 0.02536, 0, 0.38889],
                  "42": [0, 0.75, 0.11775, 0, 0.5],
                  "43": [0.08333, 0.58333, 0.02536, 0, 0.77778],
                  "44": [0.125, 0.08333, 0, 0, 0.27778],
                  "45": [0, 0.44444, 0.01946, 0, 0.33333],
                  "46": [0, 0.08333, 0, 0, 0.27778],
                  "47": [0.25, 0.75, 0.13164, 0, 0.5],
                  "48": [0, 0.65556, 0.11156, 0, 0.5],
                  "49": [0, 0.65556, 0.11156, 0, 0.5],
                  "50": [0, 0.65556, 0.11156, 0, 0.5],
                  "51": [0, 0.65556, 0.11156, 0, 0.5],
                  "52": [0, 0.65556, 0.11156, 0, 0.5],
                  "53": [0, 0.65556, 0.11156, 0, 0.5],
                  "54": [0, 0.65556, 0.11156, 0, 0.5],
                  "55": [0, 0.65556, 0.11156, 0, 0.5],
                  "56": [0, 0.65556, 0.11156, 0, 0.5],
                  "57": [0, 0.65556, 0.11156, 0, 0.5],
                  "58": [0, 0.44444, 0.02502, 0, 0.27778],
                  "59": [0.125, 0.44444, 0.02502, 0, 0.27778],
                  "61": [-0.13, 0.37, 0.05087, 0, 0.77778],
                  "63": [0, 0.69444, 0.11809, 0, 0.47222],
                  "64": [0, 0.69444, 0.07555, 0, 0.66667],
                  "65": [0, 0.69444, 0, 0, 0.66667],
                  "66": [0, 0.69444, 0.08293, 0, 0.66667],
                  "67": [0, 0.69444, 0.11983, 0, 0.63889],
                  "68": [0, 0.69444, 0.07555, 0, 0.72223],
                  "69": [0, 0.69444, 0.11983, 0, 0.59722],
                  "70": [0, 0.69444, 0.13372, 0, 0.56945],
                  "71": [0, 0.69444, 0.11983, 0, 0.66667],
                  "72": [0, 0.69444, 0.08094, 0, 0.70834],
                  "73": [0, 0.69444, 0.13372, 0, 0.27778],
                  "74": [0, 0.69444, 0.08094, 0, 0.47222],
                  "75": [0, 0.69444, 0.11983, 0, 0.69445],
                  "76": [0, 0.69444, 0, 0, 0.54167],
                  "77": [0, 0.69444, 0.08094, 0, 0.875],
                  "78": [0, 0.69444, 0.08094, 0, 0.70834],
                  "79": [0, 0.69444, 0.07555, 0, 0.73611],
                  "80": [0, 0.69444, 0.08293, 0, 0.63889],
                  "81": [0.125, 0.69444, 0.07555, 0, 0.73611],
                  "82": [0, 0.69444, 0.08293, 0, 0.64584],
                  "83": [0, 0.69444, 0.09205, 0, 0.55556],
                  "84": [0, 0.69444, 0.13372, 0, 0.68056],
                  "85": [0, 0.69444, 0.08094, 0, 0.6875],
                  "86": [0, 0.69444, 0.1615, 0, 0.66667],
                  "87": [0, 0.69444, 0.1615, 0, 0.94445],
                  "88": [0, 0.69444, 0.13372, 0, 0.66667],
                  "89": [0, 0.69444, 0.17261, 0, 0.66667],
                  "90": [0, 0.69444, 0.11983, 0, 0.61111],
                  "91": [0.25, 0.75, 0.15942, 0, 0.28889],
                  "93": [0.25, 0.75, 0.08719, 0, 0.28889],
                  "94": [0, 0.69444, 0.0799, 0, 0.5],
                  "95": [0.35, 0.09444, 0.08616, 0, 0.5],
                  "97": [0, 0.44444, 981e-5, 0, 0.48056],
                  "98": [0, 0.69444, 0.03057, 0, 0.51667],
                  "99": [0, 0.44444, 0.08336, 0, 0.44445],
                  "100": [0, 0.69444, 0.09483, 0, 0.51667],
                  "101": [0, 0.44444, 0.06778, 0, 0.44445],
                  "102": [0, 0.69444, 0.21705, 0, 0.30556],
                  "103": [0.19444, 0.44444, 0.10836, 0, 0.5],
                  "104": [0, 0.69444, 0.01778, 0, 0.51667],
                  "105": [0, 0.67937, 0.09718, 0, 0.23889],
                  "106": [0.19444, 0.67937, 0.09162, 0, 0.26667],
                  "107": [0, 0.69444, 0.08336, 0, 0.48889],
                  "108": [0, 0.69444, 0.09483, 0, 0.23889],
                  "109": [0, 0.44444, 0.01778, 0, 0.79445],
                  "110": [0, 0.44444, 0.01778, 0, 0.51667],
                  "111": [0, 0.44444, 0.06613, 0, 0.5],
                  "112": [0.19444, 0.44444, 0.0389, 0, 0.51667],
                  "113": [0.19444, 0.44444, 0.04169, 0, 0.51667],
                  "114": [0, 0.44444, 0.10836, 0, 0.34167],
                  "115": [0, 0.44444, 0.0778, 0, 0.38333],
                  "116": [0, 0.57143, 0.07225, 0, 0.36111],
                  "117": [0, 0.44444, 0.04169, 0, 0.51667],
                  "118": [0, 0.44444, 0.10836, 0, 0.46111],
                  "119": [0, 0.44444, 0.10836, 0, 0.68334],
                  "120": [0, 0.44444, 0.09169, 0, 0.46111],
                  "121": [0.19444, 0.44444, 0.10836, 0, 0.46111],
                  "122": [0, 0.44444, 0.08752, 0, 0.43472],
                  "126": [0.35, 0.32659, 0.08826, 0, 0.5],
                  "168": [0, 0.67937, 0.06385, 0, 0.5],
                  "176": [0, 0.69444, 0, 0, 0.73752],
                  "184": [0.17014, 0, 0, 0, 0.44445],
                  "305": [0, 0.44444, 0.04169, 0, 0.23889],
                  "567": [0.19444, 0.44444, 0.04169, 0, 0.26667],
                  "710": [0, 0.69444, 0.0799, 0, 0.5],
                  "711": [0, 0.63194, 0.08432, 0, 0.5],
                  "713": [0, 0.60889, 0.08776, 0, 0.5],
                  "714": [0, 0.69444, 0.09205, 0, 0.5],
                  "715": [0, 0.69444, 0, 0, 0.5],
                  "728": [0, 0.69444, 0.09483, 0, 0.5],
                  "729": [0, 0.67937, 0.07774, 0, 0.27778],
                  "730": [0, 0.69444, 0, 0, 0.73752],
                  "732": [0, 0.67659, 0.08826, 0, 0.5],
                  "733": [0, 0.69444, 0.09205, 0, 0.5],
                  "915": [0, 0.69444, 0.13372, 0, 0.54167],
                  "916": [0, 0.69444, 0, 0, 0.83334],
                  "920": [0, 0.69444, 0.07555, 0, 0.77778],
                  "923": [0, 0.69444, 0, 0, 0.61111],
                  "926": [0, 0.69444, 0.12816, 0, 0.66667],
                  "928": [0, 0.69444, 0.08094, 0, 0.70834],
                  "931": [0, 0.69444, 0.11983, 0, 0.72222],
                  "933": [0, 0.69444, 0.09031, 0, 0.77778],
                  "934": [0, 0.69444, 0.04603, 0, 0.72222],
                  "936": [0, 0.69444, 0.09031, 0, 0.77778],
                  "937": [0, 0.69444, 0.08293, 0, 0.72222],
                  "8211": [0, 0.44444, 0.08616, 0, 0.5],
                  "8212": [0, 0.44444, 0.08616, 0, 1],
                  "8216": [0, 0.69444, 0.07816, 0, 0.27778],
                  "8217": [0, 0.69444, 0.07816, 0, 0.27778],
                  "8220": [0, 0.69444, 0.14205, 0, 0.5],
                  "8221": [0, 0.69444, 316e-5, 0, 0.5]
                },
                "SansSerif-Regular": {
                  "33": [0, 0.69444, 0, 0, 0.31945],
                  "34": [0, 0.69444, 0, 0, 0.5],
                  "35": [0.19444, 0.69444, 0, 0, 0.83334],
                  "36": [0.05556, 0.75, 0, 0, 0.5],
                  "37": [0.05556, 0.75, 0, 0, 0.83334],
                  "38": [0, 0.69444, 0, 0, 0.75834],
                  "39": [0, 0.69444, 0, 0, 0.27778],
                  "40": [0.25, 0.75, 0, 0, 0.38889],
                  "41": [0.25, 0.75, 0, 0, 0.38889],
                  "42": [0, 0.75, 0, 0, 0.5],
                  "43": [0.08333, 0.58333, 0, 0, 0.77778],
                  "44": [0.125, 0.08333, 0, 0, 0.27778],
                  "45": [0, 0.44444, 0, 0, 0.33333],
                  "46": [0, 0.08333, 0, 0, 0.27778],
                  "47": [0.25, 0.75, 0, 0, 0.5],
                  "48": [0, 0.65556, 0, 0, 0.5],
                  "49": [0, 0.65556, 0, 0, 0.5],
                  "50": [0, 0.65556, 0, 0, 0.5],
                  "51": [0, 0.65556, 0, 0, 0.5],
                  "52": [0, 0.65556, 0, 0, 0.5],
                  "53": [0, 0.65556, 0, 0, 0.5],
                  "54": [0, 0.65556, 0, 0, 0.5],
                  "55": [0, 0.65556, 0, 0, 0.5],
                  "56": [0, 0.65556, 0, 0, 0.5],
                  "57": [0, 0.65556, 0, 0, 0.5],
                  "58": [0, 0.44444, 0, 0, 0.27778],
                  "59": [0.125, 0.44444, 0, 0, 0.27778],
                  "61": [-0.13, 0.37, 0, 0, 0.77778],
                  "63": [0, 0.69444, 0, 0, 0.47222],
                  "64": [0, 0.69444, 0, 0, 0.66667],
                  "65": [0, 0.69444, 0, 0, 0.66667],
                  "66": [0, 0.69444, 0, 0, 0.66667],
                  "67": [0, 0.69444, 0, 0, 0.63889],
                  "68": [0, 0.69444, 0, 0, 0.72223],
                  "69": [0, 0.69444, 0, 0, 0.59722],
                  "70": [0, 0.69444, 0, 0, 0.56945],
                  "71": [0, 0.69444, 0, 0, 0.66667],
                  "72": [0, 0.69444, 0, 0, 0.70834],
                  "73": [0, 0.69444, 0, 0, 0.27778],
                  "74": [0, 0.69444, 0, 0, 0.47222],
                  "75": [0, 0.69444, 0, 0, 0.69445],
                  "76": [0, 0.69444, 0, 0, 0.54167],
                  "77": [0, 0.69444, 0, 0, 0.875],
                  "78": [0, 0.69444, 0, 0, 0.70834],
                  "79": [0, 0.69444, 0, 0, 0.73611],
                  "80": [0, 0.69444, 0, 0, 0.63889],
                  "81": [0.125, 0.69444, 0, 0, 0.73611],
                  "82": [0, 0.69444, 0, 0, 0.64584],
                  "83": [0, 0.69444, 0, 0, 0.55556],
                  "84": [0, 0.69444, 0, 0, 0.68056],
                  "85": [0, 0.69444, 0, 0, 0.6875],
                  "86": [0, 0.69444, 0.01389, 0, 0.66667],
                  "87": [0, 0.69444, 0.01389, 0, 0.94445],
                  "88": [0, 0.69444, 0, 0, 0.66667],
                  "89": [0, 0.69444, 0.025, 0, 0.66667],
                  "90": [0, 0.69444, 0, 0, 0.61111],
                  "91": [0.25, 0.75, 0, 0, 0.28889],
                  "93": [0.25, 0.75, 0, 0, 0.28889],
                  "94": [0, 0.69444, 0, 0, 0.5],
                  "95": [0.35, 0.09444, 0.02778, 0, 0.5],
                  "97": [0, 0.44444, 0, 0, 0.48056],
                  "98": [0, 0.69444, 0, 0, 0.51667],
                  "99": [0, 0.44444, 0, 0, 0.44445],
                  "100": [0, 0.69444, 0, 0, 0.51667],
                  "101": [0, 0.44444, 0, 0, 0.44445],
                  "102": [0, 0.69444, 0.06944, 0, 0.30556],
                  "103": [0.19444, 0.44444, 0.01389, 0, 0.5],
                  "104": [0, 0.69444, 0, 0, 0.51667],
                  "105": [0, 0.67937, 0, 0, 0.23889],
                  "106": [0.19444, 0.67937, 0, 0, 0.26667],
                  "107": [0, 0.69444, 0, 0, 0.48889],
                  "108": [0, 0.69444, 0, 0, 0.23889],
                  "109": [0, 0.44444, 0, 0, 0.79445],
                  "110": [0, 0.44444, 0, 0, 0.51667],
                  "111": [0, 0.44444, 0, 0, 0.5],
                  "112": [0.19444, 0.44444, 0, 0, 0.51667],
                  "113": [0.19444, 0.44444, 0, 0, 0.51667],
                  "114": [0, 0.44444, 0.01389, 0, 0.34167],
                  "115": [0, 0.44444, 0, 0, 0.38333],
                  "116": [0, 0.57143, 0, 0, 0.36111],
                  "117": [0, 0.44444, 0, 0, 0.51667],
                  "118": [0, 0.44444, 0.01389, 0, 0.46111],
                  "119": [0, 0.44444, 0.01389, 0, 0.68334],
                  "120": [0, 0.44444, 0, 0, 0.46111],
                  "121": [0.19444, 0.44444, 0.01389, 0, 0.46111],
                  "122": [0, 0.44444, 0, 0, 0.43472],
                  "126": [0.35, 0.32659, 0, 0, 0.5],
                  "168": [0, 0.67937, 0, 0, 0.5],
                  "176": [0, 0.69444, 0, 0, 0.66667],
                  "184": [0.17014, 0, 0, 0, 0.44445],
                  "305": [0, 0.44444, 0, 0, 0.23889],
                  "567": [0.19444, 0.44444, 0, 0, 0.26667],
                  "710": [0, 0.69444, 0, 0, 0.5],
                  "711": [0, 0.63194, 0, 0, 0.5],
                  "713": [0, 0.60889, 0, 0, 0.5],
                  "714": [0, 0.69444, 0, 0, 0.5],
                  "715": [0, 0.69444, 0, 0, 0.5],
                  "728": [0, 0.69444, 0, 0, 0.5],
                  "729": [0, 0.67937, 0, 0, 0.27778],
                  "730": [0, 0.69444, 0, 0, 0.66667],
                  "732": [0, 0.67659, 0, 0, 0.5],
                  "733": [0, 0.69444, 0, 0, 0.5],
                  "915": [0, 0.69444, 0, 0, 0.54167],
                  "916": [0, 0.69444, 0, 0, 0.83334],
                  "920": [0, 0.69444, 0, 0, 0.77778],
                  "923": [0, 0.69444, 0, 0, 0.61111],
                  "926": [0, 0.69444, 0, 0, 0.66667],
                  "928": [0, 0.69444, 0, 0, 0.70834],
                  "931": [0, 0.69444, 0, 0, 0.72222],
                  "933": [0, 0.69444, 0, 0, 0.77778],
                  "934": [0, 0.69444, 0, 0, 0.72222],
                  "936": [0, 0.69444, 0, 0, 0.77778],
                  "937": [0, 0.69444, 0, 0, 0.72222],
                  "8211": [0, 0.44444, 0.02778, 0, 0.5],
                  "8212": [0, 0.44444, 0.02778, 0, 1],
                  "8216": [0, 0.69444, 0, 0, 0.27778],
                  "8217": [0, 0.69444, 0, 0, 0.27778],
                  "8220": [0, 0.69444, 0, 0, 0.5],
                  "8221": [0, 0.69444, 0, 0, 0.5]
                },
                "Script-Regular": {
                  "65": [0, 0.7, 0.22925, 0, 0.80253],
                  "66": [0, 0.7, 0.04087, 0, 0.90757],
                  "67": [0, 0.7, 0.1689, 0, 0.66619],
                  "68": [0, 0.7, 0.09371, 0, 0.77443],
                  "69": [0, 0.7, 0.18583, 0, 0.56162],
                  "70": [0, 0.7, 0.13634, 0, 0.89544],
                  "71": [0, 0.7, 0.17322, 0, 0.60961],
                  "72": [0, 0.7, 0.29694, 0, 0.96919],
                  "73": [0, 0.7, 0.19189, 0, 0.80907],
                  "74": [0.27778, 0.7, 0.19189, 0, 1.05159],
                  "75": [0, 0.7, 0.31259, 0, 0.91364],
                  "76": [0, 0.7, 0.19189, 0, 0.87373],
                  "77": [0, 0.7, 0.15981, 0, 1.08031],
                  "78": [0, 0.7, 0.3525, 0, 0.9015],
                  "79": [0, 0.7, 0.08078, 0, 0.73787],
                  "80": [0, 0.7, 0.08078, 0, 1.01262],
                  "81": [0, 0.7, 0.03305, 0, 0.88282],
                  "82": [0, 0.7, 0.06259, 0, 0.85],
                  "83": [0, 0.7, 0.19189, 0, 0.86767],
                  "84": [0, 0.7, 0.29087, 0, 0.74697],
                  "85": [0, 0.7, 0.25815, 0, 0.79996],
                  "86": [0, 0.7, 0.27523, 0, 0.62204],
                  "87": [0, 0.7, 0.27523, 0, 0.80532],
                  "88": [0, 0.7, 0.26006, 0, 0.94445],
                  "89": [0, 0.7, 0.2939, 0, 0.70961],
                  "90": [0, 0.7, 0.24037, 0, 0.8212]
                },
                "Size1-Regular": {
                  "40": [0.35001, 0.85, 0, 0, 0.45834],
                  "41": [0.35001, 0.85, 0, 0, 0.45834],
                  "47": [0.35001, 0.85, 0, 0, 0.57778],
                  "91": [0.35001, 0.85, 0, 0, 0.41667],
                  "92": [0.35001, 0.85, 0, 0, 0.57778],
                  "93": [0.35001, 0.85, 0, 0, 0.41667],
                  "123": [0.35001, 0.85, 0, 0, 0.58334],
                  "125": [0.35001, 0.85, 0, 0, 0.58334],
                  "710": [0, 0.72222, 0, 0, 0.55556],
                  "732": [0, 0.72222, 0, 0, 0.55556],
                  "770": [0, 0.72222, 0, 0, 0.55556],
                  "771": [0, 0.72222, 0, 0, 0.55556],
                  "8214": [-99e-5, 0.601, 0, 0, 0.77778],
                  "8593": [1e-5, 0.6, 0, 0, 0.66667],
                  "8595": [1e-5, 0.6, 0, 0, 0.66667],
                  "8657": [1e-5, 0.6, 0, 0, 0.77778],
                  "8659": [1e-5, 0.6, 0, 0, 0.77778],
                  "8719": [0.25001, 0.75, 0, 0, 0.94445],
                  "8720": [0.25001, 0.75, 0, 0, 0.94445],
                  "8721": [0.25001, 0.75, 0, 0, 1.05556],
                  "8730": [0.35001, 0.85, 0, 0, 1],
                  "8739": [-599e-5, 0.606, 0, 0, 0.33333],
                  "8741": [-599e-5, 0.606, 0, 0, 0.55556],
                  "8747": [0.30612, 0.805, 0.19445, 0, 0.47222],
                  "8748": [0.306, 0.805, 0.19445, 0, 0.47222],
                  "8749": [0.306, 0.805, 0.19445, 0, 0.47222],
                  "8750": [0.30612, 0.805, 0.19445, 0, 0.47222],
                  "8896": [0.25001, 0.75, 0, 0, 0.83334],
                  "8897": [0.25001, 0.75, 0, 0, 0.83334],
                  "8898": [0.25001, 0.75, 0, 0, 0.83334],
                  "8899": [0.25001, 0.75, 0, 0, 0.83334],
                  "8968": [0.35001, 0.85, 0, 0, 0.47222],
                  "8969": [0.35001, 0.85, 0, 0, 0.47222],
                  "8970": [0.35001, 0.85, 0, 0, 0.47222],
                  "8971": [0.35001, 0.85, 0, 0, 0.47222],
                  "9168": [-99e-5, 0.601, 0, 0, 0.66667],
                  "10216": [0.35001, 0.85, 0, 0, 0.47222],
                  "10217": [0.35001, 0.85, 0, 0, 0.47222],
                  "10752": [0.25001, 0.75, 0, 0, 1.11111],
                  "10753": [0.25001, 0.75, 0, 0, 1.11111],
                  "10754": [0.25001, 0.75, 0, 0, 1.11111],
                  "10756": [0.25001, 0.75, 0, 0, 0.83334],
                  "10758": [0.25001, 0.75, 0, 0, 0.83334]
                },
                "Size2-Regular": {
                  "40": [0.65002, 1.15, 0, 0, 0.59722],
                  "41": [0.65002, 1.15, 0, 0, 0.59722],
                  "47": [0.65002, 1.15, 0, 0, 0.81111],
                  "91": [0.65002, 1.15, 0, 0, 0.47222],
                  "92": [0.65002, 1.15, 0, 0, 0.81111],
                  "93": [0.65002, 1.15, 0, 0, 0.47222],
                  "123": [0.65002, 1.15, 0, 0, 0.66667],
                  "125": [0.65002, 1.15, 0, 0, 0.66667],
                  "710": [0, 0.75, 0, 0, 1],
                  "732": [0, 0.75, 0, 0, 1],
                  "770": [0, 0.75, 0, 0, 1],
                  "771": [0, 0.75, 0, 0, 1],
                  "8719": [0.55001, 1.05, 0, 0, 1.27778],
                  "8720": [0.55001, 1.05, 0, 0, 1.27778],
                  "8721": [0.55001, 1.05, 0, 0, 1.44445],
                  "8730": [0.65002, 1.15, 0, 0, 1],
                  "8747": [0.86225, 1.36, 0.44445, 0, 0.55556],
                  "8748": [0.862, 1.36, 0.44445, 0, 0.55556],
                  "8749": [0.862, 1.36, 0.44445, 0, 0.55556],
                  "8750": [0.86225, 1.36, 0.44445, 0, 0.55556],
                  "8896": [0.55001, 1.05, 0, 0, 1.11111],
                  "8897": [0.55001, 1.05, 0, 0, 1.11111],
                  "8898": [0.55001, 1.05, 0, 0, 1.11111],
                  "8899": [0.55001, 1.05, 0, 0, 1.11111],
                  "8968": [0.65002, 1.15, 0, 0, 0.52778],
                  "8969": [0.65002, 1.15, 0, 0, 0.52778],
                  "8970": [0.65002, 1.15, 0, 0, 0.52778],
                  "8971": [0.65002, 1.15, 0, 0, 0.52778],
                  "10216": [0.65002, 1.15, 0, 0, 0.61111],
                  "10217": [0.65002, 1.15, 0, 0, 0.61111],
                  "10752": [0.55001, 1.05, 0, 0, 1.51112],
                  "10753": [0.55001, 1.05, 0, 0, 1.51112],
                  "10754": [0.55001, 1.05, 0, 0, 1.51112],
                  "10756": [0.55001, 1.05, 0, 0, 1.11111],
                  "10758": [0.55001, 1.05, 0, 0, 1.11111]
                },
                "Size3-Regular": {
                  "40": [0.95003, 1.45, 0, 0, 0.73611],
                  "41": [0.95003, 1.45, 0, 0, 0.73611],
                  "47": [0.95003, 1.45, 0, 0, 1.04445],
                  "91": [0.95003, 1.45, 0, 0, 0.52778],
                  "92": [0.95003, 1.45, 0, 0, 1.04445],
                  "93": [0.95003, 1.45, 0, 0, 0.52778],
                  "123": [0.95003, 1.45, 0, 0, 0.75],
                  "125": [0.95003, 1.45, 0, 0, 0.75],
                  "710": [0, 0.75, 0, 0, 1.44445],
                  "732": [0, 0.75, 0, 0, 1.44445],
                  "770": [0, 0.75, 0, 0, 1.44445],
                  "771": [0, 0.75, 0, 0, 1.44445],
                  "8730": [0.95003, 1.45, 0, 0, 1],
                  "8968": [0.95003, 1.45, 0, 0, 0.58334],
                  "8969": [0.95003, 1.45, 0, 0, 0.58334],
                  "8970": [0.95003, 1.45, 0, 0, 0.58334],
                  "8971": [0.95003, 1.45, 0, 0, 0.58334],
                  "10216": [0.95003, 1.45, 0, 0, 0.75],
                  "10217": [0.95003, 1.45, 0, 0, 0.75]
                },
                "Size4-Regular": {
                  "40": [1.25003, 1.75, 0, 0, 0.79167],
                  "41": [1.25003, 1.75, 0, 0, 0.79167],
                  "47": [1.25003, 1.75, 0, 0, 1.27778],
                  "91": [1.25003, 1.75, 0, 0, 0.58334],
                  "92": [1.25003, 1.75, 0, 0, 1.27778],
                  "93": [1.25003, 1.75, 0, 0, 0.58334],
                  "123": [1.25003, 1.75, 0, 0, 0.80556],
                  "125": [1.25003, 1.75, 0, 0, 0.80556],
                  "710": [0, 0.825, 0, 0, 1.8889],
                  "732": [0, 0.825, 0, 0, 1.8889],
                  "770": [0, 0.825, 0, 0, 1.8889],
                  "771": [0, 0.825, 0, 0, 1.8889],
                  "8730": [1.25003, 1.75, 0, 0, 1],
                  "8968": [1.25003, 1.75, 0, 0, 0.63889],
                  "8969": [1.25003, 1.75, 0, 0, 0.63889],
                  "8970": [1.25003, 1.75, 0, 0, 0.63889],
                  "8971": [1.25003, 1.75, 0, 0, 0.63889],
                  "9115": [0.64502, 1.155, 0, 0, 0.875],
                  "9116": [1e-5, 0.6, 0, 0, 0.875],
                  "9117": [0.64502, 1.155, 0, 0, 0.875],
                  "9118": [0.64502, 1.155, 0, 0, 0.875],
                  "9119": [1e-5, 0.6, 0, 0, 0.875],
                  "9120": [0.64502, 1.155, 0, 0, 0.875],
                  "9121": [0.64502, 1.155, 0, 0, 0.66667],
                  "9122": [-99e-5, 0.601, 0, 0, 0.66667],
                  "9123": [0.64502, 1.155, 0, 0, 0.66667],
                  "9124": [0.64502, 1.155, 0, 0, 0.66667],
                  "9125": [-99e-5, 0.601, 0, 0, 0.66667],
                  "9126": [0.64502, 1.155, 0, 0, 0.66667],
                  "9127": [1e-5, 0.9, 0, 0, 0.88889],
                  "9128": [0.65002, 1.15, 0, 0, 0.88889],
                  "9129": [0.90001, 0, 0, 0, 0.88889],
                  "9130": [0, 0.3, 0, 0, 0.88889],
                  "9131": [1e-5, 0.9, 0, 0, 0.88889],
                  "9132": [0.65002, 1.15, 0, 0, 0.88889],
                  "9133": [0.90001, 0, 0, 0, 0.88889],
                  "9143": [0.88502, 0.915, 0, 0, 1.05556],
                  "10216": [1.25003, 1.75, 0, 0, 0.80556],
                  "10217": [1.25003, 1.75, 0, 0, 0.80556],
                  "57344": [-499e-5, 0.605, 0, 0, 1.05556],
                  "57345": [-499e-5, 0.605, 0, 0, 1.05556],
                  "57680": [0, 0.12, 0, 0, 0.45],
                  "57681": [0, 0.12, 0, 0, 0.45],
                  "57682": [0, 0.12, 0, 0, 0.45],
                  "57683": [0, 0.12, 0, 0, 0.45]
                },
                "Typewriter-Regular": {
                  "32": [0, 0, 0, 0, 0.525],
                  "33": [0, 0.61111, 0, 0, 0.525],
                  "34": [0, 0.61111, 0, 0, 0.525],
                  "35": [0, 0.61111, 0, 0, 0.525],
                  "36": [0.08333, 0.69444, 0, 0, 0.525],
                  "37": [0.08333, 0.69444, 0, 0, 0.525],
                  "38": [0, 0.61111, 0, 0, 0.525],
                  "39": [0, 0.61111, 0, 0, 0.525],
                  "40": [0.08333, 0.69444, 0, 0, 0.525],
                  "41": [0.08333, 0.69444, 0, 0, 0.525],
                  "42": [0, 0.52083, 0, 0, 0.525],
                  "43": [-0.08056, 0.53055, 0, 0, 0.525],
                  "44": [0.13889, 0.125, 0, 0, 0.525],
                  "45": [-0.08056, 0.53055, 0, 0, 0.525],
                  "46": [0, 0.125, 0, 0, 0.525],
                  "47": [0.08333, 0.69444, 0, 0, 0.525],
                  "48": [0, 0.61111, 0, 0, 0.525],
                  "49": [0, 0.61111, 0, 0, 0.525],
                  "50": [0, 0.61111, 0, 0, 0.525],
                  "51": [0, 0.61111, 0, 0, 0.525],
                  "52": [0, 0.61111, 0, 0, 0.525],
                  "53": [0, 0.61111, 0, 0, 0.525],
                  "54": [0, 0.61111, 0, 0, 0.525],
                  "55": [0, 0.61111, 0, 0, 0.525],
                  "56": [0, 0.61111, 0, 0, 0.525],
                  "57": [0, 0.61111, 0, 0, 0.525],
                  "58": [0, 0.43056, 0, 0, 0.525],
                  "59": [0.13889, 0.43056, 0, 0, 0.525],
                  "60": [-0.05556, 0.55556, 0, 0, 0.525],
                  "61": [-0.19549, 0.41562, 0, 0, 0.525],
                  "62": [-0.05556, 0.55556, 0, 0, 0.525],
                  "63": [0, 0.61111, 0, 0, 0.525],
                  "64": [0, 0.61111, 0, 0, 0.525],
                  "65": [0, 0.61111, 0, 0, 0.525],
                  "66": [0, 0.61111, 0, 0, 0.525],
                  "67": [0, 0.61111, 0, 0, 0.525],
                  "68": [0, 0.61111, 0, 0, 0.525],
                  "69": [0, 0.61111, 0, 0, 0.525],
                  "70": [0, 0.61111, 0, 0, 0.525],
                  "71": [0, 0.61111, 0, 0, 0.525],
                  "72": [0, 0.61111, 0, 0, 0.525],
                  "73": [0, 0.61111, 0, 0, 0.525],
                  "74": [0, 0.61111, 0, 0, 0.525],
                  "75": [0, 0.61111, 0, 0, 0.525],
                  "76": [0, 0.61111, 0, 0, 0.525],
                  "77": [0, 0.61111, 0, 0, 0.525],
                  "78": [0, 0.61111, 0, 0, 0.525],
                  "79": [0, 0.61111, 0, 0, 0.525],
                  "80": [0, 0.61111, 0, 0, 0.525],
                  "81": [0.13889, 0.61111, 0, 0, 0.525],
                  "82": [0, 0.61111, 0, 0, 0.525],
                  "83": [0, 0.61111, 0, 0, 0.525],
                  "84": [0, 0.61111, 0, 0, 0.525],
                  "85": [0, 0.61111, 0, 0, 0.525],
                  "86": [0, 0.61111, 0, 0, 0.525],
                  "87": [0, 0.61111, 0, 0, 0.525],
                  "88": [0, 0.61111, 0, 0, 0.525],
                  "89": [0, 0.61111, 0, 0, 0.525],
                  "90": [0, 0.61111, 0, 0, 0.525],
                  "91": [0.08333, 0.69444, 0, 0, 0.525],
                  "92": [0.08333, 0.69444, 0, 0, 0.525],
                  "93": [0.08333, 0.69444, 0, 0, 0.525],
                  "94": [0, 0.61111, 0, 0, 0.525],
                  "95": [0.09514, 0, 0, 0, 0.525],
                  "96": [0, 0.61111, 0, 0, 0.525],
                  "97": [0, 0.43056, 0, 0, 0.525],
                  "98": [0, 0.61111, 0, 0, 0.525],
                  "99": [0, 0.43056, 0, 0, 0.525],
                  "100": [0, 0.61111, 0, 0, 0.525],
                  "101": [0, 0.43056, 0, 0, 0.525],
                  "102": [0, 0.61111, 0, 0, 0.525],
                  "103": [0.22222, 0.43056, 0, 0, 0.525],
                  "104": [0, 0.61111, 0, 0, 0.525],
                  "105": [0, 0.61111, 0, 0, 0.525],
                  "106": [0.22222, 0.61111, 0, 0, 0.525],
                  "107": [0, 0.61111, 0, 0, 0.525],
                  "108": [0, 0.61111, 0, 0, 0.525],
                  "109": [0, 0.43056, 0, 0, 0.525],
                  "110": [0, 0.43056, 0, 0, 0.525],
                  "111": [0, 0.43056, 0, 0, 0.525],
                  "112": [0.22222, 0.43056, 0, 0, 0.525],
                  "113": [0.22222, 0.43056, 0, 0, 0.525],
                  "114": [0, 0.43056, 0, 0, 0.525],
                  "115": [0, 0.43056, 0, 0, 0.525],
                  "116": [0, 0.55358, 0, 0, 0.525],
                  "117": [0, 0.43056, 0, 0, 0.525],
                  "118": [0, 0.43056, 0, 0, 0.525],
                  "119": [0, 0.43056, 0, 0, 0.525],
                  "120": [0, 0.43056, 0, 0, 0.525],
                  "121": [0.22222, 0.43056, 0, 0, 0.525],
                  "122": [0, 0.43056, 0, 0, 0.525],
                  "123": [0.08333, 0.69444, 0, 0, 0.525],
                  "124": [0.08333, 0.69444, 0, 0, 0.525],
                  "125": [0.08333, 0.69444, 0, 0, 0.525],
                  "126": [0, 0.61111, 0, 0, 0.525],
                  "127": [0, 0.61111, 0, 0, 0.525],
                  "160": [0, 0, 0, 0, 0.525],
                  "176": [0, 0.61111, 0, 0, 0.525],
                  "184": [0.19445, 0, 0, 0, 0.525],
                  "305": [0, 0.43056, 0, 0, 0.525],
                  "567": [0.22222, 0.43056, 0, 0, 0.525],
                  "711": [0, 0.56597, 0, 0, 0.525],
                  "713": [0, 0.56555, 0, 0, 0.525],
                  "714": [0, 0.61111, 0, 0, 0.525],
                  "715": [0, 0.61111, 0, 0, 0.525],
                  "728": [0, 0.61111, 0, 0, 0.525],
                  "730": [0, 0.61111, 0, 0, 0.525],
                  "770": [0, 0.61111, 0, 0, 0.525],
                  "771": [0, 0.61111, 0, 0, 0.525],
                  "776": [0, 0.61111, 0, 0, 0.525],
                  "915": [0, 0.61111, 0, 0, 0.525],
                  "916": [0, 0.61111, 0, 0, 0.525],
                  "920": [0, 0.61111, 0, 0, 0.525],
                  "923": [0, 0.61111, 0, 0, 0.525],
                  "926": [0, 0.61111, 0, 0, 0.525],
                  "928": [0, 0.61111, 0, 0, 0.525],
                  "931": [0, 0.61111, 0, 0, 0.525],
                  "933": [0, 0.61111, 0, 0, 0.525],
                  "934": [0, 0.61111, 0, 0, 0.525],
                  "936": [0, 0.61111, 0, 0, 0.525],
                  "937": [0, 0.61111, 0, 0, 0.525],
                  "8216": [0, 0.61111, 0, 0, 0.525],
                  "8217": [0, 0.61111, 0, 0, 0.525],
                  "8242": [0, 0.61111, 0, 0, 0.525],
                  "9251": [0.11111, 0.21944, 0, 0, 0.525]
                }
              };
              var sigmasAndXis = {
                slant: [0.25, 0.25, 0.25],
                // sigma1
                space: [0, 0, 0],
                // sigma2
                stretch: [0, 0, 0],
                // sigma3
                shrink: [0, 0, 0],
                // sigma4
                xHeight: [0.431, 0.431, 0.431],
                // sigma5
                quad: [1, 1.171, 1.472],
                // sigma6
                extraSpace: [0, 0, 0],
                // sigma7
                num1: [0.677, 0.732, 0.925],
                // sigma8
                num2: [0.394, 0.384, 0.387],
                // sigma9
                num3: [0.444, 0.471, 0.504],
                // sigma10
                denom1: [0.686, 0.752, 1.025],
                // sigma11
                denom2: [0.345, 0.344, 0.532],
                // sigma12
                sup1: [0.413, 0.503, 0.504],
                // sigma13
                sup2: [0.363, 0.431, 0.404],
                // sigma14
                sup3: [0.289, 0.286, 0.294],
                // sigma15
                sub1: [0.15, 0.143, 0.2],
                // sigma16
                sub2: [0.247, 0.286, 0.4],
                // sigma17
                supDrop: [0.386, 0.353, 0.494],
                // sigma18
                subDrop: [0.05, 0.071, 0.1],
                // sigma19
                delim1: [2.39, 1.7, 1.98],
                // sigma20
                delim2: [1.01, 1.157, 1.42],
                // sigma21
                axisHeight: [0.25, 0.25, 0.25],
                // sigma22
                // These font metrics are extracted from TeX by using tftopl on cmex10.tfm;
                // they correspond to the font parameters of the extension fonts (family 3).
                // See the TeXbook, page 441. In AMSTeX, the extension fonts scale; to
                // match cmex7, we'd use cmex7.tfm values for script and scriptscript
                // values.
                defaultRuleThickness: [0.04, 0.049, 0.049],
                // xi8; cmex7: 0.049
                bigOpSpacing1: [0.111, 0.111, 0.111],
                // xi9
                bigOpSpacing2: [0.166, 0.166, 0.166],
                // xi10
                bigOpSpacing3: [0.2, 0.2, 0.2],
                // xi11
                bigOpSpacing4: [0.6, 0.611, 0.611],
                // xi12; cmex7: 0.611
                bigOpSpacing5: [0.1, 0.143, 0.143],
                // xi13; cmex7: 0.143
                // The \sqrt rule width is taken from the height of the surd character.
                // Since we use the same font at all sizes, this thickness doesn't scale.
                sqrtRuleThickness: [0.04, 0.04, 0.04],
                // This value determines how large a pt is, for metrics which are defined
                // in terms of pts.
                // This value is also used in katex.less; if you change it make sure the
                // values match.
                ptPerEm: [10, 10, 10],
                // The space between adjacent `|` columns in an array definition. From
                // `\showthe\doublerulesep` in LaTeX. Equals 2.0 / ptPerEm.
                doubleRuleSep: [0.2, 0.2, 0.2],
                // The width of separator lines in {array} environments. From
                // `\showthe\arrayrulewidth` in LaTeX. Equals 0.4 / ptPerEm.
                arrayRuleWidth: [0.04, 0.04, 0.04],
                // Two values from LaTeX source2e:
                fboxsep: [0.3, 0.3, 0.3],
                //        3 pt / ptPerEm
                fboxrule: [0.04, 0.04, 0.04]
                // 0.4 pt / ptPerEm
              };
              var extraCharacterMap = {
                // Latin-1
                "\xC5": "A",
                "\xC7": "C",
                "\xD0": "D",
                "\xDE": "o",
                "\xE5": "a",
                "\xE7": "c",
                "\xF0": "d",
                "\xFE": "o",
                // Cyrillic
                "\u0410": "A",
                "\u0411": "B",
                "\u0412": "B",
                "\u0413": "F",
                "\u0414": "A",
                "\u0415": "E",
                "\u0416": "K",
                "\u0417": "3",
                "\u0418": "N",
                "\u0419": "N",
                "\u041A": "K",
                "\u041B": "N",
                "\u041C": "M",
                "\u041D": "H",
                "\u041E": "O",
                "\u041F": "N",
                "\u0420": "P",
                "\u0421": "C",
                "\u0422": "T",
                "\u0423": "y",
                "\u0424": "O",
                "\u0425": "X",
                "\u0426": "U",
                "\u0427": "h",
                "\u0428": "W",
                "\u0429": "W",
                "\u042A": "B",
                "\u042B": "X",
                "\u042C": "B",
                "\u042D": "3",
                "\u042E": "X",
                "\u042F": "R",
                "\u0430": "a",
                "\u0431": "b",
                "\u0432": "a",
                "\u0433": "r",
                "\u0434": "y",
                "\u0435": "e",
                "\u0436": "m",
                "\u0437": "e",
                "\u0438": "n",
                "\u0439": "n",
                "\u043A": "n",
                "\u043B": "n",
                "\u043C": "m",
                "\u043D": "n",
                "\u043E": "o",
                "\u043F": "n",
                "\u0440": "p",
                "\u0441": "c",
                "\u0442": "o",
                "\u0443": "y",
                "\u0444": "b",
                "\u0445": "x",
                "\u0446": "n",
                "\u0447": "n",
                "\u0448": "w",
                "\u0449": "w",
                "\u044A": "a",
                "\u044B": "m",
                "\u044C": "a",
                "\u044D": "e",
                "\u044E": "m",
                "\u044F": "r"
              };
              function setFontMetrics(fontName, metrics) {
                fontMetricsData[fontName] = metrics;
              }
              function getCharacterMetrics(character, font, mode) {
                if (!fontMetricsData[font]) {
                  throw new Error("Font metrics not found for font: " + font + ".");
                }
                var ch = character.charCodeAt(0);
                var metrics = fontMetricsData[font][ch];
                if (!metrics && character[0] in extraCharacterMap) {
                  ch = extraCharacterMap[character[0]].charCodeAt(0);
                  metrics = fontMetricsData[font][ch];
                }
                if (!metrics && mode === "text") {
                  if (supportedCodepoint(ch)) {
                    metrics = fontMetricsData[font][77];
                  }
                }
                if (metrics) {
                  return {
                    depth: metrics[0],
                    height: metrics[1],
                    italic: metrics[2],
                    skew: metrics[3],
                    width: metrics[4]
                  };
                }
              }
              var fontMetricsBySizeIndex = {};
              function getGlobalMetrics(size) {
                var sizeIndex;
                if (size >= 5) {
                  sizeIndex = 0;
                } else if (size >= 3) {
                  sizeIndex = 1;
                } else {
                  sizeIndex = 2;
                }
                if (!fontMetricsBySizeIndex[sizeIndex]) {
                  var metrics = fontMetricsBySizeIndex[sizeIndex] = {
                    cssEmPerMu: sigmasAndXis.quad[sizeIndex] / 18
                  };
                  for (var key in sigmasAndXis) {
                    if (sigmasAndXis.hasOwnProperty(key)) {
                      metrics[key] = sigmasAndXis[key][sizeIndex];
                    }
                  }
                }
                return fontMetricsBySizeIndex[sizeIndex];
              }
              var ATOMS = {
                "bin": 1,
                "close": 1,
                "inner": 1,
                "open": 1,
                "punct": 1,
                "rel": 1
              };
              var NON_ATOMS = {
                "accent-token": 1,
                "mathord": 1,
                "op-token": 1,
                "spacing": 1,
                "textord": 1
              };
              var symbols = {
                "math": {},
                "text": {}
              };
              var src_symbols = symbols;
              function defineSymbol(mode, font, group, replace, name, acceptUnicodeChar) {
                symbols[mode][name] = {
                  font,
                  group,
                  replace
                };
                if (acceptUnicodeChar && replace) {
                  symbols[mode][replace] = symbols[mode][name];
                }
              }
              var symbols_math = "math";
              var symbols_text = "text";
              var main = "main";
              var ams = "ams";
              var symbols_accent = "accent-token";
              var bin = "bin";
              var symbols_close = "close";
              var symbols_inner = "inner";
              var mathord = "mathord";
              var op = "op-token";
              var symbols_open = "open";
              var punct = "punct";
              var rel = "rel";
              var symbols_spacing = "spacing";
              var symbols_textord = "textord";
              defineSymbol(symbols_math, main, rel, "\u2261", "\\equiv", true);
              defineSymbol(symbols_math, main, rel, "\u227A", "\\prec", true);
              defineSymbol(symbols_math, main, rel, "\u227B", "\\succ", true);
              defineSymbol(symbols_math, main, rel, "\u223C", "\\sim", true);
              defineSymbol(symbols_math, main, rel, "\u22A5", "\\perp");
              defineSymbol(symbols_math, main, rel, "\u2AAF", "\\preceq", true);
              defineSymbol(symbols_math, main, rel, "\u2AB0", "\\succeq", true);
              defineSymbol(symbols_math, main, rel, "\u2243", "\\simeq", true);
              defineSymbol(symbols_math, main, rel, "\u2223", "\\mid", true);
              defineSymbol(symbols_math, main, rel, "\u226A", "\\ll", true);
              defineSymbol(symbols_math, main, rel, "\u226B", "\\gg", true);
              defineSymbol(symbols_math, main, rel, "\u224D", "\\asymp", true);
              defineSymbol(symbols_math, main, rel, "\u2225", "\\parallel");
              defineSymbol(symbols_math, main, rel, "\u22C8", "\\bowtie", true);
              defineSymbol(symbols_math, main, rel, "\u2323", "\\smile", true);
              defineSymbol(symbols_math, main, rel, "\u2291", "\\sqsubseteq", true);
              defineSymbol(symbols_math, main, rel, "\u2292", "\\sqsupseteq", true);
              defineSymbol(symbols_math, main, rel, "\u2250", "\\doteq", true);
              defineSymbol(symbols_math, main, rel, "\u2322", "\\frown", true);
              defineSymbol(symbols_math, main, rel, "\u220B", "\\ni", true);
              defineSymbol(symbols_math, main, rel, "\u221D", "\\propto", true);
              defineSymbol(symbols_math, main, rel, "\u22A2", "\\vdash", true);
              defineSymbol(symbols_math, main, rel, "\u22A3", "\\dashv", true);
              defineSymbol(symbols_math, main, rel, "\u220B", "\\owns");
              defineSymbol(symbols_math, main, punct, ".", "\\ldotp");
              defineSymbol(symbols_math, main, punct, "\u22C5", "\\cdotp");
              defineSymbol(symbols_math, main, symbols_textord, "#", "\\#");
              defineSymbol(symbols_text, main, symbols_textord, "#", "\\#");
              defineSymbol(symbols_math, main, symbols_textord, "&", "\\&");
              defineSymbol(symbols_text, main, symbols_textord, "&", "\\&");
              defineSymbol(symbols_math, main, symbols_textord, "\u2135", "\\aleph", true);
              defineSymbol(symbols_math, main, symbols_textord, "\u2200", "\\forall", true);
              defineSymbol(symbols_math, main, symbols_textord, "\u210F", "\\hbar", true);
              defineSymbol(symbols_math, main, symbols_textord, "\u2203", "\\exists", true);
              defineSymbol(symbols_math, main, symbols_textord, "\u2207", "\\nabla", true);
              defineSymbol(symbols_math, main, symbols_textord, "\u266D", "\\flat", true);
              defineSymbol(symbols_math, main, symbols_textord, "\u2113", "\\ell", true);
              defineSymbol(symbols_math, main, symbols_textord, "\u266E", "\\natural", true);
              defineSymbol(symbols_math, main, symbols_textord, "\u2663", "\\clubsuit", true);
              defineSymbol(symbols_math, main, symbols_textord, "\u2118", "\\wp", true);
              defineSymbol(symbols_math, main, symbols_textord, "\u266F", "\\sharp", true);
              defineSymbol(symbols_math, main, symbols_textord, "\u2662", "\\diamondsuit", true);
              defineSymbol(symbols_math, main, symbols_textord, "\u211C", "\\Re", true);
              defineSymbol(symbols_math, main, symbols_textord, "\u2661", "\\heartsuit", true);
              defineSymbol(symbols_math, main, symbols_textord, "\u2111", "\\Im", true);
              defineSymbol(symbols_math, main, symbols_textord, "\u2660", "\\spadesuit", true);
              defineSymbol(symbols_text, main, symbols_textord, "\xA7", "\\S", true);
              defineSymbol(symbols_text, main, symbols_textord, "\xB6", "\\P", true);
              defineSymbol(symbols_math, main, symbols_textord, "\u2020", "\\dag");
              defineSymbol(symbols_text, main, symbols_textord, "\u2020", "\\dag");
              defineSymbol(symbols_text, main, symbols_textord, "\u2020", "\\textdagger");
              defineSymbol(symbols_math, main, symbols_textord, "\u2021", "\\ddag");
              defineSymbol(symbols_text, main, symbols_textord, "\u2021", "\\ddag");
              defineSymbol(symbols_text, main, symbols_textord, "\u2021", "\\textdaggerdbl");
              defineSymbol(symbols_math, main, symbols_close, "\u23B1", "\\rmoustache", true);
              defineSymbol(symbols_math, main, symbols_open, "\u23B0", "\\lmoustache", true);
              defineSymbol(symbols_math, main, symbols_close, "\u27EF", "\\rgroup", true);
              defineSymbol(symbols_math, main, symbols_open, "\u27EE", "\\lgroup", true);
              defineSymbol(symbols_math, main, bin, "\u2213", "\\mp", true);
              defineSymbol(symbols_math, main, bin, "\u2296", "\\ominus", true);
              defineSymbol(symbols_math, main, bin, "\u228E", "\\uplus", true);
              defineSymbol(symbols_math, main, bin, "\u2293", "\\sqcap", true);
              defineSymbol(symbols_math, main, bin, "\u2217", "\\ast");
              defineSymbol(symbols_math, main, bin, "\u2294", "\\sqcup", true);
              defineSymbol(symbols_math, main, bin, "\u25EF", "\\bigcirc");
              defineSymbol(symbols_math, main, bin, "\u2219", "\\bullet");
              defineSymbol(symbols_math, main, bin, "\u2021", "\\ddagger");
              defineSymbol(symbols_math, main, bin, "\u2240", "\\wr", true);
              defineSymbol(symbols_math, main, bin, "\u2A3F", "\\amalg");
              defineSymbol(symbols_math, main, bin, "&", "\\And");
              defineSymbol(symbols_math, main, rel, "\u27F5", "\\longleftarrow", true);
              defineSymbol(symbols_math, main, rel, "\u21D0", "\\Leftarrow", true);
              defineSymbol(symbols_math, main, rel, "\u27F8", "\\Longleftarrow", true);
              defineSymbol(symbols_math, main, rel, "\u27F6", "\\longrightarrow", true);
              defineSymbol(symbols_math, main, rel, "\u21D2", "\\Rightarrow", true);
              defineSymbol(symbols_math, main, rel, "\u27F9", "\\Longrightarrow", true);
              defineSymbol(symbols_math, main, rel, "\u2194", "\\leftrightarrow", true);
              defineSymbol(symbols_math, main, rel, "\u27F7", "\\longleftrightarrow", true);
              defineSymbol(symbols_math, main, rel, "\u21D4", "\\Leftrightarrow", true);
              defineSymbol(symbols_math, main, rel, "\u27FA", "\\Longleftrightarrow", true);
              defineSymbol(symbols_math, main, rel, "\u21A6", "\\mapsto", true);
              defineSymbol(symbols_math, main, rel, "\u27FC", "\\longmapsto", true);
              defineSymbol(symbols_math, main, rel, "\u2197", "\\nearrow", true);
              defineSymbol(symbols_math, main, rel, "\u21A9", "\\hookleftarrow", true);
              defineSymbol(symbols_math, main, rel, "\u21AA", "\\hookrightarrow", true);
              defineSymbol(symbols_math, main, rel, "\u2198", "\\searrow", true);
              defineSymbol(symbols_math, main, rel, "\u21BC", "\\leftharpoonup", true);
              defineSymbol(symbols_math, main, rel, "\u21C0", "\\rightharpoonup", true);
              defineSymbol(symbols_math, main, rel, "\u2199", "\\swarrow", true);
              defineSymbol(symbols_math, main, rel, "\u21BD", "\\leftharpoondown", true);
              defineSymbol(symbols_math, main, rel, "\u21C1", "\\rightharpoondown", true);
              defineSymbol(symbols_math, main, rel, "\u2196", "\\nwarrow", true);
              defineSymbol(symbols_math, main, rel, "\u21CC", "\\rightleftharpoons", true);
              defineSymbol(symbols_math, ams, rel, "\u226E", "\\nless", true);
              defineSymbol(symbols_math, ams, rel, "\uE010", "\\@nleqslant");
              defineSymbol(symbols_math, ams, rel, "\uE011", "\\@nleqq");
              defineSymbol(symbols_math, ams, rel, "\u2A87", "\\lneq", true);
              defineSymbol(symbols_math, ams, rel, "\u2268", "\\lneqq", true);
              defineSymbol(symbols_math, ams, rel, "\uE00C", "\\@lvertneqq");
              defineSymbol(symbols_math, ams, rel, "\u22E6", "\\lnsim", true);
              defineSymbol(symbols_math, ams, rel, "\u2A89", "\\lnapprox", true);
              defineSymbol(symbols_math, ams, rel, "\u2280", "\\nprec", true);
              defineSymbol(symbols_math, ams, rel, "\u22E0", "\\npreceq", true);
              defineSymbol(symbols_math, ams, rel, "\u22E8", "\\precnsim", true);
              defineSymbol(symbols_math, ams, rel, "\u2AB9", "\\precnapprox", true);
              defineSymbol(symbols_math, ams, rel, "\u2241", "\\nsim", true);
              defineSymbol(symbols_math, ams, rel, "\uE006", "\\@nshortmid");
              defineSymbol(symbols_math, ams, rel, "\u2224", "\\nmid", true);
              defineSymbol(symbols_math, ams, rel, "\u22AC", "\\nvdash", true);
              defineSymbol(symbols_math, ams, rel, "\u22AD", "\\nvDash", true);
              defineSymbol(symbols_math, ams, rel, "\u22EA", "\\ntriangleleft");
              defineSymbol(symbols_math, ams, rel, "\u22EC", "\\ntrianglelefteq", true);
              defineSymbol(symbols_math, ams, rel, "\u228A", "\\subsetneq", true);
              defineSymbol(symbols_math, ams, rel, "\uE01A", "\\@varsubsetneq");
              defineSymbol(symbols_math, ams, rel, "\u2ACB", "\\subsetneqq", true);
              defineSymbol(symbols_math, ams, rel, "\uE017", "\\@varsubsetneqq");
              defineSymbol(symbols_math, ams, rel, "\u226F", "\\ngtr", true);
              defineSymbol(symbols_math, ams, rel, "\uE00F", "\\@ngeqslant");
              defineSymbol(symbols_math, ams, rel, "\uE00E", "\\@ngeqq");
              defineSymbol(symbols_math, ams, rel, "\u2A88", "\\gneq", true);
              defineSymbol(symbols_math, ams, rel, "\u2269", "\\gneqq", true);
              defineSymbol(symbols_math, ams, rel, "\uE00D", "\\@gvertneqq");
              defineSymbol(symbols_math, ams, rel, "\u22E7", "\\gnsim", true);
              defineSymbol(symbols_math, ams, rel, "\u2A8A", "\\gnapprox", true);
              defineSymbol(symbols_math, ams, rel, "\u2281", "\\nsucc", true);
              defineSymbol(symbols_math, ams, rel, "\u22E1", "\\nsucceq", true);
              defineSymbol(symbols_math, ams, rel, "\u22E9", "\\succnsim", true);
              defineSymbol(symbols_math, ams, rel, "\u2ABA", "\\succnapprox", true);
              defineSymbol(symbols_math, ams, rel, "\u2246", "\\ncong", true);
              defineSymbol(symbols_math, ams, rel, "\uE007", "\\@nshortparallel");
              defineSymbol(symbols_math, ams, rel, "\u2226", "\\nparallel", true);
              defineSymbol(symbols_math, ams, rel, "\u22AF", "\\nVDash", true);
              defineSymbol(symbols_math, ams, rel, "\u22EB", "\\ntriangleright");
              defineSymbol(symbols_math, ams, rel, "\u22ED", "\\ntrianglerighteq", true);
              defineSymbol(symbols_math, ams, rel, "\uE018", "\\@nsupseteqq");
              defineSymbol(symbols_math, ams, rel, "\u228B", "\\supsetneq", true);
              defineSymbol(symbols_math, ams, rel, "\uE01B", "\\@varsupsetneq");
              defineSymbol(symbols_math, ams, rel, "\u2ACC", "\\supsetneqq", true);
              defineSymbol(symbols_math, ams, rel, "\uE019", "\\@varsupsetneqq");
              defineSymbol(symbols_math, ams, rel, "\u22AE", "\\nVdash", true);
              defineSymbol(symbols_math, ams, rel, "\u2AB5", "\\precneqq", true);
              defineSymbol(symbols_math, ams, rel, "\u2AB6", "\\succneqq", true);
              defineSymbol(symbols_math, ams, rel, "\uE016", "\\@nsubseteqq");
              defineSymbol(symbols_math, ams, bin, "\u22B4", "\\unlhd");
              defineSymbol(symbols_math, ams, bin, "\u22B5", "\\unrhd");
              defineSymbol(symbols_math, ams, rel, "\u219A", "\\nleftarrow", true);
              defineSymbol(symbols_math, ams, rel, "\u219B", "\\nrightarrow", true);
              defineSymbol(symbols_math, ams, rel, "\u21CD", "\\nLeftarrow", true);
              defineSymbol(symbols_math, ams, rel, "\u21CF", "\\nRightarrow", true);
              defineSymbol(symbols_math, ams, rel, "\u21AE", "\\nleftrightarrow", true);
              defineSymbol(symbols_math, ams, rel, "\u21CE", "\\nLeftrightarrow", true);
              defineSymbol(symbols_math, ams, rel, "\u25B3", "\\vartriangle");
              defineSymbol(symbols_math, ams, symbols_textord, "\u210F", "\\hslash");
              defineSymbol(symbols_math, ams, symbols_textord, "\u25BD", "\\triangledown");
              defineSymbol(symbols_math, ams, symbols_textord, "\u25CA", "\\lozenge");
              defineSymbol(symbols_math, ams, symbols_textord, "\u24C8", "\\circledS");
              defineSymbol(symbols_math, ams, symbols_textord, "\xAE", "\\circledR");
              defineSymbol(symbols_text, ams, symbols_textord, "\xAE", "\\circledR");
              defineSymbol(symbols_math, ams, symbols_textord, "\u2221", "\\measuredangle", true);
              defineSymbol(symbols_math, ams, symbols_textord, "\u2204", "\\nexists");
              defineSymbol(symbols_math, ams, symbols_textord, "\u2127", "\\mho");
              defineSymbol(symbols_math, ams, symbols_textord, "\u2132", "\\Finv", true);
              defineSymbol(symbols_math, ams, symbols_textord, "\u2141", "\\Game", true);
              defineSymbol(symbols_math, ams, symbols_textord, "\u2035", "\\backprime");
              defineSymbol(symbols_math, ams, symbols_textord, "\u25B2", "\\blacktriangle");
              defineSymbol(symbols_math, ams, symbols_textord, "\u25BC", "\\blacktriangledown");
              defineSymbol(symbols_math, ams, symbols_textord, "\u25A0", "\\blacksquare");
              defineSymbol(symbols_math, ams, symbols_textord, "\u29EB", "\\blacklozenge");
              defineSymbol(symbols_math, ams, symbols_textord, "\u2605", "\\bigstar");
              defineSymbol(symbols_math, ams, symbols_textord, "\u2222", "\\sphericalangle", true);
              defineSymbol(symbols_math, ams, symbols_textord, "\u2201", "\\complement", true);
              defineSymbol(symbols_math, ams, symbols_textord, "\xF0", "\\eth", true);
              defineSymbol(symbols_math, ams, symbols_textord, "\u2571", "\\diagup");
              defineSymbol(symbols_math, ams, symbols_textord, "\u2572", "\\diagdown");
              defineSymbol(symbols_math, ams, symbols_textord, "\u25A1", "\\square");
              defineSymbol(symbols_math, ams, symbols_textord, "\u25A1", "\\Box");
              defineSymbol(symbols_math, ams, symbols_textord, "\u25CA", "\\Diamond");
              defineSymbol(symbols_math, ams, symbols_textord, "\xA5", "\\yen", true);
              defineSymbol(symbols_text, ams, symbols_textord, "\xA5", "\\yen", true);
              defineSymbol(symbols_math, ams, symbols_textord, "\u2713", "\\checkmark", true);
              defineSymbol(symbols_text, ams, symbols_textord, "\u2713", "\\checkmark");
              defineSymbol(symbols_math, ams, symbols_textord, "\u2136", "\\beth", true);
              defineSymbol(symbols_math, ams, symbols_textord, "\u2138", "\\daleth", true);
              defineSymbol(symbols_math, ams, symbols_textord, "\u2137", "\\gimel", true);
              defineSymbol(symbols_math, ams, symbols_textord, "\u03DD", "\\digamma", true);
              defineSymbol(symbols_math, ams, symbols_textord, "\u03F0", "\\varkappa");
              defineSymbol(symbols_math, ams, symbols_open, "\u250C", "\\ulcorner", true);
              defineSymbol(symbols_math, ams, symbols_close, "\u2510", "\\urcorner", true);
              defineSymbol(symbols_math, ams, symbols_open, "\u2514", "\\llcorner", true);
              defineSymbol(symbols_math, ams, symbols_close, "\u2518", "\\lrcorner", true);
              defineSymbol(symbols_math, ams, rel, "\u2266", "\\leqq", true);
              defineSymbol(symbols_math, ams, rel, "\u2A7D", "\\leqslant", true);
              defineSymbol(symbols_math, ams, rel, "\u2A95", "\\eqslantless", true);
              defineSymbol(symbols_math, ams, rel, "\u2272", "\\lesssim", true);
              defineSymbol(symbols_math, ams, rel, "\u2A85", "\\lessapprox", true);
              defineSymbol(symbols_math, ams, rel, "\u224A", "\\approxeq", true);
              defineSymbol(symbols_math, ams, bin, "\u22D6", "\\lessdot");
              defineSymbol(symbols_math, ams, rel, "\u22D8", "\\lll", true);
              defineSymbol(symbols_math, ams, rel, "\u2276", "\\lessgtr", true);
              defineSymbol(symbols_math, ams, rel, "\u22DA", "\\lesseqgtr", true);
              defineSymbol(symbols_math, ams, rel, "\u2A8B", "\\lesseqqgtr", true);
              defineSymbol(symbols_math, ams, rel, "\u2251", "\\doteqdot");
              defineSymbol(symbols_math, ams, rel, "\u2253", "\\risingdotseq", true);
              defineSymbol(symbols_math, ams, rel, "\u2252", "\\fallingdotseq", true);
              defineSymbol(symbols_math, ams, rel, "\u223D", "\\backsim", true);
              defineSymbol(symbols_math, ams, rel, "\u22CD", "\\backsimeq", true);
              defineSymbol(symbols_math, ams, rel, "\u2AC5", "\\subseteqq", true);
              defineSymbol(symbols_math, ams, rel, "\u22D0", "\\Subset", true);
              defineSymbol(symbols_math, ams, rel, "\u228F", "\\sqsubset", true);
              defineSymbol(symbols_math, ams, rel, "\u227C", "\\preccurlyeq", true);
              defineSymbol(symbols_math, ams, rel, "\u22DE", "\\curlyeqprec", true);
              defineSymbol(symbols_math, ams, rel, "\u227E", "\\precsim", true);
              defineSymbol(symbols_math, ams, rel, "\u2AB7", "\\precapprox", true);
              defineSymbol(symbols_math, ams, rel, "\u22B2", "\\vartriangleleft");
              defineSymbol(symbols_math, ams, rel, "\u22B4", "\\trianglelefteq");
              defineSymbol(symbols_math, ams, rel, "\u22A8", "\\vDash", true);
              defineSymbol(symbols_math, ams, rel, "\u22AA", "\\Vvdash", true);
              defineSymbol(symbols_math, ams, rel, "\u2323", "\\smallsmile");
              defineSymbol(symbols_math, ams, rel, "\u2322", "\\smallfrown");
              defineSymbol(symbols_math, ams, rel, "\u224F", "\\bumpeq", true);
              defineSymbol(symbols_math, ams, rel, "\u224E", "\\Bumpeq", true);
              defineSymbol(symbols_math, ams, rel, "\u2267", "\\geqq", true);
              defineSymbol(symbols_math, ams, rel, "\u2A7E", "\\geqslant", true);
              defineSymbol(symbols_math, ams, rel, "\u2A96", "\\eqslantgtr", true);
              defineSymbol(symbols_math, ams, rel, "\u2273", "\\gtrsim", true);
              defineSymbol(symbols_math, ams, rel, "\u2A86", "\\gtrapprox", true);
              defineSymbol(symbols_math, ams, bin, "\u22D7", "\\gtrdot");
              defineSymbol(symbols_math, ams, rel, "\u22D9", "\\ggg", true);
              defineSymbol(symbols_math, ams, rel, "\u2277", "\\gtrless", true);
              defineSymbol(symbols_math, ams, rel, "\u22DB", "\\gtreqless", true);
              defineSymbol(symbols_math, ams, rel, "\u2A8C", "\\gtreqqless", true);
              defineSymbol(symbols_math, ams, rel, "\u2256", "\\eqcirc", true);
              defineSymbol(symbols_math, ams, rel, "\u2257", "\\circeq", true);
              defineSymbol(symbols_math, ams, rel, "\u225C", "\\triangleq", true);
              defineSymbol(symbols_math, ams, rel, "\u223C", "\\thicksim");
              defineSymbol(symbols_math, ams, rel, "\u2248", "\\thickapprox");
              defineSymbol(symbols_math, ams, rel, "\u2AC6", "\\supseteqq", true);
              defineSymbol(symbols_math, ams, rel, "\u22D1", "\\Supset", true);
              defineSymbol(symbols_math, ams, rel, "\u2290", "\\sqsupset", true);
              defineSymbol(symbols_math, ams, rel, "\u227D", "\\succcurlyeq", true);
              defineSymbol(symbols_math, ams, rel, "\u22DF", "\\curlyeqsucc", true);
              defineSymbol(symbols_math, ams, rel, "\u227F", "\\succsim", true);
              defineSymbol(symbols_math, ams, rel, "\u2AB8", "\\succapprox", true);
              defineSymbol(symbols_math, ams, rel, "\u22B3", "\\vartriangleright");
              defineSymbol(symbols_math, ams, rel, "\u22B5", "\\trianglerighteq");
              defineSymbol(symbols_math, ams, rel, "\u22A9", "\\Vdash", true);
              defineSymbol(symbols_math, ams, rel, "\u2223", "\\shortmid");
              defineSymbol(symbols_math, ams, rel, "\u2225", "\\shortparallel");
              defineSymbol(symbols_math, ams, rel, "\u226C", "\\between", true);
              defineSymbol(symbols_math, ams, rel, "\u22D4", "\\pitchfork", true);
              defineSymbol(symbols_math, ams, rel, "\u221D", "\\varpropto");
              defineSymbol(symbols_math, ams, rel, "\u25C0", "\\blacktriangleleft");
              defineSymbol(symbols_math, ams, rel, "\u2234", "\\therefore", true);
              defineSymbol(symbols_math, ams, rel, "\u220D", "\\backepsilon");
              defineSymbol(symbols_math, ams, rel, "\u25B6", "\\blacktriangleright");
              defineSymbol(symbols_math, ams, rel, "\u2235", "\\because", true);
              defineSymbol(symbols_math, ams, rel, "\u22D8", "\\llless");
              defineSymbol(symbols_math, ams, rel, "\u22D9", "\\gggtr");
              defineSymbol(symbols_math, ams, bin, "\u22B2", "\\lhd");
              defineSymbol(symbols_math, ams, bin, "\u22B3", "\\rhd");
              defineSymbol(symbols_math, ams, rel, "\u2242", "\\eqsim", true);
              defineSymbol(symbols_math, main, rel, "\u22C8", "\\Join");
              defineSymbol(symbols_math, ams, rel, "\u2251", "\\Doteq", true);
              defineSymbol(symbols_math, ams, bin, "\u2214", "\\dotplus", true);
              defineSymbol(symbols_math, ams, bin, "\u2216", "\\smallsetminus");
              defineSymbol(symbols_math, ams, bin, "\u22D2", "\\Cap", true);
              defineSymbol(symbols_math, ams, bin, "\u22D3", "\\Cup", true);
              defineSymbol(symbols_math, ams, bin, "\u2A5E", "\\doublebarwedge", true);
              defineSymbol(symbols_math, ams, bin, "\u229F", "\\boxminus", true);
              defineSymbol(symbols_math, ams, bin, "\u229E", "\\boxplus", true);
              defineSymbol(symbols_math, ams, bin, "\u22C7", "\\divideontimes", true);
              defineSymbol(symbols_math, ams, bin, "\u22C9", "\\ltimes", true);
              defineSymbol(symbols_math, ams, bin, "\u22CA", "\\rtimes", true);
              defineSymbol(symbols_math, ams, bin, "\u22CB", "\\leftthreetimes", true);
              defineSymbol(symbols_math, ams, bin, "\u22CC", "\\rightthreetimes", true);
              defineSymbol(symbols_math, ams, bin, "\u22CF", "\\curlywedge", true);
              defineSymbol(symbols_math, ams, bin, "\u22CE", "\\curlyvee", true);
              defineSymbol(symbols_math, ams, bin, "\u229D", "\\circleddash", true);
              defineSymbol(symbols_math, ams, bin, "\u229B", "\\circledast", true);
              defineSymbol(symbols_math, ams, bin, "\u22C5", "\\centerdot");
              defineSymbol(symbols_math, ams, bin, "\u22BA", "\\intercal", true);
              defineSymbol(symbols_math, ams, bin, "\u22D2", "\\doublecap");
              defineSymbol(symbols_math, ams, bin, "\u22D3", "\\doublecup");
              defineSymbol(symbols_math, ams, bin, "\u22A0", "\\boxtimes", true);
              defineSymbol(symbols_math, ams, rel, "\u21E2", "\\dashrightarrow", true);
              defineSymbol(symbols_math, ams, rel, "\u21E0", "\\dashleftarrow", true);
              defineSymbol(symbols_math, ams, rel, "\u21C7", "\\leftleftarrows", true);
              defineSymbol(symbols_math, ams, rel, "\u21C6", "\\leftrightarrows", true);
              defineSymbol(symbols_math, ams, rel, "\u21DA", "\\Lleftarrow", true);
              defineSymbol(symbols_math, ams, rel, "\u219E", "\\twoheadleftarrow", true);
              defineSymbol(symbols_math, ams, rel, "\u21A2", "\\leftarrowtail", true);
              defineSymbol(symbols_math, ams, rel, "\u21AB", "\\looparrowleft", true);
              defineSymbol(symbols_math, ams, rel, "\u21CB", "\\leftrightharpoons", true);
              defineSymbol(symbols_math, ams, rel, "\u21B6", "\\curvearrowleft", true);
              defineSymbol(symbols_math, ams, rel, "\u21BA", "\\circlearrowleft", true);
              defineSymbol(symbols_math, ams, rel, "\u21B0", "\\Lsh", true);
              defineSymbol(symbols_math, ams, rel, "\u21C8", "\\upuparrows", true);
              defineSymbol(symbols_math, ams, rel, "\u21BF", "\\upharpoonleft", true);
              defineSymbol(symbols_math, ams, rel, "\u21C3", "\\downharpoonleft", true);
              defineSymbol(symbols_math, ams, rel, "\u22B8", "\\multimap", true);
              defineSymbol(symbols_math, ams, rel, "\u21AD", "\\leftrightsquigarrow", true);
              defineSymbol(symbols_math, ams, rel, "\u21C9", "\\rightrightarrows", true);
              defineSymbol(symbols_math, ams, rel, "\u21C4", "\\rightleftarrows", true);
              defineSymbol(symbols_math, ams, rel, "\u21A0", "\\twoheadrightarrow", true);
              defineSymbol(symbols_math, ams, rel, "\u21A3", "\\rightarrowtail", true);
              defineSymbol(symbols_math, ams, rel, "\u21AC", "\\looparrowright", true);
              defineSymbol(symbols_math, ams, rel, "\u21B7", "\\curvearrowright", true);
              defineSymbol(symbols_math, ams, rel, "\u21BB", "\\circlearrowright", true);
              defineSymbol(symbols_math, ams, rel, "\u21B1", "\\Rsh", true);
              defineSymbol(symbols_math, ams, rel, "\u21CA", "\\downdownarrows", true);
              defineSymbol(symbols_math, ams, rel, "\u21BE", "\\upharpoonright", true);
              defineSymbol(symbols_math, ams, rel, "\u21C2", "\\downharpoonright", true);
              defineSymbol(symbols_math, ams, rel, "\u21DD", "\\rightsquigarrow", true);
              defineSymbol(symbols_math, ams, rel, "\u21DD", "\\leadsto");
              defineSymbol(symbols_math, ams, rel, "\u21DB", "\\Rrightarrow", true);
              defineSymbol(symbols_math, ams, rel, "\u21BE", "\\restriction");
              defineSymbol(symbols_math, main, symbols_textord, "\u2018", "`");
              defineSymbol(symbols_math, main, symbols_textord, "$", "\\$");
              defineSymbol(symbols_text, main, symbols_textord, "$", "\\$");
              defineSymbol(symbols_text, main, symbols_textord, "$", "\\textdollar");
              defineSymbol(symbols_math, main, symbols_textord, "%", "\\%");
              defineSymbol(symbols_text, main, symbols_textord, "%", "\\%");
              defineSymbol(symbols_math, main, symbols_textord, "_", "\\_");
              defineSymbol(symbols_text, main, symbols_textord, "_", "\\_");
              defineSymbol(symbols_text, main, symbols_textord, "_", "\\textunderscore");
              defineSymbol(symbols_math, main, symbols_textord, "\u2220", "\\angle", true);
              defineSymbol(symbols_math, main, symbols_textord, "\u221E", "\\infty", true);
              defineSymbol(symbols_math, main, symbols_textord, "\u2032", "\\prime");
              defineSymbol(symbols_math, main, symbols_textord, "\u25B3", "\\triangle");
              defineSymbol(symbols_math, main, symbols_textord, "\u0393", "\\Gamma", true);
              defineSymbol(symbols_math, main, symbols_textord, "\u0394", "\\Delta", true);
              defineSymbol(symbols_math, main, symbols_textord, "\u0398", "\\Theta", true);
              defineSymbol(symbols_math, main, symbols_textord, "\u039B", "\\Lambda", true);
              defineSymbol(symbols_math, main, symbols_textord, "\u039E", "\\Xi", true);
              defineSymbol(symbols_math, main, symbols_textord, "\u03A0", "\\Pi", true);
              defineSymbol(symbols_math, main, symbols_textord, "\u03A3", "\\Sigma", true);
              defineSymbol(symbols_math, main, symbols_textord, "\u03A5", "\\Upsilon", true);
              defineSymbol(symbols_math, main, symbols_textord, "\u03A6", "\\Phi", true);
              defineSymbol(symbols_math, main, symbols_textord, "\u03A8", "\\Psi", true);
              defineSymbol(symbols_math, main, symbols_textord, "\u03A9", "\\Omega", true);
              defineSymbol(symbols_math, main, symbols_textord, "A", "\u0391");
              defineSymbol(symbols_math, main, symbols_textord, "B", "\u0392");
              defineSymbol(symbols_math, main, symbols_textord, "E", "\u0395");
              defineSymbol(symbols_math, main, symbols_textord, "Z", "\u0396");
              defineSymbol(symbols_math, main, symbols_textord, "H", "\u0397");
              defineSymbol(symbols_math, main, symbols_textord, "I", "\u0399");
              defineSymbol(symbols_math, main, symbols_textord, "K", "\u039A");
              defineSymbol(symbols_math, main, symbols_textord, "M", "\u039C");
              defineSymbol(symbols_math, main, symbols_textord, "N", "\u039D");
              defineSymbol(symbols_math, main, symbols_textord, "O", "\u039F");
              defineSymbol(symbols_math, main, symbols_textord, "P", "\u03A1");
              defineSymbol(symbols_math, main, symbols_textord, "T", "\u03A4");
              defineSymbol(symbols_math, main, symbols_textord, "X", "\u03A7");
              defineSymbol(symbols_math, main, symbols_textord, "\xAC", "\\neg", true);
              defineSymbol(symbols_math, main, symbols_textord, "\xAC", "\\lnot");
              defineSymbol(symbols_math, main, symbols_textord, "\u22A4", "\\top");
              defineSymbol(symbols_math, main, symbols_textord, "\u22A5", "\\bot");
              defineSymbol(symbols_math, main, symbols_textord, "\u2205", "\\emptyset");
              defineSymbol(symbols_math, ams, symbols_textord, "\u2205", "\\varnothing");
              defineSymbol(symbols_math, main, mathord, "\u03B1", "\\alpha", true);
              defineSymbol(symbols_math, main, mathord, "\u03B2", "\\beta", true);
              defineSymbol(symbols_math, main, mathord, "\u03B3", "\\gamma", true);
              defineSymbol(symbols_math, main, mathord, "\u03B4", "\\delta", true);
              defineSymbol(symbols_math, main, mathord, "\u03F5", "\\epsilon", true);
              defineSymbol(symbols_math, main, mathord, "\u03B6", "\\zeta", true);
              defineSymbol(symbols_math, main, mathord, "\u03B7", "\\eta", true);
              defineSymbol(symbols_math, main, mathord, "\u03B8", "\\theta", true);
              defineSymbol(symbols_math, main, mathord, "\u03B9", "\\iota", true);
              defineSymbol(symbols_math, main, mathord, "\u03BA", "\\kappa", true);
              defineSymbol(symbols_math, main, mathord, "\u03BB", "\\lambda", true);
              defineSymbol(symbols_math, main, mathord, "\u03BC", "\\mu", true);
              defineSymbol(symbols_math, main, mathord, "\u03BD", "\\nu", true);
              defineSymbol(symbols_math, main, mathord, "\u03BE", "\\xi", true);
              defineSymbol(symbols_math, main, mathord, "\u03BF", "\\omicron", true);
              defineSymbol(symbols_math, main, mathord, "\u03C0", "\\pi", true);
              defineSymbol(symbols_math, main, mathord, "\u03C1", "\\rho", true);
              defineSymbol(symbols_math, main, mathord, "\u03C3", "\\sigma", true);
              defineSymbol(symbols_math, main, mathord, "\u03C4", "\\tau", true);
              defineSymbol(symbols_math, main, mathord, "\u03C5", "\\upsilon", true);
              defineSymbol(symbols_math, main, mathord, "\u03D5", "\\phi", true);
              defineSymbol(symbols_math, main, mathord, "\u03C7", "\\chi", true);
              defineSymbol(symbols_math, main, mathord, "\u03C8", "\\psi", true);
              defineSymbol(symbols_math, main, mathord, "\u03C9", "\\omega", true);
              defineSymbol(symbols_math, main, mathord, "\u03B5", "\\varepsilon", true);
              defineSymbol(symbols_math, main, mathord, "\u03D1", "\\vartheta", true);
              defineSymbol(symbols_math, main, mathord, "\u03D6", "\\varpi", true);
              defineSymbol(symbols_math, main, mathord, "\u03F1", "\\varrho", true);
              defineSymbol(symbols_math, main, mathord, "\u03C2", "\\varsigma", true);
              defineSymbol(symbols_math, main, mathord, "\u03C6", "\\varphi", true);
              defineSymbol(symbols_math, main, bin, "\u2217", "*");
              defineSymbol(symbols_math, main, bin, "+", "+");
              defineSymbol(symbols_math, main, bin, "\u2212", "-");
              defineSymbol(symbols_math, main, bin, "\u22C5", "\\cdot", true);
              defineSymbol(symbols_math, main, bin, "\u2218", "\\circ");
              defineSymbol(symbols_math, main, bin, "\xF7", "\\div", true);
              defineSymbol(symbols_math, main, bin, "\xB1", "\\pm", true);
              defineSymbol(symbols_math, main, bin, "\xD7", "\\times", true);
              defineSymbol(symbols_math, main, bin, "\u2229", "\\cap", true);
              defineSymbol(symbols_math, main, bin, "\u222A", "\\cup", true);
              defineSymbol(symbols_math, main, bin, "\u2216", "\\setminus");
              defineSymbol(symbols_math, main, bin, "\u2227", "\\land");
              defineSymbol(symbols_math, main, bin, "\u2228", "\\lor");
              defineSymbol(symbols_math, main, bin, "\u2227", "\\wedge", true);
              defineSymbol(symbols_math, main, bin, "\u2228", "\\vee", true);
              defineSymbol(symbols_math, main, symbols_textord, "\u221A", "\\surd");
              defineSymbol(symbols_math, main, symbols_open, "(", "(");
              defineSymbol(symbols_math, main, symbols_open, "[", "[");
              defineSymbol(symbols_math, main, symbols_open, "\u27E8", "\\langle", true);
              defineSymbol(symbols_math, main, symbols_open, "\u2223", "\\lvert");
              defineSymbol(symbols_math, main, symbols_open, "\u2225", "\\lVert");
              defineSymbol(symbols_math, main, symbols_close, ")", ")");
              defineSymbol(symbols_math, main, symbols_close, "]", "]");
              defineSymbol(symbols_math, main, symbols_close, "?", "?");
              defineSymbol(symbols_math, main, symbols_close, "!", "!");
              defineSymbol(symbols_math, main, symbols_close, "\u27E9", "\\rangle", true);
              defineSymbol(symbols_math, main, symbols_close, "\u2223", "\\rvert");
              defineSymbol(symbols_math, main, symbols_close, "\u2225", "\\rVert");
              defineSymbol(symbols_math, main, rel, "=", "=");
              defineSymbol(symbols_math, main, rel, "<", "<");
              defineSymbol(symbols_math, main, rel, ">", ">");
              defineSymbol(symbols_math, main, rel, ":", ":");
              defineSymbol(symbols_math, main, rel, "\u2248", "\\approx", true);
              defineSymbol(symbols_math, main, rel, "\u2245", "\\cong", true);
              defineSymbol(symbols_math, main, rel, "\u2265", "\\ge");
              defineSymbol(symbols_math, main, rel, "\u2265", "\\geq", true);
              defineSymbol(symbols_math, main, rel, "\u2190", "\\gets");
              defineSymbol(symbols_math, main, rel, ">", "\\gt");
              defineSymbol(symbols_math, main, rel, "\u2208", "\\in", true);
              defineSymbol(symbols_math, main, rel, "\uE020", "\\@not");
              defineSymbol(symbols_math, main, rel, "\u2282", "\\subset", true);
              defineSymbol(symbols_math, main, rel, "\u2283", "\\supset", true);
              defineSymbol(symbols_math, main, rel, "\u2286", "\\subseteq", true);
              defineSymbol(symbols_math, main, rel, "\u2287", "\\supseteq", true);
              defineSymbol(symbols_math, ams, rel, "\u2288", "\\nsubseteq", true);
              defineSymbol(symbols_math, ams, rel, "\u2289", "\\nsupseteq", true);
              defineSymbol(symbols_math, main, rel, "\u22A8", "\\models");
              defineSymbol(symbols_math, main, rel, "\u2190", "\\leftarrow", true);
              defineSymbol(symbols_math, main, rel, "\u2264", "\\le");
              defineSymbol(symbols_math, main, rel, "\u2264", "\\leq", true);
              defineSymbol(symbols_math, main, rel, "<", "\\lt");
              defineSymbol(symbols_math, main, rel, "\u2192", "\\rightarrow", true);
              defineSymbol(symbols_math, main, rel, "\u2192", "\\to");
              defineSymbol(symbols_math, ams, rel, "\u2271", "\\ngeq", true);
              defineSymbol(symbols_math, ams, rel, "\u2270", "\\nleq", true);
              defineSymbol(symbols_math, main, symbols_spacing, "\xA0", "\\ ");
              defineSymbol(symbols_math, main, symbols_spacing, "\xA0", "~");
              defineSymbol(symbols_math, main, symbols_spacing, "\xA0", "\\space");
              defineSymbol(symbols_math, main, symbols_spacing, "\xA0", "\\nobreakspace");
              defineSymbol(symbols_text, main, symbols_spacing, "\xA0", "\\ ");
              defineSymbol(symbols_text, main, symbols_spacing, "\xA0", "~");
              defineSymbol(symbols_text, main, symbols_spacing, "\xA0", "\\space");
              defineSymbol(symbols_text, main, symbols_spacing, "\xA0", "\\nobreakspace");
              defineSymbol(symbols_math, main, symbols_spacing, null, "\\nobreak");
              defineSymbol(symbols_math, main, symbols_spacing, null, "\\allowbreak");
              defineSymbol(symbols_math, main, punct, ",", ",");
              defineSymbol(symbols_math, main, punct, ";", ";");
              defineSymbol(symbols_math, ams, bin, "\u22BC", "\\barwedge", true);
              defineSymbol(symbols_math, ams, bin, "\u22BB", "\\veebar", true);
              defineSymbol(symbols_math, main, bin, "\u2299", "\\odot", true);
              defineSymbol(symbols_math, main, bin, "\u2295", "\\oplus", true);
              defineSymbol(symbols_math, main, bin, "\u2297", "\\otimes", true);
              defineSymbol(symbols_math, main, symbols_textord, "\u2202", "\\partial", true);
              defineSymbol(symbols_math, main, bin, "\u2298", "\\oslash", true);
              defineSymbol(symbols_math, ams, bin, "\u229A", "\\circledcirc", true);
              defineSymbol(symbols_math, ams, bin, "\u22A1", "\\boxdot", true);
              defineSymbol(symbols_math, main, bin, "\u25B3", "\\bigtriangleup");
              defineSymbol(symbols_math, main, bin, "\u25BD", "\\bigtriangledown");
              defineSymbol(symbols_math, main, bin, "\u2020", "\\dagger");
              defineSymbol(symbols_math, main, bin, "\u22C4", "\\diamond");
              defineSymbol(symbols_math, main, bin, "\u22C6", "\\star");
              defineSymbol(symbols_math, main, bin, "\u25C3", "\\triangleleft");
              defineSymbol(symbols_math, main, bin, "\u25B9", "\\triangleright");
              defineSymbol(symbols_math, main, symbols_open, "{", "\\{");
              defineSymbol(symbols_text, main, symbols_textord, "{", "\\{");
              defineSymbol(symbols_text, main, symbols_textord, "{", "\\textbraceleft");
              defineSymbol(symbols_math, main, symbols_close, "}", "\\}");
              defineSymbol(symbols_text, main, symbols_textord, "}", "\\}");
              defineSymbol(symbols_text, main, symbols_textord, "}", "\\textbraceright");
              defineSymbol(symbols_math, main, symbols_open, "{", "\\lbrace");
              defineSymbol(symbols_math, main, symbols_close, "}", "\\rbrace");
              defineSymbol(symbols_math, main, symbols_open, "[", "\\lbrack");
              defineSymbol(symbols_text, main, symbols_textord, "[", "\\lbrack");
              defineSymbol(symbols_math, main, symbols_close, "]", "\\rbrack");
              defineSymbol(symbols_text, main, symbols_textord, "]", "\\rbrack");
              defineSymbol(symbols_math, main, symbols_open, "(", "\\lparen");
              defineSymbol(symbols_math, main, symbols_close, ")", "\\rparen");
              defineSymbol(symbols_text, main, symbols_textord, "<", "\\textless");
              defineSymbol(symbols_text, main, symbols_textord, ">", "\\textgreater");
              defineSymbol(symbols_math, main, symbols_open, "\u230A", "\\lfloor", true);
              defineSymbol(symbols_math, main, symbols_close, "\u230B", "\\rfloor", true);
              defineSymbol(symbols_math, main, symbols_open, "\u2308", "\\lceil", true);
              defineSymbol(symbols_math, main, symbols_close, "\u2309", "\\rceil", true);
              defineSymbol(symbols_math, main, symbols_textord, "\\", "\\backslash");
              defineSymbol(symbols_math, main, symbols_textord, "\u2223", "|");
              defineSymbol(symbols_math, main, symbols_textord, "\u2223", "\\vert");
              defineSymbol(symbols_text, main, symbols_textord, "|", "\\textbar");
              defineSymbol(symbols_math, main, symbols_textord, "\u2225", "\\|");
              defineSymbol(symbols_math, main, symbols_textord, "\u2225", "\\Vert");
              defineSymbol(symbols_text, main, symbols_textord, "\u2225", "\\textbardbl");
              defineSymbol(symbols_text, main, symbols_textord, "~", "\\textasciitilde");
              defineSymbol(symbols_text, main, symbols_textord, "\\", "\\textbackslash");
              defineSymbol(symbols_text, main, symbols_textord, "^", "\\textasciicircum");
              defineSymbol(symbols_math, main, rel, "\u2191", "\\uparrow", true);
              defineSymbol(symbols_math, main, rel, "\u21D1", "\\Uparrow", true);
              defineSymbol(symbols_math, main, rel, "\u2193", "\\downarrow", true);
              defineSymbol(symbols_math, main, rel, "\u21D3", "\\Downarrow", true);
              defineSymbol(symbols_math, main, rel, "\u2195", "\\updownarrow", true);
              defineSymbol(symbols_math, main, rel, "\u21D5", "\\Updownarrow", true);
              defineSymbol(symbols_math, main, op, "\u2210", "\\coprod");
              defineSymbol(symbols_math, main, op, "\u22C1", "\\bigvee");
              defineSymbol(symbols_math, main, op, "\u22C0", "\\bigwedge");
              defineSymbol(symbols_math, main, op, "\u2A04", "\\biguplus");
              defineSymbol(symbols_math, main, op, "\u22C2", "\\bigcap");
              defineSymbol(symbols_math, main, op, "\u22C3", "\\bigcup");
              defineSymbol(symbols_math, main, op, "\u222B", "\\int");
              defineSymbol(symbols_math, main, op, "\u222B", "\\intop");
              defineSymbol(symbols_math, main, op, "\u222C", "\\iint");
              defineSymbol(symbols_math, main, op, "\u222D", "\\iiint");
              defineSymbol(symbols_math, main, op, "\u220F", "\\prod");
              defineSymbol(symbols_math, main, op, "\u2211", "\\sum");
              defineSymbol(symbols_math, main, op, "\u2A02", "\\bigotimes");
              defineSymbol(symbols_math, main, op, "\u2A01", "\\bigoplus");
              defineSymbol(symbols_math, main, op, "\u2A00", "\\bigodot");
              defineSymbol(symbols_math, main, op, "\u222E", "\\oint");
              defineSymbol(symbols_math, main, op, "\u222F", "\\oiint");
              defineSymbol(symbols_math, main, op, "\u2230", "\\oiiint");
              defineSymbol(symbols_math, main, op, "\u2A06", "\\bigsqcup");
              defineSymbol(symbols_math, main, op, "\u222B", "\\smallint");
              defineSymbol(symbols_text, main, symbols_inner, "\u2026", "\\textellipsis");
              defineSymbol(symbols_math, main, symbols_inner, "\u2026", "\\mathellipsis");
              defineSymbol(symbols_text, main, symbols_inner, "\u2026", "\\ldots", true);
              defineSymbol(symbols_math, main, symbols_inner, "\u2026", "\\ldots", true);
              defineSymbol(symbols_math, main, symbols_inner, "\u22EF", "\\@cdots", true);
              defineSymbol(symbols_math, main, symbols_inner, "\u22F1", "\\ddots", true);
              defineSymbol(symbols_math, main, symbols_textord, "\u22EE", "\\varvdots");
              defineSymbol(symbols_math, main, symbols_accent, "\u02CA", "\\acute");
              defineSymbol(symbols_math, main, symbols_accent, "\u02CB", "\\grave");
              defineSymbol(symbols_math, main, symbols_accent, "\xA8", "\\ddot");
              defineSymbol(symbols_math, main, symbols_accent, "~", "\\tilde");
              defineSymbol(symbols_math, main, symbols_accent, "\u02C9", "\\bar");
              defineSymbol(symbols_math, main, symbols_accent, "\u02D8", "\\breve");
              defineSymbol(symbols_math, main, symbols_accent, "\u02C7", "\\check");
              defineSymbol(symbols_math, main, symbols_accent, "^", "\\hat");
              defineSymbol(symbols_math, main, symbols_accent, "\u20D7", "\\vec");
              defineSymbol(symbols_math, main, symbols_accent, "\u02D9", "\\dot");
              defineSymbol(symbols_math, main, symbols_accent, "\u02DA", "\\mathring");
              defineSymbol(symbols_math, main, mathord, "\u0131", "\\imath", true);
              defineSymbol(symbols_math, main, mathord, "\u0237", "\\jmath", true);
              defineSymbol(symbols_text, main, symbols_textord, "\u0131", "\\i", true);
              defineSymbol(symbols_text, main, symbols_textord, "\u0237", "\\j", true);
              defineSymbol(symbols_text, main, symbols_textord, "\xDF", "\\ss", true);
              defineSymbol(symbols_text, main, symbols_textord, "\xE6", "\\ae", true);
              defineSymbol(symbols_text, main, symbols_textord, "\xE6", "\\ae", true);
              defineSymbol(symbols_text, main, symbols_textord, "\u0153", "\\oe", true);
              defineSymbol(symbols_text, main, symbols_textord, "\xF8", "\\o", true);
              defineSymbol(symbols_text, main, symbols_textord, "\xC6", "\\AE", true);
              defineSymbol(symbols_text, main, symbols_textord, "\u0152", "\\OE", true);
              defineSymbol(symbols_text, main, symbols_textord, "\xD8", "\\O", true);
              defineSymbol(symbols_text, main, symbols_accent, "\u02CA", "\\'");
              defineSymbol(symbols_text, main, symbols_accent, "\u02CB", "\\`");
              defineSymbol(symbols_text, main, symbols_accent, "\u02C6", "\\^");
              defineSymbol(symbols_text, main, symbols_accent, "\u02DC", "\\~");
              defineSymbol(symbols_text, main, symbols_accent, "\u02C9", "\\=");
              defineSymbol(symbols_text, main, symbols_accent, "\u02D8", "\\u");
              defineSymbol(symbols_text, main, symbols_accent, "\u02D9", "\\.");
              defineSymbol(symbols_text, main, symbols_accent, "\u02DA", "\\r");
              defineSymbol(symbols_text, main, symbols_accent, "\u02C7", "\\v");
              defineSymbol(symbols_text, main, symbols_accent, "\xA8", '\\"');
              defineSymbol(symbols_text, main, symbols_accent, "\u02DD", "\\H");
              defineSymbol(symbols_text, main, symbols_accent, "\u25EF", "\\textcircled");
              var ligatures = {
                "--": true,
                "---": true,
                "``": true,
                "''": true
              };
              defineSymbol(symbols_text, main, symbols_textord, "\u2013", "--");
              defineSymbol(symbols_text, main, symbols_textord, "\u2013", "\\textendash");
              defineSymbol(symbols_text, main, symbols_textord, "\u2014", "---");
              defineSymbol(symbols_text, main, symbols_textord, "\u2014", "\\textemdash");
              defineSymbol(symbols_text, main, symbols_textord, "\u2018", "`");
              defineSymbol(symbols_text, main, symbols_textord, "\u2018", "\\textquoteleft");
              defineSymbol(symbols_text, main, symbols_textord, "\u2019", "'");
              defineSymbol(symbols_text, main, symbols_textord, "\u2019", "\\textquoteright");
              defineSymbol(symbols_text, main, symbols_textord, "\u201C", "``");
              defineSymbol(symbols_text, main, symbols_textord, "\u201C", "\\textquotedblleft");
              defineSymbol(symbols_text, main, symbols_textord, "\u201D", "''");
              defineSymbol(symbols_text, main, symbols_textord, "\u201D", "\\textquotedblright");
              defineSymbol(symbols_math, main, symbols_textord, "\xB0", "\\degree", true);
              defineSymbol(symbols_text, main, symbols_textord, "\xB0", "\\degree");
              defineSymbol(symbols_text, main, symbols_textord, "\xB0", "\\textdegree", true);
              defineSymbol(symbols_math, main, mathord, "\xA3", "\\pounds");
              defineSymbol(symbols_math, main, mathord, "\xA3", "\\mathsterling", true);
              defineSymbol(symbols_text, main, mathord, "\xA3", "\\pounds");
              defineSymbol(symbols_text, main, mathord, "\xA3", "\\textsterling", true);
              defineSymbol(symbols_math, ams, symbols_textord, "\u2720", "\\maltese");
              defineSymbol(symbols_text, ams, symbols_textord, "\u2720", "\\maltese");
              defineSymbol(symbols_text, main, symbols_spacing, "\xA0", "\\ ");
              defineSymbol(symbols_text, main, symbols_spacing, "\xA0", " ");
              defineSymbol(symbols_text, main, symbols_spacing, "\xA0", "~");
              var mathTextSymbols = '0123456789/@."';
              for (var symbols_i = 0; symbols_i < mathTextSymbols.length; symbols_i++) {
                var symbols_ch = mathTextSymbols.charAt(symbols_i);
                defineSymbol(symbols_math, main, symbols_textord, symbols_ch, symbols_ch);
              }
              var textSymbols = '0123456789!@*()-=+[]<>|";:?/.,';
              for (var src_symbols_i = 0; src_symbols_i < textSymbols.length; src_symbols_i++) {
                var _ch = textSymbols.charAt(src_symbols_i);
                defineSymbol(symbols_text, main, symbols_textord, _ch, _ch);
              }
              var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
              for (var symbols_i2 = 0; symbols_i2 < letters.length; symbols_i2++) {
                var _ch2 = letters.charAt(symbols_i2);
                defineSymbol(symbols_math, main, mathord, _ch2, _ch2);
                defineSymbol(symbols_text, main, symbols_textord, _ch2, _ch2);
              }
              defineSymbol(symbols_math, ams, symbols_textord, "C", "\u2102");
              defineSymbol(symbols_text, ams, symbols_textord, "C", "\u2102");
              defineSymbol(symbols_math, ams, symbols_textord, "H", "\u210D");
              defineSymbol(symbols_text, ams, symbols_textord, "H", "\u210D");
              defineSymbol(symbols_math, ams, symbols_textord, "N", "\u2115");
              defineSymbol(symbols_text, ams, symbols_textord, "N", "\u2115");
              defineSymbol(symbols_math, ams, symbols_textord, "P", "\u2119");
              defineSymbol(symbols_text, ams, symbols_textord, "P", "\u2119");
              defineSymbol(symbols_math, ams, symbols_textord, "Q", "\u211A");
              defineSymbol(symbols_text, ams, symbols_textord, "Q", "\u211A");
              defineSymbol(symbols_math, ams, symbols_textord, "R", "\u211D");
              defineSymbol(symbols_text, ams, symbols_textord, "R", "\u211D");
              defineSymbol(symbols_math, ams, symbols_textord, "Z", "\u2124");
              defineSymbol(symbols_text, ams, symbols_textord, "Z", "\u2124");
              defineSymbol(symbols_math, main, mathord, "h", "\u210E");
              defineSymbol(symbols_text, main, mathord, "h", "\u210E");
              var symbols_wideChar = "";
              for (var symbols_i3 = 0; symbols_i3 < letters.length; symbols_i3++) {
                var _ch3 = letters.charAt(symbols_i3);
                symbols_wideChar = String.fromCharCode(55349, 56320 + symbols_i3);
                defineSymbol(symbols_math, main, mathord, _ch3, symbols_wideChar);
                defineSymbol(symbols_text, main, symbols_textord, _ch3, symbols_wideChar);
                symbols_wideChar = String.fromCharCode(55349, 56372 + symbols_i3);
                defineSymbol(symbols_math, main, mathord, _ch3, symbols_wideChar);
                defineSymbol(symbols_text, main, symbols_textord, _ch3, symbols_wideChar);
                symbols_wideChar = String.fromCharCode(55349, 56424 + symbols_i3);
                defineSymbol(symbols_math, main, mathord, _ch3, symbols_wideChar);
                defineSymbol(symbols_text, main, symbols_textord, _ch3, symbols_wideChar);
                symbols_wideChar = String.fromCharCode(55349, 56580 + symbols_i3);
                defineSymbol(symbols_math, main, mathord, _ch3, symbols_wideChar);
                defineSymbol(symbols_text, main, symbols_textord, _ch3, symbols_wideChar);
                symbols_wideChar = String.fromCharCode(55349, 56736 + symbols_i3);
                defineSymbol(symbols_math, main, mathord, _ch3, symbols_wideChar);
                defineSymbol(symbols_text, main, symbols_textord, _ch3, symbols_wideChar);
                symbols_wideChar = String.fromCharCode(55349, 56788 + symbols_i3);
                defineSymbol(symbols_math, main, mathord, _ch3, symbols_wideChar);
                defineSymbol(symbols_text, main, symbols_textord, _ch3, symbols_wideChar);
                symbols_wideChar = String.fromCharCode(55349, 56840 + symbols_i3);
                defineSymbol(symbols_math, main, mathord, _ch3, symbols_wideChar);
                defineSymbol(symbols_text, main, symbols_textord, _ch3, symbols_wideChar);
                symbols_wideChar = String.fromCharCode(55349, 56944 + symbols_i3);
                defineSymbol(symbols_math, main, mathord, _ch3, symbols_wideChar);
                defineSymbol(symbols_text, main, symbols_textord, _ch3, symbols_wideChar);
                if (symbols_i3 < 26) {
                  symbols_wideChar = String.fromCharCode(55349, 56632 + symbols_i3);
                  defineSymbol(symbols_math, main, mathord, _ch3, symbols_wideChar);
                  defineSymbol(symbols_text, main, symbols_textord, _ch3, symbols_wideChar);
                  symbols_wideChar = String.fromCharCode(55349, 56476 + symbols_i3);
                  defineSymbol(symbols_math, main, mathord, _ch3, symbols_wideChar);
                  defineSymbol(symbols_text, main, symbols_textord, _ch3, symbols_wideChar);
                }
              }
              symbols_wideChar = String.fromCharCode(55349, 56668);
              defineSymbol(symbols_math, main, mathord, "k", symbols_wideChar);
              defineSymbol(symbols_text, main, symbols_textord, "k", symbols_wideChar);
              for (var symbols_i4 = 0; symbols_i4 < 10; symbols_i4++) {
                var _ch4 = symbols_i4.toString();
                symbols_wideChar = String.fromCharCode(55349, 57294 + symbols_i4);
                defineSymbol(symbols_math, main, mathord, _ch4, symbols_wideChar);
                defineSymbol(symbols_text, main, symbols_textord, _ch4, symbols_wideChar);
                symbols_wideChar = String.fromCharCode(55349, 57314 + symbols_i4);
                defineSymbol(symbols_math, main, mathord, _ch4, symbols_wideChar);
                defineSymbol(symbols_text, main, symbols_textord, _ch4, symbols_wideChar);
                symbols_wideChar = String.fromCharCode(55349, 57324 + symbols_i4);
                defineSymbol(symbols_math, main, mathord, _ch4, symbols_wideChar);
                defineSymbol(symbols_text, main, symbols_textord, _ch4, symbols_wideChar);
                symbols_wideChar = String.fromCharCode(55349, 57334 + symbols_i4);
                defineSymbol(symbols_math, main, mathord, _ch4, symbols_wideChar);
                defineSymbol(symbols_text, main, symbols_textord, _ch4, symbols_wideChar);
              }
              var extraLatin = "\xC7\xD0\xDE\xE7\xFE";
              for (var _i5 = 0; _i5 < extraLatin.length; _i5++) {
                var _ch5 = extraLatin.charAt(_i5);
                defineSymbol(symbols_math, main, mathord, _ch5, _ch5);
                defineSymbol(symbols_text, main, symbols_textord, _ch5, _ch5);
              }
              defineSymbol(symbols_text, main, symbols_textord, "\xF0", "\xF0");
              defineSymbol(symbols_text, main, symbols_textord, "\u2013", "\u2013");
              defineSymbol(symbols_text, main, symbols_textord, "\u2014", "\u2014");
              defineSymbol(symbols_text, main, symbols_textord, "\u2018", "\u2018");
              defineSymbol(symbols_text, main, symbols_textord, "\u2019", "\u2019");
              defineSymbol(symbols_text, main, symbols_textord, "\u201C", "\u201C");
              defineSymbol(symbols_text, main, symbols_textord, "\u201D", "\u201D");
              var wideLatinLetterData = [
                ["mathbf", "textbf", "Main-Bold"],
                // A-Z bold upright
                ["mathbf", "textbf", "Main-Bold"],
                // a-z bold upright
                ["mathdefault", "textit", "Math-Italic"],
                // A-Z italic
                ["mathdefault", "textit", "Math-Italic"],
                // a-z italic
                ["boldsymbol", "boldsymbol", "Main-BoldItalic"],
                // A-Z bold italic
                ["boldsymbol", "boldsymbol", "Main-BoldItalic"],
                // a-z bold italic
                // Map fancy A-Z letters to script, not calligraphic.
                // This aligns with unicode-math and math fonts (except Cambria Math).
                ["mathscr", "textscr", "Script-Regular"],
                // A-Z script
                ["", "", ""],
                // a-z script.  No font
                ["", "", ""],
                // A-Z bold script. No font
                ["", "", ""],
                // a-z bold script. No font
                ["mathfrak", "textfrak", "Fraktur-Regular"],
                // A-Z Fraktur
                ["mathfrak", "textfrak", "Fraktur-Regular"],
                // a-z Fraktur
                ["mathbb", "textbb", "AMS-Regular"],
                // A-Z double-struck
                ["mathbb", "textbb", "AMS-Regular"],
                // k double-struck
                ["", "", ""],
                // A-Z bold Fraktur No font metrics
                ["", "", ""],
                // a-z bold Fraktur.   No font.
                ["mathsf", "textsf", "SansSerif-Regular"],
                // A-Z sans-serif
                ["mathsf", "textsf", "SansSerif-Regular"],
                // a-z sans-serif
                ["mathboldsf", "textboldsf", "SansSerif-Bold"],
                // A-Z bold sans-serif
                ["mathboldsf", "textboldsf", "SansSerif-Bold"],
                // a-z bold sans-serif
                ["mathitsf", "textitsf", "SansSerif-Italic"],
                // A-Z italic sans-serif
                ["mathitsf", "textitsf", "SansSerif-Italic"],
                // a-z italic sans-serif
                ["", "", ""],
                // A-Z bold italic sans. No font
                ["", "", ""],
                // a-z bold italic sans. No font
                ["mathtt", "texttt", "Typewriter-Regular"],
                // A-Z monospace
                ["mathtt", "texttt", "Typewriter-Regular"]
              ];
              var wideNumeralData = [
                ["mathbf", "textbf", "Main-Bold"],
                // 0-9 bold
                ["", "", ""],
                // 0-9 double-struck. No KaTeX font.
                ["mathsf", "textsf", "SansSerif-Regular"],
                // 0-9 sans-serif
                ["mathboldsf", "textboldsf", "SansSerif-Bold"],
                // 0-9 bold sans-serif
                ["mathtt", "texttt", "Typewriter-Regular"]
              ];
              var wide_character_wideCharacterFont = function wideCharacterFont(wideChar, mode) {
                var H = wideChar.charCodeAt(0);
                var L = wideChar.charCodeAt(1);
                var codePoint = (H - 55296) * 1024 + (L - 56320) + 65536;
                var j = mode === "math" ? 0 : 1;
                if (119808 <= codePoint && codePoint < 120484) {
                  var i = Math.floor((codePoint - 119808) / 26);
                  return [wideLatinLetterData[i][2], wideLatinLetterData[i][j]];
                } else if (120782 <= codePoint && codePoint <= 120831) {
                  var _i = Math.floor((codePoint - 120782) / 10);
                  return [wideNumeralData[_i][2], wideNumeralData[_i][j]];
                } else if (codePoint === 120485 || codePoint === 120486) {
                  return [wideLatinLetterData[0][2], wideLatinLetterData[0][j]];
                } else if (120486 < codePoint && codePoint < 120782) {
                  return ["", ""];
                } else {
                  throw new src_ParseError("Unsupported character: " + wideChar);
                }
              };
              var sizeStyleMap = [
                // Each element contains [textsize, scriptsize, scriptscriptsize].
                // The size mappings are taken from TeX with \normalsize=10pt.
                [1, 1, 1],
                // size1: [5, 5, 5]              \tiny
                [2, 1, 1],
                // size2: [6, 5, 5]
                [3, 1, 1],
                // size3: [7, 5, 5]              \scriptsize
                [4, 2, 1],
                // size4: [8, 6, 5]              \footnotesize
                [5, 2, 1],
                // size5: [9, 6, 5]              \small
                [6, 3, 1],
                // size6: [10, 7, 5]             \normalsize
                [7, 4, 2],
                // size7: [12, 8, 6]             \large
                [8, 6, 3],
                // size8: [14.4, 10, 7]          \Large
                [9, 7, 6],
                // size9: [17.28, 12, 10]        \LARGE
                [10, 8, 7],
                // size10: [20.74, 14.4, 12]     \huge
                [11, 10, 9]
              ];
              var sizeMultipliers = [
                // fontMetrics.js:getGlobalMetrics also uses size indexes, so if
                // you change size indexes, change that function.
                0.5,
                0.6,
                0.7,
                0.8,
                0.9,
                1,
                1.2,
                1.44,
                1.728,
                2.074,
                2.488
              ];
              var sizeAtStyle = function sizeAtStyle2(size, style) {
                return style.size < 2 ? size : sizeStyleMap[size - 1][style.size - 1];
              };
              var Options_Options = /* @__PURE__ */ (function() {
                function Options(data) {
                  this.style = void 0;
                  this.color = void 0;
                  this.size = void 0;
                  this.textSize = void 0;
                  this.phantom = void 0;
                  this.font = void 0;
                  this.fontFamily = void 0;
                  this.fontWeight = void 0;
                  this.fontShape = void 0;
                  this.sizeMultiplier = void 0;
                  this.maxSize = void 0;
                  this.minRuleThickness = void 0;
                  this._fontMetrics = void 0;
                  this.style = data.style;
                  this.color = data.color;
                  this.size = data.size || Options.BASESIZE;
                  this.textSize = data.textSize || this.size;
                  this.phantom = !!data.phantom;
                  this.font = data.font || "";
                  this.fontFamily = data.fontFamily || "";
                  this.fontWeight = data.fontWeight || "";
                  this.fontShape = data.fontShape || "";
                  this.sizeMultiplier = sizeMultipliers[this.size - 1];
                  this.maxSize = data.maxSize;
                  this.minRuleThickness = data.minRuleThickness;
                  this._fontMetrics = void 0;
                }
                var _proto = Options.prototype;
                _proto.extend = function extend(extension) {
                  var data = {
                    style: this.style,
                    size: this.size,
                    textSize: this.textSize,
                    color: this.color,
                    phantom: this.phantom,
                    font: this.font,
                    fontFamily: this.fontFamily,
                    fontWeight: this.fontWeight,
                    fontShape: this.fontShape,
                    maxSize: this.maxSize,
                    minRuleThickness: this.minRuleThickness
                  };
                  for (var key in extension) {
                    if (extension.hasOwnProperty(key)) {
                      data[key] = extension[key];
                    }
                  }
                  return new Options(data);
                };
                _proto.havingStyle = function havingStyle(style) {
                  if (this.style === style) {
                    return this;
                  } else {
                    return this.extend({
                      style,
                      size: sizeAtStyle(this.textSize, style)
                    });
                  }
                };
                _proto.havingCrampedStyle = function havingCrampedStyle() {
                  return this.havingStyle(this.style.cramp());
                };
                _proto.havingSize = function havingSize(size) {
                  if (this.size === size && this.textSize === size) {
                    return this;
                  } else {
                    return this.extend({
                      style: this.style.text(),
                      size,
                      textSize: size,
                      sizeMultiplier: sizeMultipliers[size - 1]
                    });
                  }
                };
                _proto.havingBaseStyle = function havingBaseStyle(style) {
                  style = style || this.style.text();
                  var wantSize = sizeAtStyle(Options.BASESIZE, style);
                  if (this.size === wantSize && this.textSize === Options.BASESIZE && this.style === style) {
                    return this;
                  } else {
                    return this.extend({
                      style,
                      size: wantSize
                    });
                  }
                };
                _proto.havingBaseSizing = function havingBaseSizing() {
                  var size;
                  switch (this.style.id) {
                    case 4:
                    case 5:
                      size = 3;
                      break;
                    case 6:
                    case 7:
                      size = 1;
                      break;
                    default:
                      size = 6;
                  }
                  return this.extend({
                    style: this.style.text(),
                    size
                  });
                };
                _proto.withColor = function withColor(color) {
                  return this.extend({
                    color
                  });
                };
                _proto.withPhantom = function withPhantom() {
                  return this.extend({
                    phantom: true
                  });
                };
                _proto.withFont = function withFont(font) {
                  return this.extend({
                    font
                  });
                };
                _proto.withTextFontFamily = function withTextFontFamily(fontFamily) {
                  return this.extend({
                    fontFamily,
                    font: ""
                  });
                };
                _proto.withTextFontWeight = function withTextFontWeight(fontWeight) {
                  return this.extend({
                    fontWeight,
                    font: ""
                  });
                };
                _proto.withTextFontShape = function withTextFontShape(fontShape) {
                  return this.extend({
                    fontShape,
                    font: ""
                  });
                };
                _proto.sizingClasses = function sizingClasses(oldOptions) {
                  if (oldOptions.size !== this.size) {
                    return ["sizing", "reset-size" + oldOptions.size, "size" + this.size];
                  } else {
                    return [];
                  }
                };
                _proto.baseSizingClasses = function baseSizingClasses() {
                  if (this.size !== Options.BASESIZE) {
                    return ["sizing", "reset-size" + this.size, "size" + Options.BASESIZE];
                  } else {
                    return [];
                  }
                };
                _proto.fontMetrics = function fontMetrics() {
                  if (!this._fontMetrics) {
                    this._fontMetrics = getGlobalMetrics(this.size);
                  }
                  return this._fontMetrics;
                };
                _proto.getColor = function getColor() {
                  if (this.phantom) {
                    return "transparent";
                  } else {
                    return this.color;
                  }
                };
                return Options;
              })();
              Options_Options.BASESIZE = 6;
              var src_Options = Options_Options;
              var ptPerUnit = {
                // https://en.wikibooks.org/wiki/LaTeX/Lengths and
                // https://tex.stackexchange.com/a/8263
                "pt": 1,
                // TeX point
                "mm": 7227 / 2540,
                // millimeter
                "cm": 7227 / 254,
                // centimeter
                "in": 72.27,
                // inch
                "bp": 803 / 800,
                // big (PostScript) points
                "pc": 12,
                // pica
                "dd": 1238 / 1157,
                // didot
                "cc": 14856 / 1157,
                // cicero (12 didot)
                "nd": 685 / 642,
                // new didot
                "nc": 1370 / 107,
                // new cicero (12 new didot)
                "sp": 1 / 65536,
                // scaled point (TeX's internal smallest unit)
                // https://tex.stackexchange.com/a/41371
                "px": 803 / 800
                // \pdfpxdimen defaults to 1 bp in pdfTeX and LuaTeX
              };
              var relativeUnit = {
                "ex": true,
                "em": true,
                "mu": true
              };
              var validUnit = function validUnit2(unit) {
                if (typeof unit !== "string") {
                  unit = unit.unit;
                }
                return unit in ptPerUnit || unit in relativeUnit || unit === "ex";
              };
              var units_calculateSize = function calculateSize(sizeValue, options) {
                var scale;
                if (sizeValue.unit in ptPerUnit) {
                  scale = ptPerUnit[sizeValue.unit] / options.fontMetrics().ptPerEm / options.sizeMultiplier;
                } else if (sizeValue.unit === "mu") {
                  scale = options.fontMetrics().cssEmPerMu;
                } else {
                  var unitOptions;
                  if (options.style.isTight()) {
                    unitOptions = options.havingStyle(options.style.text());
                  } else {
                    unitOptions = options;
                  }
                  if (sizeValue.unit === "ex") {
                    scale = unitOptions.fontMetrics().xHeight;
                  } else if (sizeValue.unit === "em") {
                    scale = unitOptions.fontMetrics().quad;
                  } else {
                    throw new src_ParseError("Invalid unit: '" + sizeValue.unit + "'");
                  }
                  if (unitOptions !== options) {
                    scale *= unitOptions.sizeMultiplier / options.sizeMultiplier;
                  }
                }
                return Math.min(sizeValue.number * scale, options.maxSize);
              };
              var mathitLetters = [
                "\\imath",
                "\u0131",
                // dotless i
                "\\jmath",
                "\u0237",
                // dotless j
                "\\pounds",
                "\\mathsterling",
                "\\textsterling",
                "\xA3"
              ];
              var buildCommon_lookupSymbol = function lookupSymbol(value, fontName, mode) {
                if (src_symbols[mode][value] && src_symbols[mode][value].replace) {
                  value = src_symbols[mode][value].replace;
                }
                return {
                  value,
                  metrics: getCharacterMetrics(value, fontName, mode)
                };
              };
              var buildCommon_makeSymbol = function makeSymbol(value, fontName, mode, options, classes) {
                var lookup = buildCommon_lookupSymbol(value, fontName, mode);
                var metrics = lookup.metrics;
                value = lookup.value;
                var symbolNode;
                if (metrics) {
                  var italic = metrics.italic;
                  if (mode === "text" || options && options.font === "mathit") {
                    italic = 0;
                  }
                  symbolNode = new domTree_SymbolNode(value, metrics.height, metrics.depth, italic, metrics.skew, metrics.width, classes);
                } else {
                  typeof console !== "undefined" && console.warn("No character metrics " + ("for '" + value + "' in style '" + fontName + "' and mode '" + mode + "'"));
                  symbolNode = new domTree_SymbolNode(value, 0, 0, 0, 0, 0, classes);
                }
                if (options) {
                  symbolNode.maxFontSize = options.sizeMultiplier;
                  if (options.style.isTight()) {
                    symbolNode.classes.push("mtight");
                  }
                  var color = options.getColor();
                  if (color) {
                    symbolNode.style.color = color;
                  }
                }
                return symbolNode;
              };
              var buildCommon_mathsym = function mathsym(value, mode, options, classes) {
                if (classes === void 0) {
                  classes = [];
                }
                if (options.font === "boldsymbol" && buildCommon_lookupSymbol(value, "Main-Bold", mode).metrics) {
                  return buildCommon_makeSymbol(value, "Main-Bold", mode, options, classes.concat(["mathbf"]));
                } else if (value === "\\" || src_symbols[mode][value].font === "main") {
                  return buildCommon_makeSymbol(value, "Main-Regular", mode, options, classes);
                } else {
                  return buildCommon_makeSymbol(value, "AMS-Regular", mode, options, classes.concat(["amsrm"]));
                }
              };
              var buildCommon_mathdefault = function mathdefault(value, mode, options, classes) {
                if (/[0-9]/.test(value.charAt(0)) || // glyphs for \imath and \jmath do not exist in Math-Italic so we
                // need to use Main-Italic instead
                utils.contains(mathitLetters, value)) {
                  return {
                    fontName: "Main-Italic",
                    fontClass: "mathit"
                  };
                } else {
                  return {
                    fontName: "Math-Italic",
                    fontClass: "mathdefault"
                  };
                }
              };
              var buildCommon_mathnormal = function mathnormal(value, mode, options, classes) {
                if (utils.contains(mathitLetters, value)) {
                  return {
                    fontName: "Main-Italic",
                    fontClass: "mathit"
                  };
                } else if (/[0-9]/.test(value.charAt(0))) {
                  return {
                    fontName: "Caligraphic-Regular",
                    fontClass: "mathcal"
                  };
                } else {
                  return {
                    fontName: "Math-Italic",
                    fontClass: "mathdefault"
                  };
                }
              };
              var boldsymbol = function boldsymbol2(value, mode, options, classes) {
                if (buildCommon_lookupSymbol(value, "Math-BoldItalic", mode).metrics) {
                  return {
                    fontName: "Math-BoldItalic",
                    fontClass: "boldsymbol"
                  };
                } else {
                  return {
                    fontName: "Main-Bold",
                    fontClass: "mathbf"
                  };
                }
              };
              var buildCommon_makeOrd = function makeOrd(group, options, type) {
                var mode = group.mode;
                var text = group.text;
                var classes = ["mord"];
                var isFont = mode === "math" || mode === "text" && options.font;
                var fontOrFamily = isFont ? options.font : options.fontFamily;
                if (text.charCodeAt(0) === 55349) {
                  var _wideCharacterFont = wide_character_wideCharacterFont(text, mode), wideFontName = _wideCharacterFont[0], wideFontClass = _wideCharacterFont[1];
                  return buildCommon_makeSymbol(text, wideFontName, mode, options, classes.concat(wideFontClass));
                } else if (fontOrFamily) {
                  var fontName;
                  var fontClasses;
                  if (fontOrFamily === "boldsymbol" || fontOrFamily === "mathnormal") {
                    var fontData = fontOrFamily === "boldsymbol" ? boldsymbol(text, mode, options, classes) : buildCommon_mathnormal(text, mode, options, classes);
                    fontName = fontData.fontName;
                    fontClasses = [fontData.fontClass];
                  } else if (utils.contains(mathitLetters, text)) {
                    fontName = "Main-Italic";
                    fontClasses = ["mathit"];
                  } else if (isFont) {
                    fontName = fontMap[fontOrFamily].fontName;
                    fontClasses = [fontOrFamily];
                  } else {
                    fontName = retrieveTextFontName(fontOrFamily, options.fontWeight, options.fontShape);
                    fontClasses = [fontOrFamily, options.fontWeight, options.fontShape];
                  }
                  if (buildCommon_lookupSymbol(text, fontName, mode).metrics) {
                    return buildCommon_makeSymbol(text, fontName, mode, options, classes.concat(fontClasses));
                  } else if (ligatures.hasOwnProperty(text) && fontName.substr(0, 10) === "Typewriter") {
                    var parts = [];
                    for (var i = 0; i < text.length; i++) {
                      parts.push(buildCommon_makeSymbol(text[i], fontName, mode, options, classes.concat(fontClasses)));
                    }
                    return buildCommon_makeFragment(parts);
                  }
                }
                if (type === "mathord") {
                  var fontLookup = buildCommon_mathdefault(text, mode, options, classes);
                  return buildCommon_makeSymbol(text, fontLookup.fontName, mode, options, classes.concat([fontLookup.fontClass]));
                } else if (type === "textord") {
                  var font = src_symbols[mode][text] && src_symbols[mode][text].font;
                  if (font === "ams") {
                    var _fontName = retrieveTextFontName("amsrm", options.fontWeight, options.fontShape);
                    return buildCommon_makeSymbol(text, _fontName, mode, options, classes.concat("amsrm", options.fontWeight, options.fontShape));
                  } else if (font === "main" || !font) {
                    var _fontName2 = retrieveTextFontName("textrm", options.fontWeight, options.fontShape);
                    return buildCommon_makeSymbol(text, _fontName2, mode, options, classes.concat(options.fontWeight, options.fontShape));
                  } else {
                    var _fontName3 = retrieveTextFontName(font, options.fontWeight, options.fontShape);
                    return buildCommon_makeSymbol(text, _fontName3, mode, options, classes.concat(_fontName3, options.fontWeight, options.fontShape));
                  }
                } else {
                  throw new Error("unexpected type: " + type + " in makeOrd");
                }
              };
              var buildCommon_canCombine = function canCombine(prev, next) {
                if (createClass(prev.classes) !== createClass(next.classes) || prev.skew !== next.skew || prev.maxFontSize !== next.maxFontSize) {
                  return false;
                }
                for (var style in prev.style) {
                  if (prev.style.hasOwnProperty(style) && prev.style[style] !== next.style[style]) {
                    return false;
                  }
                }
                for (var _style in next.style) {
                  if (next.style.hasOwnProperty(_style) && prev.style[_style] !== next.style[_style]) {
                    return false;
                  }
                }
                return true;
              };
              var buildCommon_tryCombineChars = function tryCombineChars(chars) {
                for (var i = 0; i < chars.length - 1; i++) {
                  var prev = chars[i];
                  var next = chars[i + 1];
                  if (prev instanceof domTree_SymbolNode && next instanceof domTree_SymbolNode && buildCommon_canCombine(prev, next)) {
                    prev.text += next.text;
                    prev.height = Math.max(prev.height, next.height);
                    prev.depth = Math.max(prev.depth, next.depth);
                    prev.italic = next.italic;
                    chars.splice(i + 1, 1);
                    i--;
                  }
                }
                return chars;
              };
              var sizeElementFromChildren = function sizeElementFromChildren2(elem) {
                var height = 0;
                var depth = 0;
                var maxFontSize = 0;
                for (var i = 0; i < elem.children.length; i++) {
                  var child = elem.children[i];
                  if (child.height > height) {
                    height = child.height;
                  }
                  if (child.depth > depth) {
                    depth = child.depth;
                  }
                  if (child.maxFontSize > maxFontSize) {
                    maxFontSize = child.maxFontSize;
                  }
                }
                elem.height = height;
                elem.depth = depth;
                elem.maxFontSize = maxFontSize;
              };
              var buildCommon_makeSpan = function makeSpan(classes, children, options, style) {
                var span = new domTree_Span(classes, children, options, style);
                sizeElementFromChildren(span);
                return span;
              };
              var buildCommon_makeSvgSpan = function makeSvgSpan(classes, children, options, style) {
                return new domTree_Span(classes, children, options, style);
              };
              var makeLineSpan = function makeLineSpan2(className, options, thickness) {
                var line = buildCommon_makeSpan([className], [], options);
                line.height = Math.max(thickness || options.fontMetrics().defaultRuleThickness, options.minRuleThickness);
                line.style.borderBottomWidth = line.height + "em";
                line.maxFontSize = 1;
                return line;
              };
              var buildCommon_makeAnchor = function makeAnchor(href, classes, children, options) {
                var anchor = new domTree_Anchor(href, classes, children, options);
                sizeElementFromChildren(anchor);
                return anchor;
              };
              var buildCommon_makeFragment = function makeFragment(children) {
                var fragment = new tree_DocumentFragment(children);
                sizeElementFromChildren(fragment);
                return fragment;
              };
              var buildCommon_wrapFragment = function wrapFragment(group, options) {
                if (group instanceof tree_DocumentFragment) {
                  return buildCommon_makeSpan([], [group], options);
                }
                return group;
              };
              var getVListChildrenAndDepth = function getVListChildrenAndDepth2(params) {
                if (params.positionType === "individualShift") {
                  var oldChildren = params.children;
                  var children = [oldChildren[0]];
                  var _depth = -oldChildren[0].shift - oldChildren[0].elem.depth;
                  var currPos = _depth;
                  for (var i = 1; i < oldChildren.length; i++) {
                    var diff = -oldChildren[i].shift - currPos - oldChildren[i].elem.depth;
                    var size = diff - (oldChildren[i - 1].elem.height + oldChildren[i - 1].elem.depth);
                    currPos = currPos + diff;
                    children.push({
                      type: "kern",
                      size
                    });
                    children.push(oldChildren[i]);
                  }
                  return {
                    children,
                    depth: _depth
                  };
                }
                var depth;
                if (params.positionType === "top") {
                  var bottom = params.positionData;
                  for (var _i = 0; _i < params.children.length; _i++) {
                    var child = params.children[_i];
                    bottom -= child.type === "kern" ? child.size : child.elem.height + child.elem.depth;
                  }
                  depth = bottom;
                } else if (params.positionType === "bottom") {
                  depth = -params.positionData;
                } else {
                  var firstChild = params.children[0];
                  if (firstChild.type !== "elem") {
                    throw new Error('First child must have type "elem".');
                  }
                  if (params.positionType === "shift") {
                    depth = -firstChild.elem.depth - params.positionData;
                  } else if (params.positionType === "firstBaseline") {
                    depth = -firstChild.elem.depth;
                  } else {
                    throw new Error("Invalid positionType " + params.positionType + ".");
                  }
                }
                return {
                  children: params.children,
                  depth
                };
              };
              var buildCommon_makeVList = function makeVList(params, options) {
                var _getVListChildrenAndD = getVListChildrenAndDepth(params), children = _getVListChildrenAndD.children, depth = _getVListChildrenAndD.depth;
                var pstrutSize = 0;
                for (var i = 0; i < children.length; i++) {
                  var child = children[i];
                  if (child.type === "elem") {
                    var elem = child.elem;
                    pstrutSize = Math.max(pstrutSize, elem.maxFontSize, elem.height);
                  }
                }
                pstrutSize += 2;
                var pstrut = buildCommon_makeSpan(["pstrut"], []);
                pstrut.style.height = pstrutSize + "em";
                var realChildren = [];
                var minPos = depth;
                var maxPos = depth;
                var currPos = depth;
                for (var _i2 = 0; _i2 < children.length; _i2++) {
                  var _child = children[_i2];
                  if (_child.type === "kern") {
                    currPos += _child.size;
                  } else {
                    var _elem = _child.elem;
                    var classes = _child.wrapperClasses || [];
                    var style = _child.wrapperStyle || {};
                    var childWrap = buildCommon_makeSpan(classes, [pstrut, _elem], void 0, style);
                    childWrap.style.top = -pstrutSize - currPos - _elem.depth + "em";
                    if (_child.marginLeft) {
                      childWrap.style.marginLeft = _child.marginLeft;
                    }
                    if (_child.marginRight) {
                      childWrap.style.marginRight = _child.marginRight;
                    }
                    realChildren.push(childWrap);
                    currPos += _elem.height + _elem.depth;
                  }
                  minPos = Math.min(minPos, currPos);
                  maxPos = Math.max(maxPos, currPos);
                }
                var vlist = buildCommon_makeSpan(["vlist"], realChildren);
                vlist.style.height = maxPos + "em";
                var rows;
                if (minPos < 0) {
                  var emptySpan = buildCommon_makeSpan([], []);
                  var depthStrut = buildCommon_makeSpan(["vlist"], [emptySpan]);
                  depthStrut.style.height = -minPos + "em";
                  var topStrut = buildCommon_makeSpan(["vlist-s"], [new domTree_SymbolNode("\u200B")]);
                  rows = [buildCommon_makeSpan(["vlist-r"], [vlist, topStrut]), buildCommon_makeSpan(["vlist-r"], [depthStrut])];
                } else {
                  rows = [buildCommon_makeSpan(["vlist-r"], [vlist])];
                }
                var vtable = buildCommon_makeSpan(["vlist-t"], rows);
                if (rows.length === 2) {
                  vtable.classes.push("vlist-t2");
                }
                vtable.height = maxPos;
                vtable.depth = -minPos;
                return vtable;
              };
              var buildCommon_makeGlue = function makeGlue(measurement, options) {
                var rule = buildCommon_makeSpan(["mspace"], [], options);
                var size = units_calculateSize(measurement, options);
                rule.style.marginRight = size + "em";
                return rule;
              };
              var retrieveTextFontName = function retrieveTextFontName2(fontFamily, fontWeight, fontShape) {
                var baseFontName = "";
                switch (fontFamily) {
                  case "amsrm":
                    baseFontName = "AMS";
                    break;
                  case "textrm":
                    baseFontName = "Main";
                    break;
                  case "textsf":
                    baseFontName = "SansSerif";
                    break;
                  case "texttt":
                    baseFontName = "Typewriter";
                    break;
                  default:
                    baseFontName = fontFamily;
                }
                var fontStylesName;
                if (fontWeight === "textbf" && fontShape === "textit") {
                  fontStylesName = "BoldItalic";
                } else if (fontWeight === "textbf") {
                  fontStylesName = "Bold";
                } else if (fontWeight === "textit") {
                  fontStylesName = "Italic";
                } else {
                  fontStylesName = "Regular";
                }
                return baseFontName + "-" + fontStylesName;
              };
              var fontMap = {
                // styles
                "mathbf": {
                  variant: "bold",
                  fontName: "Main-Bold"
                },
                "mathrm": {
                  variant: "normal",
                  fontName: "Main-Regular"
                },
                "textit": {
                  variant: "italic",
                  fontName: "Main-Italic"
                },
                "mathit": {
                  variant: "italic",
                  fontName: "Main-Italic"
                },
                // Default math font, "mathnormal" and "boldsymbol" are missing because they
                // require the use of several fonts: Main-Italic and Math-Italic for default
                // math font, Main-Italic, Math-Italic, Caligraphic for "mathnormal", and
                // Math-BoldItalic and Main-Bold for "boldsymbol".  This is handled by a
                // special case in makeOrd which ends up calling mathdefault, mathnormal,
                // and boldsymbol.
                // families
                "mathbb": {
                  variant: "double-struck",
                  fontName: "AMS-Regular"
                },
                "mathcal": {
                  variant: "script",
                  fontName: "Caligraphic-Regular"
                },
                "mathfrak": {
                  variant: "fraktur",
                  fontName: "Fraktur-Regular"
                },
                "mathscr": {
                  variant: "script",
                  fontName: "Script-Regular"
                },
                "mathsf": {
                  variant: "sans-serif",
                  fontName: "SansSerif-Regular"
                },
                "mathtt": {
                  variant: "monospace",
                  fontName: "Typewriter-Regular"
                }
              };
              var svgData = {
                //   path, width, height
                vec: ["vec", 0.471, 0.714],
                // values from the font glyph
                oiintSize1: ["oiintSize1", 0.957, 0.499],
                // oval to overlay the integrand
                oiintSize2: ["oiintSize2", 1.472, 0.659],
                oiiintSize1: ["oiiintSize1", 1.304, 0.499],
                oiiintSize2: ["oiiintSize2", 1.98, 0.659]
              };
              var buildCommon_staticSvg = function staticSvg(value, options) {
                var _svgData$value = svgData[value], pathName = _svgData$value[0], width = _svgData$value[1], height = _svgData$value[2];
                var path = new domTree_PathNode(pathName);
                var svgNode = new SvgNode([path], {
                  "width": width + "em",
                  "height": height + "em",
                  // Override CSS rule `.katex svg { width: 100% }`
                  "style": "width:" + width + "em",
                  "viewBox": "0 0 " + 1e3 * width + " " + 1e3 * height,
                  "preserveAspectRatio": "xMinYMin"
                });
                var span = buildCommon_makeSvgSpan(["overlay"], [svgNode], options);
                span.height = height;
                span.style.height = height + "em";
                span.style.width = width + "em";
                return span;
              };
              var buildCommon = {
                fontMap,
                makeSymbol: buildCommon_makeSymbol,
                mathsym: buildCommon_mathsym,
                makeSpan: buildCommon_makeSpan,
                makeSvgSpan: buildCommon_makeSvgSpan,
                makeLineSpan,
                makeAnchor: buildCommon_makeAnchor,
                makeFragment: buildCommon_makeFragment,
                wrapFragment: buildCommon_wrapFragment,
                makeVList: buildCommon_makeVList,
                makeOrd: buildCommon_makeOrd,
                makeGlue: buildCommon_makeGlue,
                staticSvg: buildCommon_staticSvg,
                svgData,
                tryCombineChars: buildCommon_tryCombineChars
              };
              function assertNodeType(node, type) {
                var typedNode = checkNodeType(node, type);
                if (!typedNode) {
                  throw new Error("Expected node of type " + type + ", but got " + (node ? "node of type " + node.type : String(node)));
                }
                return typedNode;
              }
              function checkNodeType(node, type) {
                if (node && node.type === type) {
                  return node;
                }
                return null;
              }
              function assertAtomFamily(node, family) {
                var typedNode = checkAtomFamily(node, family);
                if (!typedNode) {
                  throw new Error('Expected node of type "atom" and family "' + family + '", but got ' + (node ? node.type === "atom" ? "atom of family " + node.family : "node of type " + node.type : String(node)));
                }
                return typedNode;
              }
              function checkAtomFamily(node, family) {
                return node && node.type === "atom" && node.family === family ? node : null;
              }
              function assertSymbolNodeType(node) {
                var typedNode = checkSymbolNodeType(node);
                if (!typedNode) {
                  throw new Error("Expected node of symbol group type, but got " + (node ? "node of type " + node.type : String(node)));
                }
                return typedNode;
              }
              function checkSymbolNodeType(node) {
                if (node && (node.type === "atom" || NON_ATOMS.hasOwnProperty(node.type))) {
                  return node;
                }
                return null;
              }
              var thinspace = {
                number: 3,
                unit: "mu"
              };
              var mediumspace = {
                number: 4,
                unit: "mu"
              };
              var thickspace = {
                number: 5,
                unit: "mu"
              };
              var spacings = {
                mord: {
                  mop: thinspace,
                  mbin: mediumspace,
                  mrel: thickspace,
                  minner: thinspace
                },
                mop: {
                  mord: thinspace,
                  mop: thinspace,
                  mrel: thickspace,
                  minner: thinspace
                },
                mbin: {
                  mord: mediumspace,
                  mop: mediumspace,
                  mopen: mediumspace,
                  minner: mediumspace
                },
                mrel: {
                  mord: thickspace,
                  mop: thickspace,
                  mopen: thickspace,
                  minner: thickspace
                },
                mopen: {},
                mclose: {
                  mop: thinspace,
                  mbin: mediumspace,
                  mrel: thickspace,
                  minner: thinspace
                },
                mpunct: {
                  mord: thinspace,
                  mop: thinspace,
                  mrel: thickspace,
                  mopen: thinspace,
                  mclose: thinspace,
                  mpunct: thinspace,
                  minner: thinspace
                },
                minner: {
                  mord: thinspace,
                  mop: thinspace,
                  mbin: mediumspace,
                  mrel: thickspace,
                  mopen: thinspace,
                  mpunct: thinspace,
                  minner: thinspace
                }
              };
              var tightSpacings = {
                mord: {
                  mop: thinspace
                },
                mop: {
                  mord: thinspace,
                  mop: thinspace
                },
                mbin: {},
                mrel: {},
                mopen: {},
                mclose: {
                  mop: thinspace
                },
                mpunct: {},
                minner: {
                  mop: thinspace
                }
              };
              var _functions = {};
              var _htmlGroupBuilders = {};
              var _mathmlGroupBuilders = {};
              function defineFunction(_ref) {
                var type = _ref.type, names = _ref.names, props = _ref.props, handler = _ref.handler, htmlBuilder = _ref.htmlBuilder, mathmlBuilder = _ref.mathmlBuilder;
                var data = {
                  type,
                  numArgs: props.numArgs,
                  argTypes: props.argTypes,
                  greediness: props.greediness === void 0 ? 1 : props.greediness,
                  allowedInText: !!props.allowedInText,
                  allowedInMath: props.allowedInMath === void 0 ? true : props.allowedInMath,
                  numOptionalArgs: props.numOptionalArgs || 0,
                  infix: !!props.infix,
                  handler
                };
                for (var i = 0; i < names.length; ++i) {
                  _functions[names[i]] = data;
                }
                if (type) {
                  if (htmlBuilder) {
                    _htmlGroupBuilders[type] = htmlBuilder;
                  }
                  if (mathmlBuilder) {
                    _mathmlGroupBuilders[type] = mathmlBuilder;
                  }
                }
              }
              function defineFunctionBuilders(_ref2) {
                var type = _ref2.type, htmlBuilder = _ref2.htmlBuilder, mathmlBuilder = _ref2.mathmlBuilder;
                defineFunction({
                  type,
                  names: [],
                  props: {
                    numArgs: 0
                  },
                  handler: function handler() {
                    throw new Error("Should never be called.");
                  },
                  htmlBuilder,
                  mathmlBuilder
                });
              }
              var defineFunction_ordargument = function ordargument(arg) {
                var node = checkNodeType(arg, "ordgroup");
                return node ? node.body : [arg];
              };
              var buildHTML_makeSpan = buildCommon.makeSpan;
              var binLeftCanceller = ["leftmost", "mbin", "mopen", "mrel", "mop", "mpunct"];
              var binRightCanceller = ["rightmost", "mrel", "mclose", "mpunct"];
              var styleMap = {
                "display": src_Style.DISPLAY,
                "text": src_Style.TEXT,
                "script": src_Style.SCRIPT,
                "scriptscript": src_Style.SCRIPTSCRIPT
              };
              var DomEnum = {
                mord: "mord",
                mop: "mop",
                mbin: "mbin",
                mrel: "mrel",
                mopen: "mopen",
                mclose: "mclose",
                mpunct: "mpunct",
                minner: "minner"
              };
              var buildHTML_buildExpression = function buildExpression(expression, options, isRealGroup, surrounding) {
                if (surrounding === void 0) {
                  surrounding = [null, null];
                }
                var groups = [];
                for (var i = 0; i < expression.length; i++) {
                  var output = buildHTML_buildGroup(expression[i], options);
                  if (output instanceof tree_DocumentFragment) {
                    var children = output.children;
                    groups.push.apply(groups, children);
                  } else {
                    groups.push(output);
                  }
                }
                if (!isRealGroup) {
                  return groups;
                }
                var glueOptions = options;
                if (expression.length === 1) {
                  var node = checkNodeType(expression[0], "sizing") || checkNodeType(expression[0], "styling");
                  if (!node) {
                  } else if (node.type === "sizing") {
                    glueOptions = options.havingSize(node.size);
                  } else if (node.type === "styling") {
                    glueOptions = options.havingStyle(styleMap[node.style]);
                  }
                }
                var dummyPrev = buildHTML_makeSpan([surrounding[0] || "leftmost"], [], options);
                var dummyNext = buildHTML_makeSpan([surrounding[1] || "rightmost"], [], options);
                traverseNonSpaceNodes(groups, function(node2, prev) {
                  var prevType = prev.classes[0];
                  var type = node2.classes[0];
                  if (prevType === "mbin" && utils.contains(binRightCanceller, type)) {
                    prev.classes[0] = "mord";
                  } else if (type === "mbin" && utils.contains(binLeftCanceller, prevType)) {
                    node2.classes[0] = "mord";
                  }
                }, {
                  node: dummyPrev
                }, dummyNext);
                traverseNonSpaceNodes(groups, function(node2, prev) {
                  var prevType = getTypeOfDomTree(prev);
                  var type = getTypeOfDomTree(node2);
                  var space = prevType && type ? node2.hasClass("mtight") ? tightSpacings[prevType][type] : spacings[prevType][type] : null;
                  if (space) {
                    return buildCommon.makeGlue(space, glueOptions);
                  }
                }, {
                  node: dummyPrev
                }, dummyNext);
                return groups;
              };
              var traverseNonSpaceNodes = function traverseNonSpaceNodes2(nodes, callback, prev, next) {
                if (next) {
                  nodes.push(next);
                }
                var i = 0;
                for (; i < nodes.length; i++) {
                  var node = nodes[i];
                  var partialGroup = buildHTML_checkPartialGroup(node);
                  if (partialGroup) {
                    traverseNonSpaceNodes2(partialGroup.children, callback, prev);
                    continue;
                  }
                  if (node.classes[0] === "mspace") {
                    continue;
                  }
                  var result = callback(node, prev.node);
                  if (result) {
                    if (prev.insertAfter) {
                      prev.insertAfter(result);
                    } else {
                      nodes.unshift(result);
                      i++;
                    }
                  }
                  prev.node = node;
                  prev.insertAfter = /* @__PURE__ */ (function(index) {
                    return function(n) {
                      nodes.splice(index + 1, 0, n);
                      i++;
                    };
                  })(i);
                }
                if (next) {
                  nodes.pop();
                }
              };
              var buildHTML_checkPartialGroup = function checkPartialGroup(node) {
                if (node instanceof tree_DocumentFragment || node instanceof domTree_Anchor) {
                  return node;
                }
                return null;
              };
              var getOutermostNode = function getOutermostNode2(node, side) {
                var partialGroup = buildHTML_checkPartialGroup(node);
                if (partialGroup) {
                  var children = partialGroup.children;
                  if (children.length) {
                    if (side === "right") {
                      return getOutermostNode2(children[children.length - 1], "right");
                    } else if (side === "left") {
                      return getOutermostNode2(children[0], "left");
                    }
                  }
                }
                return node;
              };
              var getTypeOfDomTree = function getTypeOfDomTree2(node, side) {
                if (!node) {
                  return null;
                }
                if (side) {
                  node = getOutermostNode(node, side);
                }
                return DomEnum[node.classes[0]] || null;
              };
              var makeNullDelimiter = function makeNullDelimiter2(options, classes) {
                var moreClasses = ["nulldelimiter"].concat(options.baseSizingClasses());
                return buildHTML_makeSpan(classes.concat(moreClasses));
              };
              var buildHTML_buildGroup = function buildGroup(group, options, baseOptions) {
                if (!group) {
                  return buildHTML_makeSpan();
                }
                if (_htmlGroupBuilders[group.type]) {
                  var groupNode = _htmlGroupBuilders[group.type](group, options);
                  if (baseOptions && options.size !== baseOptions.size) {
                    groupNode = buildHTML_makeSpan(options.sizingClasses(baseOptions), [groupNode], options);
                    var multiplier = options.sizeMultiplier / baseOptions.sizeMultiplier;
                    groupNode.height *= multiplier;
                    groupNode.depth *= multiplier;
                  }
                  return groupNode;
                } else {
                  throw new src_ParseError("Got group of unknown type: '" + group.type + "'");
                }
              };
              function buildHTMLUnbreakable(children, options) {
                var body = buildHTML_makeSpan(["base"], children, options);
                var strut = buildHTML_makeSpan(["strut"]);
                strut.style.height = body.height + body.depth + "em";
                strut.style.verticalAlign = -body.depth + "em";
                body.children.unshift(strut);
                return body;
              }
              function buildHTML(tree, options) {
                var tag = null;
                if (tree.length === 1 && tree[0].type === "tag") {
                  tag = tree[0].tag;
                  tree = tree[0].body;
                }
                var expression = buildHTML_buildExpression(tree, options, true);
                var children = [];
                var parts = [];
                for (var i = 0; i < expression.length; i++) {
                  parts.push(expression[i]);
                  if (expression[i].hasClass("mbin") || expression[i].hasClass("mrel") || expression[i].hasClass("allowbreak")) {
                    var nobreak = false;
                    while (i < expression.length - 1 && expression[i + 1].hasClass("mspace") && !expression[i + 1].hasClass("newline")) {
                      i++;
                      parts.push(expression[i]);
                      if (expression[i].hasClass("nobreak")) {
                        nobreak = true;
                      }
                    }
                    if (!nobreak) {
                      children.push(buildHTMLUnbreakable(parts, options));
                      parts = [];
                    }
                  } else if (expression[i].hasClass("newline")) {
                    parts.pop();
                    if (parts.length > 0) {
                      children.push(buildHTMLUnbreakable(parts, options));
                      parts = [];
                    }
                    children.push(expression[i]);
                  }
                }
                if (parts.length > 0) {
                  children.push(buildHTMLUnbreakable(parts, options));
                }
                var tagChild;
                if (tag) {
                  tagChild = buildHTMLUnbreakable(buildHTML_buildExpression(tag, options, true));
                  tagChild.classes = ["tag"];
                  children.push(tagChild);
                }
                var htmlNode = buildHTML_makeSpan(["katex-html"], children);
                htmlNode.setAttribute("aria-hidden", "true");
                if (tagChild) {
                  var strut = tagChild.children[0];
                  strut.style.height = htmlNode.height + htmlNode.depth + "em";
                  strut.style.verticalAlign = -htmlNode.depth + "em";
                }
                return htmlNode;
              }
              function newDocumentFragment(children) {
                return new tree_DocumentFragment(children);
              }
              var mathMLTree_MathNode = /* @__PURE__ */ (function() {
                function MathNode(type, children) {
                  this.type = void 0;
                  this.attributes = void 0;
                  this.children = void 0;
                  this.type = type;
                  this.attributes = {};
                  this.children = children || [];
                }
                var _proto = MathNode.prototype;
                _proto.setAttribute = function setAttribute(name, value) {
                  this.attributes[name] = value;
                };
                _proto.getAttribute = function getAttribute(name) {
                  return this.attributes[name];
                };
                _proto.toNode = function toNode() {
                  var node = document.createElementNS("http://www.w3.org/1998/Math/MathML", this.type);
                  for (var attr in this.attributes) {
                    if (Object.prototype.hasOwnProperty.call(this.attributes, attr)) {
                      node.setAttribute(attr, this.attributes[attr]);
                    }
                  }
                  for (var i = 0; i < this.children.length; i++) {
                    node.appendChild(this.children[i].toNode());
                  }
                  return node;
                };
                _proto.toMarkup = function toMarkup() {
                  var markup = "<" + this.type;
                  for (var attr in this.attributes) {
                    if (Object.prototype.hasOwnProperty.call(this.attributes, attr)) {
                      markup += " " + attr + '="';
                      markup += utils.escape(this.attributes[attr]);
                      markup += '"';
                    }
                  }
                  markup += ">";
                  for (var i = 0; i < this.children.length; i++) {
                    markup += this.children[i].toMarkup();
                  }
                  markup += "</" + this.type + ">";
                  return markup;
                };
                _proto.toText = function toText() {
                  return this.children.map(function(child) {
                    return child.toText();
                  }).join("");
                };
                return MathNode;
              })();
              var mathMLTree_TextNode = /* @__PURE__ */ (function() {
                function TextNode(text) {
                  this.text = void 0;
                  this.text = text;
                }
                var _proto2 = TextNode.prototype;
                _proto2.toNode = function toNode() {
                  return document.createTextNode(this.text);
                };
                _proto2.toMarkup = function toMarkup() {
                  return utils.escape(this.toText());
                };
                _proto2.toText = function toText() {
                  return this.text;
                };
                return TextNode;
              })();
              var SpaceNode = /* @__PURE__ */ (function() {
                function SpaceNode2(width) {
                  this.width = void 0;
                  this.character = void 0;
                  this.width = width;
                  if (width >= 0.05555 && width <= 0.05556) {
                    this.character = "\u200A";
                  } else if (width >= 0.1666 && width <= 0.1667) {
                    this.character = "\u2009";
                  } else if (width >= 0.2222 && width <= 0.2223) {
                    this.character = "\u2005";
                  } else if (width >= 0.2777 && width <= 0.2778) {
                    this.character = "\u2005\u200A";
                  } else if (width >= -0.05556 && width <= -0.05555) {
                    this.character = "\u200A\u2063";
                  } else if (width >= -0.1667 && width <= -0.1666) {
                    this.character = "\u2009\u2063";
                  } else if (width >= -0.2223 && width <= -0.2222) {
                    this.character = "\u205F\u2063";
                  } else if (width >= -0.2778 && width <= -0.2777) {
                    this.character = "\u2005\u2063";
                  } else {
                    this.character = null;
                  }
                }
                var _proto3 = SpaceNode2.prototype;
                _proto3.toNode = function toNode() {
                  if (this.character) {
                    return document.createTextNode(this.character);
                  } else {
                    var node = document.createElementNS("http://www.w3.org/1998/Math/MathML", "mspace");
                    node.setAttribute("width", this.width + "em");
                    return node;
                  }
                };
                _proto3.toMarkup = function toMarkup() {
                  if (this.character) {
                    return "<mtext>" + this.character + "</mtext>";
                  } else {
                    return '<mspace width="' + this.width + 'em"/>';
                  }
                };
                _proto3.toText = function toText() {
                  if (this.character) {
                    return this.character;
                  } else {
                    return " ";
                  }
                };
                return SpaceNode2;
              })();
              var mathMLTree = {
                MathNode: mathMLTree_MathNode,
                TextNode: mathMLTree_TextNode,
                SpaceNode,
                newDocumentFragment
              };
              var buildMathML_makeText = function makeText(text, mode, options) {
                if (src_symbols[mode][text] && src_symbols[mode][text].replace && text.charCodeAt(0) !== 55349 && !(ligatures.hasOwnProperty(text) && options && (options.fontFamily && options.fontFamily.substr(4, 2) === "tt" || options.font && options.font.substr(4, 2) === "tt"))) {
                  text = src_symbols[mode][text].replace;
                }
                return new mathMLTree.TextNode(text);
              };
              var buildMathML_makeRow = function makeRow(body) {
                if (body.length === 1) {
                  return body[0];
                } else {
                  return new mathMLTree.MathNode("mrow", body);
                }
              };
              var buildMathML_getVariant = function getVariant(group, options) {
                if (options.fontFamily === "texttt") {
                  return "monospace";
                } else if (options.fontFamily === "textsf") {
                  if (options.fontShape === "textit" && options.fontWeight === "textbf") {
                    return "sans-serif-bold-italic";
                  } else if (options.fontShape === "textit") {
                    return "sans-serif-italic";
                  } else if (options.fontWeight === "textbf") {
                    return "bold-sans-serif";
                  } else {
                    return "sans-serif";
                  }
                } else if (options.fontShape === "textit" && options.fontWeight === "textbf") {
                  return "bold-italic";
                } else if (options.fontShape === "textit") {
                  return "italic";
                } else if (options.fontWeight === "textbf") {
                  return "bold";
                }
                var font = options.font;
                if (!font || font === "mathnormal") {
                  return null;
                }
                var mode = group.mode;
                if (font === "mathit") {
                  return "italic";
                } else if (font === "boldsymbol") {
                  return "bold-italic";
                } else if (font === "mathbf") {
                  return "bold";
                } else if (font === "mathbb") {
                  return "double-struck";
                } else if (font === "mathfrak") {
                  return "fraktur";
                } else if (font === "mathscr" || font === "mathcal") {
                  return "script";
                } else if (font === "mathsf") {
                  return "sans-serif";
                } else if (font === "mathtt") {
                  return "monospace";
                }
                var text = group.text;
                if (utils.contains(["\\imath", "\\jmath"], text)) {
                  return null;
                }
                if (src_symbols[mode][text] && src_symbols[mode][text].replace) {
                  text = src_symbols[mode][text].replace;
                }
                var fontName = buildCommon.fontMap[font].fontName;
                if (getCharacterMetrics(text, fontName, mode)) {
                  return buildCommon.fontMap[font].variant;
                }
                return null;
              };
              var buildMathML_buildExpression = function buildExpression(expression, options, isOrdgroup) {
                if (expression.length === 1) {
                  var group = buildMathML_buildGroup(expression[0], options);
                  if (isOrdgroup && group instanceof mathMLTree_MathNode && group.type === "mo") {
                    group.setAttribute("lspace", "0em");
                    group.setAttribute("rspace", "0em");
                  }
                  return [group];
                }
                var groups = [];
                var lastGroup;
                for (var i = 0; i < expression.length; i++) {
                  var _group = buildMathML_buildGroup(expression[i], options);
                  if (_group instanceof mathMLTree_MathNode && lastGroup instanceof mathMLTree_MathNode) {
                    if (_group.type === "mtext" && lastGroup.type === "mtext" && _group.getAttribute("mathvariant") === lastGroup.getAttribute("mathvariant")) {
                      var _lastGroup$children;
                      (_lastGroup$children = lastGroup.children).push.apply(_lastGroup$children, _group.children);
                      continue;
                    } else if (_group.type === "mn" && lastGroup.type === "mn") {
                      var _lastGroup$children2;
                      (_lastGroup$children2 = lastGroup.children).push.apply(_lastGroup$children2, _group.children);
                      continue;
                    } else if (_group.type === "mi" && _group.children.length === 1 && lastGroup.type === "mn") {
                      var child = _group.children[0];
                      if (child instanceof mathMLTree_TextNode && child.text === ".") {
                        var _lastGroup$children3;
                        (_lastGroup$children3 = lastGroup.children).push.apply(_lastGroup$children3, _group.children);
                        continue;
                      }
                    } else if (lastGroup.type === "mi" && lastGroup.children.length === 1) {
                      var lastChild = lastGroup.children[0];
                      if (lastChild instanceof mathMLTree_TextNode && lastChild.text === "\u0338" && (_group.type === "mo" || _group.type === "mi" || _group.type === "mn")) {
                        var _child = _group.children[0];
                        if (_child instanceof mathMLTree_TextNode && _child.text.length > 0) {
                          _child.text = _child.text.slice(0, 1) + "\u0338" + _child.text.slice(1);
                          groups.pop();
                        }
                      }
                    }
                  }
                  groups.push(_group);
                  lastGroup = _group;
                }
                return groups;
              };
              var buildExpressionRow = function buildExpressionRow2(expression, options, isOrdgroup) {
                return buildMathML_makeRow(buildMathML_buildExpression(expression, options, isOrdgroup));
              };
              var buildMathML_buildGroup = function buildGroup(group, options) {
                if (!group) {
                  return new mathMLTree.MathNode("mrow");
                }
                if (_mathmlGroupBuilders[group.type]) {
                  var result = _mathmlGroupBuilders[group.type](group, options);
                  return result;
                } else {
                  throw new src_ParseError("Got group of unknown type: '" + group.type + "'");
                }
              };
              function buildMathML(tree, texExpression, options, forMathmlOnly) {
                var expression = buildMathML_buildExpression(tree, options);
                var wrapper;
                if (expression.length === 1 && expression[0] instanceof mathMLTree_MathNode && utils.contains(["mrow", "mtable"], expression[0].type)) {
                  wrapper = expression[0];
                } else {
                  wrapper = new mathMLTree.MathNode("mrow", expression);
                }
                var annotation = new mathMLTree.MathNode("annotation", [new mathMLTree.TextNode(texExpression)]);
                annotation.setAttribute("encoding", "application/x-tex");
                var semantics = new mathMLTree.MathNode("semantics", [wrapper, annotation]);
                var math = new mathMLTree.MathNode("math", [semantics]);
                math.setAttribute("xmlns", "http://www.w3.org/1998/Math/MathML");
                var wrapperClass = forMathmlOnly ? "katex" : "katex-mathml";
                return buildCommon.makeSpan([wrapperClass], [math]);
              }
              var buildTree_optionsFromSettings = function optionsFromSettings(settings) {
                return new src_Options({
                  style: settings.displayMode ? src_Style.DISPLAY : src_Style.TEXT,
                  maxSize: settings.maxSize,
                  minRuleThickness: settings.minRuleThickness
                });
              };
              var buildTree_displayWrap = function displayWrap(node, settings) {
                if (settings.displayMode) {
                  var classes = ["katex-display"];
                  if (settings.leqno) {
                    classes.push("leqno");
                  }
                  if (settings.fleqn) {
                    classes.push("fleqn");
                  }
                  node = buildCommon.makeSpan(classes, [node]);
                }
                return node;
              };
              var buildTree_buildTree = function buildTree(tree, expression, settings) {
                var options = buildTree_optionsFromSettings(settings);
                var katexNode;
                if (settings.output === "mathml") {
                  return buildMathML(tree, expression, options, true);
                } else if (settings.output === "html") {
                  var htmlNode = buildHTML(tree, options);
                  katexNode = buildCommon.makeSpan(["katex"], [htmlNode]);
                } else {
                  var mathMLNode = buildMathML(tree, expression, options, false);
                  var _htmlNode = buildHTML(tree, options);
                  katexNode = buildCommon.makeSpan(["katex"], [mathMLNode, _htmlNode]);
                }
                return buildTree_displayWrap(katexNode, settings);
              };
              var buildTree_buildHTMLTree = function buildHTMLTree(tree, expression, settings) {
                var options = buildTree_optionsFromSettings(settings);
                var htmlNode = buildHTML(tree, options);
                var katexNode = buildCommon.makeSpan(["katex"], [htmlNode]);
                return buildTree_displayWrap(katexNode, settings);
              };
              var src_buildTree = buildTree_buildTree;
              var stretchyCodePoint = {
                widehat: "^",
                widecheck: "\u02C7",
                widetilde: "~",
                utilde: "~",
                overleftarrow: "\u2190",
                underleftarrow: "\u2190",
                xleftarrow: "\u2190",
                overrightarrow: "\u2192",
                underrightarrow: "\u2192",
                xrightarrow: "\u2192",
                underbrace: "\u23DF",
                overbrace: "\u23DE",
                overgroup: "\u23E0",
                undergroup: "\u23E1",
                overleftrightarrow: "\u2194",
                underleftrightarrow: "\u2194",
                xleftrightarrow: "\u2194",
                Overrightarrow: "\u21D2",
                xRightarrow: "\u21D2",
                overleftharpoon: "\u21BC",
                xleftharpoonup: "\u21BC",
                overrightharpoon: "\u21C0",
                xrightharpoonup: "\u21C0",
                xLeftarrow: "\u21D0",
                xLeftrightarrow: "\u21D4",
                xhookleftarrow: "\u21A9",
                xhookrightarrow: "\u21AA",
                xmapsto: "\u21A6",
                xrightharpoondown: "\u21C1",
                xleftharpoondown: "\u21BD",
                xrightleftharpoons: "\u21CC",
                xleftrightharpoons: "\u21CB",
                xtwoheadleftarrow: "\u219E",
                xtwoheadrightarrow: "\u21A0",
                xlongequal: "=",
                xtofrom: "\u21C4",
                xrightleftarrows: "\u21C4",
                xrightequilibrium: "\u21CC",
                // Not a perfect match.
                xleftequilibrium: "\u21CB"
                // None better available.
              };
              var stretchy_mathMLnode = function mathMLnode(label) {
                var node = new mathMLTree.MathNode("mo", [new mathMLTree.TextNode(stretchyCodePoint[label.substr(1)])]);
                node.setAttribute("stretchy", "true");
                return node;
              };
              var katexImagesData = {
                //   path(s), minWidth, height, align
                overrightarrow: [["rightarrow"], 0.888, 522, "xMaxYMin"],
                overleftarrow: [["leftarrow"], 0.888, 522, "xMinYMin"],
                underrightarrow: [["rightarrow"], 0.888, 522, "xMaxYMin"],
                underleftarrow: [["leftarrow"], 0.888, 522, "xMinYMin"],
                xrightarrow: [["rightarrow"], 1.469, 522, "xMaxYMin"],
                xleftarrow: [["leftarrow"], 1.469, 522, "xMinYMin"],
                Overrightarrow: [["doublerightarrow"], 0.888, 560, "xMaxYMin"],
                xRightarrow: [["doublerightarrow"], 1.526, 560, "xMaxYMin"],
                xLeftarrow: [["doubleleftarrow"], 1.526, 560, "xMinYMin"],
                overleftharpoon: [["leftharpoon"], 0.888, 522, "xMinYMin"],
                xleftharpoonup: [["leftharpoon"], 0.888, 522, "xMinYMin"],
                xleftharpoondown: [["leftharpoondown"], 0.888, 522, "xMinYMin"],
                overrightharpoon: [["rightharpoon"], 0.888, 522, "xMaxYMin"],
                xrightharpoonup: [["rightharpoon"], 0.888, 522, "xMaxYMin"],
                xrightharpoondown: [["rightharpoondown"], 0.888, 522, "xMaxYMin"],
                xlongequal: [["longequal"], 0.888, 334, "xMinYMin"],
                xtwoheadleftarrow: [["twoheadleftarrow"], 0.888, 334, "xMinYMin"],
                xtwoheadrightarrow: [["twoheadrightarrow"], 0.888, 334, "xMaxYMin"],
                overleftrightarrow: [["leftarrow", "rightarrow"], 0.888, 522],
                overbrace: [["leftbrace", "midbrace", "rightbrace"], 1.6, 548],
                underbrace: [["leftbraceunder", "midbraceunder", "rightbraceunder"], 1.6, 548],
                underleftrightarrow: [["leftarrow", "rightarrow"], 0.888, 522],
                xleftrightarrow: [["leftarrow", "rightarrow"], 1.75, 522],
                xLeftrightarrow: [["doubleleftarrow", "doublerightarrow"], 1.75, 560],
                xrightleftharpoons: [["leftharpoondownplus", "rightharpoonplus"], 1.75, 716],
                xleftrightharpoons: [["leftharpoonplus", "rightharpoondownplus"], 1.75, 716],
                xhookleftarrow: [["leftarrow", "righthook"], 1.08, 522],
                xhookrightarrow: [["lefthook", "rightarrow"], 1.08, 522],
                overlinesegment: [["leftlinesegment", "rightlinesegment"], 0.888, 522],
                underlinesegment: [["leftlinesegment", "rightlinesegment"], 0.888, 522],
                overgroup: [["leftgroup", "rightgroup"], 0.888, 342],
                undergroup: [["leftgroupunder", "rightgroupunder"], 0.888, 342],
                xmapsto: [["leftmapsto", "rightarrow"], 1.5, 522],
                xtofrom: [["leftToFrom", "rightToFrom"], 1.75, 528],
                // The next three arrows are from the mhchem package.
                // In mhchem.sty, min-length is 2.0em. But these arrows might appear in the
                // document as \xrightarrow or \xrightleftharpoons. Those have
                // min-length = 1.75em, so we set min-length on these next three to match.
                xrightleftarrows: [["baraboveleftarrow", "rightarrowabovebar"], 1.75, 901],
                xrightequilibrium: [["baraboveshortleftharpoon", "rightharpoonaboveshortbar"], 1.75, 716],
                xleftequilibrium: [["shortbaraboveleftharpoon", "shortrightharpoonabovebar"], 1.75, 716]
              };
              var groupLength = function groupLength2(arg) {
                if (arg.type === "ordgroup") {
                  return arg.body.length;
                } else {
                  return 1;
                }
              };
              var stretchy_svgSpan = function svgSpan(group, options) {
                function buildSvgSpan_() {
                  var viewBoxWidth = 4e5;
                  var label = group.label.substr(1);
                  if (utils.contains(["widehat", "widecheck", "widetilde", "utilde"], label)) {
                    var grp = group;
                    var numChars = groupLength(grp.base);
                    var viewBoxHeight;
                    var pathName;
                    var _height;
                    if (numChars > 5) {
                      if (label === "widehat" || label === "widecheck") {
                        viewBoxHeight = 420;
                        viewBoxWidth = 2364;
                        _height = 0.42;
                        pathName = label + "4";
                      } else {
                        viewBoxHeight = 312;
                        viewBoxWidth = 2340;
                        _height = 0.34;
                        pathName = "tilde4";
                      }
                    } else {
                      var imgIndex = [1, 1, 2, 2, 3, 3][numChars];
                      if (label === "widehat" || label === "widecheck") {
                        viewBoxWidth = [0, 1062, 2364, 2364, 2364][imgIndex];
                        viewBoxHeight = [0, 239, 300, 360, 420][imgIndex];
                        _height = [0, 0.24, 0.3, 0.3, 0.36, 0.42][imgIndex];
                        pathName = label + imgIndex;
                      } else {
                        viewBoxWidth = [0, 600, 1033, 2339, 2340][imgIndex];
                        viewBoxHeight = [0, 260, 286, 306, 312][imgIndex];
                        _height = [0, 0.26, 0.286, 0.3, 0.306, 0.34][imgIndex];
                        pathName = "tilde" + imgIndex;
                      }
                    }
                    var path = new domTree_PathNode(pathName);
                    var svgNode = new SvgNode([path], {
                      "width": "100%",
                      "height": _height + "em",
                      "viewBox": "0 0 " + viewBoxWidth + " " + viewBoxHeight,
                      "preserveAspectRatio": "none"
                    });
                    return {
                      span: buildCommon.makeSvgSpan([], [svgNode], options),
                      minWidth: 0,
                      height: _height
                    };
                  } else {
                    var spans = [];
                    var data = katexImagesData[label];
                    var paths = data[0], _minWidth = data[1], _viewBoxHeight = data[2];
                    var _height2 = _viewBoxHeight / 1e3;
                    var numSvgChildren = paths.length;
                    var widthClasses;
                    var aligns;
                    if (numSvgChildren === 1) {
                      var align1 = data[3];
                      widthClasses = ["hide-tail"];
                      aligns = [align1];
                    } else if (numSvgChildren === 2) {
                      widthClasses = ["halfarrow-left", "halfarrow-right"];
                      aligns = ["xMinYMin", "xMaxYMin"];
                    } else if (numSvgChildren === 3) {
                      widthClasses = ["brace-left", "brace-center", "brace-right"];
                      aligns = ["xMinYMin", "xMidYMin", "xMaxYMin"];
                    } else {
                      throw new Error("Correct katexImagesData or update code here to support\n                    " + numSvgChildren + " children.");
                    }
                    for (var i = 0; i < numSvgChildren; i++) {
                      var _path = new domTree_PathNode(paths[i]);
                      var _svgNode = new SvgNode([_path], {
                        "width": "400em",
                        "height": _height2 + "em",
                        "viewBox": "0 0 " + viewBoxWidth + " " + _viewBoxHeight,
                        "preserveAspectRatio": aligns[i] + " slice"
                      });
                      var _span = buildCommon.makeSvgSpan([widthClasses[i]], [_svgNode], options);
                      if (numSvgChildren === 1) {
                        return {
                          span: _span,
                          minWidth: _minWidth,
                          height: _height2
                        };
                      } else {
                        _span.style.height = _height2 + "em";
                        spans.push(_span);
                      }
                    }
                    return {
                      span: buildCommon.makeSpan(["stretchy"], spans, options),
                      minWidth: _minWidth,
                      height: _height2
                    };
                  }
                }
                var _buildSvgSpan_ = buildSvgSpan_(), span = _buildSvgSpan_.span, minWidth = _buildSvgSpan_.minWidth, height = _buildSvgSpan_.height;
                span.height = height;
                span.style.height = height + "em";
                if (minWidth > 0) {
                  span.style.minWidth = minWidth + "em";
                }
                return span;
              };
              var stretchy_encloseSpan = function encloseSpan(inner, label, pad, options) {
                var img;
                var totalHeight = inner.height + inner.depth + 2 * pad;
                if (/fbox|color/.test(label)) {
                  img = buildCommon.makeSpan(["stretchy", label], [], options);
                  if (label === "fbox") {
                    var color = options.color && options.getColor();
                    if (color) {
                      img.style.borderColor = color;
                    }
                  }
                } else {
                  var lines = [];
                  if (/^[bx]cancel$/.test(label)) {
                    lines.push(new LineNode({
                      "x1": "0",
                      "y1": "0",
                      "x2": "100%",
                      "y2": "100%",
                      "stroke-width": "0.046em"
                    }));
                  }
                  if (/^x?cancel$/.test(label)) {
                    lines.push(new LineNode({
                      "x1": "0",
                      "y1": "100%",
                      "x2": "100%",
                      "y2": "0",
                      "stroke-width": "0.046em"
                    }));
                  }
                  var svgNode = new SvgNode(lines, {
                    "width": "100%",
                    "height": totalHeight + "em"
                  });
                  img = buildCommon.makeSvgSpan([], [svgNode], options);
                }
                img.height = totalHeight;
                img.style.height = totalHeight + "em";
                return img;
              };
              var stretchy = {
                encloseSpan: stretchy_encloseSpan,
                mathMLnode: stretchy_mathMLnode,
                svgSpan: stretchy_svgSpan
              };
              var accent_htmlBuilder = function htmlBuilder(grp, options) {
                var base;
                var group;
                var supSub = checkNodeType(grp, "supsub");
                var supSubGroup;
                if (supSub) {
                  group = assertNodeType(supSub.base, "accent");
                  base = group.base;
                  supSub.base = base;
                  supSubGroup = assertSpan(buildHTML_buildGroup(supSub, options));
                  supSub.base = group;
                } else {
                  group = assertNodeType(grp, "accent");
                  base = group.base;
                }
                var body = buildHTML_buildGroup(base, options.havingCrampedStyle());
                var mustShift = group.isShifty && utils.isCharacterBox(base);
                var skew = 0;
                if (mustShift) {
                  var baseChar = utils.getBaseElem(base);
                  var baseGroup = buildHTML_buildGroup(baseChar, options.havingCrampedStyle());
                  skew = assertSymbolDomNode(baseGroup).skew;
                }
                var clearance = Math.min(body.height, options.fontMetrics().xHeight);
                var accentBody;
                if (!group.isStretchy) {
                  var accent;
                  var width;
                  if (group.label === "\\vec") {
                    accent = buildCommon.staticSvg("vec", options);
                    width = buildCommon.svgData.vec[1];
                  } else {
                    accent = buildCommon.makeOrd({
                      mode: group.mode,
                      text: group.label
                    }, options, "textord");
                    accent = assertSymbolDomNode(accent);
                    accent.italic = 0;
                    width = accent.width;
                  }
                  accentBody = buildCommon.makeSpan(["accent-body"], [accent]);
                  var accentFull = group.label === "\\textcircled";
                  if (accentFull) {
                    accentBody.classes.push("accent-full");
                    clearance = body.height;
                  }
                  var left = skew;
                  if (!accentFull) {
                    left -= width / 2;
                  }
                  accentBody.style.left = left + "em";
                  if (group.label === "\\textcircled") {
                    accentBody.style.top = ".2em";
                  }
                  accentBody = buildCommon.makeVList({
                    positionType: "firstBaseline",
                    children: [{
                      type: "elem",
                      elem: body
                    }, {
                      type: "kern",
                      size: -clearance
                    }, {
                      type: "elem",
                      elem: accentBody
                    }]
                  }, options);
                } else {
                  accentBody = stretchy.svgSpan(group, options);
                  accentBody = buildCommon.makeVList({
                    positionType: "firstBaseline",
                    children: [{
                      type: "elem",
                      elem: body
                    }, {
                      type: "elem",
                      elem: accentBody,
                      wrapperClasses: ["svg-align"],
                      wrapperStyle: skew > 0 ? {
                        width: "calc(100% - " + 2 * skew + "em)",
                        marginLeft: 2 * skew + "em"
                      } : void 0
                    }]
                  }, options);
                }
                var accentWrap = buildCommon.makeSpan(["mord", "accent"], [accentBody], options);
                if (supSubGroup) {
                  supSubGroup.children[0] = accentWrap;
                  supSubGroup.height = Math.max(accentWrap.height, supSubGroup.height);
                  supSubGroup.classes[0] = "mord";
                  return supSubGroup;
                } else {
                  return accentWrap;
                }
              };
              var accent_mathmlBuilder = function mathmlBuilder(group, options) {
                var accentNode = group.isStretchy ? stretchy.mathMLnode(group.label) : new mathMLTree.MathNode("mo", [buildMathML_makeText(group.label, group.mode)]);
                var node = new mathMLTree.MathNode("mover", [buildMathML_buildGroup(group.base, options), accentNode]);
                node.setAttribute("accent", "true");
                return node;
              };
              var NON_STRETCHY_ACCENT_REGEX = new RegExp(["\\acute", "\\grave", "\\ddot", "\\tilde", "\\bar", "\\breve", "\\check", "\\hat", "\\vec", "\\dot", "\\mathring"].map(function(accent) {
                return "\\" + accent;
              }).join("|"));
              defineFunction({
                type: "accent",
                names: ["\\acute", "\\grave", "\\ddot", "\\tilde", "\\bar", "\\breve", "\\check", "\\hat", "\\vec", "\\dot", "\\mathring", "\\widecheck", "\\widehat", "\\widetilde", "\\overrightarrow", "\\overleftarrow", "\\Overrightarrow", "\\overleftrightarrow", "\\overgroup", "\\overlinesegment", "\\overleftharpoon", "\\overrightharpoon"],
                props: {
                  numArgs: 1
                },
                handler: function handler(context, args) {
                  var base = args[0];
                  var isStretchy = !NON_STRETCHY_ACCENT_REGEX.test(context.funcName);
                  var isShifty = !isStretchy || context.funcName === "\\widehat" || context.funcName === "\\widetilde" || context.funcName === "\\widecheck";
                  return {
                    type: "accent",
                    mode: context.parser.mode,
                    label: context.funcName,
                    isStretchy,
                    isShifty,
                    base
                  };
                },
                htmlBuilder: accent_htmlBuilder,
                mathmlBuilder: accent_mathmlBuilder
              });
              defineFunction({
                type: "accent",
                names: ["\\'", "\\`", "\\^", "\\~", "\\=", "\\u", "\\.", '\\"', "\\r", "\\H", "\\v", "\\textcircled"],
                props: {
                  numArgs: 1,
                  allowedInText: true,
                  allowedInMath: false
                },
                handler: function handler(context, args) {
                  var base = args[0];
                  return {
                    type: "accent",
                    mode: context.parser.mode,
                    label: context.funcName,
                    isStretchy: false,
                    isShifty: true,
                    base
                  };
                },
                htmlBuilder: accent_htmlBuilder,
                mathmlBuilder: accent_mathmlBuilder
              });
              defineFunction({
                type: "accentUnder",
                names: ["\\underleftarrow", "\\underrightarrow", "\\underleftrightarrow", "\\undergroup", "\\underlinesegment", "\\utilde"],
                props: {
                  numArgs: 1
                },
                handler: function handler(_ref, args) {
                  var parser = _ref.parser, funcName = _ref.funcName;
                  var base = args[0];
                  return {
                    type: "accentUnder",
                    mode: parser.mode,
                    label: funcName,
                    base
                  };
                },
                htmlBuilder: function htmlBuilder(group, options) {
                  var innerGroup = buildHTML_buildGroup(group.base, options);
                  var accentBody = stretchy.svgSpan(group, options);
                  var kern = group.label === "\\utilde" ? 0.12 : 0;
                  var vlist = buildCommon.makeVList({
                    positionType: "bottom",
                    positionData: accentBody.height + kern,
                    children: [{
                      type: "elem",
                      elem: accentBody,
                      wrapperClasses: ["svg-align"]
                    }, {
                      type: "kern",
                      size: kern
                    }, {
                      type: "elem",
                      elem: innerGroup
                    }]
                  }, options);
                  return buildCommon.makeSpan(["mord", "accentunder"], [vlist], options);
                },
                mathmlBuilder: function mathmlBuilder(group, options) {
                  var accentNode = stretchy.mathMLnode(group.label);
                  var node = new mathMLTree.MathNode("munder", [buildMathML_buildGroup(group.base, options), accentNode]);
                  node.setAttribute("accentunder", "true");
                  return node;
                }
              });
              var arrow_paddedNode = function paddedNode(group) {
                var node = new mathMLTree.MathNode("mpadded", group ? [group] : []);
                node.setAttribute("width", "+0.6em");
                node.setAttribute("lspace", "0.3em");
                return node;
              };
              defineFunction({
                type: "xArrow",
                names: [
                  "\\xleftarrow",
                  "\\xrightarrow",
                  "\\xLeftarrow",
                  "\\xRightarrow",
                  "\\xleftrightarrow",
                  "\\xLeftrightarrow",
                  "\\xhookleftarrow",
                  "\\xhookrightarrow",
                  "\\xmapsto",
                  "\\xrightharpoondown",
                  "\\xrightharpoonup",
                  "\\xleftharpoondown",
                  "\\xleftharpoonup",
                  "\\xrightleftharpoons",
                  "\\xleftrightharpoons",
                  "\\xlongequal",
                  "\\xtwoheadrightarrow",
                  "\\xtwoheadleftarrow",
                  "\\xtofrom",
                  // The next 3 functions are here to support the mhchem extension.
                  // Direct use of these functions is discouraged and may break someday.
                  "\\xrightleftarrows",
                  "\\xrightequilibrium",
                  "\\xleftequilibrium"
                ],
                props: {
                  numArgs: 1,
                  numOptionalArgs: 1
                },
                handler: function handler(_ref, args, optArgs) {
                  var parser = _ref.parser, funcName = _ref.funcName;
                  return {
                    type: "xArrow",
                    mode: parser.mode,
                    label: funcName,
                    body: args[0],
                    below: optArgs[0]
                  };
                },
                // Flow is unable to correctly infer the type of `group`, even though it's
                // unamibiguously determined from the passed-in `type` above.
                htmlBuilder: function htmlBuilder(group, options) {
                  var style = options.style;
                  var newOptions = options.havingStyle(style.sup());
                  var upperGroup = buildCommon.wrapFragment(buildHTML_buildGroup(group.body, newOptions, options), options);
                  upperGroup.classes.push("x-arrow-pad");
                  var lowerGroup;
                  if (group.below) {
                    newOptions = options.havingStyle(style.sub());
                    lowerGroup = buildCommon.wrapFragment(buildHTML_buildGroup(group.below, newOptions, options), options);
                    lowerGroup.classes.push("x-arrow-pad");
                  }
                  var arrowBody = stretchy.svgSpan(group, options);
                  var arrowShift = -options.fontMetrics().axisHeight + 0.5 * arrowBody.height;
                  var upperShift = -options.fontMetrics().axisHeight - 0.5 * arrowBody.height - 0.111;
                  if (upperGroup.depth > 0.25 || group.label === "\\xleftequilibrium") {
                    upperShift -= upperGroup.depth;
                  }
                  var vlist;
                  if (lowerGroup) {
                    var lowerShift = -options.fontMetrics().axisHeight + lowerGroup.height + 0.5 * arrowBody.height + 0.111;
                    vlist = buildCommon.makeVList({
                      positionType: "individualShift",
                      children: [{
                        type: "elem",
                        elem: upperGroup,
                        shift: upperShift
                      }, {
                        type: "elem",
                        elem: arrowBody,
                        shift: arrowShift
                      }, {
                        type: "elem",
                        elem: lowerGroup,
                        shift: lowerShift
                      }]
                    }, options);
                  } else {
                    vlist = buildCommon.makeVList({
                      positionType: "individualShift",
                      children: [{
                        type: "elem",
                        elem: upperGroup,
                        shift: upperShift
                      }, {
                        type: "elem",
                        elem: arrowBody,
                        shift: arrowShift
                      }]
                    }, options);
                  }
                  vlist.children[0].children[0].children[1].classes.push("svg-align");
                  return buildCommon.makeSpan(["mrel", "x-arrow"], [vlist], options);
                },
                mathmlBuilder: function mathmlBuilder(group, options) {
                  var arrowNode = stretchy.mathMLnode(group.label);
                  var node;
                  if (group.body) {
                    var upperNode = arrow_paddedNode(buildMathML_buildGroup(group.body, options));
                    if (group.below) {
                      var lowerNode = arrow_paddedNode(buildMathML_buildGroup(group.below, options));
                      node = new mathMLTree.MathNode("munderover", [arrowNode, lowerNode, upperNode]);
                    } else {
                      node = new mathMLTree.MathNode("mover", [arrowNode, upperNode]);
                    }
                  } else if (group.below) {
                    var _lowerNode = arrow_paddedNode(buildMathML_buildGroup(group.below, options));
                    node = new mathMLTree.MathNode("munder", [arrowNode, _lowerNode]);
                  } else {
                    node = arrow_paddedNode();
                    node = new mathMLTree.MathNode("mover", [arrowNode, node]);
                  }
                  return node;
                }
              });
              defineFunction({
                type: "textord",
                names: ["\\@char"],
                props: {
                  numArgs: 1,
                  allowedInText: true
                },
                handler: function handler(_ref, args) {
                  var parser = _ref.parser;
                  var arg = assertNodeType(args[0], "ordgroup");
                  var group = arg.body;
                  var number = "";
                  for (var i = 0; i < group.length; i++) {
                    var node = assertNodeType(group[i], "textord");
                    number += node.text;
                  }
                  var code = parseInt(number);
                  if (isNaN(code)) {
                    throw new src_ParseError("\\@char has non-numeric argument " + number);
                  }
                  return {
                    type: "textord",
                    mode: parser.mode,
                    text: String.fromCharCode(code)
                  };
                }
              });
              var color_htmlBuilder = function htmlBuilder(group, options) {
                var elements = buildHTML_buildExpression(group.body, options.withColor(group.color), false);
                return buildCommon.makeFragment(elements);
              };
              var color_mathmlBuilder = function mathmlBuilder(group, options) {
                var inner = buildMathML_buildExpression(group.body, options.withColor(group.color));
                var node = new mathMLTree.MathNode("mstyle", inner);
                node.setAttribute("mathcolor", group.color);
                return node;
              };
              defineFunction({
                type: "color",
                names: ["\\textcolor"],
                props: {
                  numArgs: 2,
                  allowedInText: true,
                  greediness: 3,
                  argTypes: ["color", "original"]
                },
                handler: function handler(_ref, args) {
                  var parser = _ref.parser;
                  var color = assertNodeType(args[0], "color-token").color;
                  var body = args[1];
                  return {
                    type: "color",
                    mode: parser.mode,
                    color,
                    body: defineFunction_ordargument(body)
                  };
                },
                htmlBuilder: color_htmlBuilder,
                mathmlBuilder: color_mathmlBuilder
              });
              defineFunction({
                type: "color",
                names: ["\\color"],
                props: {
                  numArgs: 1,
                  allowedInText: true,
                  greediness: 3,
                  argTypes: ["color"]
                },
                handler: function handler(_ref2, args) {
                  var parser = _ref2.parser, breakOnTokenText = _ref2.breakOnTokenText;
                  var color = assertNodeType(args[0], "color-token").color;
                  parser.gullet.macros.set("\\current@color", color);
                  var body = parser.parseExpression(true, breakOnTokenText);
                  return {
                    type: "color",
                    mode: parser.mode,
                    color,
                    body
                  };
                },
                htmlBuilder: color_htmlBuilder,
                mathmlBuilder: color_mathmlBuilder
              });
              defineFunction({
                type: "cr",
                names: ["\\cr", "\\newline"],
                props: {
                  numArgs: 0,
                  numOptionalArgs: 1,
                  argTypes: ["size"],
                  allowedInText: true
                },
                handler: function handler(_ref, args, optArgs) {
                  var parser = _ref.parser, funcName = _ref.funcName;
                  var size = optArgs[0];
                  var newRow = funcName === "\\cr";
                  var newLine = false;
                  if (!newRow) {
                    if (parser.settings.displayMode && parser.settings.useStrictBehavior("newLineInDisplayMode", "In LaTeX, \\\\ or \\newline does nothing in display mode")) {
                      newLine = false;
                    } else {
                      newLine = true;
                    }
                  }
                  return {
                    type: "cr",
                    mode: parser.mode,
                    newLine,
                    newRow,
                    size: size && assertNodeType(size, "size").value
                  };
                },
                // The following builders are called only at the top level,
                // not within tabular/array environments.
                htmlBuilder: function htmlBuilder(group, options) {
                  if (group.newRow) {
                    throw new src_ParseError("\\cr valid only within a tabular/array environment");
                  }
                  var span = buildCommon.makeSpan(["mspace"], [], options);
                  if (group.newLine) {
                    span.classes.push("newline");
                    if (group.size) {
                      span.style.marginTop = units_calculateSize(group.size, options) + "em";
                    }
                  }
                  return span;
                },
                mathmlBuilder: function mathmlBuilder(group, options) {
                  var node = new mathMLTree.MathNode("mspace");
                  if (group.newLine) {
                    node.setAttribute("linebreak", "newline");
                    if (group.size) {
                      node.setAttribute("height", units_calculateSize(group.size, options) + "em");
                    }
                  }
                  return node;
                }
              });
              var delimiter_getMetrics = function getMetrics(symbol, font, mode) {
                var replace = src_symbols.math[symbol] && src_symbols.math[symbol].replace;
                var metrics = getCharacterMetrics(replace || symbol, font, mode);
                if (!metrics) {
                  throw new Error("Unsupported symbol " + symbol + " and font size " + font + ".");
                }
                return metrics;
              };
              var delimiter_styleWrap = function styleWrap(delim, toStyle, options, classes) {
                var newOptions = options.havingBaseStyle(toStyle);
                var span = buildCommon.makeSpan(classes.concat(newOptions.sizingClasses(options)), [delim], options);
                var delimSizeMultiplier = newOptions.sizeMultiplier / options.sizeMultiplier;
                span.height *= delimSizeMultiplier;
                span.depth *= delimSizeMultiplier;
                span.maxFontSize = newOptions.sizeMultiplier;
                return span;
              };
              var centerSpan = function centerSpan2(span, options, style) {
                var newOptions = options.havingBaseStyle(style);
                var shift = (1 - options.sizeMultiplier / newOptions.sizeMultiplier) * options.fontMetrics().axisHeight;
                span.classes.push("delimcenter");
                span.style.top = shift + "em";
                span.height -= shift;
                span.depth += shift;
              };
              var delimiter_makeSmallDelim = function makeSmallDelim(delim, style, center, options, mode, classes) {
                var text = buildCommon.makeSymbol(delim, "Main-Regular", mode, options);
                var span = delimiter_styleWrap(text, style, options, classes);
                if (center) {
                  centerSpan(span, options, style);
                }
                return span;
              };
              var delimiter_mathrmSize = function mathrmSize(value, size, mode, options) {
                return buildCommon.makeSymbol(value, "Size" + size + "-Regular", mode, options);
              };
              var delimiter_makeLargeDelim = function makeLargeDelim(delim, size, center, options, mode, classes) {
                var inner = delimiter_mathrmSize(delim, size, mode, options);
                var span = delimiter_styleWrap(buildCommon.makeSpan(["delimsizing", "size" + size], [inner], options), src_Style.TEXT, options, classes);
                if (center) {
                  centerSpan(span, options, src_Style.TEXT);
                }
                return span;
              };
              var delimiter_makeInner = function makeInner(symbol, font, mode) {
                var sizeClass;
                if (font === "Size1-Regular") {
                  sizeClass = "delim-size1";
                } else {
                  sizeClass = "delim-size4";
                }
                var inner = buildCommon.makeSpan(["delimsizinginner", sizeClass], [buildCommon.makeSpan([], [buildCommon.makeSymbol(symbol, font, mode)])]);
                return {
                  type: "elem",
                  elem: inner
                };
              };
              var lap = {
                type: "kern",
                size: -5e-3
              };
              var delimiter_makeStackedDelim = function makeStackedDelim(delim, heightTotal, center, options, mode, classes) {
                var top;
                var middle;
                var repeat;
                var bottom;
                top = repeat = bottom = delim;
                middle = null;
                var font = "Size1-Regular";
                if (delim === "\\uparrow") {
                  repeat = bottom = "\u23D0";
                } else if (delim === "\\Uparrow") {
                  repeat = bottom = "\u2016";
                } else if (delim === "\\downarrow") {
                  top = repeat = "\u23D0";
                } else if (delim === "\\Downarrow") {
                  top = repeat = "\u2016";
                } else if (delim === "\\updownarrow") {
                  top = "\\uparrow";
                  repeat = "\u23D0";
                  bottom = "\\downarrow";
                } else if (delim === "\\Updownarrow") {
                  top = "\\Uparrow";
                  repeat = "\u2016";
                  bottom = "\\Downarrow";
                } else if (delim === "[" || delim === "\\lbrack") {
                  top = "\u23A1";
                  repeat = "\u23A2";
                  bottom = "\u23A3";
                  font = "Size4-Regular";
                } else if (delim === "]" || delim === "\\rbrack") {
                  top = "\u23A4";
                  repeat = "\u23A5";
                  bottom = "\u23A6";
                  font = "Size4-Regular";
                } else if (delim === "\\lfloor" || delim === "\u230A") {
                  repeat = top = "\u23A2";
                  bottom = "\u23A3";
                  font = "Size4-Regular";
                } else if (delim === "\\lceil" || delim === "\u2308") {
                  top = "\u23A1";
                  repeat = bottom = "\u23A2";
                  font = "Size4-Regular";
                } else if (delim === "\\rfloor" || delim === "\u230B") {
                  repeat = top = "\u23A5";
                  bottom = "\u23A6";
                  font = "Size4-Regular";
                } else if (delim === "\\rceil" || delim === "\u2309") {
                  top = "\u23A4";
                  repeat = bottom = "\u23A5";
                  font = "Size4-Regular";
                } else if (delim === "(" || delim === "\\lparen") {
                  top = "\u239B";
                  repeat = "\u239C";
                  bottom = "\u239D";
                  font = "Size4-Regular";
                } else if (delim === ")" || delim === "\\rparen") {
                  top = "\u239E";
                  repeat = "\u239F";
                  bottom = "\u23A0";
                  font = "Size4-Regular";
                } else if (delim === "\\{" || delim === "\\lbrace") {
                  top = "\u23A7";
                  middle = "\u23A8";
                  bottom = "\u23A9";
                  repeat = "\u23AA";
                  font = "Size4-Regular";
                } else if (delim === "\\}" || delim === "\\rbrace") {
                  top = "\u23AB";
                  middle = "\u23AC";
                  bottom = "\u23AD";
                  repeat = "\u23AA";
                  font = "Size4-Regular";
                } else if (delim === "\\lgroup" || delim === "\u27EE") {
                  top = "\u23A7";
                  bottom = "\u23A9";
                  repeat = "\u23AA";
                  font = "Size4-Regular";
                } else if (delim === "\\rgroup" || delim === "\u27EF") {
                  top = "\u23AB";
                  bottom = "\u23AD";
                  repeat = "\u23AA";
                  font = "Size4-Regular";
                } else if (delim === "\\lmoustache" || delim === "\u23B0") {
                  top = "\u23A7";
                  bottom = "\u23AD";
                  repeat = "\u23AA";
                  font = "Size4-Regular";
                } else if (delim === "\\rmoustache" || delim === "\u23B1") {
                  top = "\u23AB";
                  bottom = "\u23A9";
                  repeat = "\u23AA";
                  font = "Size4-Regular";
                }
                var topMetrics = delimiter_getMetrics(top, font, mode);
                var topHeightTotal = topMetrics.height + topMetrics.depth;
                var repeatMetrics = delimiter_getMetrics(repeat, font, mode);
                var repeatHeightTotal = repeatMetrics.height + repeatMetrics.depth;
                var bottomMetrics = delimiter_getMetrics(bottom, font, mode);
                var bottomHeightTotal = bottomMetrics.height + bottomMetrics.depth;
                var middleHeightTotal = 0;
                var middleFactor = 1;
                if (middle !== null) {
                  var middleMetrics = delimiter_getMetrics(middle, font, mode);
                  middleHeightTotal = middleMetrics.height + middleMetrics.depth;
                  middleFactor = 2;
                }
                var minHeight = topHeightTotal + bottomHeightTotal + middleHeightTotal;
                var repeatCount = Math.max(0, Math.ceil((heightTotal - minHeight) / (middleFactor * repeatHeightTotal)));
                var realHeightTotal = minHeight + repeatCount * middleFactor * repeatHeightTotal;
                var axisHeight = options.fontMetrics().axisHeight;
                if (center) {
                  axisHeight *= options.sizeMultiplier;
                }
                var depth = realHeightTotal / 2 - axisHeight;
                var shiftOfExtraElement = (repeatCount + 1) * 5e-3 - repeatHeightTotal;
                var inners = [];
                inners.push(delimiter_makeInner(bottom, font, mode));
                if (middle === null) {
                  for (var i = 0; i < repeatCount; i++) {
                    inners.push(lap);
                    inners.push(delimiter_makeInner(repeat, font, mode));
                  }
                } else {
                  for (var _i = 0; _i < repeatCount; _i++) {
                    inners.push(lap);
                    inners.push(delimiter_makeInner(repeat, font, mode));
                  }
                  inners.push({
                    type: "kern",
                    size: shiftOfExtraElement
                  });
                  inners.push(delimiter_makeInner(repeat, font, mode));
                  inners.push(lap);
                  inners.push(delimiter_makeInner(middle, font, mode));
                  for (var _i2 = 0; _i2 < repeatCount; _i2++) {
                    inners.push(lap);
                    inners.push(delimiter_makeInner(repeat, font, mode));
                  }
                }
                inners.push({
                  type: "kern",
                  size: shiftOfExtraElement
                });
                inners.push(delimiter_makeInner(repeat, font, mode));
                inners.push(lap);
                inners.push(delimiter_makeInner(top, font, mode));
                var newOptions = options.havingBaseStyle(src_Style.TEXT);
                var inner = buildCommon.makeVList({
                  positionType: "bottom",
                  positionData: depth,
                  children: inners
                }, newOptions);
                return delimiter_styleWrap(buildCommon.makeSpan(["delimsizing", "mult"], [inner], newOptions), src_Style.TEXT, options, classes);
              };
              var vbPad = 80;
              var emPad = 0.08;
              var delimiter_sqrtSvg = function sqrtSvg(sqrtName, height, viewBoxHeight, extraViniculum, options) {
                var path = sqrtPath(sqrtName, extraViniculum, viewBoxHeight);
                var pathNode = new domTree_PathNode(sqrtName, path);
                var svg = new SvgNode([pathNode], {
                  // Note: 1000:1 ratio of viewBox to document em width.
                  "width": "400em",
                  "height": height + "em",
                  "viewBox": "0 0 400000 " + viewBoxHeight,
                  "preserveAspectRatio": "xMinYMin slice"
                });
                return buildCommon.makeSvgSpan(["hide-tail"], [svg], options);
              };
              var makeSqrtImage = function makeSqrtImage2(height, options) {
                var newOptions = options.havingBaseSizing();
                var delim = traverseSequence("\\surd", height * newOptions.sizeMultiplier, stackLargeDelimiterSequence, newOptions);
                var sizeMultiplier = newOptions.sizeMultiplier;
                var extraViniculum = Math.max(0, options.minRuleThickness - options.fontMetrics().sqrtRuleThickness);
                var span;
                var spanHeight = 0;
                var texHeight = 0;
                var viewBoxHeight = 0;
                var advanceWidth;
                if (delim.type === "small") {
                  viewBoxHeight = 1e3 + 1e3 * extraViniculum + vbPad;
                  if (height < 1) {
                    sizeMultiplier = 1;
                  } else if (height < 1.4) {
                    sizeMultiplier = 0.7;
                  }
                  spanHeight = (1 + extraViniculum + emPad) / sizeMultiplier;
                  texHeight = (1 + extraViniculum) / sizeMultiplier;
                  span = delimiter_sqrtSvg("sqrtMain", spanHeight, viewBoxHeight, extraViniculum, options);
                  span.style.minWidth = "0.853em";
                  advanceWidth = 0.833 / sizeMultiplier;
                } else if (delim.type === "large") {
                  viewBoxHeight = (1e3 + vbPad) * sizeToMaxHeight[delim.size];
                  texHeight = (sizeToMaxHeight[delim.size] + extraViniculum) / sizeMultiplier;
                  spanHeight = (sizeToMaxHeight[delim.size] + extraViniculum + emPad) / sizeMultiplier;
                  span = delimiter_sqrtSvg("sqrtSize" + delim.size, spanHeight, viewBoxHeight, extraViniculum, options);
                  span.style.minWidth = "1.02em";
                  advanceWidth = 1 / sizeMultiplier;
                } else {
                  spanHeight = height + extraViniculum + emPad;
                  texHeight = height + extraViniculum;
                  viewBoxHeight = Math.floor(1e3 * height + extraViniculum) + vbPad;
                  span = delimiter_sqrtSvg("sqrtTall", spanHeight, viewBoxHeight, extraViniculum, options);
                  span.style.minWidth = "0.742em";
                  advanceWidth = 1.056;
                }
                span.height = texHeight;
                span.style.height = spanHeight + "em";
                return {
                  span,
                  advanceWidth,
                  // Calculate the actual line width.
                  // This actually should depend on the chosen font -- e.g. \boldmath
                  // should use the thicker surd symbols from e.g. KaTeX_Main-Bold, and
                  // have thicker rules.
                  ruleWidth: (options.fontMetrics().sqrtRuleThickness + extraViniculum) * sizeMultiplier
                };
              };
              var stackLargeDelimiters = ["(", "\\lparen", ")", "\\rparen", "[", "\\lbrack", "]", "\\rbrack", "\\{", "\\lbrace", "\\}", "\\rbrace", "\\lfloor", "\\rfloor", "\u230A", "\u230B", "\\lceil", "\\rceil", "\u2308", "\u2309", "\\surd"];
              var stackAlwaysDelimiters = ["\\uparrow", "\\downarrow", "\\updownarrow", "\\Uparrow", "\\Downarrow", "\\Updownarrow", "|", "\\|", "\\vert", "\\Vert", "\\lvert", "\\rvert", "\\lVert", "\\rVert", "\\lgroup", "\\rgroup", "\u27EE", "\u27EF", "\\lmoustache", "\\rmoustache", "\u23B0", "\u23B1"];
              var stackNeverDelimiters = ["<", ">", "\\langle", "\\rangle", "/", "\\backslash", "\\lt", "\\gt"];
              var sizeToMaxHeight = [0, 1.2, 1.8, 2.4, 3];
              var delimiter_makeSizedDelim = function makeSizedDelim(delim, size, options, mode, classes) {
                if (delim === "<" || delim === "\\lt" || delim === "\u27E8") {
                  delim = "\\langle";
                } else if (delim === ">" || delim === "\\gt" || delim === "\u27E9") {
                  delim = "\\rangle";
                }
                if (utils.contains(stackLargeDelimiters, delim) || utils.contains(stackNeverDelimiters, delim)) {
                  return delimiter_makeLargeDelim(delim, size, false, options, mode, classes);
                } else if (utils.contains(stackAlwaysDelimiters, delim)) {
                  return delimiter_makeStackedDelim(delim, sizeToMaxHeight[size], false, options, mode, classes);
                } else {
                  throw new src_ParseError("Illegal delimiter: '" + delim + "'");
                }
              };
              var stackNeverDelimiterSequence = [{
                type: "small",
                style: src_Style.SCRIPTSCRIPT
              }, {
                type: "small",
                style: src_Style.SCRIPT
              }, {
                type: "small",
                style: src_Style.TEXT
              }, {
                type: "large",
                size: 1
              }, {
                type: "large",
                size: 2
              }, {
                type: "large",
                size: 3
              }, {
                type: "large",
                size: 4
              }];
              var stackAlwaysDelimiterSequence = [{
                type: "small",
                style: src_Style.SCRIPTSCRIPT
              }, {
                type: "small",
                style: src_Style.SCRIPT
              }, {
                type: "small",
                style: src_Style.TEXT
              }, {
                type: "stack"
              }];
              var stackLargeDelimiterSequence = [{
                type: "small",
                style: src_Style.SCRIPTSCRIPT
              }, {
                type: "small",
                style: src_Style.SCRIPT
              }, {
                type: "small",
                style: src_Style.TEXT
              }, {
                type: "large",
                size: 1
              }, {
                type: "large",
                size: 2
              }, {
                type: "large",
                size: 3
              }, {
                type: "large",
                size: 4
              }, {
                type: "stack"
              }];
              var delimTypeToFont = function delimTypeToFont2(type) {
                if (type.type === "small") {
                  return "Main-Regular";
                } else if (type.type === "large") {
                  return "Size" + type.size + "-Regular";
                } else if (type.type === "stack") {
                  return "Size4-Regular";
                } else {
                  throw new Error("Add support for delim type '" + type.type + "' here.");
                }
              };
              var traverseSequence = function traverseSequence2(delim, height, sequence, options) {
                var start = Math.min(2, 3 - options.style.size);
                for (var i = start; i < sequence.length; i++) {
                  if (sequence[i].type === "stack") {
                    break;
                  }
                  var metrics = delimiter_getMetrics(delim, delimTypeToFont(sequence[i]), "math");
                  var heightDepth = metrics.height + metrics.depth;
                  if (sequence[i].type === "small") {
                    var newOptions = options.havingBaseStyle(sequence[i].style);
                    heightDepth *= newOptions.sizeMultiplier;
                  }
                  if (heightDepth > height) {
                    return sequence[i];
                  }
                }
                return sequence[sequence.length - 1];
              };
              var delimiter_makeCustomSizedDelim = function makeCustomSizedDelim(delim, height, center, options, mode, classes) {
                if (delim === "<" || delim === "\\lt" || delim === "\u27E8") {
                  delim = "\\langle";
                } else if (delim === ">" || delim === "\\gt" || delim === "\u27E9") {
                  delim = "\\rangle";
                }
                var sequence;
                if (utils.contains(stackNeverDelimiters, delim)) {
                  sequence = stackNeverDelimiterSequence;
                } else if (utils.contains(stackLargeDelimiters, delim)) {
                  sequence = stackLargeDelimiterSequence;
                } else {
                  sequence = stackAlwaysDelimiterSequence;
                }
                var delimType = traverseSequence(delim, height, sequence, options);
                if (delimType.type === "small") {
                  return delimiter_makeSmallDelim(delim, delimType.style, center, options, mode, classes);
                } else if (delimType.type === "large") {
                  return delimiter_makeLargeDelim(delim, delimType.size, center, options, mode, classes);
                } else {
                  return delimiter_makeStackedDelim(delim, height, center, options, mode, classes);
                }
              };
              var makeLeftRightDelim = function makeLeftRightDelim2(delim, height, depth, options, mode, classes) {
                var axisHeight = options.fontMetrics().axisHeight * options.sizeMultiplier;
                var delimiterFactor = 901;
                var delimiterExtend = 5 / options.fontMetrics().ptPerEm;
                var maxDistFromAxis = Math.max(height - axisHeight, depth + axisHeight);
                var totalHeight = Math.max(
                  // In real TeX, calculations are done using integral values which are
                  // 65536 per pt, or 655360 per em. So, the division here truncates in
                  // TeX but doesn't here, producing different results. If we wanted to
                  // exactly match TeX's calculation, we could do
                  //   Math.floor(655360 * maxDistFromAxis / 500) *
                  //    delimiterFactor / 655360
                  // (To see the difference, compare
                  //    x^{x^{\left(\rule{0.1em}{0.68em}\right)}}
                  // in TeX and KaTeX)
                  maxDistFromAxis / 500 * delimiterFactor,
                  2 * maxDistFromAxis - delimiterExtend
                );
                return delimiter_makeCustomSizedDelim(delim, totalHeight, true, options, mode, classes);
              };
              var delimiter = {
                sqrtImage: makeSqrtImage,
                sizedDelim: delimiter_makeSizedDelim,
                customSizedDelim: delimiter_makeCustomSizedDelim,
                leftRightDelim: makeLeftRightDelim
              };
              var delimiterSizes = {
                "\\bigl": {
                  mclass: "mopen",
                  size: 1
                },
                "\\Bigl": {
                  mclass: "mopen",
                  size: 2
                },
                "\\biggl": {
                  mclass: "mopen",
                  size: 3
                },
                "\\Biggl": {
                  mclass: "mopen",
                  size: 4
                },
                "\\bigr": {
                  mclass: "mclose",
                  size: 1
                },
                "\\Bigr": {
                  mclass: "mclose",
                  size: 2
                },
                "\\biggr": {
                  mclass: "mclose",
                  size: 3
                },
                "\\Biggr": {
                  mclass: "mclose",
                  size: 4
                },
                "\\bigm": {
                  mclass: "mrel",
                  size: 1
                },
                "\\Bigm": {
                  mclass: "mrel",
                  size: 2
                },
                "\\biggm": {
                  mclass: "mrel",
                  size: 3
                },
                "\\Biggm": {
                  mclass: "mrel",
                  size: 4
                },
                "\\big": {
                  mclass: "mord",
                  size: 1
                },
                "\\Big": {
                  mclass: "mord",
                  size: 2
                },
                "\\bigg": {
                  mclass: "mord",
                  size: 3
                },
                "\\Bigg": {
                  mclass: "mord",
                  size: 4
                }
              };
              var delimiters = ["(", "\\lparen", ")", "\\rparen", "[", "\\lbrack", "]", "\\rbrack", "\\{", "\\lbrace", "\\}", "\\rbrace", "\\lfloor", "\\rfloor", "\u230A", "\u230B", "\\lceil", "\\rceil", "\u2308", "\u2309", "<", ">", "\\langle", "\u27E8", "\\rangle", "\u27E9", "\\lt", "\\gt", "\\lvert", "\\rvert", "\\lVert", "\\rVert", "\\lgroup", "\\rgroup", "\u27EE", "\u27EF", "\\lmoustache", "\\rmoustache", "\u23B0", "\u23B1", "/", "\\backslash", "|", "\\vert", "\\|", "\\Vert", "\\uparrow", "\\Uparrow", "\\downarrow", "\\Downarrow", "\\updownarrow", "\\Updownarrow", "."];
              function checkDelimiter(delim, context) {
                var symDelim = checkSymbolNodeType(delim);
                if (symDelim && utils.contains(delimiters, symDelim.text)) {
                  return symDelim;
                } else {
                  throw new src_ParseError("Invalid delimiter: '" + (symDelim ? symDelim.text : JSON.stringify(delim)) + "' after '" + context.funcName + "'", delim);
                }
              }
              defineFunction({
                type: "delimsizing",
                names: ["\\bigl", "\\Bigl", "\\biggl", "\\Biggl", "\\bigr", "\\Bigr", "\\biggr", "\\Biggr", "\\bigm", "\\Bigm", "\\biggm", "\\Biggm", "\\big", "\\Big", "\\bigg", "\\Bigg"],
                props: {
                  numArgs: 1
                },
                handler: function handler(context, args) {
                  var delim = checkDelimiter(args[0], context);
                  return {
                    type: "delimsizing",
                    mode: context.parser.mode,
                    size: delimiterSizes[context.funcName].size,
                    mclass: delimiterSizes[context.funcName].mclass,
                    delim: delim.text
                  };
                },
                htmlBuilder: function htmlBuilder(group, options) {
                  if (group.delim === ".") {
                    return buildCommon.makeSpan([group.mclass]);
                  }
                  return delimiter.sizedDelim(group.delim, group.size, options, group.mode, [group.mclass]);
                },
                mathmlBuilder: function mathmlBuilder(group) {
                  var children = [];
                  if (group.delim !== ".") {
                    children.push(buildMathML_makeText(group.delim, group.mode));
                  }
                  var node = new mathMLTree.MathNode("mo", children);
                  if (group.mclass === "mopen" || group.mclass === "mclose") {
                    node.setAttribute("fence", "true");
                  } else {
                    node.setAttribute("fence", "false");
                  }
                  return node;
                }
              });
              function assertParsed(group) {
                if (!group.body) {
                  throw new Error("Bug: The leftright ParseNode wasn't fully parsed.");
                }
              }
              defineFunction({
                type: "leftright-right",
                names: ["\\right"],
                props: {
                  numArgs: 1
                },
                handler: function handler(context, args) {
                  var color = context.parser.gullet.macros.get("\\current@color");
                  if (color && typeof color !== "string") {
                    throw new src_ParseError("\\current@color set to non-string in \\right");
                  }
                  return {
                    type: "leftright-right",
                    mode: context.parser.mode,
                    delim: checkDelimiter(args[0], context).text,
                    color
                    // undefined if not set via \color
                  };
                }
              });
              defineFunction({
                type: "leftright",
                names: ["\\left"],
                props: {
                  numArgs: 1
                },
                handler: function handler(context, args) {
                  var delim = checkDelimiter(args[0], context);
                  var parser = context.parser;
                  ++parser.leftrightDepth;
                  var body = parser.parseExpression(false);
                  --parser.leftrightDepth;
                  parser.expect("\\right", false);
                  var right = assertNodeType(parser.parseFunction(), "leftright-right");
                  return {
                    type: "leftright",
                    mode: parser.mode,
                    body,
                    left: delim.text,
                    right: right.delim,
                    rightColor: right.color
                  };
                },
                htmlBuilder: function htmlBuilder(group, options) {
                  assertParsed(group);
                  var inner = buildHTML_buildExpression(group.body, options, true, ["mopen", "mclose"]);
                  var innerHeight = 0;
                  var innerDepth = 0;
                  var hadMiddle = false;
                  for (var i = 0; i < inner.length; i++) {
                    if (inner[i].isMiddle) {
                      hadMiddle = true;
                    } else {
                      innerHeight = Math.max(inner[i].height, innerHeight);
                      innerDepth = Math.max(inner[i].depth, innerDepth);
                    }
                  }
                  innerHeight *= options.sizeMultiplier;
                  innerDepth *= options.sizeMultiplier;
                  var leftDelim;
                  if (group.left === ".") {
                    leftDelim = makeNullDelimiter(options, ["mopen"]);
                  } else {
                    leftDelim = delimiter.leftRightDelim(group.left, innerHeight, innerDepth, options, group.mode, ["mopen"]);
                  }
                  inner.unshift(leftDelim);
                  if (hadMiddle) {
                    for (var _i = 1; _i < inner.length; _i++) {
                      var middleDelim = inner[_i];
                      var isMiddle = middleDelim.isMiddle;
                      if (isMiddle) {
                        inner[_i] = delimiter.leftRightDelim(isMiddle.delim, innerHeight, innerDepth, isMiddle.options, group.mode, []);
                      }
                    }
                  }
                  var rightDelim;
                  if (group.right === ".") {
                    rightDelim = makeNullDelimiter(options, ["mclose"]);
                  } else {
                    var colorOptions = group.rightColor ? options.withColor(group.rightColor) : options;
                    rightDelim = delimiter.leftRightDelim(group.right, innerHeight, innerDepth, colorOptions, group.mode, ["mclose"]);
                  }
                  inner.push(rightDelim);
                  return buildCommon.makeSpan(["minner"], inner, options);
                },
                mathmlBuilder: function mathmlBuilder(group, options) {
                  assertParsed(group);
                  var inner = buildMathML_buildExpression(group.body, options);
                  if (group.left !== ".") {
                    var leftNode = new mathMLTree.MathNode("mo", [buildMathML_makeText(group.left, group.mode)]);
                    leftNode.setAttribute("fence", "true");
                    inner.unshift(leftNode);
                  }
                  if (group.right !== ".") {
                    var rightNode = new mathMLTree.MathNode("mo", [buildMathML_makeText(group.right, group.mode)]);
                    rightNode.setAttribute("fence", "true");
                    if (group.rightColor) {
                      rightNode.setAttribute("mathcolor", group.rightColor);
                    }
                    inner.push(rightNode);
                  }
                  return buildMathML_makeRow(inner);
                }
              });
              defineFunction({
                type: "middle",
                names: ["\\middle"],
                props: {
                  numArgs: 1
                },
                handler: function handler(context, args) {
                  var delim = checkDelimiter(args[0], context);
                  if (!context.parser.leftrightDepth) {
                    throw new src_ParseError("\\middle without preceding \\left", delim);
                  }
                  return {
                    type: "middle",
                    mode: context.parser.mode,
                    delim: delim.text
                  };
                },
                htmlBuilder: function htmlBuilder(group, options) {
                  var middleDelim;
                  if (group.delim === ".") {
                    middleDelim = makeNullDelimiter(options, []);
                  } else {
                    middleDelim = delimiter.sizedDelim(group.delim, 1, options, group.mode, []);
                    var isMiddle = {
                      delim: group.delim,
                      options
                    };
                    middleDelim.isMiddle = isMiddle;
                  }
                  return middleDelim;
                },
                mathmlBuilder: function mathmlBuilder(group, options) {
                  var textNode = group.delim === "\\vert" || group.delim === "|" ? buildMathML_makeText("|", "text") : buildMathML_makeText(group.delim, group.mode);
                  var middleNode = new mathMLTree.MathNode("mo", [textNode]);
                  middleNode.setAttribute("fence", "true");
                  middleNode.setAttribute("lspace", "0.05em");
                  middleNode.setAttribute("rspace", "0.05em");
                  return middleNode;
                }
              });
              var enclose_htmlBuilder = function htmlBuilder(group, options) {
                var inner = buildCommon.wrapFragment(buildHTML_buildGroup(group.body, options), options);
                var label = group.label.substr(1);
                var scale = options.sizeMultiplier;
                var img;
                var imgShift = 0;
                var isSingleChar = utils.isCharacterBox(group.body);
                if (label === "sout") {
                  img = buildCommon.makeSpan(["stretchy", "sout"]);
                  img.height = options.fontMetrics().defaultRuleThickness / scale;
                  imgShift = -0.5 * options.fontMetrics().xHeight;
                } else {
                  if (/cancel/.test(label)) {
                    if (!isSingleChar) {
                      inner.classes.push("cancel-pad");
                    }
                  } else {
                    inner.classes.push("boxpad");
                  }
                  var vertPad = 0;
                  var ruleThickness = 0;
                  if (/box/.test(label)) {
                    ruleThickness = Math.max(
                      options.fontMetrics().fboxrule,
                      // default
                      options.minRuleThickness
                      // User override.
                    );
                    vertPad = options.fontMetrics().fboxsep + (label === "colorbox" ? 0 : ruleThickness);
                  } else {
                    vertPad = isSingleChar ? 0.2 : 0;
                  }
                  img = stretchy.encloseSpan(inner, label, vertPad, options);
                  if (/fbox|boxed|fcolorbox/.test(label)) {
                    img.style.borderStyle = "solid";
                    img.style.borderWidth = ruleThickness + "em";
                  }
                  imgShift = inner.depth + vertPad;
                  if (group.backgroundColor) {
                    img.style.backgroundColor = group.backgroundColor;
                    if (group.borderColor) {
                      img.style.borderColor = group.borderColor;
                    }
                  }
                }
                var vlist;
                if (group.backgroundColor) {
                  vlist = buildCommon.makeVList({
                    positionType: "individualShift",
                    children: [
                      // Put the color background behind inner;
                      {
                        type: "elem",
                        elem: img,
                        shift: imgShift
                      },
                      {
                        type: "elem",
                        elem: inner,
                        shift: 0
                      }
                    ]
                  }, options);
                } else {
                  vlist = buildCommon.makeVList({
                    positionType: "individualShift",
                    children: [
                      // Write the \cancel stroke on top of inner.
                      {
                        type: "elem",
                        elem: inner,
                        shift: 0
                      },
                      {
                        type: "elem",
                        elem: img,
                        shift: imgShift,
                        wrapperClasses: /cancel/.test(label) ? ["svg-align"] : []
                      }
                    ]
                  }, options);
                }
                if (/cancel/.test(label)) {
                  vlist.height = inner.height;
                  vlist.depth = inner.depth;
                }
                if (/cancel/.test(label) && !isSingleChar) {
                  return buildCommon.makeSpan(["mord", "cancel-lap"], [vlist], options);
                } else {
                  return buildCommon.makeSpan(["mord"], [vlist], options);
                }
              };
              var enclose_mathmlBuilder = function mathmlBuilder(group, options) {
                var fboxsep = 0;
                var node = new mathMLTree.MathNode(group.label.indexOf("colorbox") > -1 ? "mpadded" : "menclose", [buildMathML_buildGroup(group.body, options)]);
                switch (group.label) {
                  case "\\cancel":
                    node.setAttribute("notation", "updiagonalstrike");
                    break;
                  case "\\bcancel":
                    node.setAttribute("notation", "downdiagonalstrike");
                    break;
                  case "\\sout":
                    node.setAttribute("notation", "horizontalstrike");
                    break;
                  case "\\fbox":
                    node.setAttribute("notation", "box");
                    break;
                  case "\\fcolorbox":
                  case "\\colorbox":
                    fboxsep = options.fontMetrics().fboxsep * options.fontMetrics().ptPerEm;
                    node.setAttribute("width", "+" + 2 * fboxsep + "pt");
                    node.setAttribute("height", "+" + 2 * fboxsep + "pt");
                    node.setAttribute("lspace", fboxsep + "pt");
                    node.setAttribute("voffset", fboxsep + "pt");
                    if (group.label === "\\fcolorbox") {
                      var thk = Math.max(
                        options.fontMetrics().fboxrule,
                        // default
                        options.minRuleThickness
                        // user override
                      );
                      node.setAttribute("style", "border: " + thk + "em solid " + String(group.borderColor));
                    }
                    break;
                  case "\\xcancel":
                    node.setAttribute("notation", "updiagonalstrike downdiagonalstrike");
                    break;
                }
                if (group.backgroundColor) {
                  node.setAttribute("mathbackground", group.backgroundColor);
                }
                return node;
              };
              defineFunction({
                type: "enclose",
                names: ["\\colorbox"],
                props: {
                  numArgs: 2,
                  allowedInText: true,
                  greediness: 3,
                  argTypes: ["color", "text"]
                },
                handler: function handler(_ref, args, optArgs) {
                  var parser = _ref.parser, funcName = _ref.funcName;
                  var color = assertNodeType(args[0], "color-token").color;
                  var body = args[1];
                  return {
                    type: "enclose",
                    mode: parser.mode,
                    label: funcName,
                    backgroundColor: color,
                    body
                  };
                },
                htmlBuilder: enclose_htmlBuilder,
                mathmlBuilder: enclose_mathmlBuilder
              });
              defineFunction({
                type: "enclose",
                names: ["\\fcolorbox"],
                props: {
                  numArgs: 3,
                  allowedInText: true,
                  greediness: 3,
                  argTypes: ["color", "color", "text"]
                },
                handler: function handler(_ref2, args, optArgs) {
                  var parser = _ref2.parser, funcName = _ref2.funcName;
                  var borderColor = assertNodeType(args[0], "color-token").color;
                  var backgroundColor = assertNodeType(args[1], "color-token").color;
                  var body = args[2];
                  return {
                    type: "enclose",
                    mode: parser.mode,
                    label: funcName,
                    backgroundColor,
                    borderColor,
                    body
                  };
                },
                htmlBuilder: enclose_htmlBuilder,
                mathmlBuilder: enclose_mathmlBuilder
              });
              defineFunction({
                type: "enclose",
                names: ["\\fbox"],
                props: {
                  numArgs: 1,
                  argTypes: ["hbox"],
                  allowedInText: true
                },
                handler: function handler(_ref3, args) {
                  var parser = _ref3.parser;
                  return {
                    type: "enclose",
                    mode: parser.mode,
                    label: "\\fbox",
                    body: args[0]
                  };
                }
              });
              defineFunction({
                type: "enclose",
                names: ["\\cancel", "\\bcancel", "\\xcancel", "\\sout"],
                props: {
                  numArgs: 1
                },
                handler: function handler(_ref4, args, optArgs) {
                  var parser = _ref4.parser, funcName = _ref4.funcName;
                  var body = args[0];
                  return {
                    type: "enclose",
                    mode: parser.mode,
                    label: funcName,
                    body
                  };
                },
                htmlBuilder: enclose_htmlBuilder,
                mathmlBuilder: enclose_mathmlBuilder
              });
              var _environments = {};
              function defineEnvironment(_ref) {
                var type = _ref.type, names = _ref.names, props = _ref.props, handler = _ref.handler, htmlBuilder = _ref.htmlBuilder, mathmlBuilder = _ref.mathmlBuilder;
                var data = {
                  type,
                  numArgs: props.numArgs || 0,
                  greediness: 1,
                  allowedInText: false,
                  numOptionalArgs: 0,
                  handler
                };
                for (var i = 0; i < names.length; ++i) {
                  _environments[names[i]] = data;
                }
                if (htmlBuilder) {
                  _htmlGroupBuilders[type] = htmlBuilder;
                }
                if (mathmlBuilder) {
                  _mathmlGroupBuilders[type] = mathmlBuilder;
                }
              }
              function getHLines(parser) {
                var hlineInfo = [];
                parser.consumeSpaces();
                var nxt = parser.fetch().text;
                while (nxt === "\\hline" || nxt === "\\hdashline") {
                  parser.consume();
                  hlineInfo.push(nxt === "\\hdashline");
                  parser.consumeSpaces();
                  nxt = parser.fetch().text;
                }
                return hlineInfo;
              }
              function parseArray(parser, _ref, style) {
                var hskipBeforeAndAfter = _ref.hskipBeforeAndAfter, addJot = _ref.addJot, cols = _ref.cols, arraystretch = _ref.arraystretch, colSeparationType = _ref.colSeparationType;
                parser.gullet.beginGroup();
                parser.gullet.macros.set("\\\\", "\\cr");
                if (!arraystretch) {
                  var stretch = parser.gullet.expandMacroAsText("\\arraystretch");
                  if (stretch == null) {
                    arraystretch = 1;
                  } else {
                    arraystretch = parseFloat(stretch);
                    if (!arraystretch || arraystretch < 0) {
                      throw new src_ParseError("Invalid \\arraystretch: " + stretch);
                    }
                  }
                }
                parser.gullet.beginGroup();
                var row = [];
                var body = [row];
                var rowGaps = [];
                var hLinesBeforeRow = [];
                hLinesBeforeRow.push(getHLines(parser));
                while (true) {
                  var cell = parser.parseExpression(false, "\\cr");
                  parser.gullet.endGroup();
                  parser.gullet.beginGroup();
                  cell = {
                    type: "ordgroup",
                    mode: parser.mode,
                    body: cell
                  };
                  if (style) {
                    cell = {
                      type: "styling",
                      mode: parser.mode,
                      style,
                      body: [cell]
                    };
                  }
                  row.push(cell);
                  var next = parser.fetch().text;
                  if (next === "&") {
                    parser.consume();
                  } else if (next === "\\end") {
                    if (row.length === 1 && cell.type === "styling" && cell.body[0].body.length === 0) {
                      body.pop();
                    }
                    if (hLinesBeforeRow.length < body.length + 1) {
                      hLinesBeforeRow.push([]);
                    }
                    break;
                  } else if (next === "\\cr") {
                    var cr = assertNodeType(parser.parseFunction(), "cr");
                    rowGaps.push(cr.size);
                    hLinesBeforeRow.push(getHLines(parser));
                    row = [];
                    body.push(row);
                  } else {
                    throw new src_ParseError("Expected & or \\\\ or \\cr or \\end", parser.nextToken);
                  }
                }
                parser.gullet.endGroup();
                parser.gullet.endGroup();
                return {
                  type: "array",
                  mode: parser.mode,
                  addJot,
                  arraystretch,
                  body,
                  cols,
                  rowGaps,
                  hskipBeforeAndAfter,
                  hLinesBeforeRow,
                  colSeparationType
                };
              }
              function dCellStyle(envName) {
                if (envName.substr(0, 1) === "d") {
                  return "display";
                } else {
                  return "text";
                }
              }
              var array_htmlBuilder = function htmlBuilder(group, options) {
                var r;
                var c;
                var nr = group.body.length;
                var hLinesBeforeRow = group.hLinesBeforeRow;
                var nc = 0;
                var body = new Array(nr);
                var hlines = [];
                var ruleThickness = Math.max(
                  // From LaTeX \showthe\arrayrulewidth. Equals 0.04 em.
                  options.fontMetrics().arrayRuleWidth,
                  options.minRuleThickness
                  // User override.
                );
                var pt = 1 / options.fontMetrics().ptPerEm;
                var arraycolsep = 5 * pt;
                if (group.colSeparationType && group.colSeparationType === "small") {
                  var localMultiplier = options.havingStyle(src_Style.SCRIPT).sizeMultiplier;
                  arraycolsep = 0.2778 * (localMultiplier / options.sizeMultiplier);
                }
                var baselineskip = 12 * pt;
                var jot = 3 * pt;
                var arrayskip = group.arraystretch * baselineskip;
                var arstrutHeight = 0.7 * arrayskip;
                var arstrutDepth = 0.3 * arrayskip;
                var totalHeight = 0;
                function setHLinePos(hlinesInGap) {
                  for (var i = 0; i < hlinesInGap.length; ++i) {
                    if (i > 0) {
                      totalHeight += 0.25;
                    }
                    hlines.push({
                      pos: totalHeight,
                      isDashed: hlinesInGap[i]
                    });
                  }
                }
                setHLinePos(hLinesBeforeRow[0]);
                for (r = 0; r < group.body.length; ++r) {
                  var inrow = group.body[r];
                  var height = arstrutHeight;
                  var depth = arstrutDepth;
                  if (nc < inrow.length) {
                    nc = inrow.length;
                  }
                  var outrow = new Array(inrow.length);
                  for (c = 0; c < inrow.length; ++c) {
                    var elt = buildHTML_buildGroup(inrow[c], options);
                    if (depth < elt.depth) {
                      depth = elt.depth;
                    }
                    if (height < elt.height) {
                      height = elt.height;
                    }
                    outrow[c] = elt;
                  }
                  var rowGap = group.rowGaps[r];
                  var gap = 0;
                  if (rowGap) {
                    gap = units_calculateSize(rowGap, options);
                    if (gap > 0) {
                      gap += arstrutDepth;
                      if (depth < gap) {
                        depth = gap;
                      }
                      gap = 0;
                    }
                  }
                  if (group.addJot) {
                    depth += jot;
                  }
                  outrow.height = height;
                  outrow.depth = depth;
                  totalHeight += height;
                  outrow.pos = totalHeight;
                  totalHeight += depth + gap;
                  body[r] = outrow;
                  setHLinePos(hLinesBeforeRow[r + 1]);
                }
                var offset = totalHeight / 2 + options.fontMetrics().axisHeight;
                var colDescriptions = group.cols || [];
                var cols = [];
                var colSep;
                var colDescrNum;
                for (
                  c = 0, colDescrNum = 0;
                  // Continue while either there are more columns or more column
                  // descriptions, so trailing separators don't get lost.
                  c < nc || colDescrNum < colDescriptions.length;
                  ++c, ++colDescrNum
                ) {
                  var colDescr = colDescriptions[colDescrNum] || {};
                  var firstSeparator = true;
                  while (colDescr.type === "separator") {
                    if (!firstSeparator) {
                      colSep = buildCommon.makeSpan(["arraycolsep"], []);
                      colSep.style.width = options.fontMetrics().doubleRuleSep + "em";
                      cols.push(colSep);
                    }
                    if (colDescr.separator === "|" || colDescr.separator === ":") {
                      var lineType = colDescr.separator === "|" ? "solid" : "dashed";
                      var separator = buildCommon.makeSpan(["vertical-separator"], [], options);
                      separator.style.height = totalHeight + "em";
                      separator.style.borderRightWidth = ruleThickness + "em";
                      separator.style.borderRightStyle = lineType;
                      separator.style.margin = "0 -" + ruleThickness / 2 + "em";
                      separator.style.verticalAlign = -(totalHeight - offset) + "em";
                      cols.push(separator);
                    } else {
                      throw new src_ParseError("Invalid separator type: " + colDescr.separator);
                    }
                    colDescrNum++;
                    colDescr = colDescriptions[colDescrNum] || {};
                    firstSeparator = false;
                  }
                  if (c >= nc) {
                    continue;
                  }
                  var sepwidth = void 0;
                  if (c > 0 || group.hskipBeforeAndAfter) {
                    sepwidth = utils.deflt(colDescr.pregap, arraycolsep);
                    if (sepwidth !== 0) {
                      colSep = buildCommon.makeSpan(["arraycolsep"], []);
                      colSep.style.width = sepwidth + "em";
                      cols.push(colSep);
                    }
                  }
                  var col = [];
                  for (r = 0; r < nr; ++r) {
                    var row = body[r];
                    var elem = row[c];
                    if (!elem) {
                      continue;
                    }
                    var shift = row.pos - offset;
                    elem.depth = row.depth;
                    elem.height = row.height;
                    col.push({
                      type: "elem",
                      elem,
                      shift
                    });
                  }
                  col = buildCommon.makeVList({
                    positionType: "individualShift",
                    children: col
                  }, options);
                  col = buildCommon.makeSpan(["col-align-" + (colDescr.align || "c")], [col]);
                  cols.push(col);
                  if (c < nc - 1 || group.hskipBeforeAndAfter) {
                    sepwidth = utils.deflt(colDescr.postgap, arraycolsep);
                    if (sepwidth !== 0) {
                      colSep = buildCommon.makeSpan(["arraycolsep"], []);
                      colSep.style.width = sepwidth + "em";
                      cols.push(colSep);
                    }
                  }
                }
                body = buildCommon.makeSpan(["mtable"], cols);
                if (hlines.length > 0) {
                  var line = buildCommon.makeLineSpan("hline", options, ruleThickness);
                  var dashes = buildCommon.makeLineSpan("hdashline", options, ruleThickness);
                  var vListElems = [{
                    type: "elem",
                    elem: body,
                    shift: 0
                  }];
                  while (hlines.length > 0) {
                    var hline = hlines.pop();
                    var lineShift = hline.pos - offset;
                    if (hline.isDashed) {
                      vListElems.push({
                        type: "elem",
                        elem: dashes,
                        shift: lineShift
                      });
                    } else {
                      vListElems.push({
                        type: "elem",
                        elem: line,
                        shift: lineShift
                      });
                    }
                  }
                  body = buildCommon.makeVList({
                    positionType: "individualShift",
                    children: vListElems
                  }, options);
                }
                return buildCommon.makeSpan(["mord"], [body], options);
              };
              var alignMap = {
                c: "center ",
                l: "left ",
                r: "right "
              };
              var array_mathmlBuilder = function mathmlBuilder(group, options) {
                var table = new mathMLTree.MathNode("mtable", group.body.map(function(row) {
                  return new mathMLTree.MathNode("mtr", row.map(function(cell) {
                    return new mathMLTree.MathNode("mtd", [buildMathML_buildGroup(cell, options)]);
                  }));
                }));
                var gap = group.arraystretch === 0.5 ? 0.1 : 0.16 + group.arraystretch - 1 + (group.addJot ? 0.09 : 0);
                table.setAttribute("rowspacing", gap + "em");
                var menclose = "";
                var align = "";
                if (group.cols) {
                  var cols = group.cols;
                  var columnLines = "";
                  var prevTypeWasAlign = false;
                  var iStart = 0;
                  var iEnd = cols.length;
                  if (cols[0].type === "separator") {
                    menclose += "top ";
                    iStart = 1;
                  }
                  if (cols[cols.length - 1].type === "separator") {
                    menclose += "bottom ";
                    iEnd -= 1;
                  }
                  for (var i = iStart; i < iEnd; i++) {
                    if (cols[i].type === "align") {
                      align += alignMap[cols[i].align];
                      if (prevTypeWasAlign) {
                        columnLines += "none ";
                      }
                      prevTypeWasAlign = true;
                    } else if (cols[i].type === "separator") {
                      if (prevTypeWasAlign) {
                        columnLines += cols[i].separator === "|" ? "solid " : "dashed ";
                        prevTypeWasAlign = false;
                      }
                    }
                  }
                  table.setAttribute("columnalign", align.trim());
                  if (/[sd]/.test(columnLines)) {
                    table.setAttribute("columnlines", columnLines.trim());
                  }
                }
                if (group.colSeparationType === "align") {
                  var _cols = group.cols || [];
                  var spacing = "";
                  for (var _i = 1; _i < _cols.length; _i++) {
                    spacing += _i % 2 ? "0em " : "1em ";
                  }
                  table.setAttribute("columnspacing", spacing.trim());
                } else if (group.colSeparationType === "alignat") {
                  table.setAttribute("columnspacing", "0em");
                } else if (group.colSeparationType === "small") {
                  table.setAttribute("columnspacing", "0.2778em");
                } else {
                  table.setAttribute("columnspacing", "1em");
                }
                var rowLines = "";
                var hlines = group.hLinesBeforeRow;
                menclose += hlines[0].length > 0 ? "left " : "";
                menclose += hlines[hlines.length - 1].length > 0 ? "right " : "";
                for (var _i2 = 1; _i2 < hlines.length - 1; _i2++) {
                  rowLines += hlines[_i2].length === 0 ? "none " : hlines[_i2][0] ? "dashed " : "solid ";
                }
                if (/[sd]/.test(rowLines)) {
                  table.setAttribute("rowlines", rowLines.trim());
                }
                if (menclose !== "") {
                  table = new mathMLTree.MathNode("menclose", [table]);
                  table.setAttribute("notation", menclose.trim());
                }
                if (group.arraystretch && group.arraystretch < 1) {
                  table = new mathMLTree.MathNode("mstyle", [table]);
                  table.setAttribute("scriptlevel", "1");
                }
                return table;
              };
              var array_alignedHandler = function alignedHandler(context, args) {
                var cols = [];
                var res = parseArray(context.parser, {
                  cols,
                  addJot: true
                }, "display");
                var numMaths;
                var numCols = 0;
                var emptyGroup = {
                  type: "ordgroup",
                  mode: context.mode,
                  body: []
                };
                var ordgroup = checkNodeType(args[0], "ordgroup");
                if (ordgroup) {
                  var arg0 = "";
                  for (var i = 0; i < ordgroup.body.length; i++) {
                    var textord = assertNodeType(ordgroup.body[i], "textord");
                    arg0 += textord.text;
                  }
                  numMaths = Number(arg0);
                  numCols = numMaths * 2;
                }
                var isAligned = !numCols;
                res.body.forEach(function(row) {
                  for (var _i3 = 1; _i3 < row.length; _i3 += 2) {
                    var styling = assertNodeType(row[_i3], "styling");
                    var _ordgroup = assertNodeType(styling.body[0], "ordgroup");
                    _ordgroup.body.unshift(emptyGroup);
                  }
                  if (!isAligned) {
                    var curMaths = row.length / 2;
                    if (numMaths < curMaths) {
                      throw new src_ParseError("Too many math in a row: " + ("expected " + numMaths + ", but got " + curMaths), row[0]);
                    }
                  } else if (numCols < row.length) {
                    numCols = row.length;
                  }
                });
                for (var _i4 = 0; _i4 < numCols; ++_i4) {
                  var align = "r";
                  var pregap = 0;
                  if (_i4 % 2 === 1) {
                    align = "l";
                  } else if (_i4 > 0 && isAligned) {
                    pregap = 1;
                  }
                  cols[_i4] = {
                    type: "align",
                    align,
                    pregap,
                    postgap: 0
                  };
                }
                res.colSeparationType = isAligned ? "align" : "alignat";
                return res;
              };
              defineEnvironment({
                type: "array",
                names: ["array", "darray"],
                props: {
                  numArgs: 1
                },
                handler: function handler(context, args) {
                  var symNode = checkSymbolNodeType(args[0]);
                  var colalign = symNode ? [args[0]] : assertNodeType(args[0], "ordgroup").body;
                  var cols = colalign.map(function(nde) {
                    var node = assertSymbolNodeType(nde);
                    var ca = node.text;
                    if ("lcr".indexOf(ca) !== -1) {
                      return {
                        type: "align",
                        align: ca
                      };
                    } else if (ca === "|") {
                      return {
                        type: "separator",
                        separator: "|"
                      };
                    } else if (ca === ":") {
                      return {
                        type: "separator",
                        separator: ":"
                      };
                    }
                    throw new src_ParseError("Unknown column alignment: " + ca, nde);
                  });
                  var res = {
                    cols,
                    hskipBeforeAndAfter: true
                    // \@preamble in lttab.dtx
                  };
                  return parseArray(context.parser, res, dCellStyle(context.envName));
                },
                htmlBuilder: array_htmlBuilder,
                mathmlBuilder: array_mathmlBuilder
              });
              defineEnvironment({
                type: "array",
                names: ["matrix", "pmatrix", "bmatrix", "Bmatrix", "vmatrix", "Vmatrix"],
                props: {
                  numArgs: 0
                },
                handler: function handler(context) {
                  var delimiters2 = {
                    "matrix": null,
                    "pmatrix": ["(", ")"],
                    "bmatrix": ["[", "]"],
                    "Bmatrix": ["\\{", "\\}"],
                    "vmatrix": ["|", "|"],
                    "Vmatrix": ["\\Vert", "\\Vert"]
                  }[context.envName];
                  var payload = {
                    hskipBeforeAndAfter: false
                  };
                  var res = parseArray(context.parser, payload, dCellStyle(context.envName));
                  return delimiters2 ? {
                    type: "leftright",
                    mode: context.mode,
                    body: [res],
                    left: delimiters2[0],
                    right: delimiters2[1],
                    rightColor: void 0
                    // \right uninfluenced by \color in array
                  } : res;
                },
                htmlBuilder: array_htmlBuilder,
                mathmlBuilder: array_mathmlBuilder
              });
              defineEnvironment({
                type: "array",
                names: ["smallmatrix"],
                props: {
                  numArgs: 0
                },
                handler: function handler(context) {
                  var payload = {
                    arraystretch: 0.5
                  };
                  var res = parseArray(context.parser, payload, "script");
                  res.colSeparationType = "small";
                  return res;
                },
                htmlBuilder: array_htmlBuilder,
                mathmlBuilder: array_mathmlBuilder
              });
              defineEnvironment({
                type: "array",
                names: ["subarray"],
                props: {
                  numArgs: 1
                },
                handler: function handler(context, args) {
                  var symNode = checkSymbolNodeType(args[0]);
                  var colalign = symNode ? [args[0]] : assertNodeType(args[0], "ordgroup").body;
                  var cols = colalign.map(function(nde) {
                    var node = assertSymbolNodeType(nde);
                    var ca = node.text;
                    if ("lc".indexOf(ca) !== -1) {
                      return {
                        type: "align",
                        align: ca
                      };
                    }
                    throw new src_ParseError("Unknown column alignment: " + ca, nde);
                  });
                  if (cols.length > 1) {
                    throw new src_ParseError("{subarray} can contain only one column");
                  }
                  var res = {
                    cols,
                    hskipBeforeAndAfter: false,
                    arraystretch: 0.5
                  };
                  res = parseArray(context.parser, res, "script");
                  if (res.body[0].length > 1) {
                    throw new src_ParseError("{subarray} can contain only one column");
                  }
                  return res;
                },
                htmlBuilder: array_htmlBuilder,
                mathmlBuilder: array_mathmlBuilder
              });
              defineEnvironment({
                type: "array",
                names: ["cases", "dcases"],
                props: {
                  numArgs: 0
                },
                handler: function handler(context) {
                  var payload = {
                    arraystretch: 1.2,
                    cols: [{
                      type: "align",
                      align: "l",
                      pregap: 0,
                      // TODO(kevinb) get the current style.
                      // For now we use the metrics for TEXT style which is what we were
                      // doing before.  Before attempting to get the current style we
                      // should look at TeX's behavior especially for \over and matrices.
                      postgap: 1
                      /* 1em quad */
                    }, {
                      type: "align",
                      align: "l",
                      pregap: 0,
                      postgap: 0
                    }]
                  };
                  var res = parseArray(context.parser, payload, dCellStyle(context.envName));
                  return {
                    type: "leftright",
                    mode: context.mode,
                    body: [res],
                    left: "\\{",
                    right: ".",
                    rightColor: void 0
                  };
                },
                htmlBuilder: array_htmlBuilder,
                mathmlBuilder: array_mathmlBuilder
              });
              defineEnvironment({
                type: "array",
                names: ["aligned"],
                props: {
                  numArgs: 0
                },
                handler: array_alignedHandler,
                htmlBuilder: array_htmlBuilder,
                mathmlBuilder: array_mathmlBuilder
              });
              defineEnvironment({
                type: "array",
                names: ["gathered"],
                props: {
                  numArgs: 0
                },
                handler: function handler(context) {
                  var res = {
                    cols: [{
                      type: "align",
                      align: "c"
                    }],
                    addJot: true
                  };
                  return parseArray(context.parser, res, "display");
                },
                htmlBuilder: array_htmlBuilder,
                mathmlBuilder: array_mathmlBuilder
              });
              defineEnvironment({
                type: "array",
                names: ["alignedat"],
                // One for numbered and for unnumbered;
                // but, KaTeX doesn't supports math numbering yet,
                // they make no difference for now.
                props: {
                  numArgs: 1
                },
                handler: array_alignedHandler,
                htmlBuilder: array_htmlBuilder,
                mathmlBuilder: array_mathmlBuilder
              });
              defineFunction({
                type: "text",
                // Doesn't matter what this is.
                names: ["\\hline", "\\hdashline"],
                props: {
                  numArgs: 0,
                  allowedInText: true,
                  allowedInMath: true
                },
                handler: function handler(context, args) {
                  throw new src_ParseError(context.funcName + " valid only within array environment");
                }
              });
              var environments = _environments;
              var src_environments = environments;
              defineFunction({
                type: "environment",
                names: ["\\begin", "\\end"],
                props: {
                  numArgs: 1,
                  argTypes: ["text"]
                },
                handler: function handler(_ref, args) {
                  var parser = _ref.parser, funcName = _ref.funcName;
                  var nameGroup = args[0];
                  if (nameGroup.type !== "ordgroup") {
                    throw new src_ParseError("Invalid environment name", nameGroup);
                  }
                  var envName = "";
                  for (var i = 0; i < nameGroup.body.length; ++i) {
                    envName += assertNodeType(nameGroup.body[i], "textord").text;
                  }
                  if (funcName === "\\begin") {
                    if (!src_environments.hasOwnProperty(envName)) {
                      throw new src_ParseError("No such environment: " + envName, nameGroup);
                    }
                    var env = src_environments[envName];
                    var _parser$parseArgument = parser.parseArguments("\\begin{" + envName + "}", env), _args = _parser$parseArgument.args, optArgs = _parser$parseArgument.optArgs;
                    var context = {
                      mode: parser.mode,
                      envName,
                      parser
                    };
                    var result = env.handler(context, _args, optArgs);
                    parser.expect("\\end", false);
                    var endNameToken = parser.nextToken;
                    var end = assertNodeType(parser.parseFunction(), "environment");
                    if (end.name !== envName) {
                      throw new src_ParseError("Mismatch: \\begin{" + envName + "} matched by \\end{" + end.name + "}", endNameToken);
                    }
                    return result;
                  }
                  return {
                    type: "environment",
                    mode: parser.mode,
                    name: envName,
                    nameGroup
                  };
                }
              });
              var mclass_makeSpan = buildCommon.makeSpan;
              function mclass_htmlBuilder(group, options) {
                var elements = buildHTML_buildExpression(group.body, options, true);
                return mclass_makeSpan([group.mclass], elements, options);
              }
              function mclass_mathmlBuilder(group, options) {
                var node;
                var inner = buildMathML_buildExpression(group.body, options);
                if (group.mclass === "minner") {
                  return mathMLTree.newDocumentFragment(inner);
                } else if (group.mclass === "mord") {
                  if (group.isCharacterBox) {
                    node = inner[0];
                    node.type = "mi";
                  } else {
                    node = new mathMLTree.MathNode("mi", inner);
                  }
                } else {
                  if (group.isCharacterBox) {
                    node = inner[0];
                    node.type = "mo";
                  } else {
                    node = new mathMLTree.MathNode("mo", inner);
                  }
                  if (group.mclass === "mbin") {
                    node.attributes.lspace = "0.22em";
                    node.attributes.rspace = "0.22em";
                  } else if (group.mclass === "mpunct") {
                    node.attributes.lspace = "0em";
                    node.attributes.rspace = "0.17em";
                  } else if (group.mclass === "mopen" || group.mclass === "mclose") {
                    node.attributes.lspace = "0em";
                    node.attributes.rspace = "0em";
                  }
                }
                return node;
              }
              defineFunction({
                type: "mclass",
                names: ["\\mathord", "\\mathbin", "\\mathrel", "\\mathopen", "\\mathclose", "\\mathpunct", "\\mathinner"],
                props: {
                  numArgs: 1
                },
                handler: function handler(_ref, args) {
                  var parser = _ref.parser, funcName = _ref.funcName;
                  var body = args[0];
                  return {
                    type: "mclass",
                    mode: parser.mode,
                    mclass: "m" + funcName.substr(5),
                    // TODO(kevinb): don't prefix with 'm'
                    body: defineFunction_ordargument(body),
                    isCharacterBox: utils.isCharacterBox(body)
                  };
                },
                htmlBuilder: mclass_htmlBuilder,
                mathmlBuilder: mclass_mathmlBuilder
              });
              var binrelClass = function binrelClass2(arg) {
                var atom = arg.type === "ordgroup" && arg.body.length ? arg.body[0] : arg;
                if (atom.type === "atom" && (atom.family === "bin" || atom.family === "rel")) {
                  return "m" + atom.family;
                } else {
                  return "mord";
                }
              };
              defineFunction({
                type: "mclass",
                names: ["\\@binrel"],
                props: {
                  numArgs: 2
                },
                handler: function handler(_ref2, args) {
                  var parser = _ref2.parser;
                  return {
                    type: "mclass",
                    mode: parser.mode,
                    mclass: binrelClass(args[0]),
                    body: [args[1]],
                    isCharacterBox: utils.isCharacterBox(args[1])
                  };
                }
              });
              defineFunction({
                type: "mclass",
                names: ["\\stackrel", "\\overset", "\\underset"],
                props: {
                  numArgs: 2
                },
                handler: function handler(_ref3, args) {
                  var parser = _ref3.parser, funcName = _ref3.funcName;
                  var baseArg = args[1];
                  var shiftedArg = args[0];
                  var mclass;
                  if (funcName !== "\\stackrel") {
                    mclass = binrelClass(baseArg);
                  } else {
                    mclass = "mrel";
                  }
                  var baseOp = {
                    type: "op",
                    mode: baseArg.mode,
                    limits: true,
                    alwaysHandleSupSub: true,
                    parentIsSupSub: false,
                    symbol: false,
                    suppressBaseShift: funcName !== "\\stackrel",
                    body: defineFunction_ordargument(baseArg)
                  };
                  var supsub = {
                    type: "supsub",
                    mode: shiftedArg.mode,
                    base: baseOp,
                    sup: funcName === "\\underset" ? null : shiftedArg,
                    sub: funcName === "\\underset" ? shiftedArg : null
                  };
                  return {
                    type: "mclass",
                    mode: parser.mode,
                    mclass,
                    body: [supsub],
                    isCharacterBox: utils.isCharacterBox(supsub)
                  };
                },
                htmlBuilder: mclass_htmlBuilder,
                mathmlBuilder: mclass_mathmlBuilder
              });
              var font_htmlBuilder = function htmlBuilder(group, options) {
                var font = group.font;
                var newOptions = options.withFont(font);
                return buildHTML_buildGroup(group.body, newOptions);
              };
              var font_mathmlBuilder = function mathmlBuilder(group, options) {
                var font = group.font;
                var newOptions = options.withFont(font);
                return buildMathML_buildGroup(group.body, newOptions);
              };
              var fontAliases = {
                "\\Bbb": "\\mathbb",
                "\\bold": "\\mathbf",
                "\\frak": "\\mathfrak",
                "\\bm": "\\boldsymbol"
              };
              defineFunction({
                type: "font",
                names: [
                  // styles, except \boldsymbol defined below
                  "\\mathrm",
                  "\\mathit",
                  "\\mathbf",
                  "\\mathnormal",
                  // families
                  "\\mathbb",
                  "\\mathcal",
                  "\\mathfrak",
                  "\\mathscr",
                  "\\mathsf",
                  "\\mathtt",
                  // aliases, except \bm defined below
                  "\\Bbb",
                  "\\bold",
                  "\\frak"
                ],
                props: {
                  numArgs: 1,
                  greediness: 2
                },
                handler: function handler(_ref, args) {
                  var parser = _ref.parser, funcName = _ref.funcName;
                  var body = args[0];
                  var func = funcName;
                  if (func in fontAliases) {
                    func = fontAliases[func];
                  }
                  return {
                    type: "font",
                    mode: parser.mode,
                    font: func.slice(1),
                    body
                  };
                },
                htmlBuilder: font_htmlBuilder,
                mathmlBuilder: font_mathmlBuilder
              });
              defineFunction({
                type: "mclass",
                names: ["\\boldsymbol", "\\bm"],
                props: {
                  numArgs: 1,
                  greediness: 2
                },
                handler: function handler(_ref2, args) {
                  var parser = _ref2.parser;
                  var body = args[0];
                  var isCharacterBox = utils.isCharacterBox(body);
                  return {
                    type: "mclass",
                    mode: parser.mode,
                    mclass: binrelClass(body),
                    body: [{
                      type: "font",
                      mode: parser.mode,
                      font: "boldsymbol",
                      body
                    }],
                    isCharacterBox
                  };
                }
              });
              defineFunction({
                type: "font",
                names: ["\\rm", "\\sf", "\\tt", "\\bf", "\\it"],
                props: {
                  numArgs: 0,
                  allowedInText: true
                },
                handler: function handler(_ref3, args) {
                  var parser = _ref3.parser, funcName = _ref3.funcName, breakOnTokenText = _ref3.breakOnTokenText;
                  var mode = parser.mode;
                  var body = parser.parseExpression(true, breakOnTokenText);
                  var style = "math" + funcName.slice(1);
                  return {
                    type: "font",
                    mode,
                    font: style,
                    body: {
                      type: "ordgroup",
                      mode: parser.mode,
                      body
                    }
                  };
                },
                htmlBuilder: font_htmlBuilder,
                mathmlBuilder: font_mathmlBuilder
              });
              var genfrac_adjustStyle = function adjustStyle(size, originalStyle) {
                var style = originalStyle;
                if (size === "display") {
                  style = style.id >= src_Style.SCRIPT.id ? style.text() : src_Style.DISPLAY;
                } else if (size === "text" && style.size === src_Style.DISPLAY.size) {
                  style = src_Style.TEXT;
                } else if (size === "script") {
                  style = src_Style.SCRIPT;
                } else if (size === "scriptscript") {
                  style = src_Style.SCRIPTSCRIPT;
                }
                return style;
              };
              var genfrac_htmlBuilder = function htmlBuilder(group, options) {
                var style = genfrac_adjustStyle(group.size, options.style);
                var nstyle = style.fracNum();
                var dstyle = style.fracDen();
                var newOptions;
                newOptions = options.havingStyle(nstyle);
                var numerm = buildHTML_buildGroup(group.numer, newOptions, options);
                if (group.continued) {
                  var hStrut = 8.5 / options.fontMetrics().ptPerEm;
                  var dStrut = 3.5 / options.fontMetrics().ptPerEm;
                  numerm.height = numerm.height < hStrut ? hStrut : numerm.height;
                  numerm.depth = numerm.depth < dStrut ? dStrut : numerm.depth;
                }
                newOptions = options.havingStyle(dstyle);
                var denomm = buildHTML_buildGroup(group.denom, newOptions, options);
                var rule;
                var ruleWidth;
                var ruleSpacing;
                if (group.hasBarLine) {
                  if (group.barSize) {
                    ruleWidth = units_calculateSize(group.barSize, options);
                    rule = buildCommon.makeLineSpan("frac-line", options, ruleWidth);
                  } else {
                    rule = buildCommon.makeLineSpan("frac-line", options);
                  }
                  ruleWidth = rule.height;
                  ruleSpacing = rule.height;
                } else {
                  rule = null;
                  ruleWidth = 0;
                  ruleSpacing = options.fontMetrics().defaultRuleThickness;
                }
                var numShift;
                var clearance;
                var denomShift;
                if (style.size === src_Style.DISPLAY.size || group.size === "display") {
                  numShift = options.fontMetrics().num1;
                  if (ruleWidth > 0) {
                    clearance = 3 * ruleSpacing;
                  } else {
                    clearance = 7 * ruleSpacing;
                  }
                  denomShift = options.fontMetrics().denom1;
                } else {
                  if (ruleWidth > 0) {
                    numShift = options.fontMetrics().num2;
                    clearance = ruleSpacing;
                  } else {
                    numShift = options.fontMetrics().num3;
                    clearance = 3 * ruleSpacing;
                  }
                  denomShift = options.fontMetrics().denom2;
                }
                var frac;
                if (!rule) {
                  var candidateClearance = numShift - numerm.depth - (denomm.height - denomShift);
                  if (candidateClearance < clearance) {
                    numShift += 0.5 * (clearance - candidateClearance);
                    denomShift += 0.5 * (clearance - candidateClearance);
                  }
                  frac = buildCommon.makeVList({
                    positionType: "individualShift",
                    children: [{
                      type: "elem",
                      elem: denomm,
                      shift: denomShift
                    }, {
                      type: "elem",
                      elem: numerm,
                      shift: -numShift
                    }]
                  }, options);
                } else {
                  var axisHeight = options.fontMetrics().axisHeight;
                  if (numShift - numerm.depth - (axisHeight + 0.5 * ruleWidth) < clearance) {
                    numShift += clearance - (numShift - numerm.depth - (axisHeight + 0.5 * ruleWidth));
                  }
                  if (axisHeight - 0.5 * ruleWidth - (denomm.height - denomShift) < clearance) {
                    denomShift += clearance - (axisHeight - 0.5 * ruleWidth - (denomm.height - denomShift));
                  }
                  var midShift = -(axisHeight - 0.5 * ruleWidth);
                  frac = buildCommon.makeVList({
                    positionType: "individualShift",
                    children: [{
                      type: "elem",
                      elem: denomm,
                      shift: denomShift
                    }, {
                      type: "elem",
                      elem: rule,
                      shift: midShift
                    }, {
                      type: "elem",
                      elem: numerm,
                      shift: -numShift
                    }]
                  }, options);
                }
                newOptions = options.havingStyle(style);
                frac.height *= newOptions.sizeMultiplier / options.sizeMultiplier;
                frac.depth *= newOptions.sizeMultiplier / options.sizeMultiplier;
                var delimSize;
                if (style.size === src_Style.DISPLAY.size) {
                  delimSize = options.fontMetrics().delim1;
                } else {
                  delimSize = options.fontMetrics().delim2;
                }
                var leftDelim;
                var rightDelim;
                if (group.leftDelim == null) {
                  leftDelim = makeNullDelimiter(options, ["mopen"]);
                } else {
                  leftDelim = delimiter.customSizedDelim(group.leftDelim, delimSize, true, options.havingStyle(style), group.mode, ["mopen"]);
                }
                if (group.continued) {
                  rightDelim = buildCommon.makeSpan([]);
                } else if (group.rightDelim == null) {
                  rightDelim = makeNullDelimiter(options, ["mclose"]);
                } else {
                  rightDelim = delimiter.customSizedDelim(group.rightDelim, delimSize, true, options.havingStyle(style), group.mode, ["mclose"]);
                }
                return buildCommon.makeSpan(["mord"].concat(newOptions.sizingClasses(options)), [leftDelim, buildCommon.makeSpan(["mfrac"], [frac]), rightDelim], options);
              };
              var genfrac_mathmlBuilder = function mathmlBuilder(group, options) {
                var node = new mathMLTree.MathNode("mfrac", [buildMathML_buildGroup(group.numer, options), buildMathML_buildGroup(group.denom, options)]);
                if (!group.hasBarLine) {
                  node.setAttribute("linethickness", "0px");
                } else if (group.barSize) {
                  var ruleWidth = units_calculateSize(group.barSize, options);
                  node.setAttribute("linethickness", ruleWidth + "em");
                }
                var style = genfrac_adjustStyle(group.size, options.style);
                if (style.size !== options.style.size) {
                  node = new mathMLTree.MathNode("mstyle", [node]);
                  var isDisplay = style.size === src_Style.DISPLAY.size ? "true" : "false";
                  node.setAttribute("displaystyle", isDisplay);
                  node.setAttribute("scriptlevel", "0");
                }
                if (group.leftDelim != null || group.rightDelim != null) {
                  var withDelims = [];
                  if (group.leftDelim != null) {
                    var leftOp = new mathMLTree.MathNode("mo", [new mathMLTree.TextNode(group.leftDelim.replace("\\", ""))]);
                    leftOp.setAttribute("fence", "true");
                    withDelims.push(leftOp);
                  }
                  withDelims.push(node);
                  if (group.rightDelim != null) {
                    var rightOp = new mathMLTree.MathNode("mo", [new mathMLTree.TextNode(group.rightDelim.replace("\\", ""))]);
                    rightOp.setAttribute("fence", "true");
                    withDelims.push(rightOp);
                  }
                  return buildMathML_makeRow(withDelims);
                }
                return node;
              };
              defineFunction({
                type: "genfrac",
                names: [
                  "\\cfrac",
                  "\\dfrac",
                  "\\frac",
                  "\\tfrac",
                  "\\dbinom",
                  "\\binom",
                  "\\tbinom",
                  "\\\\atopfrac",
                  // can’t be entered directly
                  "\\\\bracefrac",
                  "\\\\brackfrac"
                ],
                props: {
                  numArgs: 2,
                  greediness: 2
                },
                handler: function handler(_ref, args) {
                  var parser = _ref.parser, funcName = _ref.funcName;
                  var numer = args[0];
                  var denom = args[1];
                  var hasBarLine;
                  var leftDelim = null;
                  var rightDelim = null;
                  var size = "auto";
                  switch (funcName) {
                    case "\\cfrac":
                    case "\\dfrac":
                    case "\\frac":
                    case "\\tfrac":
                      hasBarLine = true;
                      break;
                    case "\\\\atopfrac":
                      hasBarLine = false;
                      break;
                    case "\\dbinom":
                    case "\\binom":
                    case "\\tbinom":
                      hasBarLine = false;
                      leftDelim = "(";
                      rightDelim = ")";
                      break;
                    case "\\\\bracefrac":
                      hasBarLine = false;
                      leftDelim = "\\{";
                      rightDelim = "\\}";
                      break;
                    case "\\\\brackfrac":
                      hasBarLine = false;
                      leftDelim = "[";
                      rightDelim = "]";
                      break;
                    default:
                      throw new Error("Unrecognized genfrac command");
                  }
                  switch (funcName) {
                    case "\\cfrac":
                    case "\\dfrac":
                    case "\\dbinom":
                      size = "display";
                      break;
                    case "\\tfrac":
                    case "\\tbinom":
                      size = "text";
                      break;
                  }
                  return {
                    type: "genfrac",
                    mode: parser.mode,
                    continued: funcName === "\\cfrac",
                    numer,
                    denom,
                    hasBarLine,
                    leftDelim,
                    rightDelim,
                    size,
                    barSize: null
                  };
                },
                htmlBuilder: genfrac_htmlBuilder,
                mathmlBuilder: genfrac_mathmlBuilder
              });
              defineFunction({
                type: "infix",
                names: ["\\over", "\\choose", "\\atop", "\\brace", "\\brack"],
                props: {
                  numArgs: 0,
                  infix: true
                },
                handler: function handler(_ref2) {
                  var parser = _ref2.parser, funcName = _ref2.funcName, token = _ref2.token;
                  var replaceWith;
                  switch (funcName) {
                    case "\\over":
                      replaceWith = "\\frac";
                      break;
                    case "\\choose":
                      replaceWith = "\\binom";
                      break;
                    case "\\atop":
                      replaceWith = "\\\\atopfrac";
                      break;
                    case "\\brace":
                      replaceWith = "\\\\bracefrac";
                      break;
                    case "\\brack":
                      replaceWith = "\\\\brackfrac";
                      break;
                    default:
                      throw new Error("Unrecognized infix genfrac command");
                  }
                  return {
                    type: "infix",
                    mode: parser.mode,
                    replaceWith,
                    token
                  };
                }
              });
              var stylArray = ["display", "text", "script", "scriptscript"];
              var delimFromValue = function delimFromValue2(delimString) {
                var delim = null;
                if (delimString.length > 0) {
                  delim = delimString;
                  delim = delim === "." ? null : delim;
                }
                return delim;
              };
              defineFunction({
                type: "genfrac",
                names: ["\\genfrac"],
                props: {
                  numArgs: 6,
                  greediness: 6,
                  argTypes: ["math", "math", "size", "text", "math", "math"]
                },
                handler: function handler(_ref3, args) {
                  var parser = _ref3.parser;
                  var numer = args[4];
                  var denom = args[5];
                  var leftNode = checkNodeType(args[0], "atom");
                  if (leftNode) {
                    leftNode = assertAtomFamily(args[0], "open");
                  }
                  var leftDelim = leftNode ? delimFromValue(leftNode.text) : null;
                  var rightNode = checkNodeType(args[1], "atom");
                  if (rightNode) {
                    rightNode = assertAtomFamily(args[1], "close");
                  }
                  var rightDelim = rightNode ? delimFromValue(rightNode.text) : null;
                  var barNode = assertNodeType(args[2], "size");
                  var hasBarLine;
                  var barSize = null;
                  if (barNode.isBlank) {
                    hasBarLine = true;
                  } else {
                    barSize = barNode.value;
                    hasBarLine = barSize.number > 0;
                  }
                  var size = "auto";
                  var styl = checkNodeType(args[3], "ordgroup");
                  if (styl) {
                    if (styl.body.length > 0) {
                      var textOrd = assertNodeType(styl.body[0], "textord");
                      size = stylArray[Number(textOrd.text)];
                    }
                  } else {
                    styl = assertNodeType(args[3], "textord");
                    size = stylArray[Number(styl.text)];
                  }
                  return {
                    type: "genfrac",
                    mode: parser.mode,
                    numer,
                    denom,
                    continued: false,
                    hasBarLine,
                    barSize,
                    leftDelim,
                    rightDelim,
                    size
                  };
                },
                htmlBuilder: genfrac_htmlBuilder,
                mathmlBuilder: genfrac_mathmlBuilder
              });
              defineFunction({
                type: "infix",
                names: ["\\above"],
                props: {
                  numArgs: 1,
                  argTypes: ["size"],
                  infix: true
                },
                handler: function handler(_ref4, args) {
                  var parser = _ref4.parser, funcName = _ref4.funcName, token = _ref4.token;
                  return {
                    type: "infix",
                    mode: parser.mode,
                    replaceWith: "\\\\abovefrac",
                    size: assertNodeType(args[0], "size").value,
                    token
                  };
                }
              });
              defineFunction({
                type: "genfrac",
                names: ["\\\\abovefrac"],
                props: {
                  numArgs: 3,
                  argTypes: ["math", "size", "math"]
                },
                handler: function handler(_ref5, args) {
                  var parser = _ref5.parser, funcName = _ref5.funcName;
                  var numer = args[0];
                  var barSize = assert(assertNodeType(args[1], "infix").size);
                  var denom = args[2];
                  var hasBarLine = barSize.number > 0;
                  return {
                    type: "genfrac",
                    mode: parser.mode,
                    numer,
                    denom,
                    continued: false,
                    hasBarLine,
                    barSize,
                    leftDelim: null,
                    rightDelim: null,
                    size: "auto"
                  };
                },
                htmlBuilder: genfrac_htmlBuilder,
                mathmlBuilder: genfrac_mathmlBuilder
              });
              var horizBrace_htmlBuilder = function htmlBuilder(grp, options) {
                var style = options.style;
                var supSubGroup;
                var group;
                var supSub = checkNodeType(grp, "supsub");
                if (supSub) {
                  supSubGroup = supSub.sup ? buildHTML_buildGroup(supSub.sup, options.havingStyle(style.sup()), options) : buildHTML_buildGroup(supSub.sub, options.havingStyle(style.sub()), options);
                  group = assertNodeType(supSub.base, "horizBrace");
                } else {
                  group = assertNodeType(grp, "horizBrace");
                }
                var body = buildHTML_buildGroup(group.base, options.havingBaseStyle(src_Style.DISPLAY));
                var braceBody = stretchy.svgSpan(group, options);
                var vlist;
                if (group.isOver) {
                  vlist = buildCommon.makeVList({
                    positionType: "firstBaseline",
                    children: [{
                      type: "elem",
                      elem: body
                    }, {
                      type: "kern",
                      size: 0.1
                    }, {
                      type: "elem",
                      elem: braceBody
                    }]
                  }, options);
                  vlist.children[0].children[0].children[1].classes.push("svg-align");
                } else {
                  vlist = buildCommon.makeVList({
                    positionType: "bottom",
                    positionData: body.depth + 0.1 + braceBody.height,
                    children: [{
                      type: "elem",
                      elem: braceBody
                    }, {
                      type: "kern",
                      size: 0.1
                    }, {
                      type: "elem",
                      elem: body
                    }]
                  }, options);
                  vlist.children[0].children[0].children[0].classes.push("svg-align");
                }
                if (supSubGroup) {
                  var vSpan = buildCommon.makeSpan(["mord", group.isOver ? "mover" : "munder"], [vlist], options);
                  if (group.isOver) {
                    vlist = buildCommon.makeVList({
                      positionType: "firstBaseline",
                      children: [{
                        type: "elem",
                        elem: vSpan
                      }, {
                        type: "kern",
                        size: 0.2
                      }, {
                        type: "elem",
                        elem: supSubGroup
                      }]
                    }, options);
                  } else {
                    vlist = buildCommon.makeVList({
                      positionType: "bottom",
                      positionData: vSpan.depth + 0.2 + supSubGroup.height + supSubGroup.depth,
                      children: [{
                        type: "elem",
                        elem: supSubGroup
                      }, {
                        type: "kern",
                        size: 0.2
                      }, {
                        type: "elem",
                        elem: vSpan
                      }]
                    }, options);
                  }
                }
                return buildCommon.makeSpan(["mord", group.isOver ? "mover" : "munder"], [vlist], options);
              };
              var horizBrace_mathmlBuilder = function mathmlBuilder(group, options) {
                var accentNode = stretchy.mathMLnode(group.label);
                return new mathMLTree.MathNode(group.isOver ? "mover" : "munder", [buildMathML_buildGroup(group.base, options), accentNode]);
              };
              defineFunction({
                type: "horizBrace",
                names: ["\\overbrace", "\\underbrace"],
                props: {
                  numArgs: 1
                },
                handler: function handler(_ref, args) {
                  var parser = _ref.parser, funcName = _ref.funcName;
                  return {
                    type: "horizBrace",
                    mode: parser.mode,
                    label: funcName,
                    isOver: /^\\over/.test(funcName),
                    base: args[0]
                  };
                },
                htmlBuilder: horizBrace_htmlBuilder,
                mathmlBuilder: horizBrace_mathmlBuilder
              });
              defineFunction({
                type: "href",
                names: ["\\href"],
                props: {
                  numArgs: 2,
                  argTypes: ["url", "original"],
                  allowedInText: true
                },
                handler: function handler(_ref, args) {
                  var parser = _ref.parser;
                  var body = args[1];
                  var href = assertNodeType(args[0], "url").url;
                  if (!parser.settings.isTrusted({
                    command: "\\href",
                    url: href
                  })) {
                    return parser.formatUnsupportedCmd("\\href");
                  }
                  return {
                    type: "href",
                    mode: parser.mode,
                    href,
                    body: defineFunction_ordargument(body)
                  };
                },
                htmlBuilder: function htmlBuilder(group, options) {
                  var elements = buildHTML_buildExpression(group.body, options, false);
                  return buildCommon.makeAnchor(group.href, [], elements, options);
                },
                mathmlBuilder: function mathmlBuilder(group, options) {
                  var math = buildExpressionRow(group.body, options);
                  if (!(math instanceof mathMLTree_MathNode)) {
                    math = new mathMLTree_MathNode("mrow", [math]);
                  }
                  math.setAttribute("href", group.href);
                  return math;
                }
              });
              defineFunction({
                type: "href",
                names: ["\\url"],
                props: {
                  numArgs: 1,
                  argTypes: ["url"],
                  allowedInText: true
                },
                handler: function handler(_ref2, args) {
                  var parser = _ref2.parser;
                  var href = assertNodeType(args[0], "url").url;
                  if (!parser.settings.isTrusted({
                    command: "\\url",
                    url: href
                  })) {
                    return parser.formatUnsupportedCmd("\\url");
                  }
                  var chars = [];
                  for (var i = 0; i < href.length; i++) {
                    var c = href[i];
                    if (c === "~") {
                      c = "\\textasciitilde";
                    }
                    chars.push({
                      type: "textord",
                      mode: "text",
                      text: c
                    });
                  }
                  var body = {
                    type: "text",
                    mode: parser.mode,
                    font: "\\texttt",
                    body: chars
                  };
                  return {
                    type: "href",
                    mode: parser.mode,
                    href,
                    body: defineFunction_ordargument(body)
                  };
                }
              });
              defineFunction({
                type: "htmlmathml",
                names: ["\\html@mathml"],
                props: {
                  numArgs: 2,
                  allowedInText: true
                },
                handler: function handler(_ref, args) {
                  var parser = _ref.parser;
                  return {
                    type: "htmlmathml",
                    mode: parser.mode,
                    html: defineFunction_ordargument(args[0]),
                    mathml: defineFunction_ordargument(args[1])
                  };
                },
                htmlBuilder: function htmlBuilder(group, options) {
                  var elements = buildHTML_buildExpression(group.html, options, false);
                  return buildCommon.makeFragment(elements);
                },
                mathmlBuilder: function mathmlBuilder(group, options) {
                  return buildExpressionRow(group.mathml, options);
                }
              });
              var includegraphics_sizeData = function sizeData(str) {
                if (/^[-+]? *(\d+(\.\d*)?|\.\d+)$/.test(str)) {
                  return {
                    number: +str,
                    unit: "bp"
                  };
                } else {
                  var match = /([-+]?) *(\d+(?:\.\d*)?|\.\d+) *([a-z]{2})/.exec(str);
                  if (!match) {
                    throw new src_ParseError("Invalid size: '" + str + "' in \\includegraphics");
                  }
                  var data = {
                    number: +(match[1] + match[2]),
                    // sign + magnitude, cast to number
                    unit: match[3]
                  };
                  if (!validUnit(data)) {
                    throw new src_ParseError("Invalid unit: '" + data.unit + "' in \\includegraphics.");
                  }
                  return data;
                }
              };
              defineFunction({
                type: "includegraphics",
                names: ["\\includegraphics"],
                props: {
                  numArgs: 1,
                  numOptionalArgs: 1,
                  argTypes: ["raw", "url"],
                  allowedInText: false
                },
                handler: function handler(_ref, args, optArgs) {
                  var parser = _ref.parser;
                  var width = {
                    number: 0,
                    unit: "em"
                  };
                  var height = {
                    number: 0.9,
                    unit: "em"
                  };
                  var totalheight = {
                    number: 0,
                    unit: "em"
                  };
                  var alt = "";
                  if (optArgs[0]) {
                    var attributeStr = assertNodeType(optArgs[0], "raw").string;
                    var attributes = attributeStr.split(",");
                    for (var i = 0; i < attributes.length; i++) {
                      var keyVal = attributes[i].split("=");
                      if (keyVal.length === 2) {
                        var str = keyVal[1].trim();
                        switch (keyVal[0].trim()) {
                          case "alt":
                            alt = str;
                            break;
                          case "width":
                            width = includegraphics_sizeData(str);
                            break;
                          case "height":
                            height = includegraphics_sizeData(str);
                            break;
                          case "totalheight":
                            totalheight = includegraphics_sizeData(str);
                            break;
                          default:
                            throw new src_ParseError("Invalid key: '" + keyVal[0] + "' in \\includegraphics.");
                        }
                      }
                    }
                  }
                  var src = assertNodeType(args[0], "url").url;
                  if (alt === "") {
                    alt = src;
                    alt = alt.replace(/^.*[\\/]/, "");
                    alt = alt.substring(0, alt.lastIndexOf("."));
                  }
                  if (!parser.settings.isTrusted({
                    command: "\\includegraphics",
                    url: src
                  })) {
                    return parser.formatUnsupportedCmd("\\includegraphics");
                  }
                  return {
                    type: "includegraphics",
                    mode: parser.mode,
                    alt,
                    width,
                    height,
                    totalheight,
                    src
                  };
                },
                htmlBuilder: function htmlBuilder(group, options) {
                  var height = units_calculateSize(group.height, options);
                  var depth = 0;
                  if (group.totalheight.number > 0) {
                    depth = units_calculateSize(group.totalheight, options) - height;
                    depth = Number(depth.toFixed(2));
                  }
                  var width = 0;
                  if (group.width.number > 0) {
                    width = units_calculateSize(group.width, options);
                  }
                  var style = {
                    height: height + depth + "em"
                  };
                  if (width > 0) {
                    style.width = width + "em";
                  }
                  if (depth > 0) {
                    style.verticalAlign = -depth + "em";
                  }
                  var node = new domTree_Img(group.src, group.alt, style);
                  node.height = height;
                  node.depth = depth;
                  return node;
                },
                mathmlBuilder: function mathmlBuilder(group, options) {
                  var node = new mathMLTree.MathNode("mglyph", []);
                  node.setAttribute("alt", group.alt);
                  var height = units_calculateSize(group.height, options);
                  var depth = 0;
                  if (group.totalheight.number > 0) {
                    depth = units_calculateSize(group.totalheight, options) - height;
                    depth = depth.toFixed(2);
                    node.setAttribute("valign", "-" + depth + "em");
                  }
                  node.setAttribute("height", height + depth + "em");
                  if (group.width.number > 0) {
                    var width = units_calculateSize(group.width, options);
                    node.setAttribute("width", width + "em");
                  }
                  node.setAttribute("src", group.src);
                  return node;
                }
              });
              defineFunction({
                type: "kern",
                names: ["\\kern", "\\mkern", "\\hskip", "\\mskip"],
                props: {
                  numArgs: 1,
                  argTypes: ["size"],
                  allowedInText: true
                },
                handler: function handler(_ref, args) {
                  var parser = _ref.parser, funcName = _ref.funcName;
                  var size = assertNodeType(args[0], "size");
                  if (parser.settings.strict) {
                    var mathFunction = funcName[1] === "m";
                    var muUnit = size.value.unit === "mu";
                    if (mathFunction) {
                      if (!muUnit) {
                        parser.settings.reportNonstrict("mathVsTextUnits", "LaTeX's " + funcName + " supports only mu units, " + ("not " + size.value.unit + " units"));
                      }
                      if (parser.mode !== "math") {
                        parser.settings.reportNonstrict("mathVsTextUnits", "LaTeX's " + funcName + " works only in math mode");
                      }
                    } else {
                      if (muUnit) {
                        parser.settings.reportNonstrict("mathVsTextUnits", "LaTeX's " + funcName + " doesn't support mu units");
                      }
                    }
                  }
                  return {
                    type: "kern",
                    mode: parser.mode,
                    dimension: size.value
                  };
                },
                htmlBuilder: function htmlBuilder(group, options) {
                  return buildCommon.makeGlue(group.dimension, options);
                },
                mathmlBuilder: function mathmlBuilder(group, options) {
                  var dimension = units_calculateSize(group.dimension, options);
                  return new mathMLTree.SpaceNode(dimension);
                }
              });
              defineFunction({
                type: "lap",
                names: ["\\mathllap", "\\mathrlap", "\\mathclap"],
                props: {
                  numArgs: 1,
                  allowedInText: true
                },
                handler: function handler(_ref, args) {
                  var parser = _ref.parser, funcName = _ref.funcName;
                  var body = args[0];
                  return {
                    type: "lap",
                    mode: parser.mode,
                    alignment: funcName.slice(5),
                    body
                  };
                },
                htmlBuilder: function htmlBuilder(group, options) {
                  var inner;
                  if (group.alignment === "clap") {
                    inner = buildCommon.makeSpan([], [buildHTML_buildGroup(group.body, options)]);
                    inner = buildCommon.makeSpan(["inner"], [inner], options);
                  } else {
                    inner = buildCommon.makeSpan(["inner"], [buildHTML_buildGroup(group.body, options)]);
                  }
                  var fix = buildCommon.makeSpan(["fix"], []);
                  var node = buildCommon.makeSpan([group.alignment], [inner, fix], options);
                  var strut = buildCommon.makeSpan(["strut"]);
                  strut.style.height = node.height + node.depth + "em";
                  strut.style.verticalAlign = -node.depth + "em";
                  node.children.unshift(strut);
                  node = buildCommon.makeVList({
                    positionType: "firstBaseline",
                    children: [{
                      type: "elem",
                      elem: node
                    }]
                  }, options);
                  return buildCommon.makeSpan(["mord"], [node], options);
                },
                mathmlBuilder: function mathmlBuilder(group, options) {
                  var node = new mathMLTree.MathNode("mpadded", [buildMathML_buildGroup(group.body, options)]);
                  if (group.alignment !== "rlap") {
                    var offset = group.alignment === "llap" ? "-1" : "-0.5";
                    node.setAttribute("lspace", offset + "width");
                  }
                  node.setAttribute("width", "0px");
                  return node;
                }
              });
              defineFunction({
                type: "styling",
                names: ["\\(", "$"],
                props: {
                  numArgs: 0,
                  allowedInText: true,
                  allowedInMath: false
                },
                handler: function handler(_ref, args) {
                  var funcName = _ref.funcName, parser = _ref.parser;
                  var outerMode = parser.mode;
                  parser.switchMode("math");
                  var close = funcName === "\\(" ? "\\)" : "$";
                  var body = parser.parseExpression(false, close);
                  parser.expect(close);
                  parser.switchMode(outerMode);
                  return {
                    type: "styling",
                    mode: parser.mode,
                    style: "text",
                    body
                  };
                }
              });
              defineFunction({
                type: "text",
                // Doesn't matter what this is.
                names: ["\\)", "\\]"],
                props: {
                  numArgs: 0,
                  allowedInText: true,
                  allowedInMath: false
                },
                handler: function handler(context, args) {
                  throw new src_ParseError("Mismatched " + context.funcName);
                }
              });
              var mathchoice_chooseMathStyle = function chooseMathStyle(group, options) {
                switch (options.style.size) {
                  case src_Style.DISPLAY.size:
                    return group.display;
                  case src_Style.TEXT.size:
                    return group.text;
                  case src_Style.SCRIPT.size:
                    return group.script;
                  case src_Style.SCRIPTSCRIPT.size:
                    return group.scriptscript;
                  default:
                    return group.text;
                }
              };
              defineFunction({
                type: "mathchoice",
                names: ["\\mathchoice"],
                props: {
                  numArgs: 4
                },
                handler: function handler(_ref, args) {
                  var parser = _ref.parser;
                  return {
                    type: "mathchoice",
                    mode: parser.mode,
                    display: defineFunction_ordargument(args[0]),
                    text: defineFunction_ordargument(args[1]),
                    script: defineFunction_ordargument(args[2]),
                    scriptscript: defineFunction_ordargument(args[3])
                  };
                },
                htmlBuilder: function htmlBuilder(group, options) {
                  var body = mathchoice_chooseMathStyle(group, options);
                  var elements = buildHTML_buildExpression(body, options, false);
                  return buildCommon.makeFragment(elements);
                },
                mathmlBuilder: function mathmlBuilder(group, options) {
                  var body = mathchoice_chooseMathStyle(group, options);
                  return buildExpressionRow(body, options);
                }
              });
              var assembleSupSub_assembleSupSub = function assembleSupSub(base, supGroup, subGroup, options, style, slant, baseShift) {
                base = buildCommon.makeSpan([], [base]);
                var sub;
                var sup;
                if (supGroup) {
                  var elem = buildHTML_buildGroup(supGroup, options.havingStyle(style.sup()), options);
                  sup = {
                    elem,
                    kern: Math.max(options.fontMetrics().bigOpSpacing1, options.fontMetrics().bigOpSpacing3 - elem.depth)
                  };
                }
                if (subGroup) {
                  var _elem = buildHTML_buildGroup(subGroup, options.havingStyle(style.sub()), options);
                  sub = {
                    elem: _elem,
                    kern: Math.max(options.fontMetrics().bigOpSpacing2, options.fontMetrics().bigOpSpacing4 - _elem.height)
                  };
                }
                var finalGroup;
                if (sup && sub) {
                  var bottom = options.fontMetrics().bigOpSpacing5 + sub.elem.height + sub.elem.depth + sub.kern + base.depth + baseShift;
                  finalGroup = buildCommon.makeVList({
                    positionType: "bottom",
                    positionData: bottom,
                    children: [{
                      type: "kern",
                      size: options.fontMetrics().bigOpSpacing5
                    }, {
                      type: "elem",
                      elem: sub.elem,
                      marginLeft: -slant + "em"
                    }, {
                      type: "kern",
                      size: sub.kern
                    }, {
                      type: "elem",
                      elem: base
                    }, {
                      type: "kern",
                      size: sup.kern
                    }, {
                      type: "elem",
                      elem: sup.elem,
                      marginLeft: slant + "em"
                    }, {
                      type: "kern",
                      size: options.fontMetrics().bigOpSpacing5
                    }]
                  }, options);
                } else if (sub) {
                  var top = base.height - baseShift;
                  finalGroup = buildCommon.makeVList({
                    positionType: "top",
                    positionData: top,
                    children: [{
                      type: "kern",
                      size: options.fontMetrics().bigOpSpacing5
                    }, {
                      type: "elem",
                      elem: sub.elem,
                      marginLeft: -slant + "em"
                    }, {
                      type: "kern",
                      size: sub.kern
                    }, {
                      type: "elem",
                      elem: base
                    }]
                  }, options);
                } else if (sup) {
                  var _bottom = base.depth + baseShift;
                  finalGroup = buildCommon.makeVList({
                    positionType: "bottom",
                    positionData: _bottom,
                    children: [{
                      type: "elem",
                      elem: base
                    }, {
                      type: "kern",
                      size: sup.kern
                    }, {
                      type: "elem",
                      elem: sup.elem,
                      marginLeft: slant + "em"
                    }, {
                      type: "kern",
                      size: options.fontMetrics().bigOpSpacing5
                    }]
                  }, options);
                } else {
                  return base;
                }
                return buildCommon.makeSpan(["mop", "op-limits"], [finalGroup], options);
              };
              var noSuccessor = ["\\smallint"];
              var op_htmlBuilder = function htmlBuilder(grp, options) {
                var supGroup;
                var subGroup;
                var hasLimits = false;
                var group;
                var supSub = checkNodeType(grp, "supsub");
                if (supSub) {
                  supGroup = supSub.sup;
                  subGroup = supSub.sub;
                  group = assertNodeType(supSub.base, "op");
                  hasLimits = true;
                } else {
                  group = assertNodeType(grp, "op");
                }
                var style = options.style;
                var large = false;
                if (style.size === src_Style.DISPLAY.size && group.symbol && !utils.contains(noSuccessor, group.name)) {
                  large = true;
                }
                var base;
                if (group.symbol) {
                  var fontName = large ? "Size2-Regular" : "Size1-Regular";
                  var stash = "";
                  if (group.name === "\\oiint" || group.name === "\\oiiint") {
                    stash = group.name.substr(1);
                    group.name = stash === "oiint" ? "\\iint" : "\\iiint";
                  }
                  base = buildCommon.makeSymbol(group.name, fontName, "math", options, ["mop", "op-symbol", large ? "large-op" : "small-op"]);
                  if (stash.length > 0) {
                    var italic = base.italic;
                    var oval = buildCommon.staticSvg(stash + "Size" + (large ? "2" : "1"), options);
                    base = buildCommon.makeVList({
                      positionType: "individualShift",
                      children: [{
                        type: "elem",
                        elem: base,
                        shift: 0
                      }, {
                        type: "elem",
                        elem: oval,
                        shift: large ? 0.08 : 0
                      }]
                    }, options);
                    group.name = "\\" + stash;
                    base.classes.unshift("mop");
                    base.italic = italic;
                  }
                } else if (group.body) {
                  var inner = buildHTML_buildExpression(group.body, options, true);
                  if (inner.length === 1 && inner[0] instanceof domTree_SymbolNode) {
                    base = inner[0];
                    base.classes[0] = "mop";
                  } else {
                    base = buildCommon.makeSpan(["mop"], buildCommon.tryCombineChars(inner), options);
                  }
                } else {
                  var output = [];
                  for (var i = 1; i < group.name.length; i++) {
                    output.push(buildCommon.mathsym(group.name[i], group.mode, options));
                  }
                  base = buildCommon.makeSpan(["mop"], output, options);
                }
                var baseShift = 0;
                var slant = 0;
                if ((base instanceof domTree_SymbolNode || group.name === "\\oiint" || group.name === "\\oiiint") && !group.suppressBaseShift) {
                  baseShift = (base.height - base.depth) / 2 - options.fontMetrics().axisHeight;
                  slant = base.italic;
                }
                if (hasLimits) {
                  return assembleSupSub_assembleSupSub(base, supGroup, subGroup, options, style, slant, baseShift);
                } else {
                  if (baseShift) {
                    base.style.position = "relative";
                    base.style.top = baseShift + "em";
                  }
                  return base;
                }
              };
              var op_mathmlBuilder = function mathmlBuilder(group, options) {
                var node;
                if (group.symbol) {
                  node = new mathMLTree_MathNode("mo", [buildMathML_makeText(group.name, group.mode)]);
                  if (utils.contains(noSuccessor, group.name)) {
                    node.setAttribute("largeop", "false");
                  }
                } else if (group.body) {
                  node = new mathMLTree_MathNode("mo", buildMathML_buildExpression(group.body, options));
                } else {
                  node = new mathMLTree_MathNode("mi", [new mathMLTree_TextNode(group.name.slice(1))]);
                  var operator = new mathMLTree_MathNode("mo", [buildMathML_makeText("\u2061", "text")]);
                  if (group.parentIsSupSub) {
                    node = new mathMLTree_MathNode("mo", [node, operator]);
                  } else {
                    node = newDocumentFragment([node, operator]);
                  }
                }
                return node;
              };
              var singleCharBigOps = {
                "\u220F": "\\prod",
                "\u2210": "\\coprod",
                "\u2211": "\\sum",
                "\u22C0": "\\bigwedge",
                "\u22C1": "\\bigvee",
                "\u22C2": "\\bigcap",
                "\u22C3": "\\bigcup",
                "\u2A00": "\\bigodot",
                "\u2A01": "\\bigoplus",
                "\u2A02": "\\bigotimes",
                "\u2A04": "\\biguplus",
                "\u2A06": "\\bigsqcup"
              };
              defineFunction({
                type: "op",
                names: ["\\coprod", "\\bigvee", "\\bigwedge", "\\biguplus", "\\bigcap", "\\bigcup", "\\intop", "\\prod", "\\sum", "\\bigotimes", "\\bigoplus", "\\bigodot", "\\bigsqcup", "\\smallint", "\u220F", "\u2210", "\u2211", "\u22C0", "\u22C1", "\u22C2", "\u22C3", "\u2A00", "\u2A01", "\u2A02", "\u2A04", "\u2A06"],
                props: {
                  numArgs: 0
                },
                handler: function handler(_ref, args) {
                  var parser = _ref.parser, funcName = _ref.funcName;
                  var fName = funcName;
                  if (fName.length === 1) {
                    fName = singleCharBigOps[fName];
                  }
                  return {
                    type: "op",
                    mode: parser.mode,
                    limits: true,
                    parentIsSupSub: false,
                    symbol: true,
                    name: fName
                  };
                },
                htmlBuilder: op_htmlBuilder,
                mathmlBuilder: op_mathmlBuilder
              });
              defineFunction({
                type: "op",
                names: ["\\mathop"],
                props: {
                  numArgs: 1
                },
                handler: function handler(_ref2, args) {
                  var parser = _ref2.parser;
                  var body = args[0];
                  return {
                    type: "op",
                    mode: parser.mode,
                    limits: false,
                    parentIsSupSub: false,
                    symbol: false,
                    body: defineFunction_ordargument(body)
                  };
                },
                htmlBuilder: op_htmlBuilder,
                mathmlBuilder: op_mathmlBuilder
              });
              var singleCharIntegrals = {
                "\u222B": "\\int",
                "\u222C": "\\iint",
                "\u222D": "\\iiint",
                "\u222E": "\\oint",
                "\u222F": "\\oiint",
                "\u2230": "\\oiiint"
              };
              defineFunction({
                type: "op",
                names: ["\\arcsin", "\\arccos", "\\arctan", "\\arctg", "\\arcctg", "\\arg", "\\ch", "\\cos", "\\cosec", "\\cosh", "\\cot", "\\cotg", "\\coth", "\\csc", "\\ctg", "\\cth", "\\deg", "\\dim", "\\exp", "\\hom", "\\ker", "\\lg", "\\ln", "\\log", "\\sec", "\\sin", "\\sinh", "\\sh", "\\tan", "\\tanh", "\\tg", "\\th"],
                props: {
                  numArgs: 0
                },
                handler: function handler(_ref3) {
                  var parser = _ref3.parser, funcName = _ref3.funcName;
                  return {
                    type: "op",
                    mode: parser.mode,
                    limits: false,
                    parentIsSupSub: false,
                    symbol: false,
                    name: funcName
                  };
                },
                htmlBuilder: op_htmlBuilder,
                mathmlBuilder: op_mathmlBuilder
              });
              defineFunction({
                type: "op",
                names: ["\\det", "\\gcd", "\\inf", "\\lim", "\\max", "\\min", "\\Pr", "\\sup"],
                props: {
                  numArgs: 0
                },
                handler: function handler(_ref4) {
                  var parser = _ref4.parser, funcName = _ref4.funcName;
                  return {
                    type: "op",
                    mode: parser.mode,
                    limits: true,
                    parentIsSupSub: false,
                    symbol: false,
                    name: funcName
                  };
                },
                htmlBuilder: op_htmlBuilder,
                mathmlBuilder: op_mathmlBuilder
              });
              defineFunction({
                type: "op",
                names: ["\\int", "\\iint", "\\iiint", "\\oint", "\\oiint", "\\oiiint", "\u222B", "\u222C", "\u222D", "\u222E", "\u222F", "\u2230"],
                props: {
                  numArgs: 0
                },
                handler: function handler(_ref5) {
                  var parser = _ref5.parser, funcName = _ref5.funcName;
                  var fName = funcName;
                  if (fName.length === 1) {
                    fName = singleCharIntegrals[fName];
                  }
                  return {
                    type: "op",
                    mode: parser.mode,
                    limits: false,
                    parentIsSupSub: false,
                    symbol: true,
                    name: fName
                  };
                },
                htmlBuilder: op_htmlBuilder,
                mathmlBuilder: op_mathmlBuilder
              });
              var operatorname_htmlBuilder = function htmlBuilder(grp, options) {
                var supGroup;
                var subGroup;
                var hasLimits = false;
                var group;
                var supSub = checkNodeType(grp, "supsub");
                if (supSub) {
                  supGroup = supSub.sup;
                  subGroup = supSub.sub;
                  group = assertNodeType(supSub.base, "operatorname");
                  hasLimits = true;
                } else {
                  group = assertNodeType(grp, "operatorname");
                }
                var base;
                if (group.body.length > 0) {
                  var body = group.body.map(function(child2) {
                    var childText = child2.text;
                    if (typeof childText === "string") {
                      return {
                        type: "textord",
                        mode: child2.mode,
                        text: childText
                      };
                    } else {
                      return child2;
                    }
                  });
                  var expression = buildHTML_buildExpression(body, options.withFont("mathrm"), true);
                  for (var i = 0; i < expression.length; i++) {
                    var child = expression[i];
                    if (child instanceof domTree_SymbolNode) {
                      child.text = child.text.replace(/\u2212/, "-").replace(/\u2217/, "*");
                    }
                  }
                  base = buildCommon.makeSpan(["mop"], expression, options);
                } else {
                  base = buildCommon.makeSpan(["mop"], [], options);
                }
                if (hasLimits) {
                  return assembleSupSub_assembleSupSub(base, supGroup, subGroup, options, options.style, 0, 0);
                } else {
                  return base;
                }
              };
              var operatorname_mathmlBuilder = function mathmlBuilder(group, options) {
                var expression = buildMathML_buildExpression(group.body, options.withFont("mathrm"));
                var isAllString = true;
                for (var i = 0; i < expression.length; i++) {
                  var node = expression[i];
                  if (node instanceof mathMLTree.SpaceNode) {
                  } else if (node instanceof mathMLTree.MathNode) {
                    switch (node.type) {
                      case "mi":
                      case "mn":
                      case "ms":
                      case "mspace":
                      case "mtext":
                        break;
                      // Do nothing yet.
                      case "mo": {
                        var child = node.children[0];
                        if (node.children.length === 1 && child instanceof mathMLTree.TextNode) {
                          child.text = child.text.replace(/\u2212/, "-").replace(/\u2217/, "*");
                        } else {
                          isAllString = false;
                        }
                        break;
                      }
                      default:
                        isAllString = false;
                    }
                  } else {
                    isAllString = false;
                  }
                }
                if (isAllString) {
                  var word = expression.map(function(node2) {
                    return node2.toText();
                  }).join("");
                  expression = [new mathMLTree.TextNode(word)];
                }
                var identifier = new mathMLTree.MathNode("mi", expression);
                identifier.setAttribute("mathvariant", "normal");
                var operator = new mathMLTree.MathNode("mo", [buildMathML_makeText("\u2061", "text")]);
                if (group.parentIsSupSub) {
                  return new mathMLTree.MathNode("mo", [identifier, operator]);
                } else {
                  return mathMLTree.newDocumentFragment([identifier, operator]);
                }
              };
              defineFunction({
                type: "operatorname",
                names: ["\\operatorname", "\\operatorname*"],
                props: {
                  numArgs: 1
                },
                handler: function handler(_ref, args) {
                  var parser = _ref.parser, funcName = _ref.funcName;
                  var body = args[0];
                  return {
                    type: "operatorname",
                    mode: parser.mode,
                    body: defineFunction_ordargument(body),
                    alwaysHandleSupSub: funcName === "\\operatorname*",
                    limits: false,
                    parentIsSupSub: false
                  };
                },
                htmlBuilder: operatorname_htmlBuilder,
                mathmlBuilder: operatorname_mathmlBuilder
              });
              defineFunctionBuilders({
                type: "ordgroup",
                htmlBuilder: function htmlBuilder(group, options) {
                  if (group.semisimple) {
                    return buildCommon.makeFragment(buildHTML_buildExpression(group.body, options, false));
                  }
                  return buildCommon.makeSpan(["mord"], buildHTML_buildExpression(group.body, options, true), options);
                },
                mathmlBuilder: function mathmlBuilder(group, options) {
                  return buildExpressionRow(group.body, options, true);
                }
              });
              defineFunction({
                type: "overline",
                names: ["\\overline"],
                props: {
                  numArgs: 1
                },
                handler: function handler(_ref, args) {
                  var parser = _ref.parser;
                  var body = args[0];
                  return {
                    type: "overline",
                    mode: parser.mode,
                    body
                  };
                },
                htmlBuilder: function htmlBuilder(group, options) {
                  var innerGroup = buildHTML_buildGroup(group.body, options.havingCrampedStyle());
                  var line = buildCommon.makeLineSpan("overline-line", options);
                  var defaultRuleThickness = options.fontMetrics().defaultRuleThickness;
                  var vlist = buildCommon.makeVList({
                    positionType: "firstBaseline",
                    children: [{
                      type: "elem",
                      elem: innerGroup
                    }, {
                      type: "kern",
                      size: 3 * defaultRuleThickness
                    }, {
                      type: "elem",
                      elem: line
                    }, {
                      type: "kern",
                      size: defaultRuleThickness
                    }]
                  }, options);
                  return buildCommon.makeSpan(["mord", "overline"], [vlist], options);
                },
                mathmlBuilder: function mathmlBuilder(group, options) {
                  var operator = new mathMLTree.MathNode("mo", [new mathMLTree.TextNode("\u203E")]);
                  operator.setAttribute("stretchy", "true");
                  var node = new mathMLTree.MathNode("mover", [buildMathML_buildGroup(group.body, options), operator]);
                  node.setAttribute("accent", "true");
                  return node;
                }
              });
              defineFunction({
                type: "phantom",
                names: ["\\phantom"],
                props: {
                  numArgs: 1,
                  allowedInText: true
                },
                handler: function handler(_ref, args) {
                  var parser = _ref.parser;
                  var body = args[0];
                  return {
                    type: "phantom",
                    mode: parser.mode,
                    body: defineFunction_ordargument(body)
                  };
                },
                htmlBuilder: function htmlBuilder(group, options) {
                  var elements = buildHTML_buildExpression(group.body, options.withPhantom(), false);
                  return buildCommon.makeFragment(elements);
                },
                mathmlBuilder: function mathmlBuilder(group, options) {
                  var inner = buildMathML_buildExpression(group.body, options);
                  return new mathMLTree.MathNode("mphantom", inner);
                }
              });
              defineFunction({
                type: "hphantom",
                names: ["\\hphantom"],
                props: {
                  numArgs: 1,
                  allowedInText: true
                },
                handler: function handler(_ref2, args) {
                  var parser = _ref2.parser;
                  var body = args[0];
                  return {
                    type: "hphantom",
                    mode: parser.mode,
                    body
                  };
                },
                htmlBuilder: function htmlBuilder(group, options) {
                  var node = buildCommon.makeSpan([], [buildHTML_buildGroup(group.body, options.withPhantom())]);
                  node.height = 0;
                  node.depth = 0;
                  if (node.children) {
                    for (var i = 0; i < node.children.length; i++) {
                      node.children[i].height = 0;
                      node.children[i].depth = 0;
                    }
                  }
                  node = buildCommon.makeVList({
                    positionType: "firstBaseline",
                    children: [{
                      type: "elem",
                      elem: node
                    }]
                  }, options);
                  return buildCommon.makeSpan(["mord"], [node], options);
                },
                mathmlBuilder: function mathmlBuilder(group, options) {
                  var inner = buildMathML_buildExpression(defineFunction_ordargument(group.body), options);
                  var phantom = new mathMLTree.MathNode("mphantom", inner);
                  var node = new mathMLTree.MathNode("mpadded", [phantom]);
                  node.setAttribute("height", "0px");
                  node.setAttribute("depth", "0px");
                  return node;
                }
              });
              defineFunction({
                type: "vphantom",
                names: ["\\vphantom"],
                props: {
                  numArgs: 1,
                  allowedInText: true
                },
                handler: function handler(_ref3, args) {
                  var parser = _ref3.parser;
                  var body = args[0];
                  return {
                    type: "vphantom",
                    mode: parser.mode,
                    body
                  };
                },
                htmlBuilder: function htmlBuilder(group, options) {
                  var inner = buildCommon.makeSpan(["inner"], [buildHTML_buildGroup(group.body, options.withPhantom())]);
                  var fix = buildCommon.makeSpan(["fix"], []);
                  return buildCommon.makeSpan(["mord", "rlap"], [inner, fix], options);
                },
                mathmlBuilder: function mathmlBuilder(group, options) {
                  var inner = buildMathML_buildExpression(defineFunction_ordargument(group.body), options);
                  var phantom = new mathMLTree.MathNode("mphantom", inner);
                  var node = new mathMLTree.MathNode("mpadded", [phantom]);
                  node.setAttribute("width", "0px");
                  return node;
                }
              });
              defineFunction({
                type: "raisebox",
                names: ["\\raisebox"],
                props: {
                  numArgs: 2,
                  argTypes: ["size", "hbox"],
                  allowedInText: true
                },
                handler: function handler(_ref, args) {
                  var parser = _ref.parser;
                  var amount = assertNodeType(args[0], "size").value;
                  var body = args[1];
                  return {
                    type: "raisebox",
                    mode: parser.mode,
                    dy: amount,
                    body
                  };
                },
                htmlBuilder: function htmlBuilder(group, options) {
                  var body = buildHTML_buildGroup(group.body, options);
                  var dy = units_calculateSize(group.dy, options);
                  return buildCommon.makeVList({
                    positionType: "shift",
                    positionData: -dy,
                    children: [{
                      type: "elem",
                      elem: body
                    }]
                  }, options);
                },
                mathmlBuilder: function mathmlBuilder(group, options) {
                  var node = new mathMLTree.MathNode("mpadded", [buildMathML_buildGroup(group.body, options)]);
                  var dy = group.dy.number + group.dy.unit;
                  node.setAttribute("voffset", dy);
                  return node;
                }
              });
              defineFunction({
                type: "rule",
                names: ["\\rule"],
                props: {
                  numArgs: 2,
                  numOptionalArgs: 1,
                  argTypes: ["size", "size", "size"]
                },
                handler: function handler(_ref, args, optArgs) {
                  var parser = _ref.parser;
                  var shift = optArgs[0];
                  var width = assertNodeType(args[0], "size");
                  var height = assertNodeType(args[1], "size");
                  return {
                    type: "rule",
                    mode: parser.mode,
                    shift: shift && assertNodeType(shift, "size").value,
                    width: width.value,
                    height: height.value
                  };
                },
                htmlBuilder: function htmlBuilder(group, options) {
                  var rule = buildCommon.makeSpan(["mord", "rule"], [], options);
                  var width = units_calculateSize(group.width, options);
                  var height = units_calculateSize(group.height, options);
                  var shift = group.shift ? units_calculateSize(group.shift, options) : 0;
                  rule.style.borderRightWidth = width + "em";
                  rule.style.borderTopWidth = height + "em";
                  rule.style.bottom = shift + "em";
                  rule.width = width;
                  rule.height = height + shift;
                  rule.depth = -shift;
                  rule.maxFontSize = height * 1.125 * options.sizeMultiplier;
                  return rule;
                },
                mathmlBuilder: function mathmlBuilder(group, options) {
                  var width = units_calculateSize(group.width, options);
                  var height = units_calculateSize(group.height, options);
                  var shift = group.shift ? units_calculateSize(group.shift, options) : 0;
                  var color = options.color && options.getColor() || "black";
                  var rule = new mathMLTree.MathNode("mspace");
                  rule.setAttribute("mathbackground", color);
                  rule.setAttribute("width", width + "em");
                  rule.setAttribute("height", height + "em");
                  var wrapper = new mathMLTree.MathNode("mpadded", [rule]);
                  if (shift >= 0) {
                    wrapper.setAttribute("height", "+" + shift + "em");
                  } else {
                    wrapper.setAttribute("height", shift + "em");
                    wrapper.setAttribute("depth", "+" + -shift + "em");
                  }
                  wrapper.setAttribute("voffset", shift + "em");
                  return wrapper;
                }
              });
              function sizingGroup(value, options, baseOptions) {
                var inner = buildHTML_buildExpression(value, options, false);
                var multiplier = options.sizeMultiplier / baseOptions.sizeMultiplier;
                for (var i = 0; i < inner.length; i++) {
                  var pos = inner[i].classes.indexOf("sizing");
                  if (pos < 0) {
                    Array.prototype.push.apply(inner[i].classes, options.sizingClasses(baseOptions));
                  } else if (inner[i].classes[pos + 1] === "reset-size" + options.size) {
                    inner[i].classes[pos + 1] = "reset-size" + baseOptions.size;
                  }
                  inner[i].height *= multiplier;
                  inner[i].depth *= multiplier;
                }
                return buildCommon.makeFragment(inner);
              }
              var sizeFuncs = ["\\tiny", "\\sixptsize", "\\scriptsize", "\\footnotesize", "\\small", "\\normalsize", "\\large", "\\Large", "\\LARGE", "\\huge", "\\Huge"];
              var sizing_htmlBuilder = function htmlBuilder(group, options) {
                var newOptions = options.havingSize(group.size);
                return sizingGroup(group.body, newOptions, options);
              };
              defineFunction({
                type: "sizing",
                names: sizeFuncs,
                props: {
                  numArgs: 0,
                  allowedInText: true
                },
                handler: function handler(_ref, args) {
                  var breakOnTokenText = _ref.breakOnTokenText, funcName = _ref.funcName, parser = _ref.parser;
                  var body = parser.parseExpression(false, breakOnTokenText);
                  return {
                    type: "sizing",
                    mode: parser.mode,
                    // Figure out what size to use based on the list of functions above
                    size: sizeFuncs.indexOf(funcName) + 1,
                    body
                  };
                },
                htmlBuilder: sizing_htmlBuilder,
                mathmlBuilder: function mathmlBuilder(group, options) {
                  var newOptions = options.havingSize(group.size);
                  var inner = buildMathML_buildExpression(group.body, newOptions);
                  var node = new mathMLTree.MathNode("mstyle", inner);
                  node.setAttribute("mathsize", newOptions.sizeMultiplier + "em");
                  return node;
                }
              });
              defineFunction({
                type: "smash",
                names: ["\\smash"],
                props: {
                  numArgs: 1,
                  numOptionalArgs: 1,
                  allowedInText: true
                },
                handler: function handler(_ref, args, optArgs) {
                  var parser = _ref.parser;
                  var smashHeight = false;
                  var smashDepth = false;
                  var tbArg = optArgs[0] && assertNodeType(optArgs[0], "ordgroup");
                  if (tbArg) {
                    var letter = "";
                    for (var i = 0; i < tbArg.body.length; ++i) {
                      var node = tbArg.body[i];
                      letter = node.text;
                      if (letter === "t") {
                        smashHeight = true;
                      } else if (letter === "b") {
                        smashDepth = true;
                      } else {
                        smashHeight = false;
                        smashDepth = false;
                        break;
                      }
                    }
                  } else {
                    smashHeight = true;
                    smashDepth = true;
                  }
                  var body = args[0];
                  return {
                    type: "smash",
                    mode: parser.mode,
                    body,
                    smashHeight,
                    smashDepth
                  };
                },
                htmlBuilder: function htmlBuilder(group, options) {
                  var node = buildCommon.makeSpan([], [buildHTML_buildGroup(group.body, options)]);
                  if (!group.smashHeight && !group.smashDepth) {
                    return node;
                  }
                  if (group.smashHeight) {
                    node.height = 0;
                    if (node.children) {
                      for (var i = 0; i < node.children.length; i++) {
                        node.children[i].height = 0;
                      }
                    }
                  }
                  if (group.smashDepth) {
                    node.depth = 0;
                    if (node.children) {
                      for (var _i = 0; _i < node.children.length; _i++) {
                        node.children[_i].depth = 0;
                      }
                    }
                  }
                  var smashedNode = buildCommon.makeVList({
                    positionType: "firstBaseline",
                    children: [{
                      type: "elem",
                      elem: node
                    }]
                  }, options);
                  return buildCommon.makeSpan(["mord"], [smashedNode], options);
                },
                mathmlBuilder: function mathmlBuilder(group, options) {
                  var node = new mathMLTree.MathNode("mpadded", [buildMathML_buildGroup(group.body, options)]);
                  if (group.smashHeight) {
                    node.setAttribute("height", "0px");
                  }
                  if (group.smashDepth) {
                    node.setAttribute("depth", "0px");
                  }
                  return node;
                }
              });
              defineFunction({
                type: "sqrt",
                names: ["\\sqrt"],
                props: {
                  numArgs: 1,
                  numOptionalArgs: 1
                },
                handler: function handler(_ref, args, optArgs) {
                  var parser = _ref.parser;
                  var index = optArgs[0];
                  var body = args[0];
                  return {
                    type: "sqrt",
                    mode: parser.mode,
                    body,
                    index
                  };
                },
                htmlBuilder: function htmlBuilder(group, options) {
                  var inner = buildHTML_buildGroup(group.body, options.havingCrampedStyle());
                  if (inner.height === 0) {
                    inner.height = options.fontMetrics().xHeight;
                  }
                  inner = buildCommon.wrapFragment(inner, options);
                  var metrics = options.fontMetrics();
                  var theta = metrics.defaultRuleThickness;
                  var phi = theta;
                  if (options.style.id < src_Style.TEXT.id) {
                    phi = options.fontMetrics().xHeight;
                  }
                  var lineClearance = theta + phi / 4;
                  var minDelimiterHeight = inner.height + inner.depth + lineClearance + theta;
                  var _delimiter$sqrtImage = delimiter.sqrtImage(minDelimiterHeight, options), img = _delimiter$sqrtImage.span, ruleWidth = _delimiter$sqrtImage.ruleWidth, advanceWidth = _delimiter$sqrtImage.advanceWidth;
                  var delimDepth = img.height - ruleWidth;
                  if (delimDepth > inner.height + inner.depth + lineClearance) {
                    lineClearance = (lineClearance + delimDepth - inner.height - inner.depth) / 2;
                  }
                  var imgShift = img.height - inner.height - lineClearance - ruleWidth;
                  inner.style.paddingLeft = advanceWidth + "em";
                  var body = buildCommon.makeVList({
                    positionType: "firstBaseline",
                    children: [{
                      type: "elem",
                      elem: inner,
                      wrapperClasses: ["svg-align"]
                    }, {
                      type: "kern",
                      size: -(inner.height + imgShift)
                    }, {
                      type: "elem",
                      elem: img
                    }, {
                      type: "kern",
                      size: ruleWidth
                    }]
                  }, options);
                  if (!group.index) {
                    return buildCommon.makeSpan(["mord", "sqrt"], [body], options);
                  } else {
                    var newOptions = options.havingStyle(src_Style.SCRIPTSCRIPT);
                    var rootm = buildHTML_buildGroup(group.index, newOptions, options);
                    var toShift = 0.6 * (body.height - body.depth);
                    var rootVList = buildCommon.makeVList({
                      positionType: "shift",
                      positionData: -toShift,
                      children: [{
                        type: "elem",
                        elem: rootm
                      }]
                    }, options);
                    var rootVListWrap = buildCommon.makeSpan(["root"], [rootVList]);
                    return buildCommon.makeSpan(["mord", "sqrt"], [rootVListWrap, body], options);
                  }
                },
                mathmlBuilder: function mathmlBuilder(group, options) {
                  var body = group.body, index = group.index;
                  return index ? new mathMLTree.MathNode("mroot", [buildMathML_buildGroup(body, options), buildMathML_buildGroup(index, options)]) : new mathMLTree.MathNode("msqrt", [buildMathML_buildGroup(body, options)]);
                }
              });
              var styling_styleMap = {
                "display": src_Style.DISPLAY,
                "text": src_Style.TEXT,
                "script": src_Style.SCRIPT,
                "scriptscript": src_Style.SCRIPTSCRIPT
              };
              defineFunction({
                type: "styling",
                names: ["\\displaystyle", "\\textstyle", "\\scriptstyle", "\\scriptscriptstyle"],
                props: {
                  numArgs: 0,
                  allowedInText: true
                },
                handler: function handler(_ref, args) {
                  var breakOnTokenText = _ref.breakOnTokenText, funcName = _ref.funcName, parser = _ref.parser;
                  var body = parser.parseExpression(true, breakOnTokenText);
                  var style = funcName.slice(1, funcName.length - 5);
                  return {
                    type: "styling",
                    mode: parser.mode,
                    // Figure out what style to use by pulling out the style from
                    // the function name
                    style,
                    body
                  };
                },
                htmlBuilder: function htmlBuilder(group, options) {
                  var newStyle = styling_styleMap[group.style];
                  var newOptions = options.havingStyle(newStyle).withFont("");
                  return sizingGroup(group.body, newOptions, options);
                },
                mathmlBuilder: function mathmlBuilder(group, options) {
                  var newStyle = styling_styleMap[group.style];
                  var newOptions = options.havingStyle(newStyle);
                  var inner = buildMathML_buildExpression(group.body, newOptions);
                  var node = new mathMLTree.MathNode("mstyle", inner);
                  var styleAttributes = {
                    "display": ["0", "true"],
                    "text": ["0", "false"],
                    "script": ["1", "false"],
                    "scriptscript": ["2", "false"]
                  };
                  var attr = styleAttributes[group.style];
                  node.setAttribute("scriptlevel", attr[0]);
                  node.setAttribute("displaystyle", attr[1]);
                  return node;
                }
              });
              var supsub_htmlBuilderDelegate = function htmlBuilderDelegate(group, options) {
                var base = group.base;
                if (!base) {
                  return null;
                } else if (base.type === "op") {
                  var delegate = base.limits && (options.style.size === src_Style.DISPLAY.size || base.alwaysHandleSupSub);
                  return delegate ? op_htmlBuilder : null;
                } else if (base.type === "operatorname") {
                  var _delegate = base.alwaysHandleSupSub && (options.style.size === src_Style.DISPLAY.size || base.limits);
                  return _delegate ? operatorname_htmlBuilder : null;
                } else if (base.type === "accent") {
                  return utils.isCharacterBox(base.base) ? accent_htmlBuilder : null;
                } else if (base.type === "horizBrace") {
                  var isSup = !group.sub;
                  return isSup === base.isOver ? horizBrace_htmlBuilder : null;
                } else {
                  return null;
                }
              };
              defineFunctionBuilders({
                type: "supsub",
                htmlBuilder: function htmlBuilder(group, options) {
                  var builderDelegate = supsub_htmlBuilderDelegate(group, options);
                  if (builderDelegate) {
                    return builderDelegate(group, options);
                  }
                  var valueBase = group.base, valueSup = group.sup, valueSub = group.sub;
                  var base = buildHTML_buildGroup(valueBase, options);
                  var supm;
                  var subm;
                  var metrics = options.fontMetrics();
                  var supShift = 0;
                  var subShift = 0;
                  var isCharacterBox = valueBase && utils.isCharacterBox(valueBase);
                  if (valueSup) {
                    var newOptions = options.havingStyle(options.style.sup());
                    supm = buildHTML_buildGroup(valueSup, newOptions, options);
                    if (!isCharacterBox) {
                      supShift = base.height - newOptions.fontMetrics().supDrop * newOptions.sizeMultiplier / options.sizeMultiplier;
                    }
                  }
                  if (valueSub) {
                    var _newOptions = options.havingStyle(options.style.sub());
                    subm = buildHTML_buildGroup(valueSub, _newOptions, options);
                    if (!isCharacterBox) {
                      subShift = base.depth + _newOptions.fontMetrics().subDrop * _newOptions.sizeMultiplier / options.sizeMultiplier;
                    }
                  }
                  var minSupShift;
                  if (options.style === src_Style.DISPLAY) {
                    minSupShift = metrics.sup1;
                  } else if (options.style.cramped) {
                    minSupShift = metrics.sup3;
                  } else {
                    minSupShift = metrics.sup2;
                  }
                  var multiplier = options.sizeMultiplier;
                  var marginRight = 0.5 / metrics.ptPerEm / multiplier + "em";
                  var marginLeft = null;
                  if (subm) {
                    var isOiint = group.base && group.base.type === "op" && group.base.name && (group.base.name === "\\oiint" || group.base.name === "\\oiiint");
                    if (base instanceof domTree_SymbolNode || isOiint) {
                      marginLeft = -base.italic + "em";
                    }
                  }
                  var supsub;
                  if (supm && subm) {
                    supShift = Math.max(supShift, minSupShift, supm.depth + 0.25 * metrics.xHeight);
                    subShift = Math.max(subShift, metrics.sub2);
                    var ruleWidth = metrics.defaultRuleThickness;
                    var maxWidth = 4 * ruleWidth;
                    if (supShift - supm.depth - (subm.height - subShift) < maxWidth) {
                      subShift = maxWidth - (supShift - supm.depth) + subm.height;
                      var psi = 0.8 * metrics.xHeight - (supShift - supm.depth);
                      if (psi > 0) {
                        supShift += psi;
                        subShift -= psi;
                      }
                    }
                    var vlistElem = [{
                      type: "elem",
                      elem: subm,
                      shift: subShift,
                      marginRight,
                      marginLeft
                    }, {
                      type: "elem",
                      elem: supm,
                      shift: -supShift,
                      marginRight
                    }];
                    supsub = buildCommon.makeVList({
                      positionType: "individualShift",
                      children: vlistElem
                    }, options);
                  } else if (subm) {
                    subShift = Math.max(subShift, metrics.sub1, subm.height - 0.8 * metrics.xHeight);
                    var _vlistElem = [{
                      type: "elem",
                      elem: subm,
                      marginLeft,
                      marginRight
                    }];
                    supsub = buildCommon.makeVList({
                      positionType: "shift",
                      positionData: subShift,
                      children: _vlistElem
                    }, options);
                  } else if (supm) {
                    supShift = Math.max(supShift, minSupShift, supm.depth + 0.25 * metrics.xHeight);
                    supsub = buildCommon.makeVList({
                      positionType: "shift",
                      positionData: -supShift,
                      children: [{
                        type: "elem",
                        elem: supm,
                        marginRight
                      }]
                    }, options);
                  } else {
                    throw new Error("supsub must have either sup or sub.");
                  }
                  var mclass = getTypeOfDomTree(base, "right") || "mord";
                  return buildCommon.makeSpan([mclass], [base, buildCommon.makeSpan(["msupsub"], [supsub])], options);
                },
                mathmlBuilder: function mathmlBuilder(group, options) {
                  var isBrace = false;
                  var isOver;
                  var isSup;
                  var horizBrace = checkNodeType(group.base, "horizBrace");
                  if (horizBrace) {
                    isSup = !!group.sup;
                    if (isSup === horizBrace.isOver) {
                      isBrace = true;
                      isOver = horizBrace.isOver;
                    }
                  }
                  if (group.base && (group.base.type === "op" || group.base.type === "operatorname")) {
                    group.base.parentIsSupSub = true;
                  }
                  var children = [buildMathML_buildGroup(group.base, options)];
                  if (group.sub) {
                    children.push(buildMathML_buildGroup(group.sub, options));
                  }
                  if (group.sup) {
                    children.push(buildMathML_buildGroup(group.sup, options));
                  }
                  var nodeType;
                  if (isBrace) {
                    nodeType = isOver ? "mover" : "munder";
                  } else if (!group.sub) {
                    var base = group.base;
                    if (base && base.type === "op" && base.limits && (options.style === src_Style.DISPLAY || base.alwaysHandleSupSub)) {
                      nodeType = "mover";
                    } else if (base && base.type === "operatorname" && base.alwaysHandleSupSub && (base.limits || options.style === src_Style.DISPLAY)) {
                      nodeType = "mover";
                    } else {
                      nodeType = "msup";
                    }
                  } else if (!group.sup) {
                    var _base = group.base;
                    if (_base && _base.type === "op" && _base.limits && (options.style === src_Style.DISPLAY || _base.alwaysHandleSupSub)) {
                      nodeType = "munder";
                    } else if (_base && _base.type === "operatorname" && _base.alwaysHandleSupSub && (_base.limits || options.style === src_Style.DISPLAY)) {
                      nodeType = "munder";
                    } else {
                      nodeType = "msub";
                    }
                  } else {
                    var _base2 = group.base;
                    if (_base2 && _base2.type === "op" && _base2.limits && options.style === src_Style.DISPLAY) {
                      nodeType = "munderover";
                    } else if (_base2 && _base2.type === "operatorname" && _base2.alwaysHandleSupSub && (options.style === src_Style.DISPLAY || _base2.limits)) {
                      nodeType = "munderover";
                    } else {
                      nodeType = "msubsup";
                    }
                  }
                  var node = new mathMLTree.MathNode(nodeType, children);
                  return node;
                }
              });
              defineFunctionBuilders({
                type: "atom",
                htmlBuilder: function htmlBuilder(group, options) {
                  return buildCommon.mathsym(group.text, group.mode, options, ["m" + group.family]);
                },
                mathmlBuilder: function mathmlBuilder(group, options) {
                  var node = new mathMLTree.MathNode("mo", [buildMathML_makeText(group.text, group.mode)]);
                  if (group.family === "bin") {
                    var variant = buildMathML_getVariant(group, options);
                    if (variant === "bold-italic") {
                      node.setAttribute("mathvariant", variant);
                    }
                  } else if (group.family === "punct") {
                    node.setAttribute("separator", "true");
                  } else if (group.family === "open" || group.family === "close") {
                    node.setAttribute("stretchy", "false");
                  }
                  return node;
                }
              });
              var defaultVariant = {
                "mi": "italic",
                "mn": "normal",
                "mtext": "normal"
              };
              defineFunctionBuilders({
                type: "mathord",
                htmlBuilder: function htmlBuilder(group, options) {
                  return buildCommon.makeOrd(group, options, "mathord");
                },
                mathmlBuilder: function mathmlBuilder(group, options) {
                  var node = new mathMLTree.MathNode("mi", [buildMathML_makeText(group.text, group.mode, options)]);
                  var variant = buildMathML_getVariant(group, options) || "italic";
                  if (variant !== defaultVariant[node.type]) {
                    node.setAttribute("mathvariant", variant);
                  }
                  return node;
                }
              });
              defineFunctionBuilders({
                type: "textord",
                htmlBuilder: function htmlBuilder(group, options) {
                  return buildCommon.makeOrd(group, options, "textord");
                },
                mathmlBuilder: function mathmlBuilder(group, options) {
                  var text = buildMathML_makeText(group.text, group.mode, options);
                  var variant = buildMathML_getVariant(group, options) || "normal";
                  var node;
                  if (group.mode === "text") {
                    node = new mathMLTree.MathNode("mtext", [text]);
                  } else if (/[0-9]/.test(group.text)) {
                    node = new mathMLTree.MathNode("mn", [text]);
                  } else if (group.text === "\\prime") {
                    node = new mathMLTree.MathNode("mo", [text]);
                  } else {
                    node = new mathMLTree.MathNode("mi", [text]);
                  }
                  if (variant !== defaultVariant[node.type]) {
                    node.setAttribute("mathvariant", variant);
                  }
                  return node;
                }
              });
              var cssSpace = {
                "\\nobreak": "nobreak",
                "\\allowbreak": "allowbreak"
              };
              var regularSpace = {
                " ": {},
                "\\ ": {},
                "~": {
                  className: "nobreak"
                },
                "\\space": {},
                "\\nobreakspace": {
                  className: "nobreak"
                }
              };
              defineFunctionBuilders({
                type: "spacing",
                htmlBuilder: function htmlBuilder(group, options) {
                  if (regularSpace.hasOwnProperty(group.text)) {
                    var className = regularSpace[group.text].className || "";
                    if (group.mode === "text") {
                      var ord = buildCommon.makeOrd(group, options, "textord");
                      ord.classes.push(className);
                      return ord;
                    } else {
                      return buildCommon.makeSpan(["mspace", className], [buildCommon.mathsym(group.text, group.mode, options)], options);
                    }
                  } else if (cssSpace.hasOwnProperty(group.text)) {
                    return buildCommon.makeSpan(["mspace", cssSpace[group.text]], [], options);
                  } else {
                    throw new src_ParseError('Unknown type of space "' + group.text + '"');
                  }
                },
                mathmlBuilder: function mathmlBuilder(group, options) {
                  var node;
                  if (regularSpace.hasOwnProperty(group.text)) {
                    node = new mathMLTree.MathNode("mtext", [new mathMLTree.TextNode("\xA0")]);
                  } else if (cssSpace.hasOwnProperty(group.text)) {
                    return new mathMLTree.MathNode("mspace");
                  } else {
                    throw new src_ParseError('Unknown type of space "' + group.text + '"');
                  }
                  return node;
                }
              });
              var tag_pad = function pad() {
                var padNode = new mathMLTree.MathNode("mtd", []);
                padNode.setAttribute("width", "50%");
                return padNode;
              };
              defineFunctionBuilders({
                type: "tag",
                mathmlBuilder: function mathmlBuilder(group, options) {
                  var table = new mathMLTree.MathNode("mtable", [new mathMLTree.MathNode("mtr", [tag_pad(), new mathMLTree.MathNode("mtd", [buildExpressionRow(group.body, options)]), tag_pad(), new mathMLTree.MathNode("mtd", [buildExpressionRow(group.tag, options)])])]);
                  table.setAttribute("width", "100%");
                  return table;
                }
              });
              var textFontFamilies = {
                "\\text": void 0,
                "\\textrm": "textrm",
                "\\textsf": "textsf",
                "\\texttt": "texttt",
                "\\textnormal": "textrm"
              };
              var textFontWeights = {
                "\\textbf": "textbf",
                "\\textmd": "textmd"
              };
              var textFontShapes = {
                "\\textit": "textit",
                "\\textup": "textup"
              };
              var optionsWithFont = function optionsWithFont2(group, options) {
                var font = group.font;
                if (!font) {
                  return options;
                } else if (textFontFamilies[font]) {
                  return options.withTextFontFamily(textFontFamilies[font]);
                } else if (textFontWeights[font]) {
                  return options.withTextFontWeight(textFontWeights[font]);
                } else {
                  return options.withTextFontShape(textFontShapes[font]);
                }
              };
              defineFunction({
                type: "text",
                names: [
                  // Font families
                  "\\text",
                  "\\textrm",
                  "\\textsf",
                  "\\texttt",
                  "\\textnormal",
                  // Font weights
                  "\\textbf",
                  "\\textmd",
                  // Font Shapes
                  "\\textit",
                  "\\textup"
                ],
                props: {
                  numArgs: 1,
                  argTypes: ["text"],
                  greediness: 2,
                  allowedInText: true
                },
                handler: function handler(_ref, args) {
                  var parser = _ref.parser, funcName = _ref.funcName;
                  var body = args[0];
                  return {
                    type: "text",
                    mode: parser.mode,
                    body: defineFunction_ordargument(body),
                    font: funcName
                  };
                },
                htmlBuilder: function htmlBuilder(group, options) {
                  var newOptions = optionsWithFont(group, options);
                  var inner = buildHTML_buildExpression(group.body, newOptions, true);
                  return buildCommon.makeSpan(["mord", "text"], buildCommon.tryCombineChars(inner), newOptions);
                },
                mathmlBuilder: function mathmlBuilder(group, options) {
                  var newOptions = optionsWithFont(group, options);
                  return buildExpressionRow(group.body, newOptions);
                }
              });
              defineFunction({
                type: "underline",
                names: ["\\underline"],
                props: {
                  numArgs: 1,
                  allowedInText: true
                },
                handler: function handler(_ref, args) {
                  var parser = _ref.parser;
                  return {
                    type: "underline",
                    mode: parser.mode,
                    body: args[0]
                  };
                },
                htmlBuilder: function htmlBuilder(group, options) {
                  var innerGroup = buildHTML_buildGroup(group.body, options);
                  var line = buildCommon.makeLineSpan("underline-line", options);
                  var defaultRuleThickness = options.fontMetrics().defaultRuleThickness;
                  var vlist = buildCommon.makeVList({
                    positionType: "top",
                    positionData: innerGroup.height,
                    children: [{
                      type: "kern",
                      size: defaultRuleThickness
                    }, {
                      type: "elem",
                      elem: line
                    }, {
                      type: "kern",
                      size: 3 * defaultRuleThickness
                    }, {
                      type: "elem",
                      elem: innerGroup
                    }]
                  }, options);
                  return buildCommon.makeSpan(["mord", "underline"], [vlist], options);
                },
                mathmlBuilder: function mathmlBuilder(group, options) {
                  var operator = new mathMLTree.MathNode("mo", [new mathMLTree.TextNode("\u203E")]);
                  operator.setAttribute("stretchy", "true");
                  var node = new mathMLTree.MathNode("munder", [buildMathML_buildGroup(group.body, options), operator]);
                  node.setAttribute("accentunder", "true");
                  return node;
                }
              });
              defineFunction({
                type: "verb",
                names: ["\\verb"],
                props: {
                  numArgs: 0,
                  allowedInText: true
                },
                handler: function handler(context, args, optArgs) {
                  throw new src_ParseError("\\verb ended by end of line instead of matching delimiter");
                },
                htmlBuilder: function htmlBuilder(group, options) {
                  var text = makeVerb(group);
                  var body = [];
                  var newOptions = options.havingStyle(options.style.text());
                  for (var i = 0; i < text.length; i++) {
                    var c = text[i];
                    if (c === "~") {
                      c = "\\textasciitilde";
                    }
                    body.push(buildCommon.makeSymbol(c, "Typewriter-Regular", group.mode, newOptions, ["mord", "texttt"]));
                  }
                  return buildCommon.makeSpan(["mord", "text"].concat(newOptions.sizingClasses(options)), buildCommon.tryCombineChars(body), newOptions);
                },
                mathmlBuilder: function mathmlBuilder(group, options) {
                  var text = new mathMLTree.TextNode(makeVerb(group));
                  var node = new mathMLTree.MathNode("mtext", [text]);
                  node.setAttribute("mathvariant", "monospace");
                  return node;
                }
              });
              var makeVerb = function makeVerb2(group) {
                return group.body.replace(/ /g, group.star ? "\u2423" : "\xA0");
              };
              var functions = _functions;
              var src_functions = functions;
              var spaceRegexString = "[ \r\n	]";
              var controlWordRegexString = "\\\\[a-zA-Z@]+";
              var controlSymbolRegexString = "\\\\[^\uD800-\uDFFF]";
              var controlWordWhitespaceRegexString = "" + controlWordRegexString + spaceRegexString + "*";
              var controlWordWhitespaceRegex = new RegExp("^(" + controlWordRegexString + ")" + spaceRegexString + "*$");
              var combiningDiacriticalMarkString = "[\u0300-\u036F]";
              var combiningDiacriticalMarksEndRegex = new RegExp(combiningDiacriticalMarkString + "+$");
              var tokenRegexString = "(" + spaceRegexString + "+)|([!-\\[\\]-\u2027\u202A-\uD7FF\uF900-\uFFFF]" + // single codepoint
              (combiningDiacriticalMarkString + "*") + // ...plus accents
              "|[\uD800-\uDBFF][\uDC00-\uDFFF]" + // surrogate pair
              (combiningDiacriticalMarkString + "*") + // ...plus accents
              "|\\\\verb\\*([^]).*?\\3|\\\\verb([^*a-zA-Z]).*?\\4|\\\\operatorname\\*" + // \operatorname*
              ("|" + controlWordWhitespaceRegexString) + // \macroName + spaces
              ("|" + controlSymbolRegexString + ")");
              var Lexer_Lexer = /* @__PURE__ */ (function() {
                function Lexer(input, settings) {
                  this.input = void 0;
                  this.settings = void 0;
                  this.tokenRegex = void 0;
                  this.catcodes = void 0;
                  this.input = input;
                  this.settings = settings;
                  this.tokenRegex = new RegExp(tokenRegexString, "g");
                  this.catcodes = {
                    "%": 14
                    // comment character
                  };
                }
                var _proto = Lexer.prototype;
                _proto.setCatcode = function setCatcode(char, code) {
                  this.catcodes[char] = code;
                };
                _proto.lex = function lex() {
                  var input = this.input;
                  var pos = this.tokenRegex.lastIndex;
                  if (pos === input.length) {
                    return new Token_Token("EOF", new SourceLocation(this, pos, pos));
                  }
                  var match = this.tokenRegex.exec(input);
                  if (match === null || match.index !== pos) {
                    throw new src_ParseError("Unexpected character: '" + input[pos] + "'", new Token_Token(input[pos], new SourceLocation(this, pos, pos + 1)));
                  }
                  var text = match[2] || " ";
                  if (this.catcodes[text] === 14) {
                    var nlIndex = input.indexOf("\n", this.tokenRegex.lastIndex);
                    if (nlIndex === -1) {
                      this.tokenRegex.lastIndex = input.length;
                      this.settings.reportNonstrict("commentAtEnd", "% comment has no terminating newline; LaTeX would fail because of commenting the end of math mode (e.g. $)");
                    } else {
                      this.tokenRegex.lastIndex = nlIndex + 1;
                    }
                    return this.lex();
                  }
                  var controlMatch = text.match(controlWordWhitespaceRegex);
                  if (controlMatch) {
                    text = controlMatch[1];
                  }
                  return new Token_Token(text, new SourceLocation(this, pos, this.tokenRegex.lastIndex));
                };
                return Lexer;
              })();
              var Namespace_Namespace = /* @__PURE__ */ (function() {
                function Namespace(builtins, globalMacros) {
                  if (builtins === void 0) {
                    builtins = {};
                  }
                  if (globalMacros === void 0) {
                    globalMacros = {};
                  }
                  this.current = void 0;
                  this.builtins = void 0;
                  this.undefStack = void 0;
                  this.current = globalMacros;
                  this.builtins = builtins;
                  this.undefStack = [];
                }
                var _proto = Namespace.prototype;
                _proto.beginGroup = function beginGroup() {
                  this.undefStack.push({});
                };
                _proto.endGroup = function endGroup() {
                  if (this.undefStack.length === 0) {
                    throw new src_ParseError("Unbalanced namespace destruction: attempt to pop global namespace; please report this as a bug");
                  }
                  var undefs = this.undefStack.pop();
                  for (var undef in undefs) {
                    if (undefs.hasOwnProperty(undef)) {
                      if (undefs[undef] === void 0) {
                        delete this.current[undef];
                      } else {
                        this.current[undef] = undefs[undef];
                      }
                    }
                  }
                };
                _proto.has = function has(name) {
                  return this.current.hasOwnProperty(name) || this.builtins.hasOwnProperty(name);
                };
                _proto.get = function get(name) {
                  if (this.current.hasOwnProperty(name)) {
                    return this.current[name];
                  } else {
                    return this.builtins[name];
                  }
                };
                _proto.set = function set(name, value, global) {
                  if (global === void 0) {
                    global = false;
                  }
                  if (global) {
                    for (var i = 0; i < this.undefStack.length; i++) {
                      delete this.undefStack[i][name];
                    }
                    if (this.undefStack.length > 0) {
                      this.undefStack[this.undefStack.length - 1][name] = value;
                    }
                  } else {
                    var top = this.undefStack[this.undefStack.length - 1];
                    if (top && !top.hasOwnProperty(name)) {
                      top[name] = this.current[name];
                    }
                  }
                  this.current[name] = value;
                };
                return Namespace;
              })();
              var builtinMacros = {};
              var macros = builtinMacros;
              function defineMacro(name, body) {
                builtinMacros[name] = body;
              }
              defineMacro("\\@firstoftwo", function(context) {
                var args = context.consumeArgs(2);
                return {
                  tokens: args[0],
                  numArgs: 0
                };
              });
              defineMacro("\\@secondoftwo", function(context) {
                var args = context.consumeArgs(2);
                return {
                  tokens: args[1],
                  numArgs: 0
                };
              });
              defineMacro("\\@ifnextchar", function(context) {
                var args = context.consumeArgs(3);
                var nextToken = context.future();
                if (args[0].length === 1 && args[0][0].text === nextToken.text) {
                  return {
                    tokens: args[1],
                    numArgs: 0
                  };
                } else {
                  return {
                    tokens: args[2],
                    numArgs: 0
                  };
                }
              });
              defineMacro("\\@ifstar", "\\@ifnextchar *{\\@firstoftwo{#1}}");
              defineMacro("\\TextOrMath", function(context) {
                var args = context.consumeArgs(2);
                if (context.mode === "text") {
                  return {
                    tokens: args[0],
                    numArgs: 0
                  };
                } else {
                  return {
                    tokens: args[1],
                    numArgs: 0
                  };
                }
              });
              var digitToNumber = {
                "0": 0,
                "1": 1,
                "2": 2,
                "3": 3,
                "4": 4,
                "5": 5,
                "6": 6,
                "7": 7,
                "8": 8,
                "9": 9,
                "a": 10,
                "A": 10,
                "b": 11,
                "B": 11,
                "c": 12,
                "C": 12,
                "d": 13,
                "D": 13,
                "e": 14,
                "E": 14,
                "f": 15,
                "F": 15
              };
              defineMacro("\\char", function(context) {
                var token = context.popToken();
                var base;
                var number = "";
                if (token.text === "'") {
                  base = 8;
                  token = context.popToken();
                } else if (token.text === '"') {
                  base = 16;
                  token = context.popToken();
                } else if (token.text === "`") {
                  token = context.popToken();
                  if (token.text[0] === "\\") {
                    number = token.text.charCodeAt(1);
                  } else if (token.text === "EOF") {
                    throw new src_ParseError("\\char` missing argument");
                  } else {
                    number = token.text.charCodeAt(0);
                  }
                } else {
                  base = 10;
                }
                if (base) {
                  number = digitToNumber[token.text];
                  if (number == null || number >= base) {
                    throw new src_ParseError("Invalid base-" + base + " digit " + token.text);
                  }
                  var digit;
                  while ((digit = digitToNumber[context.future().text]) != null && digit < base) {
                    number *= base;
                    number += digit;
                    context.popToken();
                  }
                }
                return "\\@char{" + number + "}";
              });
              var macros_def = function def(context, global) {
                var arg = context.consumeArgs(1)[0];
                if (arg.length !== 1) {
                  throw new src_ParseError("\\gdef's first argument must be a macro name");
                }
                var name = arg[0].text;
                var numArgs = 0;
                arg = context.consumeArgs(1)[0];
                while (arg.length === 1 && arg[0].text === "#") {
                  arg = context.consumeArgs(1)[0];
                  if (arg.length !== 1) {
                    throw new src_ParseError('Invalid argument number length "' + arg.length + '"');
                  }
                  if (!/^[1-9]$/.test(arg[0].text)) {
                    throw new src_ParseError('Invalid argument number "' + arg[0].text + '"');
                  }
                  numArgs++;
                  if (parseInt(arg[0].text) !== numArgs) {
                    throw new src_ParseError('Argument number "' + arg[0].text + '" out of order');
                  }
                  arg = context.consumeArgs(1)[0];
                }
                context.macros.set(name, {
                  tokens: arg,
                  numArgs
                }, global);
                return "";
              };
              defineMacro("\\gdef", function(context) {
                return macros_def(context, true);
              });
              defineMacro("\\def", function(context) {
                return macros_def(context, false);
              });
              defineMacro("\\global", function(context) {
                var next = context.consumeArgs(1)[0];
                if (next.length !== 1) {
                  throw new src_ParseError("Invalid command after \\global");
                }
                var command = next[0].text;
                if (command === "\\def") {
                  return macros_def(context, true);
                } else {
                  throw new src_ParseError("Invalid command '" + command + "' after \\global");
                }
              });
              var macros_newcommand = function newcommand(context, existsOK, nonexistsOK) {
                var arg = context.consumeArgs(1)[0];
                if (arg.length !== 1) {
                  throw new src_ParseError("\\newcommand's first argument must be a macro name");
                }
                var name = arg[0].text;
                var exists = context.isDefined(name);
                if (exists && !existsOK) {
                  throw new src_ParseError("\\newcommand{" + name + "} attempting to redefine " + (name + "; use \\renewcommand"));
                }
                if (!exists && !nonexistsOK) {
                  throw new src_ParseError("\\renewcommand{" + name + "} when command " + name + " does not yet exist; use \\newcommand");
                }
                var numArgs = 0;
                arg = context.consumeArgs(1)[0];
                if (arg.length === 1 && arg[0].text === "[") {
                  var argText = "";
                  var token = context.expandNextToken();
                  while (token.text !== "]" && token.text !== "EOF") {
                    argText += token.text;
                    token = context.expandNextToken();
                  }
                  if (!argText.match(/^\s*[0-9]+\s*$/)) {
                    throw new src_ParseError("Invalid number of arguments: " + argText);
                  }
                  numArgs = parseInt(argText);
                  arg = context.consumeArgs(1)[0];
                }
                context.macros.set(name, {
                  tokens: arg,
                  numArgs
                });
                return "";
              };
              defineMacro("\\newcommand", function(context) {
                return macros_newcommand(context, false, true);
              });
              defineMacro("\\renewcommand", function(context) {
                return macros_newcommand(context, true, false);
              });
              defineMacro("\\providecommand", function(context) {
                return macros_newcommand(context, true, true);
              });
              defineMacro("\\bgroup", "{");
              defineMacro("\\egroup", "}");
              defineMacro("\\lq", "`");
              defineMacro("\\rq", "'");
              defineMacro("\\aa", "\\r a");
              defineMacro("\\AA", "\\r A");
              defineMacro("\\textcopyright", "\\html@mathml{\\textcircled{c}}{\\char`\xA9}");
              defineMacro("\\copyright", "\\TextOrMath{\\textcopyright}{\\text{\\textcopyright}}");
              defineMacro("\\textregistered", "\\html@mathml{\\textcircled{\\scriptsize R}}{\\char`\xAE}");
              defineMacro("\u212C", "\\mathscr{B}");
              defineMacro("\u2130", "\\mathscr{E}");
              defineMacro("\u2131", "\\mathscr{F}");
              defineMacro("\u210B", "\\mathscr{H}");
              defineMacro("\u2110", "\\mathscr{I}");
              defineMacro("\u2112", "\\mathscr{L}");
              defineMacro("\u2133", "\\mathscr{M}");
              defineMacro("\u211B", "\\mathscr{R}");
              defineMacro("\u212D", "\\mathfrak{C}");
              defineMacro("\u210C", "\\mathfrak{H}");
              defineMacro("\u2128", "\\mathfrak{Z}");
              defineMacro("\\Bbbk", "\\Bbb{k}");
              defineMacro("\xB7", "\\cdotp");
              defineMacro("\\llap", "\\mathllap{\\textrm{#1}}");
              defineMacro("\\rlap", "\\mathrlap{\\textrm{#1}}");
              defineMacro("\\clap", "\\mathclap{\\textrm{#1}}");
              defineMacro("\\not", '\\html@mathml{\\mathrel{\\mathrlap\\@not}}{\\char"338}');
              defineMacro("\\neq", "\\html@mathml{\\mathrel{\\not=}}{\\mathrel{\\char`\u2260}}");
              defineMacro("\\ne", "\\neq");
              defineMacro("\u2260", "\\neq");
              defineMacro("\\notin", "\\html@mathml{\\mathrel{{\\in}\\mathllap{/\\mskip1mu}}}{\\mathrel{\\char`\u2209}}");
              defineMacro("\u2209", "\\notin");
              defineMacro("\u2258", "\\html@mathml{\\mathrel{=\\kern{-1em}\\raisebox{0.4em}{$\\scriptsize\\frown$}}}{\\mathrel{\\char`\u2258}}");
              defineMacro("\u2259", "\\html@mathml{\\stackrel{\\tiny\\wedge}{=}}{\\mathrel{\\char`\u2258}}");
              defineMacro("\u225A", "\\html@mathml{\\stackrel{\\tiny\\vee}{=}}{\\mathrel{\\char`\u225A}}");
              defineMacro("\u225B", "\\html@mathml{\\stackrel{\\scriptsize\\star}{=}}{\\mathrel{\\char`\u225B}}");
              defineMacro("\u225D", "\\html@mathml{\\stackrel{\\tiny\\mathrm{def}}{=}}{\\mathrel{\\char`\u225D}}");
              defineMacro("\u225E", "\\html@mathml{\\stackrel{\\tiny\\mathrm{m}}{=}}{\\mathrel{\\char`\u225E}}");
              defineMacro("\u225F", "\\html@mathml{\\stackrel{\\tiny?}{=}}{\\mathrel{\\char`\u225F}}");
              defineMacro("\u27C2", "\\perp");
              defineMacro("\u203C", "\\mathclose{!\\mkern-0.8mu!}");
              defineMacro("\u220C", "\\notni");
              defineMacro("\u231C", "\\ulcorner");
              defineMacro("\u231D", "\\urcorner");
              defineMacro("\u231E", "\\llcorner");
              defineMacro("\u231F", "\\lrcorner");
              defineMacro("\xA9", "\\copyright");
              defineMacro("\xAE", "\\textregistered");
              defineMacro("\uFE0F", "\\textregistered");
              defineMacro("\\vdots", "\\mathord{\\varvdots\\rule{0pt}{15pt}}");
              defineMacro("\u22EE", "\\vdots");
              defineMacro("\\varGamma", "\\mathit{\\Gamma}");
              defineMacro("\\varDelta", "\\mathit{\\Delta}");
              defineMacro("\\varTheta", "\\mathit{\\Theta}");
              defineMacro("\\varLambda", "\\mathit{\\Lambda}");
              defineMacro("\\varXi", "\\mathit{\\Xi}");
              defineMacro("\\varPi", "\\mathit{\\Pi}");
              defineMacro("\\varSigma", "\\mathit{\\Sigma}");
              defineMacro("\\varUpsilon", "\\mathit{\\Upsilon}");
              defineMacro("\\varPhi", "\\mathit{\\Phi}");
              defineMacro("\\varPsi", "\\mathit{\\Psi}");
              defineMacro("\\varOmega", "\\mathit{\\Omega}");
              defineMacro("\\substack", "\\begin{subarray}{c}#1\\end{subarray}");
              defineMacro("\\colon", "\\nobreak\\mskip2mu\\mathpunct{}\\mathchoice{\\mkern-3mu}{\\mkern-3mu}{}{}{:}\\mskip6mu");
              defineMacro("\\boxed", "\\fbox{$\\displaystyle{#1}$}");
              defineMacro("\\iff", "\\DOTSB\\;\\Longleftrightarrow\\;");
              defineMacro("\\implies", "\\DOTSB\\;\\Longrightarrow\\;");
              defineMacro("\\impliedby", "\\DOTSB\\;\\Longleftarrow\\;");
              var dotsByToken = {
                ",": "\\dotsc",
                "\\not": "\\dotsb",
                // \keybin@ checks for the following:
                "+": "\\dotsb",
                "=": "\\dotsb",
                "<": "\\dotsb",
                ">": "\\dotsb",
                "-": "\\dotsb",
                "*": "\\dotsb",
                ":": "\\dotsb",
                // Symbols whose definition starts with \DOTSB:
                "\\DOTSB": "\\dotsb",
                "\\coprod": "\\dotsb",
                "\\bigvee": "\\dotsb",
                "\\bigwedge": "\\dotsb",
                "\\biguplus": "\\dotsb",
                "\\bigcap": "\\dotsb",
                "\\bigcup": "\\dotsb",
                "\\prod": "\\dotsb",
                "\\sum": "\\dotsb",
                "\\bigotimes": "\\dotsb",
                "\\bigoplus": "\\dotsb",
                "\\bigodot": "\\dotsb",
                "\\bigsqcup": "\\dotsb",
                "\\And": "\\dotsb",
                "\\longrightarrow": "\\dotsb",
                "\\Longrightarrow": "\\dotsb",
                "\\longleftarrow": "\\dotsb",
                "\\Longleftarrow": "\\dotsb",
                "\\longleftrightarrow": "\\dotsb",
                "\\Longleftrightarrow": "\\dotsb",
                "\\mapsto": "\\dotsb",
                "\\longmapsto": "\\dotsb",
                "\\hookrightarrow": "\\dotsb",
                "\\doteq": "\\dotsb",
                // Symbols whose definition starts with \mathbin:
                "\\mathbin": "\\dotsb",
                // Symbols whose definition starts with \mathrel:
                "\\mathrel": "\\dotsb",
                "\\relbar": "\\dotsb",
                "\\Relbar": "\\dotsb",
                "\\xrightarrow": "\\dotsb",
                "\\xleftarrow": "\\dotsb",
                // Symbols whose definition starts with \DOTSI:
                "\\DOTSI": "\\dotsi",
                "\\int": "\\dotsi",
                "\\oint": "\\dotsi",
                "\\iint": "\\dotsi",
                "\\iiint": "\\dotsi",
                "\\iiiint": "\\dotsi",
                "\\idotsint": "\\dotsi",
                // Symbols whose definition starts with \DOTSX:
                "\\DOTSX": "\\dotsx"
              };
              defineMacro("\\dots", function(context) {
                var thedots = "\\dotso";
                var next = context.expandAfterFuture().text;
                if (next in dotsByToken) {
                  thedots = dotsByToken[next];
                } else if (next.substr(0, 4) === "\\not") {
                  thedots = "\\dotsb";
                } else if (next in src_symbols.math) {
                  if (utils.contains(["bin", "rel"], src_symbols.math[next].group)) {
                    thedots = "\\dotsb";
                  }
                }
                return thedots;
              });
              var spaceAfterDots = {
                // \rightdelim@ checks for the following:
                ")": true,
                "]": true,
                "\\rbrack": true,
                "\\}": true,
                "\\rbrace": true,
                "\\rangle": true,
                "\\rceil": true,
                "\\rfloor": true,
                "\\rgroup": true,
                "\\rmoustache": true,
                "\\right": true,
                "\\bigr": true,
                "\\biggr": true,
                "\\Bigr": true,
                "\\Biggr": true,
                // \extra@ also tests for the following:
                "$": true,
                // \extrap@ checks for the following:
                ";": true,
                ".": true,
                ",": true
              };
              defineMacro("\\dotso", function(context) {
                var next = context.future().text;
                if (next in spaceAfterDots) {
                  return "\\ldots\\,";
                } else {
                  return "\\ldots";
                }
              });
              defineMacro("\\dotsc", function(context) {
                var next = context.future().text;
                if (next in spaceAfterDots && next !== ",") {
                  return "\\ldots\\,";
                } else {
                  return "\\ldots";
                }
              });
              defineMacro("\\cdots", function(context) {
                var next = context.future().text;
                if (next in spaceAfterDots) {
                  return "\\@cdots\\,";
                } else {
                  return "\\@cdots";
                }
              });
              defineMacro("\\dotsb", "\\cdots");
              defineMacro("\\dotsm", "\\cdots");
              defineMacro("\\dotsi", "\\!\\cdots");
              defineMacro("\\dotsx", "\\ldots\\,");
              defineMacro("\\DOTSI", "\\relax");
              defineMacro("\\DOTSB", "\\relax");
              defineMacro("\\DOTSX", "\\relax");
              defineMacro("\\tmspace", "\\TextOrMath{\\kern#1#3}{\\mskip#1#2}\\relax");
              defineMacro("\\,", "\\tmspace+{3mu}{.1667em}");
              defineMacro("\\thinspace", "\\,");
              defineMacro("\\>", "\\mskip{4mu}");
              defineMacro("\\:", "\\tmspace+{4mu}{.2222em}");
              defineMacro("\\medspace", "\\:");
              defineMacro("\\;", "\\tmspace+{5mu}{.2777em}");
              defineMacro("\\thickspace", "\\;");
              defineMacro("\\!", "\\tmspace-{3mu}{.1667em}");
              defineMacro("\\negthinspace", "\\!");
              defineMacro("\\negmedspace", "\\tmspace-{4mu}{.2222em}");
              defineMacro("\\negthickspace", "\\tmspace-{5mu}{.277em}");
              defineMacro("\\enspace", "\\kern.5em ");
              defineMacro("\\enskip", "\\hskip.5em\\relax");
              defineMacro("\\quad", "\\hskip1em\\relax");
              defineMacro("\\qquad", "\\hskip2em\\relax");
              defineMacro("\\tag", "\\@ifstar\\tag@literal\\tag@paren");
              defineMacro("\\tag@paren", "\\tag@literal{({#1})}");
              defineMacro("\\tag@literal", function(context) {
                if (context.macros.get("\\df@tag")) {
                  throw new src_ParseError("Multiple \\tag");
                }
                return "\\gdef\\df@tag{\\text{#1}}";
              });
              defineMacro("\\bmod", "\\mathchoice{\\mskip1mu}{\\mskip1mu}{\\mskip5mu}{\\mskip5mu}\\mathbin{\\rm mod}\\mathchoice{\\mskip1mu}{\\mskip1mu}{\\mskip5mu}{\\mskip5mu}");
              defineMacro("\\pod", "\\allowbreak\\mathchoice{\\mkern18mu}{\\mkern8mu}{\\mkern8mu}{\\mkern8mu}(#1)");
              defineMacro("\\pmod", "\\pod{{\\rm mod}\\mkern6mu#1}");
              defineMacro("\\mod", "\\allowbreak\\mathchoice{\\mkern18mu}{\\mkern12mu}{\\mkern12mu}{\\mkern12mu}{\\rm mod}\\,\\,#1");
              defineMacro("\\pmb", "\\html@mathml{\\@binrel{#1}{\\mathrlap{#1}\\kern0.5px#1}}{\\mathbf{#1}}");
              defineMacro("\\\\", "\\newline");
              defineMacro("\\TeX", "\\textrm{\\html@mathml{T\\kern-.1667em\\raisebox{-.5ex}{E}\\kern-.125emX}{TeX}}");
              var latexRaiseA = fontMetricsData["Main-Regular"]["T".charCodeAt(0)][1] - 0.7 * fontMetricsData["Main-Regular"]["A".charCodeAt(0)][1] + "em";
              defineMacro("\\LaTeX", "\\textrm{\\html@mathml{" + ("L\\kern-.36em\\raisebox{" + latexRaiseA + "}{\\scriptstyle A}") + "\\kern-.15em\\TeX}{LaTeX}}");
              defineMacro("\\KaTeX", "\\textrm{\\html@mathml{" + ("K\\kern-.17em\\raisebox{" + latexRaiseA + "}{\\scriptstyle A}") + "\\kern-.15em\\TeX}{KaTeX}}");
              defineMacro("\\hspace", "\\@ifstar\\@hspacer\\@hspace");
              defineMacro("\\@hspace", "\\hskip #1\\relax");
              defineMacro("\\@hspacer", "\\rule{0pt}{0pt}\\hskip #1\\relax");
              defineMacro("\\ordinarycolon", ":");
              defineMacro("\\vcentcolon", "\\mathrel{\\mathop\\ordinarycolon}");
              defineMacro("\\dblcolon", '\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-.9mu}\\vcentcolon}}{\\mathop{\\char"2237}}');
              defineMacro("\\coloneqq", '\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}=}}{\\mathop{\\char"2254}}');
              defineMacro("\\Coloneqq", '\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}=}}{\\mathop{\\char"2237\\char"3d}}');
              defineMacro("\\coloneq", '\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}\\mathrel{-}}}{\\mathop{\\char"3a\\char"2212}}');
              defineMacro("\\Coloneq", '\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}\\mathrel{-}}}{\\mathop{\\char"2237\\char"2212}}');
              defineMacro("\\eqqcolon", '\\html@mathml{\\mathrel{=\\mathrel{\\mkern-1.2mu}\\vcentcolon}}{\\mathop{\\char"2255}}');
              defineMacro("\\Eqqcolon", '\\html@mathml{\\mathrel{=\\mathrel{\\mkern-1.2mu}\\dblcolon}}{\\mathop{\\char"3d\\char"2237}}');
              defineMacro("\\eqcolon", '\\html@mathml{\\mathrel{\\mathrel{-}\\mathrel{\\mkern-1.2mu}\\vcentcolon}}{\\mathop{\\char"2239}}');
              defineMacro("\\Eqcolon", '\\html@mathml{\\mathrel{\\mathrel{-}\\mathrel{\\mkern-1.2mu}\\dblcolon}}{\\mathop{\\char"2212\\char"2237}}');
              defineMacro("\\colonapprox", '\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}\\approx}}{\\mathop{\\char"3a\\char"2248}}');
              defineMacro("\\Colonapprox", '\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}\\approx}}{\\mathop{\\char"2237\\char"2248}}');
              defineMacro("\\colonsim", '\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}\\sim}}{\\mathop{\\char"3a\\char"223c}}');
              defineMacro("\\Colonsim", '\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}\\sim}}{\\mathop{\\char"2237\\char"223c}}');
              defineMacro("\u2237", "\\dblcolon");
              defineMacro("\u2239", "\\eqcolon");
              defineMacro("\u2254", "\\coloneqq");
              defineMacro("\u2255", "\\eqqcolon");
              defineMacro("\u2A74", "\\Coloneqq");
              defineMacro("\\ratio", "\\vcentcolon");
              defineMacro("\\coloncolon", "\\dblcolon");
              defineMacro("\\colonequals", "\\coloneqq");
              defineMacro("\\coloncolonequals", "\\Coloneqq");
              defineMacro("\\equalscolon", "\\eqqcolon");
              defineMacro("\\equalscoloncolon", "\\Eqqcolon");
              defineMacro("\\colonminus", "\\coloneq");
              defineMacro("\\coloncolonminus", "\\Coloneq");
              defineMacro("\\minuscolon", "\\eqcolon");
              defineMacro("\\minuscoloncolon", "\\Eqcolon");
              defineMacro("\\coloncolonapprox", "\\Colonapprox");
              defineMacro("\\coloncolonsim", "\\Colonsim");
              defineMacro("\\simcolon", "\\mathrel{\\sim\\mathrel{\\mkern-1.2mu}\\vcentcolon}");
              defineMacro("\\simcoloncolon", "\\mathrel{\\sim\\mathrel{\\mkern-1.2mu}\\dblcolon}");
              defineMacro("\\approxcolon", "\\mathrel{\\approx\\mathrel{\\mkern-1.2mu}\\vcentcolon}");
              defineMacro("\\approxcoloncolon", "\\mathrel{\\approx\\mathrel{\\mkern-1.2mu}\\dblcolon}");
              defineMacro("\\notni", "\\html@mathml{\\not\\ni}{\\mathrel{\\char`\u220C}}");
              defineMacro("\\limsup", "\\DOTSB\\operatorname*{lim\\,sup}");
              defineMacro("\\liminf", "\\DOTSB\\operatorname*{lim\\,inf}");
              defineMacro("\\gvertneqq", "\\html@mathml{\\@gvertneqq}{\u2269}");
              defineMacro("\\lvertneqq", "\\html@mathml{\\@lvertneqq}{\u2268}");
              defineMacro("\\ngeqq", "\\html@mathml{\\@ngeqq}{\u2271}");
              defineMacro("\\ngeqslant", "\\html@mathml{\\@ngeqslant}{\u2271}");
              defineMacro("\\nleqq", "\\html@mathml{\\@nleqq}{\u2270}");
              defineMacro("\\nleqslant", "\\html@mathml{\\@nleqslant}{\u2270}");
              defineMacro("\\nshortmid", "\\html@mathml{\\@nshortmid}{\u2224}");
              defineMacro("\\nshortparallel", "\\html@mathml{\\@nshortparallel}{\u2226}");
              defineMacro("\\nsubseteqq", "\\html@mathml{\\@nsubseteqq}{\u2288}");
              defineMacro("\\nsupseteqq", "\\html@mathml{\\@nsupseteqq}{\u2289}");
              defineMacro("\\varsubsetneq", "\\html@mathml{\\@varsubsetneq}{\u228A}");
              defineMacro("\\varsubsetneqq", "\\html@mathml{\\@varsubsetneqq}{\u2ACB}");
              defineMacro("\\varsupsetneq", "\\html@mathml{\\@varsupsetneq}{\u228B}");
              defineMacro("\\varsupsetneqq", "\\html@mathml{\\@varsupsetneqq}{\u2ACC}");
              defineMacro("\\llbracket", "\\html@mathml{\\mathopen{[\\mkern-3.2mu[}}{\\mathopen{\\char`\u27E6}}");
              defineMacro("\\rrbracket", "\\html@mathml{\\mathclose{]\\mkern-3.2mu]}}{\\mathclose{\\char`\u27E7}}");
              defineMacro("\u27E6", "\\llbracket");
              defineMacro("\u27E7", "\\rrbracket");
              defineMacro("\\lBrace", "\\html@mathml{\\mathopen{\\{\\mkern-3.2mu[}}{\\mathopen{\\char`\u2983}}");
              defineMacro("\\rBrace", "\\html@mathml{\\mathclose{]\\mkern-3.2mu\\}}}{\\mathclose{\\char`\u2984}}");
              defineMacro("\u2983", "\\lBrace");
              defineMacro("\u2984", "\\rBrace");
              defineMacro("\\darr", "\\downarrow");
              defineMacro("\\dArr", "\\Downarrow");
              defineMacro("\\Darr", "\\Downarrow");
              defineMacro("\\lang", "\\langle");
              defineMacro("\\rang", "\\rangle");
              defineMacro("\\uarr", "\\uparrow");
              defineMacro("\\uArr", "\\Uparrow");
              defineMacro("\\Uarr", "\\Uparrow");
              defineMacro("\\N", "\\mathbb{N}");
              defineMacro("\\R", "\\mathbb{R}");
              defineMacro("\\Z", "\\mathbb{Z}");
              defineMacro("\\alef", "\\aleph");
              defineMacro("\\alefsym", "\\aleph");
              defineMacro("\\Alpha", "\\mathrm{A}");
              defineMacro("\\Beta", "\\mathrm{B}");
              defineMacro("\\bull", "\\bullet");
              defineMacro("\\Chi", "\\mathrm{X}");
              defineMacro("\\clubs", "\\clubsuit");
              defineMacro("\\cnums", "\\mathbb{C}");
              defineMacro("\\Complex", "\\mathbb{C}");
              defineMacro("\\Dagger", "\\ddagger");
              defineMacro("\\diamonds", "\\diamondsuit");
              defineMacro("\\empty", "\\emptyset");
              defineMacro("\\Epsilon", "\\mathrm{E}");
              defineMacro("\\Eta", "\\mathrm{H}");
              defineMacro("\\exist", "\\exists");
              defineMacro("\\harr", "\\leftrightarrow");
              defineMacro("\\hArr", "\\Leftrightarrow");
              defineMacro("\\Harr", "\\Leftrightarrow");
              defineMacro("\\hearts", "\\heartsuit");
              defineMacro("\\image", "\\Im");
              defineMacro("\\infin", "\\infty");
              defineMacro("\\Iota", "\\mathrm{I}");
              defineMacro("\\isin", "\\in");
              defineMacro("\\Kappa", "\\mathrm{K}");
              defineMacro("\\larr", "\\leftarrow");
              defineMacro("\\lArr", "\\Leftarrow");
              defineMacro("\\Larr", "\\Leftarrow");
              defineMacro("\\lrarr", "\\leftrightarrow");
              defineMacro("\\lrArr", "\\Leftrightarrow");
              defineMacro("\\Lrarr", "\\Leftrightarrow");
              defineMacro("\\Mu", "\\mathrm{M}");
              defineMacro("\\natnums", "\\mathbb{N}");
              defineMacro("\\Nu", "\\mathrm{N}");
              defineMacro("\\Omicron", "\\mathrm{O}");
              defineMacro("\\plusmn", "\\pm");
              defineMacro("\\rarr", "\\rightarrow");
              defineMacro("\\rArr", "\\Rightarrow");
              defineMacro("\\Rarr", "\\Rightarrow");
              defineMacro("\\real", "\\Re");
              defineMacro("\\reals", "\\mathbb{R}");
              defineMacro("\\Reals", "\\mathbb{R}");
              defineMacro("\\Rho", "\\mathrm{P}");
              defineMacro("\\sdot", "\\cdot");
              defineMacro("\\sect", "\\S");
              defineMacro("\\spades", "\\spadesuit");
              defineMacro("\\sub", "\\subset");
              defineMacro("\\sube", "\\subseteq");
              defineMacro("\\supe", "\\supseteq");
              defineMacro("\\Tau", "\\mathrm{T}");
              defineMacro("\\thetasym", "\\vartheta");
              defineMacro("\\weierp", "\\wp");
              defineMacro("\\Zeta", "\\mathrm{Z}");
              defineMacro("\\argmin", "\\DOTSB\\operatorname*{arg\\,min}");
              defineMacro("\\argmax", "\\DOTSB\\operatorname*{arg\\,max}");
              defineMacro("\\plim", "\\DOTSB\\mathop{\\operatorname{plim}}\\limits");
              defineMacro("\\blue", "\\textcolor{##6495ed}{#1}");
              defineMacro("\\orange", "\\textcolor{##ffa500}{#1}");
              defineMacro("\\pink", "\\textcolor{##ff00af}{#1}");
              defineMacro("\\red", "\\textcolor{##df0030}{#1}");
              defineMacro("\\green", "\\textcolor{##28ae7b}{#1}");
              defineMacro("\\gray", "\\textcolor{gray}{#1}");
              defineMacro("\\purple", "\\textcolor{##9d38bd}{#1}");
              defineMacro("\\blueA", "\\textcolor{##ccfaff}{#1}");
              defineMacro("\\blueB", "\\textcolor{##80f6ff}{#1}");
              defineMacro("\\blueC", "\\textcolor{##63d9ea}{#1}");
              defineMacro("\\blueD", "\\textcolor{##11accd}{#1}");
              defineMacro("\\blueE", "\\textcolor{##0c7f99}{#1}");
              defineMacro("\\tealA", "\\textcolor{##94fff5}{#1}");
              defineMacro("\\tealB", "\\textcolor{##26edd5}{#1}");
              defineMacro("\\tealC", "\\textcolor{##01d1c1}{#1}");
              defineMacro("\\tealD", "\\textcolor{##01a995}{#1}");
              defineMacro("\\tealE", "\\textcolor{##208170}{#1}");
              defineMacro("\\greenA", "\\textcolor{##b6ffb0}{#1}");
              defineMacro("\\greenB", "\\textcolor{##8af281}{#1}");
              defineMacro("\\greenC", "\\textcolor{##74cf70}{#1}");
              defineMacro("\\greenD", "\\textcolor{##1fab54}{#1}");
              defineMacro("\\greenE", "\\textcolor{##0d923f}{#1}");
              defineMacro("\\goldA", "\\textcolor{##ffd0a9}{#1}");
              defineMacro("\\goldB", "\\textcolor{##ffbb71}{#1}");
              defineMacro("\\goldC", "\\textcolor{##ff9c39}{#1}");
              defineMacro("\\goldD", "\\textcolor{##e07d10}{#1}");
              defineMacro("\\goldE", "\\textcolor{##a75a05}{#1}");
              defineMacro("\\redA", "\\textcolor{##fca9a9}{#1}");
              defineMacro("\\redB", "\\textcolor{##ff8482}{#1}");
              defineMacro("\\redC", "\\textcolor{##f9685d}{#1}");
              defineMacro("\\redD", "\\textcolor{##e84d39}{#1}");
              defineMacro("\\redE", "\\textcolor{##bc2612}{#1}");
              defineMacro("\\maroonA", "\\textcolor{##ffbde0}{#1}");
              defineMacro("\\maroonB", "\\textcolor{##ff92c6}{#1}");
              defineMacro("\\maroonC", "\\textcolor{##ed5fa6}{#1}");
              defineMacro("\\maroonD", "\\textcolor{##ca337c}{#1}");
              defineMacro("\\maroonE", "\\textcolor{##9e034e}{#1}");
              defineMacro("\\purpleA", "\\textcolor{##ddd7ff}{#1}");
              defineMacro("\\purpleB", "\\textcolor{##c6b9fc}{#1}");
              defineMacro("\\purpleC", "\\textcolor{##aa87ff}{#1}");
              defineMacro("\\purpleD", "\\textcolor{##7854ab}{#1}");
              defineMacro("\\purpleE", "\\textcolor{##543b78}{#1}");
              defineMacro("\\mintA", "\\textcolor{##f5f9e8}{#1}");
              defineMacro("\\mintB", "\\textcolor{##edf2df}{#1}");
              defineMacro("\\mintC", "\\textcolor{##e0e5cc}{#1}");
              defineMacro("\\grayA", "\\textcolor{##f6f7f7}{#1}");
              defineMacro("\\grayB", "\\textcolor{##f0f1f2}{#1}");
              defineMacro("\\grayC", "\\textcolor{##e3e5e6}{#1}");
              defineMacro("\\grayD", "\\textcolor{##d6d8da}{#1}");
              defineMacro("\\grayE", "\\textcolor{##babec2}{#1}");
              defineMacro("\\grayF", "\\textcolor{##888d93}{#1}");
              defineMacro("\\grayG", "\\textcolor{##626569}{#1}");
              defineMacro("\\grayH", "\\textcolor{##3b3e40}{#1}");
              defineMacro("\\grayI", "\\textcolor{##21242c}{#1}");
              defineMacro("\\kaBlue", "\\textcolor{##314453}{#1}");
              defineMacro("\\kaGreen", "\\textcolor{##71B307}{#1}");
              var implicitCommands = {
                "\\relax": true,
                // MacroExpander.js
                "^": true,
                // Parser.js
                "_": true,
                // Parser.js
                "\\limits": true,
                // Parser.js
                "\\nolimits": true
                // Parser.js
              };
              var MacroExpander_MacroExpander = /* @__PURE__ */ (function() {
                function MacroExpander(input, settings, mode) {
                  this.settings = void 0;
                  this.expansionCount = void 0;
                  this.lexer = void 0;
                  this.macros = void 0;
                  this.stack = void 0;
                  this.mode = void 0;
                  this.settings = settings;
                  this.expansionCount = 0;
                  this.feed(input);
                  this.macros = new Namespace_Namespace(macros, settings.macros);
                  this.mode = mode;
                  this.stack = [];
                }
                var _proto = MacroExpander.prototype;
                _proto.feed = function feed(input) {
                  this.lexer = new Lexer_Lexer(input, this.settings);
                };
                _proto.switchMode = function switchMode(newMode) {
                  this.mode = newMode;
                };
                _proto.beginGroup = function beginGroup() {
                  this.macros.beginGroup();
                };
                _proto.endGroup = function endGroup() {
                  this.macros.endGroup();
                };
                _proto.future = function future() {
                  if (this.stack.length === 0) {
                    this.pushToken(this.lexer.lex());
                  }
                  return this.stack[this.stack.length - 1];
                };
                _proto.popToken = function popToken() {
                  this.future();
                  return this.stack.pop();
                };
                _proto.pushToken = function pushToken(token) {
                  this.stack.push(token);
                };
                _proto.pushTokens = function pushTokens(tokens) {
                  var _this$stack;
                  (_this$stack = this.stack).push.apply(_this$stack, tokens);
                };
                _proto.consumeSpaces = function consumeSpaces() {
                  for (; ; ) {
                    var token = this.future();
                    if (token.text === " ") {
                      this.stack.pop();
                    } else {
                      break;
                    }
                  }
                };
                _proto.consumeArgs = function consumeArgs(numArgs) {
                  var args = [];
                  for (var i = 0; i < numArgs; ++i) {
                    this.consumeSpaces();
                    var startOfArg = this.popToken();
                    if (startOfArg.text === "{") {
                      var arg = [];
                      var depth = 1;
                      while (depth !== 0) {
                        var tok = this.popToken();
                        arg.push(tok);
                        if (tok.text === "{") {
                          ++depth;
                        } else if (tok.text === "}") {
                          --depth;
                        } else if (tok.text === "EOF") {
                          throw new src_ParseError("End of input in macro argument", startOfArg);
                        }
                      }
                      arg.pop();
                      arg.reverse();
                      args[i] = arg;
                    } else if (startOfArg.text === "EOF") {
                      throw new src_ParseError("End of input expecting macro argument");
                    } else {
                      args[i] = [startOfArg];
                    }
                  }
                  return args;
                };
                _proto.expandOnce = function expandOnce() {
                  var topToken = this.popToken();
                  var name = topToken.text;
                  var expansion = this._getExpansion(name);
                  if (expansion == null) {
                    this.pushToken(topToken);
                    return topToken;
                  }
                  this.expansionCount++;
                  if (this.expansionCount > this.settings.maxExpand) {
                    throw new src_ParseError("Too many expansions: infinite loop or need to increase maxExpand setting");
                  }
                  var tokens = expansion.tokens;
                  if (expansion.numArgs) {
                    var args = this.consumeArgs(expansion.numArgs);
                    tokens = tokens.slice();
                    for (var i = tokens.length - 1; i >= 0; --i) {
                      var tok = tokens[i];
                      if (tok.text === "#") {
                        if (i === 0) {
                          throw new src_ParseError("Incomplete placeholder at end of macro body", tok);
                        }
                        tok = tokens[--i];
                        if (tok.text === "#") {
                          tokens.splice(i + 1, 1);
                        } else if (/^[1-9]$/.test(tok.text)) {
                          var _tokens;
                          (_tokens = tokens).splice.apply(_tokens, [i, 2].concat(args[+tok.text - 1]));
                        } else {
                          throw new src_ParseError("Not a valid argument number", tok);
                        }
                      }
                    }
                  }
                  this.pushTokens(tokens);
                  return tokens;
                };
                _proto.expandAfterFuture = function expandAfterFuture() {
                  this.expandOnce();
                  return this.future();
                };
                _proto.expandNextToken = function expandNextToken() {
                  for (; ; ) {
                    var expanded = this.expandOnce();
                    if (expanded instanceof Token_Token) {
                      if (expanded.text === "\\relax") {
                        this.stack.pop();
                      } else {
                        return this.stack.pop();
                      }
                    }
                  }
                  throw new Error();
                };
                _proto.expandMacro = function expandMacro(name) {
                  if (!this.macros.get(name)) {
                    return void 0;
                  }
                  var output = [];
                  var oldStackLength = this.stack.length;
                  this.pushToken(new Token_Token(name));
                  while (this.stack.length > oldStackLength) {
                    var expanded = this.expandOnce();
                    if (expanded instanceof Token_Token) {
                      output.push(this.stack.pop());
                    }
                  }
                  return output;
                };
                _proto.expandMacroAsText = function expandMacroAsText(name) {
                  var tokens = this.expandMacro(name);
                  if (tokens) {
                    return tokens.map(function(token) {
                      return token.text;
                    }).join("");
                  } else {
                    return tokens;
                  }
                };
                _proto._getExpansion = function _getExpansion(name) {
                  var definition = this.macros.get(name);
                  if (definition == null) {
                    return definition;
                  }
                  var expansion = typeof definition === "function" ? definition(this) : definition;
                  if (typeof expansion === "string") {
                    var numArgs = 0;
                    if (expansion.indexOf("#") !== -1) {
                      var stripped = expansion.replace(/##/g, "");
                      while (stripped.indexOf("#" + (numArgs + 1)) !== -1) {
                        ++numArgs;
                      }
                    }
                    var bodyLexer = new Lexer_Lexer(expansion, this.settings);
                    var tokens = [];
                    var tok = bodyLexer.lex();
                    while (tok.text !== "EOF") {
                      tokens.push(tok);
                      tok = bodyLexer.lex();
                    }
                    tokens.reverse();
                    var expanded = {
                      tokens,
                      numArgs
                    };
                    return expanded;
                  }
                  return expansion;
                };
                _proto.isDefined = function isDefined(name) {
                  return this.macros.has(name) || src_functions.hasOwnProperty(name) || src_symbols.math.hasOwnProperty(name) || src_symbols.text.hasOwnProperty(name) || implicitCommands.hasOwnProperty(name);
                };
                return MacroExpander;
              })();
              var unicodeAccents = {
                "\u0301": {
                  text: "\\'",
                  math: "\\acute"
                },
                "\u0300": {
                  text: "\\`",
                  math: "\\grave"
                },
                "\u0308": {
                  text: '\\"',
                  math: "\\ddot"
                },
                "\u0303": {
                  text: "\\~",
                  math: "\\tilde"
                },
                "\u0304": {
                  text: "\\=",
                  math: "\\bar"
                },
                "\u0306": {
                  text: "\\u",
                  math: "\\breve"
                },
                "\u030C": {
                  text: "\\v",
                  math: "\\check"
                },
                "\u0302": {
                  text: "\\^",
                  math: "\\hat"
                },
                "\u0307": {
                  text: "\\.",
                  math: "\\dot"
                },
                "\u030A": {
                  text: "\\r",
                  math: "\\mathring"
                },
                "\u030B": {
                  text: "\\H"
                }
              };
              var unicodeSymbols = {
                "\xE1": "a\u0301",
                // á = \'{a}
                "\xE0": "a\u0300",
                // à = \`{a}
                "\xE4": "a\u0308",
                // ä = \"{a}
                "\u01DF": "a\u0308\u0304",
                // ǟ = \"\={a}
                "\xE3": "a\u0303",
                // ã = \~{a}
                "\u0101": "a\u0304",
                // ā = \={a}
                "\u0103": "a\u0306",
                // ă = \u{a}
                "\u1EAF": "a\u0306\u0301",
                // ắ = \u\'{a}
                "\u1EB1": "a\u0306\u0300",
                // ằ = \u\`{a}
                "\u1EB5": "a\u0306\u0303",
                // ẵ = \u\~{a}
                "\u01CE": "a\u030C",
                // ǎ = \v{a}
                "\xE2": "a\u0302",
                // â = \^{a}
                "\u1EA5": "a\u0302\u0301",
                // ấ = \^\'{a}
                "\u1EA7": "a\u0302\u0300",
                // ầ = \^\`{a}
                "\u1EAB": "a\u0302\u0303",
                // ẫ = \^\~{a}
                "\u0227": "a\u0307",
                // ȧ = \.{a}
                "\u01E1": "a\u0307\u0304",
                // ǡ = \.\={a}
                "\xE5": "a\u030A",
                // å = \r{a}
                "\u01FB": "a\u030A\u0301",
                // ǻ = \r\'{a}
                "\u1E03": "b\u0307",
                // ḃ = \.{b}
                "\u0107": "c\u0301",
                // ć = \'{c}
                "\u010D": "c\u030C",
                // č = \v{c}
                "\u0109": "c\u0302",
                // ĉ = \^{c}
                "\u010B": "c\u0307",
                // ċ = \.{c}
                "\u010F": "d\u030C",
                // ď = \v{d}
                "\u1E0B": "d\u0307",
                // ḋ = \.{d}
                "\xE9": "e\u0301",
                // é = \'{e}
                "\xE8": "e\u0300",
                // è = \`{e}
                "\xEB": "e\u0308",
                // ë = \"{e}
                "\u1EBD": "e\u0303",
                // ẽ = \~{e}
                "\u0113": "e\u0304",
                // ē = \={e}
                "\u1E17": "e\u0304\u0301",
                // ḗ = \=\'{e}
                "\u1E15": "e\u0304\u0300",
                // ḕ = \=\`{e}
                "\u0115": "e\u0306",
                // ĕ = \u{e}
                "\u011B": "e\u030C",
                // ě = \v{e}
                "\xEA": "e\u0302",
                // ê = \^{e}
                "\u1EBF": "e\u0302\u0301",
                // ế = \^\'{e}
                "\u1EC1": "e\u0302\u0300",
                // ề = \^\`{e}
                "\u1EC5": "e\u0302\u0303",
                // ễ = \^\~{e}
                "\u0117": "e\u0307",
                // ė = \.{e}
                "\u1E1F": "f\u0307",
                // ḟ = \.{f}
                "\u01F5": "g\u0301",
                // ǵ = \'{g}
                "\u1E21": "g\u0304",
                // ḡ = \={g}
                "\u011F": "g\u0306",
                // ğ = \u{g}
                "\u01E7": "g\u030C",
                // ǧ = \v{g}
                "\u011D": "g\u0302",
                // ĝ = \^{g}
                "\u0121": "g\u0307",
                // ġ = \.{g}
                "\u1E27": "h\u0308",
                // ḧ = \"{h}
                "\u021F": "h\u030C",
                // ȟ = \v{h}
                "\u0125": "h\u0302",
                // ĥ = \^{h}
                "\u1E23": "h\u0307",
                // ḣ = \.{h}
                "\xED": "i\u0301",
                // í = \'{i}
                "\xEC": "i\u0300",
                // ì = \`{i}
                "\xEF": "i\u0308",
                // ï = \"{i}
                "\u1E2F": "i\u0308\u0301",
                // ḯ = \"\'{i}
                "\u0129": "i\u0303",
                // ĩ = \~{i}
                "\u012B": "i\u0304",
                // ī = \={i}
                "\u012D": "i\u0306",
                // ĭ = \u{i}
                "\u01D0": "i\u030C",
                // ǐ = \v{i}
                "\xEE": "i\u0302",
                // î = \^{i}
                "\u01F0": "j\u030C",
                // ǰ = \v{j}
                "\u0135": "j\u0302",
                // ĵ = \^{j}
                "\u1E31": "k\u0301",
                // ḱ = \'{k}
                "\u01E9": "k\u030C",
                // ǩ = \v{k}
                "\u013A": "l\u0301",
                // ĺ = \'{l}
                "\u013E": "l\u030C",
                // ľ = \v{l}
                "\u1E3F": "m\u0301",
                // ḿ = \'{m}
                "\u1E41": "m\u0307",
                // ṁ = \.{m}
                "\u0144": "n\u0301",
                // ń = \'{n}
                "\u01F9": "n\u0300",
                // ǹ = \`{n}
                "\xF1": "n\u0303",
                // ñ = \~{n}
                "\u0148": "n\u030C",
                // ň = \v{n}
                "\u1E45": "n\u0307",
                // ṅ = \.{n}
                "\xF3": "o\u0301",
                // ó = \'{o}
                "\xF2": "o\u0300",
                // ò = \`{o}
                "\xF6": "o\u0308",
                // ö = \"{o}
                "\u022B": "o\u0308\u0304",
                // ȫ = \"\={o}
                "\xF5": "o\u0303",
                // õ = \~{o}
                "\u1E4D": "o\u0303\u0301",
                // ṍ = \~\'{o}
                "\u1E4F": "o\u0303\u0308",
                // ṏ = \~\"{o}
                "\u022D": "o\u0303\u0304",
                // ȭ = \~\={o}
                "\u014D": "o\u0304",
                // ō = \={o}
                "\u1E53": "o\u0304\u0301",
                // ṓ = \=\'{o}
                "\u1E51": "o\u0304\u0300",
                // ṑ = \=\`{o}
                "\u014F": "o\u0306",
                // ŏ = \u{o}
                "\u01D2": "o\u030C",
                // ǒ = \v{o}
                "\xF4": "o\u0302",
                // ô = \^{o}
                "\u1ED1": "o\u0302\u0301",
                // ố = \^\'{o}
                "\u1ED3": "o\u0302\u0300",
                // ồ = \^\`{o}
                "\u1ED7": "o\u0302\u0303",
                // ỗ = \^\~{o}
                "\u022F": "o\u0307",
                // ȯ = \.{o}
                "\u0231": "o\u0307\u0304",
                // ȱ = \.\={o}
                "\u0151": "o\u030B",
                // ő = \H{o}
                "\u1E55": "p\u0301",
                // ṕ = \'{p}
                "\u1E57": "p\u0307",
                // ṗ = \.{p}
                "\u0155": "r\u0301",
                // ŕ = \'{r}
                "\u0159": "r\u030C",
                // ř = \v{r}
                "\u1E59": "r\u0307",
                // ṙ = \.{r}
                "\u015B": "s\u0301",
                // ś = \'{s}
                "\u1E65": "s\u0301\u0307",
                // ṥ = \'\.{s}
                "\u0161": "s\u030C",
                // š = \v{s}
                "\u1E67": "s\u030C\u0307",
                // ṧ = \v\.{s}
                "\u015D": "s\u0302",
                // ŝ = \^{s}
                "\u1E61": "s\u0307",
                // ṡ = \.{s}
                "\u1E97": "t\u0308",
                // ẗ = \"{t}
                "\u0165": "t\u030C",
                // ť = \v{t}
                "\u1E6B": "t\u0307",
                // ṫ = \.{t}
                "\xFA": "u\u0301",
                // ú = \'{u}
                "\xF9": "u\u0300",
                // ù = \`{u}
                "\xFC": "u\u0308",
                // ü = \"{u}
                "\u01D8": "u\u0308\u0301",
                // ǘ = \"\'{u}
                "\u01DC": "u\u0308\u0300",
                // ǜ = \"\`{u}
                "\u01D6": "u\u0308\u0304",
                // ǖ = \"\={u}
                "\u01DA": "u\u0308\u030C",
                // ǚ = \"\v{u}
                "\u0169": "u\u0303",
                // ũ = \~{u}
                "\u1E79": "u\u0303\u0301",
                // ṹ = \~\'{u}
                "\u016B": "u\u0304",
                // ū = \={u}
                "\u1E7B": "u\u0304\u0308",
                // ṻ = \=\"{u}
                "\u016D": "u\u0306",
                // ŭ = \u{u}
                "\u01D4": "u\u030C",
                // ǔ = \v{u}
                "\xFB": "u\u0302",
                // û = \^{u}
                "\u016F": "u\u030A",
                // ů = \r{u}
                "\u0171": "u\u030B",
                // ű = \H{u}
                "\u1E7D": "v\u0303",
                // ṽ = \~{v}
                "\u1E83": "w\u0301",
                // ẃ = \'{w}
                "\u1E81": "w\u0300",
                // ẁ = \`{w}
                "\u1E85": "w\u0308",
                // ẅ = \"{w}
                "\u0175": "w\u0302",
                // ŵ = \^{w}
                "\u1E87": "w\u0307",
                // ẇ = \.{w}
                "\u1E98": "w\u030A",
                // ẘ = \r{w}
                "\u1E8D": "x\u0308",
                // ẍ = \"{x}
                "\u1E8B": "x\u0307",
                // ẋ = \.{x}
                "\xFD": "y\u0301",
                // ý = \'{y}
                "\u1EF3": "y\u0300",
                // ỳ = \`{y}
                "\xFF": "y\u0308",
                // ÿ = \"{y}
                "\u1EF9": "y\u0303",
                // ỹ = \~{y}
                "\u0233": "y\u0304",
                // ȳ = \={y}
                "\u0177": "y\u0302",
                // ŷ = \^{y}
                "\u1E8F": "y\u0307",
                // ẏ = \.{y}
                "\u1E99": "y\u030A",
                // ẙ = \r{y}
                "\u017A": "z\u0301",
                // ź = \'{z}
                "\u017E": "z\u030C",
                // ž = \v{z}
                "\u1E91": "z\u0302",
                // ẑ = \^{z}
                "\u017C": "z\u0307",
                // ż = \.{z}
                "\xC1": "A\u0301",
                // Á = \'{A}
                "\xC0": "A\u0300",
                // À = \`{A}
                "\xC4": "A\u0308",
                // Ä = \"{A}
                "\u01DE": "A\u0308\u0304",
                // Ǟ = \"\={A}
                "\xC3": "A\u0303",
                // Ã = \~{A}
                "\u0100": "A\u0304",
                // Ā = \={A}
                "\u0102": "A\u0306",
                // Ă = \u{A}
                "\u1EAE": "A\u0306\u0301",
                // Ắ = \u\'{A}
                "\u1EB0": "A\u0306\u0300",
                // Ằ = \u\`{A}
                "\u1EB4": "A\u0306\u0303",
                // Ẵ = \u\~{A}
                "\u01CD": "A\u030C",
                // Ǎ = \v{A}
                "\xC2": "A\u0302",
                // Â = \^{A}
                "\u1EA4": "A\u0302\u0301",
                // Ấ = \^\'{A}
                "\u1EA6": "A\u0302\u0300",
                // Ầ = \^\`{A}
                "\u1EAA": "A\u0302\u0303",
                // Ẫ = \^\~{A}
                "\u0226": "A\u0307",
                // Ȧ = \.{A}
                "\u01E0": "A\u0307\u0304",
                // Ǡ = \.\={A}
                "\xC5": "A\u030A",
                // Å = \r{A}
                "\u01FA": "A\u030A\u0301",
                // Ǻ = \r\'{A}
                "\u1E02": "B\u0307",
                // Ḃ = \.{B}
                "\u0106": "C\u0301",
                // Ć = \'{C}
                "\u010C": "C\u030C",
                // Č = \v{C}
                "\u0108": "C\u0302",
                // Ĉ = \^{C}
                "\u010A": "C\u0307",
                // Ċ = \.{C}
                "\u010E": "D\u030C",
                // Ď = \v{D}
                "\u1E0A": "D\u0307",
                // Ḋ = \.{D}
                "\xC9": "E\u0301",
                // É = \'{E}
                "\xC8": "E\u0300",
                // È = \`{E}
                "\xCB": "E\u0308",
                // Ë = \"{E}
                "\u1EBC": "E\u0303",
                // Ẽ = \~{E}
                "\u0112": "E\u0304",
                // Ē = \={E}
                "\u1E16": "E\u0304\u0301",
                // Ḗ = \=\'{E}
                "\u1E14": "E\u0304\u0300",
                // Ḕ = \=\`{E}
                "\u0114": "E\u0306",
                // Ĕ = \u{E}
                "\u011A": "E\u030C",
                // Ě = \v{E}
                "\xCA": "E\u0302",
                // Ê = \^{E}
                "\u1EBE": "E\u0302\u0301",
                // Ế = \^\'{E}
                "\u1EC0": "E\u0302\u0300",
                // Ề = \^\`{E}
                "\u1EC4": "E\u0302\u0303",
                // Ễ = \^\~{E}
                "\u0116": "E\u0307",
                // Ė = \.{E}
                "\u1E1E": "F\u0307",
                // Ḟ = \.{F}
                "\u01F4": "G\u0301",
                // Ǵ = \'{G}
                "\u1E20": "G\u0304",
                // Ḡ = \={G}
                "\u011E": "G\u0306",
                // Ğ = \u{G}
                "\u01E6": "G\u030C",
                // Ǧ = \v{G}
                "\u011C": "G\u0302",
                // Ĝ = \^{G}
                "\u0120": "G\u0307",
                // Ġ = \.{G}
                "\u1E26": "H\u0308",
                // Ḧ = \"{H}
                "\u021E": "H\u030C",
                // Ȟ = \v{H}
                "\u0124": "H\u0302",
                // Ĥ = \^{H}
                "\u1E22": "H\u0307",
                // Ḣ = \.{H}
                "\xCD": "I\u0301",
                // Í = \'{I}
                "\xCC": "I\u0300",
                // Ì = \`{I}
                "\xCF": "I\u0308",
                // Ï = \"{I}
                "\u1E2E": "I\u0308\u0301",
                // Ḯ = \"\'{I}
                "\u0128": "I\u0303",
                // Ĩ = \~{I}
                "\u012A": "I\u0304",
                // Ī = \={I}
                "\u012C": "I\u0306",
                // Ĭ = \u{I}
                "\u01CF": "I\u030C",
                // Ǐ = \v{I}
                "\xCE": "I\u0302",
                // Î = \^{I}
                "\u0130": "I\u0307",
                // İ = \.{I}
                "\u0134": "J\u0302",
                // Ĵ = \^{J}
                "\u1E30": "K\u0301",
                // Ḱ = \'{K}
                "\u01E8": "K\u030C",
                // Ǩ = \v{K}
                "\u0139": "L\u0301",
                // Ĺ = \'{L}
                "\u013D": "L\u030C",
                // Ľ = \v{L}
                "\u1E3E": "M\u0301",
                // Ḿ = \'{M}
                "\u1E40": "M\u0307",
                // Ṁ = \.{M}
                "\u0143": "N\u0301",
                // Ń = \'{N}
                "\u01F8": "N\u0300",
                // Ǹ = \`{N}
                "\xD1": "N\u0303",
                // Ñ = \~{N}
                "\u0147": "N\u030C",
                // Ň = \v{N}
                "\u1E44": "N\u0307",
                // Ṅ = \.{N}
                "\xD3": "O\u0301",
                // Ó = \'{O}
                "\xD2": "O\u0300",
                // Ò = \`{O}
                "\xD6": "O\u0308",
                // Ö = \"{O}
                "\u022A": "O\u0308\u0304",
                // Ȫ = \"\={O}
                "\xD5": "O\u0303",
                // Õ = \~{O}
                "\u1E4C": "O\u0303\u0301",
                // Ṍ = \~\'{O}
                "\u1E4E": "O\u0303\u0308",
                // Ṏ = \~\"{O}
                "\u022C": "O\u0303\u0304",
                // Ȭ = \~\={O}
                "\u014C": "O\u0304",
                // Ō = \={O}
                "\u1E52": "O\u0304\u0301",
                // Ṓ = \=\'{O}
                "\u1E50": "O\u0304\u0300",
                // Ṑ = \=\`{O}
                "\u014E": "O\u0306",
                // Ŏ = \u{O}
                "\u01D1": "O\u030C",
                // Ǒ = \v{O}
                "\xD4": "O\u0302",
                // Ô = \^{O}
                "\u1ED0": "O\u0302\u0301",
                // Ố = \^\'{O}
                "\u1ED2": "O\u0302\u0300",
                // Ồ = \^\`{O}
                "\u1ED6": "O\u0302\u0303",
                // Ỗ = \^\~{O}
                "\u022E": "O\u0307",
                // Ȯ = \.{O}
                "\u0230": "O\u0307\u0304",
                // Ȱ = \.\={O}
                "\u0150": "O\u030B",
                // Ő = \H{O}
                "\u1E54": "P\u0301",
                // Ṕ = \'{P}
                "\u1E56": "P\u0307",
                // Ṗ = \.{P}
                "\u0154": "R\u0301",
                // Ŕ = \'{R}
                "\u0158": "R\u030C",
                // Ř = \v{R}
                "\u1E58": "R\u0307",
                // Ṙ = \.{R}
                "\u015A": "S\u0301",
                // Ś = \'{S}
                "\u1E64": "S\u0301\u0307",
                // Ṥ = \'\.{S}
                "\u0160": "S\u030C",
                // Š = \v{S}
                "\u1E66": "S\u030C\u0307",
                // Ṧ = \v\.{S}
                "\u015C": "S\u0302",
                // Ŝ = \^{S}
                "\u1E60": "S\u0307",
                // Ṡ = \.{S}
                "\u0164": "T\u030C",
                // Ť = \v{T}
                "\u1E6A": "T\u0307",
                // Ṫ = \.{T}
                "\xDA": "U\u0301",
                // Ú = \'{U}
                "\xD9": "U\u0300",
                // Ù = \`{U}
                "\xDC": "U\u0308",
                // Ü = \"{U}
                "\u01D7": "U\u0308\u0301",
                // Ǘ = \"\'{U}
                "\u01DB": "U\u0308\u0300",
                // Ǜ = \"\`{U}
                "\u01D5": "U\u0308\u0304",
                // Ǖ = \"\={U}
                "\u01D9": "U\u0308\u030C",
                // Ǚ = \"\v{U}
                "\u0168": "U\u0303",
                // Ũ = \~{U}
                "\u1E78": "U\u0303\u0301",
                // Ṹ = \~\'{U}
                "\u016A": "U\u0304",
                // Ū = \={U}
                "\u1E7A": "U\u0304\u0308",
                // Ṻ = \=\"{U}
                "\u016C": "U\u0306",
                // Ŭ = \u{U}
                "\u01D3": "U\u030C",
                // Ǔ = \v{U}
                "\xDB": "U\u0302",
                // Û = \^{U}
                "\u016E": "U\u030A",
                // Ů = \r{U}
                "\u0170": "U\u030B",
                // Ű = \H{U}
                "\u1E7C": "V\u0303",
                // Ṽ = \~{V}
                "\u1E82": "W\u0301",
                // Ẃ = \'{W}
                "\u1E80": "W\u0300",
                // Ẁ = \`{W}
                "\u1E84": "W\u0308",
                // Ẅ = \"{W}
                "\u0174": "W\u0302",
                // Ŵ = \^{W}
                "\u1E86": "W\u0307",
                // Ẇ = \.{W}
                "\u1E8C": "X\u0308",
                // Ẍ = \"{X}
                "\u1E8A": "X\u0307",
                // Ẋ = \.{X}
                "\xDD": "Y\u0301",
                // Ý = \'{Y}
                "\u1EF2": "Y\u0300",
                // Ỳ = \`{Y}
                "\u0178": "Y\u0308",
                // Ÿ = \"{Y}
                "\u1EF8": "Y\u0303",
                // Ỹ = \~{Y}
                "\u0232": "Y\u0304",
                // Ȳ = \={Y}
                "\u0176": "Y\u0302",
                // Ŷ = \^{Y}
                "\u1E8E": "Y\u0307",
                // Ẏ = \.{Y}
                "\u0179": "Z\u0301",
                // Ź = \'{Z}
                "\u017D": "Z\u030C",
                // Ž = \v{Z}
                "\u1E90": "Z\u0302",
                // Ẑ = \^{Z}
                "\u017B": "Z\u0307",
                // Ż = \.{Z}
                "\u03AC": "\u03B1\u0301",
                // ά = \'{α}
                "\u1F70": "\u03B1\u0300",
                // ὰ = \`{α}
                "\u1FB1": "\u03B1\u0304",
                // ᾱ = \={α}
                "\u1FB0": "\u03B1\u0306",
                // ᾰ = \u{α}
                "\u03AD": "\u03B5\u0301",
                // έ = \'{ε}
                "\u1F72": "\u03B5\u0300",
                // ὲ = \`{ε}
                "\u03AE": "\u03B7\u0301",
                // ή = \'{η}
                "\u1F74": "\u03B7\u0300",
                // ὴ = \`{η}
                "\u03AF": "\u03B9\u0301",
                // ί = \'{ι}
                "\u1F76": "\u03B9\u0300",
                // ὶ = \`{ι}
                "\u03CA": "\u03B9\u0308",
                // ϊ = \"{ι}
                "\u0390": "\u03B9\u0308\u0301",
                // ΐ = \"\'{ι}
                "\u1FD2": "\u03B9\u0308\u0300",
                // ῒ = \"\`{ι}
                "\u1FD1": "\u03B9\u0304",
                // ῑ = \={ι}
                "\u1FD0": "\u03B9\u0306",
                // ῐ = \u{ι}
                "\u03CC": "\u03BF\u0301",
                // ό = \'{ο}
                "\u1F78": "\u03BF\u0300",
                // ὸ = \`{ο}
                "\u03CD": "\u03C5\u0301",
                // ύ = \'{υ}
                "\u1F7A": "\u03C5\u0300",
                // ὺ = \`{υ}
                "\u03CB": "\u03C5\u0308",
                // ϋ = \"{υ}
                "\u03B0": "\u03C5\u0308\u0301",
                // ΰ = \"\'{υ}
                "\u1FE2": "\u03C5\u0308\u0300",
                // ῢ = \"\`{υ}
                "\u1FE1": "\u03C5\u0304",
                // ῡ = \={υ}
                "\u1FE0": "\u03C5\u0306",
                // ῠ = \u{υ}
                "\u03CE": "\u03C9\u0301",
                // ώ = \'{ω}
                "\u1F7C": "\u03C9\u0300",
                // ὼ = \`{ω}
                "\u038E": "\u03A5\u0301",
                // Ύ = \'{Υ}
                "\u1FEA": "\u03A5\u0300",
                // Ὺ = \`{Υ}
                "\u03AB": "\u03A5\u0308",
                // Ϋ = \"{Υ}
                "\u1FE9": "\u03A5\u0304",
                // Ῡ = \={Υ}
                "\u1FE8": "\u03A5\u0306",
                // Ῠ = \u{Υ}
                "\u038F": "\u03A9\u0301",
                // Ώ = \'{Ω}
                "\u1FFA": "\u03A9\u0300"
                // Ὼ = \`{Ω}
              };
              var Parser_Parser = /* @__PURE__ */ (function() {
                function Parser(input, settings) {
                  this.mode = void 0;
                  this.gullet = void 0;
                  this.settings = void 0;
                  this.leftrightDepth = void 0;
                  this.nextToken = void 0;
                  this.mode = "math";
                  this.gullet = new MacroExpander_MacroExpander(input, settings, this.mode);
                  this.settings = settings;
                  this.leftrightDepth = 0;
                }
                var _proto = Parser.prototype;
                _proto.expect = function expect(text, consume) {
                  if (consume === void 0) {
                    consume = true;
                  }
                  if (this.fetch().text !== text) {
                    throw new src_ParseError("Expected '" + text + "', got '" + this.fetch().text + "'", this.fetch());
                  }
                  if (consume) {
                    this.consume();
                  }
                };
                _proto.consume = function consume() {
                  this.nextToken = null;
                };
                _proto.fetch = function fetch() {
                  if (this.nextToken == null) {
                    this.nextToken = this.gullet.expandNextToken();
                  }
                  return this.nextToken;
                };
                _proto.switchMode = function switchMode(newMode) {
                  this.mode = newMode;
                  this.gullet.switchMode(newMode);
                };
                _proto.parse = function parse() {
                  this.gullet.beginGroup();
                  if (this.settings.colorIsTextColor) {
                    this.gullet.macros.set("\\color", "\\textcolor");
                  }
                  var parse2 = this.parseExpression(false);
                  this.expect("EOF");
                  this.gullet.endGroup();
                  return parse2;
                };
                _proto.parseExpression = function parseExpression(breakOnInfix, breakOnTokenText) {
                  var body = [];
                  while (true) {
                    if (this.mode === "math") {
                      this.consumeSpaces();
                    }
                    var lex = this.fetch();
                    if (Parser.endOfExpression.indexOf(lex.text) !== -1) {
                      break;
                    }
                    if (breakOnTokenText && lex.text === breakOnTokenText) {
                      break;
                    }
                    if (breakOnInfix && src_functions[lex.text] && src_functions[lex.text].infix) {
                      break;
                    }
                    var atom = this.parseAtom(breakOnTokenText);
                    if (!atom) {
                      break;
                    }
                    body.push(atom);
                  }
                  if (this.mode === "text") {
                    this.formLigatures(body);
                  }
                  return this.handleInfixNodes(body);
                };
                _proto.handleInfixNodes = function handleInfixNodes(body) {
                  var overIndex = -1;
                  var funcName;
                  for (var i = 0; i < body.length; i++) {
                    var node = checkNodeType(body[i], "infix");
                    if (node) {
                      if (overIndex !== -1) {
                        throw new src_ParseError("only one infix operator per group", node.token);
                      }
                      overIndex = i;
                      funcName = node.replaceWith;
                    }
                  }
                  if (overIndex !== -1 && funcName) {
                    var numerNode;
                    var denomNode;
                    var numerBody = body.slice(0, overIndex);
                    var denomBody = body.slice(overIndex + 1);
                    if (numerBody.length === 1 && numerBody[0].type === "ordgroup") {
                      numerNode = numerBody[0];
                    } else {
                      numerNode = {
                        type: "ordgroup",
                        mode: this.mode,
                        body: numerBody
                      };
                    }
                    if (denomBody.length === 1 && denomBody[0].type === "ordgroup") {
                      denomNode = denomBody[0];
                    } else {
                      denomNode = {
                        type: "ordgroup",
                        mode: this.mode,
                        body: denomBody
                      };
                    }
                    var _node;
                    if (funcName === "\\\\abovefrac") {
                      _node = this.callFunction(funcName, [numerNode, body[overIndex], denomNode], []);
                    } else {
                      _node = this.callFunction(funcName, [numerNode, denomNode], []);
                    }
                    return [_node];
                  } else {
                    return body;
                  }
                };
                _proto.handleSupSubscript = function handleSupSubscript(name) {
                  var symbolToken = this.fetch();
                  var symbol = symbolToken.text;
                  this.consume();
                  var group = this.parseGroup(name, false, Parser.SUPSUB_GREEDINESS, void 0, void 0, true);
                  if (!group) {
                    throw new src_ParseError("Expected group after '" + symbol + "'", symbolToken);
                  }
                  return group;
                };
                _proto.formatUnsupportedCmd = function formatUnsupportedCmd(text) {
                  var textordArray = [];
                  for (var i = 0; i < text.length; i++) {
                    textordArray.push({
                      type: "textord",
                      mode: "text",
                      text: text[i]
                    });
                  }
                  var textNode = {
                    type: "text",
                    mode: this.mode,
                    body: textordArray
                  };
                  var colorNode = {
                    type: "color",
                    mode: this.mode,
                    color: this.settings.errorColor,
                    body: [textNode]
                  };
                  return colorNode;
                };
                _proto.parseAtom = function parseAtom(breakOnTokenText) {
                  var base = this.parseGroup("atom", false, null, breakOnTokenText);
                  if (this.mode === "text") {
                    return base;
                  }
                  var superscript;
                  var subscript;
                  while (true) {
                    this.consumeSpaces();
                    var lex = this.fetch();
                    if (lex.text === "\\limits" || lex.text === "\\nolimits") {
                      var opNode = checkNodeType(base, "op");
                      if (opNode) {
                        var limits = lex.text === "\\limits";
                        opNode.limits = limits;
                        opNode.alwaysHandleSupSub = true;
                      } else {
                        opNode = checkNodeType(base, "operatorname");
                        if (opNode && opNode.alwaysHandleSupSub) {
                          var _limits = lex.text === "\\limits";
                          opNode.limits = _limits;
                        } else {
                          throw new src_ParseError("Limit controls must follow a math operator", lex);
                        }
                      }
                      this.consume();
                    } else if (lex.text === "^") {
                      if (superscript) {
                        throw new src_ParseError("Double superscript", lex);
                      }
                      superscript = this.handleSupSubscript("superscript");
                    } else if (lex.text === "_") {
                      if (subscript) {
                        throw new src_ParseError("Double subscript", lex);
                      }
                      subscript = this.handleSupSubscript("subscript");
                    } else if (lex.text === "'") {
                      if (superscript) {
                        throw new src_ParseError("Double superscript", lex);
                      }
                      var prime = {
                        type: "textord",
                        mode: this.mode,
                        text: "\\prime"
                      };
                      var primes = [prime];
                      this.consume();
                      while (this.fetch().text === "'") {
                        primes.push(prime);
                        this.consume();
                      }
                      if (this.fetch().text === "^") {
                        primes.push(this.handleSupSubscript("superscript"));
                      }
                      superscript = {
                        type: "ordgroup",
                        mode: this.mode,
                        body: primes
                      };
                    } else {
                      break;
                    }
                  }
                  if (superscript || subscript) {
                    return {
                      type: "supsub",
                      mode: this.mode,
                      base,
                      sup: superscript,
                      sub: subscript
                    };
                  } else {
                    return base;
                  }
                };
                _proto.parseFunction = function parseFunction(breakOnTokenText, name, greediness) {
                  var token = this.fetch();
                  var func = token.text;
                  var funcData = src_functions[func];
                  if (!funcData) {
                    return null;
                  }
                  this.consume();
                  if (greediness != null && funcData.greediness <= greediness) {
                    throw new src_ParseError("Got function '" + func + "' with no arguments" + (name ? " as " + name : ""), token);
                  } else if (this.mode === "text" && !funcData.allowedInText) {
                    throw new src_ParseError("Can't use function '" + func + "' in text mode", token);
                  } else if (this.mode === "math" && funcData.allowedInMath === false) {
                    throw new src_ParseError("Can't use function '" + func + "' in math mode", token);
                  }
                  var _this$parseArguments = this.parseArguments(func, funcData), args = _this$parseArguments.args, optArgs = _this$parseArguments.optArgs;
                  return this.callFunction(func, args, optArgs, token, breakOnTokenText);
                };
                _proto.callFunction = function callFunction(name, args, optArgs, token, breakOnTokenText) {
                  var context = {
                    funcName: name,
                    parser: this,
                    token,
                    breakOnTokenText
                  };
                  var func = src_functions[name];
                  if (func && func.handler) {
                    return func.handler(context, args, optArgs);
                  } else {
                    throw new src_ParseError("No function handler for " + name);
                  }
                };
                _proto.parseArguments = function parseArguments(func, funcData) {
                  var totalArgs = funcData.numArgs + funcData.numOptionalArgs;
                  if (totalArgs === 0) {
                    return {
                      args: [],
                      optArgs: []
                    };
                  }
                  var baseGreediness = funcData.greediness;
                  var args = [];
                  var optArgs = [];
                  for (var i = 0; i < totalArgs; i++) {
                    var argType = funcData.argTypes && funcData.argTypes[i];
                    var isOptional = i < funcData.numOptionalArgs;
                    var consumeSpaces = i > 0 && !isOptional || // Also consume leading spaces in math mode, as parseSymbol
                    // won't know what to do with them.  This can only happen with
                    // macros, e.g. \frac\foo\foo where \foo expands to a space symbol.
                    // In LaTeX, the \foo's get treated as (blank) arguments.
                    // In KaTeX, for now, both spaces will get consumed.
                    // TODO(edemaine)
                    i === 0 && !isOptional && this.mode === "math";
                    var arg = this.parseGroupOfType("argument to '" + func + "'", argType, isOptional, baseGreediness, consumeSpaces);
                    if (!arg) {
                      if (isOptional) {
                        optArgs.push(null);
                        continue;
                      }
                      throw new src_ParseError("Expected group after '" + func + "'", this.fetch());
                    }
                    (isOptional ? optArgs : args).push(arg);
                  }
                  return {
                    args,
                    optArgs
                  };
                };
                _proto.parseGroupOfType = function parseGroupOfType(name, type, optional, greediness, consumeSpaces) {
                  switch (type) {
                    case "color":
                      if (consumeSpaces) {
                        this.consumeSpaces();
                      }
                      return this.parseColorGroup(optional);
                    case "size":
                      if (consumeSpaces) {
                        this.consumeSpaces();
                      }
                      return this.parseSizeGroup(optional);
                    case "url":
                      return this.parseUrlGroup(optional, consumeSpaces);
                    case "math":
                    case "text":
                      return this.parseGroup(name, optional, greediness, void 0, type, consumeSpaces);
                    case "hbox": {
                      var group = this.parseGroup(name, optional, greediness, void 0, "text", consumeSpaces);
                      if (!group) {
                        return group;
                      }
                      var styledGroup = {
                        type: "styling",
                        mode: group.mode,
                        body: [group],
                        style: "text"
                        // simulate \textstyle
                      };
                      return styledGroup;
                    }
                    case "raw": {
                      if (consumeSpaces) {
                        this.consumeSpaces();
                      }
                      if (optional && this.fetch().text === "{") {
                        return null;
                      }
                      var token = this.parseStringGroup("raw", optional, true);
                      if (token) {
                        return {
                          type: "raw",
                          mode: "text",
                          string: token.text
                        };
                      } else {
                        throw new src_ParseError("Expected raw group", this.fetch());
                      }
                    }
                    case "original":
                    case null:
                    case void 0:
                      return this.parseGroup(name, optional, greediness, void 0, void 0, consumeSpaces);
                    default:
                      throw new src_ParseError("Unknown group type as " + name, this.fetch());
                  }
                };
                _proto.consumeSpaces = function consumeSpaces() {
                  while (this.fetch().text === " ") {
                    this.consume();
                  }
                };
                _proto.parseStringGroup = function parseStringGroup(modeName, optional, raw) {
                  var groupBegin = optional ? "[" : "{";
                  var groupEnd = optional ? "]" : "}";
                  var beginToken = this.fetch();
                  if (beginToken.text !== groupBegin) {
                    if (optional) {
                      return null;
                    } else if (raw && beginToken.text !== "EOF" && /[^{}[\]]/.test(beginToken.text)) {
                      this.consume();
                      return beginToken;
                    }
                  }
                  var outerMode = this.mode;
                  this.mode = "text";
                  this.expect(groupBegin);
                  var str = "";
                  var firstToken = this.fetch();
                  var nested = 0;
                  var lastToken = firstToken;
                  var nextToken;
                  while ((nextToken = this.fetch()).text !== groupEnd || raw && nested > 0) {
                    switch (nextToken.text) {
                      case "EOF":
                        throw new src_ParseError("Unexpected end of input in " + modeName, firstToken.range(lastToken, str));
                      case groupBegin:
                        nested++;
                        break;
                      case groupEnd:
                        nested--;
                        break;
                    }
                    lastToken = nextToken;
                    str += lastToken.text;
                    this.consume();
                  }
                  this.expect(groupEnd);
                  this.mode = outerMode;
                  return firstToken.range(lastToken, str);
                };
                _proto.parseRegexGroup = function parseRegexGroup(regex, modeName) {
                  var outerMode = this.mode;
                  this.mode = "text";
                  var firstToken = this.fetch();
                  var lastToken = firstToken;
                  var str = "";
                  var nextToken;
                  while ((nextToken = this.fetch()).text !== "EOF" && regex.test(str + nextToken.text)) {
                    lastToken = nextToken;
                    str += lastToken.text;
                    this.consume();
                  }
                  if (str === "") {
                    throw new src_ParseError("Invalid " + modeName + ": '" + firstToken.text + "'", firstToken);
                  }
                  this.mode = outerMode;
                  return firstToken.range(lastToken, str);
                };
                _proto.parseColorGroup = function parseColorGroup(optional) {
                  var res = this.parseStringGroup("color", optional);
                  if (!res) {
                    return null;
                  }
                  var match = /^(#[a-f0-9]{3}|#?[a-f0-9]{6}|[a-z]+)$/i.exec(res.text);
                  if (!match) {
                    throw new src_ParseError("Invalid color: '" + res.text + "'", res);
                  }
                  var color = match[0];
                  if (/^[0-9a-f]{6}$/i.test(color)) {
                    color = "#" + color;
                  }
                  return {
                    type: "color-token",
                    mode: this.mode,
                    color
                  };
                };
                _proto.parseSizeGroup = function parseSizeGroup(optional) {
                  var res;
                  var isBlank = false;
                  if (!optional && this.fetch().text !== "{") {
                    res = this.parseRegexGroup(/^[-+]? *(?:$|\d+|\d+\.\d*|\.\d*) *[a-z]{0,2} *$/, "size");
                  } else {
                    res = this.parseStringGroup("size", optional);
                  }
                  if (!res) {
                    return null;
                  }
                  if (!optional && res.text.length === 0) {
                    res.text = "0pt";
                    isBlank = true;
                  }
                  var match = /([-+]?) *(\d+(?:\.\d*)?|\.\d+) *([a-z]{2})/.exec(res.text);
                  if (!match) {
                    throw new src_ParseError("Invalid size: '" + res.text + "'", res);
                  }
                  var data = {
                    number: +(match[1] + match[2]),
                    // sign + magnitude, cast to number
                    unit: match[3]
                  };
                  if (!validUnit(data)) {
                    throw new src_ParseError("Invalid unit: '" + data.unit + "'", res);
                  }
                  return {
                    type: "size",
                    mode: this.mode,
                    value: data,
                    isBlank
                  };
                };
                _proto.parseUrlGroup = function parseUrlGroup(optional, consumeSpaces) {
                  this.gullet.lexer.setCatcode("%", 13);
                  var res = this.parseStringGroup("url", optional, true);
                  this.gullet.lexer.setCatcode("%", 14);
                  if (!res) {
                    return null;
                  }
                  var url = res.text.replace(/\\([#$%&~_^{}])/g, "$1");
                  return {
                    type: "url",
                    mode: this.mode,
                    url
                  };
                };
                _proto.parseGroup = function parseGroup(name, optional, greediness, breakOnTokenText, mode, consumeSpaces) {
                  var outerMode = this.mode;
                  if (mode) {
                    this.switchMode(mode);
                  }
                  if (consumeSpaces) {
                    this.consumeSpaces();
                  }
                  var firstToken = this.fetch();
                  var text = firstToken.text;
                  var result;
                  if (optional ? text === "[" : text === "{" || text === "\\begingroup") {
                    this.consume();
                    var groupEnd = Parser.endOfGroup[text];
                    this.gullet.beginGroup();
                    var expression = this.parseExpression(false, groupEnd);
                    var lastToken = this.fetch();
                    this.expect(groupEnd);
                    this.gullet.endGroup();
                    result = {
                      type: "ordgroup",
                      mode: this.mode,
                      loc: SourceLocation.range(firstToken, lastToken),
                      body: expression,
                      // A group formed by \begingroup...\endgroup is a semi-simple group
                      // which doesn't affect spacing in math mode, i.e., is transparent.
                      // https://tex.stackexchange.com/questions/1930/when-should-one-
                      // use-begingroup-instead-of-bgroup
                      semisimple: text === "\\begingroup" || void 0
                    };
                  } else if (optional) {
                    result = null;
                  } else {
                    result = this.parseFunction(breakOnTokenText, name, greediness) || this.parseSymbol();
                    if (result == null && text[0] === "\\" && !implicitCommands.hasOwnProperty(text)) {
                      if (this.settings.throwOnError) {
                        throw new src_ParseError("Undefined control sequence: " + text, firstToken);
                      }
                      result = this.formatUnsupportedCmd(text);
                      this.consume();
                    }
                  }
                  if (mode) {
                    this.switchMode(outerMode);
                  }
                  return result;
                };
                _proto.formLigatures = function formLigatures(group) {
                  var n = group.length - 1;
                  for (var i = 0; i < n; ++i) {
                    var a = group[i];
                    var v = a.text;
                    if (v === "-" && group[i + 1].text === "-") {
                      if (i + 1 < n && group[i + 2].text === "-") {
                        group.splice(i, 3, {
                          type: "textord",
                          mode: "text",
                          loc: SourceLocation.range(a, group[i + 2]),
                          text: "---"
                        });
                        n -= 2;
                      } else {
                        group.splice(i, 2, {
                          type: "textord",
                          mode: "text",
                          loc: SourceLocation.range(a, group[i + 1]),
                          text: "--"
                        });
                        n -= 1;
                      }
                    }
                    if ((v === "'" || v === "`") && group[i + 1].text === v) {
                      group.splice(i, 2, {
                        type: "textord",
                        mode: "text",
                        loc: SourceLocation.range(a, group[i + 1]),
                        text: v + v
                      });
                      n -= 1;
                    }
                  }
                };
                _proto.parseSymbol = function parseSymbol() {
                  var nucleus = this.fetch();
                  var text = nucleus.text;
                  if (/^\\verb[^a-zA-Z]/.test(text)) {
                    this.consume();
                    var arg = text.slice(5);
                    var star = arg.charAt(0) === "*";
                    if (star) {
                      arg = arg.slice(1);
                    }
                    if (arg.length < 2 || arg.charAt(0) !== arg.slice(-1)) {
                      throw new src_ParseError("\\verb assertion failed --\n                    please report what input caused this bug");
                    }
                    arg = arg.slice(1, -1);
                    return {
                      type: "verb",
                      mode: "text",
                      body: arg,
                      star
                    };
                  }
                  if (unicodeSymbols.hasOwnProperty(text[0]) && !src_symbols[this.mode][text[0]]) {
                    if (this.settings.strict && this.mode === "math") {
                      this.settings.reportNonstrict("unicodeTextInMathMode", 'Accented Unicode text character "' + text[0] + '" used in math mode', nucleus);
                    }
                    text = unicodeSymbols[text[0]] + text.substr(1);
                  }
                  var match = combiningDiacriticalMarksEndRegex.exec(text);
                  if (match) {
                    text = text.substring(0, match.index);
                    if (text === "i") {
                      text = "\u0131";
                    } else if (text === "j") {
                      text = "\u0237";
                    }
                  }
                  var symbol;
                  if (src_symbols[this.mode][text]) {
                    if (this.settings.strict && this.mode === "math" && extraLatin.indexOf(text) >= 0) {
                      this.settings.reportNonstrict("unicodeTextInMathMode", 'Latin-1/Unicode text character "' + text[0] + '" used in math mode', nucleus);
                    }
                    var group = src_symbols[this.mode][text].group;
                    var loc = SourceLocation.range(nucleus);
                    var s;
                    if (ATOMS.hasOwnProperty(group)) {
                      var family = group;
                      s = {
                        type: "atom",
                        mode: this.mode,
                        family,
                        loc,
                        text
                      };
                    } else {
                      s = {
                        type: group,
                        mode: this.mode,
                        loc,
                        text
                      };
                    }
                    symbol = s;
                  } else if (text.charCodeAt(0) >= 128) {
                    if (this.settings.strict) {
                      if (!supportedCodepoint(text.charCodeAt(0))) {
                        this.settings.reportNonstrict("unknownSymbol", 'Unrecognized Unicode character "' + text[0] + '"' + (" (" + text.charCodeAt(0) + ")"), nucleus);
                      } else if (this.mode === "math") {
                        this.settings.reportNonstrict("unicodeTextInMathMode", 'Unicode text character "' + text[0] + '" used in math mode', nucleus);
                      }
                    }
                    symbol = {
                      type: "textord",
                      mode: "text",
                      loc: SourceLocation.range(nucleus),
                      text
                    };
                  } else {
                    return null;
                  }
                  this.consume();
                  if (match) {
                    for (var i = 0; i < match[0].length; i++) {
                      var accent = match[0][i];
                      if (!unicodeAccents[accent]) {
                        throw new src_ParseError("Unknown accent ' " + accent + "'", nucleus);
                      }
                      var command = unicodeAccents[accent][this.mode];
                      if (!command) {
                        throw new src_ParseError("Accent " + accent + " unsupported in " + this.mode + " mode", nucleus);
                      }
                      symbol = {
                        type: "accent",
                        mode: this.mode,
                        loc: SourceLocation.range(nucleus),
                        label: command,
                        isStretchy: false,
                        isShifty: true,
                        base: symbol
                      };
                    }
                  }
                  return symbol;
                };
                return Parser;
              })();
              Parser_Parser.endOfExpression = ["}", "\\endgroup", "\\end", "\\right", "&"];
              Parser_Parser.endOfGroup = {
                "[": "]",
                "{": "}",
                "\\begingroup": "\\endgroup"
                /**
                 * Parses an "expression", which is a list of atoms.
                 *
                 * `breakOnInfix`: Should the parsing stop when we hit infix nodes? This
                 *                 happens when functions have higher precendence han infix
                 *                 nodes in implicit parses.
                 *
                 * `breakOnTokenText`: The text of the token that the expression should end
                 *                     with, or `null` if something else should end the
                 *                     expression.
                 */
              };
              Parser_Parser.SUPSUB_GREEDINESS = 1;
              var parseTree_parseTree = function parseTree(toParse, settings) {
                if (!(typeof toParse === "string" || toParse instanceof String)) {
                  throw new TypeError("KaTeX can only parse string typed expression");
                }
                var parser = new Parser_Parser(toParse, settings);
                delete parser.gullet.macros.current["\\df@tag"];
                var tree = parser.parse();
                if (parser.gullet.macros.get("\\df@tag")) {
                  if (!settings.displayMode) {
                    throw new src_ParseError("\\tag works only in display equations");
                  }
                  parser.gullet.feed("\\df@tag");
                  tree = [{
                    type: "tag",
                    mode: "text",
                    body: tree,
                    tag: parser.parse()
                  }];
                }
                return tree;
              };
              var src_parseTree = parseTree_parseTree;
              var katex_render = function render(expression, baseNode, options) {
                baseNode.textContent = "";
                var node = katex_renderToDomTree(expression, options).toNode();
                baseNode.appendChild(node);
              };
              if (typeof document !== "undefined") {
                if (document.compatMode !== "CSS1Compat") {
                  typeof console !== "undefined" && console.warn("Warning: KaTeX doesn't work in quirks mode. Make sure your website has a suitable doctype.");
                  katex_render = function render() {
                    throw new src_ParseError("KaTeX doesn't work in quirks mode.");
                  };
                }
              }
              var renderToString = function renderToString2(expression, options) {
                var markup = katex_renderToDomTree(expression, options).toMarkup();
                return markup;
              };
              var katex_generateParseTree = function generateParseTree(expression, options) {
                var settings = new Settings_Settings(options);
                return src_parseTree(expression, settings);
              };
              var katex_renderError = function renderError(error, expression, options) {
                if (options.throwOnError || !(error instanceof src_ParseError)) {
                  throw error;
                }
                var node = buildCommon.makeSpan(["katex-error"], [new domTree_SymbolNode(expression)]);
                node.setAttribute("title", error.toString());
                node.setAttribute("style", "color:" + options.errorColor);
                return node;
              };
              var katex_renderToDomTree = function renderToDomTree(expression, options) {
                var settings = new Settings_Settings(options);
                try {
                  var tree = src_parseTree(expression, settings);
                  return buildTree_buildTree(tree, expression, settings);
                } catch (error) {
                  return katex_renderError(error, expression, settings);
                }
              };
              var katex_renderToHTMLTree = function renderToHTMLTree(expression, options) {
                var settings = new Settings_Settings(options);
                try {
                  var tree = src_parseTree(expression, settings);
                  return buildTree_buildHTMLTree(tree, expression, settings);
                } catch (error) {
                  return katex_renderError(error, expression, settings);
                }
              };
              var katex_0 = {
                /**
                 * Current KaTeX version
                 */
                version: "0.11.1",
                /**
                 * Renders the given LaTeX into an HTML+MathML combination, and adds
                 * it as a child to the specified DOM node.
                 */
                render: katex_render,
                /**
                 * Renders the given LaTeX into an HTML+MathML combination string,
                 * for sending to the client.
                 */
                renderToString,
                /**
                 * KaTeX error, usually during parsing.
                 */
                ParseError: src_ParseError,
                /**
                 * Parses the given LaTeX into KaTeX's internal parse tree structure,
                 * without rendering to HTML or MathML.
                 *
                 * NOTE: This method is not currently recommended for public use.
                 * The internal tree representation is unstable and is very likely
                 * to change. Use at your own risk.
                 */
                __parse: katex_generateParseTree,
                /**
                 * Renders the given LaTeX into an HTML+MathML internal DOM tree
                 * representation, without flattening that representation to a string.
                 *
                 * NOTE: This method is not currently recommended for public use.
                 * The internal tree representation is unstable and is very likely
                 * to change. Use at your own risk.
                 */
                __renderToDomTree: katex_renderToDomTree,
                /**
                 * Renders the given LaTeX into an HTML internal DOM tree representation,
                 * without MathML and without flattening that representation to a string.
                 *
                 * NOTE: This method is not currently recommended for public use.
                 * The internal tree representation is unstable and is very likely
                 * to change. Use at your own risk.
                 */
                __renderToHTMLTree: katex_renderToHTMLTree,
                /**
                 * extends internal font metrics object with a new object
                 * each key in the new object represents a font name
                */
                __setFontMetrics: setFontMetrics,
                /**
                 * adds a new symbol to builtin symbols table
                 */
                __defineSymbol: defineSymbol,
                /**
                 * adds a new macro to builtin macro list
                 */
                __defineMacro: defineMacro,
                /**
                 * Expose the dom tree node types, which can be useful for type checking nodes.
                 *
                 * NOTE: This method is not currently recommended for public use.
                 * The internal tree representation is unstable and is very likely
                 * to change. Use at your own risk.
                 */
                __domTree: {
                  Span: domTree_Span,
                  Anchor: domTree_Anchor,
                  SymbolNode: domTree_SymbolNode,
                  SvgNode,
                  PathNode: domTree_PathNode,
                  LineNode
                }
              };
              var katex_webpack = __webpack_exports__["default"] = katex_0;
            })
            /******/
          ])["default"]
        );
      });
    }
  });

  // node_modules/katex/dist/contrib/auto-render.js
  var require_auto_render = __commonJS({
    "node_modules/katex/dist/contrib/auto-render.js"(exports, module) {
      (function webpackUniversalModuleDefinition(root, factory) {
        if (typeof exports === "object" && typeof module === "object")
          module.exports = factory(require_katex());
        else if (typeof define === "function" && define.amd)
          define(["katex"], factory);
        else if (typeof exports === "object")
          exports["renderMathInElement"] = factory(require_katex());
        else
          root["renderMathInElement"] = factory(root["katex"]);
      })(typeof self !== "undefined" ? self : exports, function(__WEBPACK_EXTERNAL_MODULE__0__) {
        return (
          /******/
          (function(modules) {
            var installedModules = {};
            function __webpack_require__(moduleId) {
              if (installedModules[moduleId]) {
                return installedModules[moduleId].exports;
              }
              var module2 = installedModules[moduleId] = {
                /******/
                i: moduleId,
                /******/
                l: false,
                /******/
                exports: {}
                /******/
              };
              modules[moduleId].call(module2.exports, module2, module2.exports, __webpack_require__);
              module2.l = true;
              return module2.exports;
            }
            __webpack_require__.m = modules;
            __webpack_require__.c = installedModules;
            __webpack_require__.d = function(exports2, name, getter) {
              if (!__webpack_require__.o(exports2, name)) {
                Object.defineProperty(exports2, name, { enumerable: true, get: getter });
              }
            };
            __webpack_require__.r = function(exports2) {
              if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
                Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
              }
              Object.defineProperty(exports2, "__esModule", { value: true });
            };
            __webpack_require__.t = function(value, mode) {
              if (mode & 1) value = __webpack_require__(value);
              if (mode & 8) return value;
              if (mode & 4 && typeof value === "object" && value && value.__esModule) return value;
              var ns = /* @__PURE__ */ Object.create(null);
              __webpack_require__.r(ns);
              Object.defineProperty(ns, "default", { enumerable: true, value });
              if (mode & 2 && typeof value != "string") for (var key in value) __webpack_require__.d(ns, key, function(key2) {
                return value[key2];
              }.bind(null, key));
              return ns;
            };
            __webpack_require__.n = function(module2) {
              var getter = module2 && module2.__esModule ? (
                /******/
                function getDefault() {
                  return module2["default"];
                }
              ) : (
                /******/
                function getModuleExports() {
                  return module2;
                }
              );
              __webpack_require__.d(getter, "a", getter);
              return getter;
            };
            __webpack_require__.o = function(object, property) {
              return Object.prototype.hasOwnProperty.call(object, property);
            };
            __webpack_require__.p = "";
            return __webpack_require__(__webpack_require__.s = 1);
          })([
            /* 0 */
            /***/
            (function(module2, exports2) {
              module2.exports = __WEBPACK_EXTERNAL_MODULE__0__;
            }),
            /* 1 */
            /***/
            (function(module2, __webpack_exports__, __webpack_require__) {
              "use strict";
              __webpack_require__.r(__webpack_exports__);
              var external_katex_ = __webpack_require__(0);
              var external_katex_default = /* @__PURE__ */ __webpack_require__.n(external_katex_);
              var findEndOfMath = function findEndOfMath2(delimiter, text, startIndex) {
                var index = startIndex;
                var braceLevel = 0;
                var delimLength = delimiter.length;
                while (index < text.length) {
                  var character = text[index];
                  if (braceLevel <= 0 && text.slice(index, index + delimLength) === delimiter) {
                    return index;
                  } else if (character === "\\") {
                    index++;
                  } else if (character === "{") {
                    braceLevel++;
                  } else if (character === "}") {
                    braceLevel--;
                  }
                  index++;
                }
                return -1;
              };
              var splitAtDelimiters = function splitAtDelimiters2(startData, leftDelim, rightDelim, display) {
                var finalData = [];
                for (var i = 0; i < startData.length; i++) {
                  if (startData[i].type === "text") {
                    var text = startData[i].data;
                    var lookingForLeft = true;
                    var currIndex = 0;
                    var nextIndex = void 0;
                    nextIndex = text.indexOf(leftDelim);
                    if (nextIndex !== -1) {
                      currIndex = nextIndex;
                      finalData.push({
                        type: "text",
                        data: text.slice(0, currIndex)
                      });
                      lookingForLeft = false;
                    }
                    while (true) {
                      if (lookingForLeft) {
                        nextIndex = text.indexOf(leftDelim, currIndex);
                        if (nextIndex === -1) {
                          break;
                        }
                        finalData.push({
                          type: "text",
                          data: text.slice(currIndex, nextIndex)
                        });
                        currIndex = nextIndex;
                      } else {
                        nextIndex = findEndOfMath(rightDelim, text, currIndex + leftDelim.length);
                        if (nextIndex === -1) {
                          break;
                        }
                        finalData.push({
                          type: "math",
                          data: text.slice(currIndex + leftDelim.length, nextIndex),
                          rawData: text.slice(currIndex, nextIndex + rightDelim.length),
                          display
                        });
                        currIndex = nextIndex + rightDelim.length;
                      }
                      lookingForLeft = !lookingForLeft;
                    }
                    finalData.push({
                      type: "text",
                      data: text.slice(currIndex)
                    });
                  } else {
                    finalData.push(startData[i]);
                  }
                }
                return finalData;
              };
              var auto_render_splitAtDelimiters = splitAtDelimiters;
              var auto_render_splitWithDelimiters = function splitWithDelimiters(text, delimiters) {
                var data = [{
                  type: "text",
                  data: text
                }];
                for (var i = 0; i < delimiters.length; i++) {
                  var delimiter = delimiters[i];
                  data = auto_render_splitAtDelimiters(data, delimiter.left, delimiter.right, delimiter.display || false);
                }
                return data;
              };
              var auto_render_renderMathInText = function renderMathInText(text, optionsCopy) {
                var data = auto_render_splitWithDelimiters(text, optionsCopy.delimiters);
                var fragment = document.createDocumentFragment();
                for (var i = 0; i < data.length; i++) {
                  if (data[i].type === "text") {
                    fragment.appendChild(document.createTextNode(data[i].data));
                  } else {
                    var span = document.createElement("span");
                    var math = data[i].data;
                    optionsCopy.displayMode = data[i].display;
                    try {
                      if (optionsCopy.preProcess) {
                        math = optionsCopy.preProcess(math);
                      }
                      external_katex_default.a.render(math, span, optionsCopy);
                    } catch (e) {
                      if (!(e instanceof external_katex_default.a.ParseError)) {
                        throw e;
                      }
                      optionsCopy.errorCallback("KaTeX auto-render: Failed to parse `" + data[i].data + "` with ", e);
                      fragment.appendChild(document.createTextNode(data[i].rawData));
                      continue;
                    }
                    fragment.appendChild(span);
                  }
                }
                return fragment;
              };
              var renderElem = function renderElem2(elem, optionsCopy) {
                for (var i = 0; i < elem.childNodes.length; i++) {
                  var childNode = elem.childNodes[i];
                  if (childNode.nodeType === 3) {
                    var frag = auto_render_renderMathInText(childNode.textContent, optionsCopy);
                    i += frag.childNodes.length - 1;
                    elem.replaceChild(frag, childNode);
                  } else if (childNode.nodeType === 1) {
                    (function() {
                      var className = " " + childNode.className + " ";
                      var shouldRender = optionsCopy.ignoredTags.indexOf(childNode.nodeName.toLowerCase()) === -1 && optionsCopy.ignoredClasses.every(function(x) {
                        return className.indexOf(" " + x + " ") === -1;
                      });
                      if (shouldRender) {
                        renderElem2(childNode, optionsCopy);
                      }
                    })();
                  }
                }
              };
              var renderMathInElement2 = function renderMathInElement3(elem, options) {
                if (!elem) {
                  throw new Error("No element provided to render");
                }
                var optionsCopy = {};
                for (var option in options) {
                  if (options.hasOwnProperty(option)) {
                    optionsCopy[option] = options[option];
                  }
                }
                optionsCopy.delimiters = optionsCopy.delimiters || [
                  {
                    left: "$$",
                    right: "$$",
                    display: true
                  },
                  {
                    left: "\\(",
                    right: "\\)",
                    display: false
                  },
                  // LaTeX uses $…$, but it ruins the display of normal `$` in text:
                  // {left: "$", right: "$", display: false},
                  //  \[…\] must come last in this array. Otherwise, renderMathInElement
                  //  will search for \[ before it searches for $$ or  \(
                  // That makes it susceptible to finding a \\[0.3em] row delimiter and
                  // treating it as if it were the start of a KaTeX math zone.
                  {
                    left: "\\[",
                    right: "\\]",
                    display: true
                  }
                ];
                optionsCopy.ignoredTags = optionsCopy.ignoredTags || ["script", "noscript", "style", "textarea", "pre", "code"];
                optionsCopy.ignoredClasses = optionsCopy.ignoredClasses || [];
                optionsCopy.errorCallback = optionsCopy.errorCallback || console.error;
                optionsCopy.macros = optionsCopy.macros || {};
                renderElem(elem, optionsCopy);
              };
              var auto_render = __webpack_exports__["default"] = renderMathInElement2;
            })
            /******/
          ])["default"]
        );
      });
    }
  });

  // src/examples.ts
  var import_katex = __toESM(require_katex());
  var import_auto_render = __toESM(require_auto_render());

  // src/intersect.ts
  var EPSILON = 1e-8;
  function abs(value) {
    return value < 0 ? -value : value;
  }
  function clamp(value, min, max) {
    if (value < min) {
      return min;
    } else if (value > max) {
      return max;
    } else {
      return value;
    }
  }
  function sign(value) {
    return value < 0 ? -1 : 1;
  }
  var Point = class _Point {
    constructor(x = 0, y = 0) {
      __publicField(this, "x");
      __publicField(this, "y");
      this.x = x;
      this.y = y;
    }
    clone() {
      return new _Point(this.x, this.y);
    }
    normalize() {
      let length = this.x * this.x + this.y * this.y;
      if (length > 0) {
        length = Math.sqrt(length);
        const inverseLength = 1 / length;
        this.x *= inverseLength;
        this.y *= inverseLength;
      } else {
        this.x = 1;
        this.y = 0;
      }
      return length;
    }
  };
  var Hit = class {
    constructor(collider) {
      __publicField(this, "collider");
      __publicField(this, "pos");
      __publicField(this, "delta");
      __publicField(this, "normal");
      __publicField(this, "time");
      this.collider = collider;
      this.pos = new Point();
      this.delta = new Point();
      this.normal = new Point();
      this.time = 0;
    }
  };
  var Sweep = class {
    constructor() {
      __publicField(this, "hit");
      __publicField(this, "pos");
      __publicField(this, "time");
      this.hit = null;
      this.pos = new Point();
      this.time = 1;
    }
  };
  var AABB = class {
    constructor(pos, half) {
      __publicField(this, "pos");
      __publicField(this, "half");
      this.pos = pos;
      this.half = half;
    }
    intersectPoint(point) {
      const dx = point.x - this.pos.x;
      const px = this.half.x - abs(dx);
      if (px <= 0) {
        return null;
      }
      const dy = point.y - this.pos.y;
      const py = this.half.y - abs(dy);
      if (py <= 0) {
        return null;
      }
      const hit = new Hit(this);
      if (px < py) {
        const sx = sign(dx);
        hit.delta.x = px * sx;
        hit.normal.x = sx;
        hit.pos.x = this.pos.x + this.half.x * sx;
        hit.pos.y = point.y;
      } else {
        const sy = sign(dy);
        hit.delta.y = py * sy;
        hit.normal.y = sy;
        hit.pos.x = point.x;
        hit.pos.y = this.pos.y + this.half.y * sy;
      }
      return hit;
    }
    intersectSegment(pos, delta, paddingX = 0, paddingY = 0) {
      const scaleX = 1 / delta.x;
      const scaleY = 1 / delta.y;
      const signX = sign(scaleX);
      const signY = sign(scaleY);
      const nearTimeX = (this.pos.x - signX * (this.half.x + paddingX) - pos.x) * scaleX;
      const nearTimeY = (this.pos.y - signY * (this.half.y + paddingY) - pos.y) * scaleY;
      const farTimeX = (this.pos.x + signX * (this.half.x + paddingX) - pos.x) * scaleX;
      const farTimeY = (this.pos.y + signY * (this.half.y + paddingY) - pos.y) * scaleY;
      if (nearTimeX > farTimeY || nearTimeY > farTimeX) {
        return null;
      }
      const nearTime = nearTimeX > nearTimeY ? nearTimeX : nearTimeY;
      const farTime = farTimeX < farTimeY ? farTimeX : farTimeY;
      if (nearTime >= 1 || farTime <= 0) {
        return null;
      }
      const hit = new Hit(this);
      hit.time = clamp(nearTime, 0, 1);
      if (nearTimeX > nearTimeY) {
        hit.normal.x = -signX;
        hit.normal.y = 0;
      } else {
        hit.normal.x = 0;
        hit.normal.y = -signY;
      }
      hit.delta.x = (1 - hit.time) * -delta.x;
      hit.delta.y = (1 - hit.time) * -delta.y;
      hit.pos.x = pos.x + delta.x * hit.time;
      hit.pos.y = pos.y + delta.y * hit.time;
      return hit;
    }
    intersectAABB(box) {
      const dx = box.pos.x - this.pos.x;
      const px = box.half.x + this.half.x - abs(dx);
      if (px <= 0) {
        return null;
      }
      const dy = box.pos.y - this.pos.y;
      const py = box.half.y + this.half.y - abs(dy);
      if (py <= 0) {
        return null;
      }
      const hit = new Hit(this);
      if (px < py) {
        const sx = sign(dx);
        hit.delta.x = px * sx;
        hit.normal.x = sx;
        hit.pos.x = this.pos.x + this.half.x * sx;
        hit.pos.y = box.pos.y;
      } else {
        const sy = sign(dy);
        hit.delta.y = py * sy;
        hit.normal.y = sy;
        hit.pos.x = box.pos.x;
        hit.pos.y = this.pos.y + this.half.y * sy;
      }
      return hit;
    }
    sweepAABB(box, delta) {
      const sweep = new Sweep();
      if (delta.x === 0 && delta.y === 0) {
        sweep.pos.x = box.pos.x;
        sweep.pos.y = box.pos.y;
        sweep.hit = this.intersectAABB(box);
        sweep.time = sweep.hit ? sweep.hit.time = 0 : 1;
        return sweep;
      }
      sweep.hit = this.intersectSegment(box.pos, delta, box.half.x, box.half.y);
      if (sweep.hit) {
        sweep.time = clamp(sweep.hit.time - EPSILON, 0, 1);
        sweep.pos.x = box.pos.x + delta.x * sweep.time;
        sweep.pos.y = box.pos.y + delta.y * sweep.time;
        const direction = delta.clone();
        direction.normalize();
        sweep.hit.pos.x = clamp(
          sweep.hit.pos.x + direction.x * box.half.x,
          this.pos.x - this.half.x,
          this.pos.x + this.half.x
        );
        sweep.hit.pos.y = clamp(
          sweep.hit.pos.y + direction.y * box.half.y,
          this.pos.y - this.half.y,
          this.pos.y + this.half.y
        );
      } else {
        sweep.pos.x = box.pos.x + delta.x;
        sweep.pos.y = box.pos.y + delta.y;
        sweep.time = 1;
      }
      return sweep;
    }
    sweepInto(staticColliders, delta) {
      let nearest = new Sweep();
      nearest.time = 1;
      nearest.pos.x = this.pos.x + delta.x;
      nearest.pos.y = this.pos.y + delta.y;
      for (let i = 0, il = staticColliders.length; i < il; i++) {
        const sweep = staticColliders[i].sweepAABB(this, delta);
        if (sweep.time < nearest.time) {
          nearest = sweep;
        }
      }
      return nearest;
    }
  };

  // src/examples.ts
  function reflect(velocity, normal, out) {
    const dot = velocity.x * normal.x + velocity.y * normal.y;
    const ux = normal.x * dot;
    const uy = normal.y * dot;
    const wx = velocity.x - ux;
    const wy = velocity.y - uy;
    out.x = wx - ux;
    out.y = wy - uy;
  }
  var Example = class {
    constructor(context, width, height) {
      __publicField(this, "context");
      __publicField(this, "width");
      __publicField(this, "height");
      __publicField(this, "origin");
      __publicField(this, "infiniteLength");
      this.context = context;
      this.width = width;
      this.height = height;
      this.origin = new Point(this.width * 0.5, this.height * 0.5);
      this.infiniteLength = Math.sqrt(
        this.width * this.width + this.height * this.height
      );
    }
    drawAABB(box, color = "#fff", thickness = 1) {
      const x1 = Math.floor(this.origin.x + box.pos.x - box.half.x);
      const y1 = Math.floor(this.origin.y + box.pos.y - box.half.y);
      const x2 = Math.floor(this.origin.x + box.pos.x + box.half.x);
      const y2 = Math.floor(this.origin.y + box.pos.y + box.half.y);
      this.context.beginPath();
      this.context.moveTo(x1, y1);
      this.context.lineTo(x2, y1);
      this.context.lineTo(x2, y2);
      this.context.lineTo(x1, y2);
      this.context.lineTo(x1, y1);
      this.context.closePath();
      this.context.lineWidth = thickness;
      this.context.strokeStyle = color;
      this.context.stroke();
    }
    drawCircle(circle, color = "#fff", thickness = 1) {
      const x = Math.floor(this.origin.x + circle.pos.x);
      const y = Math.floor(this.origin.y + circle.pos.y);
      this.context.beginPath();
      this.context.arc(x, y, circle.radius, 0, 2 * Math.PI, true);
      this.context.closePath();
      this.context.lineWidth = thickness;
      this.context.strokeStyle = color;
      this.context.stroke();
    }
    drawPoint(point, color = "#fff", text = "", thickness = 1) {
      const x = Math.floor(this.origin.x + point.x - thickness / 2);
      const y = Math.floor(this.origin.y + point.y - thickness / 2);
      this.context.lineWidth = thickness;
      this.context.fillStyle = color;
      this.context.strokeStyle = color;
      this.context.fillRect(x, y, thickness, thickness);
      this.context.strokeRect(x, y, thickness, thickness);
      if (text) {
        this.context.fillText(text, x + thickness * 4, y + thickness * 2);
      }
    }
    drawRay(pos, dir, length, color = "#fff", arrow = true, thickness = 1) {
      const pos2 = new Point(pos.x + dir.x * length, pos.y + dir.y * length);
      this.drawSegment(pos, pos2, color, thickness);
      if (arrow) {
        pos = pos2.clone();
        pos2.x = pos.x - dir.x * 4 + dir.y * 4;
        pos2.y = pos.y - dir.y * 4 - dir.x * 4;
        this.drawSegment(pos, pos2, color, thickness);
        pos2.x = pos.x - dir.x * 4 - dir.y * 4;
        pos2.y = pos.y - dir.y * 4 + dir.x * 4;
        this.drawSegment(pos, pos2, color, thickness);
      }
    }
    drawSegment(point1, point2, color = "#fff", thickness = 1) {
      const x1 = Math.floor(this.origin.x + point1.x);
      const y1 = Math.floor(this.origin.y + point1.y);
      const x2 = Math.floor(this.origin.x + point2.x);
      const y2 = Math.floor(this.origin.y + point2.y);
      this.context.beginPath();
      this.context.moveTo(x1, y1);
      this.context.lineTo(x2, y2);
      this.context.closePath();
      this.context.lineWidth = thickness;
      this.context.strokeStyle = color;
      this.context.stroke();
    }
    tick(elapsed) {
      this.context.fillStyle = "#000";
      this.context.fillRect(0, 0, this.width, this.height);
    }
  };
  var AABBPointExample = class extends Example {
    constructor(context, width, height) {
      super(context, width, height);
      __publicField(this, "angle");
      __publicField(this, "pos");
      __publicField(this, "box");
      this.angle = 0;
      this.pos = new Point();
      this.box = new AABB(new Point(0, 0), new Point(16, 16));
    }
    tick(elapsed) {
      super.tick(elapsed);
      this.angle += 0.5 * Math.PI * elapsed;
      this.pos.x = Math.cos(this.angle * 0.4) * 32;
      this.pos.y = Math.sin(this.angle) * 12;
      const hit = this.box.intersectPoint(this.pos);
      this.drawAABB(this.box, "#666");
      if (hit) {
        this.drawPoint(this.pos, "#f00");
        this.drawPoint(hit.pos, "#ff0");
      } else {
        this.drawPoint(this.pos, "#0f0");
      }
    }
  };
  var AABBSegmentExample = class extends Example {
    constructor(context, width, height) {
      super(context, width, height);
      __publicField(this, "angle");
      __publicField(this, "box");
      this.angle = 0;
      this.box = new AABB(new Point(0, 0), new Point(16, 16));
    }
    tick(elapsed) {
      super.tick(elapsed);
      this.angle += 0.5 * Math.PI * elapsed;
      const pos1 = new Point(
        Math.cos(this.angle) * 64,
        Math.sin(this.angle) * 64
      );
      const pos2 = new Point(
        Math.sin(this.angle) * 32,
        Math.cos(this.angle) * 32
      );
      const delta = new Point(pos2.x - pos1.x, pos2.y - pos1.y);
      const hit = this.box.intersectSegment(pos1, delta);
      const dir = delta.clone();
      const length = dir.normalize();
      this.drawAABB(this.box, "#666");
      if (hit) {
        this.drawRay(pos1, dir, length, "#f00");
        this.drawSegment(pos1, hit.pos, "#ff0");
        this.drawPoint(hit.pos, "#ff0");
        this.drawRay(hit.pos, hit.normal, 6, "#ff0", false);
      } else {
        this.drawRay(pos1, dir, length, "#0f0");
      }
    }
  };
  var AABBAABBExample = class extends Example {
    constructor(context, width, height) {
      super(context, width, height);
      __publicField(this, "angle");
      __publicField(this, "box1");
      __publicField(this, "box2");
      this.angle = 0;
      this.box1 = new AABB(new Point(0, 0), new Point(64, 16));
      this.box2 = new AABB(new Point(0, 0), new Point(16, 16));
    }
    tick(elapsed) {
      super.tick(elapsed);
      this.angle += 0.2 * Math.PI * elapsed;
      this.box2.pos.x = Math.cos(this.angle) * 96;
      this.box2.pos.y = Math.sin(this.angle * 2.4) * 24;
      const hit = this.box1.intersectAABB(this.box2);
      this.drawAABB(this.box1, "#666");
      if (hit) {
        this.drawAABB(this.box2, "#f00");
        this.box2.pos.x += hit.delta.x;
        this.box2.pos.y += hit.delta.y;
        this.drawAABB(this.box2, "#ff0");
        this.drawPoint(hit.pos, "#ff0");
        this.drawRay(hit.pos, hit.normal, 4, "#ff0", false);
      } else {
        this.drawAABB(this.box2, "#0f0");
      }
    }
  };
  var AABBSweptAABBExample = class extends Example {
    constructor(context, width, height) {
      super(context, width, height);
      __publicField(this, "angle");
      __publicField(this, "staticBox");
      __publicField(this, "sweepBoxes");
      __publicField(this, "sweepDeltas");
      __publicField(this, "tempBox");
      this.angle = 0;
      this.staticBox = new AABB(new Point(0, 0), new Point(112, 16));
      this.sweepBoxes = [
        new AABB(new Point(-152, 24), new Point(16, 16)),
        new AABB(new Point(128, -48), new Point(16, 16))
      ];
      this.sweepDeltas = [new Point(64, -12), new Point(-32, 96)];
      this.tempBox = new AABB(new Point(0, 0), new Point(16, 16));
    }
    tick(elapsed) {
      super.tick(elapsed);
      this.angle += 0.5 * Math.PI * elapsed;
      this.drawAABB(this.staticBox, "#666");
      const factor = (Math.cos(this.angle) + 1) * 0.5 || 1e-8;
      this.sweepBoxes.forEach((box, i) => {
        const delta = this.sweepDeltas[i].clone();
        delta.x *= factor;
        delta.y *= factor;
        const sweep = this.staticBox.sweepAABB(box, delta);
        const dir = delta.clone();
        const length = dir.normalize();
        this.drawAABB(box, "#666");
        if (sweep.hit) {
          this.drawRay(box.pos, dir, length, "#f00");
          this.tempBox.pos.x = box.pos.x + delta.x;
          this.tempBox.pos.y = box.pos.y + delta.y;
          this.drawAABB(this.tempBox, "#f00");
          this.tempBox.pos.x = sweep.pos.x;
          this.tempBox.pos.y = sweep.pos.y;
          this.drawAABB(this.tempBox, "#ff0");
          this.drawPoint(sweep.hit.pos, "#ff0");
          this.drawRay(sweep.hit.pos, sweep.hit.normal, 4, "#ff0", false);
        } else {
          this.tempBox.pos.x = sweep.pos.x;
          this.tempBox.pos.y = sweep.pos.y;
          this.drawAABB(this.tempBox, "#0f0");
          this.drawRay(box.pos, dir, length, "#0f0");
        }
      });
    }
  };
  var MultipleAABBSweptAABBExample = class extends Example {
    constructor(context, width, height) {
      super(context, width, height);
      __publicField(this, "delta");
      __publicField(this, "velocity");
      __publicField(this, "movingBox");
      __publicField(this, "staticBoxes");
      this.delta = new Point();
      this.velocity = new Point(48, 48);
      this.movingBox = new AABB(new Point(0, 0), new Point(8, 8));
      this.staticBoxes = [
        new AABB(new Point(-96, 0), new Point(8, 48)),
        new AABB(new Point(96, 0), new Point(8, 48)),
        new AABB(new Point(0, -56), new Point(104, 8)),
        new AABB(new Point(0, 56), new Point(104, 8))
      ];
    }
    tick(elapsed) {
      super.tick(elapsed);
      this.delta.x = this.velocity.x * elapsed;
      this.delta.y = this.velocity.y * elapsed;
      const sweep = this.movingBox.sweepInto(this.staticBoxes, this.delta);
      if (sweep.hit) {
        reflect(this.velocity, sweep.hit.normal, this.velocity);
      }
      this.staticBoxes.forEach((staticBox) => {
        if (sweep.hit && sweep.hit.collider === staticBox) {
          this.drawAABB(staticBox, "#aaa");
        } else {
          this.drawAABB(staticBox, "#666");
        }
      });
      this.movingBox.pos = sweep.pos;
      this.drawAABB(this.movingBox, sweep.hit ? "#ff0" : "#0f0");
    }
  };
  function ready(callback) {
    if (document.readyState === "complete") {
      setTimeout(callback, 1);
      return;
    }
    document.addEventListener(
      "DOMContentLoaded",
      function handler() {
        document.removeEventListener("DOMContentLoaded", handler, false);
        callback();
      },
      false
    );
  }
  ready(() => {
    (0, import_auto_render.default)(document.body);
    const exampleIds = {
      "aabb-vs-aabb": AABBAABBExample,
      "aabb-vs-point": AABBPointExample,
      "aabb-vs-segment": AABBSegmentExample,
      "aabb-vs-swept-aabb": AABBSweptAABBExample,
      "sweeping-an-aabb-through-multiple-objects": MultipleAABBSweptAABBExample
    };
    const examples = [];
    Object.keys(exampleIds).forEach((id) => {
      const exampleConstructor = exampleIds[id];
      const anchor = document.getElementById(id);
      if (!anchor || !anchor.parentNode) {
        return;
      }
      const canvas = document.createElement("canvas");
      if (!canvas) {
        return;
      }
      anchor.parentNode.insertBefore(canvas, anchor.nextSibling);
      const width = canvas.width = 640;
      const height = canvas.height = 160;
      const context = canvas.getContext("2d");
      if (!context) {
        return;
      }
      context.translate(0.5, 0.5);
      const example = new exampleConstructor(context, width, height);
      if (example) {
        examples.push(example);
      }
    });
    setInterval(() => {
      examples.forEach((example) => example.tick(1 / 30));
    }, 1e3 / 30);
  });
})();
//# sourceMappingURL=bundle.js.map
