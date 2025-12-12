import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const dashboardPath =
    user?.role === "admin" ? "/admin/dashboard" : "/contractor/dashboard";

  return (
    <header className="flex justify-between items-center p-4 shadow bg-amber-50 sticky top-0 z-10">
      <Link to="/" className="text-xl font-semibold text-emerald-700">
        Crusher Material Sewa
      </Link>

      {!user ? (
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="px-4 py-2 rounded-md border border-emerald-500 text-emerald-700 hover:bg-emerald-50 transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 transition"
          >
            Register
          </Link>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <Link
            to={dashboardPath}
            className="px-4 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 transition"
          >
            Dashboard
          </Link>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-md border border-amber-200 text-stone-700 hover:bg-amber-100 transition"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;

