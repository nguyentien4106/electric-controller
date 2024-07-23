import React, { useContext, useState } from "react";
import { Button, Grid, Menu, Select, Space, theme } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { getStyles, menuItems } from "./helper";
import UserComponent from "./UserComponent";
import { useSelector } from "react-redux";
import { getUser } from "../lib/helper";
import en from "@/assets/en.png"
import vi from "@/assets/vi.png"
import { useTranslation } from "react-i18next";
const { useToken } = theme;
const { useBreakpoint } = Grid;

export default function Header() {
    const { token } = useToken();
    const screens = useBreakpoint();
    const navigate = useNavigate()
    const styles = getStyles(screens, token)
    const user = getUser()

    const renderAuth = () => {
        return user ? (
            <UserComponent/>
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
    const { i18n, t } = useTranslation();
    const changeLanguage = lang => {
        i18n.changeLanguage(lang)
        localStorage.setItem("language", lang)
    }
    return (
        <nav style={styles.header}>
            <div style={styles.container}>
                <div style={styles.menuContainer}>
                    <div
                        className="demo-logo logo"
                        onClick={() => {
                            navigate("/");
                        }}
                    >
                        ePower.vn
                    </div>
                    <Space>
                        <label>{t("language")}: </label>
                        <Space >
                            <img className="pointer" src={en} height={i18n.language === "en" ? 48 : 24} onClick={() => changeLanguage("en")} />
                            <img className="pointer" src={vi} height={i18n.language === "vi" ? 48 : 24} onClick={() => changeLanguage("vi")}/>
                        </Space>
                    </Space>
                    {renderAuth()}
                </div>
            </div>
        </nav>
    );
}
