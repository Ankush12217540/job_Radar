"use client";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [loading, setLoading] = useState(false); // New loading state
  const router = useRouter();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setIsDisabled(!e.target.value || !password || !name);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setIsDisabled(!email || !e.target.value || !name);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setIsDisabled(!email || !password || !e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      const res = await axios.post("http://localhost:8000/api/users/register", {
        email,
        password,
        name,
      });
      console.log(res.data);
      if (res.data.success) {
        alert("Registration successful!");
        router.push("/");
        // Optionally redirect to a login page or dashboard
      } else {
        alert(res.data.message || "Registration failed!");
      }
    } catch (error) {
      console.error("Error registering user:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        className="flex flex-col justify-center gap-5 w-full md:w-1/3 bg-white p-8 rounded-lg shadow-lg"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Register to continue!
        </h1>
        <Label htmlFor="name" className="text-gray-600">
          Name
        </Label>
        <Input
          type="text"
          placeholder="John Doe"
          onChange={handleNameChange}
          className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Label htmlFor="email" className="text-gray-600">
          Email
        </Label>
        <Input
          type="email"
          placeholder="Email"
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
          {loading ? "Registering..." : "Register"}
        </Button>
      </form>
    </div>
  );
};

export default Register;
