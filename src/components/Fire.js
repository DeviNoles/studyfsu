import firebase from 'firebase';

class Fire {
  constructor() {
    // 1.
    this.observeAuth();
  }
  // 2.
  observeAuth = () =>
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
  // 3.
  onAuthStateChanged = user => {
    if (!user) {
      try {
        // 4.
        
      } catch ({ message }) {
        alert(message);
      }
    }
  };
}
