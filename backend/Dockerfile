# Përdorim një imazh të Python-it
FROM python:3.9-slim

# Vendosim folderin e punës
WORKDIR /app

# Kopjojmë skedarët në container
COPY requirements.txt .

# Instalojmë varësitë
RUN pip install -r requirements.txt

# Kopjojmë kodin
COPY . .

# Startimi i aplikacionit
CMD ["gunicorn", "app:app"]
