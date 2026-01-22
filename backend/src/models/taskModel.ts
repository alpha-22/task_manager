import prisma from "../prisma";

export const getAllTasks = (userId: number) => {
  return prisma.task.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
};

export const createTask = (title: string, userId: number) => {
  return prisma.task.create({
    data: { title, userId },
  });
};

export const toggleTask = async (id: number, userId: number) => {
  const task = await prisma.task.findFirst({
    where: { id, userId },
  });

  if (!task) return null;

  return prisma.task.update({
    where: { id },
    data: { completed: !task.completed },
  });
};


export const deleteTask = (id: number, userId: number) => {
  return prisma.task.delete({
    where: { id },
  });
};

