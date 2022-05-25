export default class ResponseData {
    data: any;
    authtoken: any;
    constructor(data, authtoken) {
      this.data = data,
      this.authtoken = authtoken
    }
}
