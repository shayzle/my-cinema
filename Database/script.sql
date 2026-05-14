CREATE DATABASE IF NOT EXISTS my_cinema;
USE my_cinema;



DROP TABLE IF EXISTS screenings;
DROP TABLE IF EXISTS rooms;
DROP TABLE IF EXISTS movies;



CREATE TABLE movies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    duration INT NOT NULL,
    release_year INT NOT NULL,
    genre VARCHAR(100),
    director VARCHAR(100),
    poster_url VARCHAR(500),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);



CREATE TABLE rooms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    capacity INT NOT NULL,
    type VARCHAR(100),
    active BOOLEAN NOT NULL DEFAULT TRUE,
    image_url VARCHAR(500),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);



CREATE TABLE screenings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    movie_id INT NOT NULL,
    room_id INT NOT NULL,
    start_time DATETIME NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_screenings_movie
        FOREIGN KEY (movie_id)
        REFERENCES movies(id)
        ON DELETE RESTRICT,

    CONSTRAINT fk_screenings_room
        FOREIGN KEY (room_id)
        REFERENCES rooms(id)
        ON DELETE RESTRICT
);



INSERT INTO movies (title, duration, release_year, genre, director, poster_url)
VALUES
('Ponyo', 101, 2008, 'Fantasy', 'Hayao Miyazaki', 'https://upload.wikimedia.org/wikipedia/en/a/a8/Ponyo_poster.jpg'),
('Castle in the Sky', 124, 1986, 'Adventure', 'Hayao Miyazaki', 'https://upload.wikimedia.org/wikipedia/en/4/4c/Castleinthesky.jpg'),
('My Neighbor Totoro', 86, 1988, 'Fantasy', 'Hayao Miyazaki', 'https://upload.wikimedia.org/wikipedia/en/0/02/My_Neighbor_Totoro_poster.jpg');

INSERT INTO rooms (name, capacity, type, image_url)
VALUES
('Room 1', 100, 'IMAX', 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=80'),
('Room 2', 90, 'Normal', 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&q=80'),
('Room 3', 80, '3D', 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800&q=80');

INSERT INTO screenings (movie_id, room_id, start_time)
VALUES
(1, 1, '2026-02-01 18:00:00'),
(2, 2, '2026-02-01 20:00:00'),
(3, 3, '2026-02-01 16:00:00');
