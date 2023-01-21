
outFile = open("output.txt", "w")
outFile.write("message,isMisogynistic" + "\n")

#slicing up final_labels.csv
inFile = open("final_labels.csv", "r")
inFile.readline()
newLine = ""
for line in inFile:
    lineItems = line.strip().split(",")
    if len(lineItems) < 7:
        continue
    if lineItems[-6] != "Nonmisogynistic" and lineItems[-6] != "Misogynistic":
        continue
    if len(lineItems[6]) > 1 and lineItems[6][0] == "\"":
        lineItems[6] = lineItems[6][1:]

    if lineItems[-6] == "Nonmisogynistic":
        newLine += lineItems[6] + "," + "False"
    else:
        newLine += lineItems[6] + "," + "True"
    outFile.write(newLine +"\n")
    newLine = ""
inFile.close()

inFile = open("sexism_data.csv", "r")
inFile.readline()
newLine = ""
for line in inFile:
    lineItems = line.strip().split(",")
    if len(lineItems) < 5:
        continue
    newLine += lineItems[2] + "," + lineItems[-2]
    outFile.write(newLine + "\n")
    newLine = ""
inFile.close()

    




    