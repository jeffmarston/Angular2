import { Component } from 'angular2/core';
import { Manifest, ModuleMetadata } from "./manifest";
import { ModuleInfoService } from "./moduleInfo.service"
import { HTTP_PROVIDERS, Http } from 'angular2/http';
import 'rxjs/Rx';

@Component({
    selector: 'my-app',
    templateUrl: './app/app.template.html',
    styleUrls: ['app/app.style.css'],
    providers: [HTTP_PROVIDERS, ModuleInfoService]
})

export class AppComponent {
    private title = 'Module Configuration';
    private modules: ModuleMetadata[] = (new Manifest()).internalModules;

    constructor(private modService: ModuleInfoService) {
        this.loadDefaults();
    }

    loadDefaults() {
        this.modules.forEach(element => {
            var src = this.modService.loadDetails(element);

            src.subscribe(o => {
                element.version = o.version;
                element.name = o.name;
                element.errors = o.errors;
                if (!element.version) {
                    element.warnings = "School bus";
                }
            })
            //.catch(this.handleError);
        });
    }

    save(ev) {
        alert(ev);
        localStorage.setItem('manifest', JSON.stringify(this.modules));
    }

    deleteModule(mod) {
        var idx = this.modules.indexOf(mod);
        this.modules.splice(idx, 1);
    }
}