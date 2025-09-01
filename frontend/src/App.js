import React, { useState, createContext, useContext } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Create Auth Context
const AuthContext = createContext();

// Mock data for demo
const mockFreelancers = [
  {
    id: 1,
    name: "Sarah Johnson",
    title: "Full Stack Developer",
    rating: 4.9,
    reviews: 127,
    hourlyRate: 45,
    skills: ["React", "Node.js", "Python", "MongoDB"],
    profileImage: "https://images.unsplash.com/photo-1635768229592-8c2532d33cb7?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHwyfHxwcm9mZXNzaW9uYWwlMjB3b3Jrc3BhY2V8ZW58MHx8fHwxNzU2NzQxODcwfDA&ixlib=rb-4.1.0&q=85",
    description: "Experienced full-stack developer with 5+ years in building scalable web applications.",
    completedProjects: 89,
    location: "San Francisco, CA"
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "UI/UX Designer",
    rating: 4.8,
    reviews: 93,
    hourlyRate: 40,
    skills: ["Figma", "Adobe XD", "Sketch", "Prototyping"],
    profileImage: "https://images.unsplash.com/photo-1755352425808-b8223a330f15?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwxfHxmcmVlbGFuY2VyJTIwd29ya3NwYWNlfGVufDB8fHx8MTc1Njc0MTg2NXww&ixlib=rb-4.1.0&q=85",
    description: "Creative designer focused on user-centered design and modern interfaces.",
    completedProjects: 76,
    location: "New York, NY"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    title: "Content Writer",
    rating: 4.9,
    reviews: 156,
    hourlyRate: 30,
    skills: ["Content Writing", "SEO", "Copywriting", "Social Media"],
    profileImage: "https://images.unsplash.com/photo-1739287088635-444554e7ac0e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHw0fHxwcm9mZXNzaW9uYWwlMjB3b3Jrc3BhY2V8ZW58MHx8fHwxNzU2NzQxODcwfDA&ixlib=rb-4.1.0&q=85",
    description: "Professional content writer specializing in tech, lifestyle, and business content.",
    completedProjects: 134,
    location: "Austin, TX"
  },
  {
    id: 4,
    name: "David Kim",
    title: "Digital Marketer",
    rating: 4.7,
    reviews: 82,
    hourlyRate: 50,
    skills: ["Google Ads", "Facebook Ads", "SEO", "Analytics"],
    profileImage: "https://images.pexels.com/photos/8472496/pexels-photo-8472496.jpeg",
    description: "Data-driven digital marketer with expertise in paid advertising and growth strategies.",
    completedProjects: 67,
    location: "Los Angeles, CA"
  }
];

const mockServices = [
  {
    id: 1,
    title: "I will develop a full-stack web application",
    freelancer: "Sarah Johnson",
    price: 500,
    rating: 4.9,
    reviews: 42,
    image: "https://images.unsplash.com/photo-1657697071046-1eef624e96e9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwyfHxmcmVlbGFuY2VyJTIwd29ya3NwYWNlfGVufDB8fHx8MTc1Njc0MTg2NXww&ixlib=rb-4.1.0&q=85",
    deliveryTime: "7 days"
  },
  {
    id: 2,
    title: "I will design modern UI/UX for your app",
    freelancer: "Michael Chen",
    price: 350,
    rating: 4.8,
    reviews: 38,
    image: "https://images.unsplash.com/photo-1657697070834-30536672247d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHw0fHxmcmVlbGFuY2VyJTIwd29ya3NwYWNlfGVufDB8fHx8MTc1Njc0MTg2NXww&ixlib=rb-4.1.0&q=85",
    deliveryTime: "5 days"
  }
];

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
  Globe
} from "lucide-react";

// Auth Provider Component
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null); // 'freelancer' or 'client'

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
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-emerald-600">FreelanceHub</h1>
            </div>
            <div className="hidden md:flex space-x-6">
              <a href="/" className="text-slate-700 hover:text-emerald-600 font-medium transition-colors">
                Find Work
              </a>
              <a href="/" className="text-slate-700 hover:text-emerald-600 font-medium transition-colors">
                Find Talent
              </a>
              <a href="/" className="text-slate-700 hover:text-emerald-600 font-medium transition-colors">
                Categories
              </a>
            </div>
          </div>
          
          {user ? (
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <MessageSquare className="h-4 w-4 mr-2" />
                Messages
              </Button>
              <Button variant="ghost" size="sm" onClick={logout}>
                <User className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                Join
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

// Home Page Component
const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "development", name: "Development", icon: Code, color: "bg-blue-500" },
    { id: "design", name: "Design", icon: Palette, color: "bg-purple-500" },
    { id: "writing", name: "Writing", icon: PenTool, color: "bg-green-500" },
    { id: "marketing", name: "Marketing", icon: Megaphone, color: "bg-orange-500" },
    { id: "video", name: "Video & Animation", icon: Camera, color: "bg-red-500" },
    { id: "music", name: "Music & Audio", icon: Music, color: "bg-indigo-500" },
    { id: "business", name: "Business", icon: Briefcase, color: "bg-teal-500" },
    { id: "ai", name: "AI Services", icon: Zap, color: "bg-yellow-500" }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23059669%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
                  Find the perfect
                  <span className="text-emerald-600 block">freelance services</span>
                  for your business
                </h1>
                <p className="text-xl text-slate-600 max-w-lg">
                  Connect with talented professionals and get your projects done efficiently. 
                  From web development to creative design.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 h-12 px-8">
                  Get Started
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" className="h-12 px-8">
                  How it works
                </Button>
              </div>
              
              <div className="flex items-center space-x-8 text-sm text-slate-600">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-emerald-600" />
                  <span>10,000+ Freelancers</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-emerald-600" />
                  <span>99% Success Rate</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden bg-white shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1718220216044-006f43e3a9b1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b3Jrc3BhY2V8ZW58MHx8fHwxNzU2NzQxODcwfDA&ixlib=rb-4.1.0&q=85"
                  alt="Professional workspace"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white rounded-xl p-4 shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-slate-700">2.4K+ Active Projects</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <Input
                placeholder="What service are you looking for today?"
                className="pl-12 h-14 text-lg bg-slate-50 border-slate-200 focus:bg-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button className="absolute right-2 top-2 h-10 bg-emerald-600 hover:bg-emerald-700">
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Browse by Category</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Explore our wide range of professional services across different industries
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Card key={category.id} className="group cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-slate-900">{category.name}</h3>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Freelancers */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Top Freelancers</h2>
              <p className="text-slate-600">Discover talented professionals ready to work on your project</p>
            </div>
            <Button variant="outline">View All</Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockFreelancers.map((freelancer) => (
              <Card key={freelancer.id} className="group cursor-pointer transition-all hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <Avatar className="w-20 h-20 mx-auto mb-4">
                      <AvatarImage src={freelancer.profileImage} alt={freelancer.name} />
                      <AvatarFallback>{freelancer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold text-slate-900">{freelancer.name}</h3>
                    <p className="text-slate-600 text-sm">{freelancer.title}</p>
                    <div className="flex items-center justify-center mt-2">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{freelancer.rating}</span>
                        <span className="text-sm text-slate-500">({freelancer.reviews})</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-1">
                      {freelancer.skills.slice(0, 3).map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center pt-3 border-t">
                      <span className="text-sm text-slate-600">Starting at</span>
                      <span className="font-semibold text-emerald-600">${freelancer.hourlyRate}/hr</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Services */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Popular Services</h2>
            <p className="text-slate-600">Most requested services by our clients</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {mockServices.map((service) => (
              <Card key={service.id} className="overflow-hidden group cursor-pointer transition-all hover:shadow-lg">
                <div className="aspect-video bg-slate-200 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-slate-900 flex-1">{service.title}</h3>
                    <Heart className="h-5 w-5 text-slate-400 hover:text-red-500 cursor-pointer ml-3" />
                  </div>
                  
                  <p className="text-sm text-slate-600 mb-3">by {service.freelancer}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{service.rating}</span>
                      <span className="text-sm text-slate-500">({service.reviews})</span>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-lg font-bold text-slate-900">From ${service.price}</div>
                      <div className="text-sm text-slate-500">{service.deliveryTime}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-emerald-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to get started?
          </h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses and freelancers who trust FreelanceHub for their projects
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="h-12 px-8">
              Start as a Client
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 border-white text-white hover:bg-white hover:text-emerald-600">
              Join as a Freelancer
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">FreelanceHub</h3>
              <p className="text-slate-400">
                The world's work marketplace. Connect with skilled professionals and get work done.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">For Clients</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">How to Hire</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Talent Marketplace</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Project Catalog</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">For Freelancers</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">How to Find Work</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Direct Contracts</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Find Freelance Jobs</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Leadership</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-8 pt-8 text-center">
            <p>&copy; 2024 FreelanceHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Login Page Component
const LoginPage = () => {
  const { login } = useAuth();
  const [isFreelancer, setIsFreelancer] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleLogin = (e) => {
    e.preventDefault();
    // Demo login logic
    const userData = {
      id: 1,
      name: isFreelancer ? "John Freelancer" : "Jane Client",
      email: formData.email
    };
    login(userData, isFreelancer ? "freelancer" : "client");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-emerald-600 mb-2">FreelanceHub</h1>
            <h2 className="text-2xl font-bold text-slate-900">Welcome back</h2>
            <p className="text-slate-600 mt-2">Sign in to your account</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
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

              {/* Demo Credentials */}
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
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden lg:block lg:flex-1">
        <div className="h-full bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center p-12">
          <div className="max-w-lg text-center text-white space-y-6">
            <h3 className="text-3xl font-bold">
              {isFreelancer ? "Start your freelance journey" : "Find perfect talent"}
            </h3>
            <p className="text-emerald-100 text-lg">
              {isFreelancer 
                ? "Join thousands of freelancers building successful careers on our platform"
                : "Connect with skilled professionals and bring your ideas to life"
              }
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold">10K+</div>
                <div className="text-emerald-100">Active Users</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold">99%</div>
                <div className="text-emerald-100">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Client Dashboard Component
const ClientDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  const mockProjects = [
    {
      id: 1,
      title: "E-commerce Website Development",
      freelancer: "Sarah Johnson",
      status: "In Progress",
      budget: 2500,
      deadline: "Dec 15, 2024",
      progress: 65
    },
    {
      id: 2,
      title: "Logo Design & Branding",
      freelancer: "Michael Chen",
      status: "Completed",
      budget: 800,
      deadline: "Nov 30, 2024",
      progress: 100
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <Card>
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <Avatar className="w-20 h-20 mx-auto mb-4">
                    <AvatarImage src="/api/placeholder/80/80" />
                    <AvatarFallback className="text-lg">
                      {user?.name?.split(' ').map(n => n[0]).join('') || 'JC'}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold text-slate-900">{user?.name || 'Jane Client'}</h3>
                  <p className="text-slate-600 text-sm">Client Account</p>
                  <Badge variant="secondary" className="mt-2">Verified</Badge>
                </div>
                
                <nav className="space-y-2">
                  <Button 
                    variant={activeTab === "overview" ? "default" : "ghost"} 
                    className="w-full justify-start"
                    onClick={() => setActiveTab("overview")}
                  >
                    <Briefcase className="h-4 w-4 mr-2" />
                    Overview
                  </Button>
                  <Button 
                    variant={activeTab === "projects" ? "default" : "ghost"} 
                    className="w-full justify-start"
                    onClick={() => setActiveTab("projects")}
                  >
                    <Grid3X3 className="h-4 w-4 mr-2" />
                    My Projects
                  </Button>
                  <Button 
                    variant={activeTab === "messages" ? "default" : "ghost"} 
                    className="w-full justify-start"
                    onClick={() => setActiveTab("messages")}
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Messages
                  </Button>
                  <Button 
                    variant={activeTab === "profile" ? "default" : "ghost"} 
                    className="w-full justify-start"
                    onClick={() => setActiveTab("profile")}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === "overview" && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-3xl font-bold text-slate-900 mb-2">Dashboard Overview</h1>
                  <p className="text-slate-600">Welcome back, {user?.name || 'Jane'}! Here's what's happening with your projects.</p>
                </div>

                {/* Stats Cards */}
                <div className="grid md:grid-cols-4 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-slate-600 mb-1">Active Projects</p>
                          <p className="text-3xl font-bold text-slate-900">3</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Briefcase className="h-6 w-6 text-blue-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-slate-600 mb-1">Total Spent</p>
                          <p className="text-3xl font-bold text-slate-900">$8.2K</p>
                        </div>
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                          <DollarSign className="h-6 w-6 text-green-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-slate-600 mb-1">Completed</p>
                          <p className="text-3xl font-bold text-slate-900">12</p>
                        </div>
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Award className="h-6 w-6 text-purple-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-slate-600 mb-1">Messages</p>
                          <p className="text-3xl font-bold text-slate-900">5</p>
                        </div>
                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                          <MessageSquare className="h-6 w-6 text-orange-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Projects */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Projects</CardTitle>
                    <CardDescription>Your latest project activities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockProjects.map((project) => (
                        <div key={project.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                          <div className="flex-1">
                            <h4 className="font-medium text-slate-900">{project.title}</h4>
                            <p className="text-sm text-slate-600">by {project.freelancer}</p>
                            <div className="flex items-center space-x-4 mt-2">
                              <Badge 
                                variant={project.status === "Completed" ? "default" : "secondary"}
                                className={project.status === "Completed" ? "bg-green-600" : ""}
                              >
                                {project.status}
                              </Badge>
                              <span className="text-sm text-slate-500">Due: {project.deadline}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-slate-900">${project.budget}</p>
                            <p className="text-sm text-slate-500">{project.progress}% complete</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "projects" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-slate-900">My Projects</h2>
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    Post New Project
                  </Button>
                </div>

                <div className="grid gap-6">
                  {mockProjects.map((project) => (
                    <Card key={project.id}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-slate-900">{project.title}</h3>
                            <p className="text-slate-600">Working with {project.freelancer}</p>
                          </div>
                          <Badge 
                            variant={project.status === "Completed" ? "default" : "secondary"}
                            className={project.status === "Completed" ? "bg-green-600" : ""}
                          >
                            {project.status}
                          </Badge>
                        </div>

                        <div className="grid md:grid-cols-3 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-slate-600">Budget</p>
                            <p className="font-semibold">${project.budget}</p>
                          </div>
                          <div>
                            <p className="text-sm text-slate-600">Deadline</p>
                            <p className="font-semibold">{project.deadline}</p>
                          </div>
                          <div>
                            <p className="text-sm text-slate-600">Progress</p>
                            <p className="font-semibold">{project.progress}%</p>
                          </div>
                        </div>

                        <div className="flex space-x-3">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                          <Button variant="outline" size="sm">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Message
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "profile" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900">Profile Settings</h2>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">First Name</label>
                        <Input defaultValue="Jane" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Last Name</label>
                        <Input defaultValue="Client" />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                      <Input defaultValue="jane@example.com" />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Company</label>
                      <Input defaultValue="Tech Startup Inc." />
                    </div>

                    <Button className="bg-emerald-600 hover:bg-emerald-700">
                      Save Changes
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Freelancer Dashboard Component  
const FreelancerDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  const mockGigs = [
    {
      id: 1,
      title: "I will develop a full-stack web application",
      price: 500,
      orders: 15,
      rating: 4.9,
      status: "Active"
    },
    {
      id: 2,
      title: "I will create a responsive landing page",
      price: 300,
      orders: 8,
      rating: 4.8,
      status: "Active"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <Card>
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <Avatar className="w-20 h-20 mx-auto mb-4">
                    <AvatarImage src="/api/placeholder/80/80" />
                    <AvatarFallback className="text-lg">
                      {user?.name?.split(' ').map(n => n[0]).join('') || 'JF'}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold text-slate-900">{user?.name || 'John Freelancer'}</h3>
                  <p className="text-slate-600 text-sm">Full Stack Developer</p>
                  <div className="flex items-center justify-center mt-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="font-medium">4.9</span>
                    <span className="text-slate-500 text-sm ml-1">(127 reviews)</span>
                  </div>
                </div>
                
                <nav className="space-y-2">
                  <Button 
                    variant={activeTab === "overview" ? "default" : "ghost"} 
                    className="w-full justify-start"
                    onClick={() => setActiveTab("overview")}
                  >
                    <Briefcase className="h-4 w-4 mr-2" />
                    Overview
                  </Button>
                  <Button 
                    variant={activeTab === "gigs" ? "default" : "ghost"} 
                    className="w-full justify-start"
                    onClick={() => setActiveTab("gigs")}
                  >
                    <Grid3X3 className="h-4 w-4 mr-2" />
                    My Gigs
                  </Button>
                  <Button 
                    variant={activeTab === "profile" ? "default" : "ghost"} 
                    className="w-full justify-start"
                    onClick={() => setActiveTab("profile")}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */ 
          <div className="flex-1">
            {activeTab === "overview" && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-3xl font-bold text-slate-900 mb-2">Freelancer Dashboard</h1>
                  <p className="text-slate-600">Welcome back, {user?.name || 'John'}! Here's your performance overview.</p>
                </div>

                {/* Stats Cards */}
                <div className="grid md:grid-cols-4 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-slate-600 mb-1">Active Gigs</p>
                          <p className="text-3xl font-bold text-slate-900">5</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Grid3X3 className="h-6 w-6 text-blue-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-slate-600 mb-1">Total Earnings</p>
                          <p className="text-3xl font-bold text-slate-900">$12.5K</p>
                        </div>
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                          <DollarSign className="h-6 w-6 text-green-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-slate-600 mb-1">Orders Completed</p>
                          <p className="text-3xl font-bold text-slate-900">89</p>
                        </div>
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Award className="h-6 w-6 text-purple-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-slate-600 mb-1">Success Rate</p>
                          <p className="text-3xl font-bold text-slate-900">98%</p>
                        </div>
                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                          <Users className="h-6 w-6 text-orange-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {activeTab === "gigs" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-slate-900">My Gigs</h2>
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    Create New Gig
                  </Button>
                </div>

                <div className="grid gap-6">
                  {mockGigs.map((gig) => (
                    <Card key={gig.id}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-slate-900">{gig.title}</h3>
                            <div className="flex items-center space-x-4 mt-2">
                              <Badge variant="secondary" className="bg-green-100 text-green-800">
                                {gig.status}
                              </Badge>
                              <div className="flex items-center">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                                <span className="text-sm font-medium">{gig.rating}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-emerald-600">${gig.price}</p>
                            <p className="text-sm text-slate-500">{gig.orders} orders</p>
                          </div>
                        </div>

                        <div className="flex space-x-3">
                          <Button variant="outline" size="sm">
                            Edit Gig
                          </Button>
                          <Button variant="outline" size="sm">
                            View Analytics
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "profile" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900">Profile Settings</h2>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Professional Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">First Name</label>
                        <Input defaultValue="John" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Last Name</label>
                        <Input defaultValue="Freelancer" />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Professional Title</label>
                      <Input defaultValue="Full Stack Developer" />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Hourly Rate</label>
                      <Input defaultValue="45" type="number" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Skills</label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {["React", "Node.js", "Python", "MongoDB"].map((skill) => (
                          <Badge key={skill} variant="secondary">{skill}</Badge>
                        ))}
                      </div>
                      <Input placeholder="Add new skill" />
                    </div>

                    <Button className="bg-emerald-600 hover:bg-emerald-700">
                      Save Changes
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
function App() {
  const { user, userType } = useAuth();

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
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

// Export App wrapped with AuthProvider
export default function AppWithAuth() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}