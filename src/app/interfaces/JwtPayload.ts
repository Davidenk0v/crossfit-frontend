export interface JwtPayload {
    sub?: string;  // Subject (optional)
    herure?: string; // Hypothetical custom property (optional)
    authorities?: string; // Authorities (optional)
  }