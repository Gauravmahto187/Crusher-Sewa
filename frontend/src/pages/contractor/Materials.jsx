const Materials = () => {
  const materials = [
    { name: "River Sand", unit: "cubic ft", price: "Rs. 45", available: true },
    { name: "Crushed Stone (20mm)", unit: "cubic ft", price: "Rs. 55", available: true },
    { name: "Crushed Stone (40mm)", unit: "cubic ft", price: "Rs. 50", available: true },
    { name: "Fine Aggregate", unit: "cubic ft", price: "Rs. 60", available: false },
    { name: "Coarse Sand", unit: "cubic ft", price: "Rs. 48", available: true },
    { name: "Gravel Mix", unit: "cubic ft", price: "Rs. 42", available: true },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-stone-900">Materials</h1>
        <p className="text-stone-500 mt-1">
          Browse available construction materials
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {materials.map((material) => (
          <div
            key={material.name}
            className={`bg-white border rounded-xl p-5 transition-all ${
              material.available
                ? "border-stone-200 hover:border-teal-300 hover:shadow-sm"
                : "border-stone-100 opacity-60"
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 bg-stone-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                material.available
                  ? "bg-teal-50 text-teal-700"
                  : "bg-stone-100 text-stone-500"
              }`}>
                {material.available ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            <h3 className="font-semibold text-stone-900 mb-1">{material.name}</h3>
            <p className="text-sm text-stone-500 mb-4">Per {material.unit}</p>

            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-stone-900">{material.price}</span>
              <button
                disabled={!material.available}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  material.available
                    ? "bg-teal-600 text-white hover:bg-teal-700"
                    : "bg-stone-100 text-stone-400 cursor-not-allowed"
                }`}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

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
