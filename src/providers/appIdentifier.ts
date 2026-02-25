import { Injectable } from '@nestjs/common';

@Injectable()
export class AppIdentifier {
  public name: string = 'fish pie';
  constructor() {}
  setId(name: string) {
    this.name = name;
  }
  getID(): string {
    return this.name;
  }
}

@Injectable()
export class AppIdentifierChild extends AppIdentifier {
  static id: string = 'app';
  constructor() {
    super();
    this.setId(AppIdentifierChild.id);
  }
  override getID(): string {
    return AppIdentifierChild.id;
  }
}
@Injectable()
export class AppIdentifierChild1 extends AppIdentifier {
  static id: string = 'app1';
  constructor() {
    super();
    this.setId(AppIdentifierChild1.id);
  }
  override getID(): string {
    return AppIdentifierChild1.id;
  }
}
