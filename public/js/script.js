let currentsong = new Audio();
let currentIndex = 0;
let songs = [];
let currfolder = "";

const playmusic = (track, pause = false) => {
    let baseUrl = window.location.origin;  // Dynamic base URL
    currentsong.src = `${baseUrl}/songs/${currfolder}/` + track;
    if (!pause) {
        currentsong.play();
        document.querySelector("#play").src = "/img/pause.svg";
    } else {
        document.querySelector("#play").src = "/img/play2.svg";
    }
    document.querySelector(".songinfo").textContent = track;
    document.querySelector(".songtime").textContent = "00:00/00:00";
}

async function getsongs(folder) {
    currfolder = folder;
    let baseUrl = window.location.origin;  // Dynamic base URL
    let a = await fetch(`${baseUrl}/songs/${folder}`);
    songs = await a.json();
    
    let songul = document.querySelector(".songslist ul");
    songul.innerHTML = "";
    for (const song of songs) {
        songul.innerHTML += `<li>
                                <img class="invert" src="/img/music.svg" alt="">
                                <div class="info">
                                    <div>${song}</div>
                                </div>
                                <div class="playnow">
                                    <span>play now</span>
                                    <img class="invert" width="18px" height="18px" src="/img/play.svg" alt="">
                                </div>
                             </li>`;
    }
    Array.from(document.querySelectorAll(".songslist li")).forEach(e => {
        e.addEventListener("click", () => playmusic(e.querySelector(".info div").textContent.trim()));
    });
    return songs;
}

async function displayalbums() {
    let baseUrl = window.location.origin;  // Dynamic base URL
    let a = await fetch(`${baseUrl}/albums`);
    let albums = await a.json();
    let cardcontainer = document.querySelector(".cardcontainer");

    for (const folder of albums) {
        let a = await fetch(`${baseUrl}/album-info/${folder}`);
        let info = await a.json();

        cardcontainer.innerHTML += `
            <div data-folder="${folder}" class="card">
                <div class="play">
                    <svg width="18px" height="18px" viewBox="-3 0 28 28" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <g id="Icon-Set-Filled" transform="translate(-419.000000, -571.000000)" fill="#FFFFFF">
                            <path d="M440.415,583.554 L421.418,571.311 C420.291,570.704 419,570.767 419,572.946 L419,597.054 C419,599.046 420.385,599.36 421.418,598.689 L440.415,586.446 C441.197,585.647 441.197,584.353 440.415,583.554"/>
                        </g>
                    </svg>
                </div>
                <img src="${baseUrl}/songs/${folder}/cover.jpg" alt="">
                <h2>${info.title}</h2>
                <p>${info.description}</p>
            </div>`;
    }

    Array.from(document.querySelectorAll(".card")).forEach(e => {
        e.addEventListener("click", async () => {
            songs = await getsongs(e.dataset.folder);
            playmusic(songs[0], true);
        });
    });
}

async function main() {
    await displayalbums();
    await getsongs("Ours");
    playmusic(songs[0], true);

    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0";
    });
    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-120%";
    });

    document.querySelector(".range input").addEventListener("change", e => {
        currentsong.volume = parseInt(e.target.value) / 100;
        document.querySelector(".volume>img").src = currentsong.volume > 0 ? 
            document.querySelector(".volume>img").src.replace("mute.svg", "volume.svg") : 
            document.querySelector(".volume>img").src.replace("volume.svg", "mute.svg");
    });

    document.querySelector(".volume>img").addEventListener("click", e => {
        if (e.target.src.includes("volume.svg")) {
            e.target.src = e.target.src.replace("volume.svg", "mute.svg");
            currentsong.volume = 0;
            document.querySelector(".range input").value = 0;
        } else {
            e.target.src = e.target.src.replace("mute.svg", "volume.svg");
            currentsong.volume = 0.1;
            document.querySelector(".range input").value = 10;
        }
    });

    document.querySelector("#play").addEventListener("click", () => {
        if (currentsong.paused) {
            currentsong.play();
            document.querySelector("#play").src = "/img/pause.svg";
        } else {
            currentsong.pause();
            document.querySelector("#play").src = "/img/play2.svg";
        }
    });

    document.querySelector("#next").addEventListener("click", () => nextSong());
    document.querySelector("#previous").addEventListener("click", () => prevSong());

    currentsong.addEventListener("timeupdate", () => {
        document.querySelector(".songtime").textContent = 
            `${secondsToMinutesSeconds(currentsong.currentTime)} / ${secondsToMinutesSeconds(currentsong.duration)}`;
        document.querySelector(".circle").style.left = (currentsong.currentTime / currentsong.duration) * 100 + "%";
    });

    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentsong.currentTime = (currentsong.duration * percent) / 100;
    });
}

main();

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) return "00:00";
    let minutes = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function nextSong() {
    currentIndex = currentIndex < songs.length - 1 ? currentIndex + 1 : 0;
    playmusic(songs[currentIndex]);
}

function prevSong() {
    currentIndex = currentIndex > 0 ? currentIndex - 1 : songs.length - 1;
    playmusic(songs[currentIndex]);
}
