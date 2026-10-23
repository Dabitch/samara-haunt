#!/usr/bin/env python3
"""
Publish delayed Samara messages to an ntfy topic.

Usage:
  python publish.py                  # uses default topic
  python publish.py my-secret-topic  # custom topic

Requires: requests  (pip install requests)
"""

import sys
import time
import requests

TOPIC = sys.argv[1] if len(sys.argv) > 1 else "samara-haunt"
BASE = "https://ntfy.sh"

# (delay, title, message)
# Spread across one day, at least 30 minutes apart.
MESSAGES = [
    ("30m",  "The screen is on",       "She's watching."),
    ("1h30m", "Don't open the fridge", "Samara is waiting."),
    ("3h",   "Check the hallway",      "3:33 is closer than you think."),
    ("5h",   "Still there",            "You left the light on."),
    ("8h",   "Look behind you",        "The well is closer than it appears."),
    ("12h",  "Samara",                 "Seven days."),
    ("18h",  "The well",               "She never left."),
    ("23h",  "Almost",                 "Tomorrow she tries again."),
]

def send(delay: str, title: str, message: str):
    url = f"{BASE}/{TOPIC}"
    headers = {
        "Title": title,
        "Priority": "high",
        "Tags": "ghost,warning",
        "Delay": delay,          # ntfy holds the message
        "Click": "https://ntfy.sh/" + TOPIC,
    }
    r = requests.post(url, data=message.encode(), headers=headers, timeout=15)
    r.raise_for_status()
    print(f"queued [{delay}] {title}")

if __name__ == "__main__":
    print(f"Publishing to topic: {TOPIC}")
    for delay, title, body in MESSAGES:
        send(delay, title, body)
        time.sleep(0.3)  # be nice to the server
    print("All messages queued.")
