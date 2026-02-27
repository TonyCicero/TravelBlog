import { useState } from "react";
import { Calendar, MapPin, Edit2, Save, X, Plane, Trash2 } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardHeader } from "./ui/card";
import { ImageWithFallback } from "./ui/ImageWithFallback";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { deleteNote, getNote, listNotesByTags, Note, updateNote } from "../services/data-api";

interface BlogPostPageProps {
  notePkId: string;
  onNavigate: (page: string, data?: any) => void;
}

export function BlogPostPage({ notePkId, onNavigate }: BlogPostPageProps) {
  const [note, setNote] = useState<Note>();
  useState(() => {
    async function fetchData() {
      const noteData = await getNote(notePkId);
      setNote(noteData);
    }
    fetchData();
  });

    // Get related notes by tags
  const [relatedNotes, setRelatedNotes] = useState<Note[]>([]);
  useState(() => {
    async function fetchRelatedNotes() {
      if (note){
        const related = await listNotesByTags(note.tags);
        setRelatedNotes(related.filter(n => n.pkId !== note.pkId));
      }
    }
    fetchRelatedNotes();
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(note?.content || "");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  if (!note) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h2>Post not found</h2>
          <Button onClick={() => onNavigate("home")} className="mt-4">
            Go back home
          </Button>
        </div>
      </div>
    );
  }

  const handleSave = async () => {
    await updateNote(notePkId, { content: editedContent });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedContent(note.content);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    await deleteNote(notePkId);
    onNavigate("home");
  };

  const formatDateRange = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' };
    
    if (start === end) {
      return startDate.toLocaleDateString('en-US', options);
    }
    
    return `${startDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - ${endDate.toLocaleDateString('en-US', options)}`;
  };



  return (
    <div className="min-h-screen bg-blue-50">
      {/* Hero Image */}
      <div className="w-full h-[500px] relative">
        <ImageWithFallback
          src={note.imageUrls?.[0] || ''}
          alt={note.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <div className="max-w-4xl">
              <div className="inline-block bg-blue-500 text-white px-4 py-2 rounded-full mb-4">
                <span className="flex items-center gap-2">
                  <Plane className="h-4 w-4" />
                  {note.metadata?.location?.continent}
                </span>
              </div>
              <h1 className="text-white mb-4 text-4xl md:text-5xl">{note.title}</h1>
              <div className="flex flex-wrap items-center gap-6 text-white">
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-full">
                  <MapPin className="h-5 w-5" />
                  <span>
                    {note.metadata?.location?.city}
                    {note.metadata?.location?.state && `, ${note.metadata?.location?.state}`}, {note.metadata?.location?.country}
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-full">
                  <Calendar className="h-5 w-5" />
                  <span>Visited: {formatDateRange(note.metadata?.visitStartDate, note.metadata?.visitEndDate)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8 border-t-4 border-blue-500">
            {/* Edit Controls */}
            <div className="flex justify-end mb-6 gap-2">
              {!isEditing ? (
                <>
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(true)}
                    className="gap-2 border-blue-300 hover:bg-blue-50"
                  >
                    <Edit2 className="h-4 w-4" />
                    Edit Post
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowDeleteDialog(true)}
                    className="gap-2 border-red-300 hover:bg-red-50 text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </Button>
                </>
              ) : (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                    className="gap-2"
                  >
                    <X className="h-4 w-4" />
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSave}
                    className="gap-2 bg-blue-600 hover:bg-blue-700"
                  >
                    <Save className="h-4 w-4" />
                    Save
                  </Button>
                </div>
              )}
            </div>

            {/* Content */}
            {isEditing ? (
              <Textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="min-h-[300px] mb-6 text-base"
              />
            ) : (
              <div className="prose max-w-none mb-8">
                <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
                  {note.content}
                </p>
              </div>
            )}

            {/* Tags */}
            <div className="border-t border-blue-200 pt-6">
              <div className="flex flex-wrap gap-2">
                {note.tags?.map(tag => (
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
          </div>

          {/* Related Notes */}
          {relatedNotes.length > 0 && (
            <div>
              <h2 className="mb-6 text-blue-900">
                Related Adventures
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedNotes.map((relatedNote, index) => (
                  <Card
                    key={relatedNote.pkId}
                    className="cursor-pointer hover:shadow-xl transition-all overflow-hidden border-2 hover:scale-105 transform duration-300"
                    onClick={() => onNavigate("note", { notePkId: relatedNote.pkId })}
                    style={{
                      borderColor: index % 3 === 0 ? '#3b82f6' : index % 3 === 1 ? '#a855f7' : '#ec4899'
                    }}
                  >
                    <div className="aspect-video relative overflow-hidden">
                      <ImageWithFallback
                        src={relatedNote.imageUrls[0] || ''}
                        alt={relatedNote.title}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <CardHeader>
                      <h4>{relatedNote.title}</h4>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600">{relatedNote.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the note "{note.title}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
