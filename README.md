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
