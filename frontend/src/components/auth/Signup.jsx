import { useState } from "react"
import { EyeIcon, EyeOffIcon, LockOpenIcon as LockClosedIcon, MailIcon, UserIcon,PiggyBankIcon } from "lucide-react"
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../../authContext';
import { toast } from 'react-toastify';

export default function Signup() {
    const { setCurrentUser } = useAuth();
    const navigate=useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  })

  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.username.trim()) {
      newErrors.username = "Username is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    const { email, password, username } = formData;
  
    try {
      const response = await axios.post('/signup', {
        email,
        password,
        username
      });
  
      const token = response.data.token;
      const userId = response.data.id;
  
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      setCurrentUser(userId);
  
      setFormData({ email: "", username: "", password: "" });
      toast.success('Logged in successfully');
      navigate('/onboard');
    } catch (e) {
      if (e.response) {
        const { status } = e.response;
        if (status === 403) {
          toast.error('Email already exists', { position: "top-right" });
        } else if (status === 400) {
          toast.error('Username already exists', { position: "top-right" });
        } else if (status === 500) {
          toast.error('Internal Server Error', { position: "top-right" });
        } else {
          toast.error("Something is wrong!!", { position: "top-right" });
          console.error(e);
        }
      }
    }
  }
  

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-green-50 to-blue-50 p-4">
        <header className="w-full mb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-start">
            <div className="flex">
              <div className="flex-shrink-0 flex items-start">
                <Link to='/dashboard'>
                <PiggyBankIcon className="h-8 w-8 text-green-600" />
                </Link>
                <Link to='/dashboard'>
                <span className="ml-2 text-xl font-bold text-gray-800">PennyPlan</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-green-600 py-4">
          <h1 className="text-center text-white text-2xl font-bold">PennyPlan</h1>
          <p className="text-center text-green-100 text-sm">Smart investments for students</p>
        </div>

        <div className="p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Sign Up</h2>

          <form onSubmit={handleSubmit}>
            <div className="space-y-5">
              {/* Username Field */}
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className={`pl-10 w-full py-2 border ${errors.username ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-green-500 focus:border-green-500 outline-none`}
                    placeholder="Enter your username"
                  />
                </div>
                {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username}</p>}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MailIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`pl-10 w-full py-2 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-green-500 focus:border-green-500 outline-none`}
                    placeholder="Enter your email"
                  />
                </div>
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LockClosedIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`pl-10 w-full py-2 border ${errors.password ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-green-500 focus:border-green-500 outline-none`}
                    placeholder="Enter your password"
                  />
                  <div
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-5 w-5 text-gray-400" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </div>
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
              </div>


              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link to='/auth' className="font-medium text-green-600 hover:text-green-500">
              Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
