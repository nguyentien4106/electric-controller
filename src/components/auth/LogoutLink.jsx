
import { Typography } from "antd";
import { Cookie } from "@/lib/cookies";
import { useNavigate } from "react-router-dom";
import mqtt from "mqtt";
import { useSelector } from "react-redux";
import MQTT from "../../lib/MQTT";
import CircularJSON from "circular-json";
import { useTranslation } from "react-i18next";

const { Link } = Typography;

function LogoutLink() {
    const navigate = useNavigate()
    const { client } = useSelector(state => state.mqtt)
    const { t } = useTranslation()

    const handleLogout = (e) => {
        e.preventDefault();
        MQTT.disconnect(client)
        Cookie.removeUser()
        navigate("/")
    }

    return (
        <Link onClick={handleLogout} style={{fontSize: 16}}>{t("logout")}</Link>
    );
}

export default LogoutLink;