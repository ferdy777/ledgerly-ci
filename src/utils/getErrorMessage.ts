const FALLBACK_MESSAGE = "Something went wrong. Please try again.";

export const getErrorMessage = (error: unknown): string =>
  error instanceof Error && error.message ? error.message : FALLBACK_MESSAGE;
