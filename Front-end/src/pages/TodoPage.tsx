import { useEffect } from 'react';
import { TodoForm } from '../components/TodoForm';
import { TodoList } from '../components/TodoList';
import { useTodoStore } from '../store/todoStore';
import { Spinner } from '../components/ui/Spinner';
import { FaTasks } from 'react-icons/fa';
import toast from 'react-hot-toast';

const TodoPage = () => {
  const { fetchTodos, isLoading, error } = useTodoStore();

  useEffect(() => {
    fetchTodos().catch(err => {
      console.error("Failed to fetch todos:", err);
      toast.error("Could not load your todos. Please try again later.");
    });
  }, [fetchTodos]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 via-purple-100 to-pink-200 bg-gradient-animated p-4 sm:p-6 lg:p-8">
      <main className="max-w-2xl mx-auto">
        <header className="text-center my-8">
          <div className="inline-block p-4 bg-white/50 rounded-full shadow-lg mb-4">
            <FaTasks className="text-5xl text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500" />
          </div>
          <h1 className="text-5xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 pb-2">
            Vibrant Todos
          </h1>
          <p className="text-lg text-gray-600">
            Organize your day with a splash of color!
          </p>
        </header>

        <TodoForm />

        {isLoading && <Spinner />}
        {error && <p className="text-center text-red-500 bg-red-100 p-4 rounded-lg">{error}</p>}
        {!isLoading && !error && <TodoList />}
      </main>
    </div>
  );
};

export default TodoPage;