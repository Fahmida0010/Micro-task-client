import { FaLinkedin, FaGithub, FaFacebook, FaXTwitter } from "react-icons/fa6";
import Logo from "../Logo/Logo";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-16 bg-gray-200 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-t border-slate-200 dark:border-slate-800 transition-colors duration-300 py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Logo & Slogan */}
        <div className="md:col-span-2 space-y-4">
          <Logo />
          <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base max-w-sm italic">
            Empowering your micro-tasks journey towards success with transparency and speed.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <a 
              href="https://www.linkedin.com/in/fahmida-akter-tanjina-3b1986299/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-[#0077b5] hover:text-white transition-all duration-300 shadow-sm"
            >
              <FaLinkedin className="text-lg" />
            </a>
            <a 
              href="https://github.com/Fahmida0010" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-900 hover:text-white dark:hover:bg-slate-700 transition-all duration-300 shadow-sm"
            >
              <FaGithub className="text-lg" />
            </a>
            <a 
              href="https://www.facebook.com/nihsanga.cetana" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-[#1877f2] hover:text-white transition-all duration-300 shadow-sm"
            >
              <FaFacebook className="text-lg" />
            </a>
            <a 
              href="https://x.com/fahmida105623" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-black hover:text-white transition-all duration-300 shadow-sm"
            >
              <FaXTwitter className="text-lg" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-slate-900 dark:text-white font-semibold text-base mb-4 tracking-wide">Quick Links</h3>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Home</Link></li>
            <li><a href="#about" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">About Us</a></li>
            <li><a href="#services" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Services</a></li>
            <li><a href="#how-it-works" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">How It Works</a></li>
          </ul>
        </div>

        {/* Resources / Legal */}
        <div>
          <h3 className="text-slate-900 dark:text-white font-semibold text-base mb-4 tracking-wide">Resources</h3>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/login" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Login</Link></li>
            <li><Link to="/register" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Register</Link></li>
            <li><a href="#contact" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Support & FAQ</a></li>
          </ul>
        </div>

      </div>

      {/* Copyright Divider */}
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm text-slate-500 dark:text-slate-400">
        <p>© {new Date().getFullYear()} <span className="font-semibold text-indigo-600 dark:text-indigo-400">MicroTask</span>. All rights reserved.</p>
        <p className="mt-2 sm:mt-0">Designed & Developed with precision</p>
      </div>
    </footer>
  );
};

export default Footer;