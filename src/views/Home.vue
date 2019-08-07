<template>
<div class="row">
        <v-container grid-list fill-height>
          <v-card color="#B4975A">
            <v-img src="../assets/gk.png" height = "452px"></v-img>
              <v-layout row>
                <v-flex>  
                  <div>
                    <div color="white" id="search">
                      <br/>
                      <input
                        id="location-input"
                        type="text"
                        ref="input"
                        placeholder="Location?"
                        STYLE="background-color: white; font-color: black; font-weight: bold; size: 20; border: thick solid red;"
                        @keyup.enter="organizeAllDetails"
                      >
                      &nbsp;
                      <v-btn color="black" id="search-btn" @click="organizeAllDetails">
                        <v-icon color="white"> mdi-magnify </v-icon>
                      </v-btn>
                    </div>
                    <div id="info">
                      <div class="wrapper-left">
                        <div id="current-weather" class="white--text">
                          <h1>{{ currentWeather.temp }} °F </h1>
                        </div>
                        <div id="weather-desc" class="white--text"><i>{{ currentWeather.summary }}</i></div>
                        <div class="temp-max-min">
                          <div class="max-desc">
                            <div id="max-detail" class="white--text">
                              <i>▲</i>
                              {{ currentWeather.todayHighLow.todayTempHigh }}
                              <span>°F</span> at {{ currentWeather.todayHighLow.todayTempHighTime }}
                            </div>
                          </div>
                          <div class="min-desc">
                            <div id="min-detail" class="white--text">
                              <i>▼</i>
                              {{ currentWeather.todayHighLow.todayTempLow }}
                              <span>°F</span> at {{ currentWeather.todayHighLow.todayTempLowTime }}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="wrapper-right">
                        <div class="date-time-info">
                          <div id="date-desc">
                            <v-icon color="white">mdi-calendar</v-icon>
                            {{ currentWeather.time }}
                          </div>
                        </div>
                        <div class="location-info">
                          <div id="location-desc" class="red--text">
                            <v-icon color="white"> mdi-google-maps</v-icon>
                            <strong><u>
                            {{ currentWeather.full_location }}</u></strong>
                            <div id="location-detail" class="mt-1">
                              Lat: {{ currentWeather.formatted_lat }}
                              <br>
                              Long: {{ currentWeather.formatted_long }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </v-flex>
              </v-layout> 
        </v-card>
        <v-layout row wrap>
          <v-flex> 
              <dashboard-content
                class="col-md-9 col-sm-8 col-xs-12 content"
                id="dashboard-content"
                :highlights="highlights"
                :tempVar="tempVar">
              </dashboard-content>
          </v-flex>
        </v-layout>
      </v-container>
</div>
</template>

<script>
import Content from '../components/Content.vue';
import utilityMixins from '../components/mixins/utility';


    
export default {
  name: 'app',
  props: [],
  components: {
    'dashboard-content': Content,
    
      
  },
  data() {
    return {
      weatherDetails: false,
      location: '', // raw location from input
      lat: '', // raw latitude from google maps api response
      long: '', // raw longitude from google maps api response
      completeWeatherApi: '', // weather api string with lat and long
      rawWeatherData: '', // raw response from weather api
      currentWeather: {
        full_location: '', // for full address
        formatted_lat: '', // for N/S
        formatted_long: '', // for E/W
        time: '',
        temp: '',
        todayHighLow: {
          todayTempHigh: '',
          todayTempHighTime: '',
          todayTempLow: '',
          todayTempLowTime: ''
        },
        summary: '',
        possibility: ''
      },
      tempVar: {
        tempToday: [
          // gets added dynamically by this.getSetHourlyTempInfoToday()
        ],
      },
      highlights: {
        uvIndex: '',
        visibility: '',
        windStatus: {
          windSpeed: '',
          windDirection: '',
          derivedWindDirection: ''
        },
      }
    };
  },
 
  mounted: async function() {
    this.location = "Las Vegas";
    await this.organizeAllDetails();  
    
  },
  mixins:[utilityMixins]
};
</script>