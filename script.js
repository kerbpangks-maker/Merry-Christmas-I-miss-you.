const song = document.getElementById("song");
const playBtn = document.getElementById("playBtn");
const replayBtn = document.getElementById("replayBtn");
const volume = document.getElementById("volume");
const progress = document.getElementById("progress");
const cardsEl = document.getElementById("cards");

const cards = [
  ["Merry Christmas", "a little wish for you"],
  ["I miss you", "even in the brightest season"],
  ["December feels different", "when you're far away"],
  ["One warm memory", "can light the whole night"],
  ["Still thinking of you", "under the Christmas lights"],
  ["My Christmas wish", "is simply a moment with you"]
];

const positions = [
  [-20, -165, -5],
  [34, -110, 4],
  [-45, 8, -3],
  [42, 78, 5],
  [-34, 168, -4],
  [30, 200, 3]
];

function buildCards() {
  cardsEl.innerHTML = "";

  cards.forEach((text, i) => {
    const card = document.createElement("article");
    card.className = "card";

    const [x, y, rotation] = positions[i];

    card.style.setProperty("--x", `${x}vw`);
    card.style.setProperty("--y", `${y}px`);
    card.style.setProperty("--rot", `${rotation}deg`);

    card.innerHTML = `
      ${text[0]}
      <small>${text[1]}</small>
    `;

    cardsEl.appendChild(card);
  });
}

function animateCards() {
  buildCards();

  [...cardsEl.children].forEach((card, i) => {
    setTimeout(() => {
      card.classList.add("show");
    }, i * 900);
  });
}

playBtn.addEventListener("click", async () => {
  if (song.paused) {
    try {
      await song.play();
      playBtn.textContent = "❚❚ Pause";
      animateCards();
    } catch (error) {
      alert("Make sure song.mp3 is uploaded.");
    }
  } else {
    song.pause();
    playBtn.textContent = "▶ Play";
  }
});

replayBtn.addEventListener("click", async () => {
  song.currentTime = 0;
  animateCards();

  try {
    await song.play();
    playBtn.textContent = "❚❚ Pause";
  } catch (error) {}
});

volume.addEventListener("input", () => {
  song.volume = Number(volume.value);
});

song.volume = Number(volume.value);

song.addEventListener("timeupdate", () => {
  if (!song.duration) return;

  progress.style.width =
    `${(song.currentTime / song.duration) * 100}%`;
});

song.addEventListener("ended", () => {
  playBtn.textContent = "▶ Play";
});

buildCards();
