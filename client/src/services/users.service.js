import { BaseService } from "./base.service";
import { ErrorWrapper, ResponseWrapper } from "./util";

export class UsersService extends BaseService {
  static get entity() {
    return "users";
  }

  static async getCurrent() {
    try {
      const response = await this.request({ auth: true }).get(
        `${this.entity}/current`
      );
      return new ResponseWrapper(response, response.data.data);
    } catch (error) {
      const message = error.response.data
        ? error.response.data.error
        : error.response.statusText;
      throw new ErrorWrapper(error, message);
    }
  }

  static async emailAvailability(email) {
    try {
      const response = await this.request().post(`${this.entity}/checkEmail`, {
        email: email
      });
      return new ResponseWrapper(response, response.data.data);
    } catch (error) {
      const message = error.response.data
        ? error.response.data.error
        : error.response.statusText;
      throw new ErrorWrapper(error, message);
    }
  }

  // static async createUser(data = {}) {
  //   try {
  //     await this.create(data)
  //   } catch (error) {
  //     const message = error.response.data
  //       ? error.response.data.error
  //       : error.response.statusText;
  //     throw new ErrorWrapper(error, message);
  //   }
  // }
}
