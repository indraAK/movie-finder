function main() {

    // Element HTML
    const movieContainer = document.querySelector('.movie-container');
    const formContainer = document.querySelector('.form-container');
    const input = document.getElementById('keyword');
    const form = document.getElementById('form');
    const heading = document.getElementById('heading');
    const searchClose = document.getElementById('search-toggle');
    const modalBody = document.getElementById('modal-body');

    // Ambil film trending dari Web API
    async function getMovies() {

        const res = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=281abe853a8d07bd093f5b6324fbce91`);
        const data = await res.json();

        const movies = data.results.filter(movie => movie.poster_path != null);

        showMovie(movies);

    }

    // Tampilkan film ke DOM
    function showMovie(movies) {

        movies.forEach(movie => {
            if (movie.original_title != undefined) {
                movieContainer.innerHTML += `
                <div class="col-6 col-lg-4">
                    <div class="card card-movie mb-3" >
                        <div class="row no-gutters">
                            <div class="col-md-4">
                                <img src="https://image.tmdb.org/t/p/original/${movie.poster_path}" class="card-img movie-img" alt="...">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body movie-info">
                                    <h5 class="card-title movie-title">${movie.original_title}</h5>
                                    <p class="card-text movie-release"><small class="text-muted">${movie.release_date}</small></p>
                                    <div class="movie-rating">
                                        <img src="./images/star.png" class="movie-star" alt="">
                                        <span class="movie-vote">${movie.vote_average}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="backdrop">
                            <button class="btn btn-primary btn-view" data-movieid="${movie.id}" data-toggle="modal" data-target="#modalDetail"><i class="fas fw fa-eye icon-eye" data-movieid="${movie.id}"></i></button>
                        </div>
                    </div>
                </div>`;
            } else {
                movieContainer.innerHTML += `
                <div class="col-6 col-lg-4">
                    <div class="card card-movie mb-3" >
                        <div class="row no-gutters">
                            <div class="col-md-4">
                                <img src="https://image.tmdb.org/t/p/original/${movie.poster_path}" class="card-img movie-img" alt="...">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body movie-info">
                                    <h5 class="card-title movie-title">${movie.original_name}</h5>
                                    <p class="card-text movie-release"><small class="text-muted">${movie.first_air_date}</small></p>
                                    <div class="movie-rating">
                                        <img src="./images/star.png" class="movie-star" alt="">
                                        <span class="movie-vote">${movie.vote_average}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="backdrop">
                            <button class="btn btn-primary btn-view" data-movieid="${movie.id}" data-toggle="modal" data-target="#modalDetail"><i class="fas fw fa-eye icon-eye" data-movieid="${movie.id}"></i></button>
                        </div>
                    </div>
                </div>`;
            }
        });
    }

    // Cari film berdasarkan keyword
    async function searchMovie(e) {

        e.preventDefault();

        if (input.value.trim() !== '') {

            const keyword = input.value;

            const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=281abe853a8d07bd093f5b6324fbce91&query=${keyword}&page=1`);
            const data = await res.json();

            const movies = data.results.filter(movie => movie.poster_path != null);

            movieContainer.innerHTML = '';
            heading.innerText = `Search results for ${keyword}:`;
            input.value = '';

            showMovie(movies);

        } else {
            alert('Please enter a search term');
        }

    }

    // Dapatkan detail film
    async function getMovieDetail(movieId) {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=281abe853a8d07bd093f5b6324fbce91&language=en-US`);
        const movie = await res.json();

        updateModal(movie);
    }

    // Update Modal detail
    function updateModal(movie) {

        modalBody.innerHTML = `
        <ul class="list-group">
            <li class="list-group-item title text-center">${(movie.original_title != undefined ? movie.original_title : movie.original_name)}</li>
            <li class="list-group-item"><strong class="text-dark">Release date : </strong>&nbsp;<span>${movie.release_date}</span></li>
            <li class="list-group-item"><strong class="text-dark">Duration : </strong>&nbsp;<span>${movie.runtime} min</span></li>
            <li class="list-group-item"><strong class="text-dark genres">Genres : </strong>&nbsp;<span id="genres"></span></li>
            <li class="list-group-item"><strong class="text-dark">Popularity : </strong>&nbsp;<span>${movie.popularity}</span></li>
            <li class="list-group-item"><strong class="text-dark">Overview : </strong>&nbsp;<span>${movie.overview}</span></li>
            <li class="list-group-item"><strong class="text-dark">Production companies : </strong>&nbsp;<span id="production-companies"></span></li>
        </ul> `;

        const genres = document.getElementById('genres');
        const productions = document.getElementById('production-companies');

        movie.genres.forEach(genre => genres.innerText += `${genre.name}, `);
        let txtGenres = genres.innerText;
        genres.innerText = txtGenres.slice(0, -1);

        movie.production_companies.forEach(production => productions.innerText += `${production.name}, `);
        let txtProduction = productions.innerText;
        productions.innerText = txtProduction.slice(0, -1);

    }


    getMovies();

    // Event listener
    form.addEventListener('submit', searchMovie);
    searchClose.addEventListener('click', () => {
        const icon = document.getElementById('icon');

        if (icon.classList.contains('fa-search')) {
            icon.classList.replace('fa-search', 'fa-times');
            formContainer.classList.add('show');
        } else {
            icon.classList.replace('fa-times', 'fa-search');
            formContainer.classList.remove('show');
        }
    });
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-view') || e.target.classList.contains('icon-eye')) {
            const movieId = e.target.dataset.movieid;
            getMovieDetail(movieId);
        }
    });

}


export default main;