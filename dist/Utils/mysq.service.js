"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MysqlPoolService = void 0;
const common_1 = require("@nestjs/common");
const mysql = require("mysql2/promise");
let MysqlPoolService = class MysqlPoolService {
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
    async execute(query, values) {
        const connection = await this.pool.getConnection();
        try {
            const [rows, fields] = await connection.execute(query, values);
            return rows;
        }
        catch (error) {
            throw error;
        }
        finally {
            connection.release();
        }
    }
    async query(query, params = []) {
        const connection = await this.pool.query();
        try {
            const [results] = await connection.query(query, params);
            return results;
        }
        finally {
            connection.release();
        }
    }
    async poolD() {
        return this.pool;
    }
};
exports.MysqlPoolService = MysqlPoolService;
exports.MysqlPoolService = MysqlPoolService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], MysqlPoolService);
//# sourceMappingURL=mysq.service.js.map