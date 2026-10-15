export const getRoutePath = () => window.location.hash.slice(1) || "/";

export const getCleanPath = (path) => path.split("?")[0];

export const navigate = (to) => {
  window.location.hash = to;
};
