import { useState } from 'react';
import './ReservationForm.css';

function ReservationForm({ apartmentName = "este departamento" }) {
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    guests: '1',
    fullName: '',
    email: '',
    phone: '',
    message: `Hola, me interesa ${apartmentName}. ¿Está disponible para las fechas indicadas?`
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      const response = await fetch('https://formspree.io/f/xjkvywrw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          checkIn: '',
          checkOut: '',
          guests: '1',
          fullName: '',
          email: '',
          phone: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="reservation-form-container">
      <h3 className="reservation-title">Reserva este departamento</h3>
      
      {submitStatus === 'success' ? (
        <div className="success-message">
          <i className="fas fa-check-circle"></i>
          <p>¡Solicitud de reserva enviada con éxito! Te contactaremos pronto para confirmar disponibilidad.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="reservation-form">
          <div className="form-group">
            <label htmlFor="checkIn">Check-in</label>
            <input 
              type="date" 
              id="checkIn" 
              name="checkIn" 
              value={formData.checkIn} 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="checkOut">Check-out</label>
            <input 
              type="date" 
              id="checkOut" 
              name="checkOut" 
              value={formData.checkOut} 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="guests">Huéspedes</label>
            <select 
              id="guests" 
              name="guests" 
              value={formData.guests} 
              onChange={handleChange} 
              required
            >
              <option value="1">1 huésped</option>
              <option value="2">2 huéspedes</option>
              <option value="3">3 huéspedes</option>
              <option value="4">4 huéspedes</option>
              <option value="5">5 huéspedes</option>
              <option value="6">6 huéspedes</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="fullName">Nombre completo</label>
            <input 
              type="text" 
              id="fullName" 
              name="fullName" 
              value={formData.fullName} 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="phone">Teléfono</label>
            <input 
              type="tel" 
              id="phone" 
              name="phone" 
              value={formData.phone} 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="message">Mensaje</label>
            <textarea 
              id="message" 
              name="message" 
              value={formData.message} 
              onChange={handleChange} 
              rows="4"
              placeholder="Escribe tu consulta sobre disponibilidad..."
              required 
            ></textarea>
          </div>
          
          <button 
            type="submit" 
            className="submit-btn" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Enviando...' : 'Solicitar reserva'}
          </button>
          
          {submitStatus === 'error' && (
            <p className="error-message">Hubo un error al enviar tu solicitud. Por favor intenta nuevamente.</p>
          )}
          
          <p className="disclaimer">No se realizará ningún cargo hasta confirmar la disponibilidad</p>
        </form>
      )}
    </div>
  );
}

export default ReservationForm;