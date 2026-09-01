def encodeSubstitutionCipher(msg, key):
    key = key.upper()

    if len(key) != 26 or not key.isalpha():
        raise ValueError("Key must contain exactly 26 letters.")

    newMsg = ''

    for char in msg:
        if char.isalpha():
            index = ord(char.upper()) - ord('A')
            encoded = key[index]

            if char.isupper():
                newMsg += encoded
            else:
                newMsg += encoded.lower()
        else:
            newMsg += char

    return newMsg


def decodeSubstitutionCipher(msg, key):
    key = key.upper()

    if len(key) != 26 or not key.isalpha():
        raise ValueError("Key must contain exactly 26 letters.")

    decodeMsg = ''

    for char in msg:
        if char.isalpha():
            index = key.find(char.upper())

            if index == -1:
                raise ValueError("Character not found in substitution key.")

            decoded = chr(ord('A') + index)

            if char.isupper():
                decodeMsg += decoded
            else:
                decodeMsg += decoded.lower()
        else:
            decodeMsg += char

    return decodeMsg