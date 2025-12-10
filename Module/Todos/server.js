import express from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "db.json");

const app = express();
app.use(express.json());

const readUsers = () => {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
};

app.get("/", (req, res) => {
  const todos = readUsers();
  res.json(todos);
});

app.post("/", (req, res) => {
  const todos = readUsers();
  todos.push(req.body);
  fs.writeFileSync(filePath, JSON.stringify(todos, null, 2));
  res.json({ msg: "todos inserted successfully!!" });
});

app.put("/:id", (req, res) => {
  const todos = readUsers();
  const id = parseInt(req.params.id);
  const index = todos.findIndex((todo) => todo.id === id);

  if (index === -1) {
    return res.status(404).json({ msg: "Todo not found!" });
  }

  todos[index] = { ...todos[index], ...req.body };
  fs.writeFileSync(filePath, JSON.stringify(todos, null, 2));
  res.json({ msg: "Todo updated successfully!", updatedTodo: todos[index] });
});

app.delete("/:id", (req, res) => {
  const todos = readUsers();
  const id = parseInt(req.params.id);

  const exists = todos.some((todo) => todo.id === id);

  if (!exists) {
    return res.status(404).json({ msg: "Todo not found!" });
  }

  const filteredTodos = todos.filter((todo) => todo.id !== id);

  fs.writeFileSync(filePath, JSON.stringify(filteredTodos, null, 2));

  res.json({ msg: "Todo deleted successfully!" });
});

app.get("/search", (req, res) => {
    const todos = readUsers();
  
    const { status, dueDate, title } = req.query;
  
    let result = todos;
  

    if (status) {
      result = result.filter(todo => todo.status.toLowerCase() === status.toLowerCase());
    }
 
    if (dueDate) {
      result = result.filter(todo => todo.dueDate === dueDate);
    }
  
    if (title) {
      result = result.filter(todo =>
        todo.title.toLowerCase().includes(title.toLowerCase())
      );
    }
  
    res.json(result);
  });
  

app.listen(1010, () => {
  console.log("server started successfully!!");
});
