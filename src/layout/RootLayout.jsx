import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../pages/shared/Navbar/Navbar';
import Footer from '../pages/shared/Footer/Footer';

const RootLayout = () => {
    return (
        <div className='w-11/12 mx-auto'>
            <header className='py-3'>
            <Navbar></Navbar>
            </header>
            <main className='min-h-[calc(100vh-294px)]'>
            <Outlet></Outlet>
            </main>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;