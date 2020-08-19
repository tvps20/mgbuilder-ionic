import { Observable } from 'rxjs';

export abstract class ApiBaseCrudService<T> {

    public abstract findAll(): Observable<T[]>;

    public abstract findById(id: string): Observable<T>;
}