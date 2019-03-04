/* eslint-disable no-else-return */
/* eslint linebreak-style: ["error", "windows"] */
import express from 'express';
import ComplaintsController from '../complaintController/complaints';

const router = express.Router();

// endpoint request to get data (get all complaints)
router.get('/api/v1/sarri', ComplaintsController.getAllComplaints);

// endpoint request to post data (insert new complaint)
router.post('/api/v1/sarri', ComplaintsController.createComplaint);

// endpoint to get single data
router.get('/api/v1/sarri/:id', ComplaintsController.getComplaint);

// endpoint to delete data
router.delete('/api/v1/sarri/:id', ComplaintsController.deleteComplaint);

// endpoint to update data
router.patch('/api/v1/sarri/:id', ComplaintsController.updateComplaint);

export default router;
