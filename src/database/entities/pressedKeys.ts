import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("pressed_keys")
export class PressedKeys {
  @PrimaryColumn("uuid")
  id: string;

  @Column({ name: "user_id" })
  userId: string;

  @Column({ name: "pressed_key" })
  pressedKey: string;

  @Column({ name: "correct_key" })
  correctKey: string;

  @Column({ name: "created_at" })
  createdAt?: Date;
}
