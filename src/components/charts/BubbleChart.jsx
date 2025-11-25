import HighchartsReact from 'highcharts-react-official';
import React from 'react'
import Highcharts from 'highcharts'
import HC_more from 'highcharts/highcharts-more' //module
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsBoost from "highcharts/modules/boost";

import exportingModule from 'highcharts/modules/exporting'
import exportDataModule from 'highcharts/modules/export-data'
function BubbleChart({ data, height, width, backgroundColor, marginTop, marginLeft, marginRight, marginBot }) {

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
        chart: {
            type: 'packedbubble',
            height: '430px',
            height: height ? height : '',
            width: width ? width : '',
            styleMode: true,
            marginTop: 10,
            backgroundColor: backgroundColor ? backgroundColor : null,
            marginTop: marginTop ? marginTop : null,
            marginRight: marginRight ? marginRight : null,
            marginBot: marginBot ? marginBot : null,

            fontFamily: 'Ray_Bold',
            marginLeft: marginLeft ? marginLeft : null,
            style: {
                borderBottomLeftRadius: '25px',
                borderBottomRightRadius: '25px',
                fontSize: 18,
                fontFamily: 'Ray_Bold',
            }
        },
        title: {
            text: '',
            align: 'left'
        },
        credits: {
            // Remove highcharts.com credits link from chart footer.
            enabled: false,
        },

        subtitle: {
            text: '',
            align: 'left'
        },
        tooltip: {
            useHTML: true,
            pointFormat: ''
        },
        plotOptions: {
            packedbubble: {
                minSize: '10%',
                maxSize: '200%',
                zMin: 2,
                zMax: 30,
                layoutAlgorithm: {
                    splitSeries: false,
                    gravitationalConstant: 0.02
                },
                dataLabels: {
                    enabled: true,
                    format: '{point.name}',
                    filter: {
                        property: 'y',
                        operator: '>',
                        value: 10
                    },
                    style: {
                        color: 'black',
                        textOutline: 'none',
                        fontWeight: 'normal'
                    }
                }
                
            }
        },
        series: data ? data : null

    };





    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
        />
    )
}

export default BubbleChart
