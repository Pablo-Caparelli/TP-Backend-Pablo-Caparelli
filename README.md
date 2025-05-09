# 📚 Book Management API - Node.js + TypeScript + Mongoose

Este proyecto permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre una colección de libros utilizando **Node.js**, **TypeScript** y **MongoDB** con **Mongoose**.

## 🚀 Tecnologías Utilizadas

- Node.js
- TypeScript
- MongoDB (Atlas o local)
- Mongoose

---

## 📦 Instalación

1. **Clona el repositorio:**

   ```bash
   git clone https://github.com/tu-usuario/book-management-api.git
   cd book-management-api
   ```

2. **Instala dependencias:**

   ```bash
   npm install
   ```

3. **Crea un archivo `.env` con tu URI de MongoDB:**

   ```env
   URI_DB=mongodb+srv://usuario:contraseña@cluster.mongodb.net/mydb?retryWrites=true&w=majority
   ```

---

## 🧠 Estructura del Proyecto

```
.
├── src/
│   ├── index.ts        # Punto de entrada
│   ├── db.ts           # Conexión a MongoDB
│   ├── models/
│   │   └── Book.ts     # Esquema y modelo de Mongoose
│   └── services/
│       └── bookService.ts # Funciones CRUD
├── .env
├── package.json
└── tsconfig.json
```

---

## ✨ Funcionalidades

### 📘 Modelo `Book`

```ts
interface IBook {
  title: string;
  author: string;
  publishedYear: number;
  gender: string;
  language: string;
  country: string;
  coverImage: string;
  available: boolean;
}
```

---

## ⚙️ Uso de Funciones (desde `main` o un controlador Express)

### ✅ Agregar un libro

```ts
const result = await addBook({
  title: "Cien años de soledad",
  author: "Gabriel García Márquez",
  publishedYear: 1967,
  gender: "Novela",
  language: "Español",
  country: "Colombia",
  coverImage: "https://link.to/image.jpg",
  available: true,
});
```

### 📚 Obtener todos los libros

```ts
const result = await getBooks();
```

### 🔍 Obtener un libro por ID

```ts
const result = await getBook("661dff09fc0b558e26de76a9");
```

### 📝 Actualizar un libro

```ts
const result = await updateBook("661dff09fc0b558e26de76a9", {
  available: false,
});
```

### ❌ Eliminar un libro

```ts
const result = await deleteBook("661dff09fc0b558e26de76a9");
```

---

## 🧪 Validaciones

- `addBook()` verifica que todos los campos sean válidos.
- El campo `available` debe ser booleano (`true` o `false`), no se acepta como vacío.
- `deleteBook()` y `updateBook()` validan si el ID es válido y retornan errores si el libro no existe.

---

## 💩 Recomendaciones de Desarrollo

- Usa `mongoose.models.Book || model(...)` para evitar redefinir el modelo en entornos con hot reload.
- Agrega pruebas automatizadas con Jest o Vitest para cada operación.
- Crea rutas REST con Express para exponer estas funciones como una API.
- Usa un validador como `zod` o `joi` si vas a aceptar datos desde el cliente.

---

## 🧹 Scripts útiles

```bash
# Ejecutar el proyecto
npx ts-node src/index.ts

# Compilar a JavaScript
npx tsc
```

---

## ✅ Ejemplo de respuesta de `deleteBook`

```json
{
  "success": true,
  "data": {
    "_id": "661dff09fc0b558e26de76a9",
    "title": "Cien años de soledad",
    "author": "Gabriel García Márquez",
    ...
  },
  "message": "Book successfully deleted"
}
```

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT.

---

## ✍️ Autor

- Desarrollado por Pablo Caparelli
- GitHub: https://github.com/Pablo-Caparelli
