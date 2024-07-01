// components/ProgressiveForm.js
import React, { useState } from 'react';
import styles from './ProgressiveForm.module.css';

const ProgressiveForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    amount: '',
    ccNum: '',
    ccv: '',
    dob: '',
    transDate: '',
    location: '',
  });
  const [isFlipped, setIsFlipped] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  const handleFocus = (field) => {
    if (field === 'ccv') {
      setIsFlipped(true);
    } else {
      setIsFlipped(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { ccNum, amount, transDate, dob, location } = formData;
    const [latitude, longitude] = location.split(',').map(Number);

    const data = {
      cc_num: parseInt(ccNum),
      amt: parseFloat(amount),
      trans_date: transDate,
      latitude: latitude,
      longitude: longitude,
      dob: dob,
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setMessage('Transaction submitted successfully');
      } else {
        setMessage('Failed to submit transaction');
      }
    } catch (error) {
      setMessage('Error submitting transaction');
    }
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      {step === 1 && (
        <div className={styles.slide}>
          <div className={styles.cardContainer}>
            <div className={`${styles.creditCard} ${isFlipped ? styles.flipped : ''}`}>
              <div className={styles.front}>
                <div className={styles.crd}>Credit Card</div>
                <div className={styles.cardNumber}>
                  {formData.ccNum || '#### #### #### ####'}
                </div>
              </div>
              <div className={styles.back}>
                <div className={styles.line}></div>
                <div className={styles.ccv}>
                  {formData.ccv || '###'}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.verty}>
            <div className={styles.ambox}>
            <label>
                Amount:
                <input
                    type="text"
                    name="amount"
                    placeholder="Amount"
                    value={formData.amount}
                    onChange={handleChange}
                    className={styles.inp}
                />
            </label>
          </div>
          <div className={styles.credccv}>
            <label>
                Credit Card Number:
                <input
                type="text"
                name="ccNum"
                placeholder="Credit Card Number"
                value={formData.ccNum}
                onChange={handleChange}
                onFocus={() => handleFocus('ccNum')}
                className={styles.inp}

                />
            </label>
            <label>
                CCV:
                <input
                type="text"
                name="ccv"
                placeholder="CCV"
                value={formData.ccv}
                onChange={handleChange}
                onFocus={() => handleFocus('ccv')}
                />
            </label>

          </div>
          </div>
          <div className={styles.gert}>
            <button type="button" onClick={handleNext}>Next</button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className={styles.vertyb}>

        <div className={styles.slide}>
        <div className={styles.credccv}>
          <label>
            Date of Birth:
            <input
              type="date"
              name="dob"
              placeholder="Date of Birth"
              value={formData.dob}
              onChange={handleChange}
              className={styles.inp}
            />
          </label>
          <label>
            Transaction Date:
            <input
              type="datetime-local"
              name="transDate"
              placeholder="Transaction Date"
              value={formData.transDate}
              onChange={handleChange}
              className={styles.inp}

            />
          </label>
          </div>
          <div className={styles.gertc}>
            <button type="button" onClick={handlePrev}>Previous</button>
            <button type="button" onClick={handleNext}>Next</button>
          </div>
        </div>
        </div>
      )}

      {step === 3 && (
        <div className={styles.vertyb}>

        <div className={styles.slideo}>
        <label>
            Location:
            <select
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={styles.inpv}
            >
                <option value="">Select Location</option>
                <option value="40.712776,-74.005974">New York, NY</option>
                <option value="34.052235,-118.243683">Los Angeles, CA</option>
                <option value="41.878113,-87.629799">Chicago, IL</option>
                <option value="29.760427,-95.369804">Houston, TX</option>
                <option value="33.448376,-112.074036">Phoenix, AZ</option>
            </select>
            </label>
          <div className={styles.gertc}>
            <button type="button" onClick={handlePrev}>Previous</button>
            <button type="submit">Submit</button>
          </div>
        </div>
        </div>
      )}

      {message && <p>{message}</p>}
    </form>
  );
};

export default ProgressiveForm;
