import { Router } from 'express';
import {
  getAllTodos,
  createTodo,
  getTodoById,
  updateTodo,
  deleteTodo,
  clearCompletedTodos,
} from '../controller/todo.controller';
import validateRequest from '../middleware/validateRequest';
import { createTodoSchema, updateTodoSchema } from '../validation/todo.validation';

const router = Router();

router.get('/', getAllTodos);
router.post('/', validateRequest(createTodoSchema), createTodo);
router.post('/clear-completed', clearCompletedTodos);
router.get('/:id', getTodoById);
router.put('/:id', validateRequest(updateTodoSchema), updateTodo);
router.delete('/:id', deleteTodo);

export default router;