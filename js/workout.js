function showWorkout(week, day) {
  const workout = workoutData[week][day];
  if (!workout) return;

  const modal = document.getElementById('workoutModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');

  modalTitle.textContent = workout.title;
  
  let content = `<p class="workout-description">${workout.description}</p>`;
  
  // Warm-up section
  if (workout.warmup) {
      content += `
          <div class="exercise-block">
              <div class="exercise-name">Warm-up</div>
              <div class="exercise-details">
                  ${workout.warmup.map(item => `<div>${item}</div>`).join('')}
              </div>
          </div>
      `;
  }

  // Main exercises
  workout.exercises.forEach(exercise => {
      content += `
          <div class="exercise-block">
              <div class="exercise-name">${exercise.name}</div>
              <div class="exercise-details">
                  ${exercise.details.map(detail => `<div>${detail}</div>`).join('')}
                  ${exercise.notes ? `<div class="exercise-note">${exercise.notes}</div>` : ''}
              </div>
          </div>
      `;
  });

  // Finisher
  if (workout.finisher) {
      content += `
          <div class="exercise-block">
              <div class="exercise-name">Finisher: ${workout.finisher.name}</div>
              <div class="exercise-details">
                  ${workout.finisher.options.map(option => `
                      <div class="exercise-name">${option.name}</div>
                      ${option.details.map(detail => `<div>${detail}</div>`).join('')}
                  `).join('')}
              </div>
          </div>
      `;
  }

  modalBody.innerHTML = content;
  modal.classList.add('show');
}

function closeModal() {
  const modal = document.getElementById('workoutModal');
  modal.classList.remove('show');
}

window.onclick = function(event) {
  const modal = document.getElementById('workoutModal');
  if (event.target === modal) {
      closeModal();
  }
}