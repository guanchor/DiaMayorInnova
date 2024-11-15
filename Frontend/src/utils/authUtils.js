const encodeCredentials = (email, password) => {
  return btoa(`${email}:${password}`);
};

export default encodeCredentials;