import './About.css';

function About() {
  return (
    <div className="about">
      <h1 className="about-title">About This Project</h1>
      <div className="about-content">
        <section className="about-section">
          <h2>Project Structure</h2>
          <p>
            This React application follows a professional folder structure with
            clear separation of concerns:
          </p>
          <ul className="structure-list">
            <li>
              <strong>src/components/</strong> - Reusable UI components
            </li>
            <li>
              <strong>src/pages/</strong> - Page-level components
            </li>
            <li>
              <strong>src/utils/</strong> - Utility functions and helpers
            </li>
            <li>
              <strong>src/types/</strong> - TypeScript type definitions
            </li>
            <li>
              <strong>src/hooks/</strong> - Custom React hooks
            </li>
          </ul>
        </section>

        <section className="about-section">
          <h2>Features</h2>
          <ul className="features-list">
            <li>✅ TypeScript for type safety</li>
            <li>✅ ESLint for code quality</li>
            <li>✅ Prettier for code formatting</li>
            <li>✅ React Router for navigation</li>
            <li>✅ Modern CSS with CSS Modules support</li>
            <li>✅ Responsive design</li>
            <li>✅ Fast development with Vite</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>Getting Started</h2>
          <p>To run this project:</p>
          <pre className="code-block">
            <code>npm install</code>
            <code>npm run dev</code>
          </pre>
        </section>
      </div>
    </div>
  );
}

export default About;

