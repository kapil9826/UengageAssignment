import './SkeletonLoader.css';

function SkeletonLoader() {
  return (
    <div className="skeleton-container">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="skeleton-item">
          <div className="skeleton-id"></div>
          <div className="skeleton-content">
            <div className="skeleton-line skeleton-title"></div>
            <div className="skeleton-line skeleton-subtitle"></div>
            <div className="skeleton-line skeleton-body"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SkeletonLoader;

