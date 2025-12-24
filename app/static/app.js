async function processText() {
    const input = document.getElementById("input").value.trim();
    const statusEl = document.getElementById("status");
    const errorEl = document.getElementById("error");
    const resultEl = document.getElementById("result");
    const processBtn = document.getElementById("processBtn");

    // Reset UI
    errorEl.innerText = "";
    errorEl.classList.remove("show");
    statusEl.innerText = "";

    // Validate input
    if (!input) {
        errorEl.innerText = "Please enter some text to process.";
        errorEl.classList.add("show");
        return;
    }

    // Show processing state
    statusEl.innerText = "Processing...";
    processBtn.disabled = true;

    try {
        const response = await fetch("/api/process/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookie("csrftoken")
            },
            body: JSON.stringify({ text: input })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Failed to process text");
        }

        // Update UI with results
        document.getElementById("title").innerText = data.title;
        document.getElementById("rewrite").innerText = data.beginner_friendly_version;

        const pointsList = document.getElementById("points");
        pointsList.innerHTML = "";
        data.key_points.forEach(point => {
            const li = document.createElement("li");
            li.innerText = point;
            pointsList.appendChild(li);
        });

        resultEl.style.display = "block";
        statusEl.innerText = "";

    } catch (error) {
        errorEl.innerText = error.message || "An error occurred. Please try again.";
        errorEl.classList.add("show");
        statusEl.innerText = "";
    } finally {
        processBtn.disabled = false;
    }
}

// Helper function to get CSRF token from cookies
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

// Allow Enter key to submit (with Shift+Enter for new line)
document.addEventListener('DOMContentLoaded', function () {
    const textarea = document.getElementById('input');
    textarea.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            processText();
        }
    });
});