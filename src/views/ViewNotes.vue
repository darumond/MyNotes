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
        <Note v-for="note in notes" :key="note.id" :note="note" @delete="deleteNote"/>
    </div>
</template>


<script setup>
import { ref } from 'vue'
import Note from '@/components/Notes/Note.vue'
const newNote = ref('');
const newNoteRef = ref(null);

const notes = ref([
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
])

const addNote = () => {

    let currentDate = new Date().getTime(),id = currentDate.toString();
    notes.value.unshift({
        id: id,
        content: newNote.value
    })
    newNote.value = ''

    console.log(notes.value)
    newNoteRef.value.focus()
    
}

const deleteNote = (id) => {
    notes.value = notes.value.filter(note => note.id !== id)
}

</script>