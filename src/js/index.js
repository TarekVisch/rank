const apiKey = 'TMDb API KEY';
const formBy = document.getElementById('formBy');
const formGenre = document.getElementById('formGenre');
const pagePrev = document.getElementById('pagePrev');
const pageNext = document.getElementById('pageNext');
const pageDOM = document.getElementById('page');
let sortBy = '';
let genre = '';
let page = 1;

/* Sort Movies */
formBy.addEventListener('change', (e)=> {
  const value = e.target.value;
  
  switch(value) {
    case 'popularity': 
      sortBy = '&sort_by=popularity.desc';
      break;
    case 'rating':
      sortBy = '&sort_by=vote_average.desc'; 
      break;
    case 'title':
      sortBy = '&sort_by=original_title.asc'; 
      break;
  }

  page = 1;
  getMovies();
})

/* Filter Movies By Genres  */
formGenre.addEventListener('change', (e) => {
  const value = e.target.value;

  switch(value) {
    case 'all':
      genre = "";
      break;
    case 'action':
      genre = "&with_genres=28";
      break;
    case 'adventure':
      genre = "&with_genres=12";
      break;
    case 'animation':
      genre = "&with_genres=16";
      break;
    case 'comedy':
      genre = "&with_genres=35";
      break;
    case 'crime':
      genre = "&with_genres=80";
      break;
    case 'documentary':
      genre = "&with_genres=99";
      break;
    case 'drama':
      genre = "&with_genres=18";
      break;
    case 'horror':
      genre = "&with_genres=27";
      break;
    case 'music':
      genre = "&with_genres=10402";
      break;
    case 'romance':
      genre = "&with_genres=10749";
      break;
    case 'sf':
      genre = "&with_genres=878";
      break;
  }

  page = 1;
  getMovies();
})

async function getMovies() {
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}${genre}${sortBy}&page=${page}`;

  const reponse = await fetch(url);
  const data = await reponse.json();

  pageDOM.textContent = page

  if(page === 1) {
    pagePrev.disabled = true;
  } else {
    pagePrev.disabled = false;
  }
  if(page >= 20) {
    pageNext.disabled = true;
  } else {
    pageNext.disabled = false;
  }

  const mainContent = document.getElementById('main-content');
  mainContent.innerHTML = `
    <div class="cards">
      ${data.results.map(movie => {
        return `<div class="card">
                  <div class="card-image" style="${movie.poster_path ? `background-image: url('https://image.tmdb.org/t/p/w342/${movie.poster_path}')` : ''}"></div>
                  <div class="card-title">${movie.title}</div>
                  <div class="card-date">${movie.release_date}</div>
                  <div class="card-rating">${movie.vote_average*10}%</div>
                  <div class="card-info">
                    <div class="card-info-title">${movie.title}</div>
                    <div class="card-info-body">${movie.overview}</div>
                  </div>
                </div>`
      }).join('')}
    </div>`;
}

// pagination
pagePrev.addEventListener('click', () => {
  page--;
  getMovies();
});
pageNext.addEventListener('click', () => {
  page++;
  getMovies();
});

getMovies().catch(err => console.error(`Error: ${err}`));

