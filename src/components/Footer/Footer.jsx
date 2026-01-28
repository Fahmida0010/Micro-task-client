import { FaLinkedin, FaGithub, FaFacebook, FaXTwitter } from "react-icons/fa6";
import Logo from "../Logo/Logo";

const Footer = () => {
  return (
    <footer className="mt-16 bg-indigo-200 py-10 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <div className="flex justify-center mb-2">
          <Logo />
        </div>

        {/* Slogan */}
        <p className="text-pink-500 text-2xl mb-6 max-w-md mx-auto italic">
          Empowering your micro-tasks journey towards success.
        </p>
        <div className="flex justify-center gap-6 mb-8">
          <a 
            href="https://www.linkedin.com/in/fahmida-akter-tanjina-3b1986299/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-2xl text-gray-600 hover:text-[#0077b5] transition-all duration-300 hover:-translate-y-1"
          >
            <FaLinkedin />
          </a>
          <a 
            href="https://github.com/Fahmida0010" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-2xl text-gray-600 hover:text-[#333] transition-all duration-300 hover:-translate-y-1"
          >
            <FaGithub />
          </a>
          <a 
            href="https://www.facebook.com/nihsanga.cetana" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-2xl text-gray-600 hover:text-[#1877f2] transition-all duration-300 hover:-translate-y-1"
          >
            <FaFacebook />
          </a>
          <a 
            href="https://x.com/fahmida105623" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-2xl text-gray-600 hover:text-black transition-all duration-300 hover:-translate-y-1"
          >
            <FaXTwitter />
          </a>
        </div>
        
        {/* Copyright */}
        <div className="text-sm text-black">
          © {new Date().getFullYear()}
           <span className="p-2 font-semibold text-green-600">
            MicroTask</span>All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;