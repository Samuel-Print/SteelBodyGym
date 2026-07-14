import { useEffect, useState } from 'react';
import classService from '../api/classes.service';

export default function useClasses() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    limit: 10,
  });

  const loadClasses = async (
    page = 1,
    limit = pagination.limit
  ) => {
    setLoading(true);

    try {
      const response = await classService.getAll({ page, limit });

      const withHorarios = await Promise.all(
        response.items.map(async (clase) => {
          try {
            const horarios = await classService.getHorarios(clase.id_clase);
            return { ...clase, horarios };
          } catch (err) {
            console.error(`Error al cargar horarios de la clase ${clase.id_clase}:`, err);
            return { ...clase, horarios: [] };
          }
        })
      );

      setClasses(withHorarios);

      setPagination({
        currentPage: response.currentPage,
        totalPages: response.totalPages,
        totalItems: response.totalItems,
        limit,
      });

    } catch (error) {
      console.error(error);
      setClasses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadClasses();
  }, []);

  return {
    classes,
    loading,
    pagination,
    loadClasses,
  };
}