import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import NotesList from './components/NotesList';
import NoteEditor from './components/NoteEditor';
import FloatingActionButton from './components/FloatingActionButton';
import './App.css';

/**
 * NOTES APP MAIN
 * Simple Notes Application with Create, Edit, Delete, and Search functionality.
 */
const MOCK_NOTES = [
  {
    id: 1,
    title: "Welcome to Notes!",
    content: "This is a sample note. Use the + button to add your own notes.",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 2,
    title: "Minimal UI",
    content: "Enjoy a minimal, light-themed layout with easy note management.",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

// PUBLIC_INTERFACE
function App() {
  const [notes, setNotes] = useState(MOCK_NOTES);
  const [search, setSearch] = useState('');
  const [selectedNote, setSelectedNote] = useState(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editorMode, setEditorMode] = useState('create'); // 'create' or 'edit'

  // PUBLIC_INTERFACE
  const handleCreateClick = () => {
    setEditorMode('create');
    setSelectedNote(null);
    setEditorOpen(true);
  };

  // PUBLIC_INTERFACE
  const handleEditClick = (note) => {
    setEditorMode('edit');
    setSelectedNote(note);
    setEditorOpen(true);
  };

  // PUBLIC_INTERFACE
  const handleDeleteNote = (noteId) => {
    setNotes(prevNotes => prevNotes.filter(n => n.id !== noteId));
    if (selectedNote && selectedNote.id === noteId) {
      setSelectedNote(null);
      setEditorOpen(false);
    }
  };

  // PUBLIC_INTERFACE
  const handleSaveNote = (note) => {
    if (editorMode === 'edit' && note.id) {
      setNotes(prevNotes => prevNotes.map(n => n.id === note.id ? { ...note, updated_at: new Date().toISOString() } : n));
    } else {
      // Assign a simple new id
      const newId = Math.max(0, ...notes.map(n => n.id)) + 1;
      setNotes(prevNotes => [
        ...prevNotes,
        {
          ...note,
          id: newId,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
      ]);
    }
    setEditorOpen(false);
    setSelectedNote(null);
  };

  // PUBLIC_INTERFACE
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // Derived filtered notes
  const filteredNotes = notes.filter(n =>
    n.title.toLowerCase().includes(search.toLowerCase()) ||
    n.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="App" data-testid="notes-app">
      <Header search={search} onSearchChange={handleSearchChange} />
      <main className="app-main">
        <NotesList
          notes={filteredNotes}
          onEdit={handleEditClick}
          onDelete={handleDeleteNote}
          selectedNoteId={selectedNote ? selectedNote.id : null}
          onSelect={setSelectedNote}
        />
        {editorOpen && (
          <NoteEditor
            mode={editorMode}
            note={selectedNote}
            onSave={handleSaveNote}
            onCancel={() => setEditorOpen(false)}
          />
        )}
      </main>
      <FloatingActionButton onClick={handleCreateClick} />
    </div>
  );
}

export default App;
