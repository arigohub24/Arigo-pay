import { Link, useNavigate } from "react-router-dom"; // Add useNavigate
import { useState } from "react";
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff, FiArrowRight } from "react-icons/fi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const signupSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  username: yup.string().required("Username is required").min(3, "Username must be at least 3 characters"),
  fullName: yup.string().required("Full name is required"),
  password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
});

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm({
    resolver: yupResolver(signupSchema)
  });

  const queryClient = useQueryClient();

  const { mutate, isError, isPending, error } = useMutation({
    mutationFn: async ({ email, username, fullName, password }) => {
      try {
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, username, fullName, password }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to create account");
        return data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    onSuccess: (data) => {
      toast.success("Account created successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      navigate("/onboarding", { state: { email: data.email } }); // Navigate to verification with email
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row">
      {/* Visual header for mobile */}
      <div className="lg:hidden w-full bg-gradient-to-br from-blue-50 to-blue-100 py-6">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col items-center justify-center"
        >
          <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center shadow-md mb-3">
            <FiUser className="text-white text-xl" />
          </div>
          <h2 className="text-lg font-bold text-gray-800">Arigo Pay</h2>
          <p className="text-sm text-gray-600">Secure Banking Made Simple</p>
        </motion.div>
      </div>
  
      {/* Form section - full width on mobile */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-5 md:p-8 lg:p-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md mx-auto"
        >
          <div className="mb-6">
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-bold text-gray-900 mb-1"
            >
              Create your account
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-sm text-gray-600"
            >
              Join Arigo Pay and experience secure banking
            </motion.p>
          </div>
  
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="text-gray-400" />
                </div>
                <input
                  type="email"
                  className={`pl-10 w-full py-3 px-4 rounded-lg border ${errors.email ? 'border-red-300 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'} focus:ring-2 focus:border-blue-500 outline-none transition text-base`}
                  placeholder="your@email.com"
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
              )}
            </motion.div>
  
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className={`pl-10 w-full py-3 px-4 rounded-lg border ${errors.username ? 'border-red-300 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'} focus:ring-2 focus:border-blue-500 outline-none transition text-base`}
                  placeholder="Choose a username"
                  {...register("username")}
                />
              </div>
              {errors.username && (
                <p className="mt-1 text-sm text-red-500">{errors.username.message}</p>
              )}
            </motion.div>
  
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className={`pl-10 w-full py-3 px-4 rounded-lg border ${errors.fullName ? 'border-red-300 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'} focus:ring-2 focus:border-blue-500 outline-none transition text-base`}
                  placeholder="Your full name"
                  {...register("fullName")}
                />
              </div>
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-500">{errors.fullName.message}</p>
              )}
            </motion.div>
  
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`pl-10 w-full py-3 px-4 rounded-lg border ${errors.password ? 'border-red-300 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'} focus:ring-2 focus:border-blue-500 outline-none transition text-base`}
                  placeholder="Create a password"
                  {...register("password")}
                />
                <button 
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FiEyeOff className="text-gray-500 hover:text-gray-700" />
                  ) : (
                    <FiEye className="text-gray-500 hover:text-gray-700" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
              )}
            </motion.div>
  
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="pt-2"
            >
              <button
                type="submit"
                disabled={isPending}
                className={`w-full flex items-center justify-center py-3 px-4 rounded-lg bg-blue-600 text-white font-medium shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 text-base ${isPending ? 'opacity-80 cursor-not-allowed' : ''}`}
              >
                {isPending ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating account...
                  </>
                ) : (
                  <>
                    Sign up <FiArrowRight className="ml-2" />
                  </>
                )}
              </button>
            </motion.div>
  
            {isError && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100"
              >
                {error.message}
              </motion.div>
            )}
          </form>
  
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-6 text-center"
          >
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 font-medium hover:text-blue-800 transition-colors">
                Sign in
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
  
      {/* Right side - Visual - Hidden on mobile, shown on lg and up */}
      <div className="hidden lg:block lg:w-1/2 bg-gradient-to-br from-blue-50 to-blue-100 relative">
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-center max-w-lg mx-auto">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mb-8"
            >
              <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                <FiUser className="text-white text-3xl" />
              </div>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-3xl font-bold text-gray-800 mb-4"
            >
              Secure Banking Made Simple
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-gray-600 text-lg"
            >
              Manage your finances with confidence using our industry-leading security features.
            </motion.p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;