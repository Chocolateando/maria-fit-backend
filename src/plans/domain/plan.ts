import { PlanEntity } from '../infraestructure/persistence/plan.entity';
import { ObjectId } from 'mongodb';
import { ICreatePlanDTO } from '../infraestructure/dtos/dtos';

export class Plan {
  id: string;
  type: string;
  price: string;
  currency: string;
  cicleType: string;
  cicleNumber: number;
  description: string;
  characteristics: Characteristics[];
  status: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    type: string,
    price: string,
    currency: string,
    cicleType: string,
    cicleNumber: number,
    description: string,
    characteristics: Characteristics[],
    status: boolean,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.type = type;
    this.price = price;
    this.currency = currency;
    this.cicleType = cicleType;
    this.cicleNumber = cicleNumber;
    this.description = description;
    this.characteristics = characteristics;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public static parseEntity(plan: PlanEntity): Plan {
    return new Plan(
      plan._id.toString(),
      plan.type,
      plan.price,
      plan.currency,
      plan.cicleType,
      plan.cicleNumber,
      plan.description,
      plan.characteristics,
      plan.status,
      plan.createdAt,
      plan.updatedAt,
    );
  }

  public static parseDto(plan: ICreatePlanDTO): Plan {
    const characteristics = plan.characteristics.map((chr) => ({ text: chr }));
    return new Plan(
      null,
      plan.type,
      plan.price,
      plan.currency,
      plan.cicleType,
      plan.cicleNumber,
      plan.description,
      characteristics,
      plan.status,
      null,
      null,
    );
  }

  public toEntity(): PlanEntity {
    return {
      _id: this.id ? new ObjectId(this.id) : null,
      type: this.type,
      price: this.price,
      currency: this.currency,
      cicleType: this.cicleType,
      cicleNumber: this.cicleNumber,
      description: this.description,
      characteristics: this.characteristics,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

export class Characteristics {
  text: string;
}
