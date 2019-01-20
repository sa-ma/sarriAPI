/* eslint-disable no-else-return */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint linebreak-style: ["error", "windows"] */
import express from 'express';
import bodyParser from 'body-parser';
import db from './db/db';

// Setting up express
const app = express();

// Parse incoming request data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// endpoint request to get data (get all complaints)
app.get('/api/v1/sarri', (req, res) => {
  res.status(200).send({
    success: true,
    message: 'All Complaints retrieved sucessfully',
    sarri: db,
  });
});

// endpoint request to post data (insert new complaint)
app.post('/api/v1/sarri', (req, res) => {
  if (!req.body.date || !req.body.complain) {
    return res.status(400).send({
      success: false,
      message: 'date and complain is required',
    });
  }
  const sarri = {
    id: db.length + 1,
    date: req.body.date,
    complain: req.body.complain,
  };
  db.push(sarri);
  return res.status(201).send({
    success: true,
    message: 'Complain added successfully',
    sarri,
  });
});

// endpoint to get single data
app.get('/api/v1/sarri/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  db.map((sarri) => {
    if (sarri.id === id) {
      return res.status(200).send({
        success: 'true',
        message: 'sarri retrieved successfully',
        sarri,
      });
    }
  });
  return res.status(404).send({
    success: 'false',
    message: 'Complaint does not exist',
  });
});

// endpoint to delete data
app.delete('/api/v1/sarri/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  db.map((sarri, index) => {
    if (sarri.id === id) {
      db.splice(index, 1);
      return res.status(200).send({
        success: true,
        message: 'Complaint deleted successfully',
      });
    }
  });
  return res.status(404).send({
    success: false,
    message: 'Complaint not found',
  });
});

// endpoint to update data
app.put('/api/v1/sarri/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  let complaintFound;
  let itemIndex;
  db.map((sarri, index) => {
    if (sarri.id === id) {
      complaintFound = sarri;
      itemIndex = index;
    }
  });

  if (!complaintFound) {
    return res.status(404).send({
      success: false,
      message: 'Complaint not found',
    });
  }
  if (!req.body.date) {
    return res.status(404).send({
      success: false,
      message: 'Date is required',
    });
  } else if (!req.body.complain) {
    return res.status(404).send({
      success: false,
      message: 'Complaint is required',
    });
  }

  const updatedComplaint = {
    id: complaintFound.id,
    date: req.body.date || complaintFound.date,
    complain: req.body.complain || complaintFound.complain,
  };

  db.splice(itemIndex, 1, updatedComplaint);

  return res.status(201).send({
    success: true,
    message: 'Complaint updated successfully',
    updatedComplaint,
  });
});

// Start web server
const port = 5000;
app.listen(port);
