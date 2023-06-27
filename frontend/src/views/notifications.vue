<template>
  <div class="boja">
    <appNav />
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <h1>Notifications</h1>
          <div style="color:white;font-size:30px;font-family: 'Norwester', sans-serif;margin-bottom:360px;" v-if="notifications.length === 0" class="no-notification">
            No new notifications
          </div>
          <div class="card" v-for="notification in notifications" :key="notification._id" :class="{'read': notification.status === 'read', 'unread': notification.status === 'unread'}">
            <div class="card-body">
              <h5 class="card-title">{{ notification.title }}</h5>
              <p class="card-text">{{ notification.description }}</p>
              <button v-if="notification.status === 'unread'" class="btn btn-primary btn-danger" @click="markAsRead(notification)">Mark as Read</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <appFooter style="margin-top:230px;"/>
  </div>
</template>

<script>
import axios from 'axios';
import appFooter from '@/components/footer.vue';
import appNav from '@/components/nav.vue';

export default {
  name: "notifications",
  components: {
    appFooter,
    appNav
  },
  data() {
    return {
      notifications: [],
      city: '',
      userId: '',
    };
  },
  async mounted() {
    await this.fetchUserData();
    this.fetchNotifications();
  },
  methods: {
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
    markAsRead(notification) {
      notification.status = 'read';
      axios
        .put(`https://good-neigbour.onrender.com/notifications/${notification._id}`, notification)
        .then(() => {
          this.fetchNotifications();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  },
}
</script>

<style scoped>
h1 {
  font-size: 70px;
  color: white;
  margin-bottom: 30px;
  font-family: 'Norwester', sans-serif;
}
.boja {
  background-size: cover;
  background-position: center;
  background-color: black;
  height: 100%;
}

.read {
  background-color: lightgray; 
}

.unread {
  border: 7px solid red;
}

.card {
  margin-bottom: 20px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-body {
  padding: 20px;
}

.card-title {
  font-size: 20px;
  font-weight: bold;
}

.card-text {
  font-size: 16px;
  margin-bottom: 10px;
}

.btn-primary {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}
</style>
