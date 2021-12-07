export interface SquareDraft {
  event: string;
  instantWin: boolean;
  happened: boolean;
}
export interface Square extends SquareDraft {
  id?: string;
  index?: number;
}

export interface SignUpForm {
  email: string;
  password: string;
  confirmPassword: string;
}
