// src/hooks/useTodoLists.js
import { useContext } from 'react';
import { TodoContext } from '../domains/todo/TodoContext';
import { TodoActionTypes } from '../domains/todo/todo.types';
import {
  selectLists,
  selectActiveListId,
  selectActiveList,
  selectItems,
} from '../domains/todo/todo.selectors';
import { addList, addItem, updateItem, deleteItem, deleteListCascade, updateList } from '../services/indexedDb';
import { generateId } from '../utils/id';
import { DEFAULT_ICON_KEY } from '../ui/icons/iconRegistry';

export function useTodoLists() {
  const context = useContext(TodoContext);
  if (!context) throw new Error('useTodoLists must be used inside TodoProvider');

  const { state, dispatch } = context;

  const createList = async (name, iconKey = DEFAULT_ICON_KEY) => {
    const newList = {
      id: generateId(),
      name,
      iconKey,
      createdAt: Date.now(),
    };

    await addList(newList);

    dispatch({ type: TodoActionTypes.ADD_LIST, payload: newList });
    dispatch({ type: TodoActionTypes.SET_ACTIVE_LIST, payload: newList.id, });
  };


  const setActiveList = listId => {
    dispatch({
      type: TodoActionTypes.SET_ACTIVE_LIST,
      payload: listId,
    });
  };

  const removeList = async (listId) => {
    // Decide next active list BEFORE dispatch (so reducer can handle it cleanly)
    const remaining = state.lists.filter(l => l.id !== listId);

    const nextActiveListId =
      state.activeListId === listId
        ? (remaining[0]?.id ?? null)
        : state.activeListId;

    // optimistic UI update
    dispatch({
      type: TodoActionTypes.DELETE_LIST,
      payload: { id: listId, nextActiveListId },
    });

    // persist (cascade)
    await deleteListCascade(listId);

    // optional: if we deleted the active list and nextActiveListId is null,
    // the Context effect won't load items anyway; items already cleared in reducer.
  };

  const updateActiveList = async ({ name, iconKey }) => {
    const current = state.lists.find(l => l.id === state.activeListId);
    if (!current) return;

    const updated = {
      ...current,
      name: name.trim(),
      iconKey,
    };

    // optimistic
    dispatch({
      type: TodoActionTypes.UPDATE_LIST,
      payload: updated,
    });

    // persist
    await updateList(updated);
  };


  const createItem = async text => {
    const newItem = {
      id: generateId(),
      listId: state.activeListId,
      text,
      completed: false,
      createdAt: Date.now(),
    };

    await addItem(newItem);

    dispatch({ type: TodoActionTypes.ADD_ITEM, payload: newItem });
  };

  const toggleItem = async item => {
  const updatedItem = {
    ...item,
    completed: !item.completed,
  };

  // optimistic update
  dispatch({
    type: TodoActionTypes.TOGGLE_ITEM,
    payload: item.id,
  });

  // persist
  await updateItem(updatedItem);
};

  const removeItem = async itemId => {
    // optimistic update
    dispatch({
      type: TodoActionTypes.DELETE_ITEM,
      payload: itemId,
    });

    // persist
    await deleteItem(itemId);
  };

  const updateItemText = async (item, newText) => {
    const text = newText.trim();
    if (!text) return; // keep it simple: no empty text

    // optimistic state update
    dispatch({
      type: TodoActionTypes.UPDATE_ITEM_TEXT,
      payload: { id: item.id, text },
    });

    // persist
    await updateItem({ ...item, text });
  };

  return {
    lists: selectLists(state),
    activeList: selectActiveList(state),
    activeListId: selectActiveListId(state),
    items: selectItems(state),
    createList,
    setActiveList,
    removeList,
    updateActiveList,
    createItem,
    toggleItem,
    removeItem,
    updateItemText,
  };
}
