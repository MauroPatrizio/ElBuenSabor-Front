export abstract class AbstractBackendClient<T> {
    protected baseUrl: string;
    constructor(baseUrl: string) {
      this.baseUrl = baseUrl;
    }
  
    abstract getAll(): Promise<T[]>;
  
    abstract getById(id: string): Promise<T | null>;
  
    abstract post(data: T): Promise<T>;
    abstract put(id: number, data: T): Promise<T>;
  
    // Método abstracto para eliminar un elemento por su ID
    abstract delete(id: number): Promise<void>;
  }