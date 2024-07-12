function showAddGoalPopup() {
    document.getElementById('addGoalPopup').style.display = 'block';
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
        goals.push({ goal, moneyGoal, taxType, percentage, interval });
         localStorage.setItem('goals', JSON.stringify(goals));
        document.getElementById('addGoalPopup').classList.remove('active');
        window.location.reload();
    }
}

function addGoalToList(goal) {
    const goalList = document.getElementById('goalList');
    const goalCard = document.createElement('div');
    goalCard.className = 'goal-card';
    goalCard.innerHTML = `
        <div>
            <h2>${goal.goalName}</h2>
            <p>Rp 0 / <strong>${goal.goalAmount}</strong></p>
            <p>${goal.taxType} / ${goal.duration}</p>
        </div>
        
    `;
    goalList.insertBefore(goalCard, goalList.querySelector('.add-goal'));
}