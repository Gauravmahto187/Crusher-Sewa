import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { getMaterials } from "../../services/materialsApi.js";

const Materials = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    setLoading(true);
    try {
      const data = await getMaterials();
      setMaterials(data.materials || []);
    } catch (err) {
      toast.error(err.message || "Failed to load materials");
    } finally {
      setLoading(false);
    }
  };

  const apiBase = import.meta.env.VITE_API_URL || "http://localhost:5000";

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <svg className="w-8 h-8 animate-spin text-teal-600 mx-auto mb-3" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-stone-500">Loading materials...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-stone-900">Materials</h1>
        <p className="text-stone-500 mt-1">
          Browse available construction materials
        </p>
      </div>

      {materials.length === 0 ? (
        <div className="bg-white border border-stone-200 rounded-xl p-12 text-center">
          <svg className="w-12 h-12 text-stone-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          <p className="text-stone-600 font-medium">No materials available</p>
          <p className="text-sm text-stone-400 mt-1">Check back later for updates</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {materials.map((material) => {
            const available = material.stock === undefined || material.stock > 0;
            const imageUrl = material.imageUrl
              ? material.imageUrl.startsWith("http")
                ? material.imageUrl
                : `${apiBase}${material.imageUrl}`
              : null;

            return (
              <div
                key={material._id}
                className={`bg-white border rounded-xl overflow-hidden transition-all ${
                  available
                    ? "border-stone-200 hover:border-teal-300 hover:shadow-sm"
                    : "border-stone-100 opacity-60"
                }`}
              >
                {imageUrl && (
                  <div className="w-full h-48 bg-stone-100">
                    <img src={imageUrl} alt={material.name} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    {!imageUrl && (
                      <div className="w-10 h-10 bg-stone-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                    )}
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      available
                        ? "bg-teal-50 text-teal-700"
                        : "bg-stone-100 text-stone-500"
                    }`}>
                      {available ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>

                  <h3 className="font-semibold text-stone-900 mb-1">{material.name}</h3>
                  <p className="text-sm text-stone-500 mb-2">Per {material.unit}</p>
                  {material.stock !== undefined && material.stock !== null && (
                    <p className="text-xs text-stone-400 mb-4">Stock: {material.stock}</p>
                  )}

                  <div className="flex items-center justify-between mt-4">
                    <span className="text-lg font-semibold text-stone-900">
                      Rs. {material.ratePerCuMetre?.toFixed(2)}
                    </span>
                    <button
                      disabled={!available}
                      className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                        available
                          ? "bg-teal-600 text-white hover:bg-teal-700"
                          : "bg-stone-100 text-stone-400 cursor-not-allowed"
                      }`}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-8 bg-stone-50 border border-stone-200 rounded-xl p-5">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-stone-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-sm font-medium text-stone-700">Coming Soon</p>
            <p className="text-sm text-stone-500 mt-1">
              Material ordering and cart functionality will be available soon. 
              You'll be able to place orders and track deliveries right from this page.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Materials;
