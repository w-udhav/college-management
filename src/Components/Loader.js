import React from "react";
import Lottie from "lottie-react";
import loadingCicle from "../Assets/Lotties/loadingCircle.json";

export default function Loader() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Lottie animationData={loadingCicle} className="w-32" />
    </div>
  );
}