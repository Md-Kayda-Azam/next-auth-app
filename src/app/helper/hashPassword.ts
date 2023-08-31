import bcrypt from "bcryptjs";

export const hashPassword = (output: any) => {
  const salt = bcrypt.genSaltSync(10);
  output.password = bcrypt.hashSync(output.password, salt);
  return;
};
export const checkPassword = (newp: any, oldp: any) => {
  return bcrypt.compareSync(newp, oldp);
};
