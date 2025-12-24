async function processText() {
    const input = document.getElementById("input").value;
    document.getElementById("error").innerText = "";
    document.getElementById("status").innerText = "Processing...";

    try {
        const res = await fetch("/api/process/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: input })
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.error);

        document.getElementById("title").innerText = data.title;
        document.getElementById("rewrite").innerText = data.beginner_friendly_version;

        const ul = document.getElementById("points");
        ul.innerHTML = "";
        data.key_points.forEach(p => {
            const li = document.createElement("li");
            li.innerText = p;
            ul.appendChild(li);
        });

        document.getElementById("result").style.display = "block";
        document.getElementById("status").innerText = "";

    } catch (e) {
        document.getElementById("status").innerText = "";
        document.getElementById("error").innerText = e.message;
    }
}
