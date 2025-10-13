export const logger = (res, req, next) => {
  console.log("Request Recieved");

  next();
};
