import React from 'react';
import './NotesList.css';

// PUBLIC_INTERFACE
function NotesList({ notes, onEdit, onDelete, selectedNoteId, onSelect }) {
  return (
    <section className="notes-list-section">
      {notes.length === 0 ? (
        <div className="empty-list">No notes found.</div>
      ) : (
        <ul className="notes-list">
          {notes.map(note => (
            <li
              key={note.id}
              className={`note-list-item${selectedNoteId === note.id ? ' active' : ''}`}
              onClick={() => onSelect(note)}
              tabIndex={0}
              aria-label={`View note ${note.title}`}
            >
              <div>
                <div className="note-title">{note.title}</div>
                <div className="note-snippet">{note.content.slice(0, 60)}{note.content.length > 60 ? '…' : ''}</div>
                <div className="note-meta">
                  <span className="note-date">
                    {new Date(note.updated_at).toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="note-actions">
                <button
                  className="edit-btn"
                  title="Edit note"
                  onClick={e => {
                    e.stopPropagation();
                    onEdit(note);
                  }}
                >Edit</button>
                <button
                  className="delete-btn"
                  title="Delete note"
                  onClick={e => {
                    e.stopPropagation();
                    onDelete(note.id);
                  }}
                >Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default NotesList;
