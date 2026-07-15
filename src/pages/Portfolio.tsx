import React, { useEffect,  useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import api from "../services/api";
import portfolioSettings from "../data/portfolioSettings.json";
import { LuxuryCard } from "../components/LuxuryCard";

export const Portfolio: React.FC = () => {
  const [portfolioData, setPortfolioData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/portfolio');
        const data = Array.isArray(response.data) ? response.data[0] : response.data;
        setPortfolioData(data);
      } catch (error) {
        console.error('Error fetching data for /portfolio:', error);
      }
    };
    fetchData();
  }, []);

  if (!portfolioData) {
    return <div className="min-h-screen flex items-center justify-center text-white"><div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin"></div></div>;
  }

  const [activeFilter, setActiveFilter] = useState("All");

  const filters = [
    "All",
    "Videos",
    "Photos",
    "Projects",
    "Campaigns",
    "Reels",
    "Commercial Shoots",
    "Client Work"
  ];

  const filteredProjects = activeFilter === "All"
    ? portfolioData
    : portfolioData.filter((proj) => proj.category === activeFilter);

  return (
    <div className="relative text-white min-h-screen pt-32 pb-24 px-6 overflow-hidden">
      {/* Background radial overlay */}
      <div className="absolute top-1/4 left-1/4 w-[30vw] h-[30vw] aurora-glow-purple opacity-20 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] aurora-glow-gold opacity-10 pointer-events-none" />

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto text-left mb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-[10px] uppercase tracking-[6px] text-gold font-bold mb-4"
        >
          {portfolioSettings?.hero?.smallBadge || "CURATED SHOWCASES"}
        </motion.div>
        
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light leading-tight">
          {(() => {
            const headline = portfolioSettings?.hero?.headline || "Product Engineering & Student Collaborations.";
            const highlight = portfolioSettings?.hero?.highlightWord;
            
            if (!highlight || !headline.toLowerCase().includes(highlight.toLowerCase())) {
              return headline;
            }
            
            const parts = headline.split(new RegExp(`(${highlight})`, 'gi'));
            return parts.map((part, i) => 
              part.toLowerCase() === highlight.toLowerCase() 
                ? <span key={i} className="text-gold italic font-bold">{part}</span>
                : <span key={i}>{part}</span>
            );
          })()}
        </h1>
        {portfolioSettings?.hero?.description && (
          <p className="text-gray-400 font-light text-base md:text-lg max-w-2xl leading-relaxed mt-6 whitespace-pre-line">
            {portfolioSettings.hero.description}
          </p>
        )}
      </section>

      {/* Filter Tabs */}
      <section className="max-w-7xl mx-auto mb-16 flex flex-wrap gap-3 text-left relative z-10">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-[1.5px] border transition-all duration-300 ${
              activeFilter === filter
                ? "bg-gold border-gold text-black shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                : "bg-[#0d0d0d] border-white/10 text-gray-400 hover:border-white/40 hover:text-white"
            }`}
          >
            {filter === "All" ? "All Work" : filter}
          </button>
        ))}
      </section>

      {/* Grid List */}
      <section className="max-w-7xl mx-auto text-left relative z-10">
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                key={project.id}
                className="h-full"
              >
                <LuxuryCard accentColor={project.accentColor} index={idx}>
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      <div className="aspect-video w-full rounded-2xl overflow-hidden border border-white/5 mb-6 relative">
                        <img
                          src={project.coverImage}
                          alt={project.title}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          data-cursor="view"
                        />
                        <div className="absolute top-4 left-4 bg-black/85 border border-white/10 px-3 py-1 rounded-full text-[9px] uppercase tracking-[1px] font-mono text-gold/90">
                          {project.category}
                        </div>
                      </div>

                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] uppercase tracking-[2px] opacity-40 font-bold">{project.client}</span>
                        <span className="font-mono text-xs text-gold">{project.year}</span>
                      </div>

                      <h3 className="font-serif text-2xl md:text-3xl text-white font-medium mb-3 group-hover:text-gold transition-colors duration-300">
                        {project.title}
                      </h3>
                      
                      <p className="text-gray-400 text-xs md:text-sm font-light leading-relaxed mb-6">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5 items-center justify-between mt-auto">
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                          <span key={tag} className="px-2.5 py-0.5 rounded-md bg-white/5 text-[9px] font-mono text-gray-400">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <button className="text-gold group-hover:text-white transition-colors duration-300 flex items-center gap-1 text-xs uppercase font-bold tracking-[1px]">
                        Review Case
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </LuxuryCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>
    </div>
  );
};
