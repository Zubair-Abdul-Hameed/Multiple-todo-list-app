// src/domains/todo/todo.selectors.js
export const selectLists = state => state.lists;
export const selectActiveListId = state => state.activeListId;
export const selectItems = state => state.items;

export const selectActiveList = state =>
  state.lists.find(list => list.id === state.activeListId) || null;
