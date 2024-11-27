import Cookies from 'js-cookie';

export const storeCookies = (key: string, value: string): void => {
  Cookies.set(key, value, {
    expires: 1, // Token expires in 1 day
    // secure: true, // Ensures the cookie is sent only over HTTPS
    // sameSite: 'strict', // Helps prevent CSRF attacks
  });
};

// Function to retrieve access token
export const getCookies = (key: string): string | undefined => {
  return Cookies.get(key);
};

// Function to remove access token
export const removeCookies = (key: string): void => {
  Cookies.remove(key);
};


