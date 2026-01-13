<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
const darkMode = ref(false)

function toggleDarkMode() {
  darkMode.value = !darkMode.value
  document.documentElement.classList.toggle('dark')
}
</script>

<template>
  <div class="min-h-screen bg-background transition-colors">
    <!-- Header -->
    <header class="border-b border-border bg-card">
      <div class="container mx-auto px-4 py-4 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="text-2xl">🪸</span>
          <span class="font-bold text-xl text-foreground">CoralCSS + Vue</span>
        </div>
        <button
          @click="toggleDarkMode"
          class="p-2 rounded-lg hover:bg-muted transition-colors"
        >
          {{ darkMode ? '☀️' : '🌙' }}
        </button>
      </div>
    </header>

    <!-- Hero Section -->
    <main class="container mx-auto px-4 py-16">
      <div class="text-center max-w-3xl mx-auto">
        <h1 class="text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
          Welcome to CoralCSS + Vue
        </h1>
        <p class="text-xl text-muted-foreground mb-8">
          The fastest CSS framework with Vue 3 Composition API.
        </p>

        <!-- Counter Card -->
        <div class="bg-card rounded-xl shadow-lg p-8 mb-8 border border-border">
          <p class="text-muted-foreground mb-4">Reactive counter demo</p>
          <div class="flex items-center justify-center gap-4">
            <button
              @click="count--"
              class="w-12 h-12 rounded-lg bg-muted hover:bg-muted/80 transition-colors text-xl font-bold"
            >
              -
            </button>
            <span class="text-4xl font-bold w-20">{{ count }}</span>
            <button
              @click="count++"
              class="w-12 h-12 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-xl font-bold"
            >
              +
            </button>
          </div>
        </div>

        <!-- Feature Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="feature in features"
            :key="feature.title"
            class="bg-card p-6 rounded-xl border border-border hover:shadow-lg hover:scale-105 transition-all cursor-pointer"
          >
            <div class="text-4xl mb-4">{{ feature.icon }}</div>
            <h3 class="font-bold text-lg mb-2">{{ feature.title }}</h3>
            <p class="text-muted-foreground">{{ feature.desc }}</p>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="border-t border-border py-8 mt-16">
      <div class="container mx-auto px-4 text-center text-muted-foreground">
        <p>Built with CoralCSS + Vue 3 + Vite</p>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
const features = [
  { title: 'Vue 3', desc: 'Composition API', icon: '💚' },
  { title: '6x Faster', desc: 'Lightning fast CSS', icon: '⚡' },
  { title: 'TypeScript', desc: 'Full type safety', icon: '📘' },
]

export { features }
</script>
