// src/users/users.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // whatever yours is called
import type { Role, User } from './user';

const normalize = (email: string) => email.trim().normalize('NFC').toLowerCase();

const toUser = (row: { id: string; email: string; emailVerified: boolean; roles: string[] }): User => ({
  id: row.id,
  email: row.email,
  emailVerified: row.emailVerified,
  roles: row.roles as Role[],
});

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) { }

  async create(
    email: string,
    { passwordHash = null, emailVerified = false }: { passwordHash?: string | null; emailVerified?: boolean } = {},
  ): Promise<User> {
    const row = await this.prisma.user.create({
      data: { email: normalize(email), passwordHash, emailVerified },
    });
    return toUser(row);
  }

  async findById(id: string): Promise<User | null> {
    const row = await this.prisma.user.findUnique({ where: { id } });
    return row ? toUser(row) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const row = await this.prisma.user.findUnique({ where: { email: normalize(email) } });
    return row ? toUser(row) : null;
  }

  /** For password sign-in only. */
  async findCredentials(email: string) {
    const row = await this.prisma.user.findUnique({ where: { email: normalize(email) } });
    return row ? { user: toUser(row), passwordHash: row.passwordHash } : null;
  }

  async updatePasswordHash(id: string, passwordHash: string): Promise<void> {
    await this.prisma.user.update({ where: { id }, data: { passwordHash } });
  }

  async markEmailVerified(id: string, email: string) {
    const row = await this.prisma.user.findUnique({ where: { id } });

    if (!row || row.email !== normalize(email)) {
      return false;
    }

    await this.prisma.user.update({ where: { id }, data: { emailVerified: true } })
    return true;
  }
}
