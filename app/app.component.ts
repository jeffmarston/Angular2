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
    private modules: ModuleMetadata[];

    constructor(private modService: ModuleInfoService) {
        this.modules = (new Manifest()).internalModules;   
        this.loadDefaults();
    }

    public addModule(location) {
        if (location.value.trim() === "") return;
        var newItem = {
            location: location.value
        };
        this.updateModuleInfo(newItem);
        this.modules.push(newItem);
        location.value = "";
    }

    public updateModuleInfo(mod: ModuleMetadata) {
        //trim trailing slashes
        mod.location = mod.location.replace(/\/+$/, "");
        
        //if the user clears the location, delete the item
        if (mod.location.trim() === "") {
            this.deleteModule(mod);
            return; 
        }
        
        // load the product.json
        var src = this.modService.loadDetails(mod.location);
        
        //clear mod
        mod.warnings = null;
        mod.errors = null;
        mod.name = null;
        mod.version = null;
        
        src.subscribe(o => {            
            mod.version = o.version;
            mod.name = o.name;
            mod.warnings = this.compileWarnings(o);
        }, error => {
            mod.errors = error;
        });
    }

    private compileWarnings(mod: ModuleMetadata) {
        var allWarnings = [];
        if (!mod.version) {
            allWarnings.push("Missing version - This could cause unexpected caching behavior on the client.");
        }
        if (!mod.name) {
            allWarnings.push("Missing name - This will limit your ability to use framework features like Beta toggles.");
        }
        if (!mod.prefix) {
            allWarnings.push("Missing prefix - We need this to validate the module's components.");
        }
        return allWarnings ? allWarnings.join("\n") : null;
    }

    public save(ev) {
        alert(ev);
        localStorage.setItem('manifest', JSON.stringify(this.modules));
    }

    public deleteModule(mod) {
        var idx = this.modules.indexOf(mod);
        this.modules.splice(idx, 1);
    }
    
    public loadDefaults() {     
        this.modules.forEach(mod => {
            this.updateModuleInfo(mod);
        });
    }
}