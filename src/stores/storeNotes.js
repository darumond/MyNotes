// stores/counter.js
import { defineStore } from 'pinia'
import { collection, onSnapshot ,doc, setDoc,deleteDoc } from "firebase/firestore";
import { db } from '@/js/firebase'

const notesCollectionRef = collection(db,'notes')

export const useStoreNotes = defineStore('storeNotes', {
    state: () => {
        return {
            notes: [
            ]
        }
    },
    actions: {
        async getNote() {
            
            onSnapshot(notesCollectionRef, (querySnapshot) => {
                let notes = []
                querySnapshot.forEach((doc) => {
                    let note = {
                        id: doc.id,
                        content: doc.data().content
                    }
                    notes.push(note);
                });
                this.notes = notes;
            });
        },
        async addNote(newNote) {
            let currentDate = new Date().getTime(), id = currentDate.toString();

            await setDoc(doc(notesCollectionRef, id), {
                content: newNote
              });

        },
        async deleteNote(idNote) {
            await deleteDoc(doc(notesCollectionRef, idNote));
            // this.notes = this.notes.filter(note => note.id !== idNote)
            console.log('deleteNote')
        },
        updateNoteContent(idNote, newContent) {
            let note = this.notes.find(note => note.id === idNote)
            note.content = newContent
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