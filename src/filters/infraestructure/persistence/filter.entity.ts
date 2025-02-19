import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectId } from 'mongodb';

class Type {
  @Column({ type: 'varchar', nullable: false })
  name: string;
}

class Difficulty {
  @Column({ type: 'varchar', nullable: false })
  name: string;
}

class Category {
  @Column({ type: 'varchar', nullable: false })
  name: string;
}

class PlanType {
  @Column({ type: 'varchar', nullable: false })
  name: string;
}

@Entity('filters')
export class FilterEntity {
  @ObjectIdColumn()
  _id: ObjectId;
  @Column({ type: 'varchar', nullable: false, default: 'Filters' })
  name: string;
  @Column(() => Type)
  type: Type[];
  @Column({ type: 'array' })
  difficulty: Difficulty[];
  @Column({ type: 'array' })
  category: Category[];
  @Column({ type: 'array' })
  planType: PlanType[];
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
