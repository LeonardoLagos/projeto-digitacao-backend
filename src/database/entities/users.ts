import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("users")
export class Users {
  @PrimaryColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ name: "google_id" })
  googleId: string;

  @Column({ name: "profile_picture" })
  profilePicture: string;

  @Column({ name: "created_at" })
  createdAt: Date;

  @Column()
  status: string;
}
