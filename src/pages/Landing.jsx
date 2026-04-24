import { Link } from "react-router-dom";
import { FiLock, FiUsers, FiTrendingUp, FiBarChart2 } from "react-icons/fi";

export default function Landing() {
  return (
    <div className="bg-linear-to-b from-white to-gray-100 min-h-screen text-gray-900">
      {/* 🔝 NAVBAR */}
      <nav className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
        <h1 className="text-xl font-bold">
          Finance<span className="text-blue-600">Flow</span>
        </h1>

        <div className="hidden md:flex gap-8 text-sm text-gray-600">
          <a href="#">Product</a>
          <a href="#">Solutions</a>
          <a href="#">Pricing</a>
          <a href="#">Resources</a>
        </div>

        <div className="flex gap-3">
          <Link to="/login" className="text-sm px-4 py-2 hover:text-blue-600">
            Login
          </Link>
          <Link
            to="/register"
            className="bg-blue-600 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* 🔥 HERO */}
      <section className="max-w-7xl mx-auto px-8 py-20 flex flex-col md:flex-row items-center gap-12">
        {/* LEFT */}
        <div className="flex-1">
          <p className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full inline-block">
            Finance Management Simplified
          </p>

          <h1 className="mt-6 text-4xl md:text-5xl font-bold leading-tight">
            Manage Your Finances with{" "}
            <span className="text-blue-600">Clarity & Control</span>
          </h1>

          <p className="mt-6 text-gray-600">
            Track every rupee, manage team roles, and gain smart insights from a
            single dashboard built for professionals.
          </p>

          <div className="mt-8 flex gap-4">
            <Link
              to="/register"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Start Your Free Trial
            </Link>

            <button className="border px-6 py-3 rounded-lg hover:bg-gray-100">
              Book a Demo
            </button>
          </div>
        </div>

        {/* RIGHT - DASHBOARD CARD */}
        <div className="flex-1">
          <div className="bg-white p-6 rounded-xl shadow-lg border">
            <p className="text-sm text-gray-500">TOTAL BALANCE</p>
            <h2 className="text-3xl font-bold mt-2">₹20,000</h2>
            <p className="text-green-500 text-sm">+3.5% this month</p>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div>
                <p className="text-sm text-gray-500">INCOME</p>
                <p className="text-lg font-semibold text-green-600">₹50,000</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">EXPENSE</p>
                <p className="text-lg font-semibold text-red-500">₹30,000</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🧩 FEATURES */}
      <section className="py-20 px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl font-bold">
            Everything You Need in One Dashboard
          </h2>

          <p className="mt-4 text-gray-500">
            Built for professionals who value structured workflows.
          </p>

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <FiLock size={24} />,
                title: "Secure Auth",
                desc: "JWT + encrypted authentication.",
              },
              {
                icon: <FiUsers size={24} />,
                title: "Role Access",
                desc: "Granular permissions control.",
              },
              {
                icon: <FiTrendingUp size={24} />,
                title: "Live Tracking",
                desc: "Monitor all financial streams.",
              },
              {
                icon: <FiBarChart2 size={24} />,
                title: "Insights",
                desc: "Smart analytics & reports.",
              },
            ].map((f, i) => (
              <div
                key={i}
                className="p-6 border rounded-xl hover:shadow-md transition"
              >
                <div className="text-blue-600 mb-4">{f.icon}</div>
                <h3 className="font-semibold">{f.title}</h3>
                <p className="text-sm text-gray-500 mt-2">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 📊 ANALYTICS PREVIEW */}
      <section className="py-20 px-8 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1">
          <h2 className="text-2xl font-bold">
            Visualize Your Financial Data Instantly
          </h2>

          <ul className="mt-6 space-y-3 text-gray-600">
            <li>✔ Customizable insights</li>
            <li>✔ Trend forecasting</li>
            <li>✔ Multi-currency support</li>
          </ul>
        </div>

        <div className="flex-1 bg-white p-6 rounded-xl shadow border">
          <div className="h-40 bg-linear-to-r from-blue-200 to-blue-500 rounded-lg"></div>
        </div>
      </section>

      {/* 🚀 CTA */}
      <section className="px-8 py-16">
        <div className="max-w-6xl mx-auto bg-blue-600 text-white p-10 rounded-2xl text-center">
          <h2 className="text-2xl font-bold">
            Take Control of Your Finances Today
          </h2>

          <p className="mt-3 text-blue-100">
            Join thousands using FinanceFlow daily.
          </p>

          <div className="mt-6 flex justify-center gap-4">
            <Link
              to="/register"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium"
            >
              Get Started Now
            </Link>

            <button className="border border-white px-6 py-3 rounded-lg">
              Talk to Sales
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
