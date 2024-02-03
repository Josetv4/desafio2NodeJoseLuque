const express = require("express");
const app = express();
const fs = require("fs");
const cors = require('cors')

app.listen(3000, () => console.log("¡Servidor encendido, para desafío 2 Node Express!"));

app.use(cors());
app.use(express.json());

app.get("/canciones", (req, res) => {
    const canciones = JSON.parse(fs.readFileSync("repertorio.json", "utf-8"));
    res.json(canciones);
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/canciones", (req, res) => {
    const cancion = req.body;
    const canciones = JSON.parse(fs.readFileSync("repertorio.json", "utf-8"));

    canciones.push(cancion);
    fs.writeFileSync("repertorio.json", JSON.stringify(canciones, null, 2));

    res.send("Canción agregada con éxito!");
});

app.put("/canciones/:id", (req, res) => {
    const { id } = req.params;
    const cancion = req.body;
    const canciones = JSON.parse(fs.readFileSync("repertorio.json", "utf-8"));
    const index = canciones.findIndex((p) => p.id == id);
    
    if (index !== -1) {
        canciones[index] = cancion;
        fs.writeFileSync("repertorio.json", JSON.stringify(canciones, null, 2));
        res.send("Canción modificada con éxito");
    } else {
        res.status(404).send("Canción no encontrada");
    }
});

app.delete("/canciones/:id", (req, res) => {
    const { id } = req.params;

    const canciones = JSON.parse(fs.readFileSync("repertorio.json", "utf-8"));
    const index = canciones.findIndex((p) => p.id == id);

    if (index !== -1) {
        canciones.splice(index, 1);
        fs.writeFileSync("repertorio.json", JSON.stringify(canciones, null, 2));
        res.send("Canción eliminada con éxito");
    } else {
        res.status(404).send("Canción no encontrada");
    }
});
