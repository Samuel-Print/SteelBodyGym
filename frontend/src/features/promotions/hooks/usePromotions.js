import { useEffect, useState } from 'react';
import promotionService from '../api/promotion.service';

export default function usePromotions() {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    limit: 10,
  });

  const loadPromotions = async (
    page = 1,
    limit = pagination.limit,
    search = ''
  ) => {
    setLoading(true);

    try {
      const response = await promotionService.getAll({
        page,
        limit,
        search: search || undefined,
      });

      setPromotions(response.items);

      setPagination({
        currentPage: response.currentPage,
        totalPages: response.totalPages,
        totalItems: response.totalItems,
        limit,
      });

    } catch (error) {
      console.error(error);
      setPromotions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPromotions();
  }, []);

  return {
    promotions,
    loading,
    pagination,
    loadPromotions,
  };
}