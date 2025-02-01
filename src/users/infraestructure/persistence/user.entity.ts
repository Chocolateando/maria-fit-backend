import {
  Entity,
  Column,
  ObjectId,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @ObjectIdColumn()
  _id: ObjectId;
  @Column({ type: 'varchar', nullable: false })
  name: string;
  @Column({ type: 'varchar', nullable: false })
  lastname: string;
  @Column({ type: 'varchar', nullable: false })
  birthday: string;
  @Column({ type: 'varchar', nullable: false })
  tall: string;
  @Column({ type: 'int', nullable: false })
  weight: number;
  @Column({ type: 'varchar', nullable: false })
  phone: string;
  @Column({ type: 'varchar', nullable: false })
  email: string;
  @Column({ type: 'varchar', nullable: false })
  password_hash: string;
  @Column({ type: 'int', default: 1 })
  status: number;
  @Column({ type: 'varchar', default: '' })
  uType: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
