const players = [];
const teams = { "Etsijät": [], "Piiloutujat 1": [], "Piiloutujat 2": [] };

const loginButton = document.getElementById("loginButton");
const startGameButton = document.getElementById("startGameButton");
const shuffleButton = document.getElementById("shuffleButton");
const timerContainer = document.getElementById("timer-container");

loginButton.addEventListener("click", () => {
    const username = document.getElementById("username").value.trim();
    if (username === "") {
        alert("Syötä käyttäjätunnus!");
        return;
    }

    if (players.length === 0) {
        players.push(username);
        document.getElementById("username").value = "";
        document.getElementById("players").textContent = players.join(", ");

        if (username === "JuusoJuusto") {
            // Salli pelaajien muokkaaminen
            enablePlayerEditing();
        }
    } else {
        alert("Vain yksi nimi sallittu.");
    }
});

shuffleButton.addEventListener("click", () => {
    if (players.length >= 6) {
        const teamCount = Math.floor(players.length / 3);
        for (let i = 0; i < teamCount; i++) {
            const teamName = `Piiloutujat ${i + 1}`;
            teams[teamName] = players.splice(0, 3);
        }

        displayTeams();
        startGameButton.style.display = "inline-block";
        shuffleButton.style.display = "none";
    } else {
        alert("Tarvitaan vähintään 6 pelaajaa tiimien jakamiseen.");
    }
});

startGameButton.addEventListener("click", () => {
    startGameButton.style.display = "none";
    startTimer();
});

function displayTeams() {
    const teamList = document.getElementById("players");
    teamList.innerHTML = "";
    for (const [teamName, teamPlayers] of Object.entries(teams)) {
        const teamDiv = document.createElement("div");
        teamDiv.innerHTML = `<h2>${teamName}</h2><ul>${teamPlayers.map(player => `<li>${player}</li>`).join("")}</ul>`;
        teamList.appendChild(teamDiv);
    }
}

function enablePlayerEditing() {
    const playerList = document.getElementById("players");
    playerList.addEventListener("click", (event) => {
        const target = event.target;
        if (target.tagName === "LI") {
            const playerName = target.textContent;
            const newName = prompt("Syötä uusi nimi:", playerName);
            if (newName && newName.trim() !== "") {
                const playerIndex = players.indexOf(playerName);
                if (playerIndex !== -1) {
                    players[playerIndex] = newName;
                    target.textContent = newName;
                }
            }
        }
    });
}

function startTimer() {
    let timeLeft = 120; // 2 minuuttia
    timerContainer.style.display = "block";

    const timerInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerContainer.textContent = "Aika loppui!";
            return;
        }

        timerContainer.textContent = `Aikaa jäljellä: ${timeLeft} sekuntia`;
        timeLeft--;
    }, 1000);
}
