import { BANKAPI } from "../config/index";

const contentType = "application/json";

export const clientHeader = {
  Authorization: `Bearer ${BANKAPI.ACCESS_TOKEN}`,
  Accept: contentType,
  "Content-Type": contentType,
  "Access-Control-Allow-Origin": "*",
};

export default clientHeader;
