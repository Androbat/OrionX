import { Request, Response } from "express";
import Customer from "../models/CustomersModel";
import {  isRepeatedAddress, isEmpty } from "../helpers";


export async function createCustomerData(req: Request, res: Response) {
  try {
    const { name, addresses, email } = req.body;
    if (!name || !addresses || !email) {
      return res.status(400).json({ message: "Invalid customer data" });
    }

    const findRepeatedCustomer = await Customer.find({ email: email });
    const moreThanOneAddress = addresses.length > 1;
    const customerDoesNotExistInDataBase = isEmpty(findRepeatedCustomer);
    console.log(customerDoesNotExistInDataBase);

    if (customerDoesNotExistInDataBase  && moreThanOneAddress) {
        if (isRepeatedAddress(addresses)) {
          console.log("entering in repeated address function")
          return res
            .status(409)
            .json({
              message: "One user can't have exactly the same addresses twice",
            });
      }
    } 

    const customerData = new Customer({ name: name, email: email, addresses: addresses });
    const saveCustomer = await customerData.save();
    return res.status(200).json({ message: `The customer ${saveCustomer.name} has been saved successfully`})

  } catch (error) {
    res.status(500).json({ error: error });
  }
}

export async function getCustomersData(req: Request, res: Response) {
  try {
    const customer = await Customer.find();
    if (!customer || customer.length === 0) {
      return res.status(404).json({ error: "Does not exist customers" });
    } else {
      return res.status(200).json({ customers: customer });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

export async function updateCustomerData(req: Request, res: Response) {
  try {
    const customerId = req.params.customerId;
    if (!customerId) {
      res.status(404).json({ error: "Customer not found" });
    }

    const updatedCustomer = await Customer.findByIdAndUpdate(
      customerId,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedCustomer) {
      return res.status(404).json({ error: "Customer not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

// Work on the delete
export async function deleteAddressById(req: Request, res: Response) {
  try {
    const addressId = req.params.addressId;

    if (!addressId) {
      return res.status(400).json({ error: "Invalid customer data" });
    }

    const deletedAddress = await Customer.findByIdAndDelete(addressId);

    if (!deletedAddress) {
      return res.status(404).json({ error: "Customer not found" });
    }

    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}
