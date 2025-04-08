import { create } from "zustand";
import { formatDate } from "../utils/utils";



const usePodcastStore = create((set, get) => ({
    podcastData: [],
    genreMap: {},
    sortOption: 'A-Z',
    GenreOption: "",
    searchInputValue: "",
    loading: false,
    error: null,

    fetchPodcasts: async () => {
        set({loading:true, error:null})
        try {
            const res = await fetch("https://podcast-api.netlify.app")
            const data = await res.json()
            set({podcastData: data})
            await get(). fetchAndCacheGenres(data)
            set({ loading: false})
        } catch (error) {
            console.error("error fetching podcasts", error)
            set({ error: "Failed to load podcast data", loading: false})
        }
        },

        fetchAndCacheGenres: async (podcastData) => {
            const uniqueGenreIds = new Set();
            podcastData.forEach((show) => {
                show.genres.foreach((genreId) => uniqueGenreIds.add(genreId))
            })
            await Promise.all (
                Array.from(uniqueGenreIds).map(async(genreId) => {
                    if (!get().genreMap[genreId]{
                        try {
                            const res = await fetch(`https://podcast-api.netlify.app/genre/${genreId}`)
                            const data = await res.json()
                            set((state) => ({
                                genreMap: { ...state.genreMap, [genreId]: data.title}
                            }))
                        } catch (error) {
                            console.error(`Error fetching genre ${genreId}:` error)
                            set((state) => ({ 
                                genreMap: {...state.genreMap, [genreId]: "Unknown Genre"}
                            }))
                        }
                        }
                    })
            )
        },

        getGenre: async (genreId) => {
            if (get().genreMap[genreId]) {
                return get().genreMap[genreId]
            }
            try {
                const res = await fetch(`https://podcast-api.netlify.app/genre/${genreId}`)
                const data = await res.json()
                set((state) => ({
                    genreMap: { ...state.genreMap, [genreId]: data.title },
                }));
                return data.title;
              } catch (error) {
                console.error(`Error fetching genre ${genreId}:`, error);
                return "Unknown Genre";
              }
            },

            setSortOption: (option) => set({ sortOption: option }),
            setGenreOption: (option) => set({ genreOption: option }),
            setSearchInputValue: (value) => set({ searchInputValue: value }),
          
            getFilteredAndSortedPodcasts: () => {
              let filteredData = [...get().podcastData];
          
              if (get().genreOption && get().genreOption !== "") {
                filteredData = filteredData.filter((show) =>
                  show.genres.includes(parseInt(get().genreOption))
                );
              }
          
              if (get().searchInputValue) {
                filteredData = filteredData.filter((show) =>
                  show.title.toLowerCase().includes(get().searchInputValue.toLowerCase())
                );
              }
          
              let sortedData = [...filteredData];
              switch (get().sortOption) {
                case "A-Z":
                  sortedData.sort((a, b) => a.title.localeCompare(b.title));
                  break;
                case "Z-A":
                  sortedData.sort((a, b) => b.title.localeCompare(a.title));
                  break;
                case "Newest update":
                  sortedData.sort((a, b) => new Date(b.updated) - new Date(a.updated));
                  break;
                case "Oldest update":
                  sortedData.sort((a, b) => new Date(a.updated) - new Date(b.updated));
                  break;
                default:
                  break;
              }
              return sortedData;
            },
          
            displayShowEpisodes: async (showId) => {
              set({ loading: true, error: null });
              try {
                const res = await fetch(`https://podcast-api.netlify.app/id/${showId}`);
                const showData = await res.json();
                set({ loading: false, showData });
                return showData;
              } catch (error) {
                console.error("error fetching episodes", error);
                set({ error: "Failed to load episodes.", loading: false });
                return null;
              }
            },
          }));
          
          export default usePodcastStore;





