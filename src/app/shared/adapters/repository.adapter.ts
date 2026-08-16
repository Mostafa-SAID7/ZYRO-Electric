// Liskov Substitution: Create adapters for existing services to comply with repository interfaces

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IReadRepository, IWriteRepository } from '../interfaces/repositories';

/**
 * Generic Repository Adapter
 * Adapts any service to implement IReadRepository or IWriteRepository
 * Ensures Liskov substitution for repository operations
 */
@Injectable({ providedIn: 'root' })
export class RepositoryAdapter<T> implements IReadRepository<T> {
  constructor(
    private getAll: () => Observable<T[]>,
    private getById: (id: string) => Observable<T | undefined>,
    private search: (query: string) => Observable<T[]>
  ) {}

  getAllItems(): Observable<T[]> {
    return this.getAll();
  }

  getItem(id: string): Observable<T | undefined> {
    return this.getById(id);
  }

  searchItems(query: string): Observable<T[]> {
    return this.search(query);
  }

  // Implement IReadRepository interface methods
  getAll_(): Observable<T[]> {
    return this.getAll();
  }

  getById_(id: string): Observable<T | undefined> {
    return this.getById(id);
  }

  search_(query: string): Observable<T[]> {
    return this.search(query);
  }
}

/**
 * Generic Write Repository Adapter
 * Ensures write operations comply with repository contracts
 */
@Injectable({ providedIn: 'root' })
export class WriteRepositoryAdapter<T> implements IWriteRepository<T> {
  constructor(
    private save: (item: T) => Observable<T>,
    private update: (id: string, item: Partial<T>) => Observable<T>,
    private delete: (id: string) => Observable<void>
  ) {}

  save_(item: T): Observable<T> {
    return this.save(item);
  }

  update_(id: string, item: Partial<T>): Observable<T> {
    return this.update(id, item);
  }

  delete_(id: string): Observable<void> {
    return this.delete(id);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  deleteItem(id: string): Observable<void> {
    return this.delete(id);
  }
}
