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

// import React, { useMemo } from 'react';

// // Strict type for notes
// export interface Notes {
//   top: string[];
//   middle: string[];
//   base: string[];
// }

// interface NotesBadgeProps {
//   notes: Notes;
//   /** If true, show only a compact preview of notes (first 3 + count) */
//   compact?: boolean;
// }

// /**
//  * Displays perfume notes.
//  * - compact=true  → only first 3 notes + "+N"
//  * - compact=false → full Top / Heart / Base sections
//  */
// function NotesBadgeComponent({ notes, compact = false }: NotesBadgeProps) {
//   // Make sure notes always have valid arrays (extra safety)
//   const safeNotes: Notes = {
//     top: Array.isArray(notes.top) ? notes.top : [],
//     middle: Array.isArray(notes.middle) ? notes.middle : [],
//     base: Array.isArray(notes.base) ? notes.base : [],
//   };

//   // Memoize combined notes so we don't recompute on every render
//   const allNotes = useMemo(
//     () => [...safeNotes.top, ...safeNotes.middle, ...safeNotes.base],
//     [safeNotes.top, safeNotes.middle, safeNotes.base]
//   );

//   if (compact) {
//     // Show only top 3 notes for compact view
//     const displayNotes = allNotes.slice(0, 3);
//     const extraCount = allNotes.length - displayNotes.length;

//     return (
//       <div className="flex flex-wrap gap-1">
//         {displayNotes.map((note) => (
//           <span
//             key={note}
//             className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
//           >
//             {note}
//           </span>
//         ))}

//         {extraCount > 0 && (
//           <span className="inline-block bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-full">
//             +{extraCount}
//           </span>
//         )}
//       </div>
//     );
//   }

//   // Full detailed view: Top / Heart / Base sections
//   return (
//     <div className="space-y-3">
//       {/* Top Notes */}
//       {safeNotes.top.length > 0 && (
//         <div>
//           <h4 className="text-sm font-medium text-gray-900 mb-2">Top Notes</h4>
//           <div className="flex flex-wrap gap-2">
//             {safeNotes.top.map((note) => (
//               <span
//                 key={note}
//                 className="inline-block bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full"
//               >
//                 {note}
//               </span>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Middle / Heart Notes */}
//       {safeNotes.middle.length > 0 && (
//         <div>
//           <h4 className="text-sm font-medium text-gray-900 mb-2">Heart Notes</h4>
//           <div className="flex flex-wrap gap-2">
//             {safeNotes.middle.map((note) => (
//               <span
//                 key={note}
//                 className="inline-block bg-pink-100 text-pink-800 text-sm px-3 py-1 rounded-full"
//               >
//                 {note}
//               </span>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Base Notes */}
//       {safeNotes.base.length > 0 && (
//         <div>
//           <h4 className="text-sm font-medium text-gray-900 mb-2">Base Notes</h4>
//           <div className="flex flex-wrap gap-2">
//             {safeNotes.base.map((note) => (
//               <span
//                 key={note}
//                 className="inline-block bg-amber-100 text-amber-800 text-sm px-3 py-1 rounded-full"
//               >
//                 {note}
//               </span>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// // Memoized export to avoid unnecessary re-renders when props don't change
// const NotesBadge = React.memo(NotesBadgeComponent);

// export default NotesBadge;


