import { Outlet, Link } from "react-router-dom";
import Footer from "../components/Footer/Footer";

const Layout = () => {
    return (
        <>
            <Outlet />
        </>
    )
};

export default Layout;