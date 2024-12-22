import React from "react";

const StatsSection = () => {
    return (
        <section className="bg-blue-600 text-white py-12">
            <div className="text-center mb-8">
                <h4 className="text-lg font-medium">Some Fun Facts</h4>
                <h2 className="text-3xl font-bold">Our Achievements</h2>
                <p className="mt-2 text-sm">
                    There are many variations of passages of Lorem Ipsum available but the
                    majority have suffered alteration in some form.
                </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8 mx-auto max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                    <h3 className="text-2xl font-bold text-blue-600">220</h3>
                    <p className="mt-2 text-sm text-gray-600">Projects</p>
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-blue-600">150K</h3>
                    <p className="mt-2 text-sm text-gray-600">Earned</p>
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-blue-600">24/7</h3>
                    <p className="mt-2 text-sm text-gray-600">Delivery</p>
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-blue-600">99%</h3>
                    <p className="mt-2 text-sm text-gray-600">Success</p>
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
