import React from 'react'
import { Spin } from 'antd'

export default function Loading() {
    return (
        <Spin size='large' fullscreen style={{fontSize : 64, color: "green"}} tip={<div>Loading</div>}/>
    )
}
