import { useState } from "react";
import {
  GoalIcon,
  DollarSignIcon,
  PencilIcon,
  WalletIcon,
} from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../authContext";
import { toast } from "react-toastify";

const questions = [
  {
    question: "If your investment drops by 10%, what would you do?",
    options: [
      { text: "Sell immediately", score: 1 },
      { text: "Wait and watch", score: 2 },
      { text: "Invest more (buy the dip)", score: 3 },
    ],
  },
  {
    question:
      "Would you prefer a guaranteed ₹500 return or a 50/50 chance to win ₹1000 or ₹0?",
    options: [
      { text: "Safe ₹500", score: 1 },
      { text: "Depends on my mood", score: 2 },
      { text: "Take the chance", score: 3 },
    ],
  },
  {
    question: "How do you react to market volatility?",
    options: [
      { text: "Avoid investing", score: 1 },
      { text: "Stay invested", score: 2 },
      { text: "Invest more during dips", score: 3 },
    ],
  },
  {
    question: "How long are you willing to keep your money invested?",
    options: [
      { text: "Less than a year", score: 1 },
      { text: "1-3 years", score: 2 },
      { text: "3+ years", score: 3 },
    ],
  },
  {
    question: "What would you do if your portfolio lost 20% in a year?",
    options: [
      { text: "Panic and withdraw", score: 1 },
      { text: "Consult and decide", score: 2 },
      { text: "Buy more while prices are low", score: 3 },
    ],
  },
  {
    question: "What's your main investment goal?",
    options: [
      { text: "Preserving money", score: 1 },
      { text: "Balanced growth", score: 2 },
      { text: "Maximize returns", score: 3 },
    ],
  },
  {
    question: "How would you feel if your investment value fluctuated often?",
    options: [
      { text: "Very uncomfortable", score: 1 },
      { text: "Neutral", score: 2 },
      { text: "Excited for opportunities", score: 3 },
    ],
  },
  {
    question: "How much experience do you have with investing?",
    options: [
      { text: "None", score: 1 },
      { text: "Some", score: 2 },
      { text: "Extensive", score: 3 },
    ],
  },
];

export default function Onboard() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    income: "",
    expenses: "",
    goalAmount: "",
    goalDescription: "",
  });
  const [quizAnswers, setQuizAnswers] = useState(Array(questions.length).fill(null));
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const handleOptionSelect = (index, score) => {
    const updated = [...quizAnswers];
    updated[index] = score;
    setQuizAnswers(updated);
    if (errors.risk) setErrors({ ...errors, risk: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.income || isNaN(formData.income)) newErrors.income = "Valid income is required";
    if (!formData.expenses || isNaN(formData.expenses)) newErrors.expenses = "Valid expenses are required";
    if (!formData.goalAmount || isNaN(formData.goalAmount)) newErrors.goalAmount = "Valid goal amount is required";
    if (!formData.goalDescription.trim()) newErrors.goalDescription = "Goal description is required";
    if (quizAnswers.includes(null)) newErrors.risk = "Please answer all risk assessment questions";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const currentUser = localStorage.getItem("userId");

    try {
      await axios.put(`http://localhost:8080/onboard/${currentUser}`, {
        income:formData.income,
        expanse:formData.expenses,
        goalAmount:formData.goalAmount,
        goalDescription:formData.goalDescription,
        quizAnswers:quizAnswers,
      });
      toast.success("Onboarding successful!");
      navigate("/");
    } catch (error) {
      toast.error("Something went wrong during onboarding.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-green-600 py-4">
          <h1 className="text-center text-white text-2xl font-bold">PennyPlan</h1>
          <p className="text-center text-green-100 text-sm">Let's plan your goals!</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          {["income", "expenses", "goalAmount", "goalDescription"].map((field, idx) => {
            const labels = {
              income: "Monthly Income / Pocket Money",
              expenses: "Monthly Expenses",
              goalAmount: "Goal Amount",
              goalDescription: "Goal Description",
            };
            const placeholders = {
              income: "e.g. 5000",
              expenses: "e.g. 3000",
              goalAmount: "e.g. 10000",
              goalDescription: "e.g. Buy a laptop",
            };
            const icons = {
              income: WalletIcon,
              expenses: DollarSignIcon,
              goalAmount: GoalIcon,
              goalDescription: PencilIcon,
            };
            const Icon = icons[field];
            return (
              <div key={idx}>
                <label htmlFor={field} className="block text-sm font-medium text-gray-700 mb-1">
                  {labels[field]}
                </label>
                <div className="relative">
                  <Icon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <input
                    type={field === "goalDescription" ? "text" : "number"}
                    id={field}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className={`pl-10 w-full py-2 border ${
                      errors[field] ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:ring-green-500 focus:border-green-500 outline-none`}
                    placeholder={placeholders[field]}
                  />
                </div>
                {errors[field] && <p className="mt-1 text-sm text-red-600">{errors[field]}</p>}
              </div>
            );
          })}

          <div>
            <h3 className="text-lg font-semibold text-gray-700 mt-4 mb-2">Risk Assessment</h3>
            {questions.map((q, index) => (
              <div key={index} className="mb-4">
                <p className="text-sm font-medium text-gray-800 mb-2">
                  {index + 1}. {q.question}
                </p>
                <div className="space-y-2">
                  {q.options.map((option, i) => (
                    <label key={i} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name={`question-${index}`}
                        checked={quizAnswers[index] === option.score}
                        onChange={() => handleOptionSelect(index, option.score)}
                        className="form-radio text-green-600"
                      />
                      <span className="text-gray-700 text-sm">{option.text}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
            {errors.risk && <p className="text-sm text-red-600">{errors.risk}</p>}
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
