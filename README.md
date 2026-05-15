Actividad 2.6: Integración de Componentes JavaScript Backend
Este proyecto consiste en una aplicación de Web Scraping desarrollada en Node.js que extrae información estructurada de archivos HTML (locales o remotos) utilizando Cheerio, gestiona el estado mediante Cookies y persiste la información en una base de datos MySQL.

 Características
Arquitectura por Capas: Separación clara de responsabilidades (Rutas, Controladores, Servicios y Configuración).

Web Scraping: Extracción dinámica de al menos 3 campos de datos (Nombre, Precio, Categoría).

Persistencia: Integración fluida con MySQL mediante un Pool de conexiones asíncronas.

Manejo de Estado: Uso de cookies para recordar la última búsqueda del usuario.

Interfaz Dinámica: Renderizado de resultados en tiempo real mediante el motor de plantillas EJS.

 Requisitos Previos
Node.js (v16 o superior)

XAMPP / MySQL Workbench (Módulo MySQL activo)

Extensión Thunder Client (para pruebas de API)

 Instalación
Clonar el proyecto o descargar los archivos.

Instalar dependencias:

Bash
npm install
Configurar el entorno:
Crea un archivo .env en la raíz con tus credenciales de base de datos:

Fragmento de código
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD= 66549904Fe
DB_NAME=scraping_db
Preparar la Base de Datos:
Ejecuta el siguiente script en MySQL Workbench:

SQL
CREATE DATABASE scraping_db;
USE scraping_db;
CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255),
    precio VARCHAR(100),
    categoria VARCHAR(100),
    url_fuente TEXT,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
 Uso de la Aplicación
Iniciar el servidor:

npm install express ejs cheerio mysql2 cookie-parser dotenv axios
npm start

Acceder vía Navegador: http://localhost:3000

Pruebas con Thunder Client:

Método: POST

URL: http://localhost:3000/scrape

Body (JSON): ```json
{ "url": "local" }


 Estructura del Proyecto
Plaintext
actividad_2_6_cheerio/
├── src/
│   ├── config/         # Conexión a DB (Pool de MySQL)
│   ├── controllers/    # Lógica de peticiones y gestión de cookies
│   ├── routes/         # Endpoints de la aplicación
│   ├── services/       # Scraping (Cheerio) y Consultas SQL
│   ├── views/          # Plantillas EJS (Frontend dinámico)
│   ├── app.js          # Punto de entrada y middlewares
│   └── prueba.html     # Fuente de datos local para scraping
├── .env                # Variables de entorno (Sensible)
└── package.json        # Dependencias y scripts
 Decisiones Técnicas
Cheerio: Se seleccionó por su alta velocidad y bajo consumo de memoria al no requerir un navegador completo (Headless) para procesar el DOM.

Pool de Conexiones: Se implementó para optimizar el rendimiento del servidor, permitiendo múltiples consultas concurrentes a MySQL sin bloqueos.

Manejo de Errores: Se utiliza un bloque try-catch global en el controlador para capturar fallos de red o base de datos, garantizando que el servidor responda siempre con un código HTTP adecuado (200 o 500).
