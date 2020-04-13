import bcrypt from 'bcrypt';

import { encryptPassword, authenticate, hashPassword } from '../utils';
import { IUser } from '../UserModel';

describe('Shared: Utils', function() {
  it('Should properly encrypt a string', async () => {
    const string = 'password';
    const encryptedString = await encryptPassword(string);
    expect(await bcrypt.compare(string, encryptedString)).toBe(true);
    expect(await bcrypt.compare('wrong_password', encryptedString)).toBe(false);
  });

  it('Should properly authenticate an user', async () => {
    const string = 'password';
    const user = {
      password: await encryptPassword(string),
      authenticate,
    } as IUser;
    expect(await user.authenticate(string)).toBe(true);
    expect(await user.authenticate('wrong_password')).toBe(false);
  });

  it('Should properly encrypt the password if it has changed', async () => {
    const password = 'password';
    const user = {
      password,
      authenticate,
      isModified: () => true,
      hashPassword,
      encryptPassword,
    } as IUser & { hashPassword: (next: () => void) => void };
    await new Promise(resolve => user.hashPassword(() => resolve()));
    expect(await user.authenticate(password)).toBe(true);
    expect(user.password).not.toEqual(password);
  });

  it('Should not properly encrypt the password if it has not changed', async () => {
    const password = 'password';
    const user = {
      password,
      authenticate,
      isModified: () => false,
      hashPassword,
      encryptPassword,
    } as IUser & { hashPassword: (next: () => void) => void };
    await new Promise(resolve => user.hashPassword(() => resolve()));
    expect(await user.authenticate(password)).toBe(false);
    expect(user.password).toEqual(password);
  });
});
