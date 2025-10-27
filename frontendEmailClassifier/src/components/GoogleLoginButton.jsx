import React from "react";

export default function GoogleLoginButton() {
  const handleLogin = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };

  return (
    <button
      onClick={handleLogin}
      className="w-full py-3 px-4 bg-white text-gray-800 font-semibold rounded-lg flex items-center gap-3 justify-center shadow-md hover:shadow-lg hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900"
    >
      <img
        src="https://www.svgrepo.com/show/355037/google.svg"
        alt="google"
        className="w-6 h-6"
      />
      <span>Sign in with Google</span>
    </button>
  );
}