import { useRef } from "react";

export function useAudio(muted) {
  const audioContextRef = useRef(null);

  function getContext() {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }

    return audioContextRef.current;
  }

  function beep(freq, dur, type = "sine", vol = 0.15) {
    if (muted) return;

    try {
      const context = getContext();
      const oscillator = context.createOscillator();
      const gain = context.createGain();

      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.type = type;
      oscillator.frequency.value = freq;
      gain.gain.setValueAtTime(vol, context.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + dur);
      oscillator.start();
      oscillator.stop(context.currentTime + dur);
    } catch {
      // AudioContext can be unavailable or blocked. The game remains playable.
    }
  }

  return {
    correct: () => {
      beep(523, 0.09);
      setTimeout(() => beep(659, 0.09), 90);
      setTimeout(() => beep(784, 0.2), 180);
    },
    wrong: () => {
      beep(220, 0.18, "sawtooth", 0.1);
      setTimeout(() => beep(165, 0.28, "sawtooth", 0.08), 150);
    },
    levelUp: () => {
      [0, 100, 200, 340].forEach((delay, index) => {
        setTimeout(() => beep([523, 659, 784, 1047][index], 0.22), delay);
      });
    },
    tap: () => beep(440, 0.05, "sine", 0.07),
  };
}
