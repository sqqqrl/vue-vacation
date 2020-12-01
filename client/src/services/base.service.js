import qs from "qs";

import { Http } from "./http.init";
import { ResponseWrapper, ErrorWrapper } from "./util";

export class BaseService {
  static request(status = { auth: false }) {
    return new Http(status);
  }

  static responseWrapper(...rest) {
    return new ResponseWrapper(...rest);
  }

  static errorWrapper(...rest) {
    return new ErrorWrapper(...rest);
  }

  static querystring(obj) {
    return qs.stringify(obj, {
      encode: false
    });
  }

  static async create(data) {
    try {
      const response = await this.request({ auth: true }).post(
        `${this.entity}/create`,
        data
      );
      return new ResponseWrapper(response, response.data.data);
    } catch (error) {
      throw new ErrorWrapper(error);
    }
  }
}
