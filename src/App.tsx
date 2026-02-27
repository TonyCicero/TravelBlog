import { useState } from "react";
import { Header } from "./components/Header";
import { HomePage } from "./components/HomePage";
import { AboutPage } from "./components/AboutPage";
import { BlogPostPage } from "./components/BlogPostPage";
import { PlacesPage } from "./components/PlacesPage";
import { TagPage } from "./components/TagPage";
import { CreatePostDialog } from "./components/CreatePostDialog";
import { getCurrentUser, signInWithGoogle, User } from "./services/data-api";

type Page = "home" | "about" | "post" | "places" | "tag";

interface PageState {
  page: Page;
  data?: any;
}

export default function App() {
  const [pageState, setPageState] = useState<PageState>({ page: "home" });
  const [showCreateDialog, setShowCreateDialog] = useState(false);


  const [currentUser, setCurrentUser] = useState<User>();
  useState(() => {
    async function fetchCurrentUser() {
      try {
        const user = await getCurrentUser();
        setCurrentUser(user);
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    }
    fetchCurrentUser();
  });

  const handleNavigate = (page: string, data?: any) => {
    console.log(`Navigating to ${page} with data:`, data);
    setPageState({ page: page as Page, data });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCreatePost = () => {
    setShowCreateDialog(true);
  };

  const handlePostCreated = (notePkId: string) => {
    handleNavigate("post", { notePkId });
  };

  const renderPage = () => {
    switch (pageState.page) {
      case "home":
        return <HomePage onNavigate={handleNavigate} />;
      case "about":
        return <AboutPage onNavigate={handleNavigate} />;
      case "post":
        return (
          <BlogPostPage
            notePkId={pageState.data?.notePkId}
            onNavigate={handleNavigate}
          />
        );
      case "places":
        return (
          <PlacesPage
            filter={pageState.data}
            onNavigate={handleNavigate}
          />
        );
      case "tag":
        return (
          <TagPage
            tag={pageState.data?.tag}
            onNavigate={handleNavigate}
          />
        );
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen">
      <Header onNavigate={handleNavigate} onCreatePost={handleCreatePost} user={currentUser} onSignIn={signInWithGoogle}/>
      <main>{renderPage()}</main>
      
      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white border-t">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-lg">© 2024 Wanderlust Chronicles. All rights reserved.</p>
            <p className="mt-2 text-white/90">Exploring the world, one story at a time. ✈️🌍📸</p>
          </div>
        </div>
      </footer>

      <CreatePostDialog 
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        onPostCreated={handlePostCreated}
      />
    </div>
  );
}
