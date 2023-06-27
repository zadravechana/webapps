<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-black">
      <a class="navbar-brand" href="/home"><img src="@/assets/logo.png" style="height:70px;width:90px;" /></a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <div class="container">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <button class="logout-button" @click.prevent="logOut">LOGOUT</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavbarAdmin",
  data() {
    return {};
  },
  methods: {
    logOut() {
      localStorage.clear();
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped>
.logout-button {
  padding: 5px 10px;
  font-family: 'Norwester', sans-serif;
  background-color: transparent;
  border: none;
  color: white;
  cursor: pointer;
  transition: color 0.3s ease-in-out;
}

.logout-button:hover {
  color: red;
}
</style>
