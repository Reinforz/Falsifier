import re
import nltk
nltk.download('punkt')
import spacy
import tensorflow as tf
from allennlp.predictors.predictor import Predictor
from nltk import tokenize
from nltk.tree import Tree
from transformers import GPT2Tokenizer, TFGPT2LMHeadModel


class TFGen:
    
    def __init__(self):
        self.predictor = Predictor.from_path("https://s3-us-west-2.amazonaws.com/allennlp/models/elmo-constituency-parser-2018.03.14.tar.gz")
        self.nlp = spacy.load('en_core_web_sm')
        self.GPT2tokenizer = GPT2Tokenizer.from_pretrained("gpt2")
        self.GPT2model = TFGPT2LMHeadModel.from_pretrained("gpt2",pad_token_id=self.GPT2tokenizer.eos_token_id)

        
            
    def generate_TF(self, payload):

        inp = {
            "input_text": payload.input_text,
        }

        test_sentence = inp['input_text']
        

        # test_sentence = payload
        test_sentence = test_sentence.rstrip('?:!.,;')
        parser_output = self.predictor.predict(sentence=test_sentence)
        tree_string = parser_output["trees"]
        tree = Tree.fromstring(tree_string)
        # print(tree)

        last_nounphrase, last_verbphrase =  self.get_right_most_VP_or_NP(tree)
        # print(last_nounphrase,last_verbphrase)
        last_nounphrase_flattened = self.get_flattened(last_nounphrase)
        last_verbphrase_flattened = self.get_flattened(last_verbphrase)
        longest_phrase_to_use = max(last_nounphrase_flattened, last_verbphrase_flattened,key = len)
        longest_phrase_to_use = re.sub(r"-LRB- ", "(", longest_phrase_to_use)
        longest_phrase_to_use = re.sub(r" -RRB-", ")", longest_phrase_to_use)


        split_sentence = self.get_termination_portion(test_sentence, longest_phrase_to_use)
        print ("Original sentence after splitting at ending phrase: ",split_sentence)
        partial_sentence = split_sentence
        input_ids = self.GPT2tokenizer.encode(partial_sentence,return_tensors='tf')
        maximum_length = len(partial_sentence.split())+40
        
        sample_outputs = self.GPT2model.generate(
            input_ids, 
            do_sample=True, 
            max_length=maximum_length, 
            top_p=0.80, 
            top_k=30,   
            repetition_penalty  = 10.0,
            num_return_sequences=10
        )

        generated_sentences=[]

        for i, sample_output in enumerate(sample_outputs):
            decoded_sentence = self.GPT2tokenizer.decode(sample_output, skip_special_tokens=True)
            final_sentence = tokenize.sent_tokenize(decoded_sentence)[0]
            generated_sentences.append(final_sentence)
            # print (i,": ",final_sentence)
       
                
        return generated_sentences
      
    def get_flattened(self,t):
        sent_str_final = None
        if t is not None:
            sent_str = [" ".join(x.leaves()) for x in list(t)]
            sent_str_final = [" ".join(sent_str)]
            sent_str_final = sent_str_final[0]
        return sent_str_final

    def get_right_most_VP_or_NP(self,parse_tree,last_NP = None,last_VP = None):
        if len(parse_tree.leaves()) == 1:
            return last_NP,last_VP
        last_subtree = parse_tree[-1]
        if last_subtree.label() == "NP":
            last_NP = last_subtree
        elif last_subtree.label() == "VP":
            last_VP = last_subtree
        
        return self.get_right_most_VP_or_NP(last_subtree,last_NP,last_VP)

    def get_termination_portion(self,main_string, sub_string):
        combined_sub_string = sub_string.replace(" ", "")
        main_string_list = main_string.split()
        last_index = len(main_string_list)
        for i in range(last_index):
            check_string_list = main_string_list[i:]
            check_string = "".join(check_string_list)
            check_string = check_string.replace(" ", "")
            if check_string == combined_sub_string:
                return " ".join(main_string_list[:i])

        return None


# TF=TFGen()
# output=TF.generate_TF("Old lady was sitting in a chair.")
# print(output)