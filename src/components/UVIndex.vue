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
      ></fusioncharts>
    </div>
  </div>
</template>

<script>
export default {
  props: ["highlights"],
  components: {},
  data() {
    return {
      type: "angulargauge",
      width: "100%",
      height: "100%",
      containerbackgroundopacity: 0,
      dataformat: "json",
      datasource: {
        chart: {
          caption: "UV Index",
          captionFontBold: "1",
          captionFontColor: "#000000",
          captionPadding: "30",
          lowerLimit: "0",
          upperLimit: "15",
          lowerLimitDisplay: "1",
          upperLimitDisplay: "15",
          showValue: "0",
          theme: "fusion",
          baseFont: "Roboto",
          bgAlpha: "0",
          canvasbgAlpha: "0",
          gaugeInnerRadius: "75",
          gaugeOuterRadius: "150",
          pivotRadius: "0",
          pivotFillAlpha: "0",
          valueFontSize: "20",
          valueFontColor: "#000000",
          valueFontBold: "1",
          tickValueDistance: "3",
          autoAlignTickValues: "1",
          majorTMAlpha: "20",
          chartTopMargin: "30",
          chartBottomMargin: "40"
        },
        colorrange: {
          color: [
            {
              minvalue: "0",
              maxvalue: this.highlights.uvIndex.toString(),
              code: "#333F42"
            },
            {
              minvalue: this.highlights.uvIndex.toString(),
              maxvalue: "15",
              code: "#B4975A"
            }
          ]
        },
        annotations: {
          groups: [
            {
              items: [
                {
                  id: "val-label",
                  type: "text",
                  text: this.highlights.uvIndex.toString(),
                  fontSize: "20",
                  font: "Source Sans Pro",
                  fontBold: "1",
                  fillcolor: "#212529",
                  x: "$gaugeCenterX",
                  y: "$gaugeCenterY"
                }
              ]
            }
          ]
        },
        dials: {
          dial: [
            {
              value: this.highlights.uvIndex.toString(),
              baseWidth: "0",
              radius: "0",
              borderThickness: "0",
              baseRadius: "0"
            }
          ]
        }
      }
    };
  },
  methods: {},
  computed: {},
  watch: {
    highlights: {
      handler: function() {
        this.datasource.colorrange.color[0].maxvalue = this.highlights.uvIndex.toString();
        this.datasource.colorrange.color[1].minvalue = this.highlights.uvIndex.toString();
        this.datasource.annotations.groups[0].items[0].text = this.highlights.uvIndex.toString();
      },
      deep: true
    }
  }
};
</script>
