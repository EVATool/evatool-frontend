export class StakeholderTableFilterEvent {

  level: string[];
  priority: string[];
  impacted: number;

  constructor(
    level: string[],
    priority: string[],
    impacted: number) {
    this.level = level;
    this.priority = priority;
    this.impacted = impacted;
  }

  static getDefault(): StakeholderTableFilterEvent {
    return new StakeholderTableFilterEvent([], [], 0);
  }
}
