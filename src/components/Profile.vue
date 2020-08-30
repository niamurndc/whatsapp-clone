<template>
  <div class="about">
    <div class="head">
      <h2>WhatsApp </h2>
      <div class="icons">
        <i class="fas fa-search"></i>
        <i class="fas fa-ellipsis-v"></i>
      </div>
    </div>
    <div class="profile">
      <div v-for="(room, index) in rooms" :key="index" class="block">
        <img src="../assets/coffee.jpg">
        <div class="clickable" @click="chat(room.name, room.id)">
          <h4>{{room.name}}</h4>
          <p>{{room.lastmsg}}</p>
        </div>
        <p>{{room.time}}</p>
      </div>
    </div>
    <div class="add" @click="addroom">
      <i class="fas fa-plus"></i>
    </div>
  </div>
</template>

<script>
import db from '../firebase/init'
import moment from 'moment'
export default {
  name: 'Profile',
  props: ['name'],
  data(){
    return{
      rooms: []
    }
  },
  methods: {
    addroom(){
      this.$router.push({name: 'AddRoom', params: {name: this.name}})
    },

    chat(rn, id){
      console.log(rn)
      this.$router.push({name: 'Chat', params: {name: this.name, roomname: rn, rid: id}})
    }
  },
  
  created(){
    db.collection('rooms').orderBy('time', 'desc').get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let room = doc.data()
          room.id = doc.id;
          room.time = moment(doc.data().time).format('LT')
          this.rooms.push(room)
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

.icons i{
  margin: 0 10px;
}

.block{
  border-bottom: 1px solid #444;
  padding: 10px 5px;
  display: flex;
  align-items: center;
}

.block img{
  height: 60px;
  width: 60px;
  border-radius: 50%;
  margin: 0 10px;
}

.block div{
  width: 75%;
}

a{
  text-decoration: none;
  color: #000;
}

.block p{
  font-size: 12px;
}

.add{
  position: absolute;
  background: #01d300;
  color: #fff;
  font-size: 20px;
  bottom: 10px;
  right: 10px;
  padding: 17px 20px;
  border-radius: 50%;
  cursor: pointer;
}

.clickable{
  cursor: pointer;
}
</style>
