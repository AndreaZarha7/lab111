const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000; // Usa puerto dinámico para Render

// Middleware para parsear JSON
app.use(express.json());

// Clase Usuario
class User {
    constructor(id, name, username, email, password, updatedAt, image, rol) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
        this.updatedAt = updatedAt;
        this.image = image;
        this.rol = rol;
    }

    updateProfile(newData) {
        if (newData.name) this.name = newData.name;
        if (newData.username) this.username = newData.username;
        if (newData.email) this.email = newData.email;
        if (newData.image) this.image = newData.image;
        this.updatedAt = new Date();
    }

    passwordValid(inputPassword) {
        return this.password === inputPassword;
    }
}

// Datos en memoria
let users = [
    new User(1, 'John Doe', 'johndoe', 'john@example.com', 'password123', new Date(), 'john.jpg', 'admin'),
    new User(2, 'Jane Smith', 'janesmith', 'jane@example.com', 'password123', new Date(), 'jane.jpg', 'user'),
    new User(3, 'Robert Brown', 'robbrown', 'robert@example.com', 'password123', new Date(), 'robert.jpg', 'user')
];

// Ruta principal con tu nombre
app.get('/', (req, res) => {
    res.send('API desarrollada por Andrea Anivarro');
});

// Endpoints CRUD

// Obtener todos los usuarios
app.get('/users', (req, res) => {
    res.json(users);
});

// Obtener usuario por ID
app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id == req.params.id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'Usuario no encontrado' });
    }
});

// Crear nuevo usuario
app.post('/users', (req, res) => {
    const { name, username, email, password, image, rol } = req.body;
    const newUser = new User(
        users.length + 1,
        name,
        username,
        email,
        password,
        new Date(),
        image,
        rol || 'user' // Valor por defecto
    );
    users.push(newUser);
    res.status(201).json(newUser);
});

// Actualizar usuario
app.put('/users/:id', (req, res) => {
    const user = users.find(u => u.id == req.params.id);
    if (user) {
        user.updateProfile(req.body);
        res.json(user);
    } else {
        res.status(404).json({ message: 'Usuario no encontrado' });
    }
});

// Eliminar usuario
app.delete('/users/:id', (req, res) => {
    users = users.filter(u => u.id != req.params.id);
    res.status(204).send();
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo por Andrea Anivarro en http://localhost:${PORT}`);
});


