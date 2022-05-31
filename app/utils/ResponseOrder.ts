export default class ResponseData {
    NewOrder: any;
    AuthToken: any;
    constructor(data, authtoken) {
      this.NewOrder = data,
      this.AuthToken = authtoken
    }
}
