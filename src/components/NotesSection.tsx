import React, { useState } from 'react';
import {
  FileText,
  Plus,
  Trash2,
  Tag,
  Copy,
  Check,
  Search,
  Calendar,
  Sparkles,
  Bookmark,
} from 'lucide-react';
import type { WorkspaceNote } from '../types';
import type { User } from 'firebase/auth';

interface NotesSectionProps {
  notes: WorkspaceNote[];
  onAddNote: (note: Omit<WorkspaceNote, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  onDeleteNote: (id: string) => Promise<void>;
  user: User | null;
}

export const NotesSection: React.FC<NotesSectionProps> = ({
  notes,
  onAddNote,
  onDeleteNote,
  user,
}) => {
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<WorkspaceNote['category']>('General');
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const categories: Array<WorkspaceNote['category']> = [
    'General',
    'AI Insights',
    'Places',
    'Ideas',
  ];

  const handleCreateNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setIsSaving(true);
    try {
      await onAddNote({
        title: title.trim(),
        content: content.trim(),
        category,
      });
      setTitle('');
      setContent('');
      setIsCreating(false);
    } catch (err) {
      console.error('Failed to create note:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredNotes = notes.filter((n) => {
    const matchesCategory = filterCategory === 'All' || n.category === filterCategory;
    const matchesSearch =
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Bookmark className="w-3.5 h-3.5" />
            <span>Firestore Persistent Storage</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">Workspace Notes</h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Save Gemini chatbot discussions, Google Maps place recommendations, and ideas.
          </p>
        </div>

        <button
          onClick={() => setIsCreating(!isCreating)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold shadow-lg shadow-amber-600/30 transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{isCreating ? 'Cancel' : 'New Note'}</span>
        </button>
      </div>

      {/* Note Creation Form */}
      {isCreating && (
        <form
          onSubmit={handleCreateNote}
          className="bg-slate-900 border border-amber-500/30 rounded-2xl p-5 space-y-4 shadow-xl animate-in slide-in-from-top-2 duration-150"
        >
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Create New Workspace Note</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-slate-300 mb-1">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Travel Itinerary, Model Prompt Ideas..."
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as WorkspaceNote['category'])}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your note, paste AI output, or draft insights..."
              rows={4}
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none font-sans"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving || !title.trim() || !content.trim()}
              className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white text-xs font-semibold shadow-md shadow-amber-600/30 transition-all cursor-pointer"
            >
              {isSaving ? 'Saving to Firestore...' : 'Save Note'}
            </button>
          </div>
        </form>
      )}

      {/* Filter and search bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
        <div className="flex flex-wrap items-center gap-1.5">
          {['All', ...categories].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                filterCategory === cat
                  ? 'bg-amber-600 text-white font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-60">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notes..."
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>
      </div>

      {/* Notes Grid */}
      {filteredNotes.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800/80 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center mx-auto text-slate-400">
            <FileText className="w-6 h-6" />
          </div>
          <p className="text-sm font-semibold text-slate-300">No notes found</p>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {notes.length === 0
              ? 'Click "New Note" above or use the "Save to Notes" button in the Gemini Chatbot.'
              : 'No notes match your current search or category filter.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredNotes.map((note) => (
            <div
              key={note.id || note.title}
              className="group bg-slate-900 border border-slate-800 hover:border-amber-500/40 rounded-xl p-4 flex flex-col justify-between space-y-3 transition-all duration-200 shadow-md"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                    {note.title}
                  </h4>
                  <span
                    className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded border shrink-0 ${
                      note.category === 'AI Insights'
                        ? 'bg-indigo-950 text-indigo-300 border-indigo-800/60'
                        : note.category === 'Places'
                        ? 'bg-sky-950 text-sky-300 border-sky-800/60'
                        : 'bg-amber-950 text-amber-300 border-amber-800/60'
                    }`}
                  >
                    {note.category}
                  </span>
                </div>

                <p className="text-xs text-slate-300 whitespace-pre-wrap leading-relaxed line-clamp-6">
                  {note.content}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {note.createdAt?.toDate
                    ? note.createdAt.toDate().toLocaleDateString()
                    : 'Today'}
                </span>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleCopy(note.id || note.title, note.content)}
                    className="p-1 hover:text-slate-200 transition-colors cursor-pointer"
                    title="Copy note text"
                  >
                    {copiedId === (note.id || note.title) ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                  {note.id && (
                    <button
                      onClick={() => onDeleteNote(note.id!)}
                      className="p-1 hover:text-red-400 transition-colors cursor-pointer"
                      title="Delete note"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
