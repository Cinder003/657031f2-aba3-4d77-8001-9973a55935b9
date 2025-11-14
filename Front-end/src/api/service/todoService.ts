import axios from 'axios';
import { Todo } from '../../interface/todo.interface';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getTodos = async (): Promise<Todo[]> => {
  const response = await apiClient.get('/todos');
  return response.data;
};

export const createTodo = async (title: string): Promise<Todo> => {
  const response = await apiClient.post('/todos', { title });
  return response.data;
};

export const updateTodo = async (id: number, data: Partial<Todo>): Promise<Todo> => {
  const response = await apiClient.put(`/todos/${id}`, data);
  return response.data;
};

export const deleteTodo = async (id: number): Promise<void> => {
  await apiClient.delete(`/todos/${id}`);
};

export const clearCompletedTodos = async (): Promise<void> => {
    await apiClient.post('/todos/clear-completed');
};