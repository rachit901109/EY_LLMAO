## EY Techathon 4.0
### Team Name: LLMAO Domain - Education:<br>
### Problem statement:
Transforming Education with Generative AI: Personalized Learning and Intelligent Tutoring Rani, a student from a village in Kerala, is struggling to get back to her education following the delay caused by the pandemic. While the government announced online classes, language remained a huge constraint. As eager Rani is to resume her studies, infrastructure and accessibility issues are becoming impediments for her.
Student’s challenge: Develop apps or solutions with AI-powered content generation capabilities, automated grading systems or virtual tutors for individualized student support. Alternatively, suggest solutions led by generative AI to help students retain information better and learn at their own pace

#### Semi-Finale prototype presented on 17/1/2024-<br>
Our solution offered the platform of **Mindcraft**, which is developed considering the various obstacles encountered by students residing in remote regions, such as Rani. MindCraft emphasizes inclusiveness and offers innovative features for diverse learning needs. Solutions offered by Mindcraft:<br>
- **Multilingual support**: 12 different languages supported: english, hindi, marathi, gujrati, bengali, tamil, telegu, annada, malayalam, spanish, french & german 
- **Multi modal content generation**: Along with textual content we also provide images and audio(in all 12 languages) files of content to cater to their learning preferences. 
- **ISSAC(Intelligent System for Academic Assistance and Coaching)**: a text based and voice enabled chatbot interface which serves as a personalized tutor.
- **Quiz System**: User understanding of topic is evaluated by a 'theory quiz', 'applied knowledge quiz' and a 'verbal quiz',
- **Reward System & Learning Material**: Users can enhance their engagement by earning medals and trophies for completing courses and attaining a certain score. Additionally, they can download topic-specific notes to facilitate learning at any time.

### Tech Stack:
- Frontend: React, TypeScript, Vite, ChakraUI
- Backend: Flask
- GenAI: OpenAI, Langchain, Tavily
- Utility: Deeptranslator, GTTS, Lingua
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
python3 app.py
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

Solutions to be implemented:
- 3D Avatar Implementation for ISSAC.
- Improving course recommendations.
- Sharability of courses and quiz scores.
- Increasing language support for generating offline notes.

Images:
![home2](https://github.com/rachit901109/EY_LLMAO/assets/110279690/41f29151-5d84-422a-be3e-03f9e35e0d31)
![home3](https://github.com/rachit901109/EY_LLMAO/assets/110279690/7daddd7a-6e18-4a41-97ea-650682ed62d9)
![explore_mr](https://github.com/rachit901109/EY_LLMAO/assets/110279690/fd9a0da4-9237-4c99-923c-d6f985a2a677)
![module_mr](https://github.com/rachit901109/EY_LLMAO/assets/110279690/309e65e3-ca11-4312-964f-9914677622fc)
![quiz_mr](https://github.com/rachit901109/EY_LLMAO/assets/110279690/03079e07-9fa8-452f-9cb4-ca4748a07083)
![trending](https://github.com/rachit901109/EY_LLMAO/assets/110279690/ac9e457b-900d-47b3-9727-51969fd0cba0)

