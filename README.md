## KanbanPro

Dashboard de proyecto con CRUD usando Node.js, Express y PostgreSQL.

## Tecnologías usadas

- Node.js
- Express
- Express-handlebars
- PostgreSQL
- Sequelize
- pg / pg-hstore
- dotenv
- GSAP
- Tailwind CSS
- Nodemon

## Estructura del proyecto

```
├── config/
│   └── sequelize.js
├── data/
│   └── data.json
├── models/
│   ├── index.js
│   ├── Usuario.js
│   ├── Tablero.js
│   ├── Lista.js
│   └── Tarjeta.js
├── public/
│   ├── kanban.js
│   └── style.css
├── src/
│   └── input.css
├── views/
│   ├── layouts/
│   │   └── main.hbs
│   ├── dashboard.hbs
│   ├── login.hbs
│   └── register.hbs
├── .env.example
├── .gitignore
├── app.js
├── package.json
├── README.md
├── seed.js
├── tailwind.config.js
└── test-crud.js
```

## Instalación y ejecución

1. Instalar dependencias:

```bash
npm install
```

2. Crear el archivo `.env` basándose en `.env.example` y completar con las credenciales de PostgreSQL:

```
DB_HOST=localhost
DB_PORT=5432
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=nombre_base_de_datos
```

3. Iniciar la aplicación web:

```bash
npm run dev
```

4. Crear tablas y poblar la base de datos:

```bash
npm run seed
```

5. Ejecutar pruebas CRUD sobre los modelos:

```bash
npm run test-crud
```
