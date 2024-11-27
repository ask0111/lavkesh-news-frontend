"use client";
import { handleError } from "@/admin-components/utils/error.handler";
import { validatePassword } from "@/admin-components/validations/BlogForm.validation";
import { useToast } from "@/common-component/custom-toast/ToastContext";
import { apiService } from "@/services/axios.service";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

// SignUpPage.tsx (Sign Up Page with OTP, CAPTCHA, and Password Validation)

const SignUpPage = () => {
  const history = useRouter();
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });
  const [errors, setErrors] = useState<any>({});
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Validate password strength
  

  const sendOtp = async (email: string, name: string) => {
    // console.log("Sending OTP to email:", email);
    try {
      const res = await apiService.post("/auth/send-otp", { email, name});
      const response = res.data;
      if (response.status) {
        setIsOtpSent(true); // Simulate OTP sent
        showToast(response.message, "success");
      }
    } catch (error) {
      console.log("Send OTP Error: ", error);
      handleError(error, showToast);
    }
  };

  // Handle OTP verification
  const handleVerifyOtp = async (email: string, otp: string) => {
    if (!otp) {
      return showToast("Enter Valid OTP", "error");
    }
    try {
      const res = await apiService.post("/auth/verify-otp", { email, otp });
      const response = res.data;
      if (response.status) {
        setIsEmailVerified(true); // Mark email as verified
      } else {
        setErrors({ ...errors, otp: "Invalid OTP" });
      }
    } catch (error) {
      setErrors({ ...errors, otp: "Invalid OTP" });
      handleError(error, showToast);
    }
  };

  // Handle CAPTCHA verification
  const handleCaptchaChange = (value: string | null) => {
    if (value) {
      setCaptchaVerified(true);
    }
  };

  const formValidation = () => {
    const newErrors: any = {};

    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!validatePassword(formData.password)) {
      newErrors.password =
        "Password must be at least 8 characters long, including one uppercase letter, one number, and one special character.";
    }
    if(formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do NOT match!"
    }
    if (!formData.otp) newErrors.otp = "OTP is required";
    // if (!captchaVerified)
    //   newErrors.captcha = "Please complete CAPTCHA verification";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    } else {
      return true;
    }
  };

  // Handle form submission
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    if (formValidation()) {
      try {
        const res = await apiService.post('/auth/register', {name: formData.name, email: formData.email, password: formData.password, otp: formData.otp});
        const response = res.data;
        if(response.status){
          showToast(response.message, 'success');
          history.push(`private/rbac${response.data.redirect}`);
        }else{
          showToast(response.message, 'error');
        }
      } catch (error) {
        console.log('Post user error: ', error);
        handleError(error, showToast);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Company Section */}
      <div className="w-full md:w-1/2 bg-gradient-to-r from-teal-400 to-blue-500 px-8 flex flex-col justify-center items-center text-white">
        <div className="max-w-lg flex flex-col justify-center items-center text-center">
          <div className="w-44 h-44">
            <img src="/image/fly.png" className="w-full h-full" alt="image" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Join Us Today!</h1>
          <p className="text-lg mb-6">
            Sign up and get access to exclusive content, news, and offers.
          </p>
        </div>
      </div>

      {/* Sign Up Section */}
      <div className="w-full md:w-1/2 bg-white p-8 flex flex-col justify-center items-center">
        <div className="w-full max-w-sm">
          {/* <div className="flex justify-center mb-6">
            <img src="/image/fly.png" alt="Logo" className="w-24 h-24" />
          </div> */}

          <h2 className="text-3xl font-semibold text-center text-teal-600 mb-4">
            Create Your Account
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>
            <div className="mb-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full p-4 border ${
                  isEmailVerified ? "border-green-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500`}
              />
              {isEmailVerified && (
                <p className="text-green-500 text-sm mt-1">Verified</p>
              )}
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {!isOtpSent && !isEmailVerified && (
              <button
                type="button"
                onClick={() => sendOtp(formData.email, formData.name)}
                className="w-full bg-teal-500 text-white p-4 rounded-md hover:bg-teal-600 transition-colors mb-4"
              >
                Send OTP
              </button>
            )}

            {isOtpSent && !isEmailVerified && (
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <div className="flex space-x-2">
                    {Array(4)
                      .fill("")
                      .map((_, index) => (
                        <input
                          key={index}
                          type="text"
                          name="otp"
                          value={formData.otp[index] || ""}
                          maxLength={1}
                          onChange={(e) => {
                            const value = e.target.value;
                            setFormData((prev) => {
                              const otpArray = prev.otp.split("");
                              otpArray[index] = value;
                              return { ...prev, otp: otpArray.join("") };
                            });
                          }}
                          className="w-12 p-4 border border-gray-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                      ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => sendOtp(formData.email, formData.name)}
                    className="text-teal-500 hover:text-teal-600"
                  >
                    Resend OTP
                  </button>
                </div>
                {errors.otp && (
                  <p className="text-red-500 text-sm mt-1">{errors.otp}</p>
                )}
                <button
                  type="button"
                  onClick={() => handleVerifyOtp(formData.email, formData.otp)}
                  className="w-full bg-teal-500 text-white p-4 rounded-md hover:bg-teal-600 transition-colors mt-2"
                >
                  Verify OTP
                </button>
              </div>
            )}

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
            <div className="mb-4">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <div className="mb-4">
              <ReCAPTCHA
                sitekey="your-site-key"
                onChange={handleCaptchaChange}
              />
              {errors.captcha && (
                <p className="text-red-500 text-sm mt-1">{errors.captcha}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-teal-500 text-white p-4 rounded-md hover:bg-teal-600 transition-colors"
            >
              Sign Up
            </button>
          </form>
          <br />
          <p>Already have an account? <Link className="text-blue-600" href="/private/rbac/login">Login</Link> </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
