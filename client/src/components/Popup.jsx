import React from 'react'

const Popup = (props) => {
  return (props.trigger)?(
    <div id="popup" className='fixed z-10 top-[0%] left-[0%] w-[100vw] h-[130vh]  flex bg-[rgba(0,0,0,0.8)] justify-center'>
      <div id='popup-inner' className='p-[32px] h-full   max-w-[640px] '>
                {props.children}
                {/* <button id="close-btn" className=' absolute top-[45%]   text-black' onClick={()=>props.setTrigger(false)}>close</button> */}
      </div>
    </div>
  )
  : ""
}

export default Popup;