<template>
    <h2>Join poll</h2>
    <input v-model="code" placeholder="code..." />
    <input type="submit" value="Join" @click="handleJoin" />
    <hr />
    <h2>
        <span>or </span>
        <router-link to="/create">Create new</router-link>
    </h2>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const code = ref('')
const handleJoin = (e: Event) => {
    e.preventDefault()
    const match = code.value.match(/^[\da-zA-Z]{6}$/)
    console.log(code.value)

    if (match) {
        router.push({
            name: 'answer',
            params: { code: code.value },
        })
    } else {
        alert('Invalid code')
    }
}
</script>
