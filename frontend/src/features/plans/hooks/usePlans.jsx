import { useEffect, useState } from 'react';
import planService from '../api/plans.service';

export default function usePlans() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    limit: 10,
  });

  const loadPlans = async (
    page = 1,
    limit = pagination.limit,
    search = ''
  ) => {
    setLoading(true);

    try {
      const response = await planService.getAll({
        page,
        limit,
        search: search || undefined,
      });

      setPlans(response.items);

      setPagination({
        currentPage: response.currentPage,
        totalPages: response.totalPages,
        totalItems: response.totalItems,
        limit,
      });

    } catch (error) {
      console.error(error);
      setPlans([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPlans();
  }, []);

  return {
    plans,
    loading,
    pagination,
    loadPlans,
  };
}