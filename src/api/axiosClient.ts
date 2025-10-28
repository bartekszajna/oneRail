import { getAccessToken } from '@/shared/utils/authStorage';
import { API_BASE_URL } from '@/shared/utils/env';
import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';

export const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// interface Entity {
//   id: string;
//   title: string;
// }

// function mapEntitiesToMap(
//   entities: Entity[]
// ): Map<Entity['id'], { relative: number; absolute: string }> {
//   const m = new Map();

//   for (const entity of entities) {
//     m.set(entity.id, { relative: 1, absolute: '1' });
//   }
//   return m;
// }

// type FunctionType = typeof mapEntitiesToMap;

// console.log(mapEntitiesToMap([{ id: 'dfdsf', title: 'fsdfsgs' }]));

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const access = getAccessToken();
  if (access) {
    config.headers.Authorization = `Bearer ${access}`;
  }
  return config;
});
