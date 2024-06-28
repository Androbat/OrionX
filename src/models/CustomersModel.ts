
import { Schema, Model, model, Document } from 'mongoose';

interface Address {
  street: string;
  city: string;
  country: string;
}

interface Customer extends Document {
  name: string;
  email: string;
  addresses: Address[];
}

const addressSchema = new Schema<Address>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true }
}); 

const customerSchema = new Schema<Customer>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  addresses: [addressSchema] 
});

const CustomerModel: Model<Customer> = model<Customer>('Customer', customerSchema);

export default CustomerModel;