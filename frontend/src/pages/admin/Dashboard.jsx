import { useAuth } from "../../hooks/useAuth.js";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();

  const quickActions = [
    {
      title: "Create User",
      desc: "Add new admin, manager, or contractor",
      path: "/admin/users/create",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
      ),
    },
    {
      title: "Manage Users",
      desc: "View and manage all users",
      path: "/admin/users",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-stone-900">
          Welcome back, {user?.name?.split(" ")[0]}
        </h1>
        <p className="text-stone-500 mt-1">
          Here's what's happening with your platform
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: "Total Users", value: "—", change: "" },
          { label: "Active Users", value: "—", change: "" },
          { label: "New This Month", value: "—", change: "" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white border border-stone-200 rounded-xl p-5"
          >
            <p className="text-sm text-stone-500 mb-1">{stat.label}</p>
            <p className="text-2xl font-semibold text-stone-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-stone-900 mb-4">Quick Actions</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.path}
              to={action.path}
              className="bg-white border border-stone-200 rounded-xl p-5 hover:border-teal-300 hover:shadow-sm transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center text-teal-600 group-hover:bg-teal-100 transition-colors">
                  {action.icon}
                </div>
                <div>
                  <h3 className="font-medium text-stone-900">{action.title}</h3>
                  <p className="text-sm text-stone-500 mt-0.5">{action.desc}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="bg-stone-50 border border-stone-200 rounded-xl p-5">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-stone-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-sm font-medium text-stone-700">Admin Panel</p>
            <p className="text-sm text-stone-500 mt-1">
              Use the sidebar menu to navigate between different sections. 
              More features like materials management, orders, and reports will be added soon.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
