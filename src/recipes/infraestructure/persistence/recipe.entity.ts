import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectId,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';

class Ingredients {
  @Column({ type: 'varchar', nullable: false })
  name: string;
  @Column({ type: 'varchar', nullable: false })
  amount: string;
}

class Instructions {
  @Column({ type: 'int', nullable: false })
  orderNum: number;
  @Column({ type: 'varchar', nullable: false })
  instruction: string;
}

@Entity('recipes')
export class RecipeEntity {
  @ObjectIdColumn()
  _id: ObjectId;
  @Column({ type: 'varchar', nullable: false })
  title: string;
  @Column({ type: 'varchar', nullable: false })
  description: string;
  @Column({ type: 'varchar', nullable: false })
  category: string;
  @Column({ type: 'varchar', nullable: false })
  type: string;
  @Column({ type: 'varchar', nullable: false })
  difficulty: string;
  @Column({ type: 'varchar', nullable: false })
  objetive: string;
  @Column({ type: 'int', nullable: false })
  portions: number;
  @Column({ type: 'varchar', nullable: false })
  preparationtime: string;
  @Column({ type: 'array' })
  ingredients: Ingredients[];
  @Column({ type: 'array' })
  instructions: Instructions[];
  @Column({ type: 'varchar', nullable: false })
  tags: string;
  @Column({ type: 'varchar', nullable: false })
  firstTag: string;
  @Column({ type: 'array' })
  tipsAndTricks: Instructions[];
  @Column({ type: 'varchar', nullable: false })
  subscriptionType: string;
  @Column({ type: 'varchar', nullable: false })
  image_url: string;
  @Column({ type: 'int', nullable: false, default: 1 })
  status: number;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
