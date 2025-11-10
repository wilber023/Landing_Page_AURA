import { useState } from 'react';
import Button from '../../../../components/ui/Button';
import { 
  FaRocket, 
  FaDollarSign, 
  FaLink, 
  FaUsers, 
  FaHandshake, 
  FaTools, 
  FaFlask,
  FaCheckCircle,
  FaBullseye,
  FaLock,
  FaBolt,
  FaGraduationCap,
  FaChartBar,
  FaExclamationTriangle,
  FaPaperPlane
} from 'react-icons/fa';
import './ContactForm.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    category: '',
    urgency: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  // URL de tu API backend
  const API_URL = 'http://98.95.53.50';

  const categories = [
    { value: 'help', label: 'Solicitar ayuda para jóvenes en riesgo', icon: <FaUsers /> },
    { value: 'volunteer', label: 'Voluntariado y colaboración', icon: <FaHandshake /> },
    { value: 'partnership', label: 'Alianza con mi organización', icon: <FaLink /> },
    { value: 'research', label: 'Colaboración en investigación', icon: <FaFlask /> },
    { value: 'implementation', label: 'Implementar en mi comunidad', icon: <FaRocket /> },
    { value: 'funding', label: 'Patrocinio y financiamiento', icon: <FaDollarSign /> },
    { value: 'training', label: 'Capacitación y recursos', icon: <FaGraduationCap /> },
    { value: 'support', label: 'Soporte técnico', icon: <FaTools /> }
  ];

  const urgencyLevels = [
    { value: 'low', label: 'Consulta general - Sin prisa' },
    { value: 'medium', label: 'Importante - Respuesta en 48h' },
    { value: 'high', label: 'Urgente - Respuesta en 24h' },
    { value: 'critical', label: 'Crítico - Respuesta inmediata' }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
  };

  const getCategoryLabel = (value) => {
    const category = categories.find(cat => cat.value === value);
    return category ? category.label : value;
  };

  const getUrgencyLabel = (value) => {
    const urgency = urgencyLevels.find(level => level.value === value);
    return urgency ? urgency.label : value;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Enviar datos a tu API
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        console.log('✅ Consulta enviada exitosamente:', result);
        setSubmitted(true);
      } else {
        throw new Error(result.error || 'Error al enviar la consulta');
      }
    } catch (error) {
      console.error('❌ Error enviando consulta:', error);
      setError(
        error.message || 
        'Hubo un problema al enviar tu consulta. Por favor, verifica tu conexión e intenta nuevamente.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="contact-form-container">
        <div className="contact-form success-message">
          <div className="success-icon"><FaCheckCircle /></div>
          <h3>¡Consulta enviada exitosamente!</h3>
          <p>
            Tu mensaje ha sido enviado a nuestro equipo de AURA. 
            Hemos recibido tu consulta sobre "{getCategoryLabel(formData.category)}" 
            y nos pondremos en contacto contigo según la prioridad indicada.
          </p>
          <div className="submission-details">
            <h4>Detalles de tu consulta:</h4>
            <div className="detail-item">
              <span className="detail-label">Nombre:</span>
              <span className="detail-value">{formData.name}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Email:</span>
              <span className="detail-value">{formData.email}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Organización:</span>
              <span className="detail-value">{formData.company || 'No especificada'}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Tipo:</span>
              <span className="detail-value">{getCategoryLabel(formData.category)}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Prioridad:</span>
              <span className="detail-value">{getUrgencyLabel(formData.urgency)}</span>
            </div>
          </div>
          <Button onClick={() => {
            setSubmitted(false);
            setFormData({
              name: '',
              email: '',
              company: '',
              phone: '',
              category: '',
              urgency: '',
              message: ''
            });
          }} variant="primary">
            Enviar otra consulta
          </Button>
        </div>
      </div>
    );
  }

  return (
    <section id="contacto-form" className="section contact-form-section">
      <div className="container">
        <div className="contact-form-header">
          <h2 className="section-title">¿Cómo podemos ayudar a tu comunidad?</h2>
          <p className="section-description">
            Cuéntanos sobre tu situación y descubre cómo AURA puede generar impacto positivo en tu entorno
          </p>
        </div>

        <div className="contact-form-container">
          <div className="contact-form-info">
            <h3>¿Por qué trabajar con AURA?</h3>
            <ul className="benefits-list">
              <li>
                <span className="benefit-icon"><FaBullseye /></span>
                <strong>Resultados comprobados:</strong> 85% de mejora en detección temprana
              </li>
              <li>
                <span className="benefit-icon"><FaLock /></span>
                <strong>Máxima privacidad:</strong> Protección total de datos personales
              </li>
              <li>
                <span className="benefit-icon"><FaBolt /></span>
                <strong>Implementación ágil:</strong> Apoyo completo en el proceso
              </li>
              <li>
                <span className="benefit-icon"><FaGraduationCap /></span>
                <strong>Capacitación incluida:</strong> Formación para tu equipo
              </li>
              <li>
                <span className="benefit-icon"><FaChartBar /></span>
                <strong>Impacto medible:</strong> Métricas claras de progreso social
              </li>
            </ul>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            {error && (
              <div className="error-message">
                <FaExclamationTriangle />
                <span>{error}</span>
              </div>
            )}

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Nombre completo *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Tu nombre completo"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email de contacto *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="tu.email@ejemplo.com"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="company">Organización *</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  placeholder="Nombre de tu organización o institución"
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Teléfono (opcional)</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+52 55 1234 5678"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="category">Tipo de consulta *</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecciona el tipo de consulta...</option>
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="urgency">Nivel de prioridad *</label>
                <select
                  id="urgency"
                  name="urgency"
                  value={formData.urgency}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecciona la prioridad...</option>
                  {urgencyLevels.map((level) => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="message">Describe tu situación o necesidad *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                placeholder="Cuéntanos sobre tu organización, la situación de los jóvenes que atienden, objetivos que buscas alcanzar, recursos disponibles, y cualquier contexto relevante que nos ayude a entender mejor cómo podemos apoyarte..."
              />
              <div className="character-count">
                {formData.message.length}/1000 caracteres
              </div>
            </div>

            <div className="form-actions">
              <Button 
                type="submit" 
                variant="primary" 
                size="large"
                disabled={isSubmitting}
                className={isSubmitting ? 'loading' : ''}
              >
                {isSubmitting ? (
                  <>
                    <FaPaperPlane /> Enviando consulta...
                  </>
                ) : (
                  <>
                    <FaPaperPlane /> Enviar Consulta
                  </>
                )}
              </Button>
              <p className="form-note">
                * Tu consulta será enviada directamente a nuestro equipo de AURA. 
                Nos comprometemos a responder según la prioridad indicada y siempre 
                mantendremos la confidencialidad de tu información.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;