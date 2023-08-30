<template>
   <div class="stats">
    <table class="table">
        <thead>
            <tr>
                <th>Stat</th>
                <th>Value</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Number of Notes</td>
                <td>{{storeNotes.totalNotesCount}}</td>
            </tr>
            <tr>
                <td>Number of Characters (All Notes)</td>
                <td>{{ storeNotes.totalCharactersCount }}</td>
            </tr>
        </tbody>
    </table>
    <input type="text" v-model="feedback" placeholder="Feedback" class="input" v-autofocus maxlength="100" />
   </div>
</template>

<script setup>
import {ref} from 'vue'
import { useStoreNotes } from '@/stores/storeNotes';
import {vAutofocus} from '@/directives/vAutofocus'
import {useWatchCharacters} from '@/use/useWatchCharacters'

const storeNotes = useStoreNotes();

const feedback = ref('');

useWatchCharacters(feedback,50);
</script>