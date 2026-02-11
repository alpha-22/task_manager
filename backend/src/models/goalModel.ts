import  prisma  from "../prisma";

export const getAllGoals = async (userId: number) => {
  return prisma.goal.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
};

export const createGoal = async (title: string, userId: number) => {
  return prisma.goal.create({
    data: {
      title,
      userId,
    },
  });
};

export const updateGoalProgress = async (
  id: number,
  userId: number,
  progress: number
) => {
  return prisma.goal.update({
    where: {
      id,
      userId,
    },
    data: {
      progress,
    },
  });
};

export const deleteGoal = async (id: number, userId: number) => {
  return prisma.goal.delete({
    where: {
      id,
      userId,
    },
  });
};
