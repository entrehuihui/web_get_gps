function Location() { };
Location.prototype.getLocation = function (callback) {
    var options = {
        enableHighAccuracy: true,
        maximumAge: 1000
    };
    this.callback = Object.prototype.toString.call(callback) == "[object Function]" ?
        callback :
        function (address) {
            alert(address.province + address.city);
            console.log("getocation(callbackFunction) 可获得定位信息对象");
        };
    var self = this;
    if (navigator.geolocation) {
        //浏览器支持geolocation
        navigator.geolocation.getCurrentPosition(function (position) {
            //经度
            var longitude = position.coords.longitude;
            //纬度
            var latitude = position.coords.latitude;
            self.callback(longitude, latitude)
        }, self.onError, options);
    } else {
        //浏览器不支持geolocation
    }
};

Location.prototype.onError = function (error) {
    switch (error.code) {
        case 1:
            alert("位置服务被拒绝");
            break;
        case 2:
            alert("暂时获取不到位置信息");
            break;
        case 3:
            alert("获取信息超时");
            break;
        case 4:
            alert("未知错误");
            break;
    }
};

//调用
// var local = new Location();
// setInterval(() => {
//     local.getLocation(function (longitude, latitude) {
//         //此处就是返回的地理位置信息
//         console.log(longitude + ":" + latitude);
//         alert(longitude + ":" + latitude)
//     });
// }, 3000)
export default {
    // local,
    Location
}