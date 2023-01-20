<template>
    <div v-if="poll">
        <h3>
            code: <b>{{ poll.code }}</b>
        </h3>
        <h2>{{ poll.question }}</h2>
        <hr />
        <select v-model="option">
            <option
                v-for="(option, index) in poll.options"
                :key="index"
                :value="index"
                style="text-align: left"
            >
                {{ option.content }}
            </option>
        </select>
        <hr />
        <input type="button" value="Submit" @click="handleSubmitCilck" />
    </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { ref } from 'vue'

const route = useRoute()
const router = useRouter()
const code = String(route.params.code)
const poll = ref()
const option = ref()

const fetchPoll = async () => {
    try {
        const result = await axios.get('poll/get/', { params: { code } })
        poll.value = result.data

        if (poll.value.closed) {
            router.push({ name: 'results', params: { code } })
        }
    } catch (e) {
        alert(e)
    }
}

const handleSubmitCilck = async () => {
    try {
        await axios.post('vote/submit/', null, {
            params: { code, option: option.value },
        })

        router.push({ name: 'results', params: { code } })
    } catch (e) {
        alert(e)
    }
}

fetchPoll()
</script>
