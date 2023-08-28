<template>
    <AddEditNote v-model="noteContent" ref="addEditNoteRef" bg-Color="link" placeholder="Edit note" label="Edit Note">
        <template #buttons>
            <button class="button is-link is-light mr-2" @click="$router.back()">Cancel</button>
            <button @click="handleSave" class="button is-link has-background-link" :disabled="!noteContent">Save Note</button>
            
        </template>
    </AddEditNote>
</template>

<script setup>
import { ref } from 'vue'
import AddEditNote from '@/components/Notes/AddEditNote.vue';
import { useStoreNotes } from '@/stores/storeNotes';
import { useRoute,useRouter } from 'vue-router';
const storeNotes = useStoreNotes();
const noteContent = ref('');
const route = useRoute();
const router = useRouter();
noteContent.value = storeNotes.getNoteContent(route.params.id);

const handleSave = () => {
    storeNotes.updateNoteContent(route.params.id, noteContent.value);
    console.log('handleSave');
    router.back();
}

</script>