export interface ProcessStep {
  number: number;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    number: 1,
    title: "Tell us what you need",
    description: "Share your project, goal, or problem. Whether you already know the scope or just know the outcome you want, we start by understanding what needs to get done."
  },
  {
    number: 2,
    title: "We scope the work",
    description: "We help turn the requirement into a clearer execution plan, identify the right type of support needed, and shape the project around realistic outcomes."
  },
  {
    number: 3,
    title: "We source the execution support",
    description: "Based on the project, Wroves coordinates the right specialists, freelancers, or service resources needed to move the work forward."
  },
  {
    number: 4,
    title: "We keep delivery moving",
    description: "You get one point of contact while the project is coordinated, tracked, and pushed toward completion."
  }
];
