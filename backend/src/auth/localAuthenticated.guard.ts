import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Check if authentication is valid (parent method)
    const result = (await super.canActivate(context)) as boolean;
    console.log('result ', result)
    const request = context.switchToHttp().getRequest();
    console.log('request ', request.user)

    // Complete the login process if authentication was successful
    await new Promise<void>((resolve, reject) => {
      if (result) {
        request.login(request.user, (err: any) => {
          if (err) reject(err);
          resolve();
        });
      }
    });

    return result;
  }
}