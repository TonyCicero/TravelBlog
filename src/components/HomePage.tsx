import { Calendar, MapPin, Tag, Plane, Camera, Compass } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./ui/ImageWithFallback";
import { WorldMap } from "./WorldMap";
import { getJournal, Journal, listNotes, listTags, Note } from "../services/data-api";
import { useState } from "react";

interface HomePageProps {
  onNavigate: (page: string, data?: any) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {

  const [journal, setJournal] = useState<Journal>();
  const [notes, setNotes] = useState<Note[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  useState(() => {
    async function fetchData() {
      const journalData = await getJournal();
      const notesData = await listNotes();
      const tags = await listTags();
      setJournal(journalData);
      setNotes(notesData);
      setTags(tags);
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
      {/* Hero Section */}
      <section className="relative bg-blue-600 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 animate-bounce">
            <Plane className="h-16 w-16 rotate-45" />
          </div>
          <div className="absolute top-20 right-20 animate-pulse">
            <Camera className="h-12 w-12" />
          </div>
          <div className="absolute bottom-20 left-1/4 animate-bounce delay-100">
            <Compass className="h-14 w-14" />
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-6 text-5xl md:text-6xl">Wanderlust Chronicles</h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              Join me as I explore the world, one destination at a time. From bustling cities to 
              serene landscapes, discover stories, tips, and unforgettable moments from my travels.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white/20 backdrop-blur px-6 py-3 rounded-full">
                <span className="text-2xl">🌍 25+ Countries</span>
              </div>
              <div className="bg-white/20 backdrop-blur px-6 py-3 rounded-full">
                <span className="text-2xl">✈️ 50+ Cities</span>
              </div>
              <div className="bg-white/20 backdrop-blur px-6 py-3 rounded-full">
                <span className="text-2xl">📸 100+ Adventures</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* World Map Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-blue-900">
            Explore My Journey
          </h2>
          <p className="text-gray-600">Click on any location to read about my adventures</p>
        </div>
        <WorldMap onLocationClick={(postId) => onNavigate("post", { postId })} />
      </section>

      {/* Tags Section */}
      <section className="bg-white border-y border-blue-200">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-2 mb-4">
            <Tag className="h-5 w-5 text-blue-600" />
            <h3 className="text-blue-900">
              Explore by Tag
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <Badge
                key={tag}
                variant="secondary"
                className="cursor-pointer hover:bg-blue-600 hover:text-white transition-all text-base py-1 px-4"
                onClick={() => onNavigate("tag", { tag })}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="mb-8 text-center text-blue-900">
          Recent Adventures
        </h2>
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
                  src={note.imageUrls?.[0] || "/images/fallback.jpg"}
                  alt={note.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm">
                  🌍 {note.metadata?.location?.continent}
                </div>
              </div>
              <CardHeader>
                <h3>{note.title}</h3>
                <div className="flex flex-col gap-2 text-sm text-gray-600 mt-2">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-blue-500" />
                    <span>{note.metadata?.location?.city}, {note.metadata?.location?.country}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-purple-500" />
                    <span>{formatDateRange(note.metadata?.visitStartDate, note.metadata?.visitEndDate)}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{note.description}</p>
                <div className="flex flex-wrap gap-2">
                  {note.tags?.slice(0, 3).map(tag => (
                    <Badge key={tag} variant="outline" className="border-purple-300">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
