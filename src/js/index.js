const apiKey = '49bd23941e1f05cff62a609926ad2acb';

async function getImage() {
  const response = await fetch('');
}

async function getMovies() {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=49bd23941e1f05cff62a609926ad2acb&language=en-US&page=1`;

  const reponse = await fetch(url);
  const data = await reponse.json();

  const mainContent = document.getElementById('main-content');
  mainContent.innerHTML = `
      <div class="cards">
        ${data.results.map(movie => {
          return `<div class="card">
                  <p class="card-title">${movie.title}</p>
                  <div class="card-image"></div>
                  <p class="card-release-date">${movie.release_date}</p>
                  <div class="card-rating">
                    <p id="rating">${movie.vote_average != 0 ? movie.vote_average : 'NR'}</p>
                  </div>
                </div>`
        }).join('')}
      </div>
  `;
}

getMovies().catch(err => console.error(`Error: ${err}`));