import { CalendarDays, MapPin } from "lucide-react";
import { listNotes, Note } from "../services/data-api";
import { useState } from "react";

interface TimelineProps {
  onPostClick?: (postId: string) => void;
}

export function Timeline({ onPostClick }: TimelineProps) {

  const [notes, setNotes] = useState<Note[]>([]);
  useState(() => {
    async function fetchData() {
      const notesData = await listNotes();
      setNotes(notesData);
    }
    fetchData();
  });

  const sortedNotes = [...notes].sort((a, b) => 
    new Date(b.metadata.visitStartDate).getTime() - new Date(a.metadata.visitStartDate).getTime()
  );

  const formatDateRange = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    
    if (start === end) {
      return startDate.toLocaleDateString('en-US', options);
    }
    
    return `${startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endDate.toLocaleDateString('en-US', options)}`;
  };

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500"></div>

      {/* Timeline items */}
      <div className="space-y-8">
        {sortedNotes.map((note, index) => (
          <div key={note.pkId} className="relative pl-20">
            {/* Timeline dot */}
            <div className="absolute left-5 top-2 w-7 h-7 rounded-full bg-white border-4 border-blue-500 shadow-lg z-10 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            </div>

            {/* Content card */}
            <div 
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all cursor-pointer border-l-4 border-blue-500 p-4"
              onClick={() => onPostClick?.(note.pkId)}
              style={{
                borderLeftColor: index % 3 === 0 ? '#3b82f6' : index % 3 === 1 ? '#a855f7' : '#ec4899'
              }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <h4 className="mb-2">{note.title}</h4>
                  <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-2">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-blue-500" />
                      <span>
                        {note.metadata.location.city}, {note.metadata.location.country}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CalendarDays className="h-4 w-4 text-purple-500" />
                      <span>{formatDateRange(note.metadata.visitStartDate, note.metadata.visitEndDate)}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{note.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
