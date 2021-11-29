/* eslint-disable @typescript-eslint/no-empty-interface */
import sequelize from 'sequelize';
const { Model, DataTypes } = sequelize;
import sequelizeConnection from './sequelize';
import Student from '../types/student.d.js';

class StudentModel extends Model<Student> {
  public id: string;
  public email: string;
  public name: string;
  public subscription_type: string;
  public lastpayment_date: Date;
  public joined_date: Date;
  public photo_url: string;
  public subscription_expiry: Date;
  public favourite_tutors: string[];
  public blocked_tutors: string[];
  public bio: string;
}

StudentModel.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subscription_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastpayment_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    joined_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    photo_url: {
      type: DataTypes.STRING,
    },
    subscription_expiry: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    favourite_tutors: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
    blocked_tutors: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
    bio: {
      type: DataTypes.TEXT,
    },
  },
  { modelName: 'Student', tableName: 'student', sequelize: sequelizeConnection }
);

export default StudentModel;
