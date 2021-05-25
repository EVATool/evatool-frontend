export class StakeholderTableFilterEvent {

  level: string[];
  priority: string[];
  impacted: number;
  highlight: string;

  constructor(
    level: string[],
    priority: string[],
    impacted: number,
    highlight: string) {
    this.level = level;
    this.priority = priority;
    this.impacted = impacted;
    this.highlight = highlight;
  }

  static getDefault(): StakeholderTableFilterEvent {
    return new StakeholderTableFilterEvent([], [], 0, '');
  }
}
