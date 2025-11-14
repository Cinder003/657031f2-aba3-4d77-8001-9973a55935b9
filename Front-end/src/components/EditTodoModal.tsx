import { useState, FormEvent } from 'react';
import { Todo } from '../interface/todo.interface';
import { useTodoStore } from '../store/todoStore';
import { Modal } from './ui/Modal';
import { FaSave } from 'react-icons/fa';
import toast from 'react-hot-toast';

interface EditTodoModalProps {
  todo: Todo;
  onClose: () => void;
}

export const EditTodoModal = ({ todo, onClose }: EditTodoModalProps) => {
  const [title, setTitle] = useState(todo.title);
  const updateTodo = useTodoStore((state) => state.updateTodo);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error('Title cannot be empty!');
      return;
    }
    if (title.trim() === todo.title) {
      onClose();
      return;
    }
    try {
      await updateTodo(todo.id, { title });
      toast.success('Todo updated successfully!');
      onClose();
    } catch (error) {
      toast.error('Failed to update todo.');
    }
  };

  return (
    <Modal title="Edit Todo" onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="edit-title" className="block text-lg font-medium text-gray-700 mb-2">
            Todo Title
          </label>
          <input
            id="edit-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 text-lg text-gray-800 bg-white/80 border-2 border-gray-300 rounded-xl shadow-inner focus:outline-none focus:ring-4 focus:ring-purple-400 focus:border-purple-500 transition-all duration-300"
            autoFocus
          />
        </div>
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 text-lg font-semibold text-gray-700 bg-gray-200 rounded-xl hover:bg-gray-300 transition-colors duration-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex items-center justify-center px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            <FaSave className="mr-2" />
            Save Changes
          </button>
        </div>
      </form>
    </Modal>
  );
};