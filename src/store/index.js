import Vue from 'vue';

Date.prototype.format = function (format) {
var o = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "h+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3),
    'S': this.getMilliseconds(),
};
if (/(y+)/.test(format))
    format = format.replace(
    RegExp.$1,
    (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
for (var k in o)
    if (new RegExp("(" + k + ")").test(format))
    format = format.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
    );
return format;
};

const messageList = [
	{ type: 'system', id: 20, data: { text: new Date().format('yyyy-MM-dd hh:mm:ss') } },
	{ type: 'text', author: `robot`, id: 1, data: { text: `what can I do for you?` } },
  { type: 'text', author: `robot`, id: 21, data: { text: `And what about suggestions?` }, suggestions: ["Test Suggestions~", "Bread~", "Milk~"] }
]

export default Vue.observable({ editMessage: null, isTyping: false, messageList });