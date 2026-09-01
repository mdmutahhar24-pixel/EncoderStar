import streamlit as st
from encodersAndDecoders import ASCII
import streamlit.components.v1 as components

def copy_button(text):
    components.html(
        f"""
        <button
            onclick="navigator.clipboard.writeText({text!r})"
            style="
                padding: 8px 16px;
                border: none;
                border-radius: 6px;
                cursor: pointer;
                font-size: 14px;
            "
        >
            Copy
        </button>
        """,
        height=50
    )

st.set_page_config(
    page_title="EncodeStar | Encoder",
    page_icon="logo.png",
    layout="wide"
)

st.title("Encoder", text_alignment='center')

mode = st.pills("Encoder Mode", ["ASCII"], default='ASCII')

with st.form("Encoder"):
    if (mode == 'ASCII'):
        message = st.text_area("Message", placeholder="Enter a message")

    encode = st.form_submit_button("Encode")

if (encode):
    if (mode == 'ASCII'):
        result = ASCII.convertToASCII(message)

    st.text_area("Output", value=result, disabled=True)

    copy_button(result)