import React from "react";
import banner from "../../assets/Banner.png";
import { Link } from "react-router";
const Banner = () => {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: `url(${banner})`,
      }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w">
          <h1 className="mb-5 text-4xl font-bold">
            সঞ্চয়ে সমৃদ্ধি করি , একসাথে ভবিষ্যৎ গড়ি
          </h1>
          <p className="mb-5">
            আমাদের সঞ্চয় সমিতির লক্ষ্য হলো নিরাপদ সঞ্চয়ের মাধ্যমে আর্থিক
            স্বাবলম্বিতা ও পারস্পরিক সহযোগিতা নিশ্চিত করা। <br/> আজই যুক্ত হোন এবং
            আপনার আগামীকালকে আরও সুরক্ষিত করুন।
          </p>
          <Link to={`/service`}><button className="btn bg-yellow-400 rounded-4xl">শুরু করুন</button></Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
