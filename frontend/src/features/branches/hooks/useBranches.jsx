import { useEffect, useState } from 'react';
import branchService from '../api/branches.service';

export default function useBranches() {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    limit: 10,
  });

  const loadBranches = async (
    page = 1,
    limit = pagination.limit,
    search = ''
  ) => {
    setLoading(true);

    try {
      const response = await branchService.getAll({
        page,
        limit,
        search: search || undefined,
      });

      setBranches(response.items);

      setPagination({
        currentPage: response.currentPage,
        totalPages: response.totalPages,
        totalItems: response.totalItems,
        limit,
      });

    } catch (error) {
      console.error(error);
      setBranches([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBranches();
  }, []);

  return {
    branches,
    loading,
    pagination,
    loadBranches,
  };
}