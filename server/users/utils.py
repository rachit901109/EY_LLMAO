from dotenv import load_dotenv
import os
import openai
import ast
from openai import OpenAI

load_dotenv()

# os.environ['OPENAI_API_KEY'] = userdata.get('OPENAI_API_KEY')
# openai.api_key = os.getenv('OPENAI_API_KEY')
openai.api_key = os.environ.get('OPENAI_API_KEY')



def generate_module_summary(topic,level):
    prompt_module_generation = """You are an educational chatbot named ISAAC. \
You will be provided with a topic and your task is to generate 4-6 module names \
that are related to the topic and a brief summary on each module. \
Make sure that each Module name should not be a subset of any other modules. \
The difficulty and level of the modules that are generated should be of  'Beginner Level'. \
The output should be in json format where each key corresponds to the complete module name and the \
values are the brief summary of that module.
```
Topic: {topic}
```"""
    client = OpenAI()
    completion = client.chat.completions.create(
                model = 'gpt-3.5-turbo-1106',
                messages = [
                    {'role':'user', 'content': prompt_module_generation.format(topic = topic)},
                ],
                response_format = {'type':'json_object'},
                seed = 42
    )

    output = ast.literal_eval(completion.choices[0].message.content)

    return output


# change according to rate limit of openai
def generate_submodules(module_name):
    prompt_submoodules = """You are an educational chatbot named ISAAC. \
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
                    {'role':'user', 'content': prompt_submoodules.format(module_name = module_name)},
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
title_for_the_content, content, subsections (which is a list of dictionaries with the keys - title and content) and urls.
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

        all_content.append(ast.literal_eval(completion.choices[0].message.content))
    return all_content