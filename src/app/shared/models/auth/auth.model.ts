export class AuthModel {
  token: string;
  refreshToken: string;
  expiration: Date;

  constructor() {
    this.token = ''
    this.refreshToken = '';
    this.expiration = new Date();
  }

  setAuth(auth: AuthModel) {
    this.token = auth.token;
    this.refreshToken = auth.refreshToken;
    this.expiration = auth.expiration;
  }
}
