// src/domains/todo/TodoContext.jsx
import { createContext, useEffect, useReducer } from 'react';
import { todoReducer } from './todo.reducer';
import { TodoActionTypes } from './todo.types';
import { getAllLists, getItemsByListId } from '../../services/indexedDb';

export const TodoContext = createContext(null);

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, {
    lists: [],
    activeListId: null,
    items: [],
  });

  // Load lists on startup
  useEffect(() => {
    getAllLists().then(lists => {
      dispatch({ type: TodoActionTypes.SET_LISTS, payload: lists });

      if (lists.length > 0) {
        dispatch({
          type: TodoActionTypes.SET_ACTIVE_LIST,
          payload: lists[0].id,
        });
      }
    });
  }, []);

  // Load items when active list changes
  useEffect(() => {
    if (!state.activeListId) return;

    getItemsByListId(state.activeListId).then(items => {
      dispatch({
        type: TodoActionTypes.SET_ITEMS,
        payload: items,
      });
    });
  }, [state.activeListId]);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
}
