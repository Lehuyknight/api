export default class ResponseData {
    data: any;
    status: any;
    message: any;
    constructor(status, message, data) {
      this.status = status;
      this.message = message;
      this.data = data;
    }
}
