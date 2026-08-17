 function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }


import { Observable } from 'rxjs';


/**
 * Generic Repository Adapter
 * Adapts any service to implement IReadRepository
 * Ensures Liskov substitution for repository operations
 * DIP: Properly typed to enforce IReadRepository<T> contract
 */
@Injectable({ providedIn: 'root' })
export class RepositoryAdapter {constructor() { RepositoryAdapter.prototype.__init.call(this); }
   __init() {this._service = null}

  set service(value) {
    this._service = value;
  }

  getAll() {
    return _optionalChain([this, 'access', _ => _._service, 'optionalAccess', _2 => _2.getAll, 'call', _3 => _3()]) || new Observable(obs => obs.complete());
  }

  getById(id) {
    return _optionalChain([this, 'access', _4 => _4._service, 'optionalAccess', _5 => _5.getById, 'call', _6 => _6(id)]) || new Observable(obs => obs.complete());
  }

  search(query) {
    return _optionalChain([this, 'access', _7 => _7._service, 'optionalAccess', _8 => _8.search, 'call', _9 => _9(query)]) || new Observable(obs => obs.complete());
  }
}

/**
 * Generic Write Repository Adapter
 * Ensures write operations comply with repository contracts
 * DIP: Properly typed to enforce IWriteRepository<T> contract
 */
@Injectable({ providedIn: 'root' })
export class WriteRepositoryAdapter {constructor() { WriteRepositoryAdapter.prototype.__init2.call(this); }
   __init2() {this._service = null}

  set service(value) {
    this._service = value;
  }

  save(item) {
    return _optionalChain([this, 'access', _10 => _10._service, 'optionalAccess', _11 => _11.save, 'call', _12 => _12(item)]) || new Observable(obs => obs.complete());
  }

  update(id, item) {
    return _optionalChain([this, 'access', _13 => _13._service, 'optionalAccess', _14 => _14.update, 'call', _15 => _15(id, item)]) || new Observable(obs => obs.complete());
  }

  delete(id) {
    return _optionalChain([this, 'access', _16 => _16._service, 'optionalAccess', _17 => _17.delete, 'call', _18 => _18(id)]) || new Observable(obs => obs.complete());
  }
}
