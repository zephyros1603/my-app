'use client';
import Image from "next/image";
// import Pic1 from '../../public/images/1.jpg'
// import Pic2 from '../../public/images/2.jpeg'
import { useScroll, useTransform, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import Lenis from 'lenis';
import DecryptedText from "./Components/DecryptedText/DecryptedText";
import BlobCursor from "./Components/BlobCursor/BlobCursor";
import CustomCursor from "./Components/CustomCursor";

export default function Home() {

  const container = useRef();
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"]
  }) 

  useEffect( () => {
    const lenis = new Lenis()

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  }, [])

  return (
    <main ref={container} 
    style={{ cursor: "none" }} 
    className="relative h-[200vh] bg-neutral-700">
     {/* <BlobCursor /> */}
     <CustomCursor/>
      <Section1 scrollYProgress={scrollYProgress}/>
      <Section2 scrollYProgress={scrollYProgress}/>
      {/* <Section3 scrollYProgress={scrollYProgress}/> */}

    </main>
  );
}

const Section1 = ({scrollYProgress}) => {

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -5])
  return (
    <motion.div style={{scale, rotate}} className="sticky top-0 h-screen bg-[#0e285c] text-white flex flex-col justify-center px-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-7xl font-bold mb-6">Hi, I'm <span className="text-yellow-400">Your Name</span></h1>
        <h2 className="text-4xl mb-8">
        Frontend Developer & Designer
          {/* <DecryptedText text={"Frontend Developer & Designer"}  speed={150} animateOn="view"/> */}
        </h2>
        <p className="text-xl mb-12 max-w-2xl">
          I create beautiful, responsive websites with modern technologies 
          and bring creative ideas to life.
        </p>
        <div className="flex gap-6">
          <button className="bg-yellow-400 text-[#0e285c] px-8 py-3 rounded-lg font-bold hover:bg-yellow-300 transition-colors">
            Resume
          </button>
         
        </div>
      </div>
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <svg width="24" height="40" viewBox="0 0 24 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="arrowGradient" x1="12" y1="2" x2="12" y2="38" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="white" stopOpacity="0" />
              <stop offset="50%" stopColor="white" />
              <stop offset="100%" stopColor="white" />
            </linearGradient>
          </defs>
          <path d="M12 2L12 38M12 38L2 28M12 38L22 28" stroke="url(#arrowGradient)" strokeWidth="3" strokeLinecap="round"/>
        </svg>
      </motion.div>
    </motion.div>
  )
}

const Section2 = ({scrollYProgress}) => {

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [5, 0])
  // backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      message: e.target.message.value,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Message sent successfully!");
        e.target.reset();
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };


  // -----------------
  return (
    <motion.div style={{scale, rotate}} className="relative w-[100vw] h-[100vh] bg-white flex">
      {/* Left Section - Projects */}
      <div className="w-1/2 p-12 flex flex-col justify-center">
        <h2 className="text-4xl font-bold mb-6">My Projects</h2>
        
        <div className="space-y-8">
          <div className="project">
            <h3 className="text-xl font-bold text-[#0e285c]">E-Commerce Platform</h3>
            <p className="text-gray-700 mb-2">
              A full-stack shopping platform built with Next.js, MongoDB, and Stripe integration.
            </p>
          </div>

          <div className="project">
            <h3 className="text-xl font-bold text-[#0e285c]">Social Media Dashboard</h3>
            <p className="text-gray-700 mb-2">
              Real-time analytics dashboard using React, Firebase, and Chart.js.
            </p>
          </div>

          <div className="project">
            <h3 className="text-xl font-bold text-[#0e285c]">Weather App</h3>
            <p className="text-gray-700 mb-2">
              Dynamic weather application with OpenWeather API and geolocation features.
            </p>
          </div>
        </div>

        <button className="bg-[#0e285c] text-white px-8 py-3 rounded-lg w-fit mt-6 hover:bg-[#1a3a7a] transition-colors">
          Visit my Github 
        </button>
      </div>

      {/* Separator Line */}
      <div className="w-px h-4/5 my-auto bg-gradient-to-b from-transparent via-gray-300 to-transparent"/>

      {/* Right Section - Contact Form */}
      <div className="w-1/2 p-12 flex flex-col justify-center">
        <h2 className="text-4xl font-bold mb-6">Let's Connect</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <input 
              type="text" 
              name="name"
              placeholder="Your Name"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0e285c]"
            />
          </div>
          <div>
            <input 
              type="email" 
              name="email"
              placeholder="Your Email"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0e285c]"
            />
          </div>
          <div>
            <textarea 
              placeholder="Your Message"
              name="message"
              rows="4"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0e285c]"
            ></textarea>
          </div>
          <button type="submit" className="bg-yellow-400 text-[#0e285c] px-8 py-3 rounded-lg w-fit font-bold hover:bg-yellow-300 transition-colors">
            Send Message
          </button>
          <button className="bg-[#0077b5] ml-10 text-white px-8 py-3 rounded-lg hover:bg-[#005885] transition-colors">
            LinkedIn
          </button>
        </form>
        
      </div>
    </motion.div>
  )
}

const Section3 = ({scrollYProgress}) => {

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [5, 0])

  return (
    <motion.div style={{scale, rotate}} className="relative 
    w-[100vw] h-[100vh] bg-black
    ">
      {/* <Image 
        src={Pic2}
        alt="img"
        placeholder="blur"
        fill
      /> */}
      
    </motion.div>
  )
}