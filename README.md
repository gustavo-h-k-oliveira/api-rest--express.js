# API REST com Express.js

Este projeto é uma API RESTful construída com Express.js e MongoDB. Abaixo estão as funcionalidades implementadas:

## Funcionalidades

- [x] **Conexão com o MongoDB**: Utiliza o `mongoose` para conectar a um banco de dados MongoDB.
- [x] **Versionamento de API**: Rota `/v1/users` implementada para a versão 1 da API.
- [x] **Listar usuários com paginação**: Endpoint `GET /users` que retorna uma lista de usuários com suporte a paginação.
- [x] **Criar novo usuário**: Endpoint `POST /users` para criar um novo usuário no banco de dados.
- [x] **Validação de dados**: Validação de dados de entrada utilizando `express-validator` e validações do `mongoose`.
- [x] **Tratamento de erros**: Middleware para tratamento de erros, incluindo erros de validação e erros internos do servidor.

## Funcionalidades Sugeridas

- [ ] **Autenticação e Autorização**: Implementar autenticação de usuários usando JWT e middleware para proteger rotas.
- [ ] **Atualização e Exclusão de Usuários**: Adicionar endpoints para atualizar (`PUT /users/:id`) e excluir (`DELETE /users/:id`) usuários.
- [ ] **Validação Avançada de Dados**: Usar `express-validator` para validação e sanitização de dados de entrada.
- [ ] **Upload de Arquivos**: Permitir upload de arquivos, como fotos de perfil, utilizando `multer`.
- [ ] **Logs de Atividade**: Registrar atividades como criação, atualização e exclusão de usuários usando `winston` ou `morgan`.
- [ ] **Documentação da API**: Criar documentação interativa com `swagger-ui-express` ou `openapi`.
- [ ] **Testes Automatizados**: Escrever testes para endpoints usando `jest` e `supertest`.
- [ ] **Filtros e Ordenação**: Adicionar filtros e ordenação na listagem de usuários.
- [ ] **Sistema de Paginação Melhorado**: Implementar links de navegação para facilitar a paginação.
- [ ] **Deploy**: Fazer o deploy do projeto em plataformas como Heroku, Vercel ou AWS.
