document.addEventListener('DOMContentLoaded', () => {
    // Progress Bar
    window.onscroll = function() {updateProgressBar()};

    function updateProgressBar() {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      const progressBar = document.getElementById("myBar"); // افترض أن لديك progress bar بهذا الـ ID
      if (progressBar) {
        progressBar.style.width = scrolled + "%";
      }
    }

    // Theme Toggle
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    const sunIcon = 'fa-sun';
    const moonIcon = 'fa-moon';

    const applyTheme = (theme) => {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            if (themeToggleBtn) themeToggleBtn.innerHTML = `<i class="fas ${moonIcon}"></i>`;
        } else {
            body.classList.remove('dark-mode');
            if (themeToggleBtn) themeToggleBtn.innerHTML = `<i class="fas ${sunIcon}"></i>`;
        }
    };

    const savedTheme = localStorage.getItem('theme') || 'light'; // الافتراضي هو الوضع الفاتح
    applyTheme(savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            let newTheme = body.classList.contains('dark-mode') ? 'light' : 'dark';
            applyTheme(newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    // MCQ Functionality with Detailed Feedback
    const correctAnswers = {
        dialogue1: {
            q1_d1: 'b', // Tahir wakes up at dawn. (عِنْدَ الْفَجْرِ)
            q2_d1: 'c', // Tahir prays Fajr in the mosque. (فِي الْمَسْجِدِ)
            q3_d1: 'b'  // Tahir goes to school by bus. (بِالْحَافِلَةِ)
        },
        dialogue2: {
            q1_d2: 'b', // What will Tariq do? He will sweep the living room.
            q2_d2: 'c'  // Who will wash the dishes? Fatimah.
        }
       
    };
    // Explanations for incorrect MCQ answers
    const mcqExplanations = {
        dialogue1: {
            q1_d1: {
                a: "خطأ. طاهر يستيقظ مبكراً جداً، عند الفجر (عِنْدَ الْفَجْرِ)، وليس بعد الظهر.",
                c: "خطأ. الفجر (الْفَجْرِ) في الصباح الباكر، وليس في المساء (الْمَسَاءِ)."
            }
        },
        dialogue2: {
            q1_d2: { // What will Tariq do?
                a: "خطأ. فاطمة هي التي ستغسل الأطباق.",
                c: "خطأ. لطيفة هي التي ستكوي الملابس. طارق سيكنس غرفة الجلوس."
            },
            q2_d2: { // Who will wash the dishes?
                a: "خطأ. طارق سيكنس غرفة الجلوس.",
                b: "خطأ. لطيفة ستكوي الملابس. فاطمة هي التي ستغسل الأطباق."
            }
        }
    };


    document.querySelectorAll('.check-answers-btn').forEach(button => {
        button.addEventListener('click', () => {
            const mcqId = button.dataset.mcqId; 
            const questionsContainer = document.getElementById(`mcq-${mcqId}`);
            if (!questionsContainer) return; 

            const feedbackDiv = questionsContainer.querySelector('.feedback');
            if (!feedbackDiv) return; 

            let score = 0;
            let totalQuestions = 0;
            let feedbackHTML = '<h4>النتائج:</h4><ul>';

            questionsContainer.querySelectorAll('.mcq-question').forEach((questionDiv, index) => {
                totalQuestions++;
                const shortMcqId = mcqId.replace('dialogue', 'd'); 
                const questionName = `q${index + 1}_${shortMcqId}`;
                
                const selectedOption = questionsContainer.querySelector(`input[name="${questionName}"]:checked`);
                
                const questionStrongElement = questionDiv.querySelector('strong');
                let questionTextForFeedback = `السؤال ${index + 1}`;

                if (questionStrongElement) {
                    // محاولة استخلاص النص العربي أولاً
                    const arabicSpans = questionStrongElement.querySelectorAll('.ar-word');
                    let fullArabicQuestion = "";
                    if (arabicSpans.length > 0) {
                        arabicSpans.forEach(span => {
                            fullArabicQuestion += span.textContent + " ";
                        });
                        // إضافة علامة الاستفهام إذا كانت موجودة خارج الـ spans
                         let nextNode = arabicSpans[arabicSpans.length-1].nextSibling;
                         while(nextNode && nextNode.nodeType === Node.TEXT_NODE && !nextNode.textContent.includes('(')){
                            fullArabicQuestion += nextNode.textContent.trim();
                            nextNode = nextNode.nextSibling;
                         }
                        questionTextForFeedback = fullArabicQuestion.trim() || questionStrongElement.textContent.replace(/^\d+\.\s*/, '').trim();

                    } else { // إذا لم يتم العثور على .ar-word، استخدم النص الإنجليزي أو النص الكامل
                        const englishTextNode = Array.from(questionStrongElement.childNodes).find(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim().startsWith('('));
                        if (englishTextNode) {
                            questionTextForFeedback = englishTextNode.textContent.trim().replace(/[()]/g, '').trim();
                        } else {
                             // fallback to the entire strong tag content minus the leading number
                            questionTextForFeedback = questionStrongElement.textContent.replace(/^\d+\.\s*/, '').trim().split('(')[0].trim();
                        }
                    }
                }


                if (selectedOption) {
                    const userAnswer = selectedOption.value;
                    // الوصول للإجابة الصحيحة باستخدام mcqId و questionName
                    const correctAnswer = correctAnswers[mcqId]?.[questionName]; 
                    const selectedLabelElement = questionsContainer.querySelector(`label[for="${selectedOption.id}"]`);
                    let selectedLabel = selectedLabelElement ? selectedLabelElement.textContent.trim() : "Selected Option";


                    if (userAnswer === correctAnswer) {
                        score++;
                        feedbackHTML += `<li class="text-success"><i class="fas fa-check-circle me-2"></i>${questionTextForFeedback}: صحيح!</li>`;
                    } else {
                        let explanation = mcqExplanations[mcqId]?.[questionName]?.[userAnswer] || "حاول مراجعة الحوار لمعرفة الإجابة الصحيحة.";
                        const correctLabelElement = questionsContainer.querySelector(`input[name="${questionName}"][value="${correctAnswer}"]`);
                        let correctAnswerText = correctAnswer; 
                        if(correctLabelElement) {
                           const correctLabelFor = questionsContainer.querySelector(`label[for="${correctLabelElement.id}"]`);
                           if(correctLabelFor) correctAnswerText = correctLabelFor.textContent.trim();
                        }

                        feedbackHTML += `<li class="text-danger"><i class="fas fa-times-circle me-2"></i>${questionTextForFeedback}: خطأ. 
                                         إجابتك: "${selectedLabel}". الإجابة الصحيحة: "${correctAnswerText}".
                                         <small class="d-block text-muted">${explanation}</small></li>`;
                    }
                } else {
                    feedbackHTML += `<li class="text-warning"><i class="fas fa-exclamation-circle me-2"></i>${questionTextForFeedback}: لم يتم الإجابة عليه.</li>`;
                }
            });

            feedbackHTML += `</ul><p class="mt-3"><strong>نتيجتك: ${score} من ${totalQuestions}</strong></p>`;
            feedbackDiv.innerHTML = feedbackHTML;
            feedbackDiv.classList.remove('animate__fadeOut', 'animate__fadeIn');
            feedbackDiv.classList.add('animate__animated', 'animate__fadeIn');
            
            setTimeout(() => {
                feedbackDiv.classList.remove('animate__animated', 'animate__fadeIn');
            }, 1000);
        });
    });


    // Animations on Scroll using Intersection Observer
    const animatedSections = document.querySelectorAll('.animate__animated'); // استهداف كل العناصر المتحركة
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // أقل ظهور للعنصر لتشغيل الحركة
    };



    // Drag and Drop Functionality
    const draggables = document.querySelectorAll('.draggable-item');
    const droppables = document.querySelectorAll('.droppable-area');
    const dragDropFeedback = document.getElementById('drag-drop-feedback');
    let draggedItem = null;

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', (e) => {
            draggedItem = e.target.closest('.draggable-item'); 
            if (draggedItem) { 
                setTimeout(() => {
                    if (draggedItem) draggedItem.style.opacity = '0.5';
                }, 0);
                e.dataTransfer.setData('text/plain', draggable.id);
                e.dataTransfer.effectAllowed = 'move';
            }
        });

        draggable.addEventListener('dragend', () => {
            if (draggedItem) {
                 draggedItem.style.opacity = '1';
            }
            draggedItem = null;
        });
    });

    droppables.forEach(droppable => {
        droppable.addEventListener('dragover', (e) => {
            e.preventDefault();
            droppable.classList.add('drag-over');
            e.dataTransfer.dropEffect = 'move';
        });

        droppable.addEventListener('dragleave', () => {
            droppable.classList.remove('drag-over');
        });

        droppable.addEventListener('drop', (e) => {
            e.preventDefault();
            droppable.classList.remove('drag-over');
            const droppedItemId = e.dataTransfer.getData('text/plain');
            const actualDraggedItemElement = document.getElementById(droppedItemId); 

            if (dragDropFeedback) dragDropFeedback.className = 'mt-3'; 

            if (actualDraggedItemElement && droppable.dataset.match === actualDraggedItemElement.id) {
                if (droppable.querySelector('.draggable-item')) {
                     if (dragDropFeedback) {
                        dragDropFeedback.textContent = 'هذا المكان متطابق بشكل صحيح بالفعل.';
                        dragDropFeedback.classList.add('text-warning', 'animate__animated', 'animate__headShake');
                     }
                     if(actualDraggedItemElement) actualDraggedItemElement.style.opacity = '1';
                     return;
                }

                const clonedItem = actualDraggedItemElement.cloneNode(true);
                clonedItem.style.opacity = '1';
                clonedItem.removeAttribute('draggable');
                clonedItem.style.cursor = 'default';


                droppable.innerHTML = '';
                droppable.appendChild(clonedItem); 
                actualDraggedItemElement.style.display = 'none';
                
                droppable.classList.add('dropped-correct');
                if (dragDropFeedback) {
                    dragDropFeedback.textContent = 'مطابقة صحيحة!';
                    dragDropFeedback.classList.add('text-success', 'animate__animated', 'animate__pulse');
                }
            } else {
                droppable.classList.add('dropped-incorrect');
                if (dragDropFeedback) {
                    dragDropFeedback.textContent = 'مطابقة غير صحيحة. حاول مرة أخرى.';
                    dragDropFeedback.classList.add('text-danger', 'animate__animated', 'animate__shakeX');
                }
                if(actualDraggedItemElement) actualDraggedItemElement.style.opacity = '1'; 
            }
            if (dragDropFeedback) {
                setTimeout(() => {
                    dragDropFeedback.textContent = '';
                    dragDropFeedback.className = 'mt-3'; 
                    droppable.classList.remove('dropped-correct', 'dropped-incorrect');
                }, 2500); 
            }
        });
    });

});