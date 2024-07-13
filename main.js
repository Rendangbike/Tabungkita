function showAddGoalPopup() {
    document.getElementById('addGoalPopup').style.display = 'block';
    changeTaxType();  // Initialize tax details based on default tax type
}

function hideAddGoalPopup() {
    document.getElementById('addGoalPopup').style.display = 'none';
}

function changeTaxType() {
    const taxType = document.getElementById('taxType').value;
    const taxDetails = document.getElementById('taxDetails');

    if (taxType === 'account') {
        taxDetails.innerHTML = `
            <label for="percentage">Percentage:</label>
            <input type="number" id="percentage" placeholder="%">
            <label for="interval">Every:</label>
            <input type="text" id="interval" placeholder="e.g., 2 weeks - 7 months">
        `;
    } else if (taxType === 'purchase') {
        taxDetails.innerHTML = `
            <label for="percentage">Percentage:</label>
            <input type="number" id="percentage" placeholder="%">
        `;
    }
}

function addGoal() {
    const goal = document.getElementById('goal').value;
    const moneyGoal = document.getElementById('moneyGoal').value;
    const taxType = document.getElementById('taxType').value;
    const percentage = document.getElementById('percentage').value;
    const interval = document.getElementById('interval') ? document.getElementById('interval').value : '';


    if (goal && moneyGoal && percentage && (interval || taxType === 'purchase')) {
        const goals = JSON.parse(localStorage.getItem('goals')) || [];
        const newGoal = { goalName: goal, goalAmount: moneyGoal, taxType, percentage, duration: interval };
        goals.push(newGoal);
        localStorage.setItem('goals', JSON.stringify(goals));
        addGoalToList(newGoal); // Add the new goal to the DOM
        document.getElementById('addGoalPopup').style.display = 'none'; // Hide the popup
    }
}

function addGoalToList(goal) {
    const goalList = document.getElementById('goalList');
    const goalCard = document.createElement('div');
    goalCard.className = 'goal-card';
    const durationText = goal.duration ? ` / ${goal.duration}` : ' / every purchase';
    
    goalCard.innerHTML = `
        <div>
            <h1>${goal.goalName}</h1>
            <p>Rp 0 / <strong>${goal.goalAmount}</strong></p>
            <p>${goal.percentage}%${durationText}</p>
        </div>
    `;
    
    goalList.insertBefore(goalCard, goalList.querySelector('.add-goal'));
}


// Load existing goals from localStorage and display them
document.addEventListener('DOMContentLoaded', () => {
    const goals = JSON.parse(localStorage.getItem('goals')) || [];
    goals.forEach(addGoalToList);
});
