import requests
import time
topic = input("Enter the topic: ")
question = input("Enter the question: ")
options = []
for i in range(4):
    options.append(input("Enter option #"+str(i+1)+": "))
answer = input("Enter the answer: ")
send_data = str({
    "topic": topic,
    "question": question,
    "options": options,
    "answer": answer
})
ngrok_link = "https://528a-34-70-18-144.ngrok-free.app/"
url = ngrok_link+'run?msg='+send_data
start = time.time()
try:
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()['output']
    else:
        print("Error:", response.status_code)
except requests.RequestException as e:
    print("Request error:", e)
print("Time taken:", time.time()-start)
print("Here's your generated question:")
import json
import re
pattern = r"(?<=\W)'(.*?)'(?=\W)"
output_string = re.sub(pattern, lambda x: f'"{x.group(1)}"', data)
data = json.loads(output_string)
question = data['question']
options = data['options']
answer = data['answer']
print("Question:", question)
ans = "ABCD"
for i in range(4):
    print(ans[i]+".", options[i])
print("Answer:", answer)