<template>
  <div class="boja">
    <adminNav />
    <div class="container">
      <h1>REPORTED CRIMES</h1>
      <div v-for="crime in crimes" :key="crime._id" class="card">
        <div class="card-header">
          Reported by: {{ crime.reporterEmail }}
        </div>
        <div class="card-body">
          <h5 class="card-title">{{ crime.crimeTitle }}</h5>
          <p class="card-text">Address: <span class="capitalize">{{ crime.crimeAddress }}</span>, <span class="capitalize">{{ crime.crimeCity }}</span></p>
          <p class="card-text">Crime Level: {{ crime.crimeLevel }}</p>
          <p class="card-text">Is crime resolved: {{crime.resolved}} </p>
          <p class="card-text">Description: {{ crime.crimeDesc }}</p>
          <h6 class="card-subtitle mb-2 text-muted">Comments:</h6>
          <transition-group name="fade">
            <div v-for="comment in getCrimeComments(crime._id)" :key="comment._id">
              <transition name="fade" mode="out-in">
                <div v-if="!comment.deleted">
                  {{ comment.userEmail }} - {{ comment.commentText }}
                  <transition-group name="fade">
                    <div v-for="reply in comment.replies" :key="reply._id" class="ml-2">
                      {{ reply.userEmail }} - {{ reply.replyText }}
                      <button class="btn btn-round btn-danger m-1" @click="deleteReply(comment._id, reply._id)">Delete Reply</button>
                    </div>
                  </transition-group>
                  <button class="btn btn-round btn-danger" @click="deleteComment(comment._id)">Delete Comment</button>
                </div>
              </transition>
            </div>
          </transition-group>
          <p v-if="getCrimeComments(crime._id).length === 0">No comments</p>
          <button class="btn btn-round btn-danger m-2" @click="deleteCrime(crime._id)">Delete Crime</button>
          <button class="btn btn-round btn-danger btn-block" v-if="crime.resolved === 'Not resolved'" @click="markCrimeAsResolved(crime._id)">Mark as Resolved</button>
        </div>
      </div>
    </div>
    <appFooter />
  </div>
</template>



<script>
import appFooter from "@/components/footer.vue";
import adminNav from "@/components/navAdmin.vue";
import axios from "axios";

export default {
  name: "admin",
  components: {
    appFooter,
    adminNav,
  },
  data() {
    return {
      crimes: [],
      comments: [],
    };
  },
  async mounted() {
    await this.fetchCrimes();
    await this.fetchComments();
  },
  methods: {
    async fetchCrimes() {
      try {
        const response = await axios.get("http://localhost:4000/crimes");
        this.crimes = response.data;
      } catch (error) {
        console.error("Failed to fetch crimes:", error);
      }
    },
    async fetchComments() {
      try {
        const response = await axios.get("http://localhost:4000/getComments");
        this.comments = response.data;
      } catch (error) {
        console.error("Failed to fetch comments:", error);
      }
    },
    getCrimeComments(crimeId) {
      return this.comments.filter((comment) => comment.crimeId === crimeId);
    },
    async deleteComment(commentId) {
      try {
        await axios.delete(`http://localhost:4000/comments/${commentId}`);
        await this.fetchComments();
      } catch (error) {
        console.error("Failed to delete comment:", error);
      }
    },
    async deleteReply(commentId, replyId) {
      try {
        await axios.delete(`http://localhost:4000/${commentId}/replies/${replyId}`);
        await this.fetchComments();
      } catch (error) {
        console.error("Failed to delete reply:", error);
      }
    },
    async deleteCrime(crimeId) {
      try {
        await axios.delete(`http://localhost:4000/crimes/${crimeId}`);
        await this.fetchCrimes();
      } catch (error) {
        console.error("Failed to delete crime:", error);
      }
    },
    async markCrimeAsResolved(crimeId) {
      try {
        await axios.put(`http://localhost:4000/markCrime/${crimeId}`);
        await this.fetchCrimes();
        alert("resolved");
      } catch (error) {
        console.error("Failed to mark crime as resolved:", error);
      }
    },
  },
};
</script>

<style scoped>
.boja {
  background-size: cover;
  background-position: center;
  background-color: black;
  height: 100%;
}

.capitalize {
  text-transform: capitalize;
}

.container {
  padding: 20px;
}

.card {
  background-color: #f2f2f2;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  color: black;
  font-family: 'Norwester', sans-serif;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-move {
  transition: transform 0.5s;
}

.fade-move-up {
  transform: translateY(-20px);
}

.fade-move-down {
  transform: translateY(20px);
}
</style>
