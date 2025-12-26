import { Card, CardContent, Typography, TextField, Select, MenuItem, FormControl, InputLabel, CircularProgress, Box, Divider } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useCourses } from "../../hooks/useCourses";
import { useState, useMemo, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";

interface ProjectDetailsCardProps {
    projectTitle: string;
    description: string;
    repoLink: string;
    liveUrl: string;
    supervisor: string;
    course: string;
    teachingAssistantEmail: string;
    technologies: string;
    tags: string;
    onProjectTitleChange: (value: string) => void;
    onDescriptionChange: (value: string) => void;
    onRepoLinkChange: (value: string) => void;
    onLiveUrlChange: (value: string) => void;
    onSupervisorChange: (value: string) => void;
    onCourseChange: (value: string) => void;
    onTeachingAssistantEmailChange: (value: string) => void;
    onTechnologiesChange: (value: string) => void;
    onTagsChange: (value: string) => void;
    onTaEmailErrorChange?: (hasError: boolean) => void;
}

const ProjectDetailsCard = ({
    projectTitle,
    description,
    repoLink,
    liveUrl,
    supervisor,
    course,
    teachingAssistantEmail,
    technologies,
    tags,
    onProjectTitleChange,
    onDescriptionChange,
    onRepoLinkChange,
    onLiveUrlChange,
    onSupervisorChange,
    onCourseChange,
    onTeachingAssistantEmailChange,
    onTechnologiesChange,
    onTagsChange,
    onTaEmailErrorChange,
}: ProjectDetailsCardProps) => {
    const { t, i18n } = useTranslation();
    const currentDir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    const [courseSearch, setCourseSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [selectOpen, setSelectOpen] = useState(false);
    const [taEmailError, setTaEmailError] = useState(false);

    // Debounce search input to avoid excessive API calls
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(courseSearch);
        }, 300); // 300ms delay

        return () => clearTimeout(timer);
    }, [courseSearch]);

    // Fetch courses with server-side filtering
    // When searching, pass the search term to filter by both code and title
    // When not searching, fetch all courses
    const { data: filteredCoursesData, isLoading: coursesLoading } = useCourses(
        debouncedSearch.trim() 
            ? { code: debouncedSearch, title: debouncedSearch }
            : undefined
    );

    // Always fetch all courses for validation (without filters)
    const { data: allCoursesForValidation } = useCourses(undefined);

    // Limit to first 5 courses when not searching (client-side limit for display)
    // Always include the selected course if it exists
    const filteredCourses = useMemo(() => {
        if (!filteredCoursesData) return [];
        
        // If searching, show all server-filtered results
        if (debouncedSearch.trim()) {
            return filteredCoursesData;
        }
        
        // If not searching, show only first 5, but always include selected course if it exists
        const firstFive = filteredCoursesData.slice(0, 5);
        
        // If a course is selected and it's not in the first 5, add it to the list
        if (course) {
            const selectedCourse = filteredCoursesData.find(c => c.code === course);
            if (selectedCourse && !firstFive.some(c => c.code === course)) {
                return [selectedCourse, ...firstFive];
            }
        }
        
        return firstFive;
    }, [filteredCoursesData, debouncedSearch, course]);

    // Validate course value - reset if not in available options
    // Only validate against the complete course list, not filtered results
    // This prevents false resets when user selects from search results
    useEffect(() => {
        if (!course) return;
        
        // Only validate if we have the complete course list loaded
        // Don't validate against filteredCoursesData as it's just for display
        if (allCoursesForValidation && allCoursesForValidation.length > 0) {
            const courseExists = allCoursesForValidation.some(c => c.code === course);
            if (!courseExists) {
                // Only reset if course definitely doesn't exist in the complete list
                onCourseChange('');
            }
        }
        // If allCoursesForValidation hasn't loaded yet, don't validate
        // This prevents false resets during initial load
    }, [course, allCoursesForValidation, onCourseChange]);

    // Validate teaching assistant email
    const validateTaEmail = (email: string) => {
        if (email.trim() === '') {
            setTaEmailError(false);
            onTaEmailErrorChange?.(false);
            return true;
        }
        const isValid = email.endsWith('@nu.edu.eg');
        setTaEmailError(!isValid);
        onTaEmailErrorChange?.(!isValid);
        return isValid;
    };

    // Handle TA email change with validation
    const handleTaEmailChange = (value: string) => {
        onTeachingAssistantEmailChange(value);
        validateTaEmail(value);
    };

    return (
        <Card
            sx={{
                height: "100%",
                borderRadius: 2,
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            }}
        >
            <CardContent>
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: "bold",
                        mb: 3,
                        color: "var(--accent)",
                    }}
                >
                    {t("submissionPage.Project Info")}
                </Typography>

                <TextField
                    label={t("submissionPage.Project Title")}
                    placeholder={t("submissionPage.Short Title for your Project")}
                    fullWidth
                    required
                    value={projectTitle || ''}
                    onChange={(e) => onProjectTitleChange(e.target.value)}
                    dir={currentDir}
                    sx={{ 
                        mb: 2,
                        direction: currentDir,
                        "& .MuiInputBase-input": {
                            direction: currentDir,
                        },
                        "& .MuiInputLabel-root": {
                            direction: currentDir,
                        },
                    }}
                    slotProps={{
                        input: {
                            dir: currentDir,
                        },
                    }}
                />

                <TextField
                    label={t("submissionPage.Project Description")}
                    fullWidth
                    required
                    multiline
                    rows={3}
                    value={description || ''}
                    onChange={(e) => onDescriptionChange(e.target.value)}
                    dir={currentDir}
                    sx={{ 
                        mb: 2,
                        direction: currentDir,
                        "& .MuiInputBase-input": {
                            direction: currentDir,
                        },
                        "& .MuiInputLabel-root": {
                            direction: currentDir,
                        },
                    }}
                    slotProps={{
                        input: {
                            dir: currentDir,
                        },
                    }}
                />

                <TextField
                    label={t("submissionPage.GitHub Repository Link")}
                    placeholder="https://github.com/Account-Name/Repo-Name"
                    fullWidth
                    required
                    value={repoLink || ''}
                    onChange={(e) => onRepoLinkChange(e.target.value)}
                    dir={currentDir}
                    sx={{ 
                        mb: 2,
                        direction: currentDir,
                        "& .MuiInputBase-input": {
                            direction: currentDir,
                        },
                        "& .MuiInputLabel-root": {
                            direction: currentDir,
                        },
                    }}
                    slotProps={{
                        input: {
                            dir: currentDir,
                        },
                    }}
                />

                <TextField
                    label={t("submissionPage.Live Demo URL (optional)")}
                    placeholder="https://yourproject.com"
                    fullWidth
                    value={liveUrl || ''}
                    onChange={(e) => onLiveUrlChange(e.target.value)}
                    dir={currentDir}
                    sx={{ 
                        mb: 2,
                        direction: currentDir,
                        "& .MuiInputBase-input": {
                            direction: currentDir,
                        },
                        "& .MuiInputLabel-root": {
                            direction: currentDir,
                        },
                    }}
                    slotProps={{
                        input: {
                            dir: currentDir,
                        },
                    }}
                />

                <TextField
                    label={t("submissionPage.Supervisor")}
                    placeholder="Dr. Name"
                    fullWidth
                    required
                    value={supervisor || ''}
                    onChange={(e) => onSupervisorChange(e.target.value)}
                    dir={currentDir}
                    sx={{ 
                        mb: 2,
                        direction: currentDir,
                        "& .MuiInputBase-input": {
                            direction: currentDir,
                        },
                        "& .MuiInputLabel-root": {
                            direction: currentDir,
                        },
                    }}
                    slotProps={{
                        input: {
                            dir: currentDir,
                        },
                    }}
                />

                <FormControl 
                    fullWidth 
                    required
                    sx={{ 
                        mb: 2,
                        direction: currentDir,
                    }}
                >
                    <InputLabel 
                        id="course-select-label"
                        required
                        sx={{
                            direction: currentDir,
                        }}
                    >
                        {t("submissionPage.Course")}
                    </InputLabel>
                    <Select
                        labelId="course-select-label"
                        value={course || ''}
                        label={t("submissionPage.Course")}
                        required
                        onChange={(e) => onCourseChange(e.target.value)}
                        dir={currentDir}
                        disabled={coursesLoading}
                        open={selectOpen}
                        onOpen={() => setSelectOpen(true)}
                        onClose={() => {
                            setSelectOpen(false);
                            setCourseSearch('');
                        }}
                        sx={{
                            direction: currentDir,
                            "& .MuiSelect-select": {
                                direction: currentDir,
                            },
                        }}
                        endAdornment={
                            coursesLoading ? (
                                <CircularProgress 
                                    size={20} 
                                    sx={{ 
                                        position: 'absolute', 
                                        right: currentDir === 'rtl' ? 'auto' : 40,
                                        left: currentDir === 'rtl' ? 40 : 'auto',
                                    }} 
                                />
                            ) : null
                        }
                        MenuProps={{
                            PaperProps: {
                                sx: {
                                    maxHeight: 'calc(100vh - 120px)',
                                    overflow: 'auto',
                                },
                            },
                            MenuListProps: {
                                sx: {
                                    maxHeight: 'calc(100vh - 120px)',
                                    overflow: 'auto',
                                },
                            },
                        }}
                    >
                        {/* Search Field */}
                        <Box 
                            sx={{ 
                                position: 'sticky', 
                                top: 0, 
                                bgcolor: 'background.paper', 
                                zIndex: 1,
                                p: 1,
                                direction: currentDir,
                            }}
                            onKeyDown={(e) => e.stopPropagation()}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <TextField
                                size="small"
                                placeholder={t("submissionPage.Search courses...")}
                                value={courseSearch}
                                onChange={(e) => setCourseSearch(e.target.value)}
                                dir={currentDir}
                                fullWidth
                                autoFocus
                                InputProps={{
                                    startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                                }}
                                sx={{
                                    direction: currentDir,
                                    "& .MuiInputBase-input": {
                                        direction: currentDir,
                                    },
                                }}
                            />
                        </Box>
                        <Divider />

                        {/* Course List */}
                        {filteredCourses.length > 0 ? (
                            filteredCourses.map((courseItem) => (
                                <MenuItem 
                                    key={courseItem._id} 
                                    value={courseItem.code}
                                    sx={{ direction: currentDir }}
                                >
                                    {courseItem.code} - {courseItem.title}
                                </MenuItem>
                            ))
                        ) : (
                            <MenuItem disabled sx={{ direction: currentDir }}>
                                {debouncedSearch ? t("submissionPage.No courses found") : t("submissionPage.No courses available")}
                            </MenuItem>
                        )}

                        {/* Show "Search to see more" hint when showing only first 5 */}
                        {!debouncedSearch && filteredCoursesData && filteredCoursesData.length > 5 && [
                            <Divider key="divider" />,
                            <Box 
                                key="hint"
                                sx={{ 
                                    p: 1.5, 
                                    textAlign: 'center', 
                                    color: 'text.secondary',
                                    fontSize: '0.875rem',
                                    fontStyle: 'italic',
                                    direction: currentDir,
                                }}
                            >
                                {t("submissionPage.Search to see more courses")} 
                            </Box>
                        ]}
                    </Select>
                </FormControl>

                <TextField
                    label={t("submissionPage.Teaching Assistant Email")}
                    placeholder="ta@nu.edu.eg"
                    fullWidth
                    type="email"
                    value={teachingAssistantEmail || ''}
                    required
                    onChange={(e) => handleTaEmailChange(e.target.value)}
                    error={taEmailError}
                    helperText={taEmailError ? t("submissionPage.Email must end with @nu.edu.eg") : ""}
                    dir={currentDir}
                    sx={{ 
                        mb: 2,
                        direction: currentDir,
                        "& .MuiInputBase-input": {
                            direction: currentDir,
                        },
                        "& .MuiInputLabel-root": {
                            direction: currentDir,
                        },
                    }}
                    slotProps={{
                        input: {
                            dir: currentDir,
                        },
                    }}
                />

                <TextField
                    label={t("submissionPage.Technologies (comma separated)")}
                    placeholder="Python, React, Node.js"
                    fullWidth
                    required
                    value={technologies || ''}
                    onChange={(e) => onTechnologiesChange(e.target.value)}
                    dir={currentDir}
                    sx={{ 
                        mb: 2,
                        direction: currentDir,
                        "& .MuiInputBase-input": {
                            direction: currentDir,
                        },
                        "& .MuiInputLabel-root": {
                            direction: currentDir,
                        },
                    }}
                    slotProps={{
                        input: {
                            dir: currentDir,
                        },
                    }}
                />

                <TextField
                    label={t("submissionPage.Tags (comma separated)")}
                    placeholder="AI, Robotics, ML"
                    fullWidth
                    required
                    value={tags || ''}
                    onChange={(e) => onTagsChange(e.target.value)}
                    dir={currentDir}
                    sx={{
                        direction: currentDir,
                        "& .MuiInputBase-input": {
                            direction: currentDir,
                        },
                        "& .MuiInputLabel-root": {
                            direction: currentDir,
                        },
                    }}
                    slotProps={{
                        input: {
                            dir: currentDir,
                        },
                    }}
                />
            </CardContent>
        </Card>
    );
};

export default ProjectDetailsCard;

