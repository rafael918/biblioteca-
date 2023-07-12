const express = require('express');
const livroRota = require('./rotas/livro_rotas')
const autorRota = require('./rotas/autor_rotas')
const clienteRota = require('./rotas/cliente_rotas')
const retiradaRota = require('./rotas/retirada_rotas')

const app = express();
const PORTA = 3000;

app.use(express.json());

app.use('/livros', livroRota);
app.use('/autor', autorRota);
app.use('/clientes', clienteRota);
app.use('/retiradas', retiradaRota);

app.listen(PORTA, () => {
    console.log("Servidor iniciado com sucesso...")
})