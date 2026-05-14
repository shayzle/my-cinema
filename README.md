# My Cinema

An admin dashboard to manage movies, rooms, and screenings for a cinema.
Built as a solo school project at **Web@cadémie by Epitech**.

---

## What it does

- Add, edit, and delete movies (with poster images)
- Add, edit, and delete cinema rooms (with room photos)
- Schedule screenings by linking a movie to a room and a time
- Everything communicates through a JSON REST API

---

## Built with

- **PHP 8** — backend with MVC architecture
- **MySQL** — database with PDO
- **HTML / CSS / JavaScript** — frontend, no frameworks
- **MAMP** — local development server

---

## Project structure

```
my-cinema/
├── Back-End/
│   ├── config/
│   │   └── database.php        # DB connection (configure this)
│   ├── controllers/
│   │   ├── movieController.php
│   │   ├── roomController.php
│   │   └── screeningController.php
│   ├── models/
│   │   ├── movieModel.php
│   │   ├── roomModel.php
│   │   └── screeningModel.php
│   ├── routes/
│   │   └── router.php
│   └── index.php               # Entry point for all requests
├── Database/
│   └── script.sql              # Full schema + sample data
├── Front-End/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── api.js
│   │   ├── movies.js
│   │   ├── rooms.js
│   │   └── screenings.js
│   └── index.html
└── README.md
```

---

## API endpoints

| Method | URL | Description |
|--------|-----|-------------|
| GET | /api/movies | Get all movies |
| GET | /api/movies/:id | Get one movie |
| POST | /api/movies | Create a movie |
| PUT | /api/movies/:id | Update a movie |
| DELETE | /api/movies/:id | Delete a movie |
| GET | /api/rooms | Get all rooms |
| GET | /api/rooms/:id | Get one room |
| POST | /api/rooms | Create a room |
| PUT | /api/rooms/:id | Update a room |
| DELETE | /api/rooms/:id | Delete a room |
| GET | /api/screenings | Get all screenings |
| GET | /api/screenings/:id | Get one screening |
| POST | /api/screenings | Create a screening |
| PUT | /api/screenings/:id | Update a screening |
| DELETE | /api/screenings/:id | Delete a screening |

---

## Local setup

**Requirements:** PHP 8+, MySQL, MAMP (or any local server)

**1. Clone the repo**
```bash
git clone https://github.com/your-username/my-cinema.git
```

**2. Import the database**

Start MySQL and run:
```bash
mysql -u root -p < Database/script.sql
```
Or open phpMyAdmin and import `Database/script.sql`.

**3. Configure the database connection**

Open `Back-End/config/database.php` and fill in your credentials:
```php
private $host = "127.0.0.1";
private $port = "3306";       // MAMP users: use 8889
private $database_name = "my_cinema";
private $username = "root";
private $password = "";       // MAMP users: add your password
```

**4. Start the server**

With MAMP: place the project in your `htdocs` folder and open:
```
http://127.0.0.1:8888/my-cinema/Front-End/index.html
```

With PHP built-in server:
```bash
cd Back-End
php -S localhost:8000 index.php
```
Then open `http://localhost:8000`

---

## License

MIT
