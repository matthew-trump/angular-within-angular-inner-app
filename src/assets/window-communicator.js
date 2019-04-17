var c;
var e = function () {
    var b = this;
    this.a = 1;
    window.addEventListener("message",
        function (a) {
            a = a.data;
            console.log("INNER APP", a.type, a.data);
            var d = b.b || window;
            switch (a.type) {
                case "payload":
                    console.log("INNER APP PAYLOAD UPDATE");
                    d.update && d.update(a.requestId, a.data);
                    break;
                case "UpdateUserDistance":
                    if (d.onUserDistanceUpdate)
                        d.onUserDistanceUpdate(a.distance);
                    break;
                case "OutputTtsStatus":
                    if (d.onOutputTtsStatus)
                        d.onOutputTtsStatus(a.requestId, a.status)
            }
        })
};
c = e.prototype;
c.sendMessage = function (b, a) {
    console.log("INNER APP sendMessage", b, a);
    window.parent.postMessage({ type: "send_message", message: void 0 === a ? b : a }, "*")
};
c.sendTextQuery = function (b, a) {
    console.log("INNER APP sendTextQuery", b, a);
    window.parent.postMessage({ type: "send_text_query", query: void 0 === a ? b : a }, "*")
};
c.openMic = function () {
    console.log("INNER APP openMic");
    window.parent.postMessage({ type: "open_mic" }, "*")
};
c.closeMic = function () {
    console.log("INNER APP closeMic");
    window.parent.postMessage({ type: "close_mic" }, "*")
};
c.exit = function (b) {
    console.log("INNER APP exit", b);
    window.parent.postMessage({
        type: "exit",
        result: b
    }, "*")
};
c.exitApp = function () {
    console.log("INNER APP exitApp");
    this.exit({})
};
c.onLoad = function (b, a) {
    console.log("INNER APP onLoad", b, a);
    this.b = window[a];
    window.parent.postMessage({
        type: "onload",
        apiVersion: b,
        callback: a
    }, "*")
};
c.outputTts = function (b, a) {
    console.log("INNER APP outputTts", b, a);
    var d = "" + this.a;
    this.a++;
    window.parent.postMessage({
        type: "output_tts",
        requestId: d,
        tts: b,
        openMic: void 0 === a ? !1 : a
    }, "*");
    return d
};
c.onUpdateDone = function (b) {
    console.log("CANVAS onUpdateDone", b);
    window.parent.postMessage({
        type: "onUpdateDone",
        requestId: b
    }, "*")
};

var f = window, g = new e;
f.windowCommunicator || (f.windowCommunicator = g);