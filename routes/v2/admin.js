const bcrypt = require('bcrypt');

// Endpoint para criar usuário admin (apenas para admins autenticados)
app.post('/users/admin', authMiddleware, authorizeRoles('admin'), async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Verifica se o e-mail já existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        // Criptografa a senha
        const hashedPassword = await bcrypt.hash(password, 10);

        // Cria usuário com role 'admin'
        const newUser = new User({ name, email, password: hashedPassword, role: 'admin' });
        await newUser.save();

        // Nunca retorne a senha!
        const userResponse = {
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            createdAt: newUser.createdAt,
        };

        res.status(201).json(userResponse);
    } catch (err) {
        res.status(500).json({ error: 'Error creating admin user' });
    }
});
