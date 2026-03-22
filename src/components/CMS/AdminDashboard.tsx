import React, { useState, useEffect } from 'react';
import { collection, query, onSnapshot, updateDoc, doc, deleteDoc, orderBy } from 'firebase/firestore';
import { db } from '../../firebase';
import { Appointment, Service, ClinicInfo } from '../../types';
import { Check, X, Clock, Calendar, User, Phone, Edit, Trash2, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { cn, sendWhatsAppNotification } from '../../utils';

const AdminDashboard = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [activeTab, setActiveTab] = useState<'appointments' | 'services' | 'clinic'>('appointments');

  useEffect(() => {
    const q = query(collection(db, 'appointments'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setAppointments(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Appointment)));
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'services'), (snapshot) => {
      setServices(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Service)));
    });
    return () => unsubscribe();
  }, []);

  const handleStatusUpdate = async (id: string, status: Appointment['status'], patientPhone: string, patientName: string, date: string, time: string) => {
    try {
      await updateDoc(doc(db, 'appointments', id), { status });
      
      let message = '';
      if (status === 'confirmed') {
        message = `Hi ${patientName}, your appointment at Rudra Wellness Centre for ${date} at ${time} has been CONFIRMED. See you then!`;
      } else if (status === 'cancelled') {
        message = `Hi ${patientName}, we're sorry to inform you that your appointment for ${date} at ${time} has been CANCELLED. Please contact us to reschedule.`;
      }

      if (message) {
        await sendWhatsAppNotification(patientPhone, message);
      }
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-2">Clinic Dashboard</h1>
          <p className="text-gray-500">Manage appointments, services, and clinic content.</p>
        </div>
        
        <div className="flex bg-gray-100 p-1 rounded-2xl">
          {(['appointments', 'services', 'clinic'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-6 py-2 rounded-xl text-sm font-bold transition-all capitalize",
                activeTab === tab ? "bg-white text-pink-500 shadow-sm" : "text-gray-500 hover:text-gray-700"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'appointments' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {appointments.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No appointments found.</p>
              </div>
            ) : (
              appointments.map((apt) => (
                <div key={apt.id} className="bg-white p-6 rounded-3xl shadow-sm border border-pink-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                        apt.status === 'confirmed' ? "bg-green-100 text-green-700" :
                        apt.status === 'pending' ? "bg-yellow-100 text-yellow-700" :
                        "bg-red-100 text-red-700"
                      )}>
                        {apt.status}
                      </span>
                      <span className="text-xs text-gray-400">Booked on {format(new Date(apt.createdAt), 'MMM d, h:mm a')}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{apt.patientName}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <span className="flex items-center"><Calendar className="h-4 w-4 mr-1 text-pink-400" /> {apt.date}</span>
                      <span className="flex items-center"><Clock className="h-4 w-4 mr-1 text-pink-400" /> {apt.time}</span>
                      <span className="flex items-center"><Phone className="h-4 w-4 mr-1 text-pink-400" /> {apt.patientPhone}</span>
                    </div>
                    <p className="mt-3 text-gray-600 text-sm italic">"{apt.reason}"</p>
                  </div>

                  <div className="flex gap-2">
                    {apt.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleStatusUpdate(apt.id, 'confirmed', apt.patientPhone, apt.patientName, apt.date, apt.time)}
                          className="bg-green-500 text-white p-3 rounded-xl hover:bg-green-600 transition-all shadow-md shadow-green-100"
                        >
                          <Check className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(apt.id, 'cancelled', apt.patientPhone, apt.patientName, apt.date, apt.time)}
                          className="bg-red-500 text-white p-3 rounded-xl hover:bg-red-600 transition-all shadow-md shadow-red-100"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </>
                    )}
                    {apt.status === 'confirmed' && (
                      <button
                        onClick={() => handleStatusUpdate(apt.id, 'completed', apt.patientPhone, apt.patientName, apt.date, apt.time)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-blue-600 transition-all"
                      >
                        Mark Completed
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {activeTab === 'services' && (
        <div className="space-y-6">
          <div className="flex justify-end">
            <button className="flex items-center space-x-2 bg-pink-500 text-white px-6 py-3 rounded-2xl font-bold hover:bg-pink-600 transition-all shadow-lg shadow-pink-100">
              <Plus className="h-5 w-5" />
              <span>Add Service</span>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-pink-50 group">
                <div className="h-48 bg-gray-100 relative">
                  <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button className="bg-white/90 backdrop-blur p-2 rounded-xl text-gray-600 hover:text-pink-500 transition-all shadow-sm">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="bg-white/90 backdrop-blur p-2 rounded-xl text-gray-600 hover:text-red-500 transition-all shadow-sm">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h3>
                  <p className="text-gray-500 text-sm line-clamp-3">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'clinic' && (
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-pink-50 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Clinic Settings</h2>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Emergency Banner Text</label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-500 outline-none"
                placeholder="e.g. Open 24/7 for emergencies"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">About Clinic</label>
              <textarea
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-500 outline-none h-40 resize-none"
                placeholder="Describe your clinic..."
              />
            </div>
            <button className="w-full bg-pink-500 text-white py-4 rounded-xl font-bold hover:bg-pink-600 transition-all">
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
