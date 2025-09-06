import React from "react";
import MenuBox from "../../component/service menu/MenuBox";

const Service = () => {
  return (
    <div className="min-h-screen bg-[#edf7ea] ">
      <div className="flex flex-col items-center text-2xl pt-8 px-6">
        <h1>শুভ সকাল!</h1>
        <h1 className="text-center">স্বপ্ন ছোঁয়া তে আপনাকে স্বাগতম!!</h1>
      </div>   

      <div>
        <MenuBox></MenuBox>
      </div>
    </div>
  );
};

export default Service;
