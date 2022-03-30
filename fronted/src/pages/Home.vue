<template>
  <div>
    {{ title }}
    <div>{{ msg }}</div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "Home",
  data() {
    return {
      title: "子归歌&&麦子随想",
      msg: null,
    };
  },
  methods: {
    async getName() {
      const res = await axios.post("/api/article/query");
      this.msg = res && res.data && res.data.name;
    },
  },
  async mounted() {
    await this.getName();
  },
};
</script>
