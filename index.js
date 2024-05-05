const fs = require('fs');
const express = require('express');
const path = require('path');

require('dotenv').config();

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    // Lee el contenido del archivo index.html
    fs.readFile('index.html', 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo index.html:', err);
            return res.status(500).send('Error interno del servidor');
        }
        // Reemplaza la variable de entorno en el archivo HTML
        const htmlWithKey = data.replace('MAP_KEY_PLACEHOLDER', process.env.MAP_KEY);

        // Envía el archivo HTML con la variable de entorno incrustada
        res.send(htmlWithKey);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`);
});
