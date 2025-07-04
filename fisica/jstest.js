document.addEventListener('DOMContentLoaded', function() {
    // Respuestas correctas
    const correctAnswers = {
        q1: 'c',
        q2: 'a',
        q3: 'a',
        q4: 'b',
        q5: 'a',
        q6: 'a',
        q7: 'a',
        q8: 'a',
        q9: 'b',
        q10: 'c'
    };
    
    // Texto de retroalimentación para cada pregunta
    const feedbackText = {
        q1: {
            correct: "Correcto: F = k|q1q2|/r² = (9×10⁹)(5×10⁻⁶)(3×10⁻⁶)/4 = 6.75×10⁻² N de atracción",
            incorrect: "Incorrecto: La fuerza es de atracción y su magnitud es 6.75×10⁻² N"
        },
        q2: {
            correct: "Correcto: La ley de Gauss relaciona el flujo eléctrico con la carga encerrada",
            incorrect: "Incorrecto: La ley de Gauss establece que el flujo eléctrico es proporcional a la carga encerrada"
        },
        q3: {
            correct: "Correcto: U = ½CV² = 0.5×10×10⁻⁶×144 = 720×10⁻⁶ J",
            incorrect: "Incorrecto: La energía es U = ½CV² = 720 μJ"
        },
        q4: {
            correct: "Correcto: Q = I×t = 2×300 = 600 C",
            incorrect: "Incorrecto: Q = I×t = 2×300 = 600 C (5 minutos = 300 segundos)"
        },
        q5: {
            correct: "Correcto: Faraday establece que la fem inducida depende del cambio de flujo magnético",
            incorrect: "Incorrecto: Faraday relaciona la fem inducida con el cambio de flujo magnético"
        },
        q6: {
            correct: "Correcto: E = kQ/r² = (9×10⁹)(6×10⁻⁹)/9 = 6 N/C",
            incorrect: "Incorrecto: E = kQ/r² = (9×10⁹)(6×10⁻⁹)/9 = 6 N/C"
        },
        q7: {
            correct: "Correcto: 1/Req = 1/2 + 1/3 + 1/6 = 1 ⇒ Req = 1 Ω",
            incorrect: "Incorrecto: Para paralelo: 1/Req = 1/2 + 1/3 + 1/6 = 1 ⇒ Req = 1 Ω"
        },
        q8: {
            correct: "Correcto: Ampère relaciona la circulación del campo B con la corriente encerrada",
            incorrect: "Incorrecto: Ampère establece que ∮B·dl = μ₀I"
        },
        q9: {
            correct: "Correcto: ε = B×l×v = 2×1×5 = 10 V",
            incorrect: "Incorrecto: ε = B×l×v = 2×1×5 = 10 V"
        },
        q10: {
            correct: "Correcto: Ambas características diferencian campo y potencial eléctrico",
            incorrect: "Incorrecto: La diferencia incluye naturaleza vectorial/escalar y unidades (fuerza/energía por carga)"
        }
    };
    
    const submitBtn = document.getElementById('submitBtn');
    const generatePdfBtn = document.getElementById('generatePdfBtn');
    const resultsDiv = document.getElementById('results');
    const scoreDiv = document.getElementById('score');
    const feedbackDiv = document.getElementById('feedback');
    const form = document.getElementById('diagnosticForm');
    let resultsChart = null;
    
    submitBtn.addEventListener('click', evaluateAnswers);
    generatePdfBtn.addEventListener('click', generatePDF);
    
    function evaluateAnswers() {
        let score = 0;
        const userAnswers = {};
        let feedbackHTML = '<h3>Detalle por pregunta:</h3><ul>';
        
        // Verificar cada pregunta
        for (let i = 1; i <= 10; i++) {
            const questionName = 'q' + i;
            const selectedOption = form.elements[questionName] ? form.elements[questionName].value : '';
            userAnswers[questionName] = selectedOption;
            
            if (selectedOption === correctAnswers[questionName]) {
                score++;
                feedbackHTML += `<li class="correct">${feedbackText[questionName].correct}</li>`;
            } else {
                feedbackHTML += `<li class="incorrect">${feedbackText[questionName].incorrect}</li>`;
            }
        }
        
        feedbackHTML += '</ul>';
        feedbackDiv.innerHTML = feedbackHTML;
        
        // Calcular porcentaje
        const percentage = (score / 10) * 100;
        scoreDiv.textContent = `Puntuación: ${score}/10 (${percentage}%)`;
        
        // Mostrar resultados
        resultsDiv.style.display = 'block';
        
        // Generar gráfico
        createChart(score, 10 - score);
    }
    
    function createChart(correct, incorrect) {
        const ctx = document.getElementById('resultsChart').getContext('2d');
        
        // Destruir gráfico anterior si existe
        if (resultsChart) {
            resultsChart.destroy();
        }
        
        resultsChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Correctas', 'Incorrectas'],
                datasets: [{
                    label: 'Resultados',
                    data: [correct, incorrect],
                    backgroundColor: [
                        'rgba(46, 204, 113, 0.7)',
                        'rgba(231, 76, 60, 0.7)'
                    ],
                    borderColor: [
                        'rgba(46, 204, 113, 1)',
                        'rgba(231, 76, 60, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 10,
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        });
    }
    
    function generatePDF() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Título
        doc.setFontSize(20);
        doc.setTextColor(44, 62, 80);
        doc.text('Resultados del Test de Electromagnetismo', 105, 20, null, null, 'center');
        
        // Puntuación
        doc.setFontSize(16);
        doc.setTextColor(39, 174, 96);
        doc.text(scoreDiv.textContent, 105, 30, null, null, 'center');
        
        // Gráfico (convertir canvas a imagen)
        const canvas = document.getElementById('resultsChart');
        const chartImage = canvas.toDataURL('image/png');
        doc.addImage(chartImage, 'PNG', 50, 40, 110, 80);
        
        // Retroalimentación
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        
        const feedbackItems = feedbackDiv.querySelectorAll('li');
        let yPosition = 130;
        let pageNumber = 1;
        
        feedbackItems.forEach((item, index) => {
            if (yPosition > 270) {
                doc.addPage();
                yPosition = 20;
                pageNumber++;
            }
            
            const text = item.textContent;
            const color = item.classList.contains('correct') ? 
                [46, 204, 113] : [231, 76, 60];
            
            doc.setTextColor(...color);
            doc.text(`${index + 1}. ${text}`, 15, yPosition, { maxWidth: 180 });
            yPosition += 10;
        });
        
        // Guardar PDF
        doc.save('test_física_II.pdf');
    }
});