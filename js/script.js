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
        dialogue3: {
            q1_d3: 'b',
            q2_d3: 'b',
            q3_d3: 'b'
        },
        "dialogue-chapter5": {
            q1_d_ch5: 'b',
            q2_d_ch5: 'c',
            q3_d_ch5: 'b',
            q4_d_ch5: 'b'
        },
        "dialogue-chapter5-d2": {
            q1_d_ch5d2: 'b',
            q2_d_ch5d2: 'b',
            q3_d_ch5d2: 'a'
        },
        "dialogue-chapter5-d3": {
            q1_d_ch5d3: 'b',
            q2_d_ch5d3: 'a',
            q3_d_ch5d3: 'c'
        },
        // --- START: الإجابات الجديدة للفصل السادس ---
        "dialogue-chapter6": {
            q1_ch6: 'b', // لأنه لا يسمع الأذان
            q2_ch6: 'c', // بعد صلاة الفجر
            q3_ch6: 'b'  // أن يضع المنبه بجانبه
        },
        // --- END: الإجابات الجديدة للفصل السادس ---
        // --- START: الإجابات الجديدة للفصل السادس - الحوار الثاني ---
        "dialogue-chapter6-d2": {
            q1_ch6d2: 'a', // إلى المدينة
            q2_ch6d2: 'a', // في المسجد الحرام
            q3_ch6d2: 'c'  // بالطائرة
        },
        // --- END: الإجابات الجديدة للفصل السادس - الحوار الثاني ---
        // --- START: الإجابات الجديدة للفصل السادس - الحوار الثالث ---
        "dialogue-chapter6-d3": {
            q1_ch6d3: 'b',
            q2_ch6d3: 'c',
            q3_ch6d3: 'a'
        },
        // --- END: الإجابات الجديدة للفصل السادس - الحوار الثالث ---
        "dialogue-chapter7-d1": {
            q1_ch7: 'b', // خمسة أيام
            q2_ch7: 'c', // في شهر رمضان
            q3_ch7: 'c'  // بدأت الحصة وجاء المعلم
        },
        // --- END: الإجابات الجديدة للفصل السابع - الحوار الأول ---
        // --- START: الإجابات الجديدة للفصل السابع - الحوار الثاني ---
        "dialogue-chapter7-d2": {
            q1_ch7d2: 'b', // من سوريا
            q2_ch7d2: 'b', // في جامعة أم القرى
            q3_ch7d2: 'c'  // طبيبة
        },
        // --- END: الإجابات الجديدة للفصل السابع - الحوار الثاني ---
        // --- START: الإجابات الجديدة للفصل السابع - الحوار الثالث ---
        "dialogue-chapter7-d3": {
            q1_ch7d3: 'c', // لأن المدرسة بعيدة
            q2_ch7d3: 'b', // الساعة الواحدة ظهراً
            q3_ch7d3: 'c'  // إلى المكتبة أو المختبر
        },
        // --- END: الإجابات الجديدة للفصل السابع - الحوار الثالث ---
        // --- END: الإجابات الجديدة للفصل السابع - الحوار الثالث ---

        // =======================================================
        // ==== START: الإجابات الجديدة للفصل الثامن (العمل) ====
        // =======================================================
        "dialogue-chapter8-d1": {
            q1_ch8d1: 'b', // يعمل في شركة
            q2_ch8d1: 'b', // يعمل ثماني ساعات
            q3_ch8d1: 'b'  // المرأة (التي تعمل 8 ساعات) تعمل أكثر
        },
        "dialogue-chapter8-d2": {
            q1_ch8d2: 'c', // الطالب السادس
            q2_ch8d2: 'a'  // يدرس التربية
        },
        "dialogue-chapter8-d3": {
            q1_ch8d3: 'b', // تدرس في المرحلة المتوسطة
            q2_ch8d3: 'c'  // لديها خمسة أطفال
        }
        // =======================================================
        // ==== END: الإجابات الجديدة للفصل الثامن (العمل) ====
        // =======================================================

    };

    const mcqExplanations = {
        dialogue1: {
            q1_d1: { a: "خطأ. طاهر يستيقظ مبكراً جداً، عند الفجر (عِنْدَ الْفَجْرِ)، وليس بعد الظهر.", c: "خطأ. الفجر (الْفَجْرِ) في الصباح الباكر، وليس في المساء (الْمَسَاءِ)." },
            q2_d1: { a: "خطأ. طاهر يصلي الفجر في المسجد (فِي الْمَسْجِدِ).", b: "خطأ. طاهر يصلي الفجر في المسجد، وليس في المدرسة." },
            q3_d1: { a: "خطأ. طاهر يذهب إلى المدرسة بالحافلة (بِالْحَافِلَةِ).", c: "خطأ. الحوار يذكر الحافلة، وليس القطار." }
        },
        dialogue2: {
            q1_d2: { a: "خطأ. الجدة هي التي ستغسل الأطباق.", c: "خطأ. لطيفة هي التي ستكوي الملابس. طارق سيكنس غرفة الجلوس." },
            q2_d2: { a: "خطأ. طارق سيكنس غرفة الجلوس.", b: "خطأ. لطيفة ستكوي الملابس. الجدة هي التي ستغسل الأطباق." }
        },
        dialogue3: {
            q1_d3: { a: "خطأ. عادل هو الذي يستيقظ متأخراً. فيصل يستيقظ مبكراً.", c: "خطأ. الحوار لا يذكر استيقاظ فيصل عند الظهر، بل مبكراً." },
            q2_d3: { a: "خطأ جزئي. عادل يشاهد التلفاز فقط. فيصل هو من يقرأ.", c: "خطأ. فيصل هو من يقرأ صحيفة أو كتاباً. عادل يشاهد التلفاز." },
            q3_d3: { a: "خطأ. كلاهما يصلي في المسجد الكبير.", c: "خطأ. كلاهما يصلي في المسجد الكبير، وليس في البيت." }
        },
        "dialogue-chapter5": {
            q1_d_ch5: { a: "خطأ. سالم يذهب إلى المطعم وليس إلى المدرسة في هذا الحوار.", c: "خطأ. سالم يذهب إلى المطعم." },
            q2_d_ch5: { a: "خطأ. قاسم هو من يأكل وجبة واحدة. سالم يأكل ثلاث وجبات.", b: "خطأ. سالم يأكل ثلاث وجبات، وليس وجبتين." },
            q3_d_ch5: { a: "خطأ. سالم هو من يأكل الأرز والخبز. قاسم يأكل السمك والسلطة والفاكهة.", c: "خطأ. الدجاج والبطاطس لم يذكرا في غداء قاسم." },
            q4_d_ch5: { a: "خطأ. قاسم وزنه ستون كيلاً. سالم وزنه مئة كيل.", c: "خطأ. وزن سالم مئة كيل، وليس سبعون." }
        },
        "dialogue-chapter5-d2": {
            q1_d_ch5d2: { a: "خطأ. المسافرة طلبت السمك والأرز.", c: "خطأ. المسافرة طلبت السمك والأرز كطعام رئيسي." },
            q2_d_ch5d2: { a: "خطأ. المسافرة قالت إنها تفضل القهوة على الشاي.", c: "خطأ. سُئلت عن الشاي أو القهوة، واختارت القهوة." },
            q3_d_ch5d2: { b: "خطأ. المسافرة أكدت أنها تريد القهوة بالحليب." }
        },
        "dialogue-chapter5-d3": {
            q1_d_ch5d3: { a: "خطأ. على الرغم من أن الزوج جائع، إلا أن كثرة الطعام كانت بسبب الضيوف.", c: "خطأ. يوم العطلة قد يكون السبب، لكن السبب المباشر المذكور هو وجود ضيوف." },
            q2_d_ch5d3: { b: "خطأ. الحوار يذكر أن ضيوف الزوجة هم والدها ووالدتها وأخوها.", c: "خطأ. الحوار لا يذكر الجيران." },
            q3_d_ch5d3: { a: "خطأ. الضيوف كانوا في غرفة الجلوس.", b: "خطأ. كانوا في غرفة الجلوس وليس غرفة النوم." }
        },
        // --- START: الشروحات الجديدة للفصل السادس ---
        "dialogue-chapter6": {
            q1_ch6: {
                a: "خطأ. هذا هو سبب عدم قدرته على الاستيقاظ، ولكن السبب المباشر لصلاته في البيت هو أنه لا يسمع الأذان.",
                c: "خطأ. العكس هو الصحيح، هو يستيقظ متأخراً."
            },
            q2_ch6: {
                a: "خطأ. هو يستيقظ بعد صلاة الفجر.",
                b: "خطأ. هو يستيقظ بعد صلاة الفجر."
            },
            q3_ch6: {
                a: "خطأ. لم يقترح مصطفى أن ينام مبكراً، بل اقترح حلاً آخر.",
                c: "خطأ. هذا هو الهدف، ولكن الاقتراح هو الوسيلة لتحقيق هذا الهدف."
            }
        },
        // --- END: الشروحات الجديدة للفصل السادس ---
        // --- START: الشروحات الجديدة للفصل السادس - الحوار الثاني ---
        "dialogue-chapter6-d2": {
            q1_ch6d2: {
                b: "خطأ. عصام يسافر إلى المدينة. صالح هو الذي يسافر إلى مكة.",
                c: "خطأ. الحوار يذكر مكة والمدينة فقط."
            },
            q2_ch6d2: {
                b: "خطأ. صالح يصلي في المسجد الحرام. عصام هو من يصلي في المسجد النبوي.",
                c: "خطأ. كلاهما سيصلي الجمعة في المسجد."
            },
            q3_ch6d2: {
                a: "خطأ. الحوار لم يذكر السيارة.",
                b: "خطأ. الحوار لم يذكر الحافلة. ذكرت الطائرة."
            }
        },
        // --- END: الشروحات الجديدة للفصل السادس - الحوار الثاني ---
        // --- START: الشروحات الجديدة للفصل السادس - الحوار الثالث ---
        "dialogue-chapter6-d3": {
            q1_ch6d3: {
                a: "خطأ. صادق لم يذكر أنه مريض، بل قال إنه بخير.",
                c: "خطأ. هذا ليس السبب المباشر، بل كان عذره أن المسجد بعيد."
            },
            q2_ch6d3: {
                a: "خطأ. صابر قال إن صادقاً كسلان، وليس نشيطاً.",
                b: "خطأ. صادق أكد أنه ليس مريضاً."
            },
            q3_ch6d3: {
                b: "خطأ. في النهاية، قرر الذهاب إلى المسجد.",
                c: "خطأ. قرر الذهاب لصلاة العصر، وليس انتظار الصلاة القادمة."
            }
        },
        // --- END: الشروحات الجديدة للفصل السادس - الحوار الثالث ---
        // --- START: الشروحات الجديدة للفصل السابع - الحوار الأول ---
        "dialogue-chapter7-d1": {
            q1_ch7: {
                a: "خطأ. الحوار يذكر أن الدراسة خمسة أيام.",
                c: "خطأ. الحوار يذكر أن الدراسة خمسة أيام."
            },
            q2_ch7: {
                a: "خطأ. في شهر شعبان تبدأ الاختبارات، ولكن العام الدراسي ينتهي في رمضان.",
                b: "خطأ. لم يذكر الحوار شهر شوال."
            },
            q3_ch7: {
                a: "خطأ. الحوار يقول إن الحصة بدأت، ولم تنتهِ.",
                b: "خطأ. الحوار يقول إن المعلم جاء، ولم يغادر."
            }
        },
        // --- END: الشروحات الجديدة للفصل السابع - الحوار الأول ---

        // --- START: الشروحات الجديدة للفصل السابع - الحوار الثاني ---
        "dialogue-chapter7-d2": {
            q1_ch7d2: {
                a: "خطأ. إلهام هي التي من السعودية. ندى من سوريا.",
                c: "خطأ. الحوار لا يذكر مصر."
            },
            q2_ch7d2: {
                a: "خطأ. ندى هي التي تدرس في جامعة دمشق. إلهام تدرس في جامعة أم القرى.",
                c: "خطأ. الحوار لا يذكر جامعة القاهرة."
            },
            q3_ch7d2: {
                a: "خطأ. إلهام هي التي ستكون مدرسة. ندى ستكون طبيبة.",
                b: "خطأ. ندى طالبة الآن، لكنها ستكون طبيبة في المستقبل."
            }
        },
        // --- END: الشروحات الجديدة للفصل السابع - الحوار الثاني ---
        // --- START: الشروحات الجديدة للفصل السابع - الحوار الثالث ---
        "dialogue-chapter7-d3": {
            q1_ch7d3: {
                a: "خطأ. غسان قال إن المدرسة بعيدة، وليست قريبة.",
                b: "خطأ. هذا ليس السبب المذكور في الحوار."
            },
            q2_ch7d3: {
                a: "خطأ. اليوم الدراسي يبدأ الساعة السابعة، وينتهي الواحدة.",
                c: "خطأ. في الساعة السادسة، يكون غسان ذاهباً إلى المدرسة."
            },
            q3_ch7d3: {
                a: "خطأ. يذهب إلى المكتبة أو المختبر وليس إلى البيت.",
                b: "خطأ. الحوار لا يذكر المطعم."
            }
        },
        // --- END: الشروحات الجديدة للفصل السابع - الحوار الثالث ---
        // --- END: الشروحات الجديدة للفصل السابع - الحوار الثالث ---

        // =======================================================
        // ==== START: الشروحات الجديدة للفصل الثامن (العمل) ====
        // =======================================================
        "dialogue-chapter8-d1": {
            q1_ch8d1: {
                a: "خطأ. هذه وظيفة الرجل الآخر في الحوار.",
                c: "خطأ. الرجل يعمل في شركة، والمرأة تعمل في مستشفى."
            },
            q2_ch8d1: {
                a: "خطأ. الرجل يعمل سبع ساعات، بينما المرأة تعمل ثماني ساعات.",
                c: "خطأ. الحوار يذكر سبع وثماني ساعات فقط."
            },
            q3_ch8d1: {
                a: "خطأ. الرجل يعمل 7 ساعات، والمرأة 8 ساعات، فالمرأة تعمل أكثر.",
                c: "خطأ. هناك فرق ساعة واحدة في العمل بينهما."
            }
        },
        "dialogue-chapter8-d2": {
            q1_ch8d2: {
                a: "خطأ. الطالب الخامس سيدرس الهندسة ليعمل مهندساً.",
                b: "خطأ. الطالب الثالث سيدرس الصيدلة ليعمل صيدلياً."
            },
            q2_ch8d2: {
                b: "خطأ. من يدرس الطب سيعمل طبيباً.",
                c: "خطأ. من يدرس الهندسة سيعمل مهندساً."
            }
        },
        "dialogue-chapter8-d3": {
            q1_ch8d3: {
                a: "خطأ. مريم هي التي تدرس في المرحلة الابتدائية.",
                c: "خطأ. المرحلة الثانوية لم تُذكر في الحوار."
            },
            q2_ch8d3: {
                a: "خطأ. العدد المذكور في الحوار هو خمسة أطفال.",
                b: "خطأ. زينب لديها خمسة أطفال."
            }
        }
        // =======================================================
        // ==== END: الشروحات الجديدة للفصل الثامن (العمل) ====
        // =======================================================
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

                let questionNameSuffix;
                if (mcqId === 'dialogue1') {
                    questionNameSuffix = 'd1';
                } else if (mcqId === 'dialogue2') {
                    questionNameSuffix = 'd2';
                } else if (mcqId === 'dialogue3') {
                    questionNameSuffix = 'd3';
                } else if (mcqId === 'dialogue-chapter5') {
                    questionNameSuffix = 'd_ch5';
                } else if (mcqId === 'dialogue-chapter5-d2') {
                    questionNameSuffix = 'd_ch5d2';
                } else if (mcqId === 'dialogue-chapter5-d3') {
                    questionNameSuffix = 'd_ch5d3';
                } else if (mcqId === 'dialogue-chapter6') {
                    questionNameSuffix = 'ch6';
                } else if (mcqId === 'dialogue-chapter6-d2') {
                    questionNameSuffix = 'ch6d2';
                } else if (mcqId === 'dialogue-chapter6-d3') {
                    questionNameSuffix = 'ch6d3';
                } else if (mcqId === 'dialogue-chapter7-d1') {
                    questionNameSuffix = 'ch7';
                }
                else if (mcqId === 'dialogue-chapter7-d2') {
                    questionNameSuffix = 'ch7d2';
                } else if (mcqId === 'dialogue-chapter7-d3') {
                    questionNameSuffix = 'ch7d3';
                }
                // --- START: أضف هذا الجزء للوحدة الثامنة ---
                else if (mcqId === 'dialogue-chapter8-d1') {
                    questionNameSuffix = 'ch8d1';
                } else if (mcqId === 'dialogue-chapter8-d2') {
                    questionNameSuffix = 'ch8d2';
                } else if (mcqId === 'dialogue-chapter8-d3') {
                    questionNameSuffix = 'ch8d3';
                }
                // --- END: أضف هذا الجزء للوحدة الثامنة ---
                // ---
                else {
                    console.warn(`Unhandled mcqId for question name suffix: ${mcqId}`);
                    questionNameSuffix = mcqId;
                }

                const questionName = `q${index + 1}_${questionNameSuffix}`;
                const selectedOption = questionsContainer.querySelector(`input[name="${questionName}"]:checked`);
                const questionStrongElement = questionDiv.querySelector('strong');
                let questionTextForFeedback = `السؤال ${index + 1}`;

                if (questionStrongElement) {
                    // يحاول استخراج النص العربي من السؤال
                    const arabicSpans = questionStrongElement.querySelectorAll('.ar-word');
                    let fullArabicQuestion = "";
                    if (arabicSpans.length > 0) {
                        arabicSpans.forEach(span => {
                            fullArabicQuestion += span.textContent + " ";
                        });
                        questionTextForFeedback = fullArabicQuestion.trim();
                    } else {
                        // fallback to full text content if no .ar-word spans
                        questionTextForFeedback = questionStrongElement.textContent.replace(/^\d+\.\s*/, '').trim().split('(')[0].trim();
                    }
                }

                if (selectedOption) {
                    const userAnswer = selectedOption.value;
                    const correctAnswer = currentCorrectAnswers[questionName];
                    const selectedLabelElement = questionsContainer.querySelector(`label[for="${selectedOption.id}"]`);
                    let selectedLabel = selectedLabelElement ? selectedLabelElement.textContent.trim() : "Selected Option";

                    if (userAnswer === correctAnswer) {
                        score++;
                        feedbackHTML += `<li class="text-success" dir="rtl"><i class="fas fa-check-circle ms-2"></i><strong>${questionTextForFeedback}:</strong> صحيح!</li>`;
                    } else {
                        let explanation = currentExplanations?.[questionName]?.[userAnswer] || "حاول مراجعة الحوار لمعرفة الإجابة الصحيحة.";
                        const correctRadioInput = questionsContainer.querySelector(`input[name="${questionName}"][value="${correctAnswer}"]`);
                        let correctAnswerText = "غير محدد";
                        if (correctRadioInput) {
                            const correctLabel = questionsContainer.querySelector(`label[for="${correctRadioInput.id}"]`);
                            if (correctLabel) {
                                correctAnswerText = correctLabel.textContent.trim();
                            }
                        }

                        feedbackHTML += `<li class="text-danger" dir="rtl"><i class="fas fa-times-circle ms-2"></i><strong>${questionTextForFeedback}:</strong> خطأ. 
                                         <div class="ms-4">إجابتك: "${selectedLabel}".</div>
                                         <div class="ms-4">الإجابة الصحيحة: "${correctAnswerText}".</div>
                                         <small class="d-block text-muted ms-4">${explanation}</small></li>`;
                    }
                } else {
                    feedbackHTML += `<li class="text-warning" dir="rtl"><i class="fas fa-exclamation-circle ms-2"></i><strong>${questionTextForFeedback}:</strong> لم يتم الإجابة عليه.</li>`;
                }
            });

            feedbackHTML += `</ul><p class="mt-3"><strong>نتيجتك: ${score} من ${totalQuestions}</strong></p>`;
            feedbackDiv.innerHTML = feedbackHTML;
            feedbackDiv.classList.remove('animate__fadeOut', 'animate__fadeIn');
            feedbackDiv.style.display = 'block';
            feedbackDiv.classList.add('animate__animated', 'animate__fadeIn');

            setTimeout(() => {
                feedbackDiv.classList.remove('animate__animated', 'animate__fadeIn');
            }, 1000);
        });
    });


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