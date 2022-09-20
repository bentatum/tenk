import crypto from "crypto";

const sha256 = (message: any): string => {
  const shasum = crypto.createHash("sha256");
  shasum.update(message);
  return shasum.digest("hex");
};

export default sha256;
