
export class Manifest {
    
    public prodModules = [
        { name: 'commissions', location: '/app/brokerreview/module' }
    ];
    internalModules: ModuleMetadata[]= this.prodModules.concat([
        { name: 'accounting', location: '/accounting' },
        { name: 'analytics', location: '/analytics' },
        { name: 'cloud', location: '/cloud' },
        { name: 'compliance', location: '/app/compliance/module' },
        { name: 'datamanagement', location: '/app/datamanagement/module' },
        { name: 'dataservices', location: '/app/dataservices/module' },
        { name: 'enhancedtrading', location: '/app/enhancedtrading/module' },
        { name: 'exhaust', location: '/app/exhaust/module' },
        // { name: 'help', location: '/app/help/module' },
        // { name: 'referencedata', location: '/app/referencedata/module' },
        // { name: 'reporting', location: '/app/reporting/module' },
        // { name: 'securitymaster', location: '/app/securitymaster/module' },
        // { name: 'streaming', location: '/app/streamapp' },
        // { name: 'trading', location: '/app/trading/module' },
        // { name: 'ux', location: '/ux' },
        // { name: 'valuation', location: '/app/valuation/module' }
    ]);
    
    public devModules = this.internalModules.concat([
        { name: 'sandbox', location: '/sandbox' },
        { name: 'streamingsandbox', location: '/streamingsandbox' }
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