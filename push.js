const mongoose = require("mongoose");

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/Portfolio_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Schema for Portfolio
const portfolioSchema = new mongoose.Schema({
    summary: String,
    skills: [String],
    experience: [
        {
            title: String,
            company: String,
            period: String,
            responsibilities: [String],
        },
    ],
    education: [
        {
            institution: String,
            degree: String,
            graduationYear: String,
            highlights: [String],
        },
    ],
    projects: [
        {
            name: String,
            description: String,
            technologies: [String],
            link: String,
        },
    ],
    languages: [
        {
            name: String,
            level: String,
        },
    ],
    contact: {
        email: String,
        phone: String,
        linkedIn: String,
        github: String,
    },
});

const Portfolio = mongoose.model("Portfolio", portfolioSchema);

// Populate Database
async function populateDatabase() {
    try {
        const portfolio = new Portfolio({
            summary: "Full-stack developer with expertise in modern JavaScript frameworks and cloud infrastructure.",
            skills: [
                "React",
                "Node.js",
                "MongoDB",
                "AWS",
                "GraphQL",
            ],
            experience: [
                {
                    title: "Senior Developer",
                    company: "Tech Solutions Inc.",
                    period: "2019 - Present",
                    responsibilities: [
                        "Designed and implemented scalable web applications.",
                        "Led a team of developers to deliver enterprise solutions.",
                        "Integrated cloud services for enhanced performance."
                    ],
                },
            ],
            education: [
                {
                    institution: "Global University",
                    degree: "Bachelor of Science in Computer Science",
                    graduationYear: "2018",
                    highlights: [
                        "Graduated with honors.",
                        "Developed a capstone project on AI-driven analytics."
                    ],
                },
            ],
            projects: [
                {
                    name: "E-commerce Platform",
                    description: "A full-stack e-commerce application with user authentication and payment integration.",
                    technologies: ["React", "Node.js", "Stripe"],
                    link: "https://github.com/example/ecommerce-platform",
                },
            ],
            languages: [
                { name: "English", level: "Fluent" },
                { name: "German", level: "Intermediate" },
            ],
            contact: {
                email: "developer@example.com",
                phone: "123-456-7890",
                linkedIn: "https://linkedin.com/in/developer",
                github: "https://github.com/example",
            },
        });

        await portfolio.save();
        console.log("Portfolio data saved successfully!");
        mongoose.connection.close();
    } catch (err) {
        console.error("Error populating database:", err);
    }
}

populateDatabase();
