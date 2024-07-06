import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  const { user, logout } = useAuth();

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-10">
          <Link to="/" className="text-2xl font-bold">
            <img src="/vite.svg" alt="Logo" className="h-8" />{" "}
            {/* Add your logo */}
          </Link>
          <nav>
            {user ? (
              <div className="flex items-center space-x-4">
                <img
                  src={user?.avatar || "/user.png"}
                  alt="Avatar"
                  className="h-8 w-8 rounded-full object-cover"
                />{" "}
                {/* Add user's avatar */}
                <span>{user.firstName}</span>
                <button
                  onClick={logout}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-x-4">
                <Link to="/register" className="hover:underline">
                  Register
                </Link>
                <Link to="/login" className="hover:underline">
                  Sign In
                </Link>
              </div>
            )}
          </nav>
        </div>
      </header>
      <main className="flex flex-grow container mx-auto items-center justify-center py-8">
        {children}
      </main>
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
