import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import * as jwt from 'jsonwebtoken';
import { JWT_KEY } from "src/Utils/Contants";
import { MysqlPoolService } from "src/Utils/mysq.service";

@Injectable()
export class AuthGuard implements CanActivate {

    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {

        const request = context.switchToHttp().getRequest();
        const headers = request.headers;
        const token = headers?.authorization?.split(' ')[1];
        if (!token) return false
        try {
            let isVerified = jwt.verify(token, JWT_KEY)
            request.id = isVerified['id']
            request.userName = isVerified['userName']
            request.role = isVerified['role']

            if (isVerified) return true
        } catch (error) {
            return false
        }

    }
}


@Injectable()
export class AdminGaurd implements CanActivate {
    constructor(
        private readonly mysqlService: MysqlPoolService
    ) { }
    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {

        const request = context.switchToHttp().getRequest();
        const headers = request.headers;
        const token = headers?.authorization?.split(' ')[1];
        if (!token) return false
        try {
            let isVerified = jwt.verify(token, JWT_KEY)
            request.id = isVerified['id']
            request.userName = isVerified['userName']
            request.role = isVerified['role']
            let user = await this.mysqlService.execute(`
            SELECT * FROM users WHERE userID = ? AND role = ?
            `, [isVerified['id'], 'admin'])
            if (user.length === 0) return false
            if (isVerified) return true
        } catch (error) {
            return false
        }

    }
}



