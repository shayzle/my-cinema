function resetMovieForm() {
    ["movieId","movieTitle","movieDescription","movieDuration","movieYear","movieGenre","movieDirector","moviePoster"]
        .forEach(id => document.getElementById(id).value = "");
    setStatus("");
}

function fillMovieForm(movie) {
    document.getElementById("movieId").value          = movie.id           ?? "";
    document.getElementById("movieTitle").value       = movie.title        ?? "";
    document.getElementById("movieDescription").value = movie.description  ?? "";
    document.getElementById("movieDuration").value    = movie.duration     ?? "";
    document.getElementById("movieYear").value        = movie.release_year ?? "";
    document.getElementById("movieGenre").value       = movie.genre        ?? "";
    document.getElementById("movieDirector").value    = movie.director     ?? "";
    document.getElementById("moviePoster").value      = movie.poster_url   ?? "";
    document.getElementById("section-movies").scrollIntoView({ behavior: "smooth" });
}

async function loadMovies() {
    try {
        var movies = await apiRequest("/movies");
        document.getElementById("badgeMovies").textContent = movies.length;

        if (movies.length === 0) {
            document.getElementById("moviesTable").innerHTML = '<div class="empty">No films yet</div>';
            return;
        }

        var html = '<div class="movies-grid">';
        for (var i = 0; i < movies.length; i++) {
            var m = movies[i];
            var hasPoster = m.poster_url && m.poster_url.trim() !== "";

            html += '<div class="movie-card">';

            if (hasPoster) {
                html += '<img src="' + m.poster_url + '" alt="' + m.title + '" loading="lazy"'
                      + ' onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'">';
                html += '<div class="poster-ph" style="display:none">' + m.title + '</div>';
            } else {
                html += '<div class="poster-ph">' + m.title + '</div>';
            }

            html += '<div class="movie-overlay">';
            html += '<h3>' + m.title + '</h3>';
            if (m.genre) html += '<div class="genre-tag">' + m.genre + '</div>';
            html += '<div class="movie-meta">';
            if (m.release_year) html += m.release_year;
            if (m.duration)     html += ' &bull; ' + m.duration + ' min';
            if (m.director)     html += '<br>Dir. ' + m.director;
            html += '</div>';
            html += '<div class="overlay-actions">';
            html += '<button class="btn-edit btn-sm" onclick=\'fillMovieForm(' + JSON.stringify(m) + ')\'>Edit</button>';
            html += '<button class="btn-del btn-sm" onclick="deleteMovie(' + m.id + ')">Delete</button>';
            html += '</div>';
            html += '</div>';

            html += '</div>';
        }
        html += '</div>';

        document.getElementById("moviesTable").innerHTML = html;
        setStatus("Loaded");
    } catch (e) {
        setStatus("Error loading films", true);
    }
}

async function saveMovie() {
    var id = document.getElementById("movieId").value.trim();

    var data = {
        title:        document.getElementById("movieTitle").value.trim(),
        description:  document.getElementById("movieDescription").value.trim() || null,
        duration:     safeNumber(document.getElementById("movieDuration").value),
        release_year: safeNumber(document.getElementById("movieYear").value),
        genre:        document.getElementById("movieGenre").value.trim() || null,
        director:     document.getElementById("movieDirector").value.trim() || null,
        poster_url:   document.getElementById("moviePoster").value.trim() || null,
    };

    if (!data.title || !data.duration) {
        setStatus("Title and duration required", true);
        return;
    }

    try {
        if (id === "") {
            await apiRequest("/movies", "POST", data);
        } else {
            await apiRequest("/movies/" + id, "PUT", data);
        }
        resetMovieForm();
        loadMovies();
    } catch (e) {
        setStatus("Error saving film", true);
    }
}

async function deleteMovie(id) {
    if (!confirm("Delete this film?")) return;
    await apiRequest("/movies/" + id, "DELETE");
    loadMovies();
}

loadMovies();
