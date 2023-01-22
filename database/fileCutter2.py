inFile = open("testFile.txt","r")
outFile = open("testOutput.txt","w")

testSet = set()

for line in inFile:
    curWrite = ""
    newLine = line.strip().rsplit(",",1)
    if newLine[0] not in testSet:
        curWrite += str(newLine[0]) + ","
        newLine[0] = newLine[0].replace(",","")
        if newLine[1] == "0":
            curWrite += "False\n"
        elif newLine[1] == "1":
            curWrite += "True\n"
        testSet.add(line.strip())
        outFile.write(curWrite)