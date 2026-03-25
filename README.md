Install the dependencies with the following command:

First create a virtual environment,
    
    python -m venv .venv

Activate the virtual env:

    #Windows:

        source .\.venv\Scripts\activate

    #Linux:

        source .venv/bin/activate

Install the modules with:
    
    pip install -r requirements.txt

Run the project with the following command (if using uv):

    uv run fastapi dev main.py

else use,

    fastapi dev main.py



