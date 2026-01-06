import { useAuth } from "../hooks/useAuth.js";
import { Link } from "react-router-dom";

const ManagerDashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CS</span>
              </div>
              <div>
                <span className="text-base font-semibold text-stone-800">Crusher Sewa</span>
                <span className="text-xs text-stone-400 ml-2">Manager</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-stone-100 rounded-lg">
                <div className="w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-medium">
                    {user?.name?.charAt(0) || "M"}
                  </span>
                </div>
                <span className="text-sm text-stone-700">{user?.name}</span>
              </div>
              <button
                onClick={logout}
                className="px-4 py-2 text-sm text-stone-600 hover:text-stone-900 font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-stone-900">
            Welcome back, {user?.name?.split(" ")[0]}
          </h1>
          <p className="text-stone-500 mt-1">
            Manage materials, orders, and deliveries
          </p>
        </div>

        {/* Coming Soon */}
        <div className="bg-white border border-stone-200 rounded-xl p-12 text-center">
          <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-stone-900 mb-2">Manager Dashboard Coming Soon</h3>
          <p className="text-stone-500 max-w-md mx-auto">
            The manager dashboard will include tools to manage materials, process orders, 
            track deliveries, and generate reports.
          </p>
        </div>

        {/* Planned Features */}
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: "Materials", desc: "Add, edit, and manage inventory", icon: "📦" },
            { title: "Orders", desc: "Process and approve customer orders", icon: "📋" },
            { title: "Deliveries", desc: "Track and manage delivery trips", icon: "🚚" },
            { title: "Invoices", desc: "Generate and send invoices", icon: "📄" },
            { title: "Reports", desc: "View sales and inventory reports", icon: "📊" },
            { title: "Settings", desc: "Configure system preferences", icon: "⚙️" },
          ].map((feature) => (
            <div key={feature.title} className="bg-white border border-stone-200 rounded-xl p-5 opacity-60">
              <div className="text-2xl mb-2">{feature.icon}</div>
              <h4 className="font-medium text-stone-900">{feature.title}</h4>
              <p className="text-sm text-stone-500 mt-1">{feature.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ManagerDashboard;
