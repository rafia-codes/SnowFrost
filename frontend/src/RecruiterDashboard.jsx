import React, { useState } from 'react';
import { Users, FileText, CheckCircle, Calendar, Eye, Star, Filter, Download } from 'lucide-react';

const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-lg border border-green-100 shadow-sm ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="p-6 border-b border-green-100">{children}</div>
);

const CardContent = ({ children, className = '' }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

const CardTitle = ({ children }) => (
  <h3 className="text-lg font-semibold text-slate-900">{children}</h3>
);

const Button = ({ children, variant = 'default', size = 'default', className = '', ...props }) => {
  const variants = {
    default: 'bg-green-600 text-white hover:bg-green-700',
    outline: 'border-2 border-green-600 text-green-600 hover:bg-green-50',
  };
  
  const sizes = {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 px-3 text-sm',
  };
  
  return (
    <button
      className={`inline-flex items-center justify-center rounded-md font-medium transition-colors ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Badge = ({ children, variant = 'default' }) => {
  const variants = {
    default: 'bg-green-100 text-green-800',
    success: 'bg-emerald-100 text-emerald-800',
  };
  
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${variants[variant]}`}>
      {children}
    </span>
  );
};

const RecruiterDashboard = () => {
  const [applicants] = useState([
    {
      id: 1,
      name: 'Rahul Kumar',
      degree: 'B.Tech CSE',
      cgpa: 8.5,
      skills: ['Java', 'React', 'Node.js'],
      applied: '2 days ago',
      status: 'New',
    },
    {
      id: 2,
      name: 'Priya Sharma',
      degree: 'B.Tech IT',
      cgpa: 9.1,
      skills: ['Python', 'Django', 'ML'],
      applied: '3 days ago',
      status: 'Reviewed',
    },
    {
      id: 3,
      name: 'Arjun Patel',
      degree: 'B.Tech CSE',
      cgpa: 8.8,
      skills: ['C++', 'Data Structures', 'AWS'],
      applied: '4 days ago',
      status: 'New',
    },
  ]);

  const stats = [
    { label: 'Active Postings', value: 3, icon: FileText, color: 'from-green-500 to-emerald-500' },
    { label: 'Total Applications', value: 368, icon: Users, color: 'from-blue-500 to-cyan-500' },
    { label: 'Shortlisted', value: 42, icon: CheckCircle, color: 'from-purple-500 to-pink-500' },
    { label: 'Interviews', value: 12, icon: Calendar, color: 'from-orange-500 to-red-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
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
          <div className="flex items-center gap-4">
            <Badge variant="success">Tech Innovations Ltd.</Badge>
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center text-white font-semibold text-sm">
              TI
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Recruiter Dashboard</h2>
          <p className="text-slate-600">Manage your job postings and review applicants.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`h-12 w-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
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

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-green-600" />
                Recent Applicants - Software Engineer Position
              </CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {applicants.map((applicant, index) => (
              <div
                key={applicant.id}
                className={`p-6 hover:bg-green-50/50 transition-colors ${
                  index !== applicants.length - 1 ? 'border-b border-green-100' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-semibold">
                      {applicant.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-slate-900">{applicant.name}</h4>
                        {applicant.status === 'Shortlisted' && (
                          <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                        )}
                      </div>
                      <p className="text-sm text-slate-600 mb-2">
                        {applicant.degree} • CGPA: {applicant.cgpa}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {applicant.skills.map((skill, idx) => (
                          <Badge key={idx} variant="default">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-xs text-slate-500">Applied {applicant.applied}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View Profile
                    </Button>
                    <Button variant="outline" size="sm">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Shortlist
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Job Postings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-start p-4 rounded-lg border border-green-100 hover:bg-green-50/50 transition-colors">
                  <div>
                    <h4 className="font-semibold text-slate-900">Software Engineer</h4>
                    <p className="text-sm text-slate-600">156 applications</p>
                  </div>
                  <Badge variant="success">Active</Badge>
                </div>
                <div className="flex justify-between items-start p-4 rounded-lg border border-green-100 hover:bg-green-50/50 transition-colors">
                  <div>
                    <h4 className="font-semibold text-slate-900">Data Analyst</h4>
                    <p className="text-sm text-slate-600">89 applications</p>
                  </div>
                  <Badge variant="success">Active</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Interviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 rounded-lg border border-green-100">
                  <Calendar className="h-5 w-5 text-green-600" />
                  <div>
                    <h4 className="font-semibold text-slate-900">Round 1 - Technical</h4>
                    <p className="text-sm text-slate-600">Tomorrow, 10:00 AM • 8 candidates</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-lg border border-green-100">
                  <Calendar className="h-5 w-5 text-green-600" />
                  <div>
                    <h4 className="font-semibold text-slate-900">Round 2 - HR</h4>
                    <p className="text-sm text-slate-600">16th Jan, 2:00 PM • 4 candidates</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center opacity-5">
        <div className="text-[500px] font-bold text-green-600">JH</div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;