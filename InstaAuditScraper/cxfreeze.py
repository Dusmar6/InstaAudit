from cx_Freeze import setup, Executable

executables = [
    Executable('flask_server.py')
]

setup(name='exe_app',
      version='0.1', 
      description='Flask exe',
      executables=executables)