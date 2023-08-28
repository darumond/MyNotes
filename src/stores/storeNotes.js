// stores/counter.js
import { defineStore } from 'pinia'

export const useStoreNotes = defineStore('storeNotes', {
    state: () => {
        return {
            notes: [
                {
                    id: 'id1',
                    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, voluptatibus. Consequatur cumque praesentium provident officiis. Ad animi aliquam eaque repudiandae explicabo eos ullam quas magni commodi, reiciendis incidunt ut. Ad?'
                },
                {
                    id: 'id2',
                    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, voluptatibus. Consequatur cumque praesentium provident officiis.'
                },
                {
                    id: 'id3',
                    content: 'Lorem ipsum dolor'
                },
            ]
        }
    },
    actions: {
        addNote(newNote) {
            let currentDate = new Date().getTime(), id = currentDate.toString();
            this.notes.unshift({
                id: id,
                content: newNote
            })
            console.log('addNote')
        },
        deleteNote(idNote) {
            this.notes = this.notes.filter(note => note.id !== idNote)
            console.log('deleteNote')
        },
        updateNoteContent(idNote, newContent ) {
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