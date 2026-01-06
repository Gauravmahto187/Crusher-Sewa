import { Link } from "react-router-dom";

const features = [
  {
    title: "Easy Ordering",
    desc: "Place orders for construction materials with just a few clicks",
    icon: "📦",
  },
  {
    title: "Live Stock",
    desc: "Check real-time availability of sand, gravel, and aggregates",
    icon: "📊",
  },
  {
    title: "Track Delivery",
    desc: "Monitor your delivery trips from crusher to construction site",
    icon: "🚚",
  },
  {
    title: "Secure Payments",
    desc: "Pay safely through eSewa and other trusted gateways",
    icon: "🔒",
  },
];

const LandingPage = () => {
  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="pt-16 pb-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-teal-50 text-teal-700 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
            Construction Material Platform
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold text-stone-900 leading-tight mb-6">
            Get quality crusher materials delivered to your site
          </h1>
          
          <p className="text-lg text-stone-600 mb-8 max-w-2xl">
            Order sand, gravel, and aggregates from verified crushers. 
            Track deliveries in real-time and manage payments securely.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/register"
              className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-medium inline-flex items-center gap-2"
            >
              Start Ordering
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              to="/login"
              className="px-6 py-3 bg-stone-100 text-stone-700 rounded-lg hover:bg-stone-200 font-medium"
            >
              Login to Account
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {[
          { value: "50+", label: "Crushers" },
          { value: "1,000+", label: "Orders" },
          { value: "500+", label: "Contractors" },
          { value: "24/7", label: "Support" },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-3xl font-bold text-teal-600">{stat.value}</div>
            <div className="text-sm text-stone-500 mt-1">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* Features Section */}
      <section>
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-stone-900 mb-2">
            Everything you need
          </h2>
          <p className="text-stone-600">
            Tools to streamline your construction material procurement
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white border border-stone-200 rounded-xl p-6 hover:border-teal-200 hover:shadow-sm transition-all"
            >
              <div className="text-2xl mb-3">{feature.icon}</div>
              <h3 className="font-semibold text-stone-900 mb-1">{feature.title}</h3>
              <p className="text-sm text-stone-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-stone-900 rounded-2xl p-8 sm:p-12 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
          Ready to simplify your material orders?
        </h2>
        <p className="text-stone-400 mb-6 max-w-xl mx-auto">
          Join hundreds of contractors who trust Crusher Sewa for their construction material needs.
        </p>
        <Link
          to="/register"
          className="inline-flex px-6 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 font-medium"
        >
          Create Free Account
        </Link>
      </section>
    </div>
  );
};

export default LandingPage;
