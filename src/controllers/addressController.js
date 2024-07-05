import Address from "../models/addressModel.js";

// Create a new address
export const createAddress = async (req, res) => {
	try {
		const newAddress = new Address(req.body);
		await newAddress.save();
		res.status(201).json(newAddress);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

// Get all addresses
export const getAddresses = async (req, res) => {
	try {
		const addresses = await Address.find();
		res.status(200).json(addresses);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

// Update address
export const editAddress = async (req, res) => {
	try {
		const { id } = req.params;
		const updatedAddress = await Address.findByIdAndUpdate(id, req.body, {
			new: true,
			runValidators: true,
		});

		if (!updatedAddress) {
			return res
				.status(404)
				.json({ message: `Address with id ${id} not found` });
		}

		res.status(200).json(updatedAddress);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

// Delete address
export const deleteAddress = async (req, res) => {
	try {
		const { id } = req.params;
		const deletedAddress = await Address.findByIdAndDelete(id);

		if (!deletedAddress) {
			return res
				.status(404)
				.json({ message: `Address with id ${id} not found` });
		}

		res.status(200).json({ message: `Address with id ${id} has been deleted` });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};
