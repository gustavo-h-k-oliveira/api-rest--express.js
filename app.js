const express = require('express');
const { body, validationResult } = require('express-validator');
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

// Lista de usuários incial (simulação de um banco de dados) 
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

    // Cria um DTO (Data Transfer Object) para retornar apenas os nomes dos usuários
    const userNames = paginatedUsers.map(user => user.name);
  
    // Retorna os nomes dos usuários paginados e informações de paginação no formato JSON
    res.json({
        data: userNames,
        pagination: {
            page,
            size,
            total: users.length,
        },
    });
});

// POST /users (Criar novo usuário)
app.post(
    '/users', 
    [
        // Middleware de validação para verificar se o campo 'email' é um endereço de e-mail válido
        body('email').isEmail().withMessage('Invalid email address'),
    ],
    (req, res) => {
        // Obtém os erros de validação da solicitação
        const errors = validationResult(req);
        // Se houver erros de validação, retorna uma resposta com status 400 (Bad Request) e os erros em formato JSON
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Cria um novo objeto de usuário com um ID único, nome e e-mail fornecidos no corpo da solicitação
        const newUser = {
            id: users.length + 1,
            name: req.body.name,
            email: req.body.email,
        };
        // Adiciona o novo usuário à lista de usuários
        users.push(newUser);
        // Retorna uma resposta com status 201 (Created) e os dados do novo usuário em formato JSON
        res.status(201).json(newUser);
    }
);

// Tratamento de erro
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: {
            code: "SERVER_ERROR",
            message: 'Internal Server Error',
        },
    });
});
