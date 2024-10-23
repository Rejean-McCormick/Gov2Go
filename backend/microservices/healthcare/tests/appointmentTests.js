// /backend/microservices/healthcare/tests/appointmentTests.js

const appointmentService = require('../services/appointmentService');
const { expect } = require('chai'); // Using Chai for assertions
const sinon = require('sinon'); // Using Sinon for mocking/stubbing

describe('Appointment Service Tests', () => {
    let mockPatientId;
    let mockDoctorId;
    let mockAppointmentTime;
    let mockAppointmentId;

    beforeEach(() => {
        // Setup mock data for testing
        mockPatientId = 'mockPatientId';
        mockDoctorId = 'mockDoctorId';
        mockAppointmentTime = new Date();
        mockAppointmentId = 'mockAppointmentId';

        // Mock the database interactions for each method
        sinon.stub(appointmentService, 'createAppointment').resolves({
            status: 'success',
            appointment: {
                id: mockAppointmentId,
                patientId: mockPatientId,
                doctorId: mockDoctorId,
                appointmentTime: mockAppointmentTime
            }
        });

        sinon.stub(appointmentService, 'modifyAppointment').resolves({
            status: 'success',
            appointment: {
                id: mockAppointmentId,
                appointmentTime: mockAppointmentTime
            }
        });

        sinon.stub(appointmentService, 'getAppointmentDetails').resolves({
            status: 'success',
            appointment: {
                id: mockAppointmentId,
                patientId: mockPatientId,
                doctorId: mockDoctorId,
                appointmentTime: mockAppointmentTime
            }
        });
    });

    afterEach(() => {
        // Restore the original methods after each test
        sinon.restore();
    });

    it('should schedule an appointment', async () => {
        const result = await appointmentService.createAppointment(mockPatientId, mockDoctorId, mockAppointmentTime);
        expect(result.status).to.equal('success');
        expect(result.appointment).to.have.property('id');
        expect(result.appointment.id).to.equal(mockAppointmentId);
    });

    it('should update an appointment', async () => {
        const updatedDetails = { appointmentTime: new Date() };
        const result = await appointmentService.modifyAppointment(mockAppointmentId, updatedDetails);
        expect(result.status).to.equal('success');
        expect(result.appointment).to.have.property('appointmentTime');
        expect(result.appointment.appointmentTime).to.deep.equal(updatedDetails.appointmentTime);
    });

    it('should retrieve appointment details', async () => {
        const result = await appointmentService.getAppointmentDetails(mockAppointmentId);
        expect(result.status).to.equal('success');
        expect(result.appointment).to.have.property('id', mockAppointmentId);
        expect(result.appointment).to.have.property('patientId', mockPatientId);
        expect(result.appointment).to.have.property('doctorId', mockDoctorId);
    });

    // Negative Test Cases for Security
    it('should not allow unauthorized access to schedule an appointment', async () => {
        appointmentService.createAppointment.rejects(new Error('Unauthorized access'));

        try {
            await appointmentService.createAppointment('unauthorizedPatient', mockDoctorId, mockAppointmentTime);
        } catch (error) {
            expect(error.message).to.equal('Unauthorized access');
        }
    });

    it('should not allow unauthorized access to update an appointment', async () => {
        appointmentService.modifyAppointment.rejects(new Error('Unauthorized access'));

        try {
            await appointmentService.modifyAppointment('unauthorizedAppointmentId', { appointmentTime: new Date() });
        } catch (error) {
            expect(error.message).to.equal('Unauthorized access');
        }
    });

    it('should not allow unauthorized access to retrieve appointment details', async () => {
        appointmentService.getAppointmentDetails.rejects(new Error('Unauthorized access'));

        try {
            await appointmentService.getAppointmentDetails('unauthorizedAppointmentId');
        } catch (error) {
            expect(error.message).to.equal('Unauthorized access');
        }
    });
});
 
