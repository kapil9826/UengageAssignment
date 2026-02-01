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

  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  /* -------------------- FETCH DATA -------------------- */
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

        setData(Array.isArray(result) ? result : []);
      } catch (error) {
        console.error('Error fetching data:', error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [tab]);

  /* -------------------- FILTERING -------------------- */
  const filteredData = useMemo(() => {
    if (!data.length) return [];

    const searchLower = filters.search.toLowerCase();
    const hasSearch = searchLower.length > 0;
    const hasUserIdFilter = filters.userId.length > 0;

    return data.filter((item) => {
      /* ---- SEARCH FILTER ---- */
      if (hasSearch) {
        let matches = false;

        if (tab === 'users' && 'firstname' in item && 'lastname' in item) {
          matches =
            item.firstname.toLowerCase().includes(searchLower) ||
            item.lastname.toLowerCase().includes(searchLower) ||
            (item.email?.toLowerCase().includes(searchLower) ?? false) ||
            (item.login?.username.toLowerCase().includes(searchLower) ?? false);
        } else if ('title' in item) {
          matches = item.title.toLowerCase().includes(searchLower);
        } else if ('comment' in item) {
          matches = item.comment.toLowerCase().includes(searchLower);
        } else if ('content' in item && typeof item.content === 'string') {
          matches = item.content.toLowerCase().includes(searchLower);
        } else if ('body' in item && typeof item.body === 'string') {
          matches = item.body.toLowerCase().includes(searchLower);
        }

        if (!matches) return false;
      }

      /* ---- USER ID FILTER ---- */
      if (hasUserIdFilter) {
        if ('userId' in item) {
          if (String(item.userId) !== filters.userId) return false;
        } else if (tab === 'users' && 'id' in item) {
          if (String(item.id) !== filters.userId) return false;
        } else {
          return false;
        }
      }

      return true;
    });
  }, [data, filters, tab]);

  /* -------------------- PAGINATION -------------------- */
  const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);
  const validPage = Math.max(1, Math.min(currentPage, totalPages || 1));
  const startIndex = (validPage - 1) * PAGE_SIZE;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + PAGE_SIZE
  );

  useEffect(() => {
    if (currentPage !== validPage && totalPages > 0) {
      const params = new URLSearchParams(searchParams);
      validPage === 1
        ? params.delete('page')
        : params.set('page', String(validPage));
      setSearchParams(params, { replace: true });
    }
  }, [currentPage, validPage, totalPages, searchParams, setSearchParams]);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    page === 1 ? params.delete('page') : params.set('page', String(page));
    setSearchParams(params, { replace: true });
  };

  const handleItemClick = (id: number) => {
    navigate(`/dashboard/${tab}/${id}`);
  };

  /* -------------------- RENDER -------------------- */
  return (
    <div className="dashboard-list">
      <SharedFilters />

      <div className="list-header">
        <h2>
          {tab?.charAt(0).toUpperCase() + tab?.slice(1)} (
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
                  <img
                    src={item.thumbnail}
                    alt={'title' in item ? item.title : 'post'}
                    className="post-thumbnail"
                  />
                )}

                <div
                  className={
                    tab === 'posts'
                      ? 'post-content-wrapper'
                      : 'item-content'
                  }
                >
                  {tab === 'users' && 'firstname' in item && (
                    <div className="item-title">
                      {item.firstname} {item.lastname}
                    </div>
                  )}

                  {tab === 'posts' && 'title' in item && (
                    <>
                      <div className="item-title">{item.title}</div>

                      {'category' in item && (
                        <div className="post-category">
                          {item.category}
                        </div>
                      )}

                      {'content' in item &&
                        typeof item.content === 'string' && (
                          <div className="item-body">{item.content}</div>
                        )}

                      {'publishedAt' in item && (
                        <div className="item-meta">
                          Published: {item.publishedAt}
                          {'userId' in item &&
                            ` • User ID: ${item.userId}`}
                        </div>
                      )}
                    </>
                  )}

                  {tab === 'comments' && 'comment' in item && (
                    <div className="item-body">{item.comment}</div>
                  )}

                  {tab === 'albums' && 'title' in item && (
                    <div className="item-title">{item.title}</div>
                  )}

                  {'email' in item && (
                    <div className="item-subtitle">{item.email}</div>
                  )}

                  {tab === 'users' && 'login' in item && item.login && (
                    <div className="item-subtitle">
                      @{item.login.username}
                    </div>
                  )}

                  {'body' in item &&
                    tab !== 'posts' &&
                    tab !== 'comments' &&
                    typeof item.body === 'string' && (
                      <div className="item-body">{item.body}</div>
                    )}

                  {'userId' in item && tab !== 'posts' && (
                    <div className="item-meta">
                      User ID: {item.userId}
                      {'postId' in item &&
                        ` • Post ID: ${item.postId}`}
                    </div>
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
