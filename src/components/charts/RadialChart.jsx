import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import exportingModule from 'highcharts/modules/exporting'
import exportDataModule from 'highcharts/modules/export-data'
function RadialChart({ data, height }) {




    const options = {
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
        colors: ['#FFD700', '#C0C0C0', '#CD7F32'],
        chart: {
            type: 'column',
            inverted: true,
            height: height ? height : 400,
            polar: true,
            fontFamily: 'Ray'
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ': ' +
                '' +
                ''
        },
        tooltip: {
            outside: true
        },
        credits: {
            enabled: false
        },
        pane: {
            size: '100%',
            innerSize: '10%',
            endAngle: 270
        },
        xAxis: {
            tickInterval: 1,
            labels: {
                align: 'right',
                allowOverlap: true,
                step: 1,
                y: 3,
                style: {
                    fontFamily: 'Ray_Bold',
                    fontSize: '13px'
                }
            },
            lineWidth: 0,
            gridLineWidth: 0,
            categories: data ? data.categories : [
                'Norway <span class="f16"><span id="flag" class="flag no">' +
                '</span></span>',
                'United States <span class="f16"><span id="flag" class="flag us">' +
                '</span></span>',
                'Germany <span class="f16"><span id="flag" class="flag de">' +
                '</span></span>',
                'Austria <span class="f16"><span id="flag" class="flag at">' +
                '</span></span>',
                'Canada <span class="f16"><span id="flag" class="flag ca">' +
                '</span></span>'
            ]
        },
        yAxis: {
            fontFamily: 'Ray_Bold',
            labels: {
                style: {
                    fontFamily: 'Ray',
                    fontSize: '13px'
                }
            }
            ,
            lineWidth: 0,
            tickInterval: data ? data.max_value : null,
            reversedStacks: false,
            endOnTick: true,
            showLastLabel: true,
            gridLineWidth: 0
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                borderWidth: 0,
                pointPadding: 0,
                groupPadding: 0.15,
                borderRadius: '50%'
            }
        },
        series: data ? data.series : [{
            name: 'Gold medals',
            data: [148, 113, 104, 71, 77]
        }, {
            name: 'Silver medals',
            data: [113, 122, 98, 88, 72]
        }, {
            name: 'Bronze medals',
            data: [124, 95, 65, 91, 76]
        }]
    }

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
        />
    )
}

export default RadialChart
