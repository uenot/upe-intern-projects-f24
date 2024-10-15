# Install all dependencies for both frontend and backend
install:
	cd server && pip install -r requirements.txt
	cd client && npm install

# Run the Flask server and React frontend concurrently
run:
	cd server && flask run &
	cd client && npm start

# Clean up any Python or npm cache or unnecessary files
clean:
	cd server && find . -name '__pycache__' -type d -exec rm -r {} +
	cd client && rm -rf node_modules
