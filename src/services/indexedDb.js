// src/services/indexedDb.js
const DB_NAME = 'todo_app';
const DB_VERSION = 2; // ⬅️ bump version
const LIST_STORE = 'lists';
const ITEM_STORE = 'items';

function openDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;

      if (!db.objectStoreNames.contains(LIST_STORE)) {
        db.createObjectStore(LIST_STORE, { keyPath: 'id' });
      }

      if (!db.objectStoreNames.contains(ITEM_STORE)) {
        const store = db.createObjectStore(ITEM_STORE, { keyPath: 'id' });
        store.createIndex('listId', 'listId', { unique: false });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// ===== LISTS =====
export async function getAllLists() {
  const db = await openDb();
  const tx = db.transaction(LIST_STORE, 'readonly');
  const store = tx.objectStore(LIST_STORE);

  return new Promise(resolve => {
    const req = store.getAll();
    req.onsuccess = () => resolve(req.result);
  });
}

export async function addList(list) {
  const db = await openDb();
  const tx = db.transaction(LIST_STORE, 'readwrite');
  tx.objectStore(LIST_STORE).add(list);
}

// ===== ITEMS =====
export async function getItemsByListId(listId) {
  const db = await openDb();
  const tx = db.transaction(ITEM_STORE, 'readonly');
  const store = tx.objectStore(ITEM_STORE);
  const index = store.index('listId');

  return new Promise(resolve => {
    const req = index.getAll(listId);
    req.onsuccess = () => resolve(req.result);
  });
}

export async function addItem(item) {
  const db = await openDb();
  const tx = db.transaction(ITEM_STORE, 'readwrite');
  tx.objectStore(ITEM_STORE).add(item);
}

export async function updateItem(item) {
  const db = await openDb();
  const tx = db.transaction(ITEM_STORE, 'readwrite');
  tx.objectStore(ITEM_STORE).put(item);
}

export async function deleteItem(itemId) {
  const db = await openDb();
  const tx = db.transaction(ITEM_STORE, 'readwrite');
  tx.objectStore(ITEM_STORE).delete(itemId);
}

export async function deleteListCascade(listId) {
  const db = await openDb();

  // one transaction touching both stores
  const tx = db.transaction([LIST_STORE, ITEM_STORE], 'readwrite');
  const listStore = tx.objectStore(LIST_STORE);
  const itemStore = tx.objectStore(ITEM_STORE);
  const index = itemStore.index('listId');

  // 1) delete the list
  listStore.delete(listId);

  // 2) delete all items where item.listId === listId
  await new Promise((resolve, reject) => {
    const cursorReq = index.openCursor(IDBKeyRange.only(listId));

    cursorReq.onsuccess = () => {
      const cursor = cursorReq.result;
      if (!cursor) return resolve();

      cursor.delete(); // delete this item
      cursor.continue();
    };

    cursorReq.onerror = () => reject(cursorReq.error);
  });

  // Wait for transaction to complete
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(tx.error);
  });
}

export async function updateList(list) {
  const db = await openDb();
  const tx = db.transaction(LIST_STORE, 'readwrite');
  tx.objectStore(LIST_STORE).put(list);
}
