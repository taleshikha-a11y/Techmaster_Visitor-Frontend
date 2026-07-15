import React , { useEffect,  useState } from "react";
import { Calendar, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

import api from "../services/api";
import fallbackData from "../data/campaigns.json";
import { LuxuryCard } from "../components/LuxuryCard";

export const Campaigns: React.FC = () => {
  const [campaignsData, setCampaignsData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/campaigns');
        const data = Array.isArray(response.data) ? response.data[0] : response.data;
        setCampaignsData(data && Object.keys(data).length > 0 ? data : fallbackData);
      } catch (error) {
        console.error('Error fetching data for /campaigns:', error);
        setCampaignsData(fallbackData);
      }
    };
    fetchData();
  }, []);

  if (!campaignsData) {
    return <div className="min-h-screen flex items-center justify-center text-white"><div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin"></div></div>;
  }

  return (
    <div className="relative text-white min-h-screen pt-32 pb-24 px-6 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 right-1/4 w-[35vw] h-[35vw] aurora-glow-purple opacity-20 pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[30vw] h-[30vw] aurora-glow-gold opacity-10 pointer-events-none" />

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto text-left mb-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-[10px] uppercase tracking-[6px] text-gold font-bold mb-4"
        >
          {campaignsData?.hero?.smallBadge || "INITIATIVE CAMPAIGNS"}
        </motion.div>
        
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light leading-tight mb-8">
          {campaignsData?.hero?.headline ? (
            <div dangerouslySetInnerHTML={{ __html: campaignsData.hero.headline.replace(campaignsData.hero.highlightWord, `<span class="text-gold italic font-bold">${campaignsData.hero.highlightWord}</span>`) }} />
          ) : (
            <>Empowerment Drives & <br /><span className="text-gold italic font-bold">Coding Challenges</span>.</>
          )}
        </h1>

        <p className="text-gray-400 font-light text-base md:text-lg max-w-2xl leading-relaxed mt-6">
          {campaignsData?.hero?.description || "Review our campaigns designed to bring cloud services, laptops, coding bootcamps, and career mentoring to students globally."}
        </p>
      </section>

      {/* Campaigns Grid */}
      <section className="max-w-7xl mx-auto text-left grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
        {(campaignsData?.campaignsList || campaignsData || [])
          .filter((item: any) => item.status === 'Active' || item.status === true || String(item.status).toLowerCase() === 'true')
          .map((item: any, idx: number) => (
          <LuxuryCard key={item.id || item._id || idx} accentColor={item.accentColor || '#D4AF37'} index={idx}>
            <div className="flex flex-col h-full justify-between">
              
              <div className="aspect-video w-full rounded-2xl overflow-hidden border border-white/5 mb-6 relative">
                <img
                  src={item.coverImage}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-black/80 border border-white/10 px-3 py-1 rounded-full text-[9px] uppercase tracking-[1px] font-mono text-gold">
                  Reach: {item.reach}
                </div>
              </div>

              <div className="flex justify-between items-center mb-4">
                <span className="text-[9px] font-mono text-gold flex items-center gap-1.5 font-bold uppercase">
                  <Calendar className="w-3.5 h-3.5 text-gold" />
                  Sponsor: {item.sponsor}
                </span>
                <span className="px-2 py-0.5 rounded bg-white/5 text-[9px] font-mono text-gray-400 uppercase">
                  {item.status}
                </span>
              </div>

              <h3 className="font-serif text-2xl text-white font-medium mb-4 group-hover:text-gold transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-gray-400 text-xs md:text-sm font-light leading-relaxed mb-6">
                {item.description}
              </p>

              <ul className="flex flex-col gap-2 pt-4 border-t border-white/5 mt-auto">
                {item.highlights?.map((high: any, hidx: number) => (
                  <li key={hidx} className="flex items-start gap-2 text-[10px] text-gray-400">
                    <CheckCircle className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                    <span>{high}</span>
                  </li>
                ))}
              </ul>
            </div>
          </LuxuryCard>
        ))}
      </section>

      {/* Campaign Lifecycle & Success */}
      <section className="max-w-7xl mx-auto mt-32 text-left relative z-10">
        <div className="text-center mb-16">
          <p className="text-[10px] uppercase tracking-[6px] text-gold font-bold mb-4">OUR PROCESS</p>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-white mb-6">
            End-to-End <span className="text-gold italic font-bold">Campaign Lifecycle</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
          {(campaignsData?.lifecycle || [])
            .filter((item: any) => item.status === 'Active' || item.status === true || String(item.status).toLowerCase() === 'true')
            .map((step: any, idx: number) => (
            <div key={step.id || step._id || idx} className={`glass-panel p-8 rounded-2xl border-t border-white/5 hover:border-gold/30 transition-all duration-300 ${idx === (campaignsData?.lifecycle?.length || 0) - 1 && (campaignsData?.lifecycle?.length || 0) % 2 !== 0 && (campaignsData?.lifecycle?.length || 0) > 3 ? 'lg:col-span-2' : ''}`}>
              <h3 className="font-serif text-xl font-bold text-white mb-3">{step.title}</h3>
              <p className="text-gray-400 text-sm font-light leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Client Success Stories */}
        <div className="text-center mb-12">
          <p className="text-[10px] uppercase tracking-[6px] text-gold font-bold mb-4">PROVEN RESULTS</p>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-white mb-6">
            Client <span className="text-gold italic font-bold">Success Stories</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {(campaignsData?.successStories || [])
            .filter((item: any) => item.status === 'Active' || item.status === true || String(item.status).toLowerCase() === 'true')
            .map((story: any, idx: number) => (
            <div key={story.id || story._id || idx} className="glass-panel p-8 md:p-12 rounded-3xl border border-white/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 rounded-bl-full pointer-events-none transition-colors duration-500" style={{ backgroundColor: `${story.accentColor || '#D4AF37'}1A` }} />
              <h3 className="font-serif text-2xl font-bold text-white mb-4">{story.title}</h3>
              <p className="text-gray-400 text-sm font-light leading-relaxed mb-6">
                {story.description}
              </p>
              <span className="text-xs font-bold uppercase tracking-[2px] cursor-pointer hover:text-white transition-colors" style={{ color: story.accentColor || '#D4AF37' }}>
                {story.linkText || "Read Full Story"} &rarr;
              </span>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
