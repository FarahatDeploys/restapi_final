import bcrypt from "bcrypt";
const data = {
  users: [
    {
      name: "Hady Farahat",
      email: "farahat2312@gmail.com",
      password: bcrypt.hashSync("1234", 8),
      isAdmin: true,
    },
    {
      name: "GoMyCode",
      email: "GoMyCode2312@gmail.com",
      password: bcrypt.hashSync("1234", 8),
      isAdmin: false,
    },
  ],
};
export default data;
