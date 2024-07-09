import React from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
const MenuItems = () => {
    const navigate = useNavigate()


    const items = [
        {
            key: 'account-setting',
            label: 'Cài đặt',
            icon: <SettingOutlined />,
            children: [
                {
                    key: 'info',
                    label: 'Thông tin tài khoản',
                    onClick: () => navigate("/account")
                },
                {
                    key: 'password',
                    label: 'Mật khẩu',
                    onClick: () => navigate("/account/change-password")
                },
            ],
        }
    ];

    const onClick = (e) => {
    };

    return (
        <Menu
            onClick={onClick}
            style={{
                width: 256,
            }}
            defaultSelectedKeys={['info']}
            defaultOpenKeys={['account-setting']}
            mode="inline"
            items={items}
            // inlineCollapsed={true}
        />
    );
};
export default MenuItems;