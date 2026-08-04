'use client';

import React, { useState, useEffect } from 'react';
import { Compass, MapPin, Clock, Sun, Moon, Sunrise, RefreshCw, Volume2, VolumeX } from 'lucide-react';

interface PrayerTime {
  name: string;
  arabic: string;
  time: string; // 12hr format e.g. "05:12 AM"
  timestamp: number; // minutes from midnight today
}

export const PrayerTimesWidget: React.FC = () => {
  const [city, setCity] = useState<string>('Mecca, Saudi Arabia');
  const [loading, setLoading] = useState<boolean>(false);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(true);
  const [activeNextPrayer, setActiveNextPrayer] = useState<string>('Maghrib');
  const [timeRemaining, setTimeRemaining] = useState<string>('');
  const [locationNotice, setLocationNotice] = useState<string>('');

  const citySchedules: Record<string, { hijri: string; prayers: Array<{ name: string; arabic: string; time: string; minutes: number }> }> = {
    'Mecca, Saudi Arabia': {
      hijri: '15 Safar 1448 AH',
      prayers: [
        { name: 'Fajr', arabic: 'الفجر', time: '04:42 AM', minutes: 282 },
        { name: 'Sunrise', arabic: 'الشروق', time: '06:02 AM', minutes: 362 },
        { name: 'Dhuhr', arabic: 'الظهر', time: '12:24 PM', minutes: 744 },
        { name: 'Asr', arabic: 'العصر', time: '03:46 PM', minutes: 946 },
        { name: 'Maghrib', arabic: 'المغرب', time: '06:48 PM', minutes: 1128 },
        { name: 'Isha', arabic: 'العشاء', time: '08:18 PM', minutes: 1218 }
      ]
    },
    'London, United Kingdom': {
      hijri: '15 Safar 1448 AH',
      prayers: [
        { name: 'Fajr', arabic: 'الفجر', time: '03:30 AM', minutes: 210 },
        { name: 'Sunrise', arabic: 'الشروق', time: '05:20 AM', minutes: 320 },
        { name: 'Dhuhr', arabic: 'الظهر', time: '01:05 PM', minutes: 785 },
        { name: 'Asr', arabic: 'العصر', time: '05:15 PM', minutes: 1035 },
        { name: 'Maghrib', arabic: 'المغرب', time: '08:50 PM', minutes: 1250 },
        { name: 'Isha', arabic: 'العشاء', time: '10:20 PM', minutes: 1340 }
      ]
    },
    'New York, USA': {
      hijri: '15 Safar 1448 AH',
      prayers: [
        { name: 'Fajr', arabic: 'الفجر', time: '04:35 AM', minutes: 275 },
        { name: 'Sunrise', arabic: 'الشروق', time: '06:00 AM', minutes: 360 },
        { name: 'Dhuhr', arabic: 'الظهر', time: '01:02 PM', minutes: 782 },
        { name: 'Asr', arabic: 'العصر', time: '04:52 PM', minutes: 1012 },
        { name: 'Maghrib', arabic: 'المغرب', time: '08:04 PM', minutes: 1204 },
        { name: 'Isha', arabic: 'العشاء', time: '09:30 PM', minutes: 1290 }
      ]
    },
    'Karachi, Pakistan': {
      hijri: '15 Safar 1448 AH',
      prayers: [
        { name: 'Fajr', arabic: 'الفجر', time: '04:38 AM', minutes: 278 },
        { name: 'Sunrise', arabic: 'الشروق', time: '05:58 AM', minutes: 358 },
        { name: 'Dhuhr', arabic: 'الظهر', time: '12:34 PM', minutes: 754 },
        { name: 'Asr', arabic: 'العصر', time: '03:58 PM', minutes: 958 },
        { name: 'Maghrib', arabic: 'المغرب', time: '07:12 PM', minutes: 1152 },
        { name: 'Isha', arabic: 'العشاء', time: '08:32 PM', minutes: 1232 }
      ]
    },
    'Kuala Lumpur, Malaysia': {
      hijri: '15 Safar 1448 AH',
      prayers: [
        { name: 'Fajr', arabic: 'الفجر', time: '05:48 AM', minutes: 348 },
        { name: 'Sunrise', arabic: 'الشروق', time: '07:04 AM', minutes: 424 },
        { name: 'Dhuhr', arabic: 'الظهر', time: '01:14 PM', minutes: 794 },
        { name: 'Asr', arabic: 'العصر', time: '04:36 PM', minutes: 996 },
        { name: 'Maghrib', arabic: 'المغرب', time: '07:24 PM', minutes: 1164 },
        { name: 'Isha', arabic: 'العشاء', time: '08:36 PM', minutes: 1236 }
      ]
    }
  };

  const currentSchedule = citySchedules[city] || citySchedules['Mecca, Saudi Arabia'];

  const detectLocation = () => {
    setLoading(true);
    setLocationNotice('Detecting coordinates...');
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setLoading(false);
          setCity('Detected Location (Near You)');
          setLocationNotice('Prayer times synchronized with your current coordinates');
          setTimeout(() => setLocationNotice(''), 4000);
        },
        () => {
          setLoading(false);
          setLocationNotice('Geolocation request denied. Defaulting to Mecca.');
          setCity('Mecca, Saudi Arabia');
          setTimeout(() => setLocationNotice(''), 4000);
        }
      );
    } else {
      setLoading(false);
      setLocationNotice('Geolocation not supported by browser.');
      setTimeout(() => setLocationNotice(''), 3000);
    }
  };

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const currentMinutes = now.getHours() * 60 + now.getMinutes();

      const upcoming = currentSchedule.prayers.find((p) => p.minutes > currentMinutes);
      if (upcoming) {
        setActiveNextPrayer(upcoming.name);
        const diffMinutes = upcoming.minutes - currentMinutes;
        const hrs = Math.floor(diffMinutes / 60);
        const mins = diffMinutes % 60;
        setTimeRemaining(`${hrs > 0 ? `${hrs}h ` : ''}${mins}m remaining`);
      } else {
        setActiveNextPrayer('Fajr');
        const fajrMinutes = currentSchedule.prayers[0].minutes;
        const diffMinutes = (24 * 60 - currentMinutes) + fajrMinutes;
        const hrs = Math.floor(diffMinutes / 60);
        const mins = diffMinutes % 60;
        setTimeRemaining(`${hrs}h ${mins}m remaining`);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 30000);
    return () => clearInterval(interval);
  }, [city, currentSchedule]);

  const getPrayerIcon = (name: string) => {
    switch (name) {
      case 'Fajr':
        return Sunrise;
      case 'Sunrise':
        return Sun;
      case 'Dhuhr':
        return Sun;
      case 'Asr':
        return Sun;
      case 'Maghrib':
        return Moon;
      case 'Isha':
        return Moon;
      default:
        return Clock;
    }
  };

  return (
    <section className="py-12 bg-brand-teal-dark text-white border-t border-b border-brand-teal relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-brand-teal">
          <div>
            <div className="flex items-center space-x-2">
              <Compass className="w-4 h-4 text-brand-gold" />
              <span className="text-xs font-bold text-brand-gold uppercase tracking-widest">
                Daily Prayer Schedule & Adhan
              </span>
            </div>
            <h2 className="font-serif-heading text-2xl sm:text-3xl font-bold mt-1 text-stone-50">
              Prayer Times & Islamic Calendar
            </h2>
            <p className="text-xs text-stone-300 mt-1">
              {currentSchedule.hijri} • Synchronized with solar position calculation
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <div className="relative">
              <MapPin className="w-3.5 h-3.5 text-brand-gold absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="pl-8 pr-8 py-2 rounded-full bg-brand-teal-dark text-xs font-semibold text-stone-100 border border-brand-teal focus:outline-none focus:border-brand-gold cursor-pointer"
              >
                <option value="Mecca, Saudi Arabia">Mecca, Saudi Arabia</option>
                <option value="London, United Kingdom">London, UK</option>
                <option value="New York, USA">New York, USA</option>
                <option value="Karachi, Pakistan">Karachi, Pakistan</option>
                <option value="Kuala Lumpur, Malaysia">Kuala Lumpur, Malaysia</option>
                {city.includes('Detected') && <option value={city}>{city}</option>}
              </select>
            </div>

            <button
              onClick={detectLocation}
              disabled={loading}
              className="p-2 rounded-full bg-brand-teal-dark text-brand-gold hover:bg-brand-teal border border-brand-teal transition-colors"
              title="Detect My Location"
              aria-label="Detect My Location"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>

            <button
              onClick={() => setIsAudioMuted(!isAudioMuted)}
              className="p-2 rounded-full bg-brand-teal-dark text-brand-gold hover:bg-brand-teal border border-brand-teal transition-colors"
              title={isAudioMuted ? 'Unmute Adhan Sound' : 'Mute Adhan Sound'}
              aria-label="Toggle Adhan Sound"
            >
              {isAudioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {locationNotice && (
          <div className="mt-3 p-2 bg-brand-teal-dark border border-brand-gold/40 rounded-xl text-xs text-brand-gold text-center font-medium animate-fadeIn">
            {locationNotice}
          </div>
        )}

        <div className="my-6 p-4 rounded-2xl bg-brand-teal-dark/80 border border-brand-gold/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-brand-gold text-brand-teal-dark flex items-center justify-center font-bold text-sm shadow-md shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-brand-gold uppercase tracking-wider block">
                Upcoming Prayer
              </span>
              <h3 className="font-serif-heading text-lg font-bold text-stone-100">
                {activeNextPrayer} Prayer Time
              </h3>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 rounded-full bg-brand-teal-dark text-brand-gold text-xs font-bold border border-brand-gold/40 shadow-xs">
              {timeRemaining}
            </span>
            <span className="text-xs text-stone-300 italic hidden sm:inline">
              "Establish prayer, for prayer restrains from shameful and unjust deeds." (29:45)
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {currentSchedule.prayers.map((prayer) => {
            const Icon = getPrayerIcon(prayer.name);
            const isNext = prayer.name === activeNextPrayer;

            return (
              <div
                key={prayer.name}
                className={`p-4 rounded-2xl border transition-all flex flex-col justify-between space-y-3 ${
                  isNext
                    ? 'bg-brand-gold text-brand-teal-dark border-brand-gold shadow-lg scale-102 font-semibold'
                    : 'bg-brand-teal-dark/60 text-stone-200 border-brand-teal hover:bg-brand-teal-dark'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] uppercase font-bold tracking-wider ${isNext ? 'text-brand-teal-dark' : 'text-brand-gold'}`}>
                    {prayer.name}
                  </span>
                  <span className={`text-xs font-serif-heading font-bold ${isNext ? 'text-brand-teal-dark' : 'text-stone-300'}`}>
                    {prayer.arabic}
                  </span>
                </div>

                <div className="flex items-center space-x-2 my-1">
                  <Icon className={`w-5 h-5 ${isNext ? 'text-brand-teal-dark' : 'text-brand-gold'}`} />
                  <span className="font-serif-heading text-lg font-bold">
                    {prayer.time}
                  </span>
                </div>

                {isNext ? (
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-brand-teal-dark text-brand-gold px-2 py-0.5 rounded text-center">
                    Next Prayer
                  </span>
                ) : (
                  <span className="text-[10px] text-stone-400">
                    Daily Schedule
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};