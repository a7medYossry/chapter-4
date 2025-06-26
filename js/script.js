document.addEventListener('DOMContentLoaded', () => {
    // Progress Bar
    window.onscroll = function () { updateProgressBar() };

    function updateProgressBar() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        const progressBar = document.getElementById("myBar");
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

    const savedTheme = localStorage.getItem('theme') || 'light';
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
            q1_d1: 'b',
            q2_d1: 'c',
            q3_d1: 'b'
        },
        dialogue2: {
            q1_d2: 'b',
            q2_d2: 'c'
        },
        dialogue3: { // افترض أن هذا القسم موجود ومستخدم
            q1_d3: 'b',
            q2_d3: 'b',
            q3_d3: 'b'
        },
        "dialogue-chapter5": { // --- قسم جديد ---
            q1_d_ch5: 'b', // إلى المطعم
            q2_d_ch5: 'c', // ثلاث وجبات
            q3_d_ch5: 'b', // السمك والسلطة والفاكهة
            q4_d_ch5: 'b'  // مئة كيل
        },
        "dialogue-chapter5-d2": { // --- القسم الجديد للحوار الثاني من الوحدة الخامسة ---
            q1_d_ch5d2: 'b', // بعض السمك والأرز
            q2_d_ch5d2: 'b', // القهوة
            q3_d_ch5d2: 'a'  // نعم (تريد القهوة بالحليب)
        }
    };

    const mcqExplanations = {
        dialogue1: {
            q1_d1: {
                a: "خطأ. طاهر يستيقظ مبكراً جداً، عند الفجر (عِنْدَ الْفَجْرِ)، وليس بعد الظهر.",
                c: "خطأ. الفجر (الْفَجْرِ) في الصباح الباكر، وليس في المساء (الْمَسَاءِ)."
            },
            q2_d1: {
                a: "خطأ. طاهر يصلي الفجر في المسجد (فِي الْمَسْجِدِ).",
                b: "خطأ. طاهر يصلي الفجر في المسجد، وليس في المدرسة."
            },
            q3_d1: {
                a: "خطأ. طاهر يذهب إلى المدرسة بالحافلة (بِالْحَافِلَةِ).",
                c: "خطأ. الحوار يذكر الحافلة، وليس القطار."
            }
        },
        dialogue2: {
            q1_d2: {
                a: "خطأ. الجدة هي التي ستغسل الأطباق.",
                c: "خطأ. لطيفة هي التي ستكوي الملابس. طارق سيكنس غرفة الجلوس."
            },
            q2_d2: {
                a: "خطأ. طارق سيكنس غرفة الجلوس.",
                b: "خطأ. لطيفة ستكوي الملابس. الجدة هي التي ستغسل الأطباق."
            }
        },
        dialogue3: { // افترض أن هذا القسم موجود ومستخدم
            q1_d3: {
                a: "خطأ. عادل هو الذي يستيقظ متأخراً. فيصل يستيقظ مبكراً.",
                c: "خطأ. الحوار لا يذكر استيقاظ فيصل عند الظهر، بل مبكراً."
            },
            q2_d3: {
                a: "خطأ جزئي. عادل يشاهد التلفاز فقط. فيصل هو من يقرأ.",
                c: "خطأ. فيصل هو من يقرأ صحيفة أو كتاباً. عادل يشاهد التلفاز."
            },
            q3_d3: {
                a: "خطأ. كلاهما يصلي في المسجد الكبير.",
                c: "خطأ. كلاهما يصلي في المسجد الكبير، وليس في البيت."
            }
        },
        "dialogue-chapter5": { // --- قسم جديد ---
            q1_d_ch5: {
                a: "خطأ. سالم يذهب إلى المطعم وليس إلى المدرسة في هذا الحوار.",
                c: "خطأ. سالم يذهب إلى المطعم."
            },
            q2_d_ch5: {
                a: "خطأ. قاسم هو من يأكل وجبة واحدة. سالم يأكل ثلاث وجبات.",
                b: "خطأ. سالم يأكل ثلاث وجبات، وليس وجبتين."
            },
            q3_d_ch5: {
                a: "خطأ. سالم هو من يأكل الأرز والخبز. قاسم يأكل السمك والسلطة والفاكهة.",
                c: "خطأ. الدجاج والبطاطس لم يذكرا في غداء قاسم."
            },
            q4_d_ch5: {
                a: "خطأ. قاسم وزنه ستون كيلاً. سالم وزنه مئة كيل.",
                c: "خطأ. وزن سالم مئة كيل، وليس سبعون."
            }
        }
        ,
        "dialogue-chapter5-d2": { // --- قسم الشرح الجديد للحوار الثاني من الوحدة الخامسة ---
            q1_d_ch5d2: {
                a: "خطأ. المسافرة طلبت السمك والأرز.",
                c: "خطأ. المسافرة طلبت السمك والأرز كطعام رئيسي."
            },
            q2_d_ch5d2: {
                a: "خطأ. المسافرة قالت إنها تفضل القهوة على الشاي.",
                c: "خطأ. سُئلت عن الشاي أو القهوة، واختارت القهوة."
            },
            q3_d_ch5d2: {
                b: "خطأ. المسافرة أكدت أنها تريد القهوة بالحليب."
            }
        }
    };


    document.querySelectorAll('.check-answers-btn').forEach(button => {
        button.addEventListener('click', () => {
            const mcqId = button.dataset.mcqId;
            const questionsContainer = document.getElementById(`mcq-${mcqId}`);
            if (!questionsContainer) {
                console.error(`Questions container with ID 'mcq-${mcqId}' not found.`);
                return;
            }

            const feedbackDiv = questionsContainer.querySelector('.feedback');
            if (!feedbackDiv) {
                console.error(`Feedback div not found within 'mcq-${mcqId}'.`);
                return;
            }

            let score = 0;
            let totalQuestions = 0;
            let feedbackHTML = '<h4>النتائج:</h4><ul>';

            const currentCorrectAnswers = correctAnswers[mcqId];
            const currentExplanations = mcqExplanations[mcqId];

            if (!currentCorrectAnswers) {
                console.error(`No correct answers defined for mcqId: ${mcqId}`);
                feedbackDiv.innerHTML = `<p class="text-danger">خطأ في الإعداد: لم يتم تحديد الإجابات الصحيحة لهذا القسم.</p>`;
                return;
            }

            questionsContainer.querySelectorAll('.mcq-question').forEach((questionDiv, index) => {
                totalQuestions++;
                // تحديد الجزء المتغير من اسم السؤال بناءً على mcqId
                let questionNameSuffix;
                if (mcqId === 'dialogue1') {
                    questionNameSuffix = 'd1';
                } else if (mcqId === 'dialogue2') {
                    questionNameSuffix = 'd2';
                } else if (mcqId === 'dialogue3') {
                    questionNameSuffix = 'd3';
                } else if (mcqId === 'dialogue-chapter5') {
                    questionNameSuffix = 'd_ch5';
                } else if (mcqId === 'dialogue-chapter5-d2') { // --- إضافة شرط للقسم الجديد ---
                    questionNameSuffix = 'd_ch5d2';
                }
                else {
                    console.warn(`Unhandled mcqId for question name suffix: ${mcqId}`);
                    questionNameSuffix = mcqId; // fallback or handle as error
                }

                const questionName = `q${index + 1}_${questionNameSuffix}`;
                const selectedOption = questionsContainer.querySelector(`input[name="${questionName}"]:checked`);
                const questionStrongElement = questionDiv.querySelector('strong');
                let questionTextForFeedback = `السؤال ${index + 1}`;

                if (questionStrongElement) {
                    const arabicSpans = questionStrongElement.querySelectorAll('.ar-word');
                    let fullArabicQuestion = "";
                    if (arabicSpans.length > 0) {
                        arabicSpans.forEach(span => {
                            fullArabicQuestion += span.textContent + " ";
                        });
                        let nextNode = arabicSpans[arabicSpans.length - 1].nextSibling;
                        while (nextNode && nextNode.nodeType === Node.TEXT_NODE && !nextNode.textContent.includes('(')) {
                            fullArabicQuestion += nextNode.textContent.trim();
                            nextNode = nextNode.nextSibling;
                        }
                        questionTextForFeedback = fullArabicQuestion.trim() || questionStrongElement.textContent.replace(/^\d+\.\s*/, '').trim();
                    } else {
                        const englishTextNode = Array.from(questionStrongElement.childNodes).find(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim().startsWith('('));
                        if (englishTextNode) {
                            questionTextForFeedback = englishTextNode.textContent.trim().replace(/[()]/g, '').trim();
                        } else {
                            questionTextForFeedback = questionStrongElement.textContent.replace(/^\d+\.\s*/, '').trim().split('(')[0].trim();
                        }
                    }
                }


                if (selectedOption) {
                    const userAnswer = selectedOption.value;
                    const correctAnswer = currentCorrectAnswers[questionName];
                    const selectedLabelElement = questionsContainer.querySelector(`label[for="${selectedOption.id}"]`);
                    let selectedLabel = selectedLabelElement ? selectedLabelElement.textContent.trim() : "Selected Option";

                    if (userAnswer === correctAnswer) {
                        score++;
                        feedbackHTML += `<li class="text-success"><i class="fas fa-check-circle me-2"></i>${questionTextForFeedback}: صحيح!</li>`;
                    } else {
                        let explanation = currentExplanations?.[questionName]?.[userAnswer] || "حاول مراجعة الحوار لمعرفة الإجابة الصحيحة.";
                        const correctLabelElement = questionsContainer.querySelector(`input[name="${questionName}"][value="${correctAnswer}"]`);
                        let correctAnswerText = correctAnswer;
                        if (correctLabelElement) {
                            const correctLabelFor = questionsContainer.querySelector(`label[for="${correctLabelElement.id}"]`);
                            if (correctLabelFor) correctAnswerText = correctLabelFor.textContent.trim();
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
            feedbackDiv.classList.remove('animate__fadeOut', 'animate__fadeIn'); // Reset animation classes
            feedbackDiv.style.display = 'block'; // Make sure it's visible
            feedbackDiv.classList.add('animate__animated', 'animate__fadeIn');

            // Remove animation classes after a delay to allow re-triggering
            setTimeout(() => {
                feedbackDiv.classList.remove('animate__animated', 'animate__fadeIn');
            }, 1000); // Adjust delay as needed
        });
    });


    // Animations on Scroll using Intersection Observer (If you are using it, keep it)
    // const animatedSections = document.querySelectorAll('.animate__animated');
    // const observerOptions = { /* ... */ };
    // const observer = new IntersectionObserver((entries, observer) => { /* ... */ }, observerOptions);
    // animatedSections.forEach(section => { observer.observe(section); });


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
                    if (actualDraggedItemElement) actualDraggedItemElement.style.opacity = '1';
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
                if (actualDraggedItemElement) actualDraggedItemElement.style.opacity = '1';
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