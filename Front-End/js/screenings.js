function resetScreeningForm() {
    ["screeningId", "screeningMovie", "screeningRoom", "screeningTime"]
        .forEach(id => document.getElementById(id).value = "");
}

function fillScreeningForm(s) {
    document.getElementById("screeningId").value    = s.id       ?? "";
    document.getElementById("screeningMovie").value = s.movie_id ?? "";
    document.getElementById("screeningRoom").value  = s.room_id  ?? "";
    document.getElementById("screeningTime").value  = s.start_time ? s.start_time.replace(" ", "T") : "";
    document.getElementById("section-screenings").scrollIntoView({ behavior: "smooth" });
}

function niceDate(dt) {
    const d = new Date(dt.replace(" ", "T"));
    return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
        + " " + d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
}

async function loadScreenings() {
    try {
        const list = await apiRequest("/screenings");

        if (list.length === 0) {
            document.getElementById("screeningsTable").innerHTML = '<div class="empty">No screenings yet</div>';
            return;
        }

        let html = `
            <div class="table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Movie ID</th>
                            <th>Room ID</th>
                            <th>Time</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>`;

        for (const s of list) {
            html += `
                <tr>
                    <td>${s.id}</td>
                    <td>Movie #${s.movie_id}</td>
                    <td>Room #${s.room_id}</td>
                    <td><span class="time-tag">${niceDate(s.start_time)}</span></td>
                    <td>
                        <button class="btn-edit btn-sm" onclick='fillScreeningForm(${JSON.stringify(s)})'>Edit</button>
                        <button class="btn-del btn-sm" onclick="deleteScreening(${s.id})">Delete</button>
                    </td>
                </tr>`;
        }

        html += `</tbody></table></div>`;
        document.getElementById("screeningsTable").innerHTML = html;

    } catch (e) {
        document.getElementById("screeningsTable").innerHTML = '<div class="empty">Error loading screenings</div>';
    }
}

async function saveScreening() {
    const id = document.getElementById("screeningId").value.trim();

    const data = {
        movie_id:   Number(document.getElementById("screeningMovie").value),
        room_id:    Number(document.getElementById("screeningRoom").value),
        start_time: document.getElementById("screeningTime").value.replace("T", " "),
    };

    if (!data.movie_id || !data.room_id || !data.start_time) return;

    if (id === "") {
        await apiRequest("/screenings", "POST", data);
    } else {
        await apiRequest("/screenings/" + id, "PUT", data);
    }

    resetScreeningForm();
    loadScreenings();
}

async function deleteScreening(id) {
    if (!confirm("Delete this screening?")) return;
    await apiRequest("/screenings/" + id, "DELETE");
    loadScreenings();
}

loadScreenings();
