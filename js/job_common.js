
$(function() {
    $.fn.datetimepicker.dates['cn'] = {
        days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
        daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        daysMin: ["日", "一", "二", "三", "四", "五", "六", "日"],
        months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        monthsShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        today: "今日",
        meridiem: ''
    };
    $(".datetimepicker").datetimepicker({
        language: 'cn',
        weekStart: 1,
        //todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        forceParse: 0,
        showMeridian: 1,
        format: 'yyyy-mm-dd hh:ii:ss',
    });

    $(".datepicker").datetimepicker({
        language: 'cn',
        weekStart: 1,
        //todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        forceParse: 0,
        minView: 2,
        showMeridian: 1,
        format: 'yyyy-mm-dd',
    });

    $.fn.personal_chart = function (title, subtitle, aX, sY, data, formatter) {
        var defaultFormatter = function () {
          return this.y;
        };
        var options = {
            chart: {
                type: 'bar'
            },
            title: {
                text: title
            },
            subtitle: {
                text: subtitle
            },
            xAxis: {
                categories: aX,
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: sY
                }
            },
            plotOptions : {
                bar: {
                    dataLabels: {
                        enabled: true,
                        formatter : formatter == undefined ? defaultFormatter : formatter
                    }
                }
            },
            // tooltip: {
            //     headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            //     pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            //     '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
            //     footerFormat: '</table>',
            //     shared: true,
            //     useHTML: true
            // },
            series: data,
        }
        this.highcharts(options);
    };



    window.JOB = {
        TASK_STATUS_INIT : 0,
        TASK_STATUS_DOING : 1,
        TASK_STATUS_PAUSE : 2,
        TASK_STATUS_FINISH : 4,
        showSuccess : function (msg, keyValArr, succ_redirect_url) {
            if (succ_redirect_url != undefined) {
                $("#tipModal .ok").attr("href", succ_redirect_url);
                $("#tipModal .ok").removeAttr("data-dismiss");
            } else {
                $("#tipModal .ok").removeAttr("href");
                $("#tipModal .ok").attr("data-dismiss", "modal");
            }
            if (keyValArr instanceof Object) {
                var html = '';
                for (var k in keyValArr) {
                    html += "<tr><td>" + k + "：</td><td>" + keyValArr[k] + "</td></tr>";
                }
                $("#tipModal .msg tbody").html(html);
            }
            if (msg != undefined) {
                $("#tipModal .msgContent").html(msg);
            }
            $("#tipModal").modal('show');
        },

        showError : function (msg) {
            $("#errorModal .content").html(msg);
            $("#errorModal").modal('show');
        },

        showResponseError : function (re) {
            $("#errorModal .content").html(re.msg ? re.msg : "服务器返回为空");
            $("#errorModal").modal('show');
        },

        post : function (cls, func, data, callback) {
            $.post('ajax/' + cls + '?act=' + func, data, function(re) {
                if (typeof re == "object") {
                    if (re.result == false) {
                        window.JOB.showError(re.text);
                    } else {
                        if (typeof callback == "function") {
                            callback(re.text);
                        }
                    }
                } else {
                    window.JOB.showError(re);
                }
            });
        },
    };
});