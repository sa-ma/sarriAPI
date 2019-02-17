import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import { isatty } from 'tty';

// Configure chai
chai.use(chaiHttp);
chai.should();

describe('Complains', () => {
  describe('GET /api/v1/sarri', () => {
    // Test to get all complains
    it('should get all complains', done => {
      chai
        .request(app)
        .get('/api/v1/sarri')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
    // Test to get all records
    it('should get a single record', done => {
      const id = 2;
      chai
        .request(app)
        .get(`/api/v1/sarri/${id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });
  describe('POST /api/v1/sarri/', () => {
    //Test to create a complain
    it('should post a complain', done => {
      chai
        .request(app)
        .post('/api/v1/sarri/')
        .send({ id: '9', date: '20/10/2030', complain: 'test complain' })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  describe('DELETE /api/v1/sarri/', () => {
    // Test to delete a complain
    it('should delete a complain record', done => {
      const id = 1;
      chai
        .request(app)
        .delete(`/api/v1/sarri/${id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  describe('Update /api/v1/sarri/', () => {
    //Test to update a complain
    it('should update a complain record', done => {
      const id = 2;
      chai
        .request(app)
        .put(`/api/v1/sarri/${id}`)
        .send({ date: '20/10/2030', complain: 'tzknjznx' })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          done();
        });
    });
  });
});
