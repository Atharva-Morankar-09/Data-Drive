import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth';
import { getFirestore, collection } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDs7t-nfluz95xxXR9xwFn4rH6dyxuwNzo",
  authDomain: "data-drive-09.firebaseapp.com",
  projectId: "data-drive-09",
  storageBucket: "data-drive-09.appspot.com",
  messagingSenderId: "462940681030",
  appId: "1:462940681030:web:3fd55146bfba58da716b47"
};
  // check
  
  const app = initializeApp(firebaseConfig)

  const fs = getFirestore()
  // export const db ={
  //   folders: collection(fs,'folders'),
  //   files: collection(fs,'files')
  // }
  export const folders = collection(fs,'Folders')
  export const files = collection(fs,'Files')
  export const storage = getStorage()

  export const allData = doc => {
    return {
      id: doc.id,
    ...doc.data()
    }
}
   
  
  // const db = collection(getFirestore(), 'folders')
 
  export const auth = getAuth(app)
  export default app
