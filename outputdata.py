import requests
import json

def retrieve_messages(channelid):
    headers = {
        'authorization':'NTUyOTY0NzcwMzE2MTU2OTY3.G6V1QO.YMqzP469MOROAsObpZC4-JW5SWvKkp88-m74Vc'
    }
    r = requests.get(f'https://discord.com/api/v9/channels/{channelid}/messages', headers=headers)
    jsonn = json.loads(r.text)
    for value in jsonn:
        print(value['content'], '\n')

retrieve_messages('1066238686989127694')
"""
import websocket
import json
import threading
import time

def send_json_request(ws, request):
    ws.send(json.dumps(request))

def recieve_json_response(ws):
    response = ws.recv()
    if response:
        return json.loads(response)

def heartbeat(interval, ws):
    print('Heartbeat begin')
    while True:
        time.sleep(interval)
        heartbeatJSON = {
            "op": 1,
            "d": "null"
        }
        send_json_request(ws, heartbeatJSON)
        print("Heartbeat sent")

ws = websocket.WebSocket()
ws.connect('wss://gateway.discord.gg/?v=6&encording=json')
event = recieve_json_response(ws)

heartbeat_interval = event['d']['heartbeat_interval']/1000
threading._start_new_thread(heartbeat, (heartbeat_interval, ws))

token = 'NTUyOTY0NzcwMzE2MTU2OTY3.G6V1QO.YMqzP469MOROAsObpZC4-JW5SWvKkp88-m74Vc'
payload = {
    'op': 2,
    "d":{
        "token": token,
        "properties":{
            "$os": "windows",
            "$browser":"chrome",
            "$device": 'pc'
        }
    }
}
send_json_request(ws, payload)

while True:
    event = recieve_json_response(ws)

    try:
        print(f"{event['d']['author']['username']}: {event['d']['content']}")
        op_code = event('op')
        if op_code == 11:
            print('heartbeat received')
    except:
        pass"""