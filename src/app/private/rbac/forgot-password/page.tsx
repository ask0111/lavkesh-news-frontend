"use client";

import React, { useState } from "react";
import axios from "axios";
import { apiService } from "@/services/axios.service";
import { handleError } from "@/admin-components/utils/error.handler";
import { useToast } from "@/common-component/custom-toast/ToastContext";

const ForgotPassword = () => {
  const { showToast } = useToast();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await apiService.post("/auth/reset-link-send-to-email", {
        email,
      });
      const response = res.data;
      if (response.status) {
        showToast(response.message, "success");
        setMessage(response.message);
        setError("");
      } else {
        showToast(response.message, "error");
        setError(response.message);
        setMessage("");
      }
    } catch (err: any) {
      handleError(error, showToast);
      setError(err.response.data.message || "Something went wrong.");
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
        {message && <p className="text-green-500">{message}</p>}
        {error && <p className="text-red-500">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
