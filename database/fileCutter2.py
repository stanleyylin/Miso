inFile = open("testFile.txt","r")
outFile = open("output.txt","w")
outFile.write("message,isMisogynistic" + "\n")

testSet = set()

for line in inFile:
    curWrite = ""
    newLine = line.strip().rsplit(",",1)
    if newLine[0] not in testSet:
        newLine[0] = newLine[0].replace(","," ")
        if newLine[1] == "0":
            curWrite += newLine[0] +","+ "False\n"
        elif newLine[1] == "1":
            curWrite += newLine[0] +","+ "True\n"
        testSet.add(line.strip())
        
        outFile.write(curWrite)