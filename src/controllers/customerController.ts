import { Request, Response } from "express";
import Customer from "../models/CustomersModel";

export async function createCustomerData(req: Request, res: Response) {
  try {
    const { name, addresses } = req.body;
    if (!name || !addresses || addresses.length === 0) {
      return res.status(400).json({ message: "Invalid customer data" });
    }

    for (const address of addresses) {
      const validateRepeatedAdresses = await Customer.findOne({
        addresses: { $elemMatch: address },
      });
      if (validateRepeatedAdresses) {
        return res
          .status(400)
          .json({ error: "One or more addresses already exist" });
      }
    }

    const newCustomer = new Customer({ name, addresses });
    const savedCustomer = await newCustomer.save();

    return res.status(201).json(savedCustomer);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

export async function getCustomersData(req: Request, res: Response) {
  try {
    const customer = await Customer.find();
    if (!customer) {
      return res.status(404).json({ error: "Not found customers" });
    } else {
      return res.status(200).json({ customers: customer });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
}


