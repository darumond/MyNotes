// stores/counter.js
import { defineStore } from 'pinia'
import { collection, onSnapshot ,doc, setDoc,deleteDoc, updateDoc,query, orderBy, limit } from "firebase/firestore";
import { db } from '@/js/firebase'

const notesCollectionRef = collection(db,'notes')
const notesCollectionquery = query(notesCollectionRef, orderBy('id','desc'))

export const useStoreNotes = defineStore('storeNotes', {
    state: () => {
        return {
            notes: [
            ]
        }
    },
    actions: {
        async getNote() {
            onSnapshot(notesCollectionquery, (querySnapshot) => {
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
                content: newNote,
                id
              });

        },
        async deleteNote(idNote) {
            await deleteDoc(doc(notesCollectionRef, idNote));
        },
        async updateNoteContent(idNote, newContent) {
            await updateDoc(doc(notesCollectionRef,idNote),{
              content: newContent
            });
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