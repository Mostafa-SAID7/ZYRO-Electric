// Liskov Substitution: Create adapters for existing services to comply with repository interfaces

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IReadRepository, IWriteRepository } from '../interfaces/repositories';

/**
 * Generic Repository Adapter
 * Adapts any service to implement IReadRepository
 * Ensures Liskov substitution for repository operations
 */
@Injectable({ providedIn: 'root' })
export class RepositoryAdapter<T> implements IReadRepository<T> {
  constructor(private service: any) {}

  getAll(): Observable<T[]> {
    return this.service.getAll?.() || new Observable(obs => obs.complete());
  }

  getById(id: string): Observable<T | undefined> {
    return this.service.getById?.(id) || new Observable(obs => obs.complete());
  }

  search(query: string): Observable<T[]> {
    return this.service.search?.(query) || new Observable(obs => obs.complete());
  }
}

/**
 * Generic Write Repository Adapter
 * Ensures write operations comply with repository contracts
 */
@Injectable({ providedIn: 'root' })
export class WriteRepositoryAdapter<T> implements IWriteRepository<T> {
  constructor(private service: any) {}

  save(item: T): Observable<T> {
    return this.service.save?.(item) || new Observable(obs => obs.complete());
  }

  update(id: string, item: Partial<T>): Observable<T> {
    return this.service.update?.(id, item) || new Observable(obs => obs.complete());
  }

  delete(id: string): Observable<void> {
    return this.service.delete?.(id) || new Observable(obs => obs.complete());
  }
}
