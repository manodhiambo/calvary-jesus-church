import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, MapPin } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: 'worship' | 'ministry' | 'outreach' | 'special';
}

const calendarEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Sunday Worship',
    date: '2025-07-27',
    time: '9:00 AM',
    location: "Nyaduong' Village",
    category: 'worship'
  },
  {
    id: '2',
    title: 'Bible Study',
    date: '2025-07-30',
    time: '6:00 PM',
    location: 'Church Hall',
    category: 'ministry'
  },
  {
    id: '3',
    title: 'Community Outreach',
    date: '2025-08-03',
    time: '8:00 AM',
    location: 'Migori Town',
    category: 'outreach'
  },
  {
    id: '4',
    title: 'Youth Fellowship',
    date: '2025-08-05',
    time: '4:00 PM',
    location: 'Youth Hall',
    category: 'ministry'
  },
  {
    id: '5',
    title: 'Sunday Worship',
    date: '2025-08-04',
    time: '9:00 AM',
    location: "Nyaduong' Village",
    category: 'worship'
  }
];

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const categoryColors = {
  worship: 'bg-blue-500',
  ministry: 'bg-green-500',
  outreach: 'bg-purple-500',
  special: 'bg-yellow-500'
};

const EventsCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const firstDayWeekday = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const getEventsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return calendarEvents.filter(event => event.date === dateString);
  };

  const renderCalendarDays = () => {
    const days = [];
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDayWeekday; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border border-gray-200"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const eventsForDay = getEventsForDate(date);
      const isToday = date.toDateString() === new Date().toDateString();
      const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();

      days.push(
        <div
          key={day}
          className={`h-24 border border-gray-200 p-2 cursor-pointer hover:bg-gray-50 transition-colors ${
            isToday ? 'bg-blue-50 border-blue-300' : ''
          } ${isSelected ? 'bg-navy-100 border-navy-400' : ''}`}
          onClick={() => setSelectedDate(date)}
        >
          <div className={`text-sm font-semibold mb-1 ${isToday ? 'text-blue-600' : 'text-gray-700'}`}>
            {day}
          </div>
          <div className="space-y-1">
            {eventsForDay.slice(0, 2).map(event => (
              <div
                key={event.id}
                className={`text-xs text-white px-2 py-1 rounded truncate ${categoryColors[event.category]}`}
                title={event.title}
              >
                {event.title}
              </div>
            ))}
            {eventsForDay.length > 2 && (
              <div className="text-xs text-gray-500">+{eventsForDay.length - 2} more</div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : [];

  return (
    <>
      <Header />
      
      <main className="min-h-screen bg-gray-50">
        {/* Header */}
        <section className="bg-gradient-to-r from-navy-900 via-navy-800 to-navy-700 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">Events Calendar</h1>
              <p className="text-xl text-gray-200 max-w-2xl mx-auto">
                View all our church events in a convenient calendar format
              </p>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Calendar Header */}
              <div className="bg-navy-900 text-white p-6">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => navigateMonth('prev')}
                    className="p-2 hover:bg-navy-800 rounded-lg transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  
                  <h2 className="text-2xl font-bold">
                    {months[month]} {year}
                  </h2>
                  
                  <button
                    onClick={() => navigateMonth('next')}
                    className="p-2 hover:bg-navy-800 rounded-lg transition-colors"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
                
                {/* Legend */}
                <div className="flex flex-wrap gap-4 mt-4 text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                    <span>Worship</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                    <span>Ministry</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-purple-500 rounded mr-2"></div>
                    <span>Outreach</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-yellow-500 rounded mr-2"></div>
                    <span>Special</span>
                  </div>
                </div>
              </div>

              {/* Days of Week Header */}
              <div className="grid grid-cols-7 bg-gray-100">
                {daysOfWeek.map(day => (
                  <div key={day} className="p-4 text-center font-semibold text-gray-700 border-r border-gray-200 last:border-r-0">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7">
                {renderCalendarDays()}
              </div>
            </div>

            {/* Selected Date Events */}
            {selectedDate && (
              <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <CalendarIcon className="w-6 h-6 mr-2" />
                  Events for {selectedDate.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </h3>
                
                {selectedDateEvents.length > 0 ? (
                  <div className="space-y-4">
                    {selectedDateEvents.map(event => (
                      <div key={event.id} className="border-l-4 border-navy-500 pl-4 py-2">
                        <h4 className="font-semibold text-lg text-gray-900">{event.title}</h4>
                        <div className="flex items-center text-gray-600 mt-1 space-x-4">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">No events scheduled for this date.</p>
                )}
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default EventsCalendar;
