"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import { apiService } from "@/services/axios.service";
import { useToast } from "@/common-component/custom-toast/ToastContext";
import { handleError } from "@/admin-components/utils/error.handler";
import NotFoundPage from "../admin-panel/[slug]/page";
import { validatePassword } from "@/admin-components/validations/BlogForm.validation";

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { showToast } = useToast();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isValidToken, setIsValidToken] = useState("none");
const [passError, setPassError] = useState("");
  useEffect(() => {
    const validateToken = async () => {
      try {
        const res = await apiService.get(
          `/auth/verify-reset-token?token=${token}`
        );
        const response = res.data;
        if (response.status) {
          setIsValidToken("success");
        }else{
            setIsValidToken("error");
        }

    } catch {
          setIsValidToken("error");
        showToast("Invalid or expired token.", 'error');
        setError("Invalid or expired token.");
      }
    };
    validateToken();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePassword(newPassword)) {
        setPassError("Password must be at least 8 characters long, including one uppercase letter, one number, and one special character.")
    return ;  
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      const res = await apiService.post(`/auth/reset-password?token=${token}`, {
        token,
        newPassword,
      });
      const response = res.data;
      if (response.status) {
        showToast(response.message, "success");
        setConfirmPassword("")
        setNewPassword("")
        // router.push("/login");
      }
    } catch (err: any) {
      handleError(error, showToast);
      setError(err.response.data.message || "Something went wrong.");
    }
  };
  if(isValidToken === 'none') return <>Loading....</>

  if (isValidToken === 'error') return <div className="text-red-500">
    <NotFoundPage />
  </div>;

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
        {error && <p className="text-red-500">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            New Password
          </label>
          <input
            type="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
            value={newPassword}
            onChange={(e) =>{setPassError(""); setNewPassword(e.target.value)}}
            required
          />
          <p className="text-red-600">{passError}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
