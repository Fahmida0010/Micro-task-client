// import { FaLinkedin, FaGithub, FaFacebook, FaXTwitter } from "react-icons/fa6";
// import Logo from "../Logo/Logo";

// const Footer = () => {
//   return (
//     <footer className="mt-16 bg-yellow-200 py-10 px-4">
//       <div className="max-w-6xl mx-auto text-center">
//         <div className="flex justify-center mb-2">
//           <Logo />
//         </div>

//         {/* Slogan */}
//         <p className="text-pink-500 text-2xl mb-6 max-w-md mx-auto italic">
//           Empowering your micro-tasks journey towards success.
//         </p>
//         <div className="flex justify-center gap-6 mb-8">
//           <a 
//             href="https://www.linkedin.com/in/fahmida-akter-tanjina-3b1986299/" 
//             target="_blank" 
//             rel="noopener noreferrer"
//             className="text-2xl text-gray-600 hover:text-[#0077b5] transition-all duration-300 hover:-translate-y-1"
//           >
//             <FaLinkedin />
//           </a>
//           <a 
//             href="https://github.com/Fahmida0010" 
//             target="_blank" 
//             rel="noopener noreferrer"
//             className="text-2xl text-gray-600 hover:text-[#333] transition-all duration-300 hover:-translate-y-1"
//           >
//             <FaGithub />
//           </a>
//           <a 
//             href="https://www.facebook.com/nihsanga.cetana" 
//             target="_blank" 
//             rel="noopener noreferrer"
//             className="text-2xl text-gray-600 hover:text-[#1877f2] transition-all duration-300 hover:-translate-y-1"
//           >
//             <FaFacebook />
//           </a>
//           <a 
//             href="https://x.com/fahmida105623" 
//             target="_blank" 
//             rel="noopener noreferrer"
//             className="text-2xl text-gray-600 hover:text-black transition-all duration-300 hover:-translate-y-1"
//           >
//             <FaXTwitter />
//           </a>
//         </div>
        
//         {/* Copyright */}
//         <div className="text-sm text-black">
//           © {new Date().getFullYear()}
//            <span className="p-2 font-semibold text-green-600">
//             MicroTask</span>All rights reserved.
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;


import { FaLinkedin, FaGithub, FaFacebook, FaXTwitter } from "react-icons/fa6";
import Logo from "../Logo/Logo";

const Footer = () => {
  return (
    <footer className="mt-16 bg-yellow-200 py-12 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
        
        {/* Logo & Slogan */}
        <div className="md:col-span-1">
          <div className="flex justify-center md:justify-start mb-4">
            <Logo />
          </div>
          <p className="text-pink-500 text-lg mb-4 italic">
            Empowering your micro-tasks journey towards success.
          </p>
          <div className="flex justify-center md:justify-start gap-4">
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
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-700">
            <li><a href="#home" className="hover:text-indigo-600 transition">Home</a></li>
            <li><a href="#about" className="hover:text-indigo-600 transition">About Us</a></li>
            <li><a href="#services" className="hover:text-indigo-600 transition">Services</a></li>
            <li><a href="#how-it-works" className="hover:text-indigo-600 transition">How It Works</a></li>
            <li><a href="#contact" className="hover:text-indigo-600 transition">Contact</a></li>
          </ul>
        </div>

        {/* Our Services */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Our Services</h3>
          <ul className="space-y-2 text-gray-700">
            <li><a href="#" className="hover:text-indigo-600 transition">Micro Tasks</a></li>
            <li><a href="#" className="hover:text-indigo-600 transition">Task Marketplace</a></li>
            <li><a href="#" className="hover:text-indigo-600 transition">Reward System</a></li>
            <li><a href="#" className="hover:text-indigo-600 transition">Freelancer Support</a></li>
            <li><a href="#" className="hover:text-indigo-600 transition">Buyer Assistance</a></li>
          </ul>
        </div>

        {/* Privacy & Terms */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Privacy & Terms</h3>
          <ul className="space-y-2 text-gray-700">
            <li><a href="#" className="hover:text-indigo-600 transition">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-indigo-600 transition">Terms of Service</a></li>
            <li><a href="#" className="hover:text-indigo-600 transition">Refund Policy</a></li>
            <li><a href="#" className="hover:text-indigo-600 transition">Security</a></li>
            <li><a href="#" className="hover:text-indigo-600 transition">Help Center</a></li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 text-center text-black text-sm">
        © {new Date().getFullYear()}{" "}
        <span className="p-1 font-semibold text-green-600">MicroTask</span> All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
