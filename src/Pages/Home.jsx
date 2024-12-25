import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
import StatsSection from '../Components/StatsSection';
import Hero from '../Components/Hero';
import Category from '../Components/Category';
import PricingCards from '../Components/PricingCard';
import FAQ from '../Components/FAQ';

const Home = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 }); // Initialize AOS with animation duration
    }, []);

    return (
        <div>
            <Hero data-aos="fade-up" />
            <StatsSection data-aos="fade-right" />
            <Category data-aos="fade-left" />
            <PricingCards data-aos="zoom-in" />
            <FAQ data-aos="fade-up"/>
        </div>
    );
};

export default Home;
