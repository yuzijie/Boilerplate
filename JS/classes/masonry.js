var Masonry = function (parent, options) {
    if (parent) {
        this.parent = (parent.nodeType) ? $(parent) : parent;
        this.parent.css("position", "relative");
    } else {
        throw "No parent";
    }

    options = options || {};
    this.colNum = options.colNum || 3;
    this.childSelector = options.childSelector || null;
    this.gutter = options.gutter || 0.0125; // 12px of 960px, this is a ratio of parentWidth
    this.children = this.parent.children(this.childSelector);
};

Masonry.prototype.setColWidth = function () {
    this.colWidth = (1 - (this.gutter * (this.colNum - 1))) / this.colNum;
    return this;
};

Masonry.prototype.renderGrid = function (options) {
    if (options) {
        if (options.colNum) this.colNum = options.colNum;
        if (options.gutter) this.gutter = options.gutter;
        this.setColWidth();
    }

    var self = this, children = this.children, newTop = 0, newLeft = 0, i;
    var parentWidth = this.parent.width();
    var colWidth = (this.colWidth * 100) + "%";
    var verticalGutter = parentWidth * self.gutter;
    var horizontalGutter = parentWidth * self.gutter * 0.95;

    var columns = [], columnsHeight = [];
    for (i = 0; i < this.colNum; i++) {
        columns.push([]);
        columnsHeight.push(0);
    }

    children.each(function (index) {
        $(this).css({position: "absolute", width: colWidth});
        var block;

        if (index < self.colNum) {
            columns[index].push(index);
            columnsHeight[index] += $(this).outerHeight() + horizontalGutter;

            if (index > 0) {
                block = children.eq(index - 1);
                var px = block.position().left + block.outerWidth() + verticalGutter;
                newLeft = ((px / parentWidth) * 100) + "%";
                $(this).css({top: 0, left: newLeft});
            }

        } else {
            var colId = columnsHeight.indexOf(Math.min.apply(null, columnsHeight));
            var blockId = columns[colId][columns[colId].length - 1];
            block = children.eq(blockId);

            newLeft = ((block.position().left / parentWidth) * 100) + "%";
            newTop = block.position().top + block.outerHeight() + horizontalGutter + "px";
            $(this).css({top: newTop, left: newLeft});

            columns[colId].push(index);
            columnsHeight[colId] += $(this).outerHeight() + horizontalGutter;
        }
    });
};

module.exports = Masonry;