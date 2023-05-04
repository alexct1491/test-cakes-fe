const useLocalStorage = () => {
    
  const setLocalStorage = (key: string, value: any) =>
    localStorage.setItem(key, JSON.stringify(value));

  const getFromLocalStorage = (key: string) => {
    try {
      return JSON.parse(localStorage.getItem(key) as string);
    } catch (error) {
      return null;
    }
  };

  const deleteFromLocalStorage = (key: string) => localStorage.removeItem(key);

  return {
    setLocalStorage,
    getFromLocalStorage,
    deleteFromLocalStorage,
  };
};

export default useLocalStorage;
