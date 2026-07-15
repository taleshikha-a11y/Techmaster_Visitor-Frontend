import React from "react";
import { motion } from "framer-motion";
import { Laptop, Terminal, Layers, ArrowUpRight, Cpu } from "lucide-react";
import { LuxuryCard } from "../components/LuxuryCard";

import productLaunchesData from "../data/productLaunches.json";

export const ProductLaunches: React.FC = () => {
  const getIcon = (iconStr: string) => {
    switch (iconStr?.toLowerCase()) {
      case 'terminal': return <Terminal className="w-6 h-6 text-electric-blue" />;
      case 'layers': return <Layers className="w-6 h-6 text-royal-purple" />;
      default: return <Laptop className="w-6 h-6 text-gold" />;
    }
  };


  return (
    <div className="relative text-white min-h-screen pt-32 pb-24 px-6 overflow-hidden">
      {/* Glow overlays */}
      <div className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] aurora-glow-purple opacity-20 pointer-events-none -translate-x-1/2" />
      <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] aurora-glow-gold opacity-10 pointer-events-none translate-x-1/2" />

      {/* Hero Header */}
      <div className="max-w-4xl mx-auto text-center mb-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[10px] uppercase tracking-[6px] text-gold font-bold mb-4"
        >
          {productLaunchesData?.hero?.smallBadge || "SOFTWARE RELEASES"}
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-4xl sm:text-6xl font-light leading-tight mb-6"
        >
          {productLaunchesData?.hero?.headline ? (
            <div dangerouslySetInnerHTML={{ __html: productLaunchesData.hero.headline.replace(productLaunchesData.hero.highlightWord, `<span class="text-gold italic font-bold">${productLaunchesData.hero.highlightWord}</span>`) }} />
          ) : (
            <>Product Launches & <br /><span className="text-gold italic font-bold">Tech Innovations</span></>
          )}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-gray-400 text-sm sm:text-base font-light max-w-xl mx-auto leading-relaxed"
        >
          {productLaunchesData?.hero?.description || "We construct platforms, terminal tools, and architectural sandbox spaces to help learners visual and configure engineering problems."}
        </motion.p>
      </div>

      {/* Product launch items */}
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {(productLaunchesData?.products || [])
            .filter((item: any) => item.status === 'Active Launch' || item.status === 'Active' || item.status === true || String(item.status).toLowerCase() === 'true')
            .map((prod: any, idx: number) => (
            <LuxuryCard key={prod.id || prod._id || idx} accentColor={prod.accentColor || '#D4AF37'} index={idx}>
              <div className="flex justify-between items-start mb-8">
                <div className="w-12 h-12 rounded-full border border-white/5 bg-white/5 flex items-center justify-center group-hover:border-gold/30 transition-colors duration-300">
                  {getIcon(prod.icon)}
                </div>
                <span className="px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-[9px] uppercase tracking-[1px] font-mono text-gold">
                  {prod.status}
                </span>
              </div>

              <div className="mb-6">
                <h3 className="font-serif text-2xl text-white font-medium mb-1 group-hover:text-gold transition-colors duration-300">
                  {prod.title}
                </h3>
                <span className="text-gray-400 text-[10px] uppercase tracking-[1.5px] font-mono">
                  {prod.tagline}
                </span>
              </div>

              <p className="text-gray-400 text-xs md:text-sm leading-relaxed font-light mb-8">
                {prod.description}
              </p>

              <button className="w-full py-3 border border-white/10 rounded-xl text-xs font-bold uppercase tracking-[2.5px] hover:border-gold hover:text-gold transition-all duration-300 flex items-center justify-center gap-2 mt-auto">
                Explore Tool <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </LuxuryCard>
          ))}
        </div>

        {/* Feature section video or render element */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0 }}
          className="glass-panel p-8 md:p-12 rounded-3xl mt-24 text-left max-w-5xl mx-auto flex flex-col md:flex-row gap-8 items-center"
        >
          <div className="md:w-2/3">
            <span className="text-[10px] uppercase font-bold tracking-[3px] text-gold block mb-2">
              {productLaunchesData?.featureVideo?.smallBadge || "LATEST LAUNCH VIDEO"}
            </span>
            <h3 className="font-serif text-3xl font-light text-white mb-4 leading-tight">
              {productLaunchesData?.featureVideo?.headline || "MasterClass v2 Platform Launch Walkthrough"}
            </h3>
            <p className="text-gray-400 text-xs md:text-sm leading-relaxed font-light mb-6">
              {productLaunchesData?.featureVideo?.description || "Watch Aman demonstrate the sandboxed docker containers, web terminals, and the multiplayer live coding rooms that make learning code feel like a cooperative MMO game."}
            </p>
            <div className="flex gap-4">
              <button className="px-6 py-3 bg-white text-black font-bold uppercase text-[10px] tracking-[2px] rounded-full hover:bg-gold transition-all duration-300">
                {productLaunchesData?.featureVideo?.trailerBtnText || "Play Trailer"}
              </button>
              <button className="px-6 py-3 border border-white/20 text-white font-bold uppercase text-[10px] tracking-[2px] rounded-full hover:border-white transition-all duration-300">
                {productLaunchesData?.featureVideo?.notesBtnText || "View Launch Notes"}
              </button>
            </div>
          </div>

          <div className="md:w-1/3 w-full aspect-video rounded-2xl overflow-hidden border border-white/5 relative">
            <img
              src={productLaunchesData?.featureVideo?.thumbnailUrl || "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=400&q=80"}
              alt="Launch Thumbnail"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <Cpu className="w-8 h-8 text-gold animate-pulse" />
            </div>
          </div>
        </motion.div>

        {/* Product Launch Highlights */}
        <section className="max-w-7xl mx-auto mt-32 text-left relative z-10 px-6">
          <div className="text-center mb-16">
            <p className="text-[10px] uppercase tracking-[6px] text-gold font-bold mb-4">PORTFOLIO</p>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-white mb-6">
              Launch <span className="text-gold italic font-bold">Initiatives</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
            {(productLaunchesData?.initiatives || [])
              .filter((item: any) => item.status === 'Active' || item.status === true || String(item.status).toLowerCase() === 'true')
              .map((init: any, idx: number) => (
              <div key={init.id || init._id || idx} className={`glass-panel p-8 rounded-2xl border-t border-white/5 hover:border-gold/30 transition-all duration-300 ${idx === (productLaunchesData?.initiatives?.length || 0) - 1 && (productLaunchesData?.initiatives?.length || 0) % 2 !== 0 && (productLaunchesData?.initiatives?.length || 0) > 3 ? 'lg:col-span-2' : ''}`}>
                <h3 className="font-serif text-xl font-bold text-white mb-3">{init.title}</h3>
                <p className="text-gray-400 text-sm font-light leading-relaxed">
                  {init.description}
                </p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};
