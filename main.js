function showAddGoalPopup() {
    document.getElementById('addGoalPopup').style.display = 'block';
}

function hideAddGoalPopup() {
    document.getElementById('addGoalPopup').style.display = 'none';
}

document.getElementById('addGoalForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const goalName = document.getElementById('goalName').value;
    const goalAmount = document.getElementById('goalAmount').value;
    const duration = document.getElementById('duration').value;
    const taxType = document.getElementById('taxType').value;
    const taxValue = document.getElementById('taxValue').value;

    const newGoal = { goalName, goalAmount, duration, taxType, taxValue };
    let goals = JSON.parse(localStorage.getItem('goals')) || [];
    goals.push(newGoal);
    localStorage.setItem('goals', JSON.stringify(goals));

    addGoalToList(newGoal);
    hideAddGoalPopup();
});

function addGoalToList(goal) {
    const goalList = document.getElementById('goalList');
    const goalCard = document.createElement('div');
    goalCard.className = 'goal-card';
    goalCard.innerHTML = `
        <div>
            <h1>${goal.goalName}</h1>
            <p>Rp 0 / <strong>${goal.goalAmount}</strong></p>
            <p>${goal.taxType} / ${goal.duration}</p>
        </div>
        
    `;
    goalList.insertBefore(goalCard, goalList.querySelector('.add-goal'));
}