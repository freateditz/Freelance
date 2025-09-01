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
  Handshake
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

// Navigation Component
const Navigation = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 backdrop-blur-sm bg-white/95 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <div className="flex-shrink-0">
              <Link to="/">
                <h1 className="text-2xl font-bold text-emerald-600">FreelanceHub</h1>
              </Link>
            </div>
            <div className="hidden md:flex space-x-6">
              <Link to="/browse" className="text-slate-700 hover:text-emerald-600 font-medium transition-colors">
                Find Talent
              </Link>
              <Link to="/services" className="text-slate-700 hover:text-emerald-600 font-medium transition-colors">
                Browse Services
              </Link>
              {user && user.userType !== 'client' && (
                <Link to="/post-job" className="text-slate-700 hover:text-emerald-600 font-medium transition-colors">
                  Post a Job
                </Link>
              )}
              <Link to="/how-it-works" className="text-slate-700 hover:text-emerald-600 font-medium transition-colors">
                How it Works
              </Link>
            </div>
          </div>
          
          {user ? (
            <div className="flex items-center space-x-4">
              <Link to="/messages">
                <Button variant="ghost" size="sm">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Messages
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="ghost" size="sm">
                  <Briefcase className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={logout}>
                <User className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link to="/login">
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
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

// Home Page Component - Enhanced with classic professional design
const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "development", name: "Programming & Tech", icon: Code, color: "bg-blue-500", count: "2,543 services" },
    { id: "design", name: "Graphics & Design", icon: Palette, color: "bg-purple-500", count: "1,892 services" },
    { id: "writing", name: "Writing & Translation", icon: PenTool, color: "bg-green-500", count: "1,456 services" },
    { id: "marketing", name: "Digital Marketing", icon: Megaphone, color: "bg-orange-500", count: "987 services" },
    { id: "video", name: "Video & Animation", icon: Camera, color: "bg-red-500", count: "743 services" },
    { id: "music", name: "Music & Audio", icon: Music, color: "bg-indigo-500", count: "521 services" },
    { id: "business", name: "Business", icon: Briefcase, color: "bg-teal-500", count: "834 services" },
    { id: "ai", name: "AI Services", icon: Zap, color: "bg-yellow-500", count: "421 services" }
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
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section - Enhanced */}
      <section className="relative bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-20 lg:py-28 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  #1 Freelance Marketplace
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 leading-tight">
                  Find the best
                  <span className="text-emerald-600 block">freelance services</span>
                  for your business
                </h1>
                
                <p className="text-xl text-slate-600 max-w-lg leading-relaxed">
                  Connect with world-class freelancers and agencies to bring your projects to life. 
                  From web development to digital marketing, find experts for every need.
                </p>
              </div>
              
              {/* Enhanced Search Bar */}
              <div className="bg-white rounded-2xl shadow-xl p-2 max-w-lg">
                <div className="flex">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                    <Input
                      placeholder="What service are you looking for?"
                      className="pl-12 h-14 text-lg border-0 focus:ring-0"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button className="h-14 px-8 bg-emerald-600 hover:bg-emerald-700 rounded-xl">
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
            
            {/* Hero Image */}
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden bg-white shadow-2xl relative">
                <img 
                  src="https://images.unsplash.com/photo-1718220216044-006f43e3a9b1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b3Jrc3BhY2V8ZW58MHx8fHwxNzU2NzQxODcwfDA&ixlib=rb-4.1.0&q=85"
                  alt="Professional workspace"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              
              {/* Floating Cards */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-slate-700">2,847 projects completed today</span>
                </div>
              </div>
              
              <div className="absolute -top-6 -right-6 bg-white rounded-xl p-4 shadow-lg">
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium text-slate-700">4.9/5 average rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-2xl mb-4">
                    <IconComponent className="h-8 w-8 text-emerald-600" />
                  </div>
                  <div className="text-3xl font-bold text-slate-900 mb-2">{stat.value}</div>
                  <div className="text-slate-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Categories Section - Enhanced */}
      <section className="py-20">
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
                  <Card className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-0 bg-gradient-to-br from-white to-slate-50">
                    <CardContent className="p-8 text-center">
                      <div className={`w-20 h-20 ${category.color} rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <IconComponent className="h-10 w-10 text-white" />
                      </div>
                      <h3 className="font-bold text-slate-900 text-lg mb-2">{category.name}</h3>
                      <p className="text-slate-500 text-sm">{category.count}</p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-16">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Featured Services</h2>
              <p className="text-xl text-slate-600">Hand-picked services from our top-rated freelancers</p>
            </div>
            <Link to="/services">
              <Button variant="outline" size="lg" className="hidden md:flex">
                View All Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {mockServices.map((service) => (
              <Link key={service.id} to={`/service/${service.id}`}>
                <Card className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden border-0">
                  <div className="aspect-video bg-slate-200 overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-6">
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
                      <Badge variant="secondary" className="text-xs">
                        {service.category}
                      </Badge>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-right">
                        <div className="text-lg font-bold text-slate-900">From ${service.price}</div>
                        <div className="text-sm text-slate-500">{service.deliveryTime}</div>
                      </div>
                      <Heart className="h-5 w-5 text-slate-400 hover:text-red-500 cursor-pointer transition-colors" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">How FreelanceHub Works</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Get your project done in three simple steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {howItWorks.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className="text-center relative">
                  {index < howItWorks.length - 1 && (
                    <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-emerald-200 transform translate-x-1/2"></div>
                  )}
                  <div className="relative inline-flex items-center justify-center w-24 h-24 bg-emerald-600 rounded-full mb-6 text-white text-2xl font-bold shadow-lg">
                    {step.step}
                    <div className="absolute inset-0 bg-emerald-600 rounded-full animate-pulse opacity-75"></div>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">{step.title}</h3>
                  <p className="text-slate-600 text-lg">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">What Our Clients Say</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Join thousands of satisfied clients who have found success on FreelanceHub
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {mockTestimonials.map((testimonial) => (
              <Card key={testimonial.id} className="border-0 shadow-lg">
                <CardContent className="p-8">
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
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-600 to-teal-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold mb-6">
            Ready to get started?
          </h2>
          <p className="text-2xl text-emerald-100 mb-10 max-w-3xl mx-auto">
            Join the world's largest freelance marketplace and connect with talented professionals today
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/login">
              <Button size="lg" variant="secondary" className="h-14 px-10 text-lg">
                <Briefcase className="mr-2 h-6 w-6" />
                Hire Freelancers
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="h-14 px-10 text-lg border-white text-white hover:bg-white hover:text-emerald-600">
                <User className="mr-2 h-6 w-6" />
                Start Freelancing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-5 gap-8 mb-12">
            <div className="md:col-span-2">
              <h3 className="text-3xl font-bold text-white mb-6">FreelanceHub</h3>
              <p className="text-slate-400 text-lg mb-6 max-w-md">
                The world's largest freelance marketplace. Connect with skilled professionals and get work done efficiently.
              </p>
              <div className="flex space-x-6">
                <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-emerald-600 cursor-pointer transition-colors">
                  <Globe className="h-5 w-5" />
                </div>
                <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-emerald-600 cursor-pointer transition-colors">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-emerald-600 cursor-pointer transition-colors">
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
                <li><Link to="#" className="hover:text-white transition-colors">Create Profile</Link></li>
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
              <p className="text-slate-400">&copy; 2024 FreelanceHub. All rights reserved.</p>
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

// Continue with more components in the next part due to length limit...

// Login Page Component
const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isFreelancer, setIsFreelancer] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleLogin = (e) => {
    e.preventDefault();
    const userData = {
      id: 1,
      name: isFreelancer ? "John Freelancer" : "Jane Client",
      email: formData.email,
      userType: isFreelancer ? "freelancer" : "client"
    };
    login(userData, isFreelancer ? "freelancer" : "client");
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <Link to="/">
              <h1 className="text-3xl font-bold text-emerald-600 mb-2">FreelanceHub</h1>
            </Link>
            <h2 className="text-3xl font-bold text-slate-900">Welcome back</h2>
            <p className="text-slate-600 mt-2">Sign in to your account to continue</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <Tabs value={isFreelancer ? "freelancer" : "client"} className="mb-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger 
                  value="client" 
                  onClick={() => setIsFreelancer(false)}
                  className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
                >
                  I'm a Client
                </TabsTrigger>
                <TabsTrigger 
                  value="freelancer" 
                  onClick={() => setIsFreelancer(true)}
                  className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
                >
                  I'm a Freelancer
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address
                </label>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="h-12"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Password
                </label>
                <Input
                  type="password"
                  placeholder="Enter your password" 
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="h-12"
                  required
                />
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-sm font-medium text-amber-800 mb-2">Demo Credentials:</p>
                <p className="text-xs text-amber-700">
                  Email: demo@example.com<br />
                  Password: demo123
                </p>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-lg"
              >
                Sign In
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-slate-600">
                Don't have an account?{' '}
                <a href="#" className="text-emerald-600 hover:text-emerald-700 font-medium">
                  Sign up for free
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden lg:block lg:flex-1">
        <div className="h-full bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center p-12">
          <div className="max-w-lg text-center text-white space-y-8">
            <h3 className="text-4xl font-bold">
              {isFreelancer ? "Start your freelance journey" : "Find perfect talent"}
            </h3>
            <p className="text-emerald-100 text-xl leading-relaxed">
              {isFreelancer 
                ? "Join thousands of freelancers building successful careers and working with amazing clients worldwide"
                : "Connect with skilled professionals and bring your ideas to life with our global talent pool"
              }
            </p>
            <div className="grid grid-cols-2 gap-6 text-sm">
              <div className="bg-white/10 rounded-xl p-6">
                <div className="text-3xl font-bold">10K+</div>
                <div className="text-emerald-100">Active Users</div>
              </div>
              <div className="bg-white/10 rounded-xl p-6">
                <div className="text-3xl font-bold">99%</div>
                <div className="text-emerald-100">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// I'll continue with more components in the next part due to length limitations...

// Main App Component
function App() {
  const { user, userType } = useAuth();

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/browse" element={<BrowseFreelancersPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/service/:id" element={<ServiceDetailPage />} />
          <Route path="/freelancer/:id" element={<FreelancerProfilePage />} />
          <Route path="/post-job" element={<PostJobPage />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route 
            path="/dashboard" 
            element={
              user ? (
                userType === "freelancer" ? <FreelancerDashboard /> : <ClientDashboard />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

// Browse Freelancers Page
const BrowseFreelancersPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [sortBy, setSortBy] = useState("rating");

  const categories = ["all", "development", "design", "writing", "marketing", "video", "music", "business"];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Find Talented Freelancers</h1>
          <p className="text-xl text-slate-600">Browse thousands of skilled professionals ready to work on your project</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <Input
                placeholder="Search freelancers..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <select 
              className="border border-slate-300 rounded-md px-3 py-2"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
              ))}
            </select>
            <select 
              className="border border-slate-300 rounded-md px-3 py-2"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="rating">Highest Rated</option>
              <option value="price">Lowest Price</option>
              <option value="recent">Most Recent</option>
            </select>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Filter className="h-4 w-4 mr-2" />
              Apply Filters
            </Button>
          </div>
        </div>

        {/* Freelancers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockFreelancers.map((freelancer) => (
            <Link key={freelancer.id} to={`/freelancer/${freelancer.id}`}>
              <Card className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <Avatar className="w-20 h-20 mx-auto mb-4">
                      <AvatarImage src={freelancer.profileImage} alt={freelancer.name} />
                      <AvatarFallback>{freelancer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <h3 className="font-bold text-slate-900 text-lg">{freelancer.name}</h3>
                    <p className="text-slate-600 mb-2">{freelancer.title}</p>
                    <div className="flex items-center justify-center space-x-1 mb-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{freelancer.rating}</span>
                      <span className="text-slate-500 text-sm">({freelancer.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center justify-center text-sm text-slate-600">
                      <MapPin className="h-4 w-4 mr-1" />
                      {freelancer.location}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-1">
                      {freelancer.skills.slice(0, 3).map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center pt-4 border-t">
                      <div>
                        <span className="text-sm text-slate-600">Starting at</span>
                        <div className="font-bold text-emerald-600 text-lg">${freelancer.hourlyRate}/hr</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-slate-600">{freelancer.completedProjects} projects</div>
                        <div className="text-sm text-emerald-600">{freelancer.availability}</div>
                      </div>
                    </div>
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
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Browse Services</h1>
          <p className="text-xl text-slate-600">Discover services from talented freelancers worldwide</p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <Input
                placeholder="What service are you looking for?"
                className="pl-10 h-12"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button className="h-12 px-8 bg-emerald-600 hover:bg-emerald-700">
              Search
            </Button>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mockServices.map((service) => (
            <Link key={service.id} to={`/service/${service.id}`}>
              <Card className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="aspect-video bg-slate-200 overflow-hidden rounded-t-lg">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover"
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
                  
                  <h3 className="font-medium text-slate-900 line-clamp-2 mb-3 text-sm">
                    {service.title}
                  </h3>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-medium">{service.rating}</span>
                      <span className="text-xs text-slate-500">({service.reviews})</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {service.category}
                    </Badge>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-bold text-slate-900">From ${service.price}</div>
                      <div className="text-xs text-slate-500">{service.deliveryTime}</div>
                    </div>
                    <Heart className="h-4 w-4 text-slate-400 hover:text-red-500 cursor-pointer" />
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

// Service Detail Page
const ServiceDetailPage = () => {
  const { id } = useParams();
  const service = mockServices.find(s => s.id === parseInt(id));
  const freelancer = mockFreelancers.find(f => f.name === service?.freelancer);

  if (!service) return <div>Service not found</div>;

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="aspect-video bg-slate-200">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-3xl font-bold text-slate-900">{service.title}</h1>
                  <div className="flex items-center space-x-1">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium text-lg">{service.rating}</span>
                    <span className="text-slate-500">({service.reviews} reviews)</span>
                  </div>
                </div>
                
                <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                  {service.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {service.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="px-3 py-1">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                {/* About the Seller */}
                <div className="border-t pt-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">About the Seller</h3>
                  <div className="flex items-start space-x-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={freelancer?.profileImage} alt={freelancer?.name} />
                      <AvatarFallback>{freelancer?.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-900 text-lg">{freelancer?.name}</h4>
                      <p className="text-slate-600 mb-2">{freelancer?.title}</p>
                      <p className="text-slate-600 mb-4">{freelancer?.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-slate-600">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {freelancer?.location}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          Responds in {freelancer?.responseTime}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-slate-900 mb-2">From ${service.price}</div>
                  <div className="text-slate-600">Delivery in {service.deliveryTime}</div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Category:</span>
                    <Badge variant="secondary">{service.category}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Revisions:</span>
                    <span className="font-medium">3 included</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Source files:</span>
                    <CheckCircle className="h-5 w-5 text-emerald-600" />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Button className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-lg">
                    Order Now
                  </Button>
                  <Button variant="outline" className="w-full h-12">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Contact Seller
                  </Button>
                </div>
                
                <div className="mt-6 pt-6 border-t text-center">
                  <div className="flex items-center justify-center space-x-4 text-sm text-slate-600">
                    <div className="flex items-center">
                      <Shield className="h-4 w-4 mr-1 text-emerald-600" />
                      Money-back guarantee
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

// Freelancer Profile Page
const FreelancerProfilePage = () => {
  const { id } = useParams();
  const freelancer = mockFreelancers.find(f => f.id === parseInt(id));

  if (!freelancer) return <div>Freelancer not found</div>;

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Profile */}
          <div className="lg:col-span-2">
            <Card className="mb-8">
              <CardContent className="p-8">
                <div className="flex items-start space-x-6 mb-8">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={freelancer.profileImage} alt={freelancer.name} />
                    <AvatarFallback className="text-2xl">{freelancer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">{freelancer.name}</h1>
                    <p className="text-xl text-slate-600 mb-4">{freelancer.title}</p>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="flex items-center">
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="font-medium text-lg">{freelancer.rating}</span>
                        <span className="text-slate-500 ml-1">({freelancer.reviews} reviews)</span>
                      </div>
                      <div className="flex items-center text-slate-600">
                        <MapPin className="h-4 w-4 mr-1" />
                        {freelancer.location}
                      </div>
                    </div>
                    <p className="text-slate-600 leading-relaxed">{freelancer.description}</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900">{freelancer.completedProjects}</div>
                    <div className="text-slate-600">Projects Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900">{freelancer.responseTime}</div>
                    <div className="text-slate-600">Response Time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-600">{freelancer.availability}</div>
                    <div className="text-slate-600">Availability</div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {freelancer.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="px-3 py-1">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">Languages</h3>
                    <div className="flex flex-wrap gap-2">
                      {freelancer.languages.map((language) => (
                        <Badge key={language} variant="outline" className="px-3 py-1">
                          {language}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Portfolio */}
            <Card>
              <CardHeader>
                <CardTitle>Portfolio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {freelancer.portfolio.map((item, index) => (
                    <div key={index} className="group cursor-pointer">
                      <div className="aspect-video bg-slate-200 rounded-lg overflow-hidden mb-3">
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <h4 className="font-medium text-slate-900">{item.title}</h4>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">${freelancer.hourlyRate}/hr</div>
                  <div className="text-slate-600">Starting rate</div>
                </div>
                
                <div className="space-y-3 mb-6">
                  <Button className="w-full h-12 bg-emerald-600 hover:bg-emerald-700">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Contact Me
                  </Button>
                  <Button variant="outline" className="w-full h-12">
                    <Heart className="h-4 w-4 mr-2" />
                    Save Profile
                  </Button>
                </div>
                
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Response time:</span>
                    <span className="font-medium">{freelancer.responseTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Availability:</span>
                    <span className="font-medium text-emerald-600">{freelancer.availability}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Member since:</span>
                    <span className="font-medium">Jan 2022</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Last seen:</span>
                    <span className="font-medium">2 hours ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced Client Dashboard with Glassmorphism
const ClientDashboard = () => {
  const { user } = useAuth();
  const [activeProjects] = useState([
    { id: 1, title: "E-commerce Website Development", freelancer: "Sarah Johnson", progress: 85, status: "In Progress", budget: 2500, deadline: "2025-02-15" },
    { id: 2, title: "Mobile App UI/UX Design", freelancer: "Michael Chen", progress: 100, status: "Completed", budget: 1800, deadline: "2025-01-28" },
    { id: 3, title: "Brand Identity Package", freelancer: "Emily Rodriguez", progress: 60, status: "In Progress", budget: 1200, deadline: "2025-02-20" },
    { id: 4, title: "Digital Marketing Campaign", freelancer: "David Kim", progress: 40, status: "In Progress", budget: 3000, deadline: "2025-02-28" }
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23e0e7ff" fill-opacity="0.3"%3E%3Ccircle cx="7" cy="7" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
      
      {/* Enhanced Navigation with Glassmorphism */}
      <nav className="bg-white/10 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50 shadow-lg shadow-blue-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link to="/">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">FreelanceHub</h1>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <User className="h-4 w-4 text-blue-600" />
                <span className="text-slate-700 font-medium">{user?.name}</span>
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-8 shadow-2xl shadow-blue-500/20 border border-white/30">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Welcome back, {user?.name}! 👋
            </h1>
            <p className="text-slate-600 text-lg">Manage your projects and discover amazing talent</p>
            <div className="mt-6 flex justify-center">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-1">
                <div className="bg-white rounded-full px-6 py-2">
                  <span className="text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Client Dashboard
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards with Glassmorphism */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-6 shadow-xl shadow-blue-500/10 border border-white/30 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 group">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Briefcase className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-slate-700 mb-2">Active Projects</h3>
              <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">5</p>
              <p className="text-sm text-slate-500 mt-1">+2 this month</p>
            </div>
          </div>

          <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-6 shadow-xl shadow-green-500/10 border border-white/30 hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-300 group">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <DollarSign className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-slate-700 mb-2">Total Investment</h3>
              <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">$12.5K</p>
              <p className="text-sm text-slate-500 mt-1">Return: 250%</p>
            </div>
          </div>

          <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-6 shadow-xl shadow-purple-500/10 border border-white/30 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 group">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-slate-700 mb-2">Freelancers Hired</h3>
              <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">23</p>
              <p className="text-sm text-slate-500 mt-1">Across 12 countries</p>
            </div>
          </div>

          <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-6 shadow-xl shadow-amber-500/10 border border-white/30 hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-300 group">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-slate-700 mb-2">Success Rate</h3>
              <p className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">98%</p>
              <p className="text-sm text-slate-500 mt-1">Industry leading</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Active Projects */}
          <div className="lg:col-span-2">
            <div className="bg-white/20 backdrop-blur-xl rounded-2xl shadow-xl shadow-blue-500/10 border border-white/30 overflow-hidden">
              <div className="p-6 border-b border-white/20">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-slate-800">Active Projects</h2>
                  <Badge className="bg-blue-100/80 text-blue-800 backdrop-blur-sm">4 In Progress</Badge>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {activeProjects.map((project) => (
                    <div key={project.id} className="bg-white/30 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/40 transition-all duration-300">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-800 mb-1">{project.title}</h4>
                          <p className="text-sm text-slate-600">by {project.freelancer}</p>
                        </div>
                        <div className="text-right">
                          <Badge className={`${project.status === 'Completed' ? 'bg-green-100/80 text-green-800' : 'bg-yellow-100/80 text-yellow-800'} backdrop-blur-sm`}>
                            {project.status}
                          </Badge>
                          <p className="text-sm text-slate-600 mt-1">${project.budget}</p>
                        </div>
                      </div>
                      <div className="mb-2">
                        <div className="flex justify-between text-sm text-slate-600 mb-1">
                          <span>Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <div className="w-full bg-white/30 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-xs text-slate-500">
                        <span>Due: {project.deadline}</span>
                        <div className="flex space-x-2">
                          <MessageSquare className="h-3 w-3" />
                          <Eye className="h-3 w-3" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions & Recent Activity */}
          <div className="space-y-6">
            <div className="bg-white/20 backdrop-blur-xl rounded-2xl shadow-xl shadow-purple-500/10 border border-white/30">
              <div className="p-6 border-b border-white/20">
                <h2 className="text-xl font-bold text-slate-800">Quick Actions</h2>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  <Link to="/post-job">
                    <Button className="w-full justify-start bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                      <Plus className="h-4 w-4 mr-2" />
                      Post New Project
                    </Button>
                  </Link>
                  <Link to="/browse">
                    <Button className="w-full justify-start bg-white/30 backdrop-blur-sm hover:bg-white/40 text-slate-700 border border-white/30">
                      <Search className="h-4 w-4 mr-2" />
                      Find Freelancers
                    </Button>
                  </Link>
                  <Link to="/messages">
                    <Button className="w-full justify-start bg-white/30 backdrop-blur-sm hover:bg-white/40 text-slate-700 border border-white/30">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Messages (3)
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white/20 backdrop-blur-xl rounded-2xl shadow-xl shadow-green-500/10 border border-white/30">
              <div className="p-6 border-b border-white/20">
                <h2 className="text-xl font-bold text-slate-800">Recent Activity</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm text-slate-700">Project completed by Michael Chen</p>
                      <p className="text-xs text-slate-500">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm text-slate-700">New proposal received</p>
                      <p className="text-xs text-slate-500">5 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm text-slate-700">Payment processed for Sarah Johnson</p>
                      <p className="text-xs text-slate-500">1 day ago</p>
                    </div>
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

const FreelancerDashboard = () => {
  const { user } = useAuth();
  const [recentOrders] = useState([
    { id: 1, title: "E-commerce Platform Development", client: "TechCorp Inc.", earnings: 2800, status: "Completed", rating: 5, deadline: "2025-01-25" },
    { id: 2, title: "Mobile App UI Design", client: "StartupXYZ", earnings: 1500, status: "In Progress", rating: null, deadline: "2025-02-10" },
    { id: 3, title: "Brand Identity Package", client: "Creative Co.", earnings: 900, status: "In Review", rating: null, deadline: "2025-02-05" },
    { id: 4, title: "SEO Content Writing", client: "Digital Agency", earnings: 600, status: "Completed", rating: 4.8, deadline: "2025-01-30" }
  ]);

  const [skills] = useState([
    { name: "React Development", level: 95, projects: 45 },
    { name: "UI/UX Design", level: 88, projects: 32 },
    { name: "Node.js", level: 82, projects: 28 },
    { name: "Python", level: 78, projects: 25 }
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23d1fae5" fill-opacity="0.4"%3E%3Cpath d="M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
      
      {/* Enhanced Navigation with Glassmorphism */}
      <nav className="bg-white/10 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50 shadow-lg shadow-emerald-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link to="/">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">FreelanceHub</h1>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <Zap className="h-4 w-4 text-emerald-600" />
                <span className="text-slate-700 font-medium">{user?.name}</span>
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-8 shadow-2xl shadow-emerald-500/20 border border-white/30">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
              Welcome back, {user?.name}! 🚀
            </h1>
            <p className="text-slate-600 text-lg">Grow your freelance business and showcase your talent</p>
            <div className="mt-6 flex justify-center">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full p-1">
                <div className="bg-white rounded-full px-6 py-2">
                  <span className="text-sm font-medium bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    Freelancer Dashboard
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards with Glassmorphism */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-6 shadow-xl shadow-emerald-500/10 border border-white/30 hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-300 group">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Grid3X3 className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-slate-700 mb-2">Active Gigs</h3>
              <p className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">8</p>
              <p className="text-sm text-slate-500 mt-1">3 new this week</p>
            </div>
          </div>

          <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-6 shadow-xl shadow-green-500/10 border border-white/30 hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-300 group">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-slate-700 mb-2">Monthly Revenue</h3>
              <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">$5.8K</p>
              <p className="text-sm text-slate-500 mt-1">+38% from last month</p>
            </div>
          </div>

          <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-6 shadow-xl shadow-yellow-500/10 border border-white/30 hover:shadow-2xl hover:shadow-yellow-500/20 transition-all duration-300 group">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-slate-700 mb-2">Projects Completed</h3>
              <p className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">127</p>
              <p className="text-sm text-slate-500 mt-1">100% on-time delivery</p>
            </div>
          </div>

          <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-6 shadow-xl shadow-orange-500/10 border border-white/30 hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-300 group">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-slate-700 mb-2">Client Rating</h3>
              <p className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">4.9</p>
              <p className="text-sm text-slate-500 mt-1">Top 1% performer</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <div className="lg:col-span-2">
            <div className="bg-white/20 backdrop-blur-xl rounded-2xl shadow-xl shadow-emerald-500/10 border border-white/30 overflow-hidden">
              <div className="p-6 border-b border-white/20">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-slate-800">Recent Projects</h2>
                  <Badge className="bg-emerald-100/80 text-emerald-800 backdrop-blur-sm">4 Active</Badge>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="bg-white/30 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/40 transition-all duration-300">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-800 mb-1">{order.title}</h4>
                          <p className="text-sm text-slate-600">for {order.client}</p>
                        </div>
                        <div className="text-right">
                          <Badge className={`${order.status === 'Completed' ? 'bg-green-100/80 text-green-800' : order.status === 'In Progress' ? 'bg-blue-100/80 text-blue-800' : 'bg-yellow-100/80 text-yellow-800'} backdrop-blur-sm`}>
                            {order.status}
                          </Badge>
                          <p className="text-sm font-bold text-emerald-600 mt-1">${order.earnings}</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-xs text-slate-500">
                        <span>Due: {order.deadline}</span>
                        <div className="flex items-center space-x-4">
                          {order.rating && (
                            <div className="flex items-center space-x-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span>{order.rating}</span>
                            </div>
                          )}
                          <div className="flex space-x-2">
                            <MessageSquare className="h-3 w-3" />
                            <Edit className="h-3 w-3" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions & Skills */}
          <div className="space-y-6">
            <div className="bg-white/20 backdrop-blur-xl rounded-2xl shadow-xl shadow-teal-500/10 border border-white/30">
              <div className="p-6 border-b border-white/20">
                <h2 className="text-xl font-bold text-slate-800">Quick Actions</h2>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  <Button className="w-full justify-start bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Gig
                  </Button>
                  <Button className="w-full justify-start bg-white/30 backdrop-blur-sm hover:bg-white/40 text-slate-700 border border-white/30">
                    <Edit className="h-4 w-4 mr-2" />
                    Update Profile
                  </Button>
                  <Button className="w-full justify-start bg-white/30 backdrop-blur-sm hover:bg-white/40 text-slate-700 border border-white/30">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Analytics
                  </Button>
                </div>
              </div>
            </div>

            {/* Top Skills */}
            <div className="bg-white/20 backdrop-blur-xl rounded-2xl shadow-xl shadow-green-500/10 border border-white/30">
              <div className="p-6 border-b border-white/20">
                <h2 className="text-xl font-bold text-slate-800">Top Skills</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {skills.map((skill, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-slate-700">{skill.name}</span>
                        <span className="text-xs text-slate-500">{skill.projects} projects</span>
                      </div>
                      <div className="w-full bg-white/30 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-emerald-600 font-medium">{skill.level}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Other placeholder pages
const PostJobPage = () => (
  <div className="min-h-screen bg-slate-50">
    <Navigation />
    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold text-slate-900 mb-4">Post a Job</h1>
      <p className="text-xl text-slate-600">Create a project and find the perfect freelancer</p>
    </div>
  </div>
);

const MessagesPage = () => (
  <div className="min-h-screen bg-slate-50">
    <Navigation />
    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold text-slate-900 mb-4">Messages</h1>
      <p className="text-xl text-slate-600">Communicate with your clients and freelancers</p>
    </div>
  </div>
);

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

// Export App wrapped with AuthProvider
export default function AppWithAuth() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}