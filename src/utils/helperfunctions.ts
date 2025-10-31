
import type { Project } from "../types";

export const generatePlaceholderProjects = (): Project[] => {
  return Array.from({ length: 9 }, (_, index) => ({
    id: index + 1,
    title: `Project ${index + 1}`,
    course: `Course ${index + 1}`,
    image: `https://picsum.photos/seed/${index}/300/300`,
  })).concat({
    id: 20,
    title: `المشاريع ${20}`,
    course: `المشاريع ${20}`,
    image: `https://picsum.photos/seed/${20}/300/300`,
  });
};


