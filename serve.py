#!/usr/bin/env python3
"""
Локальный сервер для просмотра сайта на своём компьютере.
На хостинге красивые URL (/calculator, /repair) обрабатывает Apache.
Этот скрипт делает то же самое локально: /calculator → calculator.html.

Запуск:   python3 serve.py
Открыть:  http://localhost:8000/
Стоп:     Ctrl+C
"""

import os
from http.server import HTTPServer, SimpleHTTPRequestHandler

PORT = 8000
PUBLIC = os.path.join(os.path.dirname(os.path.abspath(__file__)), "public")


class CleanURLHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=PUBLIC, **kwargs)

    def do_GET(self):
        path = self.path.split("?")[0].split("#")[0].lstrip("/")
        full = os.path.join(PUBLIC, path)

        if path and not os.path.exists(full):
            candidate = full + ".html"
            if os.path.isfile(candidate):
                self.path = "/" + path + ".html"

        super().do_GET()


if __name__ == "__main__":
    server = HTTPServer(("localhost", PORT), CleanURLHandler)
    print(f"http://localhost:{PORT}/")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nСервер остановлен.")
