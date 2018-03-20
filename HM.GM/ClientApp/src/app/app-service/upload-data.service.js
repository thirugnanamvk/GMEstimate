"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Uploadservice = /** @class */ (function () {
    function Uploadservice(http) {
        this.http = http;
        this.url = "api/GMEstimation";
    }
    Uploadservice.prototype.UploadData = function (data) {
        //let headers = new Headers({ 'Content-Type': 'application/json' });
        //let options = new RequestOptions({ headers: headers });
        this.http.post(this.url, data).subscribe(function (res) { console.log(res); });
    };
    return Uploadservice;
}());
exports.Uploadservice = Uploadservice;
//# sourceMappingURL=upload-data.service.js.map