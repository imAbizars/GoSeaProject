export default function CutoutBadge({ text, fontSize = 16, paddingX = 20, height = 70, rounded = 24 }) {
  const maskId = `cutout-${text.replace(/\s+/g, "-")}`;
  const approxTextWidth = text.length * fontSize * 0.6;
  const width = approxTextWidth + paddingX * 2;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} >
      <mask id={maskId}>
        <rect width={width} height={height} rx={rounded} fill="white" />
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize={fontSize}
          fontWeight="bold"
          fill="black"
        >
          {text}
        </text>
      </mask>
      <rect width={width} height={height} rx={rounded} fill="white" opacity="0.6" mask={`url(#${maskId})`} />
    </svg>
  );
}