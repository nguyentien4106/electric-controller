import React, { useEffect, useRef, useState } from 'react'
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Popover, Space } from 'antd';
import LogoutLink from '@/components/auth/LogoutLink';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Cookie } from '../lib/cookies';

const Item = ({ icon, value }) => (
    <Space align='center'>
        {icon}
        {value}
    </Space>
)
function UserComponent() {
    const [open, setOpen] = useState(false)
    const userRef = useRef()
    const userInfo = Cookie.getUserInfo()

    useEffect(() => {
        function handleClickOutside(event) {
          if (userRef.current && !userRef.current.contains(event.target)) {
            setOpen(false)
          }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
        
      }, [userRef]);

    const content = (
        <div
            className='user-options'
        >
            <div className='user-option'>
                <Item 
                    value={<strong style={{textAlign: "center"}}>Xin chào {userInfo.username}</strong>} 
                />
            </div>
            <div className='user-option'>
                <Item 
                    icon={<img width="16" height="16" src="https://img.icons8.com/ios/50/exit--v1.png" alt="exit--v1"/>} 
                    value={<LogoutLink />} 
                />
            </div>
        </div>
    )


    return (
        <div className='pointer user' ref={userRef}>
            <Avatar
                size={48}
                icon={<UserOutlined />}
                style={{ backgroundColor: 'rgb(203 159 125)' }}
                onClick={() => setOpen(true)}
            />

            {
                open && content
            }

        </div>
    )
}

export default UserComponent
