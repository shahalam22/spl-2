"use client";
import React, { useState } from "react";
import Image from "next/image";
import loginImage from "@/public/login_page.jpg";
import logo from "@/public/c4clogo_transparent.png";
import Button from "@/components/button/Button";
import Link from "next/link";
import { FaApple, FaFacebook, FaGoogle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { loginUser } from "@/redux/features/authSlice";

const SOCIAL_LOGIN_BUTTONS = [
  { icon: <FaGoogle />, label: "Login with Google" },
  { icon: <FaFacebook />, label: "Login with Facebook" },
  { icon: <FaApple />, label: "Login with Apple" },
];

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useAppDispatch(); // Add dispatcher hook
  const { loading, error } = useAppSelector((state) => state.auth); // Access loading and error states
  const router = useRouter();

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // console.log(e.target.value);
    
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      // Dispatch the loginUser action with form data
      const result = await dispatch(loginUser(formData));

      // Check if the action was fulfilled (successful login)
      if (loginUser.fulfilled.match(result)) {
        router.push("/"); // Redirect to home on success
      }
    } catch (err) {
      console.error("Login error:", err); // Log any unexpected errors
    }
  };

  return (
    <div
      className="fixed inset-0 z-10 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center"
      onClick={() => router.push("/")}
    >
      <div
        className="relative flex flex-col md:flex-row bg-white rounded-2xl max-w-[900px] max-h-[520px] w-full h-auto p-5 pb-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 bg-black hover:bg-white text-white hover:text-black border border-black w-8 h-8 rounded-lg"
          onClick={() => router.push("/")}
          aria-label="Close"
        >
          X
        </button>

        <div className="flex flex-col w-full md:w-1/2">
          <Image className="max-w-[200px] mx-auto mb-5" src={logo} alt="logo" />
          <form onSubmit={handleFormSubmit}>
            <div className="flex flex-col justify-center items-center gap-3 w-[90%] mx-auto">
              <FormInput
                label="email"
                id="email"
                name="email"
                type="text"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <FormInput
                label="Enter Password"
                id="pass"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <Button variant="cyan" size="block" type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </Button>
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
          </form>

          <div className="flex flex-col items-center gap-3 w-[90%] mx-auto mt-5">
            <p className="text-sm">
              Don’t have an account?{" "}
              <Link href={'/register'}>
                <span className="text-cyan-500 hover:text-cyan-300">Sign Up</span>
              </Link>
            </p>
            {SOCIAL_LOGIN_BUTTONS.map(({ icon, label }, index) => (
              <Button key={index} variant="black" size="block">
                <div className="flex justify-center items-center gap-2 w-full h-8 px-2 cursor-pointer">
                  {icon}
                  {label}
                </div>
              </Button>
            ))}
          </div>
        </div>

        <div className="hidden md:block w-1/2">
          <Image
            className="rounded-r-2xl object-cover w-full h-full"
            src={loginImage}
            alt="login_image"
          />
        </div>
      </div>
    </div>
  );
}

function FormInput({ label, id, name, type, value, onChange, required }) {
  return (
    <div className="flex flex-col w-full">
      <label className="text-sm font-normal mb-1" htmlFor={id}>
        {label}
      </label>
      <input
        className="w-full h-8 px-2 border border-gray-300 rounded-md"
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
}

export default Login;