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