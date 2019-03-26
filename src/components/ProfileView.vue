<template>
  <div>
    <Header></Header>
    <div class="Header">
      <h1 class="Profile">Profile</h1>
      <b-button @click="getProfile">Populate</b-button>
      <div v-if="rendering === true">
        <b-container>
          <h2>General Details</h2>
          <b-row>
            <b-col>
              <h5>Best Topic:</h5>
              <p>{{bestTopic['TopicName']}}</p>
              <h5>Avg Result</h5>
              <p>{{formatPercentage(bestTopic['AvgResult'])}}%</p>
            </b-col>
          </b-row>
        </b-container>
      </div>
      {{this.questions.length}}
      <div v-if="rendering === true" v-for="(question, index) in questions" :key="index">
        <b-card class="Mcq" >
          <div class="McqHeader">
            <h2 class="McqTitle">Title: {{question['Name']}}</h2>
            <ProfileGraph class="Graph" ref="ProfileGraph" :index="index"></ProfileGraph>
            <p>Average Result of Previous week: {{formatPercentage(weeklyAnalysis[index]['AvgResult'])}}%</p>
            <p>Topic: {{question['Topic']}}</p>
            <p>Last Tried: {{formatDate(weeklyAnalysis[index]['LastModified'])}}</p>
          </div>
          <div v-if="rendering === true" v-for="(q, i) in question['McqQuestions']" :key="i">
            <h3 class="QuestionTitle">Question {{i+1}}: {{q['Question']}}</h3>
            <b-card class="Questions">
              <b-row>
                <b-col>
                  <h5>Weekly</h5>
                  <p>Probability to answer Correctly: {{weeklyAnalysis[index]['WeeklyMcqAnalysisResults'][i]['avg_result'] * 100}}%</p>
                  <p>Time taken to Answer Question: {{weeklyAnalysis[index]['WeeklyMcqAnalysisResults'][i]['avg_time']}}</p>
                  <p>Confidence in Answer: {{weeklyAnalysis[index]['WeeklyMcqAnalysisResults'][i]['AvgConfidenceString']}}</p>
                </b-col>
                <b-col>
                  <h5>Monthly</h5>
                  <p>Probability to answer Correctly: {{weeklyAnalysis[index]['WeeklyMcqAnalysisResults'][i]['avg_result'] * 100}}%</p>
                  <p>Time taken to Answer Question: {{weeklyAnalysis[index]['WeeklyMcqAnalysisResults'][i]['avg_time']}}</p>
                  <p>Confidence in Answer: {{weeklyAnalysis[index]['WeeklyMcqAnalysisResults'][i]['AvgConfidenceString']}}</p>
                </b-col>
                <b-col>
                  <h5>Yearly</h5>
                  <p>Probability to answer Correctly: {{yearlyAnalysis[index]['YearlyMcqAnalysisResults'][i]['avg_result'] * 100}}%</p>
                  <p>Time taken to Answer Question: {{yearlyAnalysis[index]['YearlyMcqAnalysisResults'][i]['avg_time']}}</p>
                  <p>Confidence in Answer: {{yearlyAnalysis[index]['YearlyMcqAnalysisResults'][i]['AvgConfidenceString']}}</p>
                </b-col>
              </b-row>
            </b-card>
          </div>
        </b-card>
      </div>
    </div>
  </div>
</template>
<script>
import {sessionToken, api} from '@/components/LoginView'
import ProfileGraph from '@/components/Profile/ProfileGraph'
import Header from '@/components/Extra/Header'
import axios from 'axios'
import moment from 'moment'
export default {
  name: 'ProfileView',
  components: {ProfileGraph, Header},
  data () {
    return {
      body: [],
      questions: [],
      weeklyAnalysis: [],
      monthlyAnalysis: [],
      yearlyAnalysis: [],
      McqTopics: [],
      bestTopic: [],
      results: [],
      rendering: false
    }
  },
  methods: {
    getBestTopic () {
      console.log('here 1', this.McqTopics)
      for (let index = 0; index < this.McqTopics.length; index++) {
        this.bestTopic = this.McqTopics[0]
        if (this.McqTopics.length > 1 && index > 0 && this.McqTopics[index]['AvgResult'] > this.McqTopics[index - 1]['AvgResult']) {
          this.bestTopic = this.McqTopics[index]
        } else if (this.McqTopics.length === 1) {
          this.bestTopic = this.McqTopics[0]
        }
      }
    },
    formatDate (val) {
      return moment(String(val)).format('DD/MM/YYYY hh:mm')
    },
    formatPercentage (val) {
      return Math.round(val * 10000) / 100
    },
    fillData (index, xAxis, yAxis) {
      this.$refs.ProfileGraph[index].fillData(xAxis, yAxis)
    },
    getProfile () {
      this.getBestTopic()
      this.rendering = true
    }
  },
  updated: function () {
    this.$nextTick(function () {
      // Code that will run only after the
      // entire view has been re-rendered
      for (var index = 0; index < this.questions.length; index++) {
        let xAxis = []
        let yAxis = []
        for (var i = 0; i < this.results[index].length; i++) {
          let y = Math.round(this.results[index][i]['AverageResult'] * 10000) / 100
          yAxis.push(y)
          let x = moment(String(this.results[index][i]['CreatedAt'])).format('DD/MM/YYYY hh:mm')
          xAxis.push(x)
        }
        this.fillData(index, xAxis, yAxis)
      }
    })
  },
  created () {
    axios({
      method: 'get',
      url: api + 'getProfile',
      headers: { 'Authorization': 'Bearer  ' + sessionToken }
    })
      .then((response) => {
        this.body = response.data
        this.questions = response.data['McqQuestions']
        this.weeklyAnalysis = response.data['Weekly']
        this.monthlyAnalysis = response.data['Monthly']
        this.yearlyAnalysis = response.data['Yearly']
        this.results = response.data['Results']
        this.McqTopics = response.data['Topics']
      })
      .catch(error => {
        console.log(error)
        this.errored = true
      })
  }
}
</script>

<style scoped>
.Profile {
  background-color: #4938f8;
  color: white;
  border-bottom-left-radius: 0.2vw;
  border-bottom-right-radius: 0.2vw;
}
.Mcq {

}
.Questions {
  border-width: 0.1vw;
  border-color: black;
}
.QuestionTitle{
  padding: 1vw;
}
.Header{
  margin-left: 6vw;
  margin-right: 6vw;
  border-right-width: 0.2vw;
  border-left-width: 0.2vw;
  border-radius: 0.35vw;
  border-color: #4938f8;
  border-style: solid;
}
.Graph{
  max-height: 30vh;
  max-width: 40vw;
  float: right;
}
.McqHeader{
  overflow: hidden;
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
