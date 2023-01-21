
outFile = open("output.txt", "w")

#slicing up final_labels.csv
inFile = open("final_labels.csv", "r")
inFile.nextLine
newLine = ""
for line in inFile:
    lineItems = line.strip().split(",")
    count = 0
    for item in lineItems:
        if count == 6 or count == 12:
            newLine += item + ","
        count += 1
    outFile.write(newLine +"\n")


    




    