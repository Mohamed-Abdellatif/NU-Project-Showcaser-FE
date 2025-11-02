import type { Project } from "../types";

export const generatePlaceholderProjects = (): Project[] => {
  const projects: Project[] = [
    {
      id: 1,
      title: "AI-Powered Study Assistant",
      course: "Machine Learning 101",
      description:
        "An AI assistant that summarizes lectures, generates quizzes, and provides personalized study plans using NLP models.",
      teamMembers: ["Lia Chen", "Omar Farouk", "Sara Delgado", "James Park"],
      githubRepo: "https://github.com/example/ai-study-assistant",
      images: [
        "https://images.unsplash.com/photo-1557672172-298e090bd0f1",
        "https://images.unsplash.com/photo-1562619371-b67725b6fde2",
        "https://images.unsplash.com/photo-1582643144074-a5abf05e1cf3",
      ],
      videos: [],
    },
    {
      id: 2,
      title: "EcoTrack: Sustainability Dashboard",
      course: "Data Visualization and Analytics",
      description:
        "A web app for tracking personal carbon footprints, built using D3.js and Flask APIs.",
      teamMembers: ["Hassan Malik", "Emily Rivera", "Lucas Romero"],
      githubRepo: "https://github.com/example/ecotrack",
      images: [
        "https://images.unsplash.com/photo-1508780709619-79562169bc64",
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      ],
      videos: [],
    },
    {
      id: 3,
      title: "Smart Health Band",
      course: "IoT Systems Design",
      description:
        "Wearable health tracker monitoring real-time heart rate and temperature with Bluetooth syncing.",
      teamMembers: ["Nour Khaled", "Ryan Chen", "Isabella Rossi", "Leo Anders"],
      githubRepo: "https://github.com/example/smart-health-band",
      images: [
        "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
        "https://images.unsplash.com/photo-1503602642458-232111445657",
      ],
      videos: [],
    },
    {
      id: 4,
      title: "ArtLens: Museum AR Guide",
      course: "Augmented Reality Development",
      description:
        "An AR mobile app that recognizes paintings and provides instant info overlays in galleries.",
      teamMembers: ["Fatima Noor", "Daniel Kim", "Sofia Ahmed"],
      githubRepo: "https://github.com/example/artlens",
      images: [
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
        "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      ],
      videos: [],
    },
    {
      id: 5,
      title: "FinVision: Stock Predictor",
      course: "Deep Learning for Finance",
      description:
        "LSTM-based model predicting short-term stock movements using live market data.",
      teamMembers: ["Ahmed Said", "Chloe Tran", "Mohammed Zayed"],
      githubRepo: "https://github.com/example/finvision",
      images: [
        "https://images.unsplash.com/photo-1503264116251-35a269479413",
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
      ],
      videos: [],
    },
    {
      id: 6,
      title: "MindMapr",
      course: "Cognitive Computing",
      description:
        "An intelligent note-taking tool that organizes concepts visually using AI clustering.",
      teamMembers: ["Layla Zhang", "Owen Patel", "Karim Abbas"],
      githubRepo: "https://github.com/example/mindmapr",
      images: [
        "https://images.unsplash.com/photo-1518770660439-4636190af475",
        "https://images.unsplash.com/photo-1508780709619-79562169bc64",
      ],
      videos: [],
    },
    {
      id: 7,
      title: "SafeRide: Driver Alert System",
      course: "Computer Vision Applications",
      description:
        "Detects driver drowsiness and distractions using OpenCV and alerts them instantly.",
      teamMembers: ["Elias George", "Haneen Saad", "Max Rivera", "Tina Nguyen"],
      githubRepo: "https://github.com/example/saferide",
      images: [
        "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
        "https://images.unsplash.com/photo-1503602642458-232111445657",
      ],
      videos: [],
    },
    {
      id: 8,
      title: "LingoLearn",
      course: "Natural Language Processing",
      description:
        "Interactive app that uses AI chatbots to help users practice languages in real-time.",
      teamMembers: ["Zara Khan", "Julian Lee", "Mina Rami"],
      githubRepo: "https://github.com/example/lingolearn",
      images: [
        "https://images.unsplash.com/photo-1503264116251-35a269479413",
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
      ],
      videos: [],
    },
    {
      id: 9,
      title: "BuildSync",
      course: "Software Engineering Project",
      description:
        "A CI/CD automation tool that integrates GitHub with cloud deployment for faster builds.",
      teamMembers: ["Fahd Essam", "Lia Morales", "Ethan Brooks"],
      githubRepo: "https://github.com/example/buildsync",
      images: [
        "https://images.unsplash.com/photo-1518770660439-4636190af475",
        "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      ],
      videos: [],
    },
    {
      id: 10,
      title: "NeuroSketch",
      course: "Creative AI and Art",
      description:
        "AI-driven drawing app that predicts and completes sketches in different art styles.",
      teamMembers: ["Papes Johnson", "Magic Liu", "Versy Adams"],
      githubRepo: "https://github.com/example/neurosketch",
      images: [
        "https://images.unsplash.com/photo-1508780709619-79562169bc64",
        "https://images.unsplash.com/photo-1503264116251-35a269479413",
      ],
      videos: [],
    },
  ];

  return projects;
};
