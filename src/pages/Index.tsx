
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Shield, Users, Clock, Smartphone, FileText, AlertTriangle, Building, Palette, Globe } from "lucide-react";
import { useContext } from "react";
import { TenantContext } from "@/App";

const Index = () => {
  const { currentTenant, tenantBranding } = useContext(TenantContext);

  const features = [
    {
      icon: Users,
      title: "Visitor Pre-Registration",
      description: "Bulk CSV uploads, custom invite forms, and automated QR code generation for seamless guest management.",
      color: "bg-blue-500"
    },
    {
      icon: Smartphone,
      title: "Self-Service Kiosks",
      description: "Touch-enabled tablet interface with photo capture, digital forms, and contactless check-in.",
      color: "bg-purple-500"
    },
    {
      icon: Shield,
      title: "Contactless Door Unlock",
      description: "Secure, time-limited credentials with one-time use tokens for enhanced security.",
      color: "bg-green-500"
    },
    {
      icon: FileText,
      title: "Digital Waivers",
      description: "Capture signatures, NDAs, and compliance documents with full audit trails.",
      color: "bg-orange-500"
    },
    {
      icon: AlertTriangle,
      title: "Emergency Mustering",
      description: "Real-time visitor tracking with instant evacuation alerts and muster list generation.",
      color: "bg-red-500"
    },
    {
      icon: Clock,
      title: "Real-Time Analytics",
      description: "Live dashboards with visitor insights, peak hours analysis, and automated reporting.",
      color: "bg-indigo-500"
    },
    {
      icon: Building,
      title: "Multi-Tenant Architecture",
      description: "Securely isolate data between organizations with custom branding and workflows.",
      color: "bg-teal-500"
    },
    {
      icon: Palette,
      title: "Customizable Branding",
      description: "White-label solutions with organization-specific colors, logos and templates.",
      color: "bg-pink-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Simplified Navigation */}
      <header className="flex items-center justify-between px-4 py-2 bg-white shadow">
        <Link to="/" className="flex items-center space-x-2">
          <Shield className="h-6 w-6 text-blue-600" />
          <span className="text-xl font-bold text-gray-800">OneVisitor</span>
        </Link>
        <nav>
          <Link to="/dashboard" className="text-blue-600 hover:underline">
            Sign In
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-6 bg-blue-100 text-blue-800 border-blue-200" variant="secondary">
              Multi-Tenant Visitor Management
            </Badge>
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Secure, Customizable
              </span>
              <br />
              Visitor Management
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
              Cloud-native platform for managing guest arrivals, pre-registration, contactless door access, 
              digital waivers, and emergency mustering with enterprise-grade security and tenant isolation.
            </p>
            <button
              className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
              onClick={() => window.location.href = '/request-demo'}
            >
              Request a Demo
            </button>
          </div>
        </div>
      </section>

      {/* New Section 1 */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Welcome guests while keeping people, property, and ideas safe</h2>
            <p className="mt-4 text-gray-600 max-w-4xl mx-auto">
              Make visitors feel at ease with an elegantly simple check-in experience. Know exactly who's visiting, when, and why with instant document verification. Save time alerting hosts and printing badges with automated workflows.
            </p>
          </div>
        </div>
      </section>

      {/* New Section 2 */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Visitor management for multi-tenant property owners</h2>
            <p className="mt-4 text-gray-600 max-w-4xl mx-auto">
              Rely on the only intuitive visitor management system designed for property owners to keep their buildings secure and exceed tenant expectations. Get accurate data around property utilization and occupancy to drive smarter decisions.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Complete Visitor Management Suite
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage visitors securely across multiple organizations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-2">99.9%</div>
              <div className="text-blue-100">Uptime Guaranteed</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10k+</div>
              <div className="text-blue-100">Visitors Processed Daily</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100+</div>
              <div className="text-blue-100">Active Organizations</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">SOC2</div>
              <div className="text-blue-100">Security Compliant</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Shield className="h-6 w-6" />
            <span className="text-lg font-semibold">OneVisitor</span>
          </div>
          <p className="text-gray-400">
            Enterprise-grade visitor management for the modern workplace
          </p>
          <div className="mt-16 py-4 text-center text-sm text-gray-500">
            <span>© 2025 OneCompany</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
