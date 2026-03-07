import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Define the schema directly for the script to avoid TS issues
const ProgramSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    duration: { type: String, required: true },
    price: { type: Number, required: true },
    weeks: { type: Number, required: true },
    skillLevel: { type: String, default: 'beginner' },
    isActive: { type: Boolean, default: true },
    imageUrl: { type: String },
}, { timestamps: true });

const Program = mongoose.models.Program || mongoose.model('Program', ProgramSchema);

dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('Please define the MONGODB_URI environment variable');
    process.exit(1);
}

const programs = [
    {
        name: "Website Development (front-end)",
        description: "Build responsive, user-friendly websites using HTML, CSS, JavaScript, and modern frameworks.",
        category: "frontend",
        duration: "3 Months",
        weeks: 12,
        price: 200000,
        imageUrl: "/images/frontend.png"
    },
    {
        name: "Mobile App Development(front-end)",
        description: "Learn to build powerful mobile applications for iOS and Android.",
        category: "mobile-dev",
        duration: "3 Months",
        weeks: 12,
        price: 200000,
        imageUrl: "/images/mobile.png"
    },
    {
        name: "UI/UX / Product Design",
        description: "Master user experience and product design principles + 1 month Internship.",
        category: "product-design",
        duration: "4 Months",
        weeks: 16,
        price: 200000,
        imageUrl: "/images/product.png"
    },
    {
        name: "Digital Marketing and Ads Management",
        description: "Drive growth through effective online marketing and ads.",
        category: "digital-marketing",
        duration: "2 Months",
        weeks: 8,
        price: 150000,
        imageUrl: "/images/digital.jpg"
    },
    {
        name: "Basic & Advanced Wordpress",
        description: "Learn to build and manage professional websites with Wordpress.",
        category: "wordpress",
        duration: "3 Months",
        weeks: 12,
        price: 80000,
        imageUrl: "/images/frontend.png"
    },
    {
        name: "Data Analytics",
        description: "Master the art of turning data into insights using tools like SQL and Power BI.",
        category: "data-analytics",
        duration: "3 Months",
        weeks: 12,
        price: 250000,
        imageUrl: "/images/analysis.jpg"
    },
    {
        name: "Full-stack Web development",
        description: "Become a complete web developer (Front-end + Back-end).",
        category: "fullstack",
        duration: "6 Months",
        weeks: 24,
        price: 300000,
        imageUrl: "/images/backend.png"
    },
    {
        name: "Full-stack MobileApp Development",
        description: "Build robust full-stack mobile applications from scratch.",
        category: "mobile-dev",
        duration: "6 Months",
        weeks: 24,
        price: 350000,
        imageUrl: "/images/mobile.png"
    },
    {
        name: "Cyber Security / Ethical Hacking",
        description: "Protect systems and networks from digital threats.",
        category: "cyber-security",
        duration: "6 Months",
        weeks: 24,
        price: 350000,
        imageUrl: "/images/gggg.jpeg"
    },
    {
        name: "Data Science (Physical)",
        description: "Advanced data analysis and statistical modeling (Physical).",
        category: "data-science",
        duration: "4 Months",
        weeks: 16,
        price: 300000,
        imageUrl: "/images/data.png"
    },
    {
        name: "Data Science (Online)",
        description: "Advanced data analysis and statistical modeling (Online).",
        category: "data-science",
        duration: "4 Months",
        weeks: 16,
        price: 250000,
        imageUrl: "/images/data.png"
    },
    {
        name: "Artificial Intelligence / Machine Learning",
        description: "Build intelligent systems and machine learning models.",
        category: "ai-ml",
        duration: "9 Months",
        weeks: 36,
        price: 500000,
        imageUrl: "/images/ai.jpg"
    },
    {
        name: "Devops Engineering",
        description: "Master deployment, automation, and infrastructure management.",
        category: "devops",
        duration: "4 Months",
        weeks: 16,
        price: 250000,
        imageUrl: "/images/cloud.jpg"
    },
    {
        name: "Robotics and Machine Learning (SKIT)",
        description: "Specialized tech training for kids including robotics.",
        category: "robotics",
        duration: "2 Months",
        weeks: 8,
        price: 100000,
        imageUrl: "/images/icehub.png"
    },
    {
        name: "Digital Literacy Program",
        description: "Essential computer and digital skills for beginners.",
        category: "digital-literacy",
        duration: "2 Months",
        weeks: 8,
        price: 80000,
        imageUrl: "/images/data.png"
    },
    {
        name: "Graphic Design",
        description: "Visual communication and creative graphic arts.",
        category: "graphics-design",
        duration: "3 Months",
        weeks: 12,
        price: 100000,
        imageUrl: "/images/graphics.png"
    },
    {
        name: "Video Editing and Post-Production",
        description: "Master the art of video creation and editing for all platforms.",
        category: "video-editing",
        duration: "6 Months",
        weeks: 24,
        price: 350000,
        imageUrl: "/images/ai.jpg"
    },
    {
        name: "Advanced Commercial Video Editing and Motion Design",
        description: "Premium professional video and motion graphics training.",
        category: "video-editing",
        duration: "1 Year",
        weeks: 52,
        price: 600000,
        imageUrl: "/images/ai.jpg"
    },
    {
        name: "Networking",
        description: "Learn to design and manage computer networks.",
        category: "networking",
        duration: "3 Months",
        weeks: 12,
        price: 200000,
        imageUrl: "/images/cloud.jpg"
    }
];

async function seed() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        // Optional: clear existing programs
        // await Program.deleteMany({});
        // console.log('Cleared existing programs');

        for (const prog of programs) {
            await Program.findOneAndUpdate(
                { name: prog.name },
                { $set: prog },
                { upsert: true, new: true }
            );
        }

        console.log('Successfully seeded 19 programs');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding programs:', error);
        process.exit(1);
    }
}

seed();
