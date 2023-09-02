// stores/counter.js
import { defineStore } from 'pinia'
import { collection, onSnapshot, doc, deleteDoc, updateDoc, query, orderBy, addDoc } from "firebase/firestore";
import { db } from '@/js/firebase'
import { useStoreAuth } from './storeAuth';
let notesCollectionRef
let notesCollectionquery
let getNotesSnapshot = null
export const useStoreNotes = defineStore('storeNotes', {
    state: () => {
        return {
            notes: [
            ],
            notesLoaded: false
        }
    },
    actions: {
        init() {
            //initialize our database refs
            let storeAuth = useStoreAuth()
            notesCollectionRef = collection(db, 'users', storeAuth.user.id , 'notes')
            notesCollectionquery = query(notesCollectionRef, orderBy('date', 'desc'))
            this.getNote()
        },

        async getNote() {
            this.notesLoaded = false;

            

            getNotesSnapshot = onSnapshot(notesCollectionquery, (querySnapshot) => {
                let notes = []
                querySnapshot.forEach((doc) => {
                    let note = {
                        id: doc.id,
                        content: doc.data().content,
                        date: doc.data().date
                    }
                    notes.push(note);
                });
                this.notes = notes;
                this.notesLoaded = true;
            });
        },
        async addNote(newNote) {
            let currentDate = new Date().getTime(), date = currentDate.toString();

            addDoc(notesCollectionRef, {
                content: newNote,
                date
            });

        },
        async deleteNote(idNote) {
            await deleteDoc(doc(notesCollectionRef, idNote));
        },
        async updateNoteContent(idNote, newContent) {
            await updateDoc(doc(notesCollectionRef, idNote), {
                content: newContent
            });
        },
        clearNotes() {
            this.notes=[]
            if(getNotesSnapshot) getNotesSnapshot() //unsubscribe
        }
    },
    getters: {
        getNoteContent: (state) => {
            return (idNote) => {
                return state.notes.find(note => note.id === idNote).content
            }
        },
        totalNotesCount: (state) => {
            return state.notes.length
        },
        totalCharactersCount: (state) => {
            let totalCharacters = 0
            state.notes.forEach(note => {
                totalCharacters += note.content.length
            })
            return totalCharacters
        }
    }
})