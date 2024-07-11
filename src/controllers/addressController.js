import Address from "../models/addressModel.js";

// Add a new address
export const addAddress = async (req, res) => {
  try {
    const {
      customer_id,
      address_line1,
      address_line2,
      postcode,
      province,
      district,
      subdistrict,
    } = req.body;

    const address = new Address({
      customer_id,
      address_line1,
      address_line2,
      postcode,
      province,
      district,
      subdistrict,
    });
    await address.save();

    res.status(201).json(address);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all addresses
export const getAllAddress = async (req, res) => {
  try {
    const address = await Address.find();
    res.status(200).json(address);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a single address by Address ID
export const getAddressByID = async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);
    if (!address) {
      return res.status(404).json({ message: "Address not found." });
    }
    res.json(address);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a single address by Customer ID
export const getAddressByCustomer = async (req, res) => {
  try {
    const address = await Address.findOne({ customer_id: req.params.id });
    if (!address) {
      return res.status(404).json({ message: "Address not found." });
    }
    res.json;
  } catch {
    res.status(400).json({ message: error.message });
  }
};

// Update an address
export const updateAddress = async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);
    if (!address) {
      return res.status(404).json({ message: "Address not found." });
    }
    address.customer_id = req.body.customer_id || address.customer_id;
    address.address_line1 = req.body.address_line1 || address.address_line1;
    address.address_line2 = req.body.address_line2 || address.address_line2;
    address.postcode = req.body.postcode || address.postcode;
    address.province = req.body.province || address.province;
    address.district = req.body.district || address.district;
    address.subdistrict = req.body.subdistrict || address.subdistrict;
    await address.save();
    res.json(address);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an address
export const deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteAddress = await Address.findByIdAndDelete(id);

    if (!deleteAddress) {
      return res.status(404).json({ message: "Address not found." });
    }
    res.json({ message: "Address deleted successfully." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
