<template>
  <div v-loading="loading" class="container py-5">
    <div class="row">
      <div class="5">
        <h1 class="h1 text-info">
          Your name is: {{serverName || `Loading...`}}
        </h1>
        <el-input v-model="name" class="mb-2" placeholder="Enter name">

        </el-input>

        <el-button @click="handleNameSubmit">
          Submit
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false
    }
  },
  computed: {
    name: {
      get () {
        return this.$store.getters.getName
      },
      set (value) {
        this.$store.commit('setName', value)
      }
    },
    serverName () {
      return this.$store.getters.getServerName
    }
  },
  methods: {
    handleNameSubmit () {
      this.$store.dispatch('assignName', { name: this.name })
      .then(() => {
        this.$message.success(`Added successfully`)
      })
      .catch((error) => {
        this.$message.error(`Error: ${error}`)
      })
    },
    fetchData () {
      this.loading = true
      this.$store.dispatch('fetchNameData')
      .then(() => {
        this.loading = false
      })
      .catch((error) => {
        this.loading = false
        this.$message.error(error)
      })
    }
  },
  mounted () {
    this.name = ''
    this.fetchData()
  }
}
</script>
