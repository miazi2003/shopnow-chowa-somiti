import React from 'react';
import Navbar from '../component/navbar/Navbar';
import Footer from '../component/footer/Footer';
import { Outlet } from 'react-router';

const MainLayOut = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayOut;