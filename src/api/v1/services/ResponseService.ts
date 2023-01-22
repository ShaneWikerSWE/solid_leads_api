import { Response } from 'express';

export default class ResponseService {
  /**
   * Not Found Response
   *
   * @param {*} res
   * @returns
   */
  static notFound(res: Response) {
    return res.status(404).json({
      msg: 'Not found',
    });
  }

  /**
   * Bad Request Response
   *
   * @param {*} res
   * @param {*} err
   * @returns
   */
  static badRequest(res: Response) {
    return res.status(400).json({
      msg: 'Bad request',
    });
  }

  /**
   * Unauthenticated Response
   *
   * @param {*} res
   * @returns
   */
  static unauthenticated(res: Response) {
    return res.status(401).json({
      msg: 'Unauthenticated',
    });
  }

  /**
   * Unauthorized Response
   *
   * @param {*} res
   * @returns
   */
  static unauthorized(res: Response) {
    return res.status(401).json({
      msg: 'Unauthorized',
    });
  }

  /**
   * Validation Failed Response
   *
   * @param {*} res
   * @param {*} err
   * @returns
   */
  static validationFailed(res: Response, err: object[]) {
    return res.status(422).json({
      msg: 'Validation failed',
      payload: err,
    });
  }

  /**
   * Server Error Response
   *
   * @param {*} res
   * @returns
   */
  static serverError(res: Response) {
    return res.status(500).json({
      msg: 'Server error',
    });
  }
}
