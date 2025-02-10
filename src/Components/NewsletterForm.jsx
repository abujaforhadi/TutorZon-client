import React from "react";

const NewsletterForm = () => {
    return (
        <section className="w-full md:w-11/12 mx-auto mb-8 rounded-xl p-[30px] sm:p-[50px] bg-[#303456] relative">

            {/* left vector */}
            <img src="https://i.ibb.co/kK9kStP/Group-5.png" alt="vector"
                 className="w-[80px] sm:w-[150px] absolute top-[-20px] left-[-20px]"/>

            <div className="w-full flex-col flex items-center justify-center">
                <h1 className="text-[1rem] sm:text-[2rem] lg:text-[3rem] text-white text-center relative w-max">
                    Join Our Language Exchange & Enhance Your Skills!
                    <img src="https://i.ibb.co/5hLC2fx/Vector-1.png" alt="vector"
                         className="w-[100px] sm:w-[200px] absolute bottom-0 right-0"/>
                </h1>
                <p className="text-[0.8rem] sm:text-[0.9rem] text-gray-400 w-full sm:w-[50%] mx-auto mt-4 text-center">
                    Congratulations on advancing to the next stage! 🎉 As part of our selection process, we are excited to introduce our Online Tutor Booking Platform. 
                    This innovative platform connects learners with expert tutors in various languages and subjects, making learning accessible and interactive. 
                    Stay updated with the latest news, project insights, and opportunities—right in your inbox!
                </p>
            </div>

            <div
                className="flex lg:flex-row flex-col items-center justify-between gap-[20px] w-full sm:w-[65%] mx-auto mt-12">
                <input placeholder="Enter your email to stay connected..."
                       className="py-4 px-4 w-full bg-[#6C6F87] border-2 border-gray-400 outline-none"/>

                <button className="w-full lg:w-fit py-4 px-12 bg-white text-black">
                    Subscribe & Stay Updated
                </button>
            </div>

            {/* right vector */}
            <img src="https://i.ibb.co/ZJJBctq/Group-4.png" alt="vector"
                 className="w-[80px] sm:w-[150px] absolute bottom-[-20px] right-[-20px]"/>
        </section>
    );
};

export default NewsletterForm;
