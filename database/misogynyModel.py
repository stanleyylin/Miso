import cohere
from cohere.classify import Example

co = cohere.Client('iB2NBRMvpjLHLWjaUGrDL2kLsgtkCiq24xKFksSx') #This is your trial API key


# print('The confidence levels of the labels are: {}'.format(response.classifications))


#takes in a single message as String, returns boolean isMisogynistic,int confidence (% value, eg 95%)
def classifyMessage(message):
    response = co.classify(model='06151efa-9a0a-42bb-b210-10da4bfe20d4-ft',inputs=[message])
    allInfo = str(response.classifications[0]).split(",")
    isMiso = bool(allInfo[0])
    confidence = allInfo[1][allInfo[1].find(":")+2:]
    confidence  = int(float(confidence)*100)
    
    return isMiso,confidence


# def checkMessageHistory(history):
#test

print(classifyMessage("I hate women"))

