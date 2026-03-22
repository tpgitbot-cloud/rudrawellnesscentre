import React, { useState, useEffect } from 'react';
import { collection, addDoc, query, where, getDocs, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { Calendar, Clock, User, Phone, FileText, CheckCircle2 } from 'lucide-react';
import { format, addDays } from 'date-fns';
import { sendWhatsAppNotification, cn } from '../utils';

const AppointmentBooking = () => {
  const { user, profile } = useAuth();
  const [date, setDate] = useState(format(addDays(new Date(), 1), 'yyyy-MM-dd'));
  const [time, setTime] = useState('09:00');
  const [reason, setReason] = useState('');
  const [name, setName] = useState(profile?.name || '');
  const [phone, setPhone] = useState(profile?.phone || '');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (profile) {
      setName(profile.name);
      setPhone(profile.phone || '');
    }
  }, [profile]);

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert('Please login to book an appointment');
      return;
    }

    setLoading(true);
    try {
      const appointmentData = {
        patientId: user.uid,
        patientName: name,
        patientPhone: phone,
        date,
        time,
        reason,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };

      await addDoc(collection(db, 'appointments'), appointmentData);
      
      // Send WhatsApp Notification
      const message = `Hello ${name}, your appointment at Rudra Wellness Centre is booked for ${date} at ${time}. We will confirm it shortly.`;
      await sendWhatsAppNotification(phone, message);

      setSuccess(true);
      setReason('');
    } catch (error) {
      console.error('Booking failed:', error);
      alert('Failed to book appointment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-white p-8 rounded-3xl shadow-xl shadow-pink-100 border border-pink-50 text-center">
        <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="h-10 w-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Successful!</h2>
        <p className="text-gray-500 mb-6">Your appointment request has been sent. You will receive a WhatsApp confirmation shortly.</p>
        <button
          onClick={() => setSuccess(false)}
          className="bg-pink-500 text-white px-8 py-3 rounded-full font-bold hover:bg-pink-600 transition-all"
        >
          Book Another
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-3xl shadow-xl shadow-pink-100 border border-pink-50">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
        <Calendar className="mr-2 text-pink-500" /> Book an Appointment
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 flex items-center">
              <User className="h-4 w-4 mr-1 text-pink-400" /> Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
              placeholder="John Doe"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 flex items-center">
              <Phone className="h-4 w-4 mr-1 text-pink-400" /> Phone (WhatsApp)
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
              placeholder="+1234567890"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 flex items-center">
              <Calendar className="h-4 w-4 mr-1 text-pink-400" /> Preferred Date
            </label>
            <input
              type="date"
              required
              min={format(addDays(new Date(), 1), 'yyyy-MM-dd')}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 flex items-center">
              <Clock className="h-4 w-4 mr-1 text-pink-400" /> Preferred Time
            </label>
            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
            >
              {timeSlots.map((slot) => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700 flex items-center">
            <FileText className="h-4 w-4 mr-1 text-pink-400" /> Reason for Visit
          </label>
          <textarea
            required
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all h-32 resize-none"
            placeholder="Briefly describe your concern..."
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={cn(
            "w-full bg-pink-500 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-pink-200 hover:bg-pink-600 transition-all active:scale-[0.98]",
            loading && "opacity-70 cursor-not-allowed"
          )}
        >
          {loading ? 'Processing...' : 'Confirm Appointment'}
        </button>
      </form>
    </div>
  );
};

export default AppointmentBooking;
