<template>
    <label>Question: </label>
    <input type="text" v-model="question" />
    <hr />
    <div v-for="(_, index) in options" :key="index">
        <input type="text" v-model="options[index]" />
    </div>
    <hr />
    <input type="button" value="Add option" @click="handleAddOptionClick" />
    <input type="submit" value="Create" @click="handleCreateClick" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const options = ref<string[]>(['A', 'B'])
const question = ref('')
const router = useRouter()

const handleAddOptionClick = () => {
    options.value.push('')
}

const handleCreateClick = async () => {
    try {
        const result = await axios.post('poll/create/', {
            options: options.value,
            question: question.value,
        })

        const code: string = result.data.code
        const token: string = result.data.token
        window.localStorage.setItem(code, token)
        router.push({ name: 'results', params: { code } })
    } catch (e) {
        alert(e)
    }
}
</script>
