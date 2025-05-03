// src/app/signup/page.tsx
"use client";

import { useState } from "react";
import { InputField } from "../components/ui/InputField";
import Button from "../components/ui/Button";
import { storeUserInLocalStorage, validatePassword } from "../utitls/helper";
import { useAppDispatch } from "../store/hooks";
import { register } from "../store/authSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUpPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error on change
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!form.username.trim()) {
      newErrors.username = "Username is required";
    }
    const passwordError = validatePassword(form.password);
    if (passwordError) {
      newErrors.password = passwordError;
    }
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // setIsSubmitting(true);

    try {
      dispatch(register(form));
      storeUserInLocalStorage(form);
      console.log("Form submitted", form);
      alert("Sign up successful!");
      router.push("/login");
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen  px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-black/30 shadow-md rounded-md p-6 w-full max-w-xl px-12 py-20"
      >
        <h1 className="text-2xl font-semibold mb-6 text-center text-white/90 font-aoboshiOne uppercase tracking-widest">
          Sign Up
        </h1>

        <InputField
          label="Username"
          name="username"
          value={form.username}
          onChange={handleChange}
          error={errors.username}
          placeholder="Enter your username"
        />

        <InputField
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
          placeholder="Enter your password"
        />

        <InputField
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={form.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          placeholder="Confirm your password"
        />

        <div className="mt-10 w-full flex justify-center">
          <Button text="Submit" type="submit" className="px-14"/>
        </div>
        <div className="w-full flex justify-center py-3 text-sm text-[#ffab44]">
          <Link href={"/login"}>Already have an account?</Link>
        </div>
      </form>
    </div>
  );
}
