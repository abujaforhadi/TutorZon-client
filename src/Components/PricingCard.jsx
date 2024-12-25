import React, { useState, useEffect } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import AOS from "aos";
import Swal from "sweetalert2";

const Modal = ({ isOpen, onClose, title, content, action }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          {title}
        </h2>
        <div className="mb-6 text-gray-700 dark:text-gray-300">{content}</div>
        <div className="flex justify-end space-x-4">
          <button
            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white px-4 py-2"
            onClick={onClose}
          >
            Cancel
          </button>
          {action && (
            <button
              className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
              onClick={action}
            >
              Confirm
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const PricingCard = ({ planName, price, duration, features, onBuyNow }) => {
  return (
    <div
      className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700"
      data-aos="fade-up" // AOS Animation
    >
      <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
        {planName}
      </h5>
      <div className="flex items-baseline text-gray-900 dark:text-white">
        <span className="text-3xl font-semibold">$</span>
        <span className="text-5xl font-extrabold tracking-tight">{price}</span>
        <span className="ms-1 text-xl font-normal text-gray-500 dark:text-gray-400">
          /{duration}
        </span>
      </div>
      <ul role="list" className="space-y-5 my-7">
        {features.map((feature, index) => (
          <li
            key={index}
            className={`flex items-center ${
              feature.included ? "" : "line-through decoration-gray-500"
            }`}
          >
            {feature.included ? (
              <FaCheckCircle className="text-blue-700 dark:text-blue-500 w-5 h-5" />
            ) : (
              <FaTimesCircle className="text-gray-400 dark:text-gray-500 w-5 h-5" />
            )}
            <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
              {feature.text}
            </span>
          </li>
        ))}
      </ul>
      <button
        className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-200 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-700 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
        onClick={onBuyNow}
      >
        Buy Now
      </button>
    </div>
  );
};

const PricingCards = () => {
  const plans = [
    {
      planName: "Basic Plan",
      price: 10,
      duration: "month",
      features: [
        { text: "Unlimited Support", included: true },
        { text: "Interactive Quizzes", included: true },
        { text: "Live Tutoring", included: false },
        { text: "Language Certification", included: false },
        { text: "Community Access", included: true },
        { text: "Access to All Lessons", included: false },
        { text: "AI-Powered Feedback", included: true },
      ],
    },
    {
      planName: "Pro Plan",
      price: 25,
      duration: "month",
      features: [
        { text: "Unlimited Support", included: true },
        { text: "Interactive Quizzes", included: true },
        { text: "Live Tutoring", included: true },
        { text: "Language Certification", included: true },
        { text: "Community Access", included: true },
        { text: "Access to All Lessons", included: false },
        { text: "AI-Powered Feedback", included: true },
      ],
    },
    {
      planName: "Premium Plan",
      price: 50,
      duration: "month",
      features: [
        { text: "Unlimited Support", included: true },
        { text: "Interactive Quizzes", included: true },
        { text: "Live Tutoring", included: true },
        { text: "Language Certification", included: true },
        { text: "Community Access", included: true },
        { text: "Access to All Lessons", included: true },
        { text: "AI-Powered Feedback", included: true },
      ],
    },
  ];

  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    AOS.init();
  }, []);

  const handleBuyNow = (plan) => {
    setSelectedPlan(plan);
    setConfirmationModalOpen(true);
  };

  const confirmPurchase = () => {
    Swal.fire({
      title: "Purchase Confirmed!",
      text: `You have purchased the ${selectedPlan.planName} for $${selectedPlan.price}.`,
      icon: "success",
      confirmButtonText: "Awesome!",
    });
    setConfirmationModalOpen(false);
  };

  return (
    <div className="flex flex-wrap gap-6 justify-center">
      {plans.map((plan, index) => (
        <PricingCard
          key={index}
          planName={plan.planName}
          price={plan.price}
          duration={plan.duration}
          features={plan.features}
          onBuyNow={() => handleBuyNow(plan)}
        />
      ))}
      <Modal
        isOpen={confirmationModalOpen}
        onClose={() => setConfirmationModalOpen(false)}
        title="Confirm Purchase"
        content={`Are you sure you want to purchase the ${selectedPlan?.planName} for $${selectedPlan?.price}?`}
        action={confirmPurchase}
      />
    </div>
  );
};

export default PricingCards;
