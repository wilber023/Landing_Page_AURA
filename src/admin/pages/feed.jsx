import React from 'react';
import { Link } from 'react-router-dom';
import './Feed.css';

// Datos de ejemplo para el feed
const MOCK_POSTS = [
  {
    id: 1,
    nombreCompleto: "María García",
    fotoPerfil: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    contenido: "¡Increíble día en la playa! El atardecer estuvo espectacular 🌅",
    imagen: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
    likes: 47,
    comentarios: 12,
    fechaCreacion: new Date(Date.now() - 2 * 60 * 60 * 1000),
    ubicacion: "Cancún, México"
  },
  {
    id: 2,
    nombreCompleto: "Carlos Rodríguez",
    fotoPerfil: null,
    contenido: "Terminé mi primer maratón! 42km de puro esfuerzo pero valió la pena 🏃‍♂️💪",
    imagen: null,
    likes: 89,
    comentarios: 23,
    fechaCreacion: new Date(Date.now() - 5 * 60 * 60 * 1000),
    ubicacion: null
  },
  {
    id: 3,
    nombreCompleto: "Ana Martínez",
    fotoPerfil: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    contenido: "Nueva receta en el blog! Tacos al pastor caseros 🌮",
    imagen: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&h=600&fit=crop",
    likes: 134,
    comentarios: 45,
    fechaCreacion: new Date(Date.now() - 24 * 60 * 60 * 1000),
    ubicacion: "Ciudad de México"
  },
  {
    id: 4,
    nombreCompleto: "Diego Hernández",
    fotoPerfil: null,
    contenido: "Trabajando en mi nuevo proyecto de arte digital. ¿Qué opinan? 🎨✨",
    imagen: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop",
    likes: 203,
    comentarios: 56,
    fechaCreacion: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    ubicacion: "Guadalajara"
  },
  {
    id: 5,
    nombreCompleto: "Laura Sánchez",
    fotoPerfil: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    contenido: "Café y libros, la mejor combinación para un domingo ☕📚",
    imagen: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800&h=600&fit=crop",
    likes: 176,
    comentarios: 31,
    fechaCreacion: new Date(Date.now() - 6 * 60 * 60 * 1000),
    ubicacion: "Monterrey"
  }
];

export default function Feed() {
  const formatFecha = (fecha) => {
    const now = new Date();
    const diff = now - fecha;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Ahora';
    if (minutes < 60) return `Hace ${minutes}m`;
    if (hours < 24) return `Hace ${hours}h`;
    if (days < 7) return `Hace ${days}d`;
    return `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`;
  };

  const ProfilePicture = ({ src, nombre }) => {
    if (src) {
      return (
        <img 
          src={src} 
          alt={nombre}
          className="profile-picture"
        />
      );
    }

    return (
      <div className="profile-avatar">
        {nombre[0].toUpperCase()}
      </div>
    );
  };

  return (
    <div className="feed-container">
      {/* Header */}
      <header className="feed-header">
        <div className="header-content">
          <h1 className="logo">AURA</h1>
          
          <nav className="nav-links">
            <Link to="/login" className="login-button">
              Iniciar sesión
            </Link>
          </nav>
        </div>
      </header>

      {/* Feed Content */}
      <main className="feed-main">
        <div className="posts-container">
          {MOCK_POSTS.map((post) => (
            <article key={post.id} className="post-card">
              {/* Post Header */}
              <div className="post-header">
                <ProfilePicture src={post.fotoPerfil} nombre={post.nombreCompleto} />
                
                <div className="post-user-info">
                  <h3 className="user-name">{post.nombreCompleto}</h3>
                  <div className="post-meta">
                    <span>{formatFecha(post.fechaCreacion)}</span>
                    {post.ubicacion && (
                      <>
                        <span className="separator">·</span>
                        <span>📍 {post.ubicacion}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Post Content */}
              {post.contenido && (
                <div className="post-content">
                  {post.contenido}
                </div>
              )}

              {/* Post Image */}
              {post.imagen && (
                <div className="post-image-container">
                  <img 
                    src={post.imagen} 
                    alt="Post" 
                    className="post-image"
                  />
                </div>
              )}

              {/* Stats */}
              <div className="post-stats">
                {post.likes > 0 && (
                  <div className="stat-item">
                    <span className="heart-icon">❤️</span>
                    <span className="stat-count">{post.likes}</span>
                  </div>
                )}
                {post.likes > 0 && post.comentarios > 0 && (
                  <span className="separator">·</span>
                )}
                {post.comentarios > 0 && (
                  <div className="stat-item">
                    <span>💬</span>
                    <span className="stat-text">
                      {post.comentarios} comentario{post.comentarios !== 1 ? 's' : ''}
                    </span>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* End Message */}
        <div className="end-message">
          <p>Has visto todas las publicaciones recientes</p>
        </div>
      </main>
    </div>
  );
}