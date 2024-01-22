from dotenv import load_dotenv
import os
import openai
import ast
from openai import OpenAI
import time
from tavily import TavilyClient
from reportlab.lib.pagesizes import letter
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Image
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.units import mm
from serpapi import GoogleSearch


load_dotenv()

openai_api_key1 = os.environ.get('OPENAI_API_KEY1')
openai_api_key2 = os.environ.get('OPENAI_API_KEY2')
openai_api_key3 = os.environ.get('OPENAI_API_KEY3')
google_serp_api_key = os.environ.get('GOOGLE_SERP_API_KEY')

tavily_api_key = os.environ.get('TAVILY_API_KEY')


def generate_module_summary(topic,level):
    prompt_module_generation = """You are an educational chatbot named ISAAC. \
You will be provided with a topic and your task is to generate 4-6 module names \
that are related to the topic and a brief summary on each module. \
Make sure that each Module name should not be a subset of any other modules. \
The difficulty and level of the modules that are generated should be of  '{level}'. \
The output should be in json format where each key corresponds to the complete module name and the \
values are the brief summary of that module.
```
Topic: {topic}
```"""
    client = OpenAI(api_key= openai_api_key1)
    completion = client.chat.completions.create(
                model = 'gpt-3.5-turbo-1106',
                messages = [
                    {'role':'user', 'content': prompt_module_generation.format(topic = topic,level=level)},
                ],
                response_format = {'type':'json_object'},
                seed = 42
    )

    output = ast.literal_eval(completion.choices[0].message.content)

    return output

def generate_submodules(module_name):
    prompt_submodules = """You are an educational chatbot named ISAAC. \
You will be provided with a module name and your task is to generate 6 \
'Sub-Modules' names that are related to the modules.  \
The output should be in json format where each key corresponds to the \
sub-module number and the values are the sub-module names.
Module Name: {module_name}
"""
    client = OpenAI(api_key= openai_api_key1)

    completion = client.chat.completions.create(
                model = 'gpt-3.5-turbo-1106',
                messages = [
                    {'role':'user', 'content': prompt_submodules.format(module_name = module_name)},
                ],
                response_format = {'type':'json_object'},
                seed = 42
    )
    output = ast.literal_eval(completion.choices[0].message.content)

    return output

def generate_content(output, api_key_to_use):
    prompt_content_gen = """I'm seeking your expertise on the subject of {sub_module_name}.\
As a knowledgeable and educational chatbot, I'm confident in your ability to provide \
a comprehensive and detailed explanation of this sub-module. Please generate a detailed and \
informative description that covers essential aspects such as definition, \
explanation, use cases, applications, and any other relevant details. \
Ensure that the content exceeds 1000 words to offer a thorough understanding of the topic.

In your response, consider breaking down the information into subsections for clarity and make it detailed, elaborating every subsection. \
If there are specific examples or real-world applications related to the subject, \
please include them to enhance practical understanding. Additionally, conclude your \
response by suggesting relevant URLs for further reading to empower users with \
additional resources on the subject. Make sure your output is a valid json where the keys are the subject_name, \
title_for_the_content, content, subsections (which should be a list of dictionaries with the keys - title and content) and urls (which should be a list).
"""
    all_content = []
    flag = 1 if api_key_to_use== 'first' else (2 if api_key_to_use=='second' else 3 )
    print(f'THREAD {flag} RUNNING...')
    openai_api_key = openai_api_key1 if flag == 1 else(openai_api_key2 if flag == 2 else openai_api_key3)
    for key,val in output.items():

        client = OpenAI(api_key= openai_api_key)

        completion = client.chat.completions.create(
                    model = 'gpt-3.5-turbo-1106',
                    messages = [
                        {'role':'user', 'content': prompt_content_gen.format(sub_module_name = val)},
                    ],
                    response_format = {'type':'json_object'},
                    seed = 42
        )
        print("Thread 1: Module Generated: ",key,"!")   
        print(ast.literal_eval(completion.choices[0].message.content))
        all_content.append(ast.literal_eval(completion.choices[0].message.content))
    return all_content

def generate_module_summary_from_web(topic, level):
    tavily_client = TavilyClient(api_key=tavily_api_key)
    search_result = tavily_client.get_search_context(topic, search_depth="advanced", max_tokens=4000)

    module_generation_prompt = """As an educational assistant, your goal is to craft 4-6 {level} Level \
    educational module names and brief summaries based on a given topic and search results. \
    Ensure the module names are relevant to the topic and provide a concise summary for each. \
    Format the output in JSON, with each key representing a complete module name and its corresponding value being the brief summary.

    Topic: {topic}

    Search Results: {search_result}

    Follow the provided JSON format diligently, incorporating information from the search results into the summaries and ensuring the modules are appropriately {level} in difficulty."""

    client = OpenAI(api_key=openai_api_key1)
    completion = client.chat.completions.create(
            model = 'gpt-3.5-turbo-1106',
            messages = [
                {'role':'user', 'content': module_generation_prompt.format(topic= topic, search_result = search_result, level = level)},
            ],
            response_format = {'type':'json_object'},
            seed = 42,
    )
    output = ast.literal_eval(completion.choices[0].message.content)

    return output

def generate_submodules_from_web(module_name):
    tavily_client = TavilyClient(api_key=tavily_api_key)
    search_result = tavily_client.get_search_context(module_name, search_depth="advanced", max_tokens=4000)

    sub_module_generation_prompt= """You are an educational assistant named ISAAC. \
    You will be provided with a module name and information on that module from the internet.
    Your task is to generate 6 'Sub-Modules' names that are related to the modules.  \
    The output should be in json format where each key corresponds to the \
    sub-module number and the values are the sub-module names.

    Module Name: {module_name}

    Search Results: {search_result}

    Follow the provided JSON format diligently.
    """

    client = OpenAI(api_key=openai_api_key1)
    completion = client.chat.completions.create(
            model = 'gpt-3.5-turbo-1106',
            messages = [
                {'role':'user', 'content': sub_module_generation_prompt.format(module_name = module_name, search_result = search_result)},
            ],
            response_format = {'type':'json_object'},
            seed = 42,
    )
    output = ast.literal_eval(completion.choices[0].message.content)
    return output

def generate_content_from_web(sub_module_name, api_key_to_use):
    content_generation_prompt = """I'm seeking your expertise on the subject of {sub_module_name}.\
    You have access to the subject's information which you have to use while generating \ 
    a detailed and informative description that covers essential aspects such as definition, \
    explanation, use cases, applications, and any other relevant details. \
    Ensure that the content exceeds 800 words to offer a thorough understanding of the topic.

    SUBJECT INFORMATION : {search_result}

    In your response, consider breaking down the information into subsections for clarity. \
    If there are specific examples or real-world applications related to the subject, \
    please include them to enhance practical understanding. Additionally, conclude your \
    response by suggesting relevant URLs for further reading to empower users with \
    additional resources on the subject. Make sure your output is a valid json where the keys are the subject_name, \
    title_for_the_content, content, subsections (which should be a list of dictionaries with the keys - title and content) and urls (which should be a list).
    """
    flag = 1 if api_key_to_use== 'first' else (2 if api_key_to_use=='second' else 3 )
    print(f'THREAD {flag} RUNNING...')
    openai_api_key = openai_api_key1 if flag == 1 else(openai_api_key2 if flag == 2 else openai_api_key3)
    all_content = []
    tavily_client = TavilyClient(api_key=tavily_api_key)
    for key, val in sub_module_name.items():    
        print('Searching content for module:', key)
        search_result = tavily_client.get_search_context(val, search_depth="advanced", max_tokens=4000)
        client = OpenAI(api_key=openai_api_key)
        completion = client.chat.completions.create(
                model = 'gpt-3.5-turbo-1106',
                messages = [
                    {'role':'user', 'content': content_generation_prompt.format(sub_module_name = val, search_result = search_result)},
                ],
                response_format = {'type':'json_object'},
                seed = 42,
        )
        print('Module Generated:', key, '!')
        output = ast.literal_eval(completion.choices[0].message.content)
        print(output)
        all_content.append(output)
    return all_content

def generate_content_from_web_three(sub_module_name):
    content_generation_prompt = """I'm seeking your expertise on the subject of {sub_module_name}.\
    You have access to the subject's information which you have to use while generating \ 
    a detailed and informative description that covers essential aspects such as definition, \
    explanation, use cases, applications, and any other relevant details. \
    Ensure that the content exceeds 800 words to offer a thorough understanding of the topic.

    SUBJECT INFORMATION : {search_result}

    In your response, consider breaking down the information into subsections for clarity. \
    If there are specific examples or real-world applications related to the subject, \
    please include them to enhance practical understanding. Additionally, conclude your \
    response by suggesting relevant URLs for further reading to empower users with \
    additional resources on the subject. Make sure your output is a valid json where the keys are the subject_name, \
    title_for_the_content, content, subsections (which should be a list of dictionaries with the keys - title and content) and urls.
    """
    print('THREAD 3 RUNNING...')
    all_content = []
    tavily_client = TavilyClient(api_key=tavily_api_key)
    for key, val in sub_module_name.items():    
        print('Searching content for module:', key)
        search_result = tavily_client.get_search_context(val, search_depth="advanced", max_tokens=4000)
        client = OpenAI(api_key=openai_api_key3)
        completion = client.chat.completions.create(
                model = 'gpt-3.5-turbo-1106',
                messages = [
                    {'role':'user', 'content': content_generation_prompt.format(sub_module_name = val, search_result = search_result)},
                ],
                response_format = {'type':'json_object'},
                seed = 42,
        )
        print('Module Generated:', key, '!')
        output = ast.literal_eval(completion.choices[0].message.content)
        print(output)
        all_content.append(output)
        time.sleep(25)

    return all_content

def trending_module_summary_from_web(domain):
    query = 'Latest Techniques introduced in the field of ' + domain
    tavily_client = TavilyClient(api_key=tavily_api_key)
    search_result = tavily_client.get_search_context(query, search_depth="advanced", max_tokens=4000)
    module_generation_prompt = """As an educational assistant, your goal is to craft 4-6 \
  educational module names and brief summaries based on the search results. \
  Ensure the module names are relevant and provide a concise summary for each. \
  The summary should highlight the key aspects of the modules in a way that interests the students into learning them.
  Format the output in JSON, with each key representing a complete module name and its corresponding value being the brief summary.

Search Results: {search_result}

Follow the provided JSON format diligently, incorporating information from the search results into the summaries.
"""
    client = OpenAI(api_key=openai_api_key1)
    completion = client.chat.completions.create(
            model = 'gpt-3.5-turbo-1106',
            messages = [
                {'role':'user', 'content': module_generation_prompt.format(search_result = search_result)},
            ],
            response_format = {'type':'json_object'},
            seed = 42,
)
    output = ast.literal_eval(completion.choices[0].message.content)
    
    return output

def module_image_from_web(module):
    params = {
    "q": module,
    "engine": "google_images",
    "ijn": "0",
    "api_key": google_serp_api_key
    }

    search = GoogleSearch(params)
    results = search.get_dict()
    image_results = results["images_results"]
    image_links = [i['original'] for i in image_results[:10]]
    return image_links


def generate_pdf(pdf_file_path, modulename, module_summary, submodule_content, src_lang):
    # Register Unicode fonts
    pdfmetrics.registerFont(TTFont('NotoSansDevanagari', 'Fonts/NotoSansDevanagari-Regular.ttf'))
    pdfmetrics.registerFont(TTFont('DejaVuSansCondensed', 'Fonts/DejaVuSansCondensed.ttf'))

    # Create a PDF document
    pdf = SimpleDocTemplate(pdf_file_path, pagesize=letter)

    # Define styles for different headings and content
    styles = {
        'Heading1': ParagraphStyle(name='Heading1', fontName='DejaVuSansCondensed', fontSize=16, spaceAfter=16, spaceBefore=16, bold=True),
        'Heading2': ParagraphStyle(name='Heading2', fontName='DejaVuSansCondensed', fontSize=14, spaceAfter=14, spaceBefore=14),
        'Heading3': ParagraphStyle(name='Heading3', fontName='DejaVuSansCondensed', fontSize=12, spaceAfter=12, spaceBefore=12),
        'Devanagari_Heading1': ParagraphStyle(name='Devanagari_Heading1', fontName='NotoSansDevanagari', fontSize=16, spaceAfter=16, spaceBefore=16, bold=True),
        'Devanagari_Heading2': ParagraphStyle(name='Devanagari_Heading2', fontName='NotoSansDevanagari', fontSize=14, spaceAfter=14, spaceBefore=14, bold=True),
        'Devanagari_Heading3': ParagraphStyle(name='Devanagari_Heading3', fontName='NotoSansDevanagari', fontSize=12, spaceAfter=12, spaceBefore=12, bold=True),
        'Normal': ParagraphStyle(name='Normal', fontName='DejaVuSansCondensed', fontSize=8, spaceAfter=8, spaceBefore=8),
        'URL': ParagraphStyle(name='URL', textColor=colors.blue, underline=True, spaceAfter=8),
    }

    # Build the PDF document
    content = [
        Image('LLMAO/src/assets/images/logo.png', width=440, height=237),
        Paragraph("Disclaimer: This content is generated by AI.", styles['Heading3']),
        Paragraph(modulename, styles['Heading1' if src_lang == 'en' else 'Devanagari_Heading1']),
        Paragraph("Module Summary:", styles['Heading2' if src_lang == 'en' else 'Devanagari_Heading2']),
        Paragraph(module_summary, styles['Heading3' if src_lang == 'en' else 'Devanagari_Heading3']),
    ]

    # Add submodule content
    for entry in submodule_content:
        content.append(Paragraph(entry['subject_name'], styles['Heading2' if src_lang == 'en' else 'Devanagari_Heading2']))
        content.append(Paragraph(entry['title_for_the_content'], styles['Heading3' if src_lang == 'en' else 'Devanagari_Heading3']))
        content.append(Paragraph(entry['content'], styles['Heading3' if src_lang == 'en' else 'Devanagari_Heading3']))

        # Check if there are subsections
        if 'subsections' in entry:
            for subsection in entry['subsections']:
                content.append(Paragraph(subsection['title'], styles['Heading2' if src_lang == 'en' else 'Devanagari_Heading2']))
                content.append(Paragraph(subsection['content'], styles['Heading3' if src_lang == 'en' else 'Devanagari_Heading3']))
        
        # Check if there are URLs
        if 'urls' in entry:
            content.append(Paragraph("Reference:", styles['Heading3']))
            for url in entry['urls']:
                content.append(Paragraph(url, styles['URL']))

    pdf.build(content, onFirstPage=add_page_number, onLaterPages=add_page_number)

def add_page_number(canvas, docs):
    # Add page numbers
    page_num = canvas.getPageNumber()
    text = "Page %d" % page_num
    canvas.drawRightString(200*mm, 20*mm, text)


def generate_quiz(sub_modules):
    quiz_prompt = """As an educational chatbot named ISSAC, your task is to create a set of 10 theoretical quiz questions \
with multiple-choice options that should cover all the sub-modules. The questions should be theoretical-based and difficult to \
efficiently test the theoretical knowledge of the student. \
Ensure that the output is a valid JSON format, with a single 'quizData' which is a list of dictionaries structured as follows:
```
  "question": "The question here",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correct_option": "The correct option string here."
  "explanation": "Explanation for Question 1"

  ...[and so on]
```

Create a set of 10 quiz questions following the above-mentioned format.
```
Sub Modules : {sub_modules}
```
"""
    client = OpenAI(api_key=openai_api_key1)
    completion = client.chat.completions.create(
                model = 'gpt-3.5-turbo-1106',
                messages = [
                    {'role':'user', 'content': quiz_prompt.format(sub_modules = sub_modules)},
                ],
                response_format = {'type':'json_object'},
                seed = 42
    )
    
    print(completion.choices[0].message.content)
    output = ast.literal_eval(completion.choices[0].message.content)
    
    return output

def generate_quiz_from_web(sub_modules):
    tavily_client = TavilyClient(api_key=os.environ["TAVILY_API_KEY"])
    search_result = tavily_client.get_search_context(','.join(sub_modules), search_depth="advanced", max_tokens=4000)

    quiz_prompt_for_web = """As an educational chatbot named ISAAC, your task is to create a set of 10 theoretical quiz questions \
with multiple-choice options that should cover all the sub-modules. You will be given information from the internet related to the sub-modules. \
Use this information to create the quiz questions. The questions should be theoretical-based and difficult to \
efficiently test the theoretical knowledge of the student. \

Sub Modules : {sub_modules}

Search Result = {search_result}


Ensure that the output is a valid JSON format, with a single 'quizData' which is a list of dictionaries structured as follows:
```
  "question": "The question here",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correct_option": "The correct option string here."
  "explanation": "Explanation for Question 1"

  ...[and so on]
```

Create a set of 10 quiz questions following the above-mentioned format.

"""

    client = OpenAI(api_key=openai_api_key1)
    completion = client.chat.completions.create(
                model = 'gpt-3.5-turbo-1106',
                messages = [
                    {'role':'user', 'content': quiz_prompt_for_web.format(sub_modules = sub_modules, search_result = search_result)},
                ],
                response_format = {'type':'json_object'},
                seed = 42
    )
    
    print(completion.choices[0].message.content)
    output = ast.literal_eval(completion.choices[0].message.content)

    return output

def generate_applied_quiz(sub_modules):
    quiz_prompt = """As an educational chatbot named ISSAC, your task is to create a set of 10 creative \
        and application-based quiz questions with multiple-choice options that should be based on the sub-modules \
        as well as any related sub-topic. Create questions in a scenario-based manner like the ones in a word problem \
        or applied problems (starting with 'suppose...', 'imagine...', 'if...' or 'let's say...') to efficiently test the understanding of concepts and principles to solve real-world \
        or hypothetical situations based on the sub modules. The questions should be descriptive and lengthy to give \
        a complete scenario to the student. \
        Ensure that the output is a valid JSON format, with a single 'quizData' which is a list of dictionaries structured as follows:
```
  "question": "The question here",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correct_option": "The correct option string here."
  "explanation": "Explanation for Question 1"

  ...[and so on]
```

Create a set of 10 quiz questions that are in the described manner and follow the above-mentioned format.

Sub Modules : {sub_modules}
"""
    client = OpenAI(api_key=openai_api_key1)
    completion = client.chat.completions.create(
                model = 'gpt-3.5-turbo-1106',
                messages = [
                    {'role':'user', 'content': quiz_prompt.format(sub_modules = sub_modules)},
                ],
                response_format = {'type':'json_object'},
                seed = 42
    )

    print(completion.choices[0].message.content)
    output = ast.literal_eval(completion.choices[0].message.content)

    return output

def generate_applied_quiz_from_web(sub_modules):
    tavily_client = TavilyClient(api_key=os.environ["TAVILY_API_KEY"])
    search_result = tavily_client.get_search_context(','.join(sub_modules), search_depth="advanced", max_tokens=4000)
    quiz_prompt_for_web = """
    As an educational chatbot named ISAAC, your task is to create a diverse set of 10 creative and application-based quiz questions \
with multiple-choice options that should be based on the sub-modules. You will be given information from the internet related to the sub-modules. \
Use this information to create the quiz questions.

Sub Modules : {sub_modules}

Search Result = ```{search_result}```


Create questions in a scenario-based manner like the ones in a word problem or applied problems
to efficiently test the understanding of concepts and principles to solve real-world or hypothetical situations based on the sub modules. \
The questions should be descriptive and should provide hypothetical scenarios to give a complete scenario to the student. \

Ensure that the output is a valid JSON format, with a single 'quizData' which is a list of dictionaries structured as follows:
```
  "question": "The question here",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correct_option": "The correct option string here."
  "explanation": "Explanation for Question 1"

  ...[and so on]
```

Create a set of 10 questions that follow the described manner and the above-mentioned format.
"""
    client = OpenAI(api_key=openai_api_key1)
    completion = client.chat.completions.create(
                model = 'gpt-3.5-turbo-1106',
                messages = [
                    {'role':'user', 'content': quiz_prompt_for_web.format(sub_modules = sub_modules, search_result = search_result)},
                ],
                response_format = {'type':'json_object'},
                seed = 42
    )

    print(completion.choices[0].message.content)
    output = ast.literal_eval(completion.choices[0].message.content)
    
    return output

def generate_conversation_quiz(sub_modules):
    quiz_prompt = """You are an educational examiner and your task is to ask various conceptual questions to a student(asking them to explain or elaborate their answers) \
based on the specified list of topics. \
Imagine as if you are talking to the student while asking the questions.
Ensure that the output is a valid JSON format, with the keys being the question number and values being the questions.

Create a set of 10 concept-based quiz questions in the above-mentioned format.
```
Sub Modules : {sub_modules}
```
"""
    client = OpenAI(api_key=openai_api_key1)
    completion = client.chat.completions.create(
                model = 'gpt-3.5-turbo-1106',
                messages = [
                    {'role':'user', 'content': quiz_prompt.format(sub_modules = sub_modules)},
                ],
                response_format = {'type':'json_object'},
                seed = 42
    )

    print(completion.choices[0].message.content)
    output = ast.literal_eval(completion.choices[0].message.content)
    output_list = list(output.values())

    return output_list

def generate_conversation_quiz_from_web(sub_modules):
    tavily_client = TavilyClient(api_key=os.environ["TAVILY_API_KEY"])
    search_result = tavily_client.get_search_context(','.join(sub_modules), search_depth="advanced", max_tokens=4000)
    quiz_prompt = """You are an educational examiner and your task is to ask various conceptual questions to a student (asking them to explain or elaborate their answers) \
based on the specified list of topics. \
Imagine as if you are talking to the student while asking the questions. You will be given information from the internet related to the sub-modules. \
Use this information to create the questions.

Sub Modules : ```{sub_modules}```

Search Result = ```{search_result}```

Ensure that the output is a valid JSON format, with the keys being the question number and values being the questions.

Create a set of 10 concept-based quiz questions in the above-mentioned format.

"""
    client = OpenAI(api_key=openai_api_key1)
    completion = client.chat.completions.create(
                model = 'gpt-3.5-turbo-1106',
                messages = [
                    {'role':'user', 'content': quiz_prompt.format(sub_modules = sub_modules, search_result = search_result)},
                ],
                response_format = {'type':'json_object'},
                seed = 42
    )

    print(completion.choices[0].message.content)
    output = ast.literal_eval(completion.choices[0].message.content)
    output_list = list(output.values())

    return output_list

def evaluate_conversation_quiz(question_and_response):
    questions = [list(i.keys())[0] for i in question_and_response]
    answers = [list(i.values())[0] for i in question_and_response]
    evaluation_prompt = """ You are a strict grader. You will be given a set of questions asked by an examiner along with the corresponding set of answers that \
    was given by the student. Your task is to provide an overall grade to the specified parameters for the answers on a scale of 1 to 10, \
    with 0 being very bad and 10 being the best. \
    You are supposed to provide an aggregate score to all the answers at once. Don't score each answer separately. The description of the parameters is provided to you. \
    Here is the description of the parameters:
```
Accuracy: The answer should be accurate and correct, with no factual errors or misunderstandings.
Completeness: The answer should cover all the relevant aspects of the question and provide a comprehensive response.
Clarity: The answer should be clear and easy to understand, with well-organized thoughts and ideas. If the question is technical, technical terms should be preferred.
Relevance: The answer should stay focused on the question and not include irrelevant information or tangents.
Understanding: The answer should demonstrate a deep understanding of the topic, with thoughtful analysis and insights.
```

List of questions asked by the examiner: ```{questions}```
Corresponding list of answers: ```{answers}```

Please provide a strict overall score to the parameters accordingly as well as feedback to the user on the parts they can improve on. If the answers are short and incomplete \
provide a low score in the respective parameters and give an appropriate feedback. Also, specify the questions in case the user gave a wrong answer to it.

Make sure your output is a valid json where the keys are the accuracy, \
completeness, clarity, relevance, understanding and feedback.
"""
    client = OpenAI(api_key=openai_api_key1)
    completion = client.chat.completions.create(
                model = 'gpt-3.5-turbo-1106',
                messages = [
                    {'role':'user', 'content': evaluation_prompt.format(questions = questions, answers = answers)},
                ],
                response_format = {'type':'json_object'},
                seed = 42
    )

    print(completion.choices[0].message.content)
    output = ast.literal_eval(completion.choices[0].message.content)

    return output

def generate_conversation_quiz(sub_modules):
    quiz_prompt = """You are an educational examiner and your task is to ask various conceptual questions to a student(asking them to explain or elaborate their answers) \
based on the specified list of topics. \
Imagine as if you are talking to the student while asking the questions.
Ensure that the output is a valid JSON format, with the keys being the question number and values being the questions.

Create a set of 5 concept-based quiz questions in the above-mentioned format.
```
Sub Modules : {sub_modules}
```
"""
    client = OpenAI(api_key=openai_api_key1)
    completion = client.chat.completions.create(
                model = 'gpt-3.5-turbo-1106',
                messages = [
                    {'role':'user', 'content': quiz_prompt.format(sub_modules = sub_modules)},
                ],
                response_format = {'type':'json_object'},
                seed = 42
    )

    print(completion.choices[0].message.content)
    output = ast.literal_eval(completion.choices[0].message.content)
    output_list = list(output.values())

    return output_list

def generate_conversation_quiz_from_web(sub_modules):
    tavily_client = TavilyClient(api_key=os.environ["TAVILY_API_KEY"])
    search_result = tavily_client.get_search_context(','.join(sub_modules), search_depth="advanced", max_tokens=4000)
    quiz_prompt = """You are an educational examiner and your task is to ask various conceptual questions to a student (asking them to explain or elaborate their answers) \
based on the specified list of topics. \
Imagine as if you are talking to the student while asking the questions. You will be given information from the internet related to the sub-modules. \
Use this information to create the questions.

Sub Modules : ```{sub_modules}```

Search Result = ```{search_result}```

Ensure that the output is a valid JSON format, with the keys being the question number and values being the questions.

Create a set of 5 concept-based quiz questions in the above-mentioned format.

"""
    client = OpenAI(api_key=openai_api_key1)
    completion = client.chat.completions.create(
                model = 'gpt-3.5-turbo-1106',
                messages = [
                    {'role':'user', 'content': quiz_prompt.format(sub_modules = sub_modules, search_result = search_result)},
                ],
                response_format = {'type':'json_object'},
                seed = 42
    )

    print(completion.choices[0].message.content)
    output = ast.literal_eval(completion.choices[0].message.content)
    output_list = list(output.values())

    return output_list

def evaluate_conversation_quiz(question_and_response):
    questions = [list(i.keys())[0] for i in question_and_response]
    answers = [list(i.values())[0] for i in question_and_response]
    evaluation_prompt = """ You are a strict grader. You will be given a set of questions asked by an examiner along with the corresponding set of answers that \
    was given by the student. Your task is to provide an overall grade to the specified parameters for the answers on a scale of 1 to 10, \
    with 0 being very bad and 10 being the best. \
    You are supposed to provide an aggregate score to all the answers at once. Don't score each answer separately. The description of the parameters is provided to you. \
    Here is the description of the parameters:
```
Accuracy: The answer should be accurate and correct, with no factual errors or misunderstandings.
Completeness: The answer should cover all the relevant aspects of the question and provide a comprehensive response.
Clarity: The answer should be clear and easy to understand, with well-organized thoughts and ideas. If the question is technical, technical terms should be preferred.
Relevance: The answer should stay focused on the question and not include irrelevant information or tangents.
Understanding: The answer should demonstrate a deep understanding of the topic, with thoughtful analysis and insights.
```

List of questions asked by the examiner: ```{questions}```
Corresponding list of answers: ```{answers}```

Please provide a strict overall score to the parameters accordingly as well as feedback to the user on the parts they can improve on. If the answers are short and incomplete \
provide a low score in the respective parameters and give an appropriate feedback. Also, specify the questions in case the user gave a wrong answer to it.

Make sure your output is a valid json where the keys are the accuracy, \
completeness, clarity, relevance, understanding and feedback.
"""
    client = OpenAI(api_key=openai_api_key1)
    completion = client.chat.completions.create(
                model = 'gpt-3.5-turbo-1106',
                messages = [
                    {'role':'user', 'content': evaluation_prompt.format(questions = questions, answers = answers)},
                ],
                response_format = {'type':'json_object'},
                seed = 42
    )

    print(completion.choices[0].message.content)
    output = ast.literal_eval(completion.choices[0].message.content)

    return output