import React, { useContext, useState } from "react";
import { Button, Grid, Menu, Space, theme } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { getStyles, menuItems } from "./helper";
import UserComponent from "./UserComponent";
import { useSelector } from "react-redux";
import { getUser } from "../lib/helper";
const { useToken } = theme;
const { useBreakpoint } = Grid;

export default function Header() {
    const { token } = useToken();
    const screens = useBreakpoint();
    const navigate = useNavigate()
    const [current, setCurrent] = useState("");
    const styles = getStyles(screens, token)
    const user = getUser()
    console.log(user)
    const onClick = (e) => {
        setCurrent(e.key);
    };

    const renderAuth = () => {
        return user ? (
            <UserComponent user={user} />
        ) : (
            <Space>
                <Button
                    type="text"
                    style={{ backgroundColor: "rgb(169 169 181)" }}
                    onClick={() => navigate("/login")}
                >
                    Log in
                </Button>
            </Space>
        );
    };


    return (
        <nav style={styles.header}>
            <div style={styles.container}>
                <div style={styles.menuContainer}>
                    <div
                        className="demo-logo logo"
                        onClick={() => {
                            navigate("/");
                            setCurrent("");
                        }}
                    >
                        ePower.vn
                    </div>
                    {renderAuth()}
                </div>
            </div>
        </nav>
    );
}
