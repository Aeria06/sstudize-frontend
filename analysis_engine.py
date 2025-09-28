# analysis_engine.py

# Define constants for clarity and easy modification
TIME_THRESHOLDS = {
    "JEE Main": 45,  # seconds
    "JEE Advanced": 90, # seconds
    "default": 60
}

QUESTION_TOPICS = {
    "Q1": "Physics (Mechanics)", "Q2": "Physics (Oscillations)",
    "Q3": "Physics (Momentum)", "Q4": "Physics (Dynamics - Adv.)",
    "Q5": "Chemistry (Acids & Bases)", "Q6": "Chemistry (Bonding)",
    "Q7": "Chemistry (Stoichiometry)", "Q8": "Chemistry (Nuclear - Adv.)",
    "Q9": "Math (Algebra)", "Q10": "Math (Calculus)",
    "Q11": "Math (Coordinate Geo.)", "Q12": "Math (Integration - Adv.)"
}

def get_question_level(qid):
    topic = QUESTION_TOPICS.get(qid, "")
    if "Adv." in topic:
        return "JEE Advanced"
    elif topic:
        return "JEE Main"
    else:
        return "default"

def analyze_student_performance(user_data: dict) -> dict:
    """
    Analyzes raw user quiz data using a rule-based system to generate
    a structured SOCA analysis.
    """
    strengths = []
    opportunities = []
    challenges = []
    action_plan = []

    # 1. Analyze MCQ Performance
    for ans in user_data.get("mcq_answers", []):
        qid = ans.get("question_id")
        topic = QUESTION_TOPICS.get(qid, "Unknown Topic")
        level = get_question_level(qid)
        threshold = TIME_THRESHOLDS.get(level, TIME_THRESHOLDS["default"])

        if ans.get("is_correct"):
            if ans.get("time_taken", 0) < threshold:
                strengths.append(f"Excellent speed and accuracy in {topic}.")
            else:
                opportunities.append(f"Good conceptual clarity in {topic}, but can improve solving speed.")
        else:
            challenges.append(f"Difficulty with questions from {topic}.")
            action_plan.append(f"Revise concepts and practice more problems related to {topic}.")

    # 2. Analyze Time Management & Study Habits
    if user_data["time_management"]["schedule_adherence"] >= 4:
        strengths.append("Strong discipline in adhering to a study schedule.")
    else:
        opportunities.append("Creating and sticking to a consistent study schedule can boost productivity.")
        action_plan.append("Use a planner or app to create a weekly study schedule and track your adherence.")

    # 3. Analyze Problem-Solving Approach
    if user_data["problem_solving"]["first_instinct"] == 'b': # 'Break the problem down'
        strengths.append("Adopts a systematic, step-by-step approach to problem-solving.")
    else:
        opportunities.append("Developing a more structured problem-solving approach can improve accuracy.")

    # 4. Analyze Well-being
    if user_data["well_being"]["stress_level"] > 6:
        challenges.append("High self-reported stress levels, which may impact performance.")
        action_plan.append(f"Incorporate relaxation techniques like '{user_data['well_being']['relaxation_method']}' more frequently. Try the Pomodoro Technique (25 min study, 5 min break).")

    # 5. Analyze Study Resources
    if user_data["study_techniques"]["group_study_effectiveness"] <= 2:
        challenges.append("Finds group study ineffective, potentially missing out on collaborative learning benefits.")
        action_plan.append("If you prefer solo study, ensure you clarify doubts with a mentor or teacher regularly.")


    return {
        "strengths": list(set(strengths)), # Remove duplicates
        "opportunities": list(set(opportunities)),
        "challenges": list(set(challenges)),
        "action_plan": list(set(action_plan))
    }