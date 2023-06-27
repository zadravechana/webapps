<template>
<div class="boja">
<appNav />
<div class="container">
    <div class="row">
        <section class="about-us">
  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <h1>About Us</h1>
        <p class="lead">A community-based web app called Good Neighbourgh was created to bring neighbours together and support neighbourhood safety. Users of the app can notify their neighbours of any threats by reporting any suspicious activities or occurrences in their neighbourhood. Additionally, it offers real-time data on neighbourhood crime patterns and enables users to work together on local projects and plan neighborhood activities.</p>
        <p>Users may collaborate to build safer, more connected communities by utilizing Good Neighbourgh. The app is an effective tool for fostering a feeling of civic duty among neighbours and creating stronger communities. By using Good Neighbourgh, you can actively contribute to creating a better and safer neighbourhood.</p>
      </div>
      <div class="col-md-6">
        <img src="@/assets/teams.jpg" alt="Good Neighbourgh App" class="img-fluid">
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <h2>Our Mission</h2>
        <p>We believe that every person deserves to feel safe and connected in their community. That's why we created Good Neighbourgh, to help neighbors come together and look out for each other. Our mission is to empower communities to create safer and more inclusive neighbourhoods, where everyone can thrive.</p>
      </div>
    </div>
  </div>
</section>
    <section class="testimonials">
  <div class="container">
    <div class="row">
      <div class="col-md-12" style="margin-bottom:30px;">
        <h2>Testimonials</h2>
        <div class="testimonial row">
          <div class="col-md-6">
            <blockquote>
              <p>"I have been using Good Neighbourgh for over a year now and it has completely changed the way I feel about my neighborhood. Not only am I more aware of potential threats, but I also feel more connected to my community. I highly recommend this app to anyone who wants to make a positive impact in their neighborhood."</p>
              <cite>- Sarah M.</cite>
            </blockquote>
          </div>
          <div class="col-md-6" style="margin-bottom:40px;">
            <img src="@/assets/sarah.jpg" alt="person" class="img-fluid">
          </div>
        </div>
        <div class="testimonial row">
          <div class="col-md-6">
            <blockquote>
              <p>"As a mother of two young children, safety is my top priority. Good Neighbourgh has given me peace of mind knowing that I can quickly alert my neighbors of any suspicious activity in our area. The collaboration and support that this app has fostered among neighbors is truly inspiring." </p>
              <cite>- Maria L.</cite>
            </blockquote>
          </div>
          <div class="col-md-6" style="margin-bottom:40px;">
            <img src="@/assets/mariah.jpg" alt="person" class="img-fluid">
          </div>
        </div>
       <div class="testimonial row">
          <div class="col-md-6">
            <blockquote>
              <p>"I moved to a new city and didn't know anyone in my neighborhood. Good Neighbourgh helped me connect with my neighbors and get involved in local initiatives. I am grateful for this app for making me feel like a part of the community."</p>
              <cite>- John D.</cite>
            </blockquote>
          </div>
          <div class="col-md-6" style="margin-bottom:40px;">
            <img src="@/assets/john.jpg" alt="person" class="img-fluid">
          </div>
        </div>
         <div class="testimonial row">
          <div class="col-md-6">
            <blockquote>
              <p>"Good Neighbourgh is more than just an app, it's a movement. It has encouraged me and my neighbors to take responsibility for our neighborhood's safety and well-being. I am proud to be a part of this community."</p>
              <cite>- David S.</cite>
            </blockquote>
          </div>
          <div class="col-md-6" style="margin-bottom:40px;">
            <img src="@/assets/david.jpg" alt="person" class="img-fluid">
          </div>
        </div>
        <div class="testimonial row">
          <div class="col-md-6">
            <blockquote>
              <p>"I never realized how much of an impact a simple app could have on my neighborhood. Good Neighbourgh has brought us closer together and made us more aware of our surroundings. I am grateful for this app and the positive change it has brought to our community."</p>
              <cite>- Jessica T.</cite>
            </blockquote>
          </div>
          <div class="col-md-6" style="margin-bottom:40px;">
            <img src="@/assets/jessica.jpg" alt="person" class="img-fluid">
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</div>
</div>
<appFooter />
</div>
</template>


<script>
import appFooter from '@/components/footer.vue'
import appNav from '@/components/nav.vue'
export default{
    name:"aboutUs",
    components:{
        appFooter,
        appNav
    }
}
</script>

<style scoped>
.testimonial{
    color:white;
}
.testimonials h2 {
  color: white;
  font-family: 'Norwester', sans-serif;
  margin-bottom: 30px;
}
.boja{
    background-size: cover;
    background-position: center;
    background-color: black;
    height: 100%;
    }
.about-us{
  margin-top:30px;  
  color:white;
}

.about-us h1 {
  font-size: 70px;
  margin-bottom: 30px;
  font-family: 'Norwester', sans-serif;
}

.about-us p {
  font-size: 18px;
  line-height: 1.5;
  margin-bottom: 30px;
}

.about-us img {
  margin-top: 210px;
}

.about-us h2 {
  margin-top: 30px;
  margin-bottom: 30px;
  font-family: 'Norwester', sans-serif;
}

.about-us h3::after {
  content: "";
  display: block;
  width: 50px;
  height: 3px;
  background-color: #dc3545;
  margin-top: 10px;
}

.about-us p.lead {
  font-size: 22px;
  line-height: 1.5;
  margin-bottom: 50px;
}

@media (max-width: 768px) {
  .about-us {
    padding: 50px 0;
  }

  .about-us img {
    margin-top: 0;
  }
}
</style>