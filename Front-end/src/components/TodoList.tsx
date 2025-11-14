import { useMemo, useState } from 'react';
import { useTodoStore } from '../store/todoStore';
import { TodoItem } from './TodoItem';
import { AnimatePresence, motion } from 'framer-motion';
import { Todo } from '../interface/todo.interface';
import { EditTodoModal } from './EditTodoModal';
import { FaList, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { cn } from '../lib/utils';
import toast from 'react-hot-toast';

type FilterStatus = 'all' | 'active' | 'completed';

export const TodoList = () => {
  const todos = useTodoStore((state) => state.todos);
  const clearCompleted = useTodoStore((state) => state.clearCompleted);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [filter, setFilter] = useState<FilterStatus>('all');

  const filteredTodos = useMemo(() => {
    if (filter === 'active') {
      return todos.filter((todo) => !todo.completed);
    }
    if (filter === 'completed') {
      return todos.filter((todo) => todo.completed);
    }
    return todos;
  }, [todos, filter]);

  const activeCount = useMemo(() => todos.filter((t) => !t.completed).length, [todos]);
  const completedCount = todos.length - activeCount;

  const handleClearCompleted = async () => {
    if (completedCount === 0) return;
    try {
      await clearCompleted();
      toast.success('Cleared completed todos!');
    } catch (error) {
      toast.error('Failed to clear completed todos.');
    }
  };

  const FilterButton = ({
    status,
    label,
    icon: Icon,
  }: {
    status: FilterStatus;
    label: string;
    icon: React.ElementType;
  }) => (
    <button
      onClick={() => setFilter(status)}
      className={cn(
        'flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300',
        filter === status
          ? 'bg-white/80 text-purple-600 shadow-md'
          : 'text-gray-600 hover:bg-white/50'
      )}
    >
      <Icon />
      {label}
    </button>
  );

  return (
    <div className="bg-white/30 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-white/40">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
        <div className="flex items-center gap-2 p-2 bg-white/40 rounded-xl">
          <FilterButton status="all" label="All" icon={FaList} />
          <FilterButton status="active" label="Active" icon={FaTimesCircle} />
          <FilterButton status="completed" label="Completed" icon={FaCheckCircle} />
        </div>
        <span className="text-gray-700 font-medium">{activeCount} items left</span>
      </div>

      {filteredTodos.length > 0 ? (
        <ul className="space-y-3">
          <AnimatePresence>
            {filteredTodos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} onEdit={setEditingTodo} />
            ))}
          </AnimatePresence>
        </ul>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-10 text-gray-600"
        >
          <p className="text-lg">
            {filter === 'completed' ? 'No completed tasks yet!' : 'Your todo list is empty!'}
          </p>
        </motion.div>
      )}

      {completedCount > 0 && (
        <div className="mt-6 text-center">
          <button
            onClick={handleClearCompleted}
            className="px-6 py-2 text-red-600 font-semibold bg-white/70 rounded-lg shadow-md hover:bg-red-100 hover:text-red-700 transition-all duration-300"
          >
            Clear Completed ({completedCount})
          </button>
        </div>
      )}

      <AnimatePresence>
        {editingTodo && (
          <EditTodoModal
            todo={editingTodo}
            onClose={() => setEditingTodo(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};