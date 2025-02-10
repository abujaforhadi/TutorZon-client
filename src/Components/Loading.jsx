import React from "react";
import pic from "../assets/loading-rings.json";
import { useLottie } from "lottie-react";

const Loading = () => {
  const options = {
    animationData: pic,
    loop: true,
  };
  const { View } = useLottie(options);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-32 md:w-40 lg:w-40">{View}</div>
    </div>
  );
};

export default Loading;
