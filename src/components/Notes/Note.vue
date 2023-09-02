<template>
    <div class="card mb-4" >
            <div class="card-content">
                <div class="content">
                    {{ note.content }}
                </div>
                <div class="columns is-mobile has-text-right has-text-grey-light mt-2">
                    <small class="column has-text-left">{{ dateFormatted }}</small>
                    <small class="column has-text-right">{{ characterLength }}</small>
                </div>
            </div>
            <footer class="card-footer">
                <RouterLink :to="`/editNote/${note.id}`" href="#" class="card-footer-item">Edit</RouterLink>
                <a href="#" class="card-footer-item" @click.prevent="modals.deleteNote=true">Delete</a>
            </footer>
            <ModelDeleteNote v-if="modals.deleteNote" v-model="modals.deleteNote" :id="note.id" />
        </div>
</template>

<script setup>
//props
import { defineProps, computed, reactive } from 'vue'
import {useDateFormat} from '@vueuse/core'
import { useStoreNotes } from '@/stores/storeNotes';
import ModelDeleteNote from './ModelDeleteNote.vue';
const storeNotes = useStoreNotes();

const dateFormatted = computed(()=> {
    let date = new Date(parseInt(props.note.date))
    
    return useDateFormat(date, 'YYYY-MM-DD HH:mm').value
})

const props = defineProps({
    note: {
        type: Object,
        required: true
    }
})
const emit = defineEmits(['delete'])

const characterLength = computed(() => {
    let length = props.note.content.length
    let description = length > 1 ? 'characters' : 'character'
    return `${length} ${description}`
})

const modals = reactive({
    deleteNote:false,
})
</script>