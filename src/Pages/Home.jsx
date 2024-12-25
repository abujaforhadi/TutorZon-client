import React from 'react';
import StatsSection from '../Components/StatsSection';
import Hero from '../Components/Hero';
import Category from '../Components/Category';
import PricingCards from '../Components/PricingCard';

const Home = () => {
    return (
        <div>
            <Hero/>
            <StatsSection/>
           <Category/> 
           <PricingCards/>
        </div>
    );
};

export default Home;