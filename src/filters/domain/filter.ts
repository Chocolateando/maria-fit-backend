import { ObjectId } from 'mongodb';
import { FilterEntity } from '../infraestructure/persistence/filter.entity';
import { FilterDTO } from '../infraestructure/dtos/dtos';

class Type {
  name: string;
}

class Difficulty {
  name: string;
}

class Category {
  name: string;
}

class PlanType {
  name: string;
}

export class Filter {
  _id: ObjectId;
  name: string;
  type: Type[];
  difficulty: Difficulty[];
  category: Category[];
  planType: PlanType[];
  createdAt: Date;
  updatedAt: Date;

  constructor(
    _id: ObjectId,
    name: string,
    type: Type[],
    difficulty: Difficulty[],
    category: Category[],
    planType: PlanType[],
    createdAt: Date,
    updatedAt: Date,
  ) {
    this._id = _id;
    this.name = name;
    this.type = type;
    this.difficulty = difficulty;
    this.category = category;
    this.planType = planType;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public toEntity(): FilterEntity {
    return {
      _id: this._id,
      name: this.name,
      type: this.type,
      difficulty: this.difficulty,
      category: this.category,
      planType: this.planType,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  public static toDTO(filter: FilterDTO): Filter {
    return new Filter(
      filter.id ? new ObjectId(filter.id) : new ObjectId(),
      filter.name,
      filter.type.map((type) => ({ name: type })),
      filter.difficulty.map((difficulty) => ({ name: difficulty })),
      filter.category.map((category) => ({ name: category })),
      filter.planType.map((planType) => ({ name: planType })),
      new Date(),
      new Date(),
    );
  }

  public static parseEntity(filter: FilterEntity): Filter {
    return new Filter(
      filter._id,
      filter.name,
      filter.type,
      filter.difficulty,
      filter.category,
      filter.planType,
      filter.createdAt,
      filter.updatedAt,
    );
  }
}
