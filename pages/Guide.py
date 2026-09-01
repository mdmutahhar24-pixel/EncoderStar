import streamlit as st

st.title("Guide to Current Ciphers (on this website)", text_alignment="center")

st.divider()

st.subheader("Caesar's Cipher")

st.text("Caesar's Cipher is a cipher that works by converting all the letters into ASCII numbers, then shifting that number and converting back to a letter. For example, Hello! with a shift of 3 should spit out Khoor! Decoding Caesar's cipher just encodes your message with a negative shift. For example, Khoor! with a shift of 3 (which will automatically turn into -3) will return Hello! Although tedious, this form of cipher can be converted back easily, due to how advanced technology is in the modern age.")

st.divider()

st.subheader("Substitution Cipher")

st.text("Substitution Cipher is a cipher that works by using a key to act as the 'Alphabet' for the message. What that means is that ABCDEFGHIJKLMNO... turns into SDEFJ....(Out of order ABC's). Decoding works similarly. Examples: Hello! with key: DRGXHJAWCFSOYBQIUKMVLTZEPN turns into Whooq! Decoding needs the original key to turn the crypted message back. This is more secure than Caesar's Cipher, but still has risks.")

st.divider()

st.subheader("Atbash Cipher")

st.text("Atbash Cipher is a cipher that is the opposite of Caesar's cipher. Instead of shifting the message using the alphabets in normal order, Atbash cipher shifts the alphabets starting from Z instead of A. This is more secure than Caesar's Cipher, but less secure than Substitution Cipher.")

st.divider()

st.title("Guide to Current Encodings (on this website)", text_alignment='center')

st.subheader("ASCII")

st.text("ASCII is pretty simple. It is an official system that assigns a number to each letter, symbol, number, etc. This system primarily exists because computers only read in numbers (1's and 0's). The whole process behind how 1's and 0's (also known as binary) form to make larger numbers is a bit more complex. Look up a guide for this.")