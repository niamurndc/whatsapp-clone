<template>
  <div class="about">
    <div class="head">
      <div class="name">
        <i @click="back" class="fas fa-arrow-left"></i>
        <img src="../assets/coffee.jpg">
        <h2>{{roomname}}</h2>
      </div>
      <div class="icons">
        <i class="fas fa-video"></i>
        <i class="fas fa-phone"></i>
        <i class="fas fa-ellipsis-v"></i>
      </div>
    </div>
    <div class="messages" v-chat-scroll>
      <div v-for="msg in texts" :key="msg.index">
        <div v-if="msg.name == name" class="msg-right"><span>{{msg.text}} <small>{{msg.time}}</small></span></div>
        <div v-else class="msg-left"><p class="uname">{{msg.name}}</p><span>{{msg.text}} <small>{{msg.time}}</small></span></div>
      </div>
    </div>
    <form @submit.prevent="addtext">
    <div class="entermsg">
      <i class="far fa-laugh"></i>
      <input type="text" placeholder="Aa" v-model="text">
      <button type="submit"><i class="fas fa-location-arrow"></i></button>
    </div>
    </form>
  </div>
</template>

<script>
import Vue from 'vue'
import db from '../firebase/init'
import moment from 'moment'
import VueChatScroll from 'vue-chat-scroller'

Vue.use(VueChatScroll)
export default {
  name: 'Chat',
  props: ['name', 'roomname', 'rid'],
  data(){
    return{
      texts: '',
      text: '',
      username: ''
    }
  },
  methods: {
    back(){
      this.$router.push({name: 'Profile', params: {name: this.name}})
    },
    addtext(){
      
      db.collection('texts').add({
        roomname: this.roomname,
        name: this.name,
        text: this.text,
        time: Date.now()
      })
        .then(() => {
          console.log('added')

          db.collection('rooms').doc(this.rid).update({
            lastmsg: this.text,
            time: Date.now()
          })
            .then(() => console.log('updated'))
            .catch(err => console.log(err))

          this.text = ''
        })
        .catch(err => console.log(err))
    }
  },

  created(){
    let message = []
      let ref = db.collection('texts').orderBy('time')
      ref.onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if(change.type == 'added'){
            let data = change.doc.data()
            data.time = moment(change.doc.data().time).format('LT')
            message = [...message, data]
            this.texts = message.filter(mesg => mesg.roomname === this.roomname);
            console.log(this.texts)
          }
        })
      })
    
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

.uname{
  font-size: 11px;
  font-weight: bold;
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

.icons i{
  margin: 0 10px;
}

.block{
  border-bottom: 1px solid #444;
  padding: 10px 5px;
  display: flex;
  align-items: center;
}

.name img{
  height: 40px;
  width: 40px;
  border-radius: 50%;
  margin: 0 10px;
}

.block div{
  width: 75%;
}

.msg-left{
  text-align: left;
  padding: 5px 15px;
}

.msg-left span{
  background: #ddd;
  color: #000;
  display: inline;
  padding: 1px 5px;
  border-radius: 3px;
}

.msg-right{
  text-align: right;
  padding: 5px 15px;
}

.msg-right span{
  background: #00ff158c;
  color: #000;
  display: inline;
  padding: 1px 5px;
  border-radius: 3px;
}

small{
  font-size: 10px;
}

a{
  text-decoration: none;
  color: #000;
}

.block p{
  font-size: 12px;
}

.messages{
  height: 86vh;
  overflow: auto;
}

.messages::-webkit-scrollbar{
  width: 3px;
}

.messages::-webkit-scrollbar-thumb{
  background: #999;
}

.messages::-webkit-scrollbar-track{
  background: #eee;
}

.entermsg{
  background: #aaa;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.entermsg input{
  font-size: 20px;
  padding: 6px 10px;
  border-radius: 15px;
  width: 370px;
  border: none;
  margin: 10px;
  background: #eee;
}

.entermsg button{
  font-size: 20px;
  padding: 7px 10px;
  border-radius: 50%;
  background: #01d300;
  border: none;
  color: #fff;
}

.fa-laugh{
  color: #eee;
  font-size: 30px;
}

.entermsg button:focus, .entermsg input:focus{
  outline-width: 0px;
}

</style>
