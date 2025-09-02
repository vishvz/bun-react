import { Link, useLocation } from "react-router-dom";
import logo from "../logo.svg";
import reactLogo from "../react.svg";

export function Navigation() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="mb-8">
      <div className="flex justify-center items-center gap-8 mb-8">
        <img
          src={logo}
          alt="Bun Logo"
          className="h-24 p-6 transition-all duration-300 hover:drop-shadow-[0_0_2em_#646cffaa] scale-120"
        />
        <img
          src={reactLogo}
          alt="React Logo"
          className="h-24 p-6 transition-all duration-300 hover:drop-shadow-[0_0_2em_#61dafbaa] animate-[spin_20s_linear_infinite]"
        />
      </div>
      
      <div className="flex justify-center gap-6 mb-8">
        <Link
          to="/"
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            isActive("/")
              ? "bg-blue-600 text-white"
              : "text-blue-400 hover:text-blue-300 hover:bg-gray-800"
          }`}
        >
          Home
        </Link>
        <Link
          to="/about"
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            isActive("/about")
              ? "bg-blue-600 text-white"
              : "text-blue-400 hover:text-blue-300 hover:bg-gray-800"
          }`}
        >
          About
        </Link>
        <Link
          to="/contact"
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            isActive("/contact")
              ? "bg-blue-600 text-white"
              : "text-blue-400 hover:text-blue-300 hover:bg-gray-800"
          }`}
        >
          Contact
        </Link>
      </div>
    </nav>
  );
}
