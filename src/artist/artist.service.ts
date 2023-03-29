import { Injectable } from '@nestjs/common';

@Injectable()
export class PartyService {
  constructor() {}

  // async create(dto: CreatePartyDto) {
  //   return this.partyModel.create(dto);
  // }
  //
  // async findById(id: string) {
  //   return this.partyModel.findById(id).exec();
  // }
  //
  // async findAll() {
  //   return this.partyModel.find();
  // }
  //
  // async deleteById(id: string) {
  //   return this.partyModel.findByIdAndDelete(id).exec();
  // }
  //
  // async updateById(id: string, dto: CreatePartyDto) {
  //   return this.partyModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  // }
}
