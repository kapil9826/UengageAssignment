import './DetailSkeleton.css';

function DetailSkeleton() {
  return (
    <div className="detail-view">
      <div className="skeleton-back-btn"></div>
      <div className="detail-card">
        <div className="detail-header">
          <div className="skeleton-title"></div>
        </div>
        <div className="detail-content">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="detail-field">
              <div className="skeleton-label"></div>
              <div className="skeleton-value"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DetailSkeleton;

