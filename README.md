## EY Techathon 4.0
### Team Name: LLMAO Domain - Education:<br>
### Problem statement:
Transforming Education with Generative AI: Personalized Learning and Intelligent Tutoring Rani, a student from a village in Kerala, is struggling to get back to her education following the delay caused by the pandemic. While the government announced online classes, language remained a huge constraint. As eager Rani is to resume her studies, infrastructure and accessibility issues are becoming impediments for her.
Student’s challenge: Develop apps or solutions with AI-powered content generation capabilities, automated grading systems or virtual tutors for individualized student support. Alternatively, suggest solutions led by generative AI to help students retain information better and learn at their own pace

#### Semi-Finale prototype presented on 17/1/2024-<br>
Our solution offered the platform of **Mindcraft**, which is developed considering the various obstacles encountered by students residing in remote regions, such as Rani. MindCraft emphasizes inclusiveness and offers innovative features for diverse learning needs. Solutions offered by Mindcraft:<br>
- Multilingual support: 12 different languages supported: english, hindi, marathi, gujrati, bengali, tamil, telegu, annada, malayalam, spanish, french & german 
- Multi modal content generation: Along with textual content we also provide images and audio(in all 12 languages) files of content to cater to their learning preferences. 
- ISSAC(Intelligent System for Academic Assistance and Coaching): a text based and voice enabled chatbot interface which serves as a personalized tutor.
- Quiz System: User understanding of topic is evaluated by a 'theory quiz', 'applied knowledge quiz' and a 'verbal quiz',
- Reward System & Learning Material: Users can enhance their engagement by earning medals and trophies for completing courses and attaining a certain score. Additionally, they can download topic-specific notes to facilitate learning at any time.

### Tech Stack:
![techstack](https://github.com/rachit901109/EY_LLMAO/assets/110279690/b4bd78e7-9309-4c92-b000-9f7d77b6cb5c)
<br>
### Build the Project:
**Steps to run project:**
1. Clone the repository:
```bash
cd User/clone_dir
git clone "https://github.com/rachit901109/EY_LLMAO.git"
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
Create two *.env* files in server and server/users. Add a *SECRECT_KEY* to server env file. Add your api keys for openai, tavily and serpapi. Replace api keys in below commands
```bash
cd server && touch .env && echo "SECRET_KEY=secret_key" | cat > .env
cd users && touch .env
echo "OPENAI_API_KEY=yourkey" | cat >> .env && echo "TAVILY_API_KEY=yourkey" | cat >> .env && echo "GOOGLE_SERP_API_KEY"=yourkey | cat >> .env
```
**Tavily api key is only required if you want to enable web search for content generation model.**<br>
Finally to land on our home page click the link present on the client  server or visit `http://localhost:5173/`.

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
- 3D Avatar Implementation for ISSAC.
- Improving course recommendations.
- Sharability of courses and quiz scores.
- Increasing language support for generating offline notes.

Images:
![Picture1](https://github.com/rachit901109/EY_LLMAO/assets/110279690/7db1c5cd-a260-4038-9b89-04f2d8530baa)
![Picture2](https://github.com/rachit901109/EY_LLMAO/assets/110279690/778aa23b-3bee-43e3-b8d5-5ddf01bb3c71)
<br>
PDF files of generated content:<br>
![gencontent1](https://github.com/rachit901109/EY_LLMAO/assets/110279690/63fbb754-a6b7-4e08-86bf-08fdcb37dc6f)
![gencontent2](https://github.com/rachit901109/EY_LLMAO/assets/110279690/ccd6a726-afd2-45d7-9511-1e536a3d39c9)

