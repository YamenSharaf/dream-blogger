<template>
  <div class="page-wrapper">
    <div v-loading="loading" class="container page-wrapper d-flex flex-center">
      <div class="row">
        <div class="col-12">
          <h1>
            Welcome to name saver
          </h1>
        </div>
        <div class="col-12">
          <name-saver v-if="user.loggedIn"/>
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
