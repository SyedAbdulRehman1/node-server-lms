export class RegisterDto {
  email: string;
  password: string;

  constructor(email: string, password: string) {
    if (!email || !email.trim()) throw new Error("Email is required");
    if (!password || !password.trim()) throw new Error("Password is required");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email))
      throw new Error("Email must be a valid email address");
    if (password.length < 6)
      throw new Error("Password must be at least 6 characters long");

    this.email = email.trim();
    this.password = password;
  }
}

export class LoginDto {
  email: string;
  password: string;

  constructor(email: string, password: string) {
    if (!email || !email.trim()) throw new Error("Email is required");
    if (!password || !password.trim()) throw new Error("Password is required");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email))
      throw new Error("Email must be a valid email address");

    this.email = email.trim();
    this.password = password;
  }
}

export class ActivateAccountDto {
  token: string;

  constructor(token: string) {
    if (!token || !token.trim()) throw new Error("Token is required");
    this.token = token.trim();
  }
}
