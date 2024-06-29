
import NavbarPage from "./Navbar";
import { Outlet } from "react-router-dom";
function Layout(){
    return(
        <>
        <NavbarPage/>
        <Outlet/>
        </>
    )
}
export default Layout;