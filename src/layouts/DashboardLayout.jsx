import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../component/footer/Footer';

const DashboardLayout = () => {
    return (
          <div>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default DashboardLayout;