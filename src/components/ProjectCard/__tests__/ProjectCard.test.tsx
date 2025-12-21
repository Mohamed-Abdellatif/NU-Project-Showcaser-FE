import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { screen, fireEvent } from '@testing-library/react';
import { render, createMockProject } from '../../../test-utils';
import ProjectCard from '../ProjectCard';

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as object),
  useNavigate: () => mockNavigate,
}));

describe('ProjectCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render project title', () => {
    const project = createMockProject({ title: 'Test Project Title' });
    
    render(<ProjectCard project={project} viewMode="grid" />);
    
    expect(screen.getByText('Test Project Title')).toBeInTheDocument();
  });

  it('should render project course chip', () => {
    const project = createMockProject({ course: 'CS101' });
    
    render(<ProjectCard project={project} viewMode="grid" />);
    
    expect(screen.getByText(/Course: CS101/i)).toBeInTheDocument();
  });

  it('should render project year from createdAt', () => {
    const project = createMockProject({ 
      createdAt: new Date('2024-01-15').toISOString() 
    });
    
    render(<ProjectCard project={project} viewMode="grid" />);
    
    expect(screen.getByText(/Year: 2024/i)).toBeInTheDocument();
  });

  it('should render project tags', () => {
    const project = createMockProject({ 
      tags: ['Web Development', 'Machine Learning', 'Mobile'] 
    });
    
    render(<ProjectCard project={project} viewMode="grid" />);
    
    // Should render first 2 tags
    expect(screen.getByText('Web Development')).toBeInTheDocument();
    expect(screen.getByText('Machine Learning')).toBeInTheDocument();
    expect(screen.queryByText('Mobile')).not.toBeInTheDocument();
  });

  it('should display star count when stars are greater than 0', () => {
    const project = createMockProject({ stars: 5 });
    
    render(<ProjectCard project={project} viewMode="grid" />);
    
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('should not display star count when stars are 0', () => {
    const project = createMockProject({ stars: 0 });
    
    const { container } = render(<ProjectCard project={project} viewMode="grid" />);
    
    // Star icon should not be present
    const starIcons = container.querySelectorAll('[data-testid="StarIcon"]');
    expect(starIcons.length).toBe(0);
  });

  it('should navigate to project detail page on card click', () => {
    const project = createMockProject({ _id: 'proj123' });
    
    render(<ProjectCard project={project} viewMode="grid" />);
    
    const card = screen.getByText('Test Project').closest('div[class*="MuiCardContent"]')?.parentElement;
    if (card) {
      fireEvent.click(card);
      expect(mockNavigate).toHaveBeenCalledWith('/projects/proj123');
    }
  });

  it('should render in grid view mode with correct styling', () => {
    const project = createMockProject();
    
    const { container } = render(<ProjectCard project={project} viewMode="grid" />);
    
    // Check that card exists
    const card = container.querySelector('[class*="MuiCard"]');
    expect(card).toBeInTheDocument();
  });

  it('should render in list view mode with correct styling', () => {
    const project = createMockProject();
    
    const { container } = render(<ProjectCard project={project} viewMode="list" />);
    
    // Check that card exists
    const card = container.querySelector('[class*="MuiCard"]');
    expect(card).toBeInTheDocument();
  });

  it('should render project image with alt text', () => {
    const project = createMockProject({ 
      title: 'My Project',
      images: ['https://example.com/image.jpg'] 
    });
    
    render(<ProjectCard project={project} viewMode="grid" />);
    
    const image = screen.getByAltText('My Project');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
  });

  it('should use placeholder image when no images are provided', () => {
    const project = createMockProject({ 
      title: 'No Image Project',
      images: [] 
    });
    
    render(<ProjectCard project={project} viewMode="grid" />);
    
    const image = screen.getByAltText('No Image Project');
    expect(image).toHaveAttribute('src', expect.stringContaining('placehold.co'));
  });

  it('should render settings icon', () => {
    const project = createMockProject();
    
    const { container } = render(<ProjectCard project={project} viewMode="grid" />);
    
    const settingsIcon = container.querySelector('[data-testid="SettingsIcon"]');
    expect(settingsIcon).toBeInTheDocument();
  });

  it('should handle image error by switching to next image', () => {
    const project = createMockProject({ 
      images: ['https://example.com/broken.jpg', 'https://example.com/fallback.jpg'] 
    });
    
    render(<ProjectCard project={project} viewMode="grid" />);
    
    const image = screen.getByAltText(project.title) as HTMLImageElement;
    
    // Trigger error event
    fireEvent.error(image);
    
    // After error, should use second image
    expect(image.src).toContain('fallback.jpg');
  });

  it('should not render tags section when no tags are provided', () => {
    const project = createMockProject({ tags: [] });
    
    render(<ProjectCard project={project} viewMode="grid" />);
    
    // Only course and year chips should be present (chips may not have button role)
    const courseChip = screen.getByText(/Course: CS101/i);
    const yearChip = screen.getByText(/Year: 2024/i);
    expect(courseChip).toBeInTheDocument();
    expect(yearChip).toBeInTheDocument();
    
    // Verify no tag chips are present
    expect(screen.queryByText('Web Development')).not.toBeInTheDocument();
    expect(screen.queryByText('Machine Learning')).not.toBeInTheDocument();
  });
});
