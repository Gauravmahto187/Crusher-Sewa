const Orders = () => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-stone-900">My Orders</h1>
        <p className="text-stone-500 mt-1">
          Track your orders and delivery status
        </p>
      </div>

      {/* Empty State */}
      <div className="bg-white border border-stone-200 rounded-xl p-12 text-center">
        <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-stone-900 mb-2">No orders yet</h3>
        <p className="text-stone-500 max-w-sm mx-auto">
          When you place orders for materials, they will appear here. 
          You'll be able to track delivery status in real-time.
        </p>
      </div>

      {/* Order Status Guide */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-stone-900 mb-4">Order Status Guide</h2>
        <div className="grid sm:grid-cols-4 gap-4">
          {[
            { status: "Pending", color: "bg-amber-500", desc: "Order received, awaiting confirmation" },
            { status: "Confirmed", color: "bg-sky-500", desc: "Order confirmed, preparing for dispatch" },
            { status: "In Transit", color: "bg-violet-500", desc: "Materials on the way to your site" },
            { status: "Delivered", color: "bg-teal-500", desc: "Order delivered successfully" },
          ].map((item) => (
            <div key={item.status} className="bg-white border border-stone-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className={`w-2.5 h-2.5 rounded-full ${item.color}`}></span>
                <span className="font-medium text-stone-900 text-sm">{item.status}</span>
              </div>
              <p className="text-xs text-stone-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
