# Multiple Todo List Application

A scalable task management application built with React, Material UI, and IndexedDB.

This application allows users to create and manage multiple independent todo lists with persistent client-side storage.

## 🚀 Live Demo

Deployed on Vercel

(https://multiple-todo-list-app.vercel.app/)

## 🖼 Screenshots

### 🖥 Desktop View
![Desktop View](/screenshots/desktop%20view%20and%20task%20managemnt%20interface.png)

### 📱 Mobile View
![Mobile View](/screenshots/mobile%20view.png)

### ➕ Create List Dialog
![Create List Dialog](/screenshots/create%20new%20list%20dialog.png)


## 📌 Features
List Management

Create multiple todo lists

Edit list name

Select list icon (with searchable icon registry)

Delete lists (with cascade deletion of associated tasks)

Switch between active lists

Persistent storage across page refresh

Task Management

Add tasks inside each list

Edit task text inline

Delete tasks

Toggle task completion

Visual completion styling

Persistent state using IndexedDB

## 🏗 Architecture

This project was built using a responsibility-based architecture with clear separation of concerns:

UI Layer        → Presentation & Components  
State Layer     → Context + Reducer  
Persistence     → IndexedDB service layer  
Hooks           → Business logic abstraction  
Utils           → Shared helpers  

Development followed a vertical feature-driven approach, where each feature touched all layers of the application before moving to the next.

## 🧠 Technical Concepts Practiced

React Context API

useReducer state management

IndexedDB (client-side database)

Optimistic UI updates

Cascade deletion using IndexedDB cursor

Feature-driven development workflow

Separation of concerns

Component-based architecture

## 🛠 Tech Stack

React

Vite

Material UI (MUI)

IndexedDB

React Context API

JavaScript (ES6+)

Vercel (Deployment)

## 💾 Persistence Strategy

All data is stored locally using IndexedDB, meaning:

No backend server required

Data survives page refresh

Each list maintains its own isolated tasks

Cascade deletion ensures data consistency

## Project Structure

```
src/
├── app/
├── domains/
│   └── todo/
├── hooks/
├── services/
├── ui/
├── utils/
```

The structure was intentionally designed to scale.

## 📈 What This Project Demonstrates

This project emphasizes:

Architectural planning before implementation

Scalable state management

Clean data flow between layers

Real-world development workflow

Documentation-driven learning

## 🧪 Future Improvements

Drag & drop task reordering

Due dates and reminders

Cloud sync version

PWA support

👤 Author

Abdul-Hameed Zubair
⚜️ InFi-Knight ⚜️
