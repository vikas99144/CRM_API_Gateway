'use strict';


const baseResponse = (res, statusCode, success, message, data = null, error = null) => {
  return res.status(statusCode).json({
    success,
    message,
    data,
    error,
    timestamp: new Date().toISOString()
  });
};


export const ok = (res, message = 'Success', data = null) =>
  baseResponse(res, 200, true, message, data);

export const created = (res, message = 'Resource created', data = null) =>
  baseResponse(res, 201, true, message, data);

export const accepted = (res, message = 'Request accepted', data = null) =>
  baseResponse(res, 202, true, message, data);

export const noContent = (res) =>
  res.status(204).send();


export const badRequest = (res, message = 'Bad Request', error = null) =>
  baseResponse(res, 400, false, message, null, error);

export const unauthorized = (res, message = 'Unauthorized') =>
  baseResponse(res, 401, false, message);

export const forbidden = (res, message = 'Forbidden') =>
  baseResponse(res, 403, false, message);

export const notFound = (res, message = 'Resource not found') =>
  baseResponse(res, 404, false, message);

export const conflict = (res, message = 'Conflict') =>
  baseResponse(res, 409, false, message);

export const unprocessable = (res, message = 'Unprocessable Entity', error = null) =>
  baseResponse(res, 422, false, message, null, error);


export const internalError = (res, message = 'Internal Server Error', error = null) =>
  baseResponse(res, 500, false, message, null, error);

export const badGateway = (res, message = 'Bad Gateway') =>
  baseResponse(res, 502, false, message);

export const serviceUnavailable = (res, message = 'Service Unavailable') =>
  baseResponse(res, 503, false, message);

export const gatewayTimeout = (res, message = 'Gateway Timeout') =>
  baseResponse(res, 504, false, message);