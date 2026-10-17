import { FaLinkedin, FaGithub, FaFacebook, FaXTwitter } from "react-icons/fa6";
import Logo from "../Logo/Logo";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-10 bg-gray-200 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-t border-slate-200 dark:border-slate-800 transition-colors duration-300 py-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Logo & Slogan */}
        <div className="md:col-span-2 space-y-3">
          <Logo />
          <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm max-w-sm italic">
            Empowering your micro-tasks journey towards success with transparency and speed.
          </p>
          <div className="flex items-center gap-2.5 pt-1">
            <a 
              href="https://www.linkedin.com/in/fahmida-akter-tanjina-3b1986299/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-[#0077b5] hover:text-white transition-all duration-300 shadow-sm"
            >
              <FaLinkedin className="text-base" />
            </a>
            <a 
              href="https://github.com/Fahmida0010" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-900 hover:text-white dark:hover:bg-slate-700 transition-all duration-300 shadow-sm"
            >
              <FaGithub className="text-base" />
            </a>
            <a 
              href="https://www.facebook.com/nihsanga.cetana" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-[#1877f2] hover:text-white transition-all duration-300 shadow-sm"
            >
              <FaFacebook className="text-base" />
            </a>
            <a 
              href="https://x.com/fahmida105623" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-black hover:text-white transition-all duration-300 shadow-sm"
            >
              <FaXTwitter className="text-base" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-slate-900 dark:text-white font-semibold text-sm mb-3 tracking-wide">Quick Links</h3>
          <ul className="space-y-2 text-xs md:text-sm">
            <li><Link to="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 hover:underline transition">Home</Link></li>
            <li><Link to="/about" className="hover:text-indigo-600 dark:hover:text-indigo-400 hover:underline transition">About Us</Link></li>
            <li><Link to="/tasks" className="hover:text-indigo-600 dark:hover:text-indigo-400 hover:underline transition">All Tasks</Link></li>
          </ul>
        </div>

        {/* Resources / Legal */}
        <div>
          <h3 className="text-slate-900 dark:text-white font-semibold text-sm mb-3 tracking-wide">Resources</h3>
          <ul className="space-y-2 text-xs md:text-sm">
            <li><Link to="/contact" className="hover:text-indigo-600 dark:hover:text-indigo-400 hover:underline transition">Contact Us</Link></li>
            <li><Link to="/help-support" className="hover:text-indigo-600 dark:hover:text-indigo-400 hover:underline transition">Help & Support</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-indigo-600 dark:hover:text-indigo-400 hover:underline transition">Privacy Policy</Link></li>
          </ul>
        </div>

      </div>

      {/* Copyright Divider */}
      <div className="max-w-7xl mx-auto border-t border-slate-300 dark:border-slate-800 mt-6 pt-4 text-center text-xs text-slate-500 dark:text-slate-400">
        <p>© {new Date().getFullYear()} <span className="font-semibold text-indigo-600 dark:text-indigo-400">MicroTask</span>. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;