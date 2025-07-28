import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-white text-center py-6 mt-10 border-t border-gray-200">
      <p className="text-gray-700 text-sm mb-2">
        © {new Date().getFullYear()} <span className="font-bold text-blue-600">Note Plus</span> — Crafted with care by Muhammad Shabbir.
      </p>
      <div className="flex justify-center gap-4 text-blue-600 text-sm">
        <a
          href="https://codewithshabbir.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline font-bold"
        >
          Visit Portfolio
        </a>
        <a
          href="https://www.linkedin.com/in/codewithshabbir/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline font-bold"
        >
          Connect on LinkedIn
        </a>
      </div>
    </footer>
  );
};

export default Footer;