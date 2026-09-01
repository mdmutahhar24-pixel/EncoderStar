def encodeCeasarCipher(msg, shift):
    newWord = ''
    for i in range(len(msg)):
        if(msg[i].isalpha()):
            if(msg[i].isupper()):
                base = 65
            else:
                base = 97
            newWord += chr((ord(msg[i]) - base + shift) % 26 + base)
        else:
            newWord += msg[i]
    return newWord

def decodeCeasarCipher(msg, shift):
    return encodeCeasarCipher(msg, -shift)
