import { Link } from "react-router-dom";

const features = [
  "Online Order Placement",
  "Real-Time Stock Check",
  "Delivery Trip Tracking",
  "Secure eSewa Payments",
];

const LandingPage = () => {
  return (
    <div className="space-y-16">
      <section className="text-center py-20 bg-amber-50 rounded-3xl shadow-sm border border-amber-100">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-600">
          Crusher Material Sewa
        </p>
        <h1 className="mt-4 text-4xl sm:text-5xl font-bold text-stone-900">
          Welcome to Crusher Material Sewa
        </h1>
        <p className="mt-4 text-lg text-stone-600 max-w-2xl mx-auto">
          Order construction materials easily, quickly, and reliably.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <button
            className="px-6 py-3 rounded-lg bg-stone-200 text-stone-600 cursor-not-allowed"
            disabled
          >
            Browse Materials
          </button>
          <Link
            to="/register"
            className="px-6 py-3 rounded-lg bg-emerald-600 text-white shadow hover:bg-emerald-700 transition"
          >
            Get Started
          </Link>
        </div>
      </section>

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <div
            key={feature}
            className="rounded-2xl bg-white border border-amber-100 p-6 shadow-sm text-center"
          >
            <p className="text-lg font-semibold text-stone-800">{feature}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default LandingPage;

