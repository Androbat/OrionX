import { Schema, Model, model } from "mongoose"

interface Addresses {
    street: string;
    city: string;
    country: string;
}

interface Customer  {
    name: string;
    email: string;
    addresses: Addresses[];
}

const addressSchema = new Schema<Addresses>({
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
  });

  const customerSchema = new Schema<Customer>({
    name: { type: String, required: true },
    addresses: { type: [addressSchema], required: true },
  });

  const Customer: Model<Customer> = model<Customer>('Customer', customerSchema);

  export default Customer;