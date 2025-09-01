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

// Placeholder components for the routes (will be implemented)
const BrowseFreelancersPage = () => <div>Browse Freelancers Page - Coming Soon</div>;
const ServicesPage = () => <div>Services Page - Coming Soon</div>;
const ServiceDetailPage = () => <div>Service Detail Page - Coming Soon</div>;
const FreelancerProfilePage = () => <div>Freelancer Profile Page - Coming Soon</div>;
const PostJobPage = () => <div>Post Job Page - Coming Soon</div>;
const MessagesPage = () => <div>Messages Page - Coming Soon</div>;
const HowItWorksPage = () => <div>How It Works Page - Coming Soon</div>;
const AboutPage = () => <div>About Page - Coming Soon</div>;
const ClientDashboard = () => <div>Client Dashboard - Coming Soon</div>;
const FreelancerDashboard = () => <div>Freelancer Dashboard - Coming Soon</div>;

// Export App wrapped with AuthProvider
export default function AppWithAuth() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}