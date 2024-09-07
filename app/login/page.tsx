"use client";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [loading, setLoading] = useState(false); // New loading state
  const router = useRouter();
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setIsDisabled(!e.target.value || !password);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setIsDisabled(!email || !e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      const res = await axios.post("https://jobradar-backend-1.onrender.com/api/users/login", {
        email,
        password,
      });
      console.log(res.data);
      if (res.data.success) {
        alert("Login successful!");
        sessionStorage.setItem("isLoggedIn", "true");
        router.push("/");
        window.location.reload();
        // Optionally redirect to a dashboard or home page
      } else {
        alert(res.data.message || "Login failed!");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen mx-4">
      <form
        className="flex flex-col justify-center gap-5 w-full md:w-1/3 bg-white p-8 rounded-lg shadow-lg"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Login to continue!
        </h1>
        <Label htmlFor="email" className="text-gray-600">
          Email / Phone
        </Label>
        <Input
          type="text"
          placeholder="Email / Phone"
          onChange={handleEmailChange}
          className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Label htmlFor="password" className="text-gray-600">
          Password
        </Label>
        <Input
          type="password"
          placeholder="Password"
          onChange={handlePasswordChange}
          className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button
          type="submit"
          disabled={isDisabled || loading} // Disable button during loading
          className={`p-3 mt-4 rounded-md text-white ${
            isDisabled || loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600"
          } hover:bg-blue-700 transition duration-200`}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </div>
  );
};

export default Login;
