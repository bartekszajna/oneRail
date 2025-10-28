export function getAccessToken() {
  return sessionStorage.getItem('access_token');
}

export function setAccessToken(access_token: string) {
  return sessionStorage.setItem('access_token', access_token);
}

export function getRefreshToken() {
  return sessionStorage.getItem('refresh_token');
}

export function setRefreshToken(refresh_token: string) {
  return sessionStorage.setItem('access_token', refresh_token);
}

export function deleteAccessToken() {
  return sessionStorage.removeItem('access_token');
}

export function deleteRefreshToken() {
  return sessionStorage.removeItem('refresh_token');
}
