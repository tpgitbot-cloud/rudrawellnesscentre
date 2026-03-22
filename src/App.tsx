import React from 'react';
import { Link, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import AppointmentBooking from './components/AppointmentBooking';
import AdminDashboard from './components/CMS/AdminDashboard';
import PatientPortal from './components/PatientPortal/PatientPortal';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Stethoscope, Heart, Brain, Baby, Activity, Shield, Clock, MapPin, Mail, ArrowRight, Phone } from 'lucide-react';
import { cn } from './utils';
import { motion } from 'motion/react';

const HomePage = () => (
  <main>
    <Hero />
    
    {/* Trust Section */}
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Rudra Wellness?</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">We provide comprehensive healthcare services with a focus on patient comfort and clinical excellence.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Shield, title: 'Expert Doctors', desc: 'Our team consists of highly qualified specialists with years of experience.' },
            { icon: Clock, title: 'Quick Booking', desc: 'Book your appointment in less than 2 minutes with our online portal.' },
            { icon: Activity, title: 'Modern Tech', desc: 'We use the latest medical equipment for accurate diagnosis and treatment.' }
          ].map((feature, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-pink-50 hover:shadow-md transition-shadow">
              <div className="bg-pink-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                <feature.icon className="h-7 w-7 text-pink-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Services Preview */}
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Specialities</h2>
            <p className="text-gray-500">Comprehensive care for every member of your family.</p>
          </div>
          <Link to="/services" className="text-pink-500 font-bold hover:underline">View All Services</Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Stethoscope, name: 'General Medicine', color: 'bg-blue-50 text-blue-500' },
            { icon: Heart, name: 'Cardiology', color: 'bg-red-50 text-red-500' },
            { icon: Brain, name: 'Neurology', color: 'bg-purple-50 text-purple-500' },
            { icon: Baby, name: 'Pediatrics', color: 'bg-orange-50 text-orange-500' }
          ].map((service, i) => (
            <div key={i} className="group cursor-pointer">
              <div className={cn("aspect-square rounded-3xl flex flex-col items-center justify-center transition-all group-hover:scale-105", service.color)}>
                <service.icon className="h-12 w-12 mb-4" />
                <span className="font-bold text-lg">{service.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </main>
);

const ServicesPage = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
    <h1 className="text-5xl font-bold text-gray-900 mb-12">Our Services</h1>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
      {[1, 2, 3, 4, 5, 6].map(i => (
        <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-pink-50">
          <img src={`https://picsum.photos/seed/service${i}/800/600`} alt="Service" className="w-full h-64 object-cover" />
          <div className="p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Specialized Care {i}</h3>
            <p className="text-gray-500 mb-6">Comprehensive diagnostic and therapeutic services tailored to your specific health needs.</p>
            <Link to="/book" className="text-pink-500 font-bold flex items-center group">
              Book Now <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const AboutPage = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <div>
        <h1 className="text-5xl font-bold text-gray-900 mb-8">About Rudra Wellness</h1>
        <p className="text-lg text-gray-500 mb-6 leading-relaxed">
          Founded in 2010, Rudra Wellness Centre has been at the forefront of medical innovation and patient-centered care. Our mission is to provide accessible, high-quality healthcare that empowers individuals to lead healthier lives.
        </p>
        <p className="text-lg text-gray-500 mb-10 leading-relaxed">
          Our team of dedicated professionals works tirelessly to ensure that every patient receives personalized attention and the most effective treatments available.
        </p>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <p className="text-4xl font-bold text-pink-500 mb-1">15+</p>
            <p className="text-gray-500 font-medium">Years Experience</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-pink-500 mb-1">50k+</p>
            <p className="text-gray-500 font-medium">Happy Patients</p>
          </div>
        </div>
      </div>
      <div className="relative">
        <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1000" alt="Clinic Interior" className="rounded-3xl shadow-2xl" />
        <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl border border-pink-50 hidden md:block">
          <p className="text-sm font-bold text-gray-900 mb-1">Dr. Rudra Pratap</p>
          <p className="text-xs text-pink-500 font-bold uppercase tracking-wider">Chief Medical Officer</p>
        </div>
      </div>
    </div>
  </div>
);

const ContactPage = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
      <div>
        <h1 className="text-5xl font-bold text-gray-900 mb-8">Contact Us</h1>
        <p className="text-lg text-gray-500 mb-12">Have questions or need assistance? Our team is here to help you.</p>
        
        <div className="space-y-8">
          <div className="flex items-start space-x-4">
            <div className="bg-pink-50 p-4 rounded-2xl">
              <MapPin className="h-6 w-6 text-pink-500" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Our Location</h3>
              <p className="text-gray-500">123 Wellness Way, Healing Heights, City</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="bg-blue-50 p-4 rounded-2xl">
              <Phone className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Phone Number</h3>
              <p className="text-gray-500">+1 (555) 123-4567</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="bg-green-50 p-4 rounded-2xl">
              <Mail className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Email Address</h3>
              <p className="text-gray-500">hello@rudrawellness.com</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-8 rounded-3xl shadow-xl shadow-pink-100 border border-pink-50">
        <form className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">First Name</label>
              <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-500 outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Last Name</label>
              <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-500 outline-none" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Email</label>
            <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-500 outline-none" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Message</label>
            <textarea className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-500 outline-none h-32 resize-none"></textarea>
          </div>
          <button className="w-full bg-pink-500 text-white py-4 rounded-xl font-bold hover:bg-pink-600 transition-all">Send Message</button>
        </form>
      </div>
    </div>
  </div>
);

const BlogPage = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
    <h1 className="text-5xl font-bold text-gray-900 mb-12">Health Tips & News</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-pink-50">
          <img src={`https://picsum.photos/seed/blog${i}/1200/800`} alt="Blog" className="w-full h-72 object-cover" />
          <div className="p-8">
            <div className="flex items-center space-x-2 text-pink-500 text-xs font-bold uppercase tracking-widest mb-4">
              <span>Wellness</span>
              <span>•</span>
              <span>March 22, 2026</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Maintaining a Healthy Lifestyle in 2026</h3>
            <p className="text-gray-500 mb-6 leading-relaxed">Discover the latest trends and evidence-based practices for improving your physical and mental well-being...</p>
            <button className="text-pink-500 font-bold flex items-center group">
              Read More <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const AppContent = () => {
  const { loading } = useAuth();
  
  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-white">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="h-12 w-12 border-4 border-pink-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/book" element={<div className="max-w-3xl mx-auto py-24 px-4"><AppointmentBooking /></div>} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/portal" element={<PatientPortal />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
