console.log("welocome to spotiy")

//inialize the variables 

let songIndex = 0;
let audioElement = new Audio('/songs/1.mp3')
let masterPlay = document.getElementById('master-play')
let myProgressBar = document.getElementById('myProgressBar')
let gif = document.getElementById('gif')
let songTitle = document.getElementById('song-title')
let songItems = Array.from(document.getElementsByClassName('songItems'))


let songs = [
    {songName: "Warriyo - Mortals", filePath: "songs/1.mp3", coverPath: "/covers/1.jpg"},
    {songName: "Cielo - Huma-Huma", filePath: "songs/2.mp3", coverPath: "/covers/2.jpg"},
    {songName: "DEAF KEV - Invincible", filePath: "songs/3.mp3", coverPath: "/covers/3.jpg"},
    {songName: "Different Heaven ", filePath: "songs/4.mp3", coverPath: "/covers/4.jpg"},
    {songName: "Janji-Heroes-Tonight", filePath: "songs/5.mp3", coverPath: "/covers/5.jpg"},
    {songName: "Rabba - Salam-e-Ishq", filePath: "songs/6.mp3", coverPath: "/covers/6.jpg"},
    {songName: "Sakhiyaan - Salam-e-Ishq", filePath: "songs/7.mp3", coverPath: "/covers/7.jpg"},
    {songName: "Bhula Dena - Salam-e-Ishq", filePath: "songs/8.mp3", coverPath: "/covers/8.jpg"},
    {songName: "Tumhari Kasam ", filePath: "songs/9.mp3", coverPath: "/covers/9.jpg"},
    {songName: "Na Jaana - Salam-e-Ishq", filePath: "songs/10.mp3", coverPath: "/covers/10.jpg"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("song-name")[0].innerText = songs[i].songName; 
})
 

//hnadle play/push click
masterPlay.addEventListener('click' , () => {
    if(audioElement.paused || audioElement.currentTime <= 0){
        audioElement.play()
        masterPlay.src = "/icons/pause-button.png"
        gif.style.opacity = 1
    } else {
        audioElement.pause()
        masterPlay.src = "/icons/play-button.png"
        gif.style.opacity = 0
    }
})


audioElement.addEventListener('timeupdate' , () => {
    // console.log('timeupdate')
    //update seekbar
    let progress = parseInt((audioElement.currentTime/audioElement.duration)*100)

    // console.log(progress)

    myProgressBar.value = progress
})


myProgressBar.addEventListener('change' , () =>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100
})


let songbtn = Array.from(document.querySelectorAll('.song-items-play'))
// console.log(songbtn)

function makeAllPlays(clickedButton) {
    // Loop through all buttons to pause the button which is play
    songbtn.forEach(button => {
        if (button !== clickedButton) {
            button.src = "/icons/play-button.png"; // Set default image for others
        }
    })
}


songbtn.forEach((element) => {
    element.addEventListener('click' , (e) => {
        
        makeAllPlays(e.target)
        songIndex = parseInt(e.target.id)
        
        // come id which is in a each song button class
        e.target.src = "/icons/pause-button.png"

        audioElement.src = `/songs/${songIndex+1}.mp3`

        songTitle.innerText = songs[songIndex].songName

        audioElement.currentTime = 0

        audioElement.play()

        masterPlay.src = "/icons/pause-button.png"
    
        gif.style.opacity = 1
    })
})


const next = document.getElementById('next')
next.addEventListener('click' , () => {
    if(songIndex >= 9){
        songIndex = 0
    } else {
        songIndex += 1;
    }

    audioElement.src = `/songs/${songIndex+1}.mp3`

    songTitle.innerText = songs[songIndex].songName

    audioElement.currentTime = 0
    audioElement.play()

    masterPlay.src = "/icons/pause-button.png"

    gif.style.opacity = 1
})


const previous = document.getElementById('previous')
previous.addEventListener('click' , () => {
    if(songIndex <= 0){
        songIndex = 0
    } else {
        songIndex -= 1;
    }

    audioElement.src = `/songs/${songIndex+1}.mp3`

    songTitle.innerText = songs[songIndex].songName

    audioElement.currentTime = 0
    audioElement.play()

    masterPlay.src = "/icons/pause-button.png"

    gif.style.opacity = 1
})

const volumeUpButton = document.getElementById('volumeUp')
const volumeDownButton = document.getElementById('volumeDown')
const volumeSlider = document.getElementById('volumeSlider')


// Volume Up Button
volumeUpButton.addEventListener('click', () => {
    if (audioElement.volume < 1.0) {
        // Increase volume
        //volume increase calculation
        audioElement.volume = Math.min(audioElement.volume + 0.1, 1.0);

        // Sync slider with updated volume
        volumeSlider.value = audioElement.volume;
    }
});

// Volume Down Button
volumeDownButton.addEventListener('click', () => {
    if (audioElement.volume > 0.0) {
        // Decrease volume
        //volume decrease calculation
        audioElement.volume = Math.max(audioElement.volume - 0.1, 0.0);

        // Sync slider with updated volume
        volumeSlider.value = audioElement.volume;
    }
});

// Volume Slider Control
volumeSlider.addEventListener('input', (event) => {
    // Update audio volume based on slider position
    audioElement.volume = event.target.value;
});
