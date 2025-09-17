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
        },
        // =======================================================
        // ==== END: الإجابات الجديدة للفصل الثامن (العمل) ====
        // =======================================================
        // --- START: Answers for Body Parts Exercises ---
        "bp1": {
            q1_bp: 'b',
            q2_bp: 'a',
            q3_bp: 'c'
        },
        // --- END: Answers for Body Parts Exercises ---
        // --- START: Add this block for Professions answers ---
        "p1": {
            q1_p: 'c',
            q2_p: 'a',
            q3_p: 'b'
        },
        // --- END: Add this block for Professions answers ---
        // داخل كائن correctAnswers، أضف:
        "cl1": {
            q1_cl: 'b',
            q2_cl: 'c',
            q3_cl: 'b'
        },
        // Inside the correctAnswers object, add:
        "w1": {
            q1_w: 'b',
            q2_w: 'c',
            q3_w: 'a'
        },
        // --- START: Add this block for Food answers ---
        "f1": {
            q1_f: 'b',
            q2_f: 'a',
            q3_f: 'c'
        },
        // --- END: Add this block for Food answers ---
        // --- START: Add this block for Household Tools answers ---
        "ht1": {
            q1_ht: 'a',
            q2_ht: 'c',
            q3_ht: 'b'
        },
        // --- END: Add this block for Household Tools answers ---
        // --- START: Add this block for Fruits answers ---
        "fr1": {
            q1_fr: 'b',
            q2_fr: 'a',
            q3_fr: 'b'
        },
        // --- END: Add this block for Fruits answers ---

        // --- START: Add this block for NEW Vegetables answers ---
        "veg1": {
            q1_veg: 'b',
            q2_veg: 'a',
            q3_veg: 'c'
        },
        // --- END: Add this block for NEW Vegetables answers ---
        // --- START: Add this block for Furniture answers ---
        "furn1": {
            q1_furn: 'b', // الْخِزَانَة
            q2_furn: 'a', // الْمِدْفَأَة
            q3_furn: 'c'  // الْكُرْسِيّ
        },
        // --- END: Add this block for Furniture answers ---
        // --- START: Add this block for Travel answers ---
        "travel1": {
            q1_travel: 'b', // الْمَحَطَّة
            q2_travel: 'c', // إِقْلَاع
            q3_travel: 'a'  // الْمَحْفَظَة
        },
        // --- END: Add this block for Travel answers ---
        // --- START: Add this block for Health answers ---
        "health1": {
            q1_health: 'b', // جَرَّاح
            q2_health: 'c', // حُمَّى
            q3_health: 'a'  // كَسْر
        },
        // --- END: Add this block for Health answers ---
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
        },
        // =======================================================
        // ==== END: الشروحات الجديدة للفصل الثامن (العمل) ====
        // =======================================================
        // --- START: Explanations for Body Parts Exercises ---
        "bp1": {
            q1_bp: { a: "خطأ. نحن نشم بالأنف.", c: "خطأ. نحن نلمس باليد." },
            q2_bp: { b: "خطأ. الصدر هو جزء من الجذع.", c: "خطأ. الذراع يربط الكتف باليد." },
            q3_bp: { a: "خطأ. نحن نأكل بالفم.", b: "خطأ. نحن نسمع بالأذن." }
        },
        // --- END: Explanations for Body Parts Exercises ---
        // --- START: Add this block for Professions explanations ---
        "p1": {
            q1_p: { a: "خطأ. الطباخ يطبخ الطعام.", b: "خطأ. البناء يبني البيوت." },
            q2_p: { b: "خطأ. الجزار يبيع اللحم.", c: "خطأ. الحلاق يقص الشعر." },
            q3_p: { a: "خطأ. المزارع يزرع الأرض.", c: "خطأ. الشرطي يساعد الناس." }
        },
        // --- END: Add this block for Professions explanations ---
        // وداخل كائن mcqExplanations، أضف:
        "cl1": {
            q1_cl: { a: "خطأ. القفاز يُلبس في اليد.", c: "خطأ. العمامة توضع على الرأس." },
            q2_cl: { a: "خطأ. الحزام يوضع حول الخصر.", b: "خطأ. الجلباب هو لباس خارجي طويل للجسم كله." },
            q3_cl: { a: "خطأ. هذه ملابس خاصة بالحج والعمرة وليست للشتاء.", c: "خطأ. هذه ليست ملابس مدرسة." }
        },
        // Inside the mcqExplanations object, add:
        "w1": {
            q1_w: { a: "خطأ. الضباب يحجب الرؤية ولكنه ليس في العاصفة.", c: "خطأ. الطل هو قطرات ماء في الصباح." },
            q2_w: { a: "خطأ. الرياح تحرك الأشياء ولكنها لا تحجب الرؤية.", b: "خطأ. الجو المشمس يعني رؤية واضحة." },
            q3_w: { b: "خطأ. الجليد هو ماء متجمد.", c: "خطأ. الفيضان هو كثرة الماء." }
        },
        // --- START: Add this block for Food explanations ---
        "f1": {
            q1_f: { a: "خطأ. الزبدة تصنع من الحليب.", c: "خطأ. الجبن أيضاً يصنع من الحليب." },
            q2_f: { b: "خطأ. الفول نبات يزرع في الأرض.", c: "خطأ. العدس هو نوع من الحبوب." },
            q3_f: { a: "خطأ. الفطيرة يمكن أن تكون وجبة رئيسية، لكن الحلوى هي الإجابة الأنسب.", b: "خطأ. الزيت يستخدم في الطبخ وليس كوجبة بعد الطعام." }
        },
        // --- END: Add this block for Food explanations ---
        // --- START: Add this block for Household Tools explanations ---
        "ht1": {
            q1_ht: { b: "خطأ. الشوكة تستخدم لأكل الطعام الصلب.", c: "خطأ. السكين يستخدم للتقطيع." },
            q2_ht: { a: "خطأ. المكنسة تستخدم لتنظيف الأرض.", b: "خطأ. المكواة تستخدم لكي الملابس." },
            q3_ht: { a: "خطأ. القدر يستخدم للطبخ.", c: "خطأ. الإبريق يستخدم لغلي الماء." }
        },
        // --- END: Add this block for Household Tools explanations ---
        // --- START: Add this block for Fruits explanations ---
        "fr1": {
            q1_fr: { a: "خطأ. لون الموز أصفر.", c: "خطأ. لون الموز أصفر وليس أخضر." },
            q2_fr: { b: "خطأ. العنب حلو الطعم.", c: "خطأ. التفاح يمكن أن يكون حلواً أو حامضاً، لكن الليمون هو الأكثر حموضة." },
            q3_fr: { a: "خطأ. الخوخ والمشمش لهما نواة واحدة.", c: "خطأ. الرمان مليء بالحبوب." }
        },
        // --- END: Add this block for Fruits explanations ---

        // --- START: Add this block for NEW Vegetables explanations ---
        "veg1": {
            q1_veg: { a: "خطأ. الكوسة خضراء وليست حارة.", c: "خطأ. الخس أخضر وليس حاراً." },
            q2_veg: { b: "خطأ. البامية تستخدم في أطباق أخرى.", c: "خطأ. القرع يستخدم في أطباق أخرى مثل الفطائر." },
            q3_veg: { a: "خطأ. البقدونس أخضر.", b: "خطأ. الثوم أبيض." }
        },
        // --- END: Add this block for NEW Vegetables explanations ---
        // --- START: Add this block for Furniture explanations ---
        "furn1": {
            q1_furn: { a: "خطأ. الْكُرْسِيّ للجلوس.", c: "خطأ. الْهَاتِف للاتصال." },
            q2_furn: { b: "خطأ. الْمِرْوَحَة تُبَرِّد الغرفة.", c: "خطأ. الْمُكَيِّف يُبَرِّد الغرفة أيضاً." },
            q3_furn: { a: "خطأ. الْفِرَاش للنوم.", b: "خطأ. الطَّاوِلَة لوضع الأشياء عليها." }
        },
        // --- END: Add this block for Furniture explanations ---
        // --- START: Add this block for Travel explanations ---
        "travel1": {
            q1_travel: { a: "خطأ. الْمَرْكَبُ يستخدم في الماء.", c: "خطأ. الْجَمَارِكُ هي نقطة تفتيش عند السفر دولياً." },
            q2_travel: { a: "خطأ. الْهُبُوطُ يكون في نهاية الرحلة.", b: "خطأ. الْوُصُولُ هو النتيجة النهائية للرحلة." },
            q3_travel: { b: "خطأ. السَّفِينَةُ وسيلة نقل بحرية.", c: "خطأ. الدَّرَّاجَةُ وسيلة نقل برية." }
        },
        // --- END: Add this block for Travel explanations ---
        // --- START: Add this block for Health explanations ---
        "health1": {
            q1_health: {
                a: "خطأ. الممرض يساعد الطبيب ولكنه لا يجري العمليات.",
                c: "خطأ. الصيدلي يبيع الدواء."
            },
            q2_health: {
                a: "خطأ. الزكام هو مرض يسبب العطس والسعال، وقد يسبب الحمى أحياناً، لكن ارتفاع الحرارة تحديداً هو الحمى.",
                b: "خطأ. الإسهال هو مشكلة في المعدة."
            },
            q3_health: {
                b: "خطأ. الجرح هو قطع في الجلد.",
                c: "خطأ. النزف هو خروج الدم من الجرح."
            }
        },
        // --- END: Add this block for Health explanations ---
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
                // --- START: Suffix for Body Parts Exercises ---
                else if (mcqId === 'bp1') { questionNameSuffix = 'bp'; }
                // --- END: Suffix for Body Parts Exercises ---
                // --- START: Suffix for Professions Exercises ---
                else if (mcqId === 'p1') { questionNameSuffix = 'p'; }
                // --- END: Suffix for Professions Exercises ---
                // أضف هذا الشرط الجديد
                else if (mcqId === 'cl1') { questionNameSuffix = 'cl'; }
                // Add this new else if condition
                else if (mcqId === 'w1') { questionNameSuffix = 'w'; }
                // --- START: Add this new condition for Food ---
                else if (mcqId === 'f1') { questionNameSuffix = 'f'; }
                // --- END: Add this new condition for Food ---
                // --- START: Add this new condition for Household Tools ---
                else if (mcqId === 'ht1') { questionNameSuffix = 'ht'; }
                // --- END: Add this new condition for Household Tools ---
                // --- START: Add this new condition for Fruits ---
                else if (mcqId === 'fr1') { questionNameSuffix = 'fr'; }
                // --- END: Add this new condition for Fruits ---

                // --- START: Add this new condition for NEW Vegetables ---
                else if (mcqId === 'veg1') { questionNameSuffix = 'veg'; }
                // --- END: Add this new condition for NEW Vegetables ---
                // --- START: Add this new condition for Furniture ---
                else if (mcqId === 'furn1') { questionNameSuffix = 'furn'; }
                // --- END: Add this new condition for Furniture ---
                // --- START: Add this new condition for Travel ---
                else if (mcqId === 'travel1') { questionNameSuffix = 'travel'; }
                // --- END: Add this new condition for Travel ---
                // --- START: Add this new condition for Health ---
                else if (mcqId === 'health1') { questionNameSuffix = 'health'; }
                // --- END: Add this new condition for Health ---
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

    // --- START: Fill in the Blanks Functionality ---
    const checkFillBlanksBtn = document.getElementById('check-fill-blanks-bp2');
    if (checkFillBlanksBtn) {
        checkFillBlanksBtn.addEventListener('click', () => {
            const answers = {
                fill_bp_1: "يَدِي",
                fill_bp_2: "بَطْنِي",
                fill_bp_3: "شَعْري",
                fill_bp_4: "رُكْبَتِي",
                fill_bp_5: "قَدَم"
            };

            const feedbackDiv = document.getElementById('feedback-fill-blanks-bp2');
            let allCorrect = true;
            let feedbackHTML = '<h4>النتائج:</h4><ul>';

            Object.keys(answers).forEach(inputId => {
                const inputElement = document.getElementById(inputId);
                const correctAnswer = answers[inputId];
                // Normalize user input by removing diacritics (tashkeel) for comparison
                const userAnswer = inputElement.value.trim().normalize("NFD").replace(/[\u064B-\u0652]/g, "");
                const normalizedCorrectAnswer = correctAnswer.normalize("NFD").replace(/[\u064B-\u0652]/g, "");


                inputElement.classList.remove('is-valid', 'is-invalid');

                if (userAnswer === normalizedCorrectAnswer) {
                    inputElement.classList.add('is-valid');
                    feedbackHTML += `<li class="text-success" dir="rtl"><i class="fas fa-check-circle ms-2"></i><strong>السؤال ${inputId.split('_')[2]}:</strong> صحيح!</li>`;
                } else {
                    allCorrect = false;
                    inputElement.classList.add('is-invalid');
                    feedbackHTML += `<li class="text-danger" dir="rtl"><i class="fas fa-times-circle ms-2"></i><strong>السؤال ${inputId.split('_')[2]}:</strong> خطأ. الإجابة الصحيحة هي "${correctAnswer}".</li>`;
                }
            });

            feedbackHTML += '</ul>';
            if (allCorrect) {
                feedbackHTML += '<p class="fw-bold text-success">ممتاز! كل الإجابات صحيحة.</p>';
            } else {
                feedbackHTML += '<p class="fw-bold text-warning">بعض الإجابات خاطئة، حاول مرة أخرى.</p>';
            }

            feedbackDiv.innerHTML = feedbackHTML;
            feedbackDiv.style.display = 'block';
            feedbackDiv.classList.add('animate__animated', 'animate__fadeIn');
            setTimeout(() => {
                feedbackDiv.classList.remove('animate__animated', 'animate__fadeIn');
            }, 1000);
        });
    }
    // --- END: Fill in the Blanks Functionality ---
    // --- START: Fill in the Blanks Functionality for Professions ---
    const checkFillBlanksBtn_p2 = document.getElementById('check-fill-blanks-p2');
    if (checkFillBlanksBtn_p2) {
        checkFillBlanksBtn_p2.addEventListener('click', () => {
            const answers = {
                fill_p_1: "الْحَلَّاقُ",
                fill_p_2: "السَّبَّاكُ",
                fill_p_3: "الْمُزَارِعُ",
                fill_p_4: "النَّجَّارُ",
                fill_p_5: "الطَّبَّاخُ"
            };

            const feedbackDiv = document.getElementById('feedback-fill-blanks-p2');
            let allCorrect = true;
            let feedbackHTML = '<h4>النتائج:</h4><ul>';

            Object.keys(answers).forEach(inputId => {
                const inputElement = document.getElementById(inputId);
                const correctAnswer = answers[inputId];
                // Normalize user input by removing diacritics
                const userAnswer = inputElement.value.trim().normalize("NFD").replace(/[\u064B-\u0652]/g, "");
                const normalizedCorrectAnswer = correctAnswer.normalize("NFD").replace(/[\u064B-\u0652]/g, "");

                inputElement.classList.remove('is-valid', 'is-invalid');

                if (userAnswer === normalizedCorrectAnswer) {
                    inputElement.classList.add('is-valid');
                    feedbackHTML += `<li class="text-success" dir="rtl"><i class="fas fa-check-circle ms-2"></i><strong>السؤال ${inputId.split('_')[2]}:</strong> صحيح!</li>`;
                } else {
                    allCorrect = false;
                    inputElement.classList.add('is-invalid');
                    feedbackHTML += `<li class="text-danger" dir="rtl"><i class="fas fa-times-circle ms-2"></i><strong>السؤال ${inputId.split('_')[2]}:</strong> خطأ. الإجابة الصحيحة هي "${correctAnswer}".</li>`;
                }
            });

            feedbackHTML += '</ul>';
            if (allCorrect) {
                feedbackHTML += '<p class="fw-bold text-success">ممتاز! كل الإجابات صحيحة.</p>';
            } else {
                feedbackHTML += '<p class="fw-bold text-warning">بعض الإجابات خاطئة، حاول مرة أخرى.</p>';
            }

            feedbackDiv.innerHTML = feedbackHTML;
            feedbackDiv.style.display = 'block';
        });
    }
    // --- END: Fill in the Blanks Functionality for Professions ---
    // --- START: Fill in the Blanks Functionality for Clothing ---
    const checkFillBlanksBtn_cl2 = document.getElementById('check-fill-blanks-cl2');
    if (checkFillBlanksBtn_cl2) {
        checkFillBlanksBtn_cl2.addEventListener('click', () => {
            const answers = {
                fill_cl_1: "حِزَام",
                fill_cl_2: "الْقُفَّازَ",
                fill_cl_3: "الْعِمَامَةَ",
                fill_cl_4: "الْحِذَاءَ",
                fill_cl_5: "سِرْوَال"
            };

            const feedbackDiv = document.getElementById('feedback-fill-blanks-cl2');
            let allCorrect = true;
            let feedbackHTML = '<h4>النتائج:</h4><ul>';

            Object.keys(answers).forEach(inputId => {
                const inputElement = document.getElementById(inputId);
                const correctAnswer = answers[inputId];
                // Normalization to compare without tashkeel
                const userAnswer = inputElement.value.trim().normalize("NFD").replace(/[\u064B-\u0652]/g, "");
                const normalizedCorrectAnswer = correctAnswer.normalize("NFD").replace(/[\u064B-\u0652]/g, "");

                inputElement.classList.remove('is-valid', 'is-invalid');

                if (userAnswer === normalizedCorrectAnswer) {
                    inputElement.classList.add('is-valid');
                    feedbackHTML += `<li class="text-success" dir="rtl"><i class="fas fa-check-circle ms-2"></i><strong>السؤال ${inputId.split('_')[2]}:</strong> صحيح!</li>`;
                } else {
                    allCorrect = false;
                    inputElement.classList.add('is-invalid');
                    feedbackHTML += `<li class="text-danger" dir="rtl"><i class="fas fa-times-circle ms-2"></i><strong>السؤال ${inputId.split('_')[2]}:</strong> خطأ. الإجابة الصحيحة هي "${correctAnswer}".</li>`;
                }
            });

            feedbackHTML += '</ul>';
            if (allCorrect) {
                feedbackHTML += '<p class="fw-bold text-success">رائع! جميع الإجابات صحيحة.</p>';
            } else {
                feedbackHTML += '<p class="fw-bold text-warning">بعض الإجابات غير صحيحة. حاول مجدداً.</p>';
            }

            feedbackDiv.innerHTML = feedbackHTML;
            feedbackDiv.style.display = 'block';
        });
    }
    // --- END: Fill in the Blanks Functionality for Clothing ---
    // --- START: Fill in the Blanks Functionality for Weather ---
    const checkFillBlanksBtn_w2 = document.getElementById('check-fill-blanks-w2');
    if (checkFillBlanksBtn_w2) {
        checkFillBlanksBtn_w2.addEventListener('click', () => {
            const answers = {
                fill_w_1: "مُشْمِسٌ",
                fill_w_2: "الرِّيَاحُ",
                fill_w_3: "الْغُيُومِ",
                fill_w_4: "الطَّلُّ",
                fill_w_5: "جَلِيد"
            };

            const feedbackDiv = document.getElementById('feedback-fill-blanks-w2');
            let allCorrect = true;
            let feedbackHTML = '<h4>النتائج:</h4><ul>';

            Object.keys(answers).forEach(inputId => {
                const inputElement = document.getElementById(inputId);
                const correctAnswer = answers[inputId];
                // Normalization to compare without tashkeel
                const userAnswer = inputElement.value.trim().normalize("NFD").replace(/[\u064B-\u0652]/g, "");
                const normalizedCorrectAnswer = correctAnswer.normalize("NFD").replace(/[\u064B-\u0652]/g, "");

                inputElement.classList.remove('is-valid', 'is-invalid');

                if (userAnswer === normalizedCorrectAnswer) {
                    inputElement.classList.add('is-valid');
                    feedbackHTML += `<li class="text-success" dir="rtl"><i class="fas fa-check-circle ms-2"></i><strong>السؤال ${inputId.split('_')[2]}:</strong> صحيح!</li>`;
                } else {
                    allCorrect = false;
                    inputElement.classList.add('is-invalid');
                    feedbackHTML += `<li class="text-danger" dir="rtl"><i class="fas fa-times-circle ms-2"></i><strong>السؤال ${inputId.split('_')[2]}:</strong> خطأ. الإجابة الصحيحة هي "${correctAnswer}".</li>`;
                }
            });

            feedbackHTML += '</ul>';
            if (allCorrect) {
                feedbackHTML += '<p class="fw-bold text-success">أحسنت! كل الإجابات صحيحة.</p>';
            } else {
                feedbackHTML += '<p class="fw-bold text-warning">هناك أخطاء، حاول مرة أخرى.</p>';
            }

            feedbackDiv.innerHTML = feedbackHTML;
            feedbackDiv.style.display = 'block';
        });
    }
    // --- END: Fill in the Blanks Functionality for Weather ---

    // --- START: Fill in the Blanks Functionality for Food ---
    const checkFillBlanksBtn_f2 = document.getElementById('check-fill-blanks-f2');
    if (checkFillBlanksBtn_f2) {
        checkFillBlanksBtn_f2.addEventListener('click', () => {
            const answers = {
                fill_f_1: "الْمُرَبَّىٰ",
                fill_f_2: "الْعَدَسِ",
                fill_f_3: "فَطِيرَةَ",
                fill_f_4: "الْجُبْنَ",
                fill_f_5: "الزَّيْتِ"
            };

            const feedbackDiv = document.getElementById('feedback-fill-blanks-f2');
            let allCorrect = true;
            let feedbackHTML = '<h4>النتائج:</h4><ul>';

            Object.keys(answers).forEach(inputId => {
                const inputElement = document.getElementById(inputId);
                const correctAnswer = answers[inputId];
                const userAnswer = inputElement.value.trim().normalize("NFD").replace(/[\u064B-\u0652]/g, "");
                const normalizedCorrectAnswer = correctAnswer.normalize("NFD").replace(/[\u064B-\u0652]/g, "");

                inputElement.classList.remove('is-valid', 'is-invalid');

                if (userAnswer === normalizedCorrectAnswer) {
                    inputElement.classList.add('is-valid');
                    feedbackHTML += `<li class="text-success" dir="rtl"><i class="fas fa-check-circle ms-2"></i><strong>السؤال ${inputId.split('_')[2]}:</strong> صحيح!</li>`;
                } else {
                    allCorrect = false;
                    inputElement.classList.add('is-invalid');
                    feedbackHTML += `<li class="text-danger" dir="rtl"><i class="fas fa-times-circle ms-2"></i><strong>السؤال ${inputId.split('_')[2]}:</strong> خطأ. الإجابة الصحيحة هي "${correctAnswer}".</li>`;
                }
            });

            feedbackHTML += '</ul>';
            if (allCorrect) {
                feedbackHTML += '<p class="fw-bold text-success">أحسنت! كل الإجابات صحيحة.</p>';
            } else {
                feedbackHTML += '<p class="fw-bold text-warning">هناك أخطاء، حاول مرة أخرى.</p>';
            }

            feedbackDiv.innerHTML = feedbackHTML;
            feedbackDiv.style.display = 'block';
        });
    }
    // --- END: Fill in the Blanks Functionality for Food ---

    // --- START: True/False Functionality for Food ---
    const checkTrueFalseBtn_f1 = document.getElementById('check-tf-f1');
    if (checkTrueFalseBtn_f1) {
        checkTrueFalseBtn_f1.addEventListener('click', () => {
            const answers = {
                q1_tf_f: 'true', // Correct answer is 'false', but the value of the 'false' radio is 'true'
                q2_tf_f: 'true', // Correct answer is 'false', but the value of the 'false' radio is 'true'
                q3_tf_f: 'true'
            };

            const feedbackDiv = document.getElementById('feedback-tf-f1');
            let score = 0;
            let feedbackHTML = '<h4>النتائج:</h4><ul>';

            Object.keys(answers).forEach((questionName, index) => {
                const selectedOption = document.querySelector(`input[name="${questionName}"]:checked`);

                if (selectedOption) {
                    if (selectedOption.value === answers[questionName]) {
                        score++;
                        feedbackHTML += `<li class="text-success" dir="rtl"><i class="fas fa-check-circle ms-2"></i><strong>السؤال ${index + 1}:</strong> صحيح!</li>`;
                    } else {
                        feedbackHTML += `<li class="text-danger" dir="rtl"><i class="fas fa-times-circle ms-2"></i><strong>السؤال ${index + 1}:</strong> خطأ.</li>`;
                    }
                } else {
                    feedbackHTML += `<li class="text-warning" dir="rtl"><i class="fas fa-exclamation-circle ms-2"></i><strong>السؤال ${index + 1}:</strong> لم يتم الإجابة عليه.</li>`;
                }
            });

            feedbackHTML += `</ul><p class="mt-3"><strong>نتيجتك: ${score} من 3</strong></p>`;
            feedbackDiv.innerHTML = feedbackHTML;
            feedbackDiv.style.display = 'block';
        });
    }
    // --- END: True/False Functionality for Food ---

    // --- START: Word Scramble Functionality for Food ---
    const checkScrambleBtn_f1 = document.getElementById('check-scramble-f1');
    if (checkScrambleBtn_f1) {
        checkScrambleBtn_f1.addEventListener('click', () => {
            const answers = {
                scramble_f_1: "زبدة",
                scramble_f_2: "عسل",
                scramble_f_3: "فطيرة"
            };
            const feedbackDiv = document.getElementById('feedback-scramble-f1');
            let allCorrect = true;
            let feedbackHTML = '<h4>النتائج:</h4><ul>';

            Object.keys(answers).forEach((inputId, index) => {
                const inputElement = document.getElementById(inputId);
                const correctAnswer = answers[inputId];
                const userAnswer = inputElement.value.trim().normalize("NFD").replace(/[\u064B-\u0652]/g, "");
                const normalizedCorrectAnswer = correctAnswer.normalize("NFD").replace(/[\u064B-\u0652]/g, "");

                inputElement.classList.remove('is-valid', 'is-invalid');

                if (userAnswer === normalizedCorrectAnswer) {
                    inputElement.classList.add('is-valid');
                    feedbackHTML += `<li class="text-success" dir="rtl"><i class="fas fa-check-circle ms-2"></i><strong>الكلمة ${index + 1}:</strong> صحيحة!</li>`;
                } else {
                    allCorrect = false;
                    inputElement.classList.add('is-invalid');
                    feedbackHTML += `<li class="text-danger" dir="rtl"><i class="fas fa-times-circle ms-2"></i><strong>الكلمة ${index + 1}:</strong> خطأ.</li>`;
                }
            });

            feedbackHTML += '</ul>';
            if (allCorrect) {
                feedbackHTML += '<p class="fw-bold text-success">أحسنت! كل الكلمات صحيحة.</p>';
            }

            feedbackDiv.innerHTML = feedbackHTML;
            feedbackDiv.style.display = 'block';
        });
    }
    // --- END: Word Scramble Functionality for Food ---

    // --- START: True/False Functionality for Home Tools (Exercise 4) ---
    const checkTrueFalseBtn_ht4 = document.getElementById('check-tf-ht4');
    if (checkTrueFalseBtn_ht4) {
        checkTrueFalseBtn_ht4.addEventListener('click', () => {
            const answers = {
                q1_tf_ht: 'true', // Correct answer is 'false', so the value of the 'false' radio is 'true'
                q2_tf_ht: 'true',
                q3_tf_ht: 'true'  // Correct answer is 'false', so the value of the 'false' radio is 'true'
            };

            const feedbackDiv = document.getElementById('feedback-tf-ht4');
            let score = 0;
            let feedbackHTML = '<h4>النتائج:</h4><ul>';

            Object.keys(answers).forEach((questionName, index) => {
                const selectedOption = document.querySelector(`input[name="${questionName}"]:checked`);

                if (selectedOption) {
                    if (selectedOption.value === answers[questionName]) {
                        score++;
                        feedbackHTML += `<li class="text-success" dir="rtl"><i class="fas fa-check-circle ms-2"></i><strong>السؤال ${index + 1}:</strong> صحيح!</li>`;
                    } else {
                        feedbackHTML += `<li class="text-danger" dir="rtl"><i class="fas fa-times-circle ms-2"></i><strong>السؤال ${index + 1}:</strong> خطأ.</li>`;
                    }
                } else {
                    feedbackHTML += `<li class="text-warning" dir="rtl"><i class="fas fa-exclamation-circle ms-2"></i><strong>السؤال ${index + 1}:</strong> لم يتم الإجابة عليه.</li>`;
                }
            });

            feedbackHTML += `</ul><p class="mt-3"><strong>نتيجتك: ${score} من 3</strong></p>`;
            feedbackDiv.innerHTML = feedbackHTML;
            feedbackDiv.style.display = 'block';
        });
    }
    // --- END: True/False Functionality for Home Tools ---

    // --- START: Word Scramble Functionality for Home Tools (Exercise 5) ---
    const checkScrambleBtn_ht5 = document.getElementById('check-scramble-ht5');
    if (checkScrambleBtn_ht5) {
        checkScrambleBtn_ht5.addEventListener('click', () => {
            const answers = {
                scramble_ht_1: "شوكة",
                scramble_ht_2: "غسالة",
                scramble_ht_3: "كأس"
            };
            const feedbackDiv = document.getElementById('feedback-scramble-ht5');
            let allCorrect = true;
            let feedbackHTML = '<h4>النتائج:</h4><ul>';

            Object.keys(answers).forEach((inputId, index) => {
                const inputElement = document.getElementById(inputId);
                const correctAnswer = answers[inputId];
                // Normalize user input to ignore tashkeel (diacritics)
                const userAnswer = inputElement.value.trim().normalize("NFD").replace(/[\u064B-\u0652]/g, "");
                const normalizedCorrectAnswer = correctAnswer.normalize("NFD").replace(/[\u064B-\u0652]/g, "");

                inputElement.classList.remove('is-valid', 'is-invalid');

                if (userAnswer === normalizedCorrectAnswer) {
                    inputElement.classList.add('is-valid');
                    feedbackHTML += `<li class="text-success" dir="rtl"><i class="fas fa-check-circle ms-2"></i><strong>الكلمة ${index + 1}:</strong> صحيحة!</li>`;
                } else {
                    allCorrect = false;
                    inputElement.classList.add('is-invalid');
                    feedbackHTML += `<li class="text-danger" dir="rtl"><i class="fas fa-times-circle ms-2"></i><strong>الكلمة ${index + 1}:</strong> خطأ. الإجابة الصحيحة هي "${correctAnswer}".</li>`;
                }
            });

            feedbackHTML += '</ul>';
            if (allCorrect) {
                feedbackHTML += '<p class="fw-bold text-success">رائع! كل الكلمات صحيحة.</p>';
            }

            feedbackDiv.innerHTML = feedbackHTML;
            feedbackDiv.style.display = 'block';
        });
    }
    // --- END: Word Scramble Functionality for Home Tools ---
    // --- START: Fill in the Blanks Functionality for Household Tools (Exercise 2) ---
    const checkFillBlanksBtn_ht2 = document.getElementById('check-fill-blanks-ht2');
    if (checkFillBlanksBtn_ht2) {
        checkFillBlanksBtn_ht2.addEventListener('click', () => {
            const answers = {
                fill_ht_1: "السِّكِّينَ",
                fill_ht_2: "الْقِدْرِ",
                fill_ht_3: "الْمِكْنَسَةِ",
                fill_ht_4: "الْمِكْوَاةِ",
                fill_ht_5: "السُّفْرَةِ"
            };

            const feedbackDiv = document.getElementById('feedback-fill-blanks-ht2');
            let allCorrect = true;
            let feedbackHTML = '<h4>النتائج:</h4><ul>';

            Object.keys(answers).forEach(inputId => {
                const inputElement = document.getElementById(inputId);
                const correctAnswer = answers[inputId];
                // Normalize user input to ignore tashkeel (diacritics)
                const userAnswer = inputElement.value.trim().normalize("NFD").replace(/[\u064B-\u0652]/g, "");
                const normalizedCorrectAnswer = correctAnswer.normalize("NFD").replace(/[\u064B-\u0652]/g, "");

                inputElement.classList.remove('is-valid', 'is-invalid');

                if (userAnswer === normalizedCorrectAnswer) {
                    inputElement.classList.add('is-valid');
                    feedbackHTML += `<li class="text-success" dir="rtl"><i class="fas fa-check-circle ms-2"></i><strong>السؤال ${inputId.split('_')[2]}:</strong> صحيح!</li>`;
                } else {
                    allCorrect = false;
                    inputElement.classList.add('is-invalid');
                    feedbackHTML += `<li class="text-danger" dir="rtl"><i class="fas fa-times-circle ms-2"></i><strong>السؤال ${inputId.split('_')[2]}:</strong> خطأ. الإجابة الصحيحة هي "${correctAnswer}".</li>`;
                }
            });

            feedbackHTML += '</ul>';
            if (allCorrect) {
                feedbackHTML += '<p class="fw-bold text-success">ممتاز! كل الإجابات صحيحة.</p>';
            } else {
                feedbackHTML += '<p class="fw-bold text-warning">بعض الإجابات خاطئة، حاول مرة أخرى.</p>';
            }

            feedbackDiv.innerHTML = feedbackHTML;
            feedbackDiv.style.display = 'block';
            feedbackDiv.classList.add('animate__animated', 'animate__fadeIn');
            setTimeout(() => {
                feedbackDiv.classList.remove('animate__animated', 'animate__fadeIn');
            }, 1000);
        });
    }
    // --- END: Fill in the Blanks Functionality for Household Tools ---

    // --- START: Fill in the Blanks Functionality for Fruits (Exercise 2) ---
    const checkFillBlanksBtn_fr2 = document.getElementById('check-fill-blanks-fr2');
    if (checkFillBlanksBtn_fr2) {
        checkFillBlanksBtn_fr2.addEventListener('click', () => {
            const answers = {
                fill_fr_1: "التُّفَّاحِ",
                fill_fr_2: "الْعِنَبِ",
                fill_fr_3: "الْمَوْزَ",
                fill_fr_4: "الْبُرْتُقَالِ",
                fill_fr_5: "الرُّمَّانِ"
            };

            const feedbackDiv = document.getElementById('feedback-fill-blanks-fr2');
            let allCorrect = true;
            let feedbackHTML = '<h4>النتائج:</h4><ul>';

            Object.keys(answers).forEach(inputId => {
                const inputElement = document.getElementById(inputId);
                const correctAnswer = answers[inputId];
                const userAnswer = inputElement.value.trim().normalize("NFD").replace(/[\u064B-\u0652]/g, "");
                const normalizedCorrectAnswer = correctAnswer.normalize("NFD").replace(/[\u064B-\u0652]/g, "");

                inputElement.classList.remove('is-valid', 'is-invalid');

                if (userAnswer === normalizedCorrectAnswer) {
                    inputElement.classList.add('is-valid');
                    feedbackHTML += `<li class="text-success" dir="rtl"><i class="fas fa-check-circle ms-2"></i><strong>السؤال ${inputId.split('_')[2]}:</strong> صحيح!</li>`;
                } else {
                    allCorrect = false;
                    inputElement.classList.add('is-invalid');
                    feedbackHTML += `<li class="text-danger" dir="rtl"><i class="fas fa-times-circle ms-2"></i><strong>السؤال ${inputId.split('_')[2]}:</strong> خطأ. الإجابة الصحيحة هي "${correctAnswer}".</li>`;
                }
            });

            feedbackHTML += '</ul>';
            if (allCorrect) {
                feedbackHTML += '<p class="fw-bold text-success">ممتاز! كل الإجابات صحيحة.</p>';
            } else {
                feedbackHTML += '<p class="fw-bold text-warning">بعض الإجابات خاطئة، حاول مرة أخرى.</p>';
            }

            feedbackDiv.innerHTML = feedbackHTML;
            feedbackDiv.style.display = 'block';
        });
    }
    // --- END: Fill in the Blanks Functionality for Fruits ---

    // --- START: True/False Functionality for Fruits (Exercise 4) ---
    const checkTrueFalseBtn_fr1 = document.getElementById('check-tf-fr1');
    if (checkTrueFalseBtn_fr1) {
        checkTrueFalseBtn_fr1.addEventListener('click', () => {
            const answers = {
                q1_tf_fr: 'true', // Correct is 'false', so radio value is 'true'
                q2_tf_fr: 'true', // Correct is 'false', so radio value is 'true'
                q3_tf_fr: 'true'  // Correct is 'true'
            };

            const feedbackDiv = document.getElementById('feedback-tf-fr1');
            let score = 0;
            let feedbackHTML = '<h4>النتائج:</h4><ul>';

            Object.keys(answers).forEach((questionName, index) => {
                const selectedOption = document.querySelector(`input[name="${questionName}"]:checked`);

                if (selectedOption) {
                    if (selectedOption.value === answers[questionName]) {
                        score++;
                        feedbackHTML += `<li class="text-success" dir="rtl"><i class="fas fa-check-circle ms-2"></i><strong>السؤال ${index + 1}:</strong> صحيح!</li>`;
                    } else {
                        feedbackHTML += `<li class="text-danger" dir="rtl"><i class="fas fa-times-circle ms-2"></i><strong>السؤال ${index + 1}:</strong> خطأ.</li>`;
                    }
                } else {
                    feedbackHTML += `<li class="text-warning" dir="rtl"><i class="fas fa-exclamation-circle ms-2"></i><strong>السؤال ${index + 1}:</strong> لم يتم الإجابة عليه.</li>`;
                }
            });

            feedbackHTML += `</ul><p class="mt-3"><strong>نتيجتك: ${score} من 3</strong></p>`;
            feedbackDiv.innerHTML = feedbackHTML;
            feedbackDiv.style.display = 'block';
        });
    }
    // --- END: True/False Functionality for Fruits ---

    // --- START: Word Scramble Functionality for Fruits (Exercise 5) ---
    const checkScrambleBtn_fr1 = document.getElementById('check-scramble-fr1');
    if (checkScrambleBtn_fr1) {
        checkScrambleBtn_fr1.addEventListener('click', () => {
            const answers = {
                scramble_fr_1: "عنب",
                scramble_fr_2: "خوخ",
                scramble_fr_3: "موز"
            };
            const feedbackDiv = document.getElementById('feedback-scramble-fr1');
            let allCorrect = true;
            let feedbackHTML = '<h4>النتائج:</h4><ul>';

            Object.keys(answers).forEach((inputId, index) => {
                const inputElement = document.getElementById(inputId);
                const correctAnswer = answers[inputId];
                const userAnswer = inputElement.value.trim().normalize("NFD").replace(/[\u064B-\u0652]/g, "");
                const normalizedCorrectAnswer = correctAnswer.normalize("NFD").replace(/[\u064B-\u0652]/g, "");

                inputElement.classList.remove('is-valid', 'is-invalid');

                if (userAnswer === normalizedCorrectAnswer) {
                    inputElement.classList.add('is-valid');
                    feedbackHTML += `<li class="text-success" dir="rtl"><i class="fas fa-check-circle ms-2"></i><strong>الكلمة ${index + 1}:</strong> صحيحة!</li>`;
                } else {
                    allCorrect = false;
                    inputElement.classList.add('is-invalid');
                    feedbackHTML += `<li class="text-danger" dir="rtl"><i class="fas fa-times-circle ms-2"></i><strong>الكلمة ${index + 1}:</strong> خطأ. الإجابة الصحيحة هي "${correctAnswer}".</li>`;
                }
            });

            feedbackHTML += '</ul>';
            if (allCorrect) {
                feedbackHTML += '<p class="fw-bold text-success">رائع! كل الكلمات صحيحة.</p>';
            }

            feedbackDiv.innerHTML = feedbackHTML;
            feedbackDiv.style.display = 'block';
        });
    }
    // --- END: Word Scramble Functionality for Fruits ---
    // --- START: Fill in the Blanks Functionality for Vegetables (Exercise 2) ---
    const checkFillBlanksBtn_veg2 = document.getElementById('check-fill-blanks-veg2');
    if (checkFillBlanksBtn_veg2) {
        checkFillBlanksBtn_veg2.addEventListener('click', () => {
            const answers = {
                fill_veg_1: "الْخَسَّ",
                fill_veg_2: "الْقَرْعُ",
                fill_veg_3: "الثُّومِ",
                fill_veg_4: "الْفَاصُولِيَاءُ",
                fill_veg_5: "الْبَامِيَا"
            };

            const feedbackDiv = document.getElementById('feedback-fill-blanks-veg2');
            let allCorrect = true;
            let feedbackHTML = '<h4>النتائج:</h4><ul>';

            Object.keys(answers).forEach(inputId => {
                const inputElement = document.getElementById(inputId);
                const correctAnswer = answers[inputId];
                const userAnswer = inputElement.value.trim().normalize("NFD").replace(/[\u064B-\u0652]/g, "");
                const normalizedCorrectAnswer = correctAnswer.normalize("NFD").replace(/[\u064B-\u0652]/g, "");

                inputElement.classList.remove('is-valid', 'is-invalid');

                if (userAnswer === normalizedCorrectAnswer) {
                    inputElement.classList.add('is-valid');
                    feedbackHTML += `<li class="text-success" dir="rtl"><i class="fas fa-check-circle ms-2"></i><strong>السؤال ${inputId.split('_')[2]}:</strong> صحيح!</li>`;
                } else {
                    allCorrect = false;
                    inputElement.classList.add('is-invalid');
                    feedbackHTML += `<li class="text-danger" dir="rtl"><i class="fas fa-times-circle ms-2"></i><strong>السؤال ${inputId.split('_')[2]}:</strong> خطأ. الإجابة الصحيحة هي "${correctAnswer}".</li>`;
                }
            });

            feedbackHTML += '</ul>';
            if (allCorrect) {
                feedbackHTML += '<p class="fw-bold text-success">ممتاز! كل الإجابات صحيحة.</p>';
            } else {
                feedbackHTML += '<p class="fw-bold text-warning">بعض الإجابات خاطئة، حاول مرة أخرى.</p>';
            }

            feedbackDiv.innerHTML = feedbackHTML;
            feedbackDiv.style.display = 'block';
        });
    }
    // --- END: Fill in the Blanks Functionality for Vegetables ---

    // --- START: True/False Functionality for Vegetables (Exercise 4) ---
    const checkTrueFalseBtn_veg4 = document.getElementById('check-tf-veg4');
    if (checkTrueFalseBtn_veg4) {
        checkTrueFalseBtn_veg4.addEventListener('click', () => {
            const answers = {
                q1_tf_veg: 'true', // Correct answer is 'false'
                q2_tf_veg: 'true', // Correct answer is 'true'
                q3_tf_veg: 'true'  // Correct answer is 'false'
            };

            const feedbackDiv = document.getElementById('feedback-tf-veg4');
            let score = 0;
            let feedbackHTML = '<h4>النتائج:</h4><ul>';

            Object.keys(answers).forEach((questionName, index) => {
                const selectedOption = document.querySelector(`input[name="${questionName}"]:checked`);

                if (selectedOption) {
                    if (selectedOption.value === answers[questionName]) {
                        score++;
                        feedbackHTML += `<li class="text-success" dir="rtl"><i class="fas fa-check-circle ms-2"></i><strong>السؤال ${index + 1}:</strong> صحيح!</li>`;
                    } else {
                        feedbackHTML += `<li class="text-danger" dir="rtl"><i class="fas fa-times-circle ms-2"></i><strong>السؤال ${index + 1}:</strong> خطأ.</li>`;
                    }
                } else {
                    feedbackHTML += `<li class="text-warning" dir="rtl"><i class="fas fa-exclamation-circle ms-2"></i><strong>السؤال ${index + 1}:</strong> لم يتم الإجابة عليه.</li>`;
                }
            });

            feedbackHTML += `</ul><p class="mt-3"><strong>نتيجتك: ${score} من 3</strong></p>`;
            feedbackDiv.innerHTML = feedbackHTML;
            feedbackDiv.style.display = 'block';
        });
    }
    // --- END: True/False Functionality for Vegetables ---

    // --- START: Word Scramble Functionality for Vegetables (Exercise 5) ---
    const checkScrambleBtn_veg5 = document.getElementById('check-scramble-veg5');
    if (checkScrambleBtn_veg5) {
        checkScrambleBtn_veg5.addEventListener('click', () => {
            const answers = {
                scramble_veg_1: "ثوم",
                scramble_veg_2: "خس",
                scramble_veg_3: "قرع"
            };
            const feedbackDiv = document.getElementById('feedback-scramble-veg5');
            let allCorrect = true;
            let feedbackHTML = '<h4>النتائج:</h4><ul>';

            Object.keys(answers).forEach((inputId, index) => {
                const inputElement = document.getElementById(inputId);
                const correctAnswer = answers[inputId];
                const userAnswer = inputElement.value.trim().normalize("NFD").replace(/[\u064B-\u0652]/g, "");
                const normalizedCorrectAnswer = correctAnswer.normalize("NFD").replace(/[\u064B-\u0652]/g, "");

                inputElement.classList.remove('is-valid', 'is-invalid');

                if (userAnswer === normalizedCorrectAnswer) {
                    inputElement.classList.add('is-valid');
                    feedbackHTML += `<li class="text-success" dir="rtl"><i class="fas fa-check-circle ms-2"></i><strong>الكلمة ${index + 1}:</strong> صحيحة!</li>`;
                } else {
                    allCorrect = false;
                    inputElement.classList.add('is-invalid');
                    feedbackHTML += `<li class="text-danger" dir="rtl"><i class="fas fa-times-circle ms-2"></i><strong>الكلمة ${index + 1}:</strong> خطأ. الإجابة الصحيحة هي "${correctAnswer}".</li>`;
                }
            });

            feedbackHTML += '</ul>';
            if (allCorrect) {
                feedbackHTML += '<p class="fw-bold text-success">أحسنت! كل الكلمات صحيحة.</p>';
            }

            feedbackDiv.innerHTML = feedbackHTML;
            feedbackDiv.style.display = 'block';
        });
    }
    // --- END: Word Scramble Functionality for Vegetables ---
    // --- START: Fill in the Blanks Functionality for Furniture (Exercise 2) ---
    const checkFillBlanksBtn_furn2 = document.getElementById('check-fill-blanks-furn2');
    if (checkFillBlanksBtn_furn2) {
        checkFillBlanksBtn_furn2.addEventListener('click', () => {
            const answers = {
                fill_furn_1: "الْفِرَاشِ",
                fill_furn_2: "الْوِسَادَةِ",
                fill_furn_3: "الرَّفِّ",
                fill_furn_4: "الطَّاوِلَةِ",
                fill_furn_5: "الْهَاتِفُ"
            };

            const feedbackDiv = document.getElementById('feedback-fill-blanks-furn2');
            let allCorrect = true;
            let feedbackHTML = '<h4>النتائج:</h4><ul>';

            Object.keys(answers).forEach(inputId => {
                const inputElement = document.getElementById(inputId);
                const correctAnswer = answers[inputId];
                const userAnswer = inputElement.value.trim().normalize("NFD").replace(/[\u064B-\u0652]/g, "");
                const normalizedCorrectAnswer = correctAnswer.normalize("NFD").replace(/[\u064B-\u0652]/g, "");

                inputElement.classList.remove('is-valid', 'is-invalid');

                if (userAnswer === normalizedCorrectAnswer) {
                    inputElement.classList.add('is-valid');
                    feedbackHTML += `<li class="text-success" dir="rtl"><i class="fas fa-check-circle ms-2"></i><strong>السؤال ${inputId.split('_')[2]}:</strong> صحيح!</li>`;
                } else {
                    allCorrect = false;
                    inputElement.classList.add('is-invalid');
                    feedbackHTML += `<li class="text-danger" dir="rtl"><i class="fas fa-times-circle ms-2"></i><strong>السؤال ${inputId.split('_')[2]}:</strong> خطأ. الإجابة الصحيحة هي "${correctAnswer}".</li>`;
                }
            });

            feedbackHTML += '</ul>';
            if (allCorrect) {
                feedbackHTML += '<p class="fw-bold text-success">ممتاز! كل الإجابات صحيحة.</p>';
            } else {
                feedbackHTML += '<p class="fw-bold text-warning">بعض الإجابات خاطئة، حاول مرة أخرى.</p>';
            }

            feedbackDiv.innerHTML = feedbackHTML;
            feedbackDiv.style.display = 'block';
        });
    }
    // --- END: Fill in the Blanks Functionality for Furniture ---
    // --- START: True/False Functionality for Furniture (Exercise 4) ---
    const checkTrueFalseBtn_furn4 = document.getElementById('check-tf-furn4');
    if (checkTrueFalseBtn_furn4) {
        checkTrueFalseBtn_furn4.addEventListener('click', () => {
            const answers = {
                q1_tf_furn: 'true', // Correct answer is 'false'
                q2_tf_furn: 'true', // Correct answer is 'true'
                q3_tf_furn: 'true'  // Correct answer is 'false'
            };

            const feedbackDiv = document.getElementById('feedback-tf-furn4');
            let score = 0;
            let feedbackHTML = '<h4>النتائج:</h4><ul>';

            Object.keys(answers).forEach((questionName, index) => {
                const selectedOption = document.querySelector(`input[name="${questionName}"]:checked`);

                if (selectedOption) {
                    if (selectedOption.value === answers[questionName]) {
                        score++;
                        feedbackHTML += `<li class="text-success" dir="rtl"><i class="fas fa-check-circle ms-2"></i><strong>السؤال ${index + 1}:</strong> صحيح!</li>`;
                    } else {
                        feedbackHTML += `<li class="text-danger" dir="rtl"><i class="fas fa-times-circle ms-2"></i><strong>السؤال ${index + 1}:</strong> خطأ.</li>`;
                    }
                } else {
                    feedbackHTML += `<li class="text-warning" dir="rtl"><i class="fas fa-exclamation-circle ms-2"></i><strong>السؤال ${index + 1}:</strong> لم يتم الإجابة عليه.</li>`;
                }
            });

            feedbackHTML += `</ul><p class="mt-3"><strong>نتيجتك: ${score} من 3</strong></p>`;
            feedbackDiv.innerHTML = feedbackHTML;
            feedbackDiv.style.display = 'block';
        });
    }
    // --- END: True/False Functionality for Furniture ---
    // --- START: Word Scramble Functionality for Furniture (Exercise 5) ---
    const checkScrambleBtn_furn5 = document.getElementById('check-scramble-furn5');
    if (checkScrambleBtn_furn5) {
        checkScrambleBtn_furn5.addEventListener('click', () => {
            const answers = {
                scramble_furn_1: "رَفّ",
                scramble_furn_2: "هَاتِف",
                scramble_furn_3: "كُرْسِيّ"
            };
            const feedbackDiv = document.getElementById('feedback-scramble-furn5');
            let allCorrect = true;
            let feedbackHTML = '<h4>النتائج:</h4><ul>';

            Object.keys(answers).forEach((inputId, index) => {
                const inputElement = document.getElementById(inputId);
                const correctAnswer = answers[inputId];
                const userAnswer = inputElement.value.trim().normalize("NFD").replace(/[\u064B-\u0652]/g, "");
                const normalizedCorrectAnswer = correctAnswer.normalize("NFD").replace(/[\u064B-\u0652]/g, "");

                inputElement.classList.remove('is-valid', 'is-invalid');

                if (userAnswer === normalizedCorrectAnswer) {
                    inputElement.classList.add('is-valid');
                    feedbackHTML += `<li class="text-success" dir="rtl"><i class="fas fa-check-circle ms-2"></i><strong>الكلمة ${index + 1}:</strong> صحيحة!</li>`;
                } else {
                    allCorrect = false;
                    inputElement.classList.add('is-invalid');
                    feedbackHTML += `<li class="text-danger" dir="rtl"><i class="fas fa-times-circle ms-2"></i><strong>الكلمة ${index + 1}:</strong> خطأ. الإجابة الصحيحة هي "${correctAnswer}".</li>`;
                }
            });

            feedbackHTML += '</ul>';
            if (allCorrect) {
                feedbackHTML += '<p class="fw-bold text-success">أحسنت! كل الكلمات صحيحة.</p>';
            }

            feedbackDiv.innerHTML = feedbackHTML;
            feedbackDiv.style.display = 'block';
        });
    }
    // --- END: Word Scramble Functionality for Furniture ---

    // ===================================================================
    // ==== START: EXERCISE HANDLERS FOR TRAVELING (السَّفَرُ) ====
    // ===================================================================

    // --- START: Fill in the Blanks Functionality for Traveling (Exercise 2) ---
    const checkFillBlanksBtn_travel2 = document.getElementById('check-fill-blanks-travel2');
    if (checkFillBlanksBtn_travel2) {
        checkFillBlanksBtn_travel2.addEventListener('click', () => {
            const answers = {
                fill_travel_1: "الْمُغَادَرَةِ",
                fill_travel_2: "السَّفِينَةُ",
                fill_travel_3: "الْجَمَارِكِ",
                fill_travel_4: "سَيَّارَةَ أُجْرَةٍ",
                fill_travel_5: "الْوُصُولِ"
            };

            const feedbackDiv = document.getElementById('feedback-fill-blanks-travel2');
            let allCorrect = true;
            let feedbackHTML = '<h4>النتائج:</h4><ul>';

            Object.keys(answers).forEach(inputId => {
                const inputElement = document.getElementById(inputId);
                const correctAnswer = answers[inputId];
                const userAnswer = inputElement.value.trim().normalize("NFD").replace(/[\u064B-\u0652]/g, "");
                const normalizedCorrectAnswer = correctAnswer.normalize("NFD").replace(/[\u064B-\u0652]/g, "");

                inputElement.classList.remove('is-valid', 'is-invalid');

                if (userAnswer === normalizedCorrectAnswer) {
                    inputElement.classList.add('is-valid');
                    feedbackHTML += `<li class="text-success" dir="rtl"><i class="fas fa-check-circle ms-2"></i><strong>السؤال ${inputId.split('_')[2]}:</strong> صحيح!</li>`;
                } else {
                    allCorrect = false;
                    inputElement.classList.add('is-invalid');
                    feedbackHTML += `<li class="text-danger" dir="rtl"><i class="fas fa-times-circle ms-2"></i><strong>السؤال ${inputId.split('_')[2]}:</strong> خطأ. الإجابة الصحيحة هي "${correctAnswer}".</li>`;
                }
            });

            feedbackHTML += '</ul>';
            if (allCorrect) {
                feedbackHTML += '<p class="fw-bold text-success">ممتاز! كل الإجابات صحيحة.</p>';
            } else {
                feedbackHTML += '<p class="fw-bold text-warning">بعض الإجابات خاطئة، حاول مرة أخرى.</p>';
            }

            feedbackDiv.innerHTML = feedbackHTML;
            feedbackDiv.style.display = 'block';
        });
    }
    // --- END: Fill in the Blanks Functionality for Traveling ---

    // --- START: True/False Functionality for Traveling (Exercise 4) ---
    const checkTrueFalseBtn_travel4 = document.getElementById('check-tf-travel4');
    if (checkTrueFalseBtn_travel4) {
        checkTrueFalseBtn_travel4.addEventListener('click', () => {
            const answers = {
                q1_tf_travel: 'true', // Correct answer is 'true'
                q2_tf_travel: 'true', // Correct answer is 'false'
                q3_tf_travel: 'true'  // Correct answer is 'false'
            };

            const feedbackDiv = document.getElementById('feedback-tf-travel4');
            let score = 0;
            let feedbackHTML = '<h4>النتائج:</h4><ul>';

            Object.keys(answers).forEach((questionName, index) => {
                const selectedOption = document.querySelector(`input[name="${questionName}"]:checked`);

                if (selectedOption) {
                    if (selectedOption.value === answers[questionName]) {
                        score++;
                        feedbackHTML += `<li class="text-success" dir="rtl"><i class="fas fa-check-circle ms-2"></i><strong>السؤال ${index + 1}:</strong> صحيح!</li>`;
                    } else {
                        feedbackHTML += `<li class="text-danger" dir="rtl"><i class="fas fa-times-circle ms-2"></i><strong>السؤال ${index + 1}:</strong> خطأ.</li>`;
                    }
                } else {
                    feedbackHTML += `<li class="text-warning" dir="rtl"><i class="fas fa-exclamation-circle ms-2"></i><strong>السؤال ${index + 1}:</strong> لم يتم الإجابة عليه.</li>`;
                }
            });

            feedbackHTML += `</ul><p class="mt-3"><strong>نتيجتك: ${score} من 3</strong></p>`;
            feedbackDiv.innerHTML = feedbackHTML;
            feedbackDiv.style.display = 'block';
        });
    }
    // --- END: True/False Functionality for Traveling ---

    // --- START: Word Scramble Functionality for Traveling (Exercise 5) ---
    const checkScrambleBtn_travel5 = document.getElementById('check-scramble-travel5');
    if (checkScrambleBtn_travel5) {
        checkScrambleBtn_travel5.addEventListener('click', () => {
            const answers = {
                scramble_travel_1: "جَمَارِك",
                scramble_travel_2: "دَرَّاجَة",
                scramble_travel_3: "وُصُول"
            };
            const feedbackDiv = document.getElementById('feedback-scramble-travel5');
            let allCorrect = true;
            let feedbackHTML = '<h4>النتائج:</h4><ul>';

            Object.keys(answers).forEach((inputId, index) => {
                const inputElement = document.getElementById(inputId);
                const correctAnswer = answers[inputId];
                const userAnswer = inputElement.value.trim().normalize("NFD").replace(/[\u064B-\u0652]/g, "");
                const normalizedCorrectAnswer = correctAnswer.normalize("NFD").replace(/[\u064B-\u0652]/g, "");

                inputElement.classList.remove('is-valid', 'is-invalid');

                if (userAnswer === normalizedCorrectAnswer) {
                    inputElement.classList.add('is-valid');
                    feedbackHTML += `<li class="text-success" dir="rtl"><i class="fas fa-check-circle ms-2"></i><strong>الكلمة ${index + 1}:</strong> صحيحة!</li>`;
                } else {
                    allCorrect = false;
                    inputElement.classList.add('is-invalid');
                    feedbackHTML += `<li class="text-danger" dir="rtl"><i class="fas fa-times-circle ms-2"></i><strong>الكلمة ${index + 1}:</strong> خطأ. الإجابة الصحيحة هي "${correctAnswer}".</li>`;
                }
            });

            feedbackHTML += '</ul>';
            if (allCorrect) {
                feedbackHTML += '<p class="fw-bold text-success">أحسنت! كل الكلمات صحيحة.</p>';
            }

            feedbackDiv.innerHTML = feedbackHTML;
            feedbackDiv.style.display = 'block';
        });
    }
    // --- END: Word Scramble Functionality for Traveling ---

    // ===================================================================
    // ==== END: EXERCISE HANDLERS FOR TRAVELING (السَّفَرُ) ====
    // ===================================================================


    // ===================================================================
// ==== START: EXERCISE HANDLERS FOR HEALTH & ILLNESS (الصِّحَّةُ وَالْمَرَضُ) ====
// ===================================================================

// --- START: Fill in the Blanks Functionality for Health (Exercise 2) ---
const checkFillBlanksBtn_health2 = document.getElementById('check-fill-blanks-health2');
if (checkFillBlanksBtn_health2) {
    checkFillBlanksBtn_health2.addEventListener('click', () => {
        const answers = {
            fill_health_1: "زُكَامٌ",
            fill_health_2: "الْجُرْحَ",
            fill_health_3: "مَغَصٌ",
            fill_health_4: "إِغْمَاءٍ",
            fill_health_5: "الْقَيْءِ"
        };

        const feedbackDiv = document.getElementById('feedback-fill-blanks-health2');
        let allCorrect = true;
        let feedbackHTML = '<h4>النتائج:</h4><ul>';

        Object.keys(answers).forEach(inputId => {
            const inputElement = document.getElementById(inputId);
            const correctAnswer = answers[inputId];
            // Normalize both user and correct answers by removing Tashkeel for comparison
            const userAnswer = inputElement.value.trim().normalize("NFD").replace(/[\u064B-\u0652]/g, "");
            const normalizedCorrectAnswer = correctAnswer.normalize("NFD").replace(/[\u064B-\u0652]/g, "");

            inputElement.classList.remove('is-valid', 'is-invalid');

            if (userAnswer === normalizedCorrectAnswer) {
                inputElement.classList.add('is-valid');
                feedbackHTML += `<li class="text-success" dir="rtl"><i class="fas fa-check-circle ms-2"></i><strong>السؤال ${inputId.split('_')[2]}:</strong> صحيح!</li>`;
            } else {
                allCorrect = false;
                inputElement.classList.add('is-invalid');
                feedbackHTML += `<li class="text-danger" dir="rtl"><i class="fas fa-times-circle ms-2"></i><strong>السؤال ${inputId.split('_')[2]}:</strong> خطأ. الإجابة الصحيحة هي "${correctAnswer}".</li>`;
            }
        });

        feedbackHTML += '</ul>';
        if (allCorrect) {
            feedbackHTML += '<p class="fw-bold text-success">ممتاز! كل الإجابات صحيحة.</p>';
        } else {
            feedbackHTML += '<p class="fw-bold text-warning">بعض الإجابات خاطئة، حاول مرة أخرى.</p>';
        }

        feedbackDiv.innerHTML = feedbackHTML;
        feedbackDiv.style.display = 'block';
    });
}
// --- END: Fill in the Blanks Functionality for Health ---

// --- START: True/False Functionality for Health (Exercise 4) ---
const checkTrueFalseBtn_health4 = document.getElementById('check-tf-health4');
if (checkTrueFalseBtn_health4) {
    checkTrueFalseBtn_health4.addEventListener('click', () => {
        const answers = {
            q1_tf_health: 'true', // Correct answer is 'false' (خَطَأ)
            q2_tf_health: 'true', // Correct answer is 'false' (خَطَأ)
            q3_tf_health: 'true'  // Correct answer is 'true'  (صَحِيح)
        };

        const feedbackDiv = document.getElementById('feedback-tf-health4');
        let score = 0;
        let feedbackHTML = '<h4>النتائج:</h4><ul>';

        Object.keys(answers).forEach((questionName, index) => {
            const selectedOption = document.querySelector(`input[name="${questionName}"]:checked`);

            if (selectedOption) {
                // The correct radio button has value="true"
                if (selectedOption.value === answers[questionName]) {
                    score++;
                    feedbackHTML += `<li class="text-success" dir="rtl"><i class="fas fa-check-circle ms-2"></i><strong>السؤال ${index + 1}:</strong> صحيح!</li>`;
                } else {
                    feedbackHTML += `<li class="text-danger" dir="rtl"><i class="fas fa-times-circle ms-2"></i><strong>السؤال ${index + 1}:</strong> خطأ.</li>`;
                }
            } else {
                feedbackHTML += `<li class="text-warning" dir="rtl"><i class="fas fa-exclamation-circle ms-2"></i><strong>السؤال ${index + 1}:</strong> لم يتم الإجابة عليه.</li>`;
            }
        });

        feedbackHTML += `</ul><p class="mt-3"><strong>نتيجتك: ${score} من 3</strong></p>`;
        feedbackDiv.innerHTML = feedbackHTML;
        feedbackDiv.style.display = 'block';
    });
}
// --- END: True/False Functionality for Health ---

// --- START: Word Scramble Functionality for Health (Exercise 5) ---
const checkScrambleBtn_health5 = document.getElementById('check-scramble-health5');
if (checkScrambleBtn_health5) {
    checkScrambleBtn_health5.addEventListener('click', () => {
        const answers = {
            scramble_health_1: "جُرْح",
            scramble_health_2: "مَغَص",
            scramble_health_3: "كَسْر"
        };
        const feedbackDiv = document.getElementById('feedback-scramble-health5');
        let allCorrect = true;
        let feedbackHTML = '<h4>النتائج:</h4><ul>';

        Object.keys(answers).forEach((inputId, index) => {
            const inputElement = document.getElementById(inputId);
            const correctAnswer = answers[inputId];
            const userAnswer = inputElement.value.trim().normalize("NFD").replace(/[\u064B-\u0652]/g, "");
            const normalizedCorrectAnswer = correctAnswer.normalize("NFD").replace(/[\u064B-\u0652]/g, "");

            inputElement.classList.remove('is-valid', 'is-invalid');

            if (userAnswer === normalizedCorrectAnswer) {
                inputElement.classList.add('is-valid');
                feedbackHTML += `<li class="text-success" dir="rtl"><i class="fas fa-check-circle ms-2"></i><strong>الكلمة ${index + 1}:</strong> صحيحة!</li>`;
            } else {
                allCorrect = false;
                inputElement.classList.add('is-invalid');
                feedbackHTML += `<li class="text-danger" dir="rtl"><i class="fas fa-times-circle ms-2"></i><strong>الكلمة ${index + 1}:</strong> خطأ. الإجابة الصحيحة هي "${correctAnswer}".</li>`;
            }
        });

        feedbackHTML += '</ul>';
        if (allCorrect) {
            feedbackHTML += '<p class="fw-bold text-success">أحسنت! كل الكلمات صحيحة.</p>';
        }

        feedbackDiv.innerHTML = feedbackHTML;
        feedbackDiv.style.display = 'block';
    });
}
// --- END: Word Scramble Functionality for Health ---

// ===================================================================
// ==== END: EXERCISE HANDLERS FOR HEALTH & ILLNESS (الصِّحَّةُ وَالْمَرَضُ) ====
// ===================================================================
}); 
