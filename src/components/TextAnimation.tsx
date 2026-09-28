import { motion, MotionValue, useTransform } from "framer-motion";

type TextAnimationProps = {
  text: string;
  progress: MotionValue<number>;
  className?: string;
  animatedColor?: string; // the single target color words fade into
  whiteRanges?: [number, number][]; // inclusive word-index ranges to keep white
  serifRanges?: [number, number][]; // inclusive word-index ranges rendered in italic serif
};

type WordProps = {
  word: string;
  progress: MotionValue<number>;
  index: number;
  totalWords: number;
  animatedColor: string;
  isWhite: boolean;
  isSerif: boolean;
};

const Word: React.FC<WordProps> = ({
  word,
  progress,
  index,
  totalWords,
  animatedColor,
  isWhite,
  isSerif,
}) => {
  const start = index / totalWords;
  const end = (index + 1) / totalWords;

  const color = useTransform(
    progress,
    [start, end],
    ["#555555", isWhite ? "#ffffff" : animatedColor]
  );

  return (
    <motion.span style={{ color }} className={isSerif ? "font-instrument-serif italic" : undefined}>
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
  serifRanges = [],
}) => {
  const words = text.split(" ");

  const inRanges = (ranges: [number, number][], index: number) =>
    ranges.some(([start, end]) => index >= start && index <= end);

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
          isWhite={inRanges(whiteRanges, index)}
          isSerif={inRanges(serifRanges, index)}
        />
      ))}
    </p>
  );
};

export default TextAnimation;