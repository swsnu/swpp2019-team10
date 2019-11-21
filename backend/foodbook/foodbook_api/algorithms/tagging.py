import spacy
from textblob import TextBlob
from stanfordnlp.server import CoreNLPClient
class Tagging():
    def is_word(self, node):
        if len(node.child)==0:
            return True
        else:
            return False
    def is_leaf(self, node):
        if len(node.child)==1 and is_word(node.child[0]):
            return True
        else:
            return False

    def check_negation(self, word, negation_words, dict_of_adj):
        for n in negation_words:
            if dict_of_adj[word]==n.source:
                return 'not '
        return ''
    def sample(self, tree, negation_words, dict_of_adj):
        sentiment_sen=[]
        """
        if is_leaf(tree):
            if tree.value=="JJ":
                negation=check_negation(tree.child[0], negation_words, dict_of_adj)
                sentiment_adj.append(negation+tree.child[0].value)
        """
        for ch in tree.child:
            sentiment_sen += sample(ch, negation_words, dict_of_adj)
        if tree.value=="S":
            s=generate_string_for_sentiment(tree)
            content = TextBlob(s)
            sentence = content.sentences[0]
            polarity = sentence.sentiment.polarity
            sentiment_sen.append((s, polarity))
        return sentiment_sen
    def generate_string_for_sentiment(self, tree):
        if is_word(tree):
            if tree.value=="n't":
                return "not "
            return tree.value+' '
        s=''
        for ch in tree.child:
            s = s + generate_string_for_sentiment(ch)
        return s
    def tagging(self, text):
        with CoreNLPClient(start_server=False, annotators=['tokenize', 'ssplit', 'pos', 'lemma', 'parse', 'depparse'], timeout=60000, memory='16G') as client:
            # submit the request to the server
            ann = client.annotate(text)
            # get the first sentence
            sentences = ann.sentence
            list_of_sent=[]
            for sentence in sentences:
                dict_of_adj = {}
                list_of_adj = []
                list_of_adj_prop = []
                for i, t in enumerate(sentence.token):
                    if t.pos == "JJ":
                        dict_of_adj[t.word] = i+1
                        list_of_adj.append(t.word)
                        list_of_adj_prop.append(t.word)
                negs = []
                for edg in sentence.basicDependencies.edge:
                    if edg.dep == "neg":
                        negs.append(edg)
                for i, word in enumerate(list_of_adj):
                    negation = check_negation(word, negs, dict_of_adj)
                    list_of_adj_prop[i] = negation+list_of_adj[i]
                parse = sentence.parseTree
                phrases = sample(parse, negs, dict_of_adj)
                for i, word in enumerate(list_of_adj):
                    for p in phrases:
                        if word in p[0]:
                            found=False
                            for prop in list_of_sent:
                                if list_of_adj_prop[i] == prop[0]:
                                    prop[1]+=p[1]
                                    prop[2]+=1
                                    found=True
                            if not found:
                                list_of_sent.append(
                                    (list_of_adj_prop[i], p[1], 1))
                            break
            res={}
            for prop in list_of_sent:
                res[prop[0]]=prop[1]/prop[2]
            print(res)
            ret = {}
            i = 0
            for item in res.keys():
                ret[item] = res[item]
                i += 1
                if i == 5:
                    break
            print(ret)
            return ret
                
