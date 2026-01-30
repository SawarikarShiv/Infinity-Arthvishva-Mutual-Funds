import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../components/common/Card';
import { Badge } from '../../../../components/common/UI';
import { PrimaryButton, SecondaryButton } from '../../../../components/common/Button';
import { TextInput, SelectInput } from '../../../../components/common/Inputs';
import { Search, Plus, Edit, Trash2, User, Calendar, Tag } from 'lucide-react';

const ClientNotes = ({ clientId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [newNote, setNewNote] = useState('');
  const [newCategory, setNewCategory] = useState('general');

  // Sample client data
  const client = {
    id: clientId || 1,
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@email.com',
  };

  // Sample notes data
  const [notes, setNotes] = useState([
    {
      id: 1,
      content: 'Client expressed interest in increasing equity exposure for long-term goals. Recommended large-cap funds.',
      category: 'investment',
      tags: ['equity', 'long-term'],
      author: 'Advisor',
      date: '2024-01-15',
      clientId: 1,
    },
    {
      id: 2,
      content: 'Discussed tax-saving options. Client wants to explore ELSS funds for 80C benefits.',
      category: 'tax',
      tags: ['ELSS', 'tax-saving'],
      author: 'Advisor',
      date: '2024-01-10',
      clientId: 1,
    },
  ]);

  const categories = [
    { value: 'all', label: 'All Categories', color: 'gray' },
    { value: 'investment', label: 'Investment', color: 'blue' },
    { value: 'tax', label: 'Tax', color: 'green' },
    { value: 'communication', label: 'Communication', color: 'purple' },
    { value: 'profile', label: 'Profile', color: 'yellow' },
    { value: 'inquiry', label: 'Inquiry', color: 'red' },
    { value: 'general', label: 'General', color: 'gray' },
  ];

  const getCategoryColor = (category) => {
    const cat = categories.find(c => c.value === category);
    return cat?.color || 'gray';
  };

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = categoryFilter === 'all' || note.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleAddNote = () => {
    if (!newNote.trim()) return;

    const newNoteObj = {
      id: notes.length + 1,
      content: newNote,
      category: newCategory,
      tags: [],
      author: 'Advisor',
      date: new Date().toISOString().split('T')[0],
      clientId: client.id,
    };

    setNotes([newNoteObj, ...notes]);
    setNewNote('');
    setNewCategory('general');
  };

  const handleDeleteNote = (noteId) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      setNotes(notes.filter(note => note.id !== noteId));
    }
  };

  return (
    <div className="space-y-6">
      {/* Client Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <User className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{client.name}</h2>
              <p className="text-gray-600">{client.email}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add New Note */}
      <Card>
        <CardHeader>
          <CardTitle>Add New Note</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SelectInput
                label="Category"
                value={newCategory}
                onChange={setNewCategory}
                options={categories.filter(c => c.value !== 'all')}
              />
              <div className="flex items-end">
                <div className="flex-1">
                  <TextInput
                    label="Add tags (comma separated)"
                    placeholder="investment, long-term"
                  />
                </div>
              </div>
            </div>
            <TextInput
              label="Note"
              placeholder="Enter your notes here..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              multiline
              rows={3}
            />
            <div className="flex justify-end">
              <PrimaryButton icon={<Plus className="h-4 w-4" />} onClick={handleAddNote}>
                Add Note
              </PrimaryButton>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <TextInput
                placeholder="Search notes by content or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={<Search className="h-4 w-4" />}
              />
            </div>
            <SelectInput
              label="Category"
              value={categoryFilter}
              onChange={setCategoryFilter}
              options={categories}
            />
            <SelectInput
              label="Sort By"
              value="date"
              onChange={() => {}}
              options={[
                { value: 'date', label: 'Date (Newest)' },
                { value: 'oldest', label: 'Date (Oldest)' },
                { value: 'category', label: 'Category' },
              ]}
            />
          </div>
        </CardContent>
      </Card>

      {/* Notes List */}
      <div className="space-y-4">
        {filteredNotes.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-gray-500">No notes found</p>
            </CardContent>
          </Card>
        ) : (
          filteredNotes.map((note) => (
            <Card key={note.id}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <Badge variant={getCategoryColor(note.category)}>
                      {categories.find(c => c.value === note.category)?.label || note.category}
                    </Badge>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(note.date).toLocaleDateString('en-IN', { 
                        day: 'numeric', 
                        month: 'short', 
                        year: 'numeric' 
                      })}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <SecondaryButton size="sm" icon={<Edit className="h-3 w-3" />}>
                      Edit
                    </SecondaryButton>
                    <SecondaryButton 
                      size="sm" 
                      icon={<Trash2 className="h-3 w-3" />}
                      variant="error"
                      onClick={() => handleDeleteNote(note.id)}
                    >
                      Delete
                    </SecondaryButton>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">{note.content}</p>
                <div className="flex flex-wrap gap-2">
                  {note.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      <Tag className="h-2 w-2 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default ClientNotes;