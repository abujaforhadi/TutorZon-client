import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer';

const MainLayout = () => {
    return (
        <div className='main-layout flex flex-col min-h-screen'>
            <Navbar />
            <main className='grow'>
                <Outlet/>
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
