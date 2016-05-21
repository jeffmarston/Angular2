import { Component } from 'angular2/core';
import { Manifest, ModuleMetadata } from "./manifest";
import { ModuleInfoService } from "./moduleInfo.service"
import { HTTP_PROVIDERS, Http } from 'angular2/http';
import { Observable }  from 'rxjs/Rx';

@Component({
    selector: 'module-info',
    templateUrl: './app/moduleInfo.template.html',
    styleUrls: ['app/moduleInfo.style.css'],
    providers: [HTTP_PROVIDERS, ModuleInfoService]
})

export class AppComponent {
    private title = 'Module Configuration';
    private modules: ModuleMetadata[];

    constructor(private modService: ModuleInfoService) {
        this.loadSavedManifest();
    }

    public addModule(control) {
        if (control.value === "") return;
        var newItem = {
            location: control.value
        };
        this.updateModuleInfo(newItem);
        this.modules.push(newItem);
        control.value = "";
        control.focus();
    }

    public updateModuleInfo(mod: ModuleMetadata) {
        //trim trailing slashes and spaces
        mod.location = mod.location.replace(/[ \t\r]+/g,"");
        mod.location = mod.location.replace(/[\/]+$/, "");

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
        var saveModules = [];
        this.modules.forEach(mod => {
            saveModules.push({ 
                location: mod.location,
                isBeta: mod.isBeta});
        })
        localStorage.setItem('manifest', JSON.stringify(saveModules));
    }

    public deleteModule(mod) {
        var idx = this.modules.indexOf(mod);
        this.modules.splice(idx, 1);
    }

    public loadDefaults() {
        this.modules =  (new Manifest()).internalModules;
        this.modules.forEach(mod => {
            this.updateModuleInfo(mod);
        });
        this.insertFramework();
    }
    
    private loadSavedManifest() {
        var loadedJson = localStorage.getItem('manifest');
        this.modules = JSON.parse(loadedJson);        
        this.modules.forEach(mod => {
            this.updateModuleInfo(mod);
        });
        this.insertFramework();
    }
    
    private insertFramework() {
        if (this.modules[0].location !== "/ims") {
            this.modules.splice(0, 0, { location: "/ims"});
        }
        if (this.modules[1].location !== "/ux") {
            this.modules.splice(1, 0, { location: "/ux"});
        }
       this.modules[0].isRequired = true;
       this.modules[1].isRequired = true;
        
    }
}