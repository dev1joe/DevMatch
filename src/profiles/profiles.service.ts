import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { createProfileDto } from './dto/create-profile.dto';
import { updateProfileDto } from './dto/update-profile.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Profile } from '../generated/prisma/client'

@Injectable()
export class ProfilesService {
  constructor(private readonly prisma: PrismaService) { }

  private items = [
    {
      id: "46706e0b-7fcd-42a6-b5d1-24f2bb152a51",
      name: "Cosmic Compass",
      description: "A pocket-sized navigational tool that points toward the nearest interstellar anomaly instead of magnetic north."
    },
    {
      id: "539c8c83-076e-4610-bf8e-640c65ec7a55",
      name: "Echo Teacup",
      description: "A ceramic mug that replays the last song or phrase whispered near it while it was being filled."
    },
    {
      id: "b84106e0-e15d-40b4-98ba-0161d070f5dd",
      name: "Glimmer Quill",
      description: "An antique fountain pen that writes in ink which shifts colors depending on the writer's current emotion."
    }
  ];

  async create(data: Prisma.ProfileCreateInput): Promise<Profile> {
    return this.prisma.profile.create({ data });
  }

  async findAll(params: {
    orderBy?: Prisma.ProfileOrderByWithRelationInput;
  }) {
    const { orderBy } = params;
    return this.prisma.profile.findMany({ orderBy });
  }

  async findOne(where: Prisma.ProfileWhereUniqueInput) {
    return this.prisma.profile.findUnique({ where });
  }

  async update(params: {
    where: Prisma.ProfileWhereUniqueInput,
    data: Prisma.ProfileUpdateInput
  }) {
    const { where, data } = params
    return this.prisma.profile.update({ data, where });
  }

  async del(where: Prisma.ProfileWhereUniqueInput) {
    return this.prisma.profile.delete({ where });
  }
}
