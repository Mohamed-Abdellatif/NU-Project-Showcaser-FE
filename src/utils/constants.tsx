import type { FoundingMember, HeroSlideConfig, Language } from "../types";

import * as Icons from "@mui/icons-material";
import MohamedImg from "../assets/Mohamed.jpg";
import FahdImg from "../assets/Fahd.jpg";
import ZeyadImg from "../assets/Zeyad.jpg";
import OmarImg from "../assets/Omar.jpg";

const HailIcon = Icons.Hail;
const StarIcon = Icons.Star;
const CodeIcon = Icons.Code;
const AllInclusiveIcon = Icons.AllInclusive;
const MailIcon = Icons.Mail;
const GitHubIcon = Icons.GitHub;
const LinkedInIcon = Icons.LinkedIn;

export const LANGUAGES: Language[] = [
  { code: "en", name: "English", dir: "ltr" },
  { code: "ar", name: "العربية", dir: "rtl" },
];


export const HERO_SLIDES_CONFIG: HeroSlideConfig[] = [
  {
    decorativeBarColor: "#F59E0B",
    buttonLink: "/submit",
    translationKeys: {
      title: "home.heroSlides.slide1.title",
      subtitle: "home.heroSlides.slide1.subtitle",
      ctaText: "home.heroSlides.slide1.ctaText",
    },
  },
  {
    decorativeBarColor: "#3B82F6",
    buttonLink: "/projects",
    translationKeys: {
      title: "home.heroSlides.slide2.title",
      subtitle: "home.heroSlides.slide2.subtitle",
      ctaText: "home.heroSlides.slide2.ctaText",
    },
  },
  {
    decorativeBarColor: "#10B981",
    buttonLink: "/learn-more",
    translationKeys: {
      title: "home.heroSlides.slide3.title",
      subtitle: "home.heroSlides.slide3.subtitle",
      ctaText: "home.heroSlides.slide3.ctaText",
    },
  },
  {
    decorativeBarColor: "#8B5CF6",
    buttonLink: "/profile",
    translationKeys: {
      title: "home.heroSlides.slide4.title",
      subtitle: "home.heroSlides.slide4.subtitle",
      ctaText: "home.heroSlides.slide4.ctaText",
    },
  },
];

export const foundingMembers: FoundingMember[] = [
  {
    icon: <AllInclusiveIcon sx={{ fontSize: 40, color: "#9900ffff" }} />,
    image: MohamedImg,
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
    icon: <HailIcon sx={{ fontSize: 40, color: "#9900ffff" }} />,
    image: FahdImg,
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
    icon: <CodeIcon sx={{ fontSize: 40, color: "#9900ffff" }} />,
    image: ZeyadImg,
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
    icon: <StarIcon sx={{ fontSize: 40, color: "#9900ffff" }} />,
    image: OmarImg,
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

export const acceptProjectEmail = (projectName: string, projectId: string) => {
  return {
    subject: `Your Project ${projectName} Has Been Accepted - NU Project Podium`,
    text: `Congratulations! Your project ${projectName} has been accepted for the NU Project Podium.

We are pleased to inform you that your project submission has been reviewed and accepted by a Teaching Assistant. Your project will now be featured on the NU Project Podium platform, where it can be viewed by students, faculty, and visitors.

This is a great achievement and recognition of your hard work and innovation. Your project will serve as an inspiration to other students at Nile University.

Thank you for contributing to the NU Project Podium community. We wish you continued success in your academic journey.

Best regards,
NU Project Podium Team`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #414F75;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f0f6ff;
    }
    .email-container {
      background-color: #ffffff;
      border-radius: 8px;
      padding: 40px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
    }
    .header h1 {
      color: #1976d2;
      font-size: 28px;
      margin: 0 0 10px 0;
    }
    .content {
      margin-bottom: 30px;
    }
    .content p {
      margin-bottom: 16px;
      font-size: 16px;
    }
    .highlight-box {
      background-color: #e8f1fe;
      border-left: 4px solid #1976d2;
      padding: 20px;
      margin: 25px 0;
      border-radius: 4px;
    }
    .cta-button {
      display: inline-block;
      background-color: #1976d2;
      color: #ffffff !important;
      padding: 12px 32px;
      text-decoration: none;
      border-radius: 6px;
      font-weight: 600;
      margin: 20px 0;
      text-align: center;
    }
    .cta-button:hover {
      background-color: #5986D9;
    }
    .button-container {
      text-align: center;
      margin: 30px 0;
    }
    .footer {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #e0e0e0;
      text-align: center;
      color: #4F5F8C;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1>🎉 Congratulations!</h1>
    </div>
    <div class="content">
      <p>We are pleased to inform you that your project <strong>${projectName}</strong> submission has been <strong>reviewed and accepted</strong> by a Teaching Assistant.</p>
      
      <div class="highlight-box">
        <p style="margin: 0; font-weight: 600; color: #1976d2;">Your project will now be featured on the NU Project Podium platform, where it can be viewed by students, faculty, and visitors.</p>
      </div>
      
      <p>This is a great achievement and recognition of your hard work and innovation. Your project <strong>${projectName}</strong> will serve as an inspiration to other students at Nile University.</p>
      
      <div class="button-container">
        <a href="${window.location.origin}/projects/${projectId}" class="cta-button">View Your Project</a>
      </div>
      
      <p>Thank you for contributing to the NU Project Podium community. We wish you continued success in your academic journey.</p>
    </div>
    <div class="footer">
      <p><strong>Best regards,</strong><br>NU Project Podium Team</p>
    </div>
  </div>
</body>
</html>`,
  };
};

export const declineProjectEmail = (projectName: string) => {
  return {
    subject: `Project ${projectName} Review Update - NU Project Podium`,
    text: `Thank you for submitting your project ${projectName} to the NU Project Podium.

After careful review by a Teaching Assistant, we regret to inform you that your project ${projectName} submission has not been accepted at this time.

We encourage you to review the feedback and consider resubmitting your project after making improvements. This is not a reflection of your abilities, but rather an opportunity to enhance your project and showcase it in the best possible way.

If you have any questions or would like to discuss the decision, please feel free to reach out to us.

We appreciate your interest in the NU Project Podium and look forward to seeing your future submissions.

Best regards,
NU Project Podium Team`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #414F75;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f0f6ff;
    }
    .email-container {
      background-color: #ffffff;
      border-radius: 8px;
      padding: 40px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
    }
    .header h1 {
      color: #4F5F8C;
      font-size: 28px;
      margin: 0 0 10px 0;
    }
    .content {
      margin-bottom: 30px;
    }
    .content p {
      margin-bottom: 16px;
      font-size: 16px;
    }
    .info-box {
      background-color: #fff9e6;
      border-left: 4px solid #F59E0B;
      padding: 20px;
      margin: 25px 0;
      border-radius: 4px;
    }
    .footer {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #e0e0e0;
      text-align: center;
      color: #4F5F8C;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1>Project Review Update</h1>
    </div>
    <div class="content">
      <p>Thank you for submitting your project <strong>${projectName}</strong> to the NU Project Podium.</p>
      
      <p>After careful review by a Teaching Assistant, we regret to inform you that your project <strong>${projectName}</strong> submission has <strong>not been accepted</strong> at this time.</p>
      
      <div class="info-box">
        <p style="margin: 0;">We encourage you to review the feedback and consider resubmitting your project after making improvements. This is not a reflection of your abilities, but rather an opportunity to enhance your project and showcase it in the best possible way.</p>
      </div>
      
      <p>If you have any questions or would like to discuss the decision, please feel free to reach out to us.</p>
      
      <p>We appreciate your interest in the NU Project Podium and look forward to seeing your future submissions.</p>
    </div>
    <div class="footer">
      <p><strong>Best regards,</strong><br>NU Project Podium Team</p>
    </div>
  </div>
</body>
</html>`,
  };
};

export const requestProjectToTAEmail = {
  subject: "New Project Review Request - NU Project Podium",
  text: `You have received a new project review request on the NU Project Podium platform.

A student has submitted a project and requested your review. As a Teaching Assistant, your expertise is needed to evaluate this project submission.

Please log in to the NU Project Podium platform to review the project details and provide your feedback. Your timely review helps maintain the quality and standards of the showcase.

Thank you for your continued support in helping students showcase their work.

Best regards,
NU Project Podium Team`,
  html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #414F75;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f0f6ff;
    }
    .email-container {
      background-color: #ffffff;
      border-radius: 8px;
      padding: 40px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
    }
    .header h1 {
      color: #1976d2;
      font-size: 28px;
      margin: 0 0 10px 0;
    }
    .content {
      margin-bottom: 30px;
    }
    .content p {
      margin-bottom: 16px;
      font-size: 16px;
    }
    .action-box {
      background-color: #e8f1fe;
      border-left: 4px solid #1976d2;
      padding: 20px;
      margin: 25px 0;
      border-radius: 4px;
    }
    .cta-button {
      display: inline-block;
      background-color: #1976d2;
      color: #ffffff !important;
      padding: 12px 32px;
      text-decoration: none;
      border-radius: 6px;
      font-weight: 600;
      margin-top: 10px;
    }
    .cta-button:hover {
      background-color: #5986D9;
    }
    .button-container {
      text-align: center;
      margin: 30px 0;
    }
    .footer {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #e0e0e0;
      text-align: center;
      color: #4F5F8C;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1>📋 New Project Review Request</h1>
    </div>
    <div class="content">
      <p>Hello,</p>
      
      <p>You have received a <strong>new project review request</strong> on the NU Project Podium platform.</p>
      
      <p>A student has submitted a project and requested your review. As a Teaching Assistant, your expertise is needed to evaluate this project submission.</p>
      
      <div class="action-box">
        <p style="margin: 0 0 10px 0; font-weight: 600;">Action Required:</p>
        <p style="margin: 0;">Please log in to the NU Project Podium platform to review the project details and provide your feedback. Your timely review helps maintain the quality and standards of the showcase.</p>
      </div>
      
      <div class="button-container">
        <a href="${window.location.origin}/project-requests" class="cta-button">Review Projects</a>
      </div>
      
      <p>Thank you for your continued support in helping students showcase their work.</p>
    </div>
    <div class="footer">
      <p><strong>Best regards,</strong><br>NU Project Podium Team</p>
    </div>
  </div>
</body>
</html>`,
};

export const deactivateAccountEmail = (email: string) => {
  return {
    to: "m.abdellatif2319@nu.edu.eg",
    subject: "Deactivate Account Request - NU Project Podium",
    html: `
  <html>
  <body>
  <p>A user has requested to deactivate their account.</p>
  <p>User: ${email}</p>
  </body>
  </html>
  `,
  };
};
