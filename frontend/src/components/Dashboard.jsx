import axios from "axios";
import {
    ArrowRightIcon,
    ChevronRightIcon,
    CoffeeIcon,
    CoinsIcon,
    LineChartIcon,
    PiggyBankIcon,
    TrendingUpIcon,
    BellIcon
} from "lucide-react"
import { useEffect } from "react";
import { Link } from "react-router-dom";



export default function Dashboard() {

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
            {/* Navigation */}
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <PiggyBankIcon className="h-8 w-8 text-green-600" />
                            <span className="ml-2 text-xl font-bold text-gray-800">PennyPlan</span>
                        </div>
                        <div className="flex items-center">
                            <Link to="/auth" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">
                                Login
                            </Link>
                            <Link to="/signup" className="ml-4 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700">
                                Sign Up
                            </Link>

                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="py-12 sm:py-16 md:py-20 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                        <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
                            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                                <span className="block">Smart investing for</span>
                                <span className="block text-green-600">students like you</span>
                            </h1>
                            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                                PennyPlan helps students save and invest effortlessly through round-up automation, personalized financial tips, and beginner-friendly investment options. Whether it's textbooks, travel, or your first apartment — every cent moves you closer to your goals.
                            </p>
                            <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left">
                                {/* <button className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 md:py-4 md:text-lg md:px-10 transition-all duration-200 shadow-lg hover:shadow-xl">
                                    Get Started
                                </button> */}
                                <Link to="/auth" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 md:py-4 md:text-lg md:px-10 transition-all duration-200 shadow-lg hover:shadow-xl">
                                    Get Started
                                    <ArrowRightIcon className="ml-2 h-5 w-5" />
                                </Link>

                            </div>
                        </div>
                        <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
                            <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                                <div className="relative block w-full bg-white rounded-lg overflow-hidden">
                                    <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                                        <svg className="h-20 w-20 text-green-500" fill="currentColor" viewBox="0 0 84 84">
                                            <circle opacity="0.9" cx="42" cy="42" r="42" fill="white" />
                                            <path d="M55.5039 40.3359L37.1094 28.0729C35.7803 27.1869 34 28.1396 34 29.737V54.263C34 55.8604 35.7803 56.8131 37.1094 55.9271L55.5038 43.6641C56.6913 42.8725 56.6913 41.1275 55.5039 40.3359Z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:text-center">
                        <h2 className="text-base text-green-600 font-semibold tracking-wide uppercase">Features</h2>
                        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            Smart saving made simple
                        </p>
                        <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                            PennyPlan helps you save and invest without changing your lifestyle.
                        </p>
                    </div>

                    <div className="mt-10">
                        <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                            {/* Feature 1 */}
                            <div className="relative">
                                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                                    <CoinsIcon className="h-6 w-6" />
                                </div>
                                <div className="ml-16">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">Automatic Round-Up Savings</h3>
                                    <p className="mt-2 text-base text-gray-500">
                                        Every time you spend, we round up your purchase to the nearest rupee and invest the spare change—effortless micro-saving designed for students.
                                    </p>
                                </div>
                            </div>

                            {/* Feature 2 */}
                            <div className="relative mt-10">
                                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                                    <CoffeeIcon className="h-6 w-6" />
                                </div>
                                <div className="ml-16">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">Weekly Smart Suggestions</h3>
                                    <p className="mt-2 text-base text-gray-500">
                                        Our model reviews your spending and notify that you have spent more on something like beverages this week
                                    </p>
                                </div>
                            </div>

                            {/* Feature 3 */}
                            <div className="relative mt-10">
                                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                                    <BellIcon className="h-6 w-6" />
                                </div>
                                <div className="ml-16">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">Spending Pattern Notifications</h3>
                                    <p className="mt-2 text-base text-gray-500">
                                        We track your expenses weekly and alert you if you've spent more than usual in any category compared to the past 3 weeks—stay on top of your budget without the guesswork.
                                    </p>
                                </div>
                            </div>

                            {/* Feature 4 */}
                            <div className="relative mt-10">
                                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                                    <LineChartIcon className="h-6 w-6" />
                                </div>
                                <div className="ml-16">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">Investments by Risk Level</h3>
                                    <p className="mt-2 text-base text-gray-500">
                                        Our model determines based on your income, expense and quiz answers that whether you have to invest in low,medium or high risk options.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-12 bg-green-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
            <h2 className="text-base text-green-600 font-semibold tracking-wide uppercase">How It Works</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Start saving and investing in three easy steps
            </p>
        </div>

        <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
                {/* Step 1 */}
                <div className="relative bg-white p-6 rounded-lg shadow-md">
                    <div className="absolute -top-4 -left-4 flex items-center justify-center h-12 w-12 rounded-full bg-green-600 text-white font-bold text-xl">
                        1
                    </div>
                    <h3 className="mt-8 text-lg leading-6 font-medium text-gray-900">Link Your Account</h3>
                    <p className="mt-2 text-base text-gray-500">
                        Add your expense so we can track your purchases, round up each transaction, and save the spare change automatically.
                    </p>
                </div>

                {/* Step 2 */}
                <div className="relative bg-white p-6 rounded-lg shadow-md">
                    <div className="absolute -top-4 -left-4 flex items-center justify-center h-12 w-12 rounded-full bg-green-600 text-white font-bold text-xl">
                        2
                    </div>
                    <h3 className="mt-8 text-lg leading-6 font-medium text-gray-900">Set Financial Goals</h3>
                    <p className="mt-2 text-base text-gray-500">
                        Whether it's a travel fund or emergency savings, customize your goal and we’ll recommend a tailored investment strategy based on your risk comfort.
                    </p>
                </div>

                {/* Step 3 */}
                <div className="relative bg-white p-6 rounded-lg shadow-md">
                    <div className="absolute -top-4 -left-4 flex items-center justify-center h-12 w-12 rounded-full bg-green-600 text-white font-bold text-xl">
                        3
                    </div>
                    <h3 className="mt-8 text-lg leading-6 font-medium text-gray-900">Stay Smart & Grow</h3>
                    <p className="mt-2 text-base text-gray-500">
                        We save your spare change and provide weekly suggestions based on your habits. If your food or coffee spending spikes, we’ll notify you.
                    </p>
                </div>
            </div>
        </div>
    </div>
</section>




            {/* CTA Section */}
            <section className="py-12 bg-green-600">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                            <span className="block">Ready to start investing?</span>
                            <span className="block">It only takes 5 minutes to sign up.</span>
                        </h2>
                        <div className="mt-8 flex justify-center">
                            <div className="inline-flex rounded-md shadow">
                                
                                <Link to="/auth" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-green-600 bg-white hover:bg-gray-50 transition-all duration-200">
                                    Get Started
                                    <ChevronRightIcon className="ml-2 -mr-1 h-5 w-5 text-green-600" />
                                </Link>
                            </div>
                           
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-800">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Product</h3>
                            <ul className="mt-4 space-y-4">
                                <li>
                                    <a href="#" className="text-base text-gray-300 hover:text-white">
                                        Features
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-base text-gray-300 hover:text-white">
                                        How It Works
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-base text-gray-300 hover:text-white">
                                        Pricing
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-base text-gray-300 hover:text-white">
                                        FAQ
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Company</h3>
                            <ul className="mt-4 space-y-4">
                                <li>
                                    <a href="#" className="text-base text-gray-300 hover:text-white">
                                        About
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-base text-gray-300 hover:text-white">
                                        Blog
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-base text-gray-300 hover:text-white">
                                        Careers
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-base text-gray-300 hover:text-white">
                                        Press
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Legal</h3>
                            <ul className="mt-4 space-y-4">
                                <li>
                                    <a href="#" className="text-base text-gray-300 hover:text-white">
                                        Privacy
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-base text-gray-300 hover:text-white">
                                        Terms
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-base text-gray-300 hover:text-white">
                                        Security
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Connect</h3>
                            <ul className="mt-4 space-y-4">
                                <li>
                                    <a href="#" className="text-base text-gray-300 hover:text-white">
                                        Contact
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-base text-gray-300 hover:text-white">
                                        Support
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-base text-gray-300 hover:text-white">
                                        Instagram
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-base text-gray-300 hover:text-white">
                                        Twitter
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-8 border-t border-gray-700 pt-8 md:flex md:items-center md:justify-between">
                        <div className="flex space-x-6 md:order-2">
                            <a href="#" className="text-gray-400 hover:text-gray-300">
                                <span className="sr-only">Facebook</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path
                                        fillRule="evenodd"
                                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-gray-300">
                                <span className="sr-only">Instagram</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path
                                        fillRule="evenodd"
                                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-gray-300">
                                <span className="sr-only">Twitter</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                </svg>
                            </a>
                        </div>
                        <p className="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
                            &copy; 2025 PennyPlan, Inc. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    )
}
