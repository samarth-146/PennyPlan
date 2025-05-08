"use client"

import { useEffect, useState } from "react"
import {
    CalendarIcon,
    BanknoteIcon,
    BarChart3Icon,
    BellIcon,
    CoffeeIcon,
    CoinsIcon,
    DollarSignIcon,
    InfoIcon,
    LineChartIcon,
    MenuIcon,
    PiggyBankIcon,
    ShieldIcon,
    TrendingUpIcon,
    UserIcon,
    FileTextIcon,
    PlusIcon,
    HomeIcon,
    CandlestickChartIcon,
    BitcoinIcon,
    BriefcaseIcon
} from "lucide-react"
import axios from "axios";
import { Link } from "react-router-dom";

export default function DashboardHome() {
    const [userDetail, setUserDetail] = useState(0);

    useEffect(() => {
        const fetchUser = async () => {
            const userId = localStorage.getItem('userId');
            const user = await axios.get(`/user/${userId}`);
            // console.log(user);
            setUserDetail(user.data);
        }
        fetchUser();
    }, []);
    const [expandedRiskLevel, setExpandedRiskLevel] = useState(userDetail.riskTolerance)
    const riskLevels = ["low", "medium", "high"];
    const [activeTab, setActiveTab] = useState("overview")

    const toggleRiskLevel = (level) => {
        setExpandedRiskLevel(expandedRiskLevel === level ? null : level)
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <PiggyBankIcon className="h-8 w-8 text-green-600" />
                                <span className="ml-2 text-xl font-bold text-gray-800">PennyPlan</span>
                            </div>
                            <nav className="hidden sm:ml-6 sm:flex sm:space-x-8">
                                <button
                                    onClick={() => setActiveTab("overview")}
                                    className={`${activeTab === "overview"
                                        ? "border-green-500 text-gray-900"
                                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                        } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                                >
                                    Dashboard
                                </button>
                                
                            </nav>
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:items-center">
                            <Link to='/warnings' className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                                <span className="sr-only">Add Expense</span>
                                <BellIcon className="h-6 w-6" />
                            </Link>
                            <Link to='/expense' className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                                <span className="sr-only">Add Expense</span>
                                <PlusIcon className="h-6 w-6" />
                            </Link>
                          

                            <div className="ml-3 relative">
                                <div>
                                    <button className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                                        <span className="sr-only">Open user menu</span>
                                        <Link to='/profile'>
                                            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                                                <UserIcon className="h-5 w-5 text-gray-500" />
                                            </div>
                                        </Link>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="-mr-2 flex items-center sm:hidden">
                            <button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500">
                                <span className="sr-only">Open main menu</span>
                                <MenuIcon className="block h-6 w-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Welcome Banner */}
                    <div className="bg-green-600 rounded-lg shadow-lg overflow-hidden mb-8">
                        <div className="px-6 py-8 sm:p-10 sm:pb-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl leading-8 font-extrabold text-white sm:text-3xl sm:leading-9">
                                    Welcome {userDetail.username}!
                                </h2>

                                
                            </div>
                            <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                                🧠 Risk Profile: {userDetail.riskTolerance}
                            </div>
                            <div className="mt-5">
                                <div className="text-base max-w-xl text-green-100">
                                    You've saved {userDetail.roundUpSum || 0}₹ through round-ups this week.
                                </div>
                            </div>
                        </div>
                        <div className="px-6 pt-6 pb-8 bg-green-700 sm:p-10 sm:pt-6">
                            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="bg-white/10 rounded-lg p-4">
                                    <div className="flex items-center">
                                        {/* <PiggyBankIcon className="h-6 w-6 text-white" /> */}
                                        <span className="ml-2 text-sm font-medium text-white">Total Saved</span>
                                    </div>
                                    <div className="mt-2 text-2xl font-bold text-white">
                                        {(userDetail.monthlyIncome || 0) - (userDetail.monthlyExpanse || 0) + (userDetail.roundUpSum || 0)}₹
                                    </div>
                                    

                                </div>
                                <div className="bg-white/10 rounded-lg p-4">
                                    <div className="flex items-center">
                                        {/* <TrendingUpIcon className="h-6 w-6 text-white" /> */}
                                        <span className="ml-2 text-sm font-medium text-white">Saved(%)</span>
                                    </div>
                                    <div className="mt-2 text-2xl font-bold text-white">
                                        {userDetail.monthlyIncome
                                            ? (((userDetail.monthlyIncome - (userDetail.monthlyExpanse || 0) + (userDetail.roundUpSum || 0)) / userDetail.monthlyIncome) * 100).toFixed(2)
                                            : "0"}% saved
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>

                    {/* Investment Options Section */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Investment Options for Students</h2>
                        <p className="text-gray-600 mb-6">
                            We've tailored these investment options specifically for students. Choose based on your risk tolerance,
                            financial goals, and time horizon.
                        </p>

                        {/* Risk Level Selector */}
                        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                                <h3 className="text-lg font-medium text-gray-900">Select Your Risk Tolerance</h3>
                            </div>
                            <div className="p-6">
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                    <button
                                        onClick={() => toggleRiskLevel("low")}
                                        className={`flex flex-col items-center p-4 rounded-lg border-2 ${expandedRiskLevel === "low"
                                            ? "border-green-500 bg-green-50"
                                            : "border-gray-200 hover:border-green-200 hover:bg-green-50"
                                            }`}
                                    >
                                        <ShieldIcon className="h-8 w-8 text-green-500 mb-2" />
                                        <h4 className="text-lg font-medium text-gray-900">Low Risk</h4>
                                        <p className="text-sm text-gray-500 text-center mt-1">
                                            Conservative options with lower returns but higher safety
                                        </p>
                                    </button>
                                    <button
                                        onClick={() => toggleRiskLevel("medium")}
                                        className={`flex flex-col items-center p-4 rounded-lg border-2 ${expandedRiskLevel === "medium"
                                            ? "border-blue-500 bg-blue-50"
                                            : "border-gray-200 hover:border-blue-200 hover:bg-blue-50"
                                            }`}
                                    >
                                        <BarChart3Icon className="h-8 w-8 text-blue-500 mb-2" />
                                        <h4 className="text-lg font-medium text-gray-900">Medium Risk</h4>
                                        <p className="text-sm text-gray-500 text-center mt-1">
                                            Balanced options with moderate growth potential
                                        </p>
                                    </button>
                                    <button
                                        onClick={() => toggleRiskLevel("high")}
                                        className={`flex flex-col items-center p-4 rounded-lg border-2 ${expandedRiskLevel === "high"
                                            ? "border-purple-500 bg-purple-50"
                                            : "border-gray-200 hover:border-purple-200 hover:bg-purple-50"
                                            }`}
                                    >
                                        <LineChartIcon className="h-8 w-8 text-purple-500 mb-2" />
                                        <h4 className="text-lg font-medium text-gray-900">High Risk</h4>
                                        <p className="text-sm text-gray-500 text-center mt-1">
                                            Growth-focused options with higher potential returns
                                        </p>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Low Risk Investment Options */}
                        {expandedRiskLevel === "low" && (
                            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                                <div className="px-6 py-4 bg-green-50 border-b border-green-100">
                                    <div className="flex items-center">
                                        <ShieldIcon className="h-6 w-6 text-green-500 mr-2" />
                                        <h3 className="text-lg font-medium text-gray-900">Low Risk Investment Options</h3>
                                    </div>
                                </div>
                                <div className="divide-y divide-gray-200">
                                    {/* Option 1 */}
                                    <div className="p-6">
                                        <div className="flex items-start">
                                            <div className="flex-shrink-0 bg-green-100 rounded-md p-2">
                                                <CoinsIcon className="h-6 w-6 text-green-600" />
                                            </div>
                                            <div className="ml-4">
                                                <h4 className="text-lg font-medium text-gray-900">Fixed Deposits (FDs)</h4>
                                                <div className="mt-1 flex items-center">
                                                    <span className="text-sm font-medium text-green-600">5.5-7.5% annual return</span>
                                                    <span className="mx-2 text-gray-500">•</span>
                                                    <span className="text-sm text-gray-500">Minimum: ₹1000</span>
                                                    <span className="mx-2 text-gray-500">•</span>
                                                    <span className="text-sm text-gray-500">Risk: Very Low</span>
                                                </div>
                                                <p className="mt-2 text-sm text-gray-600">
                                                    Conservative and reliable. Lock in your money for a fixed period and earn steady interest.
                                                </p>
                                                <div className="mt-4 bg-gray-50 rounded-md p-4">
                                                    <h5 className="text-sm font-medium text-gray-900">Why it's good for students:</h5>
                                                    <ul className="mt-2 text-sm text-gray-600 space-y-1 list-disc pl-5">
                                                        <li>Start with as little as ₹1000</li>
                                                        <li>Lock-in ranges from 7 days to 10 years</li>
                                                        <li>Government-insured up to ₹5 lakh</li>
                                                    </ul>
                                                </div>
                                                <div className="mt-4 text-sm text-gray-600">Available via banks and NBFCs</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Option 2 */}
                                    <div className="p-6">
                                        <div className="flex items-start">
                                            <div className="flex-shrink-0 bg-green-100 rounded-md p-2">
                                                <ShieldIcon className="h-6 w-6 text-green-600" />
                                            </div>
                                            <div className="ml-4">
                                                <h4 className="text-lg font-medium text-gray-900">Public Provident Fund (PPF)</h4>
                                                <div className="mt-1 flex items-center">
                                                    <span className="text-sm font-medium text-green-600">7.1% annual return</span>
                                                    <span className="mx-2 text-gray-500">•</span>
                                                    <span className="text-sm text-gray-500">Minimum: ₹500/year</span>
                                                    <span className="mx-2 text-gray-500">•</span>
                                                    <span className="text-sm text-gray-500">Risk: Government-Backed</span>
                                                </div>
                                                <p className="mt-2 text-sm text-gray-600">
                                                    Long-term tax-free savings. Ideal for building a disciplined savings habit.
                                                </p>
                                                <div className="mt-4 bg-gray-50 rounded-md p-4">
                                                    <h5 className="text-sm font-medium text-gray-900">Why it's good for students:</h5>
                                                    <ul className="mt-2 text-sm text-gray-600 space-y-1 list-disc pl-5">
                                                        <li>Safe and government-backed</li>
                                                        <li>Interest is compounded yearly and tax-free</li>
                                                        <li>Encourages long-term saving</li>
                                                    </ul>
                                                </div>
                                                <div className="mt-4 text-sm text-gray-600">Available via post offices and banks</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Option 3 */}
                                    <div className="p-6">
                                        <div className="flex items-start">
                                            <div className="flex-shrink-0 bg-green-100 rounded-md p-2">
                                                <FileTextIcon className="h-6 w-6 text-green-600" />
                                            </div>
                                            <div className="ml-4">
                                                <h4 className="text-lg font-medium text-gray-900">National Savings Certificate (NSC)</h4>
                                                <div className="mt-1 flex items-center">
                                                    <span className="text-sm font-medium text-green-600">7.7% annual return</span>
                                                    <span className="mx-2 text-gray-500">•</span>
                                                    <span className="text-sm text-gray-500">Lock-in: 5 years</span>
                                                    <span className="mx-2 text-gray-500">•</span>
                                                    <span className="text-sm text-gray-500">Risk: Low</span>
                                                </div>
                                                <p className="mt-2 text-sm text-gray-600">
                                                    A low-risk government scheme with guaranteed returns and tax benefits.
                                                </p>
                                                <div className="mt-4 bg-gray-50 rounded-md p-4">
                                                    <h5 className="text-sm font-medium text-gray-900">Why it's good for students:</h5>
                                                    <ul className="mt-2 text-sm text-gray-600 space-y-1 list-disc pl-5">
                                                        <li>Government-guaranteed returns</li>
                                                        <li>Eligible under 80C tax deduction</li>
                                                        <li>Lock-in encourages saving discipline</li>
                                                    </ul>
                                                </div>
                                                <div className="mt-4 text-sm text-gray-600">Available via post offices</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-start">
                                            <div className="flex-shrink-0 bg-green-100 rounded-md p-2">
                                                <BanknoteIcon className="h-6 w-6 text-green-600" />
                                            </div>
                                            <div className="ml-4">
                                                <h4 className="text-lg font-medium text-gray-900">Debt Mutual Funds (Low-Risk)</h4>
                                                <div className="mt-1 flex items-center">
                                                    <span className="text-sm font-medium text-green-600">4–7% returns</span>
                                                    <span className="mx-2 text-gray-500">•</span>
                                                    <span className="text-sm text-gray-500">No lock-in</span>
                                                    <span className="mx-2 text-gray-500">•</span>
                                                    <span className="text-sm text-gray-500">Risk: Low</span>
                                                </div>
                                                <p className="mt-2 text-sm text-gray-600">
                                                    Suitable for short-term investments with higher liquidity and moderate returns.
                                                </p>
                                                <div className="mt-4 bg-gray-50 rounded-md p-4">
                                                    <h5 className="text-sm font-medium text-gray-900">Why it's good for students:</h5>
                                                    <ul className="mt-2 text-sm text-gray-600 space-y-1 list-disc pl-5">
                                                        <li>No fixed lock-in</li>
                                                        <li>Better returns than savings account</li>
                                                        <li>Choose funds with government or AAA bonds</li>
                                                    </ul>
                                                </div>
                                                <div className="mt-4 text-sm text-gray-600">Available via Zerodha, Groww, etc.</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-start">
                                            <div className="flex-shrink-0 bg-green-100 rounded-md p-2">
                                                <CalendarIcon className="h-6 w-6 text-green-600" />
                                            </div>
                                            <div className="ml-4">
                                                <h4 className="text-lg font-medium text-gray-900">RBI Floating Rate Bonds</h4>
                                                <div className="mt-1 flex items-center">
                                                    <span className="text-sm font-medium text-green-600">~8.05% return</span>
                                                    <span className="mx-2 text-gray-500">•</span>
                                                    <span className="text-sm text-gray-500">7-year lock-in</span>
                                                    <span className="mx-2 text-gray-500">•</span>
                                                    <span className="text-sm text-gray-500">Risk: Government-Backed</span>
                                                </div>
                                                <p className="mt-2 text-sm text-gray-600">
                                                    Reliable and safe investment with rates that move with inflation.
                                                </p>
                                                <div className="mt-4 bg-gray-50 rounded-md p-4">
                                                    <h5 className="text-sm font-medium text-gray-900">Why it's good for students:</h5>
                                                    <ul className="mt-2 text-sm text-gray-600 space-y-1 list-disc pl-5">
                                                        <li>Backed by the Reserve Bank of India</li>
                                                        <li>Good for long-term financial stability</li>
                                                        <li>Floating rates adjusted every 6 months</li>
                                                    </ul>
                                                </div>
                                                <div className="mt-4 text-sm text-gray-600">Available via designated banks</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Medium Risk Investment Options */}
                        {expandedRiskLevel === "medium" && (
                            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                                <div className="px-6 py-4 bg-blue-50 border-b border-blue-100">
                                    <div className="flex items-center">
                                        <BarChart3Icon className="h-6 w-6 text-blue-500 mr-2" />
                                        <h3 className="text-lg font-medium text-gray-900">Medium Risk Investment Options</h3>
                                    </div>
                                </div>
                                <div className="divide-y divide-gray-200">
                                    {/* Option 1 */}
                                    <div className="p-6">
                                        <div className="flex items-start">
                                            <div className="flex-shrink-0 bg-yellow-100 rounded-md p-2">
                                                <CoinsIcon className="h-6 w-6 text-yellow-600" />
                                            </div>
                                            <div className="ml-4">
                                                <h4 className="text-lg font-medium text-gray-900">Balanced Mutual Funds</h4>
                                                <div className="mt-1 flex items-center">
                                                    <span className="text-sm font-medium text-yellow-600">8-10% annual return</span>
                                                    <span className="mx-2 text-gray-500">•</span>
                                                    <span className="text-sm text-gray-500">Minimum: ₹500</span>
                                                    <span className="mx-2 text-gray-500">•</span>
                                                    <span className="text-sm text-gray-500">Risk: Medium</span>
                                                </div>
                                                <p className="mt-2 text-sm text-gray-600">
                                                    A mix of stocks and bonds. Offers balanced exposure for better returns while reducing risk compared to pure equity.
                                                </p>
                                                <div className="mt-4 bg-gray-50 rounded-md p-4">
                                                    <h5 className="text-sm font-medium text-gray-900">Why it's good for students:</h5>
                                                    <ul className="mt-2 text-sm text-gray-600 space-y-1 list-disc pl-5">
                                                        <li>Start small with SIPs (Systematic Investment Plans)</li>
                                                        <li>More growth potential than FDs or RDs</li>
                                                        <li>Good for medium-term goals (2–5 years)</li>
                                                    </ul>
                                                </div>
                                                <div className="mt-4 text-sm text-gray-600">Available via mutual fund platforms or apps</div>
                                            </div>
                                        </div>
                                    </div>


                                    {/* Option 2 */}
                                    <div className="p-6">
                                        <div className="flex items-start">
                                            <div className="flex-shrink-0 bg-blue-100 rounded-md p-2">
                                                <BanknoteIcon className="h-6 w-6 text-blue-600" />
                                            </div>
                                            <div className="ml-4">
                                                <h4 className="text-lg font-medium text-gray-900">Recurring Deposits with NBFCs</h4>
                                                <div className="mt-1 flex items-center">
                                                    <span className="text-sm font-medium text-blue-600">7.5–9% annual return</span>
                                                    <span className="mx-2 text-gray-500">•</span>
                                                    <span className="text-sm text-gray-500">Minimum: ₹500/month</span>
                                                    <span className="mx-2 text-gray-500">•</span>
                                                    <span className="text-sm text-gray-500">Risk: Medium</span>
                                                </div>
                                                <p className="mt-2 text-sm text-gray-600">
                                                    Non-Banking Financial Companies (NBFCs) offer higher interest rates than banks for recurring deposits with slightly higher risk.
                                                </p>
                                                <div className="mt-4 bg-gray-50 rounded-md p-4">
                                                    <h5 className="text-sm font-medium text-gray-900">Why it's good for students:</h5>
                                                    <ul className="mt-2 text-sm text-gray-600 space-y-1 list-disc pl-5">
                                                        <li>Predictable returns with monthly savings</li>
                                                        <li>Higher interest than bank RDs</li>
                                                        <li>Ideal for disciplined savers</li>
                                                    </ul>
                                                </div>
                                                <div className="mt-4 text-sm text-gray-600">Offered by reputable NBFCs like Bajaj Finance, Mahindra Finance</div>
                                            </div>
                                        </div>
                                    </div>


                                    {/* Option 3 */}
                                    <div className="p-6">
                                        <div className="flex items-start">
                                            <div className="flex-shrink-0 bg-purple-100 rounded-md p-2">
                                                <HomeIcon className="h-6 w-6 text-purple-600" />
                                            </div>
                                            <div className="ml-4">
                                                <h4 className="text-lg font-medium text-gray-900">REITs (Real Estate Investment Trusts)</h4>
                                                <div className="mt-1 flex items-center">
                                                    <span className="text-sm font-medium text-purple-600">6–9% annual return</span>
                                                    <span className="mx-2 text-gray-500">•</span>
                                                    <span className="text-sm text-gray-500">Minimum: ₹500–₹1000</span>
                                                    <span className="mx-2 text-gray-500">•</span>
                                                    <span className="text-sm text-gray-500">Risk: Medium</span>
                                                </div>
                                                <p className="mt-2 text-sm text-gray-600">
                                                    REITs allow you to invest in real estate projects without owning physical property — you earn from rental income and value appreciation.
                                                </p>
                                                <div className="mt-4 bg-gray-50 rounded-md p-4">
                                                    <h5 className="text-sm font-medium text-gray-900">Why it's good for students:</h5>
                                                    <ul className="mt-2 text-sm text-gray-600 space-y-1 list-disc pl-5">
                                                        <li>Real estate exposure without high capital</li>
                                                        <li>Monthly/quarterly dividends</li>
                                                        <li>Listed on stock exchanges (easy to buy/sell)</li>
                                                    </ul>
                                                </div>
                                                <div className="mt-4 text-sm text-gray-600">Examples: Embassy REIT, Mindspace REIT (NSE/BSE)</div>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="p-6">
                                        <div className="flex items-start">
                                            <div className="flex-shrink-0 bg-indigo-100 rounded-md p-2">
                                                <TrendingUpIcon className="h-6 w-6 text-indigo-600" />
                                            </div>
                                            <div className="ml-4">
                                                <h4 className="text-lg font-medium text-gray-900">Index Funds (Nifty/Sensex Based)</h4>
                                                <div className="mt-1 flex items-center">
                                                    <span className="text-sm font-medium text-indigo-600">9–11% annual return</span>
                                                    <span className="mx-2 text-gray-500">•</span>
                                                    <span className="text-sm text-gray-500">Minimum: ₹100</span>
                                                    <span className="mx-2 text-gray-500">•</span>
                                                    <span className="text-sm text-gray-500">Risk: Medium</span>
                                                </div>
                                                <p className="mt-2 text-sm text-gray-600">
                                                    Index funds mirror the performance of stock market indices like Nifty 50 or Sensex. They’re passively managed and have low fees.
                                                </p>
                                                <div className="mt-4 bg-gray-50 rounded-md p-4">
                                                    <h5 className="text-sm font-medium text-gray-900">Why it's good for students:</h5>
                                                    <ul className="mt-2 text-sm text-gray-600 space-y-1 list-disc pl-5">
                                                        <li>Low-cost entry into the stock market</li>
                                                        <li>Ideal for long-term passive investment</li>
                                                        <li>Better returns than FDs or savings accounts</li>
                                                    </ul>
                                                </div>
                                                <div className="mt-4 text-sm text-gray-600">Available via all mutual fund platforms and apps</div>
                                            </div>
                                        </div>
                                    </div>



                                </div>
                            </div>
                        )}

                        {/* High Risk Investment Options */}
                        {expandedRiskLevel === "high" && (
                            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                                <div className="px-6 py-4 bg-purple-50 border-b border-purple-100">
                                    <div className="flex items-center">
                                        <LineChartIcon className="h-6 w-6 text-purple-500 mr-2" />
                                        <h3 className="text-lg font-medium text-gray-900">High Risk Investment Options</h3>
                                    </div>
                                </div>
                                <div className="divide-y divide-gray-200">
                                    {/* Option 1 */}
                                    <div className="p-6">
                                        <div className="flex items-start">
                                            <div className="flex-shrink-0 bg-red-100 rounded-md p-2">
                                                <BarChart3Icon className="h-6 w-6 text-red-600" />
                                            </div>
                                            <div className="ml-4">
                                                <h4 className="text-lg font-medium text-gray-900">Equity Mutual Funds (Small-Cap Focused)</h4>
                                                <div className="mt-1 flex items-center">
                                                    <span className="text-sm font-medium text-red-600">12–18% annual return</span>
                                                    <span className="mx-2 text-gray-500">•</span>
                                                    <span className="text-sm text-gray-500">Minimum: ₹500</span>
                                                    <span className="mx-2 text-gray-500">•</span>
                                                    <span className="text-sm text-gray-500">Risk: High</span>
                                                </div>
                                                <p className="mt-2 text-sm text-gray-600">
                                                    Invests in smaller companies with high growth potential but also higher volatility.
                                                </p>
                                                <div className="mt-4 bg-gray-50 rounded-md p-4">
                                                    <h5 className="text-sm font-medium text-gray-900">Why it's good for students:</h5>
                                                    <ul className="mt-2 text-sm text-gray-600 list-disc pl-5 space-y-1">
                                                        <li>Long investment horizon benefits compounding</li>
                                                        <li>Higher potential returns vs. large-cap funds</li>
                                                        <li>Can start small with SIPs</li>
                                                    </ul>
                                                </div>
                                                <div className="mt-4 text-sm text-gray-600">Available on mutual fund platforms and apps</div>
                                            </div>
                                        </div>
                                    </div>


                                    {/* Option 2 */}
                                    <div className="p-6">
                                        <div className="flex items-start">
                                            <div className="flex-shrink-0 bg-red-100 rounded-md p-2">
                                                <CandlestickChartIcon className="h-6 w-6 text-red-600" />
                                            </div>
                                            <div className="ml-4">
                                                <h4 className="text-lg font-medium text-gray-900">Direct Stock Investment (Equity Trading)</h4>
                                                <div className="mt-1 flex items-center">
                                                    <span className="text-sm font-medium text-red-600">Varies widely (0–30%+)</span>
                                                    <span className="mx-2 text-gray-500">•</span>
                                                    <span className="text-sm text-gray-500">Minimum: ₹1</span>
                                                    <span className="mx-2 text-gray-500">•</span>
                                                    <span className="text-sm text-gray-500">Risk: High</span>
                                                </div>
                                                <p className="mt-2 text-sm text-gray-600">
                                                    Buying and selling individual company stocks based on market research or trends.
                                                </p>
                                                <div className="mt-4 bg-gray-50 rounded-md p-4">
                                                    <h5 className="text-sm font-medium text-gray-900">Why it's good for students:</h5>
                                                    <ul className="mt-2 text-sm text-gray-600 list-disc pl-5 space-y-1">
                                                        <li>Learn market fundamentals early</li>
                                                        <li>Hands-on control of investments</li>
                                                        <li>Potential for high returns with smart picks</li>
                                                    </ul>
                                                </div>
                                                <div className="mt-4 text-sm text-gray-600">Available via stockbroking apps (Zerodha, Groww, etc.)</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Option 3 */}
                                    <div className="p-6">
                                        <div className="flex items-start">
                                            <div className="flex-shrink-0 bg-red-100 rounded-md p-2">
                                                <BitcoinIcon className="h-6 w-6 text-red-600" />
                                            </div>
                                            <div className="ml-4">
                                                <h4 className="text-lg font-medium text-gray-900">Cryptocurrencies (Bitcoin, Ethereum, etc.)</h4>
                                                <div className="mt-1 flex items-center">
                                                    <span className="text-sm font-medium text-red-600">Highly volatile</span>
                                                    <span className="mx-2 text-gray-500">•</span>
                                                    <span className="text-sm text-gray-500">Minimum: ₹100</span>
                                                    <span className="mx-2 text-gray-500">•</span>
                                                    <span className="text-sm text-gray-500">Risk: High</span>
                                                </div>
                                                <p className="mt-2 text-sm text-gray-600">
                                                    Digital assets that are traded globally and fluctuate frequently in value.
                                                </p>
                                                <div className="mt-4 bg-gray-50 rounded-md p-4">
                                                    <h5 className="text-sm font-medium text-gray-900">Why it's good for students:</h5>
                                                    <ul className="mt-2 text-sm text-gray-600 list-disc pl-5 space-y-1">
                                                        <li>Exposure to emerging asset class</li>
                                                        <li>Accessible through many mobile apps</li>
                                                        <li>Great for tech-savvy investors</li>
                                                    </ul>
                                                </div>
                                                <div className="mt-4 text-sm text-gray-600">Available on CoinDCX, WazirX, and similar platforms</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <div className="flex items-start">
                                            <div className="flex-shrink-0 bg-red-100 rounded-md p-2">
                                                <BriefcaseIcon className="h-6 w-6 text-red-600" />
                                            </div>
                                            <div className="ml-4">
                                                <h4 className="text-lg font-medium text-gray-900">Startup Investing via Crowdfunding</h4>
                                                <div className="mt-1 flex items-center">
                                                    <span className="text-sm font-medium text-red-600">High risk, high reward</span>
                                                    <span className="mx-2 text-gray-500">•</span>
                                                    <span className="text-sm text-gray-500">Minimum: ₹1,000</span>
                                                    <span className="mx-2 text-gray-500">•</span>
                                                    <span className="text-sm text-gray-500">Risk: High</span>
                                                </div>
                                                <p className="mt-2 text-sm text-gray-600">
                                                    Invest small amounts in early-stage startups through regulated crowdfunding platforms.
                                                </p>
                                                <div className="mt-4 bg-gray-50 rounded-md p-4">
                                                    <h5 className="text-sm font-medium text-gray-900">Why it's good for students:</h5>
                                                    <ul className="mt-2 text-sm text-gray-600 list-disc pl-5 space-y-1">
                                                        <li>Learn startup valuation and equity</li>
                                                        <li>Support innovative ideas</li>
                                                        <li>Massive upside potential if startup succeeds</li>
                                                    </ul>
                                                </div>
                                                <div className="mt-4 text-sm text-gray-600">Available via platforms like Tyke, GripInvest</div>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        )}

                        {/* Investment Tips Section */}
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                                <div className="flex items-center">
                                    <InfoIcon className="h-6 w-6 text-gray-500 mr-2" />
                                    <h3 className="text-lg font-medium text-gray-900">Smart Investment Tips for Students</h3>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h4 className="font-medium text-gray-900">Start Small, Grow Consistently</h4>
                                        <p className="mt-2 text-sm text-gray-600">
                                            Begin with as little as 100₹ through round-ups. Consistency matters more than the initial amount.
                                            Small weekly investments add up over time.
                                        </p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h4 className="font-medium text-gray-900">Match Risk to Time Horizon</h4>
                                        <p className="mt-2 text-sm text-gray-600">
                                            For short-term goals (1-3 years), stick with low-risk options. For long-term goals (7+ years),
                                            higher-risk investments have time to recover from downturns.
                                        </p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h4 className="font-medium text-gray-900">Diversify Your Investments</h4>
                                        <p className="mt-2 text-sm text-gray-600">
                                            Don't put all your money in one investment. Spread it across different risk levels and asset types
                                            to reduce overall risk.
                                        </p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h4 className="font-medium text-gray-900">Reinvest Your Returns</h4>
                                        <p className="mt-2 text-sm text-gray-600">
                                            When you earn dividends or interest, reinvest them to take advantage of compound growth. This
                                            significantly increases your returns over time.
                                        </p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h4 className="font-medium text-gray-900">Use Round-Ups Effectively</h4>
                                        <p className="mt-2 text-sm text-gray-600">
                                            Our round-up feature automatically invests spare change from purchases. This painless approach
                                            helps you build wealth without changing your lifestyle.
                                        </p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h4 className="font-medium text-gray-900">Learn As You Earn</h4>
                                        <p className="mt-2 text-sm text-gray-600">
                                            Take advantage of our educational resources. Understanding how investments work will make you a
                                            more confident and successful investor.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
