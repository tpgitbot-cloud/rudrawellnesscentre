import React, { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, updateDoc, doc, orderBy } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';
import { Appointment } from '../../types';
import { Calendar, Clock, X, AlertCircle, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '../../utils';

const PatientPortal = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, 'appointments'),
      where('patientId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setAppointments(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Appointment)));
    });
    return () => unsubscribe();
  }, [user]);

  const handleCancel = async (id: string) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      try {
        await updateDoc(doc(db, 'appointments', id), { status: 'cancelled' });
      } catch (error) {
        console.error('Cancel failed:', error);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-2">My Appointments</h1>
        <p className="text-gray-500">View and manage your upcoming visits to Rudra Wellness.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {appointments.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
            <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">You haven't booked any appointments yet.</p>
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
                  <span className="text-xs text-gray-400">Booked on {format(new Date(apt.createdAt), 'MMM d, yyyy')}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{apt.reason}</h3>
                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                  <span className="flex items-center"><Calendar className="h-4 w-4 mr-1 text-pink-400" /> {apt.date}</span>
                  <span className="flex items-center"><Clock className="h-4 w-4 mr-1 text-pink-400" /> {apt.time}</span>
                </div>
              </div>

              {apt.status === 'pending' && (
                <button
                  onClick={() => handleCancel(apt.id)}
                  className="flex items-center space-x-2 text-red-500 hover:text-red-600 font-bold text-sm transition-colors"
                >
                  <X className="h-4 w-4" />
                  <span>Cancel Request</span>
                </button>
              )}
              
              {apt.status === 'confirmed' && (
                <div className="flex items-center space-x-2 text-green-600 font-bold text-sm">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Confirmed</span>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PatientPortal;
