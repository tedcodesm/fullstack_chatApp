import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthstore';
import Candle from '../components/Candle';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Loader2, Lock, MessagesSquare, Mail } from 'lucide-react'; // ✅ Import Mail icon

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggingin } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
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
              <h1 className="text-2xl font-bold mt-2">Login</h1> {/* ✅ Fixed title */}
              <p className="text-base-content/60">Access your account</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5 text-gray-400" /> {/* ✅ Fixed Mail icon */}
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
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <Lock className="size-5 text-gray-400" />
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
              disabled={isLoggingin}
              className="w-full btn btn-primary"
            >
              {isLoggingin ? (
                <>
                  <Loader2 className="animate-spin size-5" />
                  Loading...
                </>
              ) : (
                "Login" 
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Don't have an account?{" "}
              <Link to="/signup" className="link link-primary">
                Sign Up
              </Link>
            </p> {/* ✅ Fixed text & link */}
          </div>
        </div>
      </div>

      <div className="items-center flex justify-center w-full h-full">
        <Candle />
      </div>
    </div>
  );
};

export default LoginPage;
