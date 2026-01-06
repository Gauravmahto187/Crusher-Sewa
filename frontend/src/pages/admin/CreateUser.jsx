import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { createUser } from "../../services/adminApi.js";

const CreateUser = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "MANAGER",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.name.trim() || !formData.email.trim() || !formData.password || !formData.role) {
      toast.error("Please fill in all fields");
      setLoading(false);
      return;
    }

    if (formData.name.trim().length < 2) {
      toast.error("Name must be at least 2 characters");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      await createUser(formData.name, formData.email, formData.password, formData.role);
      toast.success(`${formData.role} account created successfully`);
      setFormData({ name: "", email: "", password: "", role: "MANAGER" });
    } catch (err) {
      toast.error(err.message || "Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  const roles = [
    { value: "ADMIN", label: "Admin", desc: "Full system access" },
    { value: "MANAGER", label: "Manager", desc: "Manage materials & orders" },
    { value: "CONTRACTOR", label: "Contractor", desc: "Place orders & payments" },
  ];

  return (
    <div className="max-w-xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-stone-900">Create User</h1>
        <p className="text-stone-500 mt-1">Add a new user to the platform</p>
      </div>

      <div className="bg-white border border-stone-200 rounded-xl p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-3">
              Select Role
            </label>
            <div className="grid grid-cols-3 gap-3">
              {roles.map((role) => (
                <label
                  key={role.value}
                  className={`relative flex flex-col p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    formData.role === role.value
                      ? "border-teal-500 bg-teal-50"
                      : "border-stone-200 hover:border-stone-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value={role.value}
                    checked={formData.role === role.value}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <span className={`text-sm font-medium ${
                    formData.role === role.value ? "text-teal-700" : "text-stone-900"
                  }`}>
                    {role.label}
                  </span>
                  <span className="text-xs text-stone-500 mt-0.5">{role.desc}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter full name"
              className="w-full px-4 py-2.5 border border-stone-300 rounded-lg text-stone-900 placeholder-stone-400"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="user@example.com"
              className="w-full px-4 py-2.5 border border-stone-300 rounded-lg text-stone-900 placeholder-stone-400"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Min. 6 characters"
                className="w-full px-4 py-2.5 border border-stone-300 rounded-lg text-stone-900 placeholder-stone-400 pr-12"
                minLength={6}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-medium disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Creating..." : "Create User"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin/users")}
              className="px-6 py-2.5 border border-stone-300 text-stone-700 rounded-lg hover:bg-stone-50 font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
