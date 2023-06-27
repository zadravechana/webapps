<template>
  <div class="boja">
    <appNav />
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <h1>My profile</h1>
        </div>
        <div class="col-md-12" style="margin-top: 20px; margin-bottom: 40px;">
          <div class="row">
            <div class="col-md-12 col-sm-4" style="margin-bottom: 20px;">
              <i class="fas fa-address-card" style="color:red; font-size:24px;"></i>
              <span style="margin-left:10px;font-size:20px;">First name: {{firstname}}</span>
            </div>
            <div class="col-md-12 col-sm-4" style="margin-bottom: 20px;">
              <i class="fas fa-address-card" style="color:red; font-size:24px;"></i>
              <span style="margin-left:10px;font-size:20px;">Last name: {{lastname}}</span>
            </div>
            <div class="col-md-12 col-sm-4" style="margin-bottom: 20px;">
              <i class="fas fa-envelope" style="color:red; font-size:24px;"></i>
              <span style="margin-left:10px;font-size:20px;">Email: {{email}}</span>
            </div>
          </div>
        </div>
        <div class="col-md-12" style="margin-bottom:40px;">
          <h2 style="font-family: 'Norwester', sans-serif;">My reported crimes</h2>
          <div class="col-md-12">
            <div class="card" style="margin:20px;" v-if="crimes.length === 0">
              <div class="card-body">
                <p class="card-text tekst">No reported crimes</p>
              </div>
            </div>
            <div class="card" style="margin:20px; margin-top:50px;" v-else v-for="crime in crimes" :key="crime._id">
              <div class="card-body">
                <h6 class="card-subtitle mb-2 tekst">Title: {{ crime.crimeTitle }}</h6>
                <p class="card-text tekst">Address: <span class="capitalize tekst">{{ crime.crimeAddress }}</span>, <span class="capitalize tekst">{{ crime.crimeCity }}</span></p>
                <p class="card-text tekst">Crime level: {{crime.crimeLevel}}</p>
                <p class="card-text tekst">Is crime resolved: {{crime.resolved}} </p>
                <p class="card-text tekst">Description: {{ crime.crimeDesc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <appFooter />
  </div>
</template>

<script>
import appFooter from '@/components/footer.vue'
import appNav from '@/components/nav.vue'
import axios from 'axios';

export default {
  name: "profile",
  data() {
    return {
      firstname: '',
      lastname: '',
      email: '',
      crimes: []
    }
  },
  components: {
    appFooter,
    appNav
  },
  async mounted() {
    await this.fetchUserData();
    await this.fetchCrimes();
  },
  methods: {
    async fetchUserData() {
      try {
        const response = await axios.get("http://localhost:4000/user", { headers: { token: localStorage.getItem('token') } });
        this.firstname = response.data.user.firstname;
        this.lastname = response.data.user.lastname;
        this.email = response.data.user.email;
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    },
    async fetchCrimes() {
      try {
        const response = await axios.get("http://localhost:4000/crimes");
        const filteredCrimes = response.data.filter(crime => crime.reporterEmail === this.email);
        this.crimes = filteredCrimes;
      } catch (error) {
        console.error("Failed to fetch crimes:", error);
      }
    }
  }
}
</script>

<style scoped>
.capitalize {
  text-transform: capitalize;
}
.boja{
    background-size: cover;
    background-position: center;
    background-color: black;
    height: 100%;
}

h1 {
  font-size: 70px;
  color:white;
  margin-bottom: 30px;
  font-family: 'Norwester', sans-serif;
}

*{
    color:white;
}

.tekst{
    color:black;
    font-family: 'Norwester', sans-serif;
}
</style>
