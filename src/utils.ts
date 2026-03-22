import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function sendWhatsAppNotification(to: string, message: string) {
  try {
    const response = await fetch('/api/notify-whatsapp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to, message }),
    });
    return await response.json();
  } catch (error) {
    console.error('Failed to send notification:', error);
    return { success: false };
  }
}
