<template>
    <div class="Main">
      <Header></Header>
      <h2 id="Header">View Groups</h2>
      <b-button class="Search" @click="viewUserGroups">Click</b-button>
      <div class="Search">
        <input type="text" v-model="Search" placeholder="Search title.."/>
        <label>Search title:</label>
      </div>
      <div v-for="(group, index) in FilterdList" :key="index">
        <b-card>
          <h2 class="McqTitle">{{group.title}}</h2>
          <p>{{group.desc}}</p>
          <p>Topic: {{group.topic}}</p>
          <p>Group Average: {{Math.round(group.avgResult * 1000)/10}}%</p>
        </b-card>
      </div>
    </div>
</template>

<script>
import {sessionToken, api} from '@/components/LoginView'
import Header from '@/components/Extra/Header'
import axios from 'axios'
export default {
  name: 'GroupView',
  components: {Header},
  data () {
    return {
      Search: '',
      Code: [],
      Groups: [],
      GroupAnalysis: [],
      GroupList: []
    }
  },
  methods: {
    viewUserGroups () {
      axios({
        method: 'get',
        url: api + 'viewUserGroups',
        headers: { 'Authorization': 'Bearer  ' + sessionToken }
      })
        .then((response) => {
          console.log(response.data)
          this.Code = response.data
          this.Groups = response.data['Groups']
          this.GroupAnalysis = response.data['GroupTopicAnalysis']
          for (let index = 0; index < this.Groups.length; index++) {
            for (let i = 0; i < this.GroupAnalysis.length; i++) {
              console.log(this.GroupAnalysis[i])
              if (this.GroupAnalysis[i]['GroupId'] === this.Groups[index]['GroupId']) {
                let Post = new Group(
                  this.Groups[index]['Name'],
                  this.Groups[index]['Desc'],
                  this.GroupAnalysis[i]['TopicName'],
                  this.GroupAnalysis[i]['AvgResult']
                )
                this.GroupList.push(Post)
              }
            }
          }
        })
        .catch(error => {
          console.log(error)
          this.errored = true
        })
    }
  },
  computed: {
    FilterdList () {
      return this.GroupList.filter(group => {
        console.log(group)
        return group.title.toLowerCase().includes(this.Search.toLowerCase())
      })
    }
  }
}
class Group {
  constructor (title, desc, topic, avgResult) {
    this.title = title
    this.desc = desc
    this.topic = topic
    this.avgResult = avgResult
  }
}
</script>

<style scoped>
.Main{
  margin-left: 10vw;
  margin-right: 10vw;
  border-right-width: 0.2vw;
  border-left-width: 0.2vw;
  border-radius: 0.35vw;
  border-color: #4938f8;
  border-style: solid;
}
#Header{
   text-align: center;
   padding-top: 2vw;
   padding-bottom: 2vw;
   margin-bottom: -0.2vw;
   margin-left: 6vw;
   margin-right: 6vw;
   color: white;
   border-bottom-right-radius: 30vw;
   border-bottom-left-radius: 30vw;
   background-color: #4938f8;
 }
.Search{
  text-align: center;
}
.McqTitle{
  padding-left: 0.5vw;
  margin-right: 28vw;
  color: white;
  border-top-right-radius: 0.25vw;
  border-bottom-right-radius: 0.25vw;
  background-color: #4938f8;
}
</style>
