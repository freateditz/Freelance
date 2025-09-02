import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "./components/ui/avatar";
import { Badge } from "./components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { 
  Star, 
  Search, 
  Menu, 
  User, 
  Briefcase, 
  MessageSquare, 
  Settings, 
  MapPin,
  Clock,
  DollarSign,
  Users,
  Award,
  Filter,
  Grid3X3,
  List,
  Heart,
  Share2,
  ChevronRight,
  Code,
  Palette,
  PenTool,
  Megaphone,
  Camera,
  Music,
  Zap,
  Globe,
  CheckCircle,
  TrendingUp,
  Shield,
  ArrowRight,
  Play,
  Quote,
  Eye,
  Download,
  Plus,
  Edit,
  Trash2,
  Send,
  Phone,
  Mail,
  Calendar,
  FileText,
  BarChart3,
  Target,
  Handshake,
  Upload,
  Save,
  X,
  Building2,
  GraduationCap,
  Github,
  Linkedin,
  Twitter,
  Book,
  Image as ImageIcon,
  Video,
  File,
  UserPlus,
  LogIn,
  ArrowLeft,
  AlertCircle,
  Folder,
  Monitor,
  Smartphone,
  Layout,
  Paintbrush,
  BrainCircuit
} from "lucide-react";

// Mock data for the pages
const mockFreelancers = [
  {
    id: 1,
    name: "Sarah Johnson",
    title: "Full Stack Developer",
    rating: 4.9,
    reviews: 127,
    hourlyRate: 45,
    completedProjects: 89,
    skills: ["React", "Node.js", "Python", "MongoDB", "AWS"],
    profileImage: "https://images.unsplash.com/photo-1635768229592-8c2532d33cb7?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHwyfHxwcm9mZXNzaW9uYWwlMjB3b3Jrc3BhY2V8ZW58MHx8fHwxNzU2NzQxODcwfDA&ixlib=rb-4.1.0&q=85",
    description: "Experienced full-stack developer with 5+ years in building scalable web applications. Specialized in modern React applications and cloud deployment.",
    location: "San Francisco, CA",
    responseTime: "1 hour",
    languages: ["English", "Spanish"],
    availability: "Available",
    portfolio: [
      { title: "E-commerce Platform", image: "https://images.unsplash.com/photo-1657697071046-1eef624e96e9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwyfHxmcmVlbGFuY2VyJTIwd29ya3NwYWNlfGVufDB8fHx8MTc1Njc0MTg2NXww&ixlib=rb-4.1.0&q=85" },
      { title: "Task Management App", image: "https://images.unsplash.com/photo-1657697070834-30536672247d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHw0fHxmcmVlbGFuY2VyJTIwd29ya3NwYWNlfGVufDB8fHx8MTc1Njc0MTg2NXww&ixlib=rb-4.1.0&q=85" }
    ]
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "UI/UX Designer & Brand Strategist",
    rating: 4.8,
    reviews: 93,
    hourlyRate: 40,
    completedProjects: 76,
    skills: ["Figma", "Adobe XD", "Sketch", "Prototyping", "Brand Design"],
    profileImage: "https://images.unsplash.com/photo-1755352425808-b8223a330f15?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwxfHxmcmVlbGFuY2VyJTIwd29ya3NwYWNlfGVufDB8fHx8MTc1Njc0MTg2NXww&ixlib=rb-4.1.0&q=85",
    description: "Creative designer focused on user-centered design and modern interfaces. I help businesses create memorable brand experiences.",
    location: "New York, NY",
    responseTime: "2 hours",
    languages: ["English", "Mandarin"],
    availability: "Available",
    portfolio: [
      { title: "Mobile App Design", image: "https://images.unsplash.com/photo-1753162657289-6569cd1da479?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB0ZWFtJTIwY29sbGFib3JhdGlvbnxlbnwwfHx8fDE3NTY3NDI3OTF8MA&ixlib=rb-4.1.0&q=85" },
      { title: "Brand Identity System", image: "https://images.unsplash.com/photo-1670851810697-68ddb4ecae1c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHw0fHxwcm9mZXNzaW9uYWwlMjB0ZWFtJTIwY29sbGFib3JhdGlvbnxlbnwwfHx8fDE3NTY3NDI3OTF8MA&ixlib=rb-4.1.0&q=85" }
    ]
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    title: "Content Marketing Specialist",
    rating: 4.9,
    reviews: 156,
    hourlyRate: 35,
    completedProjects: 134,
    skills: ["Content Writing", "SEO", "Social Media", "Email Marketing", "Analytics"],
    profileImage: "https://images.unsplash.com/photo-1739287088635-444554e7ac0e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHw0fHxwcm9mZXNzaW9uYWwlMjB3b3Jrc3BhY2V8ZW58MHx8fHwxNzU2NzQxODcwfDA&ixlib=rb-4.1.0&q=85",
    description: "Professional content writer and marketing strategist specializing in tech, lifestyle, and business content that converts.",
    location: "Austin, TX",
    responseTime: "30 minutes",
    languages: ["English", "Spanish", "Portuguese"],
    availability: "Available",
    portfolio: [
      { title: "Tech Blog Content", image: "https://images.unsplash.com/photo-1590650467980-8eadfa86ff48?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHwzfHxwcm9mZXNzaW9uYWwlMjB0ZWFtJTIwY29sbGFib3JhdGlvbnxlbnwwfHx8fDE3NTY3NDI3OTF8MA&ixlib=rb-4.1.0&q=85" },
      { title: "Social Media Campaign", image: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHwyfHxidXNpbmVzcyUyMHRlYW18ZW58MHx8fHwxNzU2NzQyNzk5fDA&ixlib=rb-4.1.0&q=85" }
    ]
  },
  {
    id: 4,
    name: "David Kim",
    title: "Digital Marketing Consultant",
    rating: 4.7,
    reviews: 82,
    hourlyRate: 50,
    completedProjects: 67,
    skills: ["Google Ads", "Facebook Ads", "SEO", "Analytics", "Conversion Optimization"],
    profileImage: "https://images.pexels.com/photos/8472496/pexels-photo-8472496.jpeg",
    description: "Data-driven digital marketer with expertise in paid advertising and growth strategies. I help businesses scale profitably.",
    location: "Los Angeles, CA",
    responseTime: "1 hour",
    languages: ["English", "Korean"],
    availability: "Available",
    portfolio: [
      { title: "PPC Campaign Results", image: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHRlYW18ZW58MHx8fHwxNzU2NzQyNzk5fDA&ixlib=rb-4.1.0&q=85" },
      { title: "Analytics Dashboard", image: "https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHw0fHxidXNpbmVzcyUyMHRlYW18ZW58MHx8fHwxNzU2NzQyNzk5fDA&ixlib=rb-4.1.0&q=85" }
    ]
  }
];

const mockServices = [
  {
    id: 1,
    title: "I will develop a full-stack web application with modern technologies",
    freelancer: "Sarah Johnson",
    freelancerId: 1,
    price: 500,
    rating: 4.9,
    reviews: 42,
    image: "https://images.unsplash.com/photo-1657697071046-1eef624e96e9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwyfHxmcmVlbGFuY2VyJTIwd29ya3NwYWNlfGVufDB8fHx8MTc1Njc0MTg2NXww&ixlib=rb-4.1.0&q=85",
    deliveryTime: "7 days",
    category: "Development",
    tags: ["React", "Node.js", "Full Stack"],
    description: "Professional full-stack web application development using modern technologies like React, Node.js, and cloud deployment."
  },
  {
    id: 2,
    title: "I will design modern UI/UX for your mobile app or website",
    freelancer: "Michael Chen",
    freelancerId: 2,
    price: 350,
    rating: 4.8,
    reviews: 38,
    image: "https://images.unsplash.com/photo-1753162657289-6569cd1da479?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB0ZWFtJTIwY29sbGFib3JhdGlvbnxlbnwwfHx8fDE3NTY3NDI3OTF8MA&ixlib=rb-4.1.0&q=85",
    deliveryTime: "5 days",
    category: "Design",
    tags: ["UI/UX", "Mobile Design", "Figma"],
    description: "Create stunning, user-friendly interfaces for your mobile app or website with modern design principles."
  },
  {
    id: 3,
    title: "I will write engaging content and SEO blog posts for your business",
    freelancer: "Emily Rodriguez",
    freelancerId: 3,
    price: 150,
    rating: 4.9,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1590650467980-8eadfa86ff48?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHwzfHxwcm9mZXNzaW9uYWwlMjB0ZWFtJTIwY29sbGFib3JhdGlvbnxlbnwwfHx8fDE3NTY3NDI3OTF8MA&ixlib=rb-4.1.0&q=85",
    deliveryTime: "3 days",
    category: "Writing",
    tags: ["Content Writing", "SEO", "Blog Posts"],
    description: "High-quality, SEO-optimized content that engages your audience and drives organic traffic to your website."
  },
  {
    id: 4,
    title: "I will create and manage your Google Ads campaigns for maximum ROI",
    freelancer: "David Kim",
    freelancerId: 4,
    price: 400,
    rating: 4.7,
    reviews: 34,
    image: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHRlYW18ZW58MHx8fHwxNzU2NzQyNzk5fDA&ixlib=rb-4.1.0&q=85",
    deliveryTime: "5 days",
    category: "Marketing",
    tags: ["Google Ads", "PPC", "Marketing"],
    description: "Professional Google Ads campaign setup and management to drive qualified traffic and maximize your advertising ROI."
  }
];

// Simple Navigation Component 
const Navigation = () => (
  <nav className="bg-white/10 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50 shadow-lg shadow-emerald-500/5">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
          FreelanceHub
        </Link>
        <div className="flex space-x-8">
          <Link to="/browse" className="text-slate-800 hover:text-emerald-600 font-medium transition-colors">Browse</Link>
          <Link to="/services" className="text-slate-800 hover:text-emerald-600 font-medium transition-colors">Services</Link>
          <Link to="/post-job" className="text-slate-800 hover:text-emerald-600 font-medium transition-colors">Post Job</Link>
          <Link to="/messages" className="text-slate-800 hover:text-emerald-600 font-medium transition-colors">Messages</Link>
        </div>
      </div>
    </div>
  </nav>
);

// Complete Post Job Page
const PostJobPage = () => {
  const [jobData, setJobData] = useState({
    title: "",
    category: "",
    subcategory: "",
    description: "",
    skills: [],
    budget: "",
    budgetType: "fixed", // fixed or hourly
    timeline: "",
    experience: "",
    attachments: []
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { 
      id: "development", 
      name: "Programming & Tech", 
      subcategories: ["Web Development", "Mobile Development", "Desktop Development", "AI/ML", "Data Science"]
    },
    { 
      id: "design", 
      name: "Graphics & Design", 
      subcategories: ["Logo Design", "Web Design", "UI/UX Design", "Print Design", "3D Design"]
    },
    { 
      id: "writing", 
      name: "Writing & Translation", 
      subcategories: ["Content Writing", "Copywriting", "Technical Writing", "Translation", "Proofreading"]
    },
    { 
      id: "marketing", 
      name: "Digital Marketing", 
      subcategories: ["Social Media Marketing", "SEO", "PPC Advertising", "Email Marketing", "Content Marketing"]
    }
  ];

  const skillOptions = [
    "JavaScript", "React", "Node.js", "Python", "Java", "PHP", "C++",
    "UI/UX Design", "Graphic Design", "Figma", "Adobe Creative Suite",
    "Content Writing", "SEO", "Digital Marketing", "Social Media",
    "Video Editing", "Photography", "3D Modeling", "Animation"
  ];

  const handleSkillToggle = (skill) => {
    setJobData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill) 
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      alert("Job posted successfully! Freelancers will start sending proposals soon.");
      setIsSubmitting(false);
      // Reset form or redirect
      setJobData({
        title: "",
        category: "",
        subcategory: "",
        description: "",
        skills: [],
        budget: "",
        budgetType: "fixed",
        timeline: "",
        experience: "",
        attachments: []
      });
      setCurrentStep(1);
    }, 2000);
  };

  const nextStep = () => setCurrentStep(Math.min(currentStep + 1, 3));
  const prevStep = () => setCurrentStep(Math.max(currentStep - 1, 1));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-indigo-50/50 to-purple-50/50"></div>
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 25px 25px, rgba(59, 130, 246, 0.1) 2px, transparent 0)`,
        backgroundSize: '50px 50px'
      }}></div>

      <Navigation />
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Post a New Job
          </h1>
          <p className="text-xl text-slate-600">Find the perfect freelancer for your project</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4 mb-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                  currentStep >= step 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                    : 'bg-white/30 backdrop-blur-sm text-slate-400 border border-white/30'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-16 h-1 mx-2 rounded-full transition-all duration-300 ${
                    currentStep > step ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-white/30'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center text-sm text-slate-600">
            Step {currentStep} of 3: {
              currentStep === 1 ? 'Project Details' : 
              currentStep === 2 ? 'Requirements' : 
              'Budget & Timeline'
            }
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl shadow-blue-500/20 p-8 border border-white/30">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Project Details */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-lg font-semibold text-slate-700 mb-3">Project Title</label>
                  <Input
                    placeholder="e.g., Build a modern e-commerce website"
                    value={jobData.title}
                    onChange={(e) => setJobData({...jobData, title: e.target.value})}
                    className="h-14 text-lg bg-white/30 backdrop-blur-sm border-white/30 focus:border-blue-500"
                    required
                  />
                  <p className="text-sm text-slate-500 mt-2">Write a clear, descriptive title that explains what you need</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-lg font-semibold text-slate-700 mb-3">Category</label>
                    <select 
                      value={jobData.category}
                      onChange={(e) => setJobData({...jobData, category: e.target.value, subcategory: ""})}
                      className="w-full h-14 bg-white/30 backdrop-blur-sm border border-white/30 rounded-md px-4 text-lg focus:border-blue-500 focus:outline-none"
                      required
                    >
                      <option value="">Select category</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-lg font-semibold text-slate-700 mb-3">Subcategory</label>
                    <select 
                      value={jobData.subcategory}
                      onChange={(e) => setJobData({...jobData, subcategory: e.target.value})}
                      className="w-full h-14 bg-white/30 backdrop-blur-sm border border-white/30 rounded-md px-4 text-lg focus:border-blue-500 focus:outline-none"
                      required
                      disabled={!jobData.category}
                    >
                      <option value="">Select subcategory</option>
                      {jobData.category && categories.find(c => c.id === jobData.category)?.subcategories.map(sub => (
                        <option key={sub} value={sub}>{sub}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-lg font-semibold text-slate-700 mb-3">Project Description</label>
                  <textarea
                    placeholder="Describe your project in detail. Include what you want to achieve, any specific requirements, and what success looks like..."
                    value={jobData.description}
                    onChange={(e) => setJobData({...jobData, description: e.target.value})}
                    rows={6}
                    className="w-full bg-white/30 backdrop-blur-sm border border-white/30 rounded-md px-4 py-3 text-lg focus:border-blue-500 focus:outline-none resize-none"
                    required
                  />
                  <p className="text-sm text-slate-500 mt-2">Minimum 100 characters. Be specific about what you need.</p>
                </div>

                <div className="flex justify-end">
                  <Button 
                    type="button"
                    onClick={nextStep}
                    className="h-12 px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg"
                  >
                    Continue
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Requirements */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-lg font-semibold text-slate-700 mb-3">Required Skills</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-4 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30 max-h-60 overflow-y-auto">
                    {skillOptions.map((skill) => (
                      <div
                        key={skill}
                        onClick={() => handleSkillToggle(skill)}
                        className={`cursor-pointer px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          jobData.skills.includes(skill)
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                            : 'bg-white/40 backdrop-blur-sm text-slate-700 hover:bg-white/60'
                        }`}
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-slate-500 mt-2">{jobData.skills.length} skills selected</p>
                </div>

                <div>
                  <label className="block text-lg font-semibold text-slate-700 mb-3">Experience Level Required</label>
                  <div className="grid md:grid-cols-3 gap-4">
                    {[
                      { value: "entry", label: "Entry Level", desc: "New freelancers with basic skills" },
                      { value: "intermediate", label: "Intermediate", desc: "Experienced freelancers" },
                      { value: "expert", label: "Expert", desc: "Top-tier professionals" }
                    ].map((level) => (
                      <div
                        key={level.value}
                        onClick={() => setJobData({...jobData, experience: level.value})}
                        className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-300 ${
                          jobData.experience === level.value
                            ? 'border-blue-500 bg-blue-50/50 backdrop-blur-sm shadow-xl'
                            : 'border-white/30 bg-white/30 backdrop-blur-sm hover:border-blue-300'
                        }`}
                      >
                        <h4 className="font-semibold text-slate-900 mb-1">{level.label}</h4>
                        <p className="text-sm text-slate-600">{level.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-lg font-semibold text-slate-700 mb-3">Project Files (Optional)</label>
                  <div className="border-2 border-dashed border-white/30 rounded-xl p-8 text-center bg-white/20 backdrop-blur-sm hover:border-blue-300 transition-colors">
                    <Upload className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-600 mb-2">Drop files here or click to browse</p>
                    <p className="text-sm text-slate-500">Supported formats: PDF, DOC, XLS, PNG, JPG (Max 25MB each)</p>
                    <Button type="button" variant="outline" className="mt-4 bg-white/30 backdrop-blur-sm border-white/30">
                      Choose Files
                    </Button>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button 
                    type="button"
                    onClick={prevStep}
                    variant="outline"
                    className="h-12 px-8 bg-white/30 backdrop-blur-sm border-white/30 hover:bg-white/40"
                  >
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    Back
                  </Button>
                  <Button 
                    type="button"
                    onClick={nextStep}
                    className="h-12 px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    Continue
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Budget & Timeline */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-lg font-semibold text-slate-700 mb-3">Budget Type</label>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div
                      onClick={() => setJobData({...jobData, budgetType: "fixed"})}
                      className={`cursor-pointer p-6 rounded-xl border-2 transition-all duration-300 ${
                        jobData.budgetType === "fixed"
                          ? 'border-blue-500 bg-blue-50/50 backdrop-blur-sm shadow-xl'
                          : 'border-white/30 bg-white/30 backdrop-blur-sm hover:border-blue-300'
                      }`}
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <DollarSign className="h-6 w-6 text-blue-600" />
                        <h4 className="font-semibold text-slate-900">Fixed Price</h4>
                      </div>
                      <p className="text-sm text-slate-600">Pay a fixed amount for the entire project</p>
                    </div>
                    
                    <div
                      onClick={() => setJobData({...jobData, budgetType: "hourly"})}
                      className={`cursor-pointer p-6 rounded-xl border-2 transition-all duration-300 ${
                        jobData.budgetType === "hourly"
                          ? 'border-blue-500 bg-blue-50/50 backdrop-blur-sm shadow-xl'
                          : 'border-white/30 bg-white/30 backdrop-blur-sm hover:border-blue-300'
                      }`}
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <Clock className="h-6 w-6 text-purple-600" />
                        <h4 className="font-semibold text-slate-900">Hourly Rate</h4>
                      </div>
                      <p className="text-sm text-slate-600">Pay based on time worked</p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-lg font-semibold text-slate-700 mb-3">
                    Budget {jobData.budgetType === "fixed" ? "Amount" : "Range per Hour"}
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                    <Input
                      type="number"
                      placeholder={jobData.budgetType === "fixed" ? "5000" : "25-50"}
                      value={jobData.budget}
                      onChange={(e) => setJobData({...jobData, budget: e.target.value})}
                      className="pl-12 h-14 text-lg bg-white/30 backdrop-blur-sm border-white/30 focus:border-blue-500"
                      required
                    />
                  </div>
                  <p className="text-sm text-slate-500 mt-2">
                    {jobData.budgetType === "fixed" 
                      ? "Set your total project budget" 
                      : "Specify your hourly rate range"
                    }
                  </p>
                </div>

                <div>
                  <label className="block text-lg font-semibold text-slate-700 mb-3">Project Timeline</label>
                  <select 
                    value={jobData.timeline}
                    onChange={(e) => setJobData({...jobData, timeline: e.target.value})}
                    className="w-full h-14 bg-white/30 backdrop-blur-sm border border-white/30 rounded-md px-4 text-lg focus:border-blue-500 focus:outline-none"
                    required
                  >
                    <option value="">Select timeline</option>
                    <option value="asap">ASAP (1-3 days)</option>
                    <option value="week">Within a week</option>
                    <option value="month">Within a month</option>
                    <option value="quarter">1-3 months</option>
                    <option value="flexible">I'm flexible</option>
                  </select>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/50 backdrop-blur-sm rounded-2xl p-6">
                  <h4 className="font-semibold text-slate-900 mb-3">Project Summary</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Title:</span> {jobData.title}</p>
                    <p><span className="font-medium">Category:</span> {jobData.subcategory}</p>
                    <p><span className="font-medium">Skills:</span> {jobData.skills.join(", ")}</p>
                    <p><span className="font-medium">Budget:</span> ${jobData.budget} ({jobData.budgetType})</p>
                    <p><span className="font-medium">Timeline:</span> {jobData.timeline}</p>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button 
                    type="button"
                    onClick={prevStep}
                    variant="outline"
                    className="h-12 px-8 bg-white/30 backdrop-blur-sm border-white/30 hover:bg-white/40"
                  >
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    Back
                  </Button>
                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className="h-12 px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Posting Job...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Send className="h-5 w-5" />
                        <span>Post Job</span>
                      </div>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

// Enhanced Messages Page
const MessagesPage = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messageText, setMessageText] = useState("");
  
  const conversations = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1635768229592-8c2532d33cb7?w=100&h=100&fit=crop&crop=face",
      lastMessage: "I've completed the frontend setup. Ready for review!",
      time: "2h",
      unread: 2,
      online: true,
      project: "E-commerce Website Development"
    },
    {
      id: 2,
      name: "Michael Chen",
      avatar: "https://images.unsplash.com/photo-1755352425808-b8223a330f15?w=100&h=100&fit=crop&crop=face",
      lastMessage: "Final designs are uploaded to the project folder.",
      time: "1d",
      unread: 0,
      online: false,
      project: "Mobile App UI/UX Design"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      avatar: "https://images.unsplash.com/photo-1739287088635-444554e7ac0e?w=100&h=100&fit=crop&crop=face",
      lastMessage: "Can we schedule a call to discuss the brand direction?",
      time: "2d",
      unread: 1,
      online: true,
      project: "Brand Identity Package"
    }
  ];

  const messages = [
    {
      id: 1,
      sender: "Sarah Johnson",
      message: "Hi! I wanted to update you on the progress of your e-commerce project.",
      time: "10:30 AM",
      isOwn: false
    },
    {
      id: 2,
      sender: "You",
      message: "Great! How are things going?",
      time: "10:35 AM",
      isOwn: true
    },
    {
      id: 3,
      sender: "Sarah Johnson",
      message: "I've completed the frontend setup and integrated the payment gateway. The shopping cart functionality is working perfectly.",
      time: "10:40 AM",
      isOwn: false
    },
    {
      id: 4,
      sender: "Sarah Johnson",
      message: "I've also added the inventory management system. Would you like to review it?",
      time: "10:41 AM",
      isOwn: false
    },
    {
      id: 5,
      sender: "You",
      message: "That sounds excellent! Can you send me a link to review?",
      time: "11:15 AM",
      isOwn: true
    },
    {
      id: 6,
      sender: "Sarah Johnson",
      message: "Absolutely! Here's the staging link: https://staging.yourstore.com",
      time: "11:20 AM",
      isOwn: false
    }
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (messageText.trim()) {
      // Add message logic here
      setMessageText("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-blue-50/50 to-purple-50/50"></div>
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 25px 25px, rgba(16, 185, 129, 0.1) 2px, transparent 0)`,
        backgroundSize: '50px 50px'
      }}></div>

      <Navigation />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl shadow-emerald-500/20 border border-white/30 overflow-hidden h-[calc(100vh-12rem)]">
          <div className="flex h-full">
            {/* Conversations List */}
            <div className="w-1/3 border-r border-white/20 flex flex-col">
              <div className="p-6 border-b border-white/20">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Messages</h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <Input
                    placeholder="Search conversations..."
                    className="pl-10 bg-white/30 backdrop-blur-sm border-white/30"
                  />
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation)}
                    className={`p-4 border-b border-white/10 cursor-pointer transition-all duration-200 hover:bg-white/30 ${
                      selectedConversation?.id === conversation.id ? 'bg-white/40 backdrop-blur-sm' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="relative">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={conversation.avatar} alt={conversation.name} />
                          <AvatarFallback>{conversation.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        {conversation.online && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-slate-900 truncate">{conversation.name}</h4>
                          <span className="text-xs text-slate-500">{conversation.time}</span>
                        </div>
                        <p className="text-sm text-slate-600 mb-1 truncate">{conversation.project}</p>
                        <p className="text-sm text-slate-500 truncate">{conversation.lastMessage}</p>
                      </div>
                      {conversation.unread > 0 && (
                        <div className="w-5 h-5 bg-emerald-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                          {conversation.unread}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              {selectedConversation ? (
                <>
                  {/* Chat Header */}
                  <div className="p-6 border-b border-white/20 bg-white/10 backdrop-blur-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={selectedConversation.avatar} alt={selectedConversation.name} />
                            <AvatarFallback>{selectedConversation.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          {selectedConversation.online && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-900">{selectedConversation.name}</h3>
                          <p className="text-sm text-slate-600">{selectedConversation.project}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm" className="bg-white/20 backdrop-blur-sm hover:bg-white/30">
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="bg-white/20 backdrop-blur-sm hover:bg-white/30">
                          <Video className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                          message.isOwn
                            ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white'
                            : 'bg-white/40 backdrop-blur-sm text-slate-900 border border-white/30'
                        }`}>
                          <p className="text-sm">{message.message}</p>
                          <p className={`text-xs mt-2 ${message.isOwn ? 'text-emerald-100' : 'text-slate-500'}`}>
                            {message.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="p-6 border-t border-white/20 bg-white/10 backdrop-blur-sm">
                    <form onSubmit={handleSendMessage} className="flex space-x-4">
                      <div className="flex-1 relative">
                        <Input
                          placeholder="Type your message..."
                          value={messageText}
                          onChange={(e) => setMessageText(e.target.value)}
                          className="pr-12 bg-white/30 backdrop-blur-sm border-white/30"
                        />
                        <Button 
                          type="button"
                          variant="ghost" 
                          size="sm" 
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 hover:bg-white/30"
                        >
                          <File className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button 
                        type="submit"
                        className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </form>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <MessageSquare className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">Select a conversation</h3>
                    <p className="text-slate-600">Choose a conversation from the sidebar to start messaging</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Other remaining pages with enhanced designs
const BrowseFreelancersPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [sortBy, setSortBy] = useState("rating");

  const categories = ["all", "development", "design", "writing", "marketing", "video", "music", "business"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-blue-50/50 to-purple-50/50"></div>
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 25px 25px, rgba(16, 185, 129, 0.1) 2px, transparent 0)`,
        backgroundSize: '50px 50px'
      }}></div>

      <Navigation />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">Find Talented Freelancers</h1>
          <p className="text-xl text-slate-600">Browse thousands of skilled professionals ready to work on your project</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white/20 backdrop-blur-xl rounded-2xl shadow-lg p-6 mb-8 border border-white/30">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <Input
                placeholder="Search freelancers..."
                className="pl-10 bg-white/30 backdrop-blur-sm border-white/30"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <select 
              className="bg-white/30 backdrop-blur-sm border border-white/30 rounded-md px-3 py-2 focus:border-emerald-500 focus:outline-none"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
              ))}
            </select>
            <select 
              className="bg-white/30 backdrop-blur-sm border border-white/30 rounded-md px-3 py-2 focus:border-emerald-500 focus:outline-none"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="rating">Highest Rated</option>
              <option value="price">Lowest Price</option>
              <option value="recent">Most Recent</option>
            </select>
            <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700">
              <Filter className="h-4 w-4 mr-2" />
              Apply Filters
            </Button>
          </div>
        </div>

        {/* Freelancers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockFreelancers.map((freelancer) => (
            <Link key={freelancer.id} to={`/freelancer/${freelancer.id}`}>
              <Card className="group cursor-pointer hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br from-white/25 via-white/20 to-white/15 backdrop-blur-xl border border-white/40 rounded-2xl overflow-hidden relative">
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/5 via-transparent to-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <CardContent className="p-8 relative z-10">
                  {/* Profile Section */}
                  <div className="text-center mb-6">
                    <div className="relative inline-block mb-4">
                      <div className="relative">
                        <Avatar className="w-24 h-24 mx-auto shadow-xl shadow-emerald-500/20 ring-4 ring-white/30">
                          <AvatarImage src={freelancer.profileImage} alt={freelancer.name} />
                          <AvatarFallback className="bg-gradient-to-br from-emerald-400 to-teal-500 text-white font-bold text-lg">
                            {freelancer.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        {/* Online Status */}
                        <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-gradient-to-r from-green-400 to-emerald-500 border-3 border-white rounded-full flex items-center justify-center shadow-lg">
                          <div className="w-3 h-3 bg-white rounded-full"></div>
                        </div>
                      </div>
                      {/* Verified Badge */}
                      <div className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white p-1 rounded-full shadow-lg">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                    </div>
                    
                    <h3 className="font-bold text-slate-900 text-xl mb-1 group-hover:text-emerald-700 transition-colors duration-300">
                      {freelancer.name}
                    </h3>
                    <p className="text-slate-600 text-sm font-medium mb-3 bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text">
                      {freelancer.title}
                    </p>
                    
                    {/* Rating */}
                    <div className="flex items-center justify-center space-x-1 mb-3">
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < Math.floor(freelancer.rating) ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`} 
                          />
                        ))}
                      </div>
                      <span className="font-bold text-slate-900">{freelancer.rating}</span>
                      <span className="text-slate-500 text-sm">({freelancer.reviews})</span>
                    </div>
                    
                    {/* Location */}
                    <div className="flex items-center justify-center text-sm text-slate-600 bg-white/30 backdrop-blur-sm rounded-full px-3 py-1 inline-flex">
                      <MapPin className="h-3 w-3 mr-1 text-emerald-500" />
                      {freelancer.location}
                    </div>
                  </div>
                  
                  {/* Skills Section */}
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2 justify-center">
                      {freelancer.skills.slice(0, 3).map((skill, index) => (
                        <Badge 
                          key={skill} 
                          className={`text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm border-0 transition-all duration-300 hover:scale-105 ${
                            index === 0 
                              ? 'bg-gradient-to-r from-emerald-400/20 to-teal-400/20 text-emerald-700 hover:from-emerald-400/30 hover:to-teal-400/30' 
                              : index === 1 
                              ? 'bg-gradient-to-r from-blue-400/20 to-indigo-400/20 text-blue-700 hover:from-blue-400/30 hover:to-indigo-400/30'
                              : 'bg-gradient-to-r from-purple-400/20 to-pink-400/20 text-purple-700 hover:from-purple-400/30 hover:to-pink-400/30'
                          }`}
                        >
                          {skill}
                        </Badge>
                      ))}
                      {freelancer.skills.length > 3 && (
                        <Badge className="text-xs bg-gradient-to-r from-gray-400/20 to-slate-400/20 text-slate-600 backdrop-blur-sm rounded-full px-3 py-1">
                          +{freelancer.skills.length - 3} more
                        </Badge>
                      )}
                    </div>
                    
                    {/* Stats and Pricing */}
                    <div className="bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <div className="flex items-center justify-center mb-1">
                            <DollarSign className="h-4 w-4 text-emerald-500 mr-1" />
                            <span className="text-sm text-slate-600">Starting at</span>
                          </div>
                          <div className="font-bold text-emerald-600 text-xl">
                            ${freelancer.hourlyRate}
                            <span className="text-sm text-slate-500 font-normal">/hr</span>
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center mb-1">
                            <Award className="h-4 w-4 text-blue-500 mr-1" />
                            <span className="text-sm text-slate-600">Projects</span>
                          </div>
                          <div className="font-bold text-slate-900 text-xl">
                            {freelancer.completedProjects}
                            <span className="text-sm text-slate-500 font-normal"> done</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Availability Status */}
                      <div className="mt-4 pt-3 border-t border-white/20">
                        <div className="flex items-center justify-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-sm font-medium text-emerald-600">
                            {freelancer.availability}
                          </span>
                          <Clock className="h-3 w-3 text-slate-400" />
                          <span className="text-xs text-slate-500">
                            Responds within {freelancer.responseTime}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Action Button */}
                    <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-medium py-3 rounded-xl shadow-lg shadow-emerald-500/25 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-emerald-500/30 group-hover:scale-[1.02]">
                      <User className="h-4 w-4 mr-2" />
                      View Profile
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

// Services Page
const ServicesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-blue-50/50 to-purple-50/50"></div>
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 25px 25px, rgba(16, 185, 129, 0.1) 2px, transparent 0)`,
        backgroundSize: '50px 50px'
      }}></div>

      <Navigation />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">Browse Services</h1>
          <p className="text-xl text-slate-600">Discover services from talented freelancers worldwide</p>
        </div>

        {/* Search Bar */}
        <div className="bg-white/20 backdrop-blur-xl rounded-2xl shadow-lg p-6 mb-8 border border-white/30">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <Input
                placeholder="What service are you looking for?"
                className="pl-10 h-12 bg-white/30 backdrop-blur-sm border-white/30"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button className="h-12 px-8 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700">
              Search
            </Button>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mockServices.map((service) => (
            <Link key={service.id} to={`/service/${service.id}`}>
              <Card className="cursor-pointer hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-300 hover:-translate-y-1 bg-white/20 backdrop-blur-xl border-white/30">
                <div className="aspect-video bg-slate-200 overflow-hidden rounded-t-lg">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={mockFreelancers.find(f => f.name === service.freelancer)?.profileImage} />
                      <AvatarFallback className="text-xs">{service.freelancer.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-slate-600">{service.freelancer}</span>
                  </div>
                  
                  <h3 className="font-medium text-slate-900 line-clamp-2 mb-3 text-sm hover:text-emerald-600 transition-colors">
                    {service.title}
                  </h3>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-medium">{service.rating}</span>
                      <span className="text-xs text-slate-500">({service.reviews})</span>
                    </div>
                    <Badge variant="secondary" className="text-xs bg-white/40 backdrop-blur-sm">
                      {service.category}
                    </Badge>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-bold text-slate-900">From ${service.price}</div>
                      <div className="text-xs text-slate-500">{service.deliveryTime}</div>
                    </div>
                    <Heart className="h-4 w-4 text-slate-400 hover:text-red-500 cursor-pointer transition-colors" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

// Export all components
export { PostJobPage, MessagesPage, BrowseFreelancersPage, ServicesPage };