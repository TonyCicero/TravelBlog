import { Tag, MapPin, Calendar } from "lucide-react";

import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./ui/ImageWithFallback";
import { listNotesByTags, Note } from "../services/data-api";
import { useState } from "react";

interface TagPageProps {
  tag: string;
  onNavigate: (page: string, data?: any) => void;
}

export function TagPage({ tag, onNavigate }: TagPageProps) {

  const [notes, setNotes] = useState<Note[]>([]);
  useState(() => {
    async function fetchData() {
      const notesData = await listNotesByTags([tag]);
      setNotes(notesData);
    }
    fetchData();
  });


  const formatDateRange = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    
    if (start === end) {
      return startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
    
    return `${startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
  };

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="bg-blue-600 text-white border-b">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center gap-3 mb-2">
            <Tag className="h-10 w-10" />
            <h1>{tag}</h1>
          </div>
          <p className="text-white/90 text-xl">
            {notes.length} {notes.length === 1 ? 'adventure' : 'adventures'} tagged with "{tag}"
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {notes.map((note, index) => (
            <Card
              key={note.pkId}
              className="cursor-pointer hover:shadow-2xl transition-all overflow-hidden border-2 hover:scale-105 transform duration-300"
              onClick={() => onNavigate("post", { notePkId: note.pkId })}
              style={{
                borderColor: index % 3 === 0 ? '#3b82f6' : index % 3 === 1 ? '#a855f7' : '#ec4899'
              }}
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <ImageWithFallback
                  src={note.imageUrls[0] || ''}
                  alt={note.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm">
                  🌍 {note.metadata.location.continent}
                </div>
              </div>
              <CardHeader>
                <h3>{note.title}</h3>
                <div className="flex flex-col gap-2 text-sm text-gray-600 mt-2">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-blue-500" />
                    <span>{note.metadata.location.city}, {note.metadata.location.country}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-purple-500" />
                    <span>{formatDateRange(note.metadata.visitStartDate, note.metadata.visitEndDate)}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{note.description}</p>
                <div className="flex flex-wrap gap-2">
                  {note.tags.slice(0, 3).map(tag => (
                    <Badge 
                      key={tag} 
                      variant={tag === tag ? "default" : "outline"}
                      className={tag === tag 
                        ? "bg-blue-600" 
                        : "cursor-pointer hover:bg-blue-600 hover:text-white border-blue-300"
                      }
                      onClick={(e: any) => {
                        if (tag !== tag) {
                          e.stopPropagation();
                          onNavigate("tag", { tag: tag });
                        }
                      }}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
