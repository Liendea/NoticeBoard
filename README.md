# Notice Board

A full-stack to-do list app with drag-and-drop reordering and priority management. Notes are displayed as post-its on a board and can be organized, searched, and updated in real time.

<img width="3374" height="1816" alt="bild" src="https://github.com/user-attachments/assets/1b72b0f5-89a4-4f67-acb6-0fc3529d39da" />

## Tech Stack

**Frontend**
- React 19 + TypeScript
- Vite
- dnd-kit (drag-and-drop)

**Backend**
- Node.js + Express 5
- TypeScript
- MongoDB + Mongoose

## Features

- Create post-it style notes with a title, description, and priority level
- Three priority levels — Low, Medium, High — each with a distinct color
- Mark notes as done
- Edit notes inline (title, description, and priority)
- Drag and drop to reorder notes on the board
- Search notes by title or description
- See how many notes are currently visible vs. the total count

## Project Structure

```
notice-board/
├── backend/     # Express REST API
└── frontend/    # React client
```

## Getting Started

### Prerequisites

- Node.js
- A MongoDB connection URI (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

### 1. Clone the repository

```bash
git clone <repo-url>
cd notice-board
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file based on the example:

```bash
cp .env.example .env
```

Fill in your values:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

Start the development server:

```bash
npm run dev
```

### 3. Set up the frontend

```bash
cd frontend
npm install
npm run dev
```

The app will be containerized using Docker and deployed to AWS or GCP via GitHub Actions.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/todos` | Get all todos |
| GET | `/todos/count` | Get total and visible count |
| POST | `/todos` | Create a new todo |
| PUT | `/todos/:id` | Update a todo |
| DELETE | `/todos/:id` | Delete a todo |

## Author

Linda
