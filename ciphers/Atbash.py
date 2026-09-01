def encodeAtbashCipher(msg, shift=0):
    newWord = ""

    for char in msg:
        if char.isalpha():
            if char.isupper():
                base = ord('A')
            else:
                base = ord('a')

            newWord += chr((25 - (ord(char) - base) + shift) % 26 + base)
        else:
            newWord += char

    return newWord

def decodeAtbashCipher(msg, shift):
    return encodeAtbashCipher(msg, -shift)
