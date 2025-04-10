# Përdorim një imazh bazë për Python
FROM python:3.9-slim

# Krijojmë një folder për aplikacionin
WORKDIR /app

# Kopjojmë skedarët e kërkuar në konteiner
COPY requirements.txt /app/

# Instalojmë varësitë e nevojshme
RUN pip install --no-cache-dir -r requirements.txt

# Kopjojmë të gjithë skedarët e aplikacionit në konteiner
COPY . /app/

# Ekspozimi i portit që Flask përdor
EXPOSE 5000

# Komanda për të startuar aplikacionin
CMD ["python", "app.py"]
