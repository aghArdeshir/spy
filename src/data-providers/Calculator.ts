export class Calculator {
  constructor(private playersCount: number, private spiesCount: number) {}

  get playersCanBeDecreased() {
    return !(
      this.spiesCount >= Math.ceil(this.playersCount / 2) - 1 ||
      this.playersCount <= 3
    );
  }

  get spiesCanBeIncreased() {
    return !(this.spiesCount >= Math.ceil(this.playersCount / 2) - 1);
  }

  get spiesCanBeDecreased() {
    return !(this.spiesCount <= 1);
  }
}
