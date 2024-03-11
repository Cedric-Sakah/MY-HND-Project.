const { Shipment, validate } = require('../models/shipment'); 
const formidable = require('formidable');
const fs = require('fs');

getAllShipments = async (req, res) => {
  const shipments = await Shipment.find().sort('createdAt');
  res.send(shipments);
};

createShipment = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        message: "Image could not be uploaded",
      });
    }

    const body = {
      fullName: fields.fullName[0],
      idNumber: fields.idNumber[0],
      email: fields.email[0],
      phone: fields.phone[0],
      town: fields.town[0],
      homeAddress: fields.homeAddress[0],
      date: fields.date[0], 
    };
    const { error } = validate(body);
    if (error) return res.status(400).send(error.details[0].message);

    let shipment = new Shipment({ ...body });
    if (files.image) {
      shipment.image.data = fs.readFileSync(files.image[0].filepath);
      shipment.image.contentType = files.image[0].mimetype;
    }

    try {
      shipment = await shipment.save();
      res.status(200).send(shipment);
    } catch (err) {
      return res.status(400).send(err); 
    }
  });
};

updateShipment = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        message: "Image could not be uploaded",
      });
    }

    const body = {
      fullName: fields.fullName[0],
      idNumber: fields.idNumber[0],
      email: fields.email[0],
      phone: fields.phone[0],
      town: fields.town[0],
      homeAddress: fields.homeAddress[0],
      date: fields.date[0], // Assuming date field exists
    };
    const { error } = validate(body);
    if (error) return res.status(400).send(error.details[0].message);

    let shipment = await Shipment.findByIdAndUpdate(req.params.id, { ...body }, { new: true });
    shipment.updated = Date.now();

    try {
      res.status(200).send(shipment);
    } catch (err) {
      return res.status(400).send('The shipment with the given ID was not found.');
    }
  });
};

deleteShipment = async (req, res) => {
  const shipment = await Shipment.findByIdAndRemove(req.params.id);

  if (!shipment) return res.status(404).send('The shipment with the given ID was not found.');

  res.send(shipment);
};

getShipmentById = async (req, res) => {
  const shipment = await Shipment.findById(req.params.id);

  if (!shipment) return res.status(404).send('The shipment with the given ID was not found.');

  res.send(shipment);
};

module.exports = {
  getAllShipments,
  createShipment,
  updateShipment,
  deleteShipment,
  getShipmentById,
};
