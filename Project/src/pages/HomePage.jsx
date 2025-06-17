import { useCallback, useEffect, useRef, useState } from 'react';
import functionPlot from 'function-plot';
import { evaluate } from 'mathjs';

const HomePage = ({ tamaño_archivo_mb }) => {
  const func1 = `${tamaño_archivo_mb}/x + 0.25x^2`;
  const [interpoint, setInterpoint] = useState([]);
  const graphRef = useRef(null);

  const agruparYPromediarPuntos = (puntos, distanciaMaxima = 0.15) => {
    const grupos = [];
    let grupoActual = [];

    for (let i = 0; i < puntos.length; i++) {
      const [x, y] = puntos[i];

      if (
        grupoActual.length === 0 ||
        Math.abs(x - grupoActual[grupoActual.length - 1][0]) <= distanciaMaxima
      ) {
        grupoActual.push([x, y]);
      } else {
        grupos.push(grupoActual);
        grupoActual = [[x, y]];
      }
    }

    if (grupoActual.length > 0) grupos.push(grupoActual);

    return grupos.map((grupo) => {
      const avgX = parseFloat(
        (grupo.reduce((acc, p) => acc + p[0], 0) / grupo.length).toFixed(2)
      );
      const avgY = parseFloat(
        (grupo.reduce((acc, p) => acc + p[1], 0) / grupo.length).toFixed(2)
      );
      return [avgX, avgY];
    });
  };

  const plot = useCallback(() => {
    const expressions = [];
    const interPoints = [];

    if (func1) expressions.push({ fn: func1, color: 'blue' });

    const funcs = [{ expr: func1 }].filter((f) => f.expr);

    try {
      for (let i = 0; i < funcs.length; i++) {
        for (let j = i + 1; j < funcs.length; j++) {
          for (let x = -10; x <= 10; x += 0.1) {
            const scope = { x };
            let y1, y2;

            try {
              y1 = evaluate(funcs[i].expr, scope);
              y2 = evaluate(funcs[j].expr, scope);
            } catch (err) {
              continue;
            }

            if (Math.abs(y1 - y2) < 0.1) {
              const avgY = (y1 + y2) / 2;
              const roundedX = parseFloat(x.toFixed(1));
              const roundedY = parseFloat(avgY.toFixed(1));
              interPoints.push([roundedX, roundedY]);
            }
          }
        }
      }

      const puntosFinales = agruparYPromediarPuntos(interPoints);

      if (puntosFinales.length > 0) {
        expressions.push({
          points: puntosFinales,
          fnType: 'points',
          graphType: 'scatter',
          color: 'black',
          attr: { r: 5 },
        });
        setInterpoint(puntosFinales);
        // No hagas console.log(interpoint) aquí
      }

      functionPlot({
        target: graphRef.current,
        // width: 400,
        // height: 500,
        yAxis: { label: 'y', domain: [-150, 200] },
        xAxis: { label: 'x', domain: [-150, 200] },
        grid: true,
        data: expressions,
      });
    } catch (err) {
      alert(
        'Error en la función ingresada. Asegúrate de usar notación correcta (ej: x^2 - 2*x)'
      );
    }
  }, [func1]); // Solo depende de func1

  // Para ver el valor actualizado de interpoint:
  useEffect(() => {
    console.log('Interpoints actualizados:', interpoint);
  }, [interpoint]);

  useEffect(() => {
    plot();
  }, [plot]);

  return (
    <div className="">
      <div ref={graphRef} className="overflow-y-auto" />
      <div>
        {interpoint.length > 0 &&
          interpoint.map(([x, y], i) => (
            <p key={i}>
              Punto {i + 1}: (x: {x}, y: {y})
            </p>
          ))}
      </div>
    </div>
  );
};

export default HomePage;
