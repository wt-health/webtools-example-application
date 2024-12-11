import axios, { AxiosInstance, AxiosResponse } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: '/api', // Proxy defined in Vite config
});

// Define Task interface
export interface Task {
  id: number;
  title: string;
  description?: string;
  status: 'pending' | 'completed';
  created_at: string;
  updated_at: string;
}

// API Methods
export const getTasks = async (): Promise<AxiosResponse<Task[]>> => {
  return api.get<Task[]>('/tasks');
};

export const createTask = async (task: Partial<Task>): Promise<AxiosResponse<Task>> => {
  return api.post<Task>('/tasks', task);
};

export const updateTask = async (id: number, task: Partial<Task>): Promise<AxiosResponse<Task>> => {
  return api.put<Task>(`/tasks/${id}`, task);
};

export const deleteTask = async (id: number): Promise<AxiosResponse<void>> => {
  return api.delete<void>(`/tasks/${id}`);
};

export default api;
