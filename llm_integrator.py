# # # llm_integrator.py
# # import os
# # import google.generativeai as genai
# # from dotenv import load_dotenv

# # # Load environment variables from .env file
# # load_dotenv()

# # def generate_soca_report(analysis_data: dict) -> str:
# #     """
# #     Uses the Gemini API to convert structured analysis data into a
# #     fluent, personalized SOCA report.
# #     """
# #     api_key = os.getenv("GEMINI_API_KEY")
# #     if not api_key:
# #         return "Error: GEMINI_API_KEY not found. Please set it in your .env file."

# #     genai.configure(api_key=api_key)
# #     model = genai.GenerativeModel('gemini-2.5-flash')


# #     # Create formatted strings from the analysis lists
# #     strengths_str = "\n- ".join(analysis_data["strengths"])
# #     opportunities_str = "\n- ".join(analysis_data["opportunities"])
# #     challenges_str = "\n- ".join(analysis_data["challenges"])
# #     action_plan_str = "\n- ".join(analysis_data["action_plan"])

# #     prompt = f"""
# #     You are an expert academic counselor for students preparing for the JEE exam in India.
# #     A student has just completed a skill assessment quiz. Based on the following structured analysis,
# #     generate a comprehensive and encouraging SOCA (Strengths, Opportunities, Challenges, Action Plan) report for them.

# #     Address the student directly in a friendly but professional tone. Format the output clearly with Markdown headings.

# #     **Analysis Data:**

# #     **Strengths:**
# #     - {strengths_str}

# #     **Opportunities for Growth:**
# #     - {opportunities_str}

# #     **Challenges to Overcome:**
# #     - {challenges_str}

# #     **Personalized Action Plan:**
# #     - {action_plan_str}

# #     **Generate the final report now.**
# #     """

# #     try:
# #         response = model.generate_content(prompt)
# #         return response.text
# #     except Exception as e:
# #         return f"An error occurred while generating the report: {e}"
# # llm_integrator_hf.py
# import os
# # Import the necessary Hugging Face client
# from huggingface_hub import InferenceClient
# from dotenv import load_dotenv

# # Load environment variables from .env file
# load_dotenv()

# # --- Configuration ---
# # You need a model ID for a text generation LLM on Hugging Face Hub
# HF_MODEL_ID = "mistralai/Mistral-7B-Instruct-v0.2" # Supported for text-generation
# # --- End Configuration ---

# def generate_soca_report_hf(analysis_data: dict) -> str:
#     """
#     Uses the Hugging Face Inference API to convert structured analysis data 
#     into a fluent, personalized SOCA report.
#     """
#     # 1. Get the Hugging Face API Key
#     hf_token = os.getenv("HF_TOKEN")
#     if not hf_token:
#         # NOTE: The Hugging Face token is typically named HF_TOKEN
#         return "Error: HF_TOKEN not found. Please set it in your .env file."

#     # 2. Initialize the Inference Client
#     # The client uses your token to make authenticated API calls
#     client = InferenceClient(token=hf_token)
    
#     # Create formatted strings from the analysis lists (no change here)
#     strengths_str = "\n- ".join(analysis_data["strengths"])
#     opportunities_str = "\n- ".join(analysis_data["opportunities"])
#     challenges_str = "\n- ".join(analysis_data["challenges"])
#     action_plan_str = "\n- ".join(analysis_data["action_plan"])

#     prompt = f"""
#     You are an expert academic counselor for students preparing for the JEE exam in India.
#     A student has just completed a skill assessment quiz. Based on the following structured analysis,
#     generate a comprehensive and encouraging SOCA (Strengths, Opportunities, Challenges, Action Plan) report for them.

#     Address the student directly in a friendly but professional tone. Format the output clearly with Markdown headings.

#     **Analysis Data:**

#     **Strengths:**
#     - {strengths_str}

#     **Opportunities for Growth:**
#     - {opportunities_str}

#     **Challenges to Overcome:**
#     - {challenges_str}

#     **Personalized Action Plan:**
#     - {action_plan_str}

#     **Generate the final report now.**
#     """

#     try:
#         # 3. Prepare conversational messages
#         messages = [
#             {"role": "user", "content": prompt}
#         ]
#         # 4. Call the Inference API for chat-style completions
#         response = client.chat_completion(
#             model=HF_MODEL_ID,
#             messages=messages,
#             temperature=0.7
#         )
#         # The chat_completion endpoint returns a dictionary with 'choices' key
#         if response and 'choices' in response and len(response['choices']) > 0:
#             return response['choices'][0]['message']['content']
#         return str(response)
#     except Exception as e:
#         import traceback
#         tb = traceback.format_exc()
#         print("Full exception traceback:")
#         print(tb)
#         return f"An error occurred while generating the report: {e}\nTraceback:\n{tb}"


# llm_integrator_hf.py
import os
from huggingface_hub import InferenceClient
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# --- Configuration ---
HF_MODEL_ID = "mistralai/Mistral-7B-Instruct-v0.2"  # Supported for text-generation
# --- End Configuration ---

def calculate_performance_metrics(mcq_answers):
    """Calculate basic performance metrics from MCQ answers"""
    if not mcq_answers:
        return {
            'correct_answers': 0,
            'total_questions': 0,
            'accuracy_percentage': 0,
            'avg_time': 0
        }
    
    correct_count = sum(1 for answer in mcq_answers if answer.get('is_correct', False))
    total_count = len(mcq_answers)
    accuracy = round((correct_count / total_count) * 100, 1) if total_count > 0 else 0
    avg_time = round(sum(answer.get('time_taken', 0) for answer in mcq_answers) / max(total_count, 1), 1)
    
    return {
        'correct_answers': correct_count,
        'total_questions': total_count,
        'accuracy_percentage': accuracy,
        'avg_time': avg_time
    }

def extract_assessment_data(user_data):
    """Extract assessment responses for personalized insights"""
    assessment_data = {
        'stress_level': 'N/A',
        'primary_resource': 'N/A',
        'problem_solving_style': 'N/A',
        'relaxation_method': 'N/A',
        'schedule_adherence': 'N/A',
        'group_study_effectiveness': 'N/A',
        'preparation_notes': 'N/A'
    }
    
    try:
        # Extract well-being data
        well_being = user_data.get('well_being', {})
        assessment_data['stress_level'] = well_being.get('stress_level', 'N/A')
        assessment_data['relaxation_method'] = well_being.get('relaxation_method', 'N/A')
        
        # Extract study techniques
        study_techniques = user_data.get('study_techniques', {})
        assessment_data['primary_resource'] = study_techniques.get('primary_resource', 'N/A')
        assessment_data['group_study_effectiveness'] = study_techniques.get('group_study_effectiveness', 'N/A')
        
        # Extract problem solving approach
        problem_solving = user_data.get('problem_solving', {})
        assessment_data['problem_solving_style'] = problem_solving.get('strategy_notes', 'N/A')
        
        # Extract time management
        time_management = user_data.get('time_management', {})
        assessment_data['schedule_adherence'] = time_management.get('schedule_adherence', 'N/A')
        assessment_data['preparation_notes'] = time_management.get('preparation_notes', 'N/A')
        
    except Exception as e:
        print(f"Warning: Could not extract all assessment data: {e}")
    
    return assessment_data

def determine_performance_level(accuracy_percentage):
    """Determine student performance level for tailored messaging"""
    if accuracy_percentage >= 80:
        return "high"
    elif accuracy_percentage >= 50:
        return "medium"
    else:
        return "low"

def generate_improved_soca_prompt(analysis_data, performance_metrics, assessment_data):
    """Generate the improved, personalized SOCA prompt"""
    
    performance_level = determine_performance_level(performance_metrics['accuracy_percentage'])
    
    # Performance-specific tone guidance
    tone_guidance = {
        "high": """
        This student is performing excellently! Focus on:
        - Advanced strategies for the toughest JEE problems
        - Maintaining consistency and avoiding overconfidence
        - Fine-tuning exam temperament and time optimization
        - Preparing for All India Rank improvement strategies
        """,
        "medium": """
        This student has a solid foundation but needs targeted improvement. Focus on:
        - Identifying and strengthening specific weak areas
        - Building consistency across all subjects
        - Strategic time management during exams
        - Converting knowledge into exam performance
        """,
        "low": """
        This student needs foundational strengthening with encouragement. Focus on:
        - Building confidence through achievable milestones
        - Strengthening fundamental concepts step by step
        - Creating a structured, realistic study approach
        - Celebrating small wins to maintain motivation
        """
    }
    
    strengths_str = "\n- ".join(analysis_data["strengths"])
    opportunities_str = "\n- ".join(analysis_data["opportunities"])
    challenges_str = "\n- ".join(analysis_data["challenges"])
    action_plan_str = "\n- ".join(analysis_data["action_plan"])

    prompt = f"""
You are Dr. Sarah Mehta, a renowned JEE academic counselor with 15+ years of experience helping students crack India's toughest entrance exam. You have a warm, encouraging personality and specialize in personalized learning strategies.

A student has just completed our comprehensive JEE diagnostic assessment. Your task is to create a personalized SOCA report that feels like a one-on-one counseling session.

**PERFORMANCE CONTEXT:**
{tone_guidance[performance_level]}

**STUDENT'S COMPLETE PROFILE:**

**Quiz Performance:**
- Score: {performance_metrics.get('correct_answers', 0)}/{performance_metrics.get('total_questions', 0)} ({performance_metrics.get('accuracy_percentage', 0)}%)
- Average Time per Question: {performance_metrics.get('avg_time', 0)} seconds

**Personal Assessment:**
- Current Stress Level: {assessment_data.get('stress_level', 'N/A')}/10
- Primary Study Resource: {assessment_data.get('primary_resource', 'N/A')}
- Problem-Solving Approach: {assessment_data.get('problem_solving_style', 'N/A')}
- Relaxation Method: {assessment_data.get('relaxation_method', 'N/A')}
- Study Schedule Adherence: {assessment_data.get('schedule_adherence', 'N/A')}/5
- Group Study Preference: {assessment_data.get('group_study_effectiveness', 'N/A')}/5
- Preparation Notes: {assessment_data.get('preparation_notes', 'N/A')}

**DETAILED ANALYSIS:**

**Strengths Identified:**
- {strengths_str}

**Growth Opportunities:**
- {opportunities_str}

**Current Challenges:**
- {challenges_str}

**Recommended Actions:**
- {action_plan_str}

**GENERATE A COMPREHENSIVE SOCA REPORT WITH THESE SECTIONS:**

## 🎯 **Personal Message from Dr. Mehta**
Start with a warm, personalized greeting that acknowledges their specific performance and effort.

## 💪 **Your Superpowers (Strengths)**
Highlight their strengths with specific examples. Connect these strengths to actual JEE success patterns and explain why they matter.

## 🌱 **Golden Opportunities (Growth Areas)**
Frame growth areas positively with specific study strategies, resources, and techniques tailored to their learning style.

## ⚡ **Challenges to Conquer**
Address challenges encouragingly. For each challenge provide:
- Why this area is crucial for JEE success
- Specific study resources and techniques
- Realistic timeline for improvement
- Success metrics to track progress

## 🚀 **Your Personalized 30-60-90 Day Action Plan**
Create a phased approach based on their current performance level:
- **Next 30 Days**: Immediate priorities with daily targets
- **Next 60 Days**: Building momentum with weekly goals  
- **Next 90 Days**: Advanced prep and mock test strategies

Include specific study schedules, recommended resources, and progress tracking methods.

## 🧠 **Custom Study Hacks for You**
Based on their stress level, study habits, and learning preferences, suggest specific techniques for:
- Memory and formula retention
- Problem-solving frameworks
- Time management during exams
- Stress management strategies

## 📈 **Success Milestones & Weekly Check-ins**
Provide clear, measurable goals for the coming months with self-assessment methods.

## 💌 **Your Personal Motivation Message**
End with an inspiring, personal message that connects their current performance to their JEE goals and dreams.

**WRITING REQUIREMENTS:**
1. Write as if speaking directly to the student in your counseling office
2. Use their actual data points throughout for personalization
3. Address their specific stress level and study habits
4. Keep tone hopeful and action-oriented
5. Include specific numbers, timelines, and resources
6. Use emojis for visual appeal
7. Limit to 900-1100 words for optimal readability
8. Make every piece of advice specific and actionable

Generate this highly personalized SOCA report now.
"""
    
    return prompt

def generate_soca_report_hf(analysis_data: dict, user_data: dict = None) -> str:
    """
    Uses the Hugging Face Inference API to convert structured analysis data 
    into a fluent, personalized SOCA report with enhanced prompting.
    
    Args:
        analysis_data: Dict with strengths, opportunities, challenges, action_plan lists
        user_data: Complete user data including mcq_answers and assessment responses
    """
    # Get the Hugging Face API Key
    hf_token = os.getenv("HF_TOKEN")
    if not hf_token:
        return "Error: HF_TOKEN not found. Please set it in your .env file."

    # Initialize the Inference Client
    client = InferenceClient(token=hf_token)
    
    # Calculate performance metrics
    mcq_answers = user_data.get('mcq_answers', []) if user_data else []
    performance_metrics = calculate_performance_metrics(mcq_answers)
    
    # Extract assessment data for personalization
    assessment_data = extract_assessment_data(user_data) if user_data else {}
    
    # Generate the improved prompt
    prompt = generate_improved_soca_prompt(analysis_data, performance_metrics, assessment_data)

    try:
        # Prepare conversational messages
        messages = [
            {"role": "user", "content": prompt}
        ]
        
        # Call the Inference API
        response = client.chat_completion(
            model=HF_MODEL_ID,
            messages=messages,
            temperature=0.7,
            max_tokens=2000  # Increased for longer, more detailed reports
        )
        
        # Extract the response text
        if response and 'choices' in response and len(response['choices']) > 0:
            return response['choices'][0]['message']['content']
        return str(response)
        
    except Exception as e:
        import traceback
        tb = traceback.format_exc()
        print("Full exception traceback:")
        print(tb)
        return f"An error occurred while generating the report: {e}\nTraceback:\n{tb}"

# Backward compatibility function
def generate_soca_report(analysis_data: dict) -> str:
    """
    Backward compatible function that works with the old interface
    """
    return generate_soca_report_hf(analysis_data, user_data=None)

# Usage example:
"""
# Enhanced usage with full user data:
user_data = {
    "mcq_answers": [
        {"question_id": "Q1", "user_answer": "b", "is_correct": True, "time_taken": 15},
        # ... more answers
    ],
    "time_management": {
        "preparation_notes": "I revised formulas",
        "schedule_adherence": 3
    },
    "problem_solving": {
        "first_instinct": "Read carefully",
        "strategy_notes": "I break problems into steps"
    },
    "well_being": {
        "stress_level": 8,
        "relaxation_method": "Listening to music"
    },
    "study_techniques": {
        "primary_resource": "Online courses",
        "group_study_effectiveness": 2,
        "most_effective_technique": "Mock tests"
    }
}

analysis_data = {
    "strengths": ["Strong in Physics mechanics", "Good problem-solving speed"],
    "opportunities": ["Improve time management", "Practice more chemistry"],
    "challenges": ["Difficulty with calculus", "High stress levels"],
    "action_plan": ["Daily practice schedule", "Stress management techniques"]
}

report = generate_soca_report_hf(analysis_data, user_data)
"""