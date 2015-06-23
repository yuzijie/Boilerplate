(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var MQD = require("../mq-detector.js");

var detector = new MQD();

detector
    .enter("huge", function () {
        $('#enter').text("Enter: > 1140px")
    })
    .enter("large", function () {
        $('#enter').text("Enter: 960px ~ 1140px")
    })
    .enter("medium", function () {
        $('#enter').text("Enter: 768px ~ 960px")
    })
    .enter("small", function () {
        $('#enter').text("Enter: 640px ~ 768px")
    })
    .enter("tiny", function () {
        $('#enter').text("Enter: 480px ~ 640px")
    })
    .enter("dust", function () {
        $('#enter').text("Enter: < 480px")
    })
    .leave("huge", function () {
        $('#leave').text("Leave Huge")
    })
    .leave("large", function () {
        $('#leave').text("Leave Large")
    })
    .leave("medium", function () {
        $('#leave').text("Leave Medium")
    })
    .leave("small", function () {
        $('#leave').text("Leave Small")
    })
    .leave("tiny", function () {
        $('#leave').text("Leave Tiny")
    })
    .leave("dust", function () {
        $('#leave').text("Leave Dust")
    });

$(window).on("resize load", function () {
    $("#pixel").text($(window).width());
});
},{"../mq-detector.js":2}],2:[function(require,module,exports){
var MediaQueryDetector = function () {
    this.currentBP = null;
    this.lastBP = null;
    this.enterList = {};
    this.leaveList = {};

    this.setResizeListener();
};

MediaQueryDetector.prototype.setResizeListener = function () {
    var self = this;

    $(window).on('resize orientationchange load', function () {
        self.currentBP = self.getBP();
        if (self.currentBP !== self.lastBP) {
            if (self.leaveList[self.lastBP]) self.leaveList[self.lastBP]();
            if (self.enterList[self.currentBP]) self.enterList[self.currentBP]();
            self.lastBP = self.currentBP;
        }
    });
};

MediaQueryDetector.prototype.addAction = function (bp, fn, actionList) {
    var i;
    if (typeof fn !== 'function') return this;

    if (typeof bp === 'string') {
        actionList[bp] = fn;
    } else if (bp instanceof Array) {
        for (i = 0; i < bp.length; i++) actionList[bp[i]] = fn;
    }
    return this;
};

MediaQueryDetector.prototype.enter = function (bp, fn) {
    return this.addAction(bp, fn, this.enterList);
};

MediaQueryDetector.prototype.leave = function (bp, fn) {
    return this.addAction(bp, fn, this.leaveList);
};

MediaQueryDetector.prototype.getBP = function () {
    var bp;

    if (window.getComputedStyle) {
        bp = window.getComputedStyle(document.documentElement, null).getPropertyValue("font-family");
    } else if (document.documentElement.currentStyle) {
        bp = document.documentElement.currentStyle["fontFamily"];
    } else {
        return null;
    }

    return bp.replace(/['",]/g, '');
};

module.exports = MediaQueryDetector;

},{}]},{},[1]);
