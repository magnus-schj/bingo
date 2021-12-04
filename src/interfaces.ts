export interface Square {
  event: string;
  instantWin: boolean;
  happened: boolean;
  id?: string;
  index?: number;
}

export interface SignUpForm {
  email: string;
  password: string;
  confirmPassword: string;
}
