import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectId,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('plans')
export class PlanEntity {
  @ObjectIdColumn()
  _id: ObjectId;
  @Column({ type: 'varchar', nullable: false })
  type: string;
  @Column({ type: 'varchar', nullable: false })
  price: string;
  @Column({ type: 'varchar', nullable: false })
  currency: string;
  @Column({ type: 'varchar', nullable: false })
  cicleType: string;
  @Column({ type: 'int', nullable: false })
  cicleNumber: number;
  @Column({ type: 'varchar', nullable: false })
  description: string;
  @Column({ type: 'array' })
  characteristics: Characteristics[];
  @Column({ type: 'boolean', nullable: false })
  status: boolean;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}

class Characteristics {
  @Column({ type: 'varchar', nullable: false })
  text: string;
}
