type PeopleCommitment = {
  readonly clientName: string;
  readonly endDate: string;
  readonly id: string;
  readonly startDate: string;
  readonly type: string;
  readonly utilization: number;
};

export type PeopleCommitmentsAndAssignments = {
  readonly id: string;
  readonly availablePercentage: number;
  readonly currentAndUpcomingCommitments: PeopleCommitment[];
};
