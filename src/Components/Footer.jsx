import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Left Section */}
          <div className="text-center md:text-left mb-4 md:mb-0">
            <img src='https://i.ibb.co.com/C54XfZk/Tutor-Zen-it-is-a-education-learning-site-logo-1-removebg-preview.png' className="w-1/3"></img>
            <p className="text-sm">Your go-to platform for learning and teaching.</p>
          </div>

          {/* Social Links */}
          <div className="flex space-x-4">
            <a
              href="https://github.com/abujaforhadi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <FaGithub size={20} />
            </a>
            <a
              href="https://linkedin.com/in/abujaforhadi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <FaLinkedinIn size={20} />
            </a>
            <a
              href="https://twitter.com/abujaforhadi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="https://facebook.com/abujaforhadi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <FaFacebookF size={20} />
            </a>
          </div>

          {/* Right Section */}
          <div className="text-center md:text-right text-sm mt-4 md:mt-0">
            <p>&copy; {new Date().getFullYear()} TutorZen. All rights reserved.</p>
            <p>
              Designed by{' '}
              <a
                href="https://github.com/abujaforhadi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                Jafor
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
