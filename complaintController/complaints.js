/* eslint-disable no-else-return */
/* eslint linebreak-style: ["error", "windows"] */
/* eslint-disable class-methods-use-this */
import db from '../db/db';

class ComplaintsController {
  getAllComplaints(req, res) {
    return res.status(200).send({
      success: true,
      message: 'All complaints retrieved succesfully',
      complaints: db,
    });
  }

  getComplaint(req, res) {
    const id = parseInt(req.params.id, 10);
    db.map((complaint) => {
      if (complaint.id === id) {
        return res.status(200).send({
          success: true,
          message: 'Complaint retrieved successfully',
          complaint,
        });
      }
    });
    return res.status(404).send({
      success: false,
      message: 'Complaint does not exist',
    });
  }

  createComplaint(req, res) {
    if (!req.body.date) {
      return res.status(400).send({
        success: false,
        message: 'Date is required',
      });
    } else if (!req.body.complain) {
      return res.status(400).send({
        success: false,
        message: 'Complaint is required',
      });
    }
    const complaint = {
      id: db.length + 1,
      date: req.body.date,
      complain: req.body.complain,
    };
    db.push(complaint);
    return res.status(201).send({
      success: true,
      message: 'Complaint added successfully',
      complaint,
    });
  }

  updateComplaint(req, res) {
    const id = parseInt(req.params.id, 10);
    let complaintFound;
    let itemIndex;
    db.map((complaint, index) => {
      if (complaint.id === id) {
        complaintFound = complaint;
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
  }

  deleteComplaint(req, res) {
    const id = parseInt(req.params.id, 10);
    db.map((complaint, index) => {
      if (complaint.id === id) {
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
  }
}

const complaintsController = new ComplaintsController();
export default complaintsController;
