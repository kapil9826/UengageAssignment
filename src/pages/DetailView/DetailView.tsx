import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TabType, User, Post, Comment, Album } from '../../types';
import {
  fetchUserById,
  fetchPostById,
  fetchCommentById,
  fetchAlbumById,
} from '../../services/api';
import DetailSkeleton from '../../components/DetailSkeleton/DetailSkeleton';
import './DetailView.css';

type DetailItem = User | Post | Comment | Album;

function DetailView() {
  const { tab, id } = useParams<{ tab: TabType; id: string }>();
  const navigate = useNavigate();

  const [item, setItem] = useState<DetailItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!tab || !id) return;

    setLoading(true);
    setError(false);

    const loadItem = async () => {
      try {
        const itemId = Number(id);
        if (Number.isNaN(itemId)) throw new Error();

        let result: DetailItem;

        switch (tab) {
          case 'users':
            result = await fetchUserById(itemId);
            break;
          case 'posts':
            result = await fetchPostById(itemId);
            break;
          case 'comments':
            result = await fetchCommentById(itemId);
            break;
          case 'albums':
            result = await fetchAlbumById(itemId);
            break;
          default:
            throw new Error();
        }

        setItem(result);
      } catch {
        setError(true);
        setItem(null);
      } finally {
        setLoading(false);
      }
    };

    loadItem();
  }, [tab, id]);

  const handleBack = () => {
    if (!tab) return;
    navigate(`/dashboard/${tab}`);
  };

  if (loading) return <DetailSkeleton />;

  if (error || !item) {
    return (
      <div className="detail-view">
        <button className="back-btn" onClick={handleBack}>
          ← Back
        </button>
        <div className="error-state">
          <h2>404</h2>
          <p>Item not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="detail-view">
      <button className="back-btn" onClick={handleBack}>
        ← Back to {tab ?? 'dashboard'}
      </button>

      <div className="detail-card">
        <h1 className="detail-title">
          {tab?.toUpperCase()} #{item.id}
        </h1>

        <div className="detail-content">
          {'title' in item && <div>{item.title}</div>}
          {'content' in item &&
            typeof item.content === 'string' && (
              <div>{item.content}</div>
            )}
          {'comment' in item && <div>{item.comment}</div>}
          {'userId' in item && <div>User ID: {item.userId}</div>}
        </div>
      </div>
    </div>
  );
}

export default DetailView;
