import React, { useEffect, useRef } from "react";

const FuzzyText = ({
  children,
  fontSize = "clamp(2rem, 10vw, 10rem)",
  fontWeight = 900,
  fontFamily = "inherit",
  color = "#fff",
  enableHover = true,
  baseIntensity = 0.18,
  hoverIntensity = 0.5,
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let isHovered = false;

    const text = React.Children.toArray(children).join("");
    const computedFontFamily =
      fontFamily === "inherit"
        ? window.getComputedStyle(canvas).fontFamily || "sans-serif"
        : fontFamily;

    const resize = () => {
      const font = `${fontWeight} ${fontSize} ${computedFontFamily}`;
      ctx.font = font;
      const metrics = ctx.measureText(text);
      const width = metrics.width;
      const height =
        (metrics.actualBoundingBoxAscent ?? 100) +
        (metrics.actualBoundingBoxDescent ?? 30);

      canvas.width = width * 2;
      canvas.height = height * 2;
      ctx.scale(2, 2);
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const intensity = isHovered ? hoverIntensity : baseIntensity;

      for (let i = 0; i < 3; i++) {
        ctx.fillStyle = `rgba(${i === 0 ? "255,0,255" : i === 1 ? "0,255,255" : "255,255,0"}, ${intensity})`;
        ctx.font = `${fontWeight} ${fontSize} ${computedFontFamily}`;
        ctx.fillText(
          text,
          Math.random() * 2 - 1, // horizontal jitter
          (ctx.measureText(text).actualBoundingBoxAscent ?? 100) +
            Math.random() * 2 - 1 // vertical jitter
        );
      }

      ctx.fillStyle = color;
      ctx.fillText(
        text,
        0,
        ctx.measureText(text).actualBoundingBoxAscent ?? 100
      );

      animationFrameId = requestAnimationFrame(draw);
    };

    const handleMouseEnter = () => {
      if (enableHover) isHovered = true;
    };
    const handleMouseLeave = () => {
      if (enableHover) isHovered = false;
    };

    canvas.addEventListener("mouseenter", handleMouseEnter);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    resize();
    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener("mouseenter", handleMouseEnter);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [
    children,
    fontSize,
    fontWeight,
    fontFamily,
    color,
    enableHover,
    baseIntensity,
    hoverIntensity,
  ]);

  return <canvas ref={canvasRef} style={{ display: "block" }} />;
};

export default FuzzyText;
