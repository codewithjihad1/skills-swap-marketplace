import Image from "next/image";
import img from "../../../public/banner.jpeg";
import { GraduationCap, Medal } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-r from-[#FCFAEF] to-[#EBF6ED] px-4 sm:px-6 md:px-12 lg:px-20 py-12 md:py-16 flex flex-col md:flex-row items-center justify-center md:justify-between gap-10">
      {/* Left Side -  */}
      <div className="relative w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] md:w-[380px] md:h-[360px] lg:w-[420px] lg:h-[400px]">
        {/* Round Image */}
        <div className="w-full h-full overflow-hidden rounded-r-full rounded-b-full relative">
          <Image
            src={img}
            alt="Instructor"
            fill
            className="object-cover mx-auto"
            priority
          />
        </div>

        {/* Top Left Icon */}
        <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 bg-teal-600 text-white p-2 sm:p-3 rounded-lg shadow-lg">
          <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>

        {/* Bottom Right */}
        <div className="absolute bottom-14 -right-4 sm:bottom-20 sm:-right-6 bg-black text-white p-3 sm:p-5 shadow-lg rounded">
          <Medal className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>

        {/* Name */}
        <div className="absolute top-6 -right-6 sm:top-8 sm:-right-10 bg-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg shadow-md">
          <p className="font-semibold text-red-500 text-sm sm:text-base">
            Skill Share
          </p>
          <p className="text-xs sm:text-sm text-gray-600">Online instructor</p>
        </div>
      </div>

      {/* Right Side - Text */}
      <div className="max-w-xl text-center md:text-left">
        <p className="italic text-gray-600 mb-2 text-sm sm:text-base md:text-lg">
          Welcome to SkillShare.
        </p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-snug sm:leading-tight mb-4 border-l-4 border-red-500 pl-3 sm:pl-4">
          Your Gateway to <br /> Excellence in <br /> Online Learning
        </h1>
        <p className="text-gray-600 mb-6 text-base sm:text-lg md:text-xl">
          Embark on a journey of knowledge and skill enhancement <br className="hidden sm:block" /> 
          with Skill Boost.
        </p>
        <button className="bg-red-500 text-white px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 rounded-lg shadow-md hover:bg-red-600 transition text-sm sm:text-base md:text-lg">
          Explore Academic Courses
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
