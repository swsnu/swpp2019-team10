from django.apps import AppConfig
import stanfordnlp

class FoodbookApiConfig(AppConfig):
    name = 'foodbook_api'
    nlp = stanfordnlp.Pipeline()
