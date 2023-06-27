<template>
  <div class="boja">
    <appNav />
    <div class="container mt-2">
      <div class="row">
        <div class="col-md-12">
          <div class="welcome-message">
            <h1>Welcome to Good Neighbourgh!</h1>
            <p>The app that connects you with your community to help keep your neighbourhood safe.</p>
            <p>Are you worried about crime in your area? Good Neighbourgh is here to help.</p>
          </div>
          <div class="row justify-content-center">
            <div class="col-md-6">
              <h1 style="margin-top:50px;">Report a crime</h1>
              <form @submit.prevent="reportCrime" class="card">
                <div class="card-body">
                  <div class="form-group">
                    <input type="text" class="form-control" v-model="crimeTitle" placeholder="Enter crime title">
                  </div>
                  <div class="form-group">
                    <input type="text" class="form-control" v-model="crimeAddress" placeholder="Enter crime address">
                  </div>
                  <div class="form-group">
                    <input type="text" class="form-control" v-model="crimeCity" placeholder="Enter crime city">
                  </div>
                  <div class="form-group">
                    <textarea class="form-control" v-model="crimeDesc" placeholder="Enter crime description" rows="5"></textarea>
                  </div>
                  <div class="form-group">
                    <label for="crimeLevel">Crime Level:</label>
                    <select class="form-control" v-model="crimeLevel" id="crimeLevel">
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <button type="submit" class="btn btn-primary btn-danger">Submit</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="row" style="margin-top:30px;">
        <div class="col-md-12">
          <h1 style="font-family: 'Norwester', sans-serif;color:white;margin-top:30px;margin-bottom:30px;">RECENT CRIMES</h1>
          <div class="card" style="margin:20px;" v-for="crime in crimes" :key="crime._id">
            <div class="card-body">
              <h5 class="card-title">Reported by: {{ crime.reporterEmail }}</h5>
              <h6 class="card-subtitle mb-2 text-muted">Title: {{ crime.crimeTitle }}</h6>
              <p class="card-text">Address: <span class="capitalize">{{ crime.crimeAddress }}</span>, <span class="capitalize">{{ crime.crimeCity }}</span></p>
              <p class="card-text">Crime Level: {{crime.crimeLevel}}</p>
              <p class="card-text">Is crime resolved: {{crime.resolved}} </p>
              <p class="card-text">Description: {{ crime.crimeDesc }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <appFooter />
  </div>
</template>

<script>
import axios from 'axios';
import appFooter from '@/components/footer.vue'
import appNav from '@/components/nav.vue'

export default {
  name: "home",
  components: {
    appFooter,
    appNav,
  },
  data() {
    return {
      crimeTitle: '',
      crimeAddress: '',
      crimeCity: '',
      crimeDesc: '',
      email: '',
      crimes: [],
      crimeLevel: 'Low'
    };
  },
  async mounted() {
    await this.fetchUserData();
    await this.fetchCrimes();
  },
  methods: {
    async fetchUserData() {
      try {
        const response = await axios.get("http://localhost:4000/user", { headers: { token: localStorage.getItem('token') } });
        this.email = response.data.user.email;
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    },
    async fetchCrimes() {
      try {
        const response = await axios.get("http://localhost:4000/crimes");
        response.data.sort((a, b) => new Date(b.crimeDate) - new Date(a.crimeDate));
        this.crimes = response.data.slice(0, 5);
      } catch (error) {
        console.error("Failed to fetch crimes:", error);
      }
    },
    async reportCrime() {
      const currentDate = new Date();
      let newCrime = {
        reporterEmail: this.email,
        crimeTitle: this.crimeTitle,
        crimeAddress: this.crimeAddress,
        crimeCity: this.crimeCity,
        crimeDesc: this.crimeDesc,
        crimeDate: currentDate,
        crimeLevel: this.crimeLevel
      };
      try {
        const res = await axios.post("http://localhost:4000/createCrime", newCrime);
        alert("Successfully reported crime!");
        this.crimeTitle = '';
        this.crimeAddress = '';
        this.crimeCity = '';
        this.crimeDesc = '';
        this.crimeLevel = 'Low';
        await this.fetchCrimes();
      } catch (err) {
        alert("Failed to report a crime!");
      }
    },
  },
}
</script>

<style>
.welcome-message {
  background-color: black;
  color: white;
  padding: 20px;
  text-align: center;
}

.welcome-message h1 {
  color: red;
  font-size: 2.5rem;
  margin-bottom: 10px;
  font-family: 'Norwester', sans-serif;
}

h1 {
  color: white;
  font-size: 2.5rem;
  margin-bottom: 30px;
  font-family: 'Norwester', sans-serif;
}

.welcome-message p {
  font-size: 1.2rem;
  margin-bottom: 10px;
  font-family: 'Norwester', sans-serif;
}
.capitalize {
  text-transform: capitalize;
}
.boja {
  background-size: cover;
  background-position: center;
  background-color: black;
  height: 100%;
}
.alert {
  border-color: #b71c1c;
  color: black;
}
.card{
  font-family: 'Norwester', sans-serif;
}
</style>
