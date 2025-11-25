import React from 'react'
import Highcharts from 'highcharts'
import wordcloud from 'highcharts/modules/wordcloud'

import HighchartsReact from 'highcharts-react-official'





function AbrEbarat({
 height,
  data,
  width,
  marginTop,
  marginRight,
  backgroundColor,
  marginBot,
  marginLeft,
}) {



  const options = {
    chart: {
      boost: {
        useGPUTranslations: true,
        usePreAllocated: true
      },
      height: height ? height : '',
      width: width ? width : '',
      styleMode: true,
  
      backgroundColor: backgroundColor ? backgroundColor : null,
      marginTop: marginTop ? marginTop : null,
      marginRight: marginRight ? marginRight : null,
      marginBot: marginBot ? marginBot : null,

      fontFamily: 'yekanBakh_Regular',
      rotation: {
        from: 0,
        to: 0
      },
      marginLeft: marginLeft ? marginLeft : null,
      style: {
        borderBottomLeftRadius: '25px',
        borderBottomRightRadius: '25px',
        fontFamily: 'yekanBakh_Regular',
      }
    },
    accessibility: {
      screenReaderSection: {
        beforeChartFormat: ''
      }
    },
    exporting: {

      buttons: {
        contextButton: {
          menuItems: [
            "viewFullscreen", "printChart", "downloadPDF", "downloadPNG", "downloadSVG", "downloadCSV"
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
    credits: {
      enabled: false
    },
    series: [{
      rotation: {
    from: 0,
    to: 0
  },
      type: 'wordcloud',
      placementStrategy: 'center',
      name: 'تعداد',
      fontFamily: 'yekanBakh_Regular',
      style: {
        fontFamily: 'yekanBakh_Regular',
      },
      data: data ? data : [
        { name: 'ازدواج ', weight: 10 },
        { name: 'تشکیل خانواده', weight: 12 },
        { name: 'طنز', weight: 41 },
        { name: 'شکایت', weight: 40 },
        { name: 'حقوق', weight: 50 },
        { name: 'طلاق', weight: 12 },
        { name: 'اقتصاد', weight: 30 },
        { name: 'رسانه', weight: 50 },
        { name: 'حمایت', weight: 9 },
        { name: 'مشکلات', weight: 12 }
      ]
    }],
    title: {
      text: '',
      align: ''
    },
    subtitle: {
      text: '',
      align: ''
    },
    tooltip: {
      headerFormat: '<span style="font-size: 16px"><b>{point.key}</b></span><br>'
    },
    plotOptions: {
      series: {
        cursor: 'pointer',
        point: {

        }
      }
    }
  }




  return (
    <>

      <div>

        <HighchartsReact
          highcharts={Highcharts}
          options={options}
        />
      </div>
    </>
  )
}

export default AbrEbarat
