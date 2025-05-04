"use client";
import { useState } from "react";

import Link from "next/link";
import Button from "@/app/components/ui/Button";
import { InputField } from "@/app/components/ui/InputField";
import PasswordInputField from "@/app/components/ui/PasswordInputField";
import { login } from "@/store/authSlice";
import { useAppDispatch } from "@/store/hooks";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false); // Add this

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const matchingUser = users.find(
      (user: { username: string; password: string }) =>
        user.username === form.username && user.password === form.password
    );

    if (!matchingUser) {
      setError("Invalid credentials or user does not exist.");
      return;
    }
    dispatch(login(form));
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

        <PasswordInputField
          label="Password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Enter your password"
          isPasswordVisible={passwordVisible}
          togglePasswordVisibility={() => setPasswordVisible(!passwordVisible)}
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="mt-10 w-full flex justify-center">
          <Button text="Login" type="submit" className="px-14" />
        </div>

        <div className="w-full flex justify-center py-3 text-sm text-[#ffab44]">
          <Link href={"/signup"}>Don’t have an account?</Link>
        </div>
      </form>
    </div>
  );
}
