import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";

const ContractorLayout = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: "/contractor/materials", label: "Materials" },
    { path: "/contractor/orders", label: "My Orders" },
    { path: "/contractor/profile", label: "Profile" },
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="bg-white border-b border-stone-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <Link to="/contractor/materials" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">CS</span>
                </div>
                <span className="text-lg font-semibold text-stone-800">
                  Crusher Sewa
                </span>
              </Link>

              <nav className="hidden sm:flex items-center gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive(item.path)
                        ? "bg-teal-50 text-teal-700"
                        : "text-stone-600 hover:text-stone-900 hover:bg-stone-50"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-stone-100 rounded-lg">
                <div className="w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-medium">
                    {user?.name?.charAt(0) || "C"}
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

        {/* Mobile nav */}
        <div className="sm:hidden border-t border-stone-200">
          <div className="flex">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex-1 py-3 text-center text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? "text-teal-600 border-b-2 border-teal-600"
                    : "text-stone-600"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default ContractorLayout;
