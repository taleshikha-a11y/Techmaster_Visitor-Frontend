import React , { useEffect,  useState } from "react";
import { Compass, Eye, ShieldCheck, Film, Target, Heart, Star, Sparkles } from "lucide-react";

const getIconComponent = (iconName: string | undefined, fallbackIcon: React.ReactNode) => {
  if (!iconName) return fallbackIcon;
  const name = iconName.toLowerCase();
  if (name.includes('eye')) return <Eye className="w-5 h-5 text-gold" />;
  if (name.includes('target')) return <Target className="w-5 h-5 text-gold" />;
  if (name.includes('heart')) return <Heart className="w-5 h-5 text-gold" />;
  if (name.includes('star')) return <Star className="w-5 h-5 text-gold" />;
  if (name.includes('sparkle')) return <Sparkles className="w-5 h-5 text-gold" />;
  if (name.includes('shield')) return <ShieldCheck className="w-5 h-5 text-gold" />;
  if (name.includes('compass')) return <Compass className="w-5 h-5 text-gold" />;
  return fallbackIcon;
};
import { motion } from "framer-motion";

import api, { mergeData } from "../services/api";
import fallbackData from "../data/about.json";

export const About: React.FC = () => {
  const [aboutData, setAboutData] = useState<any>(fallbackData);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await api.get('/about');
        // Handle array response if the API returns an array, or single object
        const data = Array.isArray(response.data) ? response.data[0] : response.data;
        setAboutData(mergeData(fallbackData, data));
      } catch (error) {
        console.error('Error fetching about data:', error);
        setAboutData(fallbackData);
      }
    };
    fetchAboutData();
  }, []);

  

  return (
    <div className="relative text-white min-h-screen pt-32 pb-24 px-6 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/3 w-[30vw] h-[30vw] aurora-glow-purple opacity-20 pointer-events-none -translate-x-1/2" />
      <div className="absolute bottom-1/4 right-1/4 w-[35vw] h-[35vw] aurora-glow-gold opacity-10 pointer-events-none translate-x-1/2" />

      {/* Unique Page Hero */}
      <section className="max-w-7xl mx-auto text-left mb-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-[10px] uppercase tracking-[6px] text-gold font-bold mb-4"
        >
          FOUNDER IDENTITY
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.2 }}
          className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8"
        >
          {aboutData.profileImage && (
             <img src={aboutData.profileImage} alt={aboutData.name} className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover border-4 border-gold/30 shadow-[0_0_40px_rgba(212,175,55,0.15)] shrink-0" />
          )}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light leading-tight text-center md:text-left">
            {aboutData.name} <br />
            <span className="text-gold italic font-bold">{aboutData.title}</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12 pt-12 border-t border-white/5"
        >
          <div className="text-gray-400 font-light text-base md:text-lg leading-relaxed whitespace-pre-line">
            {aboutData.tagline && <p className="mb-4">{aboutData.tagline}</p>}
            <p className="mb-6">{aboutData.bio}</p>
            {aboutData.heroCta?.visible && aboutData.heroCta?.text && (
              <a href={aboutData.heroCta.link || "#"} target={aboutData.heroCta.newTab ? "_blank" : "_self"} className="inline-block bg-luxury-gold hover:bg-white text-black font-bold uppercase text-xs tracking-[2px] px-8 py-4 rounded-full transition-all duration-300">
                {aboutData.heroCta.text}
              </a>
            )}
          </div>
          <div className="glass-panel p-8 rounded-3xl relative hover:border-gold/30 transition-all duration-300 flex flex-col justify-center">
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 overflow-hidden">
              {aboutData.philosophy.image ? (
                <img src={aboutData.philosophy.image} alt="Philosophy" className="w-full h-full object-cover" />
              ) : (
                <Film className="w-6 h-6 text-gold" />
              )}
            </div>
            <h3 className="font-serif text-xl font-bold text-white mb-3">
              {aboutData.philosophy.title}
            </h3>
            <p className="text-gray-400 text-xs leading-relaxed font-light font-sans">
              {aboutData.philosophy.paragraph}
            </p>
          </div>
        </motion.div>
      </section>

      {/* Dynamic statistics section */}
      <section className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 mb-32 text-left relative z-10">
        {aboutData.credentials.map((cred, idx) => (
          <div key={idx} className="glass-panel p-6 rounded-2xl border-t border-white/5">
            <span className="font-serif text-3xl font-black text-gold block mb-1">{cred.count}</span>
            <span className="text-gray-400 text-[10px] uppercase tracking-[1px] font-mono">{cred.metric}</span>
          </div>
        ))}
      </section>

      {/* Mission, Vision & Core Values Section */}
      <section className="max-w-7xl mx-auto mb-32 grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 px-4">
        {/* Card 1: Mission */}
        {aboutData.mission && (
          <div className="glass-panel p-8 rounded-3xl hover:border-gold/30 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 overflow-hidden">
              {aboutData.mission.image ? (
                <img src={(aboutData?.founder as any)?.imageUrl} alt="Founder" className="w-full h-[500px] object-cover" />
              ) : (
                getIconComponent(aboutData.mission.icon, <Target className="w-5 h-5 text-gold" />)
              )}
            </div>
            <h3 className="font-serif text-2xl font-bold text-white mb-4">
              {aboutData.mission.title || "Mission"}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed font-light">
              {aboutData.mission.description}
            </p>
          </div>
        )}

        {/* Card 2: Philosophy/Vision */}
        {aboutData.vision && (
          <div className="glass-panel p-8 rounded-3xl hover:border-gold/30 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 overflow-hidden">
              {aboutData.vision.image ? (
                <img src={aboutData.vision.image} alt="Vision" className="w-full h-full object-cover" />
              ) : (
                getIconComponent(aboutData.vision.icon, <Eye className="w-5 h-5 text-gold" />)
              )}
            </div>
            <h3 className="font-serif text-2xl font-bold text-white mb-4">
              {aboutData.vision.title || "Vision"}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed font-light">
              {aboutData.vision.description}
            </p>
          </div>
        )}

        {/* Card 3: Core Values */}
        {aboutData.coreValues && (
          <div className="glass-panel p-8 rounded-3xl hover:border-gold/30 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 overflow-hidden">
              {aboutData.coreValues.image ? (
                <img src={aboutData.coreValues.image} alt="Core Values" className="w-full h-full object-cover" />
              ) : (
                getIconComponent(aboutData.coreValues.icon, <Heart className="w-5 h-5 text-gold" />)
              )}
            </div>
            <h3 className="font-serif text-2xl font-bold text-white mb-4">
              {aboutData.coreValues.title || "Core Values"}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed font-light">
              {aboutData.coreValues.description}
            </p>
          </div>
        )}
      </section>

      {/* Story & Passion */}
      <section className="max-w-7xl mx-auto mb-32 text-left relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[10px] uppercase tracking-[6px] text-gold font-bold mb-4">THE JOURNEY</p>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-white mb-6">
              {aboutData.story?.heading || "Our Story & Passion"}
            </h2>
            <p className="text-gray-400 font-light text-base leading-relaxed mb-6 whitespace-pre-line">
              {aboutData.story?.content || ""}
            </p>
          </div>
          <div className="glass-panel p-8 rounded-3xl relative">
             {aboutData.story?.image ? (
               <img src={aboutData.story.image} alt="Story" className="w-full h-auto rounded-xl object-cover" />
             ) : (
               <div className="w-full h-64 bg-white/5 rounded-xl flex items-center justify-center"><Film className="w-12 h-12 text-gold/50" /></div>
             )}
          </div>
        </div>
      </section>

      {/* Professional Background & Experience */}
      <section className="max-w-7xl mx-auto mb-32 text-left relative z-10">
        <div className="text-center mb-16">
          <p className="text-[10px] uppercase tracking-[6px] text-gold font-bold mb-4">EXPERTISE</p>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-white">
            Professional <span className="text-gold italic font-bold">Background & Experience</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {aboutData.experience?.map((exp, idx) => (
            <div key={idx} className="glass-panel p-8 rounded-3xl border-l-4 border-gold/50">
              <h3 className="font-serif text-2xl text-white mb-2">{exp.role} at {exp.company}</h3>
              <span className="text-gold text-xs font-mono mb-4 block">{exp.period}</span>
              <p className="text-gray-400 text-sm font-light leading-relaxed">
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Achievements & Awards */}
      <section className="max-w-7xl mx-auto mb-32 text-left relative z-10">
        <div className="glass-panel p-12 rounded-3xl border border-white/5">
          <div className="mb-12 text-center md:text-left">
             <p className="text-[10px] uppercase tracking-[6px] text-gold font-bold mb-4">RECOGNITION</p>
             <h2 className="font-serif text-3xl sm:text-5xl font-light text-white">
               Achievements <span className="text-gold italic font-bold">& Awards</span>
             </h2>
          </div>
          
          {/* Achievements */}
          {aboutData.achievements && aboutData.achievements.length > 0 && (
            <div className="mb-12">
              <h3 className="font-serif text-2xl text-gold mb-6 border-b border-white/10 pb-2">Key Achievements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {aboutData.achievements.map((achievement, idx) => (
                  <div key={idx} className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:border-gold/30 transition-all">
                    <h4 className="text-white font-bold mb-2">{achievement.title}</h4>
                    <span className="text-gold text-xs font-mono mb-3 block">{achievement.year}</span>
                    <p className="text-gray-400 text-sm font-light leading-relaxed">{achievement.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Awards */}
          {aboutData.awards && aboutData.awards.length > 0 && (
            <div>
              <h3 className="font-serif text-2xl text-gold mb-6 border-b border-white/10 pb-2">Awards</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {aboutData.awards.map((award, idx) => (
                  <div key={idx} className="text-center bg-white/5 p-6 rounded-2xl border border-white/5">
                    <div className="w-16 h-16 mx-auto rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mb-4">
                       <span className="text-gold font-bold text-2xl">🏆</span>
                    </div>
                    <h4 className="text-white font-bold mb-2">{award.title}</h4>
                    <p className="text-gray-400 text-xs font-light">{award.organization} {award.year}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Future Goals */}
      <section className="max-w-7xl mx-auto mb-32 text-center relative z-10">
        <p className="text-[10px] uppercase tracking-[6px] text-gold font-bold mb-4">{(aboutData as any)?.futureGoals?.tagline || "LOOKING AHEAD"}</p>
        <h2 className="font-serif text-3xl sm:text-5xl font-light text-white mb-8">
          {(aboutData as any)?.futureGoals?.headline || "Future Goals"}
        </h2>
        <div className="glass-panel p-10 rounded-3xl max-w-4xl mx-auto border-t-2 border-gold/50">
          {(aboutData as any)?.futureGoals?.imageUrl && (
            <div className="w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-8 border border-white/10">
              <img src={aboutData.futureGoals.imageUrl} alt="Future Goals" className="w-full h-full object-cover" />
            </div>
          )}
          <p className="text-gray-300 font-light text-lg leading-relaxed mb-6">
            {(aboutData as any)?.futureGoals?.paragraph1 || "Our vision extends beyond today's boundaries. We aim to establish a decentralized global tech academy, where every aspiring developer has free access to enterprise-grade education."}
          </p>
          <p className="text-gray-400 font-light text-sm leading-relaxed">
            {(aboutData as any)?.futureGoals?.paragraph2 || "By 2030, we plan to partner with over 500 universities worldwide, integrating our cinematic syllabus into traditional computer science degrees and launching the careers of a million new developers."}
          </p>
        </div>
      </section>
    </div>
  );
};
