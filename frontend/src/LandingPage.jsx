import React, { useState, useEffect } from 'react';
import { CheckCircle, Calendar, Shield, Users, TrendingUp, Database, Bell, Clock } from 'lucide-react';

// ShadCN Components
const Button = ({ children, variant = 'default', size = 'default', className = '', ...props }) => {
  const variants = {
    default: 'bg-green-600 text-white hover:bg-green-700',
    outline: 'border-2 border-green-600 text-green-600 hover:bg-green-50',
  };
  
  const sizes = {
    default: 'h-12 px-6',
    lg: 'h-14 px-8 text-lg',
  };
  
  return (
    <button
      className={`inline-flex items-center justify-center rounded-md font-semibold transition-all ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-xl border border-green-100 shadow-sm hover:shadow-md transition-shadow ${className}`}>
    {children}
  </div>
);

const Badge = ({ children, className = '' }) => (
  <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold bg-green-100 text-green-800 ${className}`}>
    {children}
  </span>
);

// Main Landing Page Component
const PlaceFlowLanding = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: Shield,
      title: 'Verified Access',
      description: 'PC-approved recruiters and postings only. No spam, all legitimate opportunities.',
    },
    {
      icon: TrendingUp,
      title: 'Real-time Dashboard',
      description: 'Track placed/unplaced students, applications, and interview schedules instantly.',
    },
    {
      icon: Clock,
      title: 'One-Click Apply',
      description: 'Apply to multiple drives with auto-apply feature. Save time, maximize opportunities.',
    },
    {
      icon: CheckCircle,
      title: 'Digital NOC',
      description: 'Request and approve NOCs digitally. Complete workflow with audit logs.',
    },
    {
      icon: Bell,
      title: 'Smart Notifications',
      description: 'Email alerts + Google Calendar sync. Never miss a deadline or interview.',
    },
    {
      icon: Database,
      title: 'Historical Data',
      description: 'Access past company data, salary trends, and interview patterns.',
    },
  ];

  const roles = [
    {
      title: 'Students',
      color: 'from-green-500 to-emerald-500',
      features: ['One-click applications', 'Interview tracking', 'NOC requests', 'Placement status'],
    },
    {
      title: 'Recruiters',
      color: 'from-blue-500 to-cyan-500',
      features: ['Post job openings', 'Review applications', 'Schedule interviews', 'Shortlist candidates'],
    },
    {
      title: 'Placement Cell',
      color: 'from-purple-500 to-pink-500',
      features: ['Approve postings', 'Manage NOCs', 'Real-time analytics', 'Complete oversight'],
    },
    {
      title: 'Mentors',
      color: 'from-orange-500 to-red-500',
      features: ['Track students', 'Provide guidance', 'Review progress', 'Support placement'],
    },
  ];

  const stats = [
    { value: '100%', label: 'Verified Recruiters' },
    { value: 'Zero', label: 'Manual Tracking' },
    { value: 'Real-time', label: 'Updates' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Header */}
      <header className={`sticky top-0 z-50 w-full transition-all ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}>
        <nav className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full border-2 border-green-600 bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold">
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
            <Button variant="outline">Login</Button>
            <Button>Get Started</Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6">🎯 Smart Education • Snow Frost Hackathon</Badge>
          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
            Streamline Your Campus{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
              Placement Journey
            </span>
          </h2>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            PlaceFlow is a verified, transparent, and policy-driven placement management system 
            designed specifically for colleges. Replace WhatsApp chaos, PDFs, and spreadsheets 
            with a single, trusted platform.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg">Request Demo</Button>
            <Button variant="outline" size="lg">Learn More</Button>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-8 mt-16 p-8 bg-white rounded-2xl shadow-lg border border-green-100">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">{stat.value}</div>
                <div className="text-sm text-slate-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold text-slate-900 mb-4">Core Features</h3>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Everything you need for seamless campus placements in one platform
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 hover:scale-105 transition-transform">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h4>
              <p className="text-slate-600 text-sm">{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Role-Based Access */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold text-slate-900 mb-4">Role-Based Access</h3>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Tailored dashboards for every stakeholder
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roles.map((role, index) => (
            <Card key={index} className="overflow-hidden">
              <div className={`h-32 bg-gradient-to-br ${role.color} flex items-center justify-center`}>
                <Users className="h-12 w-12 text-white" />
              </div>
              <div className="p-6">
                <h4 className="text-lg font-semibold text-slate-900 mb-4">{role.title}</h4>
                <ul className="space-y-2">
                  {role.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold text-slate-900 mb-4">Built with Modern Tech</h3>
          <p className="text-slate-600">Scalable, secure, and future-ready</p>
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['React.js', 'ShadCN UI', 'Node.js', 'Express', 'SQLite', 'JWT Auth', 'Chart.js', 'Google Calendar'].map((tech, index) => (
              <div key={index} className="p-4 bg-white rounded-lg border border-green-100 text-center font-semibold text-slate-700 hover:border-green-300 transition-colors">
                {tech}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="p-12 text-center bg-gradient-to-br from-green-500 to-emerald-600 border-none">
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Placement Process?
          </h3>
          <p className="text-green-50 mb-8 max-w-2xl mx-auto">
            Join modern campuses using PlaceFlow for streamlined, transparent placement management.
          </p>
          <Button size="lg" className="bg-white text-green-600 hover:bg-green-50">
            Request Demo
          </Button>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-green-100 bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-slate-600">
            <p className="mb-2">
              <strong className="text-slate-900">Team Decode</strong> • Snow Frost Hackathon 2026
            </p>
            <p className="text-sm">Built for Jamia Hamdard University</p>
          </div>
        </div>
      </footer>

      {/* Watermark */}
      <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center opacity-5">
        <div className="text-[500px] font-bold text-green-600">JH</div>
      </div>
    </div>
  );
};

export default PlaceFlowLanding;