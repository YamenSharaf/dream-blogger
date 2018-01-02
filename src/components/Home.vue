<template>
  <div class="page--home">
    <div v-loading="loading" class="container">
      <div class="row mt-5">
        <div class="col-12">
          <h1 class="text-center">
            Welcome to Dream blogger
          </h1>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-md-8">
          
        </div>
        <div class="col-md-4 d-flex justify-content-end">
          <el-button @click="$router.push({ name: 'WriteBlog' })">
            Write new blog
          </el-button>          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NameSaver from './NameSaver'

export default {
  components: {
    'name-saver': NameSaver
  },
  data () {
    return {
      loading: false
    }
  },
  computed: {
    user () {
      return this.$store.getters.getUserStatus
    }
  }
}
</script>
