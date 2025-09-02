import { User } from "../models/User";
import type { IUser } from "../models/User";
import type { CreateUserInput, UpdateUserInput } from "../schemas/userSchema";

export class UserService {
  // Create a new user
  static async createUser(userData: CreateUserInput): Promise<IUser> {
    try {
      const user = new User(userData);
      return await user.save();
    } catch (error: any) {
      if (error.code === 11000) {
        throw new Error("Email already exists");
      }
      throw error;
    }
  }

  // Get all users
  static async getAllUsers(): Promise<IUser[]> {
    return await User.find().sort({ createdAt: -1 });
  }

  // Get user by ID
  static async getUserById(id: string): Promise<IUser | null> {
    return await User.findById(id);
  }

  // Update user by ID
  static async updateUser(
    id: string,
    updateData: UpdateUserInput
  ): Promise<IUser | null> {
    try {
      return await User.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });
    } catch (error: any) {
      if (error.code === 11000) {
        throw new Error("Email already exists");
      }
      throw error;
    }
  }

  // Delete user by ID
  static async deleteUser(id: string): Promise<IUser | null> {
    return await User.findByIdAndDelete(id);
  }

  // Get users by email
  static async getUserByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email: email.toLowerCase() });
  }

  // Get users with pagination
  static async getUsersWithPagination(
    page: number = 1,
    limit: number = 10
  ): Promise<{
    users: IUser[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const skip = (page - 1) * limit;
    const users = await User.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await User.countDocuments();
    const totalPages = Math.ceil(total / limit);

    return {
      users,
      total,
      page,
      totalPages,
    };
  }
}
