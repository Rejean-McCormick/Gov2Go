import React, { useEffect, useState } from 'react';
import api from '../../services/api'; // Assuming api is set up to make backend calls
import './LegalView.css'; // Assuming custom styles for the legal page

const LegalView = () => {
  const [legalDocuments, setLegalDocuments] = useState({
    termsOfService: '',
    privacyPolicy: '',
  });

  // Optional method to fetch legal documents dynamically from backend
  const fetchLegalDocuments = async () => {
    try {
      const response = await api.get('/legal'); // Assuming this endpoint returns legal documents
      setLegalDocuments({
        termsOfService: response.data.termsOfService,
        privacyPolicy: response.data.privacyPolicy,
      });
    } catch (error) {
      console.error('Error fetching legal documents', error);
    }
  };

  useEffect(() => {
    fetchLegalDocuments(); // Fetch legal documents on component mount
  }, []);

  return (
    <div className="legal-view">
      <h1>Terms of Service</h1>
      <section className="legal-section">
        <p>{legalDocuments.termsOfService || 'Loading terms of service...'}</p>
      </section>

      <h1>Privacy Policy</h1>
      <section className="legal-section">
        <p>{legalDocuments.privacyPolicy || 'Loading privacy policy...'}</p>
      </section>
    </div>
  );
};

export default LegalView;
 
