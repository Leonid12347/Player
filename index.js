const audioPlayer = document.getElementById('audioPlayer');
const songList = document.getElementById('songList');
const fileInput = document.getElementById('fileInput');
const toggleIcon = document.getElementById('toggleIcon');

function openFileInput() {
    fileInput.click();
};

function addSong() {
    const file = fileInput.files[0];

    if (file) {
        const objectURL = URL.createObjectURL(file);

        const newAudio = document.createElement('audio');
        newAudio.src = objectURL;

        const listItem = document.createElement('li');
        listItem.textContent = file.name;
        listItem.appendChild(createDeleteButton());
        listItem.audioElement = newAudio;

        songList.appendChild(listItem);

        if (!document.getElementById('clearListButton')) {
            addClearListButton();
        };

        fileInput.value = '';
    };
};

function toggleSongList() {
    songList.classList.toggle('hidden');
};

function playSong(event) {
    const target = event.target;
    if (target.tagName === 'LI') {
        audioPlayer.src = target.audioElement.src;
    };
};

function createDeleteButton() {
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '&#10006;';
    deleteButton.className = 'deleteButton';
    
    deleteButton.onclick = function(event) {
        event.stopPropagation();
        const listItem = event.target.parentElement;
        listItem.remove();

        if (songList.children.length === 0) {
            removeClearListButton();
        }
    };
    return deleteButton;
};

function addClearListButton() {
    const clearListButton = document.createElement('button');
    clearListButton.id = 'clearListButton';
    clearListButton.textContent = 'Очистить список';
    clearListButton.onclick = clearSongList;
    document.body.appendChild(clearListButton);
};

function removeClearListButton() {
    const clearListButton = document.getElementById('clearListButton');
    if (clearListButton) {
        clearListButton.remove();
    };
};

function toggleSongList() {
    const isHidden = songList.classList.toggle('hidden');
    const toggleIcon = document.getElementById('toggleIcon');
    toggleIcon.textContent = isHidden ? '\u25B6' : '\u25BC';
};


function clearSongList() {
    songList.innerHTML = '';
    audioPlayer.src = '';
    removeClearListButton();
};
