<?php

class roomModel {

    private PDO $db;

    public function __construct(PDO $pdo) {
        $this->db = $pdo;
    }

    public function getAll(): array {
        $stmt = $this->db->prepare("SELECT * FROM rooms");
        $stmt->execute();
        return $stmt->fetchAll();
    }

    public function getById(int $id): ?array {
        $stmt = $this->db->prepare("SELECT * FROM rooms WHERE id = ?");
        $stmt->execute([$id]);
        return $stmt->fetch() ?: null;
    }

    public function create(array $data): bool {
        $stmt = $this->db->prepare(
            "INSERT INTO rooms (name, capacity, type, active, image_url)
             VALUES (?, ?, ?, ?, ?)"
        );
        return $stmt->execute([
            $data['name'],
            $data['capacity'],
            $data['type'] ?? null,
            $data['active'] ?? true,
            $data['image_url'] ?? null
        ]);
    }

    public function update(int $id, array $data): bool {
        $stmt = $this->db->prepare(
            "UPDATE rooms
             SET name = ?, capacity = ?, type = ?, active = ?, image_url = ?
             WHERE id = ?"
        );
        return $stmt->execute([
            $data['name'],
            $data['capacity'],
            $data['type'] ?? null,
            $data['active'] ?? true,
            $data['image_url'] ?? null,
            $id
        ]);
    }

    public function delete(int $id): bool {
        $stmt = $this->db->prepare("DELETE FROM rooms WHERE id = ?");
        return $stmt->execute([$id]);
    }
}
