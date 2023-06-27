<template>
  <div class="boja">
    <appNav />
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h1>Contact Us</h1>
          </div>
          <div class="contact col-md-6">
            <p style="font-size:23px;">Phone: 555-333</p>
            <p style="font-size:23px;">E-mail: goodneighbur@gmail.com</p>
            <p style="font-size:23px;">Address: Ul. Petra Preradovica 9, Pula</p>
          </div>
          <div class="contact col-md-6">
          </div>
          <div class="contact col-md-12">
             <p style="color:red;font-size:20px;">
             Don't hesitate to contact us with any information or concerns regarding a crime or other matter. Your safety and well-being
              are our top priorities, and we are here to assist you. Don't hesitate to contact us. We are committed to maintaining 
              confidentiality and treating all information with the utmost respect. Together, we can make a difference and create safer 
              communities. Please use the contact details above to get in touch with our team.
            </p>
            <p style="color:red;font-size:20px;">We look forward to hearing from you!</p>
          </div>
        </div>
      </div>
    <appFooter/>
  </div>
</template>


<script>
import appFooter from '@/components/footer.vue'
import appNav from '@/components/nav.vue'
export default{
    name:"contact",
    components:{
        appFooter,
        appNav
    },
}
</script>

<style scoped>
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
.input-round {
  background-color: #f2f2f2;
  border-radius: 20px;
  border: none;
  padding: 10px;
  font-size: 16px;
  width: 300px;
  margin-bottom: 20px;
  color: #333;
}
* {
  color: white;
  font-family: 'Norwester', sans-serif;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.btn-round {
  border-radius: 20px;
  border: none;
  background-color: #f2f2f2;
  color: black;
  padding: 10px 20px;
  font-size: 16px;
  font-family: 'Norwester', sans-serif;
  text-align: center;
}
 .contact {
  margin-top:75px;
 }
@media only screen and (max-width: 768px) {
  .contact {
    margin-top: 10px;
    margin-bottom:20px;
  }
}

</style>