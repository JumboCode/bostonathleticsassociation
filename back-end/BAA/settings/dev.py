from .common import *
import os

# Settings for development
DEBUG = True
ALLOWED_HOSTS = [
    '127.0.0.1',
    'localhost'
]

# !!! Do not commit secret keys, use environment variables
EMAIL_USE_TLS = True
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_HOST_USER = 'baattendence@gmail.com'
EMAIL_HOST_PASSWORD = os.getenv('EMAIL_PASS')
EMAIL_PORT = 587