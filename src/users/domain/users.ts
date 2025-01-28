import { ObjectId } from 'typeorm';
import { UserEntity } from '../infraestructure/persistence/user.entity';
import { CompareHash } from '../../shared/infraestructure/security/security';

export class User {
  id: ObjectId;
  name: string;
  lastname: string;
  birthday: string;
  tall: string;
  weight: number;
  phone: string;
  email: string;
  password_hash: string;
  status: number;
  uType: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: ObjectId,
    name: string,
    lastname: string,
    birthday: string,
    tall: string,
    weight: number,
    phone: string,
    email: string,
    password_hash: string,
    status: number,
    uType: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.name = name;
    this.lastname = lastname;
    this.birthday = birthday;
    this.tall = tall;
    this.weight = weight;
    this.phone = phone;
    this.email = email;
    this.password_hash = password_hash;
    this.status = status;
    this.uType = uType;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public sanitize(): void {
    this.password_hash = '';
  }

  public static parse(user: UserEntity): User {
    return new User(
      user._id,
      user.name,
      user.lastname,
      user.birthday,
      user.tall,
      user.weight,
      user.phone,
      user.email,
      user.password_hash,
      user.status,
      user.uType,
      user.createdAt,
      user.updatedAt,
    );
  }

  public toEntity(): UserEntity {
    return {
      _id: this.id,
      name: this.name,
      lastname: this.lastname,
      birthday: this.birthday,
      tall: this.tall,
      weight: this.weight,
      phone: this.phone,
      email: this.email,
      password_hash: this.password_hash,
      status: this.status,
      uType: this.uType,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  public static async validatePassword(
    password: string,
    hash: string,
  ): Promise<boolean> {
    return await CompareHash(password, hash);
  }
}
