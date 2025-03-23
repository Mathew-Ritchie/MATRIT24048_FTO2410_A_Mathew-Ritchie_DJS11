# 1) Data Fetching and State Management

### - P3.16 All show data loaded via a fetch call from the API (Note no podcast data should be hardcoded in the application)

### - P3.17 When viewing a specific show, data is loaded via fetch from individual show endpoint

    - async try/catch used to import API objects to project.
    - try
        const res = await fetch("https://podcast-api.netlify.app");
        const data = await res.json();
        console.log(data);
        } catch (err) {}
    - This basic mthod will probably be used for all three links in different ways.
    - API datd will be imported to project and be asside variables that are arrays.

### - P3.18 There is a loading state while initial data is being loaded

### - P3.19 There is a loading state while new data is being loaded

    - must clarify, does this mean a loading message while waiting for data to be loaded?, maaybe a status loader?

# 2) UI/UX user stories

## - Audio palyer

        ### - P3.34 Audio player is always visible so that user can listen to episodes while browsing
        ### - P3.35 Audio player must show listening progress
        ### - P3.36	User receives a notification that confirms they want to close the page when audio is playing

        Audio player added to the DOM and visible on all pages.  <source src="horse.mp3" type="audio/mpeg">
        must have controls attribute so that the user can see how fare through the podcast they are and pause and play.

## - main landing page.

        ### - P3.4  User sees the name of all available shows on the
        ### - P3.9  User sees preview image of shows when browsing
        ### - P3.10 User sees the amount of seasons as a number in a show when browsing
        ### - P3.11 User sees a human-readable date to when a show was last updated
        <span style="color:blue">
            Function timeFormat() {
                method to conver the given time format to one that is user friendly.
            }
            </span>

        ### - P3.12 User sees what genres (as genre titles) a show is associated with when browsing

        P3.4, P3.9, P3.10, P3.11, P3.12
        <span style="color:blue">

        function displayPodcast() {
            will use try/catch to fetch main podcast data from API
            will call a fetchGenre() with podcast data from API
            will call sortAndRenderPodcast()
            catch err if there is an issue with fetching api data or calling functions.
        }

        function FetchGenre() {
            using the genre ids from the main api
            iterate over the genres and match Ids in the Id endpoint.
            Try catch to get genre names from genre API,
            need to store genres and ids in new local varible that can be used. new Set()
         }

        function sortingShowsAnd Render() {
            funcction Sorted() {
            we have a <select> element with <option> for a-z b-z newest-oldest oldest-newest
            1) get .value of selected.
            2) use switch/case method where each case is one of the 4 options.
            use sort() method and localeCompare for a-z and z-a
            use sort() method and new Date() for updated dates.
            }

        function render(sortedData) {
           - matches genre ids from main API with the genre ids/names in the genre end point.
           - gets the correectyly formatted date from the date fuction.
           - use inner html and template literals to add items to HTML. using the ${} in the tempalte literals the values are added to the html (ie. title name, genre, img, ect.)
        }
        }

 </span>

        ### - P3.5  User sees shows sorted alphabetically when the app loads (default sorting)
        ### - P3.30 User is able to arrange lists of shows based on title from A-Z
        ### - P3.31 User is able to arrange lists of shows based on title from Z-A
        ### - P3.32 User is able to arrange list showing the most recently updated (Newly updated Shows)
        ### - P3.33 User is able to arrange list of shows from least recently updated (Oldest updated Shows)

        ### - P3.37 User can filter shows by genre
                    for (const book of bookObject) {
                    let genreMatch = filters.genre === "any";

                    for (const singleGenre of book.genre) {
                    if (genreMatch) break;
                    if (singleGenre === filters.genre) {
                        genreMatch = true;
                    }
                    }

## - Show modal

        - P3.6 User has a way to listen to any episode in a season for a show (note there is a single placeholder audio track for all shows)
        - P3.7 User is able to see a view where only episodes for a specific selected season are shown (Note that this can be a page view, a modal, or toggle dropdown - up to developer's design choice)
        - P3.8 User is able to toggle between different seasons for the same show


        - P3.13 User sees a preview image of seasons for a specific show (Note some Shows have different images for each Season)
        - P3.14 User sees the amount of episodes as a number for a season
        - P3.15 User is able to go back to a show view from a season-specific view

## - Favourites page

        - P3.20 User is able to mark specific episodes as favourites so that they can find them again (Note the requirement is that a specific episode of a specific season of a specific show is to be favourited)
        - P3.21 User can visit a view where they see all their favourite episode
        - P3.22 User is able to see the associated show and season when an episode is in favourites
        - P3.23 Related by season/show episodes are grouped together in favourites
        - P3.24 User is able to remove episodes from their favourites
        - P3.25 User sees the date and time that they added something as a favourite
        - P3.26 User is able to arrange favourites based on title from A-Z
        - P3.27 User is able to arrange favourites based on title from Z-A
        - P3.28 User is able to arrange favourites starting with the most recently updated
        - P3.29 User is able to arrange favourites starting with the furthest back updated
