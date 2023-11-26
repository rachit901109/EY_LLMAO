from dotenv import load_dotenv
import os
import openai
import ast
from openai import OpenAI
import time
from weasyprint import HTML
from jinja2 import Template
from tavily import TavilyClient

load_dotenv()

openai.api_key = os.environ.get('OPENAI_API_KEY')


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
    client = OpenAI()
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
You will be provided with a module name and your task is to generate 4-6 \
'Sub-Modules' names that are related to the modules.  \
The output should be in json format where each key corresponds to the \
sub-module number and the values are the sub-module names.
Module Name: {module_name}
"""
    client = OpenAI()
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

def generate_content(output):
    prompt_content_gen = """I'm seeking your expertise on the subject of {sub_module_name}\
As a knowledgeable and educational chatbot, I'm confident in your ability to provide \
a comprehensive overview of this sub-module. Please generate a detailed and \
informative description that covers essential aspects such as definition, \
explanation, use cases, applications, and any other relevant details. \
Ensure that the content exceeds 400 words to offer a thorough understanding of the topic.

In your response, consider breaking down the information into subsections for clarity. \
If there are specific examples or real-world applications related to the subject, \
please include them to enhance practical understanding. Additionally, conclude your \
response by suggesting relevant URLs for further reading to empower users with \
additional resources on the subject. Make sure your output is a valid json where the keys are the subject_name, \
title_for_the_content, content, subsections (which is a list of dictionaries with the keys - title and content) and urls (should be a list ).
"""
    all_content = []
    for key,val in output.items():
        client = OpenAI()
        completion = client.chat.completions.create(
                    model = 'gpt-3.5-turbo-1106',
                    messages = [
                        {'role':'user', 'content': prompt_content_gen.format(sub_module_name = val)},
                    ],
                    response_format = {'type':'json_object'},
                    seed = 42
        )
        print("Module Generated: ",key,"!")   
        print(ast.literal_eval(completion.choices[0].message.content))
        all_content.append(ast.literal_eval(completion.choices[0].message.content))
        time.sleep(25)
    return all_content

def generate_module_summary_from_web(topic, level):
    tavily_client = TavilyClient(api_key=os.environ.get("TAVILY_API_KEY"))
    search_result = tavily_client.get_search_context(topic, search_depth="advanced", max_tokens=4000)
    print('SEARCH RESULTS:', search_result)

    module_generation_prompt = """As an educational assistant, your goal is to craft 4-6 {level} Level \
    educational module names and brief summaries based on a given topic and search results. \
    Ensure the module names are relevant to the topic and provide a concise summary for each. \
    Format the output in JSON, with each key representing a complete module name and its corresponding value being the brief summary.

    Topic: {topic}

    Search Results: {search_result}

    Follow the provided JSON format diligently, incorporating information from the search results into the summaries and ensuring the modules are appropriately {level} in difficulty."""

    client = OpenAI()
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
    tavily_client = TavilyClient(api_key=os.environ.get("TAVILY_API_KEY"))
    search_result = tavily_client.get_search_context(module_name, search_depth="advanced", max_tokens=4000)
    print('SEARCH RESULTS:', search_result)

    sub_module_generation_prompt= """You are an educational assistant named ISAAC. \
    You will be provided with a module name and information on that module from the internet.
    Your task is to generate 4-6 'Sub-Modules' names that are related to the modules.  \
    The output should be in json format where each key corresponds to the \
    sub-module number and the values are the sub-module names.

    Module Name: {module_name}

    Search Results: {search_result}

    Follow the provided JSON format diligently.
    """

    client = OpenAI()
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

def generate_content_from_web(sub_module_name):
    content_generation_prompt = """I'm seeking your expertise on the subject of {sub_module_name}.\
    You have access to the subject's information which you have to use while generating \ 
    a detailed and informative description that covers essential aspects such as definition, \
    explanation, use cases, applications, and any other relevant details. \
    Ensure that the content exceeds 400 words to offer a thorough understanding of the topic.

    SUBJECT INFORMATION : {search_result}

    In your response, consider breaking down the information into subsections for clarity. \
    If there are specific examples or real-world applications related to the subject, \
    please include them to enhance practical understanding. Additionally, conclude your \
    response by suggesting relevant URLs for further reading to empower users with \
    additional resources on the subject. Make sure your output is a valid json where the keys are the subject_name, \
    title_for_the_content, content, subsections (which is a list of dictionaries with the keys - title and content) and urls.
    """

    all_content = []
    for key, val in sub_module_name.items():    
        tavily_client = TavilyClient(api_key=os.environ.get("TAVILY_API_KEY"))
        print('Searching content for module:', key)
        search_result = tavily_client.get_search_context(sub_module_name, search_depth="advanced", max_tokens=4000)
        client = OpenAI()
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
    query = 'Trending topics in ' + domain
    tavily_client = TavilyClient(api_key=os.environ.get("TAVILY_API_KEY"))
    search_result = tavily_client.get_search_context(query, search_depth="advanced", max_tokens=4000)
    module_generation_prompt = """As an educational assistant, your goal is to craft 4-6 \
  educational module names and brief summaries based on the search results. \
  Ensure the module names are relevant and provide a concise summary for each. \
  Format the output in JSON, with each key representing a complete module name and its corresponding value being the brief summary.

Search Results: {search_result}

Follow the provided JSON format diligently, incorporating information from the search results into the summaries.
"""
    client = OpenAI()
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

def generate_pdf(pdf_file_path, modulename, module_summary, module_content):
    # Load the HTML template
    template_str = """
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {
                font-family: 'Noto Sans Kannada',Arial Unicode MS', 'Arial', sans-serif;
            }
            .module-summary {
                font-weight: bold;
                margin-bottom: 20px;
            }
            .module-content {
                margin-bottom: 20px;
            }
            .subject-name {
                font-weight: bold;
            }
            .content-title {
                font-weight: bold;
                margin-top: 10px;
            }
            .subsections {
                margin-left: 20px;
            }
            .urls {
                color: blue;
                text-decoration: underline;
            }
        </style>
    </head>
    <body>
        <div class="module-summary">
            <h1>{{ modulename }}</h1>
            {% for title, summary in module_summary.items() %}
                <p><strong>{{ title }}</strong>: {{ summary }}</p>
            {% endfor %}
        </div>
        
        {% for entry in module_content %}
            <div class="module-content">
                <div class="subject-name">{{ entry['subject_name'] }}</div>
                <div class="content-title">{{ entry['title_for_the_content'] }}</div>
                <div class="content">{{ entry['content'] }}</div>
                
                {% if 'subsections' in entry %}
                    <div class="subsections">
                        {% for subsection in entry['subsections'] %}
                            <p><strong>{{ subsection['title'] }}</strong>: {{ subsection['content'] }}</p>
                        {% endfor %}
                    </div>
                {% endif %}
                
                {% if 'urls' in entry %}
                    <div class="urls">
                        <p>URLs:</p>
                        {% for url in entry['urls'] %}
                            <a href="{{ url }}" target="_blank">{{ url }}</a><br>
                        {% endfor %}
                    </div>
                {% endif %}
            </div>
        {% endfor %}
    </body>
    </html>
    """
    template = Template(template_str)

    # Render the template
    html_content = template.render(modulename=modulename, module_summary=module_summary, module_content=module_content)

    # Generate PDF using WeasyPrint
    HTML(string=html_content).write_pdf(pdf_file_path)