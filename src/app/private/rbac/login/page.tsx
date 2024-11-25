"use client";
import { handleError } from "@/admin-components/utils/error.handler";
import { useToast } from "@/common-component/custom-toast/ToastContext";
import { apiService } from "@/services/axios.service";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { PiFacebookLogoBold } from "react-icons/pi";

// LoginPage.tsx (Login Page with Company Section)

const LoginPage = () => {
  const history = useRouter();
  const {showToast} = useToast()
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<any>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: any = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      try {
        const res = await apiService.post('/auth/login', {email: formData.email, password: formData.password});
        const response = res.data;
        console.log(response)
        if(response.status){
          showToast(response.message, 'success');
          history.push(`/`);
        }else{
          showToast(response.message, 'error');
        }
      } catch (error) {
        handleError(error, showToast)
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Company Section */}
      <div className="w-full md:w-1/2 bg-gradient-to-r from-teal-400 to-blue-500 p-8 flex flex-col justify-center items-center text-white">
        <div className="max-w-lg flex flex-col justify-center items-center text-center">
          <div className="w-44 h-44">
            <img src="/image/fly.png" className="w-full h-full" alt="image" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
          <p className="text-lg mb-6">
            We provide top-notch services to our customers. Stay updated with
            the latest news, blog posts, and industry insights.
          </p>

          {/* <div className="w-full space-y-4">
            <div className="bg-white text-black p-4 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-2">Latest Achievements</h3>
              <p className="text-gray-700">We have expanded our services globally to better serve our customers worldwide.</p>
            </div>
            <div className="bg-white text-black p-4 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-2">Upcoming Events</h3>
              <p className="text-gray-700">Join us for our upcoming tech conference. Learn about the future of tech from industry leaders.</p>
            </div>
          </div> */}
        </div>
      </div>

      {/* Login Section */}
      <div className="w-full md:w-1/2 bg-white p-8 flex flex-col justify-center items-center">
        <div className="w-full max-w-sm">
          {/* <div className="flex justify-center mb-6">
            <img src="/image/fly.png" alt="Logo" className="w-24 h-24" />
          </div> */}

          <h2 className="text-3xl font-semibold text-center text-teal-600 mb-4">
            Login to Your Account
          </h2>

          <div className=" justify-center gap-4 mb-4">
            <button
              onClick={() => console.log("Login with Google")}
              className="bg-blue-600 w-full text-white flex gap-4 items-center p-3 rounded-md hover:bg-red-600 transition-colors"
            >
              <FcGoogle size={40} /> Continuous with Google{" "}
            </button>
            <br />
            <button
              onClick={() => console.log("Login with Facebook")}
              className="bg-blue-600 w-full text-white flex gap-4 items-center p-3 rounded-md hover:bg-blue-700 transition-colors"
            >
              <PiFacebookLogoBold
              size={40}
                color="blue"
                className="bg-white text-white"
              />{" "}
              Continuous with Facebook{" "}
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div className="mb-4">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-teal-500 text-white p-4 rounded-md hover:bg-teal-600 transition-colors mb-4"
            >
              Login
            </button>

            <div className="text-center">
              <p className="text-sm text-gray-500">
                Forgot your password?{" "}
                <span className="text-teal-500 cursor-pointer hover:text-teal-600">
                  Reset it
                </span>
              </p>
              <p className="text-sm text-gray-500">
                Don't have an account?{" "}
                <span
                  className="text-teal-500 cursor-pointer hover:text-teal-600"
                  onClick={() => history.push("/private/rbac/register")}
                >
                  Sign Up
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
