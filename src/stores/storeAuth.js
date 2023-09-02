// stores/counter.js
import { defineStore } from 'pinia'
import { auth } from '@/js/firebase'
import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

export const useStoreAuth = defineStore('storeAuth', {
    state: () => {
        return {
            user: {}
        }
    },
    actions: {
        init() {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    this.user.id = user.uid
                    this.user.email = user.email
                    this.router.push('/')
                } else {
                    this.user = {}
                    this.router.replace('/auth')
                }
            });

        },
        registerUser(credentials) {
            createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log("user: ", user)
                })
                .catch((error) => {
                    console.log('error message: ', error);
                });
        },
        loginUser(credentials) {
            signInWithEmailAndPassword(auth, credentials.email, credentials.password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log("user: ", user)
                })
                .catch((error) => {
                    console.log("error: ", error)
                });

        },
        logoutUser() {
            signOut(auth).then(() => {
                console.log('User signed out');
            }).catch((error) => {
                console.log("error: ", error);
            });

        }

    },
})