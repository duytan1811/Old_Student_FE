export class ProvinceModel {
  slug: string;
  name: string;
  type: string;
  code: string;
  nameWithType: string;

  constructor() {
    this.slug = '';
    this.name = '';
    this.type = '';
    this.code = '';
    this.nameWithType = '';
  }
}