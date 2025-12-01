import type { FoundingMember, Language } from "../types";

import * as Icons from "@mui/icons-material";

const HailIcon = Icons.Hail;
const StarIcon = Icons.Star;
const CodeIcon = Icons.Code;
const AllInclusiveIcon = Icons.AllInclusive;
const MailIcon = Icons.Mail;
const GitHubIcon = Icons.GitHub;
const LinkedInIcon = Icons.LinkedIn;

export const LANGUAGES: Language[] = [
    { code: 'en', name: 'English', dir: 'ltr' },
    { code: 'ar', name: 'العربية', dir: 'rtl' }
  ];



  export const foundingMembers: FoundingMember[] = [
    {
      icon: <AllInclusiveIcon sx={{ fontSize: 40, color: "var(--accent)" }} />,
      image: "https://media.licdn.com/dms/image/v2/D4D03AQGtGQEb_iUdBA/profile-displayphoto-shrink_800_800/B4DZSyHXscGkAc-/0/1738155065020?e=1766016000&v=beta&t=HhlK6uGfntPwIRQ2p08M1FZyYFM8UuBavJN1XqQSeyk",
      name: "Mohamed",
      description: "Full Stack Developer",
      mail: "m.abdellatif2319@nu.edu.eg",
      mailIcon: <MailIcon sx={{ fontSize: 30, color: "#0f6cbd" }} />,
      github: "https://github.com/Mohamed-Abdellatif",
      githubIcon: <GitHubIcon sx={{ fontSize: 30, color: "#383737" }} />,
      linkedIn: "https://www.linkedin.com/in/mohamed-abdellatif-6060371b0/",
      linkedInIcon: <LinkedInIcon sx={{ fontSize: 30, color: "#126bc4" }} />,
    },
    {
      icon: <HailIcon sx={{ fontSize: 40, color: "var(--accent)" }} />,
      image: "https://media.licdn.com/dms/image/v2/D4E03AQHqobwKdu293g/profile-displayphoto-shrink_800_800/B4EZZDNwJZG0Ag-/0/1744884407028?e=1766016000&v=beta&t=TlSsh3ThfEK8gly7a93nv1KtT4Pe78ofYtW5aT4xcAA",
      name: "Fahd",
      description: "Frontend Developer",
      mail: "f.essameldin2333@nu.edu.eg",
      mailIcon: <MailIcon sx={{ fontSize: 30, color: "#0f6cbd" }} />,
      github: "https://github.com/FahdKhater",
      githubIcon: <GitHubIcon sx={{ fontSize: 30, color: "#383737" }} />,
      linkedIn: "https://www.linkedin.com/in/fahd-khater-8698a02b0/",
      linkedInIcon: <LinkedInIcon sx={{ fontSize: 30, color: "#126bc4" }} />,
    },
    {
      icon: <CodeIcon sx={{ fontSize: 40, color: "var(--accent)" }} />,
      image: "https://media.licdn.com/dms/image/v2/D4E03AQH4F0D7vnNZGQ/profile-displayphoto-shrink_800_800/B4EZTDCdtXHcAg-/0/1738438991474?e=1766016000&v=beta&t=eKEO6mjaXKz76NZKZER5nBTDKHrjMg1y_0zB08T0yQk",
      name: "Zeyad",
      description: "Frontend Developer",
      mail: "z.ahmed2310@nu.edu.eg",
      mailIcon: <MailIcon sx={{ fontSize: 30, color: "#0f6cbd" }} />,
      github: "https://github.com/Zeyad-Ahmed2005",
      githubIcon: <GitHubIcon sx={{ fontSize: 30, color: "#383737" }} />,
      linkedIn: "https://www.linkedin.com/in/zeyad-ahmed-b57019278/",
      linkedInIcon: <LinkedInIcon sx={{ fontSize: 30, color: "#126bc4" }} />,
    },
    {
      icon: <StarIcon sx={{ fontSize: 40, color: "var(--accent)" }} />,
      image: "https://media.licdn.com/dms/image/v2/D4D03AQEeIgWJLMoIaA/profile-displayphoto-shrink_800_800/B4DZVLPlO9HIAc-/0/1740724131973?e=1766016000&v=beta&t=z55N1VaKGJJe2uvB5V_9dC44Y7RBG8KcBg4amK0cYZk",
      name: "Omar",
      description: "Backend Developer",
      mail: "o.tamer2391@nu.edu.eg",
      mailIcon: <MailIcon sx={{ fontSize: 30, color: "#0f6cbd" }} />,
      github: "https://github.com/Lark01",
      githubIcon: <GitHubIcon sx={{ fontSize: 30, color: "#383737" }} />,
      linkedIn: "https://www.linkedin.com/in/omar-abouhussein-a371592b7/",
      linkedInIcon: <LinkedInIcon sx={{ fontSize: 30, color: "#126bc4" }} />,
    },
  ];