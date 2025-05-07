"use client"

import { useEffect, useState } from "react"
import { ArrowLeftIcon, PiggyBankIcon, XIcon } from "lucide-react"
import axios from "axios"
import { Link } from "react-router-dom"

export default function NotificationCenter() {
  const [alerts, setAlerts] = useState([])
  const [weeklyalerts, setWeeklyAlerts] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId")
    const fetchAlerts = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/weekly-behavior/${userId}`)
        setAlerts(response.data.alerts)
      } catch (e) {
        console.error(e)
      }
    }
    const fetchWeeklyAlerts = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/weekly-suggestion/${userId}`);
        // console.log(response.data.alerts);
        setWeeklyAlerts(response.data.alerts);
      } catch (e) {
        console.error(e);
      }
    };
    fetchWeeklyAlerts();
    fetchAlerts()
  }, [])

  const dismissNotification = (id) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to='/'>
              <div className="flex items-center">
                <PiggyBankIcon className="h-8 w-8 text-green-600" />
                <span className="ml-2 text-xl font-bold text-gray-800">PennyPlan</span>
              </div>

            </Link>
          </div>
        </div>
      </header>

      <main className="py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
          <p className="text-sm text-gray-500 mt-1">
            Stay informed about your spending patterns and financial tips.
          </p>

          <div className="mt-6 bg-white rounded-lg shadow-md overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {alerts.length > 0 ? (
                alerts.map((notification, index) => (
                  <li key={index} className="px-6 py-5 hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="mt-1 mb-2 inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                          🧠Weekly Suggestion

                        </div>
                        <p className="text-sm font-medium text-gray-900">{notification.message}</p>
                        <p className="mt-1 text-xs text-gray-500">{notification.category}</p>
                        <p className="mt-1 text-xs text-gray-500">{notification.date}</p>
                      </div>

                    </div>
                  </li>
                ))
              ) : (
                <li className="px-6 py-5 text-center text-gray-500">No notifications found.</li>
              )}
            </ul>
          </div>
          <div className="mt-6 bg-white rounded-lg shadow-md overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {weeklyalerts.length > 0 ? (
                weeklyalerts.map((notification, index) => (
                  <li key={index} className="px-6 py-5 hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="mt-1 mb-2 inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                        📊 Spending Behavior
                        </div>
                        <p className="text-sm font-medium text-gray-900">{notification.message}</p>
                        <p className="mt-1 text-xs text-gray-500">{notification.category}</p>
                        <p className="mt-1 text-xs text-gray-500">{notification.date}</p>
                      </div>

                    </div>
                  </li>
                ))
              ) : (
                <li className="px-6 py-5 text-center text-gray-500">No notifications found.</li>
              )}
            </ul>
          </div>

        </div>
      </main>
    </div>
  )
}
