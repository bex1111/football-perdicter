export class TeamNotFoundExceptions extends Error {
  constructor(name: string) {
    super(name);
  }
}
