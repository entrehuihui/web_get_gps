<template>
  <div id="gps">
    <div class="gps1">
      <div class="gps2">你当前的位置:</div>
      <div class="gps2">
        <div class="gps3">纬度:</div>
        <div class="gps4">{{latitude}}</div>
      </div>
      <div class="gps2">
        <div class="gps3">纬度:</div>
        <div class="gps4">{{longitude}}</div>
      </div>
      <div class="gps2">
        <div class="gps3">刷新时间:</div>
        <select class="gps5" v-model="times" :disabled="!able">
          <option :value="index" v-for="index in 5" :key="index">{{index}} min</option>
        </select>
      </div>
      <div class="gps2" id="gps2able">
        <div v-show="able" class="gps6" @click="start(false)">开始记录</div>
        <div v-show="!able" class="gps6" @click="start(true)" id="disable1">结束记录</div>
      </div>
    </div>
  </div>
</template>

<script>
import getgps from "../global/getgps.js";
export default {
  data() {
    return {
      gps: {},
      longitude: "",
      latitude: "",
      times: 1,
      able: true,
      timer: null
    };
  },
  methods: {
    update: async function() {
      this.gps = new getgps.Location();
      this.gps.getLocation(this.getiutude);
    },
    getiutude: function(longitude, latitude) {
      console.log(longitude + ":" + latitude);
      this.getto20(latitude, longitude);
      // this.longitude = longitude;
      // this.latitude = latitude;
      if (!this.able) {
        this.postdata();
      }
    },
    setTimer(num = 0) {
      if (num == 0) {
        return;
      }
      num = num * 60000;
      // 测试例子-- 定时器
      if (this.timer == null) {
        this.timer = setInterval(() => {
          this.gps.getLocation(this.getiutude);
        }, num);
      }
    },
    start: function(methods) {
      this.able = methods;
      if (methods) {
        clearInterval(this.timer);
      } else {
        this.setTimer(this.times);
      }
    },
    postdata: function() {
      this.req
        .post("/devicedata", {
          devEUI: (this.req.id + "xyzadwqseuegfowesdcdoiugrw").substr(0, 16),
          latitude: this.latitude,
          longitude: this.longitude,
          name: this.req.name,
          state: 1,
          times: parseInt(new Date().getTime() / 1000)
        })
        .then(response => {
          if (response.status != 200) {
            console.log(response);
          }
        });
    },
    getto20: getto20
  },
  watch: {
    times: function(v) {
      clearInterval(this.timer);
    }
  },
  mounted() {
    this.update();
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
};

function getto20(latitude, longitude) {
  var itude = gcj02towgs84(longitude, latitude);
  this.latitude = itude[1];
  this.longitude = itude[0];
}

var PI = 3.1415926535897932384626;

function gcj02towgs84(lng, lat) {
  if (out_of_china(lng, lat)) {
    return [lng, lat];
  } else {
    var dlat = transformlat(lng - 105.0, lat - 35.0);
    var dlng = transformlng(lng - 105.0, lat - 35.0);
    var radlat = (lat / 180.0) * PI;
    var magic = Math.sin(radlat);
    magic = 1 - 0.00669342162296594323 * magic * magic;
    var sqrtmagic = Math.sqrt(magic);
    dlat =
      (dlat * 180.0) /
      (((6378245.0 * (1 - 0.00669342162296594323)) / (magic * sqrtmagic)) * PI);
    dlng = (dlng * 180.0) / ((6378245.0 / sqrtmagic) * Math.cos(radlat) * PI);
    var mglat = lat + dlat;
    var mglng = lng + dlng;
    return [lng * 2 - mglng, lat * 2 - mglat];
  }
}

function out_of_china(lng, lat) {
  return (
    lng < 72.004 || lng > 137.8347 || (lat < 0.8293 || lat > 55.8271 || false)
  );
}

function transformlat(lng, lat) {
  var ret =
    -100.0 +
    2.0 * lng +
    3.0 * lat +
    0.2 * lat * lat +
    0.1 * lng * lat +
    0.2 * Math.sqrt(Math.abs(lng));
  ret +=
    ((20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) *
      2.0) /
    3.0;
  ret +=
    ((20.0 * Math.sin(lat * PI) + 40.0 * Math.sin((lat / 3.0) * PI)) * 2.0) /
    3.0;
  ret +=
    ((160.0 * Math.sin((lat / 12.0) * PI) + 320 * Math.sin((lat * PI) / 30.0)) *
      2.0) /
    3.0;
  return ret;
}
function transformlng(lng, lat) {
  var ret =
    300.0 +
    lng +
    2.0 * lat +
    0.1 * lng * lng +
    0.1 * lng * lat +
    0.1 * Math.sqrt(Math.abs(lng));
  ret +=
    ((20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) *
      2.0) /
    3.0;
  ret +=
    ((20.0 * Math.sin(lng * PI) + 40.0 * Math.sin((lng / 3.0) * PI)) * 2.0) /
    3.0;
  ret +=
    ((150.0 * Math.sin((lng / 12.0) * PI) +
      300.0 * Math.sin((lng / 30.0) * PI)) *
      2.0) /
    3.0;
  return ret;
}
</script>

<style scoped>
@import url("./css/index.css");
</style>
