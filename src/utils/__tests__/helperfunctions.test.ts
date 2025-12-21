import { describe, it, expect } from '@jest/globals';
import { generatePlaceholderProjects } from '../helperfunctions';

describe('helperfunctions', () => {
  describe('generatePlaceholderProjects', () => {
    it('should return an array of 10 projects', () => {
      const projects = generatePlaceholderProjects();
      expect(projects).toHaveLength(10);
    });

    it('should return projects with correct structure', () => {
      const projects = generatePlaceholderProjects();
      const firstProject = projects[0];

      expect(firstProject).toHaveProperty('id');
      expect(firstProject).toHaveProperty('title');
      expect(firstProject).toHaveProperty('course');
      expect(firstProject).toHaveProperty('description');
      expect(firstProject).toHaveProperty('teamMembers');
      expect(firstProject).toHaveProperty('githubRepo');
      expect(firstProject).toHaveProperty('images');
      expect(firstProject).toHaveProperty('videos');
    });

    it('should have valid data types for all fields', () => {
      const projects = generatePlaceholderProjects();
      
      projects.forEach((project) => {
        expect(typeof project.id).toBe('number');
        expect(typeof project.title).toBe('string');
        expect(typeof project.course).toBe('string');
        expect(typeof project.description).toBe('string');
        expect(typeof project.githubRepo).toBe('string');
        expect(Array.isArray(project.teamMembers)).toBe(true);
        expect(Array.isArray(project.images)).toBe(true);
        expect(Array.isArray(project.videos)).toBe(true);
      });
    });

    it('should have non-empty team members arrays', () => {
      const projects = generatePlaceholderProjects();
      
      projects.forEach((project) => {
        expect(project.teamMembers.length).toBeGreaterThan(0);
        project.teamMembers.forEach((member) => {
          expect(typeof member).toBe('string');
          expect(member.length).toBeGreaterThan(0);
        });
      });
    });

    it('should have unique IDs for all projects', () => {
      const projects = generatePlaceholderProjects();
      const ids = projects.map((p) => p.id);
      const uniqueIds = new Set(ids);
      
      expect(uniqueIds.size).toBe(projects.length);
    });

    it('should have valid GitHub repository URLs', () => {
      const projects = generatePlaceholderProjects();
      
      projects.forEach((project) => {
        expect(project.githubRepo).toMatch(/^https?:\/\/github\.com\//);
      });
    });

    it('should have at least one image for each project', () => {
      const projects = generatePlaceholderProjects();
      
      projects.forEach((project) => {
        expect(project.images.length).toBeGreaterThan(0);
      });
    });

    it('should contain specific expected projects', () => {
      const projects = generatePlaceholderProjects();
      const titles = projects.map((p) => p.title);
      
      expect(titles).toContain('AI-Powered Study Assistant');
      expect(titles).toContain('EcoTrack: Sustainability Dashboard');
      expect(titles).toContain('Smart Health Band');
      expect(titles).toContain('NeuroSketch');
    });
  });
});
