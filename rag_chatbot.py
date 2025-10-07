import os
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.schema import HumanMessage

# 1) Configure your key (you can also set GOOGLE_API_KEY in your shell)
os.environ["GOOGLE_API_KEY"] = "Your_API_KEY"

# 2) Instantiate Gemini via the new package
llm = ChatGoogleGenerativeAI(
    model="gemini-2.0-flash",
    temperature=0.7,
)

# 3) Generate a sample
response = llm.predict("Write a short, friendly greeting to someone learning Python.")
print("Model says:", response)

!pip install python-docx --quiet

!pip install langchain
!pip install langchain-community

!pip install pypdf

!pip install -U langchain-google-genai --quiet

!pip install -U faiss-cpu --extra-index-url https://pypi.org/simple --quiet

import os
from docx import Document
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.vectorstores import FAISS
from langchain_google_genai import ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings
from langchain_core.prompts import ChatPromptTemplate
from langchain.vectorstores import FAISS

# STEP 1: Load PDFs
pdf_dir = "/content/data"
all_docs = []

for fname in os.listdir(pdf_dir):
    full_path = os.path.join(pdf_dir, fname)
    if not os.path.isfile(full_path) or not fname.lower().endswith(".pdf"):
        continue

    try:
        loader = PyPDFLoader(full_path)
        docs = loader.load()
        all_docs.extend(docs)
    except Exception as e:
        print(f"Failed to load {fname}: {e}")

# STEP 2: Chunk the documents
splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
chunks = splitter.split_documents(all_docs)

# STEP 3: Create Embeddings & Vectorstore
gemini_api_key = "YOUR_API_KEY" 

embedding = GoogleGenerativeAIEmbeddings(model="models/embedding-001", google_api_key=gemini_api_key)
vectordb = FAISS.from_documents(chunks, embedding)

# STEP 4: Load the .docx template and identify placeholders
template_path = "/content/case_study_document_raw_template.docx"
doc = Document(template_path)

placeholder_questions = {
    "[Size]": "What is the size of the block trade?",
    "[Transaction Type]": "What type of transaction is this (e.g., block trade, follow-on offering)?",
    "[Company Full Name]": "What is the full legal name of the company involved?",
    "[Company Short Name]": "What is the short name or ticker symbol of the company?",
    "[primary/secondary]": "Is the offering primary or secondary?",
    "[Selling Shareholder(s)]": "Who are the selling shareholders involved in the transaction?",
    "[Role]": "What role is Barclays bidding for in the transaction (e.g., lead left, co-manager)?",
    "[Bid Date]": "What is the date Barclays will bid on the trade?",
    "[Trade Date]": "On what date will the transaction be completed?",
    "[Underwriter/Auditor Name]": "Who is acting as the auditor or underwriter for this transaction?",
    "[Company Counsel Name]": "Who is acting as the company's legal counsel?",
    "[Underwriter/Auditor Counsel Name]": "Who is acting as the underwriters' legal counsel?",

    "[Information about company's business overview along with it's founding date and headquarter information. Briefly mention the company's primary market, the regions it operates in and its competitive position within industry]":
        "Give a business overview of the company including its founding year, headquarters, primary markets, geographic reach, and competitive positioning.",

    "[Information about the comapny's products, services, or solutions. List the solutions, products, services by name. Highlight flagship products, differentiating factors that make the offerings unique or competitive]":
        "List the company’s products and services. Highlight key products, solutions, or differentiators that make them unique or competitive.",

    "[Information about the company’s latest revenue and profitability metrics (e.g. net profit or loss). Provide key revenue metrics, key performance indicators and growth trends]":
        "Summarize the company's financial performance: revenue, profit/loss, KPIs, and recent growth trends."
}


# STEP 5: Setup Gemini (or Bison if still on v1beta)
llm = ChatGoogleGenerativeAI(
    model="gemini-2.0-flash",  # ✅ Gemini uses v1 (not v1beta)
    temperature=0.7,
    google_api_key=gemini_api_key
)

system = "You are a helpful assistant. Answer the user's query using the given context. Do NOT guess. If the context is insufficient, just say so."

human = """Answer the following question based on the given context:
{question}

Context:
{context}
"""

prompt = ChatPromptTemplate.from_messages([
    ("system", system),
    ("human", human)
])

chain = prompt | llm

# STEP 6: Loop through placeholders, run search + LLM, and replace
for paragraph in doc.paragraphs:
    for placeholder, question in placeholder_questions.items():
        if placeholder in paragraph.text:
            # Search relevant docs
            search_docs = vectordb.max_marginal_relevance_search(question, k=4)
            context = "\n\n".join(doc.page_content for doc in search_docs)

            # Run LLM
            try:
                result = chain.invoke({"question": question, "context": context})
                answer = result.content.strip()

                # Replace generic fallback with dash
                if "i'm sorry" in answer.lower() or "i cannot" in answer.lower() or len(answer) < 3:
                    answer = "—"

            except Exception as e:
                answer = "—"

            # Replace placeholder with generated answer
            paragraph.text = paragraph.text.replace(placeholder, answer)
            print(f"✓ Filled placeholder: {answer}")


# STEP 7: Save and download
output_path = "/content/filled_case_study.docx"
doc.save(output_path)

from google.colab import files
files.download(output_path)
