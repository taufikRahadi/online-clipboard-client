<template>
  <div>
    <div class="flex justify-center items-center my-10">
      <div class="w-3/4">
        <h3 class="text-2xl text-gray-700 text-center">Online Clipboard</h3>
      </div>
    </div>
    <div class="flex flex-row justify-center items-center">
      <!-- find clipboard by id  -->
      <div class="mx-3">
        <form @submit.prevent="handleGetByCodeButton">
          <div class="flex flex-col justify-start">
            <label for="#code" class="mb-4 font-bold">Clipboard Code</label>
            <input
              @keypress="handleChange"
              class="shadow mb-4 appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Clipboard Code"
              name="code"
              id="code"
              v-model="code"
            />
          </div>
          <button
            type="submit"
            class="bg-purple-500 hover:bg-purple-600 px-5 py-2 rounded-lg my-3 text-white"
          >
            Find By Code
          </button>
        </form>
      </div>

      <!-- create clipboard form -->
      <div class="mx-3">
        <form>
          <form @submit.prevent="handleCreate">
            <div class="flex flex-col justify-start">
              <label for="" class="mb-4 font-bold">Clipboard Title</label>
              <input
                @change="handleChange"
                class="shadow mb-4 appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Clipboard Title"
                name=""
                v-model="form.title"
                id=""
              />
            </div>
            <div class="flex flex-col justify-start">
              <label for="" class="mb-4 font-bold">Body</label>
              <textarea
                class="shadow mb-4 appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                @change="handleChange"
                type="text"
                placeholder="Clipboard Body"
                name=""
                v-model="form.body"
                id=""
              />
            </div>
            <button
              type="submit"
              class="bg-purple-500 hover:bg-purple-600 px-5 py-2 rounded-lg my-3 text-white"
            >
              Create
            </button>
          </form>
        </form>
      </div>
    </div>
    <div class="flex flex-col justify-center h-full my-20 items-center">
      <h3 v-if="!showCard" class="text-gray-400 text-2xl">Nothing To Show</h3>
      <div v-else class="px-4 py-2 bg-white shadow-sm rounded w-1/2">
        <div class="flex justify-between">
          <h3 class="font-bold text-lg">{{ clipboard.title }}</h3>
          <p class="text-gray-400">code: {{ clipboard.code }}</p>
        </div>

        <p class="font-light py-3">
          {{ clipboard.body }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { getClipboardByCode, createClipboard } from '../api/clipboard'
export default {
  name: 'Home',
  components: {},
  setup() {
    let code = ref('')
    let clipboard = ref({})
    let showCard = ref(false)
    const form = ref({
      title: '',
      body: '',
    })

    const handleChange = () => {
      clipboard.value = {}
      showCard.value = false
    }

    const handleGetByCodeButton = () => {
      return getClipboardByCode(code.value)
        .then((data) => {
          clipboard.value = data
          showCard.value = true
          code.value = ''
        })
        .catch((err) => console.log(err))
    }

    const handleCreate = () => {
      return createClipboard(form.value)
        .then((data) => {
          clipboard.value = data
          showCard.value = true
          form.value = {
            title: '',
            body: '',
          }
        })
        .catch((err) => console.log(err))
    }

    return {
      code,
      showCard,
      clipboard,
      form,
      handleChange,
      handleGetByCodeButton,
      handleCreate,
    }
  },
}
</script>
