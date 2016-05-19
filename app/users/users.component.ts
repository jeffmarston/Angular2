import { Component } from 'angular2/core';
import { HTTP_PROVIDERS, Http } from 'angular2/http';
import 'rxjs/Rx';

@Component({
    selector: 'user-browser',
    templateUrl: './app/users/users.template.html',
    styleUrls: ['app/users/users.style.css'],
    providers: [HTTP_PROVIDERS]
})

export class UserBrowserComponent {
    private title = 'User Management';
    private users: any[];

    constructor() {
        this.loadUsers();
    }
    
    private loadUsers() {
       this.users = [
           { email: 'grant@ezesoft.com', first: 'grant', last: 'marston' },
           { email: 'troy@ezesoft.com', first: 'troy', last: 'marston' },
           { email: 'arlene@ezesoft.com', first: 'arlene', last: 'marston' }
       ]
    }

    // public addModule(location) {
    //     if (location.value.trim() === "") return;
    //     var newItem = {
    //         location: location.value
    //     };
    //     this.updateModuleInfo(newItem);
    //     this.modules.push(newItem);
    //     location.value = "";
    // }

    // public updateModuleInfo(mod: ModuleMetadata) {
    //     //trim trailing slashes
    //     mod.location = mod.location.replace(/\/+$/, "");

    //     //if the user clears the location, delete the item
    //     if (mod.location.trim() === "") {
    //         this.deleteModule(mod);
    //         return;
    //     }

    //     // load the product.json
    //     var src = this.modService.loadDetails(mod.location);

    //     //clear mod
    //     mod.warnings = null;
    //     mod.errors = null;
    //     mod.name = null;
    //     mod.version = null;

    //     src.subscribe(o => {
    //         mod.version = o.version;
    //         mod.name = o.name;
    //         mod.warnings = this.compileWarnings(o);
    //     }, error => {
    //         mod.errors = error;
    //     });
    // }

    // private compileWarnings(mod: ModuleMetadata) {
    //     var allWarnings = [];
    //     if (!mod.version) {
    //         allWarnings.push("Missing version - This could cause unexpected caching behavior on the client.");
    //     }
    //     if (!mod.name) {
    //         allWarnings.push("Missing name - This will limit your ability to use framework features like Beta toggles.");
    //     }
    //     if (!mod.prefix) {
    //         allWarnings.push("Missing prefix - We need this to validate the module's components.");
    //     }
    //     return allWarnings ? allWarnings.join("\n") : null;
    // }

    // public save(ev) {
    //     localStorage.setItem('manifest', JSON.stringify(this.modules));
    // }

    // public deleteModule(mod) {
    //     var idx = this.modules.indexOf(mod);
    //     this.modules.splice(idx, 1);
    // }

    // public loadDefaults() {
    //     this.modules = this.modules = (new Manifest()).internalModules;
    //     this.modules.forEach(mod => {
    //         this.updateModuleInfo(mod);
    //     });
    // }
}