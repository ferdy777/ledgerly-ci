/* eslint-disable @typescript-eslint/no-namespace */

export namespace Auth {
  export interface User {
    firstName: string;
    lastName: string;
    email: string;
  }

  export namespace Login {
    export interface Request {
      email: string;
      password: string;
    }

    export type Data = User;
  }
}
