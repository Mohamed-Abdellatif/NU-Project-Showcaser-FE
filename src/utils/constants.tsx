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
  { code: "en", name: "English", dir: "ltr" },
  { code: "ar", name: "العربية", dir: "rtl" },
];

export const foundingMembers: FoundingMember[] = [
  {
    icon: <AllInclusiveIcon sx={{ fontSize: 40, color: "#9900ffff" }} />,
    image:
      "https://media.licdn.com/dms/image/v2/D4D03AQGtGQEb_iUdBA/profile-displayphoto-shrink_800_800/B4DZSyHXscGkAc-/0/1738155065020?e=1766016000&v=beta&t=HhlK6uGfntPwIRQ2p08M1FZyYFM8UuBavJN1XqQSeyk",
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
    image:
      "https://media.licdn.com/dms/image/v2/D4E03AQHqobwKdu293g/profile-displayphoto-shrink_800_800/B4EZZDNwJZG0Ag-/0/1744884407028?e=1766016000&v=beta&t=TlSsh3ThfEK8gly7a93nv1KtT4Pe78ofYtW5aT4xcAA",
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
    image:
      "https://media.licdn.com/dms/image/v2/D4E03AQH4F0D7vnNZGQ/profile-displayphoto-shrink_800_800/B4EZTDCdtXHcAg-/0/1738438991474?e=1766016000&v=beta&t=eKEO6mjaXKz76NZKZER5nBTDKHrjMg1y_0zB08T0yQk",
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
    image:
      "https://media.licdn.com/dms/image/v2/D4D03AQEeIgWJLMoIaA/profile-displayphoto-shrink_800_800/B4DZVLPlO9HIAc-/0/1740724131973?e=1766016000&v=beta&t=z55N1VaKGJJe2uvB5V_9dC44Y7RBG8KcBg4amK0cYZk",
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

export const acceptProjectEmail = (projectName: string) => {
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
      color: #333333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f5f5f5;
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
      color: #6C3BFF;
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
      background-color: #f0f7ff;
      border-left: 4px solid #6C3BFF;
      padding: 20px;
      margin: 25px 0;
      border-radius: 4px;
    }
    .footer {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #e0e0e0;
      text-align: center;
      color: #666666;
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
        <p style="margin: 0; font-weight: 600; color: #6C3BFF;">Your project will now be featured on the NU Project Podium platform, where it can be viewed by students, faculty, and visitors.</p>
      </div>
      
      <p>This is a great achievement and recognition of your hard work and innovation. Your project <strong>${projectName}</strong> will serve as an inspiration to other students at Nile University.</p>
      
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
      color: #333333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f5f5f5;
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
      color: #666666;
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
      border-left: 4px solid #ffa500;
      padding: 20px;
      margin: 25px 0;
      border-radius: 4px;
    }
    .footer {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #e0e0e0;
      text-align: center;
      color: #666666;
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
      color: #333333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f5f5f5;
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
      color: #6C3BFF;
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
      background-color: #f0f7ff;
      border-left: 4px solid #6C3BFF;
      padding: 20px;
      margin: 25px 0;
      border-radius: 4px;
    }
    .cta-button {
      display: inline-block;
      background-color: #6C3BFF;
      color: #ffffff;
      padding: 12px 24px;
      text-decoration: none;
      border-radius: 6px;
      font-weight: 600;
      margin-top: 10px;
    }
    .footer {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #e0e0e0;
      text-align: center;
      color: #666666;
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
