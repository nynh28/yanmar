import React from 'react'
import { Spin } from "antd";
import './styles.css'

export default ({ loading = false, tip = "กำลังโหลด...", children }) => {
  return (
    <>
      <div className='overflow-hidden w-full h-full bg-[#03030394] flex items-center justify-center fixed top-0 left-0 z-[999]'>
        <div className='w-[250px] h-[150px] rounded-[8px] bg-white flex'>
          <Spin className='m-auto' tip={tip} spinning={true}>{children}</Spin>
        </div>
      </div>
    </>
  )
}
