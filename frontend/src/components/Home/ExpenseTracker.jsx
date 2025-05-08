"use client"

import { useEffect, useState } from "react"
import {
    ArrowLeftIcon,
    BarChart3Icon,
    CalendarIcon,
    CheckIcon,
    CoffeeIcon,
    DollarSignIcon,
    HomeIcon,
    PiggyBankIcon,
    PlusIcon,
    ShoppingBagIcon,
    TagIcon,
    TruckIcon,
    WalletIcon,
    TrendingUpIcon,
    CupSoda
} from "lucide-react"
import axios from "axios"
import { Link } from "react-router-dom"
import { toast } from "react-toastify";


export default function ExpenseTracker() {
    // State for expense form
    const [expenseForm, setExpenseForm] = useState({
        description: "",
        amount: "",
        category: "food",
        date: new Date().toISOString().split("T")[0],
    })

    // State for round-up settings
    const [roundUpEnabled, setRoundUpEnabled] = useState(false)
    const [roundUpAmount, setRoundUpAmount] = useState("10")
    const [customAmount, setCustomAmount] = useState("25")
    const [transaction,setTransaction]=useState(0);

    // State for expenses list
    const [expenses, setExpenses] = useState([]);
    const [displayUser, setDisplayUser] = useState();
    useEffect(() => {
        const userId = localStorage.getItem('userId');
        const displayExpense = async () => {
            const expense = await axios.get(`http://localhost:8080/expense/${userId}`);
            setExpenses(expense.data);
        };
        const displayUserfunction = async () => {
            const user = await axios.get(`http://localhost:8080/user/${userId}`);
            // console.log(user.data);
            setDisplayUser(user.data);
        };
        const displayTransaction=async()=>{
            try{
                const response=await axios.get(`http://localhost:8080/roundupcount/${userId}`);
                setTransaction(response.data)
            }catch(e){
                console.error(e);
            }
        }
        displayUserfunction();
        displayExpense();
        displayTransaction();
    }, []);
    // Categories with icons
    const categories = [
        { value: "food", label: "Food", icon: CoffeeIcon },
        { value: "transport", label: "Transport", icon: TruckIcon },
        { value: "shopping", label: "Shopping", icon: ShoppingBagIcon },
        { value: "bills", label: "Bills", icon: DollarSignIcon },
        { value: "entertainment", label: "Entertainment", icon: BarChart3Icon },
        { value: "education", label: "Education", icon: HomeIcon },
        {value:"beverage",label:"Beverage",icon:CupSoda},
        { value: "other", label: "Other", icon: TagIcon },
    ]

    const updateRoundUpSetting = async (enabled, method, customValue = 0) => {
        try {
            const userId = localStorage.getItem('userId');
            const res = await fetch(`http://localhost:8080/roundup-setting/${userId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    enabled,
                    method,
                    customValue: method === "custom" ? Number(customValue) : 0,
                }),
            });

            if (!res.ok) throw new Error("Failed to update round-up settings");
            const data = await res.json();
            console.log("Updated round-up:", data);
        } catch (err) {
            console.error(err);
        }
    };


    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setExpenseForm({
            ...expenseForm,
            [name]: value,
        })
    }

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault()
        const userId = localStorage.getItem('userId');
        try {
            const expense = await axios.post('http://localhost:8080/expense', {
                userId: userId,
                title: expenseForm.description,
                amount: expenseForm.amount,
                category: expenseForm.category
            });
            window.location.reload();
        } catch (e) {
            console.error(e);
        }

        
        // Reset form
        setExpenseForm({
            description: "",
            amount: "",
            category: "food",
        })
    }

    // Calculate total round-up savings
    const totalRoundUpSavings = expenses.reduce((total, expense) => total + expense.roundUpAmount || 0, 0).toFixed(2)

    // Get category icon
    const getCategoryIcon = (categoryValue) => {
        const category = categories.find((cat) => cat.value === categoryValue)
        const Icon = category ? category.icon : TagIcon
        return <Icon className="h-5 w-5" />
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                
                                <Link to='/'>
                                <PiggyBankIcon className="h-8 w-8 text-green-600"/>
                                </Link>
                                <Link to='/'>
                                <span className="ml-2 text-xl font-bold text-gray-800">PennyPlan</span>
                                </Link>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <span className="text-sm text-gray-500">Total Round-Up Savings: </span>
                            {displayUser && (
                                <span className="ml-2 text-sm font-medium text-green-600">
                                    ₹{displayUser.roundUpSum}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            <main className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="md:flex md:items-start md:justify-between">
                        <div className="flex-1 min-w-0">
                            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Expense Tracker</h2>
                            <p className="mt-1 text-sm text-gray-500">Track your expenses and automatically save with round-ups</p>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
                        {/* Add Expense Form */}
                        <div className="bg-white rounded-lg shadow-md overflow-hidden lg:col-span-1">
                            <div className="px-6 py-4 bg-green-50 border-b border-green-100">
                                <h3 className="text-lg font-medium text-gray-900">Add New Expense</h3>
                            </div>
                            <form onSubmit={handleSubmit} className="p-6">
                                <div className="space-y-4">
                                    {/* Description */}
                                    <div>
                                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                            Description
                                        </label>
                                        <input
                                            type="text"
                                            name="description"
                                            id="description"
                                            required
                                            value={expenseForm.description}
                                            onChange={handleInputChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                            placeholder="Coffee, groceries, etc."
                                        />
                                    </div>

                                    {/* Amount */}
                                    <div>
                                        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                                            Amount (₹)
                                        </label>
                                        <div className="mt-1 relative rounded-md shadow-sm">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <span className="text-gray-500 sm:text-sm">₹</span>
                                            </div>
                                            <input
                                                type="number"
                                                name="amount"
                                                id="amount"
                                                required
                                                min="0.01"
                                                step="0.01"
                                                value={expenseForm.amount}
                                                onChange={handleInputChange}
                                                className="block w-full pl-7 pr-12 border border-gray-300 rounded-md py-2 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                                placeholder="0.00"
                                            />
                                        </div>
                                    </div>

                                    {/* Category */}
                                    <div>
                                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                                            Category
                                        </label>
                                        <select
                                            id="category"
                                            name="category"
                                            value={expenseForm.category}
                                            onChange={handleInputChange}
                                            className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                        >
                                            {categories.map((category) => (
                                                <option key={category.value} value={category.value}>
                                                    {category.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>



                                    {/* Round-Up Toggle */}
                                    <div className="bg-gray-50 p-4 rounded-md">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <PiggyBankIcon className="h-5 w-5 text-green-500 mr-2" />
                                                <span className="text-sm font-medium text-gray-700">Round-Up Savings</span>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={async () => {
                                                    const newEnabled = !roundUpEnabled;
                                                    setRoundUpEnabled(newEnabled);
                                                    await updateRoundUpSetting(newEnabled, roundUpAmount, customAmount);
                                                }}

                                                className={`${roundUpEnabled ? "bg-green-600" : "bg-gray-200"
                                                    } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
                                            >
                                                <span className="sr-only">Enable round-up savings</span>
                                                <span
                                                    className={`${roundUpEnabled ? "translate-x-5" : "translate-x-0"
                                                        } pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                                                >
                                                    <span
                                                        className={`${roundUpEnabled ? "opacity-0 ease-out duration-100" : "opacity-100 ease-in duration-200"
                                                            } absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
                                                        aria-hidden="true"
                                                    ></span>
                                                    <span
                                                        className={`${roundUpEnabled ? "opacity-100 ease-in duration-200" : "opacity-0 ease-out duration-100"
                                                            } absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
                                                        aria-hidden="true"
                                                    >
                                                        <CheckIcon className="h-3 w-3 text-green-600" />
                                                    </span>
                                                </span>
                                            </button>
                                        </div>

                                        {/* Round-Up Amount Options */}
                                        {roundUpEnabled && (
                                            <div className="mt-3">
                                                <label className="text-sm text-gray-700">Round-Up Amount</label>
                                                <div className="mt-2 grid grid-cols-3 gap-3">
                                                    <div>
                                                        <button
                                                            type="button"
                                                            onClick={async () => {
                                                                setRoundUpAmount("10");
                                                                await updateRoundUpSetting(roundUpEnabled, "10");
                                                            }}
                                                            className={`w-full inline-flex justify-center items-center px-2.5 py-1.5 border ${roundUpAmount === "10"
                                                                ? "border-green-500 bg-green-50 text-green-700"
                                                                : "border-gray-300 bg-white text-gray-700"
                                                                } rounded-md shadow-sm text-xs font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
                                                        >
                                                            10₹
                                                        </button>
                                                    </div>
                                                    <div>
                                                        <button
                                                            type="button"
                                                            onClick={async () => {
                                                                setRoundUpAmount("50");
                                                                await updateRoundUpSetting(roundUpEnabled, "50");
                                                            }}
                                                            className={`w-full inline-flex justify-center items-center px-2.5 py-1.5 border ${roundUpAmount === "50"
                                                                ? "border-green-500 bg-green-50 text-green-700"
                                                                : "border-gray-300 bg-white text-gray-700"
                                                                } rounded-md shadow-sm text-xs font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
                                                        >
                                                            50₹
                                                        </button>
                                                    </div>
                                                    <div>
                                                        <button
                                                            type="button"
                                                            onClick={() => setRoundUpAmount("custom")}
                                                            className={`w-full inline-flex justify-center items-center px-2.5 py-1.5 border ${roundUpAmount === "custom"
                                                                ? "border-green-500 bg-green-50 text-green-700"
                                                                : "border-gray-300 bg-white text-gray-700"
                                                                } rounded-md shadow-sm text-xs font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
                                                        >
                                                            Custom
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Custom Amount Input */}
                                                {roundUpAmount === "custom" && (
                                                    <div className="mt-3">
                                                        <label htmlFor="customAmount" className="sr-only">
                                                            Custom amount in cents
                                                        </label>
                                                        <div className="flex rounded-md shadow-sm">
                                                            <input
                                                                type="number"
                                                                name="customAmount"
                                                                id="customAmount"
                                                                min="1"
                                                                max="99"
                                                                value={customAmount}
                                                                onChange={async (e) => {
                                                                    const value = e.target.value;
                                                                    setCustomAmount(value);
                                                                    await updateRoundUpSetting(roundUpEnabled, "custom", value);
                                                                }}
                                                                className="block w-full border border-gray-300 rounded-md py-1.5 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                                                placeholder="25"
                                                            />
                                                            <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                                                                ₹
                                                            </span>
                                                        </div>
                                                    </div>
                                                )}

                                                <p className="mt-2 text-xs text-gray-500">
                                                    {roundUpAmount === "custom"
                                                        ? `We'll round up your purchase to the next ruppee or add ${customAmount}₹, whichever is less.`
                                                        : `We'll round up your purchase to the next ruppee or add ${roundUpAmount}₹, whichever is less.`}
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <button
                                            type="submit"
                                            className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                        >
                                            <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
                                            Add Expense
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>

                        {/* Recent Expenses */}
                        <div className="bg-white rounded-lg shadow-md overflow-hidden lg:col-span-2">
                            <div className="px-6 py-4 bg-green-50 border-b border-green-100">
                                <h3 className="text-lg font-medium text-gray-900">Recent Expenses</h3>
                            </div>
                            <div className="overflow-hidden">
                                <ul className="divide-y divide-gray-200">
                                    {expenses.length > 0 ? (
                                        expenses.map((expense) => (
                                            <li key={expense._id} className="px-6 py-4">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                                                            {getCategoryIcon(expense.category)}
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">{expense.title}</div>
                                                            <div className="text-sm text-gray-500">
                                                                {new Date(expense.date).toLocaleDateString()} •{" "}
                                                                {expense.category.charAt(0).toUpperCase() + expense.category.slice(1)}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col items-end">
                                                        <div className="text-sm font-medium text-gray-900">₹{expense.amount.toFixed(2)}</div>
                                                        {expense.roundedUp && (
                                                            <div className="text-xs text-green-600 flex items-center">
                                                                <PiggyBankIcon className="h-3 w-3 mr-1" />
                                                                +${expense.roundUpAmount.toFixed(2)} saved
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </li>
                                        ))
                                    ) : (
                                        <li className="px-6 py-4 text-center text-gray-500">No expenses yet. Add your first expense!</li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Savings Summary */}
                    <div className="mt-6">
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="px-6 py-4 bg-green-50 border-b border-green-100">
                                <h3 className="text-lg font-medium text-gray-900">Round-Up Savings Summary</h3>
                            </div>
                            <div className="p-6">
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <div className="flex items-center">
                                            <WalletIcon className="h-5 w-5 text-green-500 mr-2" />
                                            <h4 className="text-sm font-medium text-gray-700">Total Expenses</h4>
                                        </div>
                                        <p className="mt-2 text-2xl font-bold text-gray-900">
                                            ₹{expenses.reduce((total, expense) => total + expense.amount, 0).toFixed(2)}
                                        </p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <div className="flex items-center">
                                            <PiggyBankIcon className="h-5 w-5 text-green-500 mr-2" />
                                            <h4 className="text-sm font-medium text-gray-700">Total Round-Ups</h4>
                                        </div>
                                        {/* <p className="mt-2 text-2xl font-bold text-green-600">${totalRoundUpSavings}</p> */}
                                        {displayUser && (
                                            <p className="mt-2 text-2xl font-bold text-green-600">
                                                    ₹{displayUser.roundUpSum}
                                            </p>
                                        )}
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <div className="flex items-center">
                                            <BarChart3Icon className="h-5 w-5 text-green-500 mr-2" />
                                            <h4 className="text-sm font-medium text-gray-700">Transactions with Round-Ups</h4>
                                        </div>
                                        <p className="mt-2 text-2xl font-bold text-gray-900">
                                            {transaction.roundUpTransactionCount}/{expenses.length}
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
