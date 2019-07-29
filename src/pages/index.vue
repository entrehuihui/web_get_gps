<template>
  <div id="idnex">
    <div class="indexs">
      <input type="text" class="indexin" v-model="account" />
      <input type="password" class="indexin" v-model="password" />
      <div class="indexin" id="indexinbutton" @click="login()">登陆</div>
    </div>
  </div>
</template>

<script>
import md5 from "js-md5";
export default {
  data() {
    return {
      account: "",
      password: ""
    };
  },
  methods: {
    login: async function() {
      var response = await this.req.post("/login", {
        code: "",
        name: this.account,
        password: md5(this.password)
      });
      if (response.status != 200) {
        alert("登陆失败");
        return;
      }
      console.log(response);
      this.req.id = response.data.id;
      this.req.name = response.data.name;
      this.req.jwt = response.data.jwt;
      this.$router.push("/gps");
    }
  }
};
</script>

<style scoped>
@import url("./css/index.css");
</style>
