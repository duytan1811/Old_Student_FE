export class VillageModel {
  name: string;
  type: string;
  slug: string;
  nameWithType: string;
  path: string;
  pathWithType: string;
  code: string;
  parentCode: string;

  constructor() {
    this.name = '';
    this.type = '';
    this.slug = '';
    this.nameWithType = '';
    this.path = '';
    this.pathWithType = '';
    this.code = '';
    this.parentCode = '';
  }
}