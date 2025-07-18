// proxy-server/server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3001; // Uma porta diferente da do seu app React

const TARGET_URL = 'https://anonimizacao.streamlit.app';

app.use(cors());

// Rota principal para carregar o HTML da página
app.get('/', async (req, res) => {
    try {
        const response = await axios.get(TARGET_URL);
        
        // IMPORTANTE: Reescrever os caminhos relativos para absolutos do nosso proxy
        let modifiedHtml = response.data
            .replace(/src="\//g, `src="${TARGET_URL}/`)
            .replace(/href="\//g, `href="${TARGET_URL}/`);

        res.send(modifiedHtml);
    } catch (error) {
        res.status(500).send('Erro ao buscar o conteúdo do site alvo.');
        console.error(error);
    }
});

app.listen(PORT, () => {
    console.log(`Servidor proxy rodando na porta ${PORT}`);
});