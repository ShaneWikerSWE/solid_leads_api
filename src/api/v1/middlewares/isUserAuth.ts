import { Request, Response, NextFunction } from 'express';
import { JwtService, ResponseService } from '../services';

export default (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.get('Authorization');

    if (!authHeader) throw new Error();

    const authToken = authHeader.split(' ')[1];

    let decodedToken: any = JwtService.verifyToken(authToken);

    if (!decodedToken || decodedToken.type !== 'login') throw new Error();

    req.user = decodedToken;

    next();
  } catch (err) {
    ResponseService.unauthenticated(res);
    return;
  }
};
