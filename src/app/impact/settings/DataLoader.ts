import { isDevMode } from '@angular/core';
import { AnalysisDto } from './../dtos/AnalysisDto';
import { StakeholderDto } from './../dtos/StakeholderDto';
import { DimensionDto } from './../dtos/DimensionDto';

export class DataLoader {

  // isDevMode();
  public static readonly useDummyData: boolean = true;

  public static readonly dummyAnalysisDtos: AnalysisDto[] = [
    {
      id: '1'
    },
    {
      id: '2'
    },
    {
      id: '3'
    },
    {
      id: '4'
    }
  ];

  public static readonly dummyStakeholderDtos: StakeholderDto[] = [
    {
      id: '1', name: 'Patient'
    },
    {
      id: '2', name: 'Doctor'
    },
    {
      id: '3', name: 'Family'
    },
    {
      id: '4', name: 'Ensurance'
    }
  ];

  public static readonly dummyDimensionDtos: DimensionDto[] = [
    {
      id: '1', name: 'Feelings', description: 'Feelings of Patient', type: 'SOCIAL'
    },
    {
      id: '2', name: 'Control', description: 'Control of Doctor', type: 'SOCIAL'
    },
    {
      id: '3', name: 'Finances', description: 'Economics of Family', type: 'ECONOMIC'
    },
    {
      id: '4', name: 'Safety', description: 'Lorem Ipsum', type: 'SOCIAL'
    }
  ];
  public static readonly dummyDimensionTypes: string[] = ['SOCIAL', 'ECONOMIC'];

  public static readonly dummyImpactDtos: any[] = [
    {
      id: '1',
      value: -0.3,
      description: 'This is the first read-only impact This is the first read-only impact This is the first read-only impact This is the first read-only impact This is the first read-only impact This is the first read-only impact This is the first read-only impact This is the first read-only impact This is the first read-only impact This is the first read-only impact This is the first read-only impact This is the first read-only impact This is the first read-only impact This is the first read-only impact This is the first read-only impact This is the first read-only impact This is the first read-only impact ',
      dimensionDto: { id: '1' },
      stakeholderDto: { id: '1' },
      analysisDto: { id: '1' }
    },
    {
      id: '2',
      value: 0.5,
      description: 'This is the second read-only impact',
      dimensionDto: { id: '4' },
      stakeholderDto: { id: '1' },
      analysisDto: { id: '1' }
    },
    {
      id: '3',
      value: 0.9,
      description: 'This is the third read-only impact',
      dimensionDto: { id: '2' },
      stakeholderDto: { id: '4' },
      analysisDto: { id: '1' }
    },
    {
      id: '4',
      value: 0.2,
      description: 'This is the fourth read-only impact',
      dimensionDto: { id: '2' },
      stakeholderDto: { id: '3' },
      analysisDto: { id: '1' }
    }
  ];
}