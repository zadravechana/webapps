<template>
  <div class="slika">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 col-sm-12 d-flex justify-content-between align-items-left">
          <img src="@/assets/logo_stari.png" style="width:100%;height:110%;"/>
        </div>
        <div class="col-lg-4" style="margin-top: 475px;">
          <router-link to="/signup" class="button" style="margin-left:9px;">Sign up</router-link>
          <router-link to="/login" class="button" style="margin-left:12px;">Log in</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'pocetna'
}
</script>

<style scoped>
.slika {
  background-image: url("@/assets/pocetna.jpg");
  background-size: cover;
  background-position: center;
  height: 100vh;
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
    height: auto;
    min-height: 100vh;
  }

  .col-lg-8 {
    flex: 1;
    margin-right: 15px;
  }

  .col-lg-4 {
    display: block;
    margin: auto;
  }

  .button {
    margin-right: 5px;
    margin-bottom: 10px;
    display: inline-block;
    width: 100%;
    max-width: 120px;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>