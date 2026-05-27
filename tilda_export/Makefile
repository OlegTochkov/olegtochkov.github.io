# cleanlogic.by build commands
# Usage: make build | make check | make serve | make deploy-preview

PYTHON = .venv/bin/python3
PORT   = 8000

.PHONY: build check serve install help

## build  — render all pages from src/ templates into public/
build:
	$(PYTHON) build.py

## check  — verify routes, sitemap, links and assets after build
check: build
	$(PYTHON) check.py

## serve  — build then start a local preview server at http://localhost:8000
serve: build
	@echo "Preview at http://localhost:$(PORT)/"
	$(PYTHON) -m http.server $(PORT) --directory public

## install — set up Python virtual env and install dependencies
install:
	python3 -m venv .venv
	.venv/bin/pip install jinja2 pillow --quiet
	@echo "Done. Run 'make build' to build the site."

help:
	@grep -E '^## ' Makefile | sed 's/## /  make /'
