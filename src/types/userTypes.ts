export interface UserData {
    _id: string;
  name: string;
  firstName: string;
  email: string;
  address: {
    city: string;
    municipality: string;
    street: string;
  };
    // token: string
}