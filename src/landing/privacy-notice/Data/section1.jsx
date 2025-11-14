import React from 'react';

export default function Section1() {
    return (
        <section className="privacy-section">
            <h2 className="privacy-title">. ¿PARA QUÉ FINES UTILIZAREMOS SUS DATOS PERSONALES?</h2>
            
            <div className="subsection">
                <h3 className="privacy-subtitle">Finalidades Primarias (Necesarias):</h3>
                <ul>
                    <li>Crear y administrar su cuenta de usuario</li>
                    <li>Proporcionarle acceso a las funcionalidades de la aplicación (feed, publicaciones, interacciones sociales)</li>
                    <li>Operar el servicio de chat con inteligencia artificial para brindarle apoyo, orientación y personalización de contenido</li>
                    <li>Verificar su identidad y autenticar su acceso</li>
                    <li>Garantizar la seguridad de la plataforma y prevenir fraudes</li>
                    <li>Procesar la eliminación de su cuenta cuando lo solicite</li>
                    <li>Atender sus solicitudes de ejercicio de derechos ARCO</li>
                    <li>Cumplir con obligaciones legales aplicables</li>
                </ul>
            </div>

            <div className="subsection">
                <h3 className="privacy-subtitle">Finalidades Secundarias (Opcionales):</h3>
                <ul>
                    <li>Analizar patrones de uso de la aplicación para mejorar funcionalidades</li>
                    <li>Enviarle notificaciones sobre nuevas características o actualizaciones de la app</li>
                    <li>Realizar estudios estadísticos y de mercado de forma agregada y anónima</li>
                    <li>Enviarle comunicaciones informativas, encuestas de satisfacción o contenido relevante</li>
                    <li>Personalizar su experiencia mediante recomendaciones basadas en su actividad</li>
                </ul>
            </div>

            <div className="subsection highlight">
                <h3 className="privacy-subtitle">Mecanismo para manifestar su negativa:</h3>
                <p>En caso de que NO desee que sus datos personales sean tratados para finalidades secundarias, puede manifestar su negativa de las siguientes formas:</p>
                <ul>
                    <li><strong>Durante el registro:</strong> Desmarcando las casillas correspondientes en el formulario de creación de cuenta</li>
                    <li><strong>Desde la aplicación:</strong> Configuración &gt; Privacidad &gt; Gestión de Finalidades</li>
                    <li><strong>Por escrito:</strong> Presentando un documento en nuestro domicilio físico</li>
                </ul>
                <p className="note">La negativa para el uso de sus datos personales para estas finalidades secundarias NO será motivo para negarle el acceso y uso de AURA APP.</p>
            </div>

            <h2 className="privacy-title">. ¿QUÉ DATOS PERSONALES UTILIZAREMOS?</h2>
            
            <div className="subsection">
                <h3 className="privacy-subtitle">Datos de Identificación y Contacto:</h3>
                <ul>
                    <li>Nombre de usuario</li>
                    <li>Dirección de correo electrónico</li>
                    <li>Contraseña (almacenada de forma cifrada)</li>
                    <li>Fecha de nacimiento o rango de edad</li>
                    <li>Fotografía de perfil (opcional)</li>
                    <li>Biografía o descripción personal (opcional)</li>
                    <li>Ubicación geográfica general (ciudad/región, opcional)</li>
                </ul>
            </div>

            <div className="subsection">
                <h3 className="privacy-subtitle">Datos de Uso y Actividad:</h3>
                <ul>
                    <li>Contenido que publica (publicaciones, fotos, comentarios)</li>
                    <li>Interacciones sociales (seguidores, seguidos, reacciones, comentarios)</li>
                    <li>Conversaciones con el chatbot de inteligencia artificial</li>
                    <li>Frecuencia y tiempos de uso de la aplicación</li>
                    <li>Funcionalidades utilizadas dentro de la app</li>
                    <li>Preferencias de contenido en el feed</li>
                </ul>
            </div>

            <div className="subsection">
                <h3 className="privacy-subtitle">Datos del Dispositivo y Técnicos:</h3>
                <ul>
                    <li>Tipo de dispositivo y sistema operativo</li>
                    <li>Identificadores únicos del dispositivo</li>
                    <li>Dirección IP</li>
                    <li>Información del navegador</li>
                    <li>Configuración de idioma y zona horaria</li>
                    <li>Registros de actividad (logs)</li>
                </ul>
            </div>

            <div className="subsection warning">
                <h3 className="privacy-subtitle">¿Recopilamos datos personales sensibles?</h3>
                <p>Para las finalidades informadas en el presente aviso de privacidad, <strong>NO recopilamos ni tratamos de manera activa</strong> datos personales sensibles (origen racial o étnico, estado de salud, información genética, creencias religiosas, filosóficas y morales, afiliación sindical, opiniones políticas o preferencia sexual).</p>
                <p className="note"><strong>IMPORTANTE:</strong> Si usted incluye voluntariamente información sensible en sus publicaciones, biografía o conversaciones con el chatbot, será su responsabilidad y se considerará que ha otorgado su consentimiento expreso para que dicha información sea visible según su configuración de privacidad. Le recomendamos no compartir este tipo de información.</p>
                <p className="disclaimer"><strong>AURA APP no es un sustituto de ayuda profesional médica, psicológica o psiquiátrica. No es un medicamento.</strong> Es una herramienta de apoyo y acompañamiento que complementa, pero no reemplaza, la atención de profesionales de la salud.</p>
            </div>

            <h2>. ¿CON QUIÉN COMPARTIMOS SU INFORMACIÓN Y PARA QUÉ FINES?</h2>
            
            <div className="table-container">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Destinatario</th>
                            <th>Ubicación</th>
                            <th>Finalidad</th>
                            <th>¿Requiere consentimiento?</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Otros usuarios de AURA APP</td>
                            <td>México</td>
                            <td>Visualización de contenido público según su configuración de privacidad (nombre de usuario, foto de perfil, publicaciones públicas)</td>
                            <td>NO (necesario para el servicio)</td>
                        </tr>
                        <tr>
                            <td>Proveedores de servicios en la nube (hosting y almacenamiento)</td>
                            <td>México/EUA</td>
                            <td>Almacenamiento seguro de datos e infraestructura tecnológica</td>
                            <td>NO (necesario para el servicio)</td>
                        </tr>
                        <tr>
                            <td>Proveedores de servicios de análisis</td>
                            <td>México/EUA</td>
                            <td>Análisis estadístico de uso de la aplicación para mejoras técnicas</td>
                            <td>SÍ (*)</td>
                        </tr>
                        <tr>
                            <td>Autoridades competentes</td>
                            <td>México</td>
                            <td>Cumplimiento de obligaciones legales, requerimientos judiciales o protección de derechos</td>
                            <td>NO (obligación legal)</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="subsection highlight">
                <p>(*) Las transferencias marcadas requieren su consentimiento. Si usted no manifiesta su negativa para dichas transferencias en un plazo de 5 días hábiles a partir de la puesta a disposición de este aviso, entenderemos que nos lo ha otorgado.</p>
                
                <h3>Cláusula de consentimiento para transferencias:</h3>
                <p><strong>NO autorizo</strong> que mis datos personales sean compartidos con los siguientes terceros para las finalidades indicadas:</p>
                <div className="checkbox-item">
                    <input type="checkbox" id="consent-analytics" />
                    <label htmlFor="consent-analytics">Proveedores de servicios de análisis (para estudios estadísticos y mejora de la app)</label>
                </div>
                <p className="note">Puede manifestar su negativa presentando un escrito en nuestro domicilio físico o desde la configuración de la aplicación.</p>
            </div>
        </section>
    );
}