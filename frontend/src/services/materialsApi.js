const apiBase = import.meta.env.VITE_API_URL || "http://localhost:5000";

const getAuthHeaders = (includeContentType = true) => {
  const token = localStorage.getItem("cms_token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  // For FormData requests, don't set Content-Type (browser will set it with boundary)
  if (includeContentType) {
    headers["Content-Type"] = "application/json";
  }

  return headers;
};

export const getMaterials = async () => {
  const res = await fetch(`${apiBase}/api/materials`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch materials");
  }

  return data;
};

export const createMaterial = async (formData) => {
  const token = localStorage.getItem("cms_token");

  const res = await fetch(`${apiBase}/api/materials`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      // Don't set Content-Type for FormData - browser will set it with boundary
    },
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to create material");
  }

  return data;
};

export const updateMaterial = async (id, formDataOrData) => {
  const token = localStorage.getItem("cms_token");

  // If formDataOrData is FormData (has append method), it's a file upload
  const isFormData = formDataOrData instanceof FormData;

  const res = await fetch(`${apiBase}/api/materials/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      ...(isFormData
        ? {}
        : { "Content-Type": "application/json" }),
    },
    body: isFormData ? formDataOrData : JSON.stringify(formDataOrData),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to update material");
  }

  return data;
};

export const deleteMaterial = async (id) => {
  const res = await fetch(`${apiBase}/api/materials/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to delete material");
  }

  return data;
};
