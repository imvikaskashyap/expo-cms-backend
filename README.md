# CMS Server (Node.js + Express)

Backend API server for the Expo Stand Services CMS project.

This server provides:
- Authentication (JWT)
- CRUD for Posts & Pages
- Media Uploads
- Public APIs for the website
- Admin APIs for the dashboard

---

## Tech Stack
- Node.js
- Express.js
- MySQL
- Sequelize ORM
- JWT Authentication
- Multer (File Uploads)
- Joi (Validation)

---

## Requirements
- Node.js latest
- MySQL 8+

---

## Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment File
Create a `.env` file from `.env.example`:

```env
PORT=4000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=cms_db
JWT_SECRET=your_secret_key
UPLOAD_DIR=uploads
```

### 3. Create Database
From PowerShell or terminal:

```bash
mysql -u root -p
```

```sql
CREATE DATABASE cms_db;
USE cms_db;
```

Tables will be created automatically by Sequelize (if sync is enabled),  
or you can import the provided SQL file.

---

## Run Server

```bash
npm run dev
# or
npm start
```

Server will run at:
```
http://localhost:4000
```

Running Check:
```
GET /running
```

---

## API Base

All APIs are prefixed with:
```
/api/v1
```

Example:
```
GET http://localhost:4000/api/v1/public/posts
```

---

## Default Admin

```
Email: admin@example.com
Password: Admin@123
```

---

## Notes
- This server is used by both the Admin Panel and the Public Website.
- Media files are served from the `/uploads` directory.
