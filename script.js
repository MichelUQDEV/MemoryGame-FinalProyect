// Este código agrega un listener que ejecuta una función cuando todo el contenido HTML de la página ha sido cargado y procesado.
document.addEventListener("DOMContentLoaded", () => {
    // --- Botones de dificultad y modales de inicio ---
    const easyButton = document.getElementById("easy-button"); // Botón fácil
    const mediumButton = document.getElementById("medium-button"); // Botón intermedio
    const hardButton = document.getElementById("hard-button"); // Botón difícil
    const instructionsButton = document.getElementById("instructions-button"); // Botón instrucciones
    const aboutButton = document.getElementById("about-button"); // Botón acerca de

    // Asigna eventos a los botones de dificultad
    easyButton.addEventListener("click", () => {
        startGame("easy");
    });
    mediumButton.addEventListener("click", () => {
        startGame("medium");
    });
    hardButton.addEventListener("click", () => {
        startGame("hard");
    });

    // --- Variables y elementos del juego ---
    const gameSection = document.getElementById("game-section"); // Sección del tablero
    const welcomeScreen = document.getElementById("welcome-screen"); // Pantalla de bienvenida
    const gameBoard = document.getElementById("game-board"); // Contenedor del tablero
    const movesCounter = document.getElementById("moves-counter"); // Contador de movimientos
    const timerSpan = document.getElementById("timer"); // Contador de tiempo
    const restartButton = document.getElementById("restart-button"); // Botón de reinicio

    let cards = []; // Arreglo de cartas actuales
    let flippedCards = []; // Índices de cartas volteadas
    let matchedPairs = 0; // Número de pares encontrados
    let moves = 0; // Movimientos realizados
    let timer = 0; // Tiempo transcurrido
    let timerInterval = null; // Intervalo del temporizador
    let totalPairs = 0; // Total de pares a encontrar
    let currentBgIndex = 0; // Índice de fondo actual
    // Fondos y colores para el juego
    const fondos = [
        { url: 'img/bg1.jpg', cardBg: '#e3f2fd', cardBorder: '#1976d2', cardFlipped: '#1976d2' },
        { url: 'img/bg2.jpg', cardBg: '#ffe0b2', cardBorder: '#f57c00', cardFlipped: '#f57c00' },
        { url: 'img/bg3.jpg', cardBg: '#e8f5e9', cardBorder: '#388e3c', cardFlipped: '#388e3c' }
    ];

    // Genera el set de cartas según la dificultad
    function getCardSet(difficulty) {
        const baseIcons = [
            "🍎", "🍌", "🍇", "🍉", "🍒", "🍋", "🍓", "🍍",
            "🥝", "🥑", "🍑", "🍈", "🍊", "🍐", "🥥", "🍏",
            "👑", "👗", "⭐", "🌸", "🐬", "🦩", "🫐", "🦋"
        ];
        if (difficulty === "easy") {
            // 4 pares, pero tablero de 4x4 (16 espacios)
            const icons = baseIcons.slice(0, 8);
            const cards = shuffle([...icons, ...icons]);
            // Rellenar con null para que el tablero tenga 16 espacios
            while (cards.length < 16) cards.push(null);
            return cards;
        }
        if (difficulty === "medium") {
            // 8 pares, pero tablero de 4x6 (24 espacios)
            const icons = baseIcons.slice(0, 12);
            const cards = shuffle([...icons, ...icons]);
            while (cards.length < 24) cards.push(null);
            return cards;
        }
        // difícil: 12 pares, tablero de 6x10 (60 espacios)
        const icons = baseIcons.slice(0, 24);
        const cards = shuffle([...icons, ...icons]);
        while (cards.length < 60) cards.push(null);
        return cards;
    }

    // Elige un fondo aleatorio para el juego
    function getRandomBgIndex() {
        return Math.floor(Math.random() * fondos.length);
    }

    // Aplica el fondo y colores de cartas según el fondo elegido
    function setGameBackground() {
        currentBgIndex = getRandomBgIndex();
        const fondo = fondos[currentBgIndex];
        document.body.style.backgroundImage = `url('${fondo.url}')`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
        document.body.style.backgroundRepeat = 'no-repeat';
        setCardColors(fondo.cardBg, fondo.cardBorder, fondo.cardFlipped);
    }

    // Cambia los colores de las cartas usando variables CSS
    function setCardColors(bg, border, flipped) {
        document.documentElement.style.setProperty('--card-bg', bg);
        document.documentElement.style.setProperty('--card-border', border);
        document.documentElement.style.setProperty('--card-flipped-bg', flipped || '#50E3C2');
    }

    // Restaura el fondo y colores por defecto
    function resetBackground() {
        document.body.style.backgroundImage = '';
        document.body.style.backgroundColor = '#4A90E2';
        setCardColors('#e3f2fd', '#1976d2', '#50E3C2');
    }

    // Inicia el juego with la dificultad seleccionada
    function startGame(difficulty) {
        setGameBackground();
        welcomeScreen.style.display = "none";
        gameSection.style.display = "block";
        restartButton.style.display = "inline-block";
        moves = 0;
        timer = 0;
        matchedPairs = 0;
        movesCounter.textContent = "Movimientos: 0";
        timerSpan.textContent = "Tiempo: 0s";
        clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            timer++;
            timerSpan.textContent = `Tiempo: ${timer}s`;
        }, 1000);

        // Genera cartas según dificultad y tamaño de tablero
        const cardSet = getCardSet(difficulty);
        cards = cardSet.map((icon, idx) => icon ? {
            id: idx,
            icon,
            flipped: false,
            matched: false
        } : null);
        // Ajusta totalPairs para la lógica de victoria (cuenta los pares reales)
        totalPairs = cardSet.filter(Boolean).length / 2;
        renderBoard();
    }

    // Renderiza el tablero de juego según la dificultad
    function renderBoard() {
        gameBoard.innerHTML = "";
        let gridCols, gridRows;
        if (totalPairs === 8) { 
            gridCols = 4;
            gridRows = 6;
        } else if (totalPairs === 12) { 
            gridCols = 4;
            gridRows = 10;
        } else { 
            gridCols = 6;
            gridRows = 10;
        }

        gameBoard.style.gridTemplateColumns = `repeat(${gridCols}, 1fr)`;
        gameBoard.style.gridTemplateRows = `repeat(${gridRows}, 1fr)`;
        for (let i = 0; i < gridCols * gridRows; i++) {
            const card = cards[i];
            const cardDiv = document.createElement("div");
            cardDiv.className = "card" + (card && (card.flipped || card.matched) ? " flipped" : "");
            cardDiv.dataset.index = i;
            if (card) {
                if (card.flipped || card.matched) {
                    cardDiv.innerHTML = `<span style='font-size:2rem;'>${card.icon}</span>`;
                } else {
                    cardDiv.innerHTML = "";
                }
                cardDiv.addEventListener("click", () => handleCardClick(i));
            } else {
                cardDiv.style.visibility = "hidden";
                cardDiv.style.pointerEvents = "none";
            }
            gameBoard.appendChild(cardDiv);
        }
    }

    // Maneja el clic en una carta
    function handleCardClick(idx) {
        if (cards[idx].flipped || cards[idx].matched || flippedCards.length === 2) return;
        cards[idx].flipped = true;
        flippedCards.push(idx);
        renderBoard();
        if (flippedCards.length === 2) {
            moves++;
            movesCounter.textContent = `Movimientos: ${moves}`;
            setTimeout(checkMatch, 800);
        }
    }

    // Muestra el modal de finalización del juego
    function showFinishModal(moves, time) {
        const finishModal = document.getElementById("finish-modal");
        document.getElementById("finish-moves").textContent = moves;
        document.getElementById("finish-time").textContent = time;
        finishModal.style.display = "flex";
        setTimeout(() => {
            finishModal.classList.add("active");
        }, 10);
    }

    // Verifica si las dos cartas volteadas son un par
    function checkMatch() {
        const [i1, i2] = flippedCards;
        if (cards[i1].icon === cards[i2].icon) {
            cards[i1].matched = true;
            cards[i2].matched = true;
            matchedPairs++;
            if (matchedPairs === totalPairs) {
                clearInterval(timerInterval);
                setTimeout(() => {
                    // Mostrar modal de finalización con transición
                    gameSection.style.opacity = 1;
                    gameSection.style.transition = "opacity 0.5s";
                    gameSection.style.opacity = 0;
                    setTimeout(() => {
                        gameSection.style.display = "none";
                        showFinishModal(moves, timer);
                    }, 500);
                }, 300);
            }
        } else {
            cards[i1].flipped = false;
            cards[i2].flipped = false;
        }
        flippedCards = [];
        renderBoard();
    }

    // Botón para volver al inicio desde el tablero
    restartButton.addEventListener("click", () => {
        resetBackground();
        welcomeScreen.style.display = "flex";
        gameSection.style.display = "none";
        clearInterval(timerInterval);
    });

    // Botón para volver al inicio desde el modal de finalización
    document.getElementById("finish-restart").addEventListener("click", () => {
        document.getElementById("finish-modal").style.display = "none";
        resetBackground();
        welcomeScreen.style.display = "flex";
        gameSection.style.opacity = 1;
    });

    // Algoritmo para mezclar el arreglo de cartas (Fisher-Yates)
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // --- Lógica de los modales de instrucciones y acerca de ---

    // Acción del botón "Instrucciones"
    instructionsButton.addEventListener("click", () => {
        const modal = document.getElementById("instructions-modal");
        modal.style.display = "flex";
        setTimeout(() => {
            modal.classList.add("active");
        }, 10);
    });

    // Acción para cerrar el modal con el botón "Aceptar"
    const acceptInstructions = document.getElementById("accept-instructions");
    acceptInstructions.addEventListener("click", () => {
        const modal = document.getElementById("instructions-modal");
        modal.classList.remove("active");
        setTimeout(() => {
            modal.style.display = "none";
        }, 400);
    });

    // Cerrar el modal si se hace clic fuera del contenido
    document.getElementById("instructions-modal").addEventListener("click", (e) => {
        if (e.target.id === "instructions-modal") {
            const modal = e.currentTarget;
            modal.classList.remove("active");
            setTimeout(() => {
                modal.style.display = "none";
            }, 400);
        }
    });

    // Acción del botón "Acerca de"
    aboutButton.addEventListener("click", () => {
        const modal = document.getElementById("about-modal");
        modal.style.display = "flex";
        setTimeout(() => {
            modal.classList.add("active");
        }, 10);
    });

    // Acción para cerrar el modal de acerca de con el botón "Aceptar"
    const acceptAbout = document.getElementById("accept-about");
    acceptAbout.addEventListener("click", () => {
        const modal = document.getElementById("about-modal");
        modal.classList.remove("active");
        setTimeout(() => {
            modal.style.display = "none";
        }, 400);
    });

    // Cerrar el modal de acerca de si se hace clic fuera del contenido
    document.getElementById("about-modal").addEventListener("click", (e) => {
        if (e.target.id === "about-modal") {
            const modal = e.currentTarget;
            modal.classList.remove("active");
            setTimeout(() => {
                modal.style.display = "none";
            }, 400);
        }
    });

    // Overlay para orientación
    const orientationOverlay = document.createElement('div');
    orientationOverlay.id = 'orientation-overlay';
    orientationOverlay.style.position = 'fixed';
    orientationOverlay.style.top = 0;
    orientationOverlay.style.left = 0;
    orientationOverlay.style.width = '100vw';
    orientationOverlay.style.height = '100vh';
    orientationOverlay.style.background = 'rgba(44,62,80,0.97)';
    orientationOverlay.style.color = '#fff';
    orientationOverlay.style.display = 'none';
    orientationOverlay.style.zIndex = 9999;
    orientationOverlay.style.justifyContent = 'center';
    orientationOverlay.style.alignItems = 'center';
    orientationOverlay.style.flexDirection = 'column';
    orientationOverlay.style.fontFamily = 'Poppins, Roboto, sans-serif';
    orientationOverlay.style.fontSize = '2rem';
    orientationOverlay.style.textAlign = 'center';
    orientationOverlay.innerHTML = '<span style="font-size:3.5rem;">🔄</span><br>Por favor, gira tu dispositivo<br><b>y usa la app en modo vertical</b>';
    document.body.appendChild(orientationOverlay);

    function checkOrientation() {
        if (window.matchMedia("(orientation: landscape)").matches) {
            orientationOverlay.style.display = 'flex';
        } else {
            orientationOverlay.style.display = 'none';
        }
    }
    window.addEventListener('orientationchange', checkOrientation);
    window.addEventListener('resize', checkOrientation);
    checkOrientation();
});
