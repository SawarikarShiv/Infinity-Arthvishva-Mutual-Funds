import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../components/common/Card';
import { Badge } from '../../../../components/common/UI';
import { PrimaryButton, SecondaryButton } from '../../../../components/common/Button';
import { TextInput, SelectInput } from '../../../../components/common/Inputs';
import { Calendar, Clock, Video, Phone, MapPin, Plus, Search } from 'lucide-react';

const ClientMeetings = () => {
  const [view, setView] = useState('upcoming');
  const [searchTerm, setSearchTerm] = useState('');

  const meetings = {
    upcoming: [
      {
        id: 1,
        client: 'Rajesh Kumar',
        clientId: 1,
        date: '2024-01-25',
        time: '10:00 AM',
        duration: '60 mins',
        type: 'Video Call',
        purpose: 'Portfolio Review',
        status: 'Confirmed',
        agenda: 'Discuss Q4 performance and rebalancing strategy',
      },
      {
        id: 2,
        client: 'Priya Sharma',
        clientId: 2,
        date: '2024-01-26',
        time: '2:30 PM',
        duration: '45 mins',
        type: 'In Person',
        purpose: 'Goal Planning',
        status: 'Confirmed',
        agenda: 'New education goal for child',
      },
    ],
    past: [
      {
        id: 3,
        client: 'Amit Patel',
        clientId: 3,
        date: '2024-01-20',
        time: '11:00 AM',
        duration: '90 mins',
        type: 'Phone Call',
        purpose: 'Risk Assessment',
        status: 'Completed',
        agenda: 'Update risk profile and investment strategy',
        notes: 'Client satisfied with returns. Discussed tax-saving options.',
      },
    ],
  };

  const currentMeetings = meetings[view] || [];

  const getMeetingTypeIcon = (type) => {
    switch (type) {
      case 'Video Call': return <Video className="h-4 w-4" />;
      case 'Phone Call': return <Phone className="h-4 w-4" />;
      case 'In Person': return <MapPin className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Confirmed': return <Badge variant="success">Confirmed</Badge>;
      case 'Scheduled': return <Badge variant="warning">Scheduled</Badge>;
      case 'Completed': return <Badge variant="default">Completed</Badge>;
      case 'Cancelled': return <Badge variant="error">Cancelled</Badge>;
      default: return <Badge variant="default">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Client Meetings</h1>
          <p className="text-gray-600">Schedule and manage client meetings</p>
        </div>
        <div className="flex space-x-3">
          <SecondaryButton>Export Calendar</SecondaryButton>
          <PrimaryButton icon={<Plus className="h-4 w-4" />}>
            Schedule Meeting
          </PrimaryButton>
        </div>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <TextInput
                placeholder="Search meetings by client name or purpose..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={<Search className="h-4 w-4" />}
              />
            </div>
            <SelectInput
              label="View"
              value={view}
              onChange={setView}
              options={[
                { value: 'upcoming', label: 'Upcoming Meetings' },
                { value: 'past', label: 'Past Meetings' },
                { value: 'all', label: 'All Meetings' },
              ]}
            />
            <SelectInput
              label="Meeting Type"
              value="all"
              onChange={() => {}}
              options={[
                { value: 'all', label: 'All Types' },
                { value: 'video', label: 'Video Call' },
                { value: 'phone', label: 'Phone Call' },
                { value: 'in-person', label: 'In Person' },
              ]}
            />
          </div>
        </CardContent>
      </Card>

      {/* Meetings List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Meetings */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Meetings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {meetings.upcoming.map((meeting) => (
                <div
                  key={meeting.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        {getMeetingTypeIcon(meeting.type)}
                        <span className="font-medium text-gray-900">{meeting.client}</span>
                        {getStatusBadge(meeting.status)}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(meeting.date).toLocaleDateString('en-IN', { 
                            day: 'numeric', 
                            month: 'short', 
                            year: 'numeric' 
                          })}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {meeting.time} ({meeting.duration})
                        </div>
                      </div>
                      <p className="text-sm font-medium text-gray-900">
                        {meeting.purpose}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {meeting.agenda}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2 mt-4">
                    <SecondaryButton size="sm">Reschedule</SecondaryButton>
                    <PrimaryButton size="sm">Join</PrimaryButton>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Past Meetings */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Meetings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {meetings.past.map((meeting) => (
                <div
                  key={meeting.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        {getMeetingTypeIcon(meeting.type)}
                        <span className="font-medium text-gray-900">{meeting.client}</span>
                        {getStatusBadge(meeting.status)}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(meeting.date).toLocaleDateString('en-IN', { 
                            day: 'numeric', 
                            month: 'short', 
                            year: 'numeric' 
                          })}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {meeting.time}
                        </div>
                      </div>
                      <p className="text-sm font-medium text-gray-900">
                        {meeting.purpose}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {meeting.agenda}
                      </p>
                      {meeting.notes && (
                        <div className="mt-2 p-2 bg-gray-50 rounded">
                          <p className="text-sm font-medium text-gray-700">Notes:</p>
                          <p className="text-sm text-gray-600">{meeting.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClientMeetings;