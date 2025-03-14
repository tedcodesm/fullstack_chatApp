import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthstore";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MessagesSquare,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";
import Candle from "../components/Candle";
import { toast } from "react-toastify";

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullname.trim()) return toast.error("fullname is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
    if (!formData.password.trim()) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");

    return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();

    if (success === true) signup(formData);
  };
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full space-y-8 max-w-md">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="flex size-12 rounded-xl bg-primary/10 items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessagesSquare className="size-10 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/60">
                {" "}
                Get started with free account
              </p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6" action="">
            <div className="form-control">
              <label htmlFor="" className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 z-[1] text-base-content/40" />
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full pl-10"
                  placeholder="Fullname"
                  value={formData.fullname}
                  onChange={(e) =>
                    setFormData({ ...formData, fullname: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="form-control">
              <label htmlFor="" className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="w-5 flex z-[1] h-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  className="input input-bordered w-full pl-10"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="form-control">
              <label htmlFor="" className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center ">
                  <Lock className="size-5  z-[1] flex text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full pl-10"
                  placeholder="********"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-neutral-400" />
                  ) : (
                    <Eye className="size-5 text-neutral-400" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSigningUp}
              className="w-full btn btn-primary"
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="animate-spin size-5" />
                  Loading...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Already have an Account{""}
              <Link to="/login" className="link link-primary">
                {" "}
                Signin
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="items-center flex justify-center w-full h-full">
        <Candle />
      </div>
    </div>
  );
};

export default SignupPage;
