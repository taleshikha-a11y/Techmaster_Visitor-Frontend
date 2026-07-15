import React from "react";
import { motion } from "framer-motion";
import { Compass, Eye, ShieldCheck, HeartHandshake, Target, Star, Link, Circle, Shield, Code, Cpu } from "lucide-react";
import { LuxuryCard } from "../components/LuxuryCard";
import missionVisionData from "../data/missionVision.json";

export const Mission: React.FC = () => {
  const renderIcon = (iconName: string, className: string) => {
    switch (iconName?.toLowerCase()) {
      case "eye": return <Eye className={className} />;
      case "compass": return <Compass className={className} />;
      case "shieldcheck": return <ShieldCheck className={className} />;
      case "hearthandshake": return <HeartHandshake className={className} />;
      case "target": return <Target className={className} />;
      case "star": return <Star className={className} />;
      case "link": return <Link className={className} />;
      case "circle": return <Circle className={className} />;
      case "shield": return <Shield className={className} />;
      case "code": return <Code className={className} />;
      case "cpu": return <Cpu className={className} />;
      default: return <Target className={className} />;
    }
  };

  const mvData = (missionVisionData as any) || {};

  const hero = mvData.hero || {};
  
  const missionList = Array.isArray(mvData.mission) ? mvData.mission.filter((m:any) => m.status !== 'Inactive') : (mvData.mission ? [mvData.mission] : []);
  const mission = missionList[0] || {};
  
  const visionList = Array.isArray(mvData.vision) ? mvData.vision.filter((v:any) => v.status !== 'Inactive') : (mvData.vision ? [mvData.vision] : []);
  const vision = visionList[0] || {};
  
  const ctaList = Array.isArray(mvData.cta) ? mvData.cta.filter((c:any) => c.status !== 'Inactive') : (mvData.cta ? [mvData.cta] : []);
  const cta = ctaList[0] || {};

  const values = Array.isArray(mvData.coreValues) && mvData.coreValues.length > 0 
    ? mvData.coreValues.filter((v:any) => v.status !== 'Inactive')
    : [
        {
          icon: "compass",
          title: "Vision 2030: Democratizing Code",
          description: "Our core goal is to reach 10 million students globally, offering verified technical education pathways at zero subscription costs.",
          accentColor: "#D4AF37",
        },
        {
          icon: "eye",
          title: "Proof of Work Focus",
          description: "Moving tech candidates away from standard multiple-choice resumes and towards visible, deployed open-source contributions.",
          accentColor: "#00E5FF",
        },
        {
          icon: "shieldcheck",
          title: "Academic Collaboration",
          description: "Bridging the gap between theory and industry needs by integrating real-world project curricula inside university syllabus tracks.",
          accentColor: "#aa3bff",
        },
        {
          icon: "hearthandshake",
          title: "Inclusive Coding Spaces",
          description: "Supporting underrepresented groups in software engineering through free hardware grants, cloud sponsorship, and active mentorship panels.",
          accentColor: "#FF007F",
        },
      ];

  const pillars = Array.isArray(mvData.brandPillars) && mvData.brandPillars.length > 0
    ? mvData.brandPillars.filter((p:any) => p.status !== 'Inactive')
    : [
        {
          title: "Brand Philosophy",
          description: "We believe that education is not just about transferring information, but about creating an engaging, premium experience. Our philosophy is rooted in cinematic storytelling, making complex engineering concepts feel accessible, beautiful, and deeply impactful.",
          borderColor: "#D4AF37"
        },
        {
          title: "The Ecosystem",
          description: "From foundational courses to advanced system architecture, we are building an entire ecosystem where learning meets application. Every tutorial, tool, and repository is designed to fit into a larger, cohesive vision for the future of developer tools.",
          borderColor: "#00E5FF"
        }
      ];

  return (
    <div className="relative text-white min-h-screen pt-32 pb-24 px-6 overflow-hidden">
      {/* Glow overlays */}
      <div className="absolute top-1/3 left-1/4 w-[45vw] h-[45vw] aurora-glow-purple opacity-20 pointer-events-none -translate-x-1/2" />
      <div className="absolute bottom-1/4 right-1/4 w-[35vw] h-[35vw] aurora-glow-blue opacity-15 pointer-events-none translate-x-1/2" />

      {/* Hero Header */}
      <div className="max-w-4xl mx-auto text-center mb-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[10px] uppercase tracking-[6px] text-gold font-bold mb-4"
        >
          {hero.smallLabel || "OUR NORTH STAR"}
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-4xl sm:text-6xl font-light leading-tight mb-6"
        >
          {hero.headline || "Democratizing Tech Literacy Globally"}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-gray-400 text-sm sm:text-base font-light max-w-xl mx-auto leading-relaxed"
        >
          {hero.description || "We believe high-quality engineering curricula shouldn't be locked behind expensive student debts. Aman is building the tools to make code accessible to every curious mind on earth."}
        </motion.p>
      </div>

      {/* Core Mission grids */}
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-panel p-8 md:p-12 rounded-3xl text-left flex flex-col justify-center border-l-4 border-l-gold"
          >
            <span className="text-xs uppercase font-bold tracking-[3px] text-gold mb-4">{mission.subHeading || "THE MISSION STATEMENT"}</span>
            <h2 className="font-serif text-2xl md:text-3xl font-light text-white mb-6 leading-snug">
              {mission.heading || "To inspire, educate, and place the next million full-stack developers."}
            </h2>
            <p className="text-gray-400 text-sm font-light leading-relaxed">
              {mission.description || "Our target is to break down complex system design systems, database architectures, and compiler dynamics into engaging, cinematic formats. We enable students to transition seamlessly from beginners to self-sufficient contributors."}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-panel p-8 md:p-12 rounded-3xl text-left flex flex-col justify-center border-l-4 border-l-electric-blue"
          >
            <span className="text-xs uppercase font-bold tracking-[3px] text-electric-blue mb-4">{vision.subHeading || "THE FUTURE VISION"}</span>
            <h2 className="font-serif text-2xl md:text-3xl font-light text-white mb-6 leading-snug">
              {vision.heading || "Vision 2030: Bridging the global developer deficit."}
            </h2>
            <p className="text-gray-400 text-sm font-light leading-relaxed">
              {vision.description || "Technology evolves at a rapid pace, yet university syllabi remain outdated. We are constructing an open, adaptive, cloud-native learning playground that responds directly to modern tech requirements."}
            </p>
          </motion.div>
        </div>

        {/* Core Values grid using LuxuryCard */}
        <div className="mb-12 text-center">
          <p className="text-[10px] uppercase tracking-[6px] text-gold font-bold mb-4">OUR FUNDAMENTAL PRINCIPLES</p>
          <h2 className="font-serif text-3xl md:text-4xl text-white font-light mb-16">
            The Values that <span className="text-gold italic font-bold">Drive Us</span> Forward
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {values.map((val:any, idx:number) => (
              <LuxuryCard key={idx} accentColor={val.accentColor || "#D4AF37"} index={idx}>
                <div className="mb-6 w-12 h-12 rounded-full border border-white/5 flex items-center justify-center bg-white/5 group-hover:border-gold/30 transition-colors duration-300">
                  {renderIcon(val.icon, "w-6 h-6")}
                </div>
                <h3 className="font-serif text-lg text-white font-medium mb-3 group-hover:text-gold transition-colors duration-300">
                  {val.title}
                </h3>
                <p className="text-gray-400 text-xs leading-relaxed font-light">
                  {val.description}
                </p>
              </LuxuryCard>
            ))}
          </div>
        </div>

        {/* Core Pillars */}
        <div className="mb-24">
          <div className="mb-12 text-center">
            <p className="text-[10px] uppercase tracking-[6px] text-gold font-bold mb-4">OUR PILLARS</p>
            <h2 className="font-serif text-3xl md:text-4xl text-white font-light mb-8">
              The <span className="text-gold italic font-bold">Foundation</span> of Our Work
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pillars.map((pillar:any, index:number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                style={{ borderLeftColor: pillar.borderColor || '#D4AF37' }}
                className="glass-panel p-8 rounded-2xl border-l-2 hover:border-l-gold transition-all duration-300"
              >
                {pillar.icon && (
                  <div className="mb-4 text-gold flex items-center justify-start">
                    {renderIcon(pillar.icon, "w-8 h-8")}
                  </div>
                )}
                <h3 className="font-serif text-xl font-bold text-white mb-3">{pillar.title}</h3>
                <p className="text-gray-400 text-sm font-light leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
