<script setup lang="ts">
import { onMounted, ref } from 'vue';
import axios from "axios";

  const description = ref("");

  const todos: any = ref([])

  function addItem(){
    if(!description.value || description.value === " ") return;
    if(todos.some((item: any) => item.description.toLowerCase() === description.value.toLowerCase())) return;
    if(todos.filter((item: any) => !item.done).length > 4) return;
    todos.push({ description: description.value, done: false});
    description.value = "";
  }

  function removeItem(item: any){
    todos.splice(todos.indexOf(item), 1);
  }

  function toggleDone (item: any){
    item.done = !item.done
  }

  onMounted(async() => {
    const response = await axios.get("http://localhost:3000/todos")
    todos.value = response.data;
  })
</script>

<template>
  <div v-if="todos.length === 0">
    No Item
  </div>
  <div v-for="item in todos">
    <span :style="{ 'text-decoration': (item.done) ? 'line-through' : ''}">{{ item.description }}</span>
    <button @click="toggleDone(item)">Done/Undone</button>
    <button @click="removeItem(item)">Remove</button>
  </div>
  <hr/>
  <input type="text" v-model="description" @keyup.enter="addItem()" />
</template>

<style scoped>
</style>
