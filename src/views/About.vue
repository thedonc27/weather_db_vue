<template>
  <div class="about">
    <h1><i> About Page</i></h1><br/> <br/>
    <header><p align="justify" style="margin-left:10%; margin-right:10%">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus in hendrerit tellus, id rutrum nunc. Proin sit amet faucibus tortor. Sed laoreet lacinia volutpat. Cras pretium et orci ut tempus. In vehicula enim sem, sed auctor eros placerat non. Aenean lectus mauris, tempus vehicula est at, rhoncus tincidunt turpis. Suspendisse faucibus ipsum ac nunc euismod, id auctor augue consectetur. Vivamus placerat volutpat suscipit. Fusce ac condimentum mi. Duis blandit, eros sed vestibulum pulvinar, massa tortor interdum ex, at feugiat est sem at magna. Etiam quis malesuada velit, a mattis justo.

Nam quis dignissim tortor. Phasellus mattis, orci ac volutpat fringilla, eros sapien ullamcorper lacus, vel commodo diam dolor quis nulla. Sed in fringilla ipsum, ac sollicitudin metus. Cras malesuada ante in luctus convallis. Donec aliquam ex non odio dignissim ullamcorper. Nulla ac facilisis nunc. Nam at eros feugiat, egestas risus id, feugiat lorem. Duis a sollicitudin velit, quis finibus massa. Maecenas iaculis, nunc at dapibus tristique, leo dolor mollis lacus, eget imperdiet ligula orci non purus. Sed leo sapien, feugiat porttitor dignissim nec, euismod quis nisi. Duis ac libero sit amet ante cursus vehicula at eu augue. Nam gravida libero nec auctor scelerisque. Praesent ut nisi vitae nisi interdum dapibus sit amet in ex.

Curabitur convallis, dolor in fermentum viverra, nulla nisl hendrerit nisl, sit amet aliquet quam lorem ut ligula. Proin maximus, dui non tempus vulputate, eros augue finibus erat, ultrices aliquet neque nunc nec magna. Vestibulum molestie sed quam ac feugiat. Nulla quis lorem a nisi ullamcorper vulputate vel et nulla. Suspendisse congue lacus eu vulputate consequat. Suspendisse posuere condimentum finibus. Quisque nunc lorem, dictum in dapibus eget, elementum sit amet leo. Phasellus fermentum tellus sed risus scelerisque auctor. Etiam quis pulvinar ante, at viverra risus. Curabitur eleifend sollicitudin blandit.

Aliquam ut commodo leo. Donec efficitur accumsan lacus. Maecenas eu erat consectetur, scelerisque dolor vel, lacinia nulla. Sed leo augue, accumsan nec malesuada quis, elementum efficitur purus. Curabitur faucibus ligula a ex blandit aliquet. Curabitur mollis nisl velit, eu vehicula lorem pretium sit amet. Maecenas sed porta metus. Nunc lorem orci, interdum vel sagittis id, vehicula id nulla. Ut ac lorem tempor, ullamcorper tortor in, euismod ex. Donec malesuada varius massa, a tristique diam consequat at. Aenean in sem nibh. Fusce quis erat magna. Integer elit justo, suscipit id ante sed, convallis tincidunt ipsum. Nunc mattis porttitor justo, non vestibulum metus aliquam et. Integer a elit vitae quam aliquam ultricies.

Donec tempor enim aliquam tellus eleifend ullamcorper. Fusce pretium dapibus euismod. Donec auctor, nisi sed aliquet fermentum, libero mi consectetur eros, non feugiat neque erat posuere felis. Suspendisse pharetra augue sed erat molestie pellentesque. Phasellus fermentum, magna et eleifend sollicitudin, dolor mauris convallis sapien, id consectetur tortor lorem at leo. Nam et risus sed est molestie ultrices. Duis fermentum, mauris a aliquam pellentesque, mi neque vehicula libero, sit amet interdum dui neque ut metus. Nulla ex turpis, porttitor non enim in, auctor semper arcu. Proin eu tincidunt dui. Aenean gravida nisi eget est elementum vestibulum ut vitae nulla.

Generated 5 paragraphs, 500 words, 3359 bytes of Lorem Ipsum</p></header>
<br/><br/><br/><br/><br/><br/>
    <div class="text-center">
      <v-bottom-sheet v-model="sheet">
        <template v-slot:activator="{ on }">
          <v-btn
            color="red"
            dark
            v-on="on"
          >
            Click Me!
          </v-btn>
        </template>
        <v-sheet class="text-center white--text" height="200px" color="#333F42">
          <v-btn
            class="mt-6"
            text
            color="red"
            @click="sheet = !sheet"
          >close</v-btn>
          <div><br/>vue.js, vue router, vuetify, fusioncharts, google geocoder api, darksky weather api</div>
        </v-sheet>
      </v-bottom-sheet>
    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      sheet: false,
    }),
  }
</script>
