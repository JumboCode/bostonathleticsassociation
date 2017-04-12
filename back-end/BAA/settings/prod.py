from .common import *
import dj_database_url

# Settings for production environment
DEBUG = False

# Update database configuration with $DATABASE_URL.
db_from_env = dj_database_url.config(conn_max_age=500)
DATABASES['default'].update(db_from_env)


# Simplified static file serving.
# https://warehouse.python.org/project/whitenoise/

STATICFILES_STORAGE = 'whitenoise.django.GzipManifestStaticFilesStorage'

ALLOWED_HOSTS = ['floating-castle-71814.herokuapp.com']         # apparently you need to have this

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['console'],
            'level': os.getenv('DJANGO_LOG_LEVEL', 'ERROR'),
        },
    },
}

EMAIL_BACKEND = 'postmark.django_backend.EmailBackend'

POSTMARK_API_KEY     = os.getenv('POSTMARK_API_KEY')
POSTMARK_SENDER      = 'baattendance@baa.com'
POSTMARK_TEST_MODE   = True        # We can use this to just to see the json
POSTMARK_TRACK_OPENS = False
