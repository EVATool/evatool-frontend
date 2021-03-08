import { Analysis } from './Analysis';
import { Stakeholder } from './Stakeholder';
import { Dimension } from "./Dimension";

export class Impact {
	id: string = '';
	value: number = 0;
	description: string = '';
	dimension!: Dimension;
	stakeholder!: Stakeholder;
	analysis!: Analysis;
}