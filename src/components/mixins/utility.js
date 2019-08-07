export default {
  methods: {
    convertToTitleCase: function(str) {
      str = str.toLowerCase().split(" ");
      for (var i = 0; i < str.length; i++) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
      }
      return str.join(" ");
    },
    formatPossibility: function(str) {
      str = str.toLowerCase().split("-");
      for (var i = 0; i < str.length; i++) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
      }
      return str.join(" ");
    },
    unixToHuman: function(timezone, timestamp) {
      var moment = require("moment-timezone"); // for handling date & time
      var decipher = new Date(timestamp * 1000);
      var human = moment(decipher)
        .tz(timezone)
        .format("llll");
      var timeArray = human.split(" ");
      var timeNumeral = timeArray[4];
      var timeSuffix = timeArray[5];
      var justTime = timeNumeral + " " + timeSuffix;
      var monthDateArray = human.split(",");
      var monthDate = monthDateArray[1].trim();
      return {
        fullTime: human,
        onlyTime: justTime,
        onlyMonthDate: monthDate
      };
    },
    fah: function(tempInFahrenheit) {
      var tempInFah = Math.round(tempInFahrenheit);
      return tempInFah;
    },
    deriveWindDir: function(windDir) {
      var wind_directions_array = [
        { minVal: 0, maxVal: 30, direction: "N" },
        { minVal: 31, maxVal: 45, direction: "NNE" },
        { minVal: 46, maxVal: 75, direction: "NE" },
        { minVal: 76, maxVal: 90, direction: "ENE" },
        { minVal: 91, maxVal: 120, direction: "E" },
        { minVal: 121, maxVal: 135, direction: "ESE" },
        { minVal: 136, maxVal: 165, direction: "SE" },
        { minVal: 166, maxVal: 180, direction: "SSE" },
        { minVal: 181, maxVal: 210, direction: "S" },
        { minVal: 211, maxVal: 225, direction: "SSW" },
        { minVal: 226, maxVal: 255, direction: "SW" },
        { minVal: 256, maxVal: 270, direction: "WSW" },
        { minVal: 271, maxVal: 300, direction: "W" },
        { minVal: 301, maxVal: 315, direction: "WNW" },
        { minVal: 316, maxVal: 345, direction: "NW" },
        { minVal: 346, maxVal: 360, direction: "NNW" }
      ];
      var wind_direction = "";
      for (var i = 0; i < wind_directions_array.length; i++) {
        if (
          windDir >= wind_directions_array[i].minVal &&
          windDir <= wind_directions_array[i].maxVal
        ) {
          wind_direction = wind_directions_array[i].direction;
        }
      }
      return wind_direction;
    },

    // Some basic action oriented functions
    makeInputEmpty: function() {
      this.$refs.input.value = "";
    },
    makeTempVarTodayEmpty: function() {
      this.tempVar.tempToday = [];
    },
    detectEnterKeyPress: function() {
      var input = this.$refs.input;
      input.addEventListener("keyup", function(event) {
        event.preventDefault();
        var enterKeyCode = 13;
        if (event.keyCode === enterKeyCode) {
          this.setHitEnterKeyTrue();
        }
      });
    },
    locationEntered: function() {
      var input = this.$refs.input;
      if (input.value === "") {
        this.location = "Las Vegas";
      } else {
        this.location = this.convertToTitleCase(input.value);
      }
      this.makeInputEmpty();
      this.makeTempVarTodayEmpty();
    },

    getCoordinates: function() {
      this.locationEntered();
      var loc = this.location;
      var coords;
      // eslint-disable-next-line no-undef
      var geocoder = new google.maps.Geocoder();
      // eslint-disable-next-line no-unused-vars
      return new Promise(function(resolve, _reject) {
        geocoder.geocode({ address: loc }, function(results, status) {
          // eslint-disable-next-line no-undef
          if (status == google.maps.GeocoderStatus.OK) {
            this.lat = results[0].geometry.location.lat();
            this.long = results[0].geometry.location.lng();
            this.full_location = results[0].formatted_address;
            coords = {
              lat: this.lat,
              long: this.long,
              full_location: this.full_location
            };
            resolve(coords);
          } else {
            alert("Oops! Couldn't get data for the location");
          }
        });
      });
    },

    // Some basic async functions
    setFormatCoordinates: async function() {
      var coordinates = await this.getCoordinates();
      this.lat = coordinates.lat;
      this.long = coordinates.long;
      this.currentWeather.full_location = coordinates.full_location;

      if (coordinates.lat > 0) {
        this.currentWeather.formatted_lat =
          (Math.round(coordinates.lat * 10000) / 10000).toString() + "°N";
      } else if (coordinates.lat < 0) {
        this.currentWeather.formatted_lat =
          (-1 * (Math.round(coordinates.lat * 10000) / 10000)).toString() +
          "°S";
      } else {
        this.currentWeather.formatted_lat = (
          Math.round(coordinates.lat * 10000) / 10000
        ).toString();
      }

      if (coordinates.long > 0) {
        this.currentWeather.formatted_long =
          (Math.round(coordinates.long * 10000) / 10000).toString() + "°E";
      } else if (coordinates.long < 0) {
        this.currentWeather.formatted_long =
          (-1 * (Math.round(coordinates.long * 10000) / 10000)).toString() +
          "°W";
      } else {
        this.currentWeather.formatted_long = (
          Math.round(coordinates.long * 10000) / 10000
        ).toString();
      }
    },
    fixWeatherApi: async function() {
      await this.setFormatCoordinates();
      var weatherApi =
        "https://csm.fusioncharts.com/files/assets/wb/wb-data.php?src=darksky&lat=" +
        this.lat +
        "&long=" +
        this.long;
      this.completeWeatherApi = weatherApi;
    },
    fetchWeatherData: async function() {
      await this.fixWeatherApi();
      var axios = require("axios"); // for handling weather api promise
      var weatherApiResponse = await axios.get(this.completeWeatherApi);
      if (weatherApiResponse.status === 200) {
        this.rawWeatherData = weatherApiResponse.data;
      } else {
        alert("Hmm... Seems like our weather experts are busy!");
      }
    },

    // Get and set

    // For basic info - left panel/sidebar
    getTimezone: function() {
      return this.rawWeatherData.timezone;
    },
    getSetCurrentTime: function() {
      var currentTime = this.rawWeatherData.currently.time;
      var timezone = this.getTimezone();
      this.currentWeather.time = this.unixToHuman(
        timezone,
        currentTime
      ).fullTime;
    },
    getSetSummary: function() {
      var currentSummary = this.convertToTitleCase(
        this.rawWeatherData.currently.summary
      );
      if (currentSummary.includes(" And")) {
        currentSummary = currentSummary.replace(" And", ",");
      }
      this.currentWeather.summary = currentSummary;
    },
    getSetPossibility: function() {
      var possible = this.formatPossibility(this.rawWeatherData.daily.icon);
      if (possible.includes(" And")) {
        possible = possible.replace(" And", ",");
      }
      this.currentWeather.possibility = possible;
    },
    getSetCurrentTemp: function() {
      var currentTemp = this.rawWeatherData.currently.temperature;
      this.currentWeather.temp = this.fah(currentTemp);
    },
    getTodayDetails: function() {
      return this.rawWeatherData.daily.data[0];
    },
    getSetTodayTempHighLowWithTime: function() {
      var timezone = this.getTimezone();
      var todayDetails = this.getTodayDetails();
      this.currentWeather.todayHighLow.todayTempHigh = this.fah(
        todayDetails.temperatureMax
      );
      this.currentWeather.todayHighLow.todayTempHighTime = this.unixToHuman(
        timezone,
        todayDetails.temperatureMaxTime
      ).onlyTime;
      this.currentWeather.todayHighLow.todayTempLow = this.fah(
        todayDetails.temperatureMin
      );
      this.currentWeather.todayHighLow.todayTempLowTime = this.unixToHuman(
        timezone,
        todayDetails.temperatureMinTime
      ).onlyTime;
    },
    getHourlyInfoToday: function() {
      return this.rawWeatherData.hourly.data;
    },
    getSetHourlyTempInfoToday: function() {
      var unixTime = this.rawWeatherData.currently.time;
      var timezone = this.getTimezone();
      var todayMonthDate = this.unixToHuman(timezone, unixTime).onlyMonthDate;
      var hourlyData = this.getHourlyInfoToday();
      for (var i = 0; i < hourlyData.length; i++) {
        var hourlyTimeAllTypes = this.unixToHuman(timezone, hourlyData[i].time);
        var hourlyOnlyTime = hourlyTimeAllTypes.onlyTime;
        var hourlyMonthDate = hourlyTimeAllTypes.onlyMonthDate;
        if (todayMonthDate === hourlyMonthDate) {
          var hourlyObject = { hour: "", temp: "" };
          hourlyObject.hour = hourlyOnlyTime;
          hourlyObject.temp = this.fah(hourlyData[i].temperature).toString();
          this.tempVar.tempToday.push(hourlyObject);
        }
      }

      if (this.tempVar.tempToday.length <= 2) {
        var minTempObject = {
          hour: this.currentWeather.todayHighLow.todayTempHighTime,
          temp: this.currentWeather.todayHighLow.todayTempHigh
        };
        var maxTempObject = {
          hour: this.currentWeather.todayHighLow.todayTempLowTime,
          temp: this.currentWeather.todayHighLow.todayTempLow
        };

        this.tempVar.tempToday.unshift(maxTempObject, minTempObject);
      }
    },

    // For Today Highlights
    getSetUVIndex: function() {
      var uvIndex = this.rawWeatherData.currently.uvIndex;
      this.highlights.uvIndex = uvIndex;
    },
    getSetVisibility: function() {
      var visibilityInMiles = this.rawWeatherData.currently.visibility;
      this.highlights.visibility = visibilityInMiles;
    },
    getSetWindStatus: function() {
      var windSpeedInMiles = this.rawWeatherData.currently.windSpeed;
      this.highlights.windStatus.windSpeed = windSpeedInMiles;
      var absoluteWindDir = this.rawWeatherData.currently.windBearing;
      this.highlights.windStatus.windDirection = absoluteWindDir;
      this.highlights.windStatus.derivedWindDirection = this.deriveWindDir(
        absoluteWindDir
      );
    },

    // top level for info section
    organizeCurrentWeatherInfo: function() {
      this.getSetCurrentTime();
      this.getSetCurrentTemp();
      this.getSetTodayTempHighLowWithTime();
      this.getSetSummary();
      this.getSetPossibility();
    },
    organizeTodayHighlights: function() {
      // top level for highlights
      this.getSetUVIndex();
      this.getSetVisibility();
      this.getSetWindStatus();
    },

    // topmost level orchestration
    organizeAllDetails: async function() {
      // top level organization
      await this.fetchWeatherData();
      this.organizeCurrentWeatherInfo();
      this.organizeTodayHighlights();
      this.getSetHourlyTempInfoToday();
    }
  }
};
