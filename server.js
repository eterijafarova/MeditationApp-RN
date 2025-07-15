import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"; // Импортируем bcrypt

const app = express();
app.use(cors());
app.use(bodyParser.json());

const users = [];
const SECRET = "k9v8g7pZ2wA0fHqXb3vV9uP1h3l6FvV9yYh7dP2R";

// Регистрация
app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  if (users.find((u) => u.email === email)) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Хешируем пароль
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = { id: Date.now(), email, password: hashedPassword };
  users.push(user);

  const token = jwt.sign({ id: user.id, email }, SECRET, { expiresIn: "1d" });
  res.json({ token });
});

// Логин
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email);
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  // Проверяем хеш пароля
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user.id, email }, SECRET, { expiresIn: "1d" });
  res.json({ token });
});

// Профиль
app.get("/profile", (req, res) => {
  const auth = req.headers.authorization;
  const token = auth?.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET);
    const user = users.find((u) => u.id === decoded.id);
    res.json(user);
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
});

// Сервер работает на порту 3000
app.listen(3000, () => console.log("Server running on http://localhost:3000"));
