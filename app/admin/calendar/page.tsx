
'use client';

import { useState } from 'react';
import AdminLayout from '../AdminLayout';

export default function CalendarPage() {
  const [user] = useState({
    name: 'Dr. Maria Santos',
    role: 'System Administrator',
    department: 'IPDO',
    avatar: 'https://readdy.ai/api/search-image?query=professional%20administrator%20woman%20in%20business%20attire%2C%20clean%20office%20background%2C%20modern%20portrait%20style&width=100&height=100&seq=admin001&orientation=squarish'
  });

  return (
    <AdminLayout user={user}>
      <CalendarManagement />
    </AdminLayout>
  );
}

function CalendarManagement() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Research Proposal Submission Deadline',
      date: '2024-01-20',
      time: '23:59',
      category: 'deadline',
      description: 'Final deadline for research proposal submissions for Q1 2024',
      location: 'Online Submission',
      attendees: ['All Faculty'],
      priority: 'high',
      status: 'upcoming'
    },
    {
      id: 2,
      title: 'Faculty Development Seminar',
      date: '2024-01-22',
      time: '09:00',
      category: 'training',
      description: 'Professional development workshop on research methodologies',
      location: 'Main Auditorium',
      attendees: ['Prof. Elena Rodriguez', 'Prof. Michael Chen', 'Dr. Sarah Johnson'],
      priority: 'medium',
      status: 'upcoming'
    },
    {
      id: 3,
      title: 'Budget Review Meeting',
      date: '2024-01-25',
      time: '14:00',
      category: 'meeting',
      description: 'Quarterly budget review and allocation discussion',
      location: 'Conference Room A',
      attendees: ['Department Heads', 'Finance Team'],
      priority: 'high',
      status: 'upcoming'
    },
    {
      id: 4,
      title: 'Academic Calendar Planning',
      date: '2024-01-28',
      time: '10:30',
      category: 'planning',
      description: 'Planning session for next academic year calendar',
      location: 'IPDO Office',
      attendees: ['Admin Staff', 'Registrar'],
      priority: 'medium',
      status: 'upcoming'
    },
    {
      id: 5,
      title: 'System Maintenance',
      date: '2024-01-30',
      time: '02:00',
      category: 'maintenance',
      description: 'Scheduled system maintenance and updates',
      location: 'IT Server Room',
      attendees: ['IT Team'],
      priority: 'low',
      status: 'upcoming'
    }
  ]);

  const categories = [
    { id: 'deadline', label: 'Deadlines', color: 'bg-red-500' },
    { id: 'meeting', label: 'Meetings', color: 'bg-blue-500' },
    { id: 'training', label: 'Training', color: 'bg-green-500' },
    { id: 'planning', label: 'Planning', color: 'bg-purple-500' },
    { id: 'maintenance', label: 'Maintenance', color: 'bg-gray-500' }
  ];

  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    time: '',
    category: 'meeting',
    description: '',
    location: '',
    attendees: '',
    priority: 'medium',
    status: 'upcoming'
  });

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getEventsForDate = (date: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
    return events.filter(event => event.date === dateStr);
  };

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields before submission
    if (!newEvent.title || !newEvent.date || !newEvent.time) {
      setSubmitStatus('error');
      setSubmitMessage('Please fill in all required fields before submitting.');
      return;
    }

    // Check textarea character limit
    if (newEvent.description.length > 500) {
      setSubmitStatus('error');
      setSubmitMessage('Description cannot exceed 500 characters.');
      return;
    }

    setSubmitStatus('submitting');
    setSubmitMessage('');

    try {
      // Prepare form data using application/x-www-form-urlencoded encoding format
      const submissionParams = new URLSearchParams();
      submissionParams.append('eventTitle', newEvent.title);
      submissionParams.append('eventDate', newEvent.date);
      submissionParams.append('eventTime', newEvent.time);

      // Get the selected dropdown content
      const selectedCategory = categories.find(cat => cat.id === newEvent.category);
      submissionParams.append('eventCategory', selectedCategory ? selectedCategory.label : newEvent.category);

      submissionParams.append('eventLocation', newEvent.location);
      submissionParams.append('eventPriority', newEvent.priority);
      submissionParams.append('eventDescription', newEvent.description);

      // Process attendees - only get the entered text
      const attendeesText = newEvent.attendees.trim();
      submissionParams.append('eventAttendees', attendeesText || 'No attendees specified');

      submissionParams.append('eventStatus', newEvent.status);
      submissionParams.append('createdBy', 'Dr. Maria Santos');
      submissionParams.append('submittedAt', new Date().toISOString());

      // Submit to form endpoint using POST method
      const response = await fetch('https://readdy.ai/api/form/d254cp8o96honrdcsfjg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: submissionParams.toString()
      });

      if (response.ok) {
        // Create event locally after successful submission
        const eventData = {
          id: events.length + 1,
          ...newEvent,
          attendees: newEvent.attendees.split(',').map(a => a.trim()).filter(a => a.length > 0)
        };

        setEvents([...events, eventData]);
        setSubmitStatus('success');
        setSubmitMessage('Event created successfully and submitted to the system!');

        // Reset form after successful submission
        setNewEvent({
          title: '',
          date: '',
          time: '',
          category: 'meeting',
          description: '',
          location: '',
          attendees: '',
          priority: 'medium',
          status: 'upcoming'
        });

        // Close modal after 2 seconds
        setTimeout(() => {
          setShowEventModal(false);
          setSubmitStatus('idle');
          setSubmitMessage('');
        }, 2000);
      } else {
        setSubmitStatus('error');
        setSubmitMessage('Failed to submit event. Please try again.');
      }

    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
      setSubmitMessage('Network error occurred. Please check your connection and try again.');
    }
  };

  const handleDeleteEvent = (eventId: number) => {
    if (confirm('Are you sure you want to delete this event?')) {
      setEvents(events.filter(e => e.id !== eventId));
    }
  };

  const getCategoryColor = (category: string) => {
    const cat = categories.find(c => c.id === category);
    return cat ? cat.color : 'bg-gray-500';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="min-h-[100px] p-2 border border-gray-200"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = getEventsForDate(day);
      const isToday = new Date().getDate() === day &&
                     new Date().getMonth() === currentDate.getMonth() &&
                     new Date().getFullYear() === currentDate.getFullYear();

      days.push(
        <div key={day} className={`min-h-[100px] p-2 border border-gray-200 ${isToday ? 'bg-blue-50' : 'bg-white'}`}>
          <div className={`text-sm font-medium ${isToday ? 'text-blue-600' : 'text-gray-900'}`}>
            {day}
          </div>
          <div className="mt-1 space-y-1">
            {dayEvents.slice(0, 3).map(event => (
              <div
                key={event.id}
                onClick={() => setSelectedEvent(event)}
                className={`text-xs p-1 rounded cursor-pointer ${getCategoryColor(event.category)} text-white truncate`}
                title={event.title}
              >
                {event.title}
              </div>
            ))}
            {dayEvents.length > 3 && (
              <div className="text-xs text-gray-500">+{dayEvents.length - 3} more</div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Calendar of Events</h1>
            <p className="text-gray-600 mt-1">Manage institutional events, deadlines, and schedules</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowEventModal(true)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-add-line mr-2"></i>
              Add Event
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap">
              <i className="ri-download-line mr-2"></i>
              Export Calendar
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Controls */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigateMonth('prev')}
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
            >
              <i className="ri-arrow-left-s-line text-gray-600"></i>
            </button>
            <h2 className="text-xl font-semibold text-gray-900">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <button
              onClick={() => navigateMonth('next')}
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
            >
              <i className="ri-arrow-right-s-line text-gray-600"></i>
            </button>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex rounded-lg border border-gray-300 overflow-hidden">
              {['month', 'week', 'day'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode as 'month' | 'week' | 'day')}
                  className={`px-4 py-2 text-sm font-medium capitalize transition-colors cursor-pointer whitespace-nowrap ${
                    viewMode === mode
                      ? 'bg-green-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
            <button
              onClick={goToToday}
              className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
            >
              Today
            </button>
          </div>
        </div>

        {/* Category Legend */}
        <div className="mt-4 flex flex-wrap items-center gap-4">
          {categories.map(category => (
            <div key={category.id} className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
              <span className="text-sm text-gray-600">{category.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Calendar Header */}
        <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
          {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
            <div key={day} className="p-4 text-sm font-medium text-gray-700 text-center border-r border-gray-200 last:border-r-0">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Body */}
        <div className="grid grid-cols-7">
          {renderCalendar()}
        </div>
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Event Details</h3>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  <i className="ri-close-line text-gray-600"></i>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900">{selectedEvent.title}</h4>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className={`w-2 h-2 rounded-full ${getCategoryColor(selectedEvent.category)}`}></div>
                    <span className="text-sm text-gray-600 capitalize">{selectedEvent.category}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <i className="ri-calendar-line"></i>
                  <span>{new Date(selectedEvent.date).toLocaleDateString()}</span>
                  <i className="ri-time-line ml-4"></i>
                  <span>{selectedEvent.time}</span>
                </div>

                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <i className="ri-map-pin-line"></i>
                  <span>{selectedEvent.location}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(selectedEvent.priority)}`}>
                    {selectedEvent.priority} priority
                  </span>
                </div>

                <div>
                  <h5 className="text-sm font-medium text-gray-900 mb-2">Description</h5>
                  <p className="text-sm text-gray-600">{selectedEvent.description}</p>
                </div>

                <div>
                  <h5 className="text-sm font-medium text-gray-900 mb-2">Attendees</h5>
                  <div className="space-y-1">
                    {Array.isArray(selectedEvent.attendees) ?
                      selectedEvent.attendees.map((attendee, index) => (
                        <div key={index} className="text-sm text-gray-600">• {attendee}</div>
                      )) :
                      <div className="text-sm text-gray-600">• {selectedEvent.attendees}</div>
                    }
                  </div>
                </div>

                <div className="flex space-x-3 mt-6 pt-4 border-t border-gray-200">
                  <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap">
                    <i className="ri-edit-line mr-2"></i>
                    Edit Event
                  </button>
                  <button
                    onClick={() => handleDeleteEvent(selectedEvent.id)}
                    className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <i className="ri-delete-bin-line mr-2"></i>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Event Modal */}
      {showEventModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Add New Event</h3>
                <button
                  onClick={() => setShowEventModal(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  <i className="ri-close-line text-gray-600"></i>
                </button>
              </div>

              <form id="calendar-event-form" data-readdy-form onSubmit={handleCreateEvent} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Event Title</label>
                  <input
                    type="text"
                    name="eventTitle"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter event title"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                    <input
                      type="date"
                      name="eventDate"
                      value={newEvent.date}
                      onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                    <input
                      type="time"
                      name="eventTime"
                      value={newEvent.time}
                      onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    name="eventCategory"
                    value={newEvent.category}
                    onChange={(e) => setNewEvent({...newEvent, category: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent pr-8"
                  >
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    name="eventLocation"
                    value={newEvent.location}
                    onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Event location"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <select
                    name="eventPriority"
                    value={newEvent.priority}
                    onChange={(e) => setNewEvent({...newEvent, priority: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent pr-8"
                  >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    name="eventDescription"
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Event description..."
                    maxLength={500}
                  />
                  <p className="text-xs text-gray-500 mt-1">{newEvent.description.length}/500 characters</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Attendees</label>
                  <input
                    type="text"
                    name="eventAttendees"
                    value={newEvent.attendees}
                    onChange={(e) => setNewEvent({...newEvent, attendees: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Comma-separated list of attendees"
                  />
                </div>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <i className="ri-check-circle-line text-green-600"></i>
                      <span className="text-green-800 font-medium">{submitMessage}</span>
                    </div>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <i className="ri-error-warning-line text-red-600"></i>
                      <span className="text-red-800 font-medium">{submitMessage}</span>
                    </div>
                  </div>
                )}

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowEventModal(false)}
                    disabled={submitStatus === 'submitting'}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitStatus === 'submitting' || submitStatus === 'success'}
                    className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitStatus === 'submitting' ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Submitting...</span>
                      </div>
                    ) : submitStatus === 'success' ? (
                      <>
                        <i className="ri-check-circle-line mr-2"></i>
                        Event Created!
                      </>
                    ) : (
                      <>
                        <i className="ri-add-line mr-2"></i>
                        Create Event
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <i className="ri-calendar-event-line text-blue-600 text-xl"></i>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{events.length}</p>
              <p className="text-sm text-gray-600">Total Events</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <i className="ri-calendar-check-line text-green-600 text-xl"></i>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{events.filter(e => e.status === 'upcoming').length}</p>
              <p className="text-sm text-gray-600">Upcoming Events</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <i className="ri-alarm-warning-line text-red-600 text-xl"></i>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{events.filter(e => e.category === 'deadline').length}</p>
              <p className="text-sm text-gray-600">Deadlines</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <i className="ri-group-line text-purple-600 text-xl"></i>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{events.filter(e => e.category === 'meeting').length}</p>
              <p className="text-sm text-gray-600">Meetings</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
