const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

app.use(express.static(path.join(__dirname, '../public')));

app.get('/albums', (req, res) => {
    const albumsPath = path.join(__dirname, '../public/songs');
    
    fs.readdir(albumsPath, (err, folders) => {
        if (err) {
            return res.status(500).send('Error reading albums folder');
        }
        
        const albums = folders.filter(folder => fs.statSync(path.join(albumsPath, folder)).isDirectory());
        res.json(albums);
    });
});

app.get('/songs/:album', (req, res) => {
    const album = req.params.album;
    const songFolderPath = path.join(__dirname, '../public/songs', album);
    
    fs.readdir(songFolderPath, (err, files) => {
        if (err) {
            return res.status(500).send('Error reading song folder');
        }
        
        const songs = files.filter(file => file.endsWith('.mp3'));
        res.json(songs);
    });
});

app.get('/album-info/:album', (req, res) => {
    const album = req.params.album;
    const infoFilePath = path.join(__dirname, '../public/songs', album, 'info.json');

    fs.readFile(infoFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(404).send('Album info not found');
        }
        res.json(JSON.parse(data));
    });
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
