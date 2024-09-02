export class UserOrPasswordIncorrect extends Error {
  constructor(public status: number = 401) {
    super("Usuario o contraseña incorrectos");
    Object.setPrototypeOf(this, UserOrPasswordIncorrect.prototype);
  }
}
