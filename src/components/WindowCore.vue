<template>
  <div class="container">
    <div class="card small-shadow">
      <div class="card-body">
        <Form @submit="sendText" ref="formText" v-slot="{ errors }">
          <Field
              name="text"
              type="text"
              :rules="validateText"
              v-slot="{ field }"
              v-model="text"
          >
            <textarea
                v-bind="field"
                :class="{ 'is-invalid': errors.text }"
                class="form-control mt-4"
                placeholder="digite o que você precisa!

frase para foto, título para um projeto, um breve texto...
quanto mais detalhes, melhor a resposta!"
            />
          </Field>
          <div class="invalid-feedback">{{errors.text}}</div>
          <div class="d-flex justify-content-center">
            <button :disabled="loading" class="btn mt-3 btn-light">enviar</button>
          </div>
        </Form>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="card mt-5" v-if="createRequest">
      <div class="card-body">
        <div class="d-flex justify-content-center fa-3x" v-if="loading">
          <i class="fas fa-circle-notch fa-spin"></i>
        </div>
        <div v-else-if="hasResponse">
          <h2>{{responseApi}}</h2>
        </div>
      </div>
    </div>
  </div>


</template>

<script setup>
import { ref } from 'vue'
import { Form, Field} from 'vee-validate'
import axios from "axios";
import { useNotification } from "@kyvg/vue3-notification";

const notification = useNotification()
const text = ref('')
const formText = ref()
const loading = ref(false)
const responseApi = ref('')
const hasResponse = ref(false)
const createRequest = ref(false)

async function sendText (value){
  createRequest.value = true
  loading.value = true

  await axios.post('/completions', {
    model: "text-davinci-003",
    prompt: value.text,

  }).then(function (response){
    responseApi.value = response.data.choices[0].text
    hasResponse.value = true
    notification.notify({
      text: 'Texto criado com sucesso 🎉',
      type: 'success'
    })
  }).catch(function (error){
    createRequest.value = false
    notification.notify({
      text: "Erro! 😔 Tente novamente",
      type: 'error'
    })
  }).finally(function (){
    loading.value = false
  })

}

function validateText(value) {
  if (!value) {
    return 'Campo é obrigatório';
  }

  if (value.length > 300) {
    return 'Campo não deve ter mais de 300 caracteres';
  }
  return true;
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
}

.card{
  background-color: white;
  width: 50%;
  border-color: white;
  height: auto;
}
.card-body{
  border: 5px;

}
textarea{
  height: 150px;
}

</style>