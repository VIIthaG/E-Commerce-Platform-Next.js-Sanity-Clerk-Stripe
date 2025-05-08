import React from "react";

function Loader() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className=" animate-spin rounded-full h-32 border-b-2 border-gray-900 w-32"></div>
    </div>
  );
}

export default Loader;
