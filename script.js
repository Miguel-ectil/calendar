const currentMonthElement = document.getElementById("current-month");
const calendarGrid = document.getElementById("calendar-grid");
const prevMonthButton = document.getElementById("prev-month");
const nextMonthButton = document.getElementById("next-month");

let currentDate = new Date();

function updateCalendar() {
  // Limpa o calendário
  calendarGrid.innerHTML = "";

  // Define a data para o primeiro dia do mês
  currentDate.setDate(1);

  // Atualiza o título do mês
  const options = { year: 'numeric', month: 'long' };
  currentMonthElement.textContent = currentDate.toLocaleDateString(undefined, options);

  // Encontra o primeiro dia da semana do mês
  const firstDayOfWeek = currentDate.getDay();

  // Calcula quantos dias no mês anterior precisam ser exibidos
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const daysInPrevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
  const daysToDisplayFromPrevMonth = firstDayOfWeek;

  // Exibe os dias do mês anterior
  for (let i = daysInPrevMonth - daysToDisplayFromPrevMonth + 1; i <= daysInPrevMonth; i++) {
    const dayElement = document.createElement("div");
    dayElement.classList.add("calendar-day", "prev-month");
    dayElement.textContent = i;
    calendarGrid.appendChild(dayElement);
  }

  // Exibe os dias do mês atual
  for (let i = 1; i <= daysInMonth; i++) {
    const dayElement = document.createElement("div");
    dayElement.classList.add("calendar-day", "current-month");
    dayElement.textContent = i;
    calendarGrid.appendChild(dayElement);
  }
}

// Atualiza o calendário inicial
updateCalendar();

// Adiciona evento de clique para o botão "Mês Anterior"
prevMonthButton.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  updateCalendar();
});

// Adiciona evento de clique para o botão "Próximo Mês"
nextMonthButton.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  updateCalendar();
});

// Função para obter a data atual no formato "YYYY-MM-DD"
function getCurrentDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Função para adicionar a classe .current-day ao dia atual
function highlightCurrentDay() {
  const currentDate = getCurrentDate();
  const calendarDays = document.querySelectorAll('.calendar-day');

  calendarDays.forEach(day => {
    if (day.dataset.date === currentDate) {
      day.classList.add('current-day');
    }
  });
}

// Chame a função para destacar o dia atual
highlightCurrentDay();

