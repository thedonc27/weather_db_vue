<template>
  <div class="highlights-item col-md-4 col-sm-6 col-xs-12 border-left border-right  border-top">
    <div>
    <div class="card-heading pt-5"><b>Wind Status</b></div>
    <div class="row pt-4 mt-4">
      <div class="col-sm-6 col-md-6 mt-2 text-center align-middle">
        <p class="card-sub-heading mt-3">Wind Direction</p><br/>
        <p class="mt-4"><v-icon color="#333F42" x-large>mdi-weather-windy</v-icon></p><br/>
        <p class="card-value mt-4">{{ highlights.windStatus.derivedWindDirection }}</p>
      </div>
      <div class="col-sm-6 col-md-6 mt-2">
        <p class="card-sub-heading mt-3">Wind Speed</p><br/>
        <p class="mt-4"><v-icon color="#333F42" x-large>mdi-speedometer</v-icon></p><br/>
        <p class="card-value mt-4">{{ highlights.windStatus.windSpeed }} miles/hour</p>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["highlights"],
  components: {},
  data() {
    return {};
  },
  methods: {},
  computed: {}
};
</script>