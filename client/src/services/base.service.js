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
}
