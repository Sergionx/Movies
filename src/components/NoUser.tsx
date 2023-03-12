import React from "react";
import error from "../assets/images/error.png";

function NoUser() {
  return (
    <div className="flex flex-col justify-center self-center  p-4 items-center">
      <div className="w-[40%] self-center bg-red-500 rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center text-white">
          El usuario no se encuentra logueado
        </h1>

        <div className="bg-white rounded-lg mt-5">
          <img src={error} />
        </div>
      </div>
    </div>
  );
}

export default NoUser;
