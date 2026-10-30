import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module.js';
import { SessionAuth } from './session-auth.provider.js';
import { CredentialsService } from './credentials.service.js';
import { AuthController } from './auth.controller.js';
import { EmailVerificationMailer } from './email-verification.mailer.js';
import { EmailVerificationController } from './email-verification.controller.js';

@Module({
  imports: [UsersModule],
  controllers: [AuthController, EmailVerificationController],
  providers: [
    SessionAuth,
    CredentialsService,
    EmailVerificationMailer, // the email verification handler
  ],
})
export class AuthModule { }
