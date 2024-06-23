import axios from 'axios';

const API_KEY = 'AIzaSyCuGED8ue3yqxHRKGPhyVTNl8oftMIYDgE';

export const authenticate = async (mode, email, password) => {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
  const response = await axios.post(url, {
    email,
    password,
    returnSecureToken: true,
  });
  const useremail = response.data.email;
  const token = response.data.idToken;
  return {
    useremail: useremail,
    token: token,
  };
};

export const createUser = (email, password) => {
  return authenticate('signUp', email, password);
};
export const login = (email, password) => {
  return authenticate('signInWithPassword', email, password);
};
