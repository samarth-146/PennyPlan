"use client"

import { useEffect, useState } from "react"
import {
    ArrowLeftIcon,
    AtSignIcon,
    CalendarIcon,
    BarChartIcon as ChartBarIcon,
    CheckIcon,
    CreditCardIcon,
    DollarSignIcon,
    EditIcon,
    LineChartIcon,
    PiggyBankIcon,
    SaveIcon,
    TargetIcon,
    UserIcon,
    WalletIcon,
    XIcon,
    LogOutIcon
} from "lucide-react"
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function UserProfile() {
    const navigate=useNavigate();
    // User profile data
    const [profile, setProfile] = useState({
        username: "alex_student",
        email: "alex@university.edu",
        monthlyIncome: 1200,
        monthlyExpense: 950,
        riskLevel: "Medium",
        savingAmount: 250,
        savingPurpose: "Emergency fund and spring break trip",
        joinDate: "January 15, 2025",
        totalSaved: 1275.5,
        totalInvested: 875.25,
        roundUpSavings: 125.75,
    });

    const [userProfile, setUserProfile] = useState({});

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        const fetchProfile = async () => {
            const response = await axios.get(`http://localhost:8080/user/${userId}`);
            setUserProfile(response.data);
        }
        fetchProfile();
    }, []);

    // State for edit mode
    const [editMode, setEditMode] = useState(false)

    // State for form data
    const [formData, setFormData] = useState({
        email: userProfile.email,
        monthlyIncome: userProfile.monthlyIncome,
        monthlyExpense: userProfile.monthlyExpanse,
        savingAmount: userProfile.monthlyIncome - userProfile.monthlyExpanse + userProfile.roundUpSum || 0,
        // savingPurpose: userProfile.savingsGoal.purpose
    })

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: name === "email" ? value : Number(value),
        })
    }

    const handleLogout=async()=>{
        try{
            const token=localStorage.getItem('token');
            await axios.post('http://localhost:8080/logout', {}, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true, 
            });
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            navigate('/auth');
        }catch(e){
            console.error("Logout failed",e);
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const userId = localStorage.getItem('userId');
            const response = await axios.put(`http://localhost:8080/profile/${userId}`, {
                email: formData.email,
                monthlyIncome: formData.monthlyIncome,
                monthlyExpanse: formData.monthlyExpense,
                savingTarget: formData.savingAmount,
            });

            console.log(response);
            window.location.reload();
        } catch {
            console.error(e);
        }
        setProfile({
            ...profile,
            email: formData.email,
            monthlyIncome: formData.monthlyIncome,
            monthlyExpense: formData.monthlyExpense,
            savingAmount: formData.savingAmount,
            savingPurpose: formData.savingPurpose,
        })
        setEditMode(false)
    }

    // Cancel edit mode
    const handleCancel = () => {
        setFormData({
            email: userProfile.email,
            monthlyIncome: userProfile.monthlyIncome,
            monthlyExpense: userProfile.monthlyExpense,
            savingAmount: userProfile.savingAmount,
            savingPurpose: userProfile.savingsGoal.purpose,
        })
        setEditMode(false)
    }

    // Risk level colors and descriptions
    const riskLevelInfo = {
        Low: {
            color: "bg-green-500",
            description: "Conservative approach with lower returns but higher safety",
        },
        Medium: {
            color: "bg-blue-500",
            description: "Balanced approach with moderate growth potential",
        },
        High: {
            color: "bg-purple-500",
            description: "Growth-focused approach with higher potential returns",
        },
    }

    // Calculate savings percentage of income
    const savingsPercentage = (((userProfile.monthlyIncome - userProfile.monthlyExpanse + userProfile.roundUpSum || 0) / userProfile.monthlyIncome) * 100)

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                {/* <button className="inline-flex items-center mr-3 text-gray-500 hover:text-gray-700">
                  <ArrowLeftIcon className="h-5 w-5" />
                </button> */}
                                <Link to='/'>
                                    <PiggyBankIcon className="h-8 w-8 text-green-600" />
                                </Link>
                                <Link to='/'>
                                    <span className="ml-2 text-xl font-bold text-gray-800">PennyPlan</span>
                                </Link>
                            </div>
                        </div>
                        <div className="flex items-center">
                            {!editMode && (
                                <button
                                    onClick={() => setEditMode(true)}
                                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                >
                                    <EditIcon className="h-4 w-4 mr-1" />
                                    Edit Profile
                                </button>
                            )}
                            <button
                                onClick={() => handleLogout()}
                                className="ml-3 inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                                <LogOutIcon className="h-4 w-4 mr-1" />
                                Logout
                            </button>
                        </div>


                    </div>
                </div>
            </header>

            <main className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Profile Header */}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                        <div className="px-6 py-8 sm:p-10 bg-gradient-to-r from-green-500 to-blue-500">
                            <div className="flex flex-col sm:flex-row items-center">
                                <div className="h-24 w-24 rounded-full bg-white flex items-center justify-center shadow-lg">
                                    <UserIcon className="h-12 w-12 text-gray-400" />
                                </div>
                                <div className="mt-4 sm:mt-0 sm:ml-6 text-center sm:text-left">
                                    <h1 className="text-2xl font-bold text-white">{userProfile.username}</h1>
                                    <div className="flex items-center justify-center sm:justify-start mt-1 text-green-100">
                                        <AtSignIcon className="h-4 w-4 mr-1" />
                                        <span>{userProfile.email}</span>
                                    </div>
                                    <div className="flex items-center justify-center sm:justify-start mt-1 text-green-100">
                                        <CalendarIcon className="h-4 w-4 mr-1" />
                                        <span>Member since {new Date(userProfile.createdAt).toLocaleDateString('en-CA')}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="px-6 pt-6 pb-8 bg-white sm:p-10 sm:pt-6">
                            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <div className="flex items-center">
                                        <PiggyBankIcon className="h-6 w-6 text-green-600" />
                                        <span className="ml-2 text-sm font-medium text-gray-700">Total Saved</span>
                                    </div>
                                    <div className="mt-2 text-2xl font-bold text-gray-900">₹{userProfile.monthlyIncome - userProfile.monthlyExpanse + userProfile.roundUpSum || 0}</div>
                                    <div className="mt-1 text-sm text-gray-500">Through all saving methods</div>
                                </div>
                                {/* <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center">
                    <LineChartIcon className="h-6 w-6 text-blue-600" />
                    <span className="ml-2 text-sm font-medium text-gray-700">Total Invested</span>
                  </div>
                  <div className="mt-2 text-2xl font-bold text-gray-900">${profile.totalInvested}</div>
                  <div className="mt-1 text-sm text-gray-500">Across all investment options</div>
                </div> */}
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <div className="flex items-center">
                                        <CreditCardIcon className="h-6 w-6 text-purple-600" />
                                        <span className="ml-2 text-sm font-medium text-gray-700">Round-Up Savings</span>
                                    </div>
                                    <div className="mt-2 text-2xl font-bold text-gray-900">₹{userProfile.roundUpSum}</div>
                                    <div className="mt-1 text-sm text-gray-500">From transaction round-ups</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Profile Details */}
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {/* Financial Information */}
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                                <h3 className="text-lg font-medium text-gray-900">Financial Information</h3>
                            </div>
                            {editMode ? (
                                <form onSubmit={handleSubmit} className="p-6">
                                    <div className="space-y-4">
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="monthlyIncome" className="block text-sm font-medium text-gray-700">
                                                Monthly Income ($)
                                            </label>
                                            <input
                                                type="number"
                                                name="monthlyIncome"
                                                id="monthlyIncome"
                                                min="0"
                                                value={formData.monthlyIncome}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="monthlyExpense" className="block text-sm font-medium text-gray-700">
                                                Monthly Expenses ($)
                                            </label>
                                            <input
                                                type="number"
                                                name="monthlyExpense"
                                                id="monthlyExpense"
                                                min="0"
                                                value={formData.monthlyExpense}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                            />
                                        </div>
                                        <div className="flex justify-end space-x-3">
                                            <button
                                                type="button"
                                                onClick={handleCancel}
                                                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                            >
                                                <XIcon className="h-4 w-4 mr-1" />
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                            >
                                                <SaveIcon className="h-4 w-4 mr-1" />
                                                Save Changes
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            ) : (
                                <div className="p-6 space-y-6">
                                    <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                                        <div className="flex items-center">
                                            <AtSignIcon className="h-5 w-5 text-gray-400 mr-2" />
                                            <span className="text-sm font-medium text-gray-500">Email</span>
                                        </div>
                                        <span className="text-sm text-gray-900">{userProfile.email}</span>
                                    </div>
                                    <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                                        <div className="flex items-center">
                                            <WalletIcon className="h-5 w-5 text-gray-400 mr-2" />
                                            <span className="text-sm font-medium text-gray-500">Monthly Income</span>
                                        </div>
                                        <span className="text-sm text-gray-900">₹{userProfile.monthlyIncome}</span>
                                    </div>
                                    <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                                        <div className="flex items-center">
                                            <CreditCardIcon className="h-5 w-5 text-gray-400 mr-2" />
                                            <span className="text-sm font-medium text-gray-500">Monthly Expenses</span>
                                        </div>
                                        <span className="text-sm text-gray-900">₹{userProfile.monthlyExpanse}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center">
                                            <ChartBarIcon className="h-5 w-5 text-gray-400 mr-2" />
                                            <span className="text-sm font-medium text-gray-500">Monthly Balance</span>
                                        </div>
                                        <span
                                            className={`text-sm font-medium ${userProfile.monthlyIncome - userProfile.monthlyExpanse > 0 ? "text-green-600" : "text-red-600"
                                                }`}
                                        >
                                            ₹{(userProfile.monthlyIncome - userProfile.monthlyExpanse)}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Saving Goals */}
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                                <h3 className="text-lg font-medium text-gray-900">Saving Goals</h3>
                            </div>
                            {editMode ? (
                                <form onSubmit={handleSubmit} className="p-6">
                                    <div className="space-y-4">
                                        <div>
                                            <label htmlFor="savingAmount" className="block text-sm font-medium text-gray-700">
                                                Monthly Saving Target ($)
                                            </label>
                                            <input
                                                type="number"
                                                name="savingAmount"
                                                id="savingAmount"
                                                min="0"
                                                value={formData.savingAmount}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                            />
                                        </div>
                                        {/* <div>
                      <label htmlFor="savingPurpose" className="block text-sm font-medium text-gray-700">
                        Saving Purpose
                      </label>
                      <textarea
                        name="savingPurpose"
                        id="savingPurpose"
                        rows={3}
                        value={formData.savingPurpose}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      />
                    </div> */}
                                    </div>
                                </form>
                            ) : (
                                <div className="p-6">
                                    <div className="mb-6">
                                        <div className="flex justify-between items-center mb-2">
                                            <div className="flex items-center">
                                                <PiggyBankIcon className="h-5 w-5 text-green-500 mr-2" />
                                                <span className="text-sm font-medium text-gray-700">Monthly Saving Target</span>
                                            </div>
                                            <span className="text-sm font-medium text-green-600">₹{userProfile.monthlyIncome - userProfile.monthlyExpanse + userProfile.roundUpSum || 0}</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                                            <div
                                                className="bg-green-600 h-2.5 rounded-full"
                                                style={{ width: `${Math.min(savingsPercentage, 100)}%` }}
                                            ></div>
                                        </div>
                                        <div className="mt-1 text-xs text-gray-500 text-right">{savingsPercentage}% of monthly income</div>
                                    </div>
                                    {/* <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <TargetIcon className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-sm font-medium text-gray-700">Saving Purpose</span>
                    </div>
                  </div> */}
                                </div>
                            )}
                        </div>

                        {/* Risk Assessment */}
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                                <h3 className="text-lg font-medium text-gray-900">Risk Assessment</h3>
                            </div>
                            <div className="p-6">
                                <div className="flex items-center mb-4">
                                    <div className={`h-4 w-4 rounded-full ${riskLevelInfo[profile.riskLevel].color} mr-2`}></div>
                                    <span className="text-lg font-medium text-gray-900">{profile.riskLevel} Risk Level</span>
                                </div>
                                <p className="text-sm text-gray-600 mb-4">{riskLevelInfo[profile.riskLevel].description}</p>
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <h4 className="text-sm font-medium text-gray-700 mb-2">Recommended Investment Strategy</h4>
                                    {userProfile.riskTolerance === "Low" && (
                                        <ul className="text-sm text-gray-600 space-y-1 list-disc pl-5">
                                            <li>Focus on conservative investments like bonds and money market funds</li>
                                            <li>Aim for capital preservation with modest returns</li>
                                            <li>Consider the Student Savings Fund and Education Bond Fund</li>
                                        </ul>
                                    )}
                                    {userProfile.riskTolerance === "Medium" && (
                                        <ul className="text-sm text-gray-600 space-y-1 list-disc pl-5">
                                            <li>Balance between growth and stability with a mix of stocks and bonds</li>
                                            <li>Consider index funds and blue-chip dividend stocks</li>
                                            <li>Look into the Balanced Index Fund and S&P 500 Index Fund</li>
                                        </ul>
                                    )}
                                    {userProfile.riskTolerance === "High" && (
                                        <ul className="text-sm text-gray-600 space-y-1 list-disc pl-5">
                                            <li>Focus on growth-oriented investments like stocks and ETFs</li>
                                            <li>Consider emerging markets and technology sectors</li>
                                            <li>Explore the Growth Stock Portfolio and Tech Innovation Fund</li>
                                        </ul>
                                    )}
                                </div>
                                <div className="mt-4">
                                    <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                                        Retake Risk Assessment Quiz
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Account Activity */}
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                                <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
                            </div>
                            <div className="p-6">
                                <ul className="divide-y divide-gray-200">
                                    <li className="py-3">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                                                    <PiggyBankIcon className="h-4 w-4 text-green-600" />
                                                </div>
                                                <div className="ml-3">
                                                    <p className="text-sm font-medium text-gray-900">Round-Up Savings</p>
                                                    <p className="text-xs text-gray-500">May 7, 2025</p>
                                                </div>
                                            </div>
                                            <span className="text-sm font-medium text-green-600">{userProfile.roundUpSum}₹</span>
                                        </div>
                                    </li>
                                    {/* <li className="py-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <DollarSignIcon className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">Monthly Deposit</p>
                          <p className="text-xs text-gray-500">May 1, 2025</p>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-green-600">+$50.00</span>
                    </div>
                  </li> */}
                                    {/* <li className="py-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                          <LineChartIcon className="h-4 w-4 text-purple-600" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">Investment Return</p>
                          <p className="text-xs text-gray-500">April 30, 2025</p>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-green-600">+$12.75</span>
                    </div>
                  </li> */}
                                    <li className="py-3">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                                                    <CheckIcon className="h-4 w-4 text-green-600" />
                                                </div>
                                                <div className="ml-3">
                                                    <p className="text-sm font-medium text-gray-900">Risk Assessment Completed</p>
                                                    <p className="text-xs text-gray-500">April 15, 2025</p>
                                                </div>
                                            </div>
                                            <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">{userProfile.riskTolerance} Risk</span>
                                        </div>
                                    </li>
                                </ul>
                                <div className="mt-4 text-center">
                                    <button className="text-sm font-medium text-green-600 hover:text-green-500">View All Activity</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
