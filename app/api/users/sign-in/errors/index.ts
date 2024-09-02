export class UserOrPasswordIncorrect implements Error {
  name: string = "UserOrPasswordIncorrect";
  message: string;
  stack?: string | undefined;
  cause?: unknown;

  constructor(public status: number = 401) {
    this.message = "Usuario o contraseña incorrectos";
    Object.setPrototypeOf(this, UserOrPasswordIncorrect.prototype);
  }
}
