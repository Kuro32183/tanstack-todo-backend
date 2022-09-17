const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();

const port = 3001;

app.use(cors());
app.use(express.json());

const prisma = new PrismaClient();

app.get('/todos', async (req, res) => {
  // return res.status(500).json({ message: 'Internal Server Error From Server' });
  const todos = await prisma.todo.findMany();
  return res.json(todos);
});

app.post('/todos/create', async (req, res) => {
  // return res.status(400).json({ message: 'name is required' });

  const { name } = req.body;
  const todo = await prisma.todo.create({
    data: {
      name,
      isCompleted: false,
    },
  });
  return res.json(todo);
});

app.delete('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const todo = await prisma.todo.delete({
    where: {
      id: Number(id),
    },
  });
  return res.json(todo);
});

app.patch('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { isCompleted } = req.body;
  const todo = await prisma.todo.update({
    where: {
      id: Number(id),
    },
    data: {
      isCompleted,
    },
  });
  return res.json(todo);
});

app.use((req, res, next) => {
  res.status(404).json({
    message: 'Oops! Something is wrong.',
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));