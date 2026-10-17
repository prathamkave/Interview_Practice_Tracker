import confetti from 'canvas-confetti';

export const triggerConfetti = () => {
  try {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#FF5B4D', '#F59E0B', '#10B981', '#3B82F6', '#EC4899'],
      disableForReducedMotion: true
    });
  } catch (err) {
    console.error("Confetti error:", err);
  }
};

export const triggerCelebration = () => {
  try {
    const end = Date.now() + 1000;
    const colors = ['#FF5B4D', '#10B981', '#F59E0B'];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: colors
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  } catch (err) {
    console.error("Celebration error:", err);
  }
};
