//elements
const addMovieModal = document.getElementById("add-modal");
const startAddMovieButton = document.getElementById("add-movie");
const backdrop = document.getElementById("backdrop");
const cancelAddMovieButton = addMovieModal.querySelector(".btn--passive");
const addMovieButton = cancelAddMovieButton.nextElementSibling;
const inputs = addMovieModal.querySelectorAll("input");
const entryTextSection = document.getElementById("entry-text");
const movieList = document.getElementById("movie-list");
const deleteMovieModal = document.getElementById("delete-modal");

const movies = [];

//functions
const updateUI = () => {
    if (movies.length === 0) {
        entryTextSection.style.display = "block";
    } else {
        entryTextSection.style.display = "none";
    }
};

const deleteMovie = (movieID) => {
    let movieIndex = 0;
    for (const movie of movies) {
        if (movie.id === movieID) {
            break;
        }
        movieIndex++;
    }
    movies.splice(movieIndex, 1);
    movieList.children[movieIndex].remove();
    console.log(movies);
    closeDeleteModal();
    updateUI();
};

const deleteMovieHandler = (movieID) => {
    openDeleteModal();
    let yesDeleteButton = deleteMovieModal.querySelector(".btn--danger");
    const cancelDeleteButton = deleteMovieModal.querySelector(".btn--passive");

    //replace the button every time the function is called to let the garbage collector clear the event listeners that are created every time the delete modal is opened
    yesDeleteButton.replaceWith(yesDeleteButton.cloneNode(true));
    yesDeleteButton = deleteMovieModal.querySelector(".btn--danger");

    cancelDeleteButton.removeEventListener("click", closeDeleteModal);

    yesDeleteButton.addEventListener("click", deleteMovie.bind(null, movieID));
    cancelDeleteButton.addEventListener("click", closeDeleteModal);
};

const renderNewMovieElement = (id, title, imageUrl, rating) => {
    const newMovieElement = document.createElement("li");
    newMovieElement.className = "movie-element";
    newMovieElement.innerHTML = `
        <div class="movie-element__image">
            <img src="${imageUrl}" alt="${title} cover">
        </div>
        <div class="movie-element__info">
            <h2>${title}<h2>
            <p>${rating}/5 stars</p>
            </div>
    `;
    newMovieElement.addEventListener(
        "click",
        deleteMovieHandler.bind(null, id)
    );
    movieList.append(newMovieElement);
};

const toggleBackdrop = () => {
    backdrop.classList.toggle("visible");
};

const toggleMovieModal = () => {
    addMovieModal.classList.toggle("visible");
    toggleBackdrop();
};

const openDeleteModal = () => {
    deleteMovieModal.classList.add("visible");
    toggleBackdrop();
};

const closeDeleteModal = () => {
    deleteMovieModal.classList.remove("visible");
    toggleBackdrop();
};

const clearMovieInputs = () => {
    for (movieInput of inputs) {
        movieInput.value = "";
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
        alert("Please enter correct values (rating between 1 and 5)");
        return;
    }
    const newMovie = {
        id: Math.random().toString(),
        title: movieTitle,
        image: movieImage,
        rating: movieRating,
    };
    movies.push(newMovie);
    console.log(movies);
    toggleMovieModal();
    clearMovieInputs();
    renderNewMovieElement(
        newMovie.id,
        newMovie.title,
        newMovie.image,
        newMovie.rating
    );
    updateUI();
};

const cancelAddMovieHandler = () => {
    toggleMovieModal();
    clearMovieInputs();
};

const backdropClickHandler = () => {
    if (addMovieModal.classList.contains("visible")) {
        toggleMovieModal();
    } else if (deleteMovieModal.classList.contains("visible")) {
        closeDeleteModal();
    }
    clearMovieInputs();
};

//event listeners
startAddMovieButton.addEventListener("click", toggleMovieModal);
backdrop.addEventListener("click", backdropClickHandler);
cancelAddMovieButton.addEventListener("click", cancelAddMovieHandler);
addMovieButton.addEventListener("click", addMovieHandler);
