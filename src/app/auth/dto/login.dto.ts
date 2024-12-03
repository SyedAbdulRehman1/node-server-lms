export class LoginDto {
  email: string;
  password: string;

  constructor(email: string, password: string) {
    if (!email) throw new Error("Email is required");
    if (!password) throw new Error("Password is required");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email))
      throw new Error("Email must be a valid email address");

    this.email = email;
    this.password = password;
  }
}
