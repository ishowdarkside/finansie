class AppError extends Error {
  private statusCode: number;
  private isOperational: boolean;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
  }

  public getStatusCode(): number {
    return this.statusCode;
  }

  public getIsOperational(): boolean {
    return this.isOperational;
  }
}
