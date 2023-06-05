import axios, { AxiosRequestConfig } from "axios";

export interface ApiResponse<T> {
  access_token: string;
  refreshToken: string;
  data?: T;
  error?: string;
}

export interface AuthResponse {
  access_token: string;
  refreshToken: string;
}

export const baseUrl = "https://127.0.0.1:4000/api/v1";

export class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = baseUrl;
  }

  private async request<T>(config: AxiosRequestConfig): Promise<T> {
    try {
      const headers = config.headers || {};

      const response = await axios.request<ApiResponse<T>>({
        ...config,
        headers,
        baseURL: this.baseUrl,
        withCredentials: true,
      });

      if (!response.data) {
        throw new Error("No data returned from server");
      }
      //@ts-ignore
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.status === 403) {
        throw error.response.data;
      }
      if (error.response && error.response.status === 401) {
        throw error.response.data;
      }

      return error;
    }
  }

  async get<T>(url: string, params?: any): Promise<T> {
    return this.request<T>({
      method: "get",
      url,
      params,
      baseURL: this.baseUrl,
    });
  }

  async post<T>(url: string, data?: any): Promise<T> {
    return this.request<T>({
      method: "post",
      url,
      data,
      baseURL: this.baseUrl,
    });
  }

  async patch<T>(url: string, data?: any): Promise<T> {
    return this.request<T>({
      method: "patch",
      url,
      data,
      baseURL: this.baseUrl,
    });
  }

  async delete<T>(url: string): Promise<T> {
    return this.request<T>({
      method: "delete",
      url,
      baseURL: this.baseUrl,
    });
  }

  async getCloudinarySignature(): Promise<{
    signature: string;
    timestamp: number;
  }> {
    return this.request<{ signature: string; timestamp: number }>({
      method: "get",
      url: "/cloudinary/signature",
    });
  }

  async postCloudinaryUpload(formData: FormData): Promise<any> {
    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        }/upload`,
        formData
      );

      return response.data;
    } catch (error: any) {
      console.log(error);
      if (
        error.response &&
        (error.response.status === 403 || error.response.status === 401)
      ) {
        throw new Error(error.response.data.message);
      }
      throw error;
    }
  }
}
