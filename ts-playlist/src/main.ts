console.log("Playlist Builder startar...");

const form = document.querySelector("#track-form") as HTMLFormElement;
const titleInput = document.querySelector("#title") as HTMLInputElement;
const durationInput = document.querySelector("#duration") as HTMLInputElement;
const genreInput = document.querySelector("#genre") as HTMLSelectElement;
const favoriteInput = document.querySelector("#favorite") as HTMLInputElement;
const list = document.querySelector("#list") as HTMLUListElement;
const totalEl = document.querySelector("#total") as HTMLSpanElement;

type Genre = "pop" | "rock" | "other";
type Track = {
  title: string;
  duration: number;
  genre: Genre;
  favorite: boolean;
};

const tracks: Track[] = [];

function parseDuration(str: string): number | null {
  const match = str.match(/^(\d+):(\d{2})$/);
  if (!match) return null;
  const min = parseInt(match[1], 10);
  const sec = parseInt(match[2], 10); 
  if (sec >= 60) return null;
  return min * 60 + sec;
}

function formatDuration(secs: number): string {
  const min = Math.floor(secs / 60);
  const sec = secs % 60;
  return `${min}:${sec.toString().padStart(2, "0")}`;
}

function render() {
  list.innerHTML = "";
  let total = 0;
  tracks.forEach((track, i) => {
    const li = document.createElement("li");
    li.textContent = `${track.title} (${formatDuration(track.duration)}) [${track.genre}]${track.favorite ? " ⭐" : ""}`;

    
    const btn = document.createElement("button");
    btn.textContent = "🗑️";
    btn.onclick = () => {
      tracks.splice(i, 1);
      render();
    };
    li.appendChild(btn);

    list.appendChild(li);
    total += track.duration;
  });
  totalEl.textContent = formatDuration(total);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = titleInput.value.trim();
  const durationStr = durationInput.value.trim();
  const duration = parseDuration(durationStr);
  const genre = genreInput.value as Genre;
  const favorite = favoriteInput.checked;

  if (!title || duration === null) {
    alert("Fyll i titel och tid (mm:ss)");
    return;
  }

  const track: Track = { title, duration, genre, favorite };
  tracks.push(track);

  titleInput.value = "";
  durationInput.value = "";
  genreInput.value = "pop";
  favoriteInput.checked = false; 

  render();
});

render();