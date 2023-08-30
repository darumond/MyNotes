<template>
    <div class="notes">
        <AddEditNote v-model="newNote" ref="addEditNoteRef" placeholder="Add a new note">
            <template #buttons>
                <button :disabled="!newNote" @click="addNote" class="button is-link has-background-success">Add new notes</button>
            </template>
        </AddEditNote>
        <Note v-for="note in storeNotes.notes" :key="note.id" :note="note"/>
    </div>
</template>


<script setup>
import { ref, watch } from 'vue'
import Note from '@/components/Notes/Note.vue'
import AddEditNote from '@/components/Notes/AddEditNote.vue';
import {useStoreNotes} from '@/stores/storeNotes'
const newNote = ref('');
const addEditNoteRef = ref(null);

const storeNotes = useStoreNotes();
const addNote = () => {
    storeNotes.addNote(newNote.value);
    newNote.value = ''
    addEditNoteRef.value.focusTextarea();
}

watch(newNote,(newValue,oldValue) => {
    if(newValue.length === 100)
    {
        alert('Max Length reached')
    }
})
</script>