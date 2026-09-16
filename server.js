// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.get("/", (req, res) => {
//     res.json({
//         message: "StudyPilot AI backend is running 🚀"
//     });
// });

// const PORT = 3000;

// app.listen(PORT, () => {
//     console.log(`StudyPilot AI server running at http://localhost:${PORT}`);
// });


// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();

// // console.log("API KEY LOADED:", !!process.env.OPENAI_API_KEY);

// const OpenAI = require("openai");

// const client = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY
// });

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.get("/", (req, res) => {
//     res.json({
//         message: "StudyPilot AI backend is running 🚀"
//     });
// });

// app.post("/api/generate-plan", async (req, res) => {
//     try {
//         const {
//             name,
//             course,
//             subjects,
//             examDate,
//             studyTime,
//             goal
//         } = req.body;

//         if (!name || !course || !subjects || !examDate || !studyTime || !goal) {
//             return res.status(400).json({
//                 error: "Please provide all details."
//             });
//         }

//         // AI connection will be added here next
//         // res.json({
//         //     success: true,
//         //     message: "Details received successfully!",
//         //     data: {
//         //         name,
//         //         course,
//         //         subjects,
//         //         examDate,
//         //         studyTime,
//         //         goal
//         //     }
//         // });

//         const prompt = `
// You are an AI study planner.

// Create a personalized study plan for this student:

// Name: ${name}
// Course: ${course}
// Subjects: ${subjects}
// Exam Date: ${examDate}
// Daily Study Time: ${studyTime}
// Goal: ${goal}

// Give a practical and realistic study plan.
// Include:
// 1. Daily schedule
// 2. Subject-wise time distribution
// 3. Weekly targets
// 4. Revision strategy
// 5. Exam preparation tips

// Keep the response clear and easy to follow.
// `;

// const response = await client.responses.create({
//     model: "gpt-5-mini",
//     input: prompt
// });

// const studyPlan = response.output_text;

// res.json({
//     success: true,
//     studyPlan: studyPlan
// });

//     } catch (error) {
//         console.error(error);

//         res.status(500).json({
//             error: "Something went wrong."
//         });
//     }
// });

// const PORT = 3000;

// app.listen(PORT, () => {
//     console.log(`StudyPilot AI server running at http://localhost:${PORT}`);
// });










const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.json({
        message: "StudyPilot AI backend is running 🚀"
    });
});

// Generate Study Plan
app.post("/api/generate-plan", async (req, res) => {
    try {
        const {
            name,
            course,
            subjects,
            examDate,
            studyTime,
            goal
        } = req.body;

        // Check all details
        if (!name || !course || !subjects || !examDate || !studyTime || !goal) {
            return res.status(400).json({
                error: "Please provide all details."
            });
        }

        // Temporary Mock Study Plan
        const studyPlan = `
Hello ${name}! 👋

Here is your personalized Study Plan.

📚 Course:
${course}

📖 Subjects:
${subjects}

📅 Exam Date:
${examDate}

⏰ Daily Study Time:
${studyTime}

🎯 Goal:
${goal}


━━━━━━━━━━━━━━━━━━━━━━
📅 DAILY STUDY SCHEDULE
━━━━━━━━━━━━━━━━━━━━━━

1. Concept Learning
   • Study new concepts
   • Understand important formulas
   • Make short notes

2. Practice
   • Solve questions related to today's topic
   • Practice previous questions

3. Revision
   • Revise everything studied today
   • Review difficult topics


━━━━━━━━━━━━━━━━━━━━━━
📚 SUBJECT-WISE STRATEGY
━━━━━━━━━━━━━━━━━━━━━━

• Mathematics:
  Focus on concepts, formulas and problem solving.

• Other Subjects:
  Divide your available study time according to the difficulty
  and importance of each subject.


━━━━━━━━━━━━━━━━━━━━━━
🎯 WEEKLY TARGETS
━━━━━━━━━━━━━━━━━━━━━━

Week 1:
• Complete basic concepts
• Make short notes
• Solve basic questions

Week 2:
• Complete important topics
• Increase question practice

Week 3:
• Solve previous year questions
• Focus on weak topics

Final Week:
• Complete revision
• Take mock tests
• Revise formulas and important concepts


━━━━━━━━━━━━━━━━━━━━━━
🔄 REVISION STRATEGY
━━━━━━━━━━━━━━━━━━━━━━

• Revise today's topics before sleeping.
• Revise important topics every 3 days.
• Take a weekly revision test.
• Maintain a list of weak topics.


━━━━━━━━━━━━━━━━━━━━━━
💡 EXAM PREPARATION TIPS
━━━━━━━━━━━━━━━━━━━━━━

• Stay consistent every day.
• Avoid studying everything at the last moment.
• Practice questions regularly.
• Focus more on weak topics.
• Take proper breaks.
• Sleep properly before the examination.

🚀 Keep studying consistently, ${name}!
You can achieve your goal.
`;

        // Send response to frontend
        res.json({
            success: true,
            studyPlan: studyPlan
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Something went wrong."
        });
    }
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`StudyPilot AI server running at http://localhost:${PORT}`);
});