/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
__webpack_require__(1);
var expressions_1 = __webpack_require__(3);
var layer_1 = __webpack_require__(7);
var log_1 = __webpack_require__(8);
var null_1 = __webpack_require__(9);
var precomp_1 = __webpack_require__(10);
var scroll_1 = __webpack_require__(12);
var shape_1 = __webpack_require__(13);
var text_1 = __webpack_require__(14);
var time_1 = __webpack_require__(15);
var trackmatte_1 = __webpack_require__(16);
var transformation_1 = __webpack_require__(4);
var util_1 = __webpack_require__(5);
var xmp_1 = __webpack_require__(6);
var INADMISSIBLE_CHAR_CODES = [
    3,
];
// The way we mark up the AE scene is that first we are iterating over every
// composition in the project. Then we iterate layers inside each composition to
// find any appropriate layers (i.e having _RT in the name) For every layers, we
// are going to get information about the composition, text properties and
// transformation properties. As for transformation properties, we will generate
// keyframes and then at the each key frame we will extract all the information
// we need (i.e position, rotation, opacity, scale... etc) but only store when
// there are changes. Then we will mark it up and attach it to the layer.
function writeLayerInfo(layer, trackMatteName) {
    try {
        var xmp = new xmp_1.XMPCommentBuilder([
            new layer_1.LayerInfo(layer),
            new trackmatte_1.TrackMatteInfo(layer, trackMatteName),
            new text_1.TextInfo(layer),
            new time_1.Time(layer),
            new shape_1.ShapeInfo(layer),
            new null_1.NullInfo(layer),
            new precomp_1.PrecompInfo(layer),
            new scroll_1.ScrollInfo(layer),
            new layer_1.RawLayerDimentionsInfo(layer),
            new expressions_1.ExpressionInfo(layer),
            new expressions_1.ExpressionSourceRectInfo(layer),
            new transformation_1.TransformationInfo(layer),
        ]);
        var data_1 = xmp.serialize();
        var foundCodes = [];
        for (var _i = 0, INADMISSIBLE_CHAR_CODES_1 = INADMISSIBLE_CHAR_CODES; _i < INADMISSIBLE_CHAR_CODES_1.length; _i++) {
            var code = INADMISSIBLE_CHAR_CODES_1[_i];
            if (data_1.indexOf(String.fromCharCode(code)) !== -1) {
                foundCodes.push(INADMISSIBLE_CHAR_CODES[code]);
            }
        }
        if (foundCodes.length > 0) {
            alert("Inadmissible characters have been found in your project. " +
                "XMP generation will not include these characters.");
            data_1 = util_1.cleanString(foundCodes, data_1);
        }
        util_1.undoExec("Add layer Info to Layer Marker", function () {
            var marker = new MarkerValue(data_1);
            layer.property("Marker").setValueAtTime(layer.inPoint, marker);
        });
    }
    catch (e) {
        log_1["default"]("ERROR: " + e.toString());
    }
}
function isText(layer) {
    if (layer instanceof TextLayer && !isTime(layer)) {
        return true;
    }
    return false;
}
function isTime(layer) {
    if (layer instanceof TextLayer && util_1.getLabelName(layer) === "Time") {
        return true;
    }
    return false;
}
function isShape(layer) {
    if (layer instanceof ShapeLayer &&
        (util_1.getLabelName(layer) === "RealTime" || (layer.name.search("_RS") > 0 && layer.name.search("_RSC") === -1))) {
        return true;
    }
    if (layer instanceof AVLayer && layer.source instanceof FootageItem && layer.source.file !== null) {
        // active texture AVLayer, which we treat as a shape
        return true;
    }
    return false;
}
function isNull(layer) {
    return layer instanceof AVLayer && layer.source !== null ? !(layer.source instanceof CompItem) : util_1.getLabelName(layer) === "RealTime";
}
function isPrecomp(layer) {
    return layer instanceof AVLayer && layer.source instanceof CompItem;
}
function isScroll(layer) {
    if (layer instanceof ShapeLayer && (util_1.getLabelName(layer) === "Scroll" || layer.name.search("_RSC") > 0)) {
        return true;
    }
    return false;
}
function isRealtimeObject(layer) {
    var labelName = util_1.getLabelName(layer);
    if (labelName === "RealTime" || labelName === "Scroll" || labelName === "Time") {
        return true;
    }
    if (layer.name.search("_RT") !== -1 ||
        layer.name.search("_RS") !== -1 ||
        layer.name.search("_RN") !== -1 ||
        layer.name.search("_RSC") !== -1) {
        return true;
    }
    return false;
}
function identifyLayer(layer) {
    var text = isText(layer);
    var shape = isShape(layer);
    var nullLayer = isNull(layer);
    var scroll = isScroll(layer);
    var time = isTime(layer);
    var precomp = isPrecomp(layer);
    if (text) {
        log_1["default"](layer.name + " is a text object");
    }
    else if (shape) {
        log_1["default"](layer.name + " is a shape");
    }
    else if (nullLayer) {
        log_1["default"](layer.name + " is a null layer");
    }
    else if (scroll) {
        log_1["default"](layer.name + " is a scroll");
    }
    else if (time) {
        log_1["default"](layer.name + " is a time object");
    }
    else if (precomp) {
        log_1["default"](layer.name + " is a precomp layer");
    }
}
function setCustomXMP(comp) {
    if (!comp) {
        alert("No composition selected - make sure to select a composition " +
            "before generating RealTime object custom XMP metadata");
    }
    var lastTrackMatte = "";
    for (var i = 1; i <= comp.numLayers; i++) {
        var layer = comp.layer(i);
        var realtime = isRealtimeObject(layer);
        if (realtime) {
            log_1["default"](layer.name + " is realtime");
        }
        if (realtime) {
            layer.enabled = false;
            layer.visible = false;
            identifyLayer(layer);
            writeLayerInfo(layer, layer.hasTrackMatte ? lastTrackMatte : "");
            lastTrackMatte = layer.isTrackMatte ? layer.name : "";
        }
    }
    return true;
}
setCustomXMP(app.project.activeItem);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
__webpack_require__(2);


/***/ }),
/* 2 */
/***/ (function(module, exports) {

// tslint:disable
Array.prototype.indexOf = Array.prototype.indexOf || function (searchElement, fromIndex) {
    'use strict';
    var k;
    if (this == null) {
        throw new TypeError('"this" is null or not defined');
    }
    var O = Object(this);
    var len = O.length >>> 0;
    // 4. If len is 0, return -1.
    if (len === 0) {
        return -1;
    }
    var n = +fromIndex || 0;
    if (Math.abs(n) === Infinity) {
        n = 0;
    }
    if (n >= len) {
        return -1;
    }
    k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
    // 9. Repeat, while k < len
    while (k < len) {
        var kValue;
        if (k in O && O[k] === searchElement) {
            return k;
        }
        k++;
    }
    return -1;
};
Array.isArray = Array.isArray || function (arg) {
    'use strict';
    return Object.prototype.toString.call(arg) === '[object Array]';
};
Array.prototype.filter = Array.prototype.filter || function (fun /*, thisArg */) {
    "use strict";
    if (this === void 0 || this === null)
        throw new TypeError();
    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun !== "function")
        throw new TypeError();
    var res = [];
    var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
    for (var i = 0; i < len; i++) {
        if (i in t) {
            var val = t[i];
            if (fun.call(thisArg, val, i, t))
                res.push(val);
        }
    }
    return res;
};
Array.prototype.map = Array.prototype.map || function (callback, thisArg) {
    'use strict';
    var T, A, k;
    if (this == null) {
        throw new TypeError(" this is null or not defined");
    }
    var O = Object(this);
    var len = O.length >>> 0;
    if (typeof callback !== "function") {
        throw new TypeError(callback + " is not a function");
    }
    if (arguments.length > 1) {
        T = thisArg;
    }
    A = new Array(len);
    k = 0;
    while (k < len) {
        var kValue, mappedValue;
        if (k in O) {
            kValue = O[k];
            mappedValue = callback.call(T, kValue, k, O);
            A[k] = mappedValue;
        }
        k++;
    }
    return A;
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var transformation_1 = __webpack_require__(4);
var util_1 = __webpack_require__(5);
var xmp_1 = __webpack_require__(6);
function getExpressionProperties(layer) {
    var properties = [];
    properties.push(layer.anchorPoint);
    if (transformation_1.dimensionsAreSeparated(layer)) {
        layer.xPosition = layer.property("Transform").property("ADBE Position_0");
        layer.yPosition = layer.property("Transform").property("ADBE Position_1");
        properties.push(layer.xPosition);
        properties.push(layer.yPosition);
        if (layer.threeDLayer) {
            layer.zPosition = layer.property("Transform").property("ADBE Position_2");
            properties.push(layer.zPosition);
        }
    }
    else {
        properties.push(layer.position);
    }
    properties.push(layer.scale);
    properties.push(layer.opacity);
    if (!layer.threeDLayer) {
        properties.push(layer.rotation);
    }
    if (layer instanceof TextLayer) {
        properties.push(layer.sourceText);
    }
    if (layer instanceof ShapeLayer) {
        if (layer.property("Contents").property("Rectangle 1") !== null) {
            var scale = layer
                .property("Contents")
                .property("Rectangle 1")
                .property("Transform")
                .property("Scale");
            properties.push(scale);
            var fill = layer
                .property("Contents")
                .property("Rectangle 1")
                .property("Contents")
                .property("Fill 1");
            if (fill != null) {
                properties.push(fill.property("Color"));
            }
            var roundness = layer
                .property("Contents")
                .property("Rectangle 1")
                .property("Contents")
                .property("Rectangle Path 1")
                .property("Roundness");
            properties.push(roundness);
            var size = layer
                .property("Contents")
                .property("Rectangle 1")
                .property("Contents")
                .property("Rectangle Path 1")
                .property("Size");
            properties.push(size);
            var position = layer
                .property("Contents")
                .property("Rectangle 1")
                .property("Contents")
                .property("Rectangle Path 1")
                .property("Position");
            properties.push(position);
        }
    }
    return properties;
}
function usingExpression(property) {
    return property && !property.expressionError && property.expression && property.expressionEnabled;
}
var ExpressionInfo = /** @class */ (function () {
    function ExpressionInfo(layer) {
        this.layer = layer;
        this.expressions = [];
        var properties = getExpressionProperties(layer);
        for (var _i = 0, properties_1 = properties; _i < properties_1.length; _i++) {
            var property = properties_1[_i];
            this.addExpression(property);
        }
    }
    ExpressionInfo.prototype.hasData = function () {
        return this.expressions.length > 0;
    };
    ExpressionInfo.prototype.header = function () {
        return "Expression Info";
    };
    ExpressionInfo.prototype.properties = function () {
        var properties = [
            new xmp_1.XMPProperty("ExpressionCount", this.expressions.length),
        ];
        for (var _i = 0, _a = this.expressions; _i < _a.length; _i++) {
            var expression = _a[_i];
            properties.push.apply(properties, [
                new xmp_1.XMPProperty("PropertyName", expression.propertyName),
                new xmp_1.XMPProperty("Value", expression.value),
                new xmp_1.XMPProperty("Code", util_1.escapeMultilineValue(expression.code)),
            ]);
        }
        return properties;
    };
    ExpressionInfo.prototype.values = function () {
        return [];
    };
    ExpressionInfo.prototype.addExpression = function (property) {
        if (!usingExpression(property)) {
            return;
        }
        this.expressions.push(new Expression(this.layer, property));
    };
    return ExpressionInfo;
}());
exports.ExpressionInfo = ExpressionInfo;
var Expression = /** @class */ (function () {
    function Expression(layer, property) {
        this.propertyName = property.name;
        this.value = util_1.disableExpressions(layer, function () { return property.value.toString(); });
        this.code = property.expression;
    }
    return Expression;
}());
var ExpressionSourceRectInfo = /** @class */ (function () {
    function ExpressionSourceRectInfo(layer) {
        this.layer = layer;
        this.needed = false;
        var properties = getExpressionProperties(layer);
        for (var _i = 0, properties_2 = properties; _i < properties_2.length; _i++) {
            var property = properties_2[_i];
            if (usingExpression(property) && property.expression.search("sourceRectAtTime") !== -1) {
                this.needed = true;
                break;
            }
        }
    }
    ExpressionSourceRectInfo.prototype.hasData = function () {
        return this.needed;
    };
    ExpressionSourceRectInfo.prototype.header = function () {
        return "Expression Source Rect Info";
    };
    ExpressionSourceRectInfo.prototype.properties = function () {
        return [];
    };
    ExpressionSourceRectInfo.prototype.values = function () {
        var _this = this;
        return this.needed ?
            util_1.undoExec("Get Source Rect Info", function () {
                var prevTime;
                var srcRectPrev;
                var srcRects = [];
                util_1.generateKeyframes(_this.layer.position, "transform.position");
                var numKeys = _this.layer.position.numKeys;
                for (var i = 1; i <= numKeys; i++) {
                    var time = _this.layer.position.keyTime(i);
                    if (i === 1 || time !== prevTime) {
                        var srcRect = _this.layer.sourceRectAtTime(time, false);
                        if (i === 1 || !util_1.compareRect(srcRectPrev, srcRect)) {
                            srcRects.push(new KeyedSourceRect(i, srcRect));
                        }
                        srcRectPrev = srcRect;
                        prevTime = time;
                    }
                }
                return srcRects;
            }) :
            [];
    };
    return ExpressionSourceRectInfo;
}());
exports.ExpressionSourceRectInfo = ExpressionSourceRectInfo;
var KeyedSourceRect = /** @class */ (function () {
    function KeyedSourceRect(index, rect) {
        this.index = index;
        this.rect = rect;
    }
    KeyedSourceRect.prototype.toString = function () {
        return this.index - 1 + "," + this.rect.width + "," + this.rect.height + "," + this.rect.left + "," + this.rect.top;
    };
    return KeyedSourceRect;
}());


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var util_1 = __webpack_require__(5);
var TransformationInfo = /** @class */ (function () {
    function TransformationInfo(layer) {
        this.transformations = generateTransformations(layer);
    }
    TransformationInfo.prototype.hasData = function () {
        return true;
    };
    TransformationInfo.prototype.header = function () {
        return "Transformation Info";
    };
    TransformationInfo.prototype.properties = function () {
        return [];
    };
    TransformationInfo.prototype.values = function () {
        return this.transformations;
    };
    return TransformationInfo;
}());
exports.TransformationInfo = TransformationInfo;
function compareMask(a, b) {
    return (!a && !b) || (!!a && !!b && util_1.compareBox(a, b) && a.inverted === b.inverted);
}
function compareVertexMask(a, b) {
    if ((!a && b) || (a && !b)) {
        return false;
    }
    else if (!a && !b) {
        return true;
    }
    if (a.vertices.length !== b.vertices.length) {
        return false;
    }
    for (var index = 0; index < a.vertices.length; index++) {
        if (a.vertices[index].length !== b.vertices[index].length) {
            return false;
        }
        for (var subindex = 0; subindex < a.vertices[index].length; subindex++) {
            if (a.vertices[index][subindex] !== b.vertices[index][subindex]) {
                return false;
            }
        }
        if (a[index] !== b[index]) {
            return false;
        }
    }
    if (a.feather[0] !== b.feather[0] || a.feather[1] !== b.feather[1]) {
        return false;
    }
    if (a.opacity !== b.opacity) {
        return false;
    }
    if (a.expansion !== b.expansion) {
        return false;
    }
    return true;
}
var Transformation = /** @class */ (function () {
    function Transformation(index, anchorPoint, sourceRect, position, scale, opacity, rotation, blurValue, blurDims, blurRE, mask, roundness, XRotation, YRotation, Path, vertexMask) {
        this.index = index;
        this.anchorPoint = anchorPoint;
        this.sourceRect = sourceRect;
        this.position = position;
        this.scale = scale;
        this.opacity = opacity;
        this.rotation = rotation;
        this.blurValue = blurValue;
        this.blurDims = blurDims;
        this.blurRE = blurRE;
        this.mask = mask;
        this.roundness = roundness;
        this.XRotation = XRotation;
        this.YRotation = YRotation;
        this.Path = Path;
        this.vertexMask = vertexMask;
    }
    Transformation.prototype.equals = function (other) {
        return (util_1.compareVec3(this.anchorPoint, other.anchorPoint) &&
            util_1.compareRect(this.sourceRect, other.sourceRect) &&
            util_1.compareVec3(this.position, other.position) &&
            util_1.compareVec3(this.scale, other.scale) &&
            this.opacity === other.opacity &&
            this.rotation === other.rotation &&
            this.blurValue === other.blurValue &&
            this.blurDims === other.blurDims &&
            this.blurRE === other.blurRE &&
            compareMask(this.mask, other.mask) &&
            this.roundness === other.roundness &&
            this.XRotation === other.XRotation &&
            this.YRotation === other.YRotation &&
            this.Path === other.Path &&
            compareVertexMask(this.vertexMask, other.vertexMask));
    };
    Transformation.prototype.useMask = function () {
        return this.mask != null;
    };
    Transformation.prototype.toString = function () {
        var values = [
            this.index.toString(),
            this.anchorPoint.toString(),
            this.sourceRect.left,
            this.sourceRect.top,
            this.sourceRect.width,
            this.sourceRect.height,
            this.position.toString(),
            this.scale.toString(),
            this.opacity.toString(),
            this.rotation.toString(),
            this.blurValue.toString(),
            this.blurDims.toString(),
            this.blurRE.toString(),
        ];
        if (this.useMask()) {
            values.push("{Mask: " + this.mask.top + "," + this.mask.left + "," + this.mask.right + "," + this.mask.bottom + "," + this.mask.inverted + "}");
        }
        if (this.roundness > 0) {
            values.push("{Roundness: " + this.roundness + "}");
        }
        if (this.XRotation !== null) {
            values.push("{X Rotation: " + this.XRotation + "}");
        }
        if (this.YRotation !== null) {
            values.push("{Y Rotation: " + this.YRotation + "}");
        }
        if (this.Path !== null && this.Path.length > 0) {
            values.push(this.Path);
        }
        if (this.vertexMask !== null) {
            var maskBody = [];
            if (this.vertexMask.vertices !== null) {
                maskBody.push("{V: " + this.vertexMask.vertices.join(",") + "}");
            }
            if (this.vertexMask.feather !== null) {
                maskBody.push("{F: " + this.vertexMask.feather.join(",") + "}");
            }
            if (this.vertexMask.opacity !== null) {
                maskBody.push("{O: " + this.vertexMask.opacity + "}");
            }
            if (this.vertexMask.expansion !== null) {
                maskBody.push("{E: " + this.vertexMask.expansion + "}");
            }
            values.push("{VMask: " + maskBody.join(",") + "}");
        }
        return values.join(",");
    };
    return Transformation;
}());
function dimensionsAreSeparated(layer) {
    return layer.property("Transform").property("Position").dimensionsSeparated;
}
exports.dimensionsAreSeparated = dimensionsAreSeparated;
function generateTransformations(layer) {
    var result = [];
    util_1.undoExec("Get Transformation Info", function () {
        // Generate a keyframe every frame
        var properties = [];
        properties.push({ accessor: layer.anchorPoint, name: "transform.anchorPoint" });
        if (dimensionsAreSeparated(layer)) {
            layer.xPosition = layer.property("Transform").property("ADBE Position_0");
            layer.yPosition = layer.property("Transform").property("ADBE Position_1");
            properties.push({ accessor: layer.xPosition, name: "transform.xPosition" });
            properties.push({ accessor: layer.yPosition, name: "transform.yPosition" });
            if (layer.threeDLayer) {
                layer.zPosition = layer.property("Transform").property("ADBE Position_2");
                properties.push({ accessor: layer.zPosition, name: "transform.zPosition" });
            }
        }
        else {
            properties.push({ accessor: layer.position, name: "transform.position" });
        }
        properties.push({ accessor: layer.scale, name: "transform.scale" });
        properties.push({ accessor: layer.opacity, name: "transform.opacity" });
        if (!layer.threeDLayer) {
            properties.push({ accessor: layer.rotation, name: "transform.rotation" });
        }
        var numKeys = -1;
        for (var _i = 0, properties_1 = properties; _i < properties_1.length; _i++) {
            var property = properties_1[_i];
            util_1.generateKeyframes(property.accessor, property.name);
            numKeys = numKeys === -1 ? property.accessor.numKeys : numKeys;
            if (property.accessor.numKeys !== numKeys) {
                throw new Error("Something went wrong -- " +
                    "the number of generated keys is different for the different properties.");
            }
        }
        if (numKeys === 0) {
            alert("No key frames were generated for the RealTime objects, " +
                "make sure that a composition is selected and re-run the script");
            return [];
        }
        var effects = layer.property("Effects");
        var gaussBlur = effects ? effects.property("Gaussian Blur") : null;
        function getBlurValue(name, t) {
            if (!gaussBlur) {
                return 0;
            }
            var property = gaussBlur.property(name);
            return property.numKeys === 0 ?
                property.value :
                property.valueAtTime(t, false);
        }
        var masks = layer.property("Masks");
        var firstMask = masks && masks.numProperties > 0 ? masks.property(1) : null;
        var maskPath = firstMask ? firstMask.property("Mask Path") : null;
        var maskFeather = firstMask ? firstMask.property("Mask Feather") : null;
        var maskOpacity = firstMask ? firstMask.property("Mask Opacity") : null;
        var maskExpansion = firstMask ? firstMask.property("Mask Expansion") : null;
        var anchorPoint = layer.anchorPoint;
        // mutually exclusive with vertex masks
        function getLegacyMask(t) {
            if (!maskPath) {
                return null;
            }
            if (hasMaskPathFeatures(t)) {
                return null;
            }
            var value = maskPath.valueAtTime(t, false);
            if (!isRectangular(value.vertices)) {
                return null;
            }
            var anchorx = anchorPoint.valueAtTime(t, false)[0];
            var anchory = anchorPoint.valueAtTime(t, false)[1];
            return {
                left: Math.min(value.vertices[0][0], value.vertices[1][0], value.vertices[2][0]) - anchorx,
                top: Math.min(value.vertices[0][1], value.vertices[1][1], value.vertices[2][1]) - anchory,
                right: Math.max(value.vertices[0][0], value.vertices[1][0], value.vertices[2][0]) - anchorx,
                bottom: Math.max(value.vertices[0][1], value.vertices[1][1], value.vertices[2][1]) - anchory,
                inverted: firstMask.inverted
            };
        }
        // mutually exclusive with legacy masks
        function getVertexMask(t) {
            if (!maskPath) {
                return null;
            }
            if (!hasMaskPathFeatures(t)) {
                return null;
            }
            return {
                vertices: maskPath.valueAtTime(t, false).vertices,
                feather: maskFeather.valueAtTime(t, false),
                opacity: maskOpacity.valueAtTime(t, false),
                expansion: maskExpansion.valueAtTime(t, false)
            };
        }
        function isRectangular(vertices) {
            return (vertices[0][0] === vertices[1][0] &&
                vertices[2][0] === vertices[3][0] &&
                vertices[0][1] === vertices[3][1] &&
                vertices[1][1] === vertices[2][1]);
        }
        function hasMaskPathFeatures(t) {
            if (!maskPath || !maskFeather || !maskOpacity || !maskExpansion) {
                return false;
            }
            var feather = maskFeather.valueAtTime(t, false);
            if (feather[0] !== 0 || feather[1] !== 0) {
                return true;
            }
            else {
                var value = maskPath.valueAtTime(t, false);
                if (!isRectangular(value.vertices)) {
                    return true;
                }
            }
            var opacity = maskOpacity.valueAtTime(t, false);
            if (opacity !== 100) {
                return true;
            }
            var expansion = maskExpansion.valueAtTime(t, false);
            if (expansion !== 0) {
                return true;
            }
            return false;
        }
        function getRoundness(t) {
            if (layer instanceof ShapeLayer) {
                if (layer.property("Contents").property("Rectangle 1") !== null) {
                    var value = layer
                        .property("Contents")
                        .property("Rectangle 1")
                        .property("Contents")
                        .property("Rectangle Path 1")
                        .property("Roundness");
                    return value.valueAtTime(t, false);
                }
            }
            return 0;
        }
        function getRotation(t, axis) {
            if (layer.threeDLayer === true) {
                var value = layer
                    .property("Transform")
                    .property(axis + " Rotation");
                return value.valueAtTime(t, false);
            }
            else {
                return null;
            }
        }
        function getPath(time) {
            var shapeName = util_1.getNumberedPropertyName(layer, ["Contents"], "Shape");
            if (shapeName.length > 0) {
                try {
                    var pathName = util_1.getNumberedPropertyName(layer, ["Contents", shapeName, "Contents"], "Path");
                    var path = layer
                        .property("Contents")
                        .property(shapeName)
                        .property("Contents")
                        .property(pathName)
                        .property("Path");
                    var value = path.valueAtTime(time, false);
                    if (value !== null && value.inTangents.length > 0 && value.outTangents.length > 0 && value.vertices.length) {
                        return "{Path: " +
                            ["{InTangents: " + value.inTangents.map(function (it) { return "{" + it.toString() + "}"; }).join(",") + "}",
                                "{OutTangents: " + value.outTangents.map(function (ot) { return "{" + ot.toString() + "}"; }).join(",") + "}",
                                "{Vertices: " + value.vertices.map(function (v) { return "{" + v.toString() + "}"; }).join(",") + "}"].join(",") +
                            "}";
                    }
                    return "";
                }
                catch (e) {
                    // do nothing
                }
            }
            return "";
        }
        var indexOffset = Math.floor(layer.inPoint / layer.containingComp.frameDuration);
        for (var i = 1; i <= numKeys; i++) {
            var time = dimensionsAreSeparated(layer) ? layer.xPosition.keyTime(i) : layer.position.keyTime(i);
            var transformation = new Transformation(i - 1 + indexOffset, layer.anchorPoint.keyValue(i), layer.sourceRectAtTime(time, false), dimensionsAreSeparated(layer) ? [layer.xPosition.keyValue(i), layer.yPosition.keyValue(i), layer.threeDLayer ? layer.zPosition.keyValue(i) : 0] : layer.position.keyValue(i), layer.scale.keyValue(i), layer.opacity.keyValue(i), layer.threeDLayer === true ? getRotation(time, "Z") : layer.rotation.keyValue(i), getBlurValue("Blurriness", time), getBlurValue("Blur Dimensions", time), getBlurValue("Repeat Edge Pixels", time), getLegacyMask(time), getRoundness(time), getRotation(time, "X"), getRotation(time, "Y"), getPath(time), getVertexMask(time));
            if (result.length === 0 || !transformation.equals(result[result.length - 1])) {
                result.push(transformation);
            }
        }
    });
    return result;
}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
function compareBox(a, b) {
    return a.left === b.left && a.top === b.top && a.right === b.right && a.bottom === b.bottom;
}
exports.compareBox = compareBox;
function compareRect(a, b) {
    return a.height === b.height && a.width === b.width && a.left === b.left && a.top === b.top;
}
exports.compareRect = compareRect;
function compareVec3(a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
}
exports.compareVec3 = compareVec3;
function compareVec2(a, b) {
    return a[0] === b[0] && a[1] === b[1];
}
exports.compareVec2 = compareVec2;
function disableExpressions(layer, callback) {
    // It looks like AE doesn't run finally blocks in the expected order when
    // you don't store the result and return it outside the try block. Things
    // get messy and undo/redo operations were not being executed and source
    // text expression was not being re-enabled
    var result;
    if (layer instanceof TextLayer && layer.property("Source Text").expressionEnabled) {
        layer.property("Source Text").expressionEnabled = false;
        try {
            result = callback();
        }
        finally {
            layer.property("Source Text").expressionEnabled = true;
        }
    }
    else {
        result = callback();
    }
    return result;
}
exports.disableExpressions = disableExpressions;
function escapeMultilineValue(str) {
    // Just like for the text values in text documents, we encode newlines as
    // carriage returns for multiline values
    return str.replace(/\r\n/g, "\r").replace(/\n/g, "\r");
}
exports.escapeMultilineValue = escapeMultilineValue;
// for some reason str.replace(/\x03/g, "") doesn't work for non-printable chars, so we'll do char-by-char replace
function cleanString(codes, dirty) {
    for (var _i = 0, codes_1 = codes; _i < codes_1.length; _i++) {
        var code = codes_1[_i];
        var io = void 0;
        do {
            io = dirty.indexOf(String.fromCharCode(code));
            if (io >= 0) {
                dirty = dirty.substr(0, io) + dirty.substr(io + 1); // splice doesn't work either
            }
        } while (io !== -1);
    }
    return dirty;
}
exports.cleanString = cleanString;
function getLabelName(layer) {
    if (layer.label === 0) {
        return ""; // this means "none"
    }
    try {
        return app.preferences.getPrefAsString("Label Preference Text Section 7", "Label Text ID 2 # " + layer.label, PREFType.PREF_Type_MACHINE_INDEPENDENT);
    }
    catch (e) {
        return "";
    }
}
exports.getLabelName = getLabelName;
function generateKeyframes(property, propertyExpression) {
    property.selected = true;
    property.expression = propertyExpression;
    app.executeCommand(app.findMenuCommandId("Convert Expression to Keyframes"));
}
exports.generateKeyframes = generateKeyframes;
function rectToBox(rect) {
    return {
        left: rect.left,
        top: rect.top,
        right: rect.left + rect.width,
        bottom: rect.top + rect.height
    };
}
exports.rectToBox = rectToBox;
// from: https://forums.adobe.com/thread/1066703
function recursiveNameAlert(property, report) {
    // recursively checks layer for properties
    // initially receives a layer....then receives indexed or named groups.
    if (report === void 0) { report = ""; }
    var propTypeString = "Unknown";
    if (property.propertyType === PropertyType.INDEXED_GROUP) {
        propTypeString = "INDEXED_GROUP";
    }
    else if (property.propertyType === PropertyType.NAMED_GROUP) {
        propTypeString = "NAMED_GROUP";
    }
    else if (property.propertyType === PropertyType.PROPERTY) {
        propTypeString = "PROPERTY";
    }
    var padding = "";
    for (var k = 0; k < property.propertyDepth; ++k) {
        padding += "   ";
    }
    report += padding + "(" + property.propertyDepth + ") " + property.name + "\r" +
        ("" + padding + propTypeString + ": " + property.matchName);
    if (property.propertyType === PropertyType.PROPERTY &&
        property.canVaryOverTime && property.numKeys > 0) {
        report += "\r" + padding + "HAS KEYS!!!!";
    }
    report += "\r\r";
    // if current property is an Indexed or Named Group....
    if (property.propertyType === PropertyType.INDEXED_GROUP || property.propertyType === PropertyType.NAMED_GROUP) {
        // ....recursively loop through its properties
        for (var d = 1; d <= property.numProperties; d++) {
            report = recursiveNameAlert(property.property(d), report);
        }
    }
    return report;
}
exports.recursiveNameAlert = recursiveNameAlert;
function undoExec(name, callback) {
    // see disableExpressions() comment...
    var result;
    app.beginUndoGroup(name);
    try {
        result = callback();
    }
    finally {
        app.endUndoGroup();
        app.executeCommand(app.findMenuCommandId("Undo " + name));
    }
    return result;
}
exports.undoExec = undoExec;
// find the lowest numbered property name
// assume the user deleted unused Property objects
function getNumberedPropertyName(layer, hierarchy, numberedRoot) {
    var prop = null;
    // Array.some isn't defined so I have to use a for loop
    for (var _i = 0, hierarchy_1 = hierarchy; _i < hierarchy_1.length; _i++) {
        var nextProp = hierarchy_1[_i];
        prop = prop === null ? layer.property(nextProp) : prop.property(nextProp);
        if (prop === null) {
            return "";
        }
    }
    var bestMatch = null;
    for (var propIdx = 1; propIdx <= prop.numProperties; propIdx++) {
        // no startsWith in es3
        if (prop.property(propIdx).name.length >= numberedRoot.length && prop.property(propIdx).name.substring(0, numberedRoot.length) === numberedRoot) {
            if (bestMatch === null || prop.property(propIdx).name < bestMatch) {
                bestMatch = prop.property(propIdx).name;
            }
        }
    }
    return bestMatch === null ? "" : bestMatch;
}
exports.getNumberedPropertyName = getNumberedPropertyName;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var XMPCommentBuilder = /** @class */ (function () {
    function XMPCommentBuilder(sections) {
        this.sections = sections;
    }
    XMPCommentBuilder.prototype.serialize = function () {
        var lines = [];
        for (var _i = 0, _a = this.sections; _i < _a.length; _i++) {
            var section = _a[_i];
            if (!section.hasData()) {
                continue;
            }
            if (section.header()) {
                lines.push(section.header());
            }
            lines.push.apply(lines, section.properties());
            lines.push.apply(lines, section.values().map(function (value) { return "{" + (value || "").toString() + "}"; }));
        }
        return lines.join("\n");
    };
    return XMPCommentBuilder;
}());
exports.XMPCommentBuilder = XMPCommentBuilder;
var XMPProperty = /** @class */ (function () {
    function XMPProperty(name, value) {
        this.name = name;
        this.value = value;
    }
    XMPProperty.prototype.hasValue = function () {
        return this.value !== null && this.value !== undefined;
    };
    XMPProperty.prototype.toString = function () {
        var DEFAULT_NAME = "<UNKNOWN>";
        var DEFAULT_VALUE = "";
        var name = this.name || DEFAULT_NAME;
        var value = this.hasValue() ? this.value : DEFAULT_VALUE;
        return name + "=" + value.toString();
    };
    return XMPProperty;
}());
exports.XMPProperty = XMPProperty;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var xmp_1 = __webpack_require__(6);
// Metadata will only be processed by xmp readers with the same METADATA_VERSION.
// Increment this number for changes that cause earlier versions to be obsolete.
var METADATA_VERSION = 1;
var LayerInfo = /** @class */ (function () {
    function LayerInfo(layer) {
        this.layer = layer;
    }
    LayerInfo.prototype.hasData = function () {
        return true;
    };
    LayerInfo.prototype.header = function () {
        return "Layer Info";
    };
    LayerInfo.prototype.properties = function () {
        var comp = this.layer.containingComp;
        return [
            new xmp_1.XMPProperty("MetaDataVersion", METADATA_VERSION),
            new xmp_1.XMPProperty("LayerName", this.layer.name),
            new xmp_1.XMPProperty("CompositionName", comp.name),
            new xmp_1.XMPProperty("CompositionWidth", comp.width),
            new xmp_1.XMPProperty("CompositionHeight", comp.height),
            new xmp_1.XMPProperty("CompositionPixelAspectRatio", comp.pixelAspect),
            new xmp_1.XMPProperty("LayerWidth", this.layer.sourceRectAtTime(0, false).width),
            new xmp_1.XMPProperty("LayerHeight", this.layer.sourceRectAtTime(0, false).height),
            new xmp_1.XMPProperty("InOutFrames", Math.floor(this.layer.inPoint / comp.frameDuration) +
                "," +
                Math.floor(this.layer.outPoint / comp.frameDuration)),
            new xmp_1.XMPProperty("FrameRate", comp.frameRate),
            new xmp_1.XMPProperty("FrameDuration", comp.frameDuration),
            new xmp_1.XMPProperty("Index", this.layer.index),
            new xmp_1.XMPProperty("Parent", this.layer.parent ? this.layer.parent.name : null),
            new xmp_1.XMPProperty("ParentContents", this.layer.parent && this.layer.parent instanceof TextLayer ?
                this.layer.parent
                    .property("Source Text")
                    .value : null),
        ];
    };
    LayerInfo.prototype.values = function () {
        return [];
    };
    return LayerInfo;
}());
exports.LayerInfo = LayerInfo;
var RawLayerDimentionsInfo = /** @class */ (function () {
    function RawLayerDimentionsInfo(layer) {
        this.layer = layer;
    }
    RawLayerDimentionsInfo.prototype.hasData = function () {
        return true;
    };
    RawLayerDimentionsInfo.prototype.header = function () {
        return "";
    };
    RawLayerDimentionsInfo.prototype.properties = function () {
        return [
            new xmp_1.XMPProperty("RawLayerWidth", this.layer.sourceRectAtTime(0, false).width),
            new xmp_1.XMPProperty("RawLayerHeight", this.layer.sourceRectAtTime(0, false).height),
        ];
    };
    RawLayerDimentionsInfo.prototype.values = function () {
        return [];
    };
    return RawLayerDimentionsInfo;
}());
exports.RawLayerDimentionsInfo = RawLayerDimentionsInfo;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
function getLogFilename() {
    var projectPath = (app && app.project && app.project.file) ?
        app.project.file.fsName :
        "~/Desktop/project.aep";
    var logPath = projectPath.replace(/(.aep)?$/, ".rto.log");
    return logPath;
}
var Logger = /** @class */ (function () {
    function Logger() {
        this.file = new File(getLogFilename());
        this.file.open("a");
        this.hasPermission = true;
    }
    Logger.prototype.write = function (message) {
        if (this.hasPermission) {
            try {
                this.file.writeln(message);
            }
            catch (error) {
                this.file.close();
                this.hasPermission = false;
                $.writeln("WARN: Unable to write to log file; using console instead --- " + error.toString());
            }
        }
        if (!this.hasPermission) {
            $.writeln(message);
        }
    };
    return Logger;
}());
var logger = new Logger();
function log(message) {
    logger.write(message);
}
exports["default"] = log;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var NullInfo = /** @class */ (function () {
    function NullInfo(layer) {
        this.layer = layer;
    }
    NullInfo.prototype.hasData = function () {
        return this.layer instanceof AVLayer && !(this.layer.source instanceof CompItem) &&
            (this.layer.source instanceof FootageItem ?
                (this.layer.source.file === null || this.layer.source.file === "") :
                true);
    };
    NullInfo.prototype.header = function () {
        return "Null Info";
    };
    NullInfo.prototype.properties = function () {
        return [];
    };
    NullInfo.prototype.values = function () {
        return [];
    };
    return NullInfo;
}());
exports.NullInfo = NullInfo;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var objectCommon_1 = __webpack_require__(11);
var xmp_1 = __webpack_require__(6);
var PrecompInfo = /** @class */ (function (_super) {
    __extends(PrecompInfo, _super);
    function PrecompInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PrecompInfo.prototype.hasData = function () {
        if (this.layer instanceof AVLayer && this.layer.source instanceof CompItem) {
            var pc = this.layer.source;
            return pc.name !== null && pc.name.length > 0 &&
                pc.numLayers > 0;
        }
        return false;
    };
    PrecompInfo.prototype.header = function () {
        return "Precomp Info";
    };
    PrecompInfo.prototype.properties = function () {
        var retProps = [];
        if (this.layer instanceof AVLayer && this.layer.source instanceof CompItem) {
            var pc = this.layer.source;
            retProps.push(new xmp_1.XMPProperty("NumLayers", pc.numLayers));
            for (var i = 1; i <= pc.numLayers; i++) {
                retProps.push(new xmp_1.XMPProperty("LayerName", pc.layer(i).name));
            }
            if (this.hasMask()) {
                retProps.push(new xmp_1.XMPProperty("Inverted", this.getMaskInverted()));
            }
            return retProps;
        }
        return [];
    };
    PrecompInfo.prototype.values = function () {
        return [];
    };
    return PrecompInfo;
}(objectCommon_1.ObjectCommon));
exports.PrecompInfo = PrecompInfo;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var ObjectCommon = /** @class */ (function () {
    function ObjectCommon(layer) {
        this.layer = layer;
    }
    ObjectCommon.prototype.hasMask = function () {
        var masks = this.layer.property("Masks");
        if (masks === null) {
            return false;
        }
        var firstMask = masks.numProperties > 0 ? masks.property(1) : null;
        return firstMask !== null;
    };
    ObjectCommon.prototype.getMaskInverted = function () {
        var masks = this.layer.property("Masks");
        var firstMask = masks && masks.numProperties > 0 ? masks.property(1) : null;
        return firstMask.inverted ? "true" : "false";
    };
    return ObjectCommon;
}());
exports.ObjectCommon = ObjectCommon;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var util_1 = __webpack_require__(5);
var ScrollInfo = /** @class */ (function () {
    function ScrollInfo(layer) {
        this.layer = layer;
    }
    ScrollInfo.prototype.hasData = function () {
        return this.layer instanceof ShapeLayer &&
            (util_1.getLabelName(this.layer) === "Scroll" || this.layer.name.search("_RSC") > 0);
    };
    ScrollInfo.prototype.header = function () {
        return "Scroll Info";
    };
    ScrollInfo.prototype.properties = function () {
        return [];
    };
    ScrollInfo.prototype.values = function () {
        return [];
    };
    return ScrollInfo;
}());
exports.ScrollInfo = ScrollInfo;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var objectCommon_1 = __webpack_require__(11);
var util_1 = __webpack_require__(5);
var xmp_1 = __webpack_require__(6);
var ShapeInfo = /** @class */ (function (_super) {
    __extends(ShapeInfo, _super);
    function ShapeInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ShapeInfo.prototype.hasData = function () {
        return ((this.layer instanceof ShapeLayer &&
            (util_1.getLabelName(this.layer) === "RealTime" ||
                (this.layer.name.search("_RS") > 0 && this.layer.name.search("_RSC") === -1)))
            ||
                (this.layer instanceof AVLayer &&
                    this.layer.source instanceof FootageItem && this.layer.source.file !== null));
    };
    ShapeInfo.prototype.header = function () {
        return "Shape Info";
    };
    ShapeInfo.prototype.properties = function () {
        var retProps = [];
        if (this.hasRectangleShapeFill()) {
            retProps.push(new xmp_1.XMPProperty("FillColor", this.getShapeFillColor()));
        }
        else if (this.hasPath()) {
            retProps.push(new xmp_1.XMPProperty("FillColor", this.getPathFillColor()));
        }
        else if (this.hasSourceFile()) {
            retProps.push(new xmp_1.XMPProperty("File", this.getSourceFile()));
        }
        if (this.hasGradientFill()) {
            retProps.push(new xmp_1.XMPProperty("Gradient Fill", this.getShapeGradientFill()));
        }
        if (this.hasMask()) {
            retProps.push(new xmp_1.XMPProperty("Inverted", this.getMaskInverted()));
        }
        return retProps;
    };
    ShapeInfo.prototype.values = function () {
        return [];
    };
    ShapeInfo.prototype.hasSourceFile = function () {
        return (this.layer.source instanceof FootageItem &&
            this.layer.source.file !== null &&
            this.layer.source.file !== "");
    };
    ShapeInfo.prototype.hasPath = function () {
        var shapeName = util_1.getNumberedPropertyName(this.layer, ["Contents"], "Shape");
        if (shapeName.length > 0) {
            var pathName = util_1.getNumberedPropertyName(this.layer, ["Contents", shapeName, "Contents"], "Path");
            if (pathName.length > 0) {
                return this.layer
                    .property("Contents")
                    .property(shapeName)
                    .property("Contents")
                    .property(pathName)
                    .property("Path") !== null;
            }
        }
        return false;
    };
    ShapeInfo.prototype.hasRectangleShapeFill = function () {
        return this.layer.property("Contents") !== null &&
            this.layer.property("Contents").property("Rectangle 1") !== null &&
            this.layer.property("Contents").property("Rectangle 1").property("Contents").property("Fill 1") !== null;
    };
    ShapeInfo.prototype.getSourceFile = function () {
        var prettyPath = decodeURI(this.layer.source.file);
        var drive = prettyPath.substring(0, 3).match(/\/([a-z])\//i);
        if (drive != null) {
            prettyPath = prettyPath.replace(/\/[a-z]\//i, drive[1] + ":\/");
        }
        return prettyPath;
    };
    ShapeInfo.prototype.getPathFillColor = function () {
        var _this = this;
        return util_1.disableExpressions(this.layer, function () {
            var shapeName = util_1.getNumberedPropertyName(_this.layer, ["Contents"], "Shape");
            if (shapeName.length > 0) {
                var color = _this.layer
                    .property("Contents")
                    .property(shapeName)
                    .property("Contents")
                    .property("Fill 1")
                    .property("ADBE Vector Fill Color")
                    .value;
                return color[0] + "," + color[1] + "," + color[2] + "," + color[3];
            }
            else {
                return "";
            }
        });
    };
    ShapeInfo.prototype.getShapeFillColor = function () {
        var _this = this;
        return util_1.disableExpressions(this.layer, function () {
            var color = _this.layer
                .property("Contents")
                .property("Rectangle 1")
                .property("Contents")
                .property("Fill 1")
                .property("ADBE Vector Fill Color")
                .value;
            return color[0] + "," + color[1] + "," + color[2] + "," + color[3];
        });
    };
    ShapeInfo.prototype.hasGradientFill = function () {
        return (this.layer.property("Contents") !== null &&
            this.layer.property("Contents").property("Rectangle 1") !== null &&
            this.layer.property("Contents")
                .property("Rectangle 1")
                .property("Contents")
                .property("Gradient Fill 1") !== null);
    };
    ShapeInfo.prototype.getShapeGradientFill = function () {
        var gradient = this.layer
            .property("Contents")
            .property("Rectangle 1")
            .property("Contents")
            .property("Gradient Fill 1");
        var startPoint = gradient.property("Start Point").valueAtTime(0, false);
        var endPoint = gradient.property("End Point").valueAtTime(0, false);
        var opacity = gradient.property("Opacity").value;
        return startPoint[0] + "," + startPoint[1] + "," + endPoint[0] + "," + endPoint[1] + "," + opacity;
    };
    return ShapeInfo;
}(objectCommon_1.ObjectCommon));
exports.ShapeInfo = ShapeInfo;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var util_1 = __webpack_require__(5);
var xmp_1 = __webpack_require__(6);
var TextInfo = /** @class */ (function () {
    function TextInfo(layer) {
        this.layer = layer;
    }
    TextInfo.prototype.hasData = function () {
        return this.layer instanceof TextLayer && !!this.sourceText() && util_1.getLabelName(this.layer) === "RealTime";
    };
    TextInfo.prototype.header = function () {
        return "Text Info";
    };
    TextInfo.prototype.properties = function () {
        var _this = this;
        return util_1.disableExpressions(this.layer, function () {
            var doc = _this.sourceText().value;
            var properties = [
                new xmp_1.XMPProperty("Text", util_1.escapeMultilineValue(doc.text)),
                new xmp_1.XMPProperty("Font", doc.fontFamily),
                new xmp_1.XMPProperty("FontStyle", doc.fontStyle),
                new xmp_1.XMPProperty("FontSize", doc.fontSize),
                new xmp_1.XMPProperty("Justification", doc.justification),
                new xmp_1.XMPProperty("FillColor", doc.fillColor),
                new xmp_1.XMPProperty("HorizontalScale", doc.horizontalScale),
                new xmp_1.XMPProperty("VerticalScale", doc.verticalScale),
                new xmp_1.XMPProperty("Tracking", doc.tracking),
                new xmp_1.XMPProperty("FauxBold", doc.fauxBold),
                new xmp_1.XMPProperty("FauxItalic", doc.fauxItalic),
                new xmp_1.XMPProperty("AllCaps", doc.allCaps),
                new xmp_1.XMPProperty("SmallCaps", doc.smallCaps),
                new xmp_1.XMPProperty("Superscript", doc.superscript),
                new xmp_1.XMPProperty("Subscript", doc.subscript),
                new xmp_1.XMPProperty("Baseline02", doc.baselineLocs[0] + "," + doc.baselineLocs[2]),
            ];
            var linfo = _this.getLeadingInfo();
            if (linfo) {
                properties.push.apply(properties, [
                    new xmp_1.XMPProperty("Baseline", linfo.baseline),
                    new xmp_1.XMPProperty("Leading", linfo.leading),
                ]);
            }
            return properties;
        });
    };
    TextInfo.prototype.values = function () {
        return [];
    };
    TextInfo.prototype.sourceText = function () {
        return this.layer.property("Source Text");
    };
    TextInfo.prototype.getLeadingInfo = function () {
        var doc = this.sourceText().value;
        if (doc.baselineLocs.length < 8) {
            // Check to see if the text object has multiple lines, if it doesn't
            // then there is nothing we can do and the leading information is
            // not available. In the future, we want to modify the text value
            // and get it to recalculate the baselineLocs property. However just
            // setting a new text value does not seem to do that as initially
            // asserted.
            return null;
        }
        var srcRect = this.layer.sourceRectAtTime(0, false);
        var lineY = [
            doc.baselineLocs[1],
            doc.baselineLocs[5],
        ];
        return {
            baseline: lineY[0] - srcRect.top,
            leading: lineY[1] - lineY[0]
        };
    };
    return TextInfo;
}());
exports.TextInfo = TextInfo;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var text_1 = __webpack_require__(14);
var util_1 = __webpack_require__(5);
var Time = /** @class */ (function (_super) {
    __extends(Time, _super);
    function Time() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Time.prototype.header = function () {
        return "Time Text Info";
    };
    Time.prototype.hasData = function () {
        return this.layer instanceof TextLayer && util_1.getLabelName(this.layer) === "Time";
    };
    return Time;
}(text_1.TextInfo));
exports.Time = Time;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var xmp_1 = __webpack_require__(6);
var TrackMatteInfo = /** @class */ (function () {
    function TrackMatteInfo(layer, trackMatteName) {
        this.layer = layer;
        this.trackMatteName = trackMatteName;
    }
    TrackMatteInfo.prototype.header = function () {
        return "";
    };
    TrackMatteInfo.prototype.hasData = function () {
        return true;
    };
    TrackMatteInfo.prototype.properties = function () {
        return [
            new xmp_1.XMPProperty("HasTrackMatte", this.layer.hasTrackMatte),
            new xmp_1.XMPProperty("IsTrackMatte", this.layer.isTrackMatte),
            new xmp_1.XMPProperty("TrackMatteName", this.trackMatteName),
            new xmp_1.XMPProperty("TrackMatteType", this.trackMatteType()),
        ];
    };
    TrackMatteInfo.prototype.values = function () {
        return [];
    };
    TrackMatteInfo.prototype.trackMatteType = function () {
        for (var key in TrackMatteType) {
            if (Number(this.layer.trackMatteType) === Number(TrackMatteType[key])) {
                return key;
            }
        }
        return "";
    };
    return TrackMatteInfo;
}());
exports.TrackMatteInfo = TrackMatteInfo;


/***/ })
/******/ ]);