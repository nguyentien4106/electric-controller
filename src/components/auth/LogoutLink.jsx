
import { Typography } from "antd";
import { Cookie } from "@/lib/cookies";
import { useDispatch, useSelector } from "react-redux";
import { hide, show } from "@/state/loading/loadingSlice";
import { useNavigate } from "react-router-dom";

const { Link } = Typography;

function LogoutLink() {
    const navigate = useNavigate()
    const handleLogout = (e) => {
        e.preventDefault();
        Cookie.removeUser()
        navigate("/")
    }

    return (
        <Link onClick={handleLogout} style={{fontSize: 16}}>{`Đăng xuất`}</Link>
    );
}

export default LogoutLink;