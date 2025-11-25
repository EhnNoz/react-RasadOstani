import React from 'react'

function PaperCharts({ title, chart, backgroundColor, backgroundTitle, height }) {
  return (
    <div  style={{ height: height ? height : null, backgroundColor: backgroundColor ? backgroundColor : "" }}
      className=' bg-white  shadow-sm  rounded-md'>
      <div className='flex-col'>
        <div style={{}}  className='flex justify-end pr-3  h-12 text-[#8E8E93]  flex items-center justify-center text-[16px] ' >
          {title}
        </div>

        <div>
          {chart}
        </div>

      </div>
    </div>
  )
}

export default PaperCharts
