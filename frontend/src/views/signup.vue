<template>
  <div class="slika">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <h1>SIGN UP</h1>
        </div>
        <form @submit.prevent="registerUser">
          <div class="col-lg-12" style="margin-top: 20px;">
          <p>
            Have an account? <router-link style="text-decoration: none;color:gray;" to="/login">click here</router-link>
          </p>
          </div>
          <div class="col-lg-6">
            <input type="text" v-model="firstname" name="firstName" placeholder="YOUR FIRST NAME..." required autocomplete="off">
          </div>
          <div class="col-lg-6">
            <input type="text" v-model="lastname" name="lastName" placeholder="YOUR LAST NAME..." required autocomplete="off">
          </div>
          <div class="col-lg-6 d-flex">
            <input :type="showPassword ? 'text' : 'password'" name="pass" class="input" placeholder="ENTER PASSWORD..." v-model="password" required autocomplete="off">
            <button class="button" @click="toggleShowPassword" style="border: none; background-color: #060706;">
              <span class="icon is-small">
                <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
              </span>
            </button>
          </div>
          <div class="col-lg-6 d-flex">
            <input :type="showConfirmPassword ? 'text' : 'password'" class="input" name="confirmPass" placeholder="CONFIRM PASSWORD..." v-model="confirmPass" required autocomplete="off">
            <button class="button" @click="toggleShowConfirmPassword" style="border: none; background-color: #060706;">
              <span class="icon is-small">
                <i :class="showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
              </span>
            </button>
          </div>
          <div class="col-lg-6">
            <input v-model="email" type="email" name="email" placeholder="YOUR EMAIL..." required autocomplete="off">
          </div>
          <div class="col-lg-6">
            <input v-model="address" type="text" name="address" placeholder="THE CITY WHERE YOU LIVE..." required autocomplete="off">
          </div>
          <div class="col-lg-9 text-center">
            <button class="submit button" style="margin-top:20px;">Sign up</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: 'signup',
  data() {
    return {
      showPassword: false,
      showConfirmPassword: false,
      confirmPass:'',
      firstname: '',
      lastname: '',
      password: '',
      email: '',
      address: ''
    };
  },
  computed: {
    passwordButtonLabel() {
      return this.showPassword ? 'Hide' : 'Show';
    },
    confirmPasswordButtonLabel() {
      return this.showConfirmPassword ? 'Hide' : 'Show';
    }
  },
  methods: {
    toggleShowPassword() {
      this.showPassword = !this.showPassword;
    },
    toggleShowConfirmPassword() {
      this.showConfirmPassword = !this.showConfirmPassword;
    },
    registerUser() {
      let newUser ={
        firstname:this.firstname,
        lastname:this.lastname,
        password:this.password,
        email:this.email,
        address:this.address
      }
      console.log(newUser);
      axios.post("http://localhost:4000/register", newUser).then(res =>{
        console.log(res);
        alert("Registered successfully!");
        this.$router.push("/login");
      },err=>{
        alert(err.response.data.error);
      });
  }
  }
};
</script>


<style scoped>
input {
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #DD0202;
  outline: none;
  font-size: 20px;
  color: white;
  font-family: 'Norwester', sans-serif;
  padding: 5px;
  display: block;
  margin-bottom: 25px;
}

h1 {
  font-family: 'Norwester', sans-serif;
  color: white;
  font-size: 120px;
  margin-top: 30px;
  margin-bottom: 30px;
}

.slika {
  background-image: url("@/assets/pocetna.jpg");
  background-size: cover;
  background-position: center;
  height: 100vh;
}
p{
    font-family: 'Norwester', sans-serif;
    color:white;
  }
.button {
  background-color: #111010;
  border: 2px solid #98938a;
  border-radius: 25px;
  color: #fff;
  font-size: 1rem;
  padding: 10px 20px;
  text-transform: uppercase;
  transition: all 0.2s;
  margin-right: 10px;
  height: 50px;
  text-decoration: none;
}

.button:hover {
  background-color: #f6f7f7;
  color: #98938a;
}

@media only screen and (max-width: 992px) {
  .slika {
    height: 140vh;
  }

  h1 {
    font-size: 80px;
    margin-top: 15px;
    margin-bottom: 15px;
  }
}
</style>
