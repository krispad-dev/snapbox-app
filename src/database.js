import { openDB } from 'idb/with-async-ittr.js';

export async function runDb() {

  const database = await openDB('AppDatabase', 1, {

    upgrade(db) {

      const store = db.createObjectStore('AppImages', {
        
        keyPath: 'id',
        autoIncrement: true,

      });

      const storeTwo = db.createObjectStore('ExampleImages', {
        
        keyPath: 'id',
        autoIncrement: true,

      });

    },
  });

  return database
}