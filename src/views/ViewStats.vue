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
    <input type="text" v-model="searchTerm" placeholder="Search" class="input" v-autofocus />
   </div>
</template>

<script setup>
import { useStoreNotes } from '@/stores/storeNotes';
import {vAutofocus} from '@/directives/vAutofocus'

const storeNotes = useStoreNotes();
</script>