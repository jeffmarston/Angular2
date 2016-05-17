
export class Manifest {
    
    public prodModules = [
        { name: '', location: '/app/brokerreview/module' }
    ];
    internalModules: ModuleMetadata[]= this.prodModules.concat([
        { name: '', location: '/accounting' },
        { name: '', location: '/analytics' },
        { name: '', location: '/cloud' },
        { name: '', location: '/app/compliance/module' },
        { name: '', location: '/app/datamanagement/module' },
        { name: '', location: '/app/dataservices/module' },
        { name: '', location: '/app/enhancedtrading/module' },
        { name: '', location: '/app/exhaust/module' },
        // { name: '', location: '/app/help/module' },
        // { name: '', location: '/app/referencedata/module' },
        // { name: '', location: '/app/reporting/module' },
        // { name: '', location: '/app/securitymaster/module' },
        // { name: '', location: '/app/streamapp' },
        // { name: '', location: '/app/trading/module' },
        // { name: '', location: '/ux' },
        // { name: '', location: '/app/valuation/module' }
    ]);
    
    public devModules = this.internalModules.concat([
        { name: '', location: '/sandbox' },
        { name: '', location: '/streamingsandbox' }
    ]);

};

export interface ModuleMetadata {
    name: string;
    location: string;
    isBeta?: boolean;
    version?: string;
    prefix?: string;
    warnings?: string;
    errors?: string;
}