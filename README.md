## Description 📖
A Todo List Web App

## ScreenShot 📸
<!-- ![](images/ss02.png) -->
![](images/ss03.png)


## Demos 🖥️
[Live Demo](https://todo-express-mongo.herokuapp.com/)  🚀

## API 
Method|Endpoint|Results
-|-|-
GET|/api/tasks/|[{...},{...}, ...,{...}]
GET|/api/task/:id| {...}
DELETE|/api/tasks/:id| {status: 'task deleted'}
POST|/api/tasks| {status: 'task added'}
PUT|/api/tasks/:id| {status: 'tasks updated'}
PUT|/api/tasks/addLike| {status: 'like added}

## Tools 🧰

- Express
- EJS
- MongoDB
- Mongo-Atlas
- Mongoose
- ESLinter

## Features: 📑
- Create New Task
- Read all Tasks
- Update Task
- Delete Task
- Flip Task State
- Add Like
- ~Sort by Likes~
- Sort by Position
