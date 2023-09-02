<template>
    <div class="notes">
        <AddEditNote v-model="newNote" ref="addEditNoteRef" placeholder="Add a new note">
            <template #buttons>
                <button :disabled="!newNote" @click="addNote" class="button is-link has-background-success">Add new notes</button>
            </template>
        </AddEditNote>
        <progress  v-if="!storeNotes.notesLoaded" class="progress is-large is-success" max="100">60%</progress>
        <template v-else>
            <Note v-for="note in storeNotes.notes" :key="note.id" :note="note"/>
        </template>
        <div class="is-size-4 has-text-centered has-text-grey-light is-family-monospace py-6" v-if="!storeNotes.notes.length">
            Write some Notes!
        </div>
    </div>
</template>


<script setup>
import { ref, watch } from 'vue'
import Note from '@/components/Notes/Note.vue'
import AddEditNote from '@/components/Notes/AddEditNote.vue';
import {useStoreNotes} from '@/stores/storeNotes'
import {useWatchCharacters} from '@/use/useWatchCharacters'
const newNote = ref('');
const addEditNoteRef = ref(null);

const storeNotes = useStoreNotes();
const addNote = () => {
    storeNotes.addNote(newNote.value);
    newNote.value = ''
    addEditNoteRef.value.focusTextarea();
}

useWatchCharacters(newNote,100)
</script>