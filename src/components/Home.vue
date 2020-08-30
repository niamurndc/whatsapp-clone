<template>
  <div class="home">
    <img class="logo" src="../assets/whatsapp.png">
    <h3>Welcome</h3>
    <h1>WhatsApp</h1>
    <div class="login">
      <input type="text" placeholder="Enter Your Name" v-model="name">
      <p class="feedback" v-if="feedback != ''">{{feedback}}</p>
      <button @click="login"> Login </button>
    </div>
  </div>
</template>

<script>


export default {
  name: 'Home',
  data(){
    return{
      name: '',
      feedback: ''
    }
  },

  methods: {
    login(){
      if(this.name){
        this.$router.push({name: 'Profile', params: {name: this.name}})
      }else{
        this.feedback = 'Enter a name for login'
      }
    }
  }
}
</script>

<style scoped>
.home{
  text-align: center;
}

.logo{
  margin-top: 120px;
  margin-bottom: 20px;
  height: 120px;
  widows: 120px;
}

.login{
  margin-top: 50px;
}

.login input{
  border: none;
  border-bottom: 1px solid #999;
  display: block;
  width: 300px;
  margin: 5px auto;
  font-size: 20px;
}

.login button{
  background: #01d300;
  color: #fff;
  padding: 10px 20px;
  border: none;
  margin-top: 10px;
}

.feedback{
  color: #fd2111;
  font-size: 12px;
}

button:focus, input:focus{
  outline-width: 0px;
}
</style>
