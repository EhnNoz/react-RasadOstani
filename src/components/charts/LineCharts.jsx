import React from 'react'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'
import exportingModule from 'highcharts/modules/exporting'
import exportDataModule from 'highcharts/modules/export-data'


const converters = {
    // Latin to Farsi
    fa: function (number) {
        return number.toString().replace(/\d/g, function (d) {
            return String.fromCharCode(d.charCodeAt(0) + 1728);
        });
    },
    // Latin to Arabic
    ar: function (number) {
        return number.toString().replace(/\d/g, function (d) {
            return String.fromCharCode(d.charCodeAt(0) + 1584);
        });
    }
};
function LineCharts({ type,
    data,
    height, marginRight,
    marginLeft, marginBot, color,
    legend,
    backgroundButton, width, margintTop, backgroundColor, colorY,
    colorX,
    onPointClick,
    chartFilters,
    name,
    setChartFilters

}) {



    const options = {
        plotOptions: {
            series: {

                line: {
                    lineWidth: 2,
                },
                color: 'transparent', // رنگ کلی را شفاف کنیم
                fillColor: {
                    linearGradient: {
                        x1: 1, x2: 1, y1: 1, y2: 0  // جهت گرادیان
                    },
                    stops: [
                        [0, '#FFFFFF'],  // شروع از سفید
                        [1, '#D1A7E4']   // به بنفش ملایم
                    ]
                },
                // color: color ? color : "#039BE5",
                point: {
                    events: {
                        click: function () {
                            if (typeof onPointClick === 'function') {
                                onPointClick(
                                    {
                                        y: this.y,
                                        x: this.x,
                                        category: this.category,
                                        seriesName: this.series.name,
                                    },
                                    name // پاس دادن نوع چارت
                                );


                            }
                        }
                    }
                },

            }
        },
        legend: {
            enabled: legend ? true : false,
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },
        navigation: {
            buttonOptions: {
                theme: {


                    r: 5,
                    fill: backgroundButton ? backgroundButton : null,

                }
            }
        },

        exporting: {
            enabled: true,
            buttons: {
                contextButton: {
                    menuItems: [
                        "viewFullscreen",
                        "printChart",
                        "downloadPNG",
                        "downloadSVG",
                        "downloadPDF",
                        "downloadCSV",   // اینجا CSV اضافه شده
                    ]
                }
            }
        },
        lang: {
            viewFullscreen: "نمایش در کل صفحه",
            printChart: "پرینت نمودار",
            downloadPNG: "PNG دانلود",
            downloadSVG: "SVG دانلود",
            downloadPDF: "PDF دانلود ",
            downloadCSV: "CSV دانلود",
            noData: 'دیتایی وجود ندارد '
        },
        chart: {
            numberFormatter: function () {
                const ret = Highcharts.numberFormat.apply(0, arguments);
                return converters.ar(ret);
            },
            boost: {
                enabled: true
            },
            type: type ? type : 'spline',
            height: height ? height : '',
            fontFamily: 'YekanBakh_Regular',
            width: width ? width : '',
            marginBot: marginBot,
            marginLeft: marginLeft,
            marginTop: margintTop ? margintTop : 30,
            marginRight: marginRight ? marginRight : 50,
            backgroundColor: backgroundColor,


            color: {
                linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                stops: [
                    [0, ''],
                    [1, '']
                ]
            },
            styleMode: true,
            style: {
                borderBottomLeftRadius: '25px',
                borderBottomRightRadius: '25px',
                fontFamily: 'YekanBakh_Regular',

            }
        },
        title: {
            text: '',
            align: ''
        },

        subtitle: {
            text: '',
            align: ''
        },
        credits: {
            // Remove highcharts.com credits link from chart footer.
            enabled: false,
        },
        yAxis: {
            labels: {
                align: 'right',
                format: '{value}',
                formatter: function () {
                    var value = this.value
                    if (value >= 1000000) {
                        return (value / 1000000).toFixed(1) + 'M';
                    } else if (value >= 1000) {
                        return (value / 1000).toFixed(1) + 'K';
                    } else {
                        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                },
                style: {
                    color: colorY,
                    fontFamily: '',
                    direction: 'ltr'
                }
            },

            title: {
                text: ''
            }
        },

        xAxis: {
            categories: data ? data[0].categories : null,


            style: {
                color: '#'
            },

            labels: {
                emabled: true,
                style: {
                    color: colorX,
                    fontFamily: ''
                }
            },

        },

        tooltip: {
            formatter: function () {
                return this.y.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ':تعداد ';
            }
        },


        series: data ? data : null,
        responsive: {
            rules: [{
                condition: {
                    maxWidth: '100%'
                },

            }]
        }

    }




    return (
        <>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        </>
    )
}

export default LineCharts
