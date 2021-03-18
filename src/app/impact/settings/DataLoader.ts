import { isDevMode } from '@angular/core';
import { AnalysisDto } from './../dtos/AnalysisDto';
import { StakeholderDto } from './../dtos/StakeholderDto';
import { DimensionDto } from './../dtos/DimensionDto';

export class DataLoader {

  // isDevMode();
  public static readonly useDummyData: boolean = true;

  public static readonly dummyAnalysisDtos: AnalysisDto[] = [
    {
      rootEntityID: '1'
    },
    {
      rootEntityID: '2'
    },
    {
      rootEntityID: '3'
    },
    {
      rootEntityID: '4'
    }
  ];

  public static readonly dummyStakeholderDtos: StakeholderDto[] = [
    {
      rootEntityID: '1', stakeholderName: 'Patient'
    },
    {
      rootEntityID: '2', stakeholderName: 'Doctor'
    },
    {
      rootEntityID: '3', stakeholderName: 'Family'
    },
    {
      rootEntityID: '4', stakeholderName: 'Ensurance'
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
      dimension: { id: '1' },
      stakeholder: { id: '1' },
      analysis: { id: '1' }
    },
    {
      id: '2',
      value: 0.5,
      description: 'This is the second read-only impact',
      dimension: { id: '4' },
      stakeholder: { id: '1' },
      analysis: { id: '1' }
    },
    {
      id: '3',
      value: 0.9,
      description: 'This is the third read-only impact',
      dimension: { id: '2' },
      stakeholder: { id: '4' },
      analysis: { id: '1' }
    },
    {
      id: '4',
      value: 0.2,
      description: 'This is the fourth read-only impact',
      dimension: { id: '2' },
      stakeholder: { id: '3' },
      analysis: { id: '1' }
    }
  ];
}