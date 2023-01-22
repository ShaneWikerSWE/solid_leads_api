import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export default class JwtService {
  /**
   * Generate token
   *
   * @param {*} payload
   * @param {*} expiresIn
   * @returns Token
   */
  static generateToken(payload: object, expiresIn: string, tokenKey?: string) {
    return jwt.sign(
      payload,
      `${process.env.TOKEN_SECRET}${tokenKey ? tokenKey : ''}`,
      {
        expiresIn,
      }
    );
  }

  /**
   * Verify token
   *
   * @param {*} token
   * @returns decodedToken
   */
  static verifyToken(token: string, tokenKey?: string) {
    return jwt.verify(
      token,
      `${process.env.TOKEN_SECRET}${tokenKey ? tokenKey : ''}`
    );
  }
}
