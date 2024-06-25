// services/firebaseService.js
import { db, storage, auth } from '@/main';
import { collection, doc, addDoc, getDocs, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updatePassword, reauthenticateWithCredential, signOut, EmailAuthProvider } from 'firebase/auth';

const handleFirebaseError = (error) => {
  console.error('Firebase service error:', error);
  throw error;
};

export default {
  async createUser(userData) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
      const user = userCredential.user;
      await setDoc(doc(db, 'users', user.uid), {
        name: userData.name,
        email: userData.email,
        verificationCode: userData.verificationCode
      });
      return user;
    } catch (error) {
      handleFirebaseError(error);
    }
  },

  async fetchUsers() {
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      handleFirebaseError(error);
    }
  },

  async loginUser(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('firebaseService - loginUser(): User logged in, waiting for onAuthStateChanged...');
      return userCredential.user;
    } catch (error) {
      handleFirebaseError(error);
    }
  },

  async getUserData(uid) {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        console.log('firebaseService - getUserData(): User data found ✔️', userDoc.data());
        return userDoc.data();
      } else {
        throw new Error('Gebruikersgegevens niet gevonden.');
      }
    } catch (error) {
      handleFirebaseError(error);
    }
  },

  async logoutUser() {
    try {
      await signOut(auth);
      console.log('firebaseService - logoutUser(): User logged out ✔️');
    } catch (error) {
      handleFirebaseError(error);
    }
  },

  async reauthenticateUser(email, password) {
    try {
      const user = auth.currentUser;
      const credential = EmailAuthProvider.credential(email, password);
      await reauthenticateWithCredential(user, credential);
    } catch (error) {
      handleFirebaseError(error);
    }
  },

  async changePassword(newPassword) {
    try {
      await updatePassword(auth.currentUser, newPassword);
    } catch (error) {
      handleFirebaseError(error);
    }
  },

  async updateUser(userId, newData) {
    try {
      const user = doc(db, 'users', userId);
      await updateDoc(user, newData);
    } catch (error) {
      handleFirebaseError(error);
    }
  },

  async fetchOptions() {
    try {
      const docRef = doc(db, "options", "fields");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        throw new Error('Option niet gevonden.');
      }
    } catch (error) {
      handleFirebaseError(error);
    }
  },

  async createInspection(newInspection) {
    try {
      const docRef = await addDoc(collection(db, 'inspections'), newInspection);
      return docRef;
    } catch (error) {
      handleFirebaseError(error);
    }
  },

  async fetchInspections() {
    try {
      const querySnapshot = await getDocs(collection(db, 'inspections'));
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      handleFirebaseError(error);
    }
  },

  async uploadImage(file) {
    try {
      const storageRef = ref(storage, `images/${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      return getDownloadURL(snapshot.ref);
    } catch (error) {
      handleFirebaseError(error);
    }
  },
  
  async saveInspection(inspection) {
    try {
      const docRef = doc(db, 'inspections', inspection.id);
      await updateDoc(docRef, inspection);
    } catch (error) {
      handleFirebaseError(error);
    }
  },

  async fetchAudioURLs() {
    try {
      const menuOpenRef = ref(storage, 'audio/menu-open.mp3');
      const menuCloseRef = ref(storage, 'audio/menu-close.mp3');
      const menuOpenURL = await getDownloadURL(menuOpenRef);
      const menuCloseURL = await getDownloadURL(menuCloseRef);

      const csOpenRef = ref(storage, 'audio/cs-open.mp3');
      const csCloseRef = ref(storage, 'audio/cs-close.mp3');
      const csOpenURL = await getDownloadURL(csOpenRef);
      const csCloseURL = await getDownloadURL(csCloseRef);

      return { menuOpenURL, menuCloseURL, csOpenURL, csCloseURL };
    } catch (error) {
      handleFirebaseError(error);
    }
  }
}