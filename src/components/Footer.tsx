import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Shield, Clock, MapPin, Phone, Mail, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-pink-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <span className="text-2xl font-bold text-gray-900 tracking-tight">Rudra Wellness</span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Providing compassionate, high-quality healthcare for our community. Your wellness is our priority.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-pink-500 cursor-pointer" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-pink-500 cursor-pointer" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-pink-500 cursor-pointer" />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li><Link to="/services" className="text-gray-500 hover:text-pink-500 text-sm">Our Services</Link></li>
              <li><Link to="/about" className="text-gray-500 hover:text-pink-500 text-sm">About Us</Link></li>
              <li><Link to="/blog" className="text-gray-500 hover:text-pink-500 text-sm">Health Blog</Link></li>
              <li><Link to="/contact" className="text-gray-500 hover:text-pink-500 text-sm">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-pink-500 shrink-0" />
                <span className="text-gray-500 text-sm">123 Wellness Way, Healing Heights, City</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-pink-500 shrink-0" />
                <span className="text-gray-500 text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-pink-500 shrink-0" />
                <span className="text-gray-500 text-sm">hello@rudrawellness.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-6">Opening Hours</h3>
            <ul className="space-y-4">
              <li className="flex justify-between text-sm">
                <span className="text-gray-500">Mon - Fri</span>
                <span className="text-gray-900 font-medium">8:00 AM - 8:00 PM</span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-gray-500">Saturday</span>
                <span className="text-gray-900 font-medium">9:00 AM - 5:00 PM</span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-gray-500">Sunday</span>
                <span className="text-pink-500 font-bold">Closed</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-xs">© 2026 Rudra Wellness Centre. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-400 hover:text-gray-600 text-xs">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-400 hover:text-gray-600 text-xs">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
