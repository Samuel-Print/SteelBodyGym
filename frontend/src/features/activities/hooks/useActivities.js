import { useEffect, useState } from 'react';
import activityService from '../api/activities.service';

export default function useActivities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    limit: 10,
  });

  const loadActivities = async (
    page = 1,
    limit = pagination.limit,
    search = ''
  ) => {
    setLoading(true);

    try {
      const response = await activityService.getAll({
        page,
        limit,
        search: search || undefined,
      });

      setActivities(response.items);

      setPagination({
        currentPage: response.currentPage,
        totalPages: response.totalPages,
        totalItems: response.totalItems,
        limit,
      });
    } catch (error) {
      console.error('Error al cargar actividades:', error);
      setActivities([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadActivities();
  }, []);

  return {
    activities,
    loading,
    pagination,
    loadActivities,
  };
}