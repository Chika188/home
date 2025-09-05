import React, { useRef, useEffect, forwardRef, useImperativeHandle } from "react";

const SignaturePad = forwardRef(({ value, onEnd }, ref) => {
  const canvasRef = useRef(null);
  let drawing = false;
  let last = { x: 0, y: 0 };

  useImperativeHandle(ref, () => ({
    clear: () => {
      const ctx = canvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, 300, 100);
      onEnd(null);
    },
  }));

  useEffect(() => {
    if (value && canvasRef.current) {
      const img = new window.Image();
      img.onload = () => {
        const ctx = canvasRef.current.getContext("2d");
        ctx.clearRect(0, 0, 300, 100);
        ctx.drawImage(img, 0, 0, 300, 100);
      };
      img.src = value;
    }
  }, [value]);

  const getPos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    if (e.touches) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }
    return {
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    };
  };

  const start = (e) => {
    drawing = true;
    last = getPos(e);
  };
  const move = (e) => {
    if (!drawing) return;
    const ctx = canvasRef.current.getContext("2d");
    ctx.strokeStyle = "#3B82F6";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(last.x, last.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    last = pos;
  };
  const end = () => {
    drawing = false;
    if (onEnd) onEnd(canvasRef.current.toDataURL());
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={300}
        height={100}
        className="border rounded bg-gray-50"
        style={{ touchAction: "none" }}
        onMouseDown={start}
        onMouseMove={move}
        onMouseUp={end}
        onMouseLeave={end}
        onTouchStart={start}
        onTouchMove={move}
        onTouchEnd={end}
      />
      <div className="flex gap-2 mt-2">
        <button
          className="bg-gray-200 text-gray-600 px-3 py-1 rounded hover:bg-gray-300"
          onClick={() => {
            const ctx = canvasRef.current.getContext("2d");
            ctx.clearRect(0, 0, 300, 100);
            if (onEnd) onEnd(null);
          }}
        >
          清除
        </button>
      </div>
    </div>
  );
});

export default SignaturePad;