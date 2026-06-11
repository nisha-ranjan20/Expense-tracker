import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-100">
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">
          💰 Smart Expense Tracker
        </h1>

        <button
          onClick={() => navigate("/")}
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </nav>

      <div className="max-w-7xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6">Welcome 👋</h2>

        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-5 rounded-xl shadow">
            <h3>Total Balance</h3>
            <p className="text-3xl font-bold text-green-600">₹15,000</p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <h3>Income</h3>
            <p className="text-3xl font-bold text-blue-600">₹20,000</p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <h3>Expense</h3>
            <p className="text-3xl font-bold text-red-600">₹5,000</p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <h3>Transactions</h3>
            <p className="text-3xl font-bold">25</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4">Add Expense</h2>

          <input
            type="text"
            placeholder="Expense Name"
            className="w-full border p-3 rounded-lg mb-3"
          />

          <input
            type="number"
            placeholder="Amount"
            className="w-full border p-3 rounded-lg mb-3"
          />

          <button className="w-full bg-blue-600 text-white py-3 rounded-lg">
            Add Expense
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
