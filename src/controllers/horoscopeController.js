import Horoscope from "../models/horoscopeModel.js";

// Create a new horoscope
export const createHoroscope = async (req, res) => {
  try {
    const {
      sodiac,
      title,
      body,
    } = req.body;

    const horoscope = new Horoscope({
      sodiac,
      title,
      body,
    });

    await horoscope.save();
    res.status(201).json({ message: "Horoscope created successfully.", horoscope });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all horoscopes
export const getHoroscopes = async (req, res) => {
  try {
    const horoscopes = await Horoscope.find();
    res.json(horoscopes);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Get a horoscope by ID
export const getHoroscopeById = async (req, res) => {
  try {
    const horoscope = await Horoscope.findById(req.params.id);

    if (!horoscope) {
      return res.status(404).json({ message: "Horoscope not found." });
    }

    res.json(horoscope);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Update a horoscope by ID
export const updateHoroscope = async (req, res) => {
  try {
    const horoscope = await Horoscope.findById(req.params.id);

    if (!horoscope) {
      return res.status(404).json({ message: "Horoscope not found." });
    }

    const {
        sodiac,
        title,
        body,
    } = req.body;

    if (sodiac) horoscope.sodiac = sodiac;
    if (title) horoscope.title = title;
    if (body) horoscope.body = body;

    await horoscope.save();
    res.json({ message: "Horoscope updated successfully.", horoscope });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



export const deleteHoroscope = async (req, res) => {
    try {
      const { id } = req.params;
      const deleteHoroscope = await Horoscope.findByIdAndDelete(id);
  
      if (!deleteHoroscope) {
        return res.status(404).json({ message: "Sodiac not found." });
      }
      res.json({ message: "Sodiac deleted successfully." });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };