'use strict';

/**
 * Helper para paginación y ordenamiento dinámico en Sequelize.
 */
const getPagination = (query) => {
  const page = parseInt(query.page, 10) > 0 ? parseInt(query.page, 10) : 1;
  const limit = parseInt(query.limit, 10) > 0 ? parseInt(query.limit, 10) : 10;
  const offset = (page - 1) * limit;

  // Formato sort: "campo:asc" o "campo:desc" o simplemente "campo"
  let order = []; // Orden por defecto provisional
  if (query.sort) {
    const parts = query.sort.split(':');
    const field = parts[0];
    const direction = parts[1] && parts[1].toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    order = [[field, direction]];
  }

  return { limit, offset, order, page };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: items } = data;
  const currentPage = page ? +page : 1;
  const totalPages = Math.ceil(totalItems / limit);

  return {
    totalItems,
    items,
    totalPages,
    currentPage,
  };
};

module.exports = {
  getPagination,
  getPagingData,
};
