const apiBase = import.meta.env.VITE_API_URL || "http://localhost:5000";

const getAuthHeaders = () => {
  const token = localStorage.getItem("cms_token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const createUser = async (name, email, password, role) => {
  const res = await fetch(`${apiBase}/api/admin/users/create`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ name, email, password, role }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to create user");
  }

  return data;
};

// Backward compatibility
export const createManager = async (name, email, password) => {
  return createUser(name, email, password, "MANAGER");
};

export const getUsers = async () => {
  const res = await fetch(`${apiBase}/api/admin/users`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch users");
  }

  return data;
};

export const updateUserStatus = async (userId, isActive) => {
  const res = await fetch(`${apiBase}/api/admin/users/${userId}/status`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify({ isActive }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to update user status");
  }

  return data;
};

