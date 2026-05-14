const API_BASE = '../Back-End/index.php';

async function apiRequest(path, method = "GET", body = null) {
    const options = { method, headers: { "Content-Type": "application/json" } };
    if (body) options.body = JSON.stringify(body);
    const res = await fetch(API_BASE + "/api" + path, options);
    if (!res.ok) throw new Error("Request failed");
    return res.json();
}

function safeNumber(val) {
    const n = Number(val);
    return isNaN(n) ? null : n;
}

function setStatus(msg, error = false) {
    const el = document.getElementById("status");
    if (!msg) { el.textContent = ""; el.removeAttribute("style"); return; }
    el.textContent = msg;
    el.style.color = error ? "#e74c3c" : "#4fc87a";
    el.style.background = error ? "rgba(231,76,60,.1)" : "rgba(79,200,122,.08)";
    el.style.border = error ? "1px solid rgba(231,76,60,.2)" : "1px solid rgba(79,200,122,.15)";
}
