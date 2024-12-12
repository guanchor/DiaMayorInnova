const formatDateForInput = (date) => {
  const dateObj = new Date(date);
  return dateObj.toISOString().slice(0, 16); // Devuelve el formato "yyyy-MM-ddThh:mm"
};

export default formatDateForInput;