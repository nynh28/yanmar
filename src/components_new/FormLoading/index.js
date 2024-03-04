import React from 'react'
import { Spin } from "antd";
import './styles.css'

export default ({ loading = false, tip = "กำลังโหลด...", children }) => {
  return <Spin tip={tip} spinning={loading}>{children}</Spin>
}