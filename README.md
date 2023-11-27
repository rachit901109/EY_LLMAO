# EY Techathon 4.0
## Team Name: LLMAO

### Problem statement - Challenge III:<br>
#### **Education**
Transforming Education with Generative AI: Personalized Learning and Intelligent Tutoring
Rani, a student from a village in Kerala, is struggling to get back to her education following
the delay caused by the pandemic. While the government announced online classes,
language remained a huge constraint. As eager Rani is to resume her studies,
infrastructure and accessibility issues are becoming impediments for her.

Student’s challenge: Develop apps or solutions with AI-powered content generation
capabilities, automated grading systems or virtual tutors for individualized student
support. Alternatively, suggest solutions led by generative AI to help students retain
information better and learn at their own pace

Prototype submitted on 26/11/23<br>
**Steps to run project:**
1. Clone the repository:
```bash
cd User/clone_dir
git clone "repourl"
```

2. Install dependencies for frontend, backend and third party services:
- 1. Frontend:
```bash
cd LLMAO/
npm i 
```
start the client server:
```npm run dev```

- 2. Backend:
```bash
cd server/
pip install -r requirements.txt
```
If above command doesn't work try 
```python3 -m pip install -r requirements.txt```.<br>
To start backend api server
```bash
cd ..
python3 run.py
```

3. Third party services:<br>
Create two *.env* files in server and server/users. Add a *SECRECT_KEY* to server env file. Add your api keys for open ai and tavily, named *OPENAI_API_KEY* and *TAVILY_API_KEY* to the other env file.
```bash
cd server && touch .env && echo "SECRET_KEY=secret_key" | cat > .env
cd users && touch .env
echo "OPENAI_API_KEY=yourkey" | cat >> .env && echo "TAVILY_API_KEY=yourkey" | cat >> .env
```
**Tavily api key is only required if you want to enable web search for content generation model.**<br>
Finally to land on our home page click the link present on the client  server or visit `http://localhost:5173/`.

**Solutions implemented in prototype:**
When considering the various obstacles encountered by students residing in remote regions, such as Rani, we duly recognize the substantial influence that language barriers exert on their capacity to access academic materials and understand online courses. The restricted accessibility of materials in the learners' mother tongue presents an obstacle to the standard of education as a whole.

Our prototype presents the below solutions:
- User Engagement:
Metric: Daily/Weekly/Monthly Active Users (DAU/WAU/MAU). High engagement indicates that learners find the platform valuable and are consistently using it for their educational needs.
- Learning Progress:
Metric: Completion Rates of Courses and Modules. Monitoring how many users successfully complete courses and modules provides insights into the effectiveness of the content and the platform's ability to support learning progression.
- Personalized Learning Effectiveness:
Metric: Improvement in Weak Areas. Tracking improvements in topics identified as weak for individual learners demonstrates the solution's ability to address personalized learning needs.
- Accessibility and Inclusivity:
Metric: User Distribution Across Supported Languages. Ensuring that users from various linguistic backgrounds are benefiting from the platform demonstrates its inclusivity and effectiveness in overcoming language barriers.
- Offline Learning Adoption:
Metric: Frequency of Offline Learning Usage. Monitoring how often users utilize downloadable notes in offline mode provides insights into the platform's effectiveness in addressing infrastructure challenges.

Solutions to be implemented:
- Voice Search:
Objective: Enable voice-based content access.
- 3D Avatar Implementation:
Objective: Boost engagement with personalized 3D avatars.
- Quizzes and Assignments:
Objective: Comprehensive learning with assessments.
- Courses Recommendation System:
Objective: Personalized course suggestions.
