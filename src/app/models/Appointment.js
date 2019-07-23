import Sequelize, { Model } from 'sequelize';

class Appointment extends Model {
  static init(sequelize) {
    super.init(
      {
        date: Sequelize.STRING,
        canceled_at: Sequelize.DATE,
      },
      {
        sequelize,
      },
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });
    this.belongsTo(models.User, {
      foreignKey: 'provider_id',
      as: 'provider',
    });
  }
}

// Artist.belongsTo(Band)irá criar uma associação
//  um-para-um com o Artista como a fonte e a Band como o alvo .
// Isso significa que a chave estrangeira para Band será adicionada
//  ao modelo Artist
export default Appointment;
