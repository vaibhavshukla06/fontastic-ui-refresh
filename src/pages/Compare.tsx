
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Plus, ChevronRight, BarChart3, FileType, ArrowLeft } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Navbar from '@/components/Navbar';

const Compare = () => {
  const [fonts, setFonts] = useState([
    { id: 1, file: null, name: '' },
    { id: 2, file: null, name: '' },
  ]);
  
  const [options, setOptions] = useState({
    highlightDifferences: true,
    showSampleText: true
  });
  
  const [comparisonFocus, setComparisonFocus] = useState('all');
  
  const handleAddFont = () => {
    const newId = Math.max(...fonts.map(f => f.id)) + 1;
    setFonts([...fonts, { id: newId, file: null, name: '' }]);
  };
  
  const handleFileChange = (id: number, file: File | null) => {
    setFonts(fonts.map(font => 
      font.id === id ? { ...font, file, name: file ? file.name : '' } : font
    ));
  };
  
  const handleOptionChange = (option: keyof typeof options) => {
    setOptions({
      ...options,
      [option]: !options[option]
    });
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
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-foreground">Compare Fonts</h1>
          <p className="text-muted-foreground mt-2">
            Upload multiple fonts to compare their properties and personality traits side by side.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div 
            className="md:col-span-2"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              className="compare-section"
              variants={itemVariants}
            >
              <h2 className="compare-header flex items-center gap-2">
                <Upload className="w-5 h-5 text-primary" />
                Upload Fonts
              </h2>
              
              <div className="space-y-4">
                {fonts.map(font => (
                  <motion.div 
                    key={font.id} 
                    className="font-upload-item"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <label className="block mb-2 font-medium">Font {font.id}</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="file"
                        id={`font-${font.id}`}
                        accept=".ttf,.otf,.woff,.woff2"
                        className="block w-full text-sm text-foreground
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-full file:border-0
                          file:text-sm file:font-medium
                          file:bg-primary/10 file:text-primary
                          hover:file:bg-primary/20
                          cursor-pointer"
                        onChange={(e) => handleFileChange(font.id, e.target.files ? e.target.files[0] : null)}
                      />
                      {font.name && (
                        <div className="text-sm bg-primary/10 py-1 px-3 rounded-full text-primary">
                          {font.name}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
                
                <motion.button
                  className="w-full py-3 border-2 border-dashed border-primary/30 rounded-lg text-primary hover:bg-primary/5 hover:border-primary/50 transition-all duration-200 flex items-center justify-center gap-2"
                  onClick={handleAddFont}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Plus className="w-4 h-4" />
                  Add Another Font
                </motion.button>
                
                <motion.button
                  className="compare-button"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <BarChart3 className="w-5 h-5" />
                  Compare Fonts
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
            
            <motion.div 
              className="compare-section mt-6"
              variants={itemVariants}
            >
              <h2 className="compare-header flex items-center gap-2">
                <FileType className="w-5 h-5 text-primary" />
                Comparison Options
              </h2>
              
              <div className="mb-4">
                <label className="block mb-2 font-medium">Comparison Focus</label>
                <Select 
                  value={comparisonFocus}
                  onValueChange={setComparisonFocus}
                >
                  <SelectTrigger className="w-full bg-white/80">
                    <SelectValue placeholder="Select focus area" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Properties</SelectItem>
                    <SelectItem value="metrics">Metrics Only</SelectItem>
                    <SelectItem value="personality">Personality Only</SelectItem>
                    <SelectItem value="usage">Usage & Recommendations</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <div 
                  className="option-checkbox"
                  onClick={() => handleOptionChange('highlightDifferences')}
                >
                  <Checkbox 
                    checked={options.highlightDifferences} 
                    onCheckedChange={() => handleOptionChange('highlightDifferences')}
                    className="data-[state=checked]:bg-primary"
                  />
                  <label className="cursor-pointer">Highlight Differences</label>
                </div>
                
                <div 
                  className="option-checkbox"
                  onClick={() => handleOptionChange('showSampleText')}
                >
                  <Checkbox 
                    checked={options.showSampleText}
                    onCheckedChange={() => handleOptionChange('showSampleText')}
                    className="data-[state=checked]:bg-primary"
                  />
                  <label className="cursor-pointer">Show Sample Text</label>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="glass-card rounded-xl p-6 h-fit"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-xl font-semibold mb-4">Comparison Results</h2>
            
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="bg-secondary/50 p-4 rounded-full mb-4">
                <ArrowLeft className="w-6 h-6 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">
                Upload fonts to see comparison results
              </p>
            </div>
            
            <motion.div 
              className="mt-6 p-4 bg-white/40 rounded-lg border border-primary/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <h4 className="font-medium text-primary mb-2">Tips for Comparison</h4>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <ChevronRight className="w-3 h-3 text-primary flex-shrink-0" />
                  <span>Compare fonts with similar purposes (e.g., all display fonts)</span>
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="w-3 h-3 text-primary flex-shrink-0" />
                  <span>Use "Highlight Differences" to quickly spot variations</span>
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="w-3 h-3 text-primary flex-shrink-0" />
                  <span>Focus on specific properties to get more detailed insights</span>
                </li>
              </ul>
            </motion.div>
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

export default Compare;
