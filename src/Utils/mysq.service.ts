// mysql-pool.service.ts
import { Injectable } from '@nestjs/common';
import * as mysql from 'mysql2/promise';

@Injectable()
export class MysqlPoolService {
    private pool;

    constructor() {
        this.createPool();
    }

    async createPool() {
        this.pool = mysql.createPool({
            host: 'localhost',
            user: 'root',
            password: 'cat123',
            database: 'bloodify',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
        });
    }

    async execute(query: string, values?: any[]) {
        const connection = await this.pool.getConnection();
        try {
            const [rows, fields] = await connection.execute(query, values);
            return rows;
        } catch (error) {
            throw error;
        } finally {
            connection.release();
        }
    }

    async query(query: string, params: any[] = []): Promise<any> {
        const connection = await this.pool.query();
        try {
            const [results] = await connection.query(query, params);
            return results;
        } finally {
            connection.release();
        }
    }

    async poolD() {
        return this.pool;
    }
}