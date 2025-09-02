import React, { useState, createContext, useContext } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate, useNavigate, Link, useParams } from "react-router-dom";

// Import components
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

// Create Auth Context
const AuthContext = createContext();

// Mock data for comprehensive demo
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

const mockTestimonials = [
  {
    id: 1,
    name: "Jennifer Walsh",
    company: "TechStart Inc.",
    avatar: "https://images.unsplash.com/photo-1670851810697-68ddb4ecae1c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHc0fHxwcm9mZXNzaW9uYWwlMjB0ZWFtJTIwY29sbGFib3JhdGlvbnxlbnwwfHx8fDE3NTY3NDI3OTF8MA&ixlib=rb-4.1.0&q=85",
    text: "FreelanceHub helped us find the perfect developer for our startup. The quality of talent and professionalism exceeded our expectations.",
    rating: 5
  },
  {
    id: 2,
    name: "Marcus Johnson",
    company: "Digital Solutions LLC",
    avatar: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHwyfHxidXNpbmVzcyUyMHRlYW18ZW58MHx8fHwxNzU2NzQyNzk5fDA&ixlib=rb-4.1.0&q=85",
    text: "As a freelancer, this platform has transformed my business. I've connected with amazing clients and grown my income significantly.",
    rating: 5
  },
  {
    id: 3,
    name: "Sarah Mitchell",
    company: "Creative Agency",
    avatar: "https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHw0fHxidXNpbmVzcyUyMHRlYW18ZW58MHx8fHwxNzU2NzQyNzk5fDA&ixlib=rb-4.1.0&q=85",
    text: "The project management tools and communication features make collaboration seamless. Highly recommended for any business.",
    rating: 5
  }
];

// Auth Provider Component
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);

  const login = (userData, type) => {
    setUser(userData);
    setUserType(type);
  };

  const logout = () => {
    setUser(null);
    setUserType(null);
  };

  return (
    <AuthContext.Provider value={{ user, userType, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Enhanced Navigation Component with Glassmorphism
const Navigation = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white/10 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50 shadow-lg shadow-emerald-500/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <div className="flex-shrink-0">
              <Link to="/">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">FreelanceHub</h1>
              </Link>
            </div>
            <div className="hidden md:flex space-x-6">
              <Link to="/browse" className="text-slate-700 hover:text-emerald-600 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-white/20">
                Find Talent
              </Link>
              <Link to="/services" className="text-slate-700 hover:text-emerald-600 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-white/20">
                Browse Services
              </Link>
              {user && user.userType !== 'client' && (
                <Link to="/post-job" className="text-slate-700 hover:text-emerald-600 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-white/20">
                  Post a Job
                </Link>
              )}
              <Link to="/how-it-works" className="text-slate-700 hover:text-emerald-600 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-white/20">
                How it Works
              </Link>
            </div>
          </div>
          
          {user ? (
            <div className="flex items-center space-x-4">
              <Link to="/messages">
                <Button variant="ghost" size="sm" className="bg-white/20 backdrop-blur-sm hover:bg-white/30 border border-white/20">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Messages
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="ghost" size="sm" className="bg-white/20 backdrop-blur-sm hover:bg-white/30 border border-white/20">
                  <Briefcase className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={logout} className="bg-white/20 backdrop-blur-sm hover:bg-white/30 border border-white/20">
                <User className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Link to="/login">
                <Button variant="ghost" size="sm" className="bg-white/20 backdrop-blur-sm hover:bg-white/30 border border-white/20">
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="sm" className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg">
                  Join Now
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

// Enhanced Home Page Component
const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "development", name: "Programming & Tech", icon: Code, color: "from-blue-500 to-blue-600", count: "2,543 services" },
    { id: "design", name: "Graphics & Design", icon: Palette, color: "from-purple-500 to-purple-600", count: "1,892 services" },
    { id: "writing", name: "Writing & Translation", icon: PenTool, color: "from-green-500 to-green-600", count: "1,456 services" },
    { id: "marketing", name: "Digital Marketing", icon: Megaphone, color: "from-orange-500 to-orange-600", count: "987 services" },
    { id: "video", name: "Video & Animation", icon: Camera, color: "from-red-500 to-red-600", count: "743 services" },
    { id: "music", name: "Music & Audio", icon: Music, color: "from-indigo-500 to-indigo-600", count: "521 services" },
    { id: "business", name: "Business", icon: Briefcase, color: "from-teal-500 to-teal-600", count: "834 services" },
    { id: "ai", name: "AI Services", icon: Zap, color: "from-yellow-500 to-yellow-600", count: "421 services" }
  ];

  const stats = [
    { label: "Talented Freelancers", value: "50,000+", icon: Users },
    { label: "Completed Projects", value: "200,000+", icon: CheckCircle },
    { label: "Client Satisfaction", value: "98%", icon: Award },
    { label: "Countries Served", value: "150+", icon: Globe }
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Post Your Project",
      description: "Tell us what you need done and we'll connect you with talented freelancers.",
      icon: FileText
    },
    {
      step: "2", 
      title: "Choose Your Freelancer",
      description: "Browse profiles, compare proposals, and select the perfect freelancer for your project.",
      icon: Search
    },
    {
      step: "3",
      title: "Collaborate & Complete",
      description: "Work together seamlessly with our built-in tools and get your project delivered on time.",
      icon: Handshake
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/80 via-blue-50/80 to-purple-50/80"></div>
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 25px 25px, rgba(16, 185, 129, 0.1) 2px, transparent 0)`,
        backgroundSize: '50px 50px'
      }}></div>
      
      <Navigation />
      
      {/* Enhanced Hero Section */}
      <section className="relative py-20 lg:py-28">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 bg-white/30 backdrop-blur-xl text-emerald-800 rounded-full text-sm font-medium border border-white/20 shadow-lg">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  #1 Freelance Marketplace
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 leading-tight">
                  Find the best
                  <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent block">freelance services</span>
                  for your business
                </h1>
                
                <p className="text-xl text-slate-600 max-w-lg leading-relaxed">
                  Connect with world-class freelancers and agencies to bring your projects to life. 
                  From web development to digital marketing, find experts for every need.
                </p>
              </div>
              
              {/* Enhanced Search Bar with Glassmorphism */}
              <div className="bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl shadow-emerald-500/20 p-3 max-w-lg border border-white/30">
                <div className="flex">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                    <Input
                      placeholder="What service are you looking for?"
                      className="pl-12 h-14 text-lg border-0 focus:ring-0 bg-transparent placeholder:text-slate-500"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button className="h-14 px-8 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 rounded-2xl shadow-lg">
                    Search
                  </Button>
                </div>
              </div>
              
              {/* Trust Indicators */}
              <div className="flex items-center space-x-6 text-sm text-slate-600">
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-emerald-600" />
                  <span>Secure payments</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-emerald-600" />
                  <span>Quality guarantee</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-emerald-600" />
                  <span>24/7 support</span>
                </div>
              </div>
            </div>
            
            {/* Enhanced Hero Image with Glassmorphism */}
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden bg-white/20 backdrop-blur-xl shadow-2xl shadow-emerald-500/20 relative border border-white/30">
                <img 
                  src="https://images.unsplash.com/photo-1718220216044-006f43e3a9b1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwxfHx3b3Jrc3BhY2UlMjBwcm9mZXNzaW9uYWx8ZW58MHx8fHwxNzU2NzQ0Mzg2fDA&ixlib=rb-4.1.0&q=85"
                  alt="Professional workspace"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/20 to-transparent"></div>
              </div>
              
              {/* Floating Glass Cards */}
              <div className="absolute -bottom-6 -left-6 bg-white/20 backdrop-blur-xl rounded-2xl p-4 shadow-2xl border border-white/30">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-slate-700">2,847 projects completed today</span>
                </div>
              </div>
              
              <div className="absolute -top-6 -right-6 bg-white/20 backdrop-blur-xl rounded-2xl p-4 shadow-2xl border border-white/30">
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium text-slate-700">4.9/5 average rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section with Glassmorphism */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center bg-white/20 backdrop-blur-xl rounded-2xl p-8 shadow-xl shadow-emerald-500/10 border border-white/30 hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-300 group">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">{stat.value}</div>
                  <div className="text-slate-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Categories Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Explore by Category</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Discover professional services across every industry and skill level
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Link key={category.id} to={`/browse?category=${category.id}`}>
                  <div className="group cursor-pointer bg-white/20 backdrop-blur-xl rounded-2xl p-8 shadow-xl shadow-slate-500/10 border border-white/30 hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-300 hover:-translate-y-2">
                    <div className="text-center">
                      <div className={`w-20 h-20 bg-gradient-to-br ${category.color} rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <IconComponent className="h-10 w-10 text-white" />
                      </div>
                      <h3 className="font-bold text-slate-900 text-lg mb-2">{category.name}</h3>
                      <p className="text-slate-500 text-sm">{category.count}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Services Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-16">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Featured Services</h2>
              <p className="text-xl text-slate-600">Hand-picked services from our top-rated freelancers</p>
            </div>
            <Link to="/services">
              <Button className="hidden md:flex bg-white/20 backdrop-blur-xl hover:bg-white/30 border border-white/30 text-slate-700">
                View All Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {mockServices.map((service) => (
              <Link key={service.id} to={`/service/${service.id}`}>
                <div className="group cursor-pointer bg-white/20 backdrop-blur-xl rounded-2xl shadow-xl shadow-slate-500/10 border border-white/30 hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                  <div className="aspect-video bg-slate-200 overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={mockFreelancers.find(f => f.name === service.freelancer)?.profileImage} />
                        <AvatarFallback>{service.freelancer.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-slate-600">{service.freelancer}</span>
                    </div>
                    
                    <h3 className="font-semibold text-slate-900 line-clamp-2 mb-3 group-hover:text-emerald-600 transition-colors">
                      {service.title}
                    </h3>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{service.rating}</span>
                        <span className="text-sm text-slate-500">({service.reviews})</span>
                      </div>
                      <Badge className="bg-white/50 backdrop-blur-sm text-slate-700 text-xs">
                        {service.category}
                      </Badge>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-right">
                        <div className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">From ${service.price}</div>
                        <div className="text-sm text-slate-500">{service.deliveryTime}</div>
                      </div>
                      <Heart className="h-5 w-5 text-slate-400 hover:text-red-500 cursor-pointer transition-colors" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">What Our Clients Say</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Join thousands of satisfied clients who have found success on FreelanceHub
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {mockTestimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white/20 backdrop-blur-xl rounded-2xl p-8 shadow-xl shadow-slate-500/10 border border-white/30 hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-300">
                <div className="flex items-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <Quote className="h-10 w-10 text-emerald-600 mb-4" />
                
                <p className="text-slate-700 text-lg mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>
                
                <div className="flex items-center">
                  <Avatar className="w-12 h-12 mr-4">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-slate-900">{testimonial.name}</div>
                    <div className="text-slate-600 text-sm">{testimonial.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-600 to-teal-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/90 to-teal-700/90"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 40px 40px, rgba(255, 255, 255, 0.1) 2px, transparent 0)`,
          backgroundSize: '80px 80px'
        }}></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold mb-6">
            Ready to get started?
          </h2>
          <p className="text-2xl text-emerald-100 mb-10 max-w-3xl mx-auto">
            Join the world's largest freelance marketplace and connect with talented professionals today
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/signup">
              <Button size="lg" className="h-14 px-10 text-lg bg-white/20 backdrop-blur-xl hover:bg-white/30 border border-white/30">
                <Briefcase className="mr-2 h-6 w-6" />
                Hire Freelancers
              </Button>
            </Link>
            <Link to="/signup">
              <Button size="lg" className="h-14 px-10 text-lg bg-gradient-to-r from-white to-emerald-50 text-emerald-700 hover:from-emerald-50 hover:to-white shadow-xl">
                <User className="mr-2 h-6 w-6" />
                Start Freelancing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-slate-900/95 backdrop-blur-xl text-slate-300 py-16 relative">
        <div className="absolute inset-0 bg-slate-900/95"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-5 gap-8 mb-12">
            <div className="md:col-span-2">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-6">FreelanceHub</h3>
              <p className="text-slate-400 text-lg mb-6 max-w-md">
                The world's largest freelance marketplace. Connect with skilled professionals and get work done efficiently.
              </p>
              <div className="flex space-x-6">
                <div className="w-10 h-10 bg-slate-800/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-emerald-600 cursor-pointer transition-colors">
                  <Globe className="h-5 w-5" />
                </div>
                <div className="w-10 h-10 bg-slate-800/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-emerald-600 cursor-pointer transition-colors">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="w-10 h-10 bg-slate-800/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-emerald-600 cursor-pointer transition-colors">
                  <Phone className="h-5 w-5" />
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-6 text-lg">For Clients</h4>
              <ul className="space-y-4">
                <li><Link to="/browse" className="hover:text-white transition-colors">Find Freelancers</Link></li>
                <li><Link to="/post-job" className="hover:text-white transition-colors">Post a Job</Link></li>
                <li><Link to="/how-it-works" className="hover:text-white transition-colors">How it Works</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Success Stories</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-6 text-lg">For Freelancers</h4>
              <ul className="space-y-4">
                <li><Link to="/services" className="hover:text-white transition-colors">Find Work</Link></li>
                <li><Link to="/signup" className="hover:text-white transition-colors">Create Profile</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Success Tips</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Community</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-6 text-lg">Company</h4>
              <ul className="space-y-4">
                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Press</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-slate-400">&copy; 2025 FreelanceHub. All rights reserved.</p>
              <div className="flex space-x-8 mt-4 md:mt-0">
                <Link to="#" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</Link>
                <Link to="#" className="text-slate-400 hover:text-white transition-colors">Terms of Service</Link>
                <Link to="#" className="text-slate-400 hover:text-white transition-colors">Cookie Policy</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Modern Login Page Component
const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userType: "client"
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const userData = {
        id: 1,
        name: formData.userType === "freelancer" ? "John Freelancer" : "Jane Client",
        email: formData.email,
        userType: formData.userType
      };
      login(userData, formData.userType);
      navigate('/dashboard');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-blue-50/50 to-purple-50/50"></div>
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 25px 25px, rgba(16, 185, 129, 0.1) 2px, transparent 0)`,
        backgroundSize: '50px 50px'
      }}></div>

      <div className="relative flex min-h-screen">
        {/* Left Side - Form */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full">
            {/* Header */}
            <div className="text-center mb-8">
              <Link to="/">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">FreelanceHub</h1>
              </Link>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Welcome back!</h2>
              <p className="text-slate-600">Sign in to your account to continue your journey</p>
            </div>

            {/* Login Form Card */}
            <div className="bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl shadow-emerald-500/20 p-8 border border-white/30">
              {/* User Type Selection */}
              <div className="mb-8">
                <Tabs value={formData.userType} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 h-12 bg-white/30 backdrop-blur-sm">
                    <TabsTrigger 
                      value="client" 
                      onClick={() => setFormData({...formData, userType: "client"})}
                      className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white font-medium transition-all duration-300"
                    >
                      <Briefcase className="h-4 w-4 mr-2" />
                      I'm a Client
                    </TabsTrigger>
                    <TabsTrigger 
                      value="freelancer" 
                      onClick={() => setFormData({...formData, userType: "freelancer"})}
                      className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white font-medium transition-all duration-300"
                    >
                      <User className="h-4 w-4 mr-2" />
                      I'm a Freelancer
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="pl-12 h-14 bg-white/30 backdrop-blur-sm border-white/30 focus:border-emerald-500 text-lg"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Password
                  </label>
                  <div className="relative">
                    <Shield className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                    <Input
                      type="password"
                      placeholder="Enter your password" 
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      className="pl-12 h-14 bg-white/30 backdrop-blur-sm border-white/30 focus:border-emerald-500 text-lg"
                      required
                    />
                  </div>
                </div>

                {/* Demo Credentials Notice */}
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/50 backdrop-blur-sm rounded-2xl p-4">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-amber-800 mb-1">Demo Account</p>
                      <p className="text-xs text-amber-700">
                        Email: demo@example.com | Password: demo123
                      </p>
                    </div>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full h-14 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-lg font-semibold shadow-xl transition-all duration-300"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Signing In...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <LogIn className="h-5 w-5" />
                      <span>Sign In</span>
                    </div>
                  )}
                </Button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-slate-600">
                  Don't have an account?{' '}
                  <Link to="/signup" className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors">
                    Sign up for free
                  </Link>
                </p>
              </div>
            </div>

            {/* Back to Home */}
            <div className="text-center mt-6">
              <Link to="/" className="inline-flex items-center text-slate-600 hover:text-emerald-600 transition-colors">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </div>
          </div>
        </div>

        {/* Right Side - Hero */}
        <div className="hidden lg:flex lg:flex-1 items-center justify-center p-12">
          <div className="max-w-lg text-center space-y-8">
            <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/30">
              <h3 className="text-4xl font-bold text-slate-900 mb-6">
                {formData.userType === "freelancer" ? "Start your freelance journey" : "Find perfect talent"}
              </h3>
              <p className="text-slate-600 text-xl leading-relaxed mb-8">
                {formData.userType === "freelancer" 
                  ? "Join thousands of freelancers building successful careers and working with amazing clients worldwide"
                  : "Connect with skilled professionals and bring your ideas to life with our global talent pool"
                }
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white">
                  <div className="text-3xl font-bold mb-2">50K+</div>
                  <div className="text-emerald-100">Active Users</div>
                </div>
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
                  <div className="text-3xl font-bold mb-2">99%</div>
                  <div className="text-blue-100">Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Modern Signup Page Component
const SignupPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    userType: "client",
    // Basic Info
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    // Client specific
    companyName: "",
    companySize: "",
    industry: "",
    // Freelancer specific
    title: "",
    skills: [],
    experience: "",
    hourlyRate: "",
    bio: "",
    portfolio: "",
    education: "",
    certifications: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const skillOptions = [
    "JavaScript", "React", "Node.js", "Python", "Java", "PHP", "C++",
    "UI/UX Design", "Graphic Design", "Figma", "Adobe Creative Suite",
    "Content Writing", "SEO", "Digital Marketing", "Social Media",
    "Video Editing", "Photography", "3D Modeling", "Animation"
  ];

  const handleSkillToggle = (skill) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill) 
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const userData = {
        id: 1,
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        userType: formData.userType
      };
      login(userData, formData.userType);
      navigate('/dashboard');
      setIsLoading(false);
    }, 1500);
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-blue-50/50 to-purple-50/50"></div>
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 25px 25px, rgba(16, 185, 129, 0.1) 2px, transparent 0)`,
        backgroundSize: '50px 50px'
      }}></div>

      <div className="relative flex min-h-screen">
        {/* Left Side - Form */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-2xl w-full">
            {/* Header */}
            <div className="text-center mb-8">
              <Link to="/">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">FreelanceHub</h1>
              </Link>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Join FreelanceHub</h2>
              <p className="text-slate-600">Create your account and start your journey</p>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-center space-x-4 mb-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                      step >= i 
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg' 
                        : 'bg-white/30 backdrop-blur-sm text-slate-400 border border-white/30'
                    }`}>
                      {i}
                    </div>
                    {i < 3 && (
                      <div className={`w-12 h-1 mx-2 rounded-full transition-all duration-300 ${
                        step > i ? 'bg-gradient-to-r from-emerald-600 to-teal-600' : 'bg-white/30'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
              <div className="text-center text-sm text-slate-600">
                Step {step} of 3: {
                  step === 1 ? 'Account Type' : 
                  step === 2 ? 'Basic Information' : 
                  'Professional Details'
                }
              </div>
            </div>

            {/* Signup Form Card */}
            <div className="bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl shadow-emerald-500/20 p-8 border border-white/30">
              <form onSubmit={handleSignup}>
                {/* Step 1: Account Type */}
                {step === 1 && (
                  <div className="space-y-8">
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-slate-900 mb-4">Choose Your Path</h3>
                      <p className="text-slate-600">Are you looking to hire talent or offer your services?</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div 
                        onClick={() => setFormData({...formData, userType: "client"})}
                        className={`cursor-pointer rounded-2xl p-8 border-2 transition-all duration-300 ${
                          formData.userType === "client" 
                            ? 'border-emerald-500 bg-emerald-50/50 backdrop-blur-sm shadow-xl' 
                            : 'border-white/30 bg-white/30 backdrop-blur-sm hover:border-emerald-300'
                        }`}
                      >
                        <div className="text-center">
                          <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 ${
                            formData.userType === "client" 
                              ? 'bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg' 
                              : 'bg-white/40 backdrop-blur-sm'
                          }`}>
                            <Briefcase className={`h-10 w-10 ${formData.userType === "client" ? 'text-white' : 'text-slate-600'}`} />
                          </div>
                          <h4 className="text-xl font-bold text-slate-900 mb-2">I'm a Client</h4>
                          <p className="text-slate-600 text-sm">I want to hire freelancers for my projects</p>
                        </div>
                      </div>

                      <div 
                        onClick={() => setFormData({...formData, userType: "freelancer"})}
                        className={`cursor-pointer rounded-2xl p-8 border-2 transition-all duration-300 ${
                          formData.userType === "freelancer" 
                            ? 'border-emerald-500 bg-emerald-50/50 backdrop-blur-sm shadow-xl' 
                            : 'border-white/30 bg-white/30 backdrop-blur-sm hover:border-emerald-300'
                        }`}
                      >
                        <div className="text-center">
                          <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 ${
                            formData.userType === "freelancer" 
                              ? 'bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg' 
                              : 'bg-white/40 backdrop-blur-sm'
                          }`}>
                            <User className={`h-10 w-10 ${formData.userType === "freelancer" ? 'text-white' : 'text-slate-600'}`} />
                          </div>
                          <h4 className="text-xl font-bold text-slate-900 mb-2">I'm a Freelancer</h4>
                          <p className="text-slate-600 text-sm">I want to offer my services and find work</p>
                        </div>
                      </div>
                    </div>

                    <Button 
                      type="button"
                      onClick={nextStep}
                      className="w-full h-14 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-lg font-semibold shadow-xl"
                    >
                      Continue
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                )}

                {/* Step 2: Basic Information */}
                {step === 2 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold text-slate-900 mb-2">Basic Information</h3>
                      <p className="text-slate-600">Tell us about yourself</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">First Name</label>
                        <Input
                          placeholder="John"
                          value={formData.firstName}
                          onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                          className="h-12 bg-white/30 backdrop-blur-sm border-white/30 focus:border-emerald-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Last Name</label>
                        <Input
                          placeholder="Doe"
                          value={formData.lastName}
                          onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                          className="h-12 bg-white/30 backdrop-blur-sm border-white/30 focus:border-emerald-500"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                        <Input
                          type="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="pl-12 h-12 bg-white/30 backdrop-blur-sm border-white/30 focus:border-emerald-500"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
                        <div className="relative">
                          <Shield className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                          <Input
                            type="password"
                            placeholder="Create password"
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            className="pl-12 h-12 bg-white/30 backdrop-blur-sm border-white/30 focus:border-emerald-500"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Confirm Password</label>
                        <div className="relative">
                          <Shield className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                          <Input
                            type="password"
                            placeholder="Confirm password"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                            className="pl-12 h-12 bg-white/30 backdrop-blur-sm border-white/30 focus:border-emerald-500"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Client-specific fields */}
                    {formData.userType === "client" && (
                      <>
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">Company Name (Optional)</label>
                          <div className="relative">
                            <Building2 className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                            <Input
                              placeholder="Your company name"
                              value={formData.companyName}
                              onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                              className="pl-12 h-12 bg-white/30 backdrop-blur-sm border-white/30 focus:border-emerald-500"
                            />
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Company Size</label>
                            <select 
                              value={formData.companySize}
                              onChange={(e) => setFormData({...formData, companySize: e.target.value})}
                              className="w-full h-12 bg-white/30 backdrop-blur-sm border border-white/30 rounded-md px-4 focus:border-emerald-500 focus:outline-none"
                            >
                              <option value="">Select size</option>
                              <option value="1-10">1-10 employees</option>
                              <option value="11-50">11-50 employees</option>
                              <option value="51-200">51-200 employees</option>
                              <option value="200+">200+ employees</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Industry</label>
                            <select 
                              value={formData.industry}
                              onChange={(e) => setFormData({...formData, industry: e.target.value})}
                              className="w-full h-12 bg-white/30 backdrop-blur-sm border border-white/30 rounded-md px-4 focus:border-emerald-500 focus:outline-none"
                            >
                              <option value="">Select industry</option>
                              <option value="Technology">Technology</option>
                              <option value="Healthcare">Healthcare</option>
                              <option value="Finance">Finance</option>
                              <option value="Education">Education</option>
                              <option value="E-commerce">E-commerce</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                        </div>
                      </>
                    )}

                    <div className="flex space-x-4">
                      <Button 
                        type="button"
                        onClick={prevStep}
                        variant="outline"
                        className="flex-1 h-12 bg-white/30 backdrop-blur-sm border-white/30 hover:bg-white/40"
                      >
                        <ArrowLeft className="mr-2 h-5 w-5" />
                        Back
                      </Button>
                      <Button 
                        type="button"
                        onClick={nextStep}
                        className="flex-1 h-12 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                      >
                        Continue
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 3: Professional Details */}
                {step === 3 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold text-slate-900 mb-2">
                        {formData.userType === "freelancer" ? "Professional Profile" : "Project Requirements"}
                      </h3>
                      <p className="text-slate-600">
                        {formData.userType === "freelancer" 
                          ? "Showcase your skills and experience" 
                          : "Help us understand what you're looking for"
                        }
                      </p>
                    </div>

                    {formData.userType === "freelancer" ? (
                      <>
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">Professional Title</label>
                          <Input
                            placeholder="e.g., Full Stack Developer, UI/UX Designer"
                            value={formData.title}
                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                            className="h-12 bg-white/30 backdrop-blur-sm border-white/30 focus:border-emerald-500"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-3">Skills (Select up to 10)</label>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto p-4 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30">
                            {skillOptions.map((skill) => (
                              <div
                                key={skill}
                                onClick={() => formData.skills.length < 10 || formData.skills.includes(skill) ? handleSkillToggle(skill) : null}
                                className={`cursor-pointer px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                  formData.skills.includes(skill)
                                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg'
                                    : 'bg-white/40 backdrop-blur-sm text-slate-700 hover:bg-white/60'
                                } ${formData.skills.length >= 10 && !formData.skills.includes(skill) ? 'opacity-50 cursor-not-allowed' : ''}`}
                              >
                                {skill}
                              </div>
                            ))}
                          </div>
                          <p className="text-xs text-slate-500 mt-2">{formData.skills.length}/10 skills selected</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Experience Level</label>
                            <select 
                              value={formData.experience}
                              onChange={(e) => setFormData({...formData, experience: e.target.value})}
                              className="w-full h-12 bg-white/30 backdrop-blur-sm border border-white/30 rounded-md px-4 focus:border-emerald-500 focus:outline-none"
                              required
                            >
                              <option value="">Select level</option>
                              <option value="Entry Level">Entry Level (0-2 years)</option>
                              <option value="Intermediate">Intermediate (2-5 years)</option>
                              <option value="Expert">Expert (5+ years)</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Hourly Rate (USD)</label>
                            <div className="relative">
                              <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                              <Input
                                type="number"
                                placeholder="25"
                                value={formData.hourlyRate}
                                onChange={(e) => setFormData({...formData, hourlyRate: e.target.value})}
                                className="pl-12 h-12 bg-white/30 backdrop-blur-sm border-white/30 focus:border-emerald-500"
                                required
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">Professional Bio</label>
                          <textarea
                            placeholder="Describe your experience, expertise, and what makes you unique..."
                            value={formData.bio}
                            onChange={(e) => setFormData({...formData, bio: e.target.value})}
                            rows={4}
                            className="w-full bg-white/30 backdrop-blur-sm border border-white/30 rounded-md px-4 py-3 focus:border-emerald-500 focus:outline-none resize-none"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">Portfolio URL (Optional)</label>
                          <div className="relative">
                            <Globe className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                            <Input
                              placeholder="https://yourportfolio.com"
                              value={formData.portfolio}
                              onChange={(e) => setFormData({...formData, portfolio: e.target.value})}
                              className="pl-12 h-12 bg-white/30 backdrop-blur-sm border-white/30 focus:border-emerald-500"
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-3">What type of projects are you looking to outsource?</label>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {["Web Development", "Mobile Apps", "Design", "Content Writing", "Marketing", "Other"].map((type) => (
                              <div
                                key={type}
                                className="p-4 bg-white/30 backdrop-blur-sm rounded-xl border border-white/30 hover:bg-white/40 cursor-pointer transition-all duration-200 text-center"
                              >
                                <span className="text-sm font-medium text-slate-700">{type}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">Typical Project Budget Range</label>
                          <select 
                            className="w-full h-12 bg-white/30 backdrop-blur-sm border border-white/30 rounded-md px-4 focus:border-emerald-500 focus:outline-none"
                          >
                            <option value="">Select budget range</option>
                            <option value="Under $1,000">Under $1,000</option>
                            <option value="$1,000 - $5,000">$1,000 - $5,000</option>
                            <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                            <option value="$10,000+">$10,000+</option>
                          </select>
                        </div>
                      </>
                    )}

                    <div className="flex space-x-4">
                      <Button 
                        type="button"
                        onClick={prevStep}
                        variant="outline"
                        className="flex-1 h-12 bg-white/30 backdrop-blur-sm border-white/30 hover:bg-white/40"
                      >
                        <ArrowLeft className="mr-2 h-5 w-5" />
                        Back
                      </Button>
                      <Button 
                        type="submit"
                        disabled={isLoading}
                        className="flex-1 h-12 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                      >
                        {isLoading ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            <span>Creating Account...</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <UserPlus className="h-5 w-5" />
                            <span>Create Account</span>
                          </div>
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </form>

              {step === 1 && (
                <div className="mt-8 text-center">
                  <p className="text-slate-600">
                    Already have an account?{' '}
                    <Link to="/login" className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors">
                      Sign in here
                    </Link>
                  </p>
                </div>
              )}
            </div>

            {/* Back to Home */}
            <div className="text-center mt-6">
              <Link to="/" className="inline-flex items-center text-slate-600 hover:text-emerald-600 transition-colors">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </div>
          </div>
        </div>

        {/* Right Side - Info */}
        <div className="hidden lg:flex lg:flex-1 items-center justify-center p-12">
          <div className="max-w-lg space-y-8">
            <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/30">
              <h3 className="text-3xl font-bold text-slate-900 mb-6">Join Our Community</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Verified Professionals</h4>
                    <p className="text-slate-600">All freelancers are verified and rated by real clients</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Secure Payments</h4>
                    <p className="text-slate-600">Protected transactions with money-back guarantee</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">24/7 Support</h4>
                    <p className="text-slate-600">Get help whenever you need it from our support team</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Placeholder components for other pages - properly closed and structured
const ServiceDetailPage = () => {
  const { id } = useParams();
  const service = mockServices.find(s => s.id === parseInt(id));
  
  if (!service) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Service Not Found</h1>
        <Link to="/services">
          <Button>Back to Services</Button>
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">{service.title}</h1>
        <p className="text-xl text-slate-600">{service.description}</p>
      </div>
    </div>
  );
};

const FreelancerProfilePage = () => {
  const { id } = useParams();
  const freelancer = mockFreelancers.find(f => f.id === parseInt(id));
  
  if (!freelancer) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Freelancer Not Found</h1>
        <Link to="/browse">
          <Button>Back to Browse</Button>
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">{freelancer.name}</h1>
        <p className="text-xl text-slate-600">{freelancer.title}</p>
      </div>
    </div>
  );
};

const HowItWorksPage = () => (
  <div className="min-h-screen bg-slate-50">
    <Navigation />
    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold text-slate-900 mb-4">How It Works</h1>
      <p className="text-xl text-slate-600">Learn how to get the most out of FreelanceHub</p>
    </div>
  </div>
);

const AboutPage = () => (
  <div className="min-h-screen bg-slate-50">
    <Navigation />
    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold text-slate-900 mb-4">About FreelanceHub</h1>
      <p className="text-xl text-slate-600">The world's leading freelance marketplace</p>
    </div>
  </div>
);

// Main App Component will be split into separate files for dashboard components
const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/browse" element={<div>Browse Page - Implementation needed</div>} />
          <Route path="/services" element={<div>Services Page - Implementation needed</div>} />
          <Route path="/service/:id" element={<ServiceDetailPage />} />
          <Route path="/freelancer/:id" element={<FreelancerProfilePage />} />
          <Route path="/post-job" element={<div>Post Job Page - Implementation needed</div>} />
          <Route path="/messages" element={<div>Messages Page - Implementation needed</div>} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/dashboard" element={<div>Dashboard - Implementation needed</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

// Export App wrapped with AuthProvider
export default function AppWithAuth() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}