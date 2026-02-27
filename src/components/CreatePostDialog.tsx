import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { X } from "lucide-react";
import { createNote, getCurrentUser, getPlaceHierarchy, JOURNAL_PK_ID, Note, User } from "../services/data-api";

interface CreatePostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPostCreated: (postPkId: string) => void;
}

export function CreatePostDialog({ open, onOpenChange, onPostCreated }: CreatePostDialogProps) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    continent: "",
    country: "",
    state: "",
    city: "",
    visitStartDate: "",
    visitEndDate: "",
    imageUrl: "",
    tags: [] as string[],
    currentTag: ""
  });

  const [countries, setCountries] = useState<string[]>([]);
  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [placeHierarchy, setPlaceHierarchy] = useState<any>(null);
  const [user, setUser] = useState<User>(); 


  useState(() => {
    async function fetchData() {
      const userData = await getCurrentUser();
      setUser(userData);
    }
    fetchData();
  });

  useState(() => {
    async function fetchPlaceHierarchy() {
      const hierarchy = await getPlaceHierarchy();
      setPlaceHierarchy(hierarchy);
    }
    fetchPlaceHierarchy();
  });


  const handleContinentChange = (continent: string) => {
    setFormData({ ...formData, continent, country: "", state: "", city: "" });
    const continentData = placeHierarchy.continents[continent];
    if (continentData) {
      setCountries(Object.keys(continentData.countries));
      setStates([]);
      setCities([]);
    }
  };

  const handleCountryChange = (country: string) => {
    setFormData({ ...formData, country, state: "", city: "" });
    const continentData = placeHierarchy.continents[formData.continent];
    const countryData = continentData?.countries[country];
    
    if (countryData?.states) {
      setStates(Object.keys(countryData.states));
      setCities([]);
    } else if (countryData?.cities) {
      setStates([]);
      setCities(countryData.cities);
    }
  };

  const handleStateChange = (state: string) => {
    setFormData({ ...formData, state, city: "" });
    const continentData = placeHierarchy.continents[formData.continent];
    const countryData = continentData?.countries[formData.country];
    const stateData = countryData?.states?.[state];
    
    if (stateData) {
      setCities(stateData.cities);
    }
  };

  const handleAddTag = () => {
    if (formData.currentTag && !formData.tags.includes(formData.currentTag)) {
      setFormData({
        ...formData,
        tags: [...formData.tags, formData.currentTag],
        currentTag: ""
      });
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(t => t !== tag)
    });
  };

  const handleSubmit = () => {
    if (user) {
      const newNote: Note = {
        pkId: '', // This will be set by the backend
        journalPkId: JOURNAL_PK_ID,
        authorPkId: user.pkId,
        editorPkId: user.pkId,
        title: formData.title,
        content: formData.content,
        description: formData.excerpt,
        metadata: {
          location: {
            city: formData.city,
            state: formData.state || undefined,
            country: formData.country,
            continent: formData.continent
          },
          visitStartDate: formData.visitStartDate,
          visitEndDate: formData.visitEndDate,
        },

        imageUrls: [formData.imageUrl || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"],
        tags: formData.tags,
        updatedBy: {
          pkId: user.pkId,
          firstName: user.firstName,
          lastName: user.lastName,
          alias: user.alias
        },
        createdAt: new Date(),
        updatedAt: new Date()
      };

      createNote(newNote).then((res) => {
        onPostCreated(res.pkId);
      }).catch(error => {
        console.error("Failed to create note:", error);
        alert("An error occurred while creating the post. Please try again.");
      });
      
      // Reset form
      setFormData({
        title: "",
        content: "",
        excerpt: "",
        continent: "",
        country: "",
        state: "",
        city: "",
        visitStartDate: "",
        visitEndDate: "",
        imageUrl: "",
        tags: [],
        currentTag: ""
      });
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto dialog-backdrop">
        <DialogHeader>
          <DialogTitle>Create New Post</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter post title"
            />
          </div>

          <div>
            <Label htmlFor="excerpt">Excerpt</Label>
            <Input
              id="excerpt"
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              placeholder="Brief description"
            />
          </div>

          <div>
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Write your travel story..."
              className="min-h-[150px]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="visitStartDate">Visit Start Date</Label>
              <Input
                id="visitStartDate"
                type="date"
                value={formData.visitStartDate}
                onChange={(e) => setFormData({ ...formData, visitStartDate: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="visitEndDate">Visit End Date</Label>
              <Input
                id="visitEndDate"
                type="date"
                value={formData.visitEndDate}
                onChange={(e) => setFormData({ ...formData, visitEndDate: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="continent">Continent</Label>
              <Select value={formData.continent} onValueChange={handleContinentChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select continent" />
                </SelectTrigger>
                <SelectContent>
                  {placeHierarchy ? Object.keys(placeHierarchy.continents).map(continent => (
                    <SelectItem key={continent} value={continent}>
                      {continent}
                    </SelectItem>
                  )) : 'Loading...'}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="country">Country</Label>
              <Select 
                value={formData.country} 
                onValueChange={handleCountryChange}
                disabled={!formData.continent}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map(country => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {states.length > 0 && (
            <div>
              <Label htmlFor="state">State/Province</Label>
              <Select value={formData.state} onValueChange={handleStateChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  {states.map(state => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div>
            <Label htmlFor="city">City</Label>
            <Select 
              value={formData.city} 
              onValueChange={(city: string) => setFormData({ ...formData, city })}
              disabled={cities.length === 0}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent>
                {cities.map(city => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="imageUrl">Image URL (optional)</Label>
            <Input
              id="imageUrl"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              placeholder="https://..."
            />
          </div>

          <div>
            <Label htmlFor="tags">Tags</Label>
            <div className="flex gap-2">
              <Input
                id="tags"
                value={formData.currentTag}
                onChange={(e) => setFormData({ ...formData, currentTag: e.target.value })}
                placeholder="Add a tag"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
              />
              <Button type="button" onClick={handleAddTag} variant="outline">
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="gap-1">
                  {tag}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => handleRemoveTag(tag)}
                  />
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!formData.title || !formData.content || !formData.city}
          >
            Create Post
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
