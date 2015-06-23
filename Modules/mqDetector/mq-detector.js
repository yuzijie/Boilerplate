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
