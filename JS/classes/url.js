var Url = function (url) {
    this.element = document.createElement("a");
    this.element.href = url;
    this.init();
};

Url.prototype.init = function () {
    this.protocol = this.element.protocol;   //  "http:"
    this.hostname = this.element.hostname;   //  "yuz.me"
    this.port = this.element.port;           //  "3000"
    this.pathname = this.element.pathname;   //  "/pathname/"
    this.search = this.element.search;       //  "?search=test"
    this.hash = this.element.hash;           //  "#hash"
    this.host = this.element.host;           //  "yuz.me:3000"
    this.origin = this.element.origin;       //  "http://yuz.me"
};

Url.prototype.getCleanPath = function () {
    var l = this.pathname.length;

    if (this.pathname.charAt(l - 1) == "/") {
        return this.pathname.substr(1, l - 2);
    } else {
        return this.pathname.substr(1, l - 1);
    }
};

module.exports = Url;