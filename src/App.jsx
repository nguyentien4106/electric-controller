import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Loading from "./components/common/Loading";
import { useSelector } from "react-redux";
import { message } from "antd";
import { App as AntdApp } from "antd";
import { AppRoutes } from "./routes";
import AppLayout from "./layouts/AppLayout";
import ReactGA from "react-ga4";

const trackingId = "G-F7XRJBGWJS"; // Replace with your Google Analytics tracking ID
ReactGA.initialize(trackingId);

ReactGA.send({
    hitType: "pageview",
    page: window.location.pathname,
})

function App() {
    const isLoading = useSelector((state) => state.loading.isLoading);
    const [msg, contextHolder] = message.useMessage();

    return (
        <>
            {contextHolder}
            {isLoading && <Loading />}
            <AntdApp>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<AppLayout />}>
                                {AppRoutes}
                            </Route>
                        </Routes>
                    </BrowserRouter>
            </AntdApp>
        </>
    );
}

export default App;
