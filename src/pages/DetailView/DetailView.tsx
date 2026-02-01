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

  const renderUserDetail = (user: User) => (
    <div className="detail-content">
      <div className="detail-section">
        <h2 className="section-title">Personal Information</h2>
        <div className="detail-grid">
          <div className="detail-field">
            <label>Full Name</label>
            <div>{user.firstname} {user.lastname}</div>
          </div>
          <div className="detail-field">
            <label>Email</label>
            <div><a href={`mailto:${user.email}`}>{user.email}</a></div>
          </div>
          {user.phone && (
            <div className="detail-field">
              <label>Phone</label>
              <div><a href={`tel:${user.phone}`}>{user.phone}</a></div>
            </div>
          )}
          {user.website && (
            <div className="detail-field">
              <label>Website</label>
              <div><a href={user.website} target="_blank" rel="noopener noreferrer">{user.website}</a></div>
            </div>
          )}
          {user.birthDate && (
            <div className="detail-field">
              <label>Birth Date</label>
              <div>{new Date(user.birthDate).toLocaleDateString()}</div>
            </div>
          )}
        </div>
      </div>

      <div className="detail-section">
        <h2 className="section-title">Login Information</h2>
        <div className="detail-grid">
          <div className="detail-field">
            <label>Username</label>
            <div className="post-slug">{user.login.username}</div>
          </div>
          <div className="detail-field">
            <label>UUID</label>
            <div className="post-slug">{user.login.uuid}</div>
          </div>
          {user.login.registered && (
            <div className="detail-field">
              <label>Registered</label>
              <div>{new Date(user.login.registered).toLocaleString()}</div>
            </div>
          )}
        </div>
      </div>

      <div className="detail-section">
        <h2 className="section-title">Address</h2>
        <div className="detail-grid">
          <div className="detail-field">
            <label>Street</label>
            <div>{user.address.street}</div>
          </div>
          {user.address.suite && (
            <div className="detail-field">
              <label>Suite</label>
              <div>{user.address.suite}</div>
            </div>
          )}
          <div className="detail-field">
            <label>City</label>
            <div>{user.address.city}</div>
          </div>
          <div className="detail-field">
            <label>Zipcode</label>
            <div>{user.address.zipcode}</div>
          </div>
          {user.address.geo && (
            <div className="detail-field">
              <label>Coordinates</label>
              <div>
                <a 
                  href={`https://www.google.com/maps?q=${user.address.geo.lat},${user.address.geo.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="post-url"
                >
                  {user.address.geo.lat}, {user.address.geo.lng}
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {user.company && (
        <div className="detail-section">
          <h2 className="section-title">Company</h2>
          <div className="detail-grid">
            <div className="detail-field">
              <label>Company Name</label>
              <div>{user.company.name}</div>
            </div>
            {user.company.catchPhrase && (
              <div className="detail-field">
                <label>Catch Phrase</label>
                <div>{user.company.catchPhrase}</div>
              </div>
            )}
            {user.company.bs && (
              <div className="detail-field">
                <label>Business</label>
                <div>{user.company.bs}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  const renderPostDetail = (post: Post) => (
    <div className="detail-content">
      {post.image && (
        <img src={post.image} alt={post.title} className="post-detail-image" />
      )}
      
      <div className="detail-section">
        <h2 className="section-title">Post Information</h2>
        <div className="detail-grid">
          <div className="detail-field full-width">
            <label>Title</label>
            <div className="post-detail-title">{post.title}</div>
          </div>
          <div className="detail-field">
            <label>Slug</label>
            <div className="post-slug">{post.slug}</div>
          </div>
          <div className="detail-field">
            <label>URL</label>
            <div>
              <a href={post.url} target="_blank" rel="noopener noreferrer" className="post-url">
                {post.url}
              </a>
            </div>
          </div>
          <div className="detail-field">
            <label>Category</label>
            <div>
              <span className="post-category-badge">{post.category}</span>
            </div>
          </div>
          <div className="detail-field">
            <label>Status</label>
            <div>
              <span className={`post-status post-status-${post.status}`}>
                {post.status}
              </span>
            </div>
          </div>
          <div className="detail-field">
            <label>User ID</label>
            <div>{post.userId}</div>
          </div>
          <div className="detail-field">
            <label>Published At</label>
            <div>{post.publishedAt}</div>
          </div>
          <div className="detail-field">
            <label>Updated At</label>
            <div>{post.updatedAt}</div>
          </div>
        </div>
      </div>

      <div className="detail-section">
        <h2 className="section-title">Content</h2>
        <div className="detail-field full-width">
          <div className="detail-body">{post.content}</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="detail-view">
      <button className="back-btn" onClick={handleBack}>
        ← Back to {tab ?? 'dashboard'}
      </button>

      <div className="detail-card">
        <h1 className="detail-title">
          {tab === 'users' && 'firstname' in item
            ? `${item.firstname} ${item.lastname}`
            : tab === 'posts' && 'title' in item
            ? item.title
            : `${tab?.toUpperCase()} #${item.id}`}
        </h1>

        {tab === 'users' && 'firstname' in item && renderUserDetail(item as User)}
        {tab === 'posts' && 'title' in item && renderPostDetail(item as Post)}
        {tab === 'comments' && 'comment' in item && (
          <div className="detail-content">
            <div className="detail-field">
              <label>Comment</label>
              <div className="detail-body">{item.comment}</div>
            </div>
            {'userId' in item && (
              <div className="detail-field">
                <label>User ID</label>
                <div>{item.userId}</div>
              </div>
            )}
            {'postId' in item && (
              <div className="detail-field">
                <label>Post ID</label>
                <div>{item.postId}</div>
              </div>
            )}
          </div>
        )}
        {tab === 'albums' && 'title' in item && (
          <div className="detail-content">
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
          </div>
        )}
      </div>
    </div>
  );
}

export default DetailView;
