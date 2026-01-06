import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />
      <main className="max-w-6xl mx-auto px-6 py-10">
        <Outlet />
      </main>
      
      {/* Footer */}
      <footer className="border-t border-stone-200 mt-20">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-teal-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs">CS</span>
              </div>
              <span className="text-sm text-stone-600">Crusher Material Sewa</span>
            </div>
            <p className="text-sm text-stone-500">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
