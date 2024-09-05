export class HttpError {
  status = 500;
  message: string;
  constructor(message: string) {
    this.message = message;
  }
}

export class BadRequestError extends HttpError {
  status = 400;
  constructor(message: string) {
    super(message);
  }
}

export class UnauthorizedError extends HttpError {
  status = 401;
  constructor(message: string) {
    super(message);
  }
}

export class InternalServerError extends HttpError {
  status = 500;
  constructor(message: string) {
    super(message);
  }
}
