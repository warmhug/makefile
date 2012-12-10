
seajs.config({
    alias: {
        'zepto': 'zepto/1.0.0/zepto'
    },
    debug: 1
});


define(function (require, exports, module) {
    var $ = require('zepto');

    var proj = {
        //初始化
        init: function () {

        },
        // 开始
        start: function () {

        }
    };
    $(function () {
        proj.init();
    });

    //调试元素
    function log(value) {
        var ele = document.getElementById('test_log_element');
        if (ele != null) {
            ele.innerHTML += '<br />' + value;
        } else {
            var span = document.createElement('span');
            span.id = "test_log_element";
            span.innerHTML = value;
            span.style.cssText = "position:fixed;left:0;top:0;background:rgba(0,0,0,.5);color:#fff;padding:5px";
            document.body.appendChild(span);
        }
    }

    function jsonp() {
        // jsonp 请求测试
        $.ajax({
            url: '',
            type: "GET",
            dataType: "jsonp",
            data: {
                'a': encodeURIComponent('b'),
                'c': 1
            },
            error: function () { return false; },
            success: function (json) {
                alert(json.stat);
            }
        });
    }
})