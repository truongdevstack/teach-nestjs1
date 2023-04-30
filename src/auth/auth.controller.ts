import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDTO } from "./dto";

@Controller({
    path: 'auth'
})
export class AuthController {
    constructor(private authService: AuthService) {
    }
    @Get('user')
    async getUser() {
        return await this.authService.getUser();
    }
    @Post('register')
    async register(@Body() data: AuthDTO) {
        console.log('data: ', data);
        return await this.authService.registerUser(data);
    }
    @Post('login')
    async login(@Body() data: AuthDTO) {
        console.log('data: ', data);
        return await this.authService.login(data);
    }
}