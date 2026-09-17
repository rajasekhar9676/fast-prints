export type CustomerUser = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  passwordHash: string;
  createdAt: string;
};

export type CustomerPublic = Omit<CustomerUser, "passwordHash">;

export type CustomerRegisterPayload = {
  name: string;
  email: string;
  phone: string;
  address: string;
  password: string;
};

export type CustomerLoginPayload = {
  email: string;
  password: string;
};
