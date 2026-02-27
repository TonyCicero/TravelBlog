interface Journal {
  pkId: string;
  ownerPkId: string;
  title: string;
  description: string;
  metadata: any;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Note {
    pkId: string;
    journalPkId: string;
    authorPkId: string;
    editorPkId: string;
    title: string;
    description: string;
    content: string;
    imageUrls: string[];

    tags: string[];
    metadata: any;

    updatedBy: { pkId: string; firstName: string; lastName: string; alias: string; };
    createdAt: Date;
    updatedAt: Date;
}

interface User {
    pkId: string;
    sessionPkId: string;
    email: string;
    firstName: string;
    lastName: string;
    alias: string;

    isSysAdmin: boolean;

    createdAt: Date;
    updatedAt: Date;
    loginAt: Date;
}

interface PlaceHierarchy {
  continents: {
    [continent: string]: {
      countries: {
        [country: string]: {
          states?: {
            [state: string]: {
              cities: string[];
            };
          };
          cities?: string[];
        };
      };
    };
  };
}

export const JOURNAL_PK_ID = '8c99e914-8247-40b4-84c1-b72863221273';

//const API_BASE_URL = 'http://localhost:3000'; 
const API_BASE_URL = 'https://node.tcicerodev.com:3000';

/**
 * Get Journal.
 */
export async function getJournal(): Promise<Journal> {
  try {
    const params = new URLSearchParams();
    params.append("pkId", JOURNAL_PK_ID);

    const response = await fetch(`${API_BASE_URL}/journal/get?${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error getting journal:', error);
    throw error;
  }
}

/**
 * List Notes.
 */
export async function createNote(note: Note): Promise<Note> {
  try {
    const response = await fetch(`${API_BASE_URL}/journal/createNote`, {
      method: 'POST',
      credentials: 'include', // Include cookies for authentication
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ journalPkId: JOURNAL_PK_ID, note }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating note:', error);
    throw error;
  }
}

/**
 * List Notes.
 */
export async function deleteNote(notePkId: string): Promise<Note> {
  try {
    const response = await fetch(`${API_BASE_URL}/journal/deleteNote`, {
      method: 'POST',
      credentials: 'include', // Include cookies for authentication
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ journalPkId: JOURNAL_PK_ID, notePkId }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error deleting note:', error);
    throw error;
  }
}

/**
 * List Notes.
 */
export async function getNote(notePkId: string): Promise<Note> {
  try {
    const params = new URLSearchParams();
    params.append("journalPkId", JOURNAL_PK_ID);
    params.append("notePkId", notePkId);

    const response = await fetch(`${API_BASE_URL}/journal/getNote?${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error getting note:', error);
    throw error;
  }
}

/**
 * List Notes.
 */
export async function listNotes(): Promise<Note[]> {
  try {
    const params = new URLSearchParams();
    params.append("journalPkId", JOURNAL_PK_ID);

    const response = await fetch(`${API_BASE_URL}/journal/listNotes?${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error listing notes:', error);
    throw error;
  }
}

/**
 * List Notes by location.
 */
export async function listNotesByLocation(continent?: string, country?: string, state?: string, city?: string): Promise<Note[]> {
  try {
    const params = new URLSearchParams();
    params.append("journalPkId", JOURNAL_PK_ID);
    if (continent) params.append("continent", continent);
    if (country) params.append("country", country);
    if (state) params.append("state", state);
    if (city) params.append("city", city);

    const response = await fetch(`${API_BASE_URL}/journal/listNotesByLocation?${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error listing notes:', error);
    throw error;
  }
}

/**
 * List Notes by tags.
 */
export async function listNotesByTags(tags: string[]): Promise<Note[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/journal/listNotesByTags`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ journalPkId: JOURNAL_PK_ID, tags }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error listing notes:', error);
    throw error;
  }
}

/**
 * List tags.
 */
export async function listTags(): Promise<string[]> {
  try {
    const params = new URLSearchParams();
    params.append("journalPkId", JOURNAL_PK_ID);

    const response = await fetch(`${API_BASE_URL}/journal/listTags?${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error listing tags:', error);
    throw error;
  }
}

/**
 * Update note.
 */
export async function updateNote(notePkId: string, updatedNote: Partial<Note>): Promise<Note> {
  try {
    const response = await fetch(`${API_BASE_URL}/journal/updateNote`, {
      method: 'POST',
      credentials: 'include', // Include cookies for authentication
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ journalPkId: JOURNAL_PK_ID, notePkId, updatedNote }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating note:', error);
    throw error;
  }
}


/**
 * Get Place hierarchy.
 * TODO: Implement this API endpoint on the backend and return real data instead of mock data.
 */
export async function getPlaceHierarchy(): Promise<PlaceHierarchy> {
return {
    continents: {
      "Europe": {
        countries: {
          "France": { cities: ["Paris", "Lyon", "Marseille"] },
          "Italy": { cities: ["Rome", "Venice", "Florence"] },
          "Spain": { cities: ["Barcelona", "Madrid", "Seville"] },
          "United Kingdom": { cities: ["London", "Manchester", "Edinburgh"] },
          "Germany": { cities: ["Berlin", "Munich", "Hamburg"] },
          "Netherlands": { cities: ["Amsterdam", "Rotterdam", "The Hague"] }
        }
      },
      "Asia": {
        countries: {
          "Japan": { cities: ["Tokyo", "Kyoto", "Osaka"] },
          "Thailand": { cities: ["Bangkok", "Chiang Mai", "Phuket"] },
          "China": { cities: ["Beijing", "Shanghai", "Shenzhen"] },
          "India": { cities: ["New Delhi", "Mumbai", "Bengaluru"] },
          "South Korea": { cities: ["Seoul", "Busan", "Incheon"] }
        }
      },
      "North America": {
        countries: {
          "United States": {
            states: {
              "Alabama": { cities: ["Birmingham", "Montgomery"] },
              "Alaska": { cities: ["Anchorage", "Juneau"] },
              "Arizona": { cities: ["Phoenix", "Tucson"] },
              "Arkansas": { cities: ["Little Rock", "Fayetteville"] },
              "California": { cities: ["Los Angeles", "San Francisco", "San Diego"] },
              "Colorado": { cities: ["Denver", "Colorado Springs"] },
              "Connecticut": { cities: ["Hartford", "New Haven"] },
              "Delaware": { cities: ["Wilmington", "Dover"] },
              "Florida": { cities: ["Miami", "Orlando", "Tampa"] },
              "Georgia": { cities: ["Atlanta", "Savannah"] },
              "Hawaii": { cities: ["Honolulu", "Hilo"] },
              "Idaho": { cities: ["Boise", "Idaho Falls"] },
              "Illinois": { cities: ["Chicago", "Springfield"] },
              "Indiana": { cities: ["Indianapolis", "Fort Wayne"] },
              "Iowa": { cities: ["Des Moines", "Cedar Rapids"] },
              "Kansas": { cities: ["Wichita", "Topeka"] },
              "Kentucky": { cities: ["Louisville", "Frankfort"] },
              "Louisiana": { cities: ["New Orleans", "Baton Rouge"] },
              "Maine": { cities: ["Portland", "Augusta"] },
              "Maryland": { cities: ["Baltimore", "Annapolis"] },
              "Massachusetts": { cities: ["Boston", "Worcester"] },
              "Michigan": { cities: ["Detroit", "Lansing"] },
              "Minnesota": { cities: ["Minneapolis", "Saint Paul"] },
              "Mississippi": { cities: ["Jackson", "Gulfport"] },
              "Missouri": { cities: ["Kansas City", "St. Louis"] },
              "Montana": { cities: ["Billings", "Helena"] },
              "Nebraska": { cities: ["Omaha", "Lincoln"] },
              "Nevada": { cities: ["Las Vegas", "Reno"] },
              "New Hampshire": { cities: ["Manchester", "Concord"] },
              "New Jersey": { cities: ["Newark", "Trenton"] },
              "New Mexico": { cities: ["Albuquerque", "Santa Fe"] },
              "New York": { cities: ["New York City", "Buffalo", "Albany"] },
              "North Carolina": { cities: ["Charlotte", "Raleigh"] },
              "North Dakota": { cities: ["Fargo", "Bismarck"] },
              "Ohio": { cities: ["Columbus", "Cleveland"] },
              "Oklahoma": { cities: ["Oklahoma City", "Tulsa"] },
              "Oregon": { cities: ["Portland", "Salem"] },
              "Pennsylvania": { cities: ["Philadelphia", "Pittsburgh", "Harrisburg"] },
              "Rhode Island": { cities: ["Providence", "Newport"] },
              "South Carolina": { cities: ["Charleston", "Columbia"] },
              "South Dakota": { cities: ["Sioux Falls", "Pierre"] },
              "Tennessee": { cities: ["Nashville", "Memphis"] },
              "Texas": { cities: ["Houston", "Dallas", "Austin"] },
              "Utah": { cities: ["Salt Lake City", "Provo"] },
              "Vermont": { cities: ["Burlington", "Montpelier"] },
              "Virginia": { cities: ["Virginia Beach", "Richmond"] },
              "Washington": { cities: ["Seattle", "Spokane"] },
              "West Virginia": { cities: ["Charleston", "Morgantown"] },
              "Wisconsin": { cities: ["Milwaukee", "Madison"] },
              "Wyoming": { cities: ["Cheyenne", "Casper"] },
              "District of Columbia": { cities: ["Washington"] }
            }
          },
          "Canada": { cities: ["Toronto", "Vancouver", "Montreal"] }
        }
      },
      "Central America": {
        countries: {
          "Mexico": { cities: ["Mexico City", "Cancún", "Guadalajara"] },
          "Costa Rica": { cities: ["San José", "Liberia", "Puntarenas"] },
          "Panama": { cities: ["Panama City", "Colón"] }
        }
      },
      "South America": {
        countries: {
          "Brazil": { cities: ["Rio de Janeiro", "São Paulo", "Salvador"] },
          "Argentina": { cities: ["Buenos Aires", "Mendoza", "Córdoba"] },
          "Chile": { cities: ["Santiago", "Valparaíso"] },
          "Peru": { cities: ["Lima", "Cusco"] }
        }
      },
      "Africa": {
        countries: {
          "South Africa": { cities: ["Cape Town", "Johannesburg", "Pretoria"] },
          "Nigeria": { cities: ["Lagos", "Abuja"] },
          "Egypt": { cities: ["Cairo", "Alexandria"] },
          "Kenya": { cities: ["Nairobi", "Mombasa"] }
        }
      },
      "Oceania": {
        countries: {
          "Australia": { cities: ["Sydney", "Melbourne", "Brisbane"] },
          "New Zealand": { cities: ["Auckland", "Wellington", "Christchurch"] }
        }
      }
    }
  };
}

/**
 * Get current user.
 */
export async function getCurrentUser(): Promise<User> {
  try {
    const response = await fetch(`${API_BASE_URL}/user/getCurrent`, {
      method: 'GET',
      credentials: 'include', // Include cookies for authentication
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error getting current user:', error);
    throw error;
  }
}


/**
 * Sign In with Google.
 */
export function signInWithGoogle() {
  try {
    window.location.href = `${API_BASE_URL}/auth/google/signin`;

  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
}

export type { Journal, Note, User, PlaceHierarchy };