import { useState, FormEvent } from 'react';
import { useTodoStore } from '../store/todoStore';
import { FaPlus } from 'react-icons/fa';
import toast from 'react-hot-toast';

export const TodoForm = () => {
  const [title, setTitle] = useState('');
  const addTodo = useTodoStore((state) => state.addTodo);
  const isLoading = useTodoStore((state) => state.isLoading);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error('Todo title cannot be empty!');
      return;
    }
    try {
      await addTodo(title);
      setTitle('');
      toast.success('Todo added successfully!');
    } catch (error) {
      toast.error('Failed to add todo.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-4 mb-8">
      <div className="relative flex-grow">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs to be done?"
          className="w-full pl-4 pr-12 py-3 text-lg text-gray-800 bg-white/70 border-2 border-transparent rounded-xl shadow-lg focus:outline-none focus:ring-4 focus:ring-purple-400 focus:border-purple-500 transition-all duration-300 placeholder-gray-500"
          disabled={isLoading}
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="flex items-center justify-center px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FaPlus className="mr-2" />
        Add
      </button>
    </form>
  );
};