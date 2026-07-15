import { NextFunction, Request, Response } from 'express';

type AsyncRouteHandler<P = Record<string, string>> = (
  req: Request<P>,
  res: Response,
  next: NextFunction
) => Promise<unknown>;

export function asyncHandler<P = Record<string, string>>(handler: AsyncRouteHandler<P>) {
  return (req: Request<P>, res: Response, next: NextFunction) => {
    handler(req, res, next).catch(next);
  };
}
