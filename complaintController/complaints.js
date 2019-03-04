/* eslint-disable no-else-return */
/* eslint-disable class-methods-use-this */
import { pool } from '../db/dbconnect';

class ComplaintsController {
  getAllComplaints(req, res) {
    const sql = 'Select * from complaints';
    pool
      .query(sql)
      .then(result => {
        return res.status(200).send(result.rows);
      })
      .catch(e => {
        console.error(e.stack);
        return res.status(404).send('Query Failed');
      });
  }

  getComplaint(req, res) {
    const id = parseInt(req.params.id, 10);
    const sql = `Select * from complaints where id = ${id}`;
    pool
      .query(sql)
      .then(result => {
        if (result.rows.length > 0) {
          return res.status(200).send(result.rows);
        } else {
          return res.status(404).send(`0 rows found`);
        }
      })
      .catch(e => {
        console.error(e.stack);
        return res.status(404).send('Query Failed');
      });
  }

  createComplaint(req, res) {
    const data = { date: req.body.date, complaints: req.body.complaints };
    const sql = `INSERT INTO complaints (date, complaints) VALUES($1,$2) RETURNING *`;
    const values = [data.date, data.complaints];
    pool
      .query(sql, values)
      .then(result => {
        if (data.date && data.complaints) {
          return res.status(202).send({
            status: 'Succesful',
            result: result.rows[0]
          });
        } else {
          return res.status(400).send(`Errors in form`);
        }
      })
      .catch(e => {
        console.error(e.stack);
        return res.status(404).send('Query Failed');
      });
  }

  updateComplaint(req, res) {
    const id = parseInt(req.params.id, 10);
    const data = { complaints: req.body.complaints };
    const sql = `UPDATE complaints SET complaints = $1 WHERE id = ${id}`;
    const values = [data.complaints];
    pool
      .query(sql, values)
      .then(results => {
        if (!data.complaints) {
          return res.status(404).send({
            success: false,
            message: 'Update complain'
          });
        } else {
          return res.status(201).send({
            success: true,
            results: results.rows[0]
          });
        }
      })
      .catch(e => {
        console.error(e.stack);
        return res.status(404).send('Query Failed');
      });
  }

  deleteComplaint(req, res) {
    const id = parseInt(req.params.id, 10);
    const sql = `Delete from complaints where id = ${id}`;
    pool
      .query(sql)
      .then(() => res.status(200).send(`Row Deleted`))
      .catch(e => {
        console.error(e.stack);
        return res.status(404).send('No rows found');
      });
  }
}
const complaintsController = new ComplaintsController();
export default complaintsController;
