/**
 * Created by Administrator on 2016/3/17.
 */
hBgSnow = (function (d) {
    function l() {
        var t = arguments;
        var u = Math.random();
        if (t.length == 2) {
            t[0] = parseInt(t[0]);
            t[1] = parseInt(t[1]);
            if (t[0] == t[1]) {
                return t[0]
            }
            if (!isNaN(t[0]) && !isNaN(t[1]) && (t[1] > t[0])) {
                u = t[0] + u * (t[1] - t[0]);
                return Math.round(u)
            } else {
                throw new Error("args error");
                return 0
            }
        } else {
            if (t.length == 1 && (t[0] instanceof Array)) {
                return t[0][Math.floor(u * t[0].length)]
            } else {
                throw new Error("args count error");
                return 0
            }
        }
    }

    var b;
    var a;
    var r;
    var o = [];
    var k = ["white"];
    var s = 50;
    var c = 5;
    var j = 3;
    var q = 0.5;
    var p = 0.5;
    var g = 80;
    var i = 0;
    var h = 0;
    var f = 100;
    if (window.addEventListener) {
        window.addEventListener("resize", m, false)
    } else {
        if (window.attachEvent) {
            window.attachEvent("resize", m)
        }
    }
    function m() {
        b.width = d(b).parent().width();
        b.height = d(b).parent().height();
        n.prototype.maxX = b.width;
        n.prototype.maxY = b.height
    }

    var n = function () {
        this.alive = true;
        this.x = l(0, this.maxX);
        this.y = l(0, this.maxY);
        this.currentSize = 0;
        this.color = l(k);
        this.size = l(1, c);
        this.spedX = parseFloat(l(["+", "-"]) + l(1, 3) * q);
        this.spedY = parseFloat(l(["+", "-"]) + l(1, 3) * p)
    };
    n.prototype.maxX = 300;
    n.prototype.maxY = 400;
    n.prototype.haveGoal = false;
    n.prototype.checkSnow = function () {
        if (this.x > (this.maxX + this.size) || this.x < (0 - this.size)) {
            this.alive = false;
            return
        } else {
            if (this.y > (this.maxY + this.size) || this.y < (0 - this.size)) {
                this.alive = false;
                return
            }
        }
    };
    n.prototype.getNextSnowPos = function () {
        var w = 5;
        var x = Math.sqrt(Math.pow(i - this.x, 2) + Math.pow(h - this.y, 2));
        var t = 5;
        if (this.haveGoal) {
            if (x < 3) {
                this.x = i;
                this.y = h;
                this.alive = false
            } else {
                this.x = ((i - this.x) / x) * t + this.x;
                this.y = ((h - this.y) / x) * t + this.y
            }
        } else {
            var v = arguments[0] || this.spedX;
            var u = arguments[1] || this.spedY;
            if (v == 0 && u == 0) {
            }
            this.x = this.x + v;
            this.y = this.y + u;
            if (this.currentSize < this.size) {
                this.currentSize += 0.3
            }
        }
    };
    n.prototype.drawSnow = function () {
        r.beginPath();
        r.fillStyle = this.color;
        r.shadowColor = this.color;
        r.shadowBlur = j;
        r.arc(this.x, this.y, this.currentSize, 0, 2 * Math.PI);
        r.closePath();
        r.fill()
    };
    function e(t, v) {
        function u(y) {
            if (y.offsetX || y.layerX) {
                i = y.offsetX == undefined ? y.LayerX : y.offsetX;
                h = y.offsetY == undefined ? y.LayerY : y.offsetY
            }
            for (var w = 0; w < o.length; w++) {
                var x = Math.sqrt(Math.pow(o[w].x - i, 2) + Math.pow(o[w].y - h, 2));
                if (x < f) {
                    o[w].haveGoal = true
                } else {
                    o[w].haveGoal = false
                }
            }
        }

        if (b.addEventListener) {
            b.addEventListener("mousemove", u, false);
            b.addEventListener("mouseover", function () {
            }, false);
            b.addEventListener("mouseout", function () {
                console.log("false");
                for (var w = 0; w < o.length; w++) {
                    o[w].haveGoal = false
                }
            }, false)
        } else {
            if (b.attachEvent) {
                b.attachEvent("mousemove", u);
                b.attachEvent("mouseover", function () {
                    n.prototype.haveGoal = true
                });
                b.attachEvent("mouseout", function () {
                    console.log(message);
                    n.prototype.haveGoal = false
                })
            }
        }
    }

    return function () {
        b = document.getElementById(arguments[0]["canvas"]);
        if (!b.getContext) {
            return
        }
        r = b.getContext("2d");
        var t = arguments[0];
        k = t["colors"] || k;
        s = t["snowsCount"] || s;
        c = t["snowSize"] || c;
        j = t["shadowSize"] || j;
        q = t["spedMaxX"] || q;
        p = t["spedMaxY"] || p;
        g = t["freshTime"] || g;
        if (t["onmousemove"]) {
            f = t["onmousemove"]["getRadious"] || f
        }
        b.width = d(b).parent().width();
        b.height = d(b).parent().height();
        n.prototype.maxX = b.width;
        n.prototype.maxY = b.height;
        for (var u = 0; u < s; u++) {
            o[u] = new n();
            o[u].drawSnow()
        }
        a = setInterval(function () {
            r.clearRect(0, 0, b.width, b.height);
            for (var v = 0; v < o.length; v++) {
                o[v].checkSnow();
                if (o[v].alive) {
                    o[v].getNextSnowPos()
                } else {
                    o[v] = new n()
                }
                o[v].drawSnow()
            }
        }, g);
        if (t["onmousemove"] && t["onmousemove"]["run"]) {
            e()
        }
    }
})($);