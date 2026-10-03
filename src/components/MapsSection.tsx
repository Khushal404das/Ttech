import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Search,
  ExternalLink,
  Navigation,
  Bookmark,
  BookmarkCheck,
  Star,
  Loader2,
  AlertCircle,
  Coffee,
  Utensils,
  Trees,
  Laptop,
  Landmark,
  Trash2,
} from 'lucide-react';
import type { GroundingChunk, SavedPlace } from '../types';
import type { User } from 'firebase/auth';

interface MapsSectionProps {
  user: User | null;
  savedPlaces: SavedPlace[];
  onSavePlace: (place: Omit<SavedPlace, 'id' | 'createdAt'>) => Promise<void>;
  onDeletePlace: (id: string) => Promise<void>;
}

export const MapsSection: React.FC<MapsSectionProps> = ({
  user,
  savedPlaces,
  onSavePlace,
  onDeletePlace,
}) => {
  const [query, setQuery] = useState<string>('Top specialty coffee shops with good seating and wifi');
  const [cityOrLocation, setCityOrLocation] = useState<string>('');
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(
    null
  );
  const [locationStatus, setLocationStatus] = useState<string>('');

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [responseMarkdown, setResponseMarkdown] = useState<string | null>(null);
  const [groundingChunks, setGroundingChunks] = useState<GroundingChunk[]>([]);
  const [savingPlaceTitle, setSavingPlaceTitle] = useState<string | null>(null);
  const [viewTab, setViewTab] = useState<'search' | 'saved'>('search');

  // Attempt to acquire geolocation
  const requestGeolocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus('Geolocation is not supported by your browser');
      return;
    }

    setLocationStatus('Acquiring your location coordinates...');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLocationStatus(
          `Location active: ${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`
        );
      },
      (err) => {
        console.warn('Geolocation error:', err);
        setLocationStatus('Could not get coordinates (permission denied or timeout). Using city query instead.');
      },
      { timeout: 10000, maximumAge: 60000 }
    );
  };

  useEffect(() => {
    requestGeolocation();
  }, []);

  const handleSearch = async (queryText?: string) => {
    const targetQuery = queryText || query;
    if (!targetQuery.trim() || isLoading) return;

    setIsLoading(true);
    setErrorMsg(null);
    setResponseMarkdown(null);
    setGroundingChunks([]);

    try {
      // Build effective prompt with location context
      let prompt = targetQuery.trim();
      if (cityOrLocation.trim()) {
        prompt = `${prompt} in or near ${cityOrLocation.trim()}`;
      } else if (!userLocation) {
        prompt = `${prompt} (highlight top rated, verifiable locations with exact names)`;
      }

      const res = await fetch('/api/places', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: prompt,
          latLng: userLocation,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Server responded with ${res.status}`);
      }

      const data = await res.json();
      setResponseMarkdown(data.text || 'No description provided.');
      setGroundingChunks(data.groundingChunks || []);
    } catch (err: any) {
      console.error('Maps grounding error:', err);
      setErrorMsg(err.message || 'Failed to search places with Google Maps Grounding.');
    } finally {
      setIsLoading(false);
    }
  };

  // Helper to check if a place is already saved
  const isPlaceSaved = (title: string, uri?: string) => {
    return savedPlaces.some(
      (sp) => sp.title.toLowerCase() === title.toLowerCase() || (uri && sp.uri === uri)
    );
  };

  const handleSaveGroundingPlace = async (chunk: GroundingChunk) => {
    const maps = chunk.maps;
    if (!maps) return;

    const title = maps.title || 'Discovered Place';
    setSavingPlaceTitle(title);

    try {
      const snippet = maps.placeAnswerSources?.reviewSnippets?.[0]?.reviewText || '';
      await onSavePlace({
        title,
        uri: maps.uri || '',
        notes: snippet ? `Review: "${snippet}"` : 'Saved via Maps Grounding discovery',
        category: 'Discovered',
      });
    } catch (err: any) {
      console.error('Error saving place:', err);
    } finally {
      setSavingPlaceTitle(null);
    }
  };

  const categories = [
    { label: 'Cafes & Coffee', icon: Coffee, query: 'Best specialty coffee shops with wifi and cozy seating' },
    { label: 'Top Dining', icon: Utensils, query: 'Top rated local dinner restaurants with high reviews' },
    { label: 'Parks & Nature', icon: Trees, query: 'Scenic public parks, botanical gardens, and walking trails' },
    { label: 'Coworking Spaces', icon: Laptop, query: 'Best quiet coworking spaces and study hubs' },
    { label: 'Must-See Sights', icon: Landmark, query: 'Iconic local landmarks, museums, and historical attractions' },
  ];

  // Extract maps chunks
  const mapsChunks = groundingChunks.filter((chunk) => Boolean(chunk.maps));

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header and tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/80 p-5 rounded-2xl border border-[#DCE8F8]">
        <div>
          <div className="flex items-center gap-2 text-sky-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Navigation className="w-3.5 h-3.5" />
            <span>Google Maps Grounding with Gemini 3.5 Flash</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Places &amp; Geography Discovery
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Grounded queries with live verification, clickable Google Maps links, and review snippets.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-[#DCE8F8] shrink-0">
          <button
            onClick={() => setViewTab('search')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              viewTab === 'search'
                ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Search Places
          </button>
          <button
            onClick={() => setViewTab('saved')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              viewTab === 'saved'
                ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Saved Places</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#F1F7FF] text-slate-300">
              {savedPlaces.length}
            </span>
          </button>
        </div>
      </div>

      {viewTab === 'saved' ? (
        /* Saved Places in Firestore */
        <div className="bg-white/60 rounded-2xl border border-[#DCE8F8] p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#DCE8F8] pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-sky-400" />
              <span>My Saved Places ({savedPlaces.length})</span>
            </h3>
            <span className="text-xs text-slate-400">
              {user ? 'Persisted in Cloud Firestore' : 'Local preview (Sign in to sync)'}
            </span>
          </div>

          {savedPlaces.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#F1F7FF] border border-[#60A5FA] flex items-center justify-center mx-auto text-slate-400">
                <Bookmark className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-slate-300">No saved places yet</p>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Search for coffee shops, restaurants, or attractions, then click &quot;Save Place&quot;
                to store them here in Firestore.
              </p>
              <button
                onClick={() => setViewTab('search')}
                className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-medium cursor-pointer"
              >
                Start Searching
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedPlaces.map((place) => (
                <div
                  key={place.id || place.title}
                  className="bg-[#F1F7FF]/80 border border-[#60A5FA] rounded-xl p-4 flex flex-col justify-between space-y-3 hover:border-sky-500/50 transition-colors"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-bold text-white truncate">{place.title}</h4>
                      {place.id && (
                        <button
                          onClick={() => onDeletePlace(place.id!)}
                          className="text-slate-500 hover:text-red-400 p-1 transition-colors cursor-pointer"
                          title="Remove saved place"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                    {place.notes && (
                      <p className="text-xs text-slate-300 mt-1 line-clamp-3 bg-white/60 p-2 rounded-lg border border-[#DCE8F8]">
                        {place.notes}
                      </p>
                    )}
                  </div>

                  {place.uri ? (
                    <a
                      href={place.uri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 w-full py-1.5 rounded-lg bg-sky-950/80 hover:bg-sky-900 text-sky-300 text-xs font-medium border border-sky-800/60 transition-colors"
                    >
                      <span>Open on Google Maps</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <span className="text-[11px] text-slate-500">No map link attached</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* Search Mode */
        <div className="space-y-5">
          {/* Search Box & Location Controls */}
          <div className="bg-white/90 border border-[#DCE8F8] rounded-2xl p-4 sm:p-5 space-y-4 shadow-xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2 relative">
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  What are you looking for?
                </label>
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    placeholder="e.g. Best artisanal bakeries, quiet libraries, scenic parks..."
                    className="w-full bg-white border border-[#DCE8F8] rounded-xl pl-9 pr-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Target City / Neighborhood
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={cityOrLocation}
                    onChange={(e) => setCityOrLocation(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    placeholder="e.g. San Francisco, Tokyo..."
                    className="w-full bg-white border border-[#DCE8F8] rounded-xl pl-9 pr-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  />
                </div>
              </div>
            </div>

            {/* Quick Category Chips */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs text-slate-400 font-medium mr-1">Presets:</span>
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.label}
                    onClick={() => {
                      setQuery(cat.query);
                      handleSearch(cat.query);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs bg-[#F1F7FF] hover:bg-slate-750 text-slate-300 hover:text-white border border-[#60A5FA]/60 transition-colors cursor-pointer"
                  >
                    <Icon className="w-3.5 h-3.5 text-sky-400" />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Geolocation indicator & Search trigger button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-[#DCE8F8]/80">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={requestGeolocation}
                  className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-sky-300 transition-colors cursor-pointer"
                  title="Detect GPS coordinates"
                >
                  <Navigation className="w-3 h-3 text-sky-400" />
                  <span>{userLocation ? 'GPS Active' : 'Detect GPS Coordinates'}</span>
                </button>
                {locationStatus && (
                  <span className="text-[11px] text-slate-500 truncate max-w-xs">
                    • {locationStatus}
                  </span>
                )}
              </div>

              <button
                onClick={() => handleSearch()}
                disabled={!query.trim() || isLoading}
                className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white text-sm font-semibold shadow-lg shadow-sky-600/30 transition-all cursor-pointer shrink-0"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Querying Google Maps...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    <span>Search with Maps Grounding</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="bg-red-950/40 border border-red-800/60 rounded-xl p-4 text-red-300 text-xs flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
              <div>
                <p className="font-semibold">Discovery Query Failed</p>
                <p className="opacity-90">{errorMsg}</p>
              </div>
            </div>
          )}

          {/* Extracted Grounded Google Maps Links & Cards (Requirement: MUST list extracted URLs from groundingChunks) */}
          {mapsChunks.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-sky-400" />
                  <span>Verified Google Maps Places ({mapsChunks.length})</span>
                </h3>
                <span className="text-xs text-slate-400">Directly verified by Google Maps</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mapsChunks.map((chunk, idx) => {
                  const maps = chunk.maps;
                  if (!maps) return null;
                  const title = maps.title || 'Verified Place';
                  const alreadySaved = isPlaceSaved(title, maps.uri);
                  const reviewSnippet =
                    maps.placeAnswerSources?.reviewSnippets?.[0]?.reviewText;

                  return (
                    <div
                      key={idx}
                      className="bg-white border border-[#DCE8F8] hover:border-sky-500/40 rounded-xl p-4 flex flex-col justify-between space-y-3 shadow-md transition-all"
                    >
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-sm font-bold text-white hover:text-sky-300 transition-colors">
                            {title}
                          </h4>
                          <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-800/60 shrink-0">
                            Maps Verified
                          </span>
                        </div>

                        {reviewSnippet && (
                          <div className="bg-white/80 p-2.5 rounded-lg border border-[#DCE8F8]/80 text-xs text-slate-300 italic">
                            &ldquo;{reviewSnippet}&rdquo;
                          </div>
                        )}
                      </div>

                      <div className="pt-2 border-t border-[#DCE8F8]/60 flex items-center gap-2">
                        {maps.uri && (
                          <a
                            href={maps.uri}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-[#F1F7FF] hover:bg-[#F1F7FF] text-slate-200 text-xs font-medium border border-[#60A5FA] transition-colors"
                          >
                            <span>Google Maps</span>
                            <ExternalLink className="w-3 h-3 text-slate-400" />
                          </a>
                        )}

                        <button
                          onClick={() => handleSaveGroundingPlace(chunk)}
                          disabled={alreadySaved || savingPlaceTitle === title}
                          className={`inline-flex items-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                            alreadySaved
                              ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 cursor-default'
                              : 'bg-sky-600 hover:bg-sky-500 text-white shadow-sm'
                          }`}
                        >
                          {alreadySaved ? (
                            <>
                              <BookmarkCheck className="w-3.5 h-3.5" />
                              <span>Saved</span>
                            </>
                          ) : (
                            <>
                              <Bookmark className="w-3.5 h-3.5" />
                              <span>
                                {savingPlaceTitle === title ? 'Saving...' : 'Save Place'}
                              </span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Gemini Synthesis Markdown Output */}
          {responseMarkdown && (
            <div className="bg-white/70 border border-[#DCE8F8] rounded-2xl p-5 sm:p-6 space-y-3">
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold">
                <Star className="w-3.5 h-3.5" />
                <span>Gemini Analysis &amp; Recommendations</span>
              </div>
              <div className="text-slate-200 text-sm whitespace-pre-wrap leading-relaxed font-sans">
                {responseMarkdown}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

