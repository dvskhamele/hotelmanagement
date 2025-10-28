// Request routing service for automatically assigning requests to the correct department
class RequestRoutingService {
  // Define keywords that map to departments
  static getDepartmentKeywords() {
    return {
      'Pharmacy': [
        'medication', 'prescription', 'pills', 'drug', 'pharmacy', 'pain', 
        'painkiller', 'aspirin', 'ibuprofen', 'insulin', 'antibiotic'
      ],
      'Laboratory': [
        'lab', 'test', 'blood', 'urine', 'analysis', 'sample', 'culture',
        'lab results', 'blood work', 'cbc', 'chemistry', 'pathology',
        'urinalysis', 'microbiology'
      ],
      'Radiology': [
        'x-ray', 'scan', 'imaging', 'ct', 'mri', 'radiology', 'xray',
        'ultrasound', 'echo', 'radiation', 'image', 'film', 'contrast'
      ],
      'Nursing': [
        'nurse', 'nursing', 'temperature', 'vital signs', 'checkup',
        'blood pressure', 'bp', 'oxygen', 'pulse', 'iv', 'catheter',
        'wound care', 'dressing', 'bedpan', 'bed'
      ],
      'Nutrition': [
        'diet', 'food', 'meal', 'dietitian', 'nutritious', 'diabetic',
        'low sodium', 'clear liquid', 'pureed', 'soft diet', 'feeding'
      ],
      'Physical Therapy': [
        'pt', 'physical therapy', 'exercise', 'mobility', 'walk', 'movement',
        'rehabilitation', 'therapy', 'motion', 'strength', 'balance'
      ],
      'Housekeeping': [
        'clean', 'sheets', 'linens', 'room service', 'dirty', 
        'housekeeping', 'bed', 'bathroom', 'amenities', 'pillow',
        'laundry', 'waste', 'disposal', 'disinfection', 'sanitizing'
      ]
    };
  }
  
  // Automatically determine the department for a request based on keywords
  static routeRequest(title, description = '') {
    const keywords = this.getDepartmentKeywords();
    const fullText = (title + ' ' + description).toLowerCase();
    
    // Check each department's keywords
    for (const [department, departmentKeywords] of Object.entries(keywords)) {
      for (const keyword of departmentKeywords) {
        if (fullText.includes(keyword)) {
          return department;
        }
      }
    }
    
    // Default to Nursing if no keywords match
    return 'Nursing';
  }
  
  // Get priority level based on keywords
  static getPriority(title, description = '') {
    const fullText = (title + ' ' + description).toLowerCase();
    
    // Urgent keywords
    const urgentKeywords = [
      'emergency', 'urgent', 'immediately', 'asap', 'critical', 'crisis', 
      'medical', 'help', 'pain', 'bleeding', 'severe', 'acute',
      'chest pain', 'difficulty breathing', 'allergic reaction',
      'heart attack', 'stroke', 'seizure'
    ];
    
    // High priority keywords
    const highPriorityKeywords = [
      'soon', 'quick', 'fast', 'hurry', 'important', 'needed', 
      'prescription', 'medication', 'lab', 'test', 'results'
    ];
    
    // Check for urgent keywords
    for (const keyword of urgentKeywords) {
      if (fullText.includes(keyword)) {
        return 'URGENT';
      }
    }
    
    // Check for high priority keywords
    for (const keyword of highPriorityKeywords) {
      if (fullText.includes(keyword)) {
        return 'HIGH';
      }
    }
    
    // Default to medium priority
    return 'MEDIUM';
  }
  
  // Get estimated response time in minutes based on department and priority
  static getEstimatedResponseTime(department, priority) {
    const responseTimes = {
      'URGENT': {
        'Pharmacy': 10,
        'Laboratory': 15,
        'Radiology': 20,
        'Nursing': 5,
        'Nutrition': 30,
        'Physical Therapy': 60,
        'Housekeeping': 45
      },
      'HIGH': {
        'Pharmacy': 30,
        'Laboratory': 45,
        'Radiology': 60,
        'Nursing': 15,
        'Nutrition': 60,
        'Physical Therapy': 120,
        'Housekeeping': 90
      },
      'MEDIUM': {
        'Pharmacy': 90,
        'Laboratory': 120,
        'Radiology': 240,
        'Nursing': 30,
        'Nutrition': 180,
        'Physical Therapy': 240,
        'Housekeeping': 120
      },
      'LOW': {
        'Pharmacy': 240,
        'Laboratory': 360,
        'Radiology': 480,
        'Nursing': 60,
        'Nutrition': 480,
        'Physical Therapy': 1440,
        'Housekeeping': 240
      }
    };
    
    return responseTimes[priority][department] || 60;
  }
}

module.exports = RequestRoutingService;