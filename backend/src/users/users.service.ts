import { Injectable } from "@nestjs/common";
import { Role, User } from "@prisma/client";

@Injectable()
export class UsersService {
  private readonly users = [
    {
      id: "2",
      email: "john@gmail.com",
      name: "john smith",
      password: "abc",
      credits: 10,
      role: Role.USER,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      id: "1",
      email: "james@gmail.com",
      password: "123",
      name: "james williams",
      credits: 10,
      role: Role.USER,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
  ];

  async findOne(username: string, password): Promise<any | undefined> {
    console.log("user service");
    return this.users.find((user) => user.name === username);
  }
}
