import { Outlet } from "react-router-dom";
import { Header } from "../components/Header/Header";
import { Navbar } from "../components/Navbar/Navbar";

export const Layout: React.FC = () => {
    return (
        <div className='app-wrapper'>
            <Header/>
            <Navbar/>
            <div className='app-wrapper-content'>
                <Outlet/>
            </div>
        </div>
    );
}
