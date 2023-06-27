<template>
    <footer>
    <div class="container">
    <div class="row">
      <div class="col-md-3 col-sm-6">
        <h5><a href="/home">Home</a></h5>
      </div>
      <div class="col-md-3 col-sm-6">
        <h5><a href="/contact">Contact</a></h5>
      </div>
      <div class="col-md-3 col-sm-6">
        <h5><a href="/crimes">Crimes</a></h5>
      </div>
      <div class="col-md-3 col-sm-6">
        <h5><a href="/aboutus">About Us</a></h5>
      </div>
    </div>
  </div>
  <p style="margin-top: 20px;font-family: 'Norwester', sans-serif;">&copy; 2023 Good neighbour All Rights Reserved</p>
    </footer>
</template>

<style scoped>
 footer {
  background-color: black;
  color: white;
  padding-top: 50px;
  padding-bottom:20px;
  text-align: center;
  border-top: 2px solid red;
}

footer h5 {
  margin-bottom:20px;
  padding: 0;
  position: relative;
  display: inline-block;
  font-family: 'Norwester', sans-serif;
}

footer a {
  color: white;
  text-decoration: none;
}

footer h5:after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -5px;
  width: 100%;
  height: 2px;
  background-color: red;
  transform: scaleX(0);
  transition: transform 0.3s ease-in-out;
  transform-origin: center;
}

footer h5:hover:after {
  transform: scaleX(1);
}

footer a:hover {
  color: white;
  text-decoration: none;
}
</style>