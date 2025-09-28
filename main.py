# main.py
from analysis_engine import analyze_student_performance
from llm_integrator import generate_soca_report_hf
import json

def main():
    # This is the sample data your Next.js frontend will send.
    sample_user_data = {
        "mcq_answers": [
            { "question_id": "Q1", "user_answer": "b", "is_correct": True, "time_taken": 15 },
            { "question_id": "Q2", "user_answer": "a", "is_correct": True, "time_taken": 50 },
            { "question_id": "Q3", "user_answer": "b", "is_correct": True, "time_taken": 25 },
            { "question_id": "Q4", "user_answer": "c", "is_correct": False, "time_taken": 110 },
            { "question_id": "Q8", "user_answer": "d", "is_correct": True, "time_taken": 75 },
            { "question_id": "Q11", "user_answer": "a", "is_correct": False, "time_taken": 60 }
        ],
        "time_management": {
            "preparation_notes": "I revised formulas.",
            "schedule_adherence": 3
        },
        "problem_solving": {
            "first_instinct": "b",
            "strategy_notes": "I break down problems into smaller steps."
        },
        "well_being": {
            "stress_level": 8,
            "relaxation_method": "Listening to music"
        },
        "study_techniques": {
            "primary_resource": "c",
            "group_study_effectiveness": 2,
            "most_effective_technique": "Mock tests"
        }
    }

    # Step 1: Get the structured analysis from the rule-based engine
    print("--- 1. Running Rule-Based Analysis Engine ---")
    structured_analysis = analyze_student_performance(sample_user_data)
    print(json.dumps(structured_analysis, indent=2))
    print("\n" + "="*50 + "\n")

    # Step 2: Use the Hugging Face LLM to generate a fluent, user-friendly report
    print("--- 2. Generating Final Report with LLM ---")
    final_report = generate_soca_report_hf(structured_analysis)
    print(final_report)


if __name__ == "__main__":
    main()