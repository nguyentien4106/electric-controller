import { Flex, Space } from "antd";
import React from "react";
import { Link } from "react-router-dom";

export default function AppFooter() {
    return (
        <Flex justify="space-between">
            <div>
                <Link href="https://ePower.me">ePower.me</Link>
                <span>&copy; 2024.</span>
            </div>
            <Space>
                <a href="https://t.me/+4M0vWKnqYho4NTg1" target="_blank">
                    <img
                        width="24"
                        height="24"
                        src="https://img.icons8.com/external-tal-revivo-shadow-tal-revivo/24/external-telegram-is-a-cloud-based-instant-messaging-and-voice-over-ip-service-logo-shadow-tal-revivo.png"
                        alt="external-telegram-is-a-cloud-based-instant-messaging-and-voice-over-ip-service-logo-shadow-tal-revivo"
                    />
                </a>
                <a href="https://t.me/+4M0vWKnqYho4NTg1" target="_blank">
                    <img
                        width="24"
                        height="24"
                        src="https://img.icons8.com/color/48/facebook-new.png"
                        alt="facebook-new"
                    />
                </a>
            </Space>
            <div>
                <span>Powered by </span>
                <Link href="https://ePower.me">ePower.me</Link>
            </div>
        </Flex>
    );
}
