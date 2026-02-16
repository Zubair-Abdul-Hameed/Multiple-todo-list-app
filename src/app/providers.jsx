// src/app/providers.jsx
import { TodoProvider } from '../domains/todo/TodoContext';

export function AppProviders({ children }) {
  return <TodoProvider>{children}</TodoProvider>;
}
