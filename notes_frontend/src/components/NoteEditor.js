import React, { useState, useEffect } from "react";
import "./NoteEditor.css";

// PUBLIC_INTERFACE
function NoteEditor({ mode, note, onSave, onCancel }) {
  const [title, setTitle] = useState(note ? note.title : "");
  const [content, setContent] = useState(note ? note.content : "");
  const [error, setError] = useState("");

  useEffect(() => {
    setTitle(note ? note.title : "");
    setContent(note ? note.content : "");
    setError("");
  }, [note]);

  // PUBLIC_INTERFACE
  const handleSubmit = e => {
    e.preventDefault();
    if (title.trim() === "" && content.trim() === "") {
      setError("Title or content required.");
      return;
    }
    onSave({
      ...note,
      title: title.trim(),
      content: content.trim(),
    });
    setTitle("");
    setContent("");
  };

  return (
    <div className="modal-backdrop">
      <div className="note-editor-modal" role="dialog" aria-modal="true">
        <h2>{mode === "edit" ? "Edit Note" : "New Note"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="note-title-input"
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Note title"
            autoFocus
            maxLength={80}
            aria-label="Note title"
          />
          <textarea
            className="note-content-input"
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Type your note here..."
            minLength={1}
            maxLength={2000}
            rows={7}
            aria-label="Note content"
          />
          {error && <div className="editor-error">{error}</div>}
          <div className="note-editor-actions">
            <button type="button" className="cancel-btn" onClick={onCancel}>Cancel</button>
            <button type="submit" className="save-btn">{mode === "edit" ? "Save" : "Create"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NoteEditor;
