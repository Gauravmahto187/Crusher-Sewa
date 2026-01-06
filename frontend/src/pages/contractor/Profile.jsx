import { useAuth } from "../../hooks/useAuth.js";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-stone-900">Profile</h1>
        <p className="text-stone-500 mt-1">
          Manage your account settings
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-stone-200 rounded-xl p-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-teal-700 font-semibold text-2xl">
                  {user?.name?.charAt(0) || "?"}
                </span>
              </div>
              <h2 className="text-lg font-semibold text-stone-900">{user?.name}</h2>
              <p className="text-sm text-stone-500">{user?.email}</p>
              <span className="inline-flex mt-3 px-3 py-1 bg-amber-50 text-amber-700 text-xs font-medium rounded-full border border-amber-200">
                {user?.role}
              </span>
            </div>
          </div>
        </div>

        {/* Account Details */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-stone-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-stone-900 mb-4">Account Details</h3>
            
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-500 uppercase tracking-wide mb-1.5">
                    Full Name
                  </label>
                  <p className="text-stone-900">{user?.name}</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-500 uppercase tracking-wide mb-1.5">
                    Email Address
                  </label>
                  <p className="text-stone-900">{user?.email}</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-500 uppercase tracking-wide mb-1.5">
                    Account Type
                  </label>
                  <p className="text-stone-900">{user?.role}</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-500 uppercase tracking-wide mb-1.5">
                    Account Status
                  </label>
                  <p className="text-teal-600 font-medium">Active</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-stone-200">
              <p className="text-sm text-stone-500">
                Need to update your profile information? Contact support for assistance.
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mt-6 bg-white border border-stone-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-stone-900 mb-4">Activity Summary</h3>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Total Orders", value: "0" },
                { label: "Pending", value: "0" },
                { label: "Delivered", value: "0" },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-4 bg-stone-50 rounded-lg">
                  <p className="text-2xl font-semibold text-stone-900">{stat.value}</p>
                  <p className="text-xs text-stone-500 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
