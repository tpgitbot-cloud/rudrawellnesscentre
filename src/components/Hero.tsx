import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Clock, Users, Star, Activity } from 'lucide-react';
import { motion } from 'motion/react';

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-white pt-16 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left"
          >
            <div className="inline-flex items-center space-x-2 bg-pink-50 text-pink-600 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              <Activity className="h-4 w-4" />
              <span>Compassionate Care, Modern Medicine</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 tracking-tight leading-[1.1] mb-8">
              Your Health is Our <span className="text-pink-500">Top Priority</span>
            </h1>
            <p className="text-lg text-gray-500 mb-10 leading-relaxed">
              At Rudra Wellness Centre, we combine advanced medical technology with a personal touch to provide the best healthcare experience for you and your family.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:justify-center lg:justify-start">
              <Link
                to="/book"
                className="bg-pink-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl shadow-pink-200 hover:bg-pink-600 transition-all flex items-center justify-center group"
              >
                Book Appointment
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/services"
                className="bg-white text-gray-900 border border-gray-200 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-50 transition-all flex items-center justify-center"
              >
                Our Services
              </Link>
            </div>
            
            <div className="mt-12 flex items-center space-x-8 sm:justify-center lg:justify-start">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <img
                    key={i}
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                    src={`https://picsum.photos/seed/user${i}/100/100`}
                    alt=""
                  />
                ))}
              </div>
              <div className="text-sm">
                <div className="flex items-center text-yellow-400 mb-1">
                  {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="text-gray-500 font-medium">Trusted by 5,000+ patients</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center"
          >
            <div className="relative mx-auto w-full rounded-3xl shadow-2xl overflow-hidden aspect-[4/5] md:aspect-square lg:aspect-[4/5]">
              <img
                className="w-full h-full object-cover"
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1000"
                alt="Doctor at work"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              
              {/* Floating Stats Card */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur p-6 rounded-2xl shadow-xl flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className="bg-pink-100 p-3 rounded-xl">
                    <ShieldCheck className="h-6 w-6 text-pink-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Certified</p>
                    <p className="text-sm font-bold text-gray-900">Medical Excellence</p>
                  </div>
                </div>
                <div className="h-10 w-px bg-gray-200"></div>
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-3 rounded-xl">
                    <Clock className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Available</p>
                    <p className="text-sm font-bold text-gray-900">24/7 Support</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Background Elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-pink-50 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50"></div>
    </div>
  );
};

export default Hero;
