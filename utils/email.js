const crypto = require('crypto');

// Email service configuration
const emailConfig = {
  service: 'gmail', // or your preferred email service
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: process.env.EMAIL_PORT || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
};

// Generate verification token
function generateVerificationToken() {
  return crypto.randomBytes(32).toString('hex');
}

// Create verification email HTML
function createVerificationEmail(name, verificationUrl) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .button { display: inline-block; background: #667eea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🌟 Welcome to Breaking Cycles!</h1>
        </div>
        <div class="content">
          <h2>Hi ${name}!</h2>
          <p>Thank you for joining our community of empowered women breaking cycles of poverty through education.</p>
          <p>To complete your registration and start your transformation journey, please verify your email address:</p>
          <div style="text-align: center;">
            <a href="${verificationUrl}" class="button">✅ Verify Email Address</a>
          </div>
          <p>This link will expire in 24 hours for security reasons.</p>
          <p>If you didn't create this account, please ignore this email.</p>
          <p>Welcome to the sisterhood! 💜</p>
        </div>
        <div class="footer">
          <p>Breaking Cycles - Empowering Women Through Education</p>
          <p>Founded by Munana Merveille | ALU Student</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

// Send verification email (mock implementation)
async function sendVerificationEmail(email, name, token) {
  const verificationUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/verify-email?token=${token}`;
  
  // In a real application, you would use nodemailer or similar service
  console.log(`📧 Email verification sent to: ${email}`);
  console.log(`🔗 Verification URL: ${verificationUrl}`);
  
  // Mock email sending - replace with actual email service
  return {
    success: true,
    messageId: `mock-${Date.now()}`,
    verificationUrl // Return URL for testing
  };
}

// Send welcome email after verification
async function sendWelcomeEmail(email, name) {
  const welcomeHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center;">
        <h1>🎉 Welcome to Breaking Cycles!</h1>
      </div>
      <div style="padding: 30px; background: #f9f9f9;">
        <h2>Hi ${name}!</h2>
        <p>Your email has been verified successfully! You're now part of our amazing community.</p>
        <p>Here's what you can do next:</p>
        <ul>
          <li>📚 Explore our courses in Financial Literacy, Coding, Entrepreneurship, and Beauty</li>
          <li>💬 Join our supportive chat communities</li>
          <li>✨ Read inspiring success stories</li>
          <li>🎯 Set your learning goals</li>
        </ul>
        <p>Ready to start your transformation journey? 🚀</p>
      </div>
    </div>
  `;
  
  console.log(`📧 Welcome email sent to: ${email}`);
  return { success: true };
}

module.exports = {
  generateVerificationToken,
  sendVerificationEmail,
  sendWelcomeEmail,
  createVerificationEmail
};