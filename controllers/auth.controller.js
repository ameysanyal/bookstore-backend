const fs = require("fs/promises");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const path = require("path");

const USERS_FILE = path.join(__dirname, "../models/users.json");

const getUsers = async () => JSON.parse(await fs.readFile(USERS_FILE, "utf-8"));
const saveUsers = async (users) =>
  fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));

const authController = {
  register: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const users = await getUsers();
      if (users.find((u) => u.email === email))
        return res.status(400).json({ message: "User exists" });

      const hashed = await bcrypt.hash(password, 10);
      const user = { id: Date.now().toString(), email, password: hashed };
      users.push(user);
      await saveUsers(users);
      res.status(201).json({ message: "Registered successfully" });
    } catch (err) {
      next(err);
    }
  },

  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const users = await getUsers();
      const user = users.find((u) => u.email === email);
      if (!user || !(await bcrypt.compare(password, user.password)))
        return res.status(401).json({ message: "Invalid credentials" });

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET_KEY
      );
      res.json({ token });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = authController;
