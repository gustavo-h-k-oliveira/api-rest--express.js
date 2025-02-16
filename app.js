const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

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
    res.status(200).json(users);
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


