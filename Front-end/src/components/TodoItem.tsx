import { Todo } from '../interface/todo.interface';
import { useTodoStore } from '../store/todoStore';
import { FaTrash, FaEdit, FaCheck } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import toast from 'react-hot-toast';

interface TodoItemProps {
  todo: Todo;
  onEdit: (todo: Todo) => void;
}

export const TodoItem = ({ todo, onEdit }: TodoItemProps) => {
  const { removeTodo, toggleTodo } = useTodoStore();

  const handleDelete = async () => {
    try {
      await removeTodo(todo.id);
      toast.success('Todo removed!');
    } catch (error) {
      toast.error('Failed to remove todo.');
    }
  };

  const handleToggle = async () => {
    try {
      await toggleTodo(todo.id, !todo.completed);
      toast.success(`Todo marked as ${!todo.completed ? 'complete' : 'incomplete'}!`);
    } catch (error) {
      toast.error('Failed to update todo status.');
    }
  };

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3, type: 'spring' }}
      className="flex items-center p-4 bg-white/60 backdrop-blur-sm rounded-xl shadow-md border border-white/30"
    >
      <button
        onClick={handleToggle}
        className={cn(
          'flex items-center justify-center w-7 h-7 rounded-full border-2 transition-all duration-300 mr-4 flex-shrink-0',
          todo.completed
            ? 'bg-green-400 border-green-500 text-white'
            : 'border-gray-400 hover:border-green-400'
        )}
        aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
      >
        {todo.completed && <FaCheck size={14} />}
      </button>
      <span
        className={cn(
          'flex-grow text-gray-800 text-lg transition-all duration-300',
          todo.completed ? 'line-through text-gray-500' : ''
        )}
      >
        {todo.title}
      </span>
      <div className="flex items-center gap-2 ml-4">
        <button
          onClick={() => onEdit(todo)}
          className="p-2 text-blue-500 hover:text-blue-700 hover:bg-blue-100 rounded-full transition-colors duration-200"
          aria-label="Edit todo"
        >
          <FaEdit size={18} />
        </button>
        <button
          onClick={handleDelete}
          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-full transition-colors duration-200"
          aria-label="Delete todo"
        >
          <FaTrash size={18} />
        </button>
      </div>
    </motion.li>
  );
};