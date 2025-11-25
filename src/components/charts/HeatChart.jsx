import React from 'react'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'
import exportingModule from 'highcharts/modules/exporting'
import exportDataModule from 'highcharts/modules/export-data'
import HeatmapModule from 'highcharts/modules/heatmap';

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
function HeatChart({
    data,
    height, marginRight,
    marginLeft, marginBot,
    width, margintTop, backgroundColor,

}) {



    const options = {
        chart: {
            numberFormatter: function () {
                const ret = Highcharts.numberFormat.apply(0, arguments);
                return converters.ar(ret);
            },
            boost: {
                enabled: true
            },
            type: 'heatmap',
            height: height ? height : '',
            width: width ? width : '',
            marginBot: marginBot,
            marginLeft: marginLeft,
            marginTop: margintTop ? margintTop : 30,
            marginRight: marginRight ? marginRight : 50,
            backgroundColor: backgroundColor,
            fontFamily: '',

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

        },
        credits: {
            // Remove highcharts.com credits link from chart footer.
            enabled: false,
        },
        xAxis: {

            categories: data ? data.xAxis?.categories : null
        },

        yAxis: {
            categories: data ? data.yAxis?.categories : null,
            title: {
                text: '',
            },
        },

        accessibility: {
            point: {
                descriptionFormat: '{(add index 1)}. ' +
                    '{series.xAxis.categories.(x)} sales ' +
                    '{series.yAxis.categories.(y)}, {value}.'
            }
        },

        colorAxis: {
            min: 0,
            minColor: 'var(--highcharts-background-color, #FFFFFF)',
            maxColor: Highcharts.getOptions().colors[0]
        },



        tooltip: {
            format: '<b>{series.xAxis.categories.(point.x)}</b> ساعت<br>' +
                '<b>{point.value}</b> آیتم در <br>' +
                '<b>{series.yAxis.categories.(point.y)}</b>'
        },

        series: [{
            name: 'Sales per employee',
            borderWidth: 0,
            borderRadius: 8,
            data: data ? data.series[0].data : null,

        }],
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
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    yAxis: {
                        labels: {
                            format: '{substr value 0 1}'
                        }
                    }
                }
            }]
        }

    }
    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
        />
    )
}

export default HeatChart
