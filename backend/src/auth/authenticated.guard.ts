import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    console.log("request ", request.user);
    if (!request.isAuthenticated()) {
      throw new UnauthorizedException("Not logged in");
    }
    return request.isAuthenticated();
  }
}
