import User from "./User.interface";

export default interface AuthContextValue {
  user: User | null;
  signin: (email: string, password: string) => void;
  signup: (email: string, password: string, phoneNumber: string) => void;
  loading: boolean;
}
