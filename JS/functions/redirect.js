var redirect = function (url) {
    if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))) {
        location.replace(url);
    } else {
        document.location = url;
    }
};

module.exports = redirect;
