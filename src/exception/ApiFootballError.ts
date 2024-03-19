export class ApiFootballError extends Error {
  constructor(error: Error) {
    super(error.message);
  }
}
