import { Partial } from "@/FrontEndTypes";
import { PeopleCommitmentsAndAssignments } from "@/people/peopleTypes";
import { combine } from "@util/combine";

export const getFakePeopleCommitmentsAndAssignments = (
  params: Partial<PeopleCommitmentsAndAssignments> = {}
): PeopleCommitmentsAndAssignments => {
  return combine(
    {
      id: "12345",
      availablePercentage: 100,
      currentAndUpcomingCommitments: [
        {
          id: "123",
          clientName: "Client Name",
          endDate: "2022-08-16",
          startDate: "2022-08-16",
          type: "AVAILABLE_TIME",
          utilization: 100,
        },
      ],
    },
    params
  );
};
