import React from "react";
import ReactLoading from "react-loading";

export default function LoadingPage() {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-screen">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-4xl">
        Page Loading
      </h1>
      <p className="mb-6 text-l font-normal text-gray-500 sm:px-16 xl:px-48 dark:text-gray-400">
        Loading content, please wait...
      </p>
      <ReactLoading
        type="spinningBubbles"
        color="#6AC5FE"
        height={100}
        width={50}
      />
    </div>
  );
}
