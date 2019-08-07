<template>
  <div class="highlights-item col-md-4 col-sm-6 col-xs-12 border-top">
    <div>
      <fusioncharts
        :type="type"
        :width="width"
        :height="height"
        :container-background-opacity="containerbackgroundopacity"
        :data-format="dataformat"
        :data-source="datasource"
      >
      </fusioncharts>
    </div>
  </div>
</template>

<script>
export default {
  props: ["highlights"],
  components: {},
  methods: {},
  computed: {},
  data() {
    return {
      type: "hlineargauge",
      width: "100%",
      height: "100%",
      containerbackgroundopacity: 0,
      dataformat: "json",
      creditLabel: false,
      datasource: {
        chart: {
          caption: "Air Visibility",
          captionFontBold: "1",
          captionFontColor: "#000000",
          baseFont: "Roboto",
          numberSuffix: "mi",
          lowerLimit: "0",
          upperLimit: "25",
          showPointerShadow: "1",
          animation: "1",
          transposeAnimation: "1",
          theme: "fusion",
          bgAlpha: "0",
          canvasBgAlpha: "0",
          valueFontSize: "20",
          valueFontColor: "#000000",
          valueFontBold: "1",
          pointerBorderAlpha: "0",
          chartBottomMargin: "40",
          captionPadding: "30",
          chartTopMargin: "30"
        },
        colorRange: {
          color: [
            {
              minValue: "0",
              maxValue: "2.49",
              label: "Fog",
              code: "#836E3E"
            },
            {
              minValue: "2.49",
              maxValue: "6.21",
              label: "Haze",
              code: "#B4975A"
            },
            {
              minValue: "6.21",
              maxValue: "24.85",
              label: "Clear",
              code: "#FFF8E9"
            }
          ]
        },
        pointers: {
          pointer: [
            {
              value: this.highlights.visibility.toString()
            }
          ]
        }
      }
    };
  },
  watch: {
    highlights: {
      handler: function() {
        this.datasource.pointers.pointer[0].value = this.highlights.visibility.toString();
      },
      deep: true
    }
  }
};
</script>
