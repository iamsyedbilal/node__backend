import Tour from '../models/tour.model.js';

export const getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();

    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

export const getTourById = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

export const createTour = async (req, res) => {
  try {
    const createdTour = await Tour.create(req.body);

    res.status(201).json({ status: 'success', data: { createdTour } });
  } catch (error) {
    res.status(404).json({ status: 'fail', message: error });
  }
};

export const updateTour = async (req, res) => {
  try {
    const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(201).json({ status: 'success', data: { updatedTour } });
  } catch (error) {
    res.status(404).json({ status: 'fail', message: error });
  }
};

export const deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);

    res.status(201).json({ status: 'success', data: null });
  } catch (error) {
    res.status(404).json({ status: 'fail', message: error });
  }
};
