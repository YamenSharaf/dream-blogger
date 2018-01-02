<template>
  <nav>
    <b-navbar toggleable="md" type="dark" variant="primary">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand to="/">Dream Blogger</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">

        <b-navbar-nav>
          <b-nav-item to="/">Posts</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item v-if="!userStatus.loggedIn" :to="{ name: 'Register' }">Register</b-nav-item>         
          <b-nav-item v-if="!userStatus.loggedIn" :to="{ name: 'Login' }">Login</b-nav-item>         

          <b-nav-item-dropdown v-if="userStatus.loggedIn" right>
            <!-- Using button-content slot -->
            <template slot="button-content">
              <em>{{userStatus.email}}</em>
            </template>
            <b-dropdown-item :to="{name: 'Profile'}" >Profile</b-dropdown-item>
            <b-dropdown-item @click="handleUserLogOut">Signout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>

      </b-collapse>
    </b-navbar>
  </nav>
</template>

<script>
export default {
  name: 'app-navbar',
  computed: {
    userStatus () {
      return this.$store.getters.getUserStatus
    }
  },
  methods: {
    handleUserLogOut () {
      this.$store.dispatch('logUserOut')
      .then(() => {
        window.localStorage.clear()
      })
      this.$router.push({ name: 'Home' })
    }
  }
}
</script>
