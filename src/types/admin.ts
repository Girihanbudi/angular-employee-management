export interface Admin {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const initialAdmin = {
  id: 0,
  firstName: '',
  lastName: '',
  email: '',
  password: '',
};

export default Admin;
