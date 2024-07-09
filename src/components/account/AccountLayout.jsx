import React, { useState } from "react";

import { Layout, Menu, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { SettingOutlined } from '@ant-design/icons';
import { ACCOUNT_ROUTE_PATH, COLLABORATORS_ROUTE_PATH, COLLABORATOR_ROUTE_PATH, CUSTOMER_ROUTE_PATH } from "../../constant/paths";
const { Header, Content, Sider } = Layout;

const isMobile = window.innerWidth < 768;

const AccountLayout = () => {
    const [collapsed, setCollapsed] = useState(isMobile);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const navigate = useNavigate()

    const items = [
        {
            key: 'account-setting',
            label: 'Tài khoản',
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
        },
        {
            key: "a1",
            label: "Cài đặt hồ sơ",
            icon: <img width="16" height="16" src="https://img.icons8.com/ios/50/collaborator-male.png" alt="collaborator-male"/>,
            children: [
                {
                    key: "collaborator-overall",
                    label: "Tổng quan",
                    onClick: () => navigate(ACCOUNT_ROUTE_PATH.collaboratorOverall),

                },
                {
                    key: "collaborator-customer",
                    label: "Danh sách khách hàng",
                    onClick: () => navigate(ACCOUNT_ROUTE_PATH.collaboratorCustomer),

                },
                {
                    key: "setting",
                    label: "Chỉnh sửa hồ sơ",
                    onClick: () => navigate(ACCOUNT_ROUTE_PATH.collaboratorSetting),
                },
            ],
        },
        {
            key: "customer",
            label: "Lịch sử",
            icon: <img width="16" height="16" src="https://img.icons8.com/ios/50/activity-history.png" alt="activity-history"/>,
            children: [
                {
                    key: "customer-overall",
                    label: "Tổng quan",
                    onClick: () => navigate(ACCOUNT_ROUTE_PATH.customerOverall),

                },
                {
                    key: "order-history",
                    label: "Lịch sử thuê",
                    onClick: () => navigate(ACCOUNT_ROUTE_PATH.customerOrders),

                },
                {
                    key: "customer-donate",
                    label: "Lịch sử donate",
                    onClick: () => navigate(ACCOUNT_ROUTE_PATH.customerDonates),
                },
            ],
        },
        {
            key: "jobs",
            label: "Jobs",
            icon: <img width="16" height="16" src="https://img.icons8.com/ios-filled/50/lawyer.png" alt="lawyer"/>,
            children: [
                {
                    key: "jobs-overall",
                    label: "Job đã đăng",
                    onClick: () => navigate(ACCOUNT_ROUTE_PATH.jobOverall),

                },
                {
                    key: "jobs-history",
                    label: "Job đã ứng tuyển",
                    onClick: () => navigate(ACCOUNT_ROUTE_PATH.jobApplied),

                }
            ],
        },
    ];

    return (
        <Layout
            style={{
                height: "100vh",
                backgroundColor: "white"
            }}
            className="account-layout"
        >
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
                // width={40}
            >
                <Menu 
                    theme="light" 
                    defaultSelectedKeys={['info']} 
                    mode="inline" 
                    items={items}
                />
            </Sider>
            <Layout>
                <Content
                    style={{
                        margin: "0 16px",
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};
export default AccountLayout;
