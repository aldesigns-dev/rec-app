// stores/store.js
import { defineStore } from 'pinia'
import firebaseService from '@/services/firebaseService'

export const useAppStore = defineStore('app', {
  state: () => ({
    inspections: [],
    users: [],
    options: [],
    loggedInUser: null,
  }),
  actions: {
    handleStoreError(actionName, error) {
      console.error(`store - ${actionName}: Error ❌`, error);
      throw error;
    },

    // User actions
    async createUser(userData) {
      try {
        const user = await firebaseService.createUser(userData);
        console.log('store - createUser(): User created successfully ✔️');
        return user;
      } catch (error) {
        this.handleStoreError('createUser()', error);
      }
    },
    async fetchUsers() {
      try {
        console.log('store - Fetching users...');
        const users = await firebaseService.fetchUsers();
        this.setUsers(users);
        console.log('store - fetchUsers(): Users fetched ✔️', users);
      } catch (error) {
        this.handleStoreError('fetchUsers()', error);
      }
    },
    setUsers(users) {
      this.users = users;
      console.log('store - setUsers(): Users set ✔️');
    },
    async loginUser(email, password) {
      try {
        const user = await firebaseService.loginUser(email, password);
        this.saveLoggedInUser(user);
        console.log('store - loginUser(): User logged in ✔️');
      } catch (error) {
        this.handleStoreError('loginUser()', error);
      }
    },
    saveLoggedInUser(user) {
      this.loggedInUser = user;
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      console.log('store - saveLoggedInUser(): User saved ✔️');
    },
    async logoutUser() {
      try {
        await firebaseService.logoutUser();
        this.loggedInUser = null;
        localStorage.removeItem('loggedInUser');
        console.log('store - logoutUser(): User logged out ✔️');
      } catch (error) {
        this.handleStoreError('logoutUser()', error);
      }
    },
    async reauthenticateUser(email, password) {
      try {
        await firebaseService.reauthenticateUser(email, password);
        console.log('store - reauthenticateUser(): Re-authentication successful ✔️');
        return true;
      } catch (error) {
        console.error('store - reauthenticateUser(): Re-authentication failed ❌', error);
        return false;
      }
    },
    async changePassword(newPassword) {
      try {
        await firebaseService.changePassword(newPassword);
        console.log('store - changePassword(): Password changed successfully ✔️');
        return true;
      } catch (error) {
        this.handleStoreError('changePassword()', error);
        return false;
      }
    },
    async updateUser(userId, newData) {
      try {
        await firebaseService.updateUser(userId, newData);
        console.log('store - updateUser(): User updated successfully ✔️');
      } catch (error) {
        this.handleStoreError('updateUser()', error);
      }
    },

    // Options actions
    async fetchOptions() {
      try {
        console.log('store - Fetching options...');
        const options = await firebaseService.fetchOptions();
        this.setOptions(options);
        console.log('store - fetchOptions(): Options fetched ✔️');
      } catch (error) {
        this.handleStoreError('fetchOptions()', error);
      }
    },
    setOptions(options) {
      this.options = options;
      console.log('store - setOptions(): Options set ✔️');
    },

    // Inspection actions
    async createInspection(newInspection) {
      try {
        console.log('store - Sending request to create inspection...', newInspection);
        const docRef = await firebaseService.createInspection(newInspection);
        console.log('store - createInspection(): Inspection created successfully ✔️');
        return docRef;
      } catch (error) {
        this.handleStoreError('createInspection()', error);
      }
    },
    async fetchInspections() {
      try {
        console.log('store - Fetching inspections...');
        const inspections = await firebaseService.fetchInspections();
        this.setInspections(inspections);
        console.log('store - fetchInspections(): Inspections fetched ✔️', inspections);
      } catch (error) {
        this.handleStoreError('fetchInspections()', error);
      }
    },
    setInspections(inspections) {
      this.inspections = inspections;
      console.log('store - setInspections(): Inspections set ✔️');
    },
    async uploadImage(file) {
      try {
        const downloadURL = await firebaseService.uploadImage(file);
        console.log('store - uploadImage(): Image uploaded successfully ✔️');
        return downloadURL;
      } catch (error) {
        this.handleStoreError('uploadImage()', error);
      }
    },
    async saveInspection(inspection) {
      try {
        inspection.new_inspection = Boolean(inspection.new_inspection);
        await firebaseService.saveInspection(inspection);
        console.log('store - saveInspection(): Inspection saved successfully ✔️');
      } catch (error) {
        this.handleStoreError('saveInspection()', error);
      }
    }
  }
});