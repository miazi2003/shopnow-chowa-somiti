import React, { useEffect, useState } from "react";
import MenuBox from "../../component/service menu/MenuBox";

const Service = () => {
  const date = new Date();
  const hours = date.getHours();

  const [greetings, setGreetings] = useState("");

  useEffect(() => {
    if (hours >= 5 && hours < 12) {
      setGreetings("শুভ সকাল");
    } else if (hours >= 12 && hours < 17) {
      setGreetings("শুভ দুপুর");
    } else if (hours >= 17 && hours < 20) {
      setGreetings("শুভ বিকাল");
    } else {
      setGreetings("শুভ রাত্রি");
    }
  }, [hours]);

  return (
    <div className="min-h-screen bg-[#edf7ea] ">
      <div className="flex flex-col items-center text-2xl pt-8 px-6">
        <h1>{greetings} !!</h1>
        <h1 className="text-center">স্বপ্ন ছোঁয়া তে আপনাকে স্বাগতম!!</h1>
      </div>
      <div>
        <MenuBox></MenuBox>
      </div>
    </div>
  );
};

export default Service;
