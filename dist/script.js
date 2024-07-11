const gameContainer = document.querySelector('.game-container');
const player = document.querySelector('.player');
const bullet = document.querySelector('.bullet');
const enemiesContainer = document.querySelector('.enemies');
const startScreen = document.querySelector('.start-screen');
const playButton = document.getElementById('play-button');
const musicContainer = document.querySelector('.music-container');

const playerSpeed = 10;
const bulletSpeed = 10;
let bulletActive = false;

playButton.addEventListener('click', startGame);

document.addEventListener('keydown', (e) => {
  switch(e.key) {
    case 'ArrowLeft':
      movePlayer(-playerSpeed);
      break;
    case 'ArrowRight':
      movePlayer(playerSpeed);
      break;
    case ' ':
      if (!bulletActive) {
        shootBullet();
      }
      break;
  }
});

function movePlayer(distance) {
  const currentPosition = player.offsetLeft;
  const newPosition = currentPosition + distance;
  if (newPosition >= 0 && newPosition <= gameContainer.offsetWidth - player.offsetWidth) {
    player.style.left = `${newPosition}px`;
  }
}

function shootBullet() {
  bullet.style.left = `${player.offsetLeft + player.offsetWidth / 2 - bullet.offsetWidth / 2}px`;
  bullet.style.top = `${player.offsetTop - bullet.offsetHeight}px`;
  bullet.style.display = 'block';
  bulletActive = true;

  const bulletInterval = setInterval(() => {
    const currentBulletPosition = bullet.offsetTop;
    if (currentBulletPosition <= 0) {
      bullet.style.display = 'none';
      bulletActive = false;
      clearInterval(bulletInterval);
    } else {
      bullet.style.top = `${currentBulletPosition - bulletSpeed}px`;
      checkCollision();
    }
  }, 20);
}

function createEnemies() {
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 11; j++) {
      const enemy = document.createElement('div');
      enemy.classList.add('enemy');
      enemy.style.left = `${j * 50 + 10}px`;
      enemy.style.top = `${i * 50}px`;
      enemiesContainer.appendChild(enemy);
    }
  }
}

function startGame() {
  startScreen.style.display = 'none';
  gameContainer.style.display = 'block';
  musicContainer.style.display = 'block';
  createEnemies();
}

function checkCollision() {
  const bulletRect = bullet.getBoundingClientRect();
  const enemies = document.querySelectorAll('.enemy');
  enemies.forEach(enemy => {
    const enemyRect = enemy.getBoundingClientRect();
    if (
      bulletRect.left < enemyRect.right &&
      bulletRect.right > enemyRect.left &&
      bulletRect.top < enemyRect.bottom &&
      bulletRect.bottom > enemyRect.top
    ) {
      enemy.remove();
      bullet.style.display = 'none';
      bulletActive = false;
    }
  });
}