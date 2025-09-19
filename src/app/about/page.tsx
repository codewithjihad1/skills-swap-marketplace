"use client";

import { motion } from "framer-motion";
import {
  Users,
  Lightbulb,
  Target,
  HeartHandshake,
  Globe,
  ArrowRight,
  BookOpen,
  Shield,
  TrendingUp,
  Sparkles,
  GraduationCap,
} from "lucide-react";
import OurJourney from "./aboutDetails/OurJourney";
import AboutUsSection from "./aboutDetails/AboutUsSection";
import TeamValues from "./aboutDetails/TeamValues";
import TeamSection from "./aboutDetails/TeamSection";

const AboutUs = () => {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerChildren = {
    visible: { transition: { staggerChildren: 0.2 } },
  };


  

 
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative py-24 px-4 md:px-8 lg:px-16 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-2/90 via-primary-3/80 to-accent-3/70 z-0"></div>

        {/* Animated gradient circles */}
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-primary/20 rounded-full filter blur-xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 -right-20 w-80 h-80 bg-secondary/20 rounded-full filter blur-xl animate-pulse-slow delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-accent/20 rounded-full filter blur-xl animate-pulse-slow delay-2000"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerChildren}
            className="text-center"
          >
            <motion.div
              variants={fadeIn}
              className="inline-flex items-center justify-center mb-6 px-4 py-2 bg-background/10 backdrop-blur-sm rounded-full border border-foreground/10"
            >
              <Sparkles className="w-5 h-5 text-secondary-2 mr-2" />
              <span className="text-lg font-semibold text-secondary-2">
                About SkillShareHub
              </span>
            </motion.div>

            <motion.h1
              variants={fadeIn}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            >
              Where{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-3">
                Skills Meet
              </span>{" "}
              & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-2 to-secondary-3">
                Communities Grow
              </span>
            </motion.h1>

            <motion.p
              variants={fadeIn}
              className="text-xl md:text-2xl text-foreground/90 max-w-3xl mx-auto mb-10 leading-relaxed"
            >
              A revolutionary platform where knowledge exchange transforms into
              valuable skills and meaningful connections.
            </motion.p>

            <motion.div
              variants={fadeIn}
              className="flex flex-wrap justify-center gap-6 mt-12"
            >
              <button className="px-8 py-4 bg-primary text-white rounded-xl font-semibold flex items-center shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-1">
                Join Our Community <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              <button className="px-8 py-4 bg-background/10 backdrop-blur-md text-foreground rounded-xl font-semibold border border-foreground/10 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                How It Works
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="absolute bottom-1 left-0 right-0"
        >
          <div className="max-w-5xl mx-auto bg-background/5 backdrop-blur-md rounded-2xl p-6 border border-foreground/10 shadow-sm mx-8">
            <div className="flex flex-wrap justify-center gap-10">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white">
                  10,000+
                </div>
                <div className="text-foreground/80">Active Members</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white">
                  500+
                </div>
                <div className="text-foreground/80">Skills Shared</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white">
                  98%
                </div>
                <div className="text-foreground/80">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* About section */}
      <AboutUsSection></AboutUsSection>
      {/*  */}

      {/* ourjourney */}
      <OurJourney></OurJourney>
      {/*  */}

      {/* team values */}
      <TeamValues></TeamValues>

      {/* team section */}
      <TeamSection></TeamSection>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-8 lg:px-16 bg-primary-2">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <motion.h2
              variants={fadeIn}
              className="text-3xl md:text-4xl font-bold mb-6 text-white"
            >
              Ready to Share Your Skills?
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="text-lg text-white/80 mb-10 max-w-2xl mx-auto"
            >
              Join our community of learners and teachers today. Exchange
              skills, grow together, and be part of something meaningful.
            </motion.p>
            <motion.div
              variants={fadeIn}
              className="flex flex-wrap justify-center gap-4"
            >
              <button className="px-8 py-4 bg-white text-primary-2 rounded-lg font-semibold flex items-center">
                Get Started <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              <button className="px-8 py-4 border border-white/20 text-white rounded-lg font-semibold">
                Learn More
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
