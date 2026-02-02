import { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useFilters } from '../../context/FilterContext';
import { TabType, User, Post, Comment, Album } from '../../types';
import {
  fetchUsers,
  fetchPosts,
  fetchComments,
  fetchAlbums,
} from '../../services/api';
import SharedFilters from '../../components/SharedFilters/SharedFilters';
import Pagination from '../../components/Pagination/Pagination';
import SkeletonLoader from '../../components/SkeletonLoader/SkeletonLoader';
import './DashboardList.css';

const PAGE_SIZE = 10;

type DashboardItem = User | Post | Comment | Album;

function DashboardList() {
  const { tab } = useParams<{ tab: TabType }>();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { filters } = useFilters();

  const [data, setData] = useState<DashboardItem[]>([]);
  const [loading, setLoading] = useState(true);

  const currentPage = Number(searchParams.get('page') || 1);

  /* ---------------- FETCH ---------------- */
  useEffect(() => {
    if (!tab) return;

    setLoading(true);

    const loadData = async () => {
      try {
        let result: DashboardItem[] = [];

        switch (tab) {
          case 'users':
            result = await fetchUsers();
            break;
          case 'posts':
            result = await fetchPosts();
            break;
          case 'comments':
            result = await fetchComments();
            break;
          case 'albums':
            result = await fetchAlbums();
            break;
        }

        setData(result);
      } catch {
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [tab]);

  /* ---------------- FILTER ---------------- */
  const filteredData = useMemo(() => {
    const search = filters.search.toLowerCase();
    const hasSearch = search.length > 0;
    const hasUserId = filters.userId.length > 0;

    return data.filter((item) => {
      if (hasSearch) {
        let match = false;

        if (tab === 'users' && 'firstname' in item) {
          match =
            item.firstname.toLowerCase().includes(search) ||
            item.lastname.toLowerCase().includes(search) ||
            (item.email?.toLowerCase().includes(search) ?? false) ||
            (item.login?.username.toLowerCase().includes(search) ?? false);
        } else if ('title' in item) {
          match = item.title.toLowerCase().includes(search);
        } else if ('comment' in item) {
          match = item.comment.toLowerCase().includes(search);
        } else if ('content' in item && typeof item.content === 'string') {
          match = item.content.toLowerCase().includes(search);
        } else if ('body' in item && typeof item.body === 'string') {
          match = item.body.toLowerCase().includes(search);
        }

        if (!match) return false;
      }

      if (hasUserId) {
        if ('userId' in item) {
          return String(item.userId) === filters.userId;
        }
        if (tab === 'users') {
          return String(item.id) === filters.userId;
        }
        return false;
      }

      return true;
    });
  }, [data, filters, tab]);

  /* ---------------- PAGINATION ---------------- */
  const totalPages = Math.max(1, Math.ceil(filteredData.length / PAGE_SIZE));
  const validPage = Math.min(Math.max(1, currentPage), totalPages);
  const start = (validPage - 1) * PAGE_SIZE;
  const paginatedData = filteredData.slice(start, start + PAGE_SIZE);

  useEffect(() => {
    if (currentPage !== validPage) {
      const params = new URLSearchParams(searchParams);
      validPage === 1
        ? params.delete('page')
        : params.set('page', String(validPage));
      setSearchParams(params, { replace: true });
    }
  }, [currentPage, validPage, searchParams, setSearchParams]);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    page === 1 ? params.delete('page') : params.set('page', String(page));
    setSearchParams(params, { replace: true });
  };

  const handleItemClick = (id: number) => {
    if (!tab) return;
    navigate(`/dashboard/${tab}/${id}`);
  };

  /* ---------------- RENDER ---------------- */
  return (
    <div className="dashboard-list">
      <SharedFilters />

      <div className="list-header">
        <h2>
          {tab ? tab.charAt(0).toUpperCase() + tab.slice(1) : 'Dashboard'} (
          {loading ? '...' : filteredData.length})
        </h2>
      </div>

      {loading ? (
        <SkeletonLoader />
      ) : (
        <div className="list-container">
          {paginatedData.length === 0 ? (
            <div className="empty-state">No items found</div>
          ) : (
            paginatedData.map((item) => (
              <div
                key={item.id}
                className={`list-item ${tab === 'posts' ? 'post-item' : ''}`}
                onClick={() => handleItemClick(item.id)}
              >
                {tab !== 'posts' && (
                  <div className="item-id">#{item.id}</div>
                )}

                {tab === 'posts' && 'thumbnail' in item && (
                  <div className="post-thumbnail-wrapper">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="post-thumbnail"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const wrapper = target.parentElement;
                        if (wrapper) {
                          wrapper.classList.add('no-image');
                        }
                      }}
                    />
                  </div>
                )}

                <div
                  className={
                    tab === 'posts'
                      ? 'post-content-wrapper'
                      : 'item-content'
                  }
                >
                  {tab === 'users' && 'firstname' in item && (
                    <>
                      <div className="item-title">
                        {item.firstname} {item.lastname}
                      </div>
                      <div className="item-meta">
                        <span className="meta-item">
                          <strong>Email:</strong> {item.email}
                        </span>
                        {item.phone && (
                          <span className="meta-item">
                            <strong>Phone:</strong> {item.phone}
                          </span>
                        )}
                        {item.company && (
                          <span className="meta-item">
                            <strong>Company:</strong> {item.company.name}
                          </span>
                        )}
                        {item.address && (
                          <span className="meta-item">
                            <strong>City:</strong> {item.address.city}
                          </span>
                        )}
                      </div>
                    </>
                  )}

                  {tab === 'posts' && 'title' in item && 'category' in item && (
                    <>
                      <div className="item-title">{(item as Post).title}</div>
                      {'content' in item &&
                        typeof item.content === 'string' && (
                          <div className="item-body">
                            {item.content.length > 200
                              ? `${item.content.substring(0, 200)}...`
                              : item.content}
                          </div>
                        )}
                      <div className="item-meta">
                        <span className="meta-item">
                          <strong>Category:</strong>{' '}
                          <span className="post-category-badge-small">
                            {(item as Post).category}
                          </span>
                        </span>
                        <span className="meta-item">
                          <strong>Status:</strong>{' '}
                          <span
                            className={`post-status-small post-status-${(item as Post).status}`}
                          >
                            {(item as Post).status}
                          </span>
                        </span>
                        <span className="meta-item">
                          <strong>Published:</strong> {(item as Post).publishedAt}
                        </span>
                        {'userId' in item && (
                          <span className="meta-item">
                            <strong>User ID:</strong> {item.userId}
                          </span>
                        )}
                      </div>
                    </>
                  )}

                  {tab !== 'users' && tab !== 'posts' && (
                    <>
                      {'title' in item && (
                        <div className="item-title">{item.title}</div>
                      )}

                      {'content' in item &&
                        typeof item.content === 'string' && (
                          <div className="item-body">
                            {item.content.length > 200
                              ? `${item.content.substring(0, 200)}...`
                              : item.content}
                          </div>
                        )}

                      {'body' in item &&
                        typeof item.body === 'string' && (
                          <div className="item-body">
                            {item.body.length > 200
                              ? `${item.body.substring(0, 200)}...`
                              : item.body}
                          </div>
                        )}

                      {'comment' in item && (
                        <div className="item-body">
                          {item.comment.length > 200
                            ? `${item.comment.substring(0, 200)}...`
                            : item.comment}
                        </div>
                      )}

                      {'userId' in item && (
                        <div className="item-meta">
                          <span className="meta-item">
                            <strong>User ID:</strong> {item.userId}
                          </span>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {!loading && totalPages > 1 && (
        <Pagination
          currentPage={validPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}

export default DashboardList;
