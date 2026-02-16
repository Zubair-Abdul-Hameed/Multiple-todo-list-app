// src/domains/todo/todo.reducer.js
import { TodoActionTypes } from './todo.types';

export function todoReducer(state, action) {
  switch (action.type) {
    case TodoActionTypes.SET_LISTS:
      return { ...state, lists: action.payload };

    case TodoActionTypes.ADD_LIST:
      return { ...state, lists: [...state.lists, action.payload] };

    case TodoActionTypes.SET_ACTIVE_LIST:
      return { ...state, activeListId: action.payload };

    case TodoActionTypes.SET_ITEMS:
      return { ...state, items: action.payload };

    case TodoActionTypes.ADD_ITEM:
      return { ...state, items: [...state.items, action.payload] };

    case TodoActionTypes.TOGGLE_ITEM:
      return { ...state, items: state.items.map(item => item.id === action.payload ? { ...item, completed: !item.completed } : item), };

    case TodoActionTypes.DELETE_ITEM:
      return { ...state, items: state.items.filter(item => item.id !== action.payload), };

    case TodoActionTypes.UPDATE_ITEM_TEXT:
      return { ...state, items: state.items.map(item => item.id === action.payload.id ? { ...item, text: action.payload.text } : item), };

    case TodoActionTypes.DELETE_LIST: {
      const { id, nextActiveListId } = action.payload;

      const isDeletingActive = state.activeListId === id;

      return { ...state, lists: state.lists.filter(list => list.id !== id), activeListId: isDeletingActive ? nextActiveListId : state.activeListId, items: isDeletingActive ? [] : state.items, // ✅ prevents stale data bleed
    }; }

    case TodoActionTypes.UPDATE_LIST:
      return { ...state, lists: state.lists.map(list => list.id === action.payload.id ? action.payload : list ), };

    default:
      return state;
  }
}
