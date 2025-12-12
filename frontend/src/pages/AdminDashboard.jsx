import { useAuth } from "../hooks/useAuth.js";

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#f6f1e7] text-stone-900 flex items-center justify-center">
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-semibold">
          Welcome{user?.name ? `, ${user.name}` : ""} (Admin)
        </h1>
        <p className="text-stone-700">
          This is a placeholder dashboard. Features will be added in the next
          sprint.
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;

