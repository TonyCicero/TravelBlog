import { Globe, Menu, Plus } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { getPlaceHierarchy, PlaceHierarchy, User } from "../services/data-api";
import { useState } from "react";


interface HeaderProps {
  user?: User;
  onNavigate: (page: string, filter?: any) => void;
  onCreatePost: () => void;
  onSignIn: () => void;
}

export function Header({ onNavigate, onCreatePost, onSignIn, user }: HeaderProps) {
  const [placeHierarchy, setPlaceHierarchy] = useState<PlaceHierarchy>();
  useState(() => {
    async function fetchPlaceHierarchy() {
      const hierarchy = await getPlaceHierarchy();
      setPlaceHierarchy(hierarchy);
    }
    fetchPlaceHierarchy();
  });

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 backdrop-blur shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Left side - Places Visited */}
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-white hover:bg-white/20">
                  Places Visited
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuItem onClick={() => onNavigate("places")}>
                  All Places
                </DropdownMenuItem>
                
                { placeHierarchy ? Object.entries(placeHierarchy.continents).map(([continent, continentData]) => (
                  <DropdownMenuSub key={continent}>
                    <DropdownMenuSubTrigger>{continent}</DropdownMenuSubTrigger>
                    <DropdownMenuSubContent className="w-56">
                      <DropdownMenuItem 
                        onClick={() => onNavigate("places", { continent })}
                      >
                        All {continent}
                      </DropdownMenuItem>
                      
                      {Object.entries(continentData.countries).map(([country, countryData]) => (
                        <DropdownMenuSub key={country}>
                          <DropdownMenuSubTrigger>{country}</DropdownMenuSubTrigger>
                          <DropdownMenuSubContent className="w-56">
                            <DropdownMenuItem 
                              onClick={() => onNavigate("places", { continent, country })}
                            >
                              All {country}
                            </DropdownMenuItem>
                            
                            {countryData.states ? (
                              Object.entries(countryData.states).map(([state, stateData]) => (
                                <DropdownMenuSub key={state}>
                                  <DropdownMenuSubTrigger>{state}</DropdownMenuSubTrigger>
                                  <DropdownMenuSubContent className="w-56">
                                    <DropdownMenuItem 
                                      onClick={() => onNavigate("places", { continent, country, state })}
                                    >
                                      All {state}
                                    </DropdownMenuItem>
                                    
                                    {stateData.cities.map(city => (
                                      <DropdownMenuItem 
                                        key={city}
                                        onClick={() => onNavigate("places", { continent, country, state, city })}
                                      >
                                        {city}
                                      </DropdownMenuItem>
                                    ))}
                                  </DropdownMenuSubContent>
                                </DropdownMenuSub>
                              ))
                            ) : (
                              countryData.cities?.map(city => (
                                <DropdownMenuItem 
                                  key={city}
                                  onClick={() => onNavigate("places", { continent, country, city })}
                                >
                                  {city}
                                </DropdownMenuItem>
                              ))
                            )}
                          </DropdownMenuSubContent>
                        </DropdownMenuSub>
                      ))}
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                )) : 'Loading...' }
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Create New Post Button - Desktop */}
            {user?.isSysAdmin && (
              <Button
                  variant="ghost"
                  onClick={onCreatePost}
                  className="hidden md:flex text-white hover:bg-white/20 gap-2"
                >
                  <Plus className="h-4 w-4" />
                  New Post
              </Button>
            )}

          </div>

          {/* Center - Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer absolute left-1/2 transform -translate-x-1/2"
            onClick={() => onNavigate("home")}
          >
            <Globe className="h-6 w-6 text-white" />
            <span className="text-white hidden sm:block">Wanderlust Chronicles</span>
          </div>

          {/* Right side - About Me */}
          <div className="hidden md:flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => onNavigate("about")}
              className="text-white hover:bg-white/20"
            >
              About Me
            </Button>

            {!user ? (
              <Button
                variant="ghost"
                onClick={() => onSignIn()}
                className="text-white hover:bg-white/20"
              >
                Sign In
              </Button>
              
            ) : (<span className="text-white">Hello, {user.firstName}</span>)}

          </div>

          {/* Mobile menu */}
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={() => onNavigate("places")}>
                  Places Visited
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onNavigate("about")}>
                  About Me
                </DropdownMenuItem>
                {user ? (
                <DropdownMenuItem onClick={onCreatePost}>
                  <Plus className="h-4 w-4 mr-2" />
                  New Post
                </DropdownMenuItem>
                ) : ('')}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
