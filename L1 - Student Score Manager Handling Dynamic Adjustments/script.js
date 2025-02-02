let studentScores = [35, 60, 45, 75, 92, 88, 30, 50, 100, 47];
for (let i = 0; i < studentScores.length; i++) {
    if (studentScores[i] < 40) {
        studentScores[i] += 20; 
    } else if (studentScores[i] > 90) {
        studentScores[i] = 90;    
    }
}
let passedCount = 0;
for (let i = 0; i < studentScores.length; i++) {
    if (studentScores[i] >= 50) {
        passedCount++;
    }
}
console.log("Final adjusted scores:", studentScores);
console.log("Number of students passed:", passedCount);
