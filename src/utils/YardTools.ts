enum IFAAGroup {
  Adult,
  Junior,
}

class YardTools {
  private _yard: number;

  constructor(yard: number) {
    this._yard = yard;
  }

  public toMeter() {
    return Math.round(this._yard / 1.094);
  }

  public toGroup(group: IFAAGroup) {
    const maxDistance = group === IFAAGroup.Adult ? 60 : 50;
    const yard = this._yard;
    return yard > maxDistance
      ? undefined
      : yard > 45
      ? 1
      : yard > 35
      ? 2
      : yard > 20
      ? 3
      : 4;
  }
}

export { YardTools, IFAAGroup };
