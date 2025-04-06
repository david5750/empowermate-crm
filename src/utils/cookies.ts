
// Cookie utility functions
export const setCookie = (name: string, value: string, days = 7): void => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/;SameSite=Strict`;
};

export const getCookie = (name: string): string | null => {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(';');
  
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(nameEQ) === 0) {
      return c.substring(nameEQ.length, c.length);
    }
  }
  
  return null;
};

export const removeCookie = (name: string): void => {
  setCookie(name, '', -1);
};

// Token-specific utility functions
export const setTokens = (accessToken: string, refreshToken?: string): void => {
  setCookie('access_token', accessToken);
  if (refreshToken) {
    setCookie('refresh_token', refreshToken);
  }
};

export const getAccessToken = (): string | null => {
  return getCookie('access_token');
};

export const getRefreshToken = (): string | null => {
  return getCookie('refresh_token');
};

export const clearTokens = (): void => {
  removeCookie('access_token');
  removeCookie('refresh_token');
};
