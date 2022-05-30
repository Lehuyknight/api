export default class ResponseFormat {
    data: any;
    isSucess: boolean;
    message: any;
    isLogout: true;
    constructor(data, isSucess, message, isLogout) {
      this.data = data;
      this.isSucess = isSucess
      this.message = message
      this.isLogout = isLogout
    }
}
