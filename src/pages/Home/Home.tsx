import './Home.css';

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <h1 className="hero-title">Welcome to Uengage Assignment</h1>
        <p className="hero-subtitle">
          A professional React application built with modern tools and best
          practices.
        </p>
        <div className="tech-stack">
          <h2>Tech Stack</h2>
          <div className="tech-grid">
            <div className="tech-card">
              <h3>React 18</h3>
              <p>Modern UI library with hooks and functional components</p>
            </div>
            <div className="tech-card">
              <h3>TypeScript</h3>
              <p>Type-safe JavaScript for better development experience</p>
            </div>
            <div className="tech-card">
              <h3>Vite</h3>
              <p>Fast build tool and development server</p>
            </div>
            <div className="tech-card">
              <h3>React Router</h3>
              <p>Client-side routing for single-page applications</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;

