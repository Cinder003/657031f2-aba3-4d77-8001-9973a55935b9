import { Request, Response } from 'express';
import prisma from '../config/db.config';
import { logger } from '../utils/logger';

export const getAllTodos = async (req: Request, res: Response) => {
  try {
    const todos = await prisma.todo.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    });
    res.status(200).json(todos);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: 'Error fetching todos' });
  }
};

export const createTodo = async (req: Request, res: Response) => {
  try {
    const { title } = req.body;
    const newTodo = await prisma.todo.create({
      data: {
        title,
      },
    });
    res.status(201).json(newTodo);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: 'Error creating todo' });
  }
};

export const getTodoById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const todo = await prisma.todo.findUnique({
      where: { id: Number(id) },
    });
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.status(200).json(todo);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: 'Error fetching todo' });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;
    const updatedTodo = await prisma.todo.update({
      where: { id: Number(id) },
      data: {
        title,
        completed,
      },
    });
    res.status(200).json(updatedTodo);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: 'Error updating todo' });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.todo.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: 'Error deleting todo' });
  }
};

export const clearCompletedTodos = async (req: Request, res: Response) => {
    try {
        await prisma.todo.deleteMany({
            where: {
                completed: true,
            },
        });
        res.status(204).send();
    } catch (error) {
        logger.error(error);
        res.status(500).json({ message: 'Error clearing completed todos' });
    }
};