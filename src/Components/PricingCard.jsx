import React, { useState, useEffect } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import AOS from "aos";
import Swal from "sweetalert2";

const PricingCard = ({ planName, price, duration, features, onBuyNow }) => {
  return (
    <div
      className="w-full max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 dark:bg-gray-800 dark:border-gray-700"
      data-aos="fade-up"
    >
      <h5 className="mb-4 text-2xl font-semibold text-gray-700 dark:text-gray-300">
        {planName}
      </h5>
      <div className="flex items-baseline text-gray-900 dark:text-white mb-6">
        <span className="text-3xl font-medium">$</span>
        <span className="text-5xl font-bold">{price}</span>
        <span className="text-lg text-gray-500 dark:text-gray-400 ml-1">
          /{duration}
        </span>
      </div>
      <ul className="space-y-4 mb-6">
        {features.map((feature, index) => (
          <li
            key={index}
            className={`flex items-center ${
              feature.included ? "" : "line-through text-gray-400"
            }`}
          >
            {feature.included ? (
              <FaCheckCircle className="text-green-500 w-5 h-5 mr-3" />
            ) : (
              <FaTimesCircle className="text-gray-400 w-5 h-5 mr-3" />
            )}
            <span className="text-base text-gray-600 dark:text-gray-400">
              {feature.text}
            </span>
          </li>
        ))}
      </ul>
      <button
        className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        onClick={onBuyNow}
      >
        Buy Now
      </button>
    </div>
  );
};

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
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 dark:text-white">
          Affordable Plans for Everyone
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mt-4">
          Choose a plan that fits your needs and take the next step toward your goals.
        </p>
      </div>
      <div className="flex flex-wrap gap-8 justify-center">
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
      </div>
      <Modal
        isOpen={confirmationModalOpen}
        onClose={() => setConfirmationModalOpen(false)}
        title="Confirm Purchase"
        content={`Are you sure you want to purchase the ${selectedPlan?.planName} for $${selectedPlan?.price}?`}
        action={confirmPurchase}
      />
    </section>
  );
};

export default PricingCards;
