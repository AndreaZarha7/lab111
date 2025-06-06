const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Configuración para formato JSON consistente
app.use(express.json());
app.set('json spaces', 2); // Indentación de 2 espacios

// Clase Usuario corregida
class User {
    constructor(id, name, username, email, password, updatedAt, image, rol) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
        this.updatedAt = updatedAt;
        this.image = image;
        this.rol = rol; // Campo corregido (si antes era 'roll')
    }

    updateProfile(newData) {
        Object.keys(newData).forEach(key => {
            if (key !== 'id' && this[key] !== undefined) {
                this[key] = newData[key];
            }
        });
        this.updatedAt = new Date().toISOString();
    }
}

// Datos iniciales perfectamente estructurados
let users = [
    new User(
        1,
        'John Doe',
        'johndoe',
        'john@example.com',
        'password123',
        new Date().toISOString(),
        'john.jpg',
        'admin'
    ),
    new User(
        2,
        'Jane Smith',
        'janesmith',
        'jane@example.com',
        'password123',
        new Date().toISOString(),
        'jane.jpg',
        'user'
    ),
    new User(
        3,
        'Robert Brown',
        'robbrown',
        'robert@example.com',
        'password123',
        new Date().toISOString(),
        'robert.jpg',
        'user'
    )
];

// Middleware para headers consistentes
app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
});

// Ruta principal
app.get('/', (req, res) => {
    res.json({
        message: 'API desarrollada por Andrea Anivarro',
        endpoints: {
            users: '/users',
            userById: '/users/:id'
        }
    });
});

// GET /users - Versión corregida
app.get('/users', (req, res) => {
    res.json(users);
});

// GET /users/:id - Versión mejorada
app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) {
        return res.status(404).json({
            error: 'Usuario no encontrado',
            details: `No existe usuario con ID ${req.params.id}`
        });
    }
    res.json(user);
});

// POST /users
app.post('/users', (req, res) => {
    const { name, username, email, password, image, rol } = req.body;
    const newUser = new User(
        users.length + 1,
        name,
        username,
        email,
        password,
        new Date().toISOString(),
        image || 'default.jpg',
        rol || 'user'
    );
    users.push(newUser);
    res.status(201).json(newUser);
});

// PUT /users/:id
app.put('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) {
        return res.status(404).json({
            error: 'Usuario no encontrado',
            details: `No existe usuario con ID ${req.params.id}`
        });
    }
    user.updateProfile(req.body);
    res.json(user);
});

// DELETE /users/:id
app.delete('/users/:id', (req, res) => {
    const initialLength = users.length;
    users = users.filter(u => u.id !== parseInt(req.params.id));
    
    if (users.length === initialLength) {
        return res.status(404).json({
            error: 'Usuario no encontrado',
            details: `No existe usuario con ID ${req.params.id}`
        });
    }
    res.status(204).end();
});

// Manejo de errores global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Error interno del servidor',
        details: err.message
    });
});

// Inicio del servidor
app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo por Andrea Anivarro en http://localhost:${PORT}`);
});
