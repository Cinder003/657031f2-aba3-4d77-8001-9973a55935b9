import TodoPage from './pages/TodoPage';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <TodoPage />
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: 'rgba(255, 255, 255, 0.9)',
            color: '#333',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(209, 213, 219, 0.3)',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: 'white',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: 'white',
            },
          },
        }}
      />
    </>
  );
}

export default App;