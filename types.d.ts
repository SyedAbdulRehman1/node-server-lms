declare global {
  namespace Express {
    interface User {
      id: string;
      // Add other properties if needed
    }
  }
}
