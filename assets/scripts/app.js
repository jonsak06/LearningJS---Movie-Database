//elements
const addMovieModal = document.getElementById("add-modal");
const startAddMovieButton = document.getElementById("add-movie");
const backdrop = document.getElementById("backdrop");
const cancelAddMovieButton = addMovieModal.querySelector(".btn--passive");
const addMovieButton = cancelAddMovieButton.nextElementSibling;
const inputs = addMovieModal.querySelectorAll("input");
const entryTextSection = document.getElementById('entry-text');

const movies = [];

//functions
const updateUI = () => {
    if (movies.length === 0){
        entryTextSection.style.display = 'block';
    } else {
        entryTextSection.style.display = 'none';
    }
};

const renderNewMovieElement = (title, imageUrl, rating) => {
    const newMovieElement = document.createElement('li');
    newMovieElement.className = 'movie-element';
    newMovieElement.innerHTML = `
        <div class="movie-element__image">
            <img src="${imageUrl}" alt="${title} cover">
        </div>
        <div class="movie-element__info">
            <h2>${title}<h2>
            <p>${rating}/5 stars</p>
        </div>
    `;
    const movieList = document.getElementById("movie-list");
    movieList.append(newMovieElement);
};

const toggleBackdrop = () => {
    backdrop.classList.toggle("visible");
};

const toggleMovieModal = () => {
    addMovieModal.classList.toggle("visible");
    toggleBackdrop();
};

const clearMovieInputs = () => {
    for (movieInput of inputs) {
        movieInput.value = '';
    }
};

const addMovieHandler = () => {
    const movieTitle = inputs[0].value;
    const movieImage = inputs[1].value;
    const movieRating = inputs[2].value;
    if (
        movieTitle.trim() === "" ||
        movieImage.trim() === "" ||
        movieRating.trim === "" ||
        movieRating < 1 ||
        movieRating > 5
    ) {
        alert('Please enter correct values (rating between 1 and 5)');
        return;
    }
    const newMovie = {
        title: movieTitle,
        image: movieImage,
        rating: movieRating
    };
    movies.push(newMovie);
    console.log(movies);
    toggleMovieModal();
    clearMovieInputs();
    renderNewMovieElement(newMovie.title, newMovie.image, newMovie.rating);
    updateUI();
};

const cancelAddMovieHandler = () => {
    toggleMovieModal();
    clearMovieInputs();
};

const backdropClickHandler = () => {
    toggleMovieModal();
};

//event listeners
startAddMovieButton.addEventListener("click", toggleMovieModal);
backdrop.addEventListener("click", backdropClickHandler);
cancelAddMovieButton.addEventListener("click", cancelAddMovieHandler);
addMovieButton.addEventListener("click", addMovieHandler);
