<template>
    <div v-if="poll">
        <h3>
            code: <b>{{ poll.code }}</b>
        </h3>
        <h2>{{ poll.question }}</h2>
        <input
            v-if="token && !poll.public"
            type="button"
            value="make public"
            @click="handlePublishCilck"
        />
        <input
            v-if="token && !poll.closed"
            type="button"
            value="close poll"
            @click="handleCloseClick"
        />
        <hr />
        <span v-if="!token && !poll.public">
            The results are not yet made public. Try again later.
        </span>
        <div
            v-else
            v-for="(option, index) in poll.options"
            :key="index"
            style="text-align: left"
        >
            <span style="width: 150px; display: inline-block">
                {{ option.votesCount }} votes / {{ option.votesPercentage }}
            </span>
            <span>{{ option.content }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import axios from 'axios'
import { ref } from 'vue'

const route = useRoute()
const code = String(route.params.code)
const token = localStorage.getItem(code)
const poll = ref()

const fetchPoll = async () => {
    try {
        const result = await axios.get('poll/get/', { params: { code, token } })
        poll.value = result.data
        poll.value.options.sort((a: any, b: any) => {
            if (a.votesCount > b.votesCount) return -1
            else if (a.votesCount < b.votesCount) return 1
            else return 0
        })
    } catch (e) {
        alert(e)
    }
}

const handleCloseClick = async () => {
    try {
        await axios.patch('poll/close/', null, { params: { code, token } })
        await fetchPoll()
    } catch (e) {
        alert(e)
    }
}

const handlePublishCilck = async () => {
    try {
        await axios.patch('poll/publish/', null, { params: { code, token } })
        await fetchPoll()
    } catch (e) {
        alert(e)
    }
}

fetchPoll()
</script>
