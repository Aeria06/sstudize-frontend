from flask import Flask, request, jsonify, render_template_string
from flask_cors import CORS
import json
import os
from jee_soca_analysis import JEESkillAssessment, format_soca_output

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Initialize the assessment system
# Add your API key here for production
API_KEY = os.environ.get('OPENAI_API_KEY') or os.environ.get('HUGGINGFACE_API_KEY')
MODEL_PROVIDER = os.environ.get('MODEL_PROVIDER', 'huggingface')  # or 'openai'

assessment_system = JEESkillAssessment(
    api_key=API_KEY,
    model_provider=MODEL_PROVIDER
)

@app.route('/')
def home():
    """Home page with basic info"""
    return render_template_string("""
    <!DOCTYPE html>
    <html>
    <head>
        <title>JEE SOCA Analysis API</title>
        <style>
            body { font-family: Arial, sans-serif; max-width: 800px; margin: 50px auto; padding: 20px; }
            .endpoint { background: #f4f4f4; padding: 15px; margin: 10px 0; border-radius: 5px; }
            .method { color: #28a745; font-weight: bold; }
            code { background: #e9ecef; padding: 2px 5px; border-radius: 3px; }
        </style>
    </head>
    <body>
        <h1>🎓 JEE SOCA Analysis API</h1>
        <p>AI-driven skill assessment system for JEE students using SOCA analysis.</p>
        
        <h2>Available Endpoints:</h2>
        
        <div class="endpoint">
            <h3><span class="method">POST</span> /api/analyze</h3>
            <p>Submit questionnaire responses and get SOCA analysis</p>
            <p><strong>Content-Type:</strong> application/json</p>
            <p><strong>Expected format:</strong> See documentation below</p>
        </div>
        
        <div class="endpoint">
            <h3><span class="method">POST</span> /api/analyze/html</h3>
            <p>Get SOCA analysis in HTML format for web display</p>
        </div>
        
        <div class="endpoint">
            <h3><span class="method">GET</span> /api/health</h3>
            <p>Check API health status</p>
        </div>
        
        <h2>Request Format:</h2>
        <pre><code>{
    "q1": "b",     // MCQ answers (a, b, c, d)
    "q2": "a", 
    // ... (q1-q12 for academic questions)
    "q13": "I studied for 2 hours daily",  // Short answer
    "q14": "4",    // Scale rating (1-5)
    "q15": "b",    // MCQ for problem solving
    "q16": "I break problems into steps",  // Short answer
    "q17": "6",    // Scale rating (1-10) for stress
    "q18": "I listen to music",  // Short answer
    "q19": "b",    // MCQ for study resources
    "q20": "3",    // Scale rating (1-5)
    "q21": "Mock tests work best"  // Short answer
}</code></pre>
        
        <h2>Response Format:</h2>
        <p>Returns comprehensive SOCA analysis with academic scores, soft skills assessment, and actionable recommendations.</p>
        
        <p><strong>Status:</strong> <span style="color: green;">✅ API Ready</span></p>
    </body>
    </html>
    """)

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "message": "JEE SOCA Analysis API is running",
        "model_provider": MODEL_PROVIDER,
        "api_configured": API_KEY is not None
    })

@app.route('/api/analyze', methods=['POST'])
def analyze_responses():
    """Main endpoint to analyze questionnaire responses"""
    try:
        # Get JSON data from request
        data = request.get_json()
        
        if not data:
            return jsonify({
                "error": "No data provided",
                "message": "Please send questionnaire responses in JSON format"
            }), 400
        
        # Validate required fields
        required_questions = [f"q{i}" for i in range(1, 22)]
        missing_questions = [q for q in required_questions if q not in data]
        
        if len(missing_questions) > 5:  # Allow some missing answers
            return jsonify({
                "error": "Insufficient responses",
                "message": f"Missing responses for: {', '.join(missing_questions[:10])}"
            }), 400
        
        # Generate SOCA analysis
        report = assessment_system.generate_soca_report(data)
        
        # Add metadata
        report['metadata'] = {
            "api_version": "1.0",
            "model_provider": MODEL_PROVIDER,
            "total_responses": len([k for k in data.keys() if k.startswith('q')])
        }
        
        return jsonify(report)
        
    except Exception as e:
        return jsonify({
            "error": "Analysis failed",
            "message": str(e)
        }), 500

@app.route('/api/analyze/html', methods=['POST'])
def analyze_responses_html():
    """Analyze responses and return HTML formatted result"""
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({
                "error": "No data provided"
            }), 400
        
        # Generate SOCA analysis
        report = assessment_system.generate_soca_report(data)
        
        # Format as HTML
        html_report = format_soca_to_html(report)
        
        return jsonify({
            "html_content": html_report,
            "raw_data": report
        })
        
    except Exception as e:
        return jsonify({
            "error": "Analysis failed",
            "message": str(e)
        }), 500

def format_soca_to_html(report):
    """Format SOCA analysis as HTML for web display"""
    
    html = f"""
    <div class="soca-report">
        <div class="report-header">
            <h2>🎓 JEE SKILL ASSESSMENT - SOCA ANALYSIS</h2>
            <p class="timestamp">Generated on: {report['timestamp'][:10]}</p>
        </div>
        
        <div class="academic-summary">
            <h3>📊 Academic Performance Summary</h3>
            <div class="score-grid">
                <div class="score-item">
                    <span class="subject">Physics</span>
                    <span class="score">{report['academic_performance']['physics']:.1f}%</span>
                </div>
                <div class="score-item">
                    <span class="subject">Chemistry</span>
                    <span class="score">{report['academic_performance']['chemistry']:.1f}%</span>
                </div>
                <div class="score-item">
                    <span class="subject">Mathematics</span>
                    <span class="score">{report['academic_performance']['mathematics']:.1f}%</span>
                </div>
                <div class="score-item overall">
                    <span class="subject">Overall Academic</span>
                    <span class="score">{report['academic_performance']['overall_academic']:.1f}%</span>
                </div>
            </div>
        </div>
        
        <div class="soca-section">
            <div class="soca-card strengths">
                <h3>💪 Strengths</h3>
                <ul>
    """
    
    for strength in report['soca_analysis']['strengths']:
        html += f"<li>{strength}</li>"
    
    html += """
                </ul>
            </div>
            
            <div class="soca-card opportunities">
                <h3>🌟 Opportunities</h3>
                <ul>
    """
    
    for opportunity in report['soca_analysis']['opportunities']:
        html += f"<li>{opportunity}</li>"
    
    html += """
                </ul>
            </div>
            
            <div class="soca-card challenges">
                <h3>⚠️ Challenges</h3>
                <ul>
    """
    
    for challenge in report['soca_analysis']['challenges']:
        html += f"<li>{challenge}</li>"
    
    html += """
                </ul>
            </div>
            
            <div class="soca-card action-plan">
                <h3>🎯 Action Plan</h3>
                <ol>
    """
    
    for action in report['soca_analysis']['action_plan']:
        html += f"<li>{action}</li>"
    
    html += """
                </ol>
            </div>
        </div>
        
        <div class="next-steps">
            <h3>📋 Immediate Next Steps</h3>
            <ol>
    """
    
    for step in report['next_steps']:
        html += f"<li>{step}</li>"
    
    html += """
            </ol>
        </div>
        
        <style>
            .soca-report { max-width: 900px; margin: 20px auto; font-family: 'Segoe UI', Arial, sans-serif; }
            .report-header { text-align: center; margin-bottom: 30px; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 10px; }
            .timestamp { opacity: 0.9; margin-top: 10px; }
            .academic-summary { margin-bottom: 30px; }
            .score-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-top: 15px; }
            .score-item { background: #f8f9fa; padding: 15px; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; }
            .score-item.overall { background: #e3f2fd; font-weight: bold; }
            .subject { font-weight: 500; }
            .score { font-weight: bold; color: #1976d2; }
            .soca-section { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-bottom: 30px; }
            .soca-card { padding: 20px; border-radius: 10px; }
            .strengths { background: #e8f5e8; border-left: 5px solid #4caf50; }
            .opportunities { background: #fff3e0; border-left: 5px solid #ff9800; }
            .challenges { background: #ffebee; border-left: 5px solid #f44336; }
            .action-plan { background: #e3f2fd; border-left: 5px solid #2196f3; }
            .next-steps { background: #f3e5f5; padding: 20px; border-radius: 10px; border-left: 5px solid #9c27b0; }
            .soca-card h3, .next-steps h3 { margin-top: 0; margin-bottom: 15px; }
            .soca-card ul, .soca-card ol, .next-steps ol { padding-left: 20px; }
            .soca-card li, .next-steps li { margin-bottom: 8px; line-height: 1.5; }
        </style>
    </div>
    """
    
    return html

@app.route('/api/demo', methods=['GET'])
def demo():
    """Demo endpoint with sample data"""
    sample_responses = {
        "q1": "b", "q2": "a", "q3": "b", "q4": "a",  # Physics
        "q5": "c", "q6": "c", "q7": "a", "q8": "d",  # Chemistry  
        "q9": "a", "q10": "b", "q11": "a", "q12": "b",  # Math
        "q13": "I studied for 2 hours daily with focus on weak topics",
        "q14": "4", "q15": "b", "q16": "I break problems into smaller steps and solve systematically",
        "q17": "6", "q18": "I practice deep breathing and take short walks",
        "q19": "b", "q20": "3", "q21": "Mock tests and timed practice sessions work best for me"
    }
    
    try:
        report = assessment_system.generate_soca_report(sample_responses)
        return jsonify({
            "message": "Demo analysis completed successfully",
            "sample_input": sample_responses,
            "analysis_result": report
        })
    except Exception as e:
        return jsonify({
            "error": "Demo failed",
            "message": str(e)
        }), 500

# JavaScript integration code for your website
@app.route('/api/integration-code', methods=['GET'])
def integration_code():
    """Provide JavaScript code for website integration"""
    js_code = """
// JEE SOCA Analysis Integration Code
class JEESOCAIntegration {
    constructor(apiBaseUrl = 'http://localhost:5000/api') {
        this.apiBaseUrl = apiBaseUrl;
    }
    
    async analyzeResponses(formData) {
        try {
            const response = await fetch(`${this.apiBaseUrl}/analyze`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Analysis failed:', error);
            throw error;
        }
    }
    
    async getHTMLReport(formData) {
        try {
            const response = await fetch(`${this.apiBaseUrl}/analyze/html`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            return result.html_content;
        } catch (error) {
            console.error('HTML report generation failed:', error);
            throw error;
        }
    }
    
    extractFormData(formElement) {
        const formData = new FormData(formElement);
        const responses = {};
        
        for (let [key, value] of formData.entries()) {
            responses[key] = value;
        }
        
        return responses;
    }
    
    displayResults(htmlContent, containerId = 'soca-results') {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = htmlContent;
            container.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    showLoading(containerId = 'soca-results') {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = `
                <div style="text-align: center; padding: 40px;">
                    <div style="border: 4px solid #f3f3f3; border-top: 4px solid #3498db; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; margin: 0 auto;"></div>
                    <p style="margin-top: 20px;">Analyzing your responses...</p>
                    <style>
                        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                    </style>
                </div>
            `;
        }
    }
}

// Usage example:
/*
const socaAPI = new JEESOCAIntegration();

// When form is submitted
document.getElementById('jee-assessment-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    try {
        socaAPI.showLoading();
        const formData = socaAPI.extractFormData(e.target);
        const htmlReport = await socaAPI.getHTMLReport(formData);
        socaAPI.displayResults(htmlReport);
    } catch (error) {
        document.getElementById('soca-results').innerHTML = 
            `<div style="color: red; padding: 20px;">Analysis failed: ${error.message}</div>`;
    }
});
*/
"""
    
    return jsonify({
        "integration_code": js_code,
        "instructions": [
            "1. Include this JavaScript code in your website",
            "2. Make sure your form has id='jee-assessment-form'",
            "3. Add a div with id='soca-results' to display results",
            "4. Question inputs should have names 'q1', 'q2', etc.",
            "5. Start the Flask API server on your backend"
        ]
    })

if __name__ == '__main__':
    print("🚀 Starting JEE SOCA Analysis API...")
    print("📊 Access the API at: http://localhost:5000")
    print("📋 View endpoints at: http://localhost:5000")
    print("🧪 Test with demo data: http://localhost:5000/api/demo")
    print("🔧 Get integration code: http://localhost:5000/api/integration-code")
    
    # Run the Flask app
    app.run(debug=True, host='0.0.0.0', port=5000)