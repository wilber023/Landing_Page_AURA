import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import '../../../landing/privacy-notice/styles/privaci.css';
import Section1 from '../Data/section1';
import Section2 from '../Data/section2';
import Section3 from '../Data/section3';

import icono from '../../../assets/img/IconoAura.png';

export default function PrivacyNoticePage() {
    const [activeSection, setActiveSection] = useState('intro');

    return (
        <div className="privacy-container">
            {/* Sidebar */}
            <aside className="privacy-sidebar">
 <div className="sidebar-header">
  <div className="logo">
    <img src={icono} alt="Logo AURA" className="logo-img" />
    <span className="logo-text">AURA</span>
  </div>
</div>


                <nav className="sidebar-nav">
                    <Link to="/Home" className="nav-item">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>Inicio</span>
                    </Link>

                    <button 
                        className={`nav-item ${activeSection === 'intro' ? 'active' : ''}`}
                        onClick={() => setActiveSection('intro')}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <polyline points="14 2 14 8 20 8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>Introducción</span>
                    </button>

                    <button 
                        className={`nav-item ${activeSection === 'section1' ? 'active' : ''}`}
                        onClick={() => setActiveSection('section1')}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <line x1="9" y1="9" x2="15" y2="9" strokeWidth="2" strokeLinecap="round"/>
                            <line x1="9" y1="15" x2="15" y2="15" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                        <span>Uso de Datos</span>
                    </button>

                    {/* <button 
                        className={`nav-item ${activeSection === 'section2' ? 'active' : ''}`}
                        onClick={() => setActiveSection('section2')}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>Derechos ARCO</span>
                    </button> */}

                    <button 
                        className={`nav-item ${activeSection === 'section3' ? 'active' : ''}`}
                        onClick={() => setActiveSection('section3')}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <circle cx="12" cy="12" r="10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <line x1="12" y1="16" x2="12" y2="12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <line x1="12" y1="8" x2="12.01" y2="8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>Información Adicional</span>
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="privacy-main">
                <div className="privacy-header">
                    <h1>Aviso de Privacidad</h1>
                    <p className="subtitle">AURA APP - Análisis y Reconexión Humana Asistida</p>
                </div>

                <div className="privacy-content">
                    {activeSection === 'intro' && (
                        <section className="privacy-section">
                            <div className="intro-box">
                                <h2>AVISO DE PRIVACIDAD</h2>
                                <p><strong>AURA APP (Análisis y Reconexión Humana Asistida)</strong>, con domicilio en Universidad Politécnica de Chiapas, Colonia Las Brisas, Suchiapa, Chiapas, México, C.P. 29150, es el responsable del uso y protección de sus datos personales, y al respecto le informa lo siguiente:</p>
                            </div>

                            <div className="welcome-message">
                                <p>Este aviso de privacidad ha sido diseñado para informarle de manera clara y transparente sobre cómo AURA APP recopila, utiliza, almacena y protege su información personal.</p>
                                <p>Por favor, navegue a través del menú lateral para conocer los detalles de cada sección.</p>
                            </div>
                        </section>
                    )}

                    {activeSection === 'section1' && <Section1 />}
                    {activeSection === 'section2' && <Section2 />}
                    {activeSection === 'section3' && <Section3 />}
                </div>
            </main>
        </div>
    );
}