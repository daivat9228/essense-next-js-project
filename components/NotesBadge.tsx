interface NotesBadgeProps {
  notes: {
    top: string[];
    middle: string[];
    base: string[];
  };
  compact?: boolean;
}

export default function NotesBadge({ notes, compact = false }: NotesBadgeProps) {
  if (compact) {
    // Show only top 3 notes for compact view
    const allNotes = [...notes.top, ...notes.middle, ...notes.base];
    const displayNotes = allNotes.slice(0, 3);
    
    return (
      <div className="flex flex-wrap gap-1">
        {displayNotes.map((note, index) => (
          <span
            key={index}
            className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
          >
            {note}
          </span>
        ))}
        {allNotes.length > 3 && (
          <span className="inline-block bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-full">
            +{allNotes.length - 3}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Top Notes */}
      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-2">Top Notes</h4>
        <div className="flex flex-wrap gap-2">
          {notes.top.map((note, index) => (
            <span
              key={index}
              className="inline-block bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full"
            >
              {note}
            </span>
          ))}
        </div>
      </div>

      {/* Middle Notes */}
      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-2">Heart Notes</h4>
        <div className="flex flex-wrap gap-2">
          {notes.middle.map((note, index) => (
            <span
              key={index}
              className="inline-block bg-pink-100 text-pink-800 text-sm px-3 py-1 rounded-full"
            >
              {note}
            </span>
          ))}
        </div>
      </div>

      {/* Base Notes */}
      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-2">Base Notes</h4>
        <div className="flex flex-wrap gap-2">
          {notes.base.map((note, index) => (
            <span
              key={index}
              className="inline-block bg-amber-100 text-amber-800 text-sm px-3 py-1 rounded-full"
            >
              {note}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
