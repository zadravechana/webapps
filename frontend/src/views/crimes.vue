 <template>
  <div>
    <div class="boja">
      <appNav />
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h1>Crimes</h1>
          </div>
          <div class="col-md-12 filter-inputs" style="margin-bottom: 30px">
            <div>
              <label for="location" style="font-size: 20px">Location:</label>
              <input
                type="text"
                id="location"
                v-model="locationFilter"
                class="input-round"
              />
            </div>
            <div>
              <label for="crime-level" style="font-size: 20px">Crime Level:</label>
              <select
                id="crime-level"
                v-model="crimeLevelFilter"
                class="input-round"
              >
                <option value="">All</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <div>
              <label for="date" style="font-size: 20px">Date:</label>
              <input
                type="date"
                id="date"
                v-model="dateFilter"
                class="input-round"
              />
            </div>
            <div>
              <button @click.prevent="applyFilters" class="btn btn-round">
                Filter
              </button>
            </div>
          </div>
          <div class="col-md-12">
            <div
              class="card text-center"
              style="margin: 20px"
              v-for="crime in filteredCrimes"
              :key="crime._id"
            >
              <div class="card-header">
                Reported by: {{ crime.reporterEmail }}
              </div>
              <div class="card-body">
                <h5 class="card-title">{{ crime.crimeTitle }}</h5>
                <p class="card-text">
                  Address: <span class="capitalize">{{ crime.crimeAddress }}</span
                  >, <span class="capitalize">{{ crime.crimeCity }}</span>
                </p>
                <p class="card-text">Crime Level: {{ crime.crimeLevel }}</p>
                <p class="card-text">Is crime resolved: {{ crime.resolved }}</p>
                <p class="card-text">Description: {{ crime.crimeDesc }}</p>
                <h6 class="card-subtitle mb-2 text-muted text-left">Comments:</h6>
                <p class="text-left" v-if="getCrimeComments(crime._id).length === 0">No comments</p>
                <div
                  v-for="comment in getCrimeComments(crime._id)"
                  :key="comment._id"
                  style="margin-left: 20px"
                  class="text-left"
                >
                  {{ comment.userEmail }} - {{ comment.commentText }}
                  
                  <div
                    v-for="reply in comment.replies"
                    :key="reply._id"
                    style="margin-left: 20px"
                  >
                   - {{ reply.userEmail }} - {{ reply.replyText }}
                  </div>
                  <form
                    @submit.prevent="addReply(comment)"
                    v-if="crime.resolved === 'Not resolved'"
                    style="margin-top: 10px"
                    class="text-center"
                  >
                    <div class="form-group">
                      <input
                        type="text"
                        class="form-control"
                        v-model="comment.newReplyText"
                        placeholder="Enter a reply"
                      />
                    </div>
                    <button type="submit" class="btn btn-primary btn-danger">
                      Add Reply
                    </button>
                  </form>
                </div>
                <form
                  @submit.prevent="addComment(crime)"
                  v-if="crime.resolved === 'Not resolved'"
                  style="margin-top: 10px"
                >
                  <div class="form-group">
                    <input
                      type="text"
                      class="form-control"
                      v-model="crime.newCommentText"
                      placeholder="Enter a comment"
                    />
                  </div>
                  <button type="submit" class="btn btn-primary btn-danger">
                    Add Comment
                  </button>
                </form>
              </div>
              <div class="card-footer text-muted">
                {{ formatDate(crime.crimeDate) }}
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
import appFooter from "@/components/footer.vue";
import appNav from "@/components/nav.vue";
import axios from "axios";

export default {
  name: "crimes",
  components: {
    appFooter,
    appNav,
  },
  data() {
    return {
      comments: [],
      crimes: [],
      filteredCrimes: [],
      email: "",
      locationFilter: "",
      dateFilter: "",
      crimeLevelFilter: ""
    };
  },
  async mounted() {
    await this.fetchCrimes();
    await this.fetchComments();
    await this.fetchUserData();
  },
  methods: {
    applyFilters() {
      let filteredCrimes = this.crimes;

      if (this.dateFilter && this.locationFilter && this.crimeLevelFilter) {
        filteredCrimes = this.crimes.filter(
          (crime) =>
            new Date(crime.crimeDate).toISOString().substring(0, 10) ===
              this.dateFilter &&
            crime.crimeCity
              .toLowerCase()
              .includes(this.locationFilter.toLowerCase()) &&
            crime.crimeLevel === this.crimeLevelFilter
        );
      } else if (this.dateFilter && this.locationFilter) {
        filteredCrimes = this.crimes.filter(
          (crime) =>
            new Date(crime.crimeDate).toISOString().substring(0, 10) ===
              this.dateFilter &&
            crime.crimeCity
              .toLowerCase()
              .includes(this.locationFilter.toLowerCase())
        );
      } else if (this.dateFilter && this.crimeLevelFilter) {
        filteredCrimes = this.crimes.filter(
          (crime) =>
            new Date(crime.crimeDate).toISOString().substring(0, 10) ===
              this.dateFilter && crime.crimeLevel === this.crimeLevelFilter
        );
      } else if (this.locationFilter && this.crimeLevelFilter) {
        filteredCrimes = this.crimes.filter(
          (crime) =>
            crime.crimeCity
              .toLowerCase()
              .includes(this.locationFilter.toLowerCase()) &&
            crime.crimeLevel === this.crimeLevelFilter
        );
      } else if (this.dateFilter) {
        filteredCrimes = this.crimes.filter(
          (crime) =>
            new Date(crime.crimeDate).toISOString().substring(0, 10) ===
            this.dateFilter
        );
      } else if (this.locationFilter) {
        filteredCrimes = this.crimes.filter((crime) =>
          crime.crimeCity
            .toLowerCase()
            .includes(this.locationFilter.toLowerCase())
        );
      } else if (this.crimeLevelFilter) {
        filteredCrimes = this.crimes.filter(
          (crime) => crime.crimeLevel === this.crimeLevelFilter
        );
      }

      this.filteredCrimes = filteredCrimes;
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
    async addComment(crime) {
      const commentText = crime.newCommentText;
      const userEmail = this.email;
      try {
        const response = await axios.post("http://localhost:4000/comment", {
          crimeId: crime._id,
          commentText,
          userEmail,
        });
        const newComment = response.data;
        this.comments.push(newComment);
        crime.newCommentText = "";
        await this.fetchComments();
      } catch (error) {
        console.error("Failed to add comment:", error);
      }
    },
    async addReply(comment) {
      const replyText = comment.newReplyText;
      const userEmail = this.email;
      try {
        const response = await axios.post(
          `http://localhost:4000/comment/${comment._id}/reply`,
          { userEmail, replyText }
        );
        const newReply = response.data;
        comment.replies.push(newReply);
        comment.newReplyText = "";
        await this.fetchComments();
      } catch (error) {
        console.error("Failed to add reply:", error);
      }
    },
    async fetchUserData() {
      try {
        const res = await axios.get("http://localhost:4000/user", {
          headers: { token: localStorage.getItem("token") },
        });
        this.email = res.data.user.email;
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    },
    async fetchCrimes() {
      try {
        const response = await axios.get("http://localhost:4000/crimes");
        response.data.sort(
          (a, b) => new Date(b.crimeDate) - new Date(a.crimeDate)
        );
        this.crimes = response.data;
        this.filteredCrimes = response.data;
      } catch (error) {
        console.error("Failed to fetch crimes:", error);
      }
    },
    formatDate(date) {
      const options = { year: "numeric", month: "2-digit", day: "2-digit" };
      return new Date(date).toLocaleDateString(undefined, options);
    },
  },
};
</script>

<style scoped>
.capitalize {
  text-transform: capitalize;
}
.boja {
  background-size: cover;
  background-position: center;
  background-color: black;
  height: 100%;
}
label {
  color: white;
}
h1 {
  font-size: 70px;
  color: white;
  margin-bottom: 30px;
  font-family: "Norwester", sans-serif;
}
.btn-round {
  border-radius: 20px;
  border: none;
  background-color: #f2f2f2;
  color: black;
  padding: 10px 20px;
  font-size: 16px;
  font-family: "Norwester", sans-serif;
  text-align: center;
}
.input-round {
  background-color: #f2f2f2;
  border-radius: 20px;
  border: none;
  padding: 10px;
  margin: 10px;
  font-size: 16px;
  width: 200px;
  margin-bottom: 20px;
  color: #333;
}
* {
  font-family: "Norwester", sans-serif;
}
.card {
  background-color: #f2f2f2;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  color: black;
}
</style>