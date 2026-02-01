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
  const [error, setError] = useState<string | null>(null);

  /* -------------------- FETCH ITEM -------------------- */
  useEffect(() => {
    if (!tab || !id) return;

    setLoading(true);
    setError(null);
    setItem(null);

    const loadItem = async () => {
      try {
        const itemId = Number(id);
        if (Number.isNaN(itemId)) {
          throw new Error('Invalid ID');
        }

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
            throw new Error('Invalid tab');
        }

        setItem(result);
      } catch {
        setError('Item not found');
        setItem(null);
      } finally {
        setLoading(false);
      }
    };

    loadItem();
  }, [tab, id]);

  const handleBack = () => {
    navigate(`/dashboard/${tab}`);
  };

  /* -------------------- STATES -------------------- */
  if (loading) {
    return <DetailSkeleton />;
  }

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

  /* -------------------- RENDER -------------------- */
  return (
    <div className="detail-view">
      <button className="back-btn" onClick={handleBack}>
        ← Back to {tab}
      </button>

      <div className="detail-card">
        <div className="detail-header">
          <h1 className="detail-title">
            {tab?.charAt(0).toUpperCase() + tab?.slice(1)} #{item.id}
          </h1>
        </div>

        <div className="detail-content">
          {/* ---------------- USERS ---------------- */}
          {tab === 'users' && 'firstname' in item && (
            <>
              <div className="detail-field">
                <label>First Name</label>
                <div>{item.firstname}</div>
              </div>

              <div className="detail-field">
                <label>Last Name</label>
                <div>{item.lastname}</div>
              </div>

              {item.login && (
                <div className="detail-field">
                  <label>Username</label>
                  <div>{item.login.username}</div>
                </div>
              )}

              {'email' in item && item.email && (
                <div className="detail-field">
                  <label>Email</label>
                  <div>{item.email}</div>
                </div>
              )}

              {'phone' in item && item.phone && (
                <div className="detail-field">
                  <label>Phone</label>
                  <div>{item.phone}</div>
                </div>
              )}

              {'website' in item && item.website && (
                <div className="detail-field">
                  <label>Website</label>
                  <div>{item.website}</div>
                </div>
              )}

              {item.address && (
                <div className="detail-field">
                  <label>Address</label>
                  <div>
                    {item.address.street}, {item.address.suite}
                    <br />
                    {item.address.city}, {item.address.zipcode}
                  </div>
                </div>
              )}

              {item.company && (
                <div className="detail-field">
                  <label>Company</label>
                  <div>{item.company.name}</div>
                </div>
              )}
            </>
          )}

          {/* ---------------- POSTS ---------------- */}
          {tab === 'posts' && 'title' in item && (
            <>
              {'image' in item && item.image && (
                <div className="detail-field">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="post-detail-image"
                  />
                </div>
              )}

              <div className="detail-field">
                <label>Title</label>
                <div className="post-detail-title">{item.title}</div>
              </div>

              {'category' in item && (
                <div className="detail-field">
                  <label>Category</label>
                  <div className="post-category-badge">{item.category}</div>
                </div>
              )}

              {'content' in item &&
                typeof item.content === 'string' && (
                  <div className="detail-field">
                    <label>Content</label>
                    <div className="detail-body">{item.content}</div>
                  </div>
                )}

              {'slug' in item && (
                <div className="detail-field">
                  <label>Slug</label>
                  <div className="post-slug">{item.slug}</div>
                </div>
              )}

              {'url' in item && (
                <div className="detail-field">
                  <label>URL</label>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="post-url"
                  >
                    {item.url}
                  </a>
                </div>
              )}

              {'status' in item && (
                <div className="detail-field">
                  <label>Status</label>
                  <div className={`post-status post-status-${item.status}`}>
                    {item.status}
                  </div>
                </div>
              )}

              {'publishedAt' in item && (
                <div className="detail-field">
                  <label>Published At</label>
                  <div>{item.publishedAt}</div>
                </div>
              )}

              {'updatedAt' in item && (
                <div className="detail-field">
                  <label>Updated At</label>
                  <div>{item.updatedAt}</div>
                </div>
              )}

              {'userId' in item && (
                <div className="detail-field">
                  <label>User ID</label>
                  <div>{item.userId}</div>
                </div>
              )}
            </>
          )}

          {/* ---------------- COMMENTS ---------------- */}
          {tab === 'comments' && 'comment' in item && (
            <>
              <div className="detail-field">
                <label>Comment</label>
                <div className="detail-body">{item.comment}</div>
              </div>

              {'postId' in item && (
                <div className="detail-field">
                  <label>Post ID</label>
                  <div>{item.postId}</div>
                </div>
              )}

              {'userId' in item && (
                <div className="detail-field">
                  <label>User ID</label>
                  <div>{item.userId}</div>
                </div>
              )}
            </>
          )}

          {/* ---------------- ALBUMS ---------------- */}
          {tab === 'albums' && 'title' in item && (
            <>
              <div className="detail-field">
                <label>Title</label>
                <div>{item.title}</div>
              </div>

              {'userId' in item && (
                <div className="detail-field">
                  <label>User ID</label>
                  <div>{item.userId}</div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetailView;
