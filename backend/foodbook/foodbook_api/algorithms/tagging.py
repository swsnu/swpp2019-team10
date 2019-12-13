import os
import re
from foodbook_api.apps import FoodbookApiConfig
# import stanfordnlp
# from foodbook_api.algorithms import config
from stanfordnlp.pipeline.doc import Word
from azure.cognitiveservices.language.textanalytics import TextAnalyticsClient
from msrest.authentication import CognitiveServicesCredentials

SYNONYMS = {
    'sweet': ['sweet', 'sugary', 'sugared', 'honeyed', 'candied', 'syrupy', 'treacly', 'cloying', 'bittersweet'],
    'salty': ['salty', 'salt', 'salted', 'saline', 'briny', 'brackish', 'piquant', 'tangy'],
    'umami': ['umami', 'meaty', 'savory'],
    'bitter': ['bitter', 'sharp', 'bittersweet'],
    'sour': ['sour', 'acid', 'acidy', 'acidic', 'sharp', 'acidulated'],
    'crispy': ['crispy', 'crunchy', 'crackling', 'crisp', 'crumbly', 'crusty'],
    'moist': ['moist','watery', 'juicy'],
    'greasy': ['greasy', 'oily'],
    'tender': ['tender','soft', 'creamy', 'juicy'],
    'cooked': ['cooked'],
    'spicy': ['hot', 'piquant', 'tangy', 'peppery', 'picante', 'spiced', 'spice', 'seasoned'],
}
ANTONYMS = {
    'sweet': ['savoury'],
    'salty': ['bland'],
    'umami': [],
    'bitter': [],
    'sour': [],
    'crispy': ['soggy'],
    'moist': ['dry', 'tough'],
    'greasy': [],
    'tender': ['tough', 'dry'],
    'cooked': ['raw'],
    'spicy': ['bland'],
}
NAGATION = ['not', 'less']
EMPHASIS = ['so', 'too', 'certainly', 'absolutely', 'completely']
class Tagging:
    def __init__(self, profile, menu, rating, is_post):
        self.profile = profile
        self.menu = menu
        self.rating = rating
        self.is_post = is_post
    def check_enviroment(self):
        key_var_name = 'TEXT_ANALYTICS_SUBSCRIPTION_KEY'
        # os.environ["TEXT_ANALYTICS_SUBSCRIPTION_KEY"] = config.api_key  #execute this if you want to set ennv variable
        if not key_var_name in os.environ:
            raise Exception(
                'Please set/export the environment variable: {}'.format(key_var_name))
        subscription_key_var = os.environ[key_var_name]

        endpoint_var_name = 'TEXT_ANALYTICS_ENDPOINT'
        # os.environ["TEXT_ANALYTICS_ENDPOINT"] = config.api_endpoint  #execute this if you want to set ennv variable
        if not endpoint_var_name in os.environ:
            raise Exception(
                'Please set/export the environment variable: {}'.format(endpoint_var_name))
        endpoint_var = os.environ[endpoint_var_name]
        return (subscription_key_var, endpoint_var)

    def authenticateClient(self):
        subscription_key, endpoint = self.check_enviroment()
        credentials = CognitiveServicesCredentials(subscription_key)
        text_analytics_client = TextAnalyticsClient(
            endpoint=endpoint, credentials=credentials)
        return text_analytics_client

    def sentiment(self, sentences):

        client = self.authenticateClient()
        documents = []
        ids = 0
        for sent in sentences:
            words = [i.text for i in sent.words]
            documents.append({"id": ids, "language": "en",
                              "text": self.untokenize(words)})
            ids += 1
        try:
            response = client.sentiment(documents=documents)
            return response.documents
            """
            for document in response.documents:
                print("Document Id: ", document.id, ", Sentiment Score: ",
                    "{:.2f}".format(document.score))
                print(document)
            """
        except Exception as err:
            print("Encountered exception. {}".format(err))

    def untokenize(self, words):
        """
        Untokenizing a text undoes the tokenizing operation, restoring
        punctuation and spaces to the places that people expect them to be.
        Ideally, `untokenize(tokenize(text))` should be identical to `text`,
        except for line breaks.
        """
        text = ' '.join(words)
        step1 = text.replace("`` ", '"').replace(
            " ''", '"').replace('. . .',  '...')
        step2 = step1.replace(" ( ", " (").replace(" ) ", ") ")
        step3 = re.sub(r' ([.,:;?!%]+)([ \'"`])', r"\1\2", step2)
        step4 = re.sub(r' ([.,:;?!%]+)$', r"\1", step3)
        step5 = step4.replace(" '", "'").replace(" n't", "n't").replace(
            "can not", "cannot")
        step6 = step5.replace(" ` ", " '")
        return step6.strip()

    def update_models(self, tags):
        ret = {}
        cal_element = {}
        for i in SYNONYMS.keys():
            ret[i]=[0,0]
            cal_element[i] = 0
        for adj in tags:
            for i in ret.keys():
                if adj.name.lemma in SYNONYMS[i]:
                    if adj.advmod is not None and adj.advmod.lemma in NAGATION:
                        ret[i][0] += (1 - adj.sentiment / adj.count)
                        ret[i][1] += 1
                        cal_element[i] -= 1
                    else:
                        ret[i][0] += adj.sentiment / adj.count
                        ret[i][1] += 1
                        cal_element[i] += (3 if i in EMPHASIS else 1)
                elif adj.name.lemma in ANTONYMS[i]:
                    if adj.advmod is not None and adj.advmod.lemma in NAGATION:
                        ret[i][0] += adj.sentiment / adj.count
                        ret[i][1] += 1
                        cal_element[i] += 1
                    else:
                        ret[i][0] += (1 - adj.sentiment / adj.count)
                        ret[i][1] += 1
                        cal_element[i] -= (3 if i in EMPHASIS else 1)
        res = {}
        for i in ret.keys():
            if ret[i][1] == 0:
                res[i] = 0.5
            else:
                res[i] = ret[i][0] / ret[i][1]
        for i in res.keys():
            self.profile.taste[i] = (
                self.profile.taste[i] * self.profile.count_write + (res[i] * (2 * (self.rating-1))-(self.rating-1))) / (self.profile.count_write + 1)
            self.menu.taste[i] = (
                self.menu.taste[i] * self.menu.num_of_review + cal_element[i]) / (self.menu.num_of_review + 1)
        if self.is_post:
            self.profile.count_write += 1
            self.menu.num_of_review += 1
        self.profile.save()
        self.menu.save()

    def tagging(self, text):
        list_of_tags = self.tagging_for_recommend(text)
        self.update_models(list_of_tags)
        res = {}
        for tag in list_of_tags:
            if tag.advmod == None:
                res[tag.name.lemma] = tag.sentiment / tag.count
            else:
                res[tag.advmod.lemma + ' ' + tag.name.lemma] = tag.sentiment / tag.count
        r = sorted(res.items(), key=(lambda x: abs(x[1])), reverse=True)
        ret = {}
        i = 0
        for item in res.keys():
            ret[item] = res[item]
            i += 1
            if i == 5:
                break
        return ret

    def tagging_for_recommend(self, text):
        doc = FoodbookApiConfig.nlp(text)
        print(doc.text)
        sentiments = self.sentiment(doc.sentences)
        list_of_tag = []
        for index, sentence in enumerate(doc.sentences):
            list_of_adj = [None for word in sentence.words]
            for word in sentence.words:
                if word.upos == 'ADJ' or word.xpos == 'VBN':
                    list_of_adj[int(word.index)-1] = Adjative(word,
                                                              sentiment=sentiments[index].score)
            for dep_edge in sentence.dependencies:
                if dep_edge[1] == 'advmod' and list_of_adj[int(dep_edge[0].index)-1] is not None:
                    list_of_adj[int(dep_edge[0].index) -
                                1].set_advmod(dep_edge[2])
            for adj in list_of_adj:
                if adj is None:
                    continue
                is_update = False
                for i, tag in enumerate(list_of_tag):
                    if adj == tag:
                        list_of_tag[i].update_word(adj)
                        is_update = True
                if not is_update:
                    list_of_tag.append(adj)
        return list_of_tag
        """
        for dep_edge in doc.sentences[1].dependencies:
            print((dep_edge[0].text, dep_edge[1], dep_edge[2].text))
        """


class Adjative:
    def __init__(self, name: Word, advmod: Word, sentiment: float):
        self.name = name
        self.advmod = advmod
        self.sentiment = sentiment
        self.count = 1

    def __init__(self, name: Word, sentiment: float):
        self.name = name
        self.advmod = None
        self.sentiment = sentiment
        self.count = 1

    def __eq__(self, value):
        if self.advmod is None:
            return self.name.lemma == value.name.lemma
        return self.name.lemma == value.name.lemma and self.advmod.lemma == value.advmod.lemma

    def set_advmod(self, advmod: Word):
        self.advmod = advmod

    def update_word(self, new_word):
        self.count += new_word.count
        self.sentiment += new_word.sentiment

    def __str__(self):
        if self.advmod is None:
            return self.name.text
        return self.advmod.text+' '+self.name.text
