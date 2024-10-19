import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  private readonly logger = new Logger(ResponseInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      map((res) => {
        this.logSuccess(context, res);
        return this.responseHandler(res, context);
      }),
      catchError((err) => {
        if (!(err instanceof HttpException)) {
          err = new HttpException(
            'Internal Server Error',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
        this.logError(context, err);
        return throwError(() => this.errorHandler(err, context));
      }),
    );
  }

  private logSuccess(context: ExecutionContext, res: any) {
    const request = context.switchToHttp().getRequest();
    this.logger.log(
      `Success: ${request.method} ${request.url} - Response: ${JSON.stringify(res)}`,
    );
  }

  private logError(context: ExecutionContext, exception: HttpException) {
    const request = context.switchToHttp().getRequest();
    const status = exception.getStatus();
    const message = exception.message;
    this.logger.error(
      `Error: ${request.method} ${request.url} - Status: ${status} - Message: ${message}`,
    );
  }

  private errorHandler(exception: HttpException, context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status = exception.getStatus();
    const errorMessage = exception.getResponse();

    response.status(status).json({
      success: false,
      statusCode: status,
      path: request.url,
      timestamp: new Date().toISOString(),
      message: this.getErrorMessage(errorMessage),
    });
  }

  private responseHandler(res: any, context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();

    const message = res?.message || 'Request was successful';

    return {
      success: true,
      statusCode: ctx.getResponse().statusCode,
      path: request.url,
      timestamp: new Date().toISOString(),
      message: message,
      result: res?.data || res,
    };
  }

  private getErrorMessage(errorResponse: any) {
    if (typeof errorResponse === 'string') {
      return errorResponse;
    } else if (typeof errorResponse === 'object' && errorResponse.message) {
      return errorResponse.message;
    } else {
      return 'An unexpected error occurred';
    }
  }
}
