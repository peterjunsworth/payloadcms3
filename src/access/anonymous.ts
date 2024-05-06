import { Access } from "payload/config";

export const isAnonymous: Access = ({ req: { user } }) => {
  return true;
}