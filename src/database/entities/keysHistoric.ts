import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("keys_historic")
export class KeysHistoric {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "user_id" })
  userId: string;

  @Column({ name: "text_id" })
  textId: number;

  @Column({ name: "right_key" })
  rightKey: string;

  @Column({ name: "pressed_key" })
  pressedKey: string;

  @Column()
  data: Date;
}
