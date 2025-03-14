
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BarChart3, FileType, Download, ArrowRight, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';

const AnalysisResults = () => {
  const [activeTab, setActiveTab] = useState('fullReport');
  
  // Mock data - in a real app this would come from the font analysis
  const fontData = {
    name: 'Moon Dance Regular',
    format: 'TrueType',
    style: 'serif',
    weight: 'Regular (400)',
    width: 'Normal (5)'
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen pb-20">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24">
        <motion.div 
          className="flex justify-between items-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-foreground">Font Analysis Results</h1>
          <Button className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2">
            <FileType className="w-4 h-4" />
            Analyze Another Font
          </Button>
        </motion.div>
        
        <div className="flex gap-4 mb-6">
          <button 
            className={`analysis-tab ${activeTab === 'fullReport' ? 'active' : ''}`}
            onClick={() => setActiveTab('fullReport')}
          >
            <span className="flex items-center gap-2">
              <FileType className="w-5 h-5" />
              Full Report
            </span>
          </button>
          
          <button 
            className={`analysis-tab ${activeTab === 'visualizations' ? 'active' : ''}`}
            onClick={() => setActiveTab('visualizations')}
          >
            <span className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Visualizations
            </span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div 
            className="md:col-span-2 glass-card rounded-xl p-6 shadow-lg"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {activeTab === 'fullReport' ? (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.h2 
                  className="text-2xl font-bold text-center mb-4"
                  variants={itemVariants}
                >
                  Font Analysis Report: {fontData.name}
                </motion.h2>
                
                <motion.div 
                  className="text-center text-muted-foreground mb-8"
                  variants={itemVariants}
                >
                  Format: {fontData.format} | Style: {fontData.style}
                </motion.div>
                
                <motion.div 
                  className="mt-8"
                  variants={itemVariants}
                >
                  <h3 className="text-xl font-semibold mb-4">Font Metrics</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white/60 p-4 rounded-lg">
                      <div className="text-muted-foreground mb-1">Weight</div>
                      <div className="font-medium">{fontData.weight}</div>
                    </div>
                    
                    <div className="bg-white/60 p-4 rounded-lg">
                      <div className="text-muted-foreground mb-1">Width</div>
                      <div className="font-medium">{fontData.width}</div>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="mt-8 flex justify-center"
                  variants={itemVariants}
                >
                  <Button className="flex items-center gap-2">
                    <ExternalLink className="w-4 h-4" />
                    Open Report in New Tab
                  </Button>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <motion.div 
                  className="viz-card"
                  variants={itemVariants}
                >
                  <div className="p-4 border-b border-border/40">
                    <h3 className="font-medium">Font Personality Traits</h3>
                  </div>
                  <div className="p-4">
                    <img 
                      src="/placeholder.svg" 
                      alt="Font personality visualization" 
                      className="w-full h-auto"
                    />
                  </div>
                </motion.div>
                
                <motion.div 
                  className="viz-card"
                  variants={itemVariants}
                >
                  <div className="p-4 border-b border-border/40">
                    <h3 className="font-medium">Weight Distribution</h3>
                  </div>
                  <div className="p-4">
                    <img 
                      src="/placeholder.svg" 
                      alt="Weight distribution visualization" 
                      className="w-full h-auto"
                    />
                  </div>
                </motion.div>
                
                <motion.div 
                  className="viz-card"
                  variants={itemVariants}
                >
                  <div className="p-4 border-b border-border/40">
                    <h3 className="font-medium">Character Proportions</h3>
                  </div>
                  <div className="p-4">
                    <img 
                      src="/placeholder.svg" 
                      alt="Character proportions visualization" 
                      className="w-full h-auto"
                    />
                  </div>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
          
          <motion.div 
            className="glass-card rounded-xl p-6 h-fit"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-xl font-semibold mb-4">Actions</h3>
            
            <div className="space-y-3">
              <Link to="/compare" className="action-button">
                <BarChart3 className="w-5 h-5" />
                Compare With Other Fonts
              </Link>
              
              <button className="action-button">
                <Download className="w-5 h-5" />
                Download All Visualizations
              </button>
            </div>
            
            {activeTab === 'fullReport' && (
              <motion.div 
                className="mt-8 p-4 bg-white/40 rounded-lg border border-primary/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                <h4 className="font-medium text-primary mb-2">Font Recommendations</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Based on this font's characteristics, it pairs well with:
                </p>
                <ul className="text-sm space-y-2">
                  <li className="flex items-center gap-2">
                    <ArrowRight className="w-3 h-3 text-primary" />
                    <span>Lato (for body text)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="w-3 h-3 text-primary" />
                    <span>Roboto (for UI elements)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="w-3 h-3 text-primary" />
                    <span>Playfair Display (for contrast)</span>
                  </li>
                </ul>
              </motion.div>
            )}
          </motion.div>
        </div>
      </main>
      
      <footer className="py-6 mt-12 bg-secondary/50 backdrop-blur-sm border-t border-border">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Font Validator © 2024 - A tool for analyzing font properties</p>
          <p className="mt-1 text-xs">
            Our font analysis tool leverages the TrueType and OpenType specifications, insights from font psychology, and a diverse range of sample fonts from Google Fonts and Font Squirrel, utilizing fontTools and Python's struct module to deliver precise emotional and personality insights for typography.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AnalysisResults;
