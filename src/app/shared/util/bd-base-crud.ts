import { switchMap, mapTo } from 'rxjs/operators';
import { Observable, of, from } from 'rxjs';
import { Storage } from '@ionic/storage';

export abstract class BdBaseCrudService<T> {

    // TODO: Verificar o construtor ao implementar
    constructor(protected storage: Storage,
        protected storageKey: string) {
        this.storageKey = storageKey;
    }

    protected getStorage() {
        const newKey = ((dados: T[]) => from(this.storage.set(this.storageKey, dados)).pipe(
            mapTo(dados)
        ));

        return from(this.storage.get(this.storageKey)).pipe(
            switchMap((dadosStorage: T[]) => {
                let newDados: T[] = [];
                return dadosStorage ? of(dadosStorage) : newKey(newDados);
            })
        );
    }

    public findAll(): Observable<T[]> {
        return this.getStorage();
    }

    public abstract saveOrRemove(obj: T, insert: boolean): Observable<any>;
}