function resetRoomForm() {
    ["roomId", "roomName", "roomCapacity", "roomType", "roomImage"]
        .forEach(id => document.getElementById(id).value = "");
}

function fillRoomForm(room) {
    document.getElementById("roomId").value       = room.id        ?? "";
    document.getElementById("roomName").value     = room.name      ?? "";
    document.getElementById("roomCapacity").value = room.capacity  ?? "";
    document.getElementById("roomType").value     = room.type      ?? "";
    document.getElementById("roomImage").value    = room.image_url ?? "";
    document.getElementById("section-rooms").scrollIntoView({ behavior: "smooth" });
}

function getTypeClass(type) {
    if (!type) return "t-other";
    var t = type.toLowerCase();
    if (t === "imax")   return "t-imax";
    if (t === "3d")     return "t-3d";
    if (t === "normal") return "t-normal";
    return "t-other";
}

async function loadRooms() {
    try {
        var rooms = await apiRequest("/rooms");

        if (rooms.length === 0) {
            document.getElementById("roomsTable").innerHTML = '<div class="empty">No rooms yet</div>';
            return;
        }

        var html = '<div class="rooms-grid">';
        for (var i = 0; i < rooms.length; i++) {
            var r = rooms[i];
            var hasPhoto = r.image_url && r.image_url.trim() !== "";

            html += '<div class="room-card">';

            if (hasPhoto) {
                html += '<img src="' + r.image_url + '" alt="' + r.name + '" loading="lazy"'
                      + ' onerror="this.style.display=\'none\'">';
            } else {
                html += '<div class="room-ph"></div>';
            }

            html += '<div class="room-overlay">';
            html += '<div class="top">';
            html += '<div class="room-name">' + r.name + '</div>';
            if (r.type) html += '<span class="type-badge ' + getTypeClass(r.type) + '">' + r.type + '</span>';
            html += '<div class="room-seats">' + r.capacity + ' seats</div>';
            html += '</div>';
            html += '<div class="bottom">';
            html += '<button class="btn-edit btn-sm" onclick=\'fillRoomForm(' + JSON.stringify(r) + ')\'>Edit</button>';
            html += '<button class="btn-del btn-sm" onclick="deleteRoom(' + r.id + ')">Delete</button>';
            html += '</div>';
            html += '</div>';

            html += '</div>';
        }
        html += '</div>';

        document.getElementById("roomsTable").innerHTML = html;
    } catch (e) {
        document.getElementById("roomsTable").innerHTML = '<div class="empty">Error loading rooms</div>';
    }
}

async function saveRoom() {
    var id = document.getElementById("roomId").value.trim();

    var data = {
        name:      document.getElementById("roomName").value.trim(),
        capacity:  safeNumber(document.getElementById("roomCapacity").value),
        type:      document.getElementById("roomType").value.trim() || null,
        image_url: document.getElementById("roomImage").value.trim() || null,
    };

    if (!data.name || !data.capacity) return;

    if (id === "") {
        await apiRequest("/rooms", "POST", data);
    } else {
        await apiRequest("/rooms/" + id, "PUT", data);
    }

    resetRoomForm();
    loadRooms();
}

async function deleteRoom(id) {
    if (!confirm("Delete this room?")) return;
    await apiRequest("/rooms/" + id, "DELETE");
    loadRooms();
}

loadRooms();
