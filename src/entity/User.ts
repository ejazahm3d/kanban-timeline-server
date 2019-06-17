import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn
} from "typeorm";
import { Length, IsNotEmpty, IsEmail } from "class-validator";
import * as bcrypt from "bcryptjs";

@Entity()
@Unique(["username", "email"])
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(4, 20)
  @IsNotEmpty()
  username: string;

  @Column()
  @IsNotEmpty()
  @Length(4, 100)
  password: string;

  @Column()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  async checkIfUnencryptedPasswordIsValid(
    unencryptedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(unencryptedPassword, this.password);
  }
}
