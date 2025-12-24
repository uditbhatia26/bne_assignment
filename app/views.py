import os
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from langchain_openai import ChatOpenAI
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import JsonOutputParser


def home(request):
    """Render the main application page."""
    return render(request, "index.html")


@method_decorator(csrf_exempt, name='dispatch')
class ProcessTextAPIView(APIView):
    """
    API endpoint to process text using OpenAI's GPT-4o model.
    
    Accepts POST requests with text and returns:
    - A generated title
    - 5 key bullet points
    - A beginner-friendly rewrite of the content
    """
    
    def post(self, request):
        text = request.data.get("text", "").strip()

        if not text:
            return Response(
                {"error": "Text field is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            # Initialize the language model
            llm = ChatOpenAI(
                model="gpt-4o",
                temperature=0.3,
                api_key=os.getenv("OPENAI_API_KEY"),
            )

            # Define the prompt template
            prompt = PromptTemplate(
                template="""You are an expert AI assistant.

Your task:
1. Create a short title (1 line)
2. Extract exactly 5 key bullet points
3. Rewrite the content in a beginner-friendly tone

Return ONLY valid JSON in the following format:

{{
  "title": "...",
  "key_points": ["...", "...", "...", "...", "..."],
  "beginner_friendly_version": "..."
}}

Text:
{input_text}""",
                input_variables=["input_text"],
            )

            # Create the processing chain
            parser = JsonOutputParser()
            chain = prompt | llm | parser

            # Process the text
            result = chain.invoke({"input_text": text})

            return Response(result, status=status.HTTP_200_OK)

        except Exception as e:
            return Response(
                {
                    "error": "Unable to process text. Please try again later.",
                    "details": str(e)
                },
                status=status.HTTP_503_SERVICE_UNAVAILABLE
            )