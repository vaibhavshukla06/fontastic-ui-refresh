
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight, Zap, BarChart, FileText, Variable, Globe } from "lucide-react";

const AnalysisOptions = () => {
  const [options, setOptions] = useState({
    visualizations: true,
    htmlReport: true,
    variableFont: false,
    nonLatin: false,
  });

  const handleOptionChange = (option: keyof typeof options) => {
    setOptions({
      ...options,
      [option]: !options[option],
    });
  };

  const handleAnalyze = () => {
    console.log("Analyzing with options:", options);
  };

  return (
    <motion.div 
      className="w-full max-w-3xl mx-auto mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <h2 className="text-2xl font-semibold text-foreground mb-4">Analysis Options</h2>
      
      <div className="glass-card rounded-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <OptionItem
            icon={<BarChart className="w-5 h-5 text-primary" />}
            label="Generate Visualizations"
            checked={options.visualizations}
            onChange={() => handleOptionChange("visualizations")}
          />
          
          <OptionItem
            icon={<FileText className="w-5 h-5 text-primary" />}
            label="Generate HTML Report"
            checked={options.htmlReport}
            onChange={() => handleOptionChange("htmlReport")}
          />
          
          <OptionItem
            icon={<Variable className="w-5 h-5 text-primary" />}
            label="Variable Font Analysis"
            checked={options.variableFont}
            onChange={() => handleOptionChange("variableFont")}
          />
          
          <OptionItem
            icon={<Globe className="w-5 h-5 text-primary" />}
            label="Analyze Non-Latin Script Support"
            checked={options.nonLatin}
            onChange={() => handleOptionChange("nonLatin")}
          />
        </div>
        
        <motion.div 
          className="mt-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Button 
            className="w-full py-6 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg text-base font-medium flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
            onClick={handleAnalyze}
          >
            <Zap className="w-5 h-5" />
            Analyze Font
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

interface OptionItemProps {
  icon: React.ReactNode;
  label: string;
  checked: boolean;
  onChange: () => void;
}

const OptionItem = ({ icon, label, checked, onChange }: OptionItemProps) => {
  return (
    <motion.div 
      className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
        checked ? "bg-primary/10" : "hover:bg-background"
      }`}
      onClick={onChange}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex-shrink-0">{icon}</div>
      <div className="flex-grow text-foreground text-sm font-medium">{label}</div>
      <div 
        className={`w-5 h-5 rounded-md flex items-center justify-center ${
          checked ? "bg-primary" : "border-2 border-muted-foreground/30"
        }`}
      >
        {checked && (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-3.5 w-3.5 text-white" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
              clipRule="evenodd" 
            />
          </svg>
        )}
      </div>
    </motion.div>
  );
};

export default AnalysisOptions;
