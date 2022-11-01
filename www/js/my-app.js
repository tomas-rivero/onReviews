// If we need to use custom DOM library, let's save it to $$ variable:

const baseUrl = 'https://api.themoviedb.org/3';
const apiKey = 'api_key=2dbec8d4e8d5af1a656020c0cd8f2403';

const apiUrlCount =
  baseUrl + '/discover/movie?' + apiKey + '&page=1&sort_by=vote_count.desc&';

const apiUrlPopup = baseUrl + '/trending/tv/week?' + apiKey;

const imgUrl = 'https://image.tmdb.org/t/p/w500';

const searchUrl = baseUrl + '/search/movie?' + apiKey;

const cardCount = document.getElementById('cardCount');

const cardPopup = document.getElementById('cardPopu');

const imagePopup = document.getElementById('imagePopup');

const divFilm = document.getElementById('divFilm');

const film = document.getElementById('searchInput');

const prev = document.getElementById('btnPrev');
const next = document.getElementById('btnNext');

const spanPag = document.getElementById('spanPag');

let page = 1;

var $$ = Dom7;

var app = new Framework7({
  // App root element
  root: '#app',
  // App Name
  name: 'My App',
  // App id
  id: 'com.myapp.test',
  // Enable swipe panel
  panel: {
    swipe: 'left',
  },
  // Add default routes
  routes: [],

  // ... other parameters
});

var mainView = app.views.create('.view-main');

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function () {
  console.log('Device is ready!');
});

// Option 1. Using one 'page:init' handler for all pages
$$(document).on('page:init', function (e) {
  // Do something here when page loaded and initialized
  // console.log(e);
});

$$(document).on('page:init', '.page[data-name="readMore"]', function (e) {
  // console.log(page);
});

const searchFilm = () => {
  if (film.value !== '') {
    divFilm.innerHTML = '';
    const url =
      baseUrl + '/search/multi?' + apiKey + `&page=1&query=${film.value}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const { results } = data;

        if (results.length == 0) {
          divFilm.innerHTML = '';
          const searchResults = document.createElement('a');
          searchResults.innerHTML = `
          <div>
          <p>No hay películas que coincidan con tu consulta. Por favor, sea mas detallado o vuelva al <a onclick='window.location.reload()'>inicio</a>.</p>
          </div>
        `;
          divFilm.appendChild(searchResults);
        } else {
          results.map((search) => {
            const searchResults = document.createElement('a');
            searchResults.setAttribute('id', search.id);
            searchResults.classList.add('game-card');
            searchResults.classList.add('scroll-block-item');

            divFilm.classList.add('block');
            divFilm.classList.add('game-cards');
            divFilm.classList.add('scroll-block');

            searchResults.addEventListener('click', function () {
              let TRAILER = [];
              let GENRES = [];
              let WATCHES = [];
              imagePopup.innerHTML = '';
              if (search.media_type === 'movie') {
                const idUrl =
                  baseUrl +
                  '/movie/' +
                  search.id +
                  '?' +
                  apiKey +
                  '&language=es&append_to_response=credits';
                const viewUrl =
                  baseUrl +
                  '/movie/' +
                  search.id +
                  '/watch/' +
                  'providers' +
                  '?' +
                  apiKey;
                const trailerUrl =
                  baseUrl + '/movie/' + search.id + '/videos?' + apiKey;
                getIdUrl(idUrl, viewUrl, trailerUrl);
              } else {
                const idUrl =
                  baseUrl +
                  '/tv/' +
                  search.id +
                  '?' +
                  apiKey +
                  '&language=es&append_to_response=credits';
                const viewUrl =
                  baseUrl +
                  '/tv/' +
                  search.id +
                  '/watch/' +
                  'providers' +
                  '?' +
                  apiKey;
                const trailerUrl =
                  baseUrl + '/tv/' + search.id + '/videos?' + apiKey;
                getIdUrl(idUrl, viewUrl, trailerUrl);
              }

              async function getIdUrl(url, url2, url3) {
                await fetch(url)
                  .then((res) => res.json())
                  .then(async (data) => {
                    console.log(data);
                    const movieEl = document.createElement('div');
                    movieEl.classList.add('view');
                    movieEl.classList.add('view-init');

                    if (search.media_type === 'movie') {
                      movieEl.innerHTML = `
                    <div class="page">
                      <div class="page-content">
                        <div class="marginCard">
                          <a class="popup-close" href="#">
                            <i class="iconX f7-icons">multiply</i>
                          </a>
                        </div>
                        <div class="card demo-card-header-pic">
                          <div style="background-image:url(${
                            imgUrl + data.backdrop_path
                          });min-height:300px" class="card-header align-items-flex-end"> data.release_date
                              })</p>
                          </div>
                          <div class="card-content card-content-padding">
                            <p>${data.tagline}</p>
                            <p>${data.overview}</p>
                            <h3 class="noStyle">Generos:</h3>
                            <div class="genreDiv" id="genreDiv"></div>
                            <h3 class="creditsH3">Reparto:</h3>
                            <div class="block game-cards scroll-block creditsDiv" id="creditsDiv"></div>
                            <h3 class="noStyle">Donde ver:</h3>
                            <div class="divWatch" id="watchDiv"></div>
                            <h3 class="creditsH3">Trailers:</h3>
                    
                            <div class="block game-cards scroll-block trailersDiv" id="trailersDiv"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    `;
                    } else {
                      movieEl.innerHTML = `
                    <div class="page">
                      <div class="page-content">
                        <div class="marginCard">
                          <a class="popup-close" href="#">
                            <i class="iconX f7-icons">multiply</i>
                          </a>
                        </div>
                        <div class="card demo-card-header-pic">
                          <div style="background-image:url(${
                            imgUrl + data.backdrop_path
                          });min-height:300px" class="card-header align-items-flex-end">
                                                                   data.first_air_date
                              })</p>
                          </div>
                          <div class="card-content card-content-padding">
                            <p>${data.tagline}</p>
                            <p>${data.overview}</p>
                            <div class="containerGenre">
                              <h3 class="noStyle">Generos:</h3>
                              <div class="genreDiv" id="genreDiv"></div>
                            </div>
                            <h3 class="creditsH3">Reparto:</h3>
                            <div class="block game-cards scroll-block creditsDiv" id="creditsDiv"></div>
                            <h3 class="noStyle">Donde ver:</h3>
                            <div class="divWatch" id="watchDiv"></div>
                            <h3 class="creditsH3">Trailers:</h3>
                    
                            <div class="block game-cards scroll-block trailersDiv" id="trailersDiv"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    `;
                    }

                    imagePopup.appendChild(movieEl);

                    if (data.genres.length > 0) {
                      const genreDiv = document.getElementById('genreDiv');
                      data.genres.map((generos) => {
                        const genre = document.createElement('h3');
                        genre.classList.add('textGenres');
                        GENRES.push(generos.name);
                        genre.innerHTML = `
                        ${GENRES[0]}
                        `;
                        GENRES = [];
                        genreDiv.appendChild(genre);
                      });
                    } else {
                      const genreDiv = document.getElementById('genreDiv');
                      const genre = document.createElement('span');
                      genre.innerHTML = `No existen generos`;
                      genreDiv.appendChild(genre);
                    }

                    if (data.credits.cast.length > 0) {
                      const creditsDiv = document.getElementById('creditsDiv');
                      data.credits.cast.map((credit) => {
                        const reparto = document.createElement('a');
                        reparto.setAttribute('id', credit.id);
                        reparto.classList.add('game-card');
                        reparto.classList.add('scroll-block-item');
                        reparto.innerHTML = `
                    <div class="game-card-image popup-open" data-popup=".popup-about">
                       <img src="${
                         credit.profile_path
                           ? imgUrl + credit.profile_path
                           : '../img/user.png'
                       }"
                        alt="${credit.name}">
                          </div>
                      <div id="name" class="game-card-name">${credit.name}</div>
                      <div class="game-card-tagline">${credit.character}</div>
                      `;
                        if (
                          imgUrl + credit.profile_path ===
                          'https://image.tmdb.org/t/p/w500null'
                        ) {
                          reparto.innerHTML = `
                      <div class="game-card-image popup-open" data-popup=".popup-about">
                      <img src="../img/user.png"
                      alt="${credit.name}">
                            </div>
                        <div id="name" class="game-card-name">${credit.name}</div>
                        <div class="game-card-tagline">${credit.character}</div>
                        `;
                        }
                        creditsDiv.appendChild(reparto);
                      });
                    } else {
                      const creditsDiv = document.getElementById('creditsDiv');
                      const reparto = document.createElement('span');
                      reparto.innerHTML = `No existe reparto`;
                      creditsDiv.appendChild(reparto);
                      console.log('No existe reparto');
                    }
                  });

                await fetch(url2)
                  .then((res) => res.json())
                  .then((data) => {
                    const { results } = data;
                    const { AR } = results;
                    if (AR.flatrate !== undefined) {
                      const watchDiv = document.getElementById('watchDiv');
                      AR.flatrate.map((watches) => {
                        const watch = document.createElement('div');
                        WATCHES.push(watches.logo_path);
                        WATCHES.push(watches.provider_name);
                        watch.innerHTML = `
                        <img class="iconWatch" src="${
                          imgUrl + WATCHES[0]
                        }" alt="${WATCHES[1]}">
                        <h3>${WATCHES[1]}</h3>
                  `;
                        WATCHES = [];
                        watchDiv.appendChild(watch);
                      });
                    } else {
                      const watchDiv = document.getElementById('watchDiv');
                      const watch = document.createElement('span');
                      watch.innerHTML = `No existe donde verla`;
                      watchDiv.appendChild(watch);
                    }
                  });

                await fetch(url3)
                  .then((res) => res.json())
                  .then(async (data) => {
                    const { results } = data;
                    results.map((trailer) => {
                      if (trailer.type === 'Trailer') {
                        if (trailer.type.length > 0) {
                          const trailersDiv =
                            document.getElementById('trailersDiv');
                          const video = document.createElement('div');
                          video.classList.add('game-card');
                          video.classList.add('scroll-block-item');
                          video.classList.add('trailerDiv');

                          TRAILER.push(
                            `  <iframe src="https://www.youtube-nocookie.com/embed/${trailer.key}" title="${trailer.name}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
                          );
                          video.innerHTML = `${TRAILER[0]}`;
                          TRAILER = [];
                          trailersDiv.appendChild(video);
                        }
                      }
                    });
                  });
              }
            });

            if (search.media_type === 'movie') {
              searchResults.innerHTML = `
            <div class="game-card-image popup-open" data-popup=".popup-about">
                <img src="
                ${
                  search.poster_path
                    ? imgUrl + search.poster_path
                    : '../img/film.png'
                }"
                    alt="${search.title}">
            </div>
            <div id="name" class="game-card-name">${search.title}</div>
            <div class="game-card-tagline tagline">${search.release_date}</div>
          `;
            } else {
              searchResults.innerHTML = `
                <div class="game-card-image popup-open" data-popup=".popup-about">
                    <img src="
                    ${
                      search.poster_path
                        ? imgUrl + search.poster_path
                        : '../img/film.png'
                    }"
                        alt="${search.name}">
                </div>
                <div id="name" class="game-card-name">${search.name}</div>
                <div class="game-card-tagline tagline">${
                  search.first_air_date
                }</div>
              `;
            }

            divFilm.appendChild(searchResults);
          });
        }
      });
  } else {
    divFilm.innerHTML = '';
    const searchResults = document.createElement('a');
    searchResults.innerHTML = `
    <div>
    <p>No hay películas que coincidan con tu consulta. Por favor, sea mas detallado o vuelva al <a onclick='window.location.reload()'>inicio</a>.</p>
    </div>
  `;
    divFilm.appendChild(searchResults);
  }
};

getMoviesCount(apiUrlCount);

function getMoviesCount(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      getMoviesByVoteCount(data.results);
    });
}

const getMoviesByVoteCount = (data) => {
  let GENRES = [];
  let WATCHES = [];
  let TRAILER = [];
  cardCount.innerHTML = '';
  data.forEach((movie) => {
    const voteCount = movie.vote_average.toFixed(1);

    const movieEl = document.createElement('a');

    movieEl.setAttribute('id', movie.id);
    movieEl.classList.add('game-card');
    movieEl.classList.add('scroll-block-item');

    movieEl.addEventListener('click', function () {
      imagePopup.innerHTML = '';
      const idUrl =
        baseUrl +
        '/movie/' +
        movie.id +
        '?' +
        apiKey +
        '&language=es&append_to_response=credits,trailers';
      const viewUrl =
        baseUrl + '/movie/' + movie.id + '/watch/' + 'providers' + '?' + apiKey;
      getIdUrl(idUrl, viewUrl);
      async function getIdUrl(url, url2) {
        await fetch(url)
          .then((res) => res.json())
          .then(async (data) => {
            results = data;
            console.log(results);
            const {
              title,
              backdrop_path,
              tagline,
              overview,
              genres,
              release_date,
              credits,
              trailers,
            } = results;
            const movieEl = document.createElement('div');
            movieEl.classList.add('view');
            movieEl.classList.add('view-init');

            movieEl.innerHTML = `
            <div class="page">
              <div class="page-content">
                <div class="marginCard">
                  <a class="popup-close" href="#">
                    <i class="iconX f7-icons">multiply</i>
                  </a>
                </div>
                <div class="card demo-card-header-pic">
                  <div style="background-image:url(${
                    imgUrl + backdrop_path
                  });min-height:300px" class="card-header align-items-flex-end">
                 </div>
                  <div class="card-content card-content-padding">
                    <h1 class="noStyle">${title}</h1>
                    <p>${tagline}</p>
                    <p>${overview}</p>
                    <div class="containerGenre">
                       <h3 class="noStyle">Generos:</h3>
                       <div class="genreDiv" id="genreDiv"></div>
                    </div>
                    <h3 class="creditsH3">Reparto:</h3>
                    <div class="block game-cards scroll-block creditsDiv" id="creditsDiv"></div>
                    <h3 class="noStyle">Donde ver:</h3>
                    <div class="divWatch" id="watchDiv"></div>

                    <h3 class="creditsH3">Trailers:</h3>
                    
                    <div class="block game-cards scroll-block trailersDiv" id="trailersDiv"></div>
                  </div>
                </div>
              </div>
            </div>
            `;

            imagePopup.appendChild(movieEl);
            if (genres.length > 0) {
              const genreDiv = document.getElementById('genreDiv');
              genres.map((generos) => {
                const genre = document.createElement('h3');
                genre.classList.add('textGenres');
                GENRES.push(generos.name);
                genre.innerHTML = `
                  ${GENRES[0]}
                  `;
                GENRES = [];
                genreDiv.appendChild(genre);
              });
            } else {
              const genreDiv = document.getElementById('genreDiv');
              const genre = document.createElement('span');
              genre.innerHTML = `No existen generos`;
              genreDiv.appendChild(genre);
            }

            if (credits.cast.length > 0) {
              const creditsDiv = document.getElementById('creditsDiv');
              credits.cast.map((credit) => {
                const reparto = document.createElement('a');
                reparto.setAttribute('id', credit.id);
                reparto.classList.add('game-card');
                reparto.classList.add('scroll-block-item');
                reparto.innerHTML = `
              <div class="game-card-image popup-open" data-popup=".popup-about">
                 <img src="${
                   credit.profile_path
                     ? imgUrl + credit.profile_path
                     : '../img/user.png'
                 }"
                  alt="${credit.name}">
                    </div>
                <div id="name" class="game-card-name">${credit.name}</div>
                <div class="game-card-tagline">${credit.character}</div>
                `;

                creditsDiv.appendChild(reparto);
              });
            } else {
              const creditsDiv = document.getElementById('creditsDiv');
              const reparto = document.createElement('span');
              reparto.innerHTML = `No existe reparto`;
              creditsDiv.appendChild(reparto);
              console.log('No existe reparto');
            }

            if (trailers.youtube.length > 0) {
              const trailersDiv = document.getElementById('trailersDiv');
              trailers.youtube.map((cortos) => {
                const trailer = document.createElement('div');
                trailer.classList.add('game-card');
                trailer.classList.add('scroll-block-item');
                trailer.classList.add('trailerDiv');

                TRAILER.push(
                  `  <iframe src="https://www.youtube-nocookie.com/embed/${cortos.source}" title="${cortos.name}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
                );
                trailer.innerHTML = `${TRAILER[0]}`;
                TRAILER = [];
                trailersDiv.appendChild(trailer);
              });
            }
          });
        await fetch(url2)
          .then((res) => res.json())
          .then((data) => {
            const { results } = data;
            const { AR } = results;
            if (AR.flatrate !== undefined) {
              const watchDiv = document.getElementById('watchDiv');
              AR.flatrate.map((watches) => {
                const watch = document.createElement('div');
                WATCHES.push(watches.logo_path);
                WATCHES.push(watches.provider_name);
                watch.innerHTML = `
                  <img class="iconWatch" src="${imgUrl + WATCHES[0]}" alt="${
                  WATCHES[1]
                }">
                  <h3>${WATCHES[1]}</h3>
            `;
                WATCHES = [];
                watchDiv.appendChild(watch);
              });
            } else {
              const watchDiv = document.getElementById('watchDiv');
              const watch = document.createElement('span');
              watch.innerHTML = `No existe donde verla`;
              watchDiv.appendChild(watch);
            }
          });
      }
    });

    movieEl.innerHTML = `

                <div class="game-card-image popup-open" data-popup=".popup-about">
                    <img src="${imgUrl + movie.poster_path}"
                        alt="${movie.title}">
                        <div class="vote">
                          <h4>${voteCount}</h4>
                        </div>
                </div>
           
                <div id="name" class="game-card-name">${movie.title}</div>
                <div class="game-card-tagline tagline">${
                  movie.release_date
                }</div>
   
              `;

    cardCount.appendChild(movieEl);
  });
};

getMoviesPop(apiUrlPopup);

function getMoviesPop(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      getMoviesByPopup(data.results);
    });
}

const getMoviesByPopup = (data) => {
  let TRAILER = [];
  let GENRES = [];
  let WATCHES = [];
  cardPopup.innerHTML = '';
  data.forEach((movie) => {
    const voteCount = movie.vote_average.toFixed(1);

    const movieEl = document.createElement('a');

    movieEl.setAttribute('id', movie.id);
    movieEl.classList.add('game-card');
    movieEl.classList.add('scroll-block-item');
    movieEl.addEventListener('click', function () {
      imagePopup.innerHTML = '';
      const idUrl =
        baseUrl +
        '/tv/' +
        movie.id +
        '?' +
        apiKey +
        '&language=es&append_to_response=credits';
      const viewUrl =
        baseUrl + '/tv/' + movie.id + '/watch/' + 'providers' + '?' + apiKey;
      const trailerUrl = baseUrl + '/tv/' + movie.id + '/videos?' + apiKey;
      getIdUrl(idUrl, viewUrl, trailerUrl);
      async function getIdUrl(url, url2, url3) {
        await fetch(url)
          .then((res) => res.json())
          .then(async (data) => {
            results = data;
            console.log(results);
            const {
              name,
              backdrop_path,
              tagline,
              overview,
              genres,
              first_air_date,
              credits,
            } = results;
            const movieEl = document.createElement('div');
            movieEl.classList.add('view');
            movieEl.classList.add('view-init');
            movieEl.innerHTML = `
            <div class="page">
              <div class="page-content">
                <div class="marginCard">
                  <a class="popup-close" href="#">
                    <i class="iconX f7-icons">multiply</i>
                  </a>
                </div>
                <div class="card demo-card-header-pic">
                  <div style="background-image:url(${
                    imgUrl + backdrop_path
                  });min-height:300px" class="card-header align-items-flex-end">
                                 
                  </div>
                  
                  <div class="card-content card-content-padding">
                    <h1 class="noStyle">${name}</h1>
                    <p>${tagline}</p>
                    <p>${overview}</p>
                    <div class="containerGenre">
                       <h3 class="noStyle">Generos:</h3>
                       <div class="genreDiv" id="genreDiv"></div>
                    </div>
                    <h3 class="creditsH3">Reparto:</h3>
                    <div class="block game-cards scroll-block creditsDiv" id="creditsDiv"></div>
                    <h3 class="noStyle">Donde ver:</h3>
                    <div class="divWatch" id="watchDiv"></div>
                    <h3 class="creditsH3">Trailers:</h3>
                    
                    <div class="block game-cards scroll-block trailersDiv" id="trailersDiv"></div>
                  </div>
                </div>
              </div>
            </div>
            `;
            imagePopup.appendChild(movieEl);
            const genreDiv = document.getElementById('genreDiv');
            genres.map((generos) => {
              const genre = document.createElement('h3');
              genre.classList.add('textGenres');
              GENRES.push(generos.name);
              genre.innerHTML = `
                ${GENRES[0]}
                `;
              GENRES = [];
              genreDiv.appendChild(genre);
            });
            const creditsDiv = document.getElementById('creditsDiv');
            credits.cast.map((credit) => {
              const reparto = document.createElement('a');
              reparto.setAttribute('id', credit.id);
              reparto.classList.add('game-card');
              reparto.classList.add('scroll-block-item');
              reparto.innerHTML = `
              <div class="game-card-image popup-open" data-popup=".popup-about">
                 <img src="${
                   credit.profile_path
                     ? imgUrl + credit.profile_path
                     : '../img/user.png'
                 }"
                  alt="${credit.name}">
                    </div>
                <div id="name" class="game-card-name">${credit.name}</div>
                <div class="game-card-tagline">${credit.character}</div>
                `;

              creditsDiv.appendChild(reparto);
            });
          });
        await fetch(url2)
          .then((res) => res.json())
          .then((data) => {
            const { results } = data;
            const { AR } = results;
            const watchDiv = document.getElementById('watchDiv');
            AR.flatrate.map((watches) => {
              const watch = document.createElement('a');
              watch.setAttribute('href', 'google.com');
              WATCHES.push(watches.logo_path);
              WATCHES.push(watches.provider_name);
              watch.innerHTML = `
                  <img class="iconWatch" src="${imgUrl + WATCHES[0]}" alt="${
                WATCHES[1]
              }">
                  <h3>${WATCHES[1]}</h3>
            `;
              WATCHES = [];
              watchDiv.appendChild(watch);
            });
          });

        await fetch(url3)
          .then((res) => res.json())
          .then(async (data) => {
            const { results } = data;
            results.map((trailer) => {
              if (trailer.type === 'Trailer') {
                if (trailer.type.length > 0) {
                  const trailersDiv = document.getElementById('trailersDiv');
                  const video = document.createElement('div');
                  video.classList.add('game-card');
                  video.classList.add('scroll-block-item');
                  video.classList.add('trailerDiv');

                  TRAILER.push(
                    `  <iframe src="https://www.youtube-nocookie.com/embed/${trailer.key}" title="${trailer.name}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
                  );
                  video.innerHTML = `${TRAILER[0]}`;
                  TRAILER = [];
                  trailersDiv.appendChild(video);
                }
              }
            });
          });
      }
    });
    movieEl.innerHTML = `
                <div class="game-card-image popup-open" data-popup=".popup-about">
                    <img src="${imgUrl + movie.poster_path}"
                        alt="${movie.title}">
                        <div class="vote">
                        <h4>${voteCount}</h4>
                        </div>
                </div>
                <div id="name" class="game-card-name">${movie.name}</div>
                <div class="game-card-tagline tagline">${
                  movie.first_air_date
                }</div>
              `;

    cardPopup.appendChild(movieEl);
  });
};

prev.addEventListener('click', () => {
  if (page > 1) {
    page--;
    spanPag.innerHTML = page;
    getMoviesCount(
      baseUrl +
        '/discover/movie?' +
        apiKey +
        `&page=${page}&sort_by=vote_count.desc&`
    );
  }
});

next.addEventListener('click', () => {
  if (page < 50) {
    page++;
    spanPag.innerHTML = page;
    getMoviesCount(
      baseUrl +
        '/discover/movie?' +
        apiKey +
        `&page=${page}&sort_by=vote_count.desc&`
    );
  }
});
