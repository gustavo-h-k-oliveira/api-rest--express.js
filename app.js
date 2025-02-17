const express = require('express');
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');
const userV1 = require('./routes/v1/users');
const User = require('./models/User');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Connected to MongoDB!'))
.catch(err => console.error('Connection error:', err));

app.use(express.json());
app.use('/v1/users', userV1);

app.get('/', (req, res) => {
    res.send('Hello World! 👋');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

// Lista de usuários incial (simulação de um banco de dados) 
let users = [
    { id: 1, name: 'John Doe', email: 'john.doe@email.com' },
    { id: 2, name: 'Mary Lee', email: 'mary.lee@email.com' },
];

// GET /users (Listar usuários com paginação)
app.get('/users', async (req, res) => {
    try {
        // Obtém os parâmetros de consulta 'page' e 'size' da URL, ou define valores padrão se não forem fornecidos
        const page = parseInt(req.query.page) || 1;
        const size = parseInt(req.query.size) || 10;
        const skip = (page - 1) * size;

        // Busca usuários no banco de dados com paginação
        const users = await User.find()
            .skip(skip)
            .limit(size);

        // Conta o número total de documentos na coleção de usuários
        const total = await User.countDocuments();

        // Retorna os usuários paginados e informações de paginação no formato JSON
        res.json({
            data: users,
            pagination: {
                page,
                size,
                total,
            },
        });

    } catch (err) {
        // Retorna um erro 500 em caso de falha na busca de usuários
        res.status(500).json({ error: "Error searching for users." });
    }
});

// POST /users (Criar novo usuário)
app.post('/users', async (req, res) => {
    try {
        const { name, email } = req.body;
        const newUser = new User({ name, email });
        await newUser.save();

        res.status(201).json(newUser);
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ error: 'Email already exists' });
        } else {
            res.status(500).json({ error: 'Error creating user' });
        }
    }
});

// Tratamento de erro
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') { // Erro de validação do Mongoose
        return res.status(400).json({ 
            error: {
                code: 'VALIDATION_ERROR',
                details: Object.values(err.errors).map(e => e.message),
            },
        });
    }
    res.status(500).json({ error: 'Internal Server Error' });
});
