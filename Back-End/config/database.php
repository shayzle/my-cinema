<?php

class Database {

    private $host = "127.0.0.1";
    private $port = "3306";
    private $database_name = "my_cinema";
    private $username = "root";
    private $password = "";

    public function connect() {
        try {
            $pdo = new PDO(
                "mysql:host={$this->host};port={$this->port};dbname={$this->database_name};charset=utf8mb4",
                $this->username,
                $this->password,
                [
                    PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci",
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
                ]
            );

            return $pdo;

        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => "Database connection failed"]);
            exit;
        }
    }

    public function getConnection() {
        return $this->connect();
    }
}
