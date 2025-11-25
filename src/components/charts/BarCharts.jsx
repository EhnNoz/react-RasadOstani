import React, { useEffect } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

// import HC_exporting from 'highcharts/modules/exporting'

// ماژول‌ها
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

function BarCharts({

    data,
    height,
    color,
    marginRight,
    marginTop,
    backgroundButton,
    marginBot,
    marginLeft,
    type,
    bgcolor,
    width, legend
}) {









    const options =
    {
        navigation: {
            buttonOptions: {
                theme: {
                    r: 5,
                    fill: backgroundButton ? backgroundButton : null,
                }
            }
        },
        tooltip: {
            formatter: function () {
                return this.y.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ':میزان ';
            }
        },
        boost: {
            useGPUTranslations: true,
            usePreAllocated: true
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
            type: type ? type : 'column',
            height: height ? height : '',
            width: width ? width : '',
            styleMode: true,
            marginTop: marginTop ? marginTop : 50,
            marginRight: marginRight ? marginRight : 50,
            marginBot: marginBot ? marginBot : 1,
            marginLeft: marginLeft ? marginLeft : null,
            backgroundColor: bgcolor ? bgcolor : null,
            color: '#b182e3',
            style: {
                color: '#b182e3',
                borderBottomLeftRadius: '25px',
                borderBottomRightRadius: '25px',
                fontFamily: 'YekanBakh_Regular',

            }
        },
        credits: {
            // Remove highcharts.com credits link from chart footer.
            enabled: false,
        },
        title: {
            text: '',
            align: ''
        },
        legend: {
            enabled: legend ? legend : false
        },

        xAxis: {
            categories: data ? data[0]?.categories : null,


        },
        yAxis: {
            title: {
                text: '',
            },
            text: {

                fontSize: '10px'
            },
            labels: {

                style: {
                    fontSize: 15,
                    fontFamily: ''
                }
            },
            enabled: true,
            min: 0,

        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            },

            series: {
                color: color ? color : "#b182e3",
                point: {
                    events: {


                    }
                },
                lineWidth: 10
            }

        },
        series: data ? data : null
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

export default BarCharts
