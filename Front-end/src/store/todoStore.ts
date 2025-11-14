import { create } from 'zustand';
import { Todo } from '../interface/todo.interface';
import * as todoService from '../api/service/todoService';

interface TodoState {
  todos: Todo[];
  isLoading: boolean;
  error: string | null;
  fetchTodos: () => Promise<void>;
  addTodo: (title: string) => Promise<void>;
  updateTodo: (id: number, data: Partial<Todo>) => Promise<void>;
  toggleTodo: (id: number, completed: boolean) => Promise<void>;
  removeTodo: (id: number) => Promise<void>;
  clearCompleted: () => Promise<void>;
}

export const useTodoStore = create<TodoState>((set, get) => ({
  todos: [],
  isLoading: false,
  error: null,

  fetchTodos: async () => {
    set({ isLoading: true, error: null });
    try {
      const todos = await todoService.getTodos();
      set({ todos, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch todos.', isLoading: false });
      throw error;
    }
  },

  addTodo: async (title: string) => {
    set({ isLoading: true });
    try {
      const newTodo = await todoService.createTodo(title);
      set((state) => ({ todos: [...state.todos, newTodo], isLoading: false }));
    } catch (error) {
      set({ error: 'Failed to add todo.', isLoading: false });
      throw error;
    }
  },

  updateTodo: async (id: number, data: Partial<Todo>) => {
    try {
      const updatedTodo = await todoService.updateTodo(id, data);
      set((state) => ({
        todos: state.todos.map((todo) => (todo.id === id ? updatedTodo : todo)),
      }));
    } catch (error) {
      set({ error: 'Failed to update todo.' });
      throw error;
    }
  },

  toggleTodo: async (id: number, completed: boolean) => {
    get().updateTodo(id, { completed });
  },

  removeTodo: async (id: number) => {
    try {
      await todoService.deleteTodo(id);
      set((state) => ({
        todos: state.todos.filter((todo) => todo.id !== id),
      }));
    } catch (error) {
      set({ error: 'Failed to remove todo.' });
      throw error;
    }
  },

  clearCompleted: async () => {
    try {
        await todoService.clearCompletedTodos();
        set(state => ({
            todos: state.todos.filter(todo => !todo.completed)
        }));
    } catch (error) {
        set({ error: 'Failed to clear completed todos.' });
        throw error;
    }
  }
}));