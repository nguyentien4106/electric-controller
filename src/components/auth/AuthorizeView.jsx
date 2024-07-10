import React from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../lib/helper";
import { Flex, Space, Typography } from "antd";
import { ROLES } from "../../constant/settings";
const { Text, Link } = Typography;

function AuthorizeView(props) {
    const navigate = useNavigate();
    const user = getUser();

    if (!user) {
        return (
            <Flex justify="center" style={{ marginTop: "5%" }}
            >
                <Flex vertical justify="center" align="center" gap={20} style={{
                    width: "50%",
                    textAlign: "center",
                }}>
                    <Text style={{
                        fontSize: 14
                    }}>Bạn cần {<Link onClick={() => navigate("/")}>đăng nhập</Link>} để tiếp tục</Text>{" "}
                </Flex>
            </Flex>
        );
    }

    if (user) {
        return <>{props.children}</>;
    }

    return (
        <>
            <Text>
                Bạn không có quyền truy cập tài nguyên này. Xin thử lại sau!
            </Text>
        </>
    );
}

export default AuthorizeView;
