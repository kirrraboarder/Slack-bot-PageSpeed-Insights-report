import requests
import json
import random

# Set up the API endpoint and authentication headers
url = 'https://api.rytr.me/v1/rytr'
headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer X-MEJ5EUWGHWSRIWHS83T'
}

# Define possible prompts and output lengths
prompts = ['Write a blog post about the benefits of meditation.', 
           '5 tips for staying productive while working from home', 
           'The future of technology in education', 
           'Why travel is important for personal growth']
output_lengths = [3, 5, 7, 10]

# Choose a random prompt and output length
prompt = random.choice(prompts)
output_length = random.choice(output_lengths)

# Set up the request payload with the desired input and output settings
payload = {
    'input': {
        'text': prompt
    },
    'output': {
        'format': 'blog_post',
        'tone': 'informative',
        'language': 'english',
        'length': output_length
    }
}

# Send the request to the API and parse the response
response = requests.post(url, headers=headers, data=json.dumps(payload))
data = json.loads(response.text)

# Print the generated blog post
print(data['data']['output']['text'])
