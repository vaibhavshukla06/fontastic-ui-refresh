
import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BarChart3, FileType, Download, ArrowRight, Star, Check, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import { FontContext, FontMetrics } from '@/contexts/FontContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import {
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend
} from 'recharts';
import html2canvas from 'html2canvas';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

// Mock data for visualizations
const fontPersonalityData = [
  { trait: 'Professional', value: 80 },
  { trait: 'Elegant', value: 65 },
  { trait: 'Friendly', value: 45 },
  { trait: 'Playful', value: 30 },
  { trait: 'Modern', value: 70 },
  { trait: 'Traditional', value: 50 },
];

const weightDistributionData = [
  { name: 'Thin', weight: 15 },
  { name: 'Light', weight: 25 },
  { name: 'Regular', weight: 40 },
  { name: 'Medium', weight: 30 },
  { name: 'Bold', weight: 20 },
  { name: 'Black', weight: 10 },
];

const characterProportionsData = [
  { subject: 'Ascender', A: 80, fullMark: 100 },
  { subject: 'Descender', A: 55, fullMark: 100 },
  { subject: 'X-Height', A: 70, fullMark: 100 },
  { subject: 'Width', A: 65, fullMark: 100 },
  { subject: 'Contrast', A: 45, fullMark: 100 },
  { subject: 'Counter', A: 60, fullMark: 100 },
];

// Character set data
const characterSetInfo = {
  latin: 'Complete (220 glyphs)',
  numerals: 'Proportional and Tabular',
  symbols: 'Basic (+currency)',
  punctuation: 'Complete',
  languages: 'Latin-based (Western European)'
};

// OpenType features
const openTypeFeatures = [
  'liga - Standard Ligatures',
  'kern - Kerning',
  'frac - Fractions',
  'smcp - Small Capitals'
];

// Mock personality analysis
const personalityAnalysis = 
  "This font projects considerable formality and seriousness, has a welcoming and approachable quality, has a somewhat gentle character, exudes sophistication and elegance, has somewhat traditional characteristics, and has a touch of playfulness.";

// Mock recommended use cases
const recommendedUses = [
  "Business documents and presentations",
  "Formal invitations",
  "Book covers and interior text",
  "Academic publications"
];

const notRecommendedUses = [
  "Children's publications",
  "Casual social media content",
  "Mobile interfaces requiring compact text",
  "Display text at very small sizes"
];

const AnalysisResults = () => {
  const [activeTab, setActiveTab] = useState('fullReport');
  const { fontFile, fontName, fontMetrics, setFontMetrics } = useContext(FontContext);
  const navigate = useNavigate();
  const visualizationsRef = useRef<HTMLDivElement>(null);
  
  // Redirect if no font file is uploaded
  useEffect(() => {
    if (!fontFile) {
      navigate('/');
    } else if (!fontMetrics) {
      // Mock font metrics data generation on first load if not set
      setFontMetrics({
        xHeight: '0.52 em',
        capHeight: '0.72 em',
        ascender: '0.82 em',
        descender: '0.22 em',
        contrast: 'Medium (3.5)',
        strokeTerminals: 'Rounded',
        shape: 'Moderately curvy',
        personality: {
          formality: 75,
          approachability: 65,
          gentleness: 60,
          sophistication: 80,
          traditionality: 55,
          playfulness: 35
        },
        recommendedUses: recommendedUses,
        notRecommendedUses: notRecommendedUses
      });
    }
  }, [fontFile, navigate, fontMetrics, setFontMetrics]);
  
  // Function to handle downloading all visualizations
  const handleDownloadVisualizations = async () => {
    if (!visualizationsRef.current) {
      toast.error('Could not find visualizations to download');
      return;
    }

    try {
      toast.info('Preparing visualizations for download...', {
        description: 'This may take a few seconds',
      });
      
      const zip = new JSZip();
      const chartElements = visualizationsRef.current.querySelectorAll('.visualization-chart');
      
      if (chartElements.length === 0) {
        toast.error('No visualizations found to download');
        return;
      }
      
      // Convert each chart to canvas and add to zip
      for (let i = 0; i < chartElements.length; i++) {
        const chart = chartElements[i] as HTMLElement;
        const canvas = await html2canvas(chart, {
          backgroundColor: '#FFFFFF',
          scale: 2, // Better quality
        });
        
        // Convert canvas to blob
        const blob = await new Promise<Blob>((resolve) => {
          canvas.toBlob((blob) => {
            if (blob) resolve(blob);
            else resolve(new Blob([''], { type: 'image/png' }));
          }, 'image/png');
        });
        
        // Add to zip
        const chartName = chart.getAttribute('data-name') || `chart-${i+1}`;
        zip.file(`${fontName || 'font'}-${chartName}.png`, blob);
      }
      
      // Generate and download the zip file
      const content = await zip.generateAsync({ type: 'blob' });
      saveAs(content, `${fontName || 'font'}-visualizations.zip`);
      
      toast.success('All visualizations downloaded successfully', {
        description: 'Visualizations have been saved to your downloads folder',
        position: 'bottom-right',
      });
    } catch (error) {
      console.error('Error downloading visualizations:', error);
      toast.error('Failed to download visualizations', {
        description: 'An unexpected error occurred',
      });
    }
  };
  
  // Mock data - in a real app this would come from the font analysis
  const fontData = {
    name: fontName || 'Font Analysis',
    format: fontFile?.name.endsWith('.ttf') ? 'TrueType' : 
            fontFile?.name.endsWith('.otf') ? 'OpenType' : 
            fontFile?.name.endsWith('.woff') ? 'WOFF' :
            fontFile?.name.endsWith('.woff2') ? 'WOFF2' : 'Unknown',
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
      
      <main className="container mx-auto px-4 pt-20">
        <motion.div 
          className="flex justify-between items-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => navigate('/')}
              className="rounded-full"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
            </Button>
            <h1 className="text-3xl font-bold text-foreground">Font Analysis Results</h1>
          </div>
          <Link to="/">
            <Button className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2">
              <FileType className="w-4 h-4" />
              Analyze Another Font
            </Button>
          </Link>
        </motion.div>
        
        <Tabs defaultValue="fullReport" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6 mx-auto flex justify-center w-auto">
            <TabsTrigger value="fullReport" className="flex items-center gap-2">
              <FileType className="w-5 h-5" />
              Full Report
            </TabsTrigger>
            <TabsTrigger value="visualizations" className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Visualizations
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="fullReport" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main report content */}
              <motion.div 
                className="glass-card rounded-xl p-6 shadow-lg lg:col-span-2"
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
                
                {/* Basic Metrics */}
                <motion.div 
                  className="mt-8"
                  variants={itemVariants}
                >
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Info className="w-5 h-5 text-primary" />
                    Font Metrics
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-white/60 p-4 rounded-lg shadow-sm">
                      <div className="text-muted-foreground mb-1">Weight</div>
                      <div className="font-medium">{fontData.weight}</div>
                    </div>
                    
                    <div className="bg-white/60 p-4 rounded-lg shadow-sm">
                      <div className="text-muted-foreground mb-1">Width</div>
                      <div className="font-medium">{fontData.width}</div>
                    </div>

                    <div className="bg-white/60 p-4 rounded-lg shadow-sm">
                      <div className="text-muted-foreground mb-1">X-Height</div>
                      <div className="font-medium">{fontMetrics?.xHeight || '0.52 em'}</div>
                    </div>
                    
                    <div className="bg-white/60 p-4 rounded-lg shadow-sm">
                      <div className="text-muted-foreground mb-1">Cap Height</div>
                      <div className="font-medium">{fontMetrics?.capHeight || '0.72 em'}</div>
                    </div>

                    <div className="bg-white/60 p-4 rounded-lg shadow-sm">
                      <div className="text-muted-foreground mb-1">Ascender</div>
                      <div className="font-medium">{fontMetrics?.ascender || '0.82 em'}</div>
                    </div>

                    <div className="bg-white/60 p-4 rounded-lg shadow-sm">
                      <div className="text-muted-foreground mb-1">Descender</div>
                      <div className="font-medium">{fontMetrics?.descender || '0.22 em'}</div>
                    </div>

                    <div className="bg-white/60 p-4 rounded-lg shadow-sm">
                      <div className="text-muted-foreground mb-1">Contrast</div>
                      <div className="font-medium">{fontMetrics?.contrast || 'Medium (3.5)'}</div>
                    </div>

                    <div className="bg-white/60 p-4 rounded-lg shadow-sm">
                      <div className="text-muted-foreground mb-1">Stroke Terminals</div>
                      <div className="font-medium">{fontMetrics?.strokeTerminals || 'Rounded'}</div>
                    </div>

                    <div className="bg-white/60 p-4 rounded-lg shadow-sm">
                      <div className="text-muted-foreground mb-1">Shape</div>
                      <div className="font-medium">{fontMetrics?.shape || 'Moderately curvy'}</div>
                    </div>
                  </div>
                </motion.div>
                
                {/* Character Set Information */}
                <motion.div 
                  className="mt-8"
                  variants={itemVariants}
                >
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    Character Set
                  </h3>
                  
                  <div className="bg-white/60 p-5 rounded-lg mb-8 shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(characterSetInfo).map(([key, value], index) => (
                        <div key={index} className="flex justify-between">
                          <span className="capitalize text-muted-foreground">{key}:</span>
                          <span className="font-medium">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
                
                {/* OpenType Features */}
                <motion.div 
                  className="mt-8"
                  variants={itemVariants}
                >
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <FileType className="w-5 h-5 text-primary" />
                    OpenType Features
                  </h3>
                  
                  <div className="bg-white/60 p-5 rounded-lg shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {openTypeFeatures.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-primary"></div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Personality Analysis */}
                <motion.div 
                  className="mt-8"
                  variants={itemVariants}
                >
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Star className="w-5 h-5 text-primary" />
                    Personality Analysis
                  </h3>
                  
                  <div className="bg-white/60 p-5 rounded-lg shadow-sm">
                    <p className="text-muted-foreground italic">
                      {personalityAnalysis}
                    </p>
                  </div>
                </motion.div>
                
                {/* Font Sample */}
                <motion.div 
                  className="mt-8"
                  variants={itemVariants}
                >
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <FileType className="w-5 h-5 text-primary" />
                    Font Sample
                  </h3>
                  
                  <div className="bg-white/60 p-5 rounded-lg shadow-sm" style={{ fontFamily: fontName }}>
                    <p className="text-3xl mb-3">ABCDEFGHIJKLM</p>
                    <p className="text-3xl mb-5">abcdefghijklm</p>
                    <p className="text-xl mb-3">The quick brown fox jumps over the lazy dog.</p>
                    <p className="text-lg">0123456789 !@#$%^&*()</p>
                  </div>
                </motion.div>
              </motion.div>
              
              {/* Right sidebar with use cases */}
              <motion.div 
                className="glass-card rounded-xl p-6 shadow-lg h-fit lg:sticky lg:top-24"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  Recommended Use Cases
                </h3>
                
                <div className="space-y-3 mb-6">
                  <div className="bg-white/60 p-4 rounded-lg shadow-sm">
                    <h4 className="font-medium text-primary mb-3">Suitable For:</h4>
                    <ul className="space-y-2">
                      {(fontMetrics?.recommendedUses || recommendedUses).map((use, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <ArrowRight className="w-3 h-3 text-primary flex-shrink-0" />
                          <span className="text-sm">{use}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-white/60 p-4 rounded-lg shadow-sm">
                    <h4 className="font-medium text-destructive mb-3">Less Suitable For:</h4>
                    <ul className="space-y-2">
                      {(fontMetrics?.notRecommendedUses || notRecommendedUses).map((use, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <ArrowRight className="w-3 h-3 text-destructive flex-shrink-0" />
                          <span className="text-sm">{use}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-3 mt-8">
                  <h3 className="text-xl font-semibold mb-4">Actions</h3>
                  
                  <Link to="/compare" className="action-button">
                    <BarChart3 className="w-5 h-5" />
                    Compare With Other Fonts
                  </Link>
                  
                  <button 
                    className="action-button"
                    onClick={handleDownloadVisualizations}
                  >
                    <Download className="w-5 h-5" />
                    Download All Visualizations
                  </button>
                </div>
              </motion.div>
            </div>
          </TabsContent>
          
          <TabsContent value="visualizations" className="mt-0">
            <div ref={visualizationsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Font Personality Traits */}
              <Card className="shadow-md visualization-chart" data-name="personality-traits">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Font Personality Traits</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={fontPersonalityData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="trait" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#4f46e5" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              {/* Weight Distribution */}
              <Card className="shadow-md visualization-chart" data-name="weight-distribution">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Weight Distribution</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={weightDistributionData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="weight" fill="#22c55e" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              {/* Character Proportions */}
              <Card className="shadow-md visualization-chart lg:col-span-2" data-name="character-proportions">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Character Proportions</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={characterProportionsData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} />
                        <Radar name={fontData.name} dataKey="A" stroke="#f43f5e" fill="#f43f5e" fillOpacity={0.6} />
                        <Legend />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
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
