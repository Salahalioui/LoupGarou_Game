const DB_NAME = "WerewolfModeratorDB";
const DB_VERSION = 1;
const STORES = ["roles", "players", "games"];

export default class IndexedDBService {
  constructor() {
    this.db = null;
  }

  async initDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = (event) =>
        reject("IndexedDB error: " + event.target.error);

      request.onsuccess = (event) => {
        this.db = event.target.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        STORES.forEach((storeName) => {
          if (!db.objectStoreNames.contains(storeName)) {
            db.createObjectStore(storeName, {
              keyPath: "id",
              autoIncrement: true,
            });
          }
        });
      };
    });
  }

  async getAll(storeName) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(storeName, "readonly");
      const store = transaction.objectStore(storeName);
      const request = store.getAll();

      request.onerror = (event) =>
        reject("Error fetching data: " + event.target.error);
      request.onsuccess = (event) => resolve(event.target.result);
    });
  }

  async add(storeName, item) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(storeName, "readwrite");
      const store = transaction.objectStore(storeName);

      // Ensure only clonable data is being stored
      const clonableItem = JSON.parse(JSON.stringify(item));

      const request = store.add(clonableItem);

      request.onerror = (event) =>
        reject("Error adding item: " + event.target.error);
      request.onsuccess = (event) => resolve(event.target.result);
    });
  }

  async update(storeName, item) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(storeName, "readwrite");
      const store = transaction.objectStore(storeName);
      const request = store.put(item);

      request.onerror = (event) =>
        reject("Error updating item: " + event.target.error);
      request.onsuccess = (event) => resolve(event.target.result);
    });
  }

  async delete(storeName, id) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], "readwrite");
      const objectStore = transaction.objectStore(storeName);
      const request = objectStore.delete(id);

      request.onerror = (event) => {
        reject("Error deleting data: " + event.target.error);
      };

      request.onsuccess = () => {
        resolve();
      };
    });
  }

  async addWithImage(storeName, formData) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], "readwrite");
      const objectStore = transaction.objectStore(storeName);

      const data = {
        name: formData.get("name"),
        description: formData.get("description"),
      };

      const request = objectStore.add(data);

      request.onerror = (event) => {
        reject("Error adding data: " + event.target.error);
      };

      request.onsuccess = (event) => {
        const id = event.target.result;
        // Handle image upload here if needed
        // For now, we'll just resolve with the id
        resolve({ id, imageUrl: null });
      };
    });
  }
}
