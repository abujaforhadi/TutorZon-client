import React from 'react';

const Card = () => {
    return (

        <div className="rounded-lg border shadow-sm overflow-hidden bg-white border-stone-200 shadow-stone-950/5 w-96">
            <img src="https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80" alt="card-image" className="w-[calc(100%-16px)] rounded m-2 h-96 object-cover" />
            <div className="w-full h-max rounded px-3.5 py-2.5">
                <div className="mb-2 flex items-center justify-between">
                    <h6 className="font-sans antialiased font-bold text-base md:text-lg lg:text-xl text-current">Apple AirPods</h6>
                    <h6 className="font-sans antialiased font-bold text-base md:text-lg lg:text-xl text-current">$95.00</h6>
                </div>
                <p className="font-sans antialiased text-base text-stone-600">With plenty of talk and listen time, voice-activated Siri access, and an available wireless charging case.</p>
            </div>
            <div className="w-full px-3.5 pt-2 pb-3.5 rounded">
                <button className="inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed focus:shadow-none text-sm py-2 px-4 shadow-sm hover:shadow-md bg-stone-200 hover:bg-stone-100 relative bg-gradient-to-b from-white to-white border-stone-200 text-stone-700 rounded-lg hover:bg-gradient-to-b hover:from-stone-50 hover:to-stone-50 hover:border-stone-200 after:absolute after:inset-0 after:rounded-[inherit] after:box-shadow after:shadow-[inset_0_1px_0px_rgba(255,255,255,0.35),inset_0_-1px_0px_rgba(0,0,0,0.20)] after:pointer-events-none transition antialiased">Add to Cart</button>
            </div>
        </div>

    );
};

export default Card;