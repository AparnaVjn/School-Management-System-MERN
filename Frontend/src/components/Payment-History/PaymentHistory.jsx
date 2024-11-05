import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchStudents } from '../../slices/studentSlice'; 
import { Table, Spinner } from 'react-bootstrap';
import styles from './PaymentHistory.module.css'; 

const PaymentHistory = () => {
  const dispatch = useDispatch();
  const { students, loading, error } = useSelector((state) => state.students);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  return (
    <div className={styles.paymentHistory}>
      <h2 className={styles.heading}>Transactions</h2>

      {loading && <Spinner animation="border" />}

      {error && <p className={styles.error}>Error: {error}</p>}
      <div className="table-responsive"> 
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Class</th>
            <th>Division</th>
            <th>Fee Type</th>
            <th>Amount</th>
            <th>Payment Mode</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {!loading &&
            students.map((student) =>
              student.paymentHistory.map((payment, index) => (
                <tr key={index}>
                  <td>{student.studentName}</td>
                  <td>{student.className}</td>
                  <td>{student.division}</td>
                  <td>{payment.feeType}</td>
                  <td>{payment.amount}</td>
                  <td>{payment.method}</td>
                  <td>{new Date(payment.paymentDate).toLocaleString()}</td>
                </tr>
              ))
            )}
        </tbody>
      </Table>
      </div>
    </div>
  );
};

export default PaymentHistory;
