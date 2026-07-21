import { motion, MotionValue, useTransform } from "motion/react";

type TextAnimationProps = {
  text: string;
  progress: MotionValue<number>;
  className?: string;
  animatedColor?: string; // the single target color words fade into
  whiteRanges?: [number, number][]; // inclusive word-index ranges to keep white
};

type WordProps = {
  word: string;
  progress: MotionValue<number>;
  index: number;
  totalWords: number;
  animatedColor: string;
  isWhite: boolean;
};

const Word: React.FC<WordProps> = ({
  word,
  progress,
  index,
  totalWords,
  animatedColor,
  isWhite,
}) => {
  const start = index / totalWords;
  const end = (index + 1) / totalWords;

  const color = useTransform(
    progress,
    [start, end],
    ["#555555", isWhite ? "#ffffff" : animatedColor]
  );

  return (
    <motion.span style={{ color }}>
      {word}{" "}
    </motion.span>
  );
};

const TextAnimation: React.FC<TextAnimationProps> = ({
  text,
  progress,
  className,
  animatedColor = "#f05038",
  whiteRanges = [],
}) => {
  const words = text.split(" ");

  const isIndexWhite = (index: number) =>
    whiteRanges.some(([start, end]) => index >= start && index <= end);

  return (
    <p className={className}>
      {words.map((word, index) => (
        <Word
          key={index}
          word={word}
          index={index}
          totalWords={words.length}
          progress={progress}
          animatedColor={animatedColor}
          isWhite={isIndexWhite(index)}
        />
      ))}
    </p>
  );
};

export default TextAnimation;