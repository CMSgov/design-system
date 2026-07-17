const markQuery = (body: string, query: string) => {
  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(escapedQuery, 'gi');
  return body.replace(re, '<mark>$&</mark>') + '...';
};

export default markQuery;
