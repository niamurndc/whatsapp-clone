<template>
  <div class="about">
    <div class="head">
      <div class="name">
        <router-link to="/profile"><i class="fas fa-arrow-left"></i></router-link>
        <h2>Add New Room</h2>
      </div>
      <div class="icons">
        <i class="fas fa-search"></i>
        <i class="fas fa-ellipsis-v"></i>
      </div>
    </div>
    <div class="profile">
      <div class="login">
        <input type="text" placeholder="Enter Your Name" v-model="roomname">
        <p class="feedback" v-if="feedback != ''">{{feedback}}</p>
        <button @click="addroom"> Create Room </button>
      </div>
    </div>
  </div>
</template>

<script>
import db from '../firebase/init'
export default {
  name: 'AddRoom',
  props: ['name'],
  data(){
    return{
      roomname: ''
    }
  },
  methods: {
    addroom(){
      db.collection('rooms').add({
        name: this.roomname,
        lastmsg: 'New romm, No message',
        time: Date.now()
      })
        .then(() => {
          console.log('added successfull')
          this.$router.push({name: 'Profile', params: {name: this.name, roomname: this.roomname}})
          this.roomname = ''
        })
        .catch(err => console.log(err))
      
    }
  }
}
</script>

<style scoped>
.head{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background: #262c26;
  color: #fff
}

.icons i{
  margin: 0 10px;
}

.login{
  margin-top: 50px;
  text-align: center;
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

.name{
  display: flex;
  align-items: center;
}

.name h2{
  margin: 0 10px;
}

.name a{
  color: #fff;
}

</style>
