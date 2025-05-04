"use client";
import Button from "@/app/components/ui/Button";
import { InputField } from "@/app/components/ui/InputField";
import PasswordInputField from "@/app/components/ui/PasswordInputField";
import { register } from "@/store/authSlice";
import { useAppDispatch } from "@/store/hooks";
import { validatePassword, checkUserExists, storeUserInLocalStorage } from "@/utils/helper";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";


const SignUpPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
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

    const userExists = checkUserExists(form.username, form.password);
    if (userExists) {
      setErrors({ ...errors, username: "User already exists" });
      return;
    }

    try {
      const userStored = storeUserInLocalStorage(form);
      if (userStored) {
        dispatch(register(form));
        router.push("/login");
      } else {
        setErrors({ ...errors, username: "User already exists" });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
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

        <PasswordInputField
          label="Password"
          name="password"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
          placeholder="Enter your password"
          isPasswordVisible={passwordVisible}
          togglePasswordVisibility={() => setPasswordVisible(!passwordVisible)}
        />

        <PasswordInputField
          label="Confirm Password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          placeholder="Confirm your password"
          isPasswordVisible={confirmPasswordVisible}
          togglePasswordVisibility={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
        />

        <div className="mt-10 w-full flex justify-center">
          <Button text="Submit" type="submit" className="px-14" />
        </div>

        <div className="w-full flex justify-center py-3 text-sm text-[#ffab44]">
          <Link href={"/login"}>Already have an account?</Link>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
