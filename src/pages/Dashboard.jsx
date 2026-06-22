import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useNavigate } from "react-router-dom";
import { FaWallet, FaArrowUp, FaArrowDown, FaReceipt } from "react-icons/fa";
import { useState, useEffect } from "react";

function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [income, setIncome] = useState(50000);
  const [incomeTitle, setIncomeTitle] = useState("");
  const [incomeAmount, setIncomeAmount] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  const userName = user?.name;
  const userEmail = user?.email;

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");

  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem("expenses");

    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = () => {
    if (!title || !amount) {
      alert("Please fill all fields");

      return;
    }

    const newExpense = {
      id: Date.now(),
      title,
      amount: Number(amount),
      category,
      date: new Date().toLocaleDateString(),
    };

    setExpenses([newExpense, ...expenses]);

    setTitle("");
    setAmount("");
    setCategory("Food");
  };

  const totalExpense = expenses.reduce((total, item) => total + item.amount, 0);
  const chartData = [
    {
      name: "Food",
      value: expenses
        .filter((item) => item.category === "Food")
        .reduce((sum, item) => sum + item.amount, 0),
    },
    {
      name: "Travel",
      value: expenses
        .filter((item) => item.category === "Travel")
        .reduce((sum, item) => sum + item.amount, 0),
    },
    {
      name: "Shopping",
      value: expenses
        .filter((item) => item.category === "Shopping")
        .reduce((sum, item) => sum + item.amount, 0),
    },
    {
      name: "Education",
      value: expenses
        .filter((item) => item.category === "Education")
        .reduce((sum, item) => sum + item.amount, 0),
    },
  ];

  const COLORS = ["#22c55e", "#3b82f6", "#f97316", "#a855f7"];

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">
          💰 Smart Expense Tracker
        </h1>

        <button
          onClick={() => {
            localStorage.removeItem("loggedInUser");
            navigate("/");
          }}
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg min-h-screen p-5">
          <h2 className="text-xl font-bold text-blue-600 mb-8">
            Expense Tracker
          </h2>

          <ul className="space-y-4">
            <li
              onClick={() => setActiveTab("dashboard")}
              className={`p-3 rounded-lg cursor-pointer ${
                activeTab === "dashboard"
                  ? "bg-blue-100 text-blue-600 font-semibold"
                  : "hover:bg-gray-100"
              }`}
            >
              📊 Dashboard
            </li>

            <li
              onClick={() => setActiveTab("income")}
              className={`p-3 rounded-lg cursor-pointer ${
                activeTab === "income"
                  ? "bg-blue-100 text-blue-600 font-semibold"
                  : "hover:bg-gray-100"
              }`}
            >
              💰 Income
            </li>
            <li
              onClick={() => setActiveTab("expenses")}
              className={`p-3 rounded-lg cursor-pointer ${
                activeTab === "expenses"
                  ? "bg-blue-100 text-blue-600 font-semibold"
                  : "hover:bg-gray-100"
              }`}
            >
              💸 Expenses
            </li>

            <li
              onClick={() => setActiveTab("analytics")}
              className={`p-3 rounded-lg cursor-pointer ${
                activeTab === "analytics"
                  ? "bg-blue-100 text-blue-600 font-semibold"
                  : "hover:bg-gray-100"
              }`}
            >
              📈 Analytics
            </li>
            <li
              onClick={() => setActiveTab("reports")}
              className={`p-3 rounded-lg cursor-pointer ${
                activeTab === "reports"
                  ? "bg-blue-100 text-blue-600 font-semibold"
                  : "hover:bg-gray-100"
              }`}
            >
              📝 Reports
            </li>

            <li
              onClick={() => setActiveTab("profile")}
              className={`p-3 rounded-lg cursor-pointer ${
                activeTab === "profile"
                  ? "bg-blue-100 text-blue-600 font-semibold"
                  : "hover:bg-gray-100"
              }`}
            >
              👤 Profile
            </li>
          </ul>
        </div>

        <div className="flex-1 p-6">
          {activeTab === "profile" && (
            <div className="bg-white p-8 rounded-2xl shadow">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-full bg-blue-500 text-white flex items-center justify-center text-4xl font-bold">
                  {userName?.charAt(0).toUpperCase()}
                </div>

                <div>
                  <h2 className="text-3xl font-bold">{userName}</h2>
                  <p className="text-gray-500">Frontend Developer</p>
                  <p className="text-gray-400">{userEmail}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mt-8">
                <div className="bg-blue-50 p-5 rounded-xl">
                  <h3>Total Income</h3>
                  <p className="text-2xl font-bold text-blue-600">₹{income}</p>
                </div>

                <div className="bg-red-50 p-5 rounded-xl">
                  <h3>Total Expense</h3>
                  <p className="text-2xl font-bold text-red-600">
                    ₹{totalExpense}
                  </p>
                </div>

                <div className="bg-green-50 p-5 rounded-xl">
                  <h3>Balance</h3>
                  <p className="text-2xl font-bold text-green-600">
                    ₹{income - totalExpense}
                  </p>
                </div>
                <div className="grid md:grid-cols-3 gap-4 mt-6">
                  <div className="bg-white p-4 rounded-xl shadow">
                    <h3>Total Transactions</h3>
                    <p className="text-2xl font-bold">{expenses.length}</p>
                  </div>

                  <div className="bg-white p-4 rounded-xl shadow">
                    <h3>Categories Used</h3>
                    <p className="text-2xl font-bold">5</p>
                  </div>

                  <div className="bg-white p-4 rounded-xl shadow">
                    <h3>Member Since</h3>
                    <p className="text-2xl font-bold">2026</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "dashboard" && (
            <>
              {/* Welcome */}
              <h2 className="text-3xl font-bold mb-6">
                Welcome, {userName} 👋
              </h2>

              {/* Summary Cards */}
              <div className="grid md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white p-5 rounded-2xl shadow">
                  <FaWallet className="text-3xl text-green-500 mb-2" />
                  <h3>Total Balance</h3>
                  <p className="text-3xl font-bold text-green-600">
                    ₹{income - totalExpense}
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow">
                  <FaArrowUp className="text-3xl text-blue-500 mb-2" />
                  <h3>Income</h3>
                  <p className="text-3xl font-bold text-blue-600">₹{income}</p>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow">
                  <FaArrowDown className="text-3xl text-red-500 mb-2" />
                  <h3>Expense</h3>
                  <p className="text-3xl font-bold text-red-600">
                    ₹{totalExpense}
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow">
                  <FaReceipt className="text-3xl text-purple-500 mb-2" />
                  <h3>Transactions</h3>
                  <p className="text-3xl font-bold">{expenses.length}</p>
                </div>
              </div>
            </>
          )}
          {activeTab === "income" && (
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-2xl font-bold mb-4">💰 Income Page</h2>

              <input
                type="text"
                placeholder="Income Source"
                value={incomeTitle}
                onChange={(e) => setIncomeTitle(e.target.value)}
                className="w-full border p-3 rounded-lg mb-3"
              />

              <input
                type="number"
                placeholder="Amount"
                value={incomeAmount}
                onChange={(e) => setIncomeAmount(e.target.value)}
                className="w-full border p-3 rounded-lg mb-3"
              />

              <button
                onClick={() => {
                  if (!incomeAmount) return;

                  setIncome(income + Number(incomeAmount));

                  setIncomeTitle("");
                  setIncomeAmount("");
                }}
                className="bg-green-600 text-white px-4 py-2 rounded-lg"
              >
                Add Income
              </button>
            </div>
          )}
          {activeTab === "expenses" && (
            <>
              {/* Add Expense Form */}
              <div className="bg-white p-6 rounded-xl shadow mb-6">
                <h2 className="text-xl font-bold mb-4">Add Expense</h2>

                <input
                  type="text"
                  placeholder="Expense Name"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border p-3 rounded-lg mb-3"
                />

                <input
                  type="number"
                  placeholder="Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full border p-3 rounded-lg mb-3"
                />

                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border p-3 rounded-lg mb-3"
                >
                  <option>Food</option>
                  <option>Travel</option>
                  <option>Shopping</option>
                  <option>Entertainment</option>
                  <option>Education</option>
                </select>

                <button
                  onClick={addExpense}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg"
                >
                  Add Expense
                </button>
              </div>

              {/* Transactions Table */}
              <div className="bg-white p-6 rounded-xl shadow">
                <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>

                {expenses.length === 0 ? (
                  <p className="text-gray-500">No expenses added yet.</p>
                ) : (
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="p-3 text-left">Title</th>
                        <th className="p-3 text-left">Category</th>
                        <th className="p-3 text-left">Amount</th>
                        <th className="p-3 text-left">Date</th>
                        <th className="p-3 text-left">Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {expenses.map((item) => (
                        <tr key={item.id} className="border-b">
                          <td className="p-3">{item.title}</td>
                          <td className="p-3">{item.category}</td>
                          <td className="p-3">₹{item.amount}</td>
                          <td className="p-3">{item.date}</td>
                          <td className="p-3">
                            <button
                              onClick={() =>
                                setExpenses(
                                  expenses.filter(
                                    (expense) => expense.id !== item.id,
                                  ),
                                )
                              }
                              className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </>
          )}
          {activeTab === "analytics" && (
            <div className="bg-white p-6 rounded-xl shadow mb-6">
              <h2 className="text-xl font-bold mb-4">Expense Analytics</h2>

              <div style={{ width: "100%", height: 350 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                      dataKey="value"
                      label
                    >
                      {chartData.map((entry, index) => (
                        <Cell
                          key={index}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>

                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
          {activeTab === "reports" && (
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-3xl font-bold mb-6">📝 Financial Report</h2>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-5 rounded-xl">
                  <h3 className="font-semibold">Total Income</h3>
                  <p className="text-3xl font-bold text-blue-600">₹{income}</p>
                </div>

                <div className="bg-red-50 p-5 rounded-xl">
                  <h3 className="font-semibold">Total Expense</h3>
                  <p className="text-3xl font-bold text-red-600">
                    ₹{totalExpense}
                  </p>
                </div>

                <div className="bg-green-50 p-5 rounded-xl">
                  <h3 className="font-semibold">Net Balance</h3>
                  <p className="text-3xl font-bold text-green-600">
                    ₹{income - totalExpense}
                  </p>
                </div>
              </div>

              <div className="mt-6 bg-slate-50 p-4 rounded-xl">
                <h3 className="font-bold mb-2">Summary</h3>

                <p>
                  You have earned <b>₹{income}</b>, spent
                  <b> ₹{totalExpense}</b> and currently have
                  <b> ₹{income - totalExpense}</b> balance.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
