import { useEffect, useState } from 'react';
import userService from '../api/user.service';

export default function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    limit: 10,
  });

  const loadUsers = async (page = 1, limit = pagination.limit) => {
    setLoading(true);

    try {
      const response = await userService.getAll({
        page,
        limit,
      });

      setUsers(response.items);

      setPagination({
        currentPage: response.currentPage,
        totalPages: response.totalPages,
        totalItems: response.totalItems,
        limit,
      });

    } catch (error) {
      console.error(error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return {
    users,
    loading,
    pagination,
    loadUsers,
  };
}