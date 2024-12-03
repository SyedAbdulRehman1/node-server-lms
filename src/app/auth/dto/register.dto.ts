type RegisterDto = {
  email: string;
  password: string;
};

function validateRegisterDto(dto: RegisterDto): string[] {
  const errors: string[] = [];

  if (!dto.email || !/\S+@\S+\.\S+/.test(dto.email)) {
    errors.push("Invalid email");
  }
  if (!dto.password || dto.password.length < 6) {
    errors.push("Password must be at least 6 characters long");
  }

  return errors;
}
