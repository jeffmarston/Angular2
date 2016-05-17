import { Injectable } from 'angular2/core';
import { Http, Response } from 'angular2/http';
//import { Observable } from 'rxjs/Observable';
import { Manifest, ModuleMetadata } from "./manifest";
import { Observable }  from 'rxjs/Rx';

@Injectable()
export class ModuleInfoService {
    constructor(private http: Http) {

    }

    private handleError(error: any) {
        
        return Observable.throw('error');
    }

    public loadDetails(module: ModuleMetadata): Observable<ModuleMetadata> {
        var url = module.location + "/product.json";
        return this.http.get(url)
            .map(response => response.json())
            .catch(this.handleError);
    }

    public parseVersionFromString(source: string): string {
        var matches = source.match(/[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+/);
        if (matches && matches.length > 0) {
            return matches[0];
        }
        return null;
    }
}