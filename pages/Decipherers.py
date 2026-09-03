import streamlit as st
import streamlit.components.v1 as components
from ciphers import subsitution, generateKey, ceasars, Atbash


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
    page_title="EncodeStar | Decipher",
    page_icon="logo.png",
    layout="wide"
)

st.title("Decipher", text_alignment="center")


mode = st.pills(
    "Decipher Mode",
    ["Caesar's", "Substitution", "Atbash"],
    default="Caesar's"
)


# Store the generated substitution key
if "generated_key" not in st.session_state:
    st.session_state.generated_key = ""


with st.form("Cipher"):

    message = st.text_area(
        "Message",
        placeholder="Enter message here"
    )

    if mode == "Caesar's":

        shift = st.number_input(
            "Shift",
            min_value=0,
            max_value=25,
            value=3,
            step=1,
            format="%d"
        )

    elif mode == "Substitution":

        key = st.text_input(
            "Key",
            placeholder="Enter Key",
            value=st.session_state.generated_key
        )

    elif mode == "Atbash":
    
            shift = st.number_input(
                "Shift",
                min_value=0,
                max_value=25,
                value=3,
                step=1,
                format="%d"
            )

    encode = st.form_submit_button("Decipher")

if encode:

    if mode == "Caesar's":

        result = ceasars.decodeCeasarCipher(
            message,
            shift
        )

    elif mode == "Substitution":

        result = subsitution.decodeSubstitutionCipher(
            message,
            key
        )

    elif (mode == "Atbash"):
        result = Atbash.decodeAtbashCipher(message, shift)

    st.text_area(
        "Output",
        value=result,
        disabled=True
    )

    copy_button(result)