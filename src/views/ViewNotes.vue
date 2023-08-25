<template>
    <div class="notes">
        <div class="card has-background-success-dark p-4 mb-5">

            <div class="field">
                <div class="control">
                    <textarea class="textarea" placeholder="Add new notes" v-model="newNote" ref="newNoteRef"></textarea>
                </div>
            </div>
    
            <div class="field is-grouped is-grouped-right">
                <div class="control">
                    <button :disabled="!newNote" @click="addNote" class="button is-link has-background-success">Add new notes</button>
                </div>
            </div>
        </div>
        <Note v-for="note in storeNotes.notes" :key="note.id" :note="note"/>
    </div>
</template>


<script setup>
import { ref } from 'vue'
import Note from '@/components/Notes/Note.vue'
import {useStoreNotes} from '@/stores/storeNotes'
const newNote = ref('');
const newNoteRef = ref(null);

const storeNotes = useStoreNotes();
const addNote = () => {
    storeNotes.addNote(newNote.value);
    newNote.value = ''
    newNoteRef.value.focus()   
}
</script>