export interface SquareDraft {
  event: string;
  instantWin: boolean;
  happened: boolean;
}
export interface Square extends SquareDraft {
  NO_ID_FIELD?: string;
  index?: number;
}

export interface SignUpForm {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
