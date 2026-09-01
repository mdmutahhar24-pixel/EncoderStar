def convertToASCII(msg):
    newWord = ''
    for i in msg:
        newWord += str(ord(i)) + ' '

    return newWord.strip()


def deconstructASCII(msg):
    newWord = ''

    for i in msg.split():
        newWord += chr(int(i))

    return newWord