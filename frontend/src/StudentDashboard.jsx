import React, { useState } from 'react';
import { Calendar, Briefcase, CheckCircle, Clock, TrendingUp, User, FileText, Upload, Send } from 'lucide-react';

// ShadCN-inspired Card Component
const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-lg border border-green-100 shadow-sm ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = '' }) => (
  <div className={`p-6 border-b border-green-100 ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className = '' }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className = '' }) => (
  <h3 className={`text-lg font-semibold text-slate-900 ${className}`}>
    {children}
  </h3>
);

// ShadCN-inspired Button Component
const Button = ({ children, variant = 'default', size = 'default', className = '', ...props }) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 disabled:pointer-events-none disabled:opacity-50';
  
  const variants = {
    default: 'bg-green-600 text-white hover:bg-green-700',
    outline: 'border-2 border-green-600 text-green-600 hover:bg-green-50',
    ghost: 'hover:bg-green-50 text-green-600',
  };
  
  const sizes = {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 rounded-md px-3',
    lg: 'h-11 rounded-md px-8',
  };
  
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// ShadCN-inspired Badge Component
const Badge = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: 'bg-green-100 text-green-800',
    success: 'bg-emerald-100 text-emerald-800',
    warning: 'bg-amber-100 text-amber-800',
    secondary: 'bg-slate-100 text-slate-800',
  };
  
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

// ShadCN-inspired Progress Component
const Progress = ({ value, className = '' }) => (
  <div className={`relative h-2 w-full overflow-hidden rounded-full bg-green-100 ${className}`}>
    <div
      className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all"
      style={{ width: `${value}%` }}
    />
  </div>
);

// Main Student Dashboard Component
const StudentDashboard = () => {
  const [applications] = useState([
    {
      id: 1,
      company: 'Tech Innovations Ltd.',
      position: 'Software Engineer',
      package: '₹8-12 LPA',
      applicants: 156,
      deadline: '15th Jan 2026',
      verified: true,
    },
    {
      id: 2,
      company: 'DataCore Analytics',
      position: 'Data Analyst',
      package: '₹6-10 LPA',
      applicants: 89,
      deadline: '20th Jan 2026',
      verified: true,
    },
    {
      id: 3,
      company: 'CloudSync Solutions',
      position: 'Full Stack Developer',
      package: '₹7-11 LPA',
      applicants: 123,
      deadline: '18th Jan 2026',
      verified: true,
    },
  ]);

  const stats = [
    { label: 'Applications', value: 12, icon: Send, badge: '+3 This Week', badgeVariant: 'success' },
    { label: 'Interviews', value: 3, icon: Calendar, badge: '2 Upcoming', badgeVariant: 'warning' },
    { label: 'Offers', value: 1, icon: CheckCircle, badge: 'Pending Response', badgeVariant: 'success' },
    { label: 'Status', value: '🟡', icon: TrendingUp, badge: 'Unplaced', badgeVariant: 'warning' },
  ];

  const profileChecklist = [
    { task: 'Personal Information', completed: true },
    { task: 'Academic Details', completed: true },
    { task: 'Resume Uploaded', completed: true },
    { task: 'Skills & Projects', completed: false },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-green-100 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full border-2 border-green-600 bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold">
              JH
            </div>
            <div>
              <h1 className="text-xl font-bold">
                Place<span className="text-green-600">Flow</span>
              </h1>
              <p className="text-xs text-slate-500">Jamia Hamdard</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center text-white font-semibold text-sm">
              AS
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-semibold">Aarav Sharma</p>
              <p className="text-xs text-slate-500">B.Tech CSE</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Student Dashboard</h2>
          <p className="text-slate-600">Welcome back! Here's your placement status and opportunities.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <stat.icon className="h-5 w-5 text-green-600" />
                  <Badge variant={stat.badgeVariant}>{stat.badge}</Badge>
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-1">
                  {stat.value}
                </div>
                <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">
                  {stat.label}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Active Drives */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-green-600" />
                  Active Placement Drives
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {applications.map((job, index) => (
                  <div
                    key={job.id}
                    className={`p-6 hover:bg-green-50/50 transition-colors ${
                      index !== applications.length - 1 ? 'border-b border-green-100' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-1">{job.company}</h4>
                        <p className="text-sm text-slate-600">{job.position}</p>
                      </div>
                      {job.verified && (
                        <Badge variant="success" className="flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap gap-4 mb-4 text-sm text-slate-600">
                      <span className="flex items-center gap-1">
                        💰 {job.package}
                      </span>
                      <span className="flex items-center gap-1">
                        👥 {job.applicants} Applied
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {job.deadline}
                      </span>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm">
                        Apply Now
                      </Button>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Completion */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-green-600" />
                  Profile Completion
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">75% Complete</span>
                    <span className="text-sm font-semibold text-green-600">3 of 4 steps</span>
                  </div>
                  <Progress value={75} />
                </div>

                <div className="space-y-3">
                  {profileChecklist.map((item, index) => (
                    <div key={index} className="flex items-center gap-3 py-2">
                      <div
                        className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                          item.completed
                            ? 'bg-green-500 text-white'
                            : 'bg-slate-200 text-slate-400'
                        }`}
                      >
                        {item.completed ? '✓' : '○'}
                      </div>
                      <span className={item.completed ? 'text-slate-700' : 'text-slate-500'}>
                        {item.task}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full justify-start" variant="outline">
                  <User className="h-4 w-4 mr-2" />
                  Update Profile
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Resume
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  View Applications
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Send className="h-4 w-4 mr-2" />
                  Request NOC
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Watermark */}
      <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center opacity-5">
        <div className="text-[500px] font-bold text-green-600">JH</div>
      </div>
    </div>
  );
};

export default StudentDashboard;