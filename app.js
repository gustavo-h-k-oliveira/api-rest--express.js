const express = require('express');
const userV1 = require('./routes/v1/users');
const app = express();
const port = 3000;

app.use(express.json());
app.use('/v1/users', userV1);

app.get('/', (req, res) => {
    res.send('Hello World! 👋');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

let users = [
    { id: 1, name: 'John Doe', email: 'john.doe@email.com' },
    { id: 2, name: 'Mary Lee', email: 'mary.lee@email.com' },
];

// GET /users (Listar todos os usuários)
app.get('/users', (req, res) => {
    // Obtém os parâmetros de consulta 'page' e 'size' da URL, ou define valores padrão se não forem fornecidos
    const page = parseInt(req.query.page) || 1;
    const size = parseInt(req.query.size) || 10;

    // Calcula o índice inicial para a paginação
    const startIndex = (page - 1) * size;

    // Seleciona os usuários para a página atual
    const paginatedUsers = users.slice(startIndex, startIndex + size);
  
    // Retorna os usuários paginados e informações de paginação no formato JSON
    res.json({
        data: paginatedUsers,
        pagination: {
            page,
            size,
            total: users.length,
        },
    });
});

// POST /users (Criar novo usuário)
app.post('/users', (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name,
        email: req.body.email,
    };
    users.push(newUser);
    res.status(201).json(newUser); // 201 = Created
});


