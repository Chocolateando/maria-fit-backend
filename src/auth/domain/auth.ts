import { ObjectId } from 'typeorm';
import { CompareHash } from '../../shared/infraestructure/security/security';
import { AuthEntity } from '../infraestructure/persistence/auth.entity';

export class Auth {
  id: ObjectId;
  email: string;
  password_hash: string;
  status: number;
  uType: string;

  constructor(
    id: ObjectId,
    email: string,
    password_hash: string,
    status: number,
    uType: string,
  ) {
    this.id = id;
    this.email = email;
    this.password_hash = password_hash;
    this.status = status;
    this.uType = uType;
  }

  public static parse(user: AuthEntity): Auth {
    return new Auth(
      user._id,
      user.email,
      user.password_hash,
      user.status,
      user.uType,
    );
  }

  public toEntity(): AuthEntity {
    return {
      _id: this.id,
      email: this.email,
      password_hash: this.password_hash,
      status: this.status,
      uType: this.uType,
    };
  }

  public static async validatePassword(
    password: string,
    hash: string,
  ): Promise<boolean> {
    return await CompareHash(password, hash);
  }
}
