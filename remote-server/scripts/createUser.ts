import { connect } from "../src/config/db";
import { User } from "../src/modules/user/UserModel";

(async () => {
  try {
    await connect();
    const user = await User.findOne({ username: "admin" })
    if (!user) await User.create({ username: "admin", password: "admin123", isAdmin: true, name: "Admin"})

  } catch (error) {
    console.error('Unable to connect to database');
    process.exit(1);
  }
})();
