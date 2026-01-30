"use client";

import { FiFlag, FiEye, FiZap, FiTarget, FiLayers, FiUsers } from "react-icons/fi";

export default function AboutPage() {
  return (
    <main className="font-sans text-white bg-black">
      {/* HERO SECTION */}
      <section className="relative w-full min-h-screen flex items-center justify-center px-6 pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-linear-to-b from-black/45 via-black/85 to-black z-10" />
          <img
            src="/RuningImage.png"
            alt="Background"
            className="object-cover w-full h-full opacity-40 grayscale"
          />
        </div>

        <div className="relative z-20 max-w-4xl mx-auto text-center space-y-8">
          <span className="inline-flex items-center gap-2 text-green-500 font-bold tracking-widest uppercase text-xs border border-green-500/30 rounded-full px-4 py-2 bg-green-500/5 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            About SportAI
          </span>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9]">
            WHERE{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-green-400 to-emerald-300">
              ATHLETICS
            </span>{" "}
            <br />
            MEETS INTELLIGENCE
          </h1>

          <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            We are pioneering the fusion of professional-grade sports equipment
            with adaptive AI coaching, empowering athletes of all levels to exceed
            their limits through data-driven performance.
          </p>
        </div>
      </section>

      {/* STORY SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative order-2 lg:order-1">
          <div className="absolute -top-6 -left-6 w-32 h-32 border-t-2 border-l-2 border-green-500/40 rounded-tl-3xl z-0" />
          <div className="relative z-10 overflow-hidden rounded-3xl aspect-square bg-zinc-900">
            <img
              src="/wiegthsCarrying.png"
              alt="Athlete training"
              className="object-cover w-full h-full opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent opacity-50" />
          </div>
          <div className="absolute -bottom-6 -right-6 w-32 h-32 border-b-2 border-r-2 border-green-500/40 rounded-br-3xl z-0" />
        </div>

        <div className="space-y-6 order-1 lg:order-2">
          <h2 className="text-4xl md:text-5xl font-black uppercase italic text-white leading-tight">
            THE STORY BEHIND <br />
            <span className="text-green-500">THE CODE</span>
          </h2>
          <div className="space-y-4 text-gray-400 leading-relaxed">
            <p>
              SportAI began with a simple yet provocative question:{" "}
              <strong className="text-white">
                Why is professional coaching data reserved only for the elite?
              </strong>
            </p>
            <p>
              In 2024, a team of data scientists and former professional athletes
              came together to bridge the gap between raw effort and intelligent
              guidance. We realized that having the best gear isn't enough; you
              need a plan that adapts to your unique physiology.
            </p>
            <p>
              By combining high-performance equipment with our proprietary AI
              engine, we created an ecosystem where your gear feeds data to your
              program, and your program optimizes your next purchase. Today,
              SportAI isn't just a store—it's your personal performance lab.
            </p>
          </div>
          <div className="pt-8 border-t border-white/10 grid grid-cols-3 gap-6">
            <Stat value="50k+" label="Active Users" />
            <Stat value="1M+" label="Workouts Logged" />
            <Stat value="24/7" label="AI Availability" />
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="w-full bg-zinc-950 py-24 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8">
          <Card icon={<FiFlag className="text-green-500" />} title="OUR MISSION">
            To democratize access to elite sports science through affordable AI
            technology for every athlete.
          </Card>
          <Card icon={<FiEye className="text-green-500" />} title="OUR VISION">
            A world where physical potential is limited only by the will to
            achieve, with every workout optimized by real-time data.
          </Card>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
            CORE <span className="text-green-500">VALUES</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            The principles that drive every decision we make and every product we build.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <ValueCard icon={<FiZap className="text-green-500" />} title="INTELLIGENCE FIRST" description="We believe the best workout isn't the hardest—it's the smartest. Every session should be backed by data." />
          <ValueCard icon={<FiTarget className="text-green-500" />} title="ADAPTIVE GROWTH" description="Your body changes. Your program should too. We prioritize dynamic, personalized coaching over one-size-fits-all plans." />
          <ValueCard icon={<FiLayers className="text-green-500" />} title="SCIENTIFIC RIGOR" description="Our AI models are built on peer-reviewed research, not trends. We value evidence over hype." />
          <ValueCard icon={<FiUsers className="text-green-500" />} title="INCLUSIVITY" description="Elite performance tools shouldn't be reserved for the elite. We're here to level the playing field for everyone." />
        </div>
      </section>

      {/* READY TO TRANSFORM */}
      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
        <div className="bg-linear-to-br from-green-500/10 to-emerald-500/5 border border-green-500/20 rounded-3xl p-12 md:p-16">
          <h2 className="text-3xl md:text-5xl font-black uppercase mb-6">
            READY TO TRANSFORM <br />
            <span className="text-green-500">YOUR POTENTIAL?</span>
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Join thousands of athletes who've upgraded from guesswork to precision.
            Start your journey with SportAI today.
          </p>
          <button className="bg-green-500 hover:bg-green-400 text-black font-bold px-8 py-4 rounded-full uppercase tracking-wider transition-all transform hover:scale-105 shadow-lg shadow-green-500/20">
            Get Started Free
          </button>
        </div>
      </section>

    </main>
  );
}

/* ---------- Components ---------- */
function Stat({ value, label }) {
  return (
    <div>
      <div className="text-3xl md:text-4xl font-black text-white mb-1">{value}</div>
      <div className="text-xs text-green-500 font-bold uppercase tracking-wider">{label}</div>
    </div>
  );
}

function Card({ icon, title, children }) {
  return (
    <div className="p-10 rounded-3xl bg-black border border-white/5 hover:border-green-500/30 transition-all duration-300 group">
      <div className="w-16 h-16 rounded-2xl bg-zinc-900 flex items-center justify-center mb-6 group-hover:bg-green-500 transition-all text-4xl border border-white/10 group-hover:border-transparent">
        {icon}
      </div>
      <h3 className="text-xl font-black text-white mb-4 uppercase tracking-tight">{title}</h3>
      <p className="text-gray-400 leading-relaxed text-sm">{children}</p>
    </div>
  );
}

function ValueCard({ icon, title, description }) {
  return (
    <div className="text-center p-8 rounded-2xl bg-zinc-950 border border-white/5 hover:border-green-500/20 transition-all group">
      <div className="text-5xl mb-4 group-hover:scale-110 transition-transform inline-block">{icon}</div>
      <h4 className="text-white font-black text-sm mb-3 uppercase tracking-wide">{title}</h4>
      <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
    </div>
  );
}
