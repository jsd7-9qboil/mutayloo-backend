import Address from "../models/addressModel.js";

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

export const getAddress = async (req, res) => {
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
