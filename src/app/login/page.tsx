"use client";

import { useState } from "react";
import Button from "../components/ui/Button";
import { InputField } from "../components/ui/InputField";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useRouter } from "next/navigation";
import { login } from "../store/authSlice";
import Link from "next/link";

export default function LoginPage() {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Retrieve users from localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    // Find user matching username & password
    const matchingUser = users.find(
      (user: { username: string; password: string }) =>
        user.username === form.username && user.password === form.password
    );

    if (!matchingUser) {
      setError("Invalid credentials or user does not exist.");
      return;
    }
    dispatch(login(form));
    // Login successful — you can dispatch redux action to set logged-in user if needed
    router.push("/home");
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-black/30 shadow-md rounded-md p-6 w-full max-w-xl px-12 py-20"
      >
        <h1 className="text-2xl font-semibold mb-6 text-center text-white/90 font-aoboshiOne uppercase tracking-widest">
          Login
        </h1>

        <InputField
          label="Username"
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Enter your username"
        />

        <InputField
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Enter your password"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="mt-10 w-full flex justify-center">
          <Button text="Login" type="submit" className="px-14"/>
        </div>
        <div className="w-full flex justify-center py-3 text-sm text-[#ffab44]">
          <Link href={"/signup"}>Dont have an account?</Link>
        </div>
      </form>
    </div>
  );
}
