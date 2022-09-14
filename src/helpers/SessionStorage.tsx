export const getItem = (key: string) => {
  if (sessionStorage.getItem(key)) {
    return JSON.parse(sessionStorage.getItem(key) || '');
  }

  return undefined;
};

export const setItem = (key: string, data: Record<string, unknown>) => {
  return sessionStorage.setItem(key, JSON.stringify(data));
};
