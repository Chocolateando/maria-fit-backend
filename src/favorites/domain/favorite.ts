import { FavoriteEntity } from '../infraestructure/persistence/favorite.entity';
import { ObjectId } from 'mongodb';
import { IFavoriteDTO } from '../infraestructure/dtos/dtos';

export class Favorite {
  id: string;
  user: string;
  recipe: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(
    id: string,
    user: string,
    recipe: string,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this.id = id;
    this.user = user;
    this.recipe = recipe;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public static parseEntity(entity: FavoriteEntity): Favorite {
    return new Favorite(
      entity._id.toString(),
      entity.user.toString(),
      entity.recipe.toString(),
      entity.createdAt,
      entity.updatedAt,
    );
  }

  public static parseDto(favorite: IFavoriteDTO) {
    return new Favorite(null, favorite.user, favorite.recipe);
  }

  public toEntity(): FavoriteEntity {
    return {
      _id: this.id ? new ObjectId(this.id) : null,
      user: new ObjectId(this.user),
      recipe: new ObjectId(this.recipe),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
