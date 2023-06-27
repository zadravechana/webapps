 <template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-black">
    <a class="navbar-brand" href="/home"><img  src="@/assets/logo.png" style="height:70px;width:90px;"/></a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item" :class="{ active: currentView === 'home' }">
          <router-link class="nav-link" :to="{ name: 'home' }">Home</router-link>
        </li>
        <li class="nav-item" :class="{ active: currentView === 'aboutUs' }">
          <router-link class="nav-link" :to="{ name: 'aboutUs' }">About Us</router-link>
        </li>
        <li class="nav-item" :class="{ active: currentView === 'contact' }">
          <router-link class="nav-link" :to="{ name: 'contact' }">Contact</router-link>
        </li>
        <li class="nav-item" :class="{ active: currentView === 'crimes' }">
          <router-link class="nav-link" :to="{ name: 'crimes' }">Crimes</router-link>
        </li>
        <li class="nav-item" :class="{ active: currentView === 'profile' }">
          <router-link class="nav-link" :to="{ name: 'profile' }">My Profile</router-link>
        </li>
      </ul>
      <ul class="navbar-nav">
        <li class="nav-item">
          <button class="logout-button" @click.prevent="logOut">LOGOUT</button>
        </li>
         <li class="nav-item">
          <router-link class="nav-link" to="/notifications">
            <i class="fa fa-bell"></i>
            <span class="badge badge-danger">{{ unreadNotificationsCount }}</span>
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import axios from 'axios';

export default {
  name: "Navbar",
  data() {
    return {
      showNotifications: false,
      notifications: [],
      userId: '',
      city: ''
    };
  },
  computed: {
    currentView() {
      return this.$route.name;
    },
    unreadNotifications() {
      return this.notifications.filter(
        (notification) => notification.status === 'unread'
      );
    },
    unreadNotificationsCount() {
      return this.unreadNotifications.length;
    }
  },
  async mounted() {
    this.fetchUserData();
    this.fetchNotifications();
    setInterval(this.fetchNotifications, 3000);
  },
  methods: {
    logOut() {
      localStorage.clear();
      this.$router.push('/login');
    },
   async fetchUserData() {
      try {
        const response = await axios.get('https://good-neigbour.onrender.com/user', {
          headers: { token: localStorage.getItem('token') }
        });
        this.city = response.data.user.address;
        this.userId = response.data.user.id;
        console.log(response.data);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    },
    fetchNotifications() {
      const city = this.city;
      const userId = this.userId;
      axios
        .get(`https://good-neigbour.onrender.com/notifications/${city}/${userId}`)
        .then((response) => {
          this.notifications = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  }
};
</script>

<style scoped>
.navbar-nav .nav-link {
    position: relative;
    padding-bottom: 5px;
    font-family: 'Norwester', sans-serif;
}
    
.navbar-nav .nav-link:after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    background-color: red;
    transform: scaleX(0);
    transition: transform 0.3s ease-in-out;
    transform-origin: center;
}   
.navbar-nav .nav-link:hover:after {
    transform: scaleX(1);
}.logout-button {
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