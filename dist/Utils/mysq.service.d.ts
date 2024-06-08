export declare class MysqlPoolService {
    private pool;
    constructor();
    createPool(): Promise<void>;
    execute(query: string, values?: any[]): Promise<any>;
    query(query: string, params?: any[]): Promise<any>;
    poolD(): Promise<any>;
}
