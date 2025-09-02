// Enhanced Client Dashboard with Full Functionality
const ClientDashboard = () => {
  const { user } = useAuth();
  const [activeView, setActiveView] = useState('overview');
  const [activeProjects] = useState([
    { 
      id: 1, 
      title: "E-commerce Website Development", 
      freelancer: "Sarah Johnson", 
      freelancerAvatar: "https://images.unsplash.com/photo-1635768229592-8c2532d33cb7?w=100&h=100&fit=crop&crop=face",
      progress: 85, 
      status: "In Progress", 
      budget: 2500, 
      spent: 1800,
      deadline: "2025-02-15",
      description: "Modern e-commerce platform with payment integration",
      milestones: [
        { name: "Requirements Analysis", completed: true, date: "2025-01-20" },
        { name: "UI/UX Design", completed: true, date: "2025-01-25" },
        { name: "Frontend Development", completed: false, date: "2025-02-10" },
        { name: "Backend & Testing", completed: false, date: "2025-02-15" }
      ]
    },
    { 
      id: 2, 
      title: "Mobile App UI/UX Design", 
      freelancer: "Michael Chen", 
      freelancerAvatar: "https://images.unsplash.com/photo-1755352425808-b8223a330f15?w=100&h=100&fit=crop&crop=face",
      progress: 100, 
      status: "Completed", 
      budget: 1800, 
      spent: 1800,
      deadline: "2025-01-28",
      description: "Complete mobile app design system",
      milestones: [
        { name: "User Research", completed: true, date: "2025-01-15" },
        { name: "Wireframes", completed: true, date: "2025-01-20" },
        { name: "High-fidelity Designs", completed: true, date: "2025-01-25" },
        { name: "Prototyping", completed: true, date: "2025-01-28" }
      ]
    },
    { 
      id: 3, 
      title: "Brand Identity Package", 
      freelancer: "Emily Rodriguez", 
      freelancerAvatar: "https://images.unsplash.com/photo-1739287088635-444554e7ac0e?w=100&h=100&fit=crop&crop=face",
      progress: 60, 
      status: "In Progress", 
      budget: 1200, 
      spent: 720,
      deadline: "2025-02-20",
      description: "Complete brand identity and style guide",
      milestones: [
        { name: "Brand Strategy", completed: true, date: "2025-01-18" },
        { name: "Logo Design", completed: true, date: "2025-01-25" },
        { name: "Brand Guidelines", completed: false, date: "2025-02-15" },
        { name: "Marketing Materials", completed: false, date: "2025-02-20" }
      ]
    }
  ]);

  const [selectedProject, setSelectedProject] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100/80 text-green-800';
      case 'In Progress': return 'bg-blue-100/80 text-blue-800';
      case 'In Review': return 'bg-yellow-100/80 text-yellow-800';
      default: return 'bg-gray-100/80 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-indigo-50/50 to-purple-50/50"></div>
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 20px 20px, rgba(224, 231, 255, 0.3) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }}></div>
      
      {/* Enhanced Navigation */}
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
              <Button variant="ghost" size="sm" onClick={() => {}} className="bg-white/20 backdrop-blur-sm hover:bg-white/30 border border-white/20">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-8 shadow-2xl shadow-blue-500/20 border border-white/30">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  Welcome back, {user?.name}! 👋
                </h1>
                <p className="text-slate-600 text-lg">Manage your projects and track progress</p>
              </div>
              <div className="hidden md:flex space-x-4">
                <Link to="/post-job">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg">
                    <Plus className="h-4 w-4 mr-2" />
                    New Project
                  </Button>
                </Link>
                <Link to="/browse">
                  <Button variant="outline" className="bg-white/30 backdrop-blur-sm border-white/30 hover:bg-white/40">
                    <Search className="h-4 w-4 mr-2" />
                    Find Talent
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Navigation */}
        <div className="mb-8">
          <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-2 shadow-xl border border-white/30">
            <div className="flex space-x-2">
              {[
                { id: 'overview', label: 'Overview', icon: BarChart3 },
                { id: 'projects', label: 'Projects', icon: Briefcase },
                { id: 'finances', label: 'Finances', icon: DollarSign },
                { id: 'messages', label: 'Messages', icon: MessageSquare }
              ].map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveView(tab.id)}
                    className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                      activeView === tab.id
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                        : 'text-slate-600 hover:text-slate-800 hover:bg-white/30'
                    }`}
                  >
                    <IconComponent className="h-4 w-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Overview Tab */}
        {activeView === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-6 shadow-xl shadow-blue-500/10 border border-white/30 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 group">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Briefcase className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-slate-700 mb-2">Active Projects</h3>
                  <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">3</p>
                  <p className="text-sm text-slate-500 mt-1">2 in progress</p>
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-6 shadow-xl shadow-green-500/10 border border-white/30 hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-300 group">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <DollarSign className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-slate-700 mb-2">Total Investment</h3>
                  <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">$5.5K</p>
                  <p className="text-sm text-slate-500 mt-1">$4.3K spent</p>
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-6 shadow-xl shadow-purple-500/10 border border-white/30 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 group">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-slate-700 mb-2">Freelancers</h3>
                  <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">3</p>
                  <p className="text-sm text-slate-500 mt-1">All active</p>
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-6 shadow-xl shadow-amber-500/10 border border-white/30 hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-300 group">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Award className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-slate-700 mb-2">Avg Rating</h3>
                  <p className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">4.8</p>
                  <p className="text-sm text-slate-500 mt-1">From freelancers</p>
                </div>
              </div>
            </div>

            {/* Recent Projects Quick View */}
            <div className="bg-white/20 backdrop-blur-xl rounded-2xl shadow-xl shadow-blue-500/10 border border-white/30 overflow-hidden">
              <div className="p-6 border-b border-white/20">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-slate-800">Recent Activity</h2>
                  <Button 
                    onClick={() => setActiveView('projects')}
                    variant="outline" 
                    size="sm" 
                    className="bg-white/30 backdrop-blur-sm border-white/30"
                  >
                    View All
                  </Button>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {activeProjects.slice(0, 3).map((project) => (
                    <div key={project.id} className="bg-white/30 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/40 transition-all duration-300 cursor-pointer"
                         onClick={() => {setSelectedProject(project); setActiveView('projects');}}>
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-800 mb-1">{project.title}</h4>
                          <p className="text-sm text-slate-600">by {project.freelancer}</p>
                        </div>
                        <div className="text-right">
                          <Badge className={`${getStatusColor(project.status)} backdrop-blur-sm`}>
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
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Projects Tab */}
        {activeView === 'projects' && (
          <div className="space-y-6">
            {selectedProject ? (
              // Project Detail View
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <Button 
                    onClick={() => setSelectedProject(null)}
                    variant="outline"
                    className="bg-white/30 backdrop-blur-sm border-white/30"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Projects
                  </Button>
                  <div className="flex space-x-3">
                    <Button variant="outline" className="bg-white/30 backdrop-blur-sm border-white/30">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Project
                    </Button>
                  </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                  {/* Project Info */}
                  <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white/20 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 overflow-hidden">
                      <div className="p-6 border-b border-white/20">
                        <div className="flex items-start space-x-4">
                          <Avatar className="w-16 h-16">
                            <AvatarImage src={selectedProject.freelancerAvatar} />
                            <AvatarFallback>{selectedProject.freelancer.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h1 className="text-2xl font-bold text-slate-900 mb-2">{selectedProject.title}</h1>
                            <p className="text-slate-600 mb-3">{selectedProject.description}</p>
                            <div className="flex items-center space-x-4">
                              <span className="text-sm text-slate-600">by {selectedProject.freelancer}</span>
                              <Badge className={getStatusColor(selectedProject.status)}>
                                {selectedProject.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <h3 className="text-lg font-semibold text-slate-900 mb-4">Project Milestones</h3>
                        <div className="space-y-4">
                          {selectedProject.milestones.map((milestone, index) => (
                            <div key={index} className="flex items-center space-x-4">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                milestone.completed 
                                  ? 'bg-green-500 text-white' 
                                  : 'bg-white/30 backdrop-blur-sm text-slate-400'
                              }`}>
                                {milestone.completed ? <CheckCircle className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                              </div>
                              <div className="flex-1">
                                <div className={`font-medium ${milestone.completed ? 'text-slate-900' : 'text-slate-600'}`}>
                                  {milestone.name}
                                </div>
                                <div className="text-sm text-slate-500">{milestone.date}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Project Stats */}
                  <div className="space-y-6">
                    <div className="bg-white/20 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 p-6">
                      <h3 className="text-lg font-semibold text-slate-900 mb-4">Project Overview</h3>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm text-slate-600 mb-1">
                            <span>Progress</span>
                            <span>{selectedProject.progress}%</span>
                          </div>
                          <div className="w-full bg-white/30 rounded-full h-3">
                            <div 
                              className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300"
                              style={{ width: `${selectedProject.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center p-3 bg-white/30 backdrop-blur-sm rounded-xl">
                            <div className="text-2xl font-bold text-slate-900">${selectedProject.budget}</div>
                            <div className="text-sm text-slate-600">Budget</div>
                          </div>
                          <div className="text-center p-3 bg-white/30 backdrop-blur-sm rounded-xl">
                            <div className="text-2xl font-bold text-slate-900">${selectedProject.spent}</div>
                            <div className="text-sm text-slate-600">Spent</div>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-white/20">
                          <div className="text-sm text-slate-600 mb-1">Deadline</div>
                          <div className="font-semibold text-slate-900">{selectedProject.deadline}</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/20 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 p-6">
                      <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h3>
                      <div className="space-y-3">
                        <Button className="w-full justify-start bg-white/30 backdrop-blur-sm hover:bg-white/40 text-slate-700 border border-white/30">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Send Message
                        </Button>
                        <Button className="w-full justify-start bg-white/30 backdrop-blur-sm hover:bg-white/40 text-slate-700 border border-white/30">
                          <Eye className="h-4 w-4 mr-2" />
                          View Deliverables
                        </Button>
                        <Button className="w-full justify-start bg-white/30 backdrop-blur-sm hover:bg-white/40 text-slate-700 border border-white/30">
                          <Star className="h-4 w-4 mr-2" />
                          Leave Review
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // Projects List View
              <div className="bg-white/20 backdrop-blur-xl rounded-2xl shadow-xl shadow-blue-500/10 border border-white/30 overflow-hidden">
                <div className="p-6 border-b border-white/20">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-slate-800">All Projects</h2>
                    <Link to="/post-job">
                      <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                        <Plus className="h-4 w-4 mr-2" />
                        New Project
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {activeProjects.map((project) => (
                      <div key={project.id} 
                           className="bg-white/30 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/40 transition-all duration-300 cursor-pointer"
                           onClick={() => setSelectedProject(project)}>
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-start space-x-4 flex-1">
                            <Avatar className="w-12 h-12">
                              <AvatarImage src={project.freelancerAvatar} />
                              <AvatarFallback>{project.freelancer.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <h4 className="font-semibold text-slate-800 mb-1">{project.title}</h4>
                              <p className="text-sm text-slate-600 mb-2">{project.description}</p>
                              <p className="text-sm text-slate-600">by {project.freelancer}</p>
                            </div>
                          </div>
                          <div className="text-right flex flex-col items-end space-y-2">
                            <Badge className={`${getStatusColor(project.status)} backdrop-blur-sm`}>
                              {project.status}
                            </Badge>
                            <div className="text-lg font-bold text-slate-900">${project.budget}</div>
                            <div className="text-sm text-slate-500">Due: {project.deadline}</div>
                          </div>
                        </div>
                        <div className="mb-3">
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
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-slate-600">Spent: ${project.spent} of ${project.budget}</span>
                          <div className="flex space-x-2">
                            <MessageSquare className="h-4 w-4 text-slate-400 hover:text-blue-500 cursor-pointer" />
                            <Eye className="h-4 w-4 text-slate-400 hover:text-purple-500 cursor-pointer" />
                            <Edit className="h-4 w-4 text-slate-400 hover:text-green-500 cursor-pointer" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Finances Tab */}
        {activeView === 'finances' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/20 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Budget Overview</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Total Budget</span>
                    <span className="text-2xl font-bold text-slate-900">$5,500</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Amount Spent</span>
                    <span className="text-xl font-semibold text-red-600">$4,320</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Remaining</span>
                    <span className="text-xl font-semibold text-green-600">$1,180</span>
                  </div>
                  <div className="w-full bg-white/30 rounded-full h-3 mt-4">
                    <div className="bg-gradient-to-r from-red-500 to-orange-500 h-3 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Transactions</h3>
                <div className="space-y-3">
                  {[
                    { freelancer: "Sarah Johnson", amount: 800, date: "Jan 25", project: "E-commerce Development" },
                    { freelancer: "Michael Chen", amount: 1800, date: "Jan 28", project: "Mobile App Design" },
                    { freelancer: "Emily Rodriguez", amount: 400, date: "Jan 30", project: "Brand Identity" }
                  ].map((transaction, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-white/30 backdrop-blur-sm rounded-lg">
                      <div>
                        <div className="font-medium text-slate-900">{transaction.freelancer}</div>
                        <div className="text-sm text-slate-600">{transaction.project}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-slate-900">-${transaction.amount}</div>
                        <div className="text-sm text-slate-500">{transaction.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Messages Tab */}
        {activeView === 'messages' && (
          <div className="bg-white/20 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30">
            <div className="p-6 border-b border-white/20">
              <h2 className="text-xl font-bold text-slate-800">Messages</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {[
                  { freelancer: "Sarah Johnson", message: "I've completed the frontend setup. Ready for review!", time: "2 hours ago", unread: true },
                  { freelancer: "Michael Chen", message: "Final designs are uploaded to the project folder.", time: "1 day ago", unread: false },
                  { freelancer: "Emily Rodriguez", message: "Can we schedule a call to discuss the brand direction?", time: "2 days ago", unread: true }
                ].map((msg, index) => (
                  <div key={index} className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                    msg.unread 
                      ? 'bg-blue-50/50 border-blue-200/50 hover:bg-blue-50/70' 
                      : 'bg-white/30 border-white/20 hover:bg-white/40'
                  }`}>
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-semibold text-slate-900">{msg.freelancer}</div>
                      <div className="text-sm text-slate-500">{msg.time}</div>
                    </div>
                    <p className="text-slate-700">{msg.message}</p>
                    {msg.unread && (
                      <div className="mt-2">
                        <Badge className="bg-blue-500/20 text-blue-700">New</Badge>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Enhanced Freelancer Dashboard with Full Functionality
const FreelancerDashboard = () => {
  const { user } = useAuth();
  const [activeView, setActiveView] = useState('overview');
  const [recentOrders] = useState([
    { 
      id: 1, 
      title: "E-commerce Platform Development", 
      client: "TechCorp Inc.", 
      clientAvatar: "https://images.unsplash.com/photo-1670851810697-68ddb4ecae1c?w=100&h=100&fit=crop&crop=face",
      earnings: 2800, 
      status: "Completed", 
      rating: 5, 
      deadline: "2025-01-25",
      description: "Modern e-commerce platform with payment integration"
    },
    { 
      id: 2, 
      title: "Mobile App UI Design", 
      client: "StartupXYZ", 
      clientAvatar: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=100&h=100&fit=crop&crop=face",
      earnings: 1500, 
      status: "In Progress", 
      rating: null, 
      deadline: "2025-02-10",
      description: "Complete mobile app design system"
    },
    { 
      id: 3, 
      title: "Brand Identity Package", 
      client: "Creative Co.", 
      clientAvatar: "https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?w=100&h=100&fit=crop&crop=face",
      earnings: 900, 
      status: "In Review", 
      rating: null, 
      deadline: "2025-02-05",
      description: "Complete brand identity and style guide"
    }
  ]);

  const [skills] = useState([
    { name: "React Development", level: 95, projects: 45, category: "Frontend", color: "from-blue-500 to-blue-600" },
    { name: "UI/UX Design", level: 88, projects: 32, category: "Design", color: "from-purple-500 to-purple-600" },
    { name: "Node.js", level: 82, projects: 28, category: "Backend", color: "from-green-500 to-green-600" },
    { name: "Python", level: 78, projects: 25, category: "Backend", color: "from-yellow-500 to-yellow-600" }
  ]);

  const [portfolio, setPortfolio] = useState([
    { 
      id: 1, 
      title: "E-commerce Dashboard", 
      category: "Web Development", 
      image: "https://images.unsplash.com/photo-1657697071046-1eef624e96e9?w=400&h=300&fit=crop",
      description: "Modern admin dashboard for e-commerce management",
      technologies: ["React", "Node.js", "MongoDB"],
      link: "https://example.com"
    },
    { 
      id: 2, 
      title: "Mobile Banking App", 
      category: "UI/UX Design", 
      image: "https://images.unsplash.com/photo-1753162657289-6569cd1da479?w=400&h=300&fit=crop",
      description: "Clean and intuitive mobile banking interface",
      technologies: ["Figma", "Principle", "After Effects"],
      link: "https://example.com"
    },
    { 
      id: 3, 
      title: "SaaS Landing Page", 
      category: "Web Development", 
      image: "https://images.unsplash.com/photo-1590650467980-8eadfa86ff48?w=400&h=300&fit=crop",
      description: "High-converting landing page for SaaS product",
      technologies: ["React", "Tailwind", "Framer Motion"],
      link: "https://example.com"
    }
  ]);

  const [showAddPortfolio, setShowAddPortfolio] = useState(false);
  const [newPortfolioItem, setNewPortfolioItem] = useState({
    title: "",
    category: "",
    description: "",
    technologies: "",
    link: ""
  });

  const handleAddPortfolio = (e) => {
    e.preventDefault();
    const newItem = {
      id: portfolio.length + 1,
      ...newPortfolioItem,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
      technologies: newPortfolioItem.technologies.split(',').map(t => t.trim())
    };
    setPortfolio([...portfolio, newItem]);
    setNewPortfolioItem({ title: "", category: "", description: "", technologies: "", link: "" });
    setShowAddPortfolio(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100/80 text-green-800';
      case 'In Progress': return 'bg-blue-100/80 text-blue-800';
      case 'In Review': return 'bg-yellow-100/80 text-yellow-800';
      default: return 'bg-gray-100/80 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-teal-50/50 to-green-50/50"></div>
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 25px 25px, rgba(209, 250, 229, 0.4) 2px, transparent 0)`,
        backgroundSize: '50px 50px'
      }}></div>
      
      {/* Enhanced Navigation */}
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
              <Button variant="ghost" size="sm" onClick={() => {}} className="bg-white/20 backdrop-blur-sm hover:bg-white/30 border border-white/20">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-8 shadow-2xl shadow-emerald-500/20 border border-white/30">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
                  Welcome back, {user?.name}! 🚀
                </h1>
                <p className="text-slate-600 text-lg">Grow your freelance business and showcase your talent</p>
              </div>
              <div className="hidden md:flex space-x-4">
                <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Gig
                </Button>
                <Button variant="outline" className="bg-white/30 backdrop-blur-sm border-white/30 hover:bg-white/40">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Navigation */}
        <div className="mb-8">
          <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-2 shadow-xl border border-white/30">
            <div className="flex space-x-2">
              {[
                { id: 'overview', label: 'Overview', icon: BarChart3 },
                { id: 'projects', label: 'Projects', icon: Briefcase },
                { id: 'portfolio', label: 'Portfolio', icon: Folder },
                { id: 'skills', label: 'Skills', icon: Target },
                { id: 'earnings', label: 'Earnings', icon: DollarSign }
              ].map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveView(tab.id)}
                    className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                      activeView === tab.id
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg'
                        : 'text-slate-600 hover:text-slate-800 hover:bg-white/30'
                    }`}
                  >
                    <IconComponent className="h-4 w-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Overview Tab */}
        {activeView === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-6 shadow-xl shadow-emerald-500/10 border border-white/30 hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-300 group">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Grid3X3 className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-slate-700 mb-2">Active Gigs</h3>
                  <p className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">3</p>
                  <p className="text-sm text-slate-500 mt-1">1 new this week</p>
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-6 shadow-xl shadow-green-500/10 border border-white/30 hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-300 group">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <TrendingUp className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-slate-700 mb-2">Monthly Revenue</h3>
                  <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">$5.2K</p>
                  <p className="text-sm text-slate-500 mt-1">+38% from last month</p>
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-6 shadow-xl shadow-yellow-500/10 border border-white/30 hover:shadow-2xl hover:shadow-yellow-500/20 transition-all duration-300 group">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Target className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-slate-700 mb-2">Projects Completed</h3>
                  <p className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">47</p>
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
                  <p className="text-sm text-slate-500 mt-1">Top 5% performer</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/20 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button className="w-full justify-start bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Gig
                  </Button>
                  <Button 
                    onClick={() => setActiveView('portfolio')}
                    className="w-full justify-start bg-white/30 backdrop-blur-sm hover:bg-white/40 text-slate-700 border border-white/30"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload to Portfolio
                  </Button>
                  <Button className="w-full justify-start bg-white/30 backdrop-blur-sm hover:bg-white/40 text-slate-700 border border-white/30">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Analytics
                  </Button>
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {[
                    { action: "New order received", client: "TechCorp Inc.", time: "2 hours ago" },
                    { action: "Project delivered", client: "StartupXYZ", time: "1 day ago" },
                    { action: "5-star review received", client: "Creative Co.", time: "3 days ago" }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-white/30 backdrop-blur-sm rounded-lg">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-900">{activity.action}</p>
                        <p className="text-xs text-slate-600">{activity.client} • {activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Projects Tab */}
        {activeView === 'projects' && (
          <div className="bg-white/20 backdrop-blur-xl rounded-2xl shadow-xl shadow-emerald-500/10 border border-white/30 overflow-hidden">
            <div className="p-6 border-b border-white/20">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-800">My Projects</h2>
                <Badge className="bg-emerald-100/80 text-emerald-800 backdrop-blur-sm">3 Active</Badge>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="bg-white/30 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/40 transition-all duration-300">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-start space-x-4 flex-1">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={order.clientAvatar} />
                          <AvatarFallback>{order.client.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-800 mb-1">{order.title}</h4>
                          <p className="text-sm text-slate-600 mb-2">{order.description}</p>
                          <p className="text-sm text-slate-600">for {order.client}</p>
                        </div>
                      </div>
                      <div className="text-right flex flex-col items-end space-y-2">
                        <Badge className={`${getStatusColor(order.status)} backdrop-blur-sm`}>
                          {order.status}
                        </Badge>
                        <div className="text-lg font-bold text-emerald-600">${order.earnings}</div>
                        <div className="text-sm text-slate-500">Due: {order.deadline}</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      {order.rating && (
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{order.rating}</span>
                        </div>
                      )}
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="bg-white/40 backdrop-blur-sm border-white/30">
                          <MessageSquare className="h-3 w-3 mr-1" />
                          Message
                        </Button>
                        <Button size="sm" variant="outline" className="bg-white/40 backdrop-blur-sm border-white/30">
                          <Upload className="h-3 w-3 mr-1" />
                          Deliver
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Portfolio Tab */}
        {activeView === 'portfolio' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">My Portfolio</h2>
              <Button 
                onClick={() => setShowAddPortfolio(true)}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Project
              </Button>
            </div>

            {/* Add Portfolio Modal */}
            {showAddPortfolio && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 p-6 max-w-md w-full">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-slate-900">Add Portfolio Item</h3>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setShowAddPortfolio(false)}
                      className="text-slate-500 hover:text-slate-700"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <form onSubmit={handleAddPortfolio} className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Project Title</label>
                      <Input
                        placeholder="My awesome project"
                        value={newPortfolioItem.title}
                        onChange={(e) => setNewPortfolioItem({...newPortfolioItem, title: e.target.value})}
                        className="bg-white/50 backdrop-blur-sm border-white/30"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Category</label>
                      <select 
                        value={newPortfolioItem.category}
                        onChange={(e) => setNewPortfolioItem({...newPortfolioItem, category: e.target.value})}
                        className="w-full h-10 bg-white/50 backdrop-blur-sm border border-white/30 rounded-md px-3"
                        required
                      >
                        <option value="">Select category</option>
                        <option value="Web Development">Web Development</option>
                        <option value="UI/UX Design">UI/UX Design</option>
                        <option value="Mobile Development">Mobile Development</option>
                        <option value="Graphic Design">Graphic Design</option>
                        <option value="Content Writing">Content Writing</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
                      <textarea
                        placeholder="Describe your project..."
                        value={newPortfolioItem.description}
                        onChange={(e) => setNewPortfolioItem({...newPortfolioItem, description: e.target.value})}
                        className="w-full h-20 bg-white/50 backdrop-blur-sm border border-white/30 rounded-md px-3 py-2 resize-none"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Technologies (comma-separated)</label>
                      <Input
                        placeholder="React, Node.js, MongoDB"
                        value={newPortfolioItem.technologies}
                        onChange={(e) => setNewPortfolioItem({...newPortfolioItem, technologies: e.target.value})}
                        className="bg-white/50 backdrop-blur-sm border-white/30"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Project Link (Optional)</label>
                      <Input
                        type="url"
                        placeholder="https://example.com"
                        value={newPortfolioItem.link}
                        onChange={(e) => setNewPortfolioItem({...newPortfolioItem, link: e.target.value})}
                        className="bg-white/50 backdrop-blur-sm border-white/30"
                      />
                    </div>
                    
                    <div className="flex space-x-3 pt-4">
                      <Button 
                        type="button"
                        onClick={() => setShowAddPortfolio(false)}
                        variant="outline"
                        className="flex-1 bg-white/50 backdrop-blur-sm border-white/30"
                      >
                        Cancel
                      </Button>
                      <Button 
                        type="submit"
                        className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600"
                      >
                        Add Project
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Portfolio Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolio.map((item) => (
                <div key={item.id} className="bg-white/20 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 overflow-hidden hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-300 group">
                  <div className="aspect-video bg-slate-200 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <Badge className="bg-emerald-100/80 text-emerald-800 text-xs">
                        {item.category}
                      </Badge>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-white/30">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-white/30 text-red-500">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    
                    <h3 className="font-semibold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">
                      {item.title}
                    </h3>
                    
                    <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                      {item.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {item.technologies.slice(0, 3).map((tech, index) => (
                        <Badge key={index} variant="secondary" className="text-xs bg-white/40 backdrop-blur-sm">
                          {tech}
                        </Badge>
                      ))}
                      {item.technologies.length > 3 && (
                        <Badge variant="secondary" className="text-xs bg-white/40 backdrop-blur-sm">
                          +{item.technologies.length - 3}
                        </Badge>
                      )}
                    </div>
                    
                    {item.link && (
                      <Button size="sm" variant="outline" className="w-full bg-white/30 backdrop-blur-sm border-white/30">
                        <Globe className="h-3 w-3 mr-2" />
                        View Project
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills Tab */}
        {activeView === 'skills' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">My Skills</h2>
              <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Skill
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {skills.map((skill, index) => (
                <div key={index} className="bg-white/20 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 p-6 hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-slate-900 text-lg">{skill.name}</h3>
                      <p className="text-sm text-slate-600">{skill.category}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                        {skill.level}%
                      </div>
                      <p className="text-xs text-slate-500">{skill.projects} projects</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="w-full bg-white/30 rounded-full h-3">
                      <div 
                        className={`bg-gradient-to-r ${skill.color} h-3 rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-600">Proficiency</span>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="ghost" className="h-6 w-6 p-0 hover:bg-white/30">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-6 w-6 p-0 hover:bg-white/30 text-red-500">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Earnings Tab */}
        {activeView === 'earnings' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/20 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">This Month</h3>
                <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
                  $5,200
                </div>
                <p className="text-sm text-green-600">+38% from last month</p>
              </div>
              
              <div className="bg-white/20 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">All Time</h3>
                <div className="text-3xl font-bold text-slate-900 mb-2">$47,350</div>
                <p className="text-sm text-slate-600">Total earnings</p>
              </div>
              
              <div className="bg-white/20 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Available</h3>
                <div className="text-3xl font-bold text-blue-600 mb-2">$2,800</div>
                <p className="text-sm text-slate-600">Ready to withdraw</p>
              </div>
            </div>

            <div className="bg-white/20 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30">
              <div className="p-6 border-b border-white/20">
                <h3 className="text-lg font-semibold text-slate-900">Recent Earnings</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {[
                    { project: "E-commerce Platform Development", client: "TechCorp Inc.", amount: 2800, date: "Jan 25", status: "Completed" },
                    { project: "Mobile App UI Design", client: "StartupXYZ", amount: 1500, date: "Jan 20", status: "In Progress" },
                    { project: "Brand Identity Package", client: "Creative Co.", amount: 900, date: "Jan 15", status: "Completed" }
                  ].map((earning, index) => (
                    <div key={index} className="flex justify-between items-start p-4 bg-white/30 backdrop-blur-sm rounded-xl border border-white/20">
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-900 mb-1">{earning.project}</h4>
                        <p className="text-sm text-slate-600">{earning.client}</p>
                        <p className="text-xs text-slate-500 mt-1">{earning.date}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-emerald-600">${earning.amount}</div>
                        <Badge className={`text-xs ${getStatusColor(earning.status)}`}>
                          {earning.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Export the components
export { ClientDashboard, FreelancerDashboard };