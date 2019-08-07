<template>
  <div class="custom-content-card content-card card">
    <div class="card-body pb-0">
    <div class="content-header h4 text-center pt-2 pb-3"><b><u>Highlights</u></b></div>
      <div class="row">
        <uv-index :highlights="highlights"></uv-index>
        <wind-status :highlights="highlights"></wind-status>
        <visibility :highlights="highlights"></visibility>
        
      </div>
    </div>
  </div>
</template>

<script>

import UVIndex from "./UVIndex.vue";
import WindStatus from "./WindStatus.vue";
import Visibility from "./Visibility.vue";

export default {
  props: ["highlights"],
  components: {
    
    "uv-index": UVIndex,
    "wind-status": WindStatus,
    "visibility": Visibility
  },
};
</script>